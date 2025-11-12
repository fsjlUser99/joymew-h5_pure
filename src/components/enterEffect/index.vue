<template>
  <!-- 挂载进场动画的根结点 -->
  <div
    id="enterEffectContainer"
    class="enterEffectContainer"
  />
</template>
<script>
import store from '@/store/index';

export default {
  name: 'EnterEffectContainer',
  mounted() {
    // 通知main.js 页面已经渲染完毕啦!
    store.commit('app/updateEnterEffectContainerMountedObserver', {
      key: 'enterEffectContainerMounted',
      value: true,
    });
  },
};
</script>
<style lang="less" scoped>
.enterEffectContainer {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
