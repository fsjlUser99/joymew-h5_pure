import {
  generateRandomId,
  formatDateConvertTS,
  sCtMs,
  dateCompare,
  getCurrentLocation,
  getDistance,
} from '@/utils/index';
import { WEBVIEWH5 } from '@/assets/constant/index';
import { getSceneInfoBySceneType } from '@/assets/constant/scene';
import { routes } from '@/router/index';
import { getDiamondHbList } from '@/api/diamondHb/index';
import { getSignRankList, reqGetSendGiftChance } from '@/api/index/index';
import { commitBackgroundFileList } from '@/utils/preloadFile';
import { getWishBySceneType, generateQuickWishBySceneType } from '@/utils/service';

import app from './app';
import store from '../index';

const EXAMINELIVID = 'afb94fa7142f43adb3c5dc8bc61d2d9b';
const DZ_HLT_EMCEEID = ['a87b4032a1424e45add71e9e49a139f2', '667b9b5a87ae4c51bd3fd1ec02b1e833'];

const state = {
  liveId: '',
  emceeId: '',
  sceneType: '',
  title: '',
  background: '',
  qrcodeUrl: '',
  giftTitleList: [], // 礼物标题列表
  giftList: [],
  giftListAll: [],
  giftNavId: 'list1',
  rcGiftList: [], // 推荐礼物列表
  giftQueue: [], // 礼物队列
  currentGiftEffect: {
    // 当前展示的礼物效果
    id: '',
    path: '',
    imgPath: '',
    giftName: '',
    userName: '',
    headImg: '',
  },
  photoTypeList: [], // 照片类型列表
  danmuTypeList: [], // 霸气弹幕类型列表
  bapinTypeList: [], // 霸屏类型列表
  superDanmuTypeList: [], // 超级弹幕类型列表
  rechargeList: [], // 充值列表
  hbkdRechargeList: [], // 红包口袋充值列表
  hbkdRechargeNewList: [], // 新版红包口袋充值列表
  remainMoney: 0, // 红包口袋余额
  zyzList: '',
  nynList: '',
  isFreeSendPhoto: false, // 是否是免费发照片礼物场次
  diamondHbQueue: [], // 喵钻红包队列
  diamondHbCdp: {
    // 当前展示的喵钻红包
    id: '',
    diamondNum: 0,
    wx_name: '',
    avator: '',
    startTime: '', // 红包可点时间
    hbCd: '',
    status: 0, // 0:不可点(倒计时中) 1:可点 2:点开
    diamondNumLucky: 0, // 抢到的喵钻数量
    isPrize: false, // 是否抢到喵钻
  },
  isOpenDiamondHb: false, // 正在开红包
  isExamineLive: false, // 是否是应付审核的活动
  customSignWish: [], // 自定义签到语
  isForcePhone: false, // 是否强制获取手机号
  isOverDate: false, // 活动是否过期
  allFreeSendGift: false, // 全场免费发礼物
  seatSwitch: false, // 席位表功能是否开启
  seatList: [],
  seatSearchList: [],
  seatMy: '',
  noMsgSeckCheckList: [], // 不需要文本内容安全检测的文本
  advertiseDanmuTypeList: [], // 所有的广告弹幕类型列表(跟司仪账号有关)
  advertiseDanmuTypeQueue: [], // 待发送的广告弹幕类型队列(跟这场活动有关)
  activityId: '', // 幸运大转盘的id
  activityTitle: '', // 大转盘活动名称
  activityIntro: '', // 大转盘活动简介
  awardConfig: [], // 幸运大转盘配置的奖项数据
  totalAward: 0, // 幸运大转盘所有奖品数量
  lotterySize0: 0, // 幸运大转盘抽到一等奖的人数
  totalLotteryPerson: 0, // 幸运大转盘已经抽奖的人数
  isCanLottery: '1', // 是否可以进行抽奖, '1'不弹窗
  hotelTel: '', // 酒店电话
  signRankList: [], // 签到排名列表
  signRankListSize: 0, // 签到排名列表总数
  myRankNum: '99+', // 我的排名
  isForbidSend: false, // 禁止自定义文本内容
  locationVal: '', // 地理位置配置信息
  isLocationInvalid: false, // 地理位置信息是否非法 默认合法
  locationInvalidReason: '', // 地理位置非法原因
  identitySwitch: false, // 亲友设置开关
  sendGiftLotteryNum: 0, // 发送礼物抽奖次数
  sendGiftLotterySwitch: false, // 发送礼物抽奖开关
  dz_hltcard: false, // 定制婚礼堂小程序卡片
  isCustomBackground: false, // 是否为自定义背景
};

