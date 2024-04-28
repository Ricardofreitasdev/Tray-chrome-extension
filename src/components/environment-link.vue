<template>
  <p class="item">
    <a @click="changeUrl(environment)">{{ text }}</a>
  </p>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import useNotification from "../composables/useNotification";
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
    const chromeExtension = inject("chromeExtension");
    const { setNotification } = useNotification();

    onMounted(async () => {
      const storeData = await chromeExtension.action('getStoreData');
      currentUrl.value = storeData.currentUrl;
    });

    const changeUrl = async (env) => {
      const response = await chromeExtension.action('changeEnvironment', {
        currentUrl: currentUrl.value,
        environment: env,
      });

      setNotification(response);
    };
    return { changeUrl };
  },
};
</script>
