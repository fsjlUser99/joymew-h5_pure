<template>
  <!-- 摇一摇等待 -->
  <div class="wait">
    <div class="title" />
    <div class="wait-tip">等待游戏开始</div>
    <addScoreTool v-if="mpType" toolStyle="moneyTreeStyle" class="playFireworksAddScoreTool"/>
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
  background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/db-bg.png);
  background-size: 100% auto; /* 宽度100%，高度自动 */
  background-repeat: no-repeat;
  background-position: top center; /* 顶部居中 */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #DF0808;

  .title {
    background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/game-title.png);
    background-size: 100% 100%;
    width: 709px;
    height: 174px;
    margin-top: 32px;
  }

  .wait-tip {
    position: absolute;
    bottom: 560px;
    width: 396px;
    height: 106px;
    line-height: 106px;
    font-weight: 500;
    font-size: 37px;
    text-align: center;
    color: #FFFFFF;
    background-size: 100% 100%;
    background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/wait-tip_box.png);
  }
  .playFireworksAddScoreTool {
    ::v-deep .tools-list {
      .tool-item {
        .price {
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
