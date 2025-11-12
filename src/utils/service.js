// 业务相关的工具方法
import store from '@/store/index';
import {
  PHOTO_TYPE, DANMU_TYPE, SUPERDANMU_TYPE, POPUP_MODULE, WISH, QUICKWISHES,
} from '../assets/constant/index';
import { generateRandom } from './index';
import { tmpAdjustGameUrl } from './hdOptimizationTmpPatch';

// 格式化礼物列表
export const formatGiftList = (giftList = []) => {
  const result = [];
  let tempArr = [];

  for (let i = 0; i < giftList.length; i += 1) {
    tempArr.push({
      id: giftList[i].id,
      giftId: giftList[i].giftconst,
      name: giftList[i].giftname,
      giftImg: giftList[i].imglink,
      price: parseFloat(giftList[i].giftprice),
    });
    if ((i !== 0 && (i + 1) % 8 === 0) || i === giftList.length - 1) {
      result.push(tempArr);
      tempArr = [];
    }
  }
  return result;
};

// 格式化照片类型列表
export const formatPhotoTypeList = (photoTypeList) => {
  const result = [];
  for (let i = 0; i < photoTypeList.length; i += 1) {
    result.push({
      id: photoTypeList[i].id,
      giftId: photoTypeList[i].giftconst,
      name: PHOTO_TYPE[i].name,
      size: PHOTO_TYPE[i].size,
      price: parseFloat(photoTypeList[i].giftprice),
      time: photoTypeList[i].couponinfo,
    });
  }
  return result;
};

// 格式化霸气弹幕类型列表
export const formatDanmuTypeList = (danmuTypeList) => {
  const result = [];
  const DANMU_TYPE_ZSHL = ['龍', '鳳', '麒麟'];
  for (let i = 0; i < danmuTypeList.length; i += 1) {
    result.push({
      id: danmuTypeList[i].id,
      giftId: danmuTypeList[i].giftconst,
      name: store.state.live.sceneType !== '91' ? DANMU_TYPE[i].name : DANMU_TYPE_ZSHL[i],
      size: DANMU_TYPE[i].size,
      wish: danmuTypeList[i].giftname,
      price: parseFloat(danmuTypeList[i].giftprice),
    });
  }
  return result;
};
// 格式化超级弹幕类型列表
export const formatSuperDanmuTypeList = (superDanmuTypeList) => {
  const result = [];
  for (let i = 0; i < superDanmuTypeList.length; i += 1) {
    result.push({
      id: superDanmuTypeList[i].id,
      giftId: superDanmuTypeList[i].giftconst,
      price: parseFloat(superDanmuTypeList[i].giftprice),
      time: superDanmuTypeList[i].shijian,
      giftname: SUPERDANMU_TYPE[i].name,
    });
  }
  return result;
};
// 格式化霸屏类型列表
export const formatBapinTypeList = (bapinTypeList) => {
  const result = [];
  for (let i = 0; i < bapinTypeList.length; i += 1) {
    result.push({
      id: bapinTypeList[i].id,
      giftId: bapinTypeList[i].giftconst,
      giftname: bapinTypeList[i].giftname,
      price: parseFloat(bapinTypeList[i].giftprice),
      shijian: bapinTypeList[i].shijian,
    });
  }
  return result;
};
/** 通过gameCode获取game的一些常量
 * @param gameCode 游戏code
 * @parma wsData websocket数据
 * @return {{enterType: string, gameUrl: string, needShake: boolean}} gameInfo
 */
