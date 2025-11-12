import Vue from 'vue';
import store from '@/store/index';
// import { generateRandomId, getCurrentDate } from '@/utils/index';
import { getGameInfoByGameCode } from '@/utils/service';
import router from '@/router/index';
// import { CHATICON, CHATICON_ZSHL, getRelativeTypeLabel } from '@/assets/constant/index';

// function getGiftImg(type, miaoLiwuId) {
//   let giftImg;
//   if (store.state.live.sceneType === '91') {
//     const XR_DANMUS = [
//       'https://ustatic.joymew.com/joymewMp/zshl/danmu/dragonIcon.png',
//       'https://ustatic.joymew.com/joymewMp/zshl/danmu/phonixIcon.png',
//       'https://ustatic.joymew.com/joymewMp/zshl/danmu/sklinIcon.png',
//     ];
//     if (miaoLiwuId?.includes('Miao_Bq')) {
//       const targetNum = Number(miaoLiwuId.split('_')[2]);
//       giftImg = XR_DANMUS[targetNum - 1];
//     } else {
//       giftImg = CHATICON_ZSHL[type];
//     }
//   } else {
//     giftImg = CHATICON[type];
//   }
//   return giftImg;
// }

// function getGiftName(miaoLiwuId) {
//   const DANMU_NAME = ['飞龙在天', '有凤来仪', '麒麟送子'];
//   const targetNum = Number(miaoLiwuId.split('_')[2]);
//   return DANMU_NAME[targetNum - 1];
// }

// function getTargetUserName(miaoName) {
//   let cutLen;
//   if (store.state.live.sceneType === '0') {
//     cutLen = 9;
//   } else {
//     cutLen = 18;
//   }
//   return miaoName.length > cutLen ? `${miaoName.slice(0, cutLen)}...` : miaoName;
// }
/**
 * 如果是本人发送的礼物需要将发礼物弹窗关闭
 * @param {string} userId 礼物发送者的id
 */
function closePopupWhenSelf(userId) {
  if (store.state.user.userId === userId && store.state.app.popupAreaVisible) {
    store.commit('app/togglePopup');
  }
}
/**
 * 如果是本人发的礼物需要判断有没有抽奖机会
 * 排除免费发礼物的情况
 * 排序发礼物抽奖功能关闭的情况
 * 只限于互动小程序
 */
function checkLotteryChanceWhenSelf(userId) {
  if (!store.state.live.sendGiftLotterySwitch) {
    return;
  }
  if (store.state.user.freeSendGift || store.state.live.allFreeSendGift) {
    return;
  }
  if (!['haimao', 'ledong', 'haimiao'].includes(store.state.app.mpType)) {
    return;
  }

  if (store.state.user.userId === userId) {
    store.dispatch('live/getSendGiftLotteryNumFromServer').then((remainChance) => {
      console.log('剩余抽奖次数:', remainChance);
      if (remainChance > 0) {
        // 弹出引导抽奖的弹窗
        store.commit('app/togglePopup', 20);
      }
    });
  }
}

