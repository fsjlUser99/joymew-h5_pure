<template>
  <div class="rateStar publicHvCenter">
    <div
      v-for="item in stars"
      :key="item"
      class="rateStarItem"
    >
      <img
        v-if="rate < item"
        v-tap="{ methods: setRate, p: item }"
        class="star-icon"
        src="@/assets/image/hd2/unstar.png"
      />
      <img
        v-if="rate >= item"
        v-tap="{ methods: setRate, p: item }"
        class="star-icon"
        src="@/assets/image/hd2/star.png"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'RateStar',
  props: {
    rate: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 0,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      stars: [1, 2, 3, 4, 5],
    };
  },
  created() {},
  methods: {
    setRate(e) {
      if (!this.edit) {
        return;
      }
      this.$emit('change', e.p);
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.rateStar {
  .rateStarItem {
    .star-icon {
      width: 42px;
      height: 42px;
      margin-left: 12px;
    }
  }
}
</style>
