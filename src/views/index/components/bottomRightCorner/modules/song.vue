<template>
  <div
    class="song publicHCenter"
    @click="openPopup"
  >
    <img
      src="https://static.hudongmiao.com/joymewH5/img/icons/wedding/songIconCLear_compressed.png"
      class="song-icon"
    />
  </div>
</template>

<script>
import { POPUP_MODULE } from '@/assets/constant/index';
import { checkPermission } from './func';

export default {
  methods: {
    openPopup() {
      // validate
      if (!checkPermission()) {
        return;
      }
      // action
      this.$store.commit('app/togglePopup', POPUP_MODULE.chooseSongModule.key);
    },
  },
};
</script>

<style lang="less" scoped>
.song-icon {
  width: 118px;
  height: 116px;
}
</style>
