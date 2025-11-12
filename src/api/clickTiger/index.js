import request from '../../utils/request';
import store from '../../store/index';

// 提交分数
export default function submitScore(score) {
  return request.post('play/shangfen16', {
    splid: store.state.live.liveId,
    playInfo: 'hmPlay18',
    fenshu: score,
    userId: store.state.user.userId,
  });
}
