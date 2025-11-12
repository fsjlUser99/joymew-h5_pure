import { reqGetUserInfo } from '@/api/index';
import { getRelativeTypeLabel } from '@/assets/constant/index';

import live from './live';

const state = {
  userPhone: '',
  userId: '',
  openId: '',
  unionid: '',
  name: '',
  headImg: '',
  money: 0,
  freeSendGift: false, // 是否拥有免费发礼物权限
  miao_vip_splid: '', // 最近一次领取了vip头像框的liveId
  miao_vip: '', // vip头像框
  isVipHeadBoxGetted: false, // 本场活动是否领过头像框
  vipLevel: '', // vip等级
  relativeType: '', // 男女方亲友
  currentStatus: '', // 单身、高富帅等
  deskNum: '', // 桌号,
  enterEffect: '', // 进场特效
  isForbidBuyHbq: false, // 是否禁止买宝箱和红包墙 拉黑功能
  vip_add_recharge: '',
  emceeInfo: {
    highPrivilege: 0, // 3和4:表示同庆楼用户 5表示婚礼堂用户
    isHideSuper: false, // 是否隐藏超级霸屏
    isUserH5: false, // 本场活动是否是h5
    signShowPhone: false, // 是否签到获取手机号
    phone_advert_json: '',
    isOpenAdvert: '',
    emcee_name: '',
    avatar: '',
    comment_json: '', // 微信二维码
    card_json: [], // 广告弹幕
    rank_city: '999',
    rank_country: '999',
    rank_province: '999',
    phonenumber: '',
    yue_switch: '0',
    unionid: '',
  },
};

const mutations = {
  setUserInfo: (state, data) => {
    state.userId = data.userId || state.userId;
    state.openId = data.openId || state.openId;
    state.unionid = data.unionid || state.unionid;
    state.name = data.name || state.name;
    state.headImg = data.headImg || state.headImg;
    state.miao_vip_splid = data.miao_vip_splid || state.miao_vip_splid;
    state.miao_vip = data.miao_vip || state.miao_vip;
    state.vipLevel = data.vipLevel || state.vipLevel;
    state.relativeType = data.relativeType || state.relativeType;
    state.currentStatus = data.currentStatus || state.currentStatus;
    state.deskNum = data.deskNum || state.deskNum;
    state.enterEffect = data.enterEffect || state.enterEffect;
    if (live.state.liveId === state.miao_vip_splid) {
      // 本场活动已经领过vip头像框了
      state.isVipHeadBoxGetted = true;
    } else {
      state.isVipHeadBoxGetted = false;
    }
    if (parseFloat(data.money) === 0 || parseFloat(data.money)) {
      state.money = parseFloat(data.money);
    }
    if (data.freeSendGift === '0' || data.freeSendGift === '1') {
      if (data.freeSendGift === '0') {
        state.freeSendGift = false;
      } else if (data.freeSendGift === '1') {
        state.freeSendGift = true;
      }
    }
    if (data.isForbidBuyHbq === true || data.isForbidBuyHbq === false) {
      state.isForbidBuyHbq = data.isForbidBuyHbq;
    }
    if (data.vip_add_recharge && data.vip_add_recharge !== '0') {
      state.vip_add_recharge = data.vip_add_recharge;
    }
  },
  setFreeSendGift: (state, data) => {
    if (data === '1') {
      state.freeSendGift = true;
    }
  },
  setEmceeInfo: (state, data) => {
    state.emceeInfo.highPrivilege = data.highPrivilege;
    state.emceeInfo.isHideSuper = data.isHideSuper === '1';
    state.emceeInfo.isUserH5 = data.isUserH5 === '1';
    state.emceeInfo.signShowPhone = data.signShowPhone === '1';
    if (data.is_open_advert) {
      const tmpIsOpenAdvert = String(data.is_open_advert);
      state.emceeInfo.isOpenAdvert = tmpIsOpenAdvert === '2';
    }
    state.emceeInfo.emcee_name = data.emcee_name;
    state.emceeInfo.avatar = data.avatar;
    state.emceeInfo.unionid = data.unionid;
    if (data.phone_advert_json) {
      try {
        const phoneAdverJsonObj = JSON.parse(data.phone_advert_json);
        state.emceeInfo.phone_advert_json = phoneAdverJsonObj.open_ping || '';
      } catch (err) {
        console.log(err);
      }
    }
    if (data.comment_json) {
      try {
        if (data.comment_json.indexOf('http') > -1) {
          state.emceeInfo.comment_json = data.comment_json;
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (data.card_json) {
      try {
        state.emceeInfo.card_json = JSON.parse(data.card_json);
      } catch (err) {
        console.log(err);
      }
    }
    if (data.rank_city) {
      state.emceeInfo.rank_city = data.rank_city;
    }
    if (data.rank_country) {
      state.emceeInfo.rank_country = data.rank_country;
    }
    if (data.rank_province) {
      state.emceeInfo.rank_province = data.rank_province;
    }
    if (data.phonenumber) {
      state.emceeInfo.phonenumber = data.phonenumber;
    }
    if (data.yue_switch && data.yue_switch === '1') {
      state.emceeInfo.yue_switch = '1';
    }
  },
  setUserPhone: (state, data) => {
    state.userPhone = data || '';
  },
};

const actions = {
  async refreshUserInfo({ commit }) {
    try {
      const userRes = await reqGetUserInfo();
      commit('setUserInfo', {
        name: userRes.wx_name,
        headImg: userRes.avator,
        money: userRes.money.balance,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

const getters = {
  isTql(state) {
    return state.emceeInfo.highPrivilege === 3 || state.emceeInfo.highPrivilege === 4;
  },
  isLiveMaster(state) {
    return state.emceeInfo.unionid === state.unionid ? '1' : '0';
  },
  relativeTypeText(state) {
    return live.state.sceneType === '0' && live.state.identitySwitch ? getRelativeTypeLabel(state.relativeType) : '';
  },
  yuehunSwitch(state) {
    if (state.emceeInfo.card_json.length > 0) {
      for (let i = 0; i < state.emceeInfo.card_json.length; i++) {
        if (state.emceeInfo.card_json[i].type === 'hostCard' && state.emceeInfo.card_json[i].yuehunSwitch === '1') {
          return true;
        }
      }
    }
    return false;
  },
  cardChatSwitch(state) {
    if (state.emceeInfo.card_json.length > 0) {
      for (let i = 0; i < state.emceeInfo.card_json.length; i++) {
        if (state.emceeInfo.card_json[i].type === 'hostCard' && state.emceeInfo.card_json[i].switch === '1') {
          return true;
        }
      }
    }
    return false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
