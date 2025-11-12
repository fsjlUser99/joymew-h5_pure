// 游戏通用接口
import store from '@/store/index';
import request from '@/utils/request';

/**
 * 提交分数通用接口，后端接收到分数后，会和已有的分数进行比较，如果比已有的分数高，则更新分数
 * @param {number} score 分数
 */
export const submitScore = (score) => {
  return request.post('play/shangfen16', {
    splid: store.state.live.liveId,
    fenshu: score,
    userId: store.state.user.userId,
  });
};

/**
 * 获取大屏的传过来的通信数据
 */
export const reqDataFromScreen = () => {
  return request.post('sendMsgController/h5GetInfo', {
    splid: store.state.live.liveId,
  });
};
