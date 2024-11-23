<template>
  <div>
    <button class="button" @click="clear">Limpar Storage</button>
  </div>
</template>

<script setup>
import useBrowserAction from '../../composables/useBrowserAction';
const { clear } = useBrowserAction();
</script>
