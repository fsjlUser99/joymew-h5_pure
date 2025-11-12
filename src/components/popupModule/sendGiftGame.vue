<template>
  <transition
    enter-active-class="slideInUp faster animated"
    leave-active-class="slideOutDown faster animated"
  >
    <div
      v-show="isShowAni"
      class="sendGiftGameModule publicVCenter"
    >
      <div class="sendGiftBox">
        <div class="notify publicHvCenter">
          <img
            src="@/assets/image/hd2/laba.png"
            class="broadIcon"
          />
          <div
            ref="ct"
            class="notifyCt"
          >
            <div
              ref="ctTxt"
              class="notifyText"
            >
              送祝福游戏发送的礼物，全部进入红包口袋，最后将以红包雨游戏返回给各位来宾
            </div>
          </div>
        </div>
        <img
          src="@/assets/image/icon/sendGiftTit.png"
          class="sendGiftTit"
        />
        <div
          ref="giftListDom"
          class="giftList publicHCenter"
        >
          <div
            v-for="item in sendGiftGameList"
            :key="item.giftconst"
            v-tap="{ methods: send, giftconst: item.giftconst }"
            class="giftItem publicVCenter"
          >
            <div class="name publicVCenter">
              {{ item.giftname }}
            </div>
            <img
              class="giftImg"
              :src="item.imglink"
            />
            <div
              v-show="item.giftprice"
              class="price publicHvCenter"
            >
              <img
                src="@/assets/image/icon/diamond.png"
                class="unit"
              />
              {{ item.giftprice }}
            </div>
            <div class="sendBtn publicHvCenter" />
          </div>
        </div>
        <div class="bottomMain publicHCenter">
          <div class="iptArea publicVCenter">
            <img
              src="@/assets/image/icon/msgIcon.png"
              class="msgIcon"
            />
            <input
              ref="inputBox"
              v-model="message"
              class="inputBox"
              type="text"
              placeholder="祝福弹幕/2元"
              maxlength="25"
              @focus="focus"
              @blur="blur"
              @keydown="handleKeyDown"
            />
            <div
              v-tap="{ methods: sendText }"
              class="sendBtn publicHvCenter"
              :class="{ active: message }"
            >
              发送
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex';
import { timeoutTask } from '@/utils/index';
import wxApi from '@/utils/wxApi';

