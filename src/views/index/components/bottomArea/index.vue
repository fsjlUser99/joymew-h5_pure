<template>
  <div class="bottomArea publicZIndexBottomArea" :class="sceneClassName">
    <quickDanmu ref="quickDanmuRef"/>
    <div class="bottom-wrap">
      <msgInput  ref="msgInputRef" />
      <giftIcons ref="giftIconsRef"/>
    </div>
  </div>
</template>

<script>
import quickDanmu from './modules/quickDanmu.vue';
import msgInput from './modules/msgInput/index.vue';
import giftIcons from './modules/giftIcons/index.vue';
import { getSceneClassName } from './quickWishFunc';

export default {
  name: 'BottomArea',
  components: {
    quickDanmu,
    msgInput,
    giftIcons,
  },
  data() {
    return {
      sceneClassName: '',
    };
  },
  mounted() {
    this.watchDependencyThenInitData();
  },
  methods: {
    /**
     * 监听所依赖的数据有值了，然后初始化子组件数据
     */
    watchDependencyThenInitData() {
      if (this.$store.state.live.sceneType || this.$store.state.live.customSignWish.length > 0) {
        this.initData();
      } else {
        const unwatch = this.$watch(
          () => ({
            sceneType: this.$store.state.live.sceneType,
            customSignWish: this.$store.state.live.customSignWish,
          }),
          () => {
            this.initData();
            unwatch();
          },
        );
      }
    },
    /**
     * 初始化数据
     */
    initData() {
      this.sceneClassName = getSceneClassName(this.$store.state.live.sceneType);
      this.$refs.quickDanmuRef.initData();
      this.$refs.giftIconsRef.initData();
      this.$refs.msgInputRef.initData();
    },
  },
};
</script>

<style lang="less" scoped>
.bottomArea {
  width: 100%;
  height: 140px;
  position: absolute;
  bottom: 0;
  .bottom-wrap {
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
  }
  &.annualMeeting {
    background-size: 100% 100%;
    background-image: url(https://static.hudongmiao.com/joymewH5/img/enterprise/bottomBar.png);
    .bottom-wrap {
      padding-top: 15px;
    }
  }
  &.zshl {
    background-color: #ff453c;
    border-top: .24vw solid #fed768;
    .bottom-wrap {
      padding-top: 2vw;
    }
  }
}
</style>
