<template>
  <!-- 爱心霸屏4 -->
  <transition
    enter-active-class="slideInDown faster animated"
    leave-active-class="slideOutUp faster animated"
  >
    <div
      v-show="showAniStart"
      ref="loveBapinLevel4"
      class="loveBapinLevel4"
    >
      <img
        :src="headImg"
        class="headImg"
      />
      <div class="name">
        {{ name }}
      </div>
      <div
        ref="ct"
        class="ct"
      >
        {{ content }}
      </div>
    </div>
  </transition>
</template>
<script>
import SVGA from 'svgaplayerweb';
import { BapinLove } from '@/assets/constant/effect';
import { timeoutTask } from '@/utils/index';
import store from '@/store/index';

export default {
  name: 'LoveBapinLevel4',
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
      this.SVGAPlayer = new SVGA.Player(this.$refs.loveBapinLevel4);
      this.$svgaParser.load(
        BapinLove.bapinLove4,
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
      console.log('销毁');
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
.loveBapinLevel4 {
  width: 750px;
  height: 234px;
  position: absolute;
  top: -10px;
  .headImg {
    position: absolute;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    top: 75px;
    left: 122px;
    z-index: 1;
  }
  .name {
    font-size: 21px;
    color: #fdf47b;
    position: absolute;
    left: 250px;
    top: 70px;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    z-index: 1;
  }
  .ct {
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    position: absolute;
    left: 268px;
    top: 105px;
    letter-spacing: 5px;
    width: 370px;
    height: 45px;
    z-index: 1;
    position: absolute;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
}
</style>
