<template>
  <div
    class="chatArea publicZIndexChatArea"
    ref="chatAreaRef"
  />
</template>

<script>
import { renderComp } from '@/utils/index';

export default {
  name: 'ChatArea',
  created() {
    this.watchSceneTypeThenRenderComp();
  },
  methods: {
    /**
     * 监听sceneType，然后渲染组件
     */
    watchSceneTypeThenRenderComp() {
      if (this.$store.state.live.sceneType) {
        this.loadCompBySceneTypeThenRender(this.$store.state.live.sceneType);
      } else {
        const unwatch = this.$watch(
          () => this.$store.state.live.sceneType,
          () => {
            this.loadCompBySceneTypeThenRender(this.$store.state.live.sceneType);
            unwatch();
          },
        );
      }
    },
    /**
     * 根据sceneType加载组件并渲染
     */
    async loadCompBySceneTypeThenRender(sceneType) {
      const compConfigMap = {
        0: () => import('./modules/wedding.vue').then((res) => res.default),
        1: () => import('./modules/qy.vue').then((res) => res.default),
        91: () => import('./modules/zshl.vue').then((res) => res.default),
      };
      // 订婚宴版本的聊天区域和婚礼版一致
      compConfigMap[54] = () => import('./modules/wedding.vue').then((res) => res.default);
      // 其他版本的聊天区域和生日版一致
      const otherKeys = [2, 21, 22, 23, 24, 25, 26, 41, 42, 43, 51, 52, 53, 55];
      otherKeys.forEach((key) => {
        compConfigMap[key] = () => import('./modules/birth.vue').then((res) => res.default);
      });
      const compConfig = await compConfigMap[sceneType]();
      renderComp(this.$refs.chatAreaRef, compConfig);
    },
  },
};
</script>

<style lang="less">
.chatArea {
  position: absolute;
  width: 530px;
  height: 100vw;
  bottom: 209px;
  color: #fff;
}
</style>
