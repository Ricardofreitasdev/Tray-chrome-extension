<template>
  <p class="item">
    <a @click="changeUrl(props.environment)">{{ props.text }}</a>
  </p>
</template>

<script setup>
import { inject } from 'vue';
import useNotification from '../composables/useNotification';
import useStoreData from '../composables/useStoreData';
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

const chromeExtension = inject('chromeExtension');
const { setNotification } = useNotification();

const { currentUrl } = useStoreData();

const changeUrl = async (env) => {
  const response = await chromeExtension.action('changeEnvironment', {
    currentUrl: currentUrl.value,
    environment: env,
  });

  setNotification(response);
};
</script>
