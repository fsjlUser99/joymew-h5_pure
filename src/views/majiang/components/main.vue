<template>
  <div class="game-main">
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
      <div
        class="answer-content"
        :class="{ more: showAnswer.length > 5 }"
      >
        <div
          v-for="(majiang, index) in showAnswer"
          :key="index"
          class="majiang-item"
          :class="{ reverse: majiang.isOpen }"
          @click="removeSelect(index)"
        >
          <!-- 牌面 -->
          <img
            :src="majiang.imgUrl"
            class="front"
            :class="{ fan: isFan }"
          />
          <!-- 牌背 -->
          <img
            src="~@/assets/image/majiang/majiang-back.png"
            class="back"
            :class="{ fan: isFan }"
          />
        </div>
      </div>
    </div>
    <!-- 选择答案 -->
    <div class="choose-part">
      <div class="choose-tip">
        请点击选择能胡的牌
      </div>
      <div class="selection-container">
        <div
          v-for="(selection, index) in selections"
          :key="index"
          class="selection-item"
        >
          <img
            :src="selection.imgUrl"
            class="select-img"
            :class="{ selected: selection.isSelect }"
            @click="clickSelection(index)"
          />
        </div>
      </div>
    </div>
    <!-- 提交答案按钮 -->
    <div
      v-show="!isCurrent && remainTime > 0"
      class="confirm-btn"
      @click="confirmAns"
    >
      <span class="confirm-txt">确认</span>
    </div>
    <!-- 答对弹窗 -->
    <MajiangSuccess
      :show="isShowSuccess"
      :rank-data="successData"
      @close="closeSuccess"
      @showRank="showRank"
    />
    <!-- 展示答案天窗（未答对、且剩余时间为0） -->
    <ShowAnswer
      :show="isShowAnswer"
      :answer="answerSource"
      @close="showAns"
      @showRank="showRank"
    />
  </div>
</template>

<script>
import { getAllQs, recordReplyTime } from '@/api/majiang/majiang';
import majiangManager from '../majiang';
import MajiangSuccess from './success.vue';
import ShowAnswer from './showAnswer.vue';

