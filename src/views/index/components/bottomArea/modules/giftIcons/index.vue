<template>
  <div
    class="gift-icons"
    :class="sceneClassName"
  >
    <!-- 全屏特效 -->
    <div
      class="super-danmu"
      v-if="superDanmuEntryVisible"
      @click="openSuperDanmu"
    >
      <img
        :src="superDanmuEntryIcon"
        alt=""
        class="super-danmu_icon"
      />
    </div>
    <!-- 照片墙(婚礼版、中式婚礼版独有) -->
    <photoWall
      :sceneClassName="sceneClassName"
      :sceneType="sceneType"
      v-if="photoWallVisible"
    />
    <!-- 现场照片 -->
    <livePhoto
      :sceneClassName="sceneClassName"
      :sceneType="sceneType"
      v-if="livePhotoVisible"
    />
    <!-- 火箭弹幕 -->
    <rocket
      :sceneClassName="sceneClassName"
      :sceneType="sceneType"
      v-if="giftSendVisible"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { superDanmuEntry } from '@/assets/constant/effect';
import { POPUP_MODULE } from '@/assets/constant/index';
import rocket from './rocket.vue';
import photoWall from './photoWall.vue';
import livePhoto from './livePhoto.vue';
import { getSceneClassName } from '../../quickWishFunc';

const SUPERDANMU_SCENETYPE_ICON_MAP = {
  0: 'https://static.hudongmiao.com/joymewH5/img/chat/bapinEntryIcon.png',
  1: 'https://static.hudongmiao.com/joymewH5/img/enterprise/bapinIcon.png',
  91: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/allScreenIcon.png',
  other: superDanmuEntry,
};

export default {
  components: {
    rocket,
    photoWall,
    livePhoto,
  },
  computed: {
    ...mapState({
      sceneType: (state) => state.live.sceneType,
      isExamineLive: (state) => state.live.isExamineLive,
      isHideSuper: (state) => state.user.emceeInfo.isHideSuper,
      giftSendVisible: (state) => state.app.giftSendVisible,
      mpType: (state) => state.app.mpType,
      isOpenAdvert: (state) => state.user.emceeInfo.isOpenAdvert,
    }),
    superDanmuEntryIcon() {
      return SUPERDANMU_SCENETYPE_ICON_MAP[this.sceneType] || SUPERDANMU_SCENETYPE_ICON_MAP.other;
    },
    superDanmuEntryVisible() {
      return !this.isExamineLive && !this.isHideSuper && this.giftSendVisible;
    },
    photoWallVisible() {
      const hasSceneTypes = ['0', '91'];
      const hasMpType = ['haimiao', 'haimao', 'ledong'];
      return hasSceneTypes.includes(this.sceneType) && this.giftSendVisible && hasMpType.includes(this.mpType);
    },
    livePhotoVisible() {
      const noSceneTypes = ['0', '54', '91'];
      return !noSceneTypes.includes(this.sceneType) && !this.isOpenAdvert;
    },
  },
  data() {
    return {
      sceneClassName: '',
    };
  },
  methods: {
    initData() {
      this.sceneClassName = getSceneClassName(this.$store.state.live.sceneType);
    },
    openSuperDanmu() {
      if (this.$store.state.user.isForbidBuyHbq) {
        return;
      }
      if (this.$store.state.live.isLocationInvalid) {
        this.$toast.center(this.$store.state.live.locationInvalidReason);
        return;
      }
      this.$store.commit('app/togglePopup', POPUP_MODULE.superDanmuModule.key);
    },
  },
};
</script>

<style lang="less" scoped>
.gift-icons {
  display: flex;
  .super-danmu {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 0 24px;
    .super-danmu_icon {
      width: 100%;
      height: 100%;
    }
  }
  &.annualMeeting {
    .super-danmu {
      background-color: unset;
      margin: 0 12px;
    }
  }
  &.birth,
  &.bby,
  &.sy,
  &.crl,
  &.bly,
  &.myy,
  &.bydl,
  &.xsy,
  &.jbtm,
  &.txh,
  &.qqy,
  &.hx,
  &.wl {
    .super-danmu {
      background-color: #fff;
    }
  }
  &.zshl {
    .super-danmu {
      width: 92px;
      height: 94px;
      margin: 0 10px;
      background-color: unset;
    }
  }
}
</style>
