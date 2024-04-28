<template>
  <div v-if="storeHistory">
    <p>Histório de uso da extensão</p>
    <div v-for="store in storeHistory" :key="store.id">
      <a :href="store.url" target="_blank">{{ store.url }}</a>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';

const storeHistory = ref([]);
const chromeExtension = inject('chromeExtension');

onMounted(async () => {
  storeHistory.value = await chromeExtension.action('getStoreHistory');
});
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 5px;
}
</style>
