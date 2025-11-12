<template>
  <div class="golden-snake">
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <gaming v-if="gameStatus === 2" />
      <rank v-if="gameStatus === 3" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import wait from './components/wait.vue';
import gaming from './components/gaming.vue';
import rank from './components/rank.vue';

export default {
  data: () => ({}),
  components: {
    gaming,
    wait,
    rank,
  },
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
    }),
  },
};
</script>

<style scoped lang="less">
.golden-snake {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background: url(https://ustatic.hudongmiao.com/mew/common/6cb7c7d3aff64cbdbf691324cec968b0);
  background-size: 100% 100%;
}
</style>
