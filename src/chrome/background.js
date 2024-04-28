import { Messages } from './messages/index.js';
import BackgroundService from './service/index.js';

const listener = (message, sender, sendResponse) => {
  const method = BackgroundService[message.action];

  if (method) {
    try {
      method(message, sendResponse, sender);
    } catch (error) {
      sendResponse(Messages.error('DEFAULT'));
    }
  }

  return true;
};

chrome.runtime.onMessage.addListener(listener);
