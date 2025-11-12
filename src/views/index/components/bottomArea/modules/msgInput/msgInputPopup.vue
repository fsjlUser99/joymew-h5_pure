<template>
  <div
    class="msg-input_popup"
    data-prop="closePopup"
    @click="closePopup"
  >
    <div
      class="content-wrap"
      :class="sceneClassName"
    >
      <!-- 快捷用语选择 -->
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
              @click="chooseWish(wish)"
            >
              <span class="wish-text">{{ wish }}</span>
            </div>
          </div>
        </vue-scroll>
      </div>
      <!-- 消息输入框 -->
      <div class="msg-input_box publicVCenter">
        <img
          src="@/assets/image/hd2/messageIcon.png"
          class="msg-input_icon"
        />
        <input
          type="text"
          v-model="message"
          class="msg-input_input"
          ref="inputRef"
          placeholder="送上祝福..."
          maxlength="25"
          :readonly="inputReadonly"
          @keydown="onKeydown"
        />
        <div
          class="send-btn publicHvCenter"
          :class="{ active: message.length > 0 }"
          @click="sendMessage"
        >
          发送
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { timeoutTask } from '@/utils/index';
import { generateDefaultWishes, getSceneClassName, getWishes } from '../../quickWishFunc';

export default {
  data() {
    return {
      message: '',
      wishes: [],
    };
  },
  computed: {
    ...mapState({
      isExamineLive: (state) => state.live.isExamineLive,
      isForbidSend: (state) => state.live.isForbidSend,
    }),
    inputReadonly() {
      return this.isExamineLive || this.isForbidSend;
    },
  },
  props: {
    sceneClassName: {
      type: String,
      default: '',
    },
  },
  methods: {
    autoFocus() {
      this.message = '';
      this.initWishes();
      timeoutTask(() => {
        this.$refs.inputRef.focus();
      }, 300);
    },
    closePopup(e) {
      if (e?.target?.dataset?.prop === 'closePopup') {
        this.$emit('update:inputPopupVisible', false);
      } else if (e === 'clearMessage') {
        this.message = '';
        this.$emit('update:inputPopupVisible', false);
      }
    },
    initWishes() {
      // 得到版本类名
      this.sceneClassName = getSceneClassName(this.$store.state.live.sceneType);
      // 得到版本类名对应的默认祝福语
      const defaultWishes = generateDefaultWishes(this.sceneClassName);
      // 根据默认祝福语和自定义祝福语得到最终的祝福语列表
      const { customSignWish } = this.$store.state.live;
      this.wishes = getWishes(defaultWishes, customSignWish);
    },
    chooseWish(wish) {
      this.message = wish;
    },
    sendMessage() {
      if (this.message.length > 0) {
        this.$emit('messageSend', this.message);
      }
    },
    onKeydown(e) {
      if (e.keyCode === 13) {
        this.sendMessage();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.msg-input_popup {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  .content-wrap {
    background: linear-gradient(135deg, #183a6a, #1351a3);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-top: 40px;
    padding: 40px 20px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    .quick-danmu {
      height: 69px;
      width: 100%;
      position: relative;
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
      &.birth,
      &.bby,
      &.sy,
      &.crl,
      &.bly,
      &.myy,
      &.bydl,
      &.xsy,
      &.jbtm,
      &.txh,
      &.qqy,
      &.hx,
      &.wl {
        .danmu-item {
          border: 1px solid #fff;
        }
      }
    }
    .msg-input_box {
      height: 72px;
      background-color: rgba(0, 0, 0, 0.19);
      border-radius: 36px;
      padding-left: 24px;
      padding-right: 14px;
      .msg-input_icon {
        width: 36px;
        height: 36px;
        margin-right: 20px;
      }
      .msg-input_input {
        width: 75%;
        outline: none;
        border: none;
        background-color: transparent;
        color: #fff;
        font-size: 25px;
        &::placeholder {
          color: #fff;
        }
      }
      .send-btn {
        width: 100px;
        height: 45px;
        font-size: 24px;
        color: rgba(255, 255, 255, 0.6);
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 34px;
        margin-left: 20px;
        &.active {
          background-color: #e4156a;
          color: #fff;
        }
      }
    }
    &.annualMeeting,
    &.zshl {
      background: #e25741;
      .msg-input_box {
        height: 80px;
        background-color: unset;
        background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/inputBg.png');
        background-size: 100% 100%;
        border-radius: unset;
        .msg-input_input {
          color: #954242;
          &::placeholder {
            color: #954242;
          }
        }
        .send-btn.active {
          background: #e25741;
        }
      }
    }
    &.zshl {
      background-color: rgba(255, 69, 60, 1);
      border-top: 1.8px solid rgba(254, 215, 104);
    }
    &.birth {
      background: #81a4ff;
    }
    &.bby,
    &.bly,
    &.myy {
      background: #fe91b0;
    }
    &.sy {
      background: #8a0101;
    }
    &.crl {
      background: #42b7c9;
    }
    &.bydl {
      background: #58d297;
    }
    &.xsy {
      background: #f23c4c;
    }
    &.jbtm {
      background: #ff7d89;
    }
    &.txh {
      background: #2c3032;
    }
    &.qqy {
      background: #f97673;
    }
    &.hx,
    &.wl {
      background: #84c0e7;
    }
  }
}
</style>
