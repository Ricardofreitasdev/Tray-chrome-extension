<template>
  <div v-if="isEasy">
    <h3>EasyCheckout Ambientes</h3>
    <hr />
    <app-environment-link
      v-for="easy in urlsEasy"
      :key="easy.environment"
      :environment="easy.environment"
      :text="easy.text"
    />
  </div>
  <div v-else-if="isCentral">
    <h3>Central Ambientes</h3>
    <hr />
    <app-environment-link
      v-for="central in urlsCentral"
      :key="central.environment"
      :environment="central.environment"
      :text="central.text"
    />
  </div>
  <div v-else>Não existem recursos de dev nessa pagina</div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import AppEnvironmentLink from '../components/environment-link.vue';
import environments from '../config.js';
import useStoreData from '../composables/useStoreData.js';

const urlsEasy = reactive(environments.easy);
const urlsCentral = reactive(environments.central);

const { currentUrl } = useStoreData();

const isCentral = computed(() => currentUrl.value.includes('my-account'));
const isEasy = computed(() => currentUrl.value.includes('checkout'));
</script>

<style lang="scss">
h3 {
  margin-bottom: 15px;
}
</style>
