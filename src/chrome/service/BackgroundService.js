import {
  addFbDebugParam,
  changeUrl,
  getHistory,
  getInlineScriptsWithoutNonce,
  removeExternalJsFromUrl,
  setHistory,
  storeDataByHtml,
  storeIntegrationsByHtml,
} from "../actions/scripts.js";

import environments from "../../config.js";
import Actions from "../actions/Actios.js";

class BackgroundService {
  async getStoreData(message, sendResponse) {
    chrome.scripting.executeScript(
      {
        target: { tabId: message.tabId },
        func: storeDataByHtml,
      },
      async function (result) {
        if (!result) {
          return;
        }

        const response = result[0].result;

        if (response.isTray) {
          await setHistory(response);
        }

        sendResponse(response);
      }
    );
  }

  async getStoreIntegrations(message, sendResponse) {
    chrome.scripting.executeScript(
      {
        target: { tabId: message.tabId },
        func: storeIntegrationsByHtml,
      },
      function (result) {
        sendResponse(result[0].result);
      }
    );
  }

  async layoutOff(message, sendResponse) {
    const { tabId, tabUrl } = message;

    try {
      const response = Actions.removeLayoutByParam(tabUrl);

      chrome.tabs.update(tabId, { url: response.newUrl }, function () {
        sendResponse(response.message);
      });
    } catch (error) {
      sendResponse(error.message);
    }
  }

  async fbDebug(message, sendResponse) {
    const { tabId, tabUrl } = message;
    const response = addFbDebugParam(tabUrl);

    if (response.message.error) {
      sendResponse(response.message.error);
      return;
    }

    chrome.tabs.update(tabId, { url: response.newUrl }, function () {
      sendResponse(response.message.success);
    });
  }

  async jsOff(message, sendResponse) {
    const { tabId, tabUrl } = message;
    const response = removeExternalJsFromUrl(tabUrl);

    if (response.message.error) {
      sendResponse(response.message.error);
      return;
    }

    chrome.tabs.update(tabId, { url: response.newUrl }, function () {
      sendResponse(response.message.success);
    });
  }

  async getInlineScripts(message, sendResponse) {
    chrome.scripting.executeScript(
      {
        target: { tabId: message.tabId },
        func: getInlineScriptsWithoutNonce,
      },
      function (result) {
        sendResponse(result[0].result);
      }
    );
  }

  async getStoreHistory(message, sendResponse) {
    const response = await getHistory();
    sendResponse(response);
  }

  async changeEnvironment(message, sendResponse) {
    const { tabId } = message;
    const response = changeUrl(message.data, environments);

    if (response.message.error) {
      sendResponse(response.message.error);
      return;
    }
    chrome.tabs.update(tabId, { url: response.newUrl }, function () {
      sendResponse(response.message.success);
    });
  }

  async clearCache(message, sendResponse) {
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
        sendResponse("Storage limpo com sucesso!");
      }
    );
  }
}

export default BackgroundService;
