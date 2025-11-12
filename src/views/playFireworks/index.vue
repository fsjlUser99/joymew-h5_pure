<template>
  <!-- 放鞭炮  -->
  <div class="shake-wrap">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <hyhMain v-if="gameStatus === 2" />
      <rank
        v-if="gameStatus === 3 && !isTql"
      />
      <couponRank
        v-if="gameStatus === 3 && isTql"
        type="countMoney"
      />
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import couponRank from '@/components/gameRank/couponRank.vue';
import logoInfo from '@/components/logoInfo/index.vue';
import wait from './wait.vue';
import hyhMain from './main.vue';
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
    hyhMain,
    rank,
    couponRank,
    logoInfo,
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
  background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/game-bg.png);
  background-size: 100% 100%;
}
</style>
