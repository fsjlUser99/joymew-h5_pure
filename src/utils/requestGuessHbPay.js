import axios from 'axios';
import qs from 'qs';

// 转换form-data
function transformRequestData(data) {
  if (data instanceof FormData) {
    return data;
  }
  return qs.stringify(data);
}

// 创建axios实例
const service = axios.create({
  baseURL: 'https://www.hudongmiao.com/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
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
  return result.data;
});

export default service;
