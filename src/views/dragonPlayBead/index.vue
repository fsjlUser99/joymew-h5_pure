<!--
  * @Description: 「游龙戏珠」组件
  * @Author: Ruan Jiazhen
  * @Date: 2023-12-26
-->
<template>
  <div class="countMoney-wrap">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <gaming v-if="gameStatus === 2" />
      <rank v-if="gameStatus === 3 && !isTql" />
      <couponRank
        v-if="gameStatus === 3 && isTql"
        type="countMoney"
      />
    </transition>
  </div>
</template>
<script>
import bgm from '@/assets/constant/audio';
import couponRank from '@/components/gameRank/couponRank.vue';
import logoInfo from '@/components/logoInfo/index.vue';
import createjs from 'createjs-cmd';
import { mapGetters, mapState } from 'vuex';
import gaming from './components/gaming.vue';
import rank from './components/rank.vue';
import wait from './components/wait.vue';

export default {
  name: 'HbyIndex',
  components: {
    wait,
    gaming,
    rank,
    couponRank,
    logoInfo,
  },
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
      logoInfo: (state) => state.game.logoInfo,
    }),
    ...mapGetters({
      isTql: 'user/isTql',
    }),
  },
  created() {
    this.loadAudioFile();
  },
  methods: {
    loadAudioFile() {
      const loader = new createjs.LoadQueue(true);
      loader.installPlugin(createjs.Sound);
      loader.loadFile({ id: 'count', src: bgm.countMoney });
      loader.loadFile({ id: 'eat', src: bgm.pigOut });
      loader.on('complete', () => {
        console.log('音频加载成功');
      });
    },
  },
};
</script>
<style lang="less" scoped>
.countMoney-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  overflow: hidden;
}
</style>