export const getGameInfoByGameCode = (gameCode, wsData = null) => {
  // TODO 后续改成从路由meta信息中获取并生成map，然后根据gameCode获取，
  // NOTENEW 后续这些数据直接在大屏初始化的时候就传过来，不需要再根据gameCode判断生成

  // 之所以使用in而不是wsData?.h5GameInfo?.属性名，是因为needShake可能为false导致判断不准确
  if (wsData?.h5GameInfo && 'enterType' in wsData?.h5GameInfo && 'gameUrl' in wsData?.h5GameInfo && 'needShake' in wsData?.h5GameInfo) {
    return {
      enterType: wsData.h5GameInfo.enterType,
      gameUrl: wsData.h5GameInfo.gameUrl,
      needShake: wsData.h5GameInfo.needShake,
    };
  }

  const gameInfo = {
    enterType: 'h5',
    gameUrl: '',
    needShake: false,
  };
  if (store.state.app.env === 'miniProgram' || store.state.app.env === 'tt') {
    switch (gameCode) {
      case 'hmPlay3':
        // 扭一扭
        gameInfo.enterType = 'mp';
        gameInfo.gameUrl = `/pages/nyn/nyn?userId=${store.state.user.userId}&openId=${store.state.user.openId}&name=${store.state.user.name}&headImg=${store.state.user.headImg}`;
        gameInfo.needShake = false;
        break;
      case 'hmPlay4':
        // 转一转
        gameInfo.enterType = 'mp';
        gameInfo.gameUrl = `/pages/zyz/zyz?userId=${store.state.user.userId}&openId=${store.state.user.openId}&zyzList=${store.state.live.zyzList}&name=${store.state.user.name}&headImg=${store.state.user.headImg}`;
        gameInfo.needShake = false;
        break;
      case 'hmPlay30':
      case 'hmPlay31':
        // 喊红包
        gameInfo.enterType = 'mp';
        gameInfo.gameUrl = `/pages/shoutHb/index?userId=${store.state.user.userId}`;
        gameInfo.needShake = false;
        break;
      case 'hmPlay21':
        // 幸运小转盘
        gameInfo.enterType = 'mp';
        gameInfo.gameUrl = `/pages/luckyWheel/luckyWheel?userId=${store.state.user.userId}&openId=${store.state.user.openId}&zyzList=${store.state.live.zyzList}&name=${store.state.user.name}&headImg=${store.state.user.headImg}`;
        gameInfo.needShake = false;
        break;
      case 'hmPlay1':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/hby';
        gameInfo.needShake = true;
        break;
      case 'hmPlay26':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/hbyWedding';
        gameInfo.needShake = true;
        break;
      case 'hmPlay6':
        // 摇一摇
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/shake';
        gameInfo.needShake = true;
        break;
      case 'hmPlay33':
        // 摇钱树
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/moneyTree';
        gameInfo.needShake = true;
        break;
      case 'hmPlay34':
        // 放鞭炮
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/playFireworks';
        gameInfo.needShake = true;
        break;
      case 'hmPlay8':
        // 谁最牛
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/cattleShake';
        gameInfo.needShake = true;
        break;
      case 'hmPlay27':
        // 飞龙在天
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/shakeDragon';
        gameInfo.needShake = true;
        break;
      case 'hmPlay28':
        // 游龙戏珠
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/dragonPlayBead';
        gameInfo.needShake = true;
        break;
      case 'hmPlay7':
        // 数钞票
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/countMoney';
        gameInfo.needShake = false;
        break;
      case 'hmPlay9':
        // 切水果
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/cutFruit';
        gameInfo.needShake = false;
        break;
      case 'hmPlay17':
        // 狼吞虎咽
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/pigOut';
        gameInfo.needShake = false;
        break;
      case 'hmPlay18':
        // 武松打虎
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/clickTiger';
        gameInfo.needShake = false;
        break;
      case 'hmPlay32':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/goldenSnake';
        gameInfo.needShake = false;
        break;
      case 'hmPlay35':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/wishTreeLottery';
        gameInfo.needShake = false;
        break;
      case 'hmPlay20':
        // 踢足球
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/playFootball';
        gameInfo.needShake = false;
        break;
      case 'hmPlay2':
        // 开宝箱
        gameInfo.enterType = 'mp';
        gameInfo.gameUrl = `/pages/kbx/kbx?userId=${store.state.user.userId}&openId=${store.state.user.openId}&name=${store.state.user.name}&headImg=${store.state.user.headImg}&isForbidBuyHbq=${store.state.user.isForbidBuyHbq}`;
        gameInfo.needShake = false;
        break;
      case 'hmPlay5':
        // 红包墙
        gameInfo.enterType = 'mp';
        gameInfo.gameUrl = `/pages/hbWall/hbWall?userId=${store.state.user.userId}&openId=${store.state.user.openId}&name=${store.state.user.name}&headImg=${store.state.user.headImg}&isForbidBuyHbq=${store.state.user.isForbidBuyHbq}`;
        gameInfo.needShake = false;
        break;
      case 'vote':
        // 投票
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/vote';
        gameInfo.needShake = false;
        break;
      case 'hmPlay10':
        // 手写签名
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/bubbleSign';
        gameInfo.needShake = false;
        break;
      case 'hmPlay11':
        // 点红包
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/clickHb';
        gameInfo.needShake = false;
        break;
      case 'hmPlay12':
        // 赛龙舟
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/dragonBoatTeamShake';
        gameInfo.needShake = true;
        break;
      case 'hmPlay13':
        // 跳一跳
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/jumpBone';
        gameInfo.needShake = false;
        // gameInfo.enterType = 'thirdParty';
        // gameInfo.gameUrl = `/miniGame/templeEscape/index.html?splid=${store.state
        //   .live.liveId}&userId=${store.state.user.userId}&token=${store.state.app
        //   .token}`;
        // gameInfo.needShake = false;
        break;
      case 'hmPlay14':
        // 评分
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/giveMark';
        gameInfo.needShake = false;
        break;
      case 'hmPlay15':
        // 猜红包
        gameInfo.enterType = 'mp';
        gameInfo.gameUrl = `/pages/guessHb/guessHb?userId=${store.state.user.userId}&openId=${store.state.user.openId}&name=${store.state.user.name}`;
        gameInfo.needShake = false;
        break;
      case 'hmPlay16':
        // 争分夺秒
        gameInfo.enterType = 'mp';
        gameInfo.gameUrl = `/pages/zfdm/zfdm?userId=${store.state.user.userId}&openId=${store.state.user.openId}&name=${store.state.user.name}&headImg=${store.state.user.headImg}`;
        gameInfo.needShake = false;
        break;
      case 'hmPlay19':
        // 送祝福
        gameInfo.enterType = 'popup';
        gameInfo.gameUrl = 16;
        gameInfo.needShake = false;
        break;
      case 'hmPlay22':
        // 对对碰
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/duiduipeng';
        gameInfo.needShake = false;
        break;
      case 'hmPlay23':
        // 兔子投篮
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/basketball-shoot';
        gameInfo.needShake = false;
        break;
      case 'hmPlay24':
        // 雀神大赛
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/majiang';
        gameInfo.needShake = false;
        break;
      case 'hmPlay25':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/happyQA';
        gameInfo.needShake = false;
        break;
      case 'hmPlay29':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/guessLanternRiddle';
        gameInfo.needShake = false;
        break;
      default:
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '我是默认地址';
        gameInfo.needShake = false;
    }
  } else if (store.state.app.env === 'h5') {
    switch (gameCode) {
      case 'hmPlay3':
        // 扭一扭
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/nyn';
        gameInfo.needShake = false;
        break;
      case 'hmPlay4':
        // 转一转
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/zyz';
        gameInfo.needShake = false;
        break;
      case 'hmPlay21':
        // 幸运小转盘
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/luckyWheel';
        gameInfo.needShake = false;
        break;
      case 'hmPlay1':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/hby';
        gameInfo.needShake = true;
        break;
      case 'hmPlay26':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/hbyWedding';
        gameInfo.needShake = true;
        break;
      case 'hmPlay6':
        // 摇一摇
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/shake';
        gameInfo.needShake = true;
        break;
      case 'hmPlay8':
        // 谁最牛
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/cattleShake';
        gameInfo.needShake = true;
        break;
      case 'hmPlay27':
        // 飞龙在天
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/shakeDragon';
        gameInfo.needShake = true;
        break;
      case 'hmPlay28':
        // 游龙戏珠
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/dragonPlayBead';
        gameInfo.needShake = true;
        break;
      case 'hmPlay33':
        // 摇钱树
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/moneyTree';
        gameInfo.needShake = true;
        break;
      case 'hmPlay34':
        // 放鞭炮
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/playFireworks';
        gameInfo.needShake = true;
        break;
      case 'hmPlay7':
        // 数钞票
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/countMoney';
        gameInfo.needShake = false;
        break;
      case 'hmPlay9':
        // 切水果
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/cutFruit';
        gameInfo.needShake = false;
        break;
      case 'hmPlay17':
        // 狼吞虎咽
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/pigOut';
        gameInfo.needShake = false;
        break;
      case 'hmPlay18':
        // 武松打虎
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/clickTiger';
        gameInfo.needShake = false;
        break;
      case 'hmPlay35':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/wishTreeLottery';
        gameInfo.needShake = false;
        break;
      case 'hmPlay32':
        // 金蛇纳福
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/goldenSnake';
        gameInfo.needShake = false;
        break;
      case 'hmPlay20':
        // 踢足球
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/playFootball';
        gameInfo.needShake = false;
        break;
      case 'hmPlay2':
        // 开宝箱
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/kbx';
        gameInfo.needShake = false;
        break;
      case 'hmPlay5':
        // 红包墙
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/hbWall';
        gameInfo.needShake = false;
        break;
      case 'vote':
        // 投票
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/vote';
        gameInfo.needShake = false;
        break;
      case 'hmPlay10':
        // 手写签名
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/bubbleSign';
        gameInfo.needShake = false;
        break;
      case 'hmPlay11':
        // 点红包
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/clickHb';
        gameInfo.needShake = false;
        break;
      case 'hmPlay12':
        // 赛龙舟
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/dragonBoatTeamShake';
        gameInfo.needShake = true;
        break;
      case 'hmPlay13':
        // 跳一跳
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/jumpBone';
        gameInfo.needShake = false;
        break;
      case 'hmPlay14':
        // 评分
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/giveMark';
        gameInfo.needShake = false;
        break;
      case 'hmPlay15':
        // 猜红包
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/guessHb';
        gameInfo.needShake = false;
        break;
      case 'hmPlay16':
        // 争分夺秒
        gameInfo.enterType = 'mp';
        gameInfo.gameUrl = `/pages/zfdm/zfdm?userId=${store.state.user.userId}&openId=${store.state.user.openId}`;
        gameInfo.needShake = false;
        break;
      case 'hmPlay19':
        // 送祝福
        gameInfo.enterType = 'popup';
        gameInfo.gameUrl = 16;
        gameInfo.needShake = false;
        break;
      case 'hmPlay22':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/duiduipeng';
        gameInfo.needShake = false;
        break;
      case 'hmPlay23':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/basketball-shoot';
        gameInfo.needShake = false;
        break;
      case 'hmPlay24':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/majiang';
        gameInfo.needShake = false;
        break;
      case 'hmPlay25':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/happyQA';
        gameInfo.needShake = false;
        break;
      case 'hmPlay29':
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '/guessLanternRiddle';
        gameInfo.needShake = false;
        break;
      default:
        gameInfo.enterType = 'h5';
        gameInfo.gameUrl = '我是默认地址';
        gameInfo.needShake = false;
    }
  }
  /**
   * 临时兼容的代码块
   * 互动小程序进行了分包优化，游戏地址发生了改变
   * 待其他小程序优化好后删除当前代码、并将gameUrl调整为新的地址
   */
  if (gameInfo.enterType === 'mp' && store.state.app.mpType) {
    tmpAdjustGameUrl(gameInfo);
  }
  return gameInfo;
};

