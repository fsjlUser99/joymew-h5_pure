<template>
  <div
    class="result-wish-popup-overlay"
    v-if="visible"
    @click="handleOverlayClick"
  >
    <div
      class="result-wish-popup-container"
      :class="{ wedding: isWedding }"
    >
      <!-- 标题文字 -->
      <div
        class="title-text"
        :class="{ wedding: isWedding }"
      >
        {{ titletext }}
      </div>
      <div class="main-content">
        <!-- 主图标 -->
        <div
          class="main-icon-container"
          :class="{ wedding: isWedding }"
        >
          <img
            :src="mainIcon"
            alt="主图标"
            class="main-icon"
          />
        </div>

        <!-- 第一行文字 -->
        <div class="text-line-1">
          {{ text1 }}
        </div>

        <!-- 第二行文字 -->
        <div class="text-line-2">
          {{ text2 }}
        </div>

        <!-- 我知道了按钮 -->
        <div
          class="confirm-btn"
          :class="{ wedding: isWedding }"
          @click="handleConfirm"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultWishPopup',
  props: {
    // 是否显示弹窗
    visible: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      default: 0, // 0: 未中奖, 1: 中奖
    },
    // 点击遮罩是否关闭弹窗
    closeOnOverlay: {
      type: Boolean,
      default: false,
    },
    // 是否为婚礼版
    isWedding: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    // 标题文字内容
    titletext() {
      return this.status === 1 ? '恭喜您，本轮获奖啦' : '暂未获奖';
    },
    // 主图标地址
    mainIcon() {
      return this.status === 1
        ? 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/success-emo.png'
        : 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/fail-emo.png';
    },
    // 第一行文字内容
    text1() {
      return this.status === 1 ? '恭喜您，本轮获奖啦' : '很遗憾，本轮暂未获奖';
    },
    // 第二行文字内容
    text2() {
      return this.status === 1 ? '祝您好运连连哦！' : '谢谢参与，等待下次抽奖吧！';
    },
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('close');
    },
    // 处理遮罩点击事件
    handleOverlayClick(event) {
      // 如果点击的是遮罩本身（不是容器内部），且允许点击遮罩关闭
      if (event.target === event.currentTarget && this.closeOnOverlay) {
        console.log('点击遮罩关闭弹窗');
        this.$emit('close');
      }
    },
    // 我知道了按钮点击事件
    handleConfirm() {
      this.$emit('close');
      this.close();
    },
  },
};
</script>

<style lang="less" scoped>
.result-wish-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .result-wish-popup-container {
    position: relative;
    background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/result-popup.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    width: 100vw;
    height: 100vw;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.wedding {
      background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/result-popup-wedding.png');
    }

    .title-text {
      position: absolute;
      top: -15%;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 8vw;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
      letter-spacing: 0.2em;
      text-shadow:
        0 0 10px #ff0000,
        0 0 20px #ff0000,
        0 0 30px #ff0000,
        0 0 40px #ff0000,
        0 2px 4px rgba(0, 0, 0, 0.5);
      &.wedding {
        top: 0%;
      }
    }

    .main-content {
      margin-top: 1vw;
      width: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 80vw;

      .main-icon-container {
        width: 45vw;
        height: 45vw;
        display: flex;
        align-items: center;
        justify-content: center;
        &.wedding {
          width: 40vw;
          height: 40vw;
        }

        .main-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .text-line-1 {
        margin-top: 2vw;
        color: #fff;
        font-size: 4.5vw;
        text-align: center;
        white-space: nowrap;
        letter-spacing: 0.1em;
        text-shadow: 0 0 10px #ff0000;
      }

      .text-line-2 {
        margin-top: 1vw;
        color: #fff;
        font-size: 4.5vw;
        text-align: center;
        white-space: nowrap;
        letter-spacing: 0.1em;
        text-shadow: 0 0 10px #ff0000;
      }

      .confirm-btn {
        margin-top: 3vw;
        background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-button2.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        width: 50vw;
        height: 20vw;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        cursor: pointer;
        user-select: none;

        &.wedding {
          background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-button2-wedding.png');
        }

        &::after {
          content: '我知道了';
          line-height: 20vw;
          font-size: 5vw;
          font-weight: bold;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          margin-bottom: 1vw;
        }
      }
    }
  }
}
</style>
