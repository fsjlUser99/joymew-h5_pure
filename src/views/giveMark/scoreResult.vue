<template>
  <div class="scoreResult-wrap">
    <div class="titleBox publicHvCenter">
      <div class="dot d1" />
      <div class="dot d2" />
      <div class="dot d3" />
      <div class="dot d4" />
      您的评分
    </div>
    <div class="scoreTip">
      您为{{ currentPlayer.num }} {{ currentPlayer.name }}的评分是:
    </div>
    <div class="score">
      {{ mark }}
    </div>
    <div class="bottomTip">
      <p>感谢您的评分</p>
      <p>请等待下一位选手的评分</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScoreResult',
  props: {
    mark: Number,
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
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.scoreResult-wrap {
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
        left: 535px;
        top: 45px;
        border-radius: unset;
      }
    }
  }
  .scoreTip {
    font-size: 36px;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    margin: 0 auto;
    margin-top: 272px;
  }
  .score {
    font-size: 192px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 auto;
    margin-top: 38px;
    text-align: center;
  }
  .bottomTip {
    font-size: 28px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    position: absolute;
    bottom: 106px;
    width: 100%;
    p {
      text-align: center;
      width: 100%;
      &:nth-child(1) {
        margin-bottom: 24px;
      }
    }
  }
}
</style>
