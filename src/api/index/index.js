import axios from 'axios';
import request from '../../utils/request';
import requestMp from '../../utils/requestMp';
import requestUpload from '../../utils/requestUpload';
import store from '../../store/index';

// 获取活动信息
export function getLiveInfo() {
  return request.post('wxScan/chaoJiSaiYaRen', {
    splid: store.state.live.liveId,
  });
}

// 获取礼物列表
export function getGiftList() {
  return request.post('hmGiftController/listGift7', {
    splid: store.state.live.liveId,
  });
}
// 获取红包口袋信息
export function getHBKDInfo() {
  return request.post('hbkd/shenLuoTianZheng6', {
    splid: store.state.live.liveId,
  });
}

// 加入game
export function attendGame() {
  return request.get(`sendMsgController/renGo6?splid=${store.state.live.liveId}&userId=${store.state.user.userId}`);
}

// 获取game状态
export function getGameStatus() {
  return request.get(`play/baiyan6?splid=${store.state.live.liveId}&userId=${store.state.user.userId}`);
}

// 上传照片
export function uploadPhoto(formData) {
  console.log(formData.get('prefix'), formData.get('file'));
  return requestUpload.post('beiJing/shangchuanTomcat', formData);
}
// 发送礼物
export function sendGift(
  { giftId = store.state.app.currentGiftType } = {
    giftId: store.state.app.currentGiftType,
  },
) {
  return request.post('hmGiftController/sendGift6', {
    splid: store.state.live.liveId,
    giftconst: giftId,
  });
}

// 发送嘉年华礼物
export function sendGiftCarnival(
  { giftId = store.state.app.currentGiftType } = {
    giftId: store.state.app.currentGiftType,
  },
) {
  return request.post('hmGiftController/buySuperBp', {
    splid: store.state.live.liveId,
    giftconst: giftId,
    gstate: '6',
  });
}

// 发送推荐礼物
export function sendRecommendGift({ giftId = '' }) {
  return request.post('hmGiftController/sendGift6', {
    splid: store.state.live.liveId,
    giftconst: giftId,
  });
}
// 发送照片礼物
export function sendPhotoGift({ content, imgUrl, giftId = store.state.app.currentPhotoType }) {
  return request.post('hmGiftController/sendGift6', {
    splid: store.state.live.liveId,
    giftconst: giftId,
    content,
    tpUrl: imgUrl,
  });
}

// 发送霸气弹幕礼物
export function sendDanmuGift({ content, giftSource = '', giftId = store.state.app.currentDanmuType }) {
  return request.post('hmGiftController/sendGift6', {
    splid: store.state.live.liveId,
    giftconst: giftId,
    content,
    gift_source: giftSource,
  });
}

// 发送超级弹幕礼物
export function sendSuperDanmuGift({ content, giftId = store.state.app.currentSuperDanmuType }) {
  return request.post('hmGiftController/buySuperBp', {
    splid: store.state.live.liveId,
    giftconst: giftId,
    title: content,
  });
}

// 发送霸屏礼物
export function sendBapinGift({ content, giftId = store.state.app.currentBapinType }) {
  return request.post('hmGiftController/sendGift6', {
    splid: store.state.live.liveId,
    giftconst: giftId,
    content,
  });
}

// 发送手写签到文字
export function sendBubbleSignText(text) {
  return request.post('hmGiftController/sendHandSign', {
    splid: store.state.live.liveId,
    title: text,
    type: 'hand',
  });
}

// 获取发送礼物排行榜
export function getGiftRankList() {
  return request.post('hmGiftController/findGiftRankList6', {
    splid: store.state.live.liveId,
  });
}

// 购买进场特效
export function buyVipEnterEffect(giftId) {
  return request.post('hmGiftController/buyVipJc', {
    splid: store.state.live.liveId,
    giftconst: giftId,
  });
}

// 修改个人信息
export function editUserInfo(paramObj) {
  return request.post('hmGiftController/editUserInfo', {
    wx_name: paramObj.wx_name,
    avator: paramObj.avator,
    table_number: paramObj.table_number,
    position: paramObj.position,
    type: paramObj.type,
    splid: store.state.live.liveId,
  });
}

// 获取个人信息
export function reqGetUserInfo() {
  return request.get('wxScan/getUserBaseInfo', {});
}

// 签到
export function signIn(paramObj) {
  return request.post('hmScanReportController/qianDao', {
    avator: store.state.user.headImg,
    splid: store.state.live.liveId,
    bless_str: paramObj.wish,
    wx_name: paramObj.name,
  });
}

// 获取男女方发送礼物排行榜
export function getRoleGiftRankList() {
  return request.get(`hmGiftController/findGiftRankList7?splid=${store.state.live.liveId}`);
}

// 提交反馈
export function submitFeedback(paramObj) {
  return request.post('wxScan/commandInfo6', {
    userId: store.state.user.userId,
    content: paramObj.desc,
    phone_number: paramObj.phone,
    reason: paramObj.type,
    splid: store.state.live.liveId,
    piclink: paramObj.imgurl,
  });
}

// 红包口袋充值
export function rechageHbkd(paramObj) {
  return requestMp.post('hmWxmoney/chongZhiRedB', {
    USER_ID: store.state.user.userId,
    splid: store.state.live.liveId,
    openid: store.state.user.openId,
    totalfee: paramObj.total,
  });
}

// 喵钻充值
export function diamondRecharge(paramObj) {
  return requestMp.post('hmWxmoney/chongzhiMiao', {
    userId: store.state.user.userId,
    openid: store.state.user.openId,
    total: paramObj.total,
  });
}

// 抢签到红包
export function robSignHb() {
  return request.post('/hmScanReportController/robSunMoney', {
    splid: store.state.live.liveId,
  });
}

// 送祝福游戏礼物列表
export function getSendGiftGameList() {
  return request.post('/hmGiftController/wishGiftList', {
    splid: store.state.live.liveId,
  });
}

// h5链接直接进入婚宴预定前调用的接口
export function getH5DirectVisitInfo() {
  return request.get('h5UserLogin/getYunJingBaseInfo?type=1');
}

// 获取签到排名
export function getSignRankList() {
  return request.get(`hmGiftController/findGiftRankListAll?splid=${store.state.live.liveId}`);
}

// 获取点歌列表
export function getSongOrderedList() {
  return request.post('hmGiftController/getMusicList', {
    splid: store.state.live.liveId,
  });
}

// 获取顶部飘动的礼物数据
export function getFloatGiftList() {
  return request.post('hmGiftController/piaoGiftList', {
    splid: store.state.live.liveId,
  });
}

// 获取云端的json文件配置
export function getJsonConfig(jsonPath) {
  return axios.get(jsonPath);
}

/**
 * 修改男女方亲友
 * @param {string} type 取值格式 1|2|'' 或者1-1 2-1... 或者 【自定义】
 * @returns
 */
export function reqEditRelatives(type) {
  return request.post('common/updateType', {
    type,
  });
}

/**
 * 获取抽奖机会
 */
export function reqGetSendGiftChance() {
  return request.post('giftLotteryController/getChance', {
    splid: store.state.live.liveId,
  });
}

// 获取签到信息
export function getQianDaoInfo() {
  return request.get(`hmScanReportController/getQianDaoInfo?splid=${store.state.live.liveId}`);
}
