import { getUrlParam } from '@/utils/index';
import { getToken as getStoredToken, setToken as persistToken, clearToken as removeToken } from '@/utils/auth';
import { getSceneInfoBySceneType } from '@/assets/constant/scene';
import live from './live';

const state = {
  loadingVisible: true,
  currentLoadingProgress: 0,
  popupAreaVisible: false,
  popupModuleKey: -1,
  token: getStoredToken(),
  chatAreaScrollId: '',
  previewImg: '', // 预览图片地址
  currentGiftType: '', // 当前选中的礼物类型(giftId)
  currentPhotoType: '', // 当前选中的照片类型(giftId)
  currentDanmuType: '', // 当前选中的霸气弹幕类型(giftId)
  currentBapinType: '', // 当前选中的霸屏类型(giftId)
  currentSuperDanmuType: '', // 当前选中的超级弹幕类型(giftId)
  gameBtnVisible: false, // game按钮出现与隐藏
  origin: '', // 设置进入场景 用于h5跳转小程序再返回的场景记忆(sendGift、sendBapin、sendPhoto、sendDanmu、sendRecommendGift)
  rcGiftGameCodes: [], // 每个game结束后只出现一次推荐礼物 并保存出现过的gameCode
  atText: '', // 推荐礼物的文字
  bapinCloseIconVisible: false, // 是否展示霸屏关闭按钮
  isCloseCurrentBapin: false, // 是否关闭当前霸屏
  giftSendVisible: false, // 礼物发送是否可见(礼物、霸屏、照片、霸气弹幕)
  hbkdVisible: false, // 红包口袋是否可见
  hbkdRemainVisible: false, // 红包口袋余额是否可见
  photographerVisible: false, // 摄影师照片墙是否可见
  photographerImgPrice: 0, // 摄影师照片墙照片价格
  needLogin: false,
  heartWallPrice: '0',
  editUserInfoPrice: '0',
  hotelReserveVisible: false, // 婚宴预定是否可见
  hotelReserveIcon: '', // 婚宴预定入口Icon
  isInOtherWeviewH5: false, // 是否在除了首页之外其他的webview h5
  enterEffectContainerMountedObserver: null, // 观察者对象(监听enterEffectContainer dom是否渲染完成)
  funcTipIndex: 0,
  loadAdVisible: false,
  bottom: 0, // 是否为全面屏
  enter: false, // 是否有导航栏
  userphone: '', // 用户电话
  isCloseCoin: false, // 取消喵币充值(直接支付)
  isGiftToHbkd: false, // 礼物进红包口袋
  inSeatQuery: false, // 席位查询中
  isHlt: '', // 定位具体的某个婚礼堂 取值39(云境)、x(xxx婚礼堂)、common ''(非婚礼堂的普通用户)
  hltHotelName: '',
  isBrideVote: false, // 打开伴郎伴娘入口
  miniProgramType: '', // 区分嗨喵和嗨猫小程序 取值hamiao(嗨喵互动)、haimao(嗨猫互动)、ledong(嗨喵乐动)、''(婚礼堂、同庆楼小程序)
  mpType: '', // 作用同miniProgramType 区别是前者用于重构前的互动小程序 后者用于重构后的互动小程序
  chooseSongVisible: false, // 点歌功能是否可见
  songSheetList: [], // 歌单列表
  // 签到红包的配置信息
  signHbConfig: {
    avator: '',
    organizer: '',
    bless: {
      lineOne: '',
      lineTwo: '',
    },
  },
  // 福利购广告是否可见
  switchFuligoAd: false,
  switchFuligoAdUrl: '',
  // 开关对象
  /**
   * {
   * switch_sgs_game: boolean,// 外场游戏开关
   * switch_sgs_game_param: string, // 外场游戏参数
   * }
   */
  switchContent: null,
  qiandaoleme: false,
};

