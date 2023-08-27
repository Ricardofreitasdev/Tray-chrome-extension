<template>
  <p class="item">
    <a @click="changeUrl(environment)">{{ text }}</a>
  </p>
</template>

<script>
import { onMounted, ref } from "vue";
import { getStoreData, changeEnvironment } from "../google/browser";
import { useStore } from "vuex";
export default {
  name: "AppEnvironmentLink",
  props: {
    environment: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    separator: {
      type: Boolean,
      required: false,
    },
  },

  setup() {
    const currentUrl = ref("");
    const vuex = useStore();

    onMounted(async () => {
      const storeData = await getStoreData();
      currentUrl.value = storeData.currentUrl;
    });

    const changeUrl = async (env) => {
      const response = await changeEnvironment({
        currentUrl: currentUrl.value,
        environment: env,
      });

      vuex.commit("setNotification", response);
    };
    return { changeUrl };
  },
};
</script>
