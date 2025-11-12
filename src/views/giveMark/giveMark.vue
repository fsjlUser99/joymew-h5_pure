<template>
  <div class="giveMark-wrap">
    <div class="titleBox publicHvCenter">
      <div class="dot d1" />
      <div class="dot d2" />
      <div class="dot d3" />
      <div class="dot d4" />
      {{ title }}
    </div>
    <div
      v-show="currentPlayer.id"
      class="avatorBox"
    >
      <img
        :src="currentPlayer.avator"
        class="avator"
      />
    </div>
    <div
      v-show="!currentPlayer.id"
      class="avatorBox"
    >
      <img
        src="@/assets/image/defaultHeadImg.png"
        class="avator"
      />
    </div>
    <div
      v-show="!currentPlayer.id"
      class="waitTip"
    >
      请等待主持人开始评分
      <div class="dot">
        ...
      </div>
    </div>
    <div
      v-show="currentPlayer.id"
      class="nameBox"
    >
      {{ currentPlayer.num }} {{ currentPlayer.name }}
    </div>
    <div
      v-show="!currentPlayer.id"
      class="nameBox"
    >
      x号 小嗨喵
    </div>
    <div
      v-show="currentPlayer.id"
      class="iptWrap"
    >
      <input
        v-model="mark"
        class="inputBox"
        type="number"
        placeholder="请输入选手分数"
      />
    </div>
    <div
      v-show="currentPlayer.id && giveMarkVersion === 'new'"
      class="giveScoreTip"
    >
      剩余票数：{{ remainPiao }}
    </div>
    <div
      v-show="currentPlayer.id && giveMarkVersion === 'old'"
      class="giveScoreTip"
    >
      打分说明：满分100，请根据选手个人表现、舞台掌控等如实评分。
    </div>
    <div
      v-show="currentPlayer.id"
      v-tap="{ methods: submitMark }"
      class="submitBtn publicHvCenter"
    >
      提交
    </div>
  </div>
</template>
<script>
import { isPositiveInteger, isUnNegtiveDigit } from '@/utils/index';
import { mapState } from 'vuex';

export default {
  name: 'GiveMark',
  props: {
    currentPlayer: {
      type: Object,
      default: () => {
        return {
          id: '',
          num: '',
          name: '',
          avator: '',
        };
      },
    },
    remainPiao: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      mark: '',
    };
  },
  computed: {
    title() {
      return this.currentPlayer.id ? '请为选手评分' : '等待开始评分';
    },
    ...mapState({
      giveMarkVersion: (state) => state.game.giveMarkVersion,
    }),
  },
  watch: {},
  created() {},
  methods: {
    submitMark() {
      if (this.giveMarkVersion === 'new') {
        if (!isPositiveInteger(this.mark)) {
          this.$toast.center('请输入正确的票数!');
          return;
        }
        if (parseFloat(this.mark) > this.remainPiao) {
          this.$toast.center(`票数不能超过${this.remainPiao}!`);
          return;
        }
      } else if (this.giveMarkVersion === 'old') {
        if (!isUnNegtiveDigit(this.mark)) {
          this.$toast.center('请输入正确的分数!');
          return;
        }
        if (parseFloat(this.mark) > 100) {
          this.$toast.center('分数不能超过100!');
          return;
        }
      }
      console.log(this.mark);
      this.$emit('resultEmit', this.mark);
    },
  },
};
</script>
<style lang="less" scoped>
.giveMark-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000733;
  overflow-y: scroll;
  .titleBox {
    width: 558px;
    height: 80px;
    background: #0100d7;
    border: 3px solid rgba(255, 255, 255, 0.7);
    border-radius: 14px;
    position: relative;
    font-size: 48px;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    padding-top: 5px;
    margin: 0 auto;
    margin-top: 56px;
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      position: absolute;
      &.d1 {
        left: 12px;
        top: 18px;
        border: 4px solid #54a6f6;
      }
      &.d2 {
        left: 12px;
        top: 50px;
        border: 4px solid #ead2ca;
      }
      &.d3 {
        left: 530px;
        top: 18px;
        border: 5px solid #54a6f6;
      }
      &.d4 {
        width: 4px;
        height: 20px;
        background: #f3ddf0;
        left: 533px;
        top: 45px;
        border-radius: unset;
      }
    }
  }
  .waitTip {
    font-size: 42px;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    bottom: 273px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    .dot {
      overflow: hidden;
      position: absolute;
      width: 46px;
      left: 79vw;
      top: 0vw;
      letter-spacing: 2px;
      animation: ellipsis 1s infinite;
      animation-timing-function: steps(1);
    }
  }
  @keyframes ellipsis {
    0% {
      width: 0px;
    }
    25% {
      width: 12px;
    }
    50% {
      width: 26px;
    }
    75% {
      width: 47px;
    }
  }
  .avatorBox {
    width: 330px;
    height: 480px;
    background-image: url('../../assets/image/giveMark/avatorBox.png');
    background-size: 100% 100%;
    position: relative;
    margin: 0 auto;
    margin-top: 56px;
    .avator {
      width: 246px;
      height: 301px;
      position: absolute;
      top: 118px;
      left: 42px;
    }
  }
  .nameBox {
    width: 330px;
    height: 72px;
    border: 3px solid;
    border-image: linear-gradient(90deg, #86bff8, #a4a9ee 100%, #87bff6 100%, #51bae6 100%, #9baff8 100%, #5dabe2 100%) 1.4997998476028442
      1.4997998476028442;
    border-radius: 12px;
    margin-top: 24px;
    font-size: 40px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 auto;
    margin-top: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    line-height: 72px;
  }
  .iptWrap {
    text-align: center;
    margin-top: 80px;
    .inputBox {
      width: 686px;
      height: 80px;
      background: #ffffff;
      border-radius: 4px;
      border: none;
      outline: none;
      padding: 0 16px;
      font-size: 28px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      &::placeholder {
        font-size: 28px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .giveScoreTip {
    font-size: 24px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 16px;
    text-align: center;
  }
  .submitBtn {
    width: 520px;
    height: 72px;
    background: #0100d7;
    border: 2px solid rgba(255, 255, 255, 0.7);
    border-radius: 4px;
    font-size: 28px;
    font-weight: 400;
    color: #ffffff;
    margin: 0 auto;
    margin-top: 144px;
  }
}
</style>
