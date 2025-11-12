<template>
  <!-- 摇一摇主界面 -->
  <div class="main">
    <div class="scoreBox">当前积分：{{ currentScore }}</div>
    <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/dragon/shakeHand.png"
      alt="摇一摇手"
      class="shakeHand shakeAni"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/dragon/bottomDecoOn.png"
      alt="底部装饰"
      class="bottomDeco"
    />
    <broad
      v-if="mpType && scoreAdd"
      :broadContent="broadContent"
    />
  </div>
</template>
<script>
import { sendScore } from '@/api/shake/index';
import { timeoutTask } from '@/utils/index';
import broad from '@/components/broad/index.vue';

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
const gameCode = 'hmPlay27';

export default {
  name: 'ShakeMain',
  components: {
    broad,
  },

  data() {
    return {
      currentScore: 0,
      scoreAdd: 0,
    };
  },
  computed: {
    mpType() {
      return this.$store.state.app.mpType;
    },
    broadContent() {
      return `您已通过加分宝增加${this.scoreAdd}初始积分哦～`;
    },
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
      sendScore(0)
        .then((res) => {
          console.log(res);
          this.currentScore = res.fenshu;
          this.scoreAdd = res.addScoreInfo?.startScore || 0;
        })
        .catch((err) => {
          console.log(err);
        });
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
              window.addEventListener('devicemotion', this.deviceMotionHandler, false);
            } else {
              this.$toast.center('用户未授权摇一摇!');
            }
          })
          .catch((err) => {
            console.log(err);
            this.$toast.center('用户未授权摇一摇!');
          });
      } else {
        window.addEventListener('devicemotion', this.deviceMotionHandler, false);
      }
    },
    deviceMotionHandler(eventData) {
      try {
        // 获取三个方向的加速度
        acceleration = eventData.accelerationIncludingGravity;
        xBegin = acceleration.x;
        yBegin = acceleration.y;
        zBegin = acceleration.z;

        if (Math.abs(xBegin - xEnd) > speed || Math.abs(yBegin - yEnd) > speed || Math.abs(zBegin - zEnd) > speed) {
          // 符合要求的摇一摇动作(加速度暴增)
          if (!shakeLock) {
            perScore = Math.abs(xBegin) + Math.abs(yBegin) + Math.abs(zBegin);
            // 2s上传一次成绩
            shakeLock = true;
            timeoutTask(() => {
              shakeLock = false;
              sendScore(perScore, gameCode)
                .then((res) => {
                  console.log(res);
                  this.currentScore = res.fenshu;
                  this.scoreAdd = res.addScoreInfo?.startScore || 0;
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
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: url('https://static.hudongmiao.com/joymewH5/img/shake/dragon/bg.png');
  .scoreBox {
    margin: 140.38px auto 0 auto;
    width: 461.54px;
    height: 115.38px;
    background: rgba(255, 85, 85, 0.7);
    border: 3.85px solid #ffeb3a;
    border-radius: 65.38px;
    text-align: center;
    line-height: 115.38px;
    font-size: 46.15px;
    font-weight: 600;
    color: #ffffff;
  }
  .shakeHand {
    width: 709.62px;
    height: 617.31px;
    position: absolute;
    right: -80px;
    top: 300px;
    z-index: 1;
  }
  .bottomDeco {
    width: 100%;
    height: 348px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .shakeAni {
    animation-name: shakeAni;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.41, 0.01, 0.44, 0.99);
    animation-iteration-count: infinite;
    transform-origin: 100% 50%;
  }
  @keyframes shakeAni {
    0%,
    100% {
      transform: rotate(-15deg);
    }
    50% {
      transform: rotate(15deg);
    }
  }
}
</style>
