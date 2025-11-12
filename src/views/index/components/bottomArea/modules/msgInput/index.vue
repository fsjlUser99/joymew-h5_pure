<template>
  <div
    class="msg-input_wrap"
    :class="sceneClassName"
  >
    <div
      class="input-short"
      @click="openMsgInputPopup"
    >
      <cd
        v-bind:isCd.sync="isCd"
        :sceneClassName="sceneClassName"
        ref="cdRef"
      />
      <div class="tip">送上祝福...</div>
    </div>
    <!-- 发消息弹窗 -->
    <msgInputPopup
      :sceneClassName="sceneClassName"
      v-bind:inputPopupVisible.sync="inputPopupVisible"
      ref="inputPopupRef"
      v-show="inputPopupVisible"
      @messageSend="onMessageSend"
    />
  </div>
</template>

<script>
import { sendChatMessage, securityMsgCheck } from '@/api/chat/index';
import cd from './cd.vue';
import msgInputPopup from './msgInputPopup.vue';
import { getSceneClassName } from '../../quickWishFunc';

export default {
  components: {
    cd,
    msgInputPopup,
  },
  data() {
    return {
      isCd: false,
      inputPopupVisible: false,
      sceneClassName: '',
    };
  },
  methods: {
    initData() {
      this.sceneClassName = getSceneClassName(this.$store.state.live.sceneType);
    },
    openMsgInputPopup() {
      if (this.isCd) {
        this.$refs.cdRef.tipCd();
      } else {
        this.inputPopupVisible = true;
        // 输入框自动聚焦
        this.$refs.inputPopupRef.autoFocus();
      }
    },
    async validateMessage(message) {
      if (this.$store.state.user.isForbidBuyHbq) {
        return false;
      }
      if (this.$store.state.live.isLocationInvalid) {
        this.$toast.center(this.$store.state.live.locationInvalidReason);
        return false;
      }
      if (this.isMessageNeedSecurityCheck(message)) {
        const securityChekRes = await securityMsgCheck(message);
        const tmpSecCheckResult = JSON.parse(securityChekRes.msg_sec_check);
        if (tmpSecCheckResult.result.suggest === 'pass') {
          return true;
        }
        this.$toast.center('内容非法!');
        return false;
      }
      return true;
    },
    isMessageNeedSecurityCheck(message) {
      return !this.$store.state.live.noMsgSeckCheckList.includes(message);
    },
    async onMessageSend(message) {
      try {
        this.$loading('发送中...');
        const validateResult = await this.validateMessage(message);
        if (validateResult) {
          await sendChatMessage(message, 0);
          this.isCd = true;
        }
        this.$refs.inputPopupRef.closePopup('clearMessage');
        this.$loading.close();
      } catch (err) {
        console.log(err);
        this.$loading.close();
        this.$toast.center('消息发送失败，请稍后再试！');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.msg-input_wrap {
  width: 292px;
  height: 72px;
  background: rgba(0, 0, 0, 0.19);
  border-radius: 36px;
  padding-left: 24px;
  padding-right: 14px;
  position: relative;
  .input-short {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .tip {
      font-size: 20px;
      color: #fff;
      margin-left: 20px;
    }
    &::after {
      content: '';
      display: block;
      width: 2px;
      height: 32px;
      background-color: rgba(251, 213, 111, 0.3);
      position: absolute;
      left: 68px;
    }
  }
  &.annualMeeting,&.zshl {
    background: none;
    background-image: url(https://static.hudongmiao.com/joymewH5/img/enterprise/inputBg.png);
    background-size: 100% 100%;
    width: 435px;
    height: 80px;
    border-radius: unset;
    .tip {
      color: #954242;
    }
  }
}
</style>
