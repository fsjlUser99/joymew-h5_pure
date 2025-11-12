<template>
  <!-- 数钞票 -->
  <div class="countMoney" >
    <div class="countMoney-wrap" v-if="!isWeddingVersion()">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <countMoneyMain v-if="gameStatus === 2" />
      <rank
        v-if="gameStatus === 3 && !isTql"
        type="countMoney"
      />
      <couponRank
        v-if="gameStatus === 3 && isTql"
        type="countMoney"
      />
    </transition>
    </div>
    <div class="countMoney-wrap wedding" v-else>
      <logoInfo />
      <transition enter-active-class="slideInRight faster animated">
        <wait v-if="gameStatus === 1" isWedding />
        <countMoneyMain v-if="gameStatus === 2" isWedding />
        <rankWedding v-if="gameStatus === 3" type="countMoney" />
      </transition>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import bgm from '@/assets/constant/audio';
import wait from '@/views/countMoney/wait.vue';
import countMoneyMain from '@/views/countMoney/main.vue';
import rank from '@/components/gameRank/rank.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import rankWedding from '@/views/countMoney/rankWedding.vue';
import logoInfo from '@/components/logoInfo/index.vue';
import createjs from 'createjs-cmd';
import { isWeddingVersion } from './utils';

export default {
  name: 'HbyIndex',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
      logoInfo: (state) => state.game.logoInfo,
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
    rankWedding,
  },
  data() {
    return {};
  },
  created() {
    this.loadAudioFile();
  },
  methods: {
    isWeddingVersion,
    // 加载音频文件
    loadAudioFile() {
      const loader = new createjs.LoadQueue(true);
      loader.installPlugin(createjs.Sound);
      loader.loadFile({ id: 'count', src: bgm.countMoney });
      loader.on('complete', () => {
        console.log('音频加载成功');
      });
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.countMoney{
  position: relative;
  width: 100vw;
  height: 100vh;
}
.countMoney-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(https://static.hudongmiao.com/joymewH5/img/countMoney/bg.png);
  background-size: 100% 100%;
  overflow: hidden;
  &.wedding {
    background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-bg-wedding.png");
  }
}

</style>