// 处理聊天消息
function handleChatMessage(message) {
  // if (!message.data.miaoLwId && !message.data.miaoBless) {
  //   // 无效消息不作处理
  //   return;
  // }
  // const resultGiftInfo = {
  //   giftName: '',
  //   giftType: '',
  //   giftImg: '',
  // };
  // if (message.data.miaoLwId) {
  //   if (message.data.miaoLwId.indexOf('Miao_Bp') > -1) {
  //     resultGiftInfo.giftName = '祝福横幅';
  //     resultGiftInfo.giftType = 'bapin';
  //     resultGiftInfo.giftImg = getGiftImg('bapin');
  //   } else if (message.data.miaoLwId.indexOf('Miao_Tp') > -1) {
  //     resultGiftInfo.giftName = '照片霸屏';
  //     resultGiftInfo.giftType = 'photo';
  //     resultGiftInfo.giftImg = getGiftImg('photo');
  //   } else if (message.data.miaoLwId.indexOf('Miao_Bq') > -1) {
  //     resultGiftInfo.giftName = store.state.live.sceneType === '91' ? getGiftName(message.data.miaoLwId) : '火箭弹幕';
  //     resultGiftInfo.giftType = 'rocket';
  //     resultGiftInfo.giftImg = getGiftImg('rocket', message.data.miaoLwId);
  //   } else if (message.data.miaoLwId.indexOf('Miao_SuperDanmu') > -1) {
  //     resultGiftInfo.giftName = '超级霸屏';
  //     resultGiftInfo.giftType = 'superDanmu';
  //     resultGiftInfo.giftImg = getGiftImg('superDanmu');
  //   } else if (message.data.miaoLwId === 'hbkd') {
  //     resultGiftInfo.giftName = `${message.data.miaoBless}元红包`;
  //     resultGiftInfo.giftType = 'hbkd';
  //     resultGiftInfo.giftImg = getGiftImg('hbkd');
  //     message.data.miaoBless = '';
  //   } else if (message.data.miaoLwId === 'Miao_PhotoWall') {
  //     resultGiftInfo.giftName = `${message.data.miaoBless}元红包`;
  //     resultGiftInfo.giftType = 'photoWall';
  //     resultGiftInfo.giftImg = getGiftImg('photoWall');
  //     message.data.miaoBless = '';
  //   } else if (currentGift) {
  //     resultGiftInfo.giftName = currentGift.giftname;
  //     resultGiftInfo.giftType = 'gift';
  //     resultGiftInfo.giftImg = currentGift.imglink;
  //   }
  // }
  // store.commit('live/addChat', {
  //   id: generateRandomId(),
  //   headImg: message.data.miaoHeadUrl,
  //   content: message.data.miaoBless,
  //   userName: getTargetUserName(message.data.miaoName),
  //   photoUrl: message.data.miaoTuUrl,
  //   miaoVip: store.state.live.liveId === message.data.miaoVipSplid ? message.data.miaoVip : '',
  //   vipLevel: message.data.miaoVipLevel,
  //   relativeType: message.data.miaoType,
  //   relativeTypeLabel: getRelativeTypeLabel(message.data.miaoType),
  //   currentStatus: message.data.miaoPosition,
  //   deskNum: message.data.miaoTableNumber,
  //   sendDate: getCurrentDate(),
  //   ...resultGiftInfo,
  // });
  store.commit('chat/addChat', message.data);
}
// 处理礼物相关的消息
function handleGiftMessage(message) {
  console.log('礼物消息:', message);
  if (message.data.miaoLwId.indexOf('Miao_Bq') > -1) {
    // 火箭弹幕
    let tmpRocketType;
    if (message.data.miaoLwId.indexOf('Miao_Bq_2') > -1) {
      tmpRocketType = 1;
    } else if (message.data.miaoLwId.indexOf('Miao_Bq_3') > -1) {
      tmpRocketType = 2;
    } else {
      tmpRocketType = 0;
    }
    Vue.prototype.$createRocketDanmu({
      name: message.data.miaoName,
      headImg: message.data.miaoHeadUrl,
      content: message.data.miaoBless,
      rocketType: tmpRocketType,
    });
    // handleChatMessage(message);
  } else if (message.data.miaoLwId.indexOf('Miao_Bp') > -1) {
    // 祝福横幅
    let tmpBapinType;
    const bapinTList = store.state.live.bapinTypeList;
    const bapinTListLen = bapinTList.length;
    for (let i = 0; i < bapinTListLen; i += 1) {
      if (bapinTList[i].giftId === message.data.miaoLwId) {
        tmpBapinType = i;
        break;
      }
    }
    const tmpTime = parseInt(bapinTList[tmpBapinType].shijian, 10);
    Vue.prototype.$createLoveBapin({
      name: message.data.miaoName,
      headImg: message.data.miaoHeadUrl,
      content: message.data.miaoBless,
      bapinType: tmpBapinType,
      time: tmpTime,
    });
    // handleChatMessage(message);
  } else if (message.data.miaoLwId.indexOf('Miao_Tp') > -1) {
    // 照片
    // handleChatMessage(message);
  } else if (message.data.miaoLwId.indexOf('Miao_SuperDanmu') > -1) {
    // 超级弹幕
    // handleChatMessage(message);
  } else if (message.data.miaoLwId.indexOf('hbkd') > -1) {
    // 红包口袋充值
    // handleChatMessage(message);
  } else if (message.data.miaoLwId.indexOf('Miao_PhotoWall') > -1) {
    // 红包墙
    // handleChatMessage(message);
  } else {
    // 普通礼物
    const tmpGift = store.state.live.giftListAll.find((item) => item.giftconst === message.data.miaoLwId);
    // handleChatMessage(message, tmpGift);
    store.commit('live/addToGiftQueue', {
      userName: message.data.miaoName,
      headImg: message.data.miaoHeadUrl,
      miaoColor: message.data.miaoColor,
      ...tmpGift,
    });
  }
  // 如果是本人发送的礼物需要将发礼物弹窗关闭
  closePopupWhenSelf(message.data.miaoId);
  // 只有重构后的互动小程序才可以执行此逻辑
  if (store.state.app.mpType) {
    // 如果是本人发送的礼物需要判断有没有抽奖机会
    checkLotteryChanceWhenSelf(message.data.miaoId);
  }
}
// 处理game相关的消息
function handleGameMessage(message) {
  const gameBaseInfo = getGameInfoByGameCode(message.data.playInfo, message?.data?.data);
  store.commit('game/setGameInfo', {
    currentGameCode: message.data.playInfo,
    enterType: gameBaseInfo.enterType,
    gameUrl: gameBaseInfo.gameUrl,
    needShake: gameBaseInfo.needShake,
  });
  if (message.data.miaoState === '1') {
    // 防止页面上本来就有game开始按钮
    store.commit('app/setGameBtnVisible', false);
    // game等待中
    if (message.data.playInfo === 'sign' || message.data.playInfo === 'hmPlay19') {
      console.log('签到或送祝福游戏无等待界面执行空操作');
    } else {
      // game按钮出现
      store.commit('app/setGameBtnVisible', true);
      store.commit('game/setGameStatus', 1);
    }
    router.replace('/');
  } else if (message.data.miaoState === '2') {
    store.commit('game/setGameStatus', 2);
    if (message.data.playInfo === 'hmPlay19') {
      store.commit('app/setGameBtnVisible', true);
      store.commit('app/togglePopup', 16);
    }
  } else if (message.data.miaoState === '3') {
    store.commit('game/setGameStatus', 3);
    // game按钮消失
    store.commit('app/setGameBtnVisible', false);
    if (message.data.playInfo === 'hmPlay19') {
      store.commit('app/togglePopup');
    }
    if (message.data.playInfo === 'hdGame') {
      // 空game
      router.replace('/');
    }
    if (
      store.state.app.rcGiftGameCodes.indexOf(message.data.playInfo) === -1
      && store.state.app.giftSendVisible
      && store.state.app.env !== 'tt'
    ) {
      // 每个game结束后弹出一次推荐礼物
      store.commit('app/togglePopup', 6);
      store.commit('app/updateRcGiftGameCodes', message.data.playInfo);
    }
  }
}
// 处理进场消息
function handleEnterMessage(message) {
  if (store.state.user.userId === message.data.miaoId || !store.state.user.userId) {
    return;
  }
  if (message.data.miaoVipCar) {
    Vue.prototype.$createEnterEffect({
      name: message.data.miaoName,
      headImg: message.data.miaoHeadUrl,
      enterEffectType: message.data.miaoVipCar,
    });
  } else {
    Vue.prototype.$createEnterEffect({
      name: message.data.miaoName,
      headImg: message.data.miaoHeadUrl,
      enterEffectType: 'common',
    });
  }
}
// 处理评分消息
function handleGiveMarkMessage(message) {
  console.log(message.data);
  store.commit('game/setCanMarkUserInfo', true);
}
// 处理喵钻红包消息
function handleDiamondHbMessage(message) {
  console.log(message);
  store.dispatch('live/getDiamondHbList');
}
/** 处理麻将的广播 */
function handlerMajiang(message) {
  console.log(message.data);
  const round = message.data.miaoBless || 1;
  store.commit('game/setMajiangRound', round);
}
// 处理开心答题的消息
function handleHappyQA(message) {
  // 通知揭晓当前题目的答案
  if (message.type === 'happy_announce') {
    store.commit('game/setCanExposeCurrentQuestion', true);
  } else if (message.type === 'happy_qa2') {
    // 通知可以进入下一题
    store.commit('game/setCanNextQuestion', true);
  }
}

