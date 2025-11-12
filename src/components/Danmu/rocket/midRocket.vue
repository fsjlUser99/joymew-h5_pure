<template>
  <div
    class="midRocket publicVCenter"
    :class="{ move: moveAniStart }"
    :style="{ top: top + 'vw' }"
  >
    <div class="content publicVCenter">
      <div class="name">
        {{ name }}
      </div>
      <div class="wish">
        {{ content }}
      </div>
    </div>
    <div
      ref="rocket"
      class="rocket"
    />
    <img
      :src="headImg"
      class="headImg"
    />
    <div
      ref="headBorder"
      class="headBorder"
    />
    <div
      ref="headStar"
      class="headStar"
    />
  </div>
</template>
<script>
import SVGA from 'svgaplayerweb';
import { RocketDanmu } from '@/assets/constant/effect';
import { timeoutTask } from '@/utils/index';

export default {
  name: 'MidRocket',
  data() {
    return {
      name: '',
      headImg: '',
      content: '',
      top: 0,
      moveAniStart: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.SVGAPlayer = new SVGA.Player(this.$refs.rocket);
      this.$svgaParser.load(
        RocketDanmu.mid,
        (videoItem) => {
          this.SVGAPlayer.setVideoItem(videoItem);
          this.SVGAPlayer.startAnimation();
          this.moveAniStart = true;
        },
        (err) => {
          return Promise.reject(err);
        },
      );
    });
    // 加载头像框动画
    this.SVGAPlayer2 = new SVGA.Player(this.$refs.headBorder);
    this.$svgaParser.load(
      RocketDanmu.headBox,
      (videoItem) => {
        this.SVGAPlayer2.setVideoItem(videoItem);
        this.SVGAPlayer2.startAnimation();
      },
      (err) => {
        return Promise.reject(err);
      },
    );

    // 加载头像星星动画
    this.SVGAPlaye3 = new SVGA.Player(this.$refs.headStar);
    this.$svgaParser.load(
      RocketDanmu.rocketStar,
      (videoItem) => {
        this.SVGAPlaye3.setVideoItem(videoItem);
        this.SVGAPlaye3.startAnimation();
      },
      (err) => {
        return Promise.reject(err);
      },
    );
    timeoutTask(() => {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }, 10000);
  },
  beforeDestroy() {
    if (this.SVGAPlayer) {
      this.SVGAPlayer.stopAnimation();
      this.SVGAPlayer.clear();
      this.SVGAPlayer = null;
    }
    if (this.SVGAPlayer2) {
      this.SVGAPlayer2.stopAnimation();
      this.SVGAPlayer2.clear();
      this.SVGAPlayer2 = null;
    }
    if (this.SVGAPlayer3) {
      this.SVGAPlayer3.stopAnimation();
      this.SVGAPlayer3.clear();
      this.SVGAPlayer3 = null;
    }
  },
};
</script>
<style lang="less" scoped>
.midRocket {
  width: 500px;
  height: 500px;
  position: absolute;
  left: 750px;
  .rocket {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .headImg {
    position: absolute;
    width: 61px;
    height: 61px;
    border-radius: 50%;
    top: 221px;
    left: 115px;
    z-index: 1;
  }
  .headBorder {
    position: absolute;
    width: 300px;
    height: 300px;
    left: -10px;
    top: 93px;
    z-index: 1;
  }
  .headStar {
    position: absolute;
    width: 300px;
    height: 300px;
    z-index: 1;
    left: 23px;
  }
  .content {
    position: absolute;
    height: 232px;
    left: 136px;
    background-image: url('../../../assets/image/danmu/rainbow2.png');
    background-size: 100% 100%;
    padding-left: 265px;
    padding-right: 170px;
    .name {
      font-size: 35px;
      font-weight: 400;
      color: #ffecea;
      white-space: nowrap;
    }
    .wish {
      font-size: 44px;
      font-weight: 400;
      color: #ffecea;
      white-space: nowrap;
      margin-left: 24px;
      // -webkit-text-stroke: 1px #ffa349;
      // text-stroke: 1px #ffa349;
    }
  }
  &.move {
    animation-name: moveAni;
    animation-duration: 10s;
    animation-timing-function: linear;
  }
  @keyframes moveAni {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-2000px);
    }
  }
}
</style>
