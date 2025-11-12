<template>
  <div class="majiang-game-page">
    <!-- 游戏标题图片 -->
    <img
      src="~@/assets/image/majiang/game-title.png"
      class="game-title"
      :class="{ hid: isShowRank }"
    />
    <!-- 排行榜按钮 -->
    <div
      v-if="gameStatus === 2"
      class="rank-btn"
      :class="{ hid: isShowRank }"
      @click="showRank"
    >
      排行榜
    </div>
    <!-- 轮次信息 -->
    <div
      class="round-info"
      :class="{ hid: isShowRank }"
    >
      <div class="round-remain-time">
        {{ remainTime }}
      </div>
      <div class="current-round">
        {{ `第${majiangRound}轮` }}
      </div>
    </div>
    <!-- 页面主体 -->
    <transition
      name="page-main"
      enter-active-class="slideInRight faster animated"
    >
      <Wait v-if="gameStatus === 1" />
      <Game-Main
        v-if="gameStatus === 2"
        :current-round="majiangRound"
        :remain-time="remainTime"
        :pass-time="passTime"
        @showRank="showRank"
        @start="startInterval"
      />
    </transition>
    <!-- 排行榜详情 -->
    <RankList
      :show="isShowRank"
      @close="closeRank"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getCurrentRoundInfo } from '@/api/majiang/majiang';
import Wait from './components/waitCpn.vue';
import GameMain from './components/main.vue';
import RankList from './components/rank.vue';

export default {
  name: 'Majiang',
  components: {
    Wait,
    GameMain,
    RankList,
  },
  data() {
    return {
      remainTime: 30,
      status: 1,
      isShowRank: false, // 是否展示排行榜
      rankList: [], // 排行榜榜单数据
      timeInterval: null, // 倒计时的定时器
      isEnd: false, // 倒计时结束标识
      passTime: 0, // 中途进入时轮次已经开始的时间
    };
  },
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
      majiangRound: (state) => state.game.majiangRound,
    }),
  },
  watch: {
    gameStatus: {
      handler(newVal) {
        // 结束游戏，弹出总排行榜
        if (Number(newVal) === 3) {
          this.isShowRank = true;
        }
        // 游戏正在进行中（中途加入），则查询当前的剩余时间和轮次
        if (Number(newVal) === 2) {
          this.getRoundInfo();
        }
      },
      immediate: true,
    },
    majiangRound(newVal, oldVal) {
      if (newVal && newVal > oldVal) {
        // 清除原有定时器
        if (this.timeInterval) {
          clearInterval(this.timeInterval);
        }
        this.remainTime = 30;
        // 清除上一轮记录的中途进入的时间差
        this.passTime = 0;
        // 关闭排行榜弹窗
        this.isShowRank = false;
      }
    },
  },
  mounted() {
    // 如果进入时为等待状态，重置游戏轮次
    this.$store.commit('game/setMajiangRound', 1);
  },
  methods: {
    showRank() {
      this.isShowRank = true;
    },
    closeRank() {
      this.isShowRank = false;
    },
    // 发牌完成开始，创建倒计时定时器
    startInterval() {
      // 清除之前的定时器
      if (this.timeInterval) {
        clearInterval(this.timeInterval);
      }
      this.timeInterval = setInterval(() => {
        if (this.remainTime <= 0) {
          clearInterval(this.timeInterval);
          // 倒计时结束，通知子组件弹窗
          this.isEnd = true;
          return;
        }
        this.remainTime -= 1;
      }, 1000);
    },
    /** 获取轮次信息 */
    async getRoundInfo() {
      const res = await getCurrentRoundInfo();
      const { currentTopic, remainTime } = res;
      // 判断轮次是否不一致,更新vuex里的轮次
      if (this.majiangRound !== Number(currentTopic)) {
        this.$store.commit('game/setMajiangRound', Number(currentTopic));
      }
      this.$nextTick(() => {
        // 记录中途进入的时间
        const currentTime = Number(remainTime);
        if (currentTime || currentTime === 0) {
          this.remainTime = Number(currentTime);
          this.currentTime = null;
        }
        // 记录已经过去的时间
        this.passTime = (30 - Number(remainTime)) * 1000;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.majiang-game-page {
  width: 100%;
  height: 100%;
  padding-top: 14px;
  box-sizing: border-box;
  background-image: url("~@/assets/image/majiang/game-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .hid {
    opacity: 0;
  }
  .game-title {
    width: 532px;
    height: 226px;
    margin-bottom: 4px;
    transition: opacity linear 0.2s;
  }
  .rank-btn {
    width: fit-content;
    padding: 14px 18px 14px 34px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 28px 0 0 28px;
    color: #fff;
    font-size: 20px;
    position: absolute;
    top: 304px;
    right: 0;
  }
  .round-info {
    width: 186px;
    height: 184px;
    flex-shrink: 0;
    margin-bottom: 62px;
    padding-left: 5px;
    box-sizing: border-box;
    background-image: url("~@/assets/image/majiang/round-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity linear 0.2s;
    .round-remain-time {
      color: #fff;
      font-size: 77px;
      font-weight: bolder;
      letter-spacing: 5px;
    }
    .current-round {
      color: #005f56;
      font-size: 29px;
      font-weight: bold;
      letter-spacing: 4px;
    }
  }
}
</style>
