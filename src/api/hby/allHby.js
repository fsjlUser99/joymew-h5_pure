import request from '../../utils/request';
import store from '../../store/index';

// 初始化全场红包雨游戏
export function initAllHby() {
  return request.get(`allHby/initAllHby?splid=${store.state.live.liveId}`);
}

// 全场红包雨上传分数
export function uploadAllHbyScore(size) {
  return request.get(
    `allHby/robAllHby?size=${size}&splid=${store.state.live.liveId}&hbId=${store.state.game.hbId}`,
  );
}
