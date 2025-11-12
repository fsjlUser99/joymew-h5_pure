import request from '../../utils/request';
import store from '../../store/index';

// 初始化投票
export function initBrideVote() {
  return request.post('vote/getPlayerInfo2', {
    splid: store.state.live.liveId,
  });
}

// 投票
export function submitBrideVote({
  playerId,
  type,
}) {
  return request.post('vote/submitVoteGroomsman', {
    splid: store.state.live.liveId,
    player_id: playerId,
    number_info: type,
  });
}
