<template>
  <div>
    <button class="button" @click="clear">Limpar Storage</button>
  </div>
</template>

<script>
import { clearCache } from "../../google/browser";
import { useStore } from "vuex";

export default {
  name: "AppClearCache",
  setup() {
    const store = useStore();
    const clear = async () => {
      const response = await clearCache();
      store.commit("setNotification", response);
    };
    return {
      clear,
    };
  },
};
</script>

<style></style>
