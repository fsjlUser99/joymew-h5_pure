<template>
  <!-- 年会霸屏2 -->
  <transition
    enter-active-class="slideInDown faster animated"
    leave-active-class="slideOutUp faster animated"
  >
    <div
      v-show="showAniStart"
      ref="enterpriseBapinLevel2"
      class="enterpriseBapinLevel2"
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
  name: 'LoveBapinLevel2',
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
      this.SVGAPlayer = new SVGA.Player(this.$refs.enterpriseBapinLevel2);
      this.$svgaParser.load(
        BapinEnterprise.bapinEnterprise2,
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
.enterpriseBapinLevel2 {
  width: 687px;
  height: 220px;
  position: absolute;
  top: 0px;
  left: 32px;
  .headImgBox {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    top: 26px;
    left: 293px;
    z-index: 1;
    background-color: #f24c3f;
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
    top: 130px;
    letter-spacing: 5px;
    width: 610px;
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
