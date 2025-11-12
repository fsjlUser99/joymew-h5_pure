<template>
  <transition
    enter-active-class="animated faster zoomIn"
    leave-active-class="animated faster zoomOut"
  >
    <div
      v-if="loadingVisible || loadAdVisible"
      class="loading-wrap publicZIndexLoading publicHvCenter"
      :class="{ loadAd: loadAdVisible }"
    >
      <div
        v-if="!loadAdVisible && !isYj"
        class="mode publicHvCenter"
      >
        <img
          src="https://static.hudongmiao.com/joymewH5/img/loading/bg.png"
          class="bgImg"
        />
        <div class="loadingContent">
          <div
            class="loadingProgress"
            :style="{ width: currentLoadingProgress }"
          >
            <img
              src="https://static.hudongmiao.com/joymewH5/img/loading/progressBarWhite.png"
              class="progressBarWhiteImg"
            />
            <img
              src="https://static.hudongmiao.com/joymewH5/img/loading/leaf.png"
              class="leafImg floatAni1"
            />
            <img
              src="https://static.hudongmiao.com/joymewH5/img/loading/leaf.png"
              class="leafImg floatAni2"
            />
            <img
              src="https://static.hudongmiao.com/joymewH5/img/loading/leaf.png"
              class="leafImg floatAni3"
            />
            <img
              src="https://static.hudongmiao.com/joymewH5/img/loading/leaf.png"
              class="leafImg floatAni4"
            />
          </div>
          <img
            src="https://static.hudongmiao.com/joymewH5/img/loading/fan.png"
            class="fanImg"
          />
        </div>
        <div class="loadingTip">
          loading
          <div class="dot">
            ...
          </div>
        </div>
      </div>
      <div
        v-if="!loadAdVisible && isYj"
        class="modeHlt publicHvCenter"
      >
        <img
          src="@/assets/image/dz/hlt/loadBg.png"
          class="bgImg"
        />
        <div class="loadingContent">
          <div
            class="loadingProgress"
            :style="{ width: currentLoadingProgress }"
          >
            <img
              src="https://static.hudongmiao.com/joymewH5/img/loading/progressBarWhite.png"
              class="progressBarWhiteImg"
            />
            <img
              src="https://static.hudongmiao.com/joymewH5/img/loading/leaf.png"
              class="leafImg floatAni1"
            />
            <img
              src="https://static.hudongmiao.com/joymewH5/img/loading/leaf.png"
              class="leafImg floatAni2"
            />
            <img
              src="https://static.hudongmiao.com/joymewH5/img/loading/leaf.png"
              class="leafImg floatAni3"
            />
            <img
              src="https://static.hudongmiao.com/joymewH5/img/loading/leaf.png"
              class="leafImg floatAni4"
            />
          </div>
          <img
            src="@/assets/image/dz/hlt/ball.png"
            class="fanImg"
          />
        </div>
        <div class="loadingTip">
          loading
          <div class="dot">
            ...
          </div>
        </div>
      </div>
      <!-- 默认广告 -->
      <!-- <div class="weddingMode" v-if="loadAdVisible && !phone_advert_json" ref="weddingMod">
        <div class="loadTip">页面加载中,请稍后...</div>
      </div> -->
      <!-- 自定义广告 -->
      <div
        v-if="loadAdVisible && phone_advert_json"
        class="customAdImg"
        :style="{ backgroundImage: 'url(' + phone_advert_json + ')' }"
      />
    </div>
  </transition>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import { weddingLoadBg } from '@/assets/constant/effect';
import { timeoutTask } from '@/utils/index';
import SVGA from 'svgaplayerweb';

