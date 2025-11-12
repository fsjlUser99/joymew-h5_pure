<template>
  <!-- 数钞票game -->
  <div class="main">
    <div class="left" />
    <div class="right" />
    <!-- <img :src="require('@/assets/image/pigOut/tiger-1.png')" alt="" class="tiger" /> -->
    <div class="tiger eatAni" />
    <div class="fallArea">
      <div class="coupon fallAni1">
        <img
          :src="require('@/assets/image/pigOut/chicken.png')"
          class="rotateAni"
        />
      </div>
      <div class="coupon2 fallAni2">
        <img
          :src="require('@/assets/image/pigOut/chicken.png')"
          class="rotateAni"
        />
      </div>
      <div class="money fallAni3">
        <img
          :src="require('@/assets/image/pigOut/chicken.png')"
          class="rotateAni"
        />
      </div>
    </div>
    <div class="ribbon">
      {{ score }}
    </div>
    <!-- <div class="scroll"></div> -->
    <div
      class="gameArea"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <img
        :src="require('@/assets/image/pigOut/dish.png')"
        class="dish"
      />
      <!-- <img src="https://static.hudongmiao.com/joymewH5/img/countMoney/money2.png" class="btMoney" /> -->
      <img
        v-for="item in moneyList"
        :key="item.moneyId"
        :src="require('@/assets/image/pigOut/chicken.png')"
        class="chicken"
        :class="{ cmAni: item.isAniStart }"
      />
      <img
        v-show="handVisible"
        :src="require('@/assets/image/pigOut/scroll.png')"
        class="hand handAni"
      />
    </div>
    <broad
      v-if="mpType && scoreAdd"
      :broadContent="broadContent"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { timeoutTask } from '@/utils/index';
// import bgm from '@/assets/constant/audio';
import submitScore from '@/api/pigOut/index';
import createjs from 'createjs-cmd';
import broad from '@/components/broad/index.vue';

