<!-- 【兔子投篮】游戏 -->
<template>
  <div class="container">
    <BasketballShootGame
      v-if="(gameStatus === 1) | (gameStatus === 2)"
      ref="game"
      v-model="score"
      class="basketball-shoot"
      :game-status="gameStatus"
    />
    <BasketballShootRank
      v-if="gameStatus === 3 && mpType !== 'haimao'"
      class="basketball-shoot"
      :rank-list="rankList"
    />
    <addScoreTool v-if="mpType && gameStatus === 1" />
    <broad
      v-if="mpType && gameStatus === 2 && scoreAdd"
      :broadContent="broadContent"
    />

    <!-- 当满足小程序跳转条件但用户返回时，显示返回按钮 -->
    <backToRank :gameCode="gameCode" />
  </div>
</template>
<script>
import reqSubmitScore from '@/api/countMoney/index';
import BasketballShootGame from '@/components/BasketballShootGame.vue';
import BasketballShootRank from '@/components/BasketballShootRank.vue';
import { mapState } from 'vuex';
import DEFAULT_AVATAR from '@/assets/image/defaultHeadImg.png';
import { getRank } from '@/api/shake/index';
import addScoreTool from '@/components/addScoreTool/index.vue';
import broad from '@/components/broad/index.vue';
import backToRank from '@/components/gameRank/backToRank.vue';
import wxApi from '@/utils/wxApi';

const GAME_CODE = 'hmPlay23';

export default {
  name: 'BasketballShoot',
  components: {
    BasketballShootGame,
    BasketballShootRank,
    addScoreTool,
    broad,
    backToRank,
  },
  data() {
    const rankList = Array.from({ length: 10 }, (v, i) => ({
      id: i.toString(),
      avatar: DEFAULT_AVATAR,
      name: 'Player',
      score: 0,
    }));
    return {
      /** 提交分数定时器 */
      submitScoreTimer: null,
      /** 排行榜列表 */
      rankList,
      /** 游戏分数 */
      score: 0,
      scoreAdd: 0,
      gameCode: GAME_CODE,
    };
  },
  computed: {
    ...mapState({
      /** 当前游戏状态 */
      gameStatus: (state) => state.game.gameStatus,
      mpType: (state) => state.app.mpType,
      userId: (state) => state.user.userId,
    }),
    broadContent() {
      return `您已通过加分宝增加${this.scoreAdd}初始积分哦～`;
    },
  },
  watch: {
    /** 监听游戏状态，当游戏结束时，提交分数 */
    gameStatus: {
      async handler(newVal) {
        // 开始游戏
        if (newVal === 2) {
          this.initScore();
          this.startSubmitScore();
          return;
        }
        if (newVal === 3) {
          this.stopSubmitScore();
          if (this.mpType === 'haimao') {
            wxApi.navigateTo(`/packageGame/pages/commonRank/commonRank?userId=${this.userId}&gameCode=${this.gameCode}`);
            return;
          }

          try {
            const rankListRes = await getRank(this.gameCode);
            this.rankList = this.parseRankList(rankListRes);
            console.log('rankList', this.rankList);
          } catch (err) {
            console.log(err);
          }
        }
      },
      immediate: true,
    },
  },
  destroyed() {
    clearInterval(this.submitScoreTimer);
  },
  methods: {
    /** 初始化分数 */
    async initScore() {
      const res = await reqSubmitScore(this.score);
      console.log('initScore', res);
      this.score = Math.max(res.score, this.score);
      this.scoreAdd = res.addScoreInfo?.startScore || 0;
    },
    /** 开始定期获取并提交分数 */
    startSubmitScore() {
      this.submitScoreTimer = setInterval(async () => {
        const res = await reqSubmitScore(this.score);
        this.score = Math.max(res.score, this.score);
        this.scoreAdd = res.addScoreInfo?.startScore || 0;
      }, 1800);
    },
    /** 停止定期获取并提交分数 */
    stopSubmitScore() {
      clearInterval(this.submitScoreTimer);
    },
    /** 解析兔子投篮排行榜数据
     * @param {Object} rankListRes 返回的排行榜数据
     * @returns {Array} 解析后的排行榜数据
     */
    parseRankList(rankListRes) {
      const newRankList = rankListRes.list.map((item) => ({
        id: item.id,
        avatar: item.avator,
        name: item.nickname,
        score: item.score,
      }));

      const rankList = [...newRankList, ...this.rankList.slice(newRankList.length)];
      return rankList;
    },
  },
};
</script>
<style lang="less" scoped>
.broad {
  position: absolute;
  top: 20vw;
  width: 55vw;
  border-radius: 2.4vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0 1.2vw;
}
.container {
  width: 100%;
  height: 100%;
  background: url('~@/assets/image/basketball-shoot/bg.jpg') no-repeat center/cover;
}
</style>
