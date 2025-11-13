import request from '@/utils/request';

// 更清晰的命名和文档
/**
 * H5用户登录
 * @param {Object} params
 * @param {string} params.splid - 活动ID(liveId)
 * @returns {Promise} 返回包含token的结果
 */
export function h5UserLogin(params) {
  return request.post('h5UserLogin/method1', params);
}

export default {
  h5UserLogin,
};
