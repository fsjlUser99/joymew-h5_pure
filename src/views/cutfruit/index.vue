<template>
  <!-- 切水果 -->
  <div class="cutfruit-wrap">
    <logoInfo locat="right" :need-shade="true" />
    <transition enter-active-class="slideInRight faster animated">
      <div v-if="gameStatus === 0 || gameStatus === 1 || gameStatus === 2" id="cutfruitMainBox" class="cutfruitMainBox">
        <addScoreTool v-if="mpType && gameStatus === 1" />
        <broad v-if="mpType && scoreAdd && gameStatus === 2" :broadContent="broadContent" />
      </div>
      <!-- 当不满足小程序跳转条件时，显示H5排行榜 -->
      <rank v-if="gameStatus === 3 && !isTql && mpType !== 'haimao'" type="cutFruit" />
      <couponRank v-if="gameStatus === 3 && isTql" type="cutFruit" />
    </transition>
    <!-- 当满足小程序跳转条件但用户返回时，显示返回按钮 -->
    <backToRank :gameCode="gameCode" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import wxApi from '@/utils/wxApi';
import rank from '@/components/gameRank/rank.vue';
import backToRank from '@/components/gameRank/backToRank.vue';
import submitScore from '@/api/countMoney/index';
import logoInfo from '@/components/logoInfo/index.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import addScoreTool from '@/components/addScoreTool/index.vue';
import broad from '@/components/broad/index.vue';
import cutfruit from './index';

const GAME_CODE = 'hmPlay9';

export default {
  name: 'CutFruitIndex',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
      mpType: (state) => state.app.mpType,
      // 获取用户ID用于跳转传参
      userId: (state) => state.user.userId,
    }),
    ...mapGetters({
      isTql: 'user/isTql',
    }),
    broadContent() {
      return `您已通过加分宝增加${this.scoreAdd}初始积分哦～`;
    },
  },
  watch: {
    gameStatus(newVal) {
      // 当游戏状态变为3（结束）时，进行判断
      if (newVal === 3 && this.mpType === 'haimao' && !this.isTql) {
        // 如果是小程序环境(mpType为true)且非特权用户(!isTql)，则跳转到原生排行榜页面
        wxApi.navigateTo(
          `/packageGame/pages/commonRank/commonRank?userId=${this.userId}&gameCode=${this.gameCode}`,
        );
        // 执行跳转后，不再执行后续H5端的逻辑
        return;
      }

      // 保持原有逻辑
      cutfruit.controlGame(newVal, this.score);
      if (newVal === 2) {
        this.initScore();
      }
    },
  },
  components: {
    rank,
    logoInfo,
    couponRank,
    addScoreTool,
    broad,
    backToRank,
  },
  data() {
    return {
      score: 0,
      scoreAdd: 0,
      gameCode: GAME_CODE,
    };
  },
  created() {
    cutfruit.init(this.updateScore);
  },
  mounted() {
    if (this.gameStatus === 2) {
      this.initScore();
    }
  },
  beforeDestroy() {
    clearInterval(this.tmpInterval);
    window.location.reload();
  },
  methods: {
    updateScore(score) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        submitScore(score)
          .then((res) => {
            console.log(res);
            this.score = Math.max(res.score, this.score);
            this.scoreAdd = res.addScoreInfo?.startScore || 0;
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },
    initScore() {
      submitScore(this.score)
        .then((res) => {
          console.log(res);
          this.score = Math.max(res.score, this.score);
          this.scoreAdd = res.addScoreInfo?.startScore || 0;
          cutfruit.controlGame(this.gameStatus, this.score);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.broad {
  position: absolute;
  top: 3vw;
  width: 55vw;
  border-radius: 2.4vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0 1.2vw;
}

.cutfruit-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

// 返回小程序按钮容器
.back-to-mp-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.back-to-mp-content {
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  max-width: 80%;
  .back-title {
    font-size: 48px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }
  .back-desc {
    font-size: 35px;
    color: #666;
    margin-bottom: 30px;
    line-height: 1.5;
  }
  .back-to-mp-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    padding: 12px 30px;
    font-size: 28px;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
}
</style>
