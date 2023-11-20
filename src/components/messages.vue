<template>
  <div v-if="notification" class="messages">
    <span>{{ notification }}</span>
  </div>
</template>

<script>
import useNotificarion from "../composables/useNotification";

export default {
  name: "AppMessages",
  setup() {
    const { notification } = useNotificarion();
    return {
      notification,
    };
  },
};
</script>

<style lang="scss">
.messages {
  font-size: 14px;
  text-align: center;
  background: #0d1117;
  opacity: 0.9;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 5px;
  z-index: 1;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: $text-color-2;
  }

  &:not(:empty) {
    margin: 0;
  }
}
</style>
