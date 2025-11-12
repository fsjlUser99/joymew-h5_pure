<template>
  <div class="tip-popup-overlay" v-if="visible">
    <div class="tip-popup-container" :class="{ wedding: isWedding }">
      <div class="tip-popup-content">
        <!-- 图标区域 -->
        <div class="tip-icon" v-if="iconUrl">
          <img :src="iconUrl" alt="提示图标" class="icon-img" />
        </div>
        <!-- 文字区域 -->
        <div class="tip-text">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TipPopup',
  props: {
    // 是否显示弹窗
    visible: {
      type: Boolean,
      default: false,
    },
    // 图标地址（可选）
    iconUrl: {
      type: String,
      default: '',
    },
    // 文字内容
    text: {
      type: String,
      required: true,
      default: '',
    },
    // 是否为婚礼版
    isWedding: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.tip-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

      .tip-popup-container {
      background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-button1.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      width: 100vw;
      min-height: 50vw;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.wedding {
        background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-button1-wedding.png');
      }

    .tip-popup-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70%;

      .tip-icon {
        margin-right: 15px;
        flex-shrink: 0;

        .icon-img {
          width: 7vw;
          height: 7vw;
          display: block;
        }
      }

      .tip-text {
        color: #fff;
        font-size: 4vw;
        font-weight: 500;
        text-align: left;
        line-height: 1;
        flex: 1;
      }
    }
  }
}
</style>
