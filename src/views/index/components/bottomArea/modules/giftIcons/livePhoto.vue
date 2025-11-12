<template>
  <div
    class="livePhoto"
    :class="sceneClassName"
    @click="openLivePhoto"
  >
    <img
      :src="iconUrl"
      class="livePhoto-icon"
    />
  </div>
</template>

<script>
import { POPUP_MODULE } from '@/assets/constant/index';

const ICON_SCENETYPE_MAP = {
  1: 'https://static.hudongmiao.com/joymewH5/img/enterprise/photoIcon.png',
  52: 'https://ustatic.joymew.com/joymewH5/img/icons/qyPhotoIcon.png',
  2: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  21: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  22: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  23: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  24: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  25: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  26: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  41: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  42: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  43: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  53: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
  51: 'https://ustatic.joymew.com/joymewH5/img/icons/txhCameraIcon.png',
  55: 'https://ustatic.joymew.com/joymewH5/img/icons/bbyCameraIcon.png',
};

export default {
  props: {
    sceneClassName: {
      type: String,
      default: '',
    },
    sceneType: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconUrl() {
      return ICON_SCENETYPE_MAP[this.sceneType];
    },
  },
  methods: {
    openLivePhoto() {
      if (this.$store.state.user.isForbidBuyHbq) {
        return;
      }
      if (this.$store.state.live.isLocationInvalid) {
        this.$toast.center(this.$store.state.live.locationInvalidReason);
        return;
      }
      this.$store.commit('app/togglePopup', POPUP_MODULE.photoModule.key);
    },
  },
};
</script>

<style lang="less" scoped>
.hvCenter() {
  display: flex;
  justify-content: center;
  align-items: center;
}
.livePhoto {
  width: 78px;
  height: 88px;
  margin: 0 12px;
  .livePhoto-icon {
    width: 100%;
    height: 100%;
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
    width: 92px;
    height: 92px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 0 19px;
    .hvCenter();
    .livePhoto-icon {
      width: 71px;
      height: 58px;
    }
  }
  &.qqy {
    .livePhoto-icon {
      width: 64px;
      height: 66px;
    }
  }
}
</style>
