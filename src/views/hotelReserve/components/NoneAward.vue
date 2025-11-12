<template>
  <div
    class="none-award-dialog"
    @click.prevent.stop
  >
    <div class="dialog-container">
      <img
        v-if="type === '2'"
        class="light"
        src="~@/assets/image/hlt/choujiang/light.png"
        alt=""
      />
      <img
        v-if="type === '3'"
        src="~@/assets/image/hlt/choujiang/none-award.png"
        alt=""
        class="banner-img"
      />
      <img
        v-else-if="type === '2'"
        src="~@/assets/image/hlt/choujiang/fail-get.png"
        alt=""
        class="banner-img2"
      />
      <div class="tip">
        {{ type === '2' ? '很遗憾！您与奖品擦肩而过' : '奖品被领完啦，下次来早点哦～' }}
      </div>
      <div
        v-tap="{ methods: closeHandler }"
        class="sure-btn"
      >
        我知道了
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoneAward',
  props: {
    type: {
      type: String,
      default: '2',
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    closeHandler() {
      this.$emit('close', this.$props.type);
    },
  },
};
</script>

<style lang="less" scoped>
.none-award-dialog {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  .dialog-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .light {
      width: 596px;
      height: 722px;
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .banner-img {
      width: 436px;
      height: 532px;
    }
    .banner-img2 {
      width: 526px;
      height: 422px;
    }
    .tip {
      margin-top: 106px;
      color: #ffffff;
      font-size: 40px;
      font-weight: bold;
    }
    .sure-btn {
      width: 416px;
      height: 96px;
      margin-top: 206px;
      background-image: linear-gradient(103deg, #ff825e 0%, #ff6c87 100%, #f24ebd 100%);
      border-radius: 92px;
      color: #ffffff;
      line-height: 96px;
      text-align: center;
      font-size: 34px;
      font-weight: bold;
      letter-spacing: 2px;
    }
  }
}
</style>
