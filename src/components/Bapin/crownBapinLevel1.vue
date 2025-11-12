<template>
  <!-- 皇冠霸屏1 -->
  <transition
    enter-active-class="slideInDown faster animated"
    leave-active-class="slideOutUp faster animated"
  >
    <div
      v-show="showAniStart"
      ref="crownBapinLevel1"
      class="crownBapinLevel1"
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
  name: 'CrownBapinLevel1',
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
      this.SVGAPlayer = new SVGA.Player(this.$refs.crownBapinLevel1);
      console.log(Bapin.crownBapinLevel1);
      this.$svgaParser.load(
        Bapin.crownBapinLevel1,
        (videoItem) => {
          this.SVGAPlayer.setVideoItem(videoItem);
          // this.SVGAPlayer.setText(
          //   {
          //     text: this.content,
          //     family: 'Arial',
          //     size: '32px',
          //     color: '#ffe278',
          //     offset: { x: 0.0, y: 0.0 },
          //   },
          //   'psd_15213'
          // );
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
.crownBapinLevel1 {
  width: 750px;
  height: 1334px;
  position: absolute;
  .headImgBox {
    width: 14vw;
    height: 14vw;
    background: rgba(249, 238, 168, 0);
    border: 1px solid #f9eba9;
    border-radius: 0px 20px 0px 20px;
    position: absolute;
    left: 3vw;
    top: 16vw;
    transform: rotate(45deg);
    z-index: 1;
    .headImgBoxInner {
      width: 12.9vw;
      height: 12.9vw;
      background: rgba(249, 238, 168, 0.33);
      border-radius: 0px 20px 0px 20px;
      position: absolute;
      top: 0.533vw;
      left: 0.533vw;
      .headImgBoxBg {
        width: 12.5vw;
        height: 12.5vw;
        background: linear-gradient(183deg, #343aff, #0076ff);
        border-radius: 0px 20px 0px 20px;
        position: absolute;
        top: 0.3vw;
        left: 0.2vw;
        .headImg {
          width: 11vw;
          height: 11vw;
          border-radius: 0px 20px 0px 20px;
          position: absolute;
          top: 0.6vw;
          left: 0.6vw;
        }
      }
    }
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
    text-align: left;
    z-index: 1;
  }
  .ct {
    font-size: 6.2vw;
    font-weight: bold;
    color: #ffe278;
    text-shadow: 4px 1px 2px #023d81;
    text-stroke: 1px #00234c;
    position: absolute;
    left: 18vw;
    top: 18.1vw;
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
