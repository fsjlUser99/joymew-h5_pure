<template>
  <div class="guessHbContainer">
    <!-- 等待界面 -->
    <div
      v-if="guessStatus === 0"
      class="waitMod publicHvCenter"
    >
      <div class="mainBox publicVCenter">
        <img
          src="https://static.hudongmiao.com/joymewMp/guessHb/guessHbRuleTitle.png"
          class="guessHbRuleTitle"
        />
        <div class="ruleList">
          <div class="ruleItem">
            <div class="num">
              1.
            </div>
            等待新人充值红包才可开启猜红包
          </div>
          <div class="ruleItem">
            <div class="num">
              2.
            </div>
            每轮参与人数最多为32名来宾
          </div>
          <div class="ruleItem">
            <div class="num">
              3.
            </div>
            每轮参与金额不同，越往后参与金额越高
          </div>
          <div class="ruleItem">
            <div class="num">
              4.
            </div>
            每轮竞猜都会显示猜中或未猜中，如本轮 未猜中会显示最接近的区间范围
          </div>
          <div class="ruleItem">
            <div class="num">
              5.
            </div>
            如果本轮有多名来宾猜中，将平分红包
          </div>
          <div class="ruleItem">
            <div class="num">
              6.
            </div>
            猜中红包直接到账您的微信零钱
          </div>
        </div>
        <div
          v-tap="{ methods: initGuessInfo }"
          class="attendBtn publicHvCenter"
        >
          立即参与
        </div>
      </div>
    </div>
    <!-- 竞猜界面 -->
    <div
      v-if="guessStatus === 1 && !guessMoney"
      class="guessMod publicVCenter"
    >
      <div class="danmuModule">
        <div
          class="danmu"
          :class="{ danmuAni: danmuAniShow }"
        >
          {{ activeDanmuCt }}
        </div>
      </div>
      <img
        :src="payUser.avator"
        class="avator"
      />
      <div class="gameTip">
        {{ payUser.identity }}邀请你竞猜红包
      </div>
      <div
        class="mainBox"
        :class="{ boxShowAni: boxShowAni, boxShow: boxShow, textShowAni: textShowAni, iptShowAni: iptShowAni }"
      >
        <img
          src="https://static.joymew.com/joymewMp/guessHb/shineAni.webp"
          class="shineImg"
          :class="{ active: shineShow }"
        />
        <div class="roundsNum">
          第{{ sortText }}轮
        </div>
        <div
          v-if="sort === '1'"
          class="guessTip"
        >
          小提示：有几个框即为几位数字
        </div>
        <div
          v-if="sort !== '1'"
          class="guessTip"
        >
          上一轮竞猜区间为：{{ gapMin }}~{{ gapMax }}
        </div>
        <div
          v-if="!hbVisible && !rankListVisible"
          v-tap="{ methods: Tap }"
          class="iptGroup publicHCenter"
          :class="{
            one:
              interArray.length + decimalArray.length === 1 ||
              interArray.length + decimalArray.length === 2 ||
              interArray.length + decimalArray.length === 3 ||
              interArray.length + decimalArray.length === 4,
            two: interArray.length + decimalArray.length === 5,
          }"
        >
          <input
            v-for="(item, index) in interArray"
            :key="'inter' + index"
            type="number"
            disabled
            :value="item"
          />
          <div
            v-if="decimalArray.length > 0"
            class="dot"
          />
          <input
            v-for="(item, index) in decimalArray"
            :key="'decimal' + index"
            type="number"
            disabled
            :value="item"
          />
        </div>
        <input
          ref="hideIpt"
          v-model="iptVal"
          class="hideIpt"
          type="number"
          pattern="[0-9]*"
          :maxlength="interArray.length + decimalArray.length"
          @input="handleInterDecimalInput"
        />
        <div class="attendInfo publicHCenter">
          本轮已有
          <div class="num">
            {{ attendNum }}
          </div>
          人参与，剩余
          <div class="num">
            {{ remainNum - attendNum }}
          </div>
          个名额
        </div>
        <div class="attendTip">
          抓紧时间参与吧~
        </div>
        <div
          v-tap="{ methods: handleAttend }"
          class="confirmBtn publicHvCenter"
        >
          立即参与
        </div>
        <div class="price">
          本轮竞猜金额：{{ purchaseMoney }}元
        </div>
      </div>
    </div>
    <!-- 竞猜结束，等待揭晓界面 -->
    <div
      v-if="guessStatus === 1 && guessMoney"
      class="guessResultWaitMod publicVCenter"
    >
      <div class="danmuModule">
        <div
          class="danmu"
          :class="{ danmuAni: danmuAniShow }"
        >
          {{ activeDanmuCt }}
        </div>
      </div>
      <img
        :src="payUser.avator"
        class="avator"
      />
      <div class="gameTip">
        {{ payUser.identity }}邀请你竞猜红包
      </div>
      <div class="mainBox">
        <div class="myGuessTitle">
          我的竞猜数字
        </div>
        <div
          v-if="!hbVisible && !rankListVisible"
          class="iptGroup publicHCenter"
          :class="{
            one:
              interArray.length + decimalArray.length === 1 ||
              interArray.length + decimalArray.length === 2 ||
              interArray.length + decimalArray.length === 3 ||
              interArray.length + decimalArray.length === 4,
            two: interArray.length + decimalArray.length === 5,
          }"
        >
          <input
            v-for="(item, index) in interArray"
            :key="'inter' + index"
            type="number"
            :value="item"
          />
          <div
            v-if="decimalArray.length > 0"
            class="dot"
          />
          <input
            v-for="(item, index) in decimalArray"
            :key="'decimal' + index"
            type="number"
            :value="item"
          />
        </div>
        <div class="waitResultTip">
          竞猜结果等待主持人揭晓
        </div>
        <div class="attendInfo publicHCenter">
          已竞猜人数：
          <div class="num">
            {{ attendNum }}/{{ remainNum }}
          </div>
          人
        </div>
        <div
          v-tap="{ methods: announceHb }"
          class="waitOpenBtn publicHvCenter"
          :class="{ active: isAnnounce }"
        >
          {{ isAnnounce ? '查看结果' : '等待揭晓' }}
        </div>
      </div>
    </div>
    <!-- 弹出红包模块 -->
    <div
      v-if="hbVisible"
      class="hbModule publicHCenter"
    >
      <div
        v-tap="{ methods: closeHb }"
        class="shade"
      />
      <div class="hbBox">
        <div
          class="lidArea"
          :class="{ up: isLidUpAniStart, down: isLidDownAniStart }"
        >
          <div class="wish">
            大吉大利
          </div>
          <div class="wish2">
            祝您一猜就对～
          </div>
        </div>
        <div
          class="prizeArea"
          :class="{ show: isPShowAniStart }"
        >
          <div
            v-if="hasPrize"
            class="prized publicVCenter"
          >
            <div class="guessNum">
              精准数字{{ targetVal }}
            </div>
            <div class="congratuTip">
              恭喜您获得竞猜红包
            </div>
            <div class="money">
              {{ prizeMoney }}
              <div class="unit">
                元
              </div>
            </div>
            <div class="getMoneyTip1">
              红包已到账您的微信零钱
            </div>
            <div class="getMoneyTip2">
              感谢您的参与
            </div>
            <div
              v-tap="{ methods: contiAttend }"
              class="continueBtn publicHvCenter"
            >
              继续参与
            </div>
            <div
              v-tap="{ methods: checkResult }"
              class="checkDetail publicHvCenter"
            >
              查看竞猜结果
            </div>
          </div>
          <div
            v-if="!hasPrize"
            class="unprized publicVCenter"
          >
            <div class="pityTip">
              很遗憾
            </div>
            <div class="pityTip2">
              只差一点点，本轮没有猜中
            </div>
            <div
              v-tap="{ methods: contiAttend }"
              class="continueBtn publicHvCenter"
            >
              继续参与
            </div>
            <div
              v-tap="{ methods: checkResult }"
              class="checkDetail publicHvCenter"
            >
              查看竞猜结果
            </div>
          </div>
        </div>
        <div
          v-if="!isHbOpen"
          v-tap="{ methods: robHb }"
          class="openBtn publicHCenter"
          :class="{ commonActive: !isRobBtnAniStart, active: isRobBtnAniStart }"
        >
          开
        </div>
      </div>
    </div>
    <!-- 弹出竞猜结果模块 -->
    <div
      v-if="rankListVisible"
      class="resultModule publicHCenter"
    >
      <div
        v-tap="{ methods: closeRank }"
        class="shade"
      />
      <div class="resultBox publicVCenter">
        <img
          src="https://static.hudongmiao.com/joymewMp/guessHb/guessResultTitle.png"
          class="guessResultTitle"
        />
        <div class="resultTip">
          {{ hasPrizeRounds ? '本轮红包已被猜中' : '本轮无人猜中，排名按最接近展示' }}
        </div>
        <div class="guessList">
          <div
            v-for="(item, index) in rankList"
            :key="index"
            class="guessItem publicVCenter"
          >
            <div class="num">
              {{ index + 1 }}
            </div>
            <div class="avator">
              <img
                :src="item.avator"
                class="avatorImg"
              />
            </div>
            <div class="nickname">
              {{ item.wx_name }}
            </div>
            <div class="guessVal">
              {{ item.guess_money }}
            </div>
            <div
              class="guessRt"
              :class="{ right: item.lucky_dog === '1' }"
            >
              {{ item.lucky_dog === '1' ? '已猜中' : '未猜中' }}
            </div>
          </div>
        </div>
        <div
          v-tap="{ methods: contiAttend }"
          class="continueBtn publicHvCenter"
        >
          继续参与
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getGuessInfo, attendGuess, guessHbRecharge } from '@/api/guessHb/index';
import wxApi from '@/utils/wxApi';
import { timeoutTask } from '@/utils/index';

