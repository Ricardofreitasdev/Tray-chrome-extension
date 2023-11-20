export default class ChromeExtension {

  async getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
  }

  async sendChromeMessage(action, data) {
    const { id: tabId, url: tabUrl } = await this.getCurrentTab();

    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ tabId, tabUrl, action, data }, (response) => {
        resolve(response);
      });
    });
  }

  async getStoreData() {
    return await this.sendChromeMessage("getStoreData");
  }
  
  async clearCache() {
    return await this.sendChromeMessage("clearCache");
  }
  
  async layoutOff() {
    return await this.sendChromeMessage("layoutOff");
  }

  async jsOff() {
    return await this.sendChromeMessage("jsOff");
  }

  async fbDebug() {
    return await this.sendChromeMessage("fbDebug");
  }

  async getStoreHistory() {
    return await this.sendChromeMessage("getStoreHistory");
  }

  async getStoreIntegrations() {
    return await this.sendChromeMessage("getStoreIntegrations");
  }

  async changeEnvironment(data) {
    return await this.sendChromeMessage("changeEnvironment", data);
  }

  async getInlineScripts() {
    return await this.sendChromeMessage("getInlineScripts");
  }
}
