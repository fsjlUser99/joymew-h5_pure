import request from '@/utils/request';

export function loginByWechat(params) {
  return request.post('h5UserLogin/method1', params);
}

export function whoAmI() {
  return request.get('whoAmI');
}

export default {
  loginByWechat,
  whoAmI,
};
