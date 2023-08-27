<template>
  <div>
    <app-build-cpf />
    <hr />
    <app-clear-cache />
    <hr />
    <app-external-links />
  </div>
</template>

<script>
import AppBuildCpf from "../components/tools/cpf.vue";
import AppExternalLinks from "../components/tools/external-links.vue";
import AppClearCache from "../components/tools/clear-cache.vue";

export default {
  name: "Settings",
  components: {
    AppBuildCpf,
    AppExternalLinks,
    AppClearCache,
  },
};
</script>

<style></style>
