<template>
  <!-- 年会霸屏1 -->
  <transition
    enter-active-class="slideInDown faster animated"
    leave-active-class="slideOutUp faster animated"
  >
    <div
      v-show="showAniStart"
      ref="enterpriseBapinLevel1"
      class="enterpriseBapinLevel1"
    >
      <div class="headImgBox publicHvCenter">
        <img :src="headImg" class="headImg" />
      </div>
      <div ref="ct" class="ct">
        {{ content }}
      </div>
    </div>
  </transition>
</template>
<script>
import SVGA from 'svgaplayerweb';
import { BapinEnterprise } from '@/assets/constant/effect';
import { timeoutTask } from '@/utils/index';
import store from '@/store/index';

export default {
  name: 'enterpriseBapinLevel1',
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
      this.SVGAPlayer = new SVGA.Player(this.$refs.enterpriseBapinLevel1);
      this.$svgaParser.load(
        BapinEnterprise.bapinEnterprise1,
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
.enterpriseBapinLevel1 {
  width: 601px;
  height: 195px;
  position: absolute;
  top: 0px;
  left: 75px;
  .headImgBox {
    position: absolute;
    width: 101px;
    height: 101px;
    border-radius: 50%;
    top: 2px;
    left: 209px;
    z-index: 1;
    background-color: #52d2ff;
    .headImg {
      width: 92%;
      height: 92%;
      border-radius: 50%;
    }
  }
  .ct {
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    position: absolute;
    left: 20px;
    top: 110px;
    letter-spacing: 5px;
    width: 540px;
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
