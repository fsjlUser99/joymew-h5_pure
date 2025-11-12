<template>
  <div
    class="bottomRightCorner publicZIndexBottomRightCorner"
    :class="'bottomRightCorner-' + sceneType"
  >
    <!-- 主持风采 -->
    <hostStyle v-if="hostStyleVisible" />
    <!-- 主持/婚礼堂预定 -->
    <reserve v-if="hotelReserveVisible" />
    <!-- 礼物 -->
    <gift v-if="giftSendVisible" />
    <!-- 霸屏 -->
    <bapin v-if="giftSendVisible" />
    <!-- 照片礼物 -->
    <photoGift v-if="photoGiftVisible" />
    <!-- 红包口袋 -->
    <hbkd v-if="hbkdVisible" />
    <!-- 现场照片 -->
    <livePhoto v-if="livePhotoVisible" />
    <!-- 点歌 -->
    <song v-if="songVisible" />
    <!-- 外场游戏 -->
    <outerGame v-if="outerGameVisible" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import hostStyle from './modules/hostStyle.vue';
import reserve from './modules/reserve.vue';
import gift from './modules/gift.vue';
import bapin from './modules/bapin.vue';
import photoGift from './modules/photoGift.vue';
import livePhoto from './modules/livePhoto.vue';
import hbkd from './modules/hbkd.vue';
import song from './modules/song.vue';
import outerGame from './modules/outerGame.vue';

export default {
  components: {
    hostStyle,
    reserve,
    gift,
    bapin,
    photoGift,
    livePhoto,
    hbkd,
    song,
    outerGame,
  },
  computed: {
    ...mapState({
      sceneType: (state) => state.live.sceneType,
      giftSendVisible: (state) => state.app.giftSendVisible,
      hotelReserveVisible: (state) => state.app.hotelReserveVisible,
      isOpenAdvert: (state) => state.user.emceeInfo.isOpenAdvert,
    }),
    /**
     *  控制照片礼物显示
     *  婚礼版、订婚宴、中式婚礼版可见
     */
    photoGiftVisible() {
      return ['0', '54', '91'].includes(this.sceneType) && !this.isOpenAdvert;
    },
    /**
     * 控制红包口袋显示
     * 红包口袋可见&&不是测试活动&&不是抖音版环境
     */
    hbkdVisible() {
      const { hbkdVisible } = this.$store.state.app;
      const { isExamineLive } = this.$store.state.live;
      const { env } = this.$store.state.app;
      return hbkdVisible && !isExamineLive && env !== 'tt';
    },
    /**
     * 控制主持预定显示
     * 互动小程序环境&&约婚开关打开&&酒店预定不可见
     */
    hostStyleVisible() {
      const { mpType } = this.$store.state.app;
      const yuehunSwitch = this.$store.getters['user/yuehunSwitch'];
      const { hotelReserveVisible } = this.$store.state.app;
      return mpType && yuehunSwitch && !hotelReserveVisible;
    },
    /**
     * 控制现场照片显示
     * 现场照片可见&&互动小程序环境&&婚礼版企业版毕业典礼
     */
    livePhotoVisible() {
      const { photographerVisible } = this.$store.state.app;
      const { mpType } = this.$store.state.app;
      return photographerVisible && mpType && ['0', '1', '41'].includes(this.sceneType);
    },
    /**
     * 控制点歌显示
     * 点歌可见&&不是抖音小程序环境
     */
    songVisible() {
      const { env } = this.$store.state.app;
      const { chooseSongVisible } = this.$store.state.app;
      return chooseSongVisible && env !== 'tt';
    },
    /**
     * 外场游戏显示
     */
    outerGameVisible() {
      const { mpType } = this.$store.state.app;
      const outerGameSwitch = this.$store.getters['app/outerGameSwitch'];
      return mpType && outerGameSwitch;
    },
  },
};
</script>

<style lang="less" scoped>
.bottomRightCorner {
  position: absolute;
  right: 0px;
  bottom: 218px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  &.bottomRightCorner-1,
  &.bottomRightCorner-2,
  &.bottomRightCorner-21,
  &.bottomRightCorner-22,
  &.bottomRightCorner-51,
  &.bottomRightCorner-52,
  &.bottomRightCorner-53 {
    row-gap: 20px;
  }
  &.bottomRightCorner-42 {
    .bapin {
      z-index: 1;
    }
    .hbkd {
      margin-top: -80px;
    }
  }
}
</style>