// 推荐礼物自动弹出(无操作30s后自动弹出)
export const recommendGiftLogic = () => {
  let recommendCount = -1; // 推荐礼物弹出计时器
  const emptyOperateTime = process.env.NODE_ENV === 'production' ? 30 : 3; // 空操作时间
  // 重置弹出礼物定时器
  const resetRecommendInterval = () => {
    recommendCount = -1;
  };
  // 定时器
  const recommendInterval = setInterval(() => {
    recommendCount += 1;

    if (recommendCount >= emptyOperateTime) {
      // 被拉黑不弹出推荐礼物
      if (store.state.user.isForbidBuyHbq) {
        clearInterval(recommendInterval);
        return;
      }
      // 字节小程序不弹出推荐礼物
      if (store.state.app.env === 'tt') {
        clearInterval(recommendInterval);
        return;
      }
      // 如果设置了礼物发送不可见则不弹出推荐礼物
      if (!store.state.app.giftSendVisible) {
        clearInterval(recommendInterval);
        return;
      }
      // 弹出层正在展示中则重置定时器
      if (store.state.app.popupModuleKey > -1) {
        console.log('***弹出层正在展示中***');
        console.log(store.state.app.popupModuleKey);
        resetRecommendInterval();
        return;
      }

      // 当前在game中(不包括签到)则重置定时器
      if ((store.state.game.gameStatus === 1 || store.state.game.gameStatus === 2) && store.state.game.currentGameCode !== 'sign') {
        resetRecommendInterval();
        return;
      }
      // 限制每次进入只自动弹出1次
      let recommendGiftFlag = localStorage.getItem('recommendGiftFlag');
      if (recommendGiftFlag) {
        clearInterval(recommendInterval);
        localStorage.removeItem('recommendGiftFlag');
        console.log('***recommendGift auto popup one times***');
        return;
      }
      recommendGiftFlag = 1;
      localStorage.setItem('recommendGiftFlag', recommendGiftFlag);
      store.commit('app/togglePopup', 6);
    }
  }, 1000);
  return resetRecommendInterval;
};

