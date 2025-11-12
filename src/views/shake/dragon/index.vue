<template>
  <!-- 摇一摇 -->
  <div class="shake-wrap">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <shakeMain v-if="gameStatus === 2" />
      <rank v-if="gameStatus === 3 && !isTql" type="shake" shakeGameCode="hmPlay27"/>
      <couponRank v-if="gameStatus === 3 && isTql" type="shake" shakeGameCode="hmPlay27" />
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import rank from '@/components/gameRank/rank.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import logoInfo from '@/components/logoInfo/index.vue';
import wait from './wait.vue';
import shakeMain from './main.vue';

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
  data() {
    return {};
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
