<template>
  <div v-if="$store.storeHistory">
    <p>Histório de uso da extensão</p>
    <div v-for="store in $store.storeHistory" :key="store.id">
      <a :href="store.url" target="_blank">{{ store.url }}</a>
    </div>
  </div>
</template>

<script setup>
import { useStoreDataStore } from '../../store/storeDataStore';
const $store = useStoreDataStore();
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 5px;
}
</style>
