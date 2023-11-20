import { ChromeMessages } from "../ChromeMessages.js";

export default class Actions {
  static REMOVE_THEME_PARAM = "layoutOff=1";
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

  static addParam(url, param) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${param}`;
  }
}
