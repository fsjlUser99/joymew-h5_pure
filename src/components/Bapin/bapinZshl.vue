<template>
  <transition
    enter-active-class="slideInDown faster animated"
    leave-active-class="slideOutUp faster animated"
  >
    <div
      class="bapinZshl"
      v-show="showAniStart"
    >
      <div class="bapinAni">
        <div
          class="bapinType1"
          v-if="bapinType === 0"
        >
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin3-1.png"
            class="imgB1"
          />
        </div>
        <div
          class="bapinType2"
          v-if="bapinType === 1"
        >
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin2-2.png"
            class="imgB1"
          />
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin2-1.png"
            class="imgB2"
          />
        </div>
        <div
          class="bapinType3"
          v-if="bapinType === 2"
        >
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin1-2.png"
            class="imgB1"
          />
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin1-1.png"
            class="imgB2"
          />
        </div>
        <div
          class="bapinType4"
          v-if="bapinType === 3"
        >
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin4-2.png"
            class="imgB1"
          />
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin4-1.png"
            class="imgB2"
          />
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin4-3.png"
            class="imgB3"
          />
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin4-4.png"
            class="imgB4"
          />
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin4-5.png"
            class="imgB5"
          />
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/jLeft.png"
            class="jLeft"
          />
          <img
            src="https://ustatic.joymew.com/joymewMp/zshl/bapin/jRight.png"
            class="jRight"
          />
        </div>
      </div>
      <div
        class="bapinContent"
        :class="[contentVisible ? 'show' : '', `bapinType${bapinType}`]"
      >
        <div class="avatarBox publicHvCenter">
          <img
            :src="headImg"
            class="headImg"
          />
        </div>
        <div class="name">
          {{ name }}
        </div>
        <!-- <div
          class="ct"
        >
          {{ content }}
        </div> -->
        <scrollTextBox
          :text="content"
          :customWidth="textWidth"
          class="ct"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import store from '@/store/index';
import { timeoutTask } from '@/utils/index';
import scrollTextBox from '@/components/scrollTextBox/index.vue';

let timer = null;
const TEXT_WIDTHS = ['80vw', '69vw', '64vw', '69vw'];
export default {
  name: 'bapinZshl',
  data() {
    return {
      name: '',
      headImg: '',
      content: '',
      time: 0,
      videoPath: '',
      bapinType: '',
      contentVisible: false,
      showAniStart: false,
    };
  },
  computed: {
    isCloseCurrentBapin: () => {
      return store.state.app.isCloseCurrentBapin;
    },
    textWidth() {
      return TEXT_WIDTHS[this.bapinType];
    },
  },
  components: {
    scrollTextBox,
  },
  watch: {
    // 主动关闭当前霸屏
    isCloseCurrentBapin: function isCloseCurrentBapin(newVal) {
      if (newVal) {
        this.destroyCurrentBapin();
      }
    },
  },
  created() {

  },
  mounted() {
    this.showAni();
    timer = setTimeout(
      () => {
        this.showAniStart = false;
        timeoutTask(() => {
          this.destroyCurrentBapin();
        }, 500);
      },
      parseFloat(this.time - 0.5, 10) * 1000,
    );
  },
  beforeDestroy() {
    // ”关闭霸屏按钮“隐藏
    store.commit('app/setBapinCloseIconVisible', false);
    // 重置”关闭当前霸屏“变量的值
    store.commit('app/setIsCloseCurrentBapin', false);
    // 告知bapinManter可以播放下一个霸屏
    this.$closeCurrentCrownBapin();
  },
  methods: {
    destroyCurrentBapin() {
      console.log('销毁');
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
      this.removeTimer();
    },
    removeTimer() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    },
    showAni() {
      // ”关闭霸屏按钮“显示
      store.commit('app/setBapinCloseIconVisible', true);
      this.showAniStart = true;
      timeoutTask(() => {
        this.contentVisible = true;
      }, 300);
    },
  },
};
</script>

