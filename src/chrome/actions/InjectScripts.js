export default class InjectScripts {
  static storeDataByHtml = () => {
    const trayCopy = document.querySelector('meta[name="copyright"]');
    const html = document.querySelector("html");

    const id =
      html.getAttribute("data-store") ||
      html.getAttribute("data-checkout-store_id");

    const session =
      html.getAttribute("data-session") ||
      html.getAttribute("data-checkout-session_id");

    const isTray = trayCopy
      ? trayCopy.getAttribute("content") === "Tray Tecnologia"
      : false;

    const isPageviewScriptPresent = !!document.querySelector(
      "script#pageview-script"
    );

    const hasCSP = !!document.querySelector(
      'meta[http-equiv="Content-Security-Policy"]'
    );

    const store = {
      id: id,
      session: session,
      title: document.title || "",
      url: window.location.origin,
      currentUrl: window.location.href,
      isTray: isTray || isPageviewScriptPresent,
      hasCSP: hasCSP,
    };

    return store;
  };
}
