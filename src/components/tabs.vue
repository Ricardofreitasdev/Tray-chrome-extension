<template>
  <div>
    <div class="tab-buttons">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tab-area">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-content', { 'tab-active': activeTab === index }]"
        class="tab-content"
      >
        <slot :name="tabName(index)" />
      </div>
    </div>
  </div>
</template>

<script>
import environments from "../config";

export default {
  name: "Tabs",
  data() {
    return {
      activeTab: 0,
      tabs: ["Loja", "Ferramentas"],
    };
  },

  mounted() {
    this.hasEnvs();
  },

  methods: {
    tabName(index) {
      return `tab-content-${index}`;
    },

    hasEnvs() {
      const hasEnvs = environments.easy || environments.central;
      if (hasEnvs) {
        this.tabs.push("Dev");
      }
    },
  },
};
</script>

<style lang="scss">
.tab-buttons {
  display: flex;
}
.tab-buttons button {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border: 2px solid $bg-color-2;
  padding: 16px 16px;
  cursor: pointer;
  flex: 1;
}

.tab-buttons button.active {
  border-bottom: 2px solid $bg-color-2;
  font-weight: bold;
  color: $text-color-2;
}

.tab-area {
  position: relative;
}

.tab-content {
  position: absolute;
  top: 15px;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.5s;
  transform: translateX(-50px);
}

.tab-content.tab-active {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0%);
}
</style>
