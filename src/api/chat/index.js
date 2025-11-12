import request from '../../utils/request';
import store from '../../store/index';

// 文本内容验证
export function securityMsgCheck(ct) {
  return request.post('subscribeController/msg_sec_check', {
    content: ct,
  });
}

// 发送聊天消息
export function sendChatMessage(message, color) {
  return request.post('sendMsgController/msgGo6', {
    content: message,
    color,
    splid: store.state.live.liveId,
  });
}

// 获取聊天记录
export function getChatMessage() {
  return request.get(
    `wxScan/getMsgInfo?splid=${store.state.live.liveId}&num=1&size=30`,
  );
}

// 发礼物的广播
export function sendGiftMessage({
  miaoColor = '',
  sendType = '',
  giftId = store.state.app.currentGiftType,
}) {
  return request.post('sendMsgController/liwuGo6', {
    splid: store.state.live.liveId,
    liwuId: giftId,
    content: '',
    miaoColor,
    send_type: sendType,
  });
}

// 发推荐礼物的广播
export function sendRecommendGiftMessage({ giftId, content = '' }) {
  return request.post('sendMsgController/liwuGo6', {
    splid: store.state.live.liveId,
    liwuId: giftId,
    content,
  });
}

// 发送照片礼物的广播
export function sendPhotoGiftMessage({
  giftId = store.state.app.currentPhotoType,
  content,
  imgUrl,
  sendType = '',
}) {
  const choosedPhotoType = store.state.live.photoTypeList.find(
    (item) => item.giftId === giftId,
  );
  return request.post('sendMsgController/liwuGo6', {
    splid: store.state.live.liveId,
    liwuId: giftId,
    content,
    tpUrl: imgUrl,
    times: choosedPhotoType.time,
    send_type: sendType,
  });
}

// 发送照片墙礼物的广播
export function sendPhotoWallGiftMessage(imgUrl) {
  return request.post('sendMsgController/liwuGo6', {
    splid: store.state.live.liveId,
    liwuId: 'Miao_PhotoWall',
    content: '爱心照片墙',
    tpUrl: imgUrl,
    times: 10,
  });
}

// 发送霸气弹幕礼物广播
export function sendDanmuGiftMessage({
  giftId = store.state.app.currentDanmuType,
  content,
  sendType = '',
}) {
  return request.post('sendMsgController/liwuGo6', {
    splid: store.state.live.liveId,
    liwuId: giftId,
    content,
    send_type: sendType,
  });
}

// 发送超级弹幕礼物广播
export function sendSuperDanmuGiftMessage({
  content,
  giftId = store.state.app.currentSuperDanmuType,
  sendType = '',
}) {
  return request.post('sendMsgController/liwuGo6', {
    splid: store.state.live.liveId,
    liwuId: giftId,
    content,
    send_type: sendType,
  });
}

// 发送霸屏礼物广播
export function sendBapinGiftMessage({
  content,
  sendType = '',
  giftId = store.state.app.currentBapinType,
}) {
  return request.post('sendMsgController/liwuGo6', {
    splid: store.state.live.liveId,
    liwuId: giftId,
    content,
    send_type: sendType,
  });
}

// 发送广播
export function sendBroasCast(paramObj) {
  return request.post('sendMsgController/duxin6', {
    ykq_info: paramObj.c,
    splid: store.state.live.liveId,
  });
}
