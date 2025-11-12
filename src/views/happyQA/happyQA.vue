<template>
  <div class="happyQAWrap">
    <!-- 等待游戏开始的提示 -->
    <div
      v-if="gameStatus === 1"
      class="waitTip"
    >
      等待游戏开始
    </div>
    <!-- 游戏中 开始答题界面 -->
    <div
      v-if="gameStatus === 2"
      class="game publicHvCenter"
    >
      <div
        v-if="questionDisplay"
        class="qaBox publicVCenter"
      >
        <div class="qNum publicHCenter">
          第{{ questionIndex + 1 }}题
        </div>
        <div class="qCt">
          {{ questionDisplay.questionText }}
        </div>
        <div
          class="optionItem publicHvCenter"
          :class="{ active: answerText === 'A' }"
          @click="chooseOption('A')"
        >
          A.{{ questionDisplay.options.A.optionText }}
        </div>
        <div
          class="optionItem publicHvCenter"
          :class="{ active: answerText === 'B' }"
          @click="chooseOption('B')"
        >
          B.{{ questionDisplay.options.B.optionText }}
        </div>
        <div
          class="optionItem publicHvCenter"
          :class="{ active: answerText === 'C' }"
          @click="chooseOption('C')"
        >
          C.{{ questionDisplay.options.C.optionText }}
        </div>
        <div
          class="optionItem publicHvCenter"
          :class="{ active: answerText === 'D' }"
          @click="chooseOption('D')"
        >
          D.{{ questionDisplay.options.D.optionText }}
        </div>
      </div>
      <div
        class="qaBtn publicHvCenter"
        :class="{ answered: isAnswered }"
        @click="handleSubmit"
      />
    </div>
    <!-- 回答正确/错误弹窗 -->
    <div
      v-if="answerResultVisible"
      class="popupWrap publicHvCenter"
    >
      <div
        class="popupBox publicVCenter"
        :class="{ wrong: !isAnswerRight }"
      >
        <div class="emoj" />
        <div class="resultTip publicHvCenter" />
        <div
          class="confirmBtn"
          @click="closePopup"
        />
      </div>
    </div>
    <!-- 获奖名单弹窗 -->
    <div
      v-if="gameStatus === 3"
      class="sheetPopup publicVCenter"
    >
      <img
        src="@/assets/image/happyQA/titleBox.png"
        class="titleImg"
      />
      <div class="rankBox publicVCenter">
        <div
          v-for="item in rankListDisplay"
          :key="item.userId"
          class="rankUserItem publicVCenter"
          :class="{ first: item.order === 1, second: item.order === 2, third: item.order === 3 }"
        >
          <div class="num">
            {{ item.order }}
          </div>
          <img
            :src="item.avator"
            class="headImg"
          />
          <div class="nickname">
            {{ item.wx_name }}
          </div>
        </div>
        <div class="pagination publicHvCenter">
          <div
            class="pageCtrolBtn prevPage"
            @click="prevPage"
          />
          <div class="currentPage publicHvCenter">
            {{ currentPage }}
          </div>
          <div
            class="pageCtrolBtn nextPage"
            @click="nextPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHappyData, submitAnswer, getHappyRank } from '@/api/happyQA';
import { mapState } from 'vuex';

// 按钮锁
let btnLock = false;
/**
 * 将服务端传过来的题库转换成前端需要的格式
 * @param {array} serverDatas 数据项格式：{star_id,star_answer,star_option: {questionText,options: {A,B,C,D}}}
 * 字段说明：star_id(题目id),star_answer(正确答案),questionText(题目内容),A,B,C,D(选项内容)
 * @returns {array} 数据项格式：{isAnswered,questionId,questionText,questionAnswer,options:{A:{optionText,optionUsers:[],BCD项}}}
 * 字段说明：isAnswered(当前题目是否揭晓答案),questionId(题目id),questionText(题目内容),questionAnswer(题目答案),options(选项信息),optionText(当前选项的内容),optionUsers(当前选项选择的人)
 * optionUsers数据项：{avatar,nickname,id}
 */
