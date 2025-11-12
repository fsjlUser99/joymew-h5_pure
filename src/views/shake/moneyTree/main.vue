<template>
  <!-- 摇一摇主界面 -->
  <div class="main">
    <div class="bgArea">
      <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/on-lizi.png" alt="粒子效果" class="particle-effect" />
      <div class="fallGiftArea">
        <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/coin.png" alt="" class="coin1 coin" />
        <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/coin.png" alt="" class="coin2 coin" />
        <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/coin.png" alt="" class="coin3 coin" />
        <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/coin.png" alt="" class="coin4 coin" />
        <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/coin.png" alt="" class="coin5 coin" />
        <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/coin.png" alt="" class="coin6 coin" />
      </div>
      <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/hand-shake_img.png" alt="" class="hand-shake" />
      <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/golden-box.png" alt="" class="golden-box" />
      <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/pileCoinsForAni.png" alt="" class="box-coin-stack-animation" />
      <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/coin-pile.png" alt="" class="coin-pile" />
      <div class="game-on_tip">游戏正在进行中</div>
    </div>
    <div class="top-score_wrap publicVCenter">
      <div class="rank-box publicHvCenter">
        <div class="rank publicVCenter">
          <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/rank-icon.png" alt="" class="rank-icon" />
          <div class="rank-val">第{{ myRank }}名</div>
        </div>
        <div class="avatar-wrap publicHvCenter">
          <img :src="headImg" alt="" class="avatar" />
          <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/avatar-border.png" alt=""
            class="border-deco" />
        </div>
        <div class="score publicVCenter">
          <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/score-icon.png" alt="" class="score-icon" />
          <div class="score-val">{{ currentScore }}分</div>
        </div>
      </div>
      <div class="nickname">{{ nickname }}</div>
    </div>
    <broad v-if="mpType && scoreAdd" :broadContent="broadContent" />
    <!-- 加分效果 -->
    <div v-if="showScoreEffect" class="score-addition-effect">
      +{{ addedScore }}分
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { sendScore } from '@/api/shake/index';
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
const gameCode = 'hmPlay33';
const aniDuration = 1000;
export default {
  name: 'ShakeMain',
  data() {
    return {
      currentScore: 0,
      scoreAdd: 0,
      myRank: 0,
      showScoreEffect: false, // 控制加分效果的显示/隐藏
      addedScore: 0, // 本次增加的分数
    };
  },
  computed: {
    ...mapState({
      mpType: (state) => state.app.mpType,
    }),
    broadContent() {
      return `您已通过加分宝增加${this.scoreAdd}初始积分哦～`;
    },
    nickname() {
      return this.$store.state.user.name;
    },
    headImg() {
      return this.$store.state.user.headImg;
    },
  },
  created() {
    this.initData();
    this.requestGrant();
    window.test = this.test;
  },
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
              // 将perScore取整，避免小数
              const scoreToSubmit = Math.floor(perScore);
              if (scoreToSubmit <= 0) return; // 如果没有分数，则不提交
              sendScore(scoreToSubmit, gameCode, 1)
                .then((res) => {
                  console.log(res);
                  this.currentScore = res.fenshu;
                  this.scoreAdd = res.addScoreInfo?.startScore || 0;
                  this.myRank = res.myRank || 0;

                  this.addedScore = scoreToSubmit;
                  this.showScoreEffect = true;
                  this.playAudio();
                  // 动画持续1秒后，隐藏元素
                  setTimeout(() => {
                    this.showScoreEffect = false;
                  }, aniDuration);
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
    playAudio() {
      createjs.Sound.play('getMoney');
    },
    test(scoreToSubmit) {
      sendScore(scoreToSubmit, gameCode, 1)
        .then((res) => {
          console.log(res);
          this.currentScore = res.fenshu;
          this.scoreAdd = res.addScoreInfo?.startScore || 0;
          this.myRank = res.myRank || 0;

          this.addedScore = scoreToSubmit;
          this.showScoreEffect = true;
          this.playAudio();
          // 动画持续1秒后，隐藏元素
          setTimeout(() => {
            this.showScoreEffect = false;
          }, aniDuration);
        })
        .catch((err) => {
          console.log(err);
        });
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
  background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/on-bg.png);
  background-size: 100% 100%;

  .bgArea {
    position: absolute;
    width: 100%;
    height: 100%;

    .particle-effect {
      position: absolute;
      top: 248px;
      left: 0;
      width: 750px;
      height: 946px;
    }

    .fallGiftArea {
      position: absolute;
      width: 100%;
      height: 86%;
      overflow: hidden;

      .coin {
        width: 45px;
        height: 48px;
        position: absolute;
        left: 50%;
        top: -60px;
        transform: translateX(-50%) scale(1) rotate(0deg);
        animation-name: coinFallRotate;
        animation-duration: 2.5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;

        &.coin1 {
          left: 20%;
          animation-delay: 0s;
          transform: translateX(-50%) scale(1.1);
        }

        &.coin2 {
          left: 35%;
          animation-delay: 0.4s;
          transform: translateX(-50%) scale(0.95);
        }

        &.coin3 {
          left: 50%;
          animation-delay: 0.8s;
          transform: translateX(-50%) scale(1.2);
        }

        &.coin4 {
          left: 65%;
          animation-delay: 1.2s;
          transform: translateX(-50%) scale(0.9);
        }

        &.coin5 {
          left: 80%;
          animation-delay: 1.6s;
          transform: translateX(-50%) scale(1.05);
        }

        &.coin6 {
          left: 60%;
          animation-delay: 2s;
          transform: translateX(-50%) scale(0.85);
        }
      }
    }

    .hand-shake {
      position: absolute;
      width: 610px;
      height: 666px;
      top: 287px;
      right: -200px;
      animation-name: shakeAni;
      animation-duration: 0.5s;
      animation-timing-function: ease-out;
      animation-iteration-count: infinite;
      transform-origin: bottom right;
    }

    .golden-box {
      position: absolute;
      bottom: 180px;
      left: 141px;
      width: 468px;
      height: 332px;
    }

    .box-coin-stack-animation {
      position: absolute;
      bottom: 360px;
      left: 210px;
      width: 316px;
      height: 230px;
      transform-origin: bottom center;
      animation: coinStackBreath 5s infinite ease-in-out;
    }

    .coin-pile {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 814px;
      height: 272px;
      transform: translateX(-407px); // 814/2=407，保证在750宽屏幕居中
    }

    .game-on_tip {
      position: absolute;
      color: #fff;
      font-size: 24px;
      left: 50%;
      transform: translateX(-50%);
      top: 1002px;
      z-index: 2;
    }
  }

  .top-score_wrap {
    position: absolute;
    width: 100%;
    height: 341px;
    top: 0;
    left: 0;
    background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/top-userinfo_bg.png);
    background-size: 100% 100%;
    flex-direction: column;

    .rank-box {
      width: 768px;
      height: 192px;
      background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/on-title_bg.png);
      background-size: 100% 100%;
      color: #fac965;
      font-size: 30px;
      font-weight: 600;
      position: relative;

      .rank {
        position: absolute;
        left: 150px;
        top: 50px;

        .rank-icon {
          width: 32px;
          height: 28px;
        }

        .rank-val {
          margin-left: 10px;
        }
      }

      .avatar-wrap {
        top: -25px;
        position: relative;
        width: 146px;
        height: 142px;

        .avatar {
          width: 112px;
          height: 106px;
          border-radius: 50%;
        }

        .border-deco {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }

      .score {
        position: absolute;
        right: 150px;
        top: 40px;

        .score-icon {
          width: 68px;
          height: 68px;
        }

        .score-val {
          margin-left: -8px;
          position: relative;
          top: -5px;
        }
      }
    }

    .nickname {
      font-size: 28px;
      color: #fff;
      width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      margin-top: -20px;
      font-weight: 600;
    }
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

  @keyframes coinFallRotate {
    0% {
      top: -60px;
      opacity: 0;
      transform: translateX(-50%) scale(var(--coin-scale, 1)) rotate(0deg);
    }

    10% {
      opacity: 1;
    }

    80% {
      opacity: 1;
    }

    100% {
      top: 100%;
      opacity: 0;
      transform: translateX(-50%) scale(var(--coin-scale, 1)) rotate(360deg);
    }
  }

  @keyframes coinStackBreath {
    0% {
      transform: scale(1.0);
      opacity: 1;
    }

    50% {
      transform: scale(1.05);
      /* 放大一点，产生呼吸感 */
      opacity: 0.1;
    }

    100% {
      transform: scale(1.0);
      opacity: 1;
    }
  }
}

@media (max-height: 837px) {
  .game-on_tip {
    display: none !important;
  }
}

.score-addition-effect {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  font-size: 100px;
  font-weight: bold;
  white-space: nowrap;
  // 使用渐变背景并裁剪为文字形状，来实现渐变色文字
  background: linear-gradient(to bottom, #ffee58, #f57f17);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; // 文字本身颜色设为透明
  // 使用text-stroke实现文字描边效果
  -webkit-text-stroke: 4px #FFFA00;
  text-stroke: 4px #FFFA00;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3); // 加一点阴影增加立体感
  // 绑定动画
  animation: score-fly-up 1s ease-out forwards;
}

@keyframes score-fly-up {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(0) scale(0.5);
  }

  20% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1.2);
    /* 放大弹动效果 */
  }

  40% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
    /* 恢复正常大小 */
  }

  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-150px) scale(1);
    /* 向上飘并消失 */
  }
}
</style>
