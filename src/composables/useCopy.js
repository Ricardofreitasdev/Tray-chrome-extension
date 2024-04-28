import useNotification from './useNotification.js';

export function useCopy() {
  const { setNotification } = useNotification();

  const copy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setNotification(`${text} copiado para a área de transferência.`);
      })
      .catch((error) => {
        setNotification(`Erro ao copiar ${text}: ${error}`);
      });
  };

  return {
    copy,
  };
}
