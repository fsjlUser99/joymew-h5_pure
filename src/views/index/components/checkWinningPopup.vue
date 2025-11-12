<!--
  * @Description: 「查看抽奖结果」弹窗
  * @Author: Ruan Jiazhen
  * @Date: 2024-01-02
-->
<template>
  <div
    class="check-winning-popup-container"
    v-show="isShow"
    @click="hide"
  >
    <img
      src="@/assets/image/icon/closeIcon.png"
      class="close-btn"
    />
    <div
      ref="checkWinningAni"
      class="check-winning-ani"
    />
    <img
      src="@/assets/image/checkWinningPopup/btn.svg"
      class="btn"
      @click="onBtnClick"
    />
  </div>
</template>

<script>
import lottie from 'lottie-web';

export default {
  name: 'checkWinningPopup',
  data() {
    return {
      isShow: false,
      ani: null,
    };
  },
  mounted() {
    this.initAni();
  },
  methods: {
    initAni() {
      const { checkWinningAni } = this.$refs;

      const PATH = 'https://static.hudongmiao.com/joymewH5/animation/lottie/checkWinningPopup/data.json';

      this.ani = lottie.loadAnimation({
        container: checkWinningAni,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: PATH,
      });
    },
    async show() {
      this.isShow = true;
      this.ani.play();
      await this.$nextTick();
    },
    hide() {
      _hmt.push(['_trackEvent', '查看抽奖结果弹窗', '点击', '关闭抽奖结果弹窗']);
      this.isShow = false;
      this.ani.stop();
    },
    onBtnClick() {
      this.$emit('btnClick');
    },
  },
};
</script>

<style scoped lang="less">
.check-winning-popup-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  .close-btn {
    position: absolute;
    top: 10vh;
    right: 10vw;
    z-index: 2;
    width: 10vw;
    height: 10vw;
  }

  .check-winning-ani {
    position: absolute;
    top: -40px;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
  }

  .btn {
    position: absolute;
    top: ~'min(1200px, 80vh)';
    left: 50%;
    transform: translateX(-50%);

    width: 76.8vw;
    height: 16vw;

    animation: btn-ani 1s infinite;

    @keyframes btn-ani {
      0% {
        transform: translateX(-50%) scale(1);
      }
      50% {
        transform: translateX(-50%) scale(1.1);
      }
      100% {
        transform: translateX(-50%) scale(1);
      }
    }
  }
}
</style>
