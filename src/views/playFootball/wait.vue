<template>
  <!-- 踢足球等待 -->
  <div class="wait publicVCenter">
    <img
      src="@/assets/image/playFootball/tit.png"
      class="title"
    />
    <div class="waitTip">
      等待主持人开始游戏
      <div class="dot">...</div>
    </div>
    <div class="useTip publicHvCenter">
      <img
        src="@/assets/image/playFootball/circle.png"
        class="circle"
      />
      <img
        src="@/assets/image/playFootball/ball/0.png"
        class="football"
      />
      <img
        src="@/assets/image/playFootball/hand.png"
        class="hand"
      />
      <div class="tip">点击发射</div>
    </div>
    <addScoreTool v-if="mpType" />
  </div>
</template>
<script>
import addScoreTool from '@/components/addScoreTool/index.vue';

export default {
  name: 'PlayFootballWait',
  components: {
    addScoreTool,
  },
  computed: {
    mpType() {
      return this.$store.state.app.mpType;
    },
  },
  watch: {},
  created() {},
  beforeDestroy() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.wait {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  padding-top: 83px;
  .title {
    width: 471px;
    height: 200px;
  }
  .waitTip {
    margin-top: 30px;
    font-size: 34.5px;
    font-weight: 700;
    color: #ffffff;
    display: flex;
    align-items: center;
    .dot {
      width: 15px;
      overflow: hidden;
      animation: ellipsis 1s infinite;
      animation-timing-function: steps(1);
    }
  }
  .useTip {
    position: absolute;
    bottom: 450px;
    .circle {
      width: 192px;
      height: 114px;
      animation-name: circleTipAni;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    .football {
      width: 20vw;
      height: 20vw;
      position: absolute;
      top: -9vw;
    }
    .hand {
      width: 98px;
      height: 106px;
      position: absolute;
      left: 150px;
      top: 30px;
      transform-origin: bottom;
      animation-name: clickTipAni;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    .tip {
      width: 119px;
      height: 29px;
      font-size: 30px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.5);
      position: absolute;
      top: 150px;
      left: 160px;
      white-space: nowrap;
    }
  }
  @keyframes ellipsis {
    0% {
      width: 0px;
    }
    25% {
      width: 12px;
    }
    50% {
      width: 26px;
    }
    75% {
      width: 47px;
    }
  }
  @keyframes clickTipAni {
    0% {
      transform: perspective(3000px) rotateY(60deg);
    }
    50% {
      transform: perspective(3000px) rotateY(0deg);
    }
    100% {
      transform: perspective(3000px) rotateY(60deg);
    }
  }
  @keyframes circleTipAni {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
