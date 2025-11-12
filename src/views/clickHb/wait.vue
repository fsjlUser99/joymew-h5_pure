<template>
  <!-- 点红包等待 -->
  <div
    ref="clickHbWaitBg"
    class="wait"
  />
</template>
<script>
import SVGA from 'svgaplayerweb';
import { clickHbWaitBg } from '@/assets/constant/effect';

export default {
  name: 'HbyWait',
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.SVGAPlayer = new SVGA.Player(this.$refs.clickHbWaitBg);
      this.$svgaParser.load(
        clickHbWaitBg,
        (videoItem) => {
          this.SVGAPlayer.setVideoItem(videoItem);
          this.SVGAPlayer.startAnimation();
        },
        (err) => {
          return Promise.reject(err);
        },
      );
    });
  },
  beforeDestroy() {
    if (this.SVGAPlayer) {
      this.SVGAPlayer.stopAnimation();
      this.SVGAPlayer.clear();
      this.SVGAPlayer = null;
    }
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.wait {
  position: absolute;
  width: 750px;
  height: 1624px;
  // background-image: url('../../assets/image/clickHb/waitBg.png');
  // background-size: 100% 100%;
}
</style>
