import { Messages } from '../messages/index.js';

const FB_CONVERSIONS = 'fbConversionsDebug=1';
const REMOVE_THEME_PARAM = 'layoutOff=1';
const REMOVE_JS_CHECKOUT_PARAM = 'js=0';
const REMOVE_JS_FRONT_PARAM = 'jsOff=1';
const CENTRAL_PREFIX = 'my-account';
const CHECKOUT_PREFIX = 'checkout';

export const removeLayoutByParam = (url) => {
  const message = Messages.success('THEME_REMOVED');

  if (url.includes(CENTRAL_PREFIX) || url.includes(CHECKOUT_PREFIX)) {
    throw new Error(Messages.error('INVALID_PAGE'));
  }

  if (url.includes(REMOVE_THEME_PARAM)) {
    throw new Error(Messages.error('THEME_ALREADY_REMOVED'));
  }

  const newUrl = addParam(url, REMOVE_THEME_PARAM);

  return { newUrl, message };
};

export const addFbDebugParam = (url) => {
  const message = Messages.success('FB_CONVERSIONS_SUCCESS');

  if (url.includes(FB_CONVERSIONS)) {
    throw new Error(Messages.error('FB_CONVERSIONS_ERROR'));
  }

  const newUrl = addParam(url, FB_CONVERSIONS);

  return { newUrl, message };
};

export const removeExternalJsFromUrl = (url) => {
  let param = REMOVE_JS_FRONT_PARAM;

  const message = Messages.success('JS_REMOVED');

  if (url.includes(CENTRAL_PREFIX) || url.includes(CHECKOUT_PREFIX)) {
    param = REMOVE_JS_CHECKOUT_PARAM;
  }

  if (url.includes(param)) {
    throw new Error(Messages.error('JS_ALREADY_REMOVED'));
  }

  const hashIndex = url.indexOf('#');
  const urlWithoutHash = hashIndex >= 0 ? url.substring(0, hashIndex) : url;

  let newUrl = addParam(urlWithoutHash, param);

  if (hashIndex >= 0) {
    newUrl = `${newUrl}${url.substring(hashIndex)}`;
  }

  return { newUrl, message };
};

export const getHistory = async () => {
  const { history } = await new Promise((resolve, reject) => {
    chrome.storage.local.get('history', (data) => {
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

export const changeUrl = ({ currentUrl, environment }, config) => {
  const checkoutEnvironments = createEnvironmentMapping(
    config.easy,
    CHECKOUT_PREFIX
  );
  const centralEnvironments = createEnvironmentMapping(
    config.central,
    CENTRAL_PREFIX
  );

  const message = Messages.success('CHANGE_URL');

  let newUrl = currentUrl;

  if (currentUrl.includes(CHECKOUT_PREFIX)) {
    const urlMappingFunction = checkoutEnvironments[environment];
    newUrl = urlMappingFunction(currentUrl);

    return { newUrl, message };
  }

  if (currentUrl.includes(CENTRAL_PREFIX)) {
    const urlMappingFunction = centralEnvironments[environment];
    newUrl = urlMappingFunction(currentUrl);

    return { newUrl, message };
  }

  throw new Error(Messages.error('CHANGE_URL_ERROR'));
};

function addParam(url, param) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${param}`;
}

function createEnvironmentMapping(items, replaceText) {
  const mapping = {};
  items.forEach((item) => {
    mapping[item.environment] = (url) =>
      item.environment === 'dev' || item.environment === 'tmk'
        ? url.replace(/^https?:\/\/[^/]+/, item.url)
        : url.replace(replaceText, item.url);
  });
  return mapping;
}
