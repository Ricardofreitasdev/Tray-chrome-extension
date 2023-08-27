/* eslint-disable no-undef */
export const removeExternalJsFromUrl = (url) => {
  let param = "jsOff=1";
  const message = {
    error: "",
    success: "javascript externo removido com sucesso!",
  };

  if (url.includes("my-account") || url.includes("checkout")) {
    param = "js=0";
  }

  if (url.includes(param)) {
    message.error = "Essa pagina já esta sem o javascript externo";
    return { newUrl: null, message };
  }

  const hashIndex = url.indexOf("#");
  const urlWithoutHash = hashIndex >= 0 ? url.substring(0, hashIndex) : url;

  let newUrl = addParamToUrl(urlWithoutHash, param);

  if (hashIndex >= 0) {
    newUrl = `${newUrl}${url.substring(hashIndex)}`;
  }

  return { newUrl, message };
};

export const removeLayoutByParam = (url) => {
  const param = "layoutOff=1";

  const message = {
    error: "",
    success: "Tema removido com sucesso!",
  };

  if (url.includes("my-account") || url.includes("checkout")) {
    message.error = `Essa pagina não é um tema`;
    return { newUrl: null, message };
  }

  if (url.includes("layoutOff")) {
    message.error = `Essa pagina já esta sem o tema`;
    return { newUrl: null, message };
  }

  const newUrl = addParamToUrl(url, param);

  return { newUrl, message };
};

export const changeUrl = ({ currentUrl, environment }, config) => {
  const checkoutEnvironments = createEnvironmentMapping(
    config.easy,
    "checkout"
  );
  const centralEnvironments = createEnvironmentMapping(
    config.central,
    "my-account"
  );

  const message = {
    error: "",
    success: "Ambiente atualizado com sucesso!",
  };

  let newUrl = currentUrl;

  if (currentUrl.includes("checkout")) {
    const urlMappingFunction = checkoutEnvironments[environment];
    newUrl = urlMappingFunction(currentUrl);

    return { newUrl, message };
  }

  if (currentUrl.includes("my-account")) {
    const urlMappingFunction = centralEnvironments[environment];
    newUrl = urlMappingFunction(currentUrl);

    return { newUrl, message };
  }

  message.error = "Não é possível aplicar o ambiente nessa página";
  return { newUrl: null, message };
};

export const storeDataByHtml = () => {
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

  const store = {
    id: id,
    session: session,
    title: document.title || "",
    url: window.location.origin,
    currentUrl: window.location.href,
    isTray: isTray || isPageviewScriptPresent,
  };

  return store;
};

export const storeIntegrationsByHtml = () => {
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

export const getHistory = async () => {
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

export const setHistory = async (data) => {
  await new Promise((resolve, reject) => {
    const storageData = {
      id: data.id,
      url: data.url,
    };

    getHistory()
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

export const clearStorage = () => {
  chrome.storage.local.clear(() => {
    return "Armazenamento limpo com sucesso!";
  });
};

function addParamToUrl(url, param) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${param}`;
}

function createEnvironmentMapping(items, replaceText) {
  const mapping = {};
  items.forEach((item) => {
    mapping[item.environment] = (url) =>
      item.environment === "dev" || item.environment === "tmk"
        ? url.replace(/^https?:\/\/[^/]+/, item.url)
        : url.replace(replaceText, item.url);
  });
  return mapping;
}
