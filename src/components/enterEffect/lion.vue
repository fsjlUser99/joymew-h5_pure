<template>
  <!-- 狮子进场动画 -->
  <transition
    enter-active-class="slideInRight faster animated"
    leave-active-class="slideOutLeft faster animated"
  >
    <div
      v-show="showAniStart"
      class="lionWrap"
    >
      <div
        ref="lionEffect"
        class="lionEffect"
      />
      <img
        v-show="textVisible"
        :src="headImg"
        class="headImg"
      />
      <div
        v-show="textVisible"
        class="name"
      >
        欢迎 {{ this.nameDisplay }} 进入互动
      </div>
    </div>
  </transition>
</template>
<script>
import SVGA from 'svgaplayerweb';
import { enterEffect } from '@/assets/constant/effect';
import { timeoutTask } from '@/utils/index';

export default {
  name: 'LionEffect',
  data() {
    return {
      name: '',
      headImg: '',
      time: 5,
      showAniStart: false,
      textVisible: false,
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
  },
  mounted() {
    this.$nextTick(() => {
      this.SVGAPlayer = new SVGA.Player(this.$refs.lionEffect);
      console.log(this.time);
      this.$svgaParser.load(
        enterEffect.enterLion,
        (videoItem) => {
          this.SVGAPlayer.setVideoItem(videoItem);
          this.SVGAPlayer.startAnimation();
          timeoutTask(() => {
            this.showAniStart = true;
          }, 500);
          timeoutTask(() => {
            this.textVisible = true;
          }, 2000);
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
    });
  },
  methods: {
  },
};
</script>
<style lang="less" scoped>
.lionWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: -150px;
  .lionEffect {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .headImg {
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    position: absolute;
    top: 75vw;
    left: 7vw;
  }
  .name {
    font-size: 1.867vw;
    color: #ffffff;
    position: absolute;
    top: 77vw;
    left: 19vw;
  }
}
</style>
