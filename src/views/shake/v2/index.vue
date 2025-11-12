<template>
  <!-- 摇一摇 -->
  <div class="shake-wrap">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <shakeMain v-if="gameStatus === 2" />
      <!-- 当不满足小程序跳转条件时，显示H5排行榜 -->
      <rank v-if="gameStatus === 3 && !isTql && mpType !== 'haimao'" type="shake" />
      <couponRank v-if="gameStatus === 3 && isTql" type="shake" />
    </transition>
    <!-- 当满足小程序跳转条件但用户返回时，显示返回按钮 -->
    <backToRank :gameCode="gameCode" />
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import rank from '@/components/gameRank/rank.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import logoInfo from '@/components/logoInfo/index.vue';
import backToRank from '@/components/gameRank/backToRank.vue';
import wxApi from '@/utils/wxApi';
import wait from './wait.vue';
import shakeMain from './main.vue';

const GAME_CODE = 'hmPlay6';

export default {
  name: 'ShakeIndex',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
      mpType: (state) => state.app.mpType,
      userId: (state) => state.user.userId,
    }),
    ...mapGetters({
      isTql: 'user/isTql',
    }),
  },
  watch: {
    gameStatus(newVal) {
      // 当游戏状态变为3（结束）时，进行判断
      if (newVal === 3 && this.mpType === 'haimao' && !this.isTql) {
        // 如果是小程序环境(mpType为haimao)且非特权用户(!isTql)，则跳转到原生排行榜页面
        wxApi.navigateTo(
          `/packageGame/pages/commonRank/commonRank?userId=${this.userId}&gameCode=${this.gameCode}`,
        );
      }
    },
  },
  components: {
    wait,
    shakeMain,
    rank,
    couponRank,
    logoInfo,
    backToRank,
  },
  data() {
    return {
      gameCode: GAME_CODE,
    };
  },
  created() {},
  methods: {},
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.shake-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