// 功能提示自动弹出(无操作40s后自动弹出)
export const funcTipLogic = () => {
  let funcTipCount = -1; // 功能提示弹出计时器
  const emptyOperateTime = process.env.NODE_ENV === 'production' ? 40 : 10; // 空操作时间
  // 重置功能提示定时器
  const resetFuncTipInterval = () => {
    funcTipCount = -1;
  };
  // 获取带弹出功能提示的索引
  const getIndex = (cIndexs) => {
    const originIndexs = [0, 1, 2, 3, 4];
    let resultIndex = -1;
    if (!cIndexs) {
      resultIndex = generateRandom(0, 5);
    } else {
      const tempIndexs = [];
      for (let i = 0; i < 5; i += 1) {
        if (cIndexs.indexOf(originIndexs[i]) === -1) {
          tempIndexs.push(originIndexs[i]);
        }
      }
      const tempLen = tempIndexs.length;
      if (tempLen > 0) {
        resultIndex = tempIndexs[generateRandom(0, tempLen)];
      }
    }
    return resultIndex;
  };
  // 弹出提示
  const popupFuncTip = (fIndex) => {
    store.commit('app/setFuncTipIndex', fIndex);
    store.commit('app/togglePopup', POPUP_MODULE.funcTipModule.key);
  };
  // 定时器
  const funcTipInterval = setInterval(() => {
    funcTipCount += 1;

    if (funcTipCount >= emptyOperateTime) {
      // 被拉黑不弹出功能提示
      if (store.state.user.isForbidBuyHbq) {
        clearInterval(funcTipInterval);
        return;
      }
      // 字节小程序不弹出功能提示
      if (store.state.app.env === 'tt') {
        clearInterval(funcTipInterval);
        return;
      }
      // 非婚礼版、非中式婚礼版不弹出功能提示
      if (!['0', '91'].includes(store.state.live.sceneType)) {
        clearInterval(funcTipInterval);
        return;
      }
      // 如果设置了礼物发送不可见则不弹出功能提示
      if (!store.state.app.giftSendVisible) {
        clearInterval(funcTipInterval);
        return;
      }
      // 弹出层正在展示中则重置定时器
      if (store.state.app.popupModuleKey > -1) {
        console.log('***弹出层正在展示中***');
        console.log(store.state.app.popupModuleKey);
        resetFuncTipInterval();
        return;
      }

      // 当前在game中(不包括签到)则重置定时器
      if ((store.state.game.gameStatus === 1 || store.state.game.gameStatus === 2) && store.state.game.currentGameCode !== 'sign') {
        resetFuncTipInterval();
        return;
      }
      // 限制每场活动进入只自动弹出5次
      // funcTipInfo: {liveId,indexs:[0,1,2,3,4]}
      const funcTipInfoStr = localStorage.getItem('funcTipInfo');
      if (funcTipInfoStr) {
        const funcTipInfo = JSON.parse(funcTipInfoStr);
        if (funcTipInfo.liveId !== store.state.live.liveId) {
          // 新的活动
          localStorage.removeItem('funcTipInfo');
          const cIndex = getIndex();

          console.log(`弹出${cIndex}`);
          popupFuncTip(cIndex);
          const tempObjStr = JSON.stringify({
            liveId: store.state.live.liveId,
            indexs: [cIndex],
          });
          localStorage.setItem('funcTipInfo', tempObjStr);
          resetFuncTipInterval();
        } else {
          const cIndex = getIndex(funcTipInfo.indexs);
          if (cIndex === -1) {
            console.log('本场活动功能提示已全部弹出过啦!');
            clearInterval(funcTipInterval);
          } else {
            console.log(`弹出${cIndex}`);
            popupFuncTip(cIndex);
            funcTipInfo.indexs.push(cIndex);
            const tempObjStr = JSON.stringify({
              ...funcTipInfo,
            });
            localStorage.setItem('funcTipInfo', tempObjStr);
            resetFuncTipInterval();
          }
        }
      } else {
        const cIndex = getIndex();
        console.log(`弹出${cIndex}`);
        popupFuncTip(cIndex);
        const tempObjStr = JSON.stringify({
          liveId: store.state.live.liveId,
          indexs: [cIndex],
        });
        localStorage.setItem('funcTipInfo', tempObjStr);
        resetFuncTipInterval();
      }
    }
  }, 1000);
  return resetFuncTipInterval;
};

