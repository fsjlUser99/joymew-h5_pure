<template>
  <!-- 皇冠霸屏2 -->
  <transition
    enter-active-class="slideInDown faster animated"
    leave-active-class="slideOutUp faster animated"
  >
    <div
      v-show="showAniStart"
      ref="crownBapinLevel2"
      class="crownBapinLevel2"
    >
      <div class="name">
        {{ name }}
      </div>
      <div class="ct">
        {{ content }}
      </div>
      <div class="headImgBox">
        <div class="headImgBoxInner">
          <div class="headImgBoxBg">
            <img
              :src="headImg"
              class="headImg"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import SVGA from 'svgaplayerweb';
import { Bapin } from '@/assets/constant/effect';
import { timeoutTask } from '@/utils/index';
import store from '@/store/index';

export default {
  name: 'CrownBapinLevel2',
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
      this.SVGAPlayer = new SVGA.Player(this.$refs.crownBapinLevel2);
      this.$svgaParser.load(
        Bapin.crownBapinLevel2,
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
          console.log(err);
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
.crownBapinLevel2 {
  width: 750px;
  height: 1334px;
  position: absolute;
  top: -5vw;
  .headImgBox {
    width: 14vw;
    height: 14vw;
    background: rgba(249, 238, 168, 0);
    border: 1px solid #f9eba9;
    border-radius: 0px 30px 0px 30px;
    position: absolute;
    left: 3vw;
    top: 19vw;
    transform: rotate(45deg);
    z-index: 1;
    .headImgBoxInner {
      width: 12.9vw;
      height: 12.9vw;
      background: rgba(249, 238, 168, 0.33);
      border-radius: 0 4vw 0 4vw;
      position: absolute;
      top: -0.2vw;
      left: -0.3vw;
      .headImgBoxBg {
        width: 12.9vw;
        height: 12.9vw;
        background: linear-gradient(183deg, #343aff, #0076ff);
        border-radius: 0 4vw 0 4vw;
        position: absolute;
        top: 0.8vw;
        left: 0.8vw;
        .headImg {
          width: 12vw;
          height: 12vw;
          border-radius: 0 2.667vw 0 2.667vw;
          position: absolute;
          top: 0.3vw;
          left: 0.2vw;
        }
      }
    }
  }
  .name {
    font-size: 3.2vw;
    color: red;
    position: absolute;
    left: 16vw;
    top: 18.5vw;
    text-shadow: rgba(0, 0, 0, 0.6) 1px 0 0, rgba(0, 0, 0, 0.6) 0 1px 0, rgba(0, 0, 0, 0.6) -1px 0 0, rgba(0, 0, 0, 0.6) 0 -1px 0;
    width: 23vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    z-index: 1;
  }
  .ct {
    font-size: 6.2vw;
    font-weight: bold;
    color: #ffe278;
    text-shadow: 4px 1px 2px #023d81;
    position: absolute;
    left: 18vw;
    top: 22.3vw;
    letter-spacing: 5px;
    width: 65vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    z-index: 1;
  }
}
</style>
