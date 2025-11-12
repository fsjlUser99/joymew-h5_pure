<template>
  <!-- 数钞票game -->
  <div class="main">
    <div class="main-wrap" >
        <div class="fallArea">
        <div class="coupon fallAni1">
            <img
            src="https://static.hudongmiao.com/joymewH5/img/countMoney/coupon.png"
            class="rotateAni"
            />
        </div>
        <div class="coupon2 fallAni2">
            <img
            src="https://static.hudongmiao.com/joymewH5/img/countMoney/coupon.png"
            class="rotateAni"
            />
        </div>
        <div class="money fallAni3">
            <img
            src="https://static.hudongmiao.com/joymewH5/img/countMoney/money4.png"
            class="rotateAni"
            />
        </div>
        </div>
        <div class="ribbon" v-if="!isWedding">
            <span>当前分数：{{ score }}</span>
        </div>
        <div class="ribbon-wedding" v-if="isWedding">
            <span>当前分数：{{ score }}</span>
        </div>
        <div
        class="gameArea"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        >
        <img
            :src="hbShellImg"
            class="hbShell"
            :class="{ 'wedding': isWedding }"
        />
        <img
            src="https://static.hudongmiao.com/joymewH5/img/countMoney/money2.png"
            class="btMoney"
        />
        <img
            v-for="item in moneyList"
            :key="item.moneyId"
            src="https://static.hudongmiao.com/joymewH5/img/countMoney/money.png"
            class="rmb"
            :class="{ cmAni: item.isAniStart }"
        />
        <img
            v-show="handVisible"
            :src="handImg"
            class="hand handAni"
            :class="{ 'wedding': isWedding }"
        />
        </div>
        <broad
        v-if="mpType && scoreAdd"
        :broadContent="broadContent"
        />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { timeoutTask } from '@/utils/index';
import submitScore from '@/api/countMoney/index';
import createjs from 'createjs-cmd';
import broad from '@/components/broad/index.vue';

export default {
  name: 'CountMoneyMain',
  components: {
    broad,
  },
  props: {
    isWedding: {
      type: Boolean,
      default: false,
    },
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
    handImg() {
      return this.isWedding ? 'https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-hand-wedding.png' : 'https://static.hudongmiao.com/joymewH5/img/countMoney/hand.png';
    },
    hbShellImg() {
      return this.isWedding ? 'https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-hbshell-wedding.png' : 'https://static.hudongmiao.com/joymewH5/img/countMoney/hbShell.png';
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
      createjs.Sound.play('count');
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
}
.main-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .ribbon-wedding {
    position: absolute;
    width: 100vw;
    height: 30vw;
    top: 10vw;
    background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-score-container.png");
    background-size: 100% 100%;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 4vw;
      font-weight: bold;
      font-size: 40px;
      font-weight: bold;
      color: #fffffb;
      margin-bottom: 2vw;
    }
  }
  .ribbon {
    width: 659px;
    height: 206px;
    background-image: url(https://static.hudongmiao.com/joymewH5/img/countMoney/ribbon.png);
    background-size: 100% 100%;
    position: absolute;
    top: 95px;
    display: flex;
    justify-content: center;
    z-index: 1;
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
    .hbShell {
      width: 100%;
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
    .rmb {
      width: 467px;
      height: 854px;
      position: absolute;
      left: 150px;
      top: 22.5px;
    }
    .hand {
      width: 396px;
      height: 413px;
      position: absolute;
      bottom: 0;
      left: 262.5px;
      z-index: 1;
      &.wedding {
        width: 60vw;
        height: 60vw;
        position: absolute;
        bottom: 0;
        left: 22vw;
        z-index: 1;
      }
    }
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
    &.wedding {
      animation-duration: 0.6s;
    }
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
      transform: translateY(150px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  @keyframes cmAni {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-100vh);
    }
  }
}
</style>
