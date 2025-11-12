import store from '@/store';

// 婚礼版包括：普通婚礼版('0')、中式婚礼版('91')、订婚宴('54')
const WEDDING_LIKE_SCENE_TYPES = ['0', '91', '54'];

/**
 * 判断当前活动是否为婚礼版
 * @returns {boolean} 是否为婚礼版
 */
export const isWeddingVersion = () => {
  const { sceneType } = store.state.live;
  return WEDDING_LIKE_SCENE_TYPES.includes(sceneType);
};
