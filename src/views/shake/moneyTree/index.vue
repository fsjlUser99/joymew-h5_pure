<template>
  <!-- 摇一摇 -->
  <div class="shake-wrap">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <shakeMain v-if="gameStatus === 2" />
      <rank v-if="gameStatus === 3 && !isTql" type="shake" />
      <couponRank v-if="gameStatus === 3 && isTql" type="shake" />
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import bgm from '@/assets/constant/audio';
import couponRank from '@/components/gameRank/couponRank.vue';
import logoInfo from '@/components/logoInfo/index.vue';
import createjs from 'createjs-cmd';
import wait from './wait.vue';
import shakeMain from './main.vue';
import rank from './rank.vue';

export default {
  name: 'ShakeIndex',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
    }),
    ...mapGetters({
      isTql: 'user/isTql',
    }),
  },
  components: {
    wait,
    shakeMain,
    rank,
    couponRank,
    logoInfo,
  },
  created() {
    this.loadAudioFile();
  },
  methods: {
    // 加载音频文件
    loadAudioFile() {
      const loader = new createjs.LoadQueue(true);
      loader.installPlugin(createjs.Sound);
      loader.loadFile({ id: 'getMoney', src: bgm.getMoneyNew });
      loader.on('complete', () => {
        console.log('音频加载成功');
      });
    },
    cleanupAudio() {
      try {
        // 停止所有正在播放的音频
        createjs.Sound.stop();

        // 移除特定音频资源（可选）
        createjs.Sound.removeSound('getMoney');
      } catch (err) {
        console.log('清理音频资源失败:', err);
      }
    },
  },
  beforeDestroy() {
    this.cleanupAudio();
  },
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
