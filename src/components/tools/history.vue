<template>
  <div v-if="storeHistory">
    <p>Histório de uso da extensão</p>
    <div v-for="store in storeHistory" :key="store.id">
      <a :href="store.url" target="_blank">{{ store.url }}</a>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getStoreHistory } from "../../google/browser.js";

export default {
  name: "AppHistory",
  setup() {
    const storeHistory = ref([]);

    onMounted(async () => {
      const history = await getStoreHistory();
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
