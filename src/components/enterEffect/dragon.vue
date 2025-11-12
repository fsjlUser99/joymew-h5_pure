<template>
  <!-- 龙进场动画 -->
  <transition
    enter-active-class="slideInRight faster animated"
    leave-active-class="slideOutLeft faster animated"
  >
    <div
      v-show="showAniStart"
      class="dragonWrap"
    >
      <div
        ref="dragonEffect"
        class="dragonEffect"
      />
      <div
        ref="dragonTextEffect"
        class="dragonTextEffect"
      />
    </div>
  </transition>
</template>
<script>
import SVGA from 'svgaplayerweb';
import { enterEffect } from '@/assets/constant/effect';
import { timeoutTask, loadImg, getRoundImg } from '@/utils/index';

export default {
  name: 'DragonEffect',
  data() {
    return {
      name: '',
      headImg: '',
      time: 5,
      showAniStart: false,
      Observer: null,
    };
  },
  computed: {
    nameDisplay() {
      return this.name.length > 3 ? `${this.name.slice(0, 3)}...` : this.name;
    },
  },
  watch: {},
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
  },
  mounted() {
    this.$nextTick(() => {
      this.SVGAPlayer = new SVGA.Player(this.$refs.dragonEffect);
      this.$svgaParser.load(
        enterEffect.enterDragon,
        (videoItem) => {
          this.SVGAPlayer.setVideoItem(videoItem);
          this.SVGAPlayer.startAnimation();
          timeoutTask(() => {
            this.showAniStart = true;
          }, 500);
          timeoutTask(() => {
            this.showAniStart = false;
            timeoutTask(() => {
              this.$destroy(true);
              this.$el.parentNode.removeChild(this.$el);
              this.Observer.ended = true;
            }, 500);
          }, parseFloat(this.time - 0.5, 10) * 1000);
        },
        (err) => {
          return Promise.reject(err);
        },
      );

      this.SVGAPlayer2 = new SVGA.Player(this.$refs.dragonTextEffect);
      this.$svgaParser.load(
        enterEffect.enterDragonText,
        (videoItem) => {
          this.SVGAPlayer2.setVideoItem(videoItem);
          this.updateTextEffect();
        },
        (err) => {
          return Promise.reject(err);
        },
      );
    });
  },
  methods: {
    updateTextEffect() {
      if (!this.SVGAPlayer2) {
        return;
      }
      loadImg(this.headImg).then((res) => {
        this.SVGAPlayer2.setImage(getRoundImg(res), '0');
        this.SVGAPlayer2.setText(
          {
            text: `欢迎 ${this.nameDisplay} 进入互动`,
            family: 'Arial',
            size: '24px',
            color: '#ffffff',
            offset: { x: 0.0, y: 0.0 },
          },
          'qyimg_enter',
        );
        this.SVGAPlayer2.startAnimation();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.dragonWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: -150px;
  .dragonEffect {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .dragonTextEffect {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
