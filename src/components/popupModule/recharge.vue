<template>
  <div class="rechargeModule publicHCenter">
    <div
      class="rechargeBox"
      :class="{ show: isShowAni }"
    >
      <div class="rechargeHeader">
        <div class="tit">充值</div>
        <!-- 固定充值列表 -->
        <div class="rechargeList">
          <div
            v-for="(item, index) in rechargeList"
            :key="index"
            v-tap="{ methods: chooseRechargeItem, paramObj: item }"
            class="rechargeItem publicHvCenter"
            :class="{ active: currentActiveMoney === item }"
          >
            <img
              src="https://static.hudongmiao.com/joymewMp/recharge/diamonds.png"
              class="diamondIcon"
            />
            <label>{{ item }}</label>
          </div>
        </div>
        <div class="rechargeBottom">
          <div class="remain publicHvCenter">
            <label>余额：{{ money }}</label>
            <img
              src="https://static.hudongmiao.com/joymewMp/recharge/diamonds.png"
              class="diamonds"
            />
          </div>
          <div
            v-tap="{ methods: toRecharge }"
            class="rechargeBtn publicHvCenter"
          >
            确认充值
          </div>
        </div>
        <div
          v-tap="{ methods: toAgreement }"
          class="agreement"
        >
          阅读并同意《充值服务协议》
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { timeoutTask } from '@/utils/index';
import wxApi from '@/utils/wxApi';

export default {
  name: 'GiftPopup',
  computed: {
    ...mapState({
      money: (state) => state.user.money,
      rechargeList: (state) => state.live.rechargeList,
      env: (state) => state.app.env,
    }),
  },
  created() {},
  data() {
    return {
      isShowAni: false, // 控制recharge box弹出动画
      currentActiveMoney: '10',
    };
  },
  mounted() {
    // 执行弹出动画
    this.showAniStart();
    // console.log(this.giftList_format);
    // console.log(this.giftList);
    console.log('***充值列表展示***');
    console.log(this.rechargeList);
  },
  methods: {
    // ...mapMutations({
    //   setUserInfo: 'user/setUserInfo',
    // }),
    showAniStart() {
      timeoutTask(() => {
        this.isShowAni = true;
      }, 100);
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    chooseRechargeItem(param) {
      console.log('***recharge code***');
      console.log(param.paramObj);
      this.currentActiveMoney = param.paramObj;
    },
    toRecharge() {
      console.log('***跳转地址***');
      console.log(
        `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.currentActiveMoney}&origin=${this.$store.state.app.origin}`,
      );
      if (this.env === 'miniProgram') {
        if (this.$store.state.app.mpType) {
          wxApi.navigateTo(
            `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.currentActiveMoney}&origin=rechargeMiaobi`,
          );
        } else {
          wxApi.navigateTo(
            `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.currentActiveMoney}&origin=${this.$store.state.app.origin}`,
          );
        }
      } else if (this.env === 'tt') {
        wxApi.navigateToTt(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.currentActiveMoney}&origin=${this.$store.state.app.origin}`,
        );
      }
    },
    toAgreement() {
      window.location.href = '/agreement/index.html';
    },
  },
};
</script>
<style lang="less" scoped>
@import 'vue-swipe/dist/vue-swipe.css';

.rechargeModule {
  position: absolute;
  width: 100%;
  height: 780px;
  bottom: 0;
  overflow: hidden;
  .rechargeBox {
    width: 750px;
    height: 780px;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    background-color: #ffffff;
    transition: all 0.2s linear;
    position: absolute;
    top: 708px;
    background-position-y: 90px;
    .rechargeHeader {
      position: absolute;
      left: 48px;
      top: 53px;
      .tit {
        font-size: 40px;
        letter-spacing: 8px;
        color: #ffffff;
        text-shadow:
          #9c2bf3 1px 0 0,
          #9c2bf3 0 1px 0,
          #9c2bf3 -1px 0 0,
          #9c2bf3 0 -1px 0,
          #9c2bf3 2px 0 0,
          #9c2bf3 0 2px 0,
          #9c2bf3 -2px 0 0,
          #9c2bf3 0 -2px 0,
          #9c2bf3 3px 0 0,
          #9c2bf3 0 3px 0,
          #9c2bf3 -3px 0 0,
          #9c2bf3 0 -3px 0;
      }
      .rechargeList {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        .rechargeItem {
          width: 187px;
          height: 180px;
          background-image: url('https://static.hudongmiao.com/joymewH5/img/popupArea/rechargeCard.png');
          background-size: 100% 100%;
          margin: 13px 17px;
          flex-direction: column;
          .diamondIcon {
            width: 69px;
            height: 55px;
          }
          label {
            font-size: 55px;
            font-weight: 500;
            color: #9c2cf3;
            margin-top: 6px;
          }
          &.active {
            background-image: url('https://static.hudongmiao.com/joymewH5/img/popupArea/rechargeCardActive.png');
            label {
              color: #ffffff;
            }
          }
        }
      }
      .rechargeBottom {
        display: flex;
        justify-content: space-around;
        margin-top: 48px;
        .remain {
          //   width: 217px;
          padding: 0 12px;
          height: 80px;
          border-radius: 40px;
          border: solid 1px #fee857;
          label {
            font-size: 28px;
            font-weight: normal;
            letter-spacing: 1px;
            color: #333333;
          }
          .diamonds {
            width: 32px;
            height: 25px;
            margin-left: 12px;
          }
        }
        .rechargeBtn {
          width: 260px;
          height: 80px;
          background-image: url('https://static.hudongmiao.com/joymewH5/img/popupArea/rechargeBtnBg.png');
          background-size: 100% 100%;
          font-size: 34px;
          letter-spacing: 3px;
          color: #a24935;
        }
      }
      .agreement {
        font-size: 24px;
        font-weight: 400;
        color: #9c2cf3;
        text-align: center;
        margin-top: 20px;
      }
    }
    &.show {
      transform: translateY(-708px);
    }
  }
  @keyframes bounceIn {
    0%,
    100%,
    20%,
    40%,
    60%,
    80% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 1;
      transform: scale3d(0.9, 0.9, 0.9);
    }

    20% {
      transform: scale3d(1.2, 1.2, 1.2);
    }

    40% {
      transform: scale3d(0.9, 0.9, 0.9);
    }

    60% {
      transform: scale3d(1.2, 1.2, 1.2);
    }

    80% {
      transform: scale3d(0.9, 0.9, 0.9);
    }

    100% {
      transform: scale3d(1, 1, 1);
    }
  }
}
</style>
