<template>
  <div class="rechargeContainer publicVCenter">
    <back />
    <img
      src="https://static.hudongmiao.com/joymewMp/recharge/bg-01.png"
      class="bg"
    />
    <img
      :src="headImg"
      class="headImg"
    />
    <div class="nickname">
      {{ name }}
    </div>
    <div class="remain publicVCenter">
      <img
        src="https://static.hudongmiao.com/joymewMp/recharge/diamonds.png"
        class="diamondIcon"
      />
      <div class="remainMoney">
        {{ money }}
      </div>
    </div>
    <!-- 自定义充值区域 -->
    <div class="customRechargeArea publicHCenter">
      <div class="title">
        充值金额
      </div>
      <div class="inputBox">
        <input
          ref="moneyInput"
          v-model="moneyInput"
          placeholder="自定义充值金额"
          type="number"
          maxlength="4"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
    </div>
    <!-- 固定充值金额区域 -->
    <div class="limitRechargeArea">
      <div
        v-for="(item, index) in rechargeList"
        :key="index"
        v-tap="{ methods: chooseMoney, desc: item }"
        class="rechargeItem publicHvCenter"
        :class="{ active: item === activeDesc }"
      >
        <img
          src="https://static.hudongmiao.com/joymewMp/recharge/diamonds.png"
          class="diamondIcon"
        />
        <div
          class="num"
          :class="{ active: item === activeDesc }"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div
      v-tap="{ methods: handleRecharge }"
      class="rechargeBtn"
    >
      立即充值
    </div>
    <div
      v-tap="{ methods: toAgreement }"
      class="agreement"
    >
      阅读并同意《充值服务协议》
    </div>
    <div class="wishSheetTitle publicVCenter">
      <img
        src="https://static.hudongmiao.com/joymewMp/recharge/loveIcon.png"
        class="loveIcon"
      />
      <div class="title">
        祝福榜单
      </div>
      <img
        src="https://static.hudongmiao.com/joymewMp/recharge/loveIcon.png"
        class="loveIcon"
      />
    </div>
    <!-- 祝福榜单列表 -->
    <div class="wishSheetList publicVCenter">
      <div
        v-for="(item, index) in giftRankList"
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
            class="avator"
          />
          <div class="name">
            {{ item.wx_name }}
          </div>
        </div>
        <div class="wish">
          送出价值{{ item.size }}个钻礼物
        </div>
      </div>
    </div>
    <!-- 反馈入口 -->
    <feedbackEntry />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import wxApi from '@/utils/wxApi';
import { getGiftRankList, diamondRecharge } from '@/api/index/index';
import feedbackEntry from '@/components/feedbackEntry/index.vue';
import back from '@/components/back/index.vue';