<style scoped lang="less">
.bapinZshl {
  width: 750px;
  height: 234px;
  position: absolute;
  top: 0;
  left: 0;
  .bapinAni {
    .bapinType1 {
      .imgB1 {
        position: absolute;
        width: 668px;
        height: 267px;
        top: 9vw;
        left: 36px;
      }
    }
    .bapinType2 {
      .imgB1 {
        position: absolute;
        width: 750px;
        height: 195px;
        top: 0;
        left: 0;
      }
      .imgB2 {
        position: absolute;
        width: 628px;
        height: 402px;
        top: 23vw;
        left: 60px;
      }
    }
    .bapinType3 {
      .imgB1 {
        position: absolute;
        width: 750px;
        height: 263px;
        top: 0;
        left: 0;
      }
      .imgB2 {
        position: absolute;
        width: 561px;
        height: 505px;
        top: 0;
        left: 96px;
      }
    }
    .bapinType4 {
      .imgB1 {
        position: absolute;
        width: 750px;
        height: 220px;
        top: 0;
        left: 0;
      }
      .imgB2 {
        position: absolute;
        width: 100vw;
        height: 54vw;
        top: 47vw;
        left: 0;
      }
      .imgB3 {
        position: absolute;
        width: 100vw;
        height: 33.733vw;
        top: 16vw;
        left: 0;
      }
      .imgB4 {
        position: absolute;
        width: 41.733vw;
        height: 31.2vw;
        top: 26vw;
        left: 7.4vw;
      }
      .imgB5 {
        position: absolute;
        width: 41.733vw;
        height: 31.2vw;
        top: 26vw;
        right: 9.4vw;
      }
      .jLeft {
        position: absolute;
        width: 54px;
        height: 234px;
        top: 26vw;
        left: 7.4vw;
      }
      .jRight {
        position: absolute;
        width: 54px;
        height: 234px;
        top: 26vw;
        right: 9.4vw;
      }
    }
  }
  .bapinContent {
    opacity: 0;
    transition: all 0.3s;
    color: #fde5a0;
    font-size: 28px;
    .avatarBox {
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      .headImg {
        border-radius: 50%;
        width: 96%;
        height: 96%;
      }
    }
    .name {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
    .ct {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
    &.bapinType0 {
      .avatarBox {
        top: 7vw;
        background-color: #ffcf97;
        width: 11.5vw;
        height: 11.5vw;
      }
      .name {
        width: 80vw;
        top: 20vw;
        font-size: 3.8vw;
      }
      .ct {
        // width: 80vw;
        top: 28vw;
        font-size: 4.8vw;
        white-space: unset;
        text-overflow: unset;
      }
    }
    &.bapinType1 {
      color: #b36a20;
      .avatarBox {
        top: 22vw;
        background-color: #ffcf97;
        width: 11.5vw;
        height: 11.5vw;
      }
      .name {
        width: 69vw;
        top: 36vw;
        font-size: 3.8vw;
      }
      .ct {
        // width: 69vw;
        top: 43.8vw;
        font-size: 4.8vw;
        white-space: unset;
        text-overflow: unset;
      }
    }

    &.bapinType2 {
      .avatarBox {
        top: 22vw;
        background-color: #ffcf97;
        width: 11.5vw;
        height: 11.5vw;
      }
      .name {
        width: 62vw;
        top: 36vw;
        font-size: 3.8vw;
      }
      .ct {
        // width: 64vw;
        top: 43.8vw;
        font-size: 4.8vw;
      }
    }

    &.bapinType3 {
      color: #b36a20;
      .avatarBox {
        top: 22vw;
        background-color: #ffcf97;
        width: 11.5vw;
        height: 11.5vw;
      }
      .name {
        width: 69vw;
        top: 36vw;
        font-size: 3.8vw;
      }
      .ct {
        // width: 69vw;
        top: 42vw;
        font-size: 4.8vw;
        white-space: unset;
        text-overflow: unset;
      }
    }

    &.show {
      opacity: 1;
    }
  }
}
</style>
