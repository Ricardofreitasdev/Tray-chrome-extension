import {
  changeUrl,
  getHistory,
  getInlineScriptsWithoutNonce,
  removeExternalJsFromUrl,
  setHistory,
} from "../actions/scripts.js";

import environments from "../../config.js";
import Actions from "../actions/Actions.js";
import InjectScripts from "../actions/InjectScripts.js";
import { ChromeMessages } from "../ChromeMessages.js";

class BackgroundService {
  async getStoreData(message, sendResponse) {
    try {
      chrome.scripting
        .executeScript({
          target: { tabId: message.tabId },
          func: InjectScripts.storeDataByHtml,
        })
        .then(async (result) => {
          if (!result) return;

          const response = result[0].result;

          if (response.isTray) {
            await setHistory(response);
          }

          sendResponse(response);
        });
    } catch (error) {
      sendResponse(ChromeMessages.getErrorMessage("DEFAULT"));
    }
  }

  async getStoreIntegrations(message, sendResponse) {
    try {
      chrome.scripting.executeScript(
        {
          target: { tabId: message.tabId },
          func: InjectScripts.storeIntegrationsByHtml,
        },
        function (result) {
          sendResponse(result[0].result);
        }
      );
    } catch (error) {
      sendResponse(ChromeMessages.getErrorMessage("DEFAULT"));
    }
  }

  async layoutOff(message, sendResponse) {
    const { tabId, tabUrl } = message;

    try {
      const { message, newUrl } = Actions.removeLayoutByParam(tabUrl);

      chrome.tabs.update(tabId, { url: newUrl }, function () {
        sendResponse(message);
      });
    } catch (error) {
      sendResponse(error.message);
    }
  }

  async fbDebug(message, sendResponse) {
    const { tabId, tabUrl } = message;
    try {
      const { message, newUrl } = Actions.addFbDebugParam(tabUrl);

      chrome.tabs.update(tabId, { url: newUrl }, function () {
        sendResponse(message);
      });
    } catch (error) {
      sendResponse(error.message);
    }
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
