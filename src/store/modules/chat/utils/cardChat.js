import store from '@/store';

let timer = null;
/**
 * 判断是否可以发送卡片消息
 */
export const canSendCardChat = () => {
  // 定制婚礼堂小程序可以发
  if (store.state.live.dz_hltcard && store.state.app.hotelReserveVisible) {
    return true;
  }
  // 字节小程序不可以发
  if (store.state.app.env === 'tt') {
    return false;
  }
  // 被拉黑了不可以发
  if (store.state.user.isForbidBuyHbq) {
    return false;
  }
  // 非互动小程序不可以发
  if (!store.state.app.mpType) {
    return false;
  }
  return store.getters['user/cardChatSwitch'];
};

/**
 * 创建发卡片消息的任务
 * @param {number} n 多少秒后发送
 */
export const createCardChatTask = (n) => {
  // 如果任务进行中，则重置计时器
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  timer = setTimeout(() => {
    store.commit('chat/addCardChat');
  }, n * 1000);
};
