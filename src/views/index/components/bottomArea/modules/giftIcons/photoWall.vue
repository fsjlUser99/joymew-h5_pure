<template>
  <div class="photoWall" @click="toPhotoWall">
    <img
      :src="iconUrl"
      class="photoWall-icon"
    />
  </div>
</template>

<script>
import wxApi from '@/utils/wxApi';

const ICON_SCENETYPE_MAP = {
  0: 'https://static.hudongmiao.com/joymewH5/img/chat/photoWallEntryIcon.png',
  91: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/photoInstant.png',
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
    toPhotoWall() {
      if (this.$store.state.user.isForbidBuyHbq) {
        return;
      }
      if (this.$store.state.live.isLocationInvalid) {
        this.$toast.center(this.$store.state.live.locationInvalidReason);
        return;
      }
      if (this.$store.state.app.env === 'miniProgram') {
        this.judgeMpTypeOrIsHltThenToPhotoWall();
      } else if (this.$store.state.app.env === 'tt') {
        wxApi.navigateToTt('/pages/photoWallNew/photoWallNew');
      }
    },
    judgeMpTypeOrIsHltThenToPhotoWall() {
      if (this.$store.state.app.mpType || this.$store.state.app.isHlt === 'common') {
        wxApi.navigateTo('/packageB/pages/photoWallIndex/photoWallIndex');
      } else {
        wxApi.navigateTo('/pages/photoWallNew/photoWallNew');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.photoWall {
  width: 96px;
  height: 96px;
  margin: 0 20px;
  .photoWall-icon {
    width: 100%;
    height: 100%;
  }
}
</style>
