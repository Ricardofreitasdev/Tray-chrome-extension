<template>
  <p class="item">
    <a @click="changeUrl(props.environment, $store.store)">{{ props.text }}</a>
  </p>
</template>

<script setup>
import { useStoreDataStore } from '../store/storeDataStore';
import useBrowserAction from '../composables/useBrowserAction';

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

const $store = useStoreDataStore();
const { changeUrl } = useBrowserAction();
</script>
