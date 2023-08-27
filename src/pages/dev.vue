<template>
  <div v-if="isEasy">
    <h3>EasyCheckout Ambientes</h3>
    <hr />
    <app-environment-link
      v-for="easy in urlsEasy"
      :key="easy.environment"
      :environment="easy.environment"
      :text="easy.text"
    />
  </div>
  <div v-else-if="isCentral">
    <h3>Central Ambientes</h3>
    <hr />
    <app-environment-link
      v-for="central in urlsCentral"
      :key="central.environment"
      :environment="central.environment"
      :text="central.text"
    />
  </div>
  <div v-else>Não existem recursos de dev nessa pagina</div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { getStoreData } from "../google/browser";
import AppEnvironmentLink from "../components/environment-link.vue";
import environments from "../config.js";

export default {
  name: "Dev",
  components: {
    AppEnvironmentLink,
  },

  setup() {
    const currentUrl = ref("");

    const urlsEasy = reactive(environments.easy);
    const urlsCentral = reactive(environments.central);

    onMounted(async () => {
      const storeData = await getStoreData();
      currentUrl.value = storeData.currentUrl;
    });

    const isCentral = computed(() => currentUrl.value.includes("my-account"));
    const isEasy = computed(() => currentUrl.value.includes("checkout"));

    return {
      urlsEasy,
      urlsCentral,
      isCentral,
      isEasy,
    };
  },
};
</script>

<style lang="scss">
h3 {
  margin-bottom: 15px;
}
</style>
