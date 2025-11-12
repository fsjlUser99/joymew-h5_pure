<template>
  <!-- 数钞票等待 -->
  <div class="wait">
    <div class="left" />
    <div class="right" />
    <img
      :src="require('@/assets/image/pigOut/tiger-1.png')"
      alt=""
      class="tiger eatAni"
    />
    <div class="waitTip">
      等待主持人开始game...
    </div>
    <addScoreTool v-if="mpType" />
  </div>
</template>
<script>
import addScoreTool from '@/components/addScoreTool/index.vue';

export default {
  name: 'PigOutWait',
  components: {
    addScoreTool,
  },
  data() {
    return {};
  },
  computed: {
    mpType() {
      return this.$store.state.app.mpType;
    },
  },
  created() {},
  mounted() {},
  methods: {},
  beforeCreated() {},
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
  background-color: rgba(0, 0, 0, 0.5);
  .tiger {
    width: 421px;
    height: 322px;
    margin-top: 114px;
  }
  .left {
    width: 285px;
    height: 277px;
    position: absolute;
    top: 0;
    left: 0;
    background-size: 100% 100%;
    background-image: url(~@/assets/image/pigOut/left.png);
  }
  .right {
    width: 285px;
    height: 277px;
    position: absolute;
    top: 0;
    right: 0;
    background-size: 100% 100%;
    background-image: url(~@/assets/image/pigOut/right.png);
  }
  .waitTip {
    font-size: 24px;
    font-size: 30px;
    font-weight: 400;
    color: #fff;
    position: absolute;
    top: 650px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  .eatAni {
    animation-name: eatAni;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  @keyframes eatAni {
    0% {
      transform: translate(0);
    }
    25% {
      transform: translate(15px);
    }
    50% {
      transform: translate(0px);
    }
    75% {
      transform: translate(-15px);
    }
    100% {
      transform: translate(0px);
    }
  }
}
</style>
