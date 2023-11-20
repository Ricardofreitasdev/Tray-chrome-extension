import { ChromeMessages } from "../ChromeMessages.js";

export default class Actions {
  static REMOVE_THEME_PARAM = "layoutOff=1";
  static REMOVE_JS_FRONT_PARAM = "jsOff=1";
  static REMOVE_JS_CHECKOUT_PARAM = "js=0";

  static FB_CONVERSIONS = "fbConversionsDebug=1";

  static CENTRAL_PREFIX = "my-account";
  static CHECKOUT_PREFIX = "my-account";

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

  static addParam(url, param) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${param}`;
  }
}
