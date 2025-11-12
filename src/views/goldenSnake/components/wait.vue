<template>
  <div class="gl-wait">
    <img
      class="title"
      src="https://ustatic.hudongmiao.com/mew/common/cfbc072fcbb94a76bd75c56f8a11f244"
      alt=""
    />
    <div class="content">
      <img src="https://ustatic.hudongmiao.com/mew/common/2d4fa230e8ff4316baa10b8b76e75067" />
      <img src="https://ustatic.hudongmiao.com/mew/common/f87ea202675e4db4bc1cf0126558e4c5" />
    </div>
    <div class="text">游戏开始后，移动角色左右移动...</div>
    <addScoreTool v-if="mpType" />
  </div>
</template>

<script>
import addScoreTool from '@/components/addScoreTool/index.vue';

export default {
  components: {
    addScoreTool,
  },
  computed: {
    mpType() {
      return this.$store.state.app.mpType;
    },
  },
  data: () => ({}),
  methods: {},
};
</script>

<style scoped lang="less">
.gl-wait {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .title {
    width: 568px;
    height: 474px;
  }

  .content {
    margin-top: 100px;
    position: relative;
    display: flex;
    height: 320px;
    width: 284px;
    margin: 0 auto;
    img:first-child {
      width: 284px;
      height: 320px;
      position: absolute;
    }

    img:last-child {
      position: absolute;
      width: 170px;
      height: 140px;
      top: 196px;
      left: 178px;
    }
  }

  .text {
    color: white;
    font-size: 36px;
    margin-top: 40px;
  }
}
</style>
