<template>
  <div class="addScoreToolContainer publicVCenter" :class="{ moneyTreeStyle: toolStyle === 'moneyTreeStyle' }">
    <!-- 初始积分 -->
    <div class="init-addscore_box">初始积分：{{ scoreAdd }}</div>
    <!-- 加分宝标题 -->
    <div class="add-score_logo" />
    <template v-if="scoreAdd === 0">
      <div class="tools-list">
        <div class="tool-item" v-for="tool in toolList" :key="tool.giftId" @click="chooseToolThenPay(tool.giftId)">
          <div class="scoreAdd">{{ tool.scoreAdd }}分</div>
          <div class="price">{{ tool.price }}元</div>
        </div>
      </div>
      <div class="remark">注：仅限加1次</div>
    </template>
  </div>
</template>

<script>
import { getGameStatus } from '@/api/index/index';
import wxApi from '@/utils/wxApi';
import { timeoutTask } from '@/utils/index';

const ORIGIN = 'addScoreTool';
const EXTRA_JSON_STR = JSON.stringify({
  wxPayKind: 'addScore',
});
export default {
  props: {
    toolStyle: {
      // 取值 default(通用的加分宝样式) moneyTreeStyle(摇钱树的加分宝样式独有)
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      giftIdActive: '',
      toolList: [],
      needTipAfterAddScore: false, // 加分完毕提示是否需要
      scoreAdd: 0, // 加的分数 不为0表示购买过加分宝
    };
  },
  mounted() {
    this.initAndLoopGetStatus(2);
  },
  beforeDestroy() {
    this.destroyTimer();
  },
  methods: {
    /**
     * 跳转完成支付
     */
    toPay() {
      if (!this.giftIdActive) {
        this.$toast.center('请选择加分道具!');
        return;
      }
      this.needTipAfterAddScore = true;
      console.log(
        `/pages/pay/pay?giftId=${this.giftIdActive}&openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&extraJsonStr=${EXTRA_JSON_STR}&origin=${ORIGIN}`,
      );
      wxApi.navigateTo(
        `/pages/pay/pay?giftId=${this.giftIdActive}&openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&extraJsonStr=${EXTRA_JSON_STR}&origin=${ORIGIN}`,
      );
    },
    chooseToolThenPay(giftId) {
      this.$loading('请求中...');
      this.giftIdActive = giftId;
      // 延迟300ms后跳转支付
      timeoutTask(() => {
        this.toPay();
        this.$loading.close();
      }, 300);
    },
    /**
     * 销毁定时器
     */
    destroyTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    /**
     * 初始化以及轮询获取状态
     */
    initAndLoopGetStatus(duration = 2) {
      this.getStatus();
      this.timer = setInterval(() => {
        this.getStatus();
      }, duration * 1000);
    },
    /**
     * 获取状态
     */
    async getStatus() {
      try {
        const res = await getGameStatus();
        console.log('getGameStatus>>>', res);
        // 返回的数据结构：res: {addScoreInfo: {isPayAddScore: '0',showMap: {addScore1: 1000,....},priceMap: {addScore1: 1000,....},startScore: 0}
        this.scoreAdd = Number(res.addScoreInfo.startScore || 0);
        this.toolList = this.getToolList(res.addScoreInfo);
        // 跳转支付过并且有积分说明成功支付了给个提示
        if (this.needTipAfterAddScore && this.scoreAdd > 0) {
          this.tipAfterAddScore();
        }
      } catch (err) {
        console.log(err);
      }
    },
    getToolList({ showMap, priceMap }) {
      return Object.keys(showMap).map((key) => {
        return {
          giftId: key,
          price: priceMap[key],
          scoreAdd: showMap[key],
        };
      });
    },
    tipAfterAddScore() {
      timeoutTask(() => {
        this.$toast.center(`您已完成加分,初始积分为:${this.scoreAdd}`);
      }, 300);
      this.needTipAfterAddScore = false;
    },
  },
};
</script>

