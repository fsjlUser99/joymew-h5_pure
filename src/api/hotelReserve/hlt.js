import { getUrlParam } from '@/utils/index';
import requestWWW from '@/utils/requestWWW';
import store from '../../store/index';

// 获取抽奖数据
export function getChouJiangData() {
  return requestWWW.post('/activity/getActivityData', {
    splid: store.state.live.liveId,
    token: getUrlParam('token'),
  });
}

// 抽奖
export function chouJiang() {
  return requestWWW.post('/weddingConpon/lottery', {
    activity_id: store.state.live.activityId,
    splid: store.state.live.liveId,
    token: getUrlParam('token'),
  });
}

// 获取我的优惠信息
export function getMyPreferentialData({ showCount, currentPage }) {
  return requestWWW.post('/weddingConpon/getMyCouponList', {
    activity_id: store.state.live.activityId,
    query_type: '1',
    token: getUrlParam('token'),
    currentPage,
    showCount,
  });
}
