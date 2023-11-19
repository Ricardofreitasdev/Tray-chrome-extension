<template>
  <div v-if="storeHistory">
    <p>Histório de uso da extensão</p>
    <div v-for="store in storeHistory" :key="store.id">
      <a :href="store.url" target="_blank">{{ store.url }}</a>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";

export default {
  name: "AppHistory",
  setup() {
    const storeHistory = ref([]);
    const chromeExtension = inject('chromeExtension');

    onMounted(async () => {
      const history = await chromeExtension.getStoreHistory();
      storeHistory.value = history;
    });
    return {
      storeHistory,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 5px;
}
</style>