<style lang="less" scoped>
.addScoreToolContainer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  flex-direction: column;
  padding-bottom: 40px;

  .init-addscore_box {
    width: 385px;
    height: 62px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 85px;
    text-align: center;
    line-height: 62px;
    font-size: 27px;
    color: #fff;
    font-weight: 500;
  }

  .add-score_logo {
    width: 123.08px;
    height: 123.08px;
    margin-top: 23px;
    background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/addScoreTool/shandian.png');
    background-size: 100% 100%;
  }

  .tools-list {
    margin-top: 12px;
    width: 496.15px;
    height: 142.31px;
    background-size: 100% 100%;
    background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/addScoreTool/addScoreDialogBox.png');
    padding: 0 44px;
    display: flex;
    padding-top: 38px;
    justify-content: space-between;

    .tool-item {
      width: 88.46px;
      height: 88.46px;
      font-size: 15px;
      background-size: 100% 100%;
      text-align: center;

      .scoreAdd {
        width: 50px;
        height: 50px;
        line-height: 50px;
        margin: 0 auto;
        margin-top: 1vw;
      }

      .price {
        font-weight: 600;
        margin-top: 5px;
        color: #fff;
      }

      &:nth-child(1) {
        color: #6b9bfe;
        background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/addScoreTool/blue-card.png');
      }

      &:nth-child(2) {
        color: #fd5650;
        background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/addScoreTool/red-card.png');
      }

      &:nth-child(3) {
        color: #ff9c21;
        background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/addScoreTool/golden-card.png');
      }
    }
  }

  .remark {
    margin-top: 15px;
    font-size: 23.08px;
    font-weight: 400;
    color: #c78900;
  }

  &.moneyTreeStyle {
    .init-addscore_box {
      background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/init-title_bg.png");
      background-size: 47vw 13vw;
      background-repeat: no-repeat;
      background-position: 1.5vw -1.5vw;
      width: 379px;
      height: 67px;
      font-size: 26px;
      color: #7F0F15;
      background-color: unset;
      line-height: 67px;
    }

    .add-score_logo {
      background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/addScore-title_bg.png");
      background-size: 406px 128px;
      background-repeat: no-repeat;
      background-position: -1vw -2.8vw;
      width: 377px;
      height: 63px;
      font-size: 28px;
      color: #fff;
      text-align: center;
      line-height: 63px;
      position: absolute;
      top: 9vw;
      z-index: 1;

      &::after {
        content: "加分宝";
        display: block;
      }
    }

    .tools-list {
      width: 679px;
      height: 335px;
      background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/white-box.png");
      background-size: 98vw 55vw;
      background-repeat: no-repeat;
      background-position-y: -10vw;
      background-position-x: -5vw;
      justify-content: center;
      align-items: center;
      column-gap: 30px;
      padding: unset;
      position: relative;
      margin-top: 52px;
      &::after {
        content: "";
        display: block;
        background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/golden-botm.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 280px;
        height: 56px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      .tool-item {
        width: 129px;
        height: 129px;
        background-repeat: no-repeat;
        position: relative;
        text-align: center;

        .scoreAdd {
          font-size: 26px;
          font-weight: bold;
          width: 100%;
          height: 100%;
          line-height: 120px;
        }

        .price {
          font-size: 22px;
          color: #770006;
          position: absolute;
          top: 18.5vw;
          left: 50%;
          transform: translateX(-50%);
        }

        &:nth-child(1) {
          background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/addItem3.png");
          background-size: 100% 100%;
          .scoreAdd {
            color: #FFFFB2;
          }
        }

        &:nth-child(2) {
          background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/addItem2.png");
          background-size: 21vw 21vw;
          background-position: -3vw -3vw;
          background-repeat: no-repeat;
          .scoreAdd {
            color: #00736E;
          }
        }

        &:nth-child(3) {
          background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/addItem1.png");
          background-size: 21vw 21vw;
          background-position: -3vw -3vw;
          background-repeat: no-repeat;
          .scoreAdd {
            color: #B16B28;
          }
        }
      }
    }

    .remark {
      color: #fff;
    }
  }
}
</style>
