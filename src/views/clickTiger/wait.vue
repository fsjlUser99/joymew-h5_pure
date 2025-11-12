<template>
  <!-- 武松打虎等待 -->
  <div class="wait">
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
          <div class="tigerBox">
            <img
              src="@/assets/image/clickTiger/tiger.png"
              class="tiger"
              :class="{ active: item === 4 }"
            />
          </div>
          <img
            src="@/assets/image/clickTiger/holeFront.png"
            class="holeFront"
          />
          <img
            v-show="item === 4"
            src="@/assets/image/clickTiger/wusong.png"
            class="wusong"
          />
        </div>
      </div>
    </div>
    <div class="useTip">
      <img
        src="@/assets/image/clickTiger/lightCircle.png"
        class="lightCircle"
      />
      <img
        src="@/assets/image/clickTiger/tipHand.png"
        class="tipHand"
      />
    </div>
    <div class="waitTip">等待主持人开始武松打虎</div>
    <addScoreTool v-if="mpType" />
  </div>
</template>
<script>
import addScoreTool from '@/components/addScoreTool/index.vue';

export default {
  name: 'ClickTigerWait',
  components: {
    addScoreTool,
  },
  computed: {
    mpType() {
      return this.$store.state.app.mpType;
    },
  },
  watch: {},
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.wait {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .clickTiger-wrap {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
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
      left: 255px;
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
            &.active {
              transform: translateY(-304px);
            }
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
  }
  .useTip {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .lightCircle {
      width: 364px;
      height: 364px;
      position: absolute;
      bottom: 590px;
      left: 193px;
      animation-name: circleTipAni;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    .tipHand {
      position: absolute;
      width: 412px;
      height: 484px;
      bottom: 303px;
      right: -50px;
      transform-origin: bottom;
      animation-name: clickTipAni;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
  .waitTip {
    font-size: 45px;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    top: 273px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  @keyframes clickTipAni {
    0% {
      transform: perspective(3000px) rotateY(35deg);
    }
    50% {
      transform: perspective(3000px) rotateY(0deg);
    }
    100% {
      transform: perspective(3000px) rotateY(35deg);
    }
  }
  @keyframes circleTipAni {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
