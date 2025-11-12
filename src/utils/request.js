import axios from 'axios';
import qs from 'qs';
import store from '@/store/index';
import { getUrlParam } from './index';
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
    token: getUrlParam('token'),
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
  return config;
});
// 过滤响应
service.interceptors.response.use((result) => {
  if (result.data.message === '401') {
    console.log(result);
    // app.$toast.center('登录已过期,请删除小程序重新进入!');
    // 通知websocket关闭
    store.commit('app/setNeedLogin', true);
    return Promise.reject();
  }
  return result.data.data;
});

export default service;
