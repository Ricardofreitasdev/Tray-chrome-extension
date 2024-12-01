<template>
  <div v-if="$store.isEasy">
    <h3>EasyCheckout Ambientes</h3>
    <hr />
    <app-environment-link
      v-for="easy in $store.urlsEasy"
      :key="easy.environment"
      :environment="easy.environment"
      :text="easy.text"
    />
  </div>
  <div v-else-if="$store.isCentral">
    <h3>Central Ambientes</h3>
    <hr />
    <app-environment-link
      v-for="central in $store.urlsCentral"
      :key="central.environment"
      :environment="central.environment"
      :text="central.text"
    />
  </div>
  <div v-else>Não existem recursos de dev nessa pagina</div>
</template>

<script setup>
import AppEnvironmentLink from '../components/environment-link.vue';
import { useStoreDataStore } from '../store/storeDataStore.js';

const $store = useStoreDataStore();
</script>

<style lang="scss">
h3 {
  margin-bottom: 15px;
}
</style>
