<template>
  <!-- 红包雨主界面 -->
  <div class="main">
    <div class="bgArea">
      <div class="fallHbArea">
        <img
          src="https://static.hudongmiao.com/joymewH5/img/hby/hb.png"
          class="hb1 fallHbAni1"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/hby/hb.png"
          class="hb2 fallHbAni2"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/hby/hb.png"
          class="hb3 fallHbAni3"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/hby/hb.png"
          class="hb4 fallHbAni4"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/hby/hb.png"
          class="hb5 fallHbAni5"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/hby/hb.png"
          class="hb6 fallHbAni6"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/hby/hb.png"
          class="hb7 fallHbAni7"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/hby/hb.png"
          class="hb8 fallHbAni8"
        />
        <img
          src="https://static.hudongmiao.com/joymewH5/img/hby/hb.png"
          class="hb9 fallHbAni9"
        />
      </div>
      <img
        src="https://static.hudongmiao.com/joymewH5/img/hby/shakeMobile2.png"
        class="shakeMobile shakeAni"
      />
      <img
        src="https://static.hudongmiao.com/joymewH5/img/hby/bg2.png"
        class="bg"
      />
    </div>
    <div class="currentMoney">
      <span>当前金额：{{ currentMoney }}</span>
    </div>
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/coin.png"
      class="coin"
    />
  </div>
</template>
<script>
import { initAllHby, uploadAllHbyScore } from '@/api/hby/allHby';
import { mapMutations } from 'vuex';
import { timeoutTask } from '@/utils/index';
import createjs from 'createjs-cmd';

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
// const canVibrate = false; // 是否支持手机震动

export default {
  name: 'HbyMain',
  components: {},
  data() {
    return {
      currentMoney: 0,
    };
  },
  computed: {},
  created() {
    this.initData();
    this.init();
  },
  mounted() {
  },
  methods: {
    ...mapMutations({
      setHbyId: 'game/setHbyId',
    }),
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
    init() {
      try {
        this.requestHbyId(() => {
          this.requestGrant();
        });
      } catch (err) {
        console.log(err);
      }
    },
    addRecord(money) {
      try {
        this.playAudio();
        // if (canVibrate) {
        //   navigator.vibrate(500);
        // }
        this.currentMoney = money;
      } catch (err) {
        console.log(err);
      }
    },
    requestHbyId(cb) {
      initAllHby()
        .then((res) => {
          console.log(res);
          this.currentMoney = res.gold || 0;
          this.setHbyId(res.hbId);
          if (cb) {
            cb(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    requestGrant() {
      if (!window.DeviceMotionEvent) {
        this.$toast.center('你的设备不支持摇一摇!');
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
            this.$toast.center('用户未授权摇一摇权限!');
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
        // 达成摇一摇动作的条件
        if (
          Math.abs(xBegin - xEnd) > speed
          || Math.abs(yBegin - yEnd) > speed
          || Math.abs(zBegin - zEnd) > speed
        ) {
          this.uploadScore(xBegin, yBegin, zBegin);
        }
        // 记录上一次的加速度
        xEnd = xBegin;
        yEnd = yBegin;
        zEnd = zBegin;
      } catch (err) {
        console.log(err);
      }
    },
    playAudio() {
      createjs.Sound.play('getMoney');
    },
    /**
     * 上传分数
     * 只要符合摇一摇条件，该方法就会被调用(调用的频次很高)
     * 开启2s计时器，2s时间到 上传当前分数到服务器(用锁限制计时器同时只能存在一个)
     * 上传完分数后，重置perScore，解锁计时器
     */
    uploadScore(xBegin, yBegin, zBegin) {
      if (shakeLock) {
        return;
      }
      // 加速度 取值可能是[1, 100]
      const tmpSpeedAdd = Math.abs(xBegin) + Math.abs(yBegin) + Math.abs(zBegin);
      // 根据加速度的值生成1-12的随机正整数,限制计算的值一定不会超过12
      let tmpPerScore = Math.round((tmpSpeedAdd / 100) * 12) + 1;
      if (tmpPerScore > 12) {
        tmpPerScore = 12;
      }
      perScore = tmpPerScore;
      shakeLock = true;
      timeoutTask(() => {
        // 上传perScore到服务
        uploadAllHbyScore(perScore)
          .then((res) => {
            console.log(res);
            this.addRecord(res.gold);
            perScore = 0;
            shakeLock = false;
          })
          .catch((err) => {
            console.log(err);
            perScore = 0;
            shakeLock = false;
          });
      }, 2000);
    },
  },
  beforeDestroy() {
    window.removeEventListener('devicemotion', this.deviceMotionHandler, false);
  },
};
</script>
<style lang="less" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(https://static.hudongmiao.com/joymewH5/img/hby/bg.png);
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 750px;
  .bgArea {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #cb0100;
    .fallHbArea {
      position: absolute;
      width: 100%;
      height: 86%;
      overflow: hidden;
      .hb1 {
        width: 105px;
        height: 137px;
        position: absolute;
        left: 225px;
      }
      .hb2 {
        width: 77px;
        height: 100px;
        position: absolute;
        left: 70px;
      }
      .hb3 {
        width: 35px;
        height: 46px;
        position: absolute;
        left: 402px;
      }
      .hb4 {
        width: 82px;
        height: 107px;
        position: absolute;
        left: 453px;
      }
      .hb5 {
        width: 35px;
        height: 46px;
        position: absolute;
        left: 606px;
      }
      .hb6 {
        width: 105px;
        height: 137px;
        position: absolute;
        left: 574px;
      }
      .hb7 {
        width: 82px;
        height: 107px;
        position: absolute;
        left: 130px;
      }
      .hb8 {
        width: 59px;
        height: 78px;
        position: absolute;
        left: 79px;
      }
      .hb9 {
        width: 59px;
        height: 78px;
        position: absolute;
        left: 278px;
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
  .fallHbAni1 {
    animation-name: fallHbAni;
    animation-duration: 7s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.2s;
  }
  .fallHbAni2 {
    animation-name: fallHbAni;
    animation-duration: 10s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.4s;
  }
  .fallHbAni3 {
    animation-name: fallHbAni;
    animation-duration: 15s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.6s;
  }
  .fallHbAni4 {
    animation-name: fallHbAni;
    animation-duration: 10s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.8s;
  }
  .fallHbAni5 {
    animation-name: fallHbAni;
    animation-duration: 15s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.6s;
  }
  .fallHbAni6 {
    animation-name: fallHbAni;
    animation-duration: 5s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 1.2s;
  }
  .fallHbAni7 {
    animation-name: fallHbAni;
    animation-duration: 10s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 1.5s;
  }
  .fallHbAni8 {
    animation-name: fallHbAni;
    animation-duration: 8s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
  }
  .fallHbAni9 {
    animation-name: fallHbAni;
    animation-duration: 4s;
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
  @keyframes fallHbAni {
    0% {
      transform: translateY(-200%);
    }
    100% {
      transform: translateY(100vh);
    }
  }
}
</style>
