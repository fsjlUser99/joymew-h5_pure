import request from '../../utils/request';
import requestMp from '../../utils/requestMp';
import store from '../../store/index';

// 获取奖池金额
export function getPoolMoney() {
  return request.get(`jianLai/luckyDbList6?splid=${store.state.live.liveId}`);
}

// 获取转一转相关信息
export function getZyzInfo() {
  return request.get(
    `jianLai/getLuckyId6?splid=${store.state.live.liveId}&playInfo=hdGame89`,
  );
}

// 获取转一转排行榜列表
export function getZyzRank() {
  return request.get(`jianLai/luckyDbRank6?splid=${store.state.live.liveId}`);
}

// 转一转充值
export function zyzRecharge() {
  return requestMp.post('hmWxmoney/chongzhiNyn', {
    USER_ID: store.state.user.userId,
    splid: store.state.live.liveId,
    openid: store.state.user.openId,
    giftId: 'one',
  });
}

// 转一转开始game
export function startZyz(paramObj) {
  return request.post('jianLai/luckyDb6', {
    splid: store.state.live.liveId,
    playInfo: 'hdGame89',
    id: paramObj.turnId,
  });
}

// 转一转发送中奖信息
export function sendPrizeInfo(paramObj) {
  return request.post('jianLai/luoXuanWan6', {
    type: '2',
    gold: paramObj.gold,
    balance: paramObj.remainCoin,
    splid: store.state.live.liveId,
    id: paramObj.turnId,
  });
}
