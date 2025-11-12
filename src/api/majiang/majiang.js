// 雀神大赛接口
import store from '@/store/index';
import request from '@/utils/request';

/** 获取等待界面的麻将题目 */
export const getWaitQs = () => {
  return request.get(`newPlay/getExampleMjTopic?splid=${store.state.live.liveId}`);
};

/** 获取本局游戏的所有题目 */
export const getAllQs = () => {
  return request.get(`newPlay/getMjTopic?splid=${store.state.live.liveId}`);
};

/** 记录答题时间
 * @param {string} answerTime 答题所用的时间
 * @param {string} answerTopic 回答的题目的轮次
 */
export const recordReplyTime = (answerTime, answerTopic) => {
  return request.post('newPlay/recordMj', {
    splid: store.state.live.liveId,
    answerTime,
    answerTopic,
  });
};

/** 获取用户排行榜数据 */
export const getRankList = () => {
  return request.post('newPlay/userRank', {
    splid: store.state.live.liveId,
  });
};

/** 中途加入获取当前轮次及当前轮次剩余的时间 */
export const getCurrentRoundInfo = () => {
  return request.post('newPlay/mjEnterGame', {
    splid: store.state.live.liveId,
  });
};
