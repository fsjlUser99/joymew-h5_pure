<template>
  <div
    class="quick-danmu"
    :class="sceneClassName"
  >
    <vue-scroll :ops="{ scrollPanel: { scrollingX: true, scrollingY: false, speed: 600, easing: 'ease' }, bar: { opacity: 0 } }">
      <div class="content">
        <div
          class="danmu-item"
          v-for="(wish, index) in wishes"
          :key="index"
          @click="sendWish(wish)"
        >
          <span class="wish-text">{{ wish }}</span>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import { sendChatMessage } from '@/api/chat/index';
import { generateDefaultWishes, getSceneClassName, getWishes } from '../quickWishFunc';

export default {
  data() {
    return {
      wishes: [],
      sceneClassName: '',
    };
  },
  methods: {
    initData() {
      // 得到版本类名
      this.sceneClassName = getSceneClassName(this.$store.state.live.sceneType);
      // 得到版本类名对应的默认祝福语
      const defaultWishes = generateDefaultWishes(this.sceneClassName);
      // 根据默认祝福语和自定义祝福语得到最终的祝福语列表
      const { customSignWish } = this.$store.state.live;
      this.wishes = getWishes(defaultWishes, customSignWish);
    },
    async sendWish(wish) {
      try {
        this.$loading('发送中...');
        await sendChatMessage(wish, 0);
        this.wishes = this.wishes.filter((item) => item !== wish);
        this.$loading.close();
      } catch (err) {
        console.log(err);
        this.$loading.close();
        this.$toast.center('发送祝福语失败，请稍后再试!');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.quick-danmu {
  height: 69px;
  width: 100%;
  position: absolute;
  left: 0;
  top: -69px;
  border-radius: 24px 24px 0 0;
  .content {
    white-space: nowrap;
    .danmu-item {
      font-size: 20px;
      color: #ffffff;
      align-items: center;
      margin: 0px 20px;
      display: inline-block;
      border-radius: 27px;
      padding: 4px;
    }
  }
  &.wedding,
  &.dhy {
    .danmu-item {
      background: linear-gradient(135deg, #ee9bff, #5560f5);
      .wish-text {
        display: block;
        border-radius: 27px;
        background: linear-gradient(135deg, #183a6a, #1351a3);
        padding: 4px 12px;
      }
    }
  }
  &.zshl {
    .danmu-item {
      background: #2c0f08;
      height: 48px;
      border-radius: 10px;
      line-height: 48px;
      padding: 0 20px;
    }
  }
  &.annualMeeting {
    .danmu-item {
      background: #312516;
      border-radius: 10px;
      padding: 5px 12px;
    }
  }
  &.birth {
    .danmu-item {
      background: #81a4ff;
    }
  }
  &.bby,
  &.bly,
  &.myy {
    .danmu-item {
      background: #fe91b0;
    }
  }
  &.sy {
    .danmu-item {
      background: #8a0101;
    }
  }
  &.crl {
    .danmu-item {
      background: #42b7c9;
    }
  }
  &.bydl {
    .danmu-item {
      background: #58d297;
    }
  }
  &.xsy {
    .danmu-item {
      background: #f23c4c;
    }
  }
  &.jbtm {
    .danmu-item {
      background: #ff7d89;
    }
  }
  &.txh {
    .danmu-item {
      background: #2c3032;
    }
  }
  &.qqy {
    .danmu-item {
      background: #f97673;
    }
  }
  &.hx,
  &.wl {
    .danmu-item {
      background: #84c0e7;
    }
  }
}
</style>
