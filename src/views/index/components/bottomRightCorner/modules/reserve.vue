<template>
  <div class="reserve publicHCenter" @click="toReserve">
    <img
      :src="hotelReserveIcon"
      class="reserve-icon"
      v-if="hotelReserveIcon"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { checkPermission, jumpToReserve } from './func';

export default {
  computed: {
    ...mapState({
      hotelReserveIcon: (state) => state.app.hotelReserveIcon,
    }),
  },
  methods: {
    toReserve() {
      // validate
      if (!checkPermission()) {
        return;
      }
      // action
      jumpToReserve();
    },
  },
};
</script>

<style lang="less" scoped>
.reserve-icon {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style>