let syncLock = false;
export default {
  name: 'Loading',
  computed: {
    ...mapState({
      loadingVisible: (state) => state.app.loadingVisible,
      currentLoadingProgress: (state) => state.app.currentLoadingProgress,
      sceneType: (state) => state.live.sceneType,
      loadAdVisible: (state) => state.app.loadAdVisible,
      phone_advert_json: (state) => state.user.emceeInfo.phone_advert_json,
    }),
    ...mapGetters({
      isYj: 'app/isYj',
    }),
  },
  watch: {
    sceneType: {
      handler(newVal) {
        if (newVal === '0' && this.loadingVisible === false) {
          this.playLoadAdLogic();
        }
      },
      immediate: true,
    },
    loadingVisible: {
      handler(newVal) {
        if (newVal === false && this.sceneType === '0') {
          this.playLoadAdLogic();
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    if (this.SVGAPlayer) {
      this.SVGAPlayer.stopAnimation();
      this.SVGAPlayer.clear();
      this.SVGAPlayer = null;
    }
  },
  created() {
    syncLock = false;
  },
  mounted() {},
  methods: {
    playLoadAdLogic() {
      if (syncLock) {
        return;
      }
      syncLock = true;
      this.$store.commit('app/updateLoadAd');
      if (this.loadAdVisible) {
        this.$nextTick(() => {
          if (this.phone_advert_json) {
            this.playCustomImageLoadBg();
          } else {
            // 默认svga效果取消
            // this.playSvgaLoadBg();
            this.$store.commit('app/setLoadAdVisible', false);
          }
        });
      }
    },
    playCustomImageLoadBg() {
      timeoutTask(() => {
        this.$store.commit('app/setLoadAdVisible', false);
      }, 2000);
    },
    playSvgaLoadBg() {
      this.SVGAPlayer = new SVGA.Player(this.$refs.weddingMod);
      this.$svgaParser.load(
        weddingLoadBg,
        (videoItem) => {
          this.SVGAPlayer.setVideoItem(videoItem);
          this.SVGAPlayer.startAnimation();
          timeoutTask(() => {
            this.$store.commit('app/setLoadAdVisible', false);
          }, 2000);
        },
        (err) => {
          return Promise.reject(err);
        },
      );
    },
  },
};
</script>

<style lang="less" scoped>
.loading-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .mode {
    width: 100%;
    height: 100%;
    position: absolute;
    background: linear-gradient(139deg, #fec84e 0%, #feaf40 100%);
    .bgImg {
      position: absolute;
      width: 100%;
    }
    .loadingContent {
      width: 524px;
      height: 114px;
      background-image: url(https://static.hudongmiao.com/joymewH5/img/loading/progressBarYellow.png);
      background-size: 100% 100%;
      position: absolute;
      top: 60%;
      border: 2px solid #ffffff;
      border-radius: 60px;
      display: flex;
      align-items: center;
      .loadingProgress {
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        transition: all 0.3s linear;
        .progressBarWhiteImg {
          width: 522px;
          height: 120px;
          position: absolute;
          right: 0px;
        }
        .leafImg {
          width: 51px;
          height: 41px;
          position: absolute;
          right: 60px;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      }
      .fanImg {
        width: 123px;
        height: 122px;
        position: absolute;
        right: -7.5px;
        animation-name: rotateAni;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    }
    .loadingTip {
      position: absolute;
      top: 70%;
      font-size: 34.5px;
      color: #ffffff;
      display: flex;
      align-items: center;
      .dot {
        width: 15px;
        overflow: hidden;
        animation: ellipsis 1s infinite;
        animation-timing-function: steps(1);
      }
    }
    .floatAni1 {
      animation-name: floatAni1;
      animation-duration: 3s;
    }
    .floatAni2 {
      animation-name: floatAni2;
      animation-duration: 1s;
    }
    .floatAni3 {
      animation-name: floatAni3;
      animation-duration: 2s;
      animation-delay: 1s;
    }
    .floatAni4 {
      animation-name: floatAni4;
      animation-duration: 3s;
      animation-delay: 2s;
    }
  }
  .modeHlt {
    width: 100%;
    height: 100%;
    position: absolute;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('https://ustatic.hudongmiao.com/joymewMpTql/signWedding/yunjinBg2.png');
    background-color: #0f1019;
    .bgImg {
      position: absolute;
      width: 100%;
    }
    .loadingContent {
      width: 524px;
      height: 114px;
      position: absolute;
      top: 40%;
      border: 2px solid #deac81;
      border-radius: 60px;
      display: flex;
      align-items: center;
      .loadingProgress {
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        transition: all 0.3s linear;
        .progressBarWhiteImg {
          width: 522px;
          height: 120px;
          position: absolute;
          right: 0px;
        }
        .leafImg {
          width: 51px;
          height: 41px;
          position: absolute;
          right: 60px;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      }
      .fanImg {
        width: 118px;
        height: 118px;
        position: absolute;
        right: -2px;
        animation-name: rotateAni;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    }
    .loadingTip {
      position: absolute;
      top: 48%;
      font-size: 34.5px;
      color: #deac81;
      display: flex;
      align-items: center;
      .dot {
        width: 15px;
        overflow: hidden;
        animation: ellipsis 1s infinite;
        animation-timing-function: steps(1);
      }
    }
    .floatAni1 {
      animation-name: floatAni1;
      animation-duration: 3s;
    }
    .floatAni2 {
      animation-name: floatAni2;
      animation-duration: 1s;
    }
    .floatAni3 {
      animation-name: floatAni3;
      animation-duration: 2s;
      animation-delay: 1s;
    }
    .floatAni4 {
      animation-name: floatAni4;
      animation-duration: 3s;
      animation-delay: 2s;
    }
  }
  .customAdImg {
    width: 750px;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #0f1019;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .weddingMode {
    width: 750px;
    height: 1334px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #93164d;
    .loadTip {
      color: #ffa3bb;
      font-size: 26px;
      position: absolute;
      bottom: 100px;
      width: 100%;
      text-align: center;
      z-index: 1;
    }
  }
  @media screen and (min-height: 800px) {
    .weddingMode {
      .loadTip {
        bottom: 20px;
      }
    }
  }
  @keyframes ellipsis {
    0% {
      width: 0px;
    }
    25% {
      width: 12px;
    }
    50% {
      width: 26px;
    }
    75% {
      width: 47px;
    }
  }
  @keyframes rotateAni {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes floatAni1 {
    0% {
      transform: translate3d(0, 0, 0) rotate(0deg);
    }
    50% {
      transform: translate3d(-240px, 0px, 0) rotate(360deg);
    }
    100% {
      transform: translate3d(-480px, 0px, 0) rotate(720deg);
    }
  }
  @keyframes floatAni2 {
    0% {
      transform: translate3d(0, 0, 0) rotate(0deg);
    }
    20% {
      transform: translate3d(-150px, -35px, 0) rotate(180deg);
    }
    40% {
      transform: translate3d(-240px, 0px, 0) rotate(360deg);
    }
    100% {
      transform: translate3d(-480px, 35px, 0) rotate(720deg);
    }
  }
  @keyframes floatAni3 {
    0% {
      transform: translate3d(0, 0, 0) rotate(0deg);
    }
    50% {
      transform: translate3d(-240px, 0px, 0) rotate(360deg);
    }
    100% {
      transform: translate3d(-480px, -35px, 0) rotate(720deg);
    }
  }
  @keyframes floatAni4 {
    0% {
      transform: translate3d(0, 0, 0) rotate(0deg);
    }
    50% {
      transform: translate3d(-240px, 0px, 0) rotate(360deg);
    }
    100% {
      transform: translate3d(-480px, 35px, 0) rotate(720deg);
    }
  }
}
</style>
