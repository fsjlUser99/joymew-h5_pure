<template>
  <div
    class="bg publicZIndexBackground"
    :style="{ backgroundImage: 'url(' + background + ')' }"
  />
</template>
<script>
import { mapState } from 'vuex';
// import { getSceneInfoBySceneType } from '@/assets/constant/scene';
// import { commitBackgroundFileList } from '@/utils/preloadFile';

export default {
  name: 'Background',
  computed: {
    ...mapState({
      // sceneType: (state) => state.live.sceneType,
      background: (state) => state.live.background,
      // emceeId: (state) => state.live.emceeId,
    }),
    // bg() {
    //   let tmpBg;
    //   if (this.$store.state.live.background && this.$store.state.live.background !== '0') {
    //     tmpBg = this.background;
    //   } else {
    //     const tmpSceneInfo = getSceneInfoBySceneType(this.sceneType);
    //     tmpBg = tmpSceneInfo && tmpSceneInfo.bg;
    //   }
    // if (tmpBg) {
    //   commitBackgroundFileList({
    //     path: tmpBg,
    //     type: 'img',
    //   });
    // }
    //   return tmpBg;
    // },
  },
};
</script>
<style lang="less" scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50%;
}
</style>