let robLock = false;
let endLoop = false;
const IDENTITYLIST = [
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
];

let DMLIST = [];
let danmuIndex = 0;
let resultNum = '';

export default {
  data() {
    return {
      guessStatus: 0,
      guessMoney: '',
      danmuAniShow: false,
      activeDanmuCt: '',
      boxShowAni: false,
      boxShow: true,
      textShowAni: false,
      iptShowAni: false,
      sortText: '',
      hbId: '',
      sort: '',
      sortUnuse: '',
      gapMin: 0,
      gapMax: 1,
      hbVisible: false,
      rankListVisible: false,
      isFocus: false,
      rankList: [],
      interArray: [],
      decimalArray: [],
      iptVal: '',
      attendNum: 0,
      remainNum: 0,
      purchaseMoney: 0,
      shineShow: false,
      isAnnounce: false,
      isLidUpAniStart: false,
      isLidDownAniStart: false,
      isPShowAniStart: false,
      hasPrize: false,
      isHbOpen: false,
      isRobBtnAniStart: false,
      hasPrizeRounds: false,
      payUser: {
        avator: '',
        identity: '',
      },
      targetVal: '', // 答案
      hasClickGoOn: false,
      hasClickShow: false,
      hasAutoPopHb: false,
    };
  },
  beforeDestroy() {
    endLoop = true;
  },
  created() {
    robLock = false;
    this.initGuessInfo();
  },
  methods: {
    initGuessInfo() {
      if (robLock) {
        return;
      }
      robLock = true;
      getGuessInfo()
        .then((res) => {
          console.log(res);
          robLock = false;
          const codeList = ['200', '202', '203', '204', '205'];
          if (res.data.code === '201') {
            this.$toast.center('猜红包尚未开始或已经结束!');
          } else if (codeList.includes(res.data.code)) {
            const tmpPayUser = JSON.parse(res.data.guess_data_json);
            this.payUser.avator = tmpPayUser.headimgurl;
            this.payUser.identity = IDENTITYLIST.find((item) => item.id === tmpPayUser.shen_fen).name;
            this.guessStatus = 1;
            this.sort = res.data.rob_sort;
            this.sortUnuse = res.data.sort;
            this.sortText = this.converNumToText(res.data.rob_sort);
            this.hbId = res.data.red_package_id;
            this.guessMoney = res.data.guess_status === '0' ? '' : res.data.guess_status;
            this.targetVal = res.data.guess_balance;
            this.attendNum = res.data.CanYuSize;
            this.remainNum = res.data.RemainCanYuSize;
            this.purchaseMoney = res.data.purchase_amount_val;
            if (res.data.guess_status === '0') {
              // 还没猜
              // 标准答案解析为整数数组和小数数组
              this.parseTargetVal(this.targetVal);
              this.resetBoxAni();
              this.showBoxAni();
            } else {
              // 已经猜过了
              // 自己猜的金额解析为整数数组和小数数组
              this.parseMyVal(this.guessMoney);
            }
            endLoop = false;
            // 轮询获取信息
            this.loopGetGuessInfo();
          }
        })
        .catch((err) => {
          console.log(err);
          robLock = false;
        });
    },
    converNumToText(numStr) {
      let text = '';
      switch (numStr) {
        case '1':
          text = '一';
          break;
        case '2':
          text = '二';
          break;
        case '3':
          text = '三';
          break;
        case '4':
          text = '四';
          break;
        case '5':
          text = '五';
          break;
        case '6':
          text = '六';
          break;
        case '7':
          text = '七';
          break;
        case '8':
          text = '八';
          break;
        case '9':
          text = '九';
          break;
        case '10':
          text = '十';
          break;
        case '11':
          text = '十一';
          break;
        case '12':
          text = '十二';
          break;
        case '13':
          text = '十三';
          break;
        case '14':
          text = '十四';
          break;
        case '15':
          text = '十五';
          break;
        case '16':
          text = '十六';
          break;
        case '17':
          text = '十七';
          break;
        case '18':
          text = '十八';
          break;
        case '19':
          text = '十九';
          break;
        case '20':
          text = '二十';
          break;
        default:
          text = '';
      }
      return text;
    },
    parseMyVal(myVal) {
      let tmpInterArray = [];
      let tmpDecimalArray = [];
      if (myVal.indexOf('.') > -1) {
        tmpInterArray = myVal.split('.')[0].split('');
        tmpDecimalArray = myVal.split('.')[1].split('');
      } else {
        tmpInterArray = myVal.split('');
      }
      this.interArray = tmpInterArray;
      this.decimalArray = tmpDecimalArray;
    },
    parseTargetVal(targetVal) {
      let tmpInterArray = [];
      let tmpDecimalArray = [];
      if (targetVal.indexOf('.') > -1) {
        tmpInterArray = targetVal.split('.')[0].split('');
        tmpDecimalArray = targetVal.split('.')[1].split('');
      } else {
        tmpInterArray = targetVal.split('');
      }
      tmpInterArray = tmpInterArray.map(() => {
        return '';
      });
      tmpDecimalArray = tmpDecimalArray.map(() => {
        return '';
      });
      this.interArray = tmpInterArray;
      this.decimalArray = tmpDecimalArray;
    },
    resetBoxAni() {
      this.boxShowAni = false;
      this.boxShow = false;
      this.textShowAni = false;
      this.iptShowAni = false;
      this.isFocus = false;
    },
    shineAni() {
      this.shineShow = true;
      timeoutTask(() => {
        this.shineShow = false;
      }, 1000);
    },
    showBoxAni() {
      this.boxShowAni = true;
      timeoutTask(() => {
        this.boxShowAni = false;
        this.boxShow = true;
        this.iptShowAni = true;
        timeoutTask(() => {
          this.shineAni();
          timeoutTask(() => {
            this.isFocus = true;
          }, 2000);
        }, 500);
      }, 2000);
      timeoutTask(() => {
        this.textShowAni = true;
      }, 1000);
    },
    loopGetGuessInfo() {
      if (endLoop) {
        return;
      }
      getGuessInfo()
        .then((res) => {
          console.log(res);
          const codeList = ['200', '202', '203', '204', '205'];
          if (codeList.includes(res.data.code)) {
            if (res.data.rob_sort !== this.sort) {
              // 新的一轮
              this.isLidUpAniStart = false;
              this.isLidDownAniStart = false;
              this.isPShowAniStart = false;
              this.isRobBtnAniStart = false;
              this.hasHbPop = false;
              this.isHbOpen = false;
              this.hbVisible = false;
              this.rankListVisible = false;
              this.hasClickGoOn = false;
              this.hasClickShow = false;
              this.interArray = [];
              this.decimalArray = [];
              this.hasAutoPopHb = false;
              danmuIndex = 0;
              DMLIST = [];
              if (res.data.guess_status === '0') {
                // 还没猜
                // 标准答案解析为整数数组和小数数组
                this.resetBoxAni();
                this.showBoxAni();
                this.parseTargetVal(this.targetVal);
              } else {
                // 已经猜过了
                // 自己猜的金额解析为整数数组和小数数组
                this.parseMyVal(this.guessMoney);
              }
            }
            if (this.hasClickGoOn) {
              this.guessMoney = '';
              if (!this.hasClickShow) {
                this.hasClickShow = true;
                this.resetBoxAni();
                this.showBoxAni();
              }
              timeoutTask(() => {
                this.loopGetGuessInfo();
              }, 2000);
              return;
            }
            if (res.data.robRecordList) {
              DMLIST = res.data.robRecordList.list.map((item) => {
                const tmpName = item.wx_name.length > 4 ? `${item.wx_name.slice(0, 4)}......` : item.wx_name;
                return `${tmpName}猜${item.guess_money}`;
              });
              this.showDanmuAni();
            }
            this.sort = res.data.rob_sort;
            this.sortUnuse = res.data.sort;
            this.sortText = this.converNumToText(res.data.rob_sort);
            this.hbId = res.data.red_package_id;
            this.guessMoney = res.data.guess_status === '0' ? '' : res.data.guess_status;
            this.targetVal = res.data.guess_balance;
            this.attendNum = res.data.CanYuSize;
            this.remainNum = res.data.RemainCanYuSize;
            this.isAnnounce = res.data.play_status === '1';
            this.purchaseMoney = res.data.purchase_amount_val;
            this.gapHandle(res.data.min_max_json);
            if (res.data.code === '205') {
              if (res.data.robInfo.luckyJson[this.$store.state.user.userId]) {
                // 猜中
                this.hasPrize = true;
                this.prizeMoney = res.data.robInfo.luckyJson.luckyLotteryMoney;
              } else {
                // 没猜中
                this.hasPrize = false;
                this.prizeMoney = '';
              }
              this.rankList = res.data.robInfo.infoList;
              this.hasPrizeRounds = res.data.robInfo.luckyJson.lottery_size >= 1;
            }
            if (this.isAnnounce) {
              this.autoAnnounceHb();
            }
          } else if (res.data.code === '201') {
            this.guessStatus = 0;
            this.isLidUpAniStart = false;
            this.isLidDownAniStart = false;
            this.isPShowAniStart = false;
            this.isRobBtnAniStart = false;
            this.hasHbPop = false;
            this.isHbOpen = false;
            endLoop = true;
          }
          timeoutTask(() => {
            this.loopGetGuessInfo();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          endLoop = true;
        });
    },
    handleInterDecimalInput() {
      console.log(this.iptVal);
      const InterArrayLen = this.interArray.length;
      const DecimalArrayLen = this.decimalArray.length;
      for (let i = 0; i < InterArrayLen; i += 1) {
        this.interArray[i] = this.iptVal.charAt(i) || '';
      }
      for (let i = 0; i < DecimalArrayLen; i += 1) {
        this.decimalArray[i] = this.iptVal.charAt(i + InterArrayLen) || '';
      }
    },
    Tap() {
      this.$refs.hideIpt.focus();
    },
    convertEmptyToZero() {
      const InterArrayLen = this.interArray.length;
      const DecimalArrayLen = this.decimalArray.length;
      for (let i = 0; i < InterArrayLen; i += 1) {
        if (this.interArray[i] === '') {
          this.interArray[i] = 0;
        }
      }
      for (let i = 0; i < DecimalArrayLen; i += 1) {
        if (this.decimalArray[i] === '') {
          this.decimalArray[i] = 0;
        }
      }
    },
    removeHeadZero() {
      resultNum = '';
      let firstUnZeroInterIndex = -1; // 记录第一个非0数字的整数数组索引
      const InterArrayLen = this.interArray.length;
      for (let i = 0; i < InterArrayLen; i += 1) {
        if (this.interArray[i] !== 0 && this.interArray[i] !== '0') {
          firstUnZeroInterIndex = i;
          break;
        }
      }
      if (firstUnZeroInterIndex === -1) {
        // 整数都为0
        resultNum += '0';
      } else {
        resultNum += this.interArray.slice(firstUnZeroInterIndex, InterArrayLen).join('');
      }
      if (this.decimalArray.length === 2) {
        if (this.decimalArray[0] !== 0 && this.decimalArray[1] === 0) {
          resultNum += `.${this.decimalArray[0]}`;
        } else if (this.decimalArray[0] === 0 && this.decimalArray[1] !== 0) {
          resultNum += `.0${this.decimalArray[1]}`;
        } else if (this.decimalArray[0] !== 0 && this.decimalArray[1] !== 0) {
          resultNum += `.${this.decimalArray[0]}${this.decimalArray[1]}`;
        }
      } else if (this.decimalArray.length === 1) {
        if (this.decimalArray[0] !== 0) {
          resultNum += `.${this.decimalArray[0]}`;
        }
      }
    },
    updateGuessInfo() {
      getGuessInfo()
        .then((res) => {
          const codeList = ['200', '202', '203', '204', '205'];
          if (codeList.includes(res.data.code)) {
            this.sort = res.data.rob_sort;
            this.sortUnuse = res.data.sort;
            this.sortText = this.converNumToText(res.data.rob_sort);
            this.hbId = res.data.red_package_id;
            this.guessMoney = res.data.guess_status === '0' ? '' : res.data.guess_status;
            this.targetVal = res.data.guess_balance;
            this.attendNum = res.data.CanYuSize;
            this.remainNum = res.data.RemainCanYuSize;
            this.purchaseMoney = res.data.purchase_amount_val;
            if (this.guessMoney === '0') {
              // 还没猜
              // 标准答案解析为整数数组和小数数组
              this.parseTargetVal(this.targetVal);
            } else {
              // 已经猜过了
              // 自己猜的金额解析为整数数组和小数数组
              this.parseMyVal(this.guessMoney);
            }
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleAttend() {
      // 空字符串转成0
      this.convertEmptyToZero();
      // 整数前面，小数后面去0
      this.removeHeadZero();
      if (resultNum === '0') {
        this.$toast.center('金额不能为0!');
        return;
      }
      if (robLock) {
        return;
      }
      robLock = true;
      attendGuess({
        sort: this.sortUnuse,
        robSort: this.sort,
        guessMoney: resultNum,
        hbId: this.hbId,
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === '200') {
            this.$toast.center('购买成功!');
            robLock = false;
            this.updateGuessInfo();
          } else if (res.data.code === '202') {
            this.$toast.center('已经购买过啦!');
            robLock = false;
            this.updateGuessInfo();
          } else if (res.data.code === '203') {
            this.$toast.center('32个名额已经没啦!等待下一轮!');
            robLock = false;
          } else if (res.data.code === '204') {
            console.log('喵币不足');
            this.recharge();
          } else if (res.data.code === '201') {
            robLock = false;
            this.$toast.center('猜红包尚未开始或已经结束!');
          } else if (res.data.code === '205') {
            robLock = false;
            this.$toast.center('本轮已经揭晓!等待下一轮!');
          }
        })
        .catch((err) => {
          console.log(err);
          robLock = false;
        });
    },
    recharge() {
      guessHbRecharge({
        money: this.purchaseMoney,
      })
        .then((res) => {
          console.log(res);
          if (res.status === 'success') {
            wxApi
              .pay(res)
              .then((res2) => {
                console.log(res2);
                this.$toast.center('充值成功!');
                robLock = false;
                timeoutTask(() => {
                  this.handleAttend();
                }, 500);
              })
              .catch((err) => {
                console.log(err);
                robLock = false;
                this.$toast.center('充值失败!');
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showDanmuAni() {
      if (danmuIndex >= DMLIST.length) {
        return;
      }
      this.activeDanmuCt = DMLIST[danmuIndex];
      this.danmuAniShow = true;
      timeoutTask(() => {
        this.danmuAniShow = false;
        timeoutTask(() => {
          danmuIndex += 1;
          this.showDanmuAni();
        }, 1000);
      }, 3000);
    },
    gapHandle(gapStr) {
      if (!gapStr) {
        return;
      }
      const gapObj = JSON.parse(gapStr);
      Object.keys(gapObj).forEach((item) => {
        if (parseInt(item.split('_')[1], 10) === parseInt(this.sort, 10) - 1) {
          if (item.split('_')[0] === 'shang') {
            this.gapMax = gapObj[item] === '0' ? '5000' : gapObj[item];
          } else if (item.split('_')[0] === 'xia') {
            this.gapMin = gapObj[item] === '0' ? '0' : gapObj[item];
          }
        }
      });
    },
    // 自动揭晓红包
    autoAnnounceHb() {
      if (this.hasAutoPopHb) {
        return;
      }
      this.hasAutoPopHb = true;
      if (!this.hasHbPop) {
        this.hbVisible = true;
      } else {
        this.rankListVisible = true;
      }
    },
    // 揭晓红包
    announceHb() {
      if (!this.isAnnounce) {
        this.$toast.center('等待揭晓！');
        return;
      }
      if (!this.hasHbPop) {
        this.hbVisible = true;
      } else {
        this.rankListVisible = true;
      }
    },
    closeHb() {
      this.hbVisible = false;
      this.hasHbPop = true;
    },
    contiAttend() {
      this.resetBoxAni();
      this.rankListVisible = false;
      this.hbVisible = false;
      this.hasHbPop = true;
      this.hasClickGoOn = true;
    },
    checkResult() {
      this.hbVisible = false;
      this.hasHbPop = true;
      this.rankListVisible = true;
    },
    closeRank() {
      this.rankListVisible = false;
    },
    robHb() {
      if (robLock) {
        return;
      }
      robLock = true;
      this.openHbAniStart().then(() => {
        timeoutTask(() => {
          robLock = false;
        }, 1500);
        this.isHbOpen = true;
      });
    },
    openHbAniStart() {
      return new Promise((resolve, reject) => {
        try {
          this.isRobBtnAniStart = true;
          timeoutTask(() => {
            this.isRobBtnAniStart = false;
            this.isLidUpAniStart = true;
            resolve();
            timeoutTask(() => {
              this.isPShowAniStart = true;
              this.isLidDownAniStart = true;
            }, 500);
          }, 1000);
        } catch (err) {
          reject(err);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.guessHbContainer {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/guessHbBg2.png');
  background-size: 100% 100%;
  .waitMod {
    position: absolute;
    width: 100%;
    height: 100%;
    .mainBox {
      width: 630px;
      height: 1000px;
      background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/guessHbBox2.png');
      background-size: 100% 100%;
      flex-direction: column;
      padding-top: 66px;
      .guessHbRuleTitle {
        width: 422px;
        height: 88px;
      }
      .ruleList {
        width: 528px;
        font-size: 28px;
        font-weight: 400;
        color: #ffffff;
        line-height: 60px;
        margin-top: 40px;
        .ruleItem {
          width: 100%;
          position: relative;
          padding-left: 32px;
          .num {
            position: absolute;
            left: 0px;
          }
        }
      }
      .attendBtn {
        width: 462px;
        height: 80px;
        background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/confirmBg.png');
        background-size: 100% 100%;
        margin-top: 164px;
        font-size: 32px;
        font-weight: 400;
        color: #8d592f;
      }
    }
  }
  .guessMod {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding-top: 40px;
    .danmuModule {
      width: 100%;
      height: 16%;
      position: absolute;
      top: 0;
      left: 0;
      .danmu {
        border-radius: 35px;
        text-align: center;
        width: 237px;
        padding: 0 20px;
        height: 65px;
        line-height: 65px;
        font-size: 23px;
        font-weight: 400;
        color: #ffffff;
        position: absolute;
        left: -235px;
        top: 50px;
        background-color: rgba(0, 0, 0, 0.6);
        &.danmuAni {
          animation-name: danmuShowAni;
          animation-duration: 3s;
          animation-iteration-count: 1;
          animation-timing-function: ease-in;
        }
      }
    }
    .avator {
      width: 138px;
      height: 138px;
      border-radius: 50%;
    }
    .gameTip {
      font-size: 36px;
      font-weight: 500;
      color: #ffffff;
      margin-top: 16px;
    }
    .mainBox {
      width: 630px;
      height: 1000px;
      background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/guessHbBox2.png');
      background-size: 100% 100%;
      margin-top: 28px;
      padding-top: 40px;
      transform: scale(0.4) translateY(3056px);
      position: relative;
      .shineImg {
        position: absolute;
        width: 119%;
        height: 136%;
        bottom: -4%;
        left: -10%;
        opacity: 0;
        &.active {
          opacity: 1;
        }
      }
      .roundsNum {
        width: 100%;
        text-align: center;
        font-size: 48px;
        color: #fdf1ac;
        font-weight: 500;
        opacity: 0;
        transition: all 1s ease-out;
      }
      .guessTip {
        width: 100%;
        text-align: center;
        font-size: 24px;
        color: #ffffff;
        margin-top: 32px;
        opacity: 0;
        transition: all 1s ease-out;
      }
      .iptGroup {
        width: 95%;
        margin: 0 auto;
        margin-top: 60px;
        align-items: flex-end;
        opacity: 0;
        transition: all 1s ease-out;
        position: relative;
        .dot {
          width: 8px;
          height: 8px;
          background: #ffffff;
          border-radius: 50%;
        }
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
          margin: 0 12px;
        }
        &.one {
          input {
            width: 119px;
            height: 119px;
            font-size: 72px;
          }
        }
        &.two {
          input {
            width: 88px;
            height: 88px;
            font-size: 36px;
          }
        }
      }
      .hideIpt {
        width: 0;
        height: 0;
      }
      .attendInfo {
        width: 100%;
        margin-top: 114px;
        font-size: 28px;
        color: #ffffff;
        align-items: flex-end;
        opacity: 0;
        transition: all 1s ease-out;
        .num {
          font-size: 48px;
          color: #fdf1ac;
          margin: 0 6px;
        }
      }
      .attendTip {
        font-size: 28px;
        color: #ffffff;
        margin-top: 24px;
        padding-left: 102px;
        opacity: 0;
        transition: all 1s ease-out;
      }
      .confirmBtn {
        width: 462px;
        height: 80px;
        background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/confirmBg.png');
        background-size: 100% 100%;
        margin: 0 auto;
        margin-top: 15vw;
        font-size: 32px;
        font-weight: 400;
        color: #8d592f;
        opacity: 0;
        transition: all 1s ease-out;
        position: relative;
        z-index: 1;
      }
      .price {
        width: 100%;
        text-align: center;
        font-size: 28px;
        color: #ffffff;
        font-weight: 400;
        margin-top: 26px;
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
        .roundsNum {
          opacity: 1;
        }
        .guessTip {
          opacity: 1;
        }
        .attendInfo {
          opacity: 1;
        }
        .attendTip {
          opacity: 1;
        }
        .confirmBtn {
          opacity: 1;
        }
        .price {
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
  }
  .guessResultWaitMod {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding-top: 40px;
    .danmuModule {
      width: 100%;
      height: 16%;
      position: absolute;
      top: 0;
      left: 0;
      .danmu {
        border-radius: 35px;
        text-align: center;
        width: 237px;
        padding: 0 20px;
        height: 65px;
        line-height: 65px;
        font-size: 23px;
        font-weight: 400;
        color: #ffffff;
        position: absolute;
        left: -235px;
        top: 50px;
        background-color: rgba(0, 0, 0, 0.6);
        &.danmuAni {
          animation-name: danmuShowAni;
          animation-duration: 3s;
          animation-iteration-count: 1;
          animation-timing-function: ease-in;
        }
      }
    }
    .avator {
      width: 138px;
      height: 138px;
      border-radius: 50%;
    }
    .gameTip {
      font-size: 36px;
      font-weight: 500;
      color: #ffffff;
      margin-top: 16px;
    }
    .mainBox {
      width: 630px;
      height: 1000px;
      background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/guessHbBox2.png');
      background-size: 100% 100%;
      margin-top: 28px;
      padding-top: 112px;
      .myGuessTitle {
        width: 100%;
        text-align: center;
        font-size: 48px;
        color: #ffffff;
      }
      .iptGroup {
        width: 90%;
        margin: 0 auto;
        margin-top: 109px;
        align-items: flex-end;
        position: relative;
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
          margin: 0 12px;
        }
        .dot {
          width: 8px;
          height: 8px;
          background: #ffffff;
          border-radius: 50%;
        }
        &.one {
          input {
            width: 119px;
            height: 119px;
            font-size: 72px;
          }
        }
        &.two {
          input {
            width: 88px;
            height: 88px;
            font-size: 36px;
          }
        }
      }
      .waitResultTip {
        font-size: 28px;
        color: #ffffff;
        margin-top: 118px;
        width: 100%;
        text-align: center;
      }
      .attendInfo {
        width: 100%;
        margin-top: 40px;
        font-size: 28px;
        color: #ffffff;
        align-items: flex-end;
        .num {
          font-size: 48px;
          color: #fdf1ac;
          margin: 0 6px;
        }
      }
      .waitOpenBtn {
        width: 462px;
        height: 80px;
        background-color: #a0a0a0;
        margin: 0 auto;
        margin-top: 158px;
        font-size: 32px;
        font-weight: 400;
        color: #ffffff;
        border-radius: 8px;
      }
    }
  }
  .hbModule {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    .shade {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .hbBox {
      width: 560px;
      height: 734px;
      background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/hbBg.png');
      background-size: 100% 100%;
      position: absolute;
      top: 320px;
      perspective: 400px;
      .lidArea {
        width: 560px;
        height: 548px;
        background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/hbLid.png');
        background-size: 100% 100%;
        transition: all linear 0.5s;
        transform: translateY(0px);
        z-index: 2;
        padding-top: 94px;
        .wish {
          width: 100%;
          text-align: center;
          font-size: 48px;
          font-weight: 400;
          color: #ffffff;
        }
        .wish2 {
          width: 100%;
          text-align: center;
          font-size: 48px;
          font-weight: 400;
          color: #ffffff;
          margin-top: 126px;
        }
        &.up {
          transform: translateY(-240px);
          z-index: 1;
        }
        &.down {
          transform: translateY(0px);
          z-index: 1;
        }
      }
      .prizeArea {
        width: 528px;
        height: 620px;
        position: absolute;
        top: -70px;
        left: 15px;
        z-index: 1;
        transition: all linear 0.1s;
        background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/prizeBg.png');
        background-size: 100% 100%;
        opacity: 0;
        .prized {
          position: absolute;
          width: 100%;
          height: 100%;
          flex-direction: column;
          padding-top: 94px;
          .guessNum {
            font-size: 36px;
            color: #c87a3a;
            font-weight: 500;
          }
          .congratuTip {
            font-size: 36px;
            color: #c87a3a;
            font-weight: 500;
            margin-top: 64px;
          }
          .money {
            margin-top: 28px;
            font-size: 56px;
            color: #f61e28;
            font-weight: 500;
            display: flex;
            align-items: flex-end;
            .unit {
              font-size: 36px;
              color: #c87a3a;
              margin-left: 6px;
            }
          }
          .getMoneyTip1 {
            font-size: 28px;
            font-weight: 500;
            color: #c87a3a;
            margin-top: 106px;
          }
          .getMoneyTip2 {
            font-size: 28px;
            font-weight: 500;
            color: #c87a3a;
          }
          .continueBtn {
            width: 320px;
            height: 68px;
            background: linear-gradient(90deg, #fffeec, #ffde8d 100%);
            border-radius: 54px;
            font-size: 36px;
            font-weight: 500;
            color: #ca2e1b;
            position: absolute;
            bottom: -100px;
          }
          .checkDetail {
            position: absolute;
            font-size: 28px;
            color: #ffffff;
            bottom: -155px;
            left: 200px;
            padding-bottom: 4px;
            &::after {
              content: '';
              display: block;
              width: 100%;
              height: 2px;
              background-color: #ffffff;
              position: absolute;
              bottom: 0;
            }
          }
        }
        .unprized {
          position: absolute;
          width: 100%;
          height: 100%;
          flex-direction: column;
          padding-top: 178px;
          .pityTip {
            font-size: 56px;
            color: #c87a3a;
            font-weight: 500;
          }
          .pityTip2 {
            font-size: 36px;
            color: #c87a3a;
            font-weight: 500;
            margin-top: 36px;
          }
          .continueBtn {
            width: 320px;
            height: 68px;
            background: linear-gradient(90deg, #fffeec, #ffde8d 100%);
            border-radius: 54px;
            font-size: 36px;
            font-weight: 500;
            color: #ca2e1b;
            position: absolute;
            bottom: -100px;
          }
          .checkDetail {
            position: absolute;
            font-size: 28px;
            color: #ffffff;
            bottom: -155px;
            left: 200px;
            padding-bottom: 4px;
            &::after {
              content: '';
              display: block;
              width: 100%;
              height: 2px;
              background-color: #ffffff;
              position: absolute;
              bottom: 0;
            }
          }
        }
        &.show {
          opacity: 1;
        }
      }
      .openBtn {
        background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/openBtnBg.png');
        background-size: 100% 100%;
        width: 328px;
        height: 320px;
        position: absolute;
        left: 112.5px;
        top: 390px;
        font-size: 88px;
        font-weight: 500;
        color: #9a5804;
        padding-top: 12vw;
        z-index: 2;
        &.active {
          animation-name: rotateY;
          animation-duration: 1s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
        &.commonActive {
          animation-name: scaleAni;
          animation-duration: 2s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
        }
      }
    }
  }
  .resultModule {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    .shade {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .resultBox {
      width: 630px;
      height: 1000px;
      background-image: url('https://static.hudongmiao.com/joymewMp/guessHb/guessHbBox2.png');
      background-size: 100% 100%;
      position: absolute;
      top: 148px;
      flex-direction: column;
      padding-top: 32px;
      .guessResultTitle {
        width: 140px;
        height: 36px;
      }
      .resultTip {
        font-size: 32px;
        font-weight: 400;
        color: #fdf1ac;
        margin-top: 22px;
      }
      .guessList {
        width: 100%;
        margin-top: 30px;
        height: 809px;
        overflow-y: scroll;
        .guessItem {
          padding: 0 32px;
          margin-bottom: 18px;
          .num {
            width: 49px;
            font-size: 36px;
            font-weight: 400;
            color: #ffffff;
          }
          .avator {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background-color: #f8d9b5;
            margin-left: 15px;
            .avatorImg {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .nickname {
            width: 167px;
            font-size: 28px;
            font-weight: 400;
            color: #ffffff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 14px;
          }
          .guessVal {
            width: 112px;
            font-size: 28px;
            font-weight: 400;
            color: #ffffff;
            margin-left: 15px;
          }
          .guessRt {
            font-size: 28px;
            font-weight: 400;
            color: #ffffff;
            margin-left: 30px;
            &.right {
              color: #26e900;
            }
          }
        }
      }
      .continueBtn {
        width: 320px;
        height: 68px;
        background: linear-gradient(90deg, #fffeec, #ffde8d 100%);
        border-radius: 54px;
        font-size: 36px;
        font-weight: 500;
        color: #ca2e1b;
        position: absolute;
        bottom: -24px;
      }
    }
  }
  @keyframes rotateY {
    0% {
      transform: rotateY(0deg) translateZ(10px);
      opacity: 1;
    }

    70% {
      transform: rotateY(720deg) translateZ(10px);
      opacity: 1;
    }

    100% {
      transform: rotateY(720deg) translateZ(-400px);
      opacity: 0;
    }
  }
  @keyframes scaleAni {
    0% {
      transform: scale(1);
    }

    70% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(1);
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

  @keyframes danmuShowAni {
    0% {
      transform: translate(0, 0);
      opacity: 1;
    }
    10% {
      transform: translate(292px, 0);
      opacity: 1;
    }
    80% {
      transform: translate(292px, 0);
      opacity: 1;
    }
    100% {
      transform: translate(292px, -80px);
      opacity: 0;
    }
  }
}
</style>
