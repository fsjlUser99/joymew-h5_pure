<template>
  <!-- 红包雨 -->
  <div class="hby-wrap">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <hbyMain v-if="gameStatus === 2" />
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
import wait from '@/views/hby/wedding/wait.vue';
import hbyMain from '@/views/hby/wedding/main.vue';
import rank from '@/components/gameRank/rank.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import logoInfo from '@/components/logoInfo/index.vue';
import createjs from 'createjs-cmd';

export default {
  name: 'HbyIndex',
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
    hbyMain,
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
  },
};
</script>
<style lang="less" scoped>
.hby-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
