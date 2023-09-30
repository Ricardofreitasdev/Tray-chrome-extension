import {
  clearCache,
  getStoreData,
  getStoreIntegrations,
  jsOff,
  layoutOff,
  fbDebug,
  getStoreHistory,
  changeEnvironment,
  getInlineScripts,
} from "./extension.js";

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const actions = {
    getStoreData,
    getStoreIntegrations,
    layoutOff,
    fbDebug,
    jsOff,
    clearCache,
    getStoreHistory,
    changeEnvironment,
    getInlineScripts,
  };

  const action = actions[message.action];

  if (action) {
    action(message, sendResponse);
  }

  return true;
});
