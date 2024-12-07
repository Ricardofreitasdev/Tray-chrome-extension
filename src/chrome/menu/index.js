import Actions from '../actions/index.js';
import Scripts from '../scripts/index.js';

const MenuController = {
  async openSecureDomain(info) {
    const codigo = encodeURIComponent(info.selectionText);

    if (!MenuController.isValidStoreId(codigo)) {
      return;
    }

    try {
      const data = await fetch(
        `https://${codigo}.commercesuite.com.br/web_api/info`
      );

      const { secure_uri } = await data.json();
      chrome.tabs.create({ url: secure_uri });
    } catch (error) {
      console.error(error);
    }
  },

  async openCommerceSuite(info) {
    const codigo = encodeURIComponent(info.selectionText);

    if (!MenuController.isValidStoreId(codigo)) {
      return;
    }

    chrome.tabs.create({ url: `https://${codigo}.commercesuite.com.br` });
  },

  async openDashboard(info, tab) {
    const tabId = tab.id;
    const codigo = encodeURIComponent(info.selectionText);
    const configs = Actions.getConfig();

    if (!MenuController.isValidStoreId(codigo)) {
      return;
    }

    await chrome.tabs.update(tabId, {
      url: configs?.dashboard?.userId,
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

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: Scripts.getUserId,
    });

    await chrome.tabs.update(tabId, {
      url: configs?.dashboard?.url + codigo + '|' + result,
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
  },

  isValidStoreId(selectionText) {
    return /^[0-9]+$/.test(selectionText);
  },
};

export default MenuController;
