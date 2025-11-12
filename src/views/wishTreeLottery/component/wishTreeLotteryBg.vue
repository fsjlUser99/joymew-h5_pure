<template>
  <div class="wish-tree-bg">
    <div
      class="bg-image"
      :style="{ backgroundImage: `url(${bgImage})` }"
    />
  </div>
</template>

<script>
export default {
  name: 'WishTreeLotteryBg',
  props: {
    bgImage: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.wish-tree-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  .bg-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
