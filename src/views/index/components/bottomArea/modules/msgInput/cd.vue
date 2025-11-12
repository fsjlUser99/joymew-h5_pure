<template>
  <div class="cd-box" :class="sceneClassName">
    <img
      src="@/assets/image/hd2/messageIcon.png"
      class="msg-icon"
      v-if="!isCd"
    />
    <div
      class="cd"
      v-else
    >
      {{ cdTime }}s
    </div>
  </div>
</template>

<script>
const CD_TIME = 5;
export default {
  props: {
    isCd: Boolean,
    sceneClassName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cdTime: CD_TIME,
    };
  },
  watch: {
    isCd(newVal) {
      if (newVal) {
        this.startCd();
      }
    },
  },
  methods: {
    startCd() {
      this.cdTime = CD_TIME;
      this.timer = setInterval(() => {
        this.cdTime--;
        if (this.cdTime === 0) {
          this.$emit('update:isCd', false);
          clearInterval(this.timer);
        }
      }, 1000);
    },
    tipCd() {
      this.$toast.center(`${this.cdTime}s后可继续发送弹幕`);
    },
  },
};
</script>

<style lang="less" scoped>
.cd-box {
  line-height: 0;
  width: 40px;
  .msg-icon {
    width: 36px;
    height: 36px;
  }
  .cd {
    color: #fff;
    font-size: 28px;
  }
  &.annualMeeting,&.zshl {
    .cd {
        color: #954242;
    }
  }
}
</style>
