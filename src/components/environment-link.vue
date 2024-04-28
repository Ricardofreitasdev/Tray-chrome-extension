<template>
  <p class="item">
    <a @click="changeUrl(props.environment)">{{ props.text }}</a>
  </p>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import useNotification from '../composables/useNotification';
const props = defineProps({
  environment: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const currentUrl = ref('');
const chromeExtension = inject('chromeExtension');
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
</script>