// 根据key查找弹出模块
export const getPopModuleByKey = (key) => {
  const moduleKeys = Object.keys(POPUP_MODULE);
  const tmpLen = moduleKeys.length;
  let tmpResult = null;
  for (let i = 0; i < tmpLen; i += 1) {
    if (POPUP_MODULE[moduleKeys[i]].key === key) {
      tmpResult = POPUP_MODULE[moduleKeys[i]];
      break;
    }
  }
  return tmpResult;
};

// hotelInfo存入localStorage
// tObj格式{key(所要保存的值的键名) value(所要保存的值)}
export const saveHotelInfoToLocal = (tObj) => {
  const hotelReserveInfoStr = localStorage.getItem('hotelReserveInfo');
  if (!hotelReserveInfoStr) {
    const tmpObj = {
      currentId: '',
      menuList: [],
      banquetList: [],
      setMealList: [],
      discountLIst: [],
      couponList: [],
    };
    tmpObj[tObj.key] = tObj.value;
    localStorage.setItem('hotelReserveInfo', JSON.stringify(tmpObj));
  } else {
    const tmpObj2 = JSON.parse(hotelReserveInfoStr);
    tmpObj2[tObj.key] = tObj.value;
    localStorage.setItem('hotelReserveInfo', JSON.stringify(tmpObj2));
  }
};
// 读取hotelInfo从localStorage
export const getHotelInfoFromLocal = (key) => {
  let result;
  const hotelReserveInfoStr = localStorage.getItem('hotelReserveInfo');
  if (hotelReserveInfoStr) {
    const tmpObj = JSON.parse(hotelReserveInfoStr);
    result = tmpObj[key];
  }
  return result;
};

