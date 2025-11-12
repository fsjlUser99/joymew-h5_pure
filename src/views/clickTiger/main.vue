<template>
  <!-- 武松打虎 -->
  <div class="clickTiger-wrap">
    <img
      src="@/assets/image/clickTiger/sun.png"
      class="sun"
    />
    <img
      src="@/assets/image/clickTiger/ground.png"
      class="ground"
    />
    <img
      src="@/assets/image/clickTiger/coins.png"
      class="coins"
    />
    <img
      src="@/assets/image/clickTiger/leftTree.png"
      class="leftTree"
    />
    <img
      src="@/assets/image/clickTiger/rightTree.png"
      class="rightTree"
    />
    <img
      src="@/assets/image/clickTiger/cloud.png"
      class="cloud1"
    />
    <img
      src="@/assets/image/clickTiger/cloud.png"
      class="cloud2"
    />
    <img
      src="@/assets/image/clickTiger/title.png"
      class="title"
    />
    <div class="scoreBox publicHvCenter">
      分数：
      <label>{{ currentScore }}</label>
    </div>
    <div class="holeGroup">
      <div
        v-for="item in 10"
        :key="item"
        class="holeItem"
      >
        <div class="holeInner" />
        <img
          src="@/assets/image/clickTiger/holeBack.png"
          class="holeBack"
        />
        <div
          v-show="addScoreAniQueue.indexOf(item) > -1 && addScores[item - 1] > 0"
          class="addScore"
          :class="{ active: addScoreAniQueue2.indexOf(item) > -1 }"
        >
          +{{ addScores[item - 1] }}
        </div>
        <div
          class="tigerBox"
          :class="{ beatenAni: wusongAniQueue.indexOf(item) > -1 }"
        >
          <img
            v-tap="{ methods: handleTigerClick, pItem: item }"
            src="@/assets/image/clickTiger/tiger.png"
            class="tiger"
            :class="{ appearAni: activeItems.indexOf(item) > -1 }"
          />
        </div>
        <img
          src="@/assets/image/clickTiger/holeFront.png"
          class="holeFront"
        />
        <img
          v-show="wusongAniQueue.indexOf(item) > -1"
          src="@/assets/image/clickTiger/wusong.png"
          class="wusong"
          :class="{ active: wusongAniQueue2.indexOf(item) > -1 }"
        />
      </div>
    </div>
    <broad
      v-if="mpType && scoreAdd"
      :broadContent="broadContent"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { generateRandom, timeoutTask } from '@/utils/index';
import createjs from 'createjs-cmd';
import submitScore from '@/api/clickTiger/index';
import broad from '@/components/broad/index.vue';

let canVibrate = false; // 是否支持手机震动

