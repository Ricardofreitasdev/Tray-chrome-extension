import { computed, ref, watch } from 'vue';

const notification = ref('');

export default function useNotification() {

  const setNotification = (message) => {
    notification.value = message;
  };

  const clearNotification = () => {
    notification.value = '';
  };

  const clearNotificationAfterDelay = (delay) => {
    setTimeout(() => {
      clearNotification();
    }, delay);
  };

  watch(
    () => notification.value,
    (newNotification) => {
      if (newNotification !== '') {
        clearNotificationAfterDelay(4000);
      }
    }
  );

  return {
    notification: computed(() => notification.value),
    setNotification,
  };
}
