<template>
  <div
    class="zshlRocket publicVCenter"
    :class="{ move: moveAniStart, rocket1: rocketType === 0, rocket2: rocketType === 1, rocket3: rocketType === 2 }"
    :style="{ top: top + 'vw' }"
  >
    <div class="rocket" />
    <div class="avatarBox publicHvCenter">
      <img
        :src="headImg"
        class="headImg"
      />
    </div>
    <div class="userTInfo">
      <div class="name textOverFlow">
        {{ name }}
      </div>
      <!-- <div class="wish">
        {{ content }}
      </div> -->
      <scrollTextBox
        :text="content"
        :customWidth="textWidth"
        class="wish"
      />
    </div>
  </div>
</template>
<script>
import { timeoutTask } from '@/utils/index';
import scrollTextBox from '@/components/scrollTextBox/index.vue';

const TEXT_WIDTH = ['45vw', '45vw', '35vw'];
export default {
  name: 'zshlRocket',
  data() {
    return {
      name: '',
      headImg: '',
      content: '',
      top: 0,
      rocketType: 0,
      moveAniStart: false,
    };
  },
  computed: {
    textWidth() {
      return TEXT_WIDTH[this.rocketType];
    },
  },
  components: {
    scrollTextBox,
  },
  mounted() {
    this.moveAniStart = true;
    timeoutTask(() => {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }, 10000);
  },
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.textOverFlow {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.zshlRocket {
  position: absolute;
  left: 750px;
  column-gap: 8px;
  .rocket {
    background-size: 100% 100%;
  }
  .avatarBox {
    position: absolute;
    background-color: #ffcf97;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    .headImg {
      width: 98%;
      height: 98%;
      border-radius: 50%;
    }
  }
  .userTInfo {
    position: absolute;
    color: #fddfa3;
    font-size: 28px;
    width: 340px;
    line-height: 1.5;
  }
  &.rocket1 {
    .rocket {
      width: 602px;
      height: 270px;
      background-image: url('https://ustatic.joymew.com/joymewMp/zshl/dragon.png');
    }
    .avatarBox {
      left: 9vw;
      top: 10vw;
    }
    .userTInfo {
      left: 22vw;
      top: 9vw;
    }
  }
  &.rocket2 {
    .rocket {
      width: 648px;
      height: 426px;
      background-image: url('https://ustatic.joymew.com/joymewMp/zshl/fenhuang.png');
    }
    .avatarBox {
      left: 21vw;
      top: 32vw;
    }
    .userTInfo {
      left: 33vw;
      top: 32vw;
      color: #cd3629;
    }
  }
  &.rocket3 {
    .rocket {
      width: 602px;
      height: 270px;
      background-image: url('https://ustatic.joymew.com/joymewMp/zshl/qilin.png');
    }
    .avatarBox {
      left: 30vw;
      top: 14vw;
    }
    .userTInfo {
      left: 44vw;
      top: 13vw;
      width: 35vw;
    }
  }
  &.move {
    animation-name: moveAni;
    animation-duration: 10s;
    animation-timing-function: linear;
  }
  @keyframes moveAni {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-2000px);
    }
  }
}
</style>
