<template>
  <div class="board">
    <Tabs>
      <template #tab-content-0>
        <Store />
      </template>
      <template #tab-content-1>
        <Settings />
      </template>
      <template #tab-content-2>
        <Dev />
      </template>
    </Tabs>
    <Messages />
    <footer class="footer-message">version 1.0.1</footer>
  </div>
</template>

<script>
import Tabs from "./components/tabs.vue";
import Store from "./pages/store.vue";
import Dev from "./pages/dev.vue";
import Settings from "./pages/settings.vue";
import Messages from "./components/messages.vue";

export default {
  components: {
    Tabs,
    Store,
    Settings,
    Messages,
    Dev,
  },
};
</script>

<style scoped>
.board {
  background: #0d1117;
  max-width: 300px;
  max-height: 425px;
  width: 400px;
  height: 425px;
  overflow-y: hidden;
  padding: 16px;
  position: relative;
}

.footer-message {
  text-align: center;
  font-size: 10px;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
</style>
