import store from "../store.js";

export const utils = {
  methods: {
    copy(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          store.commit(
            "setNotification",
            `${text} copiado para a área de transferência.`
          );
        })
        .catch((error) => {
          store.commit("setNotification", `Erro ao copiar ${text}:`, error);
        });
    },
  },
};
