<template>
  <div>
    <button class="button" @click="clear">Limpar Storage</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { inject } from 'vue';

export default {
  name: "AppClearCache",
  setup() {
    const chromeExtension = inject('chromeExtension');
    const store = useStore();
    const clear = async () => {
      const response = await chromeExtension.clearCache();
      store.commit("setNotification", response);
    };
    return {
      clear,
    };
  },
};
</script>

<style></style>