let requestLock = false;
export default {
  name: 'RechargeOther',
  data() {
    return {
      giftRankList: [],
      moneyInput: '',
      moneyActive: 0,
      activeDesc: '0',
    };
  },
  computed: {
    ...mapState({
      name: (state) => state.user.name,
      headImg: (state) => state.user.headImg,
      money: (state) => state.user.money,
      rechargeList: (state) => state.live.rechargeList,
    }),
    relativeTypeText() {
      return this.relativeType === '1' ? '男方亲友' : '女方亲友';
    },
  },
  components: {
    feedbackEntry,
    back,
  },
  created() {
    requestLock = false;
    this.getGiftRankList();
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'user/setUserInfo',
    }),
    getGiftRankList() {
      getGiftRankList()
        .then((res) => {
          console.log(res);
          this.giftRankList = res.list.map((item, index) => {
            return {
              ...item,
              num: index + 1 < 10 ? `0 + ${index + 1}` : index + 1,
              wx_name: item.wx_name.length <= 6 ? item.wx_name : `${item.wx_name.substr(0, 6)}...`,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleFocus() {
      this.activeDesc = '0';
    },
    handleBlur() {
      this.moneyActive = this.moneyInput;
    },
    chooseMoney(e) {
      this.$refs.moneyInput.blur();
      this.moneyInput = '';
      this.moneyActive = e.desc;
      this.activeDesc = e.desc;
    },
    handleRecharge() {
      this.$refs.moneyInput.blur();
      if (!this.moneyActive) {
        this.$toast.center('请输入或者选择充值金额!');
        return;
      }
      if (this.moneyActive === '0') {
        this.$toast.center('充值金额不能为0!');
        return;
      }
      if (requestLock) {
        return;
      }
      requestLock = true;
      console.log(this.moneyActive);
      diamondRecharge({
        total: this.moneyActive,
      })
        .then((res) => {
          console.log(res);
          return wxApi.pay(res);
        })
        .then(() => {
          // 前端处理用户余额增加
          const tmpRemainMoney = (parseFloat(this.money) + parseFloat(this.moneyActive)).toFixed(2);
          this.setUserInfo({
            money: tmpRemainMoney,
          });
          this.$toast.center('充值成功!');
          requestLock = false;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.center('充值失败!');
          requestLock = false;
        });
    },
    toAgreement() {
      window.location.href = '/agreement/index.html';
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.rechargeContainer {
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
  .headImg {
    position: absolute;
    width: 105px;
    height: 99px;
    top: 102px;
  }
  .nickname {
    font-size: 30px;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    top: 222px;
  }
  .remain {
    font-size: 34px;
    font-weight: 500;
    position: absolute;
    color: #ffffff;
    top: 294px;
    .diamondIcon {
      width: 40px;
      height: 32px;
      margin-right: 13px;
    }
  }
  .customRechargeArea {
    width: 648px;
    height: 184px;
    background: #fee857;
    border-radius: 15px 15px 0px 0px;
    position: absolute;
    top: 378px;
    .title {
      font-size: 24px;
      font-weight: 400;
      color: #a24935;
      position: absolute;
      top: 32px;
      left: 44px;
    }
    .inputBox {
      width: 572px;
      height: 66px;
      border-bottom: 1px solid rgba(162, 73, 53, 0.3);
      position: absolute;
      top: 78px;
      input {
        font-size: 32px;
        font-weight: 400;
        color: #a24935;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        outline: none;
        border: none;
        background-color: transparent;
      }
    }
  }
  .limitRechargeArea {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    position: absolute;
    top: 615px;
    width: 641px;
    .rechargeItem {
      width: 187px;
      height: 180px;
      flex-direction: column;
      margin: 32px 0;
      background-size: 100% 100%;
      background-image: url('https://static.hudongmiao.com/joymewMp/recharge/coupon.png');
      .diamondIcon {
        width: 69px;
        height: 55px;
      }
      .num {
        font-size: 55px;
        font-weight: 500;
        color: #9c2cf3;
        margin-top: 6px;
        &.active {
          color: #ffffff;
        }
      }
      &.active {
        background-image: url('https://static.hudongmiao.com/joymewMp/recharge/coupon2.png');
      }
    }
  }
  .rechargeBtn {
    position: absolute;
    width: 500px;
    height: 79px;
    border-radius: 6px;
    background-image: url('https://static.hudongmiao.com/joymewMp/recharge/btn.png');
    background-size: 100% 100%;
    top: 1101px;
    text-align: center;
    line-height: 79px;
    font-size: 34px;
    font-weight: 500;
    color: #a24935;
  }
  .agreement {
    font-size: 24px;
    font-weight: 500;
    color: #9c2bf3;
    position: absolute;
    top: 1200px;
  }
  .wishSheetTitle {
    position: absolute;
    top: 1288px;
    font-size: 36px;
    font-weight: 500;
    color: #ffffff;
    .loveIcon {
      width: 30px;
      height: 26px;
      margin: 0 30px;
    }
  }
  .wishSheetList {
    position: absolute;
    top: 1355px;
    width: 100%;
    flex-direction: column;
    background-color: #8a1dd3;
    .item {
      width: 695px;
      height: 114px;
      background: rgba(84, 59, 144, 0.3);
      border-radius: 8px;
      justify-content: space-between;
      padding: 0 35px 0 28px;
      .leftCt {
        .medalImg {
          width: 39px;
          height: 50px;
        }
        .num {
          font-size: 28px;
          font-weight: 400;
          color: #ffffff;
        }
        .avator {
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
