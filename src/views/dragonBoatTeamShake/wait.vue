<template>
  <!-- 赛龙舟(团队)等待 -->
  <div class="wait publicVCenter">
    <img
      src="@/assets/image/dragonBoatTeamShake/boatAni.gif"
      class="boatAni"
    />
    <div class="waitTip">
      等待主持人开始赛龙舟...
    </div>
  </div>
</template>
<script>

export default {
  name: 'DragonBoatTeamShakeWait',
  components: {},
  data() {
    return {
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.wait::v-deep {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/image/dragonBoatTeamShake/gameBg.png);
  background-size: cover;
  position: relative;
  flex-direction: column;
  .boatAni {
    position: absolute;
    width: 250px;
    height: 140px;
    top: 350px;
  }
  .waitTip {
    font-size: 48px;
    color: #fff;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 650px;
  }
}
</style>
