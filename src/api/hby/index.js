import request from '../../utils/request';
import store from '../../store/index';

// 开始红包雨game
export function startHby() {
  return request.get(`play/initHby6?userId=${store.state.user.userId}&spoId=${store.state.live.liveId}&playInfo=hmPlay1`);
}
// 抢红包
export function robHb(score) {
  return request.post('play/bietiansheng6', {
    splid: store.state.live.liveId,
    playInfo: 'hmPlay1',
    score,
    userId: store.state.user.userId,
    hbId: store.state.game.hbId,
  });
}
export function getHbyRank() {
  return request.get(`play/redBaoRank6?splid=${store.state.live.liveId}&userId=${store.state.user.userId}`);
}

// 开始点红包game
export function startClickHb() {
  return request.get(`play/initHby6?userId=${store.state.user.userId}&spoId=${store.state.live.liveId}&playInfo=hmPlay11`);
}
// 点红包
export function robClickHb(score) {
  return request.post('play/bietiansheng6', {
    splid: store.state.live.liveId,
    playInfo: 'hmPlay11',
    score,
    userId: store.state.user.userId,
    hbId: store.state.game.hbId,
  });
}
