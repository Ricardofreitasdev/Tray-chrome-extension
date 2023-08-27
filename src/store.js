import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      notification: "",
    };
  },
  mutations: {
    setNotification(state, payload) {
      state.notification = payload;
    },
    clearNotification(state) {
      state.notification = "";
    },
  },
  actions: {
    clearNotificationAfterDelay({ commit }, delay) {
      setTimeout(() => {
        commit("clearNotification");
      }, delay);
    },
  },
});

// Observa as mudanças no estado
store.watch(
  (state) => state.notification,
  (newNotification) => {
    if (newNotification !== "") {
      store.dispatch("clearNotificationAfterDelay", 3000);
    }
  }
);

export default store;
