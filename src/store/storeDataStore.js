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
    },
    integrations: {
      gtm: '',
      analyticsGa4: '',
      analyticsUa: '',
      facebookPixel: '',
    },
    storeHistory: [],
  }),

  getters: {
    isTray: (state) => !!state.store.isTray,
    hasCSP: (state) => !!state.store.hasCSP,
    isEasy: (state) => state.store.currentUrl.includes('checkout'),
    isCentral: (state) => state.store.currentUrl.includes('my-account'),
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
  },
});