export default {
  name: 'ClickTigerMain',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
      mpType: (state) => state.app.mpType,
    }),
    broadContent() {
      return `您已通过加分宝增加${this.scoreAdd}初始积分哦～`;
    },
  },
  components: {
    broad,
  },
  data() {
    return {
      // activeItem: -1,
      activeItems: [],
      addScoreAniQueue: [],
      addScoreAniQueue2: [],
      wusongAniQueue: [],
      wusongAniQueue2: [],
      currentScore: 0,
      addScores: [],
      scoreAdd: 0,
    };
  },
  watch: {},
  created() {
    for (let i = 0; i < 10; i += 1) {
      this.addScores.push(0);
    }
    if (navigator) {
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
      if (navigator.vibrate) {
        canVibrate = true;
      }
    }
    this.initScore();
  },
  mounted() {
    this.startGameAni();
  },
  beforeDestroy() {
    clearInterval(this.tmpInterval);
    clearInterval(this.sendScoreInterval);
  },
  methods: {
    handleTigerClick(e) {
      console.log(e.pItem);
      this.playAudio();
      if (canVibrate) {
        navigator.vibrate(100);
      }
      this.startWusongAni(e.pItem);
      this.startAddScoreAni(e.pItem);
    },
    startGameAni() {
      this.randomAppearTiger();
      this.tmpInterval = setInterval(() => {
        this.randomAppearTiger();
      }, 500);
      this.intervalSubmitScore();
    },
    randomAppearTiger() {
      const randomItem = generateRandom(1, 11);
      if (this.activeItems.indexOf(randomItem) === -1) {
        // 避免在相同的洞口内出现
        this.activeItems.push(randomItem);
        console.log(this.activeItems);
        timeoutTask(() => {
          const tmpIndex = this.activeItems.indexOf(randomItem);
          this.activeItems.splice(tmpIndex, 1);
        }, 1500);
      }
    },
    startAddScoreAni(item) {
      // 出现
      this.addScoreAniQueue.push(item);
      // 执行动画
      timeoutTask(() => {
        this.addScoreAniQueue2.push(item);
      }, 1);
      // 消失
      timeoutTask(() => {
        this.addScoreAniQueue2.shift();
        this.addScoreAniQueue.shift();
        this.addScores[item - 1] = 0;
      }, 801);
    },
    startWusongAni(item) {
      this.addScores[item - 1] += 10;
      this.currentScore += this.addScores[item - 1];
      // 出现
      this.wusongAniQueue.push(item);
      // 执行动画
      timeoutTask(() => {
        this.wusongAniQueue2.push(item);
      }, 1);
      // 消失
      timeoutTask(() => {
        this.wusongAniQueue2.shift();
        this.wusongAniQueue.shift();
      }, 101);
    },
    playAudio() {
      createjs.Sound.play('clickTiger');
    },
    initScore() {
      submitScore(this.currentScore)
        .then((res) => {
          console.log(res);
          this.currentScore = Math.max(res.score, this.currentScore);
          this.scoreAdd = res.addScoreInfo?.startScore || 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 每2s发送一次分数
    intervalSubmitScore() {
      this.sendScoreInterval = setInterval(() => {
        submitScore(this.currentScore)
          .then((res) => {
            console.log(res);
            this.currentScore = Math.max(res.score, this.currentScore);
            this.scoreAdd = res.addScoreInfo?.startScore || 0;
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1800);
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
.clickTiger-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/image/clickTiger/sky.png');
  background-size: 100% 100%;
  overflow: hidden;
  .leftTree {
    position: absolute;
    width: 171px;
    height: 220px;
    left: 0;
    top: 103px;
  }
  .rightTree {
    position: absolute;
    width: 171px;
    height: 220px;
    right: 0;
    top: 103px;
  }
  .sun {
    width: 585px;
    height: 595px;
    position: absolute;
    top: 53px;
    left: 89px;
  }
  .cloud1 {
    position: absolute;
    width: 241px;
    height: 101px;
    left: -45px;
    top: 53px;
    transform: rotateY(180deg);
  }
  .cloud2 {
    position: absolute;
    width: 241px;
    height: 101px;
    right: -45px;
    top: 53px;
  }
  .title {
    width: 750px;
    height: 105px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .ground {
    position: absolute;
    left: 0;
    top: 167px;
    width: 750px;
    height: calc(100% - 167px);
  }
  .coins {
    position: absolute;
    left: 8px;
    top: 282px;
    width: 739px;
    height: 1026px;
  }
  .scoreBox {
    height: 91px;
    padding: 20px;
    background-image: url('../../assets/image/clickTiger/scoreBox.png');
    background-size: 100% 100%;
    position: absolute;
    top: 155px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 39px;
    label {
      color: #fffd43;
      font-size: 77px;
    }
  }
  .holeGroup {
    position: absolute;
    width: 750px;
    height: 1167px;
    top: 167px;
    left: 0;
    .holeItem {
      width: 217px;
      height: 107px;
      position: absolute;
      .tigerBox {
        position: absolute;
        width: 202px;
        height: 304px;
        top: -238px;
        overflow: hidden;
        .tiger {
          position: absolute;
          width: 202px;
          height: 304px;
          top: 310px;
        }
      }
      .holeBack {
        position: absolute;
        width: 100%;
        height: 73.5px;
        top: -23.5px;
      }
      .holeFront {
        position: absolute;
        width: 100%;
        height: 58px;
        bottom: 0;
      }
      .holeInner {
        position: absolute;
        width: 85%;
        height: 60%;
        background-color: #851414;
        border-radius: 50%;
        left: 18px;
        top: 12px;
      }
      .wusong {
        position: absolute;
        width: 227px;
        height: 303px;
        right: -180px;
        top: -390px;
        transform: rotate(24deg);
        &.active {
          transform: rotate(-24deg);
          transition: all 0.1s ease-out;
        }
      }
      .addScore {
        font-size: 72px;
        color: #fffd43;
        font-weight: 600;
        position: absolute;
        top: -240px;
        left: 70px;
        transform: translateY(0);
        z-index: 1;
        &.active {
          transform: translateY(-120px);
          transition: all 0.8s ease-out;
        }
      }
      &:nth-child(1) {
        top: 187px;
        left: 268px;
      }
      &:nth-child(2) {
        top: 311px;
        left: 63px;
      }
      &:nth-child(3) {
        top: 311px;
        right: 63px;
      }
      &:nth-child(4) {
        top: 420px;
        left: 268px;
      }
      &:nth-child(5) {
        top: 560px;
        left: 63px;
      }
      &:nth-child(6) {
        top: 560px;
        right: 63px;
      }
      &:nth-child(7) {
        top: 680px;
        left: 268px;
      }
      &:nth-child(8) {
        top: 800px;
        left: 63px;
      }
      &:nth-child(9) {
        top: 800px;
        right: 63px;
      }
      &:nth-child(10) {
        top: 940px;
        left: 268px;
      }
    }
  }
  .appearAni {
    animation-name: appearAni;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  .beatenAni {
    transform-origin: bottom;
    animation-name: beatenAni;
    animation-duration: 0.1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes beatenAni {
    0% {
      transform: perspective(3000px) rotateZ(0deg);
    }
    20% {
      transform: perspective(3000px) rotateZ(15deg);
    }
    40% {
      transform: perspective(3000px) rotateZ(0deg);
    }
    60% {
      transform: perspective(3000px) rotateZ(-15deg);
    }
    100% {
      transform: perspective(3000px) rotateZ(0deg);
    }
  }
  @keyframes appearAni {
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-304px);
    }
    60% {
      transform: translateY(-304px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  // @keyframes appearAni {
  //   0% {
  //     transform: perspective(3000px) translateY(0);
  //   }
  //   20% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(0deg);
  //   }
  //   25% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(15deg);
  //   }
  //   30% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(0deg);
  //   }
  //   35% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(-15deg);
  //   }
  //   40% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(0deg);
  //   }
  //   45% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(15deg);
  //   }
  //   50% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(0deg);
  //   }
  //   55% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(-15deg);
  //   }
  //   60% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(0deg);
  //   }
  //   65% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(15deg);
  //   }
  //   70% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(0deg);
  //   }
  //   75% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(-15deg);
  //   }
  //   80% {
  //     transform: perspective(3000px) translateY(-304px) rotateZ(0deg);
  //   }
  //   100% {
  //     transform: perspective(3000px) translateY(0px);
  //   }
  // }
}
</style>
