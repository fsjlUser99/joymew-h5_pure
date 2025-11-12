import store from '../../store/index';
import request from '../../utils/request';

//  获取用户信息
export function getUserInfo() {
  return request.post('/pair/getPairUserInfo', {
    splid: store.state.live.liveId,
  });
}

//  保存信息
export function saveUserInfo(params) {
  return request.post('/pair/savePairUserInfo', {
    splid: store.state.live.liveId,
    sex: params.sex,
    wx_name: params.wx_name,
    avator: params.avator,
    age_type: params.age,
  });
}

//  获取历史匹配结果
export function getRecordResult() {
  return request.post('/pair/getMyPairResult', {
    splid: store.state.live.liveId,
  });
}
