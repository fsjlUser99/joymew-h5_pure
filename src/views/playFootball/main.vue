<template>
  <div
    class="gamewrapper publicVCenter"
    @click="playFootball"
  >
    <div class="scoreBox publicHvCenter">
      {{ currentScore }}
      <img
        src="@/assets/image/playFootball/ball.png"
        class="ballIcon"
      />
    </div>
    <!-- 球底部光圈 -->
    <img
      src="@/assets/image/playFootball/circle.png"
      class="circle"
    />
    <!-- 球 -->
    <div
      v-for="item in ballArr"
      :key="'footballBox' + item.id"
      class="footballBox"
      :class="item.ani"
    >
      <!-- <img src="@/assets/image/playFootball/ball.png" class="footballImg" :class="item.ani2" /> -->
      <ballKtl :ani="item.ani2" />
    </div>
    <!-- 加分数 -->
    <div
      v-for="item in scoreAddArr"
      :key="'scoreAdd' + item.id"
      class="scoreAdd"
      :class="[item.type === 1 ? 'common' : 'spec', item.ani ? 'show' : '', item.ani]"
    />
    <broad
      v-if="mpType && scoreAdd"
      :broadContent="broadContent"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { timeoutTask, generateRandom } from '@/utils/index';
import submitScore from '@/api/playFootball/index';
import createjs from 'createjs-cmd';
import broad from '@/components/broad/index.vue';
import ballKtl from './components/ballKtl.vue';

let canVibrate = false; // 是否支持手机震动
const JQS = ['jq1', 'jq2', 'jq3', 'jq4', 'jq5', 'jq6', 'jq7', 'jq8'];

