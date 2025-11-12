import { getSendGiftGameList } from '@/api/index/index';

const state = {
  currentGameCode: '',
  enterType: 'h5',
  needShake: false,
  gameUrl: '',
  gameStatus: 0, // 0：未开始、1：等待、2：进行中、3：已结束
  hbId: '', // 红包雨id
  canGetMarkUserInfo: false, // 是否能获取被评分选手的信息
  logoInfo: {
    fontColor: '',
    fontSize: '',
    name: '',
    logoPath: '',
    logoSize: '',
  },
  sendGiftGameList: [],
  giveMarkVersion: 'new', // 评分版本 new: 新版 old：旧版
  majiangRound: 1, // 雀神大赛的轮次
  canExposeCurrentQuestion: false, // 可以揭晓当前题目的答案了
  canNextQuestion: false, // 可以到下一题了
};

const mutations = {
  setGameInfo: (state, data) => {
    state.currentGameCode = data.currentGameCode;
    state.enterType = data.enterType;
    state.gameUrl = data.gameUrl;
    state.needShake = data.needShake;
  },
  setGameStatus: (state, data) => {
    state.gameStatus = data;
  },
  resetGameInfo: (state) => {
    state.currentGameCode = '';
    state.enterType = 'h5';
    state.gameUrl = '';
    state.needShake = false;
  },
  setHbyId: (state, data) => {
    state.hbId = data;
  },
  setCanMarkUserInfo: (state, data) => {
    state.canGetMarkUserInfo = data;
  },
  setLogoInfo: (state, data) => {
    if (data.logoPath) {
      state.logoInfo.fontColor = data.fontColor;
      state.logoInfo.fontSize = data.fontSize;
      state.logoInfo.name = data.name;
      state.logoInfo.logoPath = data.logoPath;
      state.logoInfo.logoSize = data.logoSize;
    }
  },
  setSendGiftGameList: (state, data) => {
    state.sendGiftGameList.splice(0);
    const tmpLen = data.length;
    for (let i = 0; i < tmpLen; i += 1) {
      state.sendGiftGameList.push(data[i]);
    }
  },
  setGiveMarkVersion: (state, data) => {
    state.giveMarkVersion = data === '2' ? 'old' : 'new';
  },
  /** 变更雀神大赛的轮次 */
  setMajiangRound: (state, data) => {
    state.majiangRound = Number(data || 1);
  },
  setCanExposeCurrentQuestion: (state, data) => {
    state.canExposeCurrentQuestion = data;
  },
  setCanNextQuestion: (state, data) => {
    state.canNextQuestion = data;
  },
};

const actions = {
  initSendGiftGameList(ctx) {
    // ctx.commit('setSendGiftGameList', );
    console.log(ctx);
    if (ctx.state.sendGiftGameList.length > 0) {
      return;
    }
    getSendGiftGameList()
      .then((res) => {
        console.log(res);
        ctx.commit('setSendGiftGameList', res.list);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