const CODE = Object.freeze({
  /** 调用toH5接口发送的通用消息 */
  OTHERS: 'toH5',
});

/** 其他信息的处理器 */
export const otherMessageHandler = (() => {
  /** 响应时执行的函数集合 */
  const callbackList = new Set();

  /**
   * 设置响应时执行的函数
   * @param {Function} fn 其他响应执行的函数
   */
  const on = (fn) => {
    callbackList.add(fn);
  };

  /** 移除响应时执行的函数
   * @param {Function} fn 其他响应执行的函数
   */
  const off = (fn) => {
    callbackList.delete(fn);
  };

  /** 触发响应 */
  const triggerAllCallback = (msg) => {
    callbackList.forEach((fn) => {
      fn(msg);
    });
  };

  return {
    on,
    off,
    triggerAllCallback,
  };
})();

// 处理消息(汇总方法)
export default function handleMessage(message) {
  console.log('chatMessage:', message);
  switch (message.type) {
    case 'wsya':
      handleChatMessage(message);
      break;
    case 'liwu':
      handleGiftMessage(message);
      handleChatMessage(message); // 礼物消息也要加入到聊天记录
      break;
    case 'play':
      handleGameMessage(message);
      break;
    case 'jinchang':
      handleEnterMessage(message);
      break;
    case 'Player_1':
      handleGiveMarkMessage(message);
      break;
    case 'Player_2':
      handleDiamondHbMessage(message);
      break;
    case 'mahjong':
      handlerMajiang(message);
      break;
    case 'refresh':
      window.location.reload();
      break;
    case 'happy_announce':
    case 'happy_qa2':
      handleHappyQA(message);
      break;
    case CODE.OTHERS:
      otherMessageHandler.triggerAllCallback(message);
      break;
    default:
      break;
  }
}
