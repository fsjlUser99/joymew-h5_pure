<!--通用滚动文本框组件-->
<template>
    <div
      ref="scrollContainer"
      class="scrollContainer"
      :style="{ width: customWidth }"
    >
      <!-- 内容区域 -->
      <div
        ref="scrollText"
        class="scrollText"
        :style="{
          transform: 'translateX(' + moveDistance + 'vw)',
          transition: 'transform ' + moveDuration + 's linear',
        }"
        @transitionend="onScrollTransitionEnd"
      >
        {{ text }}
      </div>
    </div>
  </template>
<script>
import { timeoutTask } from '@/utils/index';

export default {
  name: 'scrollTextBox',
  props: {
    text: {
      type: String,
      default: '',
    },
    customWidth: {
      type: String,
      default: '0',
    },
    scrollDelay: {
      type: Number,
      default: 1,
    },
    gapTime: {
      type: Number,
      default: 3,
    },
    minScrollDistance: {
      type: Number,
      default: 10,
    },
    speed: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      moveDistance: 0,
      moveDuration: 0,
      scrollLock: false,
      tmpMoveDistance: 0,
    };
  },
  beforeDestroy() {
    this.scrollLock = true;
    console.log('滚动文本组件销毁!');
  },
  mounted() {
    timeoutTask(() => {
      this.tmpMoveDistance = this.getScrollDistance();
      console.log('tmpMoveDistance:', this.tmpMoveDistance);
      this.scrollText();
    }, this.scrollDelay * 1000);
  },
  methods: {
    onScrollTransitionEnd() {
      this.moveDistance = 0;
      this.moveDuration = 0;
      timeoutTask(() => {
        this.scrollText();
      }, this.gapTime * 1000);
    },
    scrollText() {
      if (this.scrollLock) {
        return;
      }
      if (this.tmpMoveDistance <= this.minScrollDistance) {
        return;
      }
      console.log('开始滚动啦!');
      this.moveDistance = -this.tmpMoveDistance;
      const tmpDuration = this.moveDistance / this.speed;
      this.moveDuration = tmpDuration >= 0 ? tmpDuration : -tmpDuration;
    },
    getScrollDistance() {
      const scrollContainerDom = this.$refs.scrollContainer;
      const broadContainerWidth = scrollContainerDom.offsetWidth;
      const scrollTextDom = this.$refs.scrollText;
      const scrollTextWidth = scrollTextDom.offsetWidth;
      return ((scrollTextWidth - broadContainerWidth) / 7.5).toFixed(2);
    },
  },
};
</script>
  <style lang="less" scoped>
  .scrollContainer {
      overflow: hidden;
      .scrollText {
        white-space: nowrap;
        display: inline-block;
      }
  }
  </style>
