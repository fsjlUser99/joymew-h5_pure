<template>
  <!-- 点红包 -->
  <div class="clickHb-wrap">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <clickHbMain v-if="gameStatus === 2" />
      <rank
        v-if="gameStatus === 3 && !isTql"
        type="hby"
      />
      <couponRank
        v-if="gameStatus === 3 && isTql"
        type="hby"
      />
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import bgm from '@/assets/constant/audio';
import logoInfo from '@/components/logoInfo/index.vue';
import rank from '@/components/gameRank/rank.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import createjs from 'createjs-cmd';
import wait from './wait.vue';
import clickHbMain from './main.vue';

export default {
  name: 'ClickHbIndex',
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
    clickHbMain,
    rank,
    couponRank,
    logoInfo,
  },
  data() {
    return {};
  },
  watch: {},
  created() {
    this.loadAudioFile();
  },
  beforeDestroy() {
    window.location.reload();
  },
  methods: {
    // 加载音频文件
    loadAudioFile() {
      const loader = new createjs.LoadQueue(true);
      loader.installPlugin(createjs.Sound);
      loader.loadFile({ id: 'boomb', src: bgm.cutFruitBoom });
      loader.on('complete', () => {
        console.log('音频加载成功');
      });

      const loader2 = new createjs.LoadQueue(true);
      loader2.installPlugin(createjs.Sound);
      loader2.loadFile({ id: 'getMoney', src: bgm.getMoneyNew });
      loader2.on('complete', () => {
        console.log('音频加载成功2');
      });
    },
  },
};
</script>
<style lang="less" scoped>
.clickHb-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
