import environments from '../../config.js';
import { Messages } from '../messages/index.js';
import {
  addFbDebugParam,
  changeUrl,
  getHistory,
  removeExternalJsFromUrl,
  removeLayoutByParam,
  setHistory,
} from '../actions/index.js';
import {
  getInlineScriptsWithoutNonce,
  storeDataByHtml,
  storeIntegrationsByHtml,
} from '../scripts/index.js';

const BackgroundService = {
  async getStoreData(message, sendResponse) {
    try {
      const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        func: storeDataByHtml,
      });

      if (result.isTray) {
        await setHistory(result);
      }

      sendResponse(result);
    } catch (error) {
      sendResponse(Messages.error('DEFAULT'));
    }
  },

  async getStoreIntegrations(message, sendResponse) {
    try {
      const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        func: storeIntegrationsByHtml,
      });

      sendResponse(result);
    } catch (error) {
      sendResponse(Messages.error('DEFAULT'));
    }
  },

  async getInlineScripts(message, sendResponse) {
    try {
      const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        func: getInlineScriptsWithoutNonce,
      });

      sendResponse(result);
    } catch (error) {
      sendResponse(Messages.error('DEFAULT'));
    }
  },

  async layoutOff(message, sendResponse) {
    const { tabId, tabUrl } = message;

    try {
      const { message, newUrl } = removeLayoutByParam(tabUrl);
      chrome.tabs.update(tabId, { url: newUrl }, () => sendResponse(message));
    } catch (error) {
      sendResponse(error.message);
    }
  },

  async fbDebug(message, sendResponse) {
    const { tabId, tabUrl } = message;
    try {
      const { message, newUrl } = addFbDebugParam(tabUrl);
      chrome.tabs.update(tabId, { url: newUrl }, () => sendResponse(message));
    } catch (error) {
      sendResponse(error.message);
    }
  },

  async jsOff(message, sendResponse) {
    const { tabId, tabUrl } = message;
    try {
      const { message, newUrl } = removeExternalJsFromUrl(tabUrl);
      chrome.tabs.update(tabId, { url: newUrl }, () => sendResponse(message));
    } catch (error) {
      sendResponse(error.message);
    }
  },

  async getStoreHistory(_, sendResponse) {
    try {
      const response = await getHistory();
      sendResponse(response);
    } catch (error) {
      sendResponse(error.message);
    }
  },

  async changeEnvironment(message, sendResponse) {
    const { tabId, data } = message;
    try {
      const { message, newUrl } = changeUrl(data, environments);
      chrome.tabs.update(tabId, { url: newUrl }, () => sendResponse(message));
    } catch (error) {
      sendResponse(error.message);
    }
  },

  async clearCache(_, sendResponse) {
    try {
      chrome.browsingData.remove(
        {
          originTypes: {
            protectedWeb: true,
            unprotectedWeb: true,
            extension: true,
          },
        },
        {
          cacheStorage: false,
          cookies: false,
          fileSystems: false,
          indexedDB: false,
          localStorage: true,
        },
        function () {
          sendResponse(Messages.success('STORAGE'));
        }
      );
    } catch (error) {
      sendResponse(Messages.error('STORAGE'));
    }
  },
};

export default BackgroundService;
