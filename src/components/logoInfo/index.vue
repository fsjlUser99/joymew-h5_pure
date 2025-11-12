<template>
  <!-- logo信息 -->
  <div
    v-if="logoInfo.logoPath && isTql"
    class="logoArea publicVCenter"
    :class="[locat, {shade: needShade}]"
  >
    <img
      :src="logoInfo.logoPath"
      class="logoImg"
      :style="{ width: logoInfo.logoSize * 0.13 + 'vw' }"
    />
    <!-- <label :style="{ fontSize: logoInfo.fontSize * 0.13 + 'vw', color: logoInfo.fontColor }" v-if="logoInfo.name">{{
      logoInfo.name
    }}</label> -->
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'LogoInfo',
  computed: {
    ...mapState({
      logoInfo: (state) => state.game.logoInfo,
    }),
    ...mapGetters({
      isTql: 'user/isTql',
    }),
  },
  props: {
    locat: {
      type: String,
      default: 'left',
    },
    needShade: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.logoArea {
  position: absolute;
  top: 0;
  z-index: 1;
  padding: 10px 20px;
  border-bottom-left-radius: 20px;
  .logoImg {
    width: 120px;
  }
  label {
    font-weight: 400;
    margin-left: 12px;
  }
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
  &.shade {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
