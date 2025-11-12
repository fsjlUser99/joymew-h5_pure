<template>
  <transition
    enter-active-class="slideInRight faster animated"
    leave-active-class="slideOutLeft faster animated"
  >
    <div
      v-show="showAniStart"
      ref="giftDanmu"
      class="giftDanmu"
    >
      <div class="headImgBox">
        <img
          :src="headImg"
          class="headImg"
        />
        <img
          src="@/assets/image/danmu/circle.png"
          class="circleImg"
        />
      </div>
      <div class="name">
        {{ nickname }}
      </div>
      <div class="gift">
        <label>送来了</label>{{ giftName }}
      </div>
      <img
        :src="giftImg"
        class="giftImg"
        :class="{ scale: scaleAniStart }"
      />
    </div>
  </transition>
</template>
<script>
import SVGA from 'svgaplayerweb';
import { bsDanmu } from '@/assets/constant/effect';
import { timeoutTask } from '@/utils/index';

export default {
  name: 'GiftDanmu',
  data() {
    return {
      headImg: '',
      nickname: '',
      giftName: '',
      giftImg: '',
      shijian: 0,
      showAniStart: false,
      scaleAniStart: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.SVGAPlayer = new SVGA.Player(this.$refs.giftDanmu);
      this.$svgaParser.load(
        bsDanmu,
        (videoItem) => {
          this.SVGAPlayer.setVideoItem(videoItem);
          this.SVGAPlayer.startAnimation();
          this.showAniStart = true;
          timeoutTask(() => {
            this.scaleAniStart = true;
          }, 500);
        },
        (err) => {
          return Promise.reject(err);
        },
      );
    });
    timeoutTask(() => {
      this.showAniStart = false;
    }, this.shijian * 1000 - 500);
    timeoutTask(() => {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }, this.shijian * 1000);
  },
  beforeDestroy() {
    if (this.SVGAPlayer) {
      this.SVGAPlayer.stopAnimation();
      this.SVGAPlayer.clear();
      this.SVGAPlayer = null;
    }
  },
};
</script>
<style lang="less" scoped>
.giftDanmu {
  width: 750px;
  height: 1334px;
  position: absolute;
  left: 0;
  .headImgBox {
    width: 14vw;
    height: 14vw;
    position: absolute;
    top: 11vw;
    left: 3vw;
    z-index: 1;
    .headImg {
      width: 12vw;
      height: 12vw;
      border-radius: 50%;
      position: absolute;
      top: 0.667vw;
      left: 1.267vw;
    }
    .circleImg {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  .name {
    font-size: 3.8vw;
    color: #ffffff;
    position: absolute;
    z-index: 1;
    left: 19vw;
    top: 12vw;
    width: 33vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    font-weight: bold;
  }
  .gift {
    font-size: 4.2vw;
    font-weight: 600;
    color: #ffffff;
    width: 82vw;
    text-align: left;
    position: absolute;
    top: 19vw;
    left: 19vw;
    z-index: 1;
    label {
      font-size: 3.8vw;
      margin-right: 16px;
      color: #fcb3b3;
      font-weight: 500;
    }
  }
  .giftImg {
    position: absolute;
    right: 33vw;
    top: 11vw;
    height: 13vw;
    z-index: 1;
    &.scale {
      animation-name: scaleAni;
      animation-duration: 0.5s;
      animation-timing-function: ease-out;
      animation-iteration-count: infinite;
    }
  }
  @keyframes scaleAni {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }
}
</style>
