const ChromeExtension = {
  async getCurrentTab() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  },

  async sendChromeMessage(action, data) {
    const { id: tabId, url: tabUrl } = await this.getCurrentTab();

    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { tabId, tabUrl, action, data },
        (response) => {
          resolve(response);
        }
      );
    });
  },

  async action(action, data = {}) {
    return await this.sendChromeMessage(action, data);
  },
};

export default ChromeExtension;
