<template>
  <div>
    <button class="button" @click="clear">Limpar Storage</button>
  </div>
</template>

<script>
import { inject } from 'vue';
import useNotification from '../../composables/useNotification';

export default {
  name: "AppClearCache",
  setup() {
    const chromeExtension = inject('chromeExtension');
    const { setNotification } = useNotification();

    const clear = async () => {
      const response = await chromeExtension.clearCache();
      setNotification(response);
    };
    return {
      clear,
    };
  },
};
</script>

<style></style>
