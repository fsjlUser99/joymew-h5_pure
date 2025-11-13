import Vue from 'vue';
import VueRouter from 'vue-router';
import { getToken } from '@/utils/auth';
import { getQianDaoInfo } from '@/api/index/index';
import store from '@/store';

const VueRouterPush = VueRouter.prototype.push;
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch((err) => err);
};
Vue.use(VueRouter);

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      title: '登录',
      skipAuth: true,
      skipAppBootstrap: true,
    },
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error/index.vue'),
    meta: {
      title: '错误提示',
    },
  },
  {
    path: '/',
    name: 'index2',
    component: () => import('@/views/index/index.vue'),
    meta: {
      title: '嗨喵悦动',
    },
  },
  {
    path: '/hby',
    name: 'hby',
    component: () => import('@/views/hby/index.vue'),
    meta: {
      title: '红包雨',
    },
  },
  {
    path: '/hbyWedding',
    name: 'hbyWedding',
    component: () => import('@/views/hby/wedding/index.vue'),
    meta: {
      title: '全场红包雨',
    },
  },
  {
    path: '/shake',
    name: 'shake',
    component: () => import('@/views/shake/v2/index.vue'),
    meta: {
      title: '摇一摇',
    },
  },
  {
    path: '/moneyTree',
    name: 'moneyTree',
    component: () => import('@/views/shake/moneyTree/index.vue'),
    meta: {
      title: '摇钱树',
    },
  },
  {
    path: '/shakeDragon',
    name: 'shakeDragon',
    component: () => import('@/views/shake/dragon/index.vue'),
    meta: {
      title: '飞龙在天',
    },
  },
  {
    path: '/cattleShake',
    name: 'cattleShake',
    component: () => import('@/views/cattleShake/index.vue'),
    meta: {
      title: '谁最牛',
    },
  },
  {
    path: '/dragonBoatTeamShake',
    name: 'dragonBoatTeamShake',
    component: () => import('@/views/dragonBoatTeamShake/index.vue'),
    meta: {
      title: '赛龙舟',
    },
  },
  {
    path: '/countMoney',
    name: 'countMoney',
    component: () => import('@/views/countMoney/index.vue'),
    meta: {
      title: '数钞票',
    },
  },
  {
    path: '/pigOut',
    name: 'pigOut',
    component: () => import('@/views/pigOut/index.vue'),
    meta: {
      title: '狼吞虎咽',
    },
  },
  {
    path: '/vote',
    name: 'vote',
    component: () => import('@/views/vote/voteNew.vue'),
    meta: {
      title: '投票',
    },
  },
  {
    path: '/cutfruit',
    name: 'cutfruit',
    component: () => import('@/views/cutfruit/index.vue'),
    meta: {
      title: '切水果',
    },
  },
  {
    path: '/photographerWall',
    name: 'photographerWall',
    component: () => import('@/views/photographerWall/index.vue'),
    meta: {
      title: '现场照片',
    },
  },
  {
    path: '/bubbleSign',
    name: 'bubbleSign',
    component: () => import('@/views/bubbleSign/index.vue'),
    meta: {
      title: '手写签到',
    },
  },
  {
    path: '/clickHb',
    name: 'clickHb',
    component: () => import('@/views/clickHb/index.vue'),
    meta: {
      title: '点红包',
    },
  },
  {
    path: '/hotelReserve',
    name: 'hotelReserve',
    component: () => import('@/views/hotelReserve/index.vue'),
    meta: {
      title: '婚宴预定',
    },
  },
  {
    path: '/hotelDetail',
    name: 'hotelDetail',
    component: () => import('@/views/hotelReserve/hotelDetail.vue'),
    meta: {
      title: '宴会厅',
    },
  },
  {
    path: '/packageDetail',
    name: 'packageDetail',
    component: () => import('@/views/hotelReserve/discountDetail.vue'),
    meta: {
      title: '优惠活动',
    },
  },
  {
    path: '/menuDetail',
    name: 'menuDetail',
    component: () => import('@/views/hotelReserve/menuDetail.vue'),
    meta: {
      title: '婚宴菜单',
    },
  },
  {
    path: '/couponDetail',
    name: 'couponDetail',
    component: () => import('@/views/hotelReserve/couponDetail.vue'),
    meta: {
      title: '优惠详情',
    },
  },
  {
    path: '/msWeddingDressDetail',
    name: 'msWeddingDressDetail',
    component: () => import('@/views/hotelReserve/packageDetail.vue'),
    meta: {
      title: '精品单品详情',
    },
  },
  {
    path: '/jumpBone',
    name: 'jumpBone',
    component: () => import('@/views/jumpBone/index.vue'),
    meta: {
      title: '跳一跳',
    },
  },
  {
    path: '/giveMark',
    name: 'giveMark',
    component: () => import('@/views/giveMark/index.vue'),
    meta: {
      title: '评分',
    },
  },
  {
    path: '/guessHbPay',
    name: 'guessHbPay',
    component: () => import('@/views/guessHbPay/index.vue'),
    meta: {
      title: '猜红包支付',
    },
  },
  {
    path: '/rechargeWedding',
    name: 'rechargeWedding',
    component: () => import('@/views/rechargeWedding/index.vue'),
    meta: {
      title: '充值中心',
    },
  },
  {
    path: '/rechargeOther',
    name: 'rechargeOther',
    component: () => import('@/views/rechargeOther/index.vue'),
    meta: {
      title: '充值中心',
    },
  },
  {
    path: '/hbkdRecharge',
    name: 'hbkdRecharge',
    component: () => import('@/views/hbkdRecharge/index.vue'),
    meta: {
      title: '红包口袋',
    },
  },
  {
    path: '/zyz',
    name: 'zyz',
    component: () => import('@/views/zyz/index.vue'),
    meta: {
      title: '转一转',
    },
  },
  {
    path: '/nyn',
    name: 'nyn',
    component: () => import('@/views/nyn/index.vue'),
    meta: {
      title: '扭一扭',
    },
  },
  {
    path: '/hbWall',
    name: 'hbWall',
    component: () => import('@/views/hbWall/index.vue'),
    meta: {
      title: '红包墙',
    },
  },
  {
    path: '/kbx',
    name: 'kbx',
    component: () => import('@/views/kbx/index.vue'),
    meta: {
      title: '开宝箱',
    },
  },
  {
    path: '/duiduipeng',
    name: 'duiduipeng',
    component: () => import('@/views/duiduipeng/index.vue'),
    meta: {
      title: '对对碰',
    },
  },
  {
    path: '/guessHb',
    name: 'guessHb',
    component: () => import('@/views/guessHb/index.vue'),
    meta: {
      title: '猜红包',
    },
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('@/views/sign/index.vue'),
    meta: {
      title: '签到',
    },
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/feedback/index.vue'),
    meta: {
      title: '反馈投诉',
    },
  },
  {
    path: '/couponRank',
    name: 'couponRank',
    component: () => import('@/components/gameRank/couponRank.vue'),
    meta: {
      title: '带优惠券的排行榜',
    },
  },
  {
    path: '/estimate',
    name: 'estimate',
    component: () => import('@/views/estimate/index.vue'),
    meta: {
      title: '主持评分',
    },
  },
  {
    path: '/clickTiger',
    name: 'clickTiger',
    component: () => import('@/views/clickTiger/index.vue'),
    meta: {
      title: '武松打虎',
    },
  },
  {
    path: '/seat',
    name: 'seat',
    component: () => import('@/views/seat/seat.vue'),
    meta: {
      title: '席位表',
    },
  },
  {
    path: '/brideVote',
    name: 'brideVote',
    component: () => import('@/views/brideVote/index.vue'),
    meta: {
      title: '伴郎伴娘',
    },
  },
  {
    path: '/playFootball',
    name: 'playFootball',
    component: () => import('@/views/playFootball/index.vue'),
    meta: {
      title: '谁是射手王',
    },
  },
  {
    path: '/myPreferential',
    name: 'MyPreferential',
    component: () => import('@/views/hotelReserve/MyPreferential.vue'),
    meta: {
      title: '我的优惠',
    },
  },
  {
    path: '/preferentialDetail',
    name: 'PreferentialDetail',
    component: () => import('@/views/hotelReserve/preferentialDetail.vue'),
    meta: {
      title: '奖品详情',
    },
  },
  {
    path: '/basketball-shoot',
    name: 'basketball-shoot',
    component: () => import('@/views/BasketballShoot.vue'),
    meta: {
      title: '篮球',
    },
  },
  {
    path: '/majiang',
    name: 'majiang',
    component: () => import('@/views/majiang/majiang.vue'),
    meta: {
      title: '雀神大赛',
    },
  },
  {
    path: '/happyQA',
    name: 'happyQA',
    component: () => import('@/views/happyQA/happyQA.vue'),
    meta: {
      title: '开心问答',
    },
  },
  {
    path: '/guessLanternRiddle',
    name: 'guessLanternRiddle',
    component: () => import('@/views/guessLanternRiddle/index.vue'),
    meta: {
      title: '猜灯谜',
    },
  },
  {
    path: '/dragonPlayBead',
    name: 'dragonPlayBead',
    component: () => import('@/views/dragonPlayBead/index.vue'),
    meta: {
      title: '游龙戏珠',
    },
  },
  {
    path: '/goldenSnake',
    name: 'goldenSnake',
    component: () => import('@/views/goldenSnake/index.vue'),
  },
  {
    path: '/playFireworks',
    name: 'playFireworks',
    component: () => import('@/views/playFireworks/index.vue'),
    meta: {
      title: '放鞭炮',
    },
  },
  {
    path: '/wishTreeLottery',
    name: 'wishTreeLottery',
    component: () => import('@/views/wishTreeLottery/index.vue'),
    meta: {
      title: '许愿树抽奖',
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log(from);
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  const whiteList = new Set(['login', 'error', 'guessHbPay']);
  const skipAuth = to.matched.some((record) => record.meta && record.meta.skipAuth);
  if (skipAuth) {
    next();
    return;
  }
  const token = getToken();
  if (token) {
    if (to.name === 'login') {
      const redirect = to.query.redirect || '/';
      next(redirect);
      return;
    }
    
    // 检查签到逻辑
    if (to.name === 'index2') {
      try {
        if (!store.state.app.qiandaoleme) {
          const data = await getQianDaoInfo();
          store.commit('app/setQiandaoleme', data.qian_dao_le_me || false);
          if (!store.state.app.qiandaoleme) {
            next('/sign');
            return;
          }
        }
      } catch (error) {
        console.error('检查签到信息失败:', error);
        next('/sign');
        return;
      }
    }
    
    next();
    return;
  }
  if (whiteList.has(to.name)) {
    next();
    return;
  }
  next({
    name: 'login',
    query: {
      redirect: to.fullPath,
      splid: to.query.splid || to.query.liveId || '', // 传递splid
    },
  });
});
export default router;
