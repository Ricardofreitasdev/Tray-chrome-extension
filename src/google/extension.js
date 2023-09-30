import {
  addFbDebugParam,
  changeUrl,
  getHistory,
  getInlineScriptsWithoutNonce,
  removeExternalJsFromUrl,
  removeLayoutByParam,
  setHistory,
  storeDataByHtml,
  storeIntegrationsByHtml,
} from "./actions/scripts.js";

import environments from "../config.js";

/* eslint-disable no-undef */
export const getStoreData = (message, sendResponse) => {
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
};

export const getStoreIntegrations = (message, sendResponse) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: message.tabId },
      func: storeIntegrationsByHtml,
    },
    function (result) {
      sendResponse(result[0].result);
    }
  );
};

export const layoutOff = (message, sendResponse) => {
  const { tabId, tabUrl } = message;
  const response = removeLayoutByParam(tabUrl);

  if (response.message.error) {
    sendResponse(response.message.error);
    return;
  }

  chrome.tabs.update(tabId, { url: response.newUrl }, function () {
    sendResponse(response.message.success);
  });
};

export const fbDebug = (message, sendResponse) => {
  const { tabId, tabUrl } = message;
  const response = addFbDebugParam(tabUrl);

  if (response.message.error) {
    sendResponse(response.message.error);
    return;
  }

  chrome.tabs.update(tabId, { url: response.newUrl }, function () {
    sendResponse(response.message.success);
  });
};


export const jsOff = (message, sendResponse) => {
  const { tabId, tabUrl } = message;
  const response = removeExternalJsFromUrl(tabUrl);

  if (response.message.error) {
    sendResponse(response.message.error);
    return;
  }

  chrome.tabs.update(tabId, { url: response.newUrl }, function () {
    sendResponse(response.message.success);
  });
};

export const getInlineScripts = (message, sendResponse) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: message.tabId },
      func: getInlineScriptsWithoutNonce,
    },
    function (result) {
      sendResponse(result[0].result);
    }
  );
};

export const getStoreHistory = async (message, sendResponse) => {
  const response = await getHistory();
  sendResponse(response);
};

export const changeEnvironment = async (message, sendResponse) => {
  const { tabId } = message;
  const response = changeUrl(message.data, environments);

  if (response.message.error) {
    sendResponse(response.message.error);
    return;
  }

  chrome.tabs.update(tabId, { url: response.newUrl }, function () {
    sendResponse(response.message.success);
  });
};

export const clearCache = (message, sendResponse) => {
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
      cookies: true,
      fileSystems: false,
      indexedDB: false,
      localStorage: true,
    },
    function () {
      sendResponse("Storage limpo com sucesso!");
    }
  );
};
