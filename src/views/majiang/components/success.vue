<template>
  <transition name="close">
    <div
      v-show="show"
      class="success-model"
    >
      <!-- 弹窗顶部装饰 -->
      <div class="container-header">
        <img
          src="~@/assets/image/majiang/banner-title.png"
          class="header-banner"
        />
        <!-- 星星icon -->
        <img
          src="~@/assets/image/majiang/star-icon.png"
          class="star-icon"
        />
        <!-- 背景光icon -->
        <img
          src="~@/assets/image/majiang/light-icon.png"
          class="bg-light"
        />
        <!-- 彩纸icon -->
        <img
          src="~@/assets/image/majiang/cele-icon.png"
          class="color-paper"
        />
      </div>
      <!-- 弹窗主体 -->
      <div class="container">
        <div class="data-txt">
          · 本轮用时 ·
        </div>
        <div class="data">
          {{ timeHandler }}
        </div>
        <div class="data-txt">
          · 本轮排名 ·
        </div>
        <div class="data">
          {{ `第${rankData.round_rank}名` }}
        </div>
        <div class="data-txt">
          · 总排名 ·
        </div>
        <div class="data">
          {{ `第${rankData.total_rank}名` }}
        </div>
        <!-- 确认按钮 -->
        <div
          class="confirm-btn"
          @click="close"
        >
          我知道了
        </div>
        <!-- 查看排名 -->
        <div
          class="show-rank"
          @click="showRank"
        >
          查看排名
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    rankData: {
      type: Object,
      default: () => {
        return {
          time: 0,
          round_rank: 1,
          total_rank: 1,
        };
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    timeHandler() {
      return `${Number(this.$props.rankData.time / 1000).toFixed(3)}s`;
    },
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close');
    },
    showRank() {
      this.$emit('showRank');
    },
  },
};
</script>

<style lang="less" scoped>
.success-model {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  .container-header {
    width: 572px;
    height: 262px;
    position: absolute;
    top: 210px;
    left: 50%;
    transform: translateX(-50%);
    .header-banner {
      width: 100%;
      height: 100%;
    }
    .star-icon {
      width: 452px;
      height: 154px;
      position: absolute;
      top: 20px;
      left: 96px;
      z-index: -1;
    }
    .bg-light {
      width: 524px;
      height: 164px;
      position: absolute;
      top: 28px;
      left: 36px;
      z-index: -1;
    }
    .color-paper {
      width: 728px;
      height: 220px;
      position: absolute;
      top: 112px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .container {
    width: 632px;
    height: 852px;
    margin-top: 400px;
    padding-top: 114px;
    box-sizing: border-box;
    background-image: url('~@/assets/image/majiang/dialog-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    .data-txt {
      margin-bottom: 20px;
      color: #785600;
      font-weight: bold;
      letter-spacing: 3px;
      text-indent: 3px;
    }
    .data {
      margin-bottom: 60px;
      color: #E19006;
      font-size: 50px;
      font-weight: bolder;
      letter-spacing: 5px;
      text-indent: 5px;
    }
    .confirm-btn {
      width: 409px;
      height: 89px;
      margin-bottom: 24px;
      border-radius: 44px;
      background-color: #E08E06;
      color: #fff;
      text-align: center;
      line-height: 89px;
    }
    .show-rank {
      color: #E08E06;
      text-decoration: underline;
    }
  }
}

.close-enter-active,
.close-leave-active {
  transition: all 0.3s ease-in-out;
}
.close-enter,
.close-leave-to {
  opacity: 0;
}
</style>
