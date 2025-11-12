<template>
  <div class="wait-cpn">
    <!-- 题目 -->
    <div class="question-container">
      <div
        v-for="(majiang, index) in showQuestions"
        :key="index"
        class="majiang-item"
      >
        <img
          :src="majiang.imgUrl"
          class="majiang-img"
        />
      </div>
    </div>
    <!-- 答案 -->
    <div class="answer-container">
      <img
        src="~@/assets/image/majiang/hu-icon.png"
        class="hu-icon"
      />
      <div class="answer-content">
        <div
          v-for="(majiang, index) in showAnswer"
          :key="index"
          class="majiang-item"
        >
          <img
            src="~@/assets/image/majiang/majiang-back.png"
            class="majiang-img"
          />
        </div>
      </div>
    </div>
    <!-- 提示 -->
    <div class="wait-tip">
      请等待游戏开始
      <span class="point">.</span>
      <span class="point">.</span>
      <span class="point">.</span>
    </div>
  </div>
</template>

<script>
import { getWaitQs } from '@/api/majiang/majiang';
import majiangManager from '../majiang';

export default {
  data() {
    return {
      questionSource: [],
      showQuestions: [],
      answerSource: [],
      showAnswer: [],
    };
  },
  mounted() {
    // 获取等待界面的题目
    this.getWaitQuestion();
  },
  methods: {
    /** 发牌
     * @param {array} arr 源数据
     * @param {string} target 添加的目标数据（this中的变量）
     * @param {boolean} isQuestion 是否是题目的发牌效果
     */
    fapai(arr, target, isQuestion = false) {
      // 清空目标数组
      this[target].splice(0);
      const copy = [...arr];
      const timer = setInterval(() => {
        // 源数据遍历完成，清除定时器
        if (!copy.length) {
          clearInterval(timer);
          return;
        }
        // 答案
        if (!isQuestion) {
          this[target].push({
            ...copy.shift(),
            isOpen: false,
          });
        } else {
          this[target].push(copy.shift());
        }
      }, 200);
    },
    /** 获取等待界面的实力题目 */
    async getWaitQuestion() {
      const res = await getWaitQs();
      const target = JSON.parse(res);
      this.changeQs(target);
    },
    /** 切换题目的操作
     * @param {object} target 目标题目
     */
    changeQs(target) {
      this.questionSource.splice(0);
      target.mahjongSubjectList.forEach((item) => {
        const majiang = majiangManager.getMajiangByNum(item);
        this.questionSource.push(majiang);
      });
      this.fapai(this.questionSource, 'showQuestions', true);
      this.answerSource.splice(0);
      target.mahjongAnswerList.forEach((item) => {
        const majiang = majiangManager.getMajiangByNum(item);
        this.answerSource.push(majiang);
      });
      this.fapai(this.answerSource, 'showAnswer');
    },
  },
};
</script>

<style lang="less" scoped>
.wait-cpn {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .question-container {
    width: 100%;
    margin-bottom: 184px;
    display: flex;
    align-items: center;
    justify-content: center;
    .majiang-item {
      width: 52px;
      height: 70px;
      margin-right: 2px;
      .majiang-img {
        width: 100%;
        height: 100%;
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  .answer-container {
    margin-bottom: 191px;
    display: flex;
    align-items: center;
    justify-content: center;
    .hu-icon {
      width: 162px;
      height: 160px;
      margin-right: 39px;
    }
    .answer-content {
      height: 154px;
      padding: 14px 25px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      .majiang-item {
        width: 78px;
        height: 126px;
        margin-right: 20px;
        .majiang-img {
          width: 100%;
          height: 100%;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
  .wait-tip {
    width: 100%;
    color: #fff;
    font-size: 45px;
    font-weight: bold;
    font-family: Alimama ShuHeiTi;
    letter-spacing: 10px;
    text-align: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .point {
      display: block;
      animation: jump ease-in-out 2.1s infinite;
      &:nth-last-of-type(2) {
        animation-delay: 0.6s;
      }
      &:nth-last-of-type(3) {
        animation-delay: 1.2s;
      }
    }
  }
  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
}
</style>
