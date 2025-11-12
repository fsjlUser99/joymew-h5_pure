<template>
  <transition name="close">
    <div
      v-show="show"
      class="show-answer-model"
    >
      <div class="show-container">
        <div class="title noMargin">
          时间到
        </div>
        <div class="title">
          揭晓本题答案
        </div>
        <div
          class="answer-content"
          :class="{ flexStart: answer.length > 4 }"
        >
          <img
            v-for="(as, index) in answer"
            :key="index"
            class="majiang-item"
            :src="as.imgUrl"
          />
        </div>
        <div
          class="confirm-btn"
          @click="close"
        >
          我知道了
        </div>
        <div
          class="show-rank"
          @click="showRank"
        >
          查看排名
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit('close');
    },
    showRank() {
      this.close();
      this.$emit('showRank');
    },
  },
};
</script>

<style lang="less" scoped>
.show-answer-model {
  width: 100%;
  height: 100%;
  padding: 0 60px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  .show-container {
    width: 100%;
    padding: 52px 26px;
    box-sizing: border-box;
    background-image: url('~@/assets/image/majiang/dialog-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin-bottom: 121px;
      color: #785600;
      font-size: 40px;
    }
    .noMargin {
      margin-bottom: 20px;
    }
    .answer-content {
      margin-bottom: 154px;
      padding: 19px 34px;
      box-sizing: border-box;
      border-radius: 24px;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .majiang-item {
        width: 20%;
        margin-top: 18px;
        margin-right: 34px;
        &:nth-of-type(4n), &:last-of-type {
          margin-right: 0;
        }
        &:nth-of-type(-n + 4) {
          margin-top: 0;
        }
      }
    }
    .flexStart {
      justify-content: flex-start;
    }
    .confirm-btn {
      width: 409px;
      height: 89px;
      margin-bottom: 48px;
      border-radius: 44px;
      background-color: #E08E06;
      color: #fff;
      line-height: 89px;
      text-align: center;
    }
    .show-rank {
      color: #E08E06;
      text-decoration: underline;
    }
  }
}

.close-enter-active,
.close-leave-active {
  transition: all 0.3s ease-in-out;
}
.close-enter,
.close-leave-to {
  opacity: 0;
}
</style>
