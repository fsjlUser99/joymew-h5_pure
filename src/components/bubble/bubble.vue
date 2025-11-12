<template>
  <!-- 气泡效果 -->
  <canvas
    ref="canvas"
    class="canvas"
    width="160"
    height="500"
    :class="{down: !hbkdVisible}"
  />
</template>

<script>
import { mapState } from 'vuex';
import JumpBubble from './bubble';

let initLock = false;
let tmpInterval;
const heartList = [
  'https://static.hudongmiao.com/joymewH5/img/bubble/heart1.png',
  'https://static.hudongmiao.com/joymewH5/img/bubble/heart2.png',
  'https://static.hudongmiao.com/joymewH5/img/bubble/heart3.png',
  'https://static.hudongmiao.com/joymewH5/img/bubble/heart4.png',
];

export default {
  name: 'Bubble',
  methods: {
    init() {
      if (initLock) {
        return;
      }
      initLock = true;
      const bubble = new JumpBubble(this.$refs.canvas, {
        max: 20,
        width: 50,
        speed: 'fast',
      });
      let count = 0;
      const tmpLen = heartList.length;
      tmpInterval = setInterval(() => {
        if (count > tmpLen - 1) {
          count = 0;
        }
        bubble.create(heartList[count]);
        count += 1;
      }, 250);
    },
  },
  computed: {
    ...mapState({
      hbkdVisible: (state) => state.app.hbkdVisible,
    }),
  },
  beforeDestroy() {
    clearInterval(tmpInterval);
    initLock = false;
  },
};
</script>

<style lang="less" scoped>
.canvas {
  position: absolute;
  right:  0px;
  bottom: 515px;
  pointer-events: none;
  width: 143px;
  height: 400px;
  &.down {
    bottom: 350px;
  }
}
</style>
