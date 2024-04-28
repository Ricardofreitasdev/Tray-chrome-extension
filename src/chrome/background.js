import { Messages } from './messages/index.js';
import BackgroundService from './service/index.js';
const backgroundService = new BackgroundService();

const listener = (message, sender, sendResponse) => {
  const method = backgroundService[message.action];

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
