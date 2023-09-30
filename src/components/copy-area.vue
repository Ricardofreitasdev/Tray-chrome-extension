<template>
  <div
    class="copy-area"
    @mouseenter="showCopyIcon = true"
    @mouseleave="showCopyIcon = false"
  >
    <span title="click para copiar" @click="copyText">{{
      limitString(text)
    }}</span>
    <i
      v-show="showCopyIcon && !showCheckIcon"
      class="fa-regular fa-copy"
      @click="copyText"
    ></i>
    <i v-show="showCheckIcon" class="fa-solid fa-check"></i>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCopy } from "../composables/utils";
export default {
  name: "CopyArea",
  props: {
    text: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { copy } = useCopy();
    const showCopyIcon = ref(false);
    const showCheckIcon = ref(false);

    const copyText = () => {
      copy(props.text);
      showCopyIcon.value = false;
      showCheckIcon.value = true;

      setTimeout(() => {
        showCheckIcon.value = false;
      }, 3000);
    };

    const limitString = (text) => {
      const limit = 20;
      if (text.length > limit) {
        return text.substring(0, limit) + "...";
      } else {
        return text;
      }
    };

    return { 
      copyText,
      limitString,
      showCopyIcon,
      showCheckIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.copy-area {
  display: inline;
  margin: 0 5px;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: bold;
  }

  i {
    color: $icons-color;
    margin-left: 5px;
    font-size: 13px;
  }
}
</style>
