<template>
  <div class="hbkdRechargeContainer publicVCenter">
    <back />
    <img
      src="https://static.hudongmiao.com/joymewMp/hbkdRecharge/bg2-01.png"
      class="bg"
    />
    <div
      class="remainArea publicVCenter"
      :class="{ spec: !hbkdRemainVisible }"
    >
      <div class="hbkdTitle">
        红包口袋
      </div>
      <div
        v-if="hbkdRemainVisible"
        class="remainMoney"
      >
        {{ remainMoney }}元
      </div>
      <div class="tip publicVCenter">
        <div>口袋内金额将用于红包雨等全场互动</div>
      </div>
    </div>
    <div class="rechargeArea">
      <div class="rechargeListWrap">
        <div
          v-for="(item, index) in hbkdRechargeListDisplay"
          :key="index"
          v-tap="{ methods: handleTap, p: item }"
          class="rechargeItem publicHvCenter"
          :style="{ backgroundImage: 'url(' + item.bg + ')' }"
        >
          <div
            v-if="!item.isCustom"
            class="price"
          >
            {{ item.price }}元
          </div>
          <div
            v-if="item.isCustom && !inputVisible"
            class="price"
          >
            {{ item.price }}
          </div>
          <input
            v-if="item.isCustom && inputVisible"
            ref="mInput"
            v-model="moneyInput"
            type="number"
            maxlength="4"
            @blur="handleMoneyBlur"
          />
          <div
            v-if="item.isCustom && inputVisible"
            class="unit"
          >
            元
          </div>
          <div
            v-if="item.isCustom && !inputVisible"
            class="tip"
          >
            {{ item.txt }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-tap="{ methods: toAgreement }"
      class="agreement"
    >
      阅读并同意《充值服务协议》
    </div>
    <div class="rewardSheetTitle publicVCenter">
      <img
        src="https://static.hudongmiao.com/joymewMp/recharge/loveIcon.png"
        class="loveIcon"
      />
      <div class="title">
        {{ prizeSize }}次赞赏
      </div>
      <img
        src="https://static.hudongmiao.com/joymewMp/recharge/loveIcon.png"
        class="loveIcon"
      />
    </div>
    <div class="rewardSheetList publicVCenter">
      <div
        v-for="(item, index) in hbkdList"
        :key="index"
        class="item publicVCenter"
      >
        <div class="leftCt publicVCenter">
          <img
            v-if="index === 0"
            src="https://static.hudongmiao.com/joymewMp/recharge/firstMedal.png"
            class="medalImg"
          />
          <img
            v-if="index === 1"
            src="https://static.hudongmiao.com/joymewMp/recharge/secondMedal.png"
            class="medalImg"
          />
          <img
            v-if="index === 2"
            src="https://static.hudongmiao.com/joymewMp/recharge/thirdMedal.png"
            class="medalImg"
          />
          <div
            v-if="index > 2"
            class="num"
          >
            {{ item.num }}
          </div>
          <img
            :src="item.avator"
            class="headImg"
          />
          <div class="name">
            {{ item.wx_name }}
          </div>
        </div>
        <div class="wish">
          累计打赏{{ item.allGold }}元
        </div>
      </div>
    </div>
    <!-- 反馈入口 -->
    <feedbackEntry />
  </div>
</template>
<script>
import wxApi from '@/utils/wxApi';
import feedbackEntry from '@/components/feedbackEntry/index.vue';
import { mapState, mapMutations } from 'vuex';
import { getHBKDInfo, rechageHbkd } from '@/api/index/index';
import back from '@/components/back/index.vue';

const rechargeLocatInfo = [
  {
    price: 0,
    txt: '充值',
    bg: 'https://static.hudongmiao.com/joymewMp/hbkdRecharge/coupon6.png',
  },
  {
    price: 0,
    txt: '充值',
    bg: 'https://static.hudongmiao.com/joymewMp/hbkdRecharge/coupon5.png',
  },
  {
    price: 0,
    txt: '充值',
    bg: 'https://static.hudongmiao.com/joymewMp/hbkdRecharge/coupon1.png',
  },
  {
    price: 0,
    txt: '充值',
    bg: 'https://static.hudongmiao.com/joymewMp/hbkdRecharge/coupon2.png',
  },
  {
    price: 0,
    txt: '充值',
    bg: 'https://static.hudongmiao.com/joymewMp/hbkdRecharge/coupon3.png',
  },
  {
    price: '',
    txt: '自定义金额',
    bg: 'https://static.hudongmiao.com/joymewMp/hbkdRecharge/coupon4.png',
  },
  {
    price: 0,
    txt: '充值',
    bg: 'https://static.hudongmiao.com/joymewMp/hbkdRecharge/coupon6.png',
  },
  {
    price: 0,
    txt: '充值',
    bg: 'https://static.hudongmiao.com/joymewMp/hbkdRecharge/coupon5.png',
  },
  {
    price: 0,
    txt: '充值',
    bg: 'https://static.hudongmiao.com/joymewMp/hbkdRecharge/coupon1.png',
  },
];
let requestLock = false;
export default {
  name: 'HbkdRecharge',
  data() {
    return {
      hbkdRechargeListDisplay: [],
      inputVisible: false,
      moneyInput: '',
      prizeSize: 0,
      hbkdList: [],
    };
  },
  computed: {
    ...mapState({
      hbkdRechargeList: (state) => state.live.hbkdRechargeList,
      remainMoney: (state) => state.live.remainMoney,
      hbkdRemainVisible: (state) => state.app.hbkdRemainVisible,
    }),
  },
  components: {
    feedbackEntry,
    back,
  },
  created() {
    requestLock = false;
    this.handleHbkdRechargeList();
    this.getHbkdList();
  },
  methods: {
    ...mapMutations({
      setHbkdInfo: 'live/setHbkdInfo',
    }),
    handleHbkdRechargeList() {
      const len = rechargeLocatInfo.length;
      const tmpList = this.hbkdRechargeList.split(',');
      for (let i = 0; i < len; i += 1) {
        if (i <= 4) {
          this.hbkdRechargeListDisplay.push({
            price: tmpList[i],
            bg: rechargeLocatInfo[i].bg,
            txt: rechargeLocatInfo[i].txt,
            isCustom: false,
          });
        } else if (i === 5) {
          this.hbkdRechargeListDisplay.push({
            price: '土豪随意',
            bg: rechargeLocatInfo[i].bg,
            txt: rechargeLocatInfo[i].txt,
            isCustom: true,
          });
        } else {
          this.hbkdRechargeListDisplay.push({
            price: tmpList[i - 1],
            bg: rechargeLocatInfo[i].bg,
            txt: rechargeLocatInfo[i].txt,
            isCustom: false,
          });
        }
      }
    },
    handleTap(e) {
      console.log(e.p);
      if (e.p.isCustom) {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.mInput[0].focus();
        });
      } else {
        this.inputVisible = false;
        console.log(e.p.price);
        this.pay(e.p.price);
      }
    },
    handleMoneyBlur() {
      if (!this.moneyInput) {
        this.$toast.center('请输入或者选择充值金额!');
        return;
      }
      if (this.moneyInput === '0') {
        this.$toast.center('充值金额不能为0!');
        return;
      }
      console.log(this.moneyInput);
      this.pay(this.moneyInput);
    },
    toAgreement() {
      window.location.href = '/agreement/index.html';
    },
    getHbkdList() {
      getHBKDInfo()
        .then((res) => {
          console.log(res);
          this.setHbkdInfo({
            remainMoney: res.money,
          });
          this.hbkdList = res.list.map((item, index) => {
            return {
              ...item,
              num: index + 1 < 10 ? `0${index + 1}` : index + 1,
              wx_name: item.wx_name.length <= 6 ? item.wx_name : `${item.wx_name.substr(0, 6)}...`,
            };
          });
          this.prizeSize = res.list.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pay(choosedMoney) {
      if (requestLock) {
        return;
      }
      requestLock = true;
      rechageHbkd({
        total: choosedMoney,
      })
        .then((res) => {
          console.log(res);
          return wxApi.pay(res);
        })
        .then((res2) => {
          console.log(res2);
          this.getHbkdList();
          this.$toast.center('支付成功!');
          requestLock = false;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.center('支付失败!');
          requestLock = false;
        });
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.hbkdRechargeContainer {
  position: relative;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #f4f7f9;
  .bg {
    position: absolute;
    width: 100%;
  }
  .remainArea {
    width: 100%;
    height: 435px;
    background-image: url('https://static.hudongmiao.com/joymewMp/hbkdRecharge/rainbow-01.png');
    background-size: 100% 100%;
    position: absolute;
    top: 83px;
    color: #ffffff;
    flex-direction: column;
    z-index: 1;
    .hbkdTitle {
      font-size: 34px;
      font-weight: 400;
      margin-top: 73px;
    }
    .remainMoney {
      font-size: 66px;
      font-weight: bold;
    }
    .tip {
      font-size: 20px;
      font-weight: 400;
      margin-top: 5px;
      flex-direction: column;
    }
    &.spec {
      .hbkdTitle {
        font-size: 62px;
        margin-top: 96px;
      }
      .tip {
        font-size: 32px;
        margin-top: 27px;
      }
    }
  }
  .rechargeArea {
    width: 660px;
    height: 746px;
    background: #ffffff;
    border-radius: 72px;
    position: absolute;
    top: 288px;
    .rechargeListWrap {
      width: 100%;
      position: absolute;
      top: 191px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .rechargeItem {
        width: 191px;
        height: 124px;
        background-size: 100% 100%;
        color: #ffffff;
        font-weight: 400;
        flex-direction: column;
        margin: 23px 0;
        position: relative;
        .price {
          font-size: 34px;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        }
        .tip {
          font-size: 19px;
        }
        .unit {
          font-size: 32px;
          position: absolute;
          color: #ffffff;
          right: 23px;
        }
        input {
          width: 95px;
          height: 80px;
          color: #ffffff;
          font-size: 34px;
          margin-right: 25px;
          background-color: transparent;
          border: none;
          outline: none;
        }
      }
    }
  }
  .agreement {
    font-size: 24px;
    font-weight: 400;
    color: #ffd027;
    position: absolute;
    top: 1069px;
  }
  .rewardSheetTitle {
    position: absolute;
    top: 1288px;
    font-size: 36px;
    font-weight: 500;
    color: #ffffff;
    top: 1137px;
    .loveIcon {
      width: 30px;
      height: 26px;
      margin: 0 30px;
    }
  }
  .rewardSheetList {
    position: absolute;
    top: 1223px;
    width: 100%;
    flex-direction: column;
    background-color: #8a1dd3;
    .item {
      width: 695px;
      height: 114px;
      background: rgba(84, 59, 144, 0.3);
      border-radius: 8px;
      padding: 0 35px 0 28px;
      justify-content: space-between;
      .leftCt {
        .medalImg {
          width: 39px;
          height: 50px;
        }
        .headImg {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin: 0 22px 0 17px;
        }
        .name {
          font-size: 28px;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .wish {
        font-size: 28px;
        font-weight: 400;
        color: #fff32e;
      }
    }
  }
}
</style>
