<template>
  <!-- 年会霸屏3 -->
  <transition
    enter-active-class="slideInDown faster animated"
    leave-active-class="slideOutUp faster animated"
  >
    <div
      v-show="showAniStart"
      ref="enterpriseBapinLevel3"
      class="enterpriseBapinLevel3"
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
  name: 'LoveBapinLevel3',
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
      this.SVGAPlayer = new SVGA.Player(this.$refs.enterpriseBapinLevel3);
      this.$svgaParser.load(
        BapinEnterprise.bapinEnterprise3,
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
.enterpriseBapinLevel3 {
  width: 695px;
  height: 183px;
  position: absolute;
  top: 0px;
  left: 28px;
  .headImgBox {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    top: 10px;
    left: 290px;
    z-index: 1;
    background-color: #fffcaa;
    .headImg {
      width: 92%;
      height: 92%;
      border-radius: 50%;
    }
  }
  .name {
    font-size: 21px;
    color: #fdf47b;
    position: absolute;
    left: 250px;
    top: 40px;
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
    left: 40px;
    top: 120px;
    letter-spacing: 5px;
    width: 550px;
    height: 45px;
    z-index: 1;
    position: absolute;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
