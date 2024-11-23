<template>
  <div v-if="$store.isTray">
    <p v-for="link in externalLinks" :key="link.label" class="item">
      <a :href="link.url" target="_blank">{{ link.label }}</a>
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStoreDataStore } from '../../store/storeDataStore';

const $store = useStoreDataStore();

const externalLinks = computed(() => {
  return [
    {
      label: 'Whats My Dns',
      url: `https://www.whatsmydns.net/#A/${$store.store.url}`,
    },
    {
      label: 'Pagespeed',
      url: `http://developers.google.com/speed/pagespeed/insights/?url=${$store.store.url}`,
    },
    {
      label: 'Search Console',
      url: `https://search.google.com/test/rich-results?url=${$store.store.currentUrl}`,
    },
    {
      label: 'Sitemap',
      url: `${$store.store.url}/sitemap.xml`,
    },
    {
      label: 'Robots',
      url: `${$store.store.url}/robots.txt`,
    },
    {
      label: 'Tag Assistant',
      url: 'https://tagassistant.google.com',
    },
    {
      label: 'Documentação API',
      url: 'https://developers.tray.com.br',
    },
    {
      label: 'Documentação Temas',
      url: 'https://partners.tray.com.br/v/themes/comece-por-aqui/temas-tray',
    },
  ];
});
</script>
