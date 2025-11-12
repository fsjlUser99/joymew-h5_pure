<template>
  <!-- 摇一摇主界面 -->
  <div class="main">
    <div class="bgArea">
      <div class="fallGiftArea">
        <img
          src="https://static.hudongmiao.com/joymewH5/img/shake/g1.png"
          class="gift1 fallGiftAni1"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/shake/g2.png"
          class="gift2 fallGiftAni2"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/shake/g3.png"
          class="gift3 fallGiftAni3"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/shake/g4.png"
          class="gift4 fallGiftAni4"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/shake/g5.png"
          class="gift5 fallGiftAni5"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/shake/g6.png"
          class="gift6 fallGiftAni6"
        />
      </div>
      <img
        src="https://static.hudongmiao.com/joymewH5/img/hby/shakeMobile2.png"
        class="shakeMobile shakeAni"
      />
      <img
        src="https://static.hudongmiao.com/joymewH5/img/shake/bg.png"
        class="bg"
      />
      <img
        src="https://static.hudongmiao.com/joymewH5/img/shake/gift.png"
        class="giftImg"
      />
    </div>
    <div class="currentMoney">
      <span>当前积分：{{ currentScore }}</span>
    </div>
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/coin.png"
      class="coin"
    />
  </div>
</template>
<script>
import { sendScore } from '@/api/shake/index';
import { timeoutTask } from '@/utils/index';

const speed = 5;
let xBegin = 0;
let yBegin = 0;
let zBegin = 0;
let xEnd = 0;
let yEnd = 0;
let zEnd = 0;
let shakeLock = false;
let perScore = 0;
let acceleration = 0;
export default {
  name: 'ShakeMain',
  data() {
    return {
      currentScore: 0,
    };
  },
  created() {
    this.initData();
    this.requestGrant();
  },
  mounted() {},
  beforeDestroy() {
    window.removeEventListener('devicemotion', this.deviceMotionHandler, false);
  },
  methods: {
    initData() {
      xBegin = 0;
      yBegin = 0;
      zBegin = 0;
      xEnd = 0;
      yEnd = 0;
      zEnd = 0;
      shakeLock = false;
      acceleration = 0;
      perScore = 0;
    },
    requestGrant() {
      if (!window.DeviceMotionEvent) {
        this.$toast.center('您的设备不支持摇一摇!');
        return;
      }
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === 'granted') {
              window.addEventListener(
                'devicemotion',
                this.deviceMotionHandler,
                false,
              );
            } else {
              this.$toast.center('用户未授权摇一摇!');
            }
          })
          .catch((err) => {
            console.log(err);
            this.$toast.center('用户未授权摇一摇!');
          });
      } else {
        window.addEventListener(
          'devicemotion',
          this.deviceMotionHandler,
          false,
        );
      }
    },
    deviceMotionHandler(eventData) {
      try {
        // 获取三个方向的加速度
        acceleration = eventData.accelerationIncludingGravity;
        xBegin = acceleration.x;
        yBegin = acceleration.y;
        zBegin = acceleration.z;

        if (
          Math.abs(xBegin - xEnd) > speed
          || Math.abs(yBegin - yEnd) > speed
          || Math.abs(zBegin - zEnd) > speed
        ) {
          // 符合要求的摇一摇动作(加速度暴增)
          if (!shakeLock) {
            perScore = Math.abs(xBegin) + Math.abs(yBegin) + Math.abs(zBegin);
            // 2s上传一次成绩
            shakeLock = true;
            timeoutTask(() => {
              shakeLock = false;
              sendScore(perScore)
                .then((res) => {
                  console.log(res);
                  this.currentScore = res.fenshu;
                })
                .catch((err) => {
                  console.log(err);
                });
            }, 1800);
          }
        }
        // 记录上一次的加速度
        xEnd = xBegin;
        yEnd = yBegin;
        zEnd = zBegin;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 750px;
  .bgArea {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #cb0100;
    .fallGiftArea {
      position: absolute;
      width: 100%;
      height: 86%;
      overflow: hidden;
      .gift1 {
        width: 106px;
        height: 91px;
        position: absolute;
        left: 565px;
      }
      .gift2 {
        width: 128px;
        height: 83px;
        position: absolute;
        left: 283px;
      }
      .gift3 {
        width: 224px;
        height: 238px;
        position: absolute;
        left: 140px;
      }
      .gift4 {
        width: 152px;
        height: 194px;
        position: absolute;
        left: 554px;
      }
      .gift5 {
        width: 185px;
        height: 186px;
        position: absolute;
        left: 399px;
      }
      .gift6 {
        width: 113px;
        height: 240px;
        position: absolute;
        left: 85px;
      }
    }
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .shakeMobile {
      width: 587px;
      height: 539px;
      position: absolute;
      right: -5%;
      top: 44%;
      transform-origin: right;
    }
    .giftImg {
      width: 711px;
      height: 307px;
      position: absolute;
      bottom: 40px;
    }
  }
  .currentMoney {
    width: 592px;
    height: 190px;
    background-image: url(https://static.hudongmiao.com/joymewH5/img/hby/ribbon.png);
    background-size: 100% 100%;
    font-size: 34px;
    font-weight: bold;
    color: #fffffb;
    position: absolute;
    top: 81px;
    display: flex;
    justify-content: center;
    span {
      position: absolute;
      top: 52px;
      transform: rotate(-2deg);
    }
  }
  .coin {
    position: absolute;
    width: 256px;
    height: 264px;
    left: 12px;
    bottom: 28px;
    transform: rotateZ(95deg);
  }
  .shakeAni {
    animation-name: shakeAni;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
  }
  .fallGiftAni1 {
    animation-name: fallGiftAni;
    animation-duration: 10s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.6s;
  }
  .fallGiftAni2 {
    animation-name: fallGiftAni;
    animation-duration: 8s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.4s;
  }
  .fallGiftAni3 {
    animation-name: fallGiftAni;
    animation-duration: 7s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.5s;
  }
  .fallGiftAni4 {
    animation-name: fallGiftAni;
    animation-duration: 6s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.3s;
  }
  .fallGiftAni5 {
    animation-name: fallGiftAni;
    animation-duration: 4s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.8s;
  }
  .fallGiftAni6 {
    animation-name: fallGiftAni;
    animation-duration: 8s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.2s;
  }
  @keyframes shakeAni {
    0% {
      transform: rotate(1deg);
    }
    50% {
      transform: rotate(-25deg);
    }
    100% {
      transform: rotate(1deg);
    }
  }
  @keyframes fallGiftAni {
    0% {
      transform: translateY(-200%);
    }
    100% {
      transform: translateY(100vh);
    }
  }
}
</style>