// 根据sceneType获取祝福语
export const getWishBySceneType = (sceneType, returnType) => {
  let tmpWishList;
  if (sceneType === '0') {
    tmpWishList = WISH.wedding;
  } else if (sceneType === '1') {
    tmpWishList = WISH.annualMeeting;
  } else if (sceneType === '2' || sceneType === '26') {
    tmpWishList = WISH.birth;
  } else if (sceneType === '21') {
    tmpWishList = WISH.bby;
  } else if (sceneType === '22') {
    tmpWishList = WISH.sy;
  } else if (sceneType === '23') {
    tmpWishList = WISH.crl;
  } else if (sceneType === '24') {
    tmpWishList = WISH.bly;
  } else if (sceneType === '25') {
    tmpWishList = WISH.myy;
  } else if (sceneType === '41') {
    tmpWishList = WISH.bydl;
  } else if (sceneType === '42') {
    tmpWishList = WISH.xsy;
  } else if (sceneType === '43') {
    tmpWishList = WISH.jbtm;
  } else if (sceneType === '51') {
    tmpWishList = WISH.txh;
  } else if (sceneType === '52') {
    tmpWishList = WISH.qqy;
  } else if (sceneType === '53') {
    tmpWishList = WISH.hx;
  } else if (sceneType === '54') {
    tmpWishList = WISH.dhy;
  } else if (sceneType === '91') {
    tmpWishList = WISH.wedding;
  } else if (sceneType === '55') {
    tmpWishList = WISH.wl;
  }
  let tmpResult;
  if (returnType === 'list') {
    tmpResult = tmpWishList;
  } else {
    const tmpWishListLen = tmpWishList.length;
    tmpResult = tmpWishList[generateRandom(0, tmpWishListLen)];
  }
  return tmpResult;
};
// 根据sceneType获取快捷祝福语
export const generateQuickWishBySceneType = (sceneType, returnType) => {
  let tmpWishList;
  if (sceneType === '0') {
    tmpWishList = QUICKWISHES.wedding;
  } else if (sceneType === '1') {
    tmpWishList = QUICKWISHES.annualMeeting;
  } else if (sceneType === '2' || sceneType === '26') {
    tmpWishList = QUICKWISHES.birth;
  } else if (sceneType === '21') {
    tmpWishList = QUICKWISHES.bby;
  } else if (sceneType === '22') {
    tmpWishList = QUICKWISHES.sy;
  } else if (sceneType === '23') {
    tmpWishList = QUICKWISHES.crl;
  } else if (sceneType === '24') {
    tmpWishList = QUICKWISHES.bly;
  } else if (sceneType === '25') {
    tmpWishList = QUICKWISHES.myy;
  } else if (sceneType === '41') {
    tmpWishList = QUICKWISHES.bydl;
  } else if (sceneType === '42') {
    tmpWishList = QUICKWISHES.xsy;
  } else if (sceneType === '43') {
    tmpWishList = QUICKWISHES.jbtm;
  } else if (sceneType === '51') {
    tmpWishList = QUICKWISHES.txh;
  } else if (sceneType === '52') {
    tmpWishList = QUICKWISHES.qqy;
  } else if (sceneType === '53') {
    tmpWishList = QUICKWISHES.hx;
  } else if (sceneType === '54') {
    tmpWishList = QUICKWISHES.dhy;
  } else if (sceneType === '55') {
    tmpWishList = QUICKWISHES.wl;
  }
  let tmpResult;
  if (returnType === 'list') {
    tmpResult = tmpWishList;
  } else {
    const tmpWishListLen = tmpWishList.length;
    tmpResult = tmpWishList[generateRandom(0, tmpWishListLen)];
  }
  return tmpResult;
};

export const getSeatPopupFlag = () => {
  // seatPopup
  let seatPopup = localStorage.getItem('seatPopup');
  if (seatPopup && seatPopup !== store.state.live.liveId) {
    // 新的活动
    localStorage.removeItem('seatPopup');
    localStorage.removeItem('seatMy');
    localStorage.removeItem('seatSearchList');
    seatPopup = null;
  }
  return seatPopup;
};
export const updateSeatPopupFlag = () => {
  localStorage.setItem('seatPopup', store.state.live.liveId);
};

export const removeSeatPopupFlag = () => {
  localStorage.removeItem('seatPopup');
  localStorage.removeItem('seatMy');
  localStorage.removeItem('seatSearchList');
};
