<template>
  <div
    class="live-photo publicHCenter"
    @click="toLivePhoto"
  >
    <img
      src="https://ustatic.joymew.com/joymewH5/img/icons/photographerIcon.png"
      class="photographer-icon"
    />
  </div>
</template>

<script>
import { checkPermission, jumpToLivePhoto } from './func';

export default {
  methods: {
    toLivePhoto() {
      // validate
      if (!checkPermission()) {
        return;
      }

      jumpToLivePhoto();
    },
  },
};
</script>

<style lang="less" scoped>
.photographer-icon {
  width: 118px;
  height: 116px;
}
</style>
