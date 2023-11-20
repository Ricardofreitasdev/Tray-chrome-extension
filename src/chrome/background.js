import BackgroundService from './service/BackgroundService.js';
const backgroundService = new BackgroundService();

chrome.runtime.onMessage.addListener((
  message,
  sender,
  sendResponse
  ) => {
  const method = backgroundService[message.action];

  if (method) {
    method(message, sendResponse, sender);
  }

  return true;
});
