<template>
    <div v-if="showBackToMpButton" class="back-to-mp-container">
        <div class="back-to-mp-content">
            <div class="back-title">游戏已结束</div>
            <div class="back-desc">点击下方按钮查看完整排行榜</div>
            <button class="back-to-mp-btn" @click="backToMpRank">
                查看小程序排行榜
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import wxApi from '@/utils/wxApi';

export default {
  name: 'BackToRank',
  props: {
    gameCode: {
      type: String,
      required: true,
    },
  },
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
    // 判断是否显示返回小程序按钮
    showBackToMpButton() {
      return this.gameStatus === 3 && this.mpType === 'haimao';
    },
  },
  methods: {
    backToMpRank() {
      // 跳转到小程序的排行榜页面
      wxApi.navigateTo(
        `/packageGame/pages/commonRank/commonRank?userId=${this.userId}&gameCode=${this.gameCode}`,
      );
    },
  },
};

</script>

<style lang="less" scoped>
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
