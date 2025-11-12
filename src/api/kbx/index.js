import requestMp from '../../utils/requestMp';
import store from '../../store/index';

// 开宝箱充值
export function kbxRecharge(paramObj) {
  return requestMp.post('hmWxmoney/chongzhiKbx', {
    userId: store.state.user.userId,
    splid: store.state.live.liveId,
    openid: store.state.user.openId,
    giftId: 'kbx',
    total: paramObj.money,
  });
}

// 抢宝箱
export function robBox(paramObj) {
  return requestMp.post('kakaluote/guipaiqigong6', {
    order_by: paramObj.sort,
    boxIdList: paramObj.boxIds,
    splid: store.state.live.liveId,
  });
}

// 获取宝箱列表
export function getBoxesList() {
  return requestMp.get(`kakaluote/chaojisaiyaren6?splid=${store.state.live.liveId}`);
}

// 获取game状态
export function getGameState() {
  return requestMp.get(`play/baiyan6?splid=${store.state.live.liveId}&userId=${store.state.user.userId}`);
}

// 获取我的宝箱
export function getMyBoxes() {
  return requestMp.get(`kakaluote/jianlai6?splid=${store.state.live.liveId}`);
}

// 获取红包列表
export function getHbList() {
  return requestMp.get(`hbqController/showHbqList6?splid=${store.state.live.liveId}`);
}

// 买红包
export function buyHb(paramObj) {
  return requestMp.post('hbqController/hbqPay6', {
    order_by: paramObj.sort,
    eggIdList: paramObj.hbIds,
    splid: store.state.live.liveId,
  });
}

// 红包墙充值
export function hbqRecharge(paramObj) {
  return requestMp.post('hmWxmoney/chongzhiKbx', {
    userId: store.state.user.userId,
    splid: store.state.live.liveId,
    openid: store.state.user.openId,
    giftId: 'hbq',
    total: paramObj.money,
  });
}

// 获取红包排行榜
export function getHbRankList() {
  return requestMp.get(`hbqController/hbqRankList6?splid=${store.state.live.liveId}`);
}
