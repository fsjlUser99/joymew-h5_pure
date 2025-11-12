<template>
  <div
    class="reserve-btn-wrap"
    :style="styleObj"
    :class="[{ enter: enter }]"
  >
    <transition
      enter-active-class="slideInUp faster animated"
      leave-active-class="slideOutDown faster animated"
    >
      <div class="btn-wrap">
        <div
          v-if="phone"
          class="phoneCall"
        >
          <img
            src="@/assets/image/hotelReserve/phoneIcon.png"
            class="phoneIcon"
          />
          <div class="phoneNum">
            电话
          </div>
          <a :href="phone" />
        </div>
        <div
          v-show="visible"
          class="reserve-btn"
          @click="showReseveModal"
        >
          立即预定
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ReserveBtn',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    entry: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      bottom: (state) => state.app.bottom,
      enter: (state) => state.app.enter,
    }),
    styleObj() {
      if (!this.visible) {
        return {};
      }
      return {
        height: `${(Number(this.bottom) + 96) * 0.133333}vw`,
      };
    },
  },
  methods: {
    showReseveModal() {
      this.$emit('show', {});
    },
  },
};
</script>

<style scoped lang="less">
.reserve-btn-wrap {
  position: fixed;
  width: 750px;
  bottom: 0px;
  left: 0;
  z-index: 10;
  background-color: #ffffff;
  box-sizing: content-box;
  padding-top: 26px;
  &.enter {
    transform: translateY(-98px);
  }
  .btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .reserve-btn {
      width: 495px;
      height: 76px;
      background: #ff457a;
      border-radius: 8px;
      font-size: 32px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .phoneCall {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;

      .phoneIcon {
        width: 32px;
        height: 32px;
        margin-bottom: 4px;
      }
      .phoneNum {
        font-size: 18px;
      }

      a {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
