import request from '../../utils/request';
import store from '../../store/index';

/**
 * 获取愿望树基本状态
 * @returns {Promise} 返回愿望树的基本信息
 */
export const getWishTreeStatus = () => {
  return request.get('happy/initWishTree', {
    params: {
      splid: store.state.live.liveId,
    },
  });
};

/**
 * 发送祝福到愿望树
 * @param {object} params 祝福参数
 * @param {string} params.content 祝福内容
 * @param {string} [params.type] 祝福类型
 * @returns {Promise} 返回发送结果
 */
export const sendWishTree = (params) => {
  return request.post('happy/sendWishTree', {
    splid: store.state.live.liveId,
    content: params.content,
    wish_tree_sort: params.wish_tree_sort || '1', // 轮次 ,转成字符串
  });
};

/**
 * 获取本次抽奖的中奖人列表
 */
export const getWishTreeResult = () => {
  return request.get('happy/getWishTreeResult', {
    params: {
      splid: store.state.live.liveId,
    },
  });
};
