import { ChromeMessages } from "./ChromeMessages.js";
import BackgroundService from "./service/BackgroundService.js";
const backgroundService = new BackgroundService();

const listener = (message, sender, sendResponse) => {
  const method = backgroundService[message.action];

  if (method) {
    try {
      method(message, sendResponse, sender);
    } catch (error) {
      sendResponse(ChromeMessages.getErrorMessage("DEFAULT"));
    }
  }

  return true;
};

chrome.runtime.onMessage.addListener(listener);
