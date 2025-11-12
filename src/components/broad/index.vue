<template>
  <div class="broad">
    <!-- 广播小喇叭 -->
    <img
      src="https://ustatic.hudongmiao.com/joymewH5/newImg/laba.png"
      alt="小喇叭"
      class="laba"
    />
    <!-- 广播内容 -->
    <div
      class="container"
      ref="container"
    >
      <p
        class="content"
        :style="{ transform: 'translateX(' + tranx + 'px)', transition: 'all ' + duration + 's linear' }"
        @transitionend="onTransitionend"
      >
      {{ broadContent }}
      </p>
    </div>
  </div>
</template>
<script>
import { timeoutTask } from '@/utils/index';

let moveDis; // 移动距离
let targetDom; // 目标元素

export default {
  name: 'broad',
  computed: {},
  props: {
    broadContent: { // 广播内容
      type: String,
      default: '',
    },
    speed: { // 速度 每秒移动20px
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      tranx: 0, // 平移距离
      duration: 0, // 动画持续时间(单位s)
      loopGap: 3, // 循环间隔时间(单位s)
    };
  },
  created() {},
  mounted() {
    // 一开始有内容就尝试滚动
    if (this.broadContent.length > 0) {
      this.tryMove();
    } else {
      // 等待有内容后再尝试滚动
      const unwatch = this.$watch('broadContent', (newVal) => {
        if (newVal.length > 0) {
          unwatch();
          this.tryMove();
        }
      });
    }
  },
  methods: {
    /**
     * 尝试滚动
     */
    tryMove() {
      targetDom = this.$refs.container;
      moveDis = targetDom.scrollWidth - targetDom.offsetWidth;
      if (moveDis > 0) {
        this.move();
      }
    },
    /**
     * 滚动
     */
    move() {
      this.tranx = -moveDis;
      this.duration = moveDis / this.speed;
    },
    /**
     * 移动结束
     */
    onTransitionend() {
      this.tranx = 0;
      this.duration = 0;
      timeoutTask(() => {
        this.move();
      }, this.loopGap * 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.broad {
  height: 40px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 400;
  .laba {
    width: 16px;
    height: 16px;
  }
  .container {
    width: 90%;
    white-space: nowrap;
    overflow-x: auto;
    .content {
      display: inline-block;
    }
  }
}
</style>
