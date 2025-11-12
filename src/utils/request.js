import axios from 'axios';
import qs from 'qs';
import store from '@/store/index';
import router from '@/router';
import { getToken, clearToken } from './auth';
import { recommendGiftLogic, funcTipLogic } from './service';
// import app from '../main';

// 执行弹出礼物逻辑
const resetRecommendInterval = recommendGiftLogic();
// 执行弹出功能提示逻辑
const resetFuncTipInterval = funcTipLogic();
// 转换form-data
function transformRequestData(data) {
  if (data instanceof FormData) {
    return data;
  }
  return qs.stringify(data);
}
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [transformRequestData],
  timeout: 10000,
});
// 过滤请求(每发送一次请求则重置定时器)
service.interceptors.request.use((config) => {
  // 重置弹出礼物定时器
  resetRecommendInterval();
  // 重置功能提示定时器
  resetFuncTipInterval();
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.token = token;
  } else {
    delete config.headers.Authorization;
    delete config.headers.token;
  }
  return config;
});
// 过滤响应
service.interceptors.response.use(
  (result) => {
    if (result.data && result.data.message === '401') {
      console.log(result);
      // 通知websocket关闭
      handleUnauthorized();
      return Promise.reject(result);
    }
    return result.data.data;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  },
);

function handleUnauthorized() {
  clearToken();
  store.commit('app/setNeedLogin', true);
  const currentRoute = router.currentRoute;
  if (currentRoute && currentRoute.name !== 'login') {
    router.replace({
      name: 'login',
      query: {
        redirect: currentRoute.fullPath,
      },
    });
  }
}

export default service;
