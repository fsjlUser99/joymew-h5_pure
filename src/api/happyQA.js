import request from '../utils/request';
import store from '../store/index';

// 获取答题基本信息
export const getHappyData = () => {
  return request.post('happy/getHappyData', {
    splid: store.state.live.liveId,
  });
};

/**
 * 提交答题结果
 * @param {object}
 * @example
 * 参数：
 * {
 *  submitSort: 1, // 第1题
 *  answers: 'A', // 选择A
 *  isCorrect: 1 // 正确
 * }
 */
export const submitAnswer = ({ submitSort, answers, isCorrect }) => {
  return request.post('happy/submitAnswers', {
    splid: store.state.live.liveId,
    submit_sort: submitSort.toString(),
    answers,
    isCorrect,
  });
};

// 获取排行榜
export const getHappyRank = () => {
  return request.post('happy/getHappyRank', {
    splid: store.state.live.liveId,
  });
};
