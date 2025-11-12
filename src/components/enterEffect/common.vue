<template>
  <!-- 普通用户进场动画 -->
  <transition
    enter-active-class="slideInRight faster animated"
    leave-active-class="slideOutLeft faster animated"
  >
    <div
      v-show="showAniStart"
      class="commonWrap publicVCenter"
    >
      <img
        src="@/assets/image/hd2/touXiang.png"
        class="touXiangIcon"
      />
      欢迎 {{ nameDisplay }} 进入互动
    </div>
  </transition>
</template>
<script>
import { timeoutTask } from '@/utils/index';

export default {
  name: 'CommonEffect',
  data() {
    return {
      name: '',
      headImg: '',
      time: 3,
      showAniStart: false,
      Observer: null,
      danmuType: '',
    };
  },
  computed: {
    nameDisplay() {
      return this.name.length > 10 ? `${this.name.slice(0, 10)}...` : this.name;
    },
  },
  watch: {},
  beforeDestroy() {},
  mounted() {
    this.showAniStart = true;
    timeoutTask(() => {
      this.showAniStart = false;
      this.Observer.ended = true;
    }, parseFloat(this.time, 10) * 1000);
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.commonWrap {
  position: absolute;
  left: 20px;
  top: 578px;
  width: 490px;
  height: 60px;
  background: linear-gradient(270deg, rgba(23, 52, 95, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%);
  border-radius: 30px;
  padding-left: 26px;
  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
  .touXiangIcon {
    width: 32px;
    height: 32px;
    margin-right: 16px;
  }
}
</style>
