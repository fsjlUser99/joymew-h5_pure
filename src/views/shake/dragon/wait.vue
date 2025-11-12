<template>
  <!-- 摇一摇等待 -->
  <div class="wait publicVCenter">
    <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/dragon/gameTitle.png"
      alt="标题"
      class="gameTitle"
    />
    <div class="shakeTipBox publicHvCenter">
      <div class="innerBox">
        <img
          src="https://static.hudongmiao.com/joymewH5/img/shake/v2/shakeHand.png"
          alt="摇一摇手"
          class="shakeHand"
        />
      </div>
    </div>
    <!-- <img
      src="https://static.hudongmiao.com/joymewH5/img/shake/dragon/bottomDeco.png"
      alt="底部装饰"
      class="bottomDeco"
    /> -->
    <div class="waitTip">等待游戏开始...</div>
    <addScoreTool v-if="mpType" />
  </div>
</template>
<script>
import addScoreTool from '@/components/addScoreTool/index.vue';

export default {
  name: 'ShakeWait',
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
  background-image: url(https://static.hudongmiao.com/joymewH5/img/shake/dragon/bg.png);
  background-size: 100% 100%;
  flex-direction: column;
  .gameTitle {
    width: 698.08px;
    height: 121.15px;
    margin-top: 134.34px;
  }
  .shakeTipBox {
    margin-top: 29.12px;
    width: 542.31px;
    height: 542.31px;
    background-position: 50% 50%;
    background-size: 100% 100%;
    background-image: url('https://static.hudongmiao.com/joymewH5/img/shake/v2/yellowRound.png');
    padding: 10px;
    .innerBox {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      .shakeHand {
        width: 542.31px;
        height: 542.31px;
      }
    }
  }
  .bottomDeco {
    width: 750px;
    height: 569.23px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .waitTip {
    position: absolute;
    top: 820px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
    letter-spacing: 2px;
    z-index: 2;
  }
}
</style>