let endBroadAni = false;
let broadAniLock = false;
export default {
  name: 'SendGiftGamePopup',
  components: {},
  watch: {},
  computed: {
    ...mapState({
      sendGiftGameList: (state) => state.game.sendGiftGameList,
    }),
  },
  data() {
    return {
      isShowAni: false,
      message: '',
      sendDanmuVisible: false,
    };
  },
  created() {
    endBroadAni = false;
    broadAniLock = false;
    this.initGiftList();
  },
  beforeDestroy() {
    endBroadAni = true;
    broadAniLock = false;
  },
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  methods: {
    handleKeyDown(e) {
      if (e.keyCode === 13) {
        this.sendText();
      }
    },
    showAniStart() {
      this.isShowAni = true;
      timeoutTask(() => {
        this.$nextTick(() => {
          endBroadAni = false;
          this.broadInnerWidth = this.$refs.ct.offsetWidth * 0.13;
          this.broadContentWidth = this.$refs.ctTxt.offsetWidth * 0.13;
          this.startBroadAni();
        });
      }, 1000);
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    initGiftList() {
      this.$store.dispatch('game/initSendGiftGameList');
    },
    focus() {
      this.sendDanmuVisible = true;
    },
    blur() {
      this.sendDanmuVisible = false;
      timeoutTask(() => {
        this.$refs.giftListDom.scrollTo(0, -1000);
        window.scrollTo(0, document.documentElement.clientHeight);
      }, 200);
    },
    sendText() {
      if (!this.message) {
        this.$toast.center('弹幕内容不能为空!');
        this.$refs.inputBox.blur();
        return;
      }
      if (this.$store.state.app.mpType) {
        wxApi.navigateTo(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&giftText=${this.message}&giftId=text&&origin=sendGiftGame`,
        );
      } else {
        wxApi.navigateTo(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&content=${this.message}&giftconst=text&&origin=sendGiftGame`,
        );
      }

      this.message = '';
    },
    send(e) {
      console.log(e.giftconst);
      if (this.$store.state.app.mpType) {
        wxApi.navigateTo(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&giftId=${e.giftconst}&origin=sendGiftGame`,
        );
      } else {
        wxApi.navigateTo(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&giftconst=${e.giftconst}&origin=sendGiftGame`,
        );
      }
    },
    startBroadAni() {
      if (endBroadAni) {
        return;
      }
      if (broadAniLock) {
        return;
      }
      broadAniLock = true;
      const tmpDistance = this.broadInnerWidth + this.broadContentWidth;
      const tmpDuration = parseInt(tmpDistance / 8, 10);
      if (this.$refs.ctTxt) {
        this.$refs.ctTxt.style.transition = `transform ${tmpDuration}s linear`;
        this.$refs.ctTxt.style.transform = `translate3d(-${tmpDistance}vw,0vw,0vw)`;
      }
      console.log('startBroadAni:', tmpDuration);
      timeoutTask(() => {
        broadAniLock = false;
        if (this.$refs.ctTxt) {
          this.$refs.ctTxt.style.transition = 'none 0s linear 0s';
          this.$refs.ctTxt.style.transform = 'translate3d(0vw,0vw,0vw)';
        }
        timeoutTask(() => {
          this.startBroadAni();
        }, 500);
      }, tmpDuration * 1000);
    },
  },
};
</script>
<style lang="less" scoped>
@import 'vue-swipe/dist/vue-swipe.css';

.sendGiftGameModule {
  position: absolute;
  width: 100%;
  bottom: 0;
  .sendGiftBox {
    width: 750px;
    height: 71vh;
    background: #6b6af4;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    position: relative;
    padding-top: 38px;
    .notify {
      width: 684px;
      height: 70px;
      font-size: 28px;
      font-weight: 400;
      color: #ffffff;
      background-image: url('~@/assets/image/hd2/textBg.png');
      background-size: 100% 100%;
      position: absolute;
      top: -200px;
      left: 34px;
      .broadIcon {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }
      .notifyCt {
        width: 618px;
        height: 40px;
        overflow: hidden;
        position: relative;
        .notifyText {
          position: absolute;
          white-space: nowrap;
          transition-property: transform;
          transition-timing-function: linear;
          left: 0px;
        }
      }
    }
    .sendGiftTit {
      width: 580px;
      height: 112px;
      position: absolute;
      top: -112px;
      left: 86px;
    }
    .giftList {
      flex-wrap: wrap;
      padding-top: 20px;
      height: 55vh;
      overflow-y: scroll;
      .giftItem {
        width: 230px;
        height: 272px;
        background-size: 100% 100%;
        background-image: url('../../assets/image/icon/giftBox.png');
        margin: 0 7px;
        margin-bottom: 110px;
        flex-direction: column;
        position: relative;
        padding-top: 40px;
        .name {
          padding: 0 15px;
          height: 48px;
          background: #db60f1;
          border-radius: 114px;
          font-size: 28px;
          font-weight: 500;
          color: #ffffff;
          position: absolute;
          top: -24px;
        }
        .giftImg {
          width: 120px;
          height: 120px;
        }
        .price {
          margin-top: 1.2vw;
          color: #ffffff;
          font-size: 32px;
          .unit {
            width: 32px;
            height: 25px;
            margin-right: 10px;
          }
        }
        .sendBtn {
          width: 166px;
          height: 76px;
          position: absolute;
          bottom: -80px;
          background-size: 100% 100%;
          background-image: url('../../assets/image/icon/sendGiftGameBtn.png');
        }
      }
    }
    .bottomMain {
      // padding-top: 48px;
      position: fixed;
      bottom: 4vh;
      width: 100%;
      .iptArea {
        width: 710px;
        height: 72px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 36px;
        padding: 0 20px;
        position: relative;
        .msgIcon {
          width: 36px;
          height: 36px;
        }
        .inputBox {
          width: 540px;
          padding: 0 10px 0 10px;
          height: 72px;
          background-color: transparent;
          border-radius: 36px;
          border: none;
          font-size: 32px;
          color: #fff;
          margin-left: 20px;
          outline: none;
          box-sizing: border-box;
          &::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }
        }
        .sendBtn {
          width: 100px;
          height: 45px;
          font-size: 24px;
          color: rgba(255, 255, 255, 0.6);
          background-color: rgba(0, 0, 0, 0.6);
          position: absolute;
          right: 10px;
          border-radius: 34px;
          &.active {
            background-color: #e4156a;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
