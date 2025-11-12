import request from '../../utils/request';
import store from '../../store/index';

// 发送摇一摇分数
export function sendScore(score, gameCode = 'hmPlay6', isNeedRank = 0) {
  const params = {
    splid: store.state.live.liveId,
    playInfo: gameCode,
    fenshu: score,
    userId: store.state.user.userId,
  };

  if (isNeedRank !== 0) {
    params.is_need_rank = isNeedRank;
  }

  return request.post('play/shangfen26', params);
}
// 获取摇一摇排行榜
export function getRank(gameCode, isNeedRank = 0) {
  const params = {
    splid: store.state.live.liveId,
    userId: store.state.user.userId,
    playInfo: gameCode,
  };

  if (isNeedRank !== 0) {
    params.is_need_rank = isNeedRank;
  }

  return request.get('play/newChaKeLaList6', { params });
}

// export function sendCattleScore(score) {
//   return request.post('play/shangfen26', {
//     splid: store.state.live.liveId,
//     playInfo: 'hmPlay8',
//     fenshu: score,
//     userId: store.state.user.userId,
//   });
// }

// 获取赛龙舟信息
export function getDragonBoatTeamInfo() {
  return request.post('/dragon/getDragonInfo', {
    splid: store.state.live.liveId,
  });
}

// 选择赛龙舟团队
export function chooseDragonBoatTeam(teamId) {
  return request.post('/dragon/joinDragon', {
    splid: store.state.live.liveId,
    teamId,
  });
}

// 赛龙舟提交分数
export function commitDragonBoatTeamScore(pObj) {
  return request.post('/dragon/addScore', {
    splid: store.state.live.liveId,
    fenshu: pObj.fenshu,
    teamId: pObj.teamId,
  });
}

// 赛龙舟排行榜列表
export function getDragonBoatTeamRank() {
  return request.post('/dragon/dragonRankList', {
    splid: store.state.live.liveId,
    playInfo: 'hmPlay12',
  });
}
