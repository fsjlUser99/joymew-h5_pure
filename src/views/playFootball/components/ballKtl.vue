<template>
  <!-- 卡塔尔足球 -->
  <img
    class="ballKtl"
    :src="ballPath"
  />
</template>
<script>
const BALLS = [
  require('../../../assets/image/playFootball/ball/0.png'),
  require('../../../assets/image/playFootball/ball/1.png'),
  require('../../../assets/image/playFootball/ball/2.png'),
  require('../../../assets/image/playFootball/ball/3.png'),
  require('../../../assets/image/playFootball/ball/4.png'),
  require('../../../assets/image/playFootball/ball/5.png'),
  require('../../../assets/image/playFootball/ball/6.png'),
  require('../../../assets/image/playFootball/ball/7.png'),
  require('../../../assets/image/playFootball/ball/8.png'),
  require('../../../assets/image/playFootball/ball/9.png'),
  require('../../../assets/image/playFootball/ball/10.png'),
  require('../../../assets/image/playFootball/ball/11.png'),
  require('../../../assets/image/playFootball/ball/12.png'),
];

export default {
  name: 'BallKtl',
  props: {
    ani: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      ballPath: '',
    };
  },
  computed: {},
  watch: {
    ani(newVal) {
      if (newVal) {
        // 执行动画
        this.aniStart();
      } else {
        // 停止动画
        this.aniStop();
      }
    },
  },
  beforeDestroy() {},
  created() {
    this.tmpIndex = 0;
    this.ballPath = BALLS[this.tmpIndex];
  },
  mounted() {},
  methods: {
    aniStart() {
      this.ballRender();
    },
    ballRender() {
      console.log('render ball');
      this.tmpIndex += 1;
      if (this.tmpIndex > 12) {
        this.tmpIndex = 0;
      }
      this.ballPath = BALLS[this.tmpIndex];
      this.timer = requestAnimationFrame(this.ballRender);
    },
    aniStop() {
      cancelAnimationFrame(this.timer);
      this.tmpIndex = 0;
      this.ballPath = BALLS[this.tmpIndex];
    },
  },
};
</script>

  <style lang="less" scoped>
.ballKtl {
  width: 20vw;
  height: 20vw;
  position: absolute;
  top: -2vw;
  left: -2vw;
}
</style>
