<template>
  <!-- 摇一摇等待 -->
  <div class="wait publicVCenter">
    <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/v2/gameTitle.png"
      alt="摇一摇标题"
      class="gameTitle"
    />
    <div class="shakeTipBox publicHvCenter">
      <div class="innerBox">
        <img
          src="https://static.hudongmiao.com/joymewH5/img/shake/v2/shakeHand.png"
          alt="摇一摇手"
          class="shakeHand"
        />
      </div>
    </div>
    <div
      class="bottomWrap publicVCenter"
      v-if="env === 'miniProgram'"
    />
    <addScoreTool v-if="mpType" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import addScoreTool from '@/components/addScoreTool/index.vue';

export default {
  name: 'ShakeWait',
  components: {
    addScoreTool,
  },
  computed: {
    ...mapState({
      env: (state) => state.app.env,
      mpType: (state) => state.app.mpType,
    }),
  },
  mounted() {},
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.wait {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(https://static.hudongmiao.com/joymewH5/img/shake/v2/bg.png);
  background-size: 100% 100%;
  flex-direction: column;
  .gameTitle {
    width: 617.31px;
    height: 109.62px;
    margin-top: 120px;
  }
  .shakeTipBox {
    margin-top: 29.12px;
    width: 542.31px;
    height: 542.31px;
    background-position: 50% 50%;
    background-size: 100% 100%;
    background-image: url('https://static.hudongmiao.com/joymewH5/img/shake/v2/yellowRound.png');
    padding: 10px;
    .innerBox {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      .shakeHand {
        width: 542.31px;
        height: 542.31px;
      }
    }
  }
  .bottomWrap {
    width: 750px;
    height: 590.38px;
    position: absolute;
    bottom: 0;
    background-size: 100% 100%;
    background-image: url('https://static.hudongmiao.com/joymewH5/img/shake/v2/lid.png');
    flex-direction: column;
    padding-top: 171.15px;
    .sendGiftTipBox {
      width: 465.38px;
      height: 61.54px;
      background: #fef8e6;
      border-radius: 84.62px;
      font-size: 26.92px;
      font-weight: 400;
      text-align: center;
      line-height: 61.54px;
      color: #de7f44;
    }
    .giftChoose {
      list-style: none;
      column-gap: 46.15px;
      margin-top: 38.46px;
      .giftItem {
        width: 184.62px;
        height: 232.69px;
        position: relative;
        .giftInfo {
          height: 178.85px;
          flex-direction: column;
          background-color: #fff;
          padding-top: 19.23px;
          border-radius: 17.31px 17.31px 0 0;
          .giftImg {
            width: 92.31px;
            height: 92.31px;
          }

          .giftname {
            font-size: 23.08px;
            font-weight: 400;
            color: #de5d15;
            margin-top: 7.19px;
            line-height: 32px;
          }

          .price {
            font-size: 17.31px;
            font-weight: 400;
            color: #fd3576;
            line-height: 17.31px;
            margin-top: 2px;
            .unitIcon {
              vertical-align: -3px;
              width: 21px;
            }
          }
        }
        .sendBtn {
          width: 100%;
          height: 55.77px;
          background: linear-gradient(90deg, #fc4d88, #fd024f 100%);
          text-align: center;
          line-height: 55.77px;
          font-size: 26.92px;
          font-weight: 400;
          color: #ffffff;
          // position: absolute;
          // bottom: 0;
          // left: 0;
          border-radius: 0 0 17.31px 17.31px;
        }
      }
    }
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
