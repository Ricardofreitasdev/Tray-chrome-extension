import Messages from './messages/index.js';
import ActionsController from './controller/index.js';

const browserController = (message) => {
  const action = ActionsController[message.action];

  if (typeof action !== 'function') {
    throw new Error(`Ação inválida: "${message.action}"`);
  }

  return action(message);
};

const messageListener = (message, _, sendResponse) => {
  browserController(message)
    .then((response) => sendResponse(response))
    .catch((error) => {
      sendResponse(error?.message || Messages.error('DEFAULT'));
    });

  return true;
};

chrome.runtime.onMessage.addListener(messageListener);
