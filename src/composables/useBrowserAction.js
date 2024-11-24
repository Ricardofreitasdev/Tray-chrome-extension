import { ref, watch } from 'vue';
import { useToastStore } from '../store/toastStore';

const browser = {
  getCurrentTab: async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  },

  sendMessage: async (action, data) => {
    const { id: tabId, url: tabUrl } = await browser.getCurrentTab();
    return await chrome.runtime.sendMessage({ tabId, tabUrl, action, data });
  },
};

export default function useBrowserAction() {
  const $toast = useToastStore();
  const message = ref('');

  const actions = {
    removeTheme: async () => {
      message.value = await browser.sendMessage('layoutOff');
    },

    removeExternalScripts: async () => {
      message.value = await browser.sendMessage('jsOff');
    },

    facebookConversions: async () => {
      message.value = await browser.sendMessage('fbDebug');
    },

    changeUrl: async (env, { currentUrl }) => {
      message.value = await browser.sendMessage('changeEnvironment', {
        currentUrl: currentUrl,
        environment: env,
      });
    },

    clear: async () => {
      message.value = await browser.sendMessage('clearCache');
    },

    verifyInlineScript: async ({ hasCSP, id }) => {
      const { inlineScripts, totalBlockedScripts } =
        await browser.sendMessage('getInlineScripts');

      if (!hasCSP) {
        message.value = `A loja ${id} não esta com CSP ativo`;
        return;
      }

      if (totalBlockedScripts > 0) {
        actions.createCSPReport(inlineScripts, totalBlockedScripts, id);

        message.value = `Acesse os seus downloads para verificar os scripts
            bloqueado na loja ${id}`;
        return;
      }

      message.value = `A loja ${id} não tem scripts inlines`;
    },

    createCSPReport: (data, total, id) => {
      let scriptReport = `Total de Scripts Bloqueados: ${total}\n\n`;

      data.forEach((script, index) => {
        scriptReport += `Script ${index + 1}:\n`;
        scriptReport += '-------------------------------------------\n';
        scriptReport += `${script}\n\n`;
      });

      const blob = new Blob([scriptReport], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `scripts_inline_sem_nonce_loja-${id}.txt`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    },
  };

  const getters = {
    getStoreData: async () => await browser.sendMessage('getStoreData'),

    getStoreIntegrations: async () =>
      await browser.sendMessage('getStoreIntegrations'),

    getStoreHistory: async () => await browser.sendMessage('getStoreHistory'),
  };

  watch(message, (newMessage) => {
    if (newMessage !== '') {
      $toast.push(newMessage);
    }

    setTimeout(() => {
      message.value = '';
    }, 100);
  });

  return {
    ...actions,
    ...getters,
  };
}
