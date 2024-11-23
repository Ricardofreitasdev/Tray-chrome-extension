import useNotification from './useNotification.js';

export default function useCopy() {
  const { setNotification } = useNotification();

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotification(`${text} copiado para a área de transferência.`);
    } catch (error) {
      setNotification(`Erro ao copiar ${text}: ${error}`);
    }
  };

  return {
    copy,
  };
}