const mutations = {
  setHotelTel: (state, data) => {
    state.hotelTel = data;
  },
  setLotterySize0: (state, data) => {
    state.lotterySize0 = data;
  },
  setActivityTitle: (state, data) => {
    state.activityTitle = data;
  },
  setActivityIntro: (state, data) => {
    state.activityIntro = data;
  },
  setIsCanLottery: (state, data) => {
    state.isCanLottery = data;
  },
  setTotalLotteryPerson: (state, data) => {
    state.totalLotteryPerson = data;
  },
  setTotalAward: (state, data) => {
    state.totalAward = data;
  },
  setActivityId: (state, data) => {
    state.activityId = data;
  },
  setAwardConfig: (state, data) => {
    state.awardConfig.splice(0);
    state.awardConfig = data;
  },
  setLiveId: (state, data) => {
    state.liveId = data;
    if (state.liveId === EXAMINELIVID) {
      state.isExamineLive = true;
    }
  },
  setEmceeId: (state, data) => {
    state.emceeId = data;
    if (DZ_HLT_EMCEEID.includes(state.emceeId)) {
      state.dz_hltcard = true;
    }
  },
  setSceneType: (state, data) => {
    console.log('***setSceneType***');
    console.log(data);
    state.sceneType = data;
  },
  setZyzList: (state, data) => {
    state.zyzList = data;
  },
  setNynList: (state, data) => {
    state.nynList = data;
  },
  setTitle: (state, data) => {
    state.title = data;
    routes[0].meta.title = state.title;
    routes[1].meta.title = state.title;
    document.title = state.title;
  },
  setBackground: (state, data) => {
    let tmpBg = '';
    // Check if this is a custom background (data is provided and not '0')
    if (data && data !== '0') {
      tmpBg = data;
      state.isCustomBackground = true;
    } else {
      const tmpSceneInfo = getSceneInfoBySceneType(state.sceneType);
      tmpBg = tmpSceneInfo && tmpSceneInfo.bg;
      state.isCustomBackground = false;
    }
    state.background = tmpBg;
    commitBackgroundFileList({
      path: state.background,
      type: 'img',
    });
  },
  setGiftList: (state, data) => {
    const NAVMAP = {
      list1: '经典',
      list5: '华丽',
      list666: '特效',
      list6: '嘉年华',
    };
    // data.giftTitleList<-> {list1: '',list5: '',...}
    const keyArr = Object.keys(data.giftTitleList);
    // 嘉年华礼物调整到第二个位置
    const tmpIndexList6 = keyArr.indexOf('list6');
    const valIndex1 = keyArr[1];
    let tempVal;
    if (tmpIndexList6 > -1 && valIndex1) {
      tempVal = keyArr[tmpIndexList6];
      keyArr[tmpIndexList6] = valIndex1;
      keyArr[1] = tempVal;
    }
    const tmpTitle = [];
    const tmpList = [];
    let tmpListAll = [];
    keyArr.forEach((keyItem) => {
      if (data.giftListObj[keyItem].length > 0) {
        tmpTitle.push({
          id: keyItem,
          name: NAVMAP[keyItem],
        });
        tmpList.push(data.giftListObj[keyItem]);
        tmpListAll = tmpListAll.concat(data.giftListObj[keyItem]);
      }
    });
    // 中式婚礼不需要发红包
    if (state.sceneType !== '91') {
      tmpTitle.push({
        id: 'sendHb',
        name: '红包',
      });
    }
    // 非婚礼版、同庆楼版本、婚礼堂版本去掉特效
    if (state.sceneType !== '0' || store.getters['user/isTql'] || store.state.user.emceeInfo.highPrivilege === 5) {
      const tmpEnterEffectIndex = tmpTitle.findIndex((item) => item.id === 'list666');
      tmpTitle.splice(tmpEnterEffectIndex, 1);
      tmpList.splice(tmpEnterEffectIndex, 1);
    }
    state.giftTitleList = tmpTitle;
    state.giftList = tmpList;
    state.giftListAll = tmpListAll;
    const tmpJdGiftIndex = tmpTitle.findIndex((item) => item.id === 'list1'); // 经典礼物索引
    state.rcGiftList = state.giftList[tmpJdGiftIndex]
      .filter((item) => {
        return item.is_pop === '1';
      })
      .map((item) => {
        return {
          giftImg: item.imglink,
          giftName: item.giftname,
          price: item.giftprice,
          giftId: item.giftconst,
        };
      });
    store.commit('app/setCurrentGiftType', state.giftList[0][0].giftconst);
  },
  setGiftNavId: (state, data) => {
    state.giftNavId = data;
  },
  setPhotoTypeList: (state, data) => {
    state.photoTypeList = data;
  },
  setDanmuTypeList: (state, data) => {
    state.danmuTypeList = data;
  },
  setSuperDanmuTypeList: (state, data) => {
    state.superDanmuTypeList = data;
  },
  setBapinTypeList: (state, data) => {
    state.bapinTypeList = data;
  },
  setRechargeList: (state, data) => {
    state.rechargeList = data.split(',');
  },
  setHbkdRechargeList: (state, data) => {
    state.hbkdRechargeList = data;
  },
  setHbkdRechargeNewList: (state, data) => {
    if (!data || data === '0') {
      return;
    }
    try {
      const tmpHbkdObj = JSON.parse(data);
      // 旧版数据结构 废弃
      // {id,title,value:{[sceneType]:[]}}
      if (tmpHbkdObj.value && typeof tmpHbkdObj.value === 'object') {
        state.hbkdRechargeNewList = [];
      } else {
        // 新版数据结构
        // {[sceneType]: {id,title,value:[]}}
        state.hbkdRechargeNewList = tmpHbkdObj[state.sceneType]?.value ?? [];
      }
    } catch (err) {
      console.log(err);
    }
  },
  setHbkdInfo: (state, data) => {
    state.remainMoney = data.remainMoney;
  },
  addToGiftQueue: (state, data) => {
    if (state.currentGiftEffect.id === '') {
      state.currentGiftEffect = {
        id: generateRandomId(),
        path: data.coupontype,
        imgPath: data.imglink,
        giftName: data.giftname,
        userName: data.userName,
        headImg: data.headImg,
        shijian: data.shijian,
        miaoColor: data.miaoColor,
      };
    } else {
      const list = state.giftQueue;
      list.push(data);
      state.giftQueue = list;
    }
  },
  removeFromGiftQueue: (state) => {
    const list = state.giftQueue;
    if (list.length === 0) {
      state.currentGiftEffect = {
        id: '',
        path: '',
        imgPath: '',
        giftName: '',
        userName: '',
        headImg: '',
        shijian: '',
        miaoColor: '',
      };
    } else {
      const g = list.shift();
      state.giftQueue = list;
      state.currentGiftEffect = {
        id: generateRandomId(),
        path: g.coupontype,
        imgPath: g.imglink,
        giftName: g.giftname,
        userName: g.userName,
        headImg: g.headImg,
        shijian: g.shijian,
        miaoColor: g.miaoColor,
      };
    }
  },
  setQrcodeUrl: (state, data) => {
    state.qrcodeUrl = data;
  },
  setIsFreeSendPhoto: (state, data) => {
    if (data === true || data === false) {
      state.isFreeSendPhoto = data;
    }
  },
  // 更新喵钻红包队列
  updateDiamondHbQueue: (state, data) => {
    state.diamondHbQueue.splice(0);
    const tmpLen = data.length;
    for (let i = 0; i < tmpLen; i += 1) {
      if (data[i].isRobRedPackage === '0') {
        state.diamondHbQueue.push({
          id: data[i].package_id,
          diamondNum: data[i].send_money,
          wx_name: data[i].wx_name,
          avator: data[i].avator,
          startTime: formatDateConvertTS(data[i].start_time),
          hbCd: '',
          status: 0,
        });
      }
    }
    // 执行倒计时逻辑
    if (state.diamondHbQueue[0]) {
      store.commit('live/updateHeadDiamondHbCd');
    }
  },
  // 更新喵钻红包队列队首红包的cd时间
  updateHeadDiamondHbCd: (state) => {
    const { startTime } = state.diamondHbQueue[0];
    let subSecond = parseInt((startTime - new Date().getTime()) / 1000, 10); // 时间差
    if (subSecond >= 0) {
      const tmpInterval = setInterval(() => {
        subSecond = parseInt((startTime - new Date().getTime()) / 1000, 10);
        if (subSecond > 0) {
          state.diamondHbQueue[0].hbCd = sCtMs(subSecond);
        } else {
          clearInterval(tmpInterval);
          state.diamondHbQueue[0].status = 1;
          state.diamondHbQueue[0].hbCd = '';
        }
      }, 1000);
    } else {
      // 红包变成可点状态
      state.diamondHbQueue[0].status = 1;
    }
  },
  // 更新当前展示的喵钻红包
  updateDiamondHbCdp: (state, data) => {
    const tmpDiamondHb = state.diamondHbQueue[0];
    if (tmpDiamondHb) {
      state.diamondHbCdp.id = tmpDiamondHb.id;
      state.diamondHbCdp.diamondNum = tmpDiamondHb.diamondNum;
      state.diamondHbCdp.wx_name = tmpDiamondHb.wx_name;
      state.diamondHbCdp.avator = tmpDiamondHb.avator;
      state.diamondHbCdp.startTime = tmpDiamondHb.startTime;
      state.diamondHbCdp.hbCd = tmpDiamondHb.hbCd;
      state.diamondHbCdp.status = tmpDiamondHb.status;
    }
    // 抢到的喵钻数目、是否中奖赋值
    if (data) {
      state.diamondHbCdp.diamondNumLucky = data.gold;
      if (data.status === 1) {
        state.diamondHbCdp.isPrize = true;
      } else {
        state.diamondHbCdp.isPrize = false;
      }
    }
  },
  // 更新当前展示的喵钻红包状态
  updateDiamondHbCdpStatus: (state, data) => {
    state.diamondHbCdp.status = data;
  },
  setIsOpenDiamondHb: (state, data) => {
    state.isOpenDiamondHb = data;
  },
  setCustomSignWish: (state, data) => {
    if (data && data.length > 0) {
      state.customSignWish = data;
    }
  },
  setForcePhone: (state, data) => {
    if (state.sceneType === '1' || state.sceneType === '0') {
      let tmpFlag = false;
      if (data === '1') {
        tmpFlag = true;
      }
      state.isForcePhone = tmpFlag;
    }
  },
  setIsOverDate: (state, data) => {
    if (dateCompare(data.usingDate) || data.isEndWedding === '1') {
      state.isOverDate = true;
    } else {
      state.isOverDate = false;
    }
  },
  setAllFreeSendGift: (state, data) => {
    // 字节小程序环境默认全场免费发礼物
    if (app.state.env === 'tt') {
      state.allFreeSendGift = true;
      return;
    }
    if (data === '0' || data === '1') {
      if (data === '0') {
        state.allFreeSendGift = false;
      } else if (data === '1') {
        state.allFreeSendGift = true;
      }
    }
  },
  setSeatInfo: (state, data) => {
    if (data && data.length > 0) {
      state.seatSwitch = true;
      state.seatList = data.map((item) => {
        const tmpUserList = item.seat_val.split(',').filter((item) => item);
        const tmpLen = tmpUserList.length;
        for (let i = 0; i < tmpLen; i += 1) {
          if (tmpUserList[i].indexOf('_') > -1) {
            [tmpUserList[i]] = tmpUserList[i].split('_');
          }
        }
        return {
          userList: item.seat_val.split(',').filter((item) => item),
          userListReal: tmpUserList,
          ...item,
        };
      });
    }
  },
  setSeatSearchInfo: (state, data) => {
    if (data) {
      const targetSeat = state.seatList.find((item) => item.seat_val.indexOf(data.namephone) > -1);
      if (targetSeat) {
        state.seatSearchList = targetSeat.userListReal;
        state.seatMy = targetSeat.seat_number;
      }
    } else if (store.state.user.userPhone) {
      const targetSeat = state.seatList.find((item) => item.seat_val.indexOf(store.state.user.userPhone) > -1);
      if (targetSeat) {
        state.seatSearchList = targetSeat.userListReal;
        state.seatMy = targetSeat.seat_number;
      }
    } else if (store.state.user.name) {
      const targetSeat = state.seatList.find((item) => item.seat_val.indexOf(store.state.user.name) > -1);
      if (targetSeat) {
        state.seatSearchList = targetSeat.userListReal;
        state.seatMy = targetSeat.seat_number;
      }
    } else {
      state.seatSearchList = [];
      state.seatMy = '';
    }
    if (state.seatMy) {
      localStorage.setItem('seatMy', state.seatMy);
      localStorage.setItem('seatSearchList', JSON.stringify(state.seatSearchList));
    } else {
      state.seatMy = localStorage.getItem('seatMy') || '';
      const tmpLsListStr = localStorage.getItem('seatSearchList');
      if (tmpLsListStr) {
        state.seatSearchList = JSON.parse(tmpLsListStr);
      } else {
        state.seatSearchList = [];
      }
    }
  },
  initNoMsgSeckCheckList: (state) => {
    if (state.noMsgSeckCheckList.length > 0) {
      return;
    }
    const tmpWishList = getWishBySceneType(state.sceneType, 'list');
    const tmpWishListCustom = state.customSignWish;
    const tmpQuickWishList = generateQuickWishBySceneType(state.sceneType, 'list');
    state.noMsgSeckCheckList = tmpWishList.concat(tmpWishListCustom).concat(tmpQuickWishList);
  },
  resetAdvertiseDanmuTypeQueue: (state) => {
    // h5刷新都能重新发送(提高广告弹幕发送频次，如果嫌频次过多则使用上面注释掉的逻辑)
    localStorage.removeItem('advertiseDanmuStorage');
    // state.advertiseDanmuTypeQueue = state.advertiseDanmuTypeList;
    state.advertiseDanmuTypeList.forEach((typeItem) => {
      if (typeItem.switch === '1') {
        state.advertiseDanmuTypeQueue.push(typeItem);
      }
    });

    console.log('初始化待发送的广告类型队列', state.advertiseDanmuTypeQueue);
  },
  setSignRankList: (state, data) => {
    if (data && data.length > 0) {
      const getTypeLabel = (type) => {
        if (!type) {
          return '';
        }
        return type.startsWith('1') ? '男方' : '女方';
      };
      state.signRankList = data.map((dataItem) => {
        return {
          ...dataItem,
          money: parseInt(dataItem.money, 10),
          positionName: getTypeLabel(dataItem.position),
        };
      });
      const myIndex = state.signRankList.findIndex((item) => item.userId === store.state.user.userId);
      if (myIndex > -1) {
        state.myRankNum = myIndex + 1;
      }
    }
  },
  setSignRankListSize: (state, data) => {
    if (data) {
      state.signRankListSize = parseInt(data, 10);
    }
  },
  setIsForbidSend: (state, data) => {
    if (data === '1' || data === '0') {
      state.isForbidSend = data === '1';
    }
  },
  setLocationVal: (state, data) => {
    if (!data || data === '0') {
      return;
    }
    try {
      const locationObj = JSON.parse(data);
      const { lat, lng } = locationObj;
      if (lat && lng) {
        state.locationVal = locationObj;
      }
    } catch (err) {
      console.log(err);
    }
  },
  setIsLocationInvalid: (state, data) => {
    state.isLocationInvalid = data;
  },
  setLocationInvalidReason: (state, data) => {
    state.locationInvalidReason = data;
  },
  setIdentitySwitch: (state, data) => {
    state.identitySwitch = data === '1';
  },
  /**
   * 设置抽奖次数
   */
  setSendGiftLotteryNum: (state, data) => {
    state.sendGiftLotteryNum = data;
  },
  /**
   * 设置抽奖开关
   */
  setSendGiftLotterySwitch: (state, data) => {
    state.sendGiftLotterySwitch = data === '1';
  },
};

