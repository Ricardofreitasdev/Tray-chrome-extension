<template>
  <div v-if="isTray">
    <p class="item">
      <a :href="whatsMyDns" target="_blank">Whats My Dns</a>
    </p>
    <p class="item">
      <a :href="pageSpeedUrl" target="_blank">Pagespeed</a>
    </p>
    <p class="item">
      <a :href="searchConsole" target="_blank">Search Console</a>
    </p>
    <p class="item">
      <a :href="sitemap" target="_blank">Sitemap</a>
    </p>
    <p class="item">
      <a :href="robots" target="_blank">Robots</a>
    </p>
    <p class="item">
      <a
        href="https://tagassistant.google.com"
        target="_blank"
      >Tag Assistant</a>
    </p>
    <p class="item">
      <a
        href="https://developers.tray.com.br"
        target="_blank"
      >
        Documentação API
      </a>
    </p>
    <p class="item">
      <a
        href="https://partners.tray.com.br/v/themes/comece-por-aqui/temas-tray"
        target="_blank"
      >
        Documentação Temas
      </a>
    </p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { utils } from "../../mixin/utils";
import { getStoreData } from "../../google/browser";
export default {
  name: "AppExternalLinks",
  mixins: [utils],

  setup() {
    const url = ref("");
    const currentUrl = ref("");
    const isTray = ref(false);

    onMounted(async () => {
      const storeData = await getStoreData();

      url.value = storeData.url;
      currentUrl.value = storeData.currentUrl;
      isTray.value = storeData.isTray;
    });

    const pageSpeedUrl = computed(() => {
      return `http://developers.google.com/speed/pagespeed/insights/?url=${url.value}`;
    });

    const searchConsole = computed(() => {
      return `https://search.google.com/test/rich-results?url=${currentUrl.value}`;
    });

    const whatsMyDns = computed(() => {
      return `https://www.whatsmydns.net/#A/${url.value}`;
    });

    const sitemap = computed(() => {
      return `${url.value}/sitemap.xml`;
    });

    const robots = computed(() => {
      return `${url.value}/robots.txt`;
    });

    return { pageSpeedUrl, searchConsole, whatsMyDns, sitemap, robots, isTray };
  },
};
</script>
