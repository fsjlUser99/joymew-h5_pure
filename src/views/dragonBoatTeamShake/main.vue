<template>
  <!-- 赛龙舟(团队)主界面 -->
  <div class="main">
    <img
      src="@/assets/image/dragonBoatTeamShake/hand.png"
      class="handImg"
    />
  </div>
</template>
<script>
import { commitDragonBoatTeamScore } from '@/api/shake/index';
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
  name: 'DragonBoatTeamShakeMain',
  components: {},
  props: {
    teamId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  computed: {},
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
        this.$toast.center('你的设备不支持摇一摇!', window.DeviceMotionEvent);
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
              commitDragonBoatTeamScore({
                fenshu: perScore,
                teamId: this.teamId,
              })
                .then((res) => {
                  console.log(res);
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
  background-image: url(~@/assets/image/dragonBoatTeamShake/bg.png);
  background-size: 100% 100%;
  position: relative;
  .handImg {
    position: absolute;
    width: 446px;
    height: 446px;
    top: 420px;
    transform-origin: bottom;
    animation-name: shakeAni;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
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
}
</style>
