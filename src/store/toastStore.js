import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
  state: () => ({
    notifications: [],
    lastNotification: '',
  }),

  actions: {
    push(message) {
      const isProcessingClearNotification = this.notifications.some(
        (notification) => notification.message === message
      );

      if (isProcessingClearNotification) {
        return;
      }

      const id = Math.floor(Math.random() * 1000);
      this.notifications.unshift({ message, id });

      setTimeout(() => {
        this.clear(id);
      }, 3000);
    },

    clear(id) {
      this.notifications = this.notifications.filter(
        (notification) => notification.id !== id
      );
    },
  },

  getters: {
    hasNotifications() {
      return this.notifications.length > 0;
    },
  },
});
