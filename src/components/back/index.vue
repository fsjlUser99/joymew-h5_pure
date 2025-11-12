<template>
  <div
    v-tap="{methods: handleBack}"
    class="back publicHvCenter"
  >
    <img src="@/assets/image/hd2/returnWhite.png" />
  </div>
</template>
<script>
export default {
  name: 'Back',
  mounted() {},
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.back {
  position: fixed;
  width: 60px;
  height: 60px;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  border-radius: 50%;
  margin: 0;
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