export default {
  name: 'PlayFootballMain',
  components: {
    ballKtl,
    broad,
  },
  data() {
    return {
      bIndex: 0,
      ballArr: [],
      lastTime: 0,
      currTime: 0,
      isLianji: false,
      lianjiNum: 0,
      isBaoji: false,
      scoreAddArr: [],
      sIndex: 0,
      currentScore: 0,
      scoreAdd: 0,
    };
  },
  computed: {
    ...mapState({
      mpType: (state) => state.app.mpType,
    }),
    lianjiInfo: function linajiInfo() {
      return {
        isLianji: this.isLianji,
        lianjiNum: this.lianjiNum,
      };
    },
    broadContent() {
      return `您已通过加分宝增加${this.scoreAdd}初始积分哦～`;
    },
  },
  watch: {
    lianjiInfo(newVal) {
      if (newVal.isLianji && newVal.lianjiNum >= 10) {
        if (!this.isBaoji) {
          console.log('暴击状态开始!');
        }
        this.isBaoji = true;
      } else {
        if (this.isBaoji) {
          console.log('暴击状态结束!');
        }
        this.isBaoji = false;
      }
    },
  },
  created() {
    this.initArr();
    if (navigator) {
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
      if (navigator.vibrate) {
        canVibrate = true;
      }
    }
    this.initScore();
  },
  mounted() {
    this.intervalSubmitScore();
  },
  beforeDestroy() {
    clearInterval(this.sendScoreInterval);
  },
  methods: {
    initArr() {
      for (let i = 0; i < 10; i += 1) {
        this.ballArr.push({
          id: i + 1,
          ani: '',
          ani2: '',
        });
        this.scoreAddArr.push({
          id: i + 1,
          ani: '',
          type: 1,
        });
      }
    },
    playAudio() {
      createjs.Sound.play('footballHit');
    },
    playFootball() {
      this.currTime = new Date().getTime();
      if (this.lastTime === 0) {
        console.log('首次点击');
        this.isLianji = false;
        this.lianjiNum = 0;
        this.isBaoji = false;
      } else {
        const gap = (this.currTime - this.lastTime) / 1000;
        if (gap < 0.3) {
          this.isLianji = true;
          this.lianjiNum += 1;
        } else {
          this.isBaoji = false;
          this.isLianji = false;
          this.lianjiNum = 0;
        }
      }
      this.lastTime = this.currTime;
      if (this.isBaoji) {
        this.currentScore += 5;
        if (canVibrate) {
          navigator.vibrate(100);
        }
      } else {
        this.currentScore += 1;
      }
      this.playAudio();
      this.ballFlyAni(this.bIndex);
      this.scoreAddAni(this.sIndex);
    },
    ballFlyAni(index) {
      if (!this.ballArr[index].ani) {
        this.ballArr[index].ani = JQS[generateRandom(0, 8)];
        this.ballArr[index].ani2 = 'rotateAni';
        timeoutTask(() => {
          // 球门晃动
          this.$emit('menMove');
        }, 700);
        timeoutTask(() => {
          this.ballArr[index].ani = '';
          this.ballArr[index].ani2 = '';
        }, 1000);
      } else {
        this.bIndex += 1;
        if (this.bIndex >= this.ballArr.length) {
          this.bIndex = 0;
        }
        this.ballFlyAni(this.bIndex);
      }
    },
    scoreAddAni(index) {
      if (!this.scoreAddArr[index].ani) {
        if (this.isBaoji) {
          this.scoreAddArr[index].type = 2;
        } else {
          this.scoreAddArr[index].type = 1;
        }
        this.scoreAddArr[index].ani = 'scoreAddAni';
        timeoutTask(() => {
          this.scoreAddArr[index].ani = '';
        }, 1000);
      } else {
        this.sIndex += 1;
        if (this.sIndex >= this.scoreAddArr.length) {
          this.sIndex = 0;
        }
        this.scoreAddAni(this.sIndex);
      }
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
.gamewrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  flex-direction: column;
  .scoreBox {
    height: 60px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 0 20px;
    position: absolute;
    top: 76px;
    right: 43px;
    font-size: 32px;
    font-weight: 500;
    color: #ffffff;
    .ballIcon {
      width: 35px;
      height: 35px;
      margin-left: 20px;
    }
  }

  .circle {
    width: 192px;
    height: 114px;
    position: absolute;
    bottom: 15.5vh;
  }
  // .footballBox {
  //   width: 118px;
  //   height: 118px;
  //   position: absolute;
  //   bottom: 18vh;
  //   left: 316px;
  //   z-index: 1;
  //   .footballImg {
  //     width: 118px;
  //     height: 118px;
  //   }
  // }
  .footballBox {
    width: 118px;
    height: 118px;
    position: absolute;
    bottom: 18vh;
    left: 316px;
    z-index: 1;
  }
  .scoreAdd {
    position: absolute;
    bottom: 50vh;
    right: 254px;
    color: #ffffff;
    width: 356px;
    height: 214px;
    opacity: 0;
    &.common {
      &::after {
        content: '+1';
        display: block;
        font-size: 80px;
        position: absolute;
        right: 50px;
        top: 70px;
      }
    }
    &.spec {
      background-image: url('../../assets/image/playFootball/scoreBg.png');
      background-size: 100% 100%;
      &::after {
        content: '+5';
        display: block;
        font-size: 40px;
        position: absolute;
        right: 50px;
        top: 70px;
      }
    }
    &.show {
      opacity: 1;
    }
  }
  .jq1 {
    animation-name: jq1;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  .jq2 {
    animation-name: jq2;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  .jq3 {
    animation-name: jq3;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  .jq4 {
    animation-name: jq4;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  .jq5 {
    animation-name: jq5;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  .jq6 {
    animation-name: jq6;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  .jq7 {
    animation-name: jq7;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  .jq8 {
    animation-name: jq8;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  .rotateAni {
    animation-name: rotate;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  .scoreAddAni {
    animation-name: scoreAddUp;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes scoreAddUp {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-40vh);
      opacity: 0;
    }
  }
  @keyframes jq1 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    // 最高点
    20% {
      transform: translate(0, -50vh) scale(1);
    }
    // 撞球网
    60% {
      transform: translate(0, -25vh) scale(0.4);
    }
    // 撞球网维持
    70% {
      transform: translate(0, -25vh) scale(0.4);
    }
    // 落地
    80% {
      transform: translate(0, -17vh) scale(0.4);
    }
    // 弹起
    85% {
      transform: translate(0, -20vh) scale(0.4);
    }
    // 落地
    90% {
      transform: translate(0, -17vh) scale(0.4);
    }
    // 落地维持
    100% {
      transform: translate(0, -17vh) scale(0.4);
    }
  }
  @keyframes jq2 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    // 最高点
    20% {
      transform: translate(-30vw, -50vh) scale(1);
    }
    // 撞球网
    60% {
      transform: translate(-10vw, -25vh) scale(0.4);
    }
    // 撞球网维持
    70% {
      transform: translate(-10vw, -25vh) scale(0.4);
    }
    // 落地
    80% {
      transform: translate(-5vw, -17vh) scale(0.4);
    }
    // 弹起
    85% {
      transform: translate(-5vw, -20vh) scale(0.4);
    }
    // 落地
    90% {
      transform: translate(-5vw, -17vh) scale(0.4);
    }
    // 落地维持
    100% {
      transform: translate(-5vw, -17vh) scale(0.4);
    }
  }
  @keyframes jq3 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    // 最高点
    20% {
      transform: translate(30vw, -50vh) scale(1);
    }
    // 撞球网
    60% {
      transform: translate(10vw, -25vh) scale(0.4);
    }
    // 撞球网维持
    70% {
      transform: translate(10vw, -25vh) scale(0.4);
    }
    // 落地
    80% {
      transform: translate(5vw, -17vh) scale(0.4);
    }
    // 弹起
    85% {
      transform: translate(5vw, -20vh) scale(0.4);
    }
    // 落地
    90% {
      transform: translate(5vw, -17vh) scale(0.4);
    }
    // 落地维持
    100% {
      transform: translate(5vw, -17vh) scale(0.4);
    }
  }
  @keyframes jq4 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    // 最高点
    20% {
      transform: translate(-49vw, -20vh) scale(1);
    }
    // 撞球网
    60% {
      transform: translate(8vw, -22vh) scale(0.4);
    }
    // 撞球网维持
    70% {
      transform: translate(8vw, -22vh) scale(0.4);
    }
    // 落地
    80% {
      transform: translate(19vw, -17vh) scale(0.4);
    }
    // 弹起
    85% {
      transform: translate(19vw, -20vh) scale(0.4);
    }
    // 落地
    90% {
      transform: translate(19vw, -17vh) scale(0.4);
    }
    // 落地维持
    100% {
      transform: translate(19vw, -17vh) scale(0.4);
    }
  }
  @keyframes jq5 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    // 最高点
    20% {
      transform: translate(49vw, -20vh) scale(1);
    }
    // 撞球网
    60% {
      transform: translate(-8vw, -22vh) scale(0.4);
    }
    // 撞球网维持
    70% {
      transform: translate(-8vw, -22vh) scale(0.4);
    }
    // 落地
    80% {
      transform: translate(-19vw, -17vh) scale(0.4);
    }
    // 弹起
    85% {
      transform: translate(-19vw, -20vh) scale(0.4);
    }
    // 落地
    90% {
      transform: translate(-19vw, -17vh) scale(0.4);
    }
    // 落地维持
    100% {
      transform: translate(-19vw, -17vh) scale(0.4);
    }
  }
  @keyframes jq6 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    // 最高点
    20% {
      transform: translate(0, -19vh) scale(1);
    }
    // 撞球网
    60% {
      transform: translate(0, -22vh) scale(0.4);
    }
    // 撞球网维持
    70% {
      transform: translate(0, -22vh) scale(0.4);
    }
    // 落地
    80% {
      transform: translate(0, -17vh) scale(0.4);
    }
    // 弹起
    85% {
      transform: translate(0, -20vh) scale(0.4);
    }
    // 落地
    90% {
      transform: translate(0, -17vh) scale(0.4);
    }
    // 落地维持
    100% {
      transform: translate(0, -17vh) scale(0.4);
    }
  }
  @keyframes jq7 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    // 最高点
    20% {
      transform: translate(49vw, -46vh) scale(1);
    }
    // 撞球网
    60% {
      transform: translate(11vw, -24vh) scale(0.4);
    }
    // 撞球网维持
    70% {
      transform: translate(11vw, -24vh) scale(0.4);
    }
    // 落地
    80% {
      transform: translate(9vw, -17vh) scale(0.4);
    }
    // 弹起
    85% {
      transform: translate(9vw, -20vh) scale(0.4);
    }
    // 落地
    90% {
      transform: translate(9vw, -17vh) scale(0.4);
    }
    // 落地维持
    100% {
      transform: translate(9vw, -17vh) scale(0.4);
    }
  }
  @keyframes jq8 {
    0% {
      transform: translate(0, 0) scale(1);
    }
    // 最高点
    20% {
      transform: translate(-49vw, -46vh) scale(1);
    }
    // 撞球网
    60% {
      transform: translate(-11vw, -24vh) scale(0.4);
    }
    // 撞球网维持
    70% {
      transform: translate(-11vw, -24vh) scale(0.4);
    }
    // 落地
    80% {
      transform: translate(-9vw, -17vh) scale(0.4);
    }
    // 弹起
    85% {
      transform: translate(-9vw, -20vh) scale(0.4);
    }
    // 落地
    90% {
      transform: translate(-9vw, -17vh) scale(0.4);
    }
    // 落地维持
    100% {
      transform: translate(-9vw, -17vh) scale(0.4);
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
}
</style>
