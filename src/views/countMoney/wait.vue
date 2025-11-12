<template>
  <!-- 数钞票等待 -->
  <div class="wait">
    <div class="wait-wrap" v-if="!isWedding">
    <img
      src="https://static.hudongmiao.com/joymewH5/img/countMoney/title.png"
      class="countMoneyTitle"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/countMoney/hbShell2.png"
      class="hbShell2"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/countMoney/coupon.png"
      class="coupon"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/countMoney/coupon.png"
      class="coupon2"
    />
    <div class="waitTip">
      等待主持人开始数钞票
      <div class="dot">...</div>
    </div>
      <addScoreTool v-if="mpType" />
    </div>
    <div class="wait-wrap wedding" v-else>
      <div class="title" />
      <div class="tip" />
      <div class="hongbao">
        <div class="wait-tip">
          等待主持人开始数钞票
          <div class="dot">...</div>
        </div>
        <div class="start-score">
            <div class="text">初始积分:{{ initialScore }}</div>
        </div>
      </div>
      <div class="bottom" >
        <div class="jiafenbao" v-if="initialScore === 0">
            <div class="jiafenbao-text">
                加分宝
            </div>
            <div class="tool-list">
                <div class="tool-item" v-for="tool in toolList" :key="tool.giftId" >
                    <div class="scoreAdd" @click="chooseToolThenPay(tool.giftId)">+{{ tool.scoreAdd }}</div>
                    <div class="price">{{ tool.price }}元</div>
                </div>
            </div>
        </div>
        <div class="remark">
            注：仅限加1次
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import addScoreTool from '@/components/addScoreTool/index.vue';
import { getGameStatus } from '@/api/index/index';
import wxApi from '@/utils/wxApi';
import { timeoutTask } from '@/utils/index';

const ORIGIN = 'addScoreTool';
const EXTRA_JSON_STR = JSON.stringify({
  wxPayKind: 'addScore',
});

export default {
  name: 'CountMoneyWait',
  components: {
    addScoreTool,
  },
  props: {
    isWedding: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      initialScore: 0,
      timer: null,
      giftIdActive: '',
      toolList: [],
      needTipAfterAddScore: false, // 加分完毕提示是否需要
    };
  },
  computed: {
    mpType() {
      return this.$store.state.app.mpType;
    },
  },
  created() {
    this.initAndLoopGetStatus(2);
  },
  mounted() {},
  beforeDestroy() {
    this.destroyTimer();
  },
  methods: {
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
      this.getInitialScore();
      this.timer = setInterval(() => {
        this.getInitialScore();
      }, duration * 1000);
    },
    async getInitialScore() {
      try {
        const res = await getGameStatus();
        console.log('getGameStatus>>>', res);
        // 返回的数据结构：res: {addScoreInfo: {isPayAddScore: '0',showMap: {addScore1: 1000,....},priceMap: {addScore1: 1000,....},startScore: 0}
        this.initialScore = Number(res.addScoreInfo?.startScore || 0);
        this.toolList = this.getToolList(res.addScoreInfo);
        // 跳转支付过并且有积分说明成功支付了给个提示
        if (this.needTipAfterAddScore && this.initialScore > 0) {
          this.tipAfterAddScore();
        }
      } catch (err) {
        console.log(err);
      }
    },
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
        this.$toast.center(`您已完成加分,初始积分为:${this.initialScore}`);
      }, 300);
      this.needTipAfterAddScore = false;
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.wait {
  position: relative;
  width: 100%;
  height: 100%;
}
.wait-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .countMoneyTitle {
    width: 603px;
    height: 311px;
    margin-top: 179px;
  }
  .hbShell2 {
    width: 612px;
    height: 641px;
    position: absolute;
    bottom: 162px;
  }
  .coupon {
    width: 91px;
    height: 84px;
    position: absolute;
    left: 19px;
    top: 498px;
  }
  .coupon2 {
    width: 91px;
    height: 84px;
    position: absolute;
    right: 19px;
    top: 623px;
    transform: rotate(-95deg);
  }
  .waitTip {
    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    top: 80px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    .dot {
      overflow: hidden;
      position: absolute;
      width: 46px;
      left: 66vw;
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
  &.wedding {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
}
.title {
position: absolute;
top: 5vw;
left: 50%;
transform: translateX(-50%);
width: 100vw;
height: 30vw;
background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/countmoney-title-wedding.png");
background-size: 120% 120%;
background-position: center;
}
.tip {
    position: absolute;
    top: 24vw;
    left: 50%;
    transform: translateX(-50%);
    width: 90vw;
    height: 30vw;
    margin-top: 10vw;
    background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-tip-wedding.png");
    background-size: 100% 100%;
    }
.hongbao {
  margin-top: 70vw;
  width: 100vw;
  height: 82vw;
  background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-hb-wedding.png");
  background-size: 122% 110%;
  background-position: 40% 50%;
  position: relative;
  .wait-tip {
    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    bottom: 20vw;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    .dot {
      overflow: hidden;
      position: absolute;
      width: 46px;
      left: 66vw;
      top: 0vw;
      letter-spacing: 2px;
      animation: ellipsis 1s infinite;
      animation-timing-function: steps(1);
        }
    }
    .start-score {
      width: 50vw;
      height: 15vw;
      position: absolute;
      bottom: 4vw;
      left: 50%;
      transform: translateX(-50%);
      background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-button.png");
      background-size: 100% 100%;
      .text{
        width: 70%;
        height: 4vw;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 3.5vw;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
}
.bottom {
  width: 100vw;
  height: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .jiafenbao {
    width: 85vw;
    height: 40vw;
    background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-ctl.png");
    background-size: 100% 100%;
    position:relative;
    .jiafenbao-text {
      position: absolute;
      width: 30vw;
      left: 50%;
      top: 4vw;
      transform: translateX(-50%);
      font-size: 5vw;
      font-weight: bold;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tool-list {
      position: absolute;
      width: 70vw;
      height: 25vw;
      left: 50%;
      top: 13vw;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tool-item {
        width: 20vw;
        height: 25vw;
        .scoreAdd{
            width: 100%;
            height: 20vw;
            font-size: 3.6vw;
            font-weight: bold;
            font-style: italic;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.1s ease;
            cursor: pointer;

            &:active {
                transform: scale(0.95);
            }
        }
        .price{
            width: 100%;
            height: 5vw;
            font-size: 4vw;
            font-weight: bold;
            color: #FF2F53;
            display: flex;
            align-items: center;
            justify-content: center;
        }
      }
      .tool-item:nth-child(1){
        .scoreAdd{
            background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-button1.png");
            background-size: 100% 100%;
            color: #B16B28;
        }
      }
      .tool-item:nth-child(2){
        .scoreAdd{
            background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-button2.png");
            background-size: 100% 100%;
            color: #005753;
        }
      }
      .tool-item:nth-child(3){
        .scoreAdd{
            background-image: url("https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-button3.png");
            background-size: 100% 100%;
            color: #FFFFB2;
        }
      }
  }
}
    .remark{
        width: 100vw;
        font-size: 4vw;
        font-weight: bold;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
}
</style>
