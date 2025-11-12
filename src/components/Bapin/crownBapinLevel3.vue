<template>
  <!-- 皇冠霸屏3 -->
  <transition
    enter-active-class="slideInDown faster animated"
    leave-active-class="slideOutUp faster animated"
  >
    <div
      v-show="showAniStart"
      ref="crownBapinLevel3"
      class="crownBapinLevel3"
    >
      <div class="name">
        {{ name }}
      </div>
      <div class="ct">
        {{ content }}
      </div>
      <img
        :src="headImg"
        class="headImg"
      />
    </div>
  </transition>
</template>
<script>
import store from '@/store/index';
import SVGA from 'svgaplayerweb';
import { Bapin } from '@/assets/constant/effect';
import { timeoutTask } from '@/utils/index';

export default {
  name: 'CrownBapinLevel3',
  data() {
    return {
      name: '',
      headImg: '',
      content: '',
      time: 0,
      showAniStart: false,
      hasDestroy: false,
    };
  },
  computed: {
    isCloseCurrentBapin: () => {
      return store.state.app.isCloseCurrentBapin;
    },
  },
  watch: {
    isCloseCurrentBapin: function isCloseCurrentBapin(newVal) {
      if (newVal) {
        this.destroyCurrentBapin();
      }
    },
  },
  beforeDestroy() {
    if (this.SVGAPlayer) {
      this.SVGAPlayer.stopAnimation();
      this.SVGAPlayer.clear();
      this.SVGAPlayer = null;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.SVGAPlayer = new SVGA.Player(this.$refs.crownBapinLevel3);
      this.$svgaParser.load(
        Bapin.crownBapinLevel3,
        (videoItem) => {
          this.SVGAPlayer.setVideoItem(videoItem);
          this.SVGAPlayer.startAnimation();
          timeoutTask(() => {
            this.showAniStart = true;
            store.commit('app/setBapinCloseIconVisible', true);
          }, 1000);
          timeoutTask(() => {
            if (!this.hasDestroy) {
              this.showAniStart = false;
              store.commit('app/setBapinCloseIconVisible', false);
            }
            timeoutTask(() => {
              if (!this.hasDestroy) {
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
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
    destroyCurrentBapin() {
      this.showAniStart = false;
      this.hasDestroy = true;
      store.commit('app/setBapinCloseIconVisible', false);
      timeoutTask(() => {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
        store.commit('app/setIsCloseCurrentBapin', false);
        this.$closeCurrentCrownBapin();
      }, 500);
    },
  },
};
</script>
<style lang="less" scoped>
.crownBapinLevel3 {
  width: 750px;
  height: 1334px;
  position: absolute;
  top: -11vw;
  .headImg {
    width: 11vw;
    height: 11vw;
    border-radius: 0px 30px 0px 30px;
    position: absolute;
    top: 28.3vw;
    left: 4.2vw;
    transform: rotate(45deg);
    z-index: 1;
  }
  .name {
    font-size: 3.2vw;
    color: red;
    position: absolute;
    left: 16vw;
    top: 14.1vw;
    text-shadow: rgba(0, 0, 0, 0.6) 1px 0 0, rgba(0, 0, 0, 0.6) 0 1px 0, rgba(0, 0, 0, 0.6) -1px 0 0, rgba(0, 0, 0, 0.6) 0 -1px 0;
    width: 23vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    z-index: 1;
    top: 26vw;
    left: 13vw;
  }
  .ct {
    font-size: 6.2vw;
    font-weight: bold;
    color: #ffe278;
    text-shadow: 4px 1px 2px #023d81;
    text-stroke: 1px #00234c;
    position: absolute;
    left: 18vw;
    top: 29.1vw;
    letter-spacing: 5px;
    width: 65vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    z-index: 1;
  }
}
</style>
