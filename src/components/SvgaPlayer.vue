<template>
  <!-- XXX 目前不需要穿透也可以在外层组件设置样式，
  可能和这里将className设置在最外层有关，后续考虑优化 -->
  <div
    ref="player"
    :class="className"
    :style="style"
  />
</template>

<script>
import SVGA from 'svgaplayerweb';

export default {
  name: 'ScreenSvgaPlayer',
  props: {
    // svga文件地址
    svgaFile: {
      type: String,
      default: '',
    },
    /** 执行替换动画图片参数 */
    replaceImageList: {
      type: Array,
      default: () => ([]),
    },
    // 样式对象
    styleObj: {
      type: Object,
      default: () => ({}),
    },
    // class
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      style: {},
      player: null,
    };
  },
  mounted() {
    console.dir('ref', this.$refs);
    try {
      this.initSvga();
    } catch (e) {
      console.log(e);
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.stopAnimation();
      this.player.clear();
      this.player = null;
    }
  },
  methods: {
    // 初始化svga
    initSvga() {
      this.player = new SVGA.Player(this.$refs.player);
      this.$svgaParser.load(
        this.svgaFile,
        (videoItem) => {
          // 初始化样式
          this.style = this.initStyle(videoItem.videoSize.width, videoItem.videoSize.height);

          if (this.player) {
            this.replaceImageList.forEach((item) => {
              this.player.setImage(item.image, item.id);
            });
            this.player.setContentMode('AspectFit');
            this.player.setVideoItem(videoItem);
            this.player.startAnimation();
          }
        },
      );
    },
    // 初始化样式
    initStyle(width, height) {
      // 如果styleObj中有width和height，就不用计算了
      if (this.styleObj.width && this.styleObj.height) {
        return this.styleObj;
      }
      // 如果没有width或者height，就计算
      const temStyle = this.styleObj;
      temStyle.width = this.styleObj.width || `${width}px`;
      temStyle.height = this.styleObj.height || `${height}px`;

      return temStyle;
    },
  },
};
</script>
