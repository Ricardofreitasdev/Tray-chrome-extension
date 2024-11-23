import { ref, watch } from 'vue';
import useNotification from './useNotification';
import chromeExtension from '../chrome/chromeExtension';

export default function useBrowserAction() {
  const { setNotification } = useNotification();
  const message = ref('');

  const actions = {
    removeTheme: async () => {
      message.value = await chromeExtension.action('layoutOff');
    },

    removeExternalScripts: async () => {
      message.value = await chromeExtension.action('jsOff');
    },

    facebookConversions: async () => {
      message.value = await chromeExtension.action('fbDebug');
    },

    changeUrl: async (env, { currentUrl }) => {
      message.value = await chromeExtension.action('changeEnvironment', {
        currentUrl: currentUrl,
        environment: env,
      });
    },

    clear: async () => {
      message.value = await chromeExtension.action('clearCache');
    },

    verifyInlineScript: async ({ hasCSP, id }) => {
      const { inlineScripts, totalBlockedScripts } =
        await chromeExtension.action('getInlineScripts');

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
    getStoreData: async () => await chromeExtension.action('getStoreData'),

    getStoreIntegrations: async () =>
      await chromeExtension.action('getStoreIntegrations'),

    getStoreHistory: async () =>
      await chromeExtension.action('getStoreHistory'),
  };

  watch(message, (newMessage) => {
    if (newMessage !== '') {
      setNotification(newMessage);
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
