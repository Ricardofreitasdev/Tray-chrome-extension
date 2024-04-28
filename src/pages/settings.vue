<template>
  <div>
    <app-build-cpf />
    <hr />
    <app-clear-cache />
    <hr />
    <app-external-links />
  </div>
</template>

<script setup>
import AppBuildCpf from "../components/tools/cpf.vue";
import AppExternalLinks from "../components/tools/external-links.vue";
import AppClearCache from "../components/tools/clear-cache.vue";
</script>

<style></style>
