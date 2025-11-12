import axios from 'axios';
import qs from 'qs';
import store from '@/store/index';
import { getUrlParam } from './index';
// import app from '../main';

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
    appid: 'wxb21a91c9a406e836',
  },
  transformRequest: [transformRequestData],
  timeout: 10000,
});
// 过滤请求
service.interceptors.request.use((config) => {
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
  return result.data;
});

export default service;
