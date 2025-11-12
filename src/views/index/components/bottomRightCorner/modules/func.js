import store from '@/store';
import Vue from 'vue';
import wxApi from '@/utils/wxApi';
import router from '@/router';

/**
 * 检查是否有权限执行后续操作
 */
export const checkPermission = () => {
  if (store.state.user.isForbidBuyHbq) {
    return false;
  }
  if (store.state.live.isLocationInvalid) {
    Vue.prototype.$toast.center(store.state.live.locationInvalidReason);
    return false;
  }
  return true;
};

/**
 * 得到红包口袋充值配置信息
 * @returns {{templateMode:boolean, tmpHbkdRechargeListStr:string}}
 */
const _getHBKDRechargeConfig = () => {
  const { hbkdRechargeList } = store.state.live;
  const { hbkdRechargeNewList } = store.state.live;
  let tmpHbkdRechargeListStr;
  const templateMode = hbkdRechargeNewList.length > 0;
  if (templateMode) {
    tmpHbkdRechargeListStr = JSON.stringify(hbkdRechargeNewList);
  } else {
    tmpHbkdRechargeListStr = hbkdRechargeList;
  }
  return {
    templateMode,
    tmpHbkdRechargeListStr,
  };
};

/**
 * 跳转小程序环境下的红包口袋
 */
const _jumpToMpHBKD = () => {
  const { templateMode, tmpHbkdRechargeListStr } = _getHBKDRechargeConfig();
  wxApi.tmpNavigateTo('hbkdRecharge', {
    openId: store.state.user.openId,
    userId: store.state.user.userId,
    templateMode,
    hbkdRemainVisible: store.state.app.hbkdRemainVisible,
    hbkdRechargeListStr: tmpHbkdRechargeListStr,
    hbkdRechargeListNewStr: tmpHbkdRechargeListStr,
  });
};

/**
 * 跳转红包口袋main方法
 */
export const jumpToHBKD = () => {
  const { env } = store.state.app;
  if (env === 'miniProgram') {
    _jumpToMpHBKD();
  } else if (env === 'h5') {
    router.push({
      path: '/hbkdRecharge',
    });
  }
};

/**
 * 跳转主持风采
 */
export const jumpToHostStyle = () => {
  wxApi.navigateTo('/pages/reserve/reserve');
};

/**
 * 跳转现场照片
 */
export const jumpToLivePhoto = () => {
  const { env } = store.state.app;
  if (env === 'miniProgram') {
    wxApi.navigateTo('/packageC/pages/photographerWall/photographerWall');
  } else if (env === 'h5') {
    router.push({
      path: '/photographerWall',
    });
  }
};

/**
 * 跳转酒店预定
 */
export const jumpToReserve = (type) => {
  const { env } = store.state.app;
  if (store.state.live.dz_hltcard) {
    router.push({
      path: `/hotelReserve?type=${type}`,
    });
  } else if (env === 'miniProgram') {
    wxApi.navigateTo('/pages/hotelReserve/hotelReserve');
  } else if (env === 'h5') {
    router.push({
      path: '/hotelReserve',
    });
  } else if (env === 'tt') {
    wxApi.navigateToTt('/pages/hotelReserve/hotelReserve');
  }
};
