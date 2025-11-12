<template>
  <!-- 猜红包支付 -->
  <div class="guessHbPay-wrap publicVCenter">
    <img
      :src="avator"
      class="avator"
    />
    <div class="gameTit">
      新婚红包竞猜
    </div>
    <div
      v-if="status === 0"
      class="gameMainBox"
      :class="{ boxShowAni: boxShowAni, boxShow: boxShow, textShowAni: textShowAni, iptShowAni: iptShowAni }"
    >
      <img
        v-if="activeShine"
        :src="activeShine"
        class="shineImg"
        :class="{ active: shineShow }"
      />
      <div class="tip">
        请填写红包金额
      </div>
      <div class="iptGroup">
        <div v-tap="{ methods: tapInput, index: 0 }">
          <input
            v-model="iptVal1"
            type="number"
            pattern="[0-9]*"
            disabled
          />
        </div>
        <div v-tap="{ methods: tapInput, index: 1 }">
          <input
            v-model="iptVal2"
            type="number"
            pattern="[0-9]*"
            disabled
          />
        </div>
        <div v-tap="{ methods: tapInput, index: 2 }">
          <input
            v-model="iptVal3"
            type="number"
            pattern="[0-9]*"
            disabled
          />
        </div>
        <div v-tap="{ methods: tapInput, index: 3 }">
          <input
            v-model="iptVal4"
            type="number"
            pattern="[0-9]*"
            disabled
          />
        </div>
        <div class="dot" />
        <div v-tap="{ methods: tapInput, index: 4 }">
          <input
            v-model="iptVal5"
            type="number"
            pattern="[0-9]*"
            disabled
          />
        </div>
        <div v-tap="{ methods: tapInput, index: 5 }">
          <input
            v-model="iptVal6"
            type="number"
            pattern="[0-9]*"
            disabled
          />
        </div>
        <input
          ref="hideIpt"
          v-model="iptVal"
          type="number"
          pattern="[0-9]*"
          class="hideIpt"
          maxlength="6"
          @input="handleIptInput"
        />
      </div>
      <div class="sTip">
        小提示：可输入俩位小数，例如你们的特殊纪念日作 为竞猜数字
      </div>
      <div class="sTip">
        多余的位置用0补齐，如 0012.00表示12
      </div>
      <div class="identityArea">
        <div class="key">
          您的身份是：
        </div>
        <div class="valList">
          <div
            v-for="item in identityList"
            :key="item.id"
            v-tap="{ methods: chooseIdentity, id: item.id }"
            class="identityItem publicHvCenter"
            :class="{ active: activeIdentityId === item.id }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div
        class="confirmBtn publicHvCenter"
        @click="confirmGuess"
      >
        确认竞猜
      </div>
      <div class="secretTip">
        请不要把竞猜数字告诉他人
      </div>
    </div>
    <div
      v-if="status === 1"
      class="gameResultBox"
    >
      <img
        v-if="activeShine"
        :src="activeShine"
        class="shineImg"
        :class="{ active: shineShow }"
      />
      <!-- <div class="tip">我填写的红包</div>
      <div class="iptGroup publicHCenter">
        <input type="number" readonly :value="item" v-for="(item, index) in interArrayMy" :key="'inter' + index" />
        <div class="dot" v-show="decimalArrayMy.length > 0"></div>
        <input type="number" readonly :value="item" v-for="(item, index) in decimalArrayMy" :key="'decimal' + index" />
      </div> -->
      <div class="beginTip">
        猜红包game正式开始
      </div>
      <div class="secretTip">
        请不要把竞猜数字告诉他人
      </div>
    </div>
  </div>
</template>
<script>
import wxApi from '@/utils/wxApi';
import { payGuessHb, getPayStatus } from '@/api/guessHb/index';
import { timeoutTask } from '@/utils/index';

