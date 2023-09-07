/* eslint-disable no-undef */
function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
}

function sendChromeMessage(action, data) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const { id: tabId, url: tabUrl } = await getActiveTab();

    chrome.runtime.sendMessage({ tabId, tabUrl, action, data }, (response) => {
      resolve(response);
    });
  });
}

export const getStoreData = async () => await sendChromeMessage("getStoreData");

export const clearCache = async () => await sendChromeMessage("clearCache");

export const layoutOff = async () => await sendChromeMessage("layoutOff");

export const jsOff = async () => await sendChromeMessage("jsOff");

export const getStoreHistory = async () =>
  await sendChromeMessage("getStoreHistory");

export const getStoreIntegrations = async () =>
  await sendChromeMessage("getStoreIntegrations");

export const changeEnvironment = async (data) =>
  await sendChromeMessage("changeEnvironment", data);

export const getInlineScripts = async () =>
  await sendChromeMessage("getInlineScripts");
