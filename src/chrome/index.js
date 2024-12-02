import Messages from './messages/index.js';
import ActionsController from './controller/index.js';
import MenuController from './menu/index.js';

const browserController = (message) => {
  const action = ActionsController[message.action];

  if (typeof action !== 'function') {
    throw new Error(`Ação inválida: "${message.action}"`);
  }

  return action(message);
};

const messageListener = (message, _, sendResponse) => {
  browserController(message)
    .then((response) => sendResponse(response))
    .catch((error) => {
      sendResponse(error?.message || Messages.error('DEFAULT'));
    });

  return true;
};

chrome.runtime.onMessage.addListener(messageListener);

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'opcoes',
    title: 'Tray Chrome Extension',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'openSecureDomain',
    title: 'Abrir a loja com domínio seguro',
    parentId: 'opcoes',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'openCommerceSuite',
    title: 'Abrir a loja com commercesuite',
    parentId: 'opcoes',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'openDashboard',
    title: 'Abrir o painel da loja',
    parentId: 'opcoes',
    contexts: ['selection'],
  });
});

const menuController = (info, tab) => {
  const action = MenuController[info.menuItemId];

  if (typeof action !== 'function') {
    throw new Error(`Ação inválida: "${info.action}"`);
  }

  return action(info, tab);
};

chrome.contextMenus.onClicked.addListener(menuController);
