const TOKEN_STORAGE_KEY = 'joymew_h5_token';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
  } catch (err) {
    console.warn('Unable to access localStorage when getting token', err);
    return '';
  }
}

export function setToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch (err) {
    console.warn('Unable to access localStorage when setting token', err);
  }
}

export function clearToken() {
  setToken('');
}

export function buildWechatOAuthUrl({ appId, redirectUri, scope = 'snsapi_userinfo', state = '' }) {
  const encodedRedirect = encodeURIComponent(redirectUri);
  const encodedState = encodeURIComponent(state);
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodedRedirect}&response_type=code&scope=${scope}&state=${encodedState}#wechat_redirect`;
}

export default {
  getToken,
  setToken,
  clearToken,
  buildWechatOAuthUrl,
};