export default {
  name: 'PigOutMain',
  components: {
    broad,
  },
  data() {
    return {
      startY: 0,
      endY: 0,
      lock: false,
      audioLock: false,
      handVisible: true,
      moneyList: [],
      count: 0,
      score: 0,
      scoreAdd: 0,
    };
  },
  computed: {
    ...mapState({
      mpType: (state) => state.app.mpType,
    }),
    broadContent() {
      return `您已通过加分宝增加${this.scoreAdd}初始积分哦～`;
    },
  },
  watch: {
    handVisible(newVal) {
      if (!newVal) {
        this.intervalSubmitScore();
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.tmpInterval);
  },
  created() {
    this.addMoneyList();
    this.initScore();
  },
  mounted() {},
  methods: {
    addMoneyList() {
      for (let i = 0; i < 5; i += 1) {
        this.moneyList.unshift({
          moneyId: this.count,
          isAniStart: false,
        });
        this.count += 1;
      }
    },
    handleTouchStart(e) {
      if (!this.lock) {
        this.lock = true;
        this.handVisible = false;
        this.startY = e.touches[0].pageY;
        this.playAudio();
      }
    },
    handleTouchEnd(e) {
      this.endY = e.changedTouches[0].pageY;
      if (this.endY < this.startY) {
        this.startCountMoneyAni();
      }
      this.lock = false;
    },
    // 获取待执行动画的下一个money的index
    getNextCanAniMoneyIndex() {
      if (this.moneyList.length <= 5) {
        this.addMoneyList();
      }
      const len = this.moneyList.length;
      let tIndex = -1;
      for (let i = len - 1; i > 0; i -= 1) {
        if (this.moneyList[i]) {
          if (!this.moneyList[i].isAniStart) {
            tIndex = i;
            break;
          }
        }
      }
      return tIndex;
    },
    startCountMoneyAni() {
      const tIndex = this.getNextCanAniMoneyIndex();
      this.moneyList[tIndex].isAniStart = true;
      this.score += 100;
      timeoutTask(() => {
        this.moneyList[tIndex].isAniStart = false;
        this.moneyList.pop();
      }, 500);
    },
    // 每2s发送一次分数
    intervalSubmitScore() {
      this.tmpInterval = setInterval(() => {
        submitScore(this.score)
          .then((res) => {
            console.log(res);
            this.score = Math.max(res.score, this.score);
            this.scoreAdd = res.addScoreInfo?.startScore || 0;
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1800);
    },
    playAudio() {
      // timeoutTask(() => {
      //   const audioPlayer = document.createElement('audio');
      //   audioPlayer.src = bgm.countMoney;
      //   audioPlayer.play();
      // }, 300);
      createjs.Sound.play('eat');
    },
    // 初始化分数
    initScore() {
      submitScore(this.score)
        .then((res) => {
          console.log(res);
          this.score = Math.max(res.score, this.score);
          this.scoreAdd = res.addScoreInfo?.startScore || 0;
        })
        .catch((err) => {
          console.log(err);
        });
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
  display: flex;
  flex-direction: column;
  align-items: center;
  .tiger {
    width: 421px;
    height: 322px;
    margin-top: 214px;
    position: relative;
    // z-index: 3;
    background-size: 100% 100%;
    background-image: url(~@/assets/image/pigOut/tiger-1.png);
  }

  .left {
    width: 285px;
    height: 277px;
    position: absolute;
    top: 0;
    left: 0;
    background-size: 100% 100%;
    background-image: url(~@/assets/image/pigOut/left.png);
  }
  .right {
    width: 285px;
    height: 277px;
    position: absolute;
    top: 0;
    right: 0;
    background-size: 100% 100%;
    background-image: url(~@/assets/image/pigOut/right.png);
  }
  .scroll {
    width: 567px;
    height: 655px;
    position: absolute;
    top: 0;
    right: 0;
    background-size: 100% 100%;
    background-image: url(~@/assets/image/pigOut/scroll.png);
  }
  .ribbon {
    min-width: 222px;
    height: 96px;
    padding: 0 20px;
    background-image: url(~@/assets/image/pigOut/score.png);
    background-size: 100% 100%;
    position: absolute;
    top: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    z-index: 3;
    font-size: 74px;
    color: #ffe723;
    span {
      font-size: 40px;
      font-weight: bold;
      color: #fffffb;
      transform: rotate(-4deg);
      position: absolute;
      top: 52.5px;
    }
  }
  .fallArea {
    position: absolute;
    width: 100%;
    height: 100%;
    .coupon {
      width: 91px;
      height: 84px;
      position: absolute;
      left: 19px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .coupon2 {
      width: 91px;
      height: 84px;
      position: absolute;
      right: 19px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .money {
      width: 130px;
      height: 105px;
      position: absolute;
      right: 68px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .gameArea {
    position: absolute;
    width: 100%;
    height: 880px;
    bottom: 0;
    .dish {
      width: 689px;
      height: 362px;
      // margin: 0 auto;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      bottom: 0;
      z-index: 1;
    }
    .btMoney {
      width: 535px;
      height: 773px;
      position: absolute;
      left: 112.5px;
      top: 0;
    }
    .chicken {
      width: 515px;
      height: 342px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      bottom: 0;
    }
    .hand {
      width: 567px;
      height: 655px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -250px);
      z-index: 1;
    }
  }
  .eatAni {
    animation-name: eatAni;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  .rotateAni {
    animation-name: rotateAni;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .fallAni1 {
    animation-name: fallAni;
    animation-duration: 8s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.4s;
  }
  .fallAni2 {
    animation-name: fallAni;
    animation-duration: 6s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.2s;
  }
  .fallAni3 {
    animation-name: fallAni;
    animation-duration: 10s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-delay: 0.6s;
  }
  .handAni {
    animation-name: handAni;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .cmAni {
    animation-name: cmAni;
    animation-duration: 0.5s;
    animation-timing-function: linear;
  }
  @keyframes rotateAni {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes fallAni {
    0% {
      transform: translateY(-200%);
    }
    100% {
      transform: translateY(100vh);
    }
  }
  @keyframes handAni {
    0% {
      transform: translate(-50%, -200px);
    }
    100% {
      transform: translate(-50%, -350px);
    }
  }
  @keyframes eatAni {
    0% {
      transform: none;
    }
    15% {
      transform: translate3d(-35%, 0, 0) rotate3d(0, 0, 1, -5deg);
    }
    30% {
      transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    }
    45% {
      transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    }
    60% {
      transform: translate3d(30%, 0, 0) rotate3d(0, 0, 1, 2deg);
    }
    75% {
      transform: translate3d(25%, 0, 0) rotate3d(0, 0, 1, -1deg);
    }
    100% {
      transform: none;
    }

    0% {
      background-image: url(~@/assets/image/pigOut/tiger-1.png);
    }

    49% {
      background-image: url(~@/assets/image/pigOut/tiger-1.png);
    }

    50% {
      background-image: url(~@/assets/image/pigOut/tiger-3.png);
    }
    65% {
      background-image: url(~@/assets/image/pigOut/tiger-3.png);
    }
    66% {
      background-image: url(~@/assets/image/pigOut/tiger-1.png);
    }

    100% {
      background-image: url(~@/assets/image/pigOut/tiger-1.png);
    }
  }
  @keyframes cmAni {
    0% {
      transform: translate(-50%, 0px) scale(1, 1);
    }

    57% {
      opacity: 1;
    }
    58% {
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -100vh) scale(0.2, 0.2);
      opacity: 0;
    }
  }
}
</style>
