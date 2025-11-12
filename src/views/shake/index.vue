<template>
  <!-- 摇一摇 -->
  <div class="shake-wrap">
    <logoInfo />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <shakeMain v-if="gameStatus === 2" />
      <rank
        v-if="gameStatus === 3 && !isTql"
        type="shake"
      />
      <couponRank
        v-if="gameStatus === 3 && isTql"
        type="shake"
      />
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import wait from '@/views/shake/wait.vue';
import shakeMain from '@/views/shake/main.vue';
import rank from '@/components/gameRank/rank.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import logoInfo from '@/components/logoInfo/index.vue';

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
