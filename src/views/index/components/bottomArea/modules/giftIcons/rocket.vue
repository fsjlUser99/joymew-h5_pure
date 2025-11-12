<template>
  <div
    class="rocket"
    :class="sceneClassName"
    @click="openRocket"
  >
    <img
      :src="iconUrl"
      class="rocket-icon"
    />
  </div>
</template>

<script>
import { POPUP_MODULE } from '@/assets/constant/index';

const ICON_SCENETYPE_MAP = {
  0: 'https://static.hudongmiao.com/joymewH5/img/chat/rocketEntryIcon.png',
  54: 'https://static.hudongmiao.com/joymewH5/img/chat/rocketEntryIcon.png',
  1: 'https://static.hudongmiao.com/joymewH5/img/enterprise/rocketIcon.png',
  52: 'https://ustatic.joymew.com/joymewH5/img/icons/danmuIconQy.png',
  2: 'https://ustatic.joymew.com/joymewH5/img/icons/danmuIcon.png',
  21: 'https://ustatic.joymew.com/joymewH5/img/icons/danmuIcon.png',
  24: 'https://ustatic.joymew.com/joymewH5/img/icons/danmuIcon.png',
  25: 'https://ustatic.joymew.com/joymewH5/img/icons/danmuIcon.png',
  26: 'https://ustatic.joymew.com/joymewH5/img/icons/danmuIcon.png',
  53: 'https://ustatic.joymew.com/joymewH5/img/icons/danmuIcon.png',
  22: 'https://ustatic.joymew.com/joymewH5/img/icons/syDanmuIcon.png',
  42: 'https://ustatic.joymew.com/joymewH5/img/icons/syDanmuIcon.png',
  43: 'https://ustatic.joymew.com/joymewH5/img/icons/syDanmuIcon.png',
  23: 'https://ustatic.joymew.com/joymewH5/img/icons/crlDanmuIcon.png',
  41: 'https://ustatic.joymew.com/joymewH5/img/icons/bydlDanmuIcon.png',
  51: 'https://ustatic.joymew.com/joymewH5/img/icons/txhROcketIcon.png',
  91: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/zsdm.png',
  55: 'https://ustatic.joymew.com/joymewH5/img/icons/danmuIcon.png',
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
    openRocket() {
      if (this.$store.state.user.isForbidBuyHbq) {
        return;
      }
      if (this.$store.state.live.isLocationInvalid) {
        this.$toast.center(this.$store.state.live.locationInvalidReason);
        return;
      }
      this.$store.commit('app/togglePopup', POPUP_MODULE.danmuModule.key);
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
.rocket {
  width: 96px;
  height: 96px;
  margin: 0 20px;
  .rocket-icon {
    width: 100%;
    height: 100%;
  }
  &.annualMeeting {
    width: 78px;
    height: 88px;
    margin: 0 12px;
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
    background-color: rgba(0, 0, 0, 0.2);
    margin: 0 19px;
    border-radius: 50%;
    .hvCenter();
    .rocket-icon {
      width: 68px;
      height: 68px;
    }
  }
  &.qqy {
    .rocket-icon {
      width: 44px;
      height: 66px;
    }
  }
  &.zshl {
    width: 98px;
    height: 105px;
    margin: 0 10px;
  }
}
</style>
