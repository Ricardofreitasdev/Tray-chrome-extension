import { ChromeMessages } from "../ChromeMessages.js";

export default class Actions {
  static REMOVE_THEME_PARAM = "layoutOff=1";
  static REMOVE_JS_FRONT_PARAM = "jsOff=1";
  static REMOVE_JS_CHECKOUT_PARAM = "js=0";

  static FB_CONVERSIONS = "fbConversionsDebug=1";

  static CENTRAL_PREFIX = "my-account";
  static CHECKOUT_PREFIX = "checkout";

  static removeLayoutByParam(url) {
    const message = ChromeMessages.getSuccessMessage("THEME_REMOVED");

    if (
      url.includes(this.CENTRAL_PREFIX) ||
      url.includes(this.CHECKOUT_PREFIX)
    ) {
      throw new Error(ChromeMessages.getErrorMessage("INVALID_PAGE"));
    }

    if (url.includes(this.REMOVE_THEME_PARAM)) {
      throw new Error(ChromeMessages.getErrorMessage("THEME_ALREADY_REMOVED"));
    }

    const newUrl = this.addParam(url, this.REMOVE_THEME_PARAM);

    return { newUrl, message };
  }

  static addFbDebugParam = (url) => {
    const message = ChromeMessages.getSuccessMessage("FB_CONVERSIONS_SUCCESS");

    if (url.includes(this.FB_CONVERSIONS)) {
      throw new Error(ChromeMessages.getErrorMessage("FB_CONVERSIONS_ERROR"));
    }

    const newUrl = this.addParam(url, this.FB_CONVERSIONS);

    return { newUrl, message };
  };

  static removeExternalJsFromUrl = (url) => {
    let param = this.REMOVE_JS_FRONT_PARAM;

    const message = ChromeMessages.getSuccessMessage("JS_REMOVED");

    if (
      url.includes(this.CENTRAL_PREFIX) ||
      url.includes(this.CHECKOUT_PREFIX)
    ) {
      param = this.REMOVE_JS_CHECKOUT_PARAM;
    }

    if (url.includes(param)) {
      throw new Error(ChromeMessages.getErrorMessage("JS_ALREADY_REMOVED"));
    }

    const hashIndex = url.indexOf("#");
    const urlWithoutHash = hashIndex >= 0 ? url.substring(0, hashIndex) : url;

    let newUrl = this.addParam(urlWithoutHash, param);

    if (hashIndex >= 0) {
      newUrl = `${newUrl}${url.substring(hashIndex)}`;
    }

    return { newUrl, message };
  };

  static getHistory = async () => {
    const { history } = await new Promise((resolve, reject) => {
      chrome.storage.local.get("history", (data) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(data);
        }
      });
    });
    return history;
  };

  static setHistory = async (data) => {
    await new Promise((resolve, reject) => {
      const storageData = {
        id: data.id,
        url: data.url,
      };

      this.getHistory()
        .then((currentHistory) => {
          if (!currentHistory) {
            currentHistory = [];
          }

          if (currentHistory.some((item) => item.id === storageData.id)) {
            return;
          }

          currentHistory.push(storageData);

          if (currentHistory.length > 4) {
            currentHistory.shift();
          }

          chrome.storage.local.set({ history: currentHistory }, () => {
            resolve();
          });
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          resolve();
        });
    });
  };

  static changeUrl = ({ currentUrl, environment }, config) => {
    const checkoutEnvironments = this.createEnvironmentMapping(
      config.easy,
      this.CHECKOUT_PREFIX
    );
    const centralEnvironments = this.createEnvironmentMapping(
      config.central,
      this.CENTRAL_PREFIX
    );

    const message = ChromeMessages.getSuccessMessage("CHANGE_URL");

    let newUrl = currentUrl;

    if (currentUrl.includes(this.CHECKOUT_PREFIX)) {
      const urlMappingFunction = checkoutEnvironments[environment];
      newUrl = urlMappingFunction(currentUrl);

      return { newUrl, message };
    }

    if (currentUrl.includes(this.CENTRAL_PREFIX)) {
      const urlMappingFunction = centralEnvironments[environment];
      newUrl = urlMappingFunction(currentUrl);

      return { newUrl, message };
    }

    throw new Error(ChromeMessages.getErrorMessage("CHANGE_URL_ERROR"));
  };

  static addParam(url, param) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${param}`;
  }

  static createEnvironmentMapping(items, replaceText) {
    const mapping = {};
    items.forEach((item) => {
      mapping[item.environment] = (url) =>
        item.environment === "dev" || item.environment === "tmk"
          ? url.replace(/^https?:\/\/[^/]+/, item.url)
          : url.replace(replaceText, item.url);
    });
    return mapping;
  }
}
