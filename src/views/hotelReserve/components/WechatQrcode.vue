<template>
  <div
    class="dialog-container"
    @click.prevent.stop
  >
    <div class="wechat-qrcode_dialog">
      <img
        :src="qrcodePath"
        class="qrcode"
      />
      <img
        v-tap="{ methods: closeHandler }"
        class="close-btn"
        src="~@/assets/image/hlt/choujiang/close-icon.png"
      />
    </div>
  </div>
</template>

<script>
import { reqGetHostProfile } from '@/api/hotelReserve/index';

export default {
  name: 'wechatQrcodeDialog',
  data() {
    return {
      qrcodePath: '',
    };
  },
  created() {
    reqGetHostProfile().then((res) => {
      console.log('主持人信息:', res);
      this.qrcodePath = res.wx_qr_code;
    });
  },
  mounted() {},
  methods: {
    closeHandler() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-container {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  .wechat-qrcode_dialog {
    width: 628px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .qrcode {
      width: 450px;
      height: 450px;
    }
    .close-btn {
      width: 64px;
      height: 64px;
      margin-top: 56px;
    }
  }
}
</style>
