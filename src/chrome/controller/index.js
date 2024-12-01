import Messages from '../messages/index.js';
import Actions from '../actions/index.js';
import Scripts from '../scripts/index.js';

const ActionsController = {
  async getStoreData({ tabId }) {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: Scripts.storeDataByHtml,
    });

    if (result.isTray) {
      await Actions.setHistory(result);
    }

    return result;
  },

  async getStoreIntegrations({ tabId }) {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: Scripts.storeIntegrationsByHtml,
    });

    return result;
  },

  async getInlineScripts({ tabId }) {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: Scripts.getInlineScriptsWithoutNonce,
    });

    return result;
  },

  async layoutOff({ tabId, tabUrl }) {
    const { message, newUrl } = Actions.removeLayoutByParam(tabUrl);
    chrome.tabs.update(tabId, { url: newUrl });
    return message;
  },

  async fbDebug({ tabId, tabUrl }) {
    const { message, newUrl } = Actions.addFbDebugParam(tabUrl);
    chrome.tabs.update(tabId, { url: newUrl });
    return message;
  },

  async goToDashboard({ tabId }) {
    const configs = Actions.getConfig();

    await chrome.tabs.update(tabId, {
      url: configs?.dashboard?.url,
    });

    await new Promise((resolve) => {
      chrome.tabs.onUpdated.addListener(
        function listener(tabIdUpdated, changeInfo) {
          if (tabIdUpdated === tabId && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            resolve();
          }
        }
      );
    });

    await chrome.scripting.executeScript({
      target: { tabId },
      func: Scripts.goToDashboard,
    });

    return Messages;
  },

  async jsOff({ tabId, tabUrl }) {
    const { message, newUrl } = Actions.removeExternalJsFromUrl(tabUrl);
    chrome.tabs.update(tabId, { url: newUrl });
    return message;
  },

  async getStoreHistory() {
    return await Actions.getHistory();
  },

  async changeEnvironment({ tabId, data }) {
    const { message, newUrl } = Actions.changeUrl(data);
    chrome.tabs.update(tabId, { url: newUrl });
    return message;
  },

  async clearCache() {
    await chrome.browsingData.remove(
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
      }
    );
    return Messages.success('STORAGE');
  },

  async awaitToUpdate(tabId) {
    await new Promise((resolve) => {
      chrome.tabs.onUpdated.addListener(
        function listener(tabIdUpdated, changeInfo) {
          if (tabIdUpdated === tabId && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            resolve();
          }
        }
      );
    });
  },
};

export default ActionsController;
