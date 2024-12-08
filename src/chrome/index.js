import ActionsController from './controller/actionsController.js';
import MenuController from './controller/menuController.js';
import Helpers from './helpers/index.js';
import Messages from './messages/index.js';
import Scripts from './scripts/index.js';

const browserController = (message) => {
  const action = ActionsController[message.action];

  if (typeof action !== 'function') {
    throw new Error(`Ação inválida: "${message.action}"`);
  }

  return action(message);
};

const menuController = async (info, tab) => {
  const action = MenuController[info.menuItemId];

  if (typeof action !== 'function') {
    throw new Error(`Ação inválida: "${info.action}"`);
  }

  return action(info, tab);
};

const messageListener = (message, _, sendResponse) => {
  browserController(message)
    .then((response) => sendResponse(response))
    .catch((error) => {
      sendResponse(error?.message || Messages.error('DEFAULT'));
    });

  return true;
};

const menuListener = async (info, tab) => {
  menuController(info, tab)
    .then(() => {})
    .catch(async (error) => {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: Scripts.injectMessageInScreen,
        args: [error.message],
      });
    });

  return true;
};

const contextMenus = {
  create() {
    chrome.contextMenus.create({
      id: 'openSecureDomain',
      title: 'Abrir domínio seguro',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      id: 'openCommerceSuite',
      title: 'Abrir CommerceSuite',
      contexts: ['selection'],
    });

    const configs = Helpers.getConfigs();
    if (configs?.dashboard?.userId) {
      chrome.contextMenus.create({
        id: 'openDashboard',
        title: 'Abrir Dashboard',
        contexts: ['selection'],
      });
    }
  },
};

chrome.runtime.onInstalled.addListener(contextMenus.create());
chrome.contextMenus.onClicked.addListener(menuListener);
chrome.runtime.onMessage.addListener(messageListener);
