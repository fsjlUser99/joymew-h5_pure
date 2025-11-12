<template>
  <!-- 数钞票等待 -->
  <div class="wait">
    <img
      src="@/assets/image/dragonPlayBead/wait-bg.webp"
      class="bg"
    />
    <div class="waitTip">等待主持人开始游戏</div>
    <addScoreTool v-if="mpType" />
  </div>
</template>
<script>
import addScoreTool from '@/components/addScoreTool/index.vue';

export default {
  name: 'CountMoneyWait',
  components: {
    addScoreTool,
  },
  computed: {
    mpType() {
      return this.$store.state.app.mpType;
    },
  },
};
</script>
<style lang="less" scoped>
.wait {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    object-fit: cover;
    object-position: top;
  }
  .waitTip {
    position: absolute;
    top: 720px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 40px;
    font-weight: bold;
    color: #73212b;

    &::after {
      content: '';
      position: absolute;
      left: 102%;
      animation: 1.8s linear infinite ellipsis;
      @keyframes ellipsis {
        0% {
          content: '';
        }

        25% {
          content: ' .';
        }

        50% {
          content: ' ..';
        }

        75% {
          content: ' ...';
        }

        100% {
          content: ' ';
        }
      }
    }
  }
}
</style>
