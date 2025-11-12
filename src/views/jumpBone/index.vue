<template>
  <!-- 跳一跳 -->
  <div class="jumpBone-wrap">
    <logoInfo locat="right" />
    <transition enter-active-class="slideInRight faster animated">
      <div
        v-if="gameStatus === 0 || gameStatus === 1 || gameStatus === 2"
        id="jumpBoneMainBox"
        class="jumpBoneMainBox"
      />
      <rank
        v-if="gameStatus === 3 && !isTql"
        type="jumpBone"
      />
      <couponRank
        v-if="gameStatus === 3 && isTql"
        type="jumpBone"
      />
      <!-- <div class="jumpBoneMainBox" id="jumpBoneMainBox"></div> -->
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import rank from '@/components/gameRank/rank.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import submitScore from '@/api/countMoney/index';
import { timeoutTask } from '@/utils/index';
import logoInfo from '@/components/logoInfo/index.vue';
import jumpBone from './index';

let game = null;
export default {
  name: 'JumpBoneIndex',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
    }),
    ...mapGetters({
      isTql: 'user/isTql',
    }),
  },
  watch: {
    gameStatus(newVal) {
      console.log(game.state.states.menu.controlGame);
      if (game.state.states.menu.controlGame) {
        game.state.states.menu.controlGame(newVal);
      }
    },
  },
  components: {
    rank,
    couponRank,
    logoInfo,
  },
  data() {
    return {
      score: 0,
    };
  },
  created() {
    game = null;
  },

  mounted() {
    game = jumpBone.initGame(this.intervalSubmitScore, this.updateScore);
    timeoutTask(() => {
      game.state.states.menu.controlGame(this.gameStatus);
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.tmpInterval);
    window.location.reload();
  },
  methods: {
    // 每2s发送一次分数
    intervalSubmitScore() {
      this.tmpInterval = setInterval(() => {
        submitScore(this.score)
          .then((res) => {
            console.log(res);
            this.score = res.score > this.score ? res.score : this.score;
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1800);
    },
    updateScore(score) {
      this.score = score;
    },
  },
};
</script>
<style lang="less" scoped>
.jumpBone-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
