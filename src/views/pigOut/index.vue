<template>
  <!-- 数钞票 -->
  <div class="countMoney-wrap">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <countMoneyMain v-if="gameStatus === 2" />
      <rank
        v-if="gameStatus === 3 && !isTql && mpType !== 'haimao'"
        type="pigOut"
      />
      <couponRank
        v-if="gameStatus === 3 && isTql"
        type="pigOut"
      />
    </transition>
    <!-- 当满足小程序跳转条件但用户返回时，显示返回按钮 -->
    <backToRank :gameCode="gameCode" />
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import bgm from '@/assets/constant/audio';
import wait from '@/views/pigOut/wait.vue';
import countMoneyMain from '@/views/pigOut/main.vue';
import rank from '@/components/gameRank/rank.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import logoInfo from '@/components/logoInfo/index.vue';
import createjs from 'createjs-cmd';
import backToRank from '@/components/gameRank/backToRank.vue';
import wxApi from '@/utils/wxApi';

const GAME_CODE = 'hmPlay17';

export default {
  name: 'HbyIndex',
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
    countMoneyMain,
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
      if (newVal === 3 && this.mpType === 'haimao' && !this.isTql) {
        wxApi.navigateTo(`/packageGame/pages/commonRank/commonRank?userId=${this.userId}&gameCode=${this.gameCode}`);
      }
    },
  },
  created() {
    this.loadAudioFile();
  },
  methods: {
    // 加载音频文件
    loadAudioFile() {
      const loader = new createjs.LoadQueue(true);
      loader.installPlugin(createjs.Sound);
      loader.loadFile({ id: 'eat', src: bgm.pigOut });
      loader.on('complete', () => {
        console.log('音频加载成功');
      });
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.countMoney-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-image: url(~@/assets/image/pigOut/bg.jpg);
  overflow: hidden;
}
</style>
