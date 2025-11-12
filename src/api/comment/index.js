import { getUrlParam } from '@/utils/index';
import requestWWW from '../../utils/requestWWW';
import store from '../../store/index';

// 获取我的评价及主持人信息
export const getHostInfo = () => {
  return requestWWW.post('/splidComment/getMyComment', {
    splid: store.state.live.liveId,
    token: getUrlParam('token'),
  });
};
// 进行评价
export const commitComment = (pObj) => {
  return requestWWW.post('/splidComment/saveUserComment', {
    splid: store.state.live.liveId,
    content: pObj.content,
    type: '3',
    label: pObj.label,
    satisfaction: pObj.satisfaction,
  });
};
// 获取评价汇总信息
export const getHostCommentBase = () => {
  return requestWWW.post('/splidComment/getUserComment', {
    splid: store.state.live.liveId,
  });
};
// 获取所欲评价用户评价列表
export const getHostCommentList = (pObj) => {
  return requestWWW.post('/splidComment/getCommentList', {
    splid: store.state.live.liveId,
    type: '3',
    currentPage: pObj.currentPage,
    showCount: pObj.showCount,
  });
};
// 打赏主持
export const Reward = (pObj) => {
  return requestWWW.post('/splidComment/getCommentList', {
    splid: store.state.live.liveId,
    totalfee: pObj.totalfee,
  });
};
// 回复
export const replyUser = (pObj) => {
  return requestWWW.post('/splidComment/getCommentList', {
    splid: store.state.live.liveId,
    type: '5',
    album_comment_id: pObj.album_comment_id,
    content: pObj.content,
  });
};

// 获取验证码
export const getValidateCode = (pObj) => {
  return requestWWW.post('/dengLuHm/faSongCode', {
    phonenumber: pObj.phone,
    source: '6',
  });
};

// 验证手机号
export const checkPhone = (pObj) => {
  return requestWWW.post('/dengLuHm/checkPhone', {
    phonenumber: pObj.phone,
    code: pObj.code,
    token: pObj.token,
    id: pObj.id,
  });
};
