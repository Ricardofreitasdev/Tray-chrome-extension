const Scripts = {
  storeDataByHtml: function () {
    const trayCopy = document.querySelector('meta[name="copyright"]');
    const html = document.querySelector('html');

    const id =
      html.getAttribute('data-store') ||
      html.getAttribute('data-checkout-store_id');

    const session =
      html.getAttribute('data-session') ||
      html.getAttribute('data-checkout-session_id');

    const isTray = trayCopy
      ? trayCopy.getAttribute('content') === 'Tray Tecnologia'
      : false;

    const isPageviewScriptPresent = !!document.querySelector(
      'script#pageview-script'
    );

    const hasCSP = !!document.querySelector(
      'meta[http-equiv="Content-Security-Policy"]'
    );

    let server = '';
    const storeElement = document.querySelector(
      '[data-tray-tst="page_load_info"]'
    );

    const checkoutElement = document.getElementById('pageview-script');

    if (storeElement) {
      const text = storeElement.textContent || storeElement.innerText;

      const nodeRegex = /node:\s*(.*)/;
      const match = text.match(nodeRegex);

      if (match && match[1]) {
        server = match[1];
      }
    }

    if (checkoutElement) {
      const scriptSrc = checkoutElement.src;

      const regex = /checkout\/([^/]+)\/dist/;
      const match = scriptSrc.match(regex);
      if (match && match[1]) {
        server = match[1];
      }
    }

    const store = {
      id: id,
      session: session,
      title: document.title || '',
      url: window.location.origin,
      currentUrl: window.location.href,
      isTray: isTray || isPageviewScriptPresent,
      hasCSP: hasCSP,
      server: server,
    };

    return store;
  },

  storeIntegrationsByHtml: function () {
    const gtmCode =
      document
        .querySelector('script[src*="googletagmanager.com/gtm.js?id="]')
        ?.getAttribute('src')
        ?.match(/id=([^&]*)/)[1] ?? '';

    const ga4Id =
      document
        .querySelector('script[src*="googletagmanager.com/gtag/js?id=G-"]')
        ?.getAttribute('src')
        ?.match(/id=(.*?)&/)[1] ?? '';

    const UA =
      document
        .querySelector('script[src*="googletagmanager.com/gtag/js?id=UA-"]')
        ?.getAttribute('src')
        ?.match(/id=(UA-\w+-\d+)/)?.[1] ?? '';

    const fbPixelId =
      document
        .querySelector('script[src*="facebook-conversion.js?pixel="]')
        ?.getAttribute('src')
        ?.match(/pixel=(\d+)/)[1] ?? '';

    const integrations = {
      gtm: gtmCode,
      analyticsGa4: ga4Id,
      analyticsUa: UA,
      facebookPixel: fbPixelId,
    };

    return integrations;
  },

  getInlineScriptsWithoutNonce: function () {
    const inlineScripts = [];
    const scriptElements = document.querySelectorAll('script:not([src])');

    scriptElements.forEach((script) => {
      if (
        !script.hasAttribute('nonce') ||
        script.getAttribute('nonce') == null
      ) {
        const scriptContent = script.textContent;
        const limitedContent =
          scriptContent.length > 750
            ? scriptContent.slice(0, 750) + '...'
            : scriptContent;

        inlineScripts.push(limitedContent);
      }
    });
    const totalBlockedScripts = inlineScripts.length;
    return { inlineScripts, totalBlockedScripts };
  },

  goToDashboard: function () {
    console.log('goToDashboardScript');
  },
};

export default Scripts;
