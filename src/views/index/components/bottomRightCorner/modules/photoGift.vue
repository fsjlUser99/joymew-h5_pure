<template>
  <div
    class="photo-gift publicVCenter"
    :class="'photo-' + sceneType"
    @click="openPhotoPopup"
  >
    <img
      :src="photoIcon"
      class="photo-icon"
      v-if="photoIcon"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { POPUP_MODULE } from '@/assets/constant/index';
import { checkPermission } from './func';

const SCENETYPE_ICONS_MAP = {
  '0,54': ['https://static.hudongmiao.com/joymewH5/img/icons/wedding/photoIconClear_compressed.png'],
  91: ['https://ustatic.joymew.com/joymewScreen/zshl/mobile/photoIcon.png'],
};
const SCENETYPE_ICONS_MAP_KEYS = Object.keys(SCENETYPE_ICONS_MAP);

export default {
  computed: {
    ...mapState({
      sceneType: (state) => state.live.sceneType,
    }),
    photoIcon() {
      const index = SCENETYPE_ICONS_MAP_KEYS.findIndex((item) => {
        if (item.includes(',')) {
          const arr = item.split(',');
          return arr.includes(this.sceneType);
        }
        return item === this.sceneType;
      });
      if (index > -1) {
        const key = SCENETYPE_ICONS_MAP_KEYS[index];
        return SCENETYPE_ICONS_MAP[key][0];
      }
      return null;
    },
  },
  methods: {
    openPhotoPopup() {
      // validate
      if (!checkPermission()) {
        return;
      }
      // action
      this.$store.commit('app/togglePopup', POPUP_MODULE.photoModule.key);
    },
  },
};
</script>

<style lang="less" scoped>
.photo-gift {
  flex-direction: column;
  &.photo-0,
  &.photo-54 {
    .photo-icon {
      width: 118px;
      height: 116px;
    }
  }
  &.photo-91 {
    .photo-icon {
      width: 120px;
      height: 135px;
    }
  }
}
</style>
