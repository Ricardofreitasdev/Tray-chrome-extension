import { defineStore } from 'pinia';

export const useStoreDataStore = defineStore('storeData', {
  state: () => ({
    store: {
      id: '',
      session: '',
      title: '',
      url: '',
      currentUrl: '',
      isTray: '',
      hasCSP: '',
      server: '',
    },
    integrations: {
      gtm: '',
      analyticsGa4: '',
      analyticsUa: '',
      facebookPixel: '',
    },
    storeHistory: [],
    configs: {
      easy: [],
      central: [],
      dashboard: {},
    },
  }),

  getters: {
    isTray: (state) => !!state.store.isTray,
    hasCSP: (state) => !!state.store.hasCSP,
    hasServer: (state) => !!state.store.server,
    isEasy: (state) => state.store.currentUrl.includes('checkout'),
    isCentral: (state) => state.store.currentUrl.includes('my-account'),
    urlsEasy: (state) => state.configs.easy,
    urlsCentral: (state) => state.configs.central,
    hasDashboardConfig: (state) => !!state.configs.dashboard,
    hasDevUrls: (state) =>
      state.configs.easy.length > 0 || state.configs.central.length > 0,
  },

  actions: {
    setStoreData(storeData) {
      this.store = storeData;
    },
    setIntegrations(integrations) {
      this.integrations = integrations;
    },
    setStoreHistory(history) {
      this.storeHistory = history;
    },
    setConfigs(configs) {
      this.configs = configs;
    },
  },
});