const SHINELIST = [
  'https://static.joymew.com/joymewMp/guessHb/shine/s1.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s2.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s3.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s4.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s5.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s6.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s7.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s8.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s9.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s10.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s11.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s12.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s13.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s14.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s15.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s16.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s17.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s18.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s19.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s20.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s21.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s22.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s23.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s24.png',
  'https://static.joymew.com/joymewMp/guessHb/shine/s25.png',
];
let shineIndex = 0;
let timer = null;
export default {
  name: 'GuessHbPay',
  data() {
    return {
      // 输入框
      iptVal1: '',
      iptVal2: '',
      iptVal3: '',
      iptVal4: '',
      iptVal5: '',
      iptVal6: '',
      iptVal: '',
      resultNum: '',
      startIndex: 0,
      // 充值状态
      status: 0, // 0:充值界面 1:充值成功
      // 控制盒子动画
      hasBoxAniShow: false,
      boxShowAni: false,
      boxShow: false,
      textShowAni: false,
      iptShowAni: false,
      // 控制光效动画
      activeShine: '',
      shineShow: false,
      // 头像
      avator: '',
      // 身份
      identityList: [
        {
          id: '1',
          name: '新郎',
        },
        {
          id: '2',
          name: '新娘',
        },
        {
          id: '3',
          name: '亲友',
        },
      ],
      activeIdentityId: '1',
    };
  },
  computed: {
    interArray() {
      return [this.iptVal1, this.iptVal2, this.iptVal3, this.iptVal4];
    },
    decimalArray() {
      return [this.iptVal5, this.iptVal6];
    },
  },
  created() {
    wxApi.initWXAPI();
    this.updateStatus();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleIptInput() {
      console.log(this.iptVal);
      this.iptVal = this.iptVal.slice(0, 6 - this.startIndex);
      for (let i = this.startIndex; i < 6; i += 1) {
        this[`iptVal${i + 1}`] = this.iptVal.charAt(i - this.startIndex);
      }
      if (this.iptVal === '') {
        for (let i = 0; i < this.startIndex; i += 1) {
          this[`iptVal${i + 1}`] = '';
        }
      }
    },
    chooseIdentity(pObj) {
      console.log(pObj.id);
      this.activeIdentityId = pObj.id;
    },
    convertEmptyToZero() {
      for (let i = 0; i < 4; i += 1) {
        if (this[`iptVal${i + 1}`] === '') {
          this[`iptVal${i + 1}`] = 0;
        }
      }
      for (let i = 0; i < 2; i += 1) {
        if (this[`iptVal${i + 5}`] === '') {
          this[`iptVal${i + 5}`] = 0;
        }
      }
    },
    removeHeadZero() {
      this.resultNum = '';
      const interArray = [this.iptVal1, this.iptVal2, this.iptVal3, this.iptVal4];
      let firstUnZeroInterIndex = -1; // 记录第一个非0数字的整数数组索引
      for (let i = 0; i < 4; i += 1) {
        if (interArray[i] !== 0) {
          firstUnZeroInterIndex = i;
          break;
        }
      }
      if (firstUnZeroInterIndex === -1) {
        // 四个整数都为0
        this.resultNum += '0';
      } else {
        this.resultNum += interArray.slice(firstUnZeroInterIndex, 4).join('');
      }

      if (this.iptVal5 !== 0 && this.iptVal6 === 0) {
        this.resultNum += `.${this.iptVal5}`;
      } else if (this.iptVal5 === 0 && this.iptVal6 !== 0) {
        this.resultNum += `.0${this.iptVal6}`;
      } else if (this.iptVal5 !== 0 && this.iptVal6 !== 0) {
        this.resultNum += `.${this.iptVal5}${this.iptVal6}`;
      }
    },
    confirmGuess() {
      // 空字符串转成0
      this.convertEmptyToZero();
      // 整数前面，小数后面去0
      this.removeHeadZero();

      if (this.resultNum === '0') {
        this.$toast.center('金额不能为0!');
        return;
      }
      if (parseFloat(this.resultNum) > 5000) {
        this.$toast.center('金额不能超过5000!');
        return;
      }
      payGuessHb({
        identity: this.activeIdentityId,
        money: this.resultNum,
      })
        .then((res) => {
          console.log(res);
          return wxApi.pay(res);
        })
        .then((res2) => {
          console.log(res2);
          this.$toast.center('支付成功!');
          this.updateStatus();
        })
        .catch((err) => {
          console.log(err);
          this.$toast.center('支付失败!');
          this.updateStatus();
        });
    },
    showBoxAni() {
      this.boxShowAni = true;
      this.shineAni();
      timeoutTask(() => {
        this.boxShowAni = false;
        this.boxShow = true;
        this.iptShowAni = true;
        timeoutTask(() => {
          this.shineShow = true;
          this.shineAni();
        }, 500);
      }, 2000);
      timeoutTask(() => {
        this.textShowAni = true;
      }, 1000);
    },
    resetBoxAni() {
      this.boxShowAni = false;
      this.boxShow = false;
      this.textShowAni = false;
      this.iptShowAni = false;
    },
    shineAni() {
      if (!timer) {
        timer = setInterval(() => {
          this.activeShine = SHINELIST[shineIndex];
          console.log(this.activeShine);
          shineIndex += 1;
          if (shineIndex >= 24) {
            shineIndex = 0;
            this.activeShine = '';
            this.shineShow = false;
            clearInterval(timer);
            timer = null;
          }
        }, 50);
      }
    },
    tapInput(pObj) {
      console.log(pObj.index);
      this.startIndex = pObj.index;
      this.$refs.hideIpt.focus();
    },
    updateStatus() {
      getPayStatus()
        .then((res) => {
          console.log(res);
          if (res.data.chbInfo.pay_status === '200') {
            this.status = 0;
          } else {
            this.status = 1;
          }
          this.avator = res.data.user.headimgurl;
          if (!this.hasBoxAniShow) {
            // 限制弹出动画只执行一次
            this.hasBoxAniShow = true;
            this.resetBoxAni();
            this.showBoxAni();
          }
          if (this.status === 0) {
            timeoutTask(() => {
              this.$refs.hideIpt.focus();
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.guessHbPay-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('../../assets/image/guessHb/guessHbBg.png');
  background-size: 100% 100%;
  flex-direction: column;
  padding-top: 40px;
  .avator {
    width: 138px;
    height: 138px;
    border-radius: 50%;
  }
  .gameTit {
    font-size: 36px;
    color: #ffffff;
    font-weight: 500;
    margin-top: 16px;
  }
  .gameMainBox {
    width: 630px;
    height: 1000px;
    margin-top: 30px;
    background-image: url('../../assets/image/guessHb/guessHbBox.png');
    background-size: 100% 100%;
    padding-top: 96px;
    padding-left: 42px;
    padding-right: 42px;
    transform: scale(0.4) translateY(6112.5px);
    .shineImg {
      position: absolute;
      width: 119%;
      height: 134%;
      bottom: -2%;
      left: -10%;
      opacity: 0;
      &.active {
        opacity: 1;
      }
    }
    .tip {
      font-size: 36px;
      font-weight: 500;
      color: #ffffff;
      width: 100%;
      text-align: center;
      opacity: 0;
      transition: all 1s ease-out;
    }
    .iptGroup {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      margin-top: 70px;
      width: 100%;
      position: relative;
      opacity: 0;
      transition: all 1s ease-out;
      input {
        width: 72px;
        height: 72px;
        background-color: #ffffff;
        border: none;
        outline: none;
        font-size: 32px;
        font-weight: 400;
        color: #8d592f;
        text-align: center;
      }
      .dot {
        width: 8px;
        height: 8px;
        background: #ffffff;
        border-radius: 50%;
      }
      .hideIpt {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        text-align: left;
        top: 12vw;
      }
    }
    .sTip {
      font-size: 24px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      line-height: 38px;
      margin-top: 24px;
      opacity: 0;
      transition: all 1s ease-out;
    }
    .identityArea {
      margin-top: 48px;
      opacity: 0;
      transition: all 1s ease-out;
      .key {
        font-size: 28px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }
      .valList {
        width: 100%;
        margin-top: 32px;
        display: flex;
        justify-content: space-around;
        .identityItem {
          width: 136px;
          height: 48px;
          background: rgba(99, 7, 148, 0.5);
          border-radius: 24px;
          font-size: 32px;
          font-weight: 400;
          color: #ffffff;
          &.active {
            background: rgba(99, 7, 148, 1);
          }
        }
      }
    }
    .confirmBtn {
      width: 462px;
      height: 80px;
      background-image: url('../../assets/image/guessHb/confirmBg.png');
      background-size: 100% 100%;
      font-size: 32px;
      font-weight: 400;
      color: #8d592f;
      margin: 0 auto;
      margin-top: 132px;
      opacity: 0;
      transition: all 1s ease-out;
    }
    .secretTip {
      width: 100%;
      text-align: center;
      font-size: 24px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 24px;
      opacity: 0;
      transition: all 1s ease-out;
    }
    &.boxShowAni {
      animation-name: boxShowAni;
      animation-duration: 2s;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
    }
    &.textShowAni {
      .tip {
        opacity: 1;
      }
      .sTip {
        opacity: 1;
      }
      .identityArea {
        opacity: 1;
      }
      .confirmBtn {
        opacity: 1;
      }
      .secretTip {
        opacity: 1;
      }
    }
    &.iptShowAni {
      .iptGroup {
        opacity: 1;
      }
    }
    &.boxShow {
      transform: scale(1) translateY(0px);
    }
  }
  .gameResultBox {
    width: 630px;
    height: 1000px;
    margin-top: 30px;
    background-image: url('../../assets/image/guessHb/guessHbBox.png');
    background-size: 100% 100%;
    padding-top: 96px;
    padding-left: 42px;
    padding-right: 42px;
    .shineImg {
      position: absolute;
      width: 119%;
      height: 134%;
      bottom: -2%;
      left: -10%;
    }
    .tip {
      font-size: 36px;
      font-weight: 500;
      color: #ffffff;
      width: 100%;
      text-align: center;
    }
    .iptGroup {
      align-items: flex-end;
      margin-top: 70px;
      width: 100%;
      input {
        width: 72px;
        height: 72px;
        background-color: #ffffff;
        border: none;
        outline: none;
        font-size: 32px;
        font-weight: 400;
        color: #8d592f;
        text-align: center;
        margin: 0 6px;
      }
      .dot {
        width: 8px;
        height: 8px;
        background: #ffffff;
        border-radius: 50%;
      }
    }
    .beginTip {
      width: 100%;
      text-align: center;
      font-size: 6.2vw;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .secretTip {
      width: 100%;
      text-align: center;
      font-size: 4.2vw;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 52px;
    }
  }
  @keyframes boxShowAni {
    0% {
      transform: scale(0.4) translateY(6112.5px);
    }
    60% {
      transform: scale(0.4) translateY(120px);
    }
    100% {
      transform: scale(1) translateY(0px);
    }
  }
}
</style>
