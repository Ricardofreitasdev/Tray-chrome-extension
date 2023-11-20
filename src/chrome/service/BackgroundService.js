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
            await Actions.setHistory(response);
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
    try {
      const { message, newUrl } = Actions.removeExternalJsFromUrl(tabUrl);

      chrome.tabs.update(tabId, { url: newUrl }, function () {
        sendResponse(message);
      });
    } catch (error) {
      sendResponse(error.message);
    }
  }

  async getInlineScripts(message, sendResponse) {
    try {
      chrome.scripting.executeScript(
        {
          target: { tabId: message.tabId },
          func: InjectScripts.getInlineScriptsWithoutNonce,
        },
        function (result) {
          sendResponse(result[0].result);
        }
      );
    } catch (error) {
      sendResponse(ChromeMessages.getErrorMessage("DEFAULT"));
    }
  }

  async getStoreHistory(_, sendResponse) {
    try {
      const response = await Actions.getHistory();
      sendResponse(response);
    } catch (error) {
      sendResponse(error.message);
    }
  }

  async changeEnvironment(message, sendResponse) {
    const { tabId, data } = message;
    try {
      const { message, newUrl } = Actions.changeUrl(data, environments);

      chrome.tabs.update(tabId, { url: newUrl }, function () {
        sendResponse(message);
      });
    } catch (error) {
      sendResponse(error.message);
    }
  }

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
          sendResponse(ChromeMessages.getSuccessMessage("STORAGE"));
        }
      );
    } catch (error) {
      sendResponse(ChromeMessages.getErrorMessage("STORAGE"));
    }
  }
}

export default BackgroundService;
