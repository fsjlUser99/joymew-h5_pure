import requestGuessHbPay from '../../utils/requestGuessHbPay';
import requestMp from '../../utils/requestMp';
import { getUrlParam } from '../../utils/index';
import store from '../../store/index';

// 猜红包支付
export function payGuessHb(pObj) {
  return requestGuessHbPay.post('kpPay/chbWxPay_h5', {
    splid: getUrlParam('splid'),
    shen_fen: pObj.identity,
    money: pObj.money,
    pay_type: 'wx',
    token: getUrlParam('token'),
  });
}

// 获取appId
export function getAppId() {
  return requestGuessHbPay.post('dengLuHm/qianMing', {
    url: window.location.href.split('#')[0],
  });
}

// 获取充值状态
export function getPayStatus() {
  return requestGuessHbPay.post('hb/getPhotoUserInfo', {
    splid: getUrlParam('splid'),
    token: getUrlParam('token'),
  });
}

// 获取猜红包状态
export function getGuessInfo() {
  return requestMp.post('guessRedPackage/getGuessInfo', {
    splid: store.state.live.liveId,
  });
}

// 参与猜红包
export function attendGuess(pObj) {
  return requestMp.post('guessRedPackage/robRedPackage', {
    splid: store.state.live.liveId,
    sort: pObj.sort,
    rob_sort: pObj.robSort,
    guess_money: pObj.guessMoney,
    red_package_id: pObj.hbId,
  });
}

// 猜红包充值
export function guessHbRecharge(paramObj) {
  return requestMp.post('hmWxmoney/chongzhiKbx', {
    splid: store.state.live.liveId,
    giftId: 'guess',
    total: paramObj.money,
    userId: store.state.user.userId,
    openid: store.state.user.openId,
  });
}
