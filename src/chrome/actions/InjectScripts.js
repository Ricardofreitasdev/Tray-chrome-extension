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

  static storeIntegrationsByHtml = () => {
    const gtmCode =
      document
        .querySelector('script[src*="googletagmanager.com/gtm.js?id="]')
        ?.getAttribute("src")
        ?.match(/id=([^&]*)/)[1] ?? "";

    const ga4Id =
      document
        .querySelector('script[src*="googletagmanager.com/gtag/js?id=G-"]')
        ?.getAttribute("src")
        ?.match(/id=(.*?)&/)[1] ?? "";

    const UA =
      document
        .querySelector('script[src*="googletagmanager.com/gtag/js?id=UA-"]')
        ?.getAttribute("src")
        ?.match(/id=(UA-\w+-\d+)/)?.[1] ?? "";

    const fbPixelId =
      document
        .querySelector('script[src*="facebook-conversion.js?pixel="]')
        ?.getAttribute("src")
        ?.match(/pixel=(\d+)/)[1] ?? "";

    const integrations = {
      gtm: gtmCode,
      analyticsGa4: ga4Id,
      analyticsUa: UA,
      facebookPixel: fbPixelId,
    };

    return integrations;
  };

  static getInlineScriptsWithoutNonce = () => {
    const inlineScripts = [];
    const scriptElements = document.querySelectorAll("script:not([src])");

    scriptElements.forEach((script) => {
      if (
        !script.hasAttribute("nonce") ||
        script.getAttribute("nonce") == null
      ) {
        const scriptContent = script.textContent;
        const limitedContent =
          scriptContent.length > 750
            ? scriptContent.slice(0, 750) + "..."
            : scriptContent;

        inlineScripts.push(limitedContent);
      }
    });
    const totalBlockedScripts = inlineScripts.length;
    return { inlineScripts, totalBlockedScripts };
  };
}
