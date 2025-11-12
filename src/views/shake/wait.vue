<template>
  <!-- 摇一摇等待 -->
  <div class="wait">
    <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/shakeTitle.png"
      class="shakeTitle"
    />
    <div class="circle">
      <img
        src="https://static.hudongmiao.com/joymewH5/img/hby/lightCircle.png"
        class="outerCircle"
      />
      <img
        src="https://static.hudongmiao.com/joymewH5/img/hby/lightCircleInner.png"
        class="innerCircle"
      />
      <img
        src="https://static.hudongmiao.com/joymewH5/img/hby/shakeMobile.png"
        class="shakeMobile shakeAni"
      />
    </div>
    <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/light1.png"
      class="light1"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/light2.png"
      class="light2"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/light3.png"
      class="light3"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/coin.png"
      class="coin"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/coin.png"
      class="coin2"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/bendHb1.png"
      class="bendHb1"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/bendHb2.png"
      class="bendHb2"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/bendHb3.png"
      class="bendHb3"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/gift.png"
      class="giftImg"
    />
  </div>
</template>
<script>
export default {
  name: 'ShakeWait',
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.wait {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(https://static.hudongmiao.com/joymewH5/img/shake/bg.png);
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cb0100;
  .shakeTitle {
    margin-top: 215px;
    width: 546px;
    height: 216px;
  }
  .circle {
    width: 517px;
    height: 479px;
    position: relative;
    margin-top: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    .outerCircle {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .innerCircle {
      position: absolute;
      width: 440px;
      height: 441px;
    }
    .shakeMobile {
      position: absolute;
      width: 283px;
      height: 319px;
    }
  }
  .light1 {
    position: absolute;
    width: 714px;
    height: 668px;
    left: 270px;
    top: 315px;
  }
  .light2 {
    position: absolute;
    width: 546px;
    height: 793px;
    left: -22.5px;
    top: 330px;
  }
  .light3 {
    position: absolute;
    width: 318px;
    height: 714px;
    left: 195px;
    top: 578px;
  }
  .coin {
    width: 137px;
    height: 138px;
    position: absolute;
    top: 487px;
    right: 8px;
  }
  .coin2 {
    width: 99px;
    height: 85px;
    position: absolute;
    top: 315px;
    left: 0;
  }
  .bendHb1 {
    width: 148px;
    height: 111px;
    position: absolute;
    top: 610px;
    left: -2px;
  }
  .bendHb2 {
    width: 128px;
    height: 83px;
    position: absolute;
    top: 941px;
    left: 62px;
  }
  .bendHb3 {
    width: 128px;
    height: 83px;
    position: absolute;
    top: 747px;
    right: 13px;
  }
  .giftImg {
    width: 711px;
    height: 307px;
    position: absolute;
    bottom: 40px;
  }
  .shakeAni {
    animation-name: shakeAni;
    animation-duration: 2s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
  }
  @keyframes shakeAni {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(25deg);
    }
    60% {
      transform: rotate(-25deg);
    }
    70% {
      transform: rotate(25deg);
    }
    80% {
      transform: rotate(-25deg);
    }
    90% {
      transform: rotate(25deg);
    }
    100% {
      transform: rotate(-25deg);
    }
  }
}
</style>
