<template>
  <!-- 武松打虎 -->
  <div class="clickTiger-wrap">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <clickTigerMain
        v-if="gameStatus === 2"
        ref="clickTigerMain"
      />
      <rank
        v-if="gameStatus === 3 && !isTql && mpType !== 'haimao'"
        type="clickTiger"
      />
      <couponRank
        v-if="gameStatus === 3 && isTql"
        type="clickTiger"
      />
    </transition>
    <!-- 当满足小程序跳转条件但用户返回时，显示返回按钮 -->
    <backToRank :gameCode="gameCode" />
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import createjs from 'createjs-cmd';
import bgm from '@/assets/constant/audio';
import wait from '@/views/clickTiger/wait.vue';
import clickTigerMain from '@/views/clickTiger/main.vue';
import rank from '@/components/gameRank/rank.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import logoInfo from '@/components/logoInfo/index.vue';
import backToRank from '@/components/gameRank/backToRank.vue';
import wxApi from '@/utils/wxApi';

const GAME_CODE = 'hmPlay18';

export default {
  name: 'ClickTigerIndex',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
      logoInfo: (state) => state.game.logoInfo,
      mpType: (state) => state.app.mpType,
      userId: (state) => state.user.userId,
    }),
    ...mapGetters({
      isTql: 'user/isTql',
    }),
  },
  components: {
    wait,
    clickTigerMain,
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
  watch: {
    gameStatus(newVal) {
      // 当游戏状态变为3（结束）时，进行判断
      if (newVal === 3 && this.mpType === 'haimao' && !this.isTql) {
        wxApi.navigateTo(`/packageGame/pages/commonRank/commonRank?userId=${this.userId}&gameCode=${this.gameCode}`);
      }
    },
  },
  created() {
    this.loadAudioFile();
  },
  beforeDestroy() {},
  methods: {
    // 加载音频文件
    loadAudioFile() {
      const loader = new createjs.LoadQueue(true);
      loader.installPlugin(createjs.Sound);
      loader.loadFile({ id: 'clickTiger', src: bgm.clickTiger });
      loader.on('complete', () => {
        console.log('音频加载成功');
      });
    },
  },
};
</script>
<style lang="less" scoped>
.clickTiger-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
