<template>
  <!-- 谁最牛等待 -->
  <div class="wait">
    <div class="tree" />
    <div class="cattle" />
    <div class="title">谁最牛</div>
    <addScoreTool v-if="mpType" />
  </div>
</template>
<script>
import addScoreTool from '@/components/addScoreTool/index.vue';

export default {
  name: 'CattleShakeWait',
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
  background-image: url(~@/assets/image/shake/cattle/bg.png);
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cb0100;
  position: relative;
  .cattle {
    width: 642px;
    height: 609px;
    background-image: url(~@/assets/image/shake/cattle/cattle.png);
    background-size: 100% 100%;
    bottom: 0;
    left: 0;
    position: absolute;
  }
  .tree {
    width: 721px;
    height: 908px;
    background-image: url(~@/assets/image/shake/cattle/tree.png);
    background-size: 100% 100%;
    bottom: 0px;
    left: 0px;
    position: absolute;
    z-index: 1;
  }
  .title {
    font-size: 108px;
    color: #f9d67e;
    font-weight: 400;
    position: absolute;
    top: 200px;
  }
}
</style>
