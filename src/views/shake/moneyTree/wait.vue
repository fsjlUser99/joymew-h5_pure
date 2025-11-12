<template>
  <!-- 摇一摇等待 -->
  <div class="wait">
    <!-- 背景顶部的两个灯笼 -->
    <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/lanterns.png" alt="" class="lanterns lanterns1" />
    <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/lanterns.png" alt="" class="lanterns lanterns2" />
    <!-- 标题 -->
    <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/wait-title.png" alt="" class="wait-title" />
    <!-- 金树 -->
    <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/money-tree.png" alt="" class="golden-tree" />
    <!-- 游戏开始的提示 -->
    <img src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/wait-tip-new.png" alt="" class="wait-tip" />
    <addScoreTool v-if="mpType" toolStyle="moneyTreeStyle"/>
  </div>
</template>
<script>
import addScoreTool from '@/components/addScoreTool/index.vue';
import { mapState } from 'vuex';

export default {
  name: 'ShakeWait',
  components: {
    addScoreTool,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      mpType: (state) => state.app.mpType,
    }),
  },
  created() { },
  mounted() { },
  methods: {},
  beforeCreated() { },
};
</script>
<style lang="less" scoped>
.wait {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/wait-bg.png);
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FF5226;
  .lanterns {
    position: absolute;
    width: 88px;
    height: 224px;
    top: 0;
    &.lanterns1 {
      left: 0;
    }
    &.lanterns2 {
      right: 0;
    }
  }
  .wait-title {
    width: 626px;
    height: 288px;
    margin-top: 22px;
    position: relative;
  }
  .golden-tree {
    width: 744px;
    height: 675px;
    margin-top: -100px;
    position: relative;
  }
  .wait-tip {
    width: 424px;
    height: 126px;
    margin-top: -40px;
    position: relative;
  }
}

@media (max-height: 845px) {
  .wait-tip {
    display: none !important;
  }
}

@media (max-height: 700px) {
  .golden-tree {
    display: none !important;
  }
}
</style>
