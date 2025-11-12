import request from '../../utils/request';
import store from '../../store/index';

// 初始化投票
export function initVote() {
  return request.post('vote/startHmVote6', {
    splid: store.state.live.liveId,
    playInfo: 'vote',
  });
}

// 投票
export function submitVote(paramObj) {
  return request.post('vote/submitVote6', {
    splid: store.state.live.liveId,
    vote_id: paramObj.voteId,
    vote_limit: paramObj.voteSize,
  });
}

// 范围投票
export function submitVoteRange(voteIds) {
  return request.post('vote/submitVote2', {
    splid: store.state.live.liveId,
    vote_ids: voteIds,
  });
}

// 保存已选投票项到缓存
export function saveActiveVoteToLocal(voteIds) {
  if (!voteIds) {
    return;
  }
  const activeVoteObj = {
    splid: store.state.live.liveId,
    voteIds,
  };
  localStorage.setItem('activeVote', JSON.stringify(activeVoteObj));
}
/* eslint-disable */
// 获取已选投票项
export function getActiveVoteFromLocal(voteInfo) {
  const activeVoteStr = localStorage.getItem('activeVote');
  if (!activeVoteStr) {
    return;
  }
  const { splid, voteIds } = JSON.parse(activeVoteStr);
  const { voteType, remain_vote, voteSize } = voteInfo;
  // 非本场活动清空activeVote缓存
  if (splid !== store.state.live.liveId) {
    localStorage.removeItem('activeVote');
    return;
  }
  // 单选情况下 剩余票数和总票数相等则清空缓存
  if (remain_vote === voteSize && voteType === '1') {
    localStorage.removeItem('activeVote');
    return;
  }
  // 自由投票情况下 不需要缓存
  if (voteType === '3') {
    localStorage.removeItem('activeVote');
    return;
  }
  return voteIds;
}
