import request from '../../utils/request';
import store from '../../store/index';

// 获取当前人员信息
export function getCurrentMarkUserInfo() {
  return request.post('vote/getPlayerInfo', {
    splid: store.state.live.liveId,
  });
}

// 评分
export function sendMark(paramObj) {
  return request.post('vote/savePlayerScore', {
    splid: store.state.live.liveId,
    order_by: paramObj.orderBy,
    target_id: paramObj.markUserId,
    score: paramObj.score,
  });
}
