import request from '../../utils/request';
import requestMp from '../../utils/requestMp';
import store from '../../store/index';

// 获取奖池金额
export function getPoolMoney() {
  return request.get(`jianLai/luckyDbList6?splid=${store.state.live.liveId}`);
}

// 获取扭一扭相关信息
export function getNynInfo() {
  return request.get(
    `jianLai/getLuckyId6?splid=${store.state.live.liveId}&playInfo=hdGame88`,
  );
}

// 获取扭一扭排行榜列表
export function getNynRank() {
  return request.get(`jianLai/luckyDbRank6?splid=${store.state.live.liveId}`);
}

// 扭一扭充值
export function nynRecharge() {
  return requestMp.post('hmWxmoney/chongzhiNyn', {
    USER_ID: store.state.user.userId,
    splid: store.state.live.liveId,
    openid: store.state.user.openId,
    giftId: 'one',
  });
}

// 扭一扭开始game
export function startNyn(paramObj) {
  return request.post('jianLai/niuyiniu6', {
    splid: store.state.live.liveId,
    playInfo: 'hdGame88',
    id: paramObj.turnId,
  });
}

// 扭一扭发送中奖信息
export function sendPrizeInfo(paramObj) {
  return request.post('jianLai/luoXuanWan6', {
    type: '2',
    gold: paramObj.gold,
    balance: paramObj.remainCoin,
    splid: store.state.live.liveId,
    id: paramObj.turnId,
  });
}
