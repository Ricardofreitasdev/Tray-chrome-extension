import { reactive, toRefs } from 'vue';

const state = reactive({
  storeData: {
    id: '',
    session: '',
    title: '',
    url: '',
    currentUrl: '',
    isTray: '',
    hasCSP: '',
  },
});

export default function useStoreData() {
  const setStoreData = (store) => {
    state.storeData = store;
  };

  return {
    ...toRefs(state.storeData),
    setStoreData,
  };
}
