<template>
  <div
    class="host-style publicVCenter"
    @click="toHostStyle"
  >
    <img
      :src="avatar"
      class="avatar"
    />
    <img
      src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
      class="text"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { checkPermission, jumpToHostStyle } from './func';

export default {
  computed: {
    ...mapState({
      avatar: (state) => state.user.emceeInfo.avatar,
    }),
  },
  methods: {
    toHostStyle() {
      // validate
      if (!checkPermission()) {
        return;
      }
      // action
      jumpToHostStyle();
    },
  },
};
</script>

<style lang="less" scoped>
.host-style {
  flex-direction: column;
  .avatar {
    width: 85px;
    height: 85px;
    border: 2px solid #ffffff;
    border-radius: 50%;
  }
  .text {
    width: 102px;
  }
}
</style>
