<template>
  <div>
    <button class="button" @click="clear">Limpar Storage</button>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import useNotification from '../../composables/useNotification';

const chromeExtension = inject('chromeExtension');
const { setNotification } = useNotification();

const clear = async () => {
  const response = await chromeExtension.action('clearCache');
  setNotification(response);
};
</script>
