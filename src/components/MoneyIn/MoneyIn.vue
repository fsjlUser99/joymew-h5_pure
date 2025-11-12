<template>
  <transition
    enter-active-class="slideInDown faster animated"
    leave-active-class="slideOutUp faster animated"
    @after-leave="onLeave"
  >
    <div class="moneyIn" v-show="showAni">
      <div class="origin">微信支付</div>
      <div class="tip">
        <label>{{ money }}</label
        >元现金红包已发送到您的微信零钱
      </div>
      <img
        src="https://ustatic.joymew.com/joymewH5/img/wechatIcon.png"
        class="wechatPayIcon"
      />
    </div>
  </transition>
</template>

<script>
import { timeoutTask } from '@/utils/index';
import createjs from 'createjs-cmd';

export default {
  name: 'MoneyIn',
  data() {
    return {
      showAni: false,
    };
  },
  methods: {
    show() {
      this.showAni = true;
      createjs.Sound.play('moneyIn');
      timeoutTask(() => {
        this.showAni = false;
      }, 2000);
    },
    destroySelf() {
      console.log('销毁MoneyIn');
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    onLeave() {
      this.destroySelf();
    },
  },
  mounted() {
    this.show();
  },
};
</script>

<style lang="less" scoped>
.moneyIn {
  width: 680px;
  height: 166.18px;
  background: #fefefe;
  border-radius: 17.49px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 540px 1fr;
  grid-template-areas:
    "origin wechatPayIcon"
    "tip wechatPayIcon";
  position: fixed;
  top: 20px;
  left: 35px;
  z-index: 9999;
  align-items: center;
  column-gap: 10px;
  .origin {
    font-size: 30.61px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    grid-area: origin;
    padding-left: 34px;
    padding-top: 20px;
  }
  .tip {
    font-size: 31px;
    font-weight: 600;
    color: #333333;
    grid-area: tip;
    padding-left: 34px;
    padding-bottom: 20px;
    label {
      color: #ff457a;
      font-size: 43px;
    }
  }
  .wechatPayIcon {
    width: 104.96px;
    height: 104.96px;
    grid-area: wechatPayIcon;
  }
}
</style>