export default {
  components: {
    MajiangSuccess,
    ShowAnswer,
  },
  props: {
    currentRound: {
      type: Number,
      default: 1,
    },
    remainTime: {
      type: Number,
      default: 30,
    },
    end: {
      type: Boolean,
      default: false,
    },
    passTime: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      questionSource: [],
      showQuestions: [],
      answerSource: [],
      showAnswer: [],
      source: [], // 题库源
      selections: [],
      isShowSuccess: false, // 答对弹窗控制
      selectedAns: [], // 已选择的答案
      successData: {
        time: 0,
        round_rank: 0,
        total_rank: 0,
      },
      isFan: false, // 是否需要翻盘特效
      isCurrent: false, // 是否答对了
      answerTimer: null, // 回合开始的定时器
      start_time: 0, // 答题开始的时间戳
      end_time: 0, // 答对时的时间戳
      isShowAnswer: false, // 答案展示弹窗
      fapaiTimerQs: null, // 问题发牌的定时器
      fapaiTimerAn: null, // 答案发牌的定时器
    };
  },
  watch: {
    currentRound(newVal) {
      if (newVal) {
        if (this.source && this.source.length) {
          this.changeQs(newVal - 1);
        }
        // 关闭弹窗
        this.isShowAnswer = false;
        this.isShowSuccess = false;
      }
    },
    selectedAns(newVal) {
      // 当选中的麻将发生改变时，改变展示的麻将
      const target = newVal.map((item) => {
        return {
          ...item,
          isOpen: true,
        };
      });
      while (target.length < this.showAnswer.length) {
        target.push({
          imgUrl: '',
          isOpen: false,
          value: '',
        });
      }
      this.showAnswer.splice(0);
      target.forEach((item) => {
        this.showAnswer.push(item);
      });
    },
    remainTime(newVal) {
      if (Number(newVal) <= 0 && !this.isCurrent) {
        this.isShowAnswer = true;
        console.log('数据', this.answerSource.length, this.selections.length);
      }
    },
  },
  mounted() {
    // 初始化題目
    this.getAllQuestions();
  },
  methods: {
    /** 获取本局游戏所有的题目 */
    async getAllQuestions() {
      const res = await getAllQs();
      this.source = res;
      this.changeQs(this.$props.currentRound - 1);
    },
    /** 切换回合是，处理题目、答案等数据 */
    changeQs(round) {
      // 通知父组件开始计时
      this.$emit('start');
      // 记录答题开始的时间戳
      this.start_time = Date.now();
      this.questionSource.splice(0);
      // eslint-disable-next-line array-callback-return
      this.source[round].mahjongSubjectList.map((item) => {
        const target = majiangManager.getMajiangByNum(item);
        this.questionSource.push(target);
      });
      this.fapai(this.questionSource, 'showQuestions', true);
      this.answerSource.splice(0);
      // eslint-disable-next-line array-callback-return
      this.source[round].mahjongAnswerList.map((item) => {
        const target = majiangManager.getMajiangByNum(item);
        this.answerSource.push(target);
      });
      this.fapai(this.answerSource, 'showAnswer');
      // 重置已完成标识
      this.isCurrent = false;
      // 清除已选择的麻将
      this.selectedAns.splice(0);
      // 根据题目判断答案选项是 万、筒、条: 1-9 -> 万；11-19 -> 筒；21-29 -> 条
      const code = this.questionSource[0].value;
      this.selections.splice(0);
      if (code > 0 && code < 10) {
        majiangManager.majiangList
          .filter((item) => item.value > 0 && item.value < 10)
          .forEach((item) => {
            this.selections.push({
              ...item,
              isSelect: false,
            });
          });
        return;
      }
      if (code > 10 && code < 20) {
        majiangManager.majiangList
          .filter((item) => item.value > 10 && item.value < 20)
          .forEach((item) => {
            this.selections.push({
              ...item,
              isSelect: false,
            });
          });
        return;
      }
      if (code > 20 && code < 30) {
        majiangManager.majiangList
          .filter((item) => item.value > 20 && item.value < 30)
          .forEach((item) => {
            this.selections.push({
              ...item,
              isSelect: false,
            });
          });
      }
    },
    /** 发牌
     * @param {array} arr 源数据
     * @param {string} target 添加的目标数据（this中的变量）
     * @param {boolean} isQuestion 是否是题目的发牌效果
     */
    fapai(arr, target, isQuestion = false) {
      // 清空目标数组
      this[target].splice(0);
      const copy = [...arr];
      const targetTimer = isQuestion ? 'fapaiTimerQs' : 'fapaiTimerAn';
      if (this[targetTimer]) {
        clearInterval(this[targetTimer]);
      }
      this[targetTimer] = setInterval(() => {
        // 源数据遍历完成，清除定时器
        if (!copy.length) {
          clearInterval(this[targetTimer]);
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
    /** 提交答案 */
    async confirmAns() {
      // 剩余时间不足
      if (this.$props.remainTime <= 0) {
        this.$toast.center('作答时间已到，请等待下一轮开始~');
        return;
      }
      if (!this.selectedAns.length) {
        this.$toast.center('答案不能为空~');
        return;
      }
      // 当前题目的答案，按从小到大用','拼接
      const res = this.source[this.$props.currentRound - 1].mahjongAnswerList.join(',');
      const myRes = this.selectedAns
        .map((item) => {
          return item.value;
        })
        .join(',');
      // 回答错误，翻牌效果
      if (res !== myRes) {
        this.isFan = true;
        this.showAnswer.forEach((item) => {
          item.isOpen = false;
        });
        setTimeout(() => {
          this.isFan = false;
          this.selections.forEach((item) => {
            item.isSelect = false;
          });
          this.selectedAns.splice(0);
        }, 500);
        this.$toast.center('答案错误，请继续答题~');
        return;
      }
      // 记录时间并计算出使用的时间
      this.end_time = Date.now();
      const useTime = this.end_time - this.start_time + this.$props.passTime;
      console.log('用时:', Number(useTime / 1000).toFixed(3), 's');
      // 超时停止记录
      if (useTime > 30000) {
        this.$toast.center('作答时间已到，请等待下一轮开始~');
        return;
      }
      const recordRes = await recordReplyTime(
        String(useTime),
        String(this.$props.currentRound),
      );
      const { rank, currentRoundSize } = recordRes;
      if (rank) {
        this.successData.round_rank = rank;
      }
      if (currentRoundSize) {
        this.successData.total_rank = currentRoundSize;
      }
      this.successData.time = useTime;
      // 答题成功，调用记录接口
      this.isShowSuccess = true;
      this.isCurrent = true;
    },
    /** 关闭答对弹窗 */
    closeSuccess() {
      this.isShowSuccess = false;
    },
    /** 展示排行榜 */
    showRank() {
      this.isShowSuccess = false;
      this.$emit('showRank');
    },
    /** 选择答案 */
    clickSelection(index) {
      if (this.isCurrent) return;
      // 判断时间是否已经到了
      if (this.$props.remainTime <= 0) {
        this.$toast.center('作答时间已到，请等待下一轮开始~');
        return;
      }
      // 已经选满了
      if (
        !this.selections[index].isSelect
        && this.selectedAns.length >= this.answerSource.length
      ) {
        this.$toast.center('胡牌数已达上限，请点击确认提交答案');
        return;
      }
      this.selections[index].isSelect = !this.selections[index].isSelect;
      this.selectedAns = this.selections.filter((item) => item.isSelect);
    },
    /** 取消选择麻将 */
    removeSelect(index) {
      // 已经答对，禁用该功能
      if (this.isCurrent) return;
      // 没有正面的麻将图片，禁用功能
      if (!this.showAnswer[index].value) return;
      // 根据对应value找到选择区对应的麻将
      const val = this.showAnswer[index].value;
      const idx = this.selections.findIndex((item) => item.value === val);
      this.selections[idx].isSelect = false;
      this.selectedAns = this.selections.filter((item) => item.isSelect);
    },
    /** 关闭答案弹窗 */
    showAns() {
      this.isShowAnswer = false;
      // 展示答案
      if (this.answerSource.length) {
        this.showAnswer = this.answerSource.map((item) => {
          return {
            ...item,
            isOpen: true,
          };
        });
      }
      if (this.selections.length) {
        // 选中对应的牌
        this.selections.forEach((item) => {
          console.log('111', this.showAnswer);
          if (this.showAnswer.findIndex((an) => an.value === item.value) >= 0) {
            item.isSelect = true;
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.game-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .question-container {
    width: 100%;
    height: 70px;
    flex-shrink: 0;
    margin-bottom: 104px;
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
    margin-bottom: 42px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .hu-icon {
      width: 122px;
      height: 122px;
      margin-right: 20px;
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
        width: 88px;
        height: 112px;
        margin-right: 20px;
        position: relative;
        transition: transform 0.5s ease-in-out;

        .front,
        .back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;

          &.fan {
            transition: transform 0.5s ease-in-out;
          }
        }
        .back {
          transform: rotateY(0deg);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .front {
          transform: rotateY(-180deg);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        &.reverse {
          .back {
            transform: rotateY(180deg);
          }
          .front {
            transform: rotateY(0deg);
          }
        }

        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    .more {
      height: 120px;
      .majiang-item {
        width: 60px;
        height: 76px;
      }
    }
  }
  .choose-part {
    width: 681px;
    flex-shrink: 0;
    margin-bottom: 33px;
    padding: 31px 66px;
    box-sizing: border-box;
    border-radius: 24px;
    background-color: rgba(255, 255, 255, 0.4);
    border: 2px solid #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .choose-tip {
      flex-shrink: 0;
      margin-bottom: 30px;
      color: #b26000;
      font-size: 32px;
      font-weight: bold;
    }
    .selection-container {
      width: 100%;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      .selection-item {
        width: 88px;
        height: 112px;
        margin-top: 24px;
        margin-right: 25px;
        .select-img {
          width: 100%;
          height: 100%;
        }
        .selected {
          filter: brightness(40%);
        }
        &:nth-last-of-type(5n) {
          margin-right: 0;
        }
        &:nth-of-type(-n + 5) {
          margin-top: 0;
        }
      }
    }
  }
  .confirm-btn {
    width: 434px;
    height: 100px;
    background-image: linear-gradient(270deg, #fdb71b, #fff411);
    border-radius: 46px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    line-height: 100px;
    text-align: center;
    box-shadow: 4px 6px 0 0 #c35515;
    .confirm-txt {
      text-shadow: 2px 3px 0 #c35515;
    }
  }
}
</style>