const convertServerDatasToQuestions = (serverDatas) => {
  return serverDatas.map((serverData) => {
    const question = {
      isAnswered: false,
      questionId: serverData.star_id,
      questionText: serverData.star_option.questionText,
      questionAnswer: serverData.star_answer,
      options: {
        A: {
          optionText: serverData.star_option.options.A,
          optionUsers: [],
        },
        B: {
          optionText: serverData.star_option.options.B,
          optionUsers: [],
        },
        C: {
          optionText: serverData.star_option.options.C,
          optionUsers: [],
        },
        D: {
          optionText: serverData.star_option.options.D,
          optionUsers: [],
        },
      },
    };
    return question;
  });
};

const DZ_PHONE = '15618613612';

export default {
  name: 'HappyQA',
  components: {},
  data() {
    return {
      answerResultVisible: false,
      questions: [], // 题库
      questionIndex: 0, // 当前展示的题目的索引
      isAnswered: false, // 当前题目我是否回答过
      answerText: '', // 当前题目我回答的选项
      rankList: [], // 排行榜
      currentPage: 1,
      pageSize: 6,
    };
  },
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
      canExposeCurrentQuestion: (state) => state.game.canExposeCurrentQuestion,
      canNextQuestion: (state) => state.game.canNextQuestion,
    }),
    // 当前展示的题目
    questionDisplay() {
      return this.questions[this.questionIndex];
    },
    isAnswerRight() {
      return this.answerText === this.questionDisplay.questionAnswer;
    },
    rankListDisplay() {
      return this.rankList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
  },
  watch: {
    gameStatus: {
      handler(newVal) {
        if (newVal === 2) {
          this.getQuestionInfo();
        } else if (newVal === 3) {
          this.getRankData();
        }
      },
      immediate: true,
    },
    canExposeCurrentQuestion(newVal) {
      if (newVal) {
        this.exposeCurrentQuestion();
      }
    },
    canNextQuestion(newVal) {
      console.log('可以切换到下一题啦!');
      if (newVal) {
        // 如果当前有回答正确/错误的弹窗显示则要关闭它
        if (this.answerResultVisible) {
          this.closePopup();
        }
        // 切换到下一题
        this.nextQuestion();
      }
    },
  },
  created() {
    btnLock = false;
  },
  mounted() {},
  methods: {
    getQuestionInfo() {
      getHappyData()
        .then((res) => {
          console.log(res);
          this.questions = convertServerDatasToQuestions(res.topicArray);
          // 当前题我有没有回答过
          this.isAnswered = res.isDaTi;
          // 如果答过 我选的哪个选项
          if (this.isAnswered) {
            this.answerText = res.answer;
          }
          // 当前是哪一题
          const currentSort = parseInt(res.submit_sort, 10);
          this.questionIndex = currentSort - 1;
          // 当前题目揭晓答案了吗
          this.questions[this.questionIndex].isAnswered = res.isRevealAnswer === '1';
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chooseOption(option) {
      // 已答题就不能选择
      if (this.isAnswered) {
        this.$toast.center('已经答过啦!');
        return;
      }
      this.answerText = option;
    },
    handleSubmit() {
      // 已答题不能提交
      if (this.isAnswered) {
        this.$toast.center('已经答过啦!');
        return;
      }
      // 保证必须要选一个选项
      if (!this.answerText) {
        this.$toast.center('请选择一个选项!');
        return;
      }
      // 保证题目答案没有揭晓
      if (this.questionDisplay.isAnswered) {
        this.$toast.center('题目答案已经揭晓!');
        return;
      }
      if (btnLock) {
        return;
      }
      btnLock = true;
      submitAnswer({
        submitSort: this.questionIndex + 1,
        answers: this.answerText,
        isCorrect: this.isAnswerRight ? '1' : '0',
      })
        .then((res) => {
          console.log(res);
          btnLock = false;
          this.$toast.center('提交成功!');
          this.isAnswered = true;
        })
        .catch((err) => {
          console.log(err);
          btnLock = false;
          this.$toast.center('提交失败!');
        });
    },
    exposeCurrentQuestion() {
      this.questions[this.questionIndex].isAnswered = true;
      // 重置canExposeCurrentQuestion
      this.$store.commit('game/setCanExposeCurrentQuestion', false);
      // 如果这道题我已经回答了，根据我回答的对错，展示不同的弹窗
      if (this.isAnswered) {
        this.answerResultVisible = true;
      }
    },
    nextQuestion() {
      getHappyData()
        .then((res) => {
          // 当前题我有没有回答过
          this.isAnswered = res.isDaTi;
          // 如果答过 我选的哪个选项
          if (this.isAnswered) {
            this.answerText = res.answer;
          }
          // 当前是哪一题
          const currentSort = parseInt(res.submit_sort, 10);
          this.questionIndex = currentSort - 1;
          // 当前题目揭晓答案了吗
          this.questions[this.questionIndex].isAnswered = res.isRevealAnswer === '1';
          // 重置canNextQuestion
          this.$store.commit('game/setCanNextQuestion', false);
          // 重置我回答的选项
          this.answerText = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRankData() {
      // 定制活动的昵称只保留第一位
      const emceePhonenumber = this.$store.state.user.emceeInfo.phonenumber;
      const isDz = emceePhonenumber === DZ_PHONE;

      getHappyRank()
        .then((res) => {
          console.log(res);
          this.rankList = res.list.map((item, index) => {
            return {
              ...item,
              wx_name: isDz ? `${item.wx_name.slice(0, 1)}***` : item.wx_name,
              order: index + 1,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closePopup() {
      this.answerResultVisible = false;
    },
    prevPage() {
      if (this.currentPage === 1) {
        this.$toast.center('已经是第一页了!');
        return;
      }
      this.currentPage -= 1;
    },
    nextPage() {
      if (this.currentPage === Math.ceil(this.rankList.length / this.pageSize)) {
        this.$toast.center('已经是最后一页了!');
        return;
      }
      this.currentPage += 1;
    },
  },
};
</script>

<style lang="less" scoped>
.happyQAWrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('../../assets/image/happyQA/gameBg.png');
  background-size: 100% 100%;
  .waitTip {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 52px;
    font-weight: bold;
    text-align: center;
    &::after {
      content: '';
      animation: ellipsisAnimation 1.2s infinite;
    }
  }
  @keyframes ellipsisAnimation {
    0% {
      content: '';
    }
    33% {
      content: '.';
    }
    66% {
      content: '..';
    }
    100% {
      content: '...';
    }
  }
  .game {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    // 答题盒子
    .qaBox {
      width: 684px;
      height: 966px;
      position: relative;
      background-image: url('../../assets/image/happyQA/qaBox.png');
      background-size: 100% 100%;
      flex-direction: column;
      padding-top: 80px;
      .qNum {
        background-image: url('../../assets/image/happyQA/numBg.png');
        background-size: 100% 100%;
        width: 294px;
        height: 108px;
        position: absolute;
        top: -48px;
        font-size: 44px;
        font-weight: 500;
        color: #ffffff;
        line-height: 100px;
      }
      .qCt {
        width: 600px;
        font-size: 40px;
        font-weight: 600;
        color: #333333;
        line-height: 55px;
        height: 170px;
        margin-bottom: 40px;
      }
      .optionItem {
        width: 560px;
        height: 120px;
        background: #f2f1f6;
        border-radius: 144px;
        font-size: 40px;
        font-weight: 600;
        color: #302f32;
        margin-bottom: 32px;
        &.active {
          background: #6167f5;
          color: #ffffff;
        }
      }
    }
    // 提交按钮
    .qaBtn {
      width: 590px;
      height: 168px;
      margin-top: 34px;
      background-image: url('../../assets/image/happyQA/submitBtn.png');
      background-size: 100% 100%;
      position: relative;
      &.answered {
        background-image: unset;
        background-size: unset;
        background-color: #f2f1f6;
        border-radius: 178px;
        &::after {
          content: '';
          display: block;
          position: absolute;
          width: 238px;
          height: 86px;
          background-image: url('../../assets/image/happyQA/answeredText.png');
          background-size: 100% 100%;
        }
      }
    }
  }
  .popupWrap {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.9);
    .popupBox {
      width: 590px;
      height: 692px;
      background-image: url('../../assets/image/happyQA/correctBox.png');
      background-size: 100% 100%;
      flex-direction: column;
      position: relative;
      padding-top: 206px;
      .emoj {
        width: 246px;
        height: 302px;
        background-image: url('../../assets/image/happyQA/smile.png');
        background-size: 100% 100%;
        position: absolute;
        top: -150px;
      }
      .resultTip {
        width: 494px;
        height: 238px;
        background-image: url('../../assets/image/happyQA/congratulationText.png');
        background-size: 100% 100%;
        position: relative;
      }
      .confirmBtn {
        width: 418px;
        height: 120px;
        background-image: url('../../assets/image/happyQA/confirmBtn.png');
        background-size: 100% 100%;
        margin-top: 76px;
      }
      &.wrong {
        background-image: unset;
        background-size: unset;
        background-color: #F2F1F6;
        border-radius: 32px;
        border: 4px solid rgba(255,255,255,0.80);
        .emoj {
          background-image: url('../../assets/image/happyQA/sad.png');
        }
        .resultTip {
          background: rgba(255, 255, 255, 0.6);
          border: 2px solid #ffffff;
          border-radius: 32px;
          background-image: unset;
          background-size: unset;
          &::after {
            content: '';
            display: block;
            width: 320px;
            height: 172px;
            position: absolute;
            background-image: url('../../assets/image/happyQA/pityText.png');
            background-size: 100% 100%;
          }
        }
        .confirmBtn {
          background-image: url('../../assets/image/happyQA/getItBtn.png');
        }
      }
    }
  }
  .sheetPopup {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.9);
    flex-direction: column;
    .titleImg {
      width: 550px;
      height: 190px;
    }
    .rankBox {
      width: 718px;
      height: 1092px;
      background-image: url('../../assets/image/happyQA/rankBg.png');
      background-size: 100% 100%;
      position: relative;
      padding-top: 94px;
      flex-direction: column;
      .rankUserItem {
        margin-bottom: 44px;
        .num {
          width: 70px;
          color: #ffffff;
          font-size: 48px;
          font-weight: 600;
        }
        .headImg {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          margin-left: 10px;
        }
        .nickname {
          width: 340px;
          font-size: 48px;
          font-weight: 500;
          color: #ffffff;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-left: 20px;
        }
        &.first {
          .num {
            color: #fcfb5a;
            font-size: 64px;
          }
        }
        &.second {
          .num {
            color: #5afcf2;
            font-size: 64px;
          }
        }
        &.third {
          .num {
            color: #fccf5a;
            font-size: 64px;
          }
        }
      }
      .pagination {
        position: absolute;
        bottom: 72px;
        width: 100%;
        .currentPage {
          width: 188px;
          height: 72px;
          background-image: url('../../assets/image/happyQA/pageBg.png');
          background-size: 100% 100%;
          font-size: 48px;
          font-weight: 600;
          color: #ffffff;
        }
        .pageCtrolBtn {
          width: 56px;
          height: 80px;
          background-size: 100% 100%;
          &.prevPage {
            background-image: url('../../assets/image/happyQA/leftArrow.png');
          }
          &.nextPage {
            background-image: url('../../assets/image/happyQA/rightArrow.png');
          }
        }
      }
    }
  }
}
</style>
