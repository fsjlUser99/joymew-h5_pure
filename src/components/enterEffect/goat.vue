<template>
  <!-- 山羊进场动画 -->
  <transition
    enter-active-class="slideInRight faster animated"
    leave-active-class="slideOutLeft faster animated"
  >
    <div
      v-show="showAniStart"
      class="goatWrap"
    >
      <div
        ref="goatEffect"
        class="goatEffect"
      />
      <div
        ref="goatTextEffect"
        class="goatTextEffect"
      />
    </div>
  </transition>
</template>
<script>
import SVGA from 'svgaplayerweb';
import { enterEffect } from '@/assets/constant/effect';
import { timeoutTask, loadImg, getRoundImg } from '@/utils/index';

export default {
  name: 'GoatEffect',
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
      this.SVGAPlayer = new SVGA.Player(this.$refs.goatEffect);
      console.log(this.time);
      this.$svgaParser.load(
        enterEffect.enterGoat,
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
              if (this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
                this.Observer.ended = true;
              }
            }, 500);
          }, parseFloat(this.time - 0.5, 10) * 1000);
        },
        (err) => {
          return Promise.reject(err);
        },
      );

      this.SVGAPlayer2 = new SVGA.Player(this.$refs.goatTextEffect);
      this.$svgaParser.load(
        enterEffect.enterGoatText,
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
            color: '#ffe0a4',
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
.goatWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: -150px;
  .goatEffect {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .goatTextEffect {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
