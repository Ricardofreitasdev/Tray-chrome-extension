<template>
  <div>
    <div v-if="isTray" class="container">
      <div v-for="(prop, key) in store" :key="key" class="item">
        <p v-if="prop.value">
          {{ prop.label }}:
          <copy-area :text="prop.value" />
        </p>
      </div>
      <hr />
      <p class="item">
        <a @click="facebookConversions">Ativar Debug do Facebook</a>
      </p>
      <p class="item">
        <a @click="removeTheme">Remover Tema</a>
      </p>
      <p class="item">
        <a @click="removeExternalScripts">Remover Scripts Externos</a>
      </p>
      <p v-show="isEasy" class="item">
        <a @click="verifyInlineScript"
          >[CSP] Report de scripts inline sem nonce</a
        >
      </p>
      <hr />
      <app-history />
    </div>
    <div v-else>Não parece ser uma loja tray</div>
  </div>
</template>

<script>
import { ref, onMounted, computed, inject } from "vue";
import AppHistory from "../components/tools/history.vue";
import CopyArea from "../components/copy-area.vue";
import useNotification from "../composables/useNotification";

export default {
  name: "Store",
  components: {
    AppHistory,
    CopyArea,
  },

  setup() {
    const chromeExtension = inject("chromeExtension");
    const { setNotification } = useNotification();
    const store = ref({});
    const url = ref("");
    const isTray = ref(false);
    const hasCSP = ref(false);
    const currentUrl = ref("");

    onMounted(async () => {
      const storeData = await chromeExtension.getStoreData();
      const storeIntegrations = await chromeExtension.getStoreIntegrations();
      currentUrl.value = storeData.currentUrl;

      store.value = {
        id: { value: storeData.id, label: "Loja" },
        session: { value: storeData.session, label: "Sessão" },
        gtm: { value: storeIntegrations.gtm, label: "Gtm" },
        ga4: { value: storeIntegrations.analyticsGa4, label: "Ga4" },
        ua: { value: storeIntegrations.analyticsUa, label: "UA" },
        pixel: { value: storeIntegrations.facebookPixel, label: "Pixel" },
      };

      url.value = storeData.url;
      isTray.value = storeData.isTray;
      hasCSP.value = storeData.hasCSP;
    });

    const limitString = (text) => {
      const limit = 20;
      if (text.length > limit) {
        return text.substring(0, limit) + "...";
      } else {
        return text;
      }
    };

    const removeTheme = async () => {
      const response = await chromeExtension.layoutOff();
      setNotification(response);
    };

    const removeExternalScripts = async () => {
      const response = await chromeExtension.jsOff();
      setNotification(response);
    };

    const facebookConversions = async () => {
      const response = await chromeExtension.fbDebug();
      setNotification(response);
    };

    const isEasy = computed(() => currentUrl.value.includes("checkout"));

    const createCSPReport = (data, total) => {
      let scriptReport = `Total de Scripts Bloqueados: ${total}\n\n`;

      data.forEach((script, index) => {
        scriptReport += `Script ${index + 1}:\n`;
        scriptReport += `-------------------------------------------\n`;
        scriptReport += `${script}\n\n`;
      });

      const blob = new Blob([scriptReport], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `scripts_inline_sem_nonce_loja-${store.value.id.value}.txt`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };

    const verifyInlineScript = async () => {
      const { inlineScripts, totalBlockedScripts } =
        await chromeExtension.getInlineScripts();

      if (!hasCSP.value) {
        setNotification(
          `A loja ${store.value.id.value} não esta com CSP ativo`
        );
        return;
      }

      if (totalBlockedScripts > 0) {
        createCSPReport(inlineScripts, totalBlockedScripts);

        setNotification(
          `Acesse os seus downloads para verificar os scripts bloqueado na loja ${store.value.id.value}`
        );
        return;
      }

      setNotification(
        `A loja ${store.value.id.value} não tem scripts inlines sem nonce`
      );
    };

    return {
      store,
      isTray,
      isEasy,
      limitString,
      removeTheme,
      removeExternalScripts,
      facebookConversions,
      verifyInlineScript,
    };
  },
};
</script>

<style lang="scss">
code {
  font-family: monospace;
  font-size: 14px;
  margin: 10px;
}

.item {
  margin-bottom: 5px;
  font-size: 14px;
}
hr {
  border: 1px solid $bg-color-2;
  margin: 10px 0;
}

b {
  cursor: copy;
}
</style>