const actions = {
  getDiamondHbList(ctx) {
    getDiamondHbList()
      .then((res) => {
        console.log(res);
        ctx.commit('updateDiamondHbQueue', res.inList);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getSignRankList(ctx) {
    getSignRankList()
      .then((res) => {
        console.log(res);
        ctx.commit('setSignRankList', res.list1);
        ctx.commit('setSignRankListSize', res.size);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // locationVal有值的情况下调用该方法
  initLocationLogic(ctx) {
    getCurrentLocation()
      .then((res) => {
        console.log(res);
        const { latitude: currentLatitude, longitude: currentLongitude } = res;
        const { lat: locationLatitude, lng: locationLongitude, scope } = ctx.state.locationVal;
        const currentDistance = getDistance(currentLatitude, currentLongitude, locationLatitude, locationLongitude);
        console.log(currentDistance, scope);
        if (currentDistance > scope) {
          ctx.commit('setIsLocationInvalid', true);
          ctx.commit('setLocationInvalidReason', '您不在活动范围内!');
        }
      })
      .catch((err) => {
        console.log(err);
        ctx.commit('setIsLocationInvalid', true);
        ctx.commit('setLocationInvalidReason', '手机未开启定位服务权限!');
      });
  },
  /**
   * 请求接口获取发礼物抽奖次数
   * 如果次数不为0则显示抽奖次数弹窗
   * 自己发了礼物调用
   */
  getSendGiftLotteryNumFromServer(ctx) {
    return new Promise((resolve, reject) => {
      reqGetSendGiftChance().then((res) => {
        console.log('抽奖机会有无?', res);
        const remainChance = parseInt(res.size, 10);
        ctx.commit('setSendGiftLotteryNum', remainChance);
        resolve(remainChance);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  },
};

const getters = {
  signRankListTopThree(state) {
    return state.signRankList.slice(0, 3);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