const mutations = {
  // 保存签到红包的配置信息
  setSignHbConfig(state, data) {
    state.signHbConfig = data || {
      avator: '',
      organizer: '',
      bless: {
        lineOne: '',
        lineTwo: '',
      },
    };
  },
  setNeedLogin: (state, data) => {
    state.needLogin = data;
  },
  setLoading: (state, data) => {
    state.loadingVisible = data;
  },
  updateCurrentLoadingProgress: (state, data) => {
    state.currentLoadingProgress = `${data}%`;
  },
  setToken: (state, data) => {
    state.token = data || '';
    if (state.token) {
      persistToken(state.token);
    } else {
      removeToken();
    }
  },
  setHotelConfig: (state, data) => {
    console.log('data', data);
    state.userphone = data.userphone || '';
    state.bottom = data.bottom || 0;
    if (data.enter) {
      state.enter = true;
    } else {
      state.enter = false;
    }
  },
  togglePopup: (state, data) => {
    if (!state.popupAreaVisible && data !== undefined) {
      state.popupAreaVisible = true;
      state.popupModuleKey = data;
    } else {
      state.popupModuleKey = -1;
      state.popupAreaVisible = false;
    }
  },
  setChatAreaScrollId: (state, data) => {
    state.chatAreaScrollId = data;
  },
  setPreviewImg: (state, data) => {
    state.previewImg = data;
  },
  resetPreviewImg: (state) => {
    state.previewImg = '';
  },
  setCurrentGiftType: (state, data) => {
    state.currentGiftType = data;
  },
  setCurrentPhotoType: (state, data) => {
    state.currentPhotoType = data;
  },
  setCurrentDanmuType: (state, data) => {
    state.currentDanmuType = data;
  },
  setCurrentBapinType: (state, data) => {
    state.currentBapinType = data;
  },
  setCurrentSuperDanmuType: (state, data) => {
    state.currentSuperDanmuType = data;
  },
  setGameBtnVisible: (state, data) => {
    state.gameBtnVisible = data;
  },
  setOrigin: (state, data) => {
    state.origin = data;
  },
  updateRcGiftGameCodes: (state, data) => {
    state.rcGiftGameCodes.push(data);
    state.atText = 'game结束啦送个祝福吧!';
  },
  initRcGiftAtText: (state) => {
    const tmpSceneObj = getSceneInfoBySceneType(live.state.sceneType);
    if (tmpSceneObj) {
      state.atText = tmpSceneObj.recommendGiftText;
    }
  },
  setIsCloseCurrentBapin: (state, data) => {
    state.isCloseCurrentBapin = data;
  },
  setBapinCloseIconVisible: (state, data) => {
    state.bapinCloseIconVisible = data;
  },
  setGiftSendVisible: (state, data) => {
    if (data === '0' || !data) {
      state.giftSendVisible = true;
    } else {
      state.giftSendVisible = false;
    }
  },
  setHbkdVisible: (state, data) => {
    if (data === '0' || !data) {
      state.hbkdVisible = true;
    } else {
      state.hbkdVisible = false;
    }
  },
  setHbkdRemainVisible: (state, data) => {
    if (data === '0' || !data) {
      state.hbkdRemainVisible = true;
    } else {
      state.hbkdRemainVisible = false;
    }
  },
  setHeartWallPrice: (state, data) => {
    state.heartWallPrice = data;
  },
  setEditUserInfoPrice: (state, data) => {
    state.editUserInfoPrice = data;
  },
  setPhotographerWallInfo: (state, data) => {
    state.photographerVisible = data.photo_shi_switch === '1';
    state.photographerImgPrice = parseFloat(data.photo_one_price);
  },
  setHotelReserveVisible: (state, data) => {
    state.hotelReserveVisible = data === '1';
  },
  setHotelReserveIcon: (state, data) => {
    state.hotelReserveIcon = data;
  },
  setIsInOtherWeviewH5: (state, data) => {
    state.isInOtherWeviewH5 = data;
  },
  initEnterEffectContainerMountedObserver: (state, data) => {
    state.enterEffectContainerMountedObserver = data;
  },
  updateEnterEffectContainerMountedObserver: (state, data) => {
    state.enterEffectContainerMountedObserver[data.key] = data.value;
  },
  setFuncTipIndex: (state, data) => {
    state.funcTipIndex = data;
  },
  updateLoadAd: (state) => {
    // loadAd: liveId
    if (live.state.sceneType !== '0') {
      return;
    }
    const loadAdLS = localStorage.getItem('loadAd');
    if (!loadAdLS) {
      state.loadAdVisible = true;
      localStorage.setItem('loadAd', live.state.liveId);
    } else {
      if (loadAdLS === live.state.liveId) {
        state.loadAdVisible = false;
        return;
      }
      localStorage.setItem('loadAd', live.state.liveId);
      state.loadAdVisible = true;
    }
  },
  setLoadAdVisible: (state, data) => {
    state.loadAdVisible = data;
  },
  setIsCloseCoin: (state, data) => {
    // 重构后的互动小程序默认关闭喵币支付
    if (state.mpType) {
      state.isCloseCoin = true;
    } else if (data && data === '1') {
      state.isCloseCoin = true;
    }
  },
  setIsBrideVote: (state, data) => {
    console.log('data', data);
    if (data && data === '1') {
      state.isBrideVote = true;
    } else {
      state.isBrideVote = false;
    }
  },
  setInSeatQuery: (state, data) => {
    state.inSeatQuery = data;
  },
  setIsGiftToHbkd: (state, data) => {
    if (!data || data === '0' || data === 0) {
      state.isGiftToHbkd = false;
    } else {
      state.isGiftToHbkd = true;
    }
  },
  setIsHlt: (state, data) => {
    if (data) {
      state.isHlt = data;
    }
  },
  setMiniProgramType: (state, data) => {
    if (data) {
      state.miniProgramType = data;
    }
  },
  setMpType: (state, data) => {
    if (data) {
      state.mpType = data;
    }
  },
  setHltHotelName: (state, data) => {
    state.hltHotelName = data;
    if (getUrlParam('hltHotelId') === '11') {
      state.hltHotelName = '米纱婚纱';
    }
  },
  setChooseSongVisible: (state, data) => {
    state.chooseSongVisible = data === '1';
  },
  setSongSheetList: (state, data) => {
    if (data?.list) {
      state.songSheetList = data.list;
      console.log('state.songSheetList', state.songSheetList);
    }
  },
  setSwitchFuligoAd: (state, data) => {
    const { fuliSwitch, url } = data;
    state.switchFuligoAd = fuliSwitch === true;
    state.switchFuligoAdUrl = url;
  },
  setSwitchContent: (state, data) => {
    state.switchContent = data || null;
  },
  setQiandaoleme: (state, data) => {
    state.qiandaoleme = data;
  },
};

const actions = {
  //   toggleSideBar({ commit }) {
  //     commit('TOGGLE_SIDEBAR')
  //   },
};

const getters = {
  isYj(state) {
    return state.isHlt === '39';
  },
  outerGameSwitch(state) {
    if (state.switchContent) {
      return state.switchContent.switch_sgs_game;
    }
    return false;
  },
  outerGameParam(state) {
    if (state.switchContent && state.switchContent.switch_sgs_game_param) {
      return JSON.parse(state.switchContent.switch_sgs_game_param);
    }
    return null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
