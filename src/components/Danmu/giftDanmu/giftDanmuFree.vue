<template>
  <transition
    enter-active-class="slideInRight faster animated"
    leave-active-class="slideOutLeft faster animated"
  >
    <div
      v-show="showAniStart"
      ref="giftDanmu"
      class="giftDanmu"
    >
      <div class="headImgBox">
        <img
          :src="headImg"
          class="headImg"
        />
        <!-- <img src="@/assets/image/danmu/vipIcon.png" class="vipIcon" /> -->
      </div>
      <div class="name">
        {{ nickname }}
      </div>
      <div class="gift">
        <label>送来了</label>{{ giftName }}
      </div>
      <img
        :src="giftImg"
        class="giftImg"
        :class="{ scale: scaleAniStart }"
      />
    </div>
  </transition>
</template>
<script>
import { timeoutTask } from '@/utils/index';

export default {
  name: 'GiftDanmuFree',
  data() {
    return {
      headImg: '',
      nickname: '',
      giftName: '',
      giftImg: '',
      shijian: 0,
      showAniStart: false,
      scaleAniStart: false,
    };
  },
  beforeDestroy() {},
  mounted() {
    this.showAniStart = true;
    timeoutTask(() => {
      this.scaleAniStart = true;
    }, 500);
    timeoutTask(() => {
      this.showAniStart = false;
    }, this.shijian * 1000 - 500);
    timeoutTask(() => {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }, this.shijian * 1000);
  },
  methods: {},
};
</script>
<style lang='less' scoped>
.giftDanmu {
  width: 480px;
  height: 97px;
  position: absolute;
  top: 78px;
  left: 20px;
  background-color: rgba(240, 69, 138, 0.6);
  border-radius: 76px;
  .headImgBox {
    width: 80px;
    height: 80px;
    position: absolute;
    left: 10px;
    top: 8px;
    .headImg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: absolute;
    }
    .vipIcon {
      width: 80px;
      height: 29px;
      position: absolute;
      bottom: -10px;
      left: -4px;
    }
  }
  .name {
    font-size: 28px;
    color: #ffffff;
    position: absolute;
    top: 11px;
    left: 120px;
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    font-weight: bold;
  }
  .gift {
    font-size: 28px;
    font-weight: 600;
    color: #ffffff;
    width: 250px;
    text-align: left;
    position: absolute;
    top: 48px;
    left: 120px;
    label {
      font-size: 28px;
      margin-right: 11px;
      color: #fd374b;
      font-weight: 500;
    }
  }
  .giftImg {
    position: absolute;
    right: 0;
    top: 3px;
    height: 97px;
    &.scale {
      animation-name: scaleAni;
      animation-duration: 0.5s;
      animation-timing-function: ease-out;
      animation-iteration-count: infinite;
    }
  }
  @keyframes scaleAni {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }
}
</style>
