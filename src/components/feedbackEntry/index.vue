<template>
  <div
    v-tap="{methods: toFeedback}"
    class="feedbackEntry publicVCenter"
  >
    <img
      src="@/assets/image/rechargeWedding/kefuIcon.png"
      class="kefuIcon"
    />
    反馈投诉
  </div>
</template>
<script>
export default {
  name: 'FeedbackEntry',
  mounted() {},
  methods: {
    toFeedback() {
      this.$router.push({
        path: '/feedback',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.feedbackEntry {
  width: 147px;
  height: 58px;
  background-color: rgba(0, 0, 0, 0.6);
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  position: fixed;
  top: 20px;
  right: 0;
  font-size: 24px;
  color: #ffe2ce;
  padding: 0 8px 0 13px;
  z-index: 9999;
  .kefuIcon {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
}
</style>
