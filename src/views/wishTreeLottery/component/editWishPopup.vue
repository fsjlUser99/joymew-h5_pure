<template>
  <div class="edit-wish-popup-overlay" v-if="visible" @click="handleOverlayClick">
    <div class="edit-wish-popup-container" :class="{ wedding: isWedding }">
      <!-- 标题容器 -->
      <div class="title-container" :class="{ wedding: isWedding }">
        {{ title }}
      </div>

      <!-- 输入区域 -->
      <div class="input-area">
        <!-- 输入框 -->
        <div class="input-container">
          <textarea
            v-model="inputText"
            :maxlength="maxLength"
            :placeholder="`最多可输入${maxLength}个字哦`"
            class="wish-input"
          />
        </div>

        <!-- 确定按钮 -->
        <div class="confirm-btn" :class="{ wedding: isWedding }" @click="handleConfirm" />
      </div>

      <!-- 关闭按钮 -->
      <div class="close-btn" @click="close">
        <img
          src="https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/close-icon3.png"
          alt="关闭"
          class="close-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditWishPopup',
  props: {
    // 是否显示弹窗
    visible: {
      type: Boolean,
      default: false,
    },
    // 标题文字内容
    title: {
      type: String,
      default: '请输入您想发送的祝福~',
    },
    // 点击遮罩是否关闭弹窗
    closeOnOverlay: {
      type: Boolean,
      default: false,
    },
    // 是否为婚礼版
    isWedding: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 输入的文字内容
      inputText: '',
      // 最大字符数
      maxLength: 14,
    };
  },
  computed: {
  },
  methods: {
    // 关闭弹窗
    close() {
      this.$emit('close');
    },
    // 确定按钮点击事件
    handleConfirm() {
      if (this.inputText.trim()) {
        this.$emit('confirm', this.inputText);
        this.close();
      }
    },
    // 处理遮罩点击事件
    handleOverlayClick(event) {
      // 如果点击的是遮罩本身（不是容器内部），且允许点击遮罩关闭
      if (event.target === event.currentTarget && this.closeOnOverlay) {
        console.log('点击遮罩关闭弹窗');
        this.$emit('close');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.edit-wish-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

      .edit-wish-popup-container {
      position: relative;
      background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-pop-container.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      width: 100vw;
      height: 100vw;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.wedding {
        background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-pop-container-wedding.png');
      }

    .title-container {
      position: absolute;
      width: 70%;
      height: 15vw;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 5vw;
      font-weight: 500;
      text-align: center;
      white-space: nowrap;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      &.wedding {
       top: 20%;
      }
    }

    .input-area {
      position: relative;
      margin-top: 10%;
      width: 70%;
      height: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .input-container {
        width: 100%;
        margin-top: 10%;
        margin-bottom: 5vw;

        .wish-input {
          width: 95%;
          height: 18vw;
          padding: 2vw;
          border: 3px solid #fff;
          border-radius: 2vw;
          background-color: #fff;
          font-size: 4vw;
          font-weight: bold;
          line-height: 1.4;
          resize: none;
          outline: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.2);
          color: #d32f2f;
          transition: all 0.3s ease;

          &:focus {
            border: 3px solid #ffeb3b;
            box-shadow:
              0 6px 20px rgba(0, 0, 0, 0.2),
              0 2px 8px rgba(0, 0, 0, 0.2),
              0 0 0 2px rgba(255, 235, 59, 0.3),
              inset 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          &::placeholder {
            color: rgba(211, 47, 47, 0.8);
            font-weight: 200;
          }
        }
      }

      .confirm-btn {
        margin-top: auto;
        background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-button2.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        width: 50vw;
        height: 20vw;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        cursor: pointer;
        user-select: none;

        &.wedding {
          background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-button2-wedding.png');
        }

        &::after {
          content: '确定';
          line-height: 20vw;
          font-size: 5vw;
          font-weight: bold;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          margin-bottom: 1vw;
        }
      }
    }

    .close-btn {
      position: absolute;
      bottom: -15vw;
      left: 50%;
      transform: translateX(-50%);
      width: 12vw;
      height: 12vw;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;

      .close-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
