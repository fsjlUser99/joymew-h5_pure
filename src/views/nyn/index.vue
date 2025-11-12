<template>
  <div
    class="nynContainer"
    :class="{ rankShow: gameStatus === 3 }"
  >
    <div class="bgArea">
      <img
        src="https://static.hudongmiao.com/joymewMp/nyn/bg-01.png"
        class="bg"
      />
      <img
        src="https://static.hudongmiao.com/joymewMp/nyn/star-01.png"
        class="star"
      />
      <img
        src="https://static.hudongmiao.com/joymewMp/nyn/dotFall-01.png"
        class="dotFall"
      />
    </div>
    <!-- 等待界面 -->
    <div
      v-if="gameStatus === 1"
      class="waitContainer publicVCenter"
    >
      <div class="prizePool publicHvCenter">
        <img
          src="https://static.hudongmiao.com/joymewMp/nyn/marquee.png"
          class="bg"
        />
        <div class="ct">
          奖池总金额
          <label class="money">{{ poolMoney }}元</label>
        </div>
      </div>
      <img
        src="https://static.hudongmiao.com/joymewMp/nyn/ruleBox-02.png"
        class="ruleBox"
      />
      <div class="gameBox publicHCenter">
        <img
          src="https://static.hudongmiao.com/joymewMp/nyn/stageNew2-01.png"
          class="gameBoxImg"
        />
        <div class="tip">
          购买任意一款弹幕礼物，将
          <label class="strong">免费赠送</label>
          一次抽奖
        </div>
        <div
          v-tap="{ methods: toGame }"
          class="startBtn publicHvCenter"
        >
          开始
        </div>
        <img
          src="https://static.hudongmiao.com/joymewMp/nyn/dmGift.png"
          class="dmGiftTitle"
        />
        <div class="giftListWrap">
          <div class="giftItem">
            <img
              src="https://static.hudongmiao.com/joymewMp/nyn/locat.png"
              class="locatImg"
            />
            <div class="giftImgList">
              <div
                v-for="(item, index) in giftList"
                :key="item.id"
                class="giftImg publicHvCenter"
                :class="'g' + (index + 1)"
              >
                <img :src="item.imgUrl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- game界面 -->
    <div
      v-if="gameStatus === 2"
      class="gameContainer publicVCenter"
    >
      <div
        v-if="isRechargeTipShow"
        class="rechargeTipWarp publicHvCenter"
        :class="rechargeTipAni"
      >
        <span class="star">*</span>
        <span>{{ user.nickname }}</span>
        充值了
        <span>{{ user.money }}元</span>
      </div>
      <div class="eggBoxWrap publicVCenter">
        <div class="prizePool publicHvCenter">
          奖池总金额
          <div class="price">
            {{ poolMoney }}元
          </div>
        </div>
        <div class="countDown publicHvCenter">
          倒计时: {{ countDownNum }}s
        </div>
        <div class="eggs">
          <div
            v-for="(item, index) in eggList"
            :key="index"
            class="eggItem"
            :class="[{ fallAni: item.isFallAni }, item.aroundAni]"
            :style="{
              width: item.width + 'vw',
              height: item.height + 'vw',
              left: item.left + 'vw',
              bottom: item.bottom + 'vw',
              animationDelay: item.fallAniDelay + 's',
            }"
          >
            <div
              class="egg"
              :class="{ rotateAni: item.isRotateAni }"
              :style="{ animationDelay: item.rotateAniDelay + 's' }"
            >
              <div class="hb publicHCenter">
                <label>{{ item.prize }}</label>
              </div>
              <img
                :src="item.imgUrl"
                class="eggImg"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="gameBox publicHCenter">
        <img
          src="https://static.hudongmiao.com/joymewMp/nyn/stageNew2-01.png"
          class="gameBoxImg"
        />
        <div
          v-if="giftListShow"
          v-tap="{ methods: toAgreement }"
          class="agreement"
        >
          阅读并同意《充值服务协议》
        </div>
        <div
          v-if="giftListShow"
          class="giftListWrap"
        >
          <div class="giftItem">
            <img
              src="https://static.hudongmiao.com/joymewMp/nyn/locat.png"
              class="locatImg"
            />
            <div class="giftImgList">
              <div
                v-for="(item, index) in giftList"
                :key="item.id"
                v-tap="{ methods: chooseGift, p: item.id }"
                :class="['g' + (index + 1), { choosed: item.isChoosed }]"
                class="giftImg publicHvCenter"
              >
                <img
                  v-if="item.isChoosed"
                  src="https://static.hudongmiao.com/joymewMp/nyn/light2.png"
                  class="lightImage lightAni"
                />
                <img
                  :src="item.imgUrl"
                  class="giftImage"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-tap="{ methods: handleStartBtnTap }"
          class="startBtn publicHvCenter"
        >
          {{ btnText }}
        </div>
        <!-- <div class="startBtn publicHvCenter" v-tap="{ methods: testGameAniStart }">{{ btnText }}</div> -->
        <img
          v-if="giftListShow"
          src="https://static.hudongmiao.com/joymewMp/nyn/dmGift.png"
          class="dmGiftTitle"
        />
        <div
          v-if="!giftListShow"
          class="eggExit"
        >
          <div class="luckyEggWrap">
            <div
              class="luckyEgg"
              :class="{ fallLuckyAni: luckyEgg.isFallLuckyAni }"
              :style="{
                width: luckyEgg.width + 'vw',
                height: luckyEgg.height + 'vw',
                top: luckyEgg.top + 'vw',
                left: luckyEgg.left + 'vw',
                transform: 'translateY(' + luckyEgg.end + 'vw)',
              }"
            >
              <div
                class="egg"
                :class="{ rotateAni: luckyEgg.isRotateAni }"
              >
                <div class="hb publicHCenter">
                  <label>{{ luckyEgg.prize }}</label>
                </div>
                <img
                  :src="luckyEgg.imgUrl"
                  class="eggImg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isResultTipShow"
        class="resultTipWarp"
        :class="resultTipAni"
        :style="{ paddingTop: resultTipContent.ptVal + 'vw' }"
      >
        <img
          :src="resultTipContent.resultImgSrc"
          class="bg"
        />
        <div class="para1">
          {{ resultTipContent.para1 }}
        </div>
        <div class="para2">
          {{ resultTipContent.para2 }}
        </div>
      </div>
    </div>
    <!-- game排行榜界面 -->
    <div
      v-if="gameStatus === 3"
      class="rankContainer publicVCenter"
    >
      <div class="topThree publicHCenter">
        <div
          v-if="topRankList[1]"
          class="second"
        >
          <img
            src="https://static.hudongmiao.com/joymewMp/nyn/secondRankBox1.png"
            class="rkSecond"
          />
          <img
            src="https://static.hudongmiao.com/joymewMp/nyn/rkSecondStage-01.png"
            class="rkSecondStage"
          />
          <div class="headImgBox publicHvCenter">
            <img
              :src="topRankList[1].headimgurl"
              class="headImg"
            />
          </div>
          <div class="name">
            {{ topRankList[1].nickname }}
          </div>
          <div class="money">
            {{ topRankList[1].money }}元
          </div>
        </div>
        <div
          v-if="topRankList[0]"
          class="first"
        >
          <img
            src="https://static.hudongmiao.com/joymewMp/nyn/firstRankBox1.png"
            class="rkFirst"
          />
          <img
            src="https://static.hudongmiao.com/joymewMp/nyn/rkFirstStage-01.png"
            class="rkFirstStage"
          />
          <div class="headImgBox publicHvCenter">
            <img
              :src="topRankList[0].headimgurl"
              class="headImg"
            />
          </div>
          <div class="name">
            {{ topRankList[0].nickname }}
          </div>
          <div class="money">
            {{ topRankList[0].money }}元
          </div>
        </div>
        <div
          v-if="topRankList[2]"
          class="third"
        >
          <img
            src="https://static.hudongmiao.com/joymewMp/nyn/thirdRankBox1.png"
            class="rkThird"
          />
          <img
            src="https://static.hudongmiao.com/joymewMp/nyn/rkThirdStage-01.png"
            class="rkThirdStage"
          />
          <div class="headImgBox publicHvCenter">
            <img
              :src="topRankList[2].headimgurl"
              class="headImg"
            />
          </div>
          <div class="name">
            {{ topRankList[2].nickname }}
          </div>
          <div class="money">
            {{ topRankList[2].money }}元
          </div>
        </div>
      </div>
      <div class="other publicVCenter">
        <div
          v-for="(item, index) in otherRankList"
          :key="index"
          class="otherItem publicVCenter"
        >
          <div class="num">
            {{ item.num }}
          </div>
          <img
            :src="item.headimgurl"
            class="headImg"
          />
          <div class="name">
            {{ item.nickname }}
          </div>
          <div class="money">
            {{ item.money }}元
          </div>
        </div>
      </div>
    </div>
    <!-- 反馈入口 -->
    <feedbackEntry />
  </div>
</template>
<script>
// import { mapState } from 'vuex';
import { timeoutTask, generateRandom } from '@/utils/index';
import wxApi from '@/utils/wxApi';
import feedbackEntry from '@/components/feedbackEntry/index.vue';
import {
  getPoolMoney, getNynInfo, getNynRank, nynRecharge, startNyn, sendPrizeInfo,
} from '@/api/nyn/index';
import { sendBroasCast } from '@/api/chat/index';

// 礼物数组
const giftList = [
  {
    id: 1,
    gift: 'rocket1',
    name: '小号火箭',
    imgUrl: 'https://static.hudongmiao.com/joymewMp/nyn/rocket1.png',
    isChoosed: true,
  },
  {
    id: 2,
    gift: 'rocket2',
    name: '中号火箭',
    imgUrl: 'https://static.hudongmiao.com/joymewMp/nyn/rocket2.png',
    isChoosed: false,
  },
  {
    id: 3,
    gift: 'rocket3',
    name: '大号火箭',
    imgUrl: 'https://static.hudongmiao.com/joymewMp/nyn/rocket3.png',
    isChoosed: false,
  },
];
// 蛋位置信息
const locatInfo = [
  {
    x: 15.7,
    y: 0,
    fallAniDelay: 0.2,
    rotateAniDelay: 0.1,
    upAniDelay: 1.6,
    rotateAniDelay2: 1.5,
  },
  {
    x: 34.4,
    y: 3.47,
    fallAniDelay: 0.4,
    rotateAniDelay: 0.3,
    upAniDelay: 1.4,
    rotateAniDelay2: 1.3,
  },
  {
    x: 52.3,
    y: 8.27,
    fallAniDelay: 0.6,
    rotateAniDelay: 0.5,
    upAniDelay: 1.2,
    rotateAniDelay2: 1.1,
  },
  {
    x: 0,
    y: 10.67,
    fallAniDelay: 0.8,
    rotateAniDelay: 0.7,
    upAniDelay: 1,
    rotateAniDelay2: 0.9,
  },
  {
    x: 16.53,
    y: 17.07,
    fallAniDelay: 1,
    rotateAniDelay: 0.9,
    upAniDelay: 0.8,
    rotateAniDelay2: 0.7,
  },
  {
    x: 35.2,
    y: 21.6,
    fallAniDelay: 1.2,
    rotateAniDelay: 1.1,
    upAniDelay: 0.6,
    rotateAniDelay2: 0.5,
  },
  {
    x: 54.9,
    y: 25.6,
    fallAniDelay: 1.4,
    rotateAniDelay: 1.3,
    upAniDelay: 0.4,
    rotateAniDelay2: 0.3,
  },
  {
    x: 1.07,
    y: 28.27,
    fallAniDelay: 1.6,
    rotateAniDelay: 1.5,
    upAniDelay: 0.2,
    rotateAniDelay2: 0.1,
  },
];
// 蛋类型
const eggType = [
  {
    imgUrl: 'https://static.hudongmiao.com/joymewMp/nyn/egg1-01.png',
    width: 18.8,
    height: 20.7,
    luckyBeginY: -20,
  },
  {
    imgUrl: 'https://static.hudongmiao.com/joymewMp/nyn/egg2.png',
    width: 18.8,
    height: 19.7,
    luckyBeginY: -20,
  },
  {
    imgUrl: 'https://static.hudongmiao.com/joymewMp/nyn/egg3.png',
    width: 18.8,
    height: 19.7,
    luckyBeginY: -20,
  },
  {
    imgUrl: 'https://static.hudongmiao.com/joymewMp/nyn/egg4-01.png',
    width: 18.8,
    height: 18.8,
    luckyBeginY: -20,
  },
];
const prizeItemList = [];
const wishList = ['醉酒饱德，不胜感激', '美酒佳肴,不甚荣幸', '感谢招待,祝愿安康', '小小红包,感谢招待'];
let tmpInterval; // 用于倒计时
let tmpInterval2; // 用于轮询
let lock = false; // 锁，用于确保 倒计时方法 一轮只调用一次
let lock2 = false; // 锁，用于确保 执行动画的过程中不可以点按钮
let lock3 = false; // 锁，用于确保 开始game按钮不能连续点击
let nynLuckyIndex = 0; // 扭一扭中奖列表的索引
let nynRechargeIndex = 0; // 扭一扭充值列表的索引

export default {
  components: {
    feedbackEntry,
  },
  data() {
    return {
      gameStatus: 1, // game状态(控制页面显示)
      giftList,
      poolMoney: 0, // 奖池金额
      countDownNum: 0, // 倒计时
      eggList: [], // 扭蛋列表
      giftListShow: true,
      btnType: 0,
      turnId: '', // 一场game的id 0代表要充值 否则代表这场game的场id
      isResultTipShow: false, // 控制扭一扭结果提示显示隐藏
      isEntry: false, // 充值入口
      topRankList: [],
      otherRankList: [],
      defaultHeadImg: require('../../assets/image/defaultHeadImg.png'),
      isRechargeTipShow: false, // 控制充值提示显示隐藏
      user: {
        nickname: 'player',
        money: 0,
      }, // 充值用户
      resultTipContent: {
        resultImgSrc: '',
        para1: '',
        para2: '',
        result: '',
        ptVal: 44,
      }, // 充值结果内容
      luckyEgg: {
        imgUrl: '',
        width: '',
        height: '',
        luckyBeginY: 0,
        isFallLuckyAni: false,
        isRotateAni: false,
        left: 2.86,
        top: -20,
        end: 0,
      },
      rechargeTipList: [], // 充值提示列表
      luckyTipList: [], // 中奖提示列表
    };
  },
  computed: {
    btnText() {
      return this.btnType === 0 ? '发送礼物' : '扭一扭';
    },
  },
  created() {
    tmpInterval = null;
    tmpInterval2 = null;
    lock = false;
    lock2 = false;
    lock3 = false;
    this.initPrizeItemList();
    this.initEggList();
    this.requestPoolMoney();
  },
  mounted() {
    this.toGame();
  },
  beforeDestroy() {
    clearInterval(tmpInterval);
    clearInterval(tmpInterval2);
    tmpInterval = null;
    tmpInterval2 = null;
    lock = false;
  },
  methods: {
    initPrizeItemList() {
      prizeItemList.splice(0);
      const tmpNynList = this.$store.state.live.nynList.split(',');
      for (let i = 0; i < tmpNynList.length; i += 1) {
        if (tmpNynList[i] !== '-1') {
          if (tmpNynList[i] === '0') {
            prizeItemList.push({
              desc: '谢谢参与',
              endIndex: i,
            });
          } else {
            prizeItemList.push({
              desc: `${tmpNynList[i]}元`,
              endIndex: i,
            });
          }
        }
      }
    },
    initEggList() {
      const len = prizeItemList.length;
      for (let i = 0; i < len; i += 1) {
        this.createEgg(this.eggList, i);
      }
    },
    createEgg(tmArr, num) {
      const typeIndex = num > 3 ? num - 4 : num;
      let tmpDesc;
      if (prizeItemList[num]) {
        tmpDesc = prizeItemList[num].desc;
      } else {
        tmpDesc = '谢谢参与';
      }
      const egg = {
        num: num + 1,
        imgUrl: eggType[typeIndex].imgUrl,
        width: eggType[typeIndex].width,
        height: eggType[typeIndex].height,
        left: locatInfo[num].x,
        bottom: locatInfo[num].y,
        fallAniDelay: locatInfo[num].fallAniDelay,
        rotateAniDelay: locatInfo[num].rotateAniDelay,
        isFallAni: false,
        aroundAni: '',
        isRotateAni: false,
        prize: tmpDesc,
      };
      tmArr.push(egg);
    },
    // 获取充值和中奖列表
    requestTipList() {
      this.rechargeTipList.splice(0);
      this.luckyTipList.splice(0);
      getPoolMoney()
        .then((res) => {
          console.log('***getPoolMoney***', res);
          const subTime = this.timeHandle(res.endTime);
          if (subTime <= 0) {
            // game提前结束
            this.requestRankList();
          }
          for (let i = 0; i < res.list.length; i += 1) {
            this.rechargeTipList.push({
              nickname: res.list[i].wx_name,
              money: res.list[i].gsum,
            });
            if (parseInt(res.list[i].c01, 10) > 0 && res.list[i].USER_ID !== this.$store.state.user.userId) {
              // 确保 “谢谢参与的” 奖项 和 自己的中奖的奖项不弹出
              this.luckyTipList.push({
                nickname: res.list[i].wx_name,
                endMoney: res.list[i].c01,
              });
            }
          }
          this.poolMoney = res.balance;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loopShowResultTip(pNickname, money) {
      const nickname = pNickname || '匿名';
      if (parseInt(money, 10) > 0) {
        // 抽中
        this.resultTipContent.resultImgSrc = 'https://static.hudongmiao.com/joymewMp/nyn/happyMew-01.png';
        this.resultTipContent.para1 = `恭喜${nickname}`;
        this.resultTipContent.para2 = `获得${money}奖励`;
        this.resultTipContent.ptVal = 15;
        this.isResultTipShow = true;
        this.resultTipAni = 'resultTipAni';
        timeoutTask(() => {
          this.isResultTipShow = false;
          nynLuckyIndex += 1;
        }, 4000);
      } else {
        // 未抽中
        this.resultTipContent.resultImgSrc = 'https://static.hudongmiao.com/joymewMp/nyn/sadMew-01.png';
        this.resultTipContent.para1 = '很遗憾没有抽中';
        this.resultTipContent.para2 = '谢谢惠顾，再接再厉';
        this.resultTipContent.ptVal = 14;
        this.isResultTipShow = true;
        this.resultTipAni = 'resultTipAni';
        timeoutTask(() => {
          this.isResultTipShow = false;
        }, 4000);
      }
    },
    noticeShow() {
      if (this.rechargeTipList[nynRechargeIndex] && !this.isRechargeTipShow) {
        // 当前存在未弹出的充值消息
        this.user.nickname = this.rechargeTipList[nynRechargeIndex].nickname;
        this.user.money = this.rechargeTipList[nynRechargeIndex].money;
        // 调用showRechargeTip方法
        this.showRechargeTip();
      }
      if (this.luckyTipList[nynLuckyIndex] && !this.isResultTipShow) {
        // 当前存在未弹出的中奖消息
        const tmpObj = this.luckyTipList[nynLuckyIndex];
        this.loopShowResultTip(tmpObj.nickname, tmpObj.endMoney);
      }
      this.requestTipList();
    },
    requestPoolMoney() {
      getPoolMoney()
        .then((res) => {
          console.log(res);
          this.poolMoney = res.balance;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击进入game
    toGame() {
      if (lock3) {
        return;
      }
      lock3 = true;
      this.requestGameInitInfo();
    },
    // 时间戳处理
    timeHandle(endTime) {
      const nowTime = new Date().getTime();
      let subTime = parseInt((parseInt(endTime, 10) - parseInt(nowTime, 10)) / 1000, 10);
      if (subTime < 0) {
        subTime = 0;
      }
      return subTime;
    },
    // 不带毫秒的倒计时
    countDown(second) {
      if (!lock && !tmpInterval) {
        lock = true;
        tmpInterval = setInterval(() => {
          if (second <= 1) {
            this.isEntry = false;
            this.countDownNum = second;
            this.requestRankList();
          } else {
            second -= 1;
            if (second <= 15) {
              this.isEntry = false;
            } else {
              this.isEntry = true;
            }
            this.countDownNum = second;
          }
        }, 1000);
      }
    },
    requestGameInitInfo() {
      getNynInfo()
        .then((res) => {
          console.log(res);
          console.log(typeof res.id);
          this.turnId = res.id;
          if (res.id === '0') {
            this.btnType = 0;
            this.giftListShow = true;
          } else {
            this.btnType = 1;
            this.giftListShow = false;
          }
          if (res.endTime === '0') {
            this.$toast.center('扭一扭尚未开始');
          } else {
            const countTime = this.timeHandle(res.endTime);
            this.countDown(countTime);
            this.gameStatus = 2;
            this.fallEgg();
            // 轮询获取充值和中奖列表
            if (!tmpInterval2) {
              tmpInterval2 = setInterval(() => {
                console.log('tmpInterval2');
                this.noticeShow();
              }, 4000);
            }
          }
          lock3 = false;
        })
        .catch((err) => {
          console.log(err);
          lock3 = false;
        });
    },
    fallEgg() {
      for (let i = 0; i < 8; i += 1) {
        this.eggList[i].isFallAni = true;
        this.eggList[i].isRotateAni = true;
      }
      timeoutTask(() => {
        for (let i = 0; i < 8; i += 1) {
          this.eggList[i].isFallAni = false;
          this.eggList[i].isRotateAni = false;
        }
      }, 2000);
    },
    requestRankList() {
      getNynRank()
        .then((res) => {
          console.log(res);
          lock = false;
          // 排行榜列表赋值
          let count = 0;
          let tmpLen = res.list.length;
          if (tmpLen > 10) {
            tmpLen = 10;
          }
          while (count < tmpLen) {
            if (count < 3) {
              this.topRankList.push({
                nickname: res.list[count].wx_name,
                headimgurl: res.list[count].avator,
                money: Math.floor(parseFloat(res.list[count].money)),
              });
            } else {
              this.otherRankList.push({
                num: count < 0 ? `0${count + 1}` : count + 1,
                nickname: res.list[count].wx_name,
                headimgurl: res.list[count].avator,
                money: Math.floor(parseFloat(res.list[count].money)),
              });
            }
            count += 1;
          }
          if (this.topRankList.length < 3) {
            const tmpLen2 = this.topRankList.length;
            for (let i = tmpLen2; i < 3; i += 1) {
              this.topRankList.push({
                nickname: 'Player',
                headimgurl: this.defaultHeadImg,
                money: 0,
              });
            }
          }
          if (this.otherRankList.length < 7) {
            const tmpLen3 = this.otherRankList.length;
            for (let i = tmpLen3; i < 7; i += 1) {
              this.otherRankList.push({
                num: i + 3 < 0 ? `0${i + 4}` : i + 4,
                nickname: 'Player',
                headimgurl: this.defaultHeadImg,
                money: 0,
              });
            }
          }
          this.gameStatus = 3;
          // 结束轮询和倒计时
          clearInterval(tmpInterval2);
          clearInterval(tmpInterval);
          tmpInterval = null;
          tmpInterval2 = null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toAgreement() {
      window.location.href = '/agreement/index.html';
    },
    chooseGift(e) {
      this.giftList.forEach((item) => {
        if (item.id === e.p) {
          item.isChoosed = true;
        } else {
          item.isChoosed = false;
        }
      });
    },
    handleStartBtnTap() {
      if (this.btnType === 0) {
        // 判断是否选中某个礼物
        const resultIndex = this.giftList.findIndex((item) => item.isChoosed);
        if (resultIndex > -1) {
          if (this.isEntry) {
            this.recharge();
          } else {
            // 最后十五秒购买入口关闭
            this.$toast.center('购买入口关闭!');
          }
        } else {
          this.$toast.center('请选择一个礼物!');
        }
      }
    },
    recharge() {
      if (lock2) {
        return;
      }
      lock2 = true;
      nynRecharge()
        .then((res) => {
          return wxApi.pay(res);
        })
        .then(() => {
          this.$toast.center('礼物发送成功!');
          this.sendGift(this.getChoosedGift());
          // 充值成功后按钮状态立即改变
          this.btnType = 1;
          this.giftListShow = false;
          timeoutTask(() => {
            console.log('2s后自动扭一扭');
            this.tapstartNyn();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          lock2 = false;
        });
    },
    tapstartNyn() {
      getNynInfo()
        .then((res) => {
          console.log(res);
          this.turnId = res.id;
          this.startGame();
        })
        .catch((err) => {
          console.log(err);
          this.$toast.center('网络异常!');
        });
    },
    getChoosedGift() {
      return this.giftList.find((item) => item.isChoosed);
    },
    sendGift(giftChoosed) {
      let tmpCode = '';
      if (giftChoosed.id === 1) {
        tmpCode = 5002;
      } else if (giftChoosed.id === 2) {
        tmpCode = 6002;
      } else if (giftChoosed.id === 3) {
        tmpCode = 7002;
      }
      const c = JSON.stringify({
        code: tmpCode,
        param: {
          headImg: this.$store.state.user.headImg,
          nickname: this.$store.state.user.name,
          wish: wishList[generateRandom(0, 4)],
        },
      });
      sendBroasCast({
        c,
      });
    },
    beginAroundAni() {
      for (let i = 0; i < 8; i += 1) {
        this.eggList[i].fallAniDelay = locatInfo[i].upAniDelay;
        this.eggList[i].rotateAniDelay = locatInfo[i].rotateAniDelay2;
        this.eggList[i].isRotateAni = true;
        this.eggList[i].aroundAni = `aroundAni${this.eggList[i].num}`;
      }
    },
    endAroundAni() {
      for (let i = 0; i < 8; i += 1) {
        this.eggList[i].isRotateAni = false;
        this.eggList[i].aroundAni = '';
      }
    },
    createLuckyEgg(num, money) {
      console.log('***createLuckyEgg***');
      console.log(num, money);
      console.log(prizeItemList);
      const eggTypeIndex = generateRandom(0, 4);
      this.luckyEgg.imgUrl = eggType[eggTypeIndex].imgUrl;
      this.luckyEgg.width = eggType[eggTypeIndex].width;
      this.luckyEgg.height = eggType[eggTypeIndex].height;
      this.luckyEgg.luckyBeginY = eggType[eggTypeIndex].luckyBeginY;
      let desc;
      if (prizeItemList[parseInt(num, 10)]) {
        desc = prizeItemList[parseInt(num, 10)].desc;
      }
      if (money) {
        desc = money;
      }
      if (parseInt(num, 10) === 0) {
        desc = '谢谢参与';
      }
      this.luckyEgg.prize = desc;
    },
    // 蛋掉落 从蛋下落并停留到消失 耗时 3s
    showLuckyEgg(endIndex, endMoney) {
      this.createLuckyEgg(endIndex, endMoney);
      this.luckyEgg.top = this.luckyEgg.luckyBeginY;
      this.luckyEgg.isFallLuckyAni = true;
      this.luckyEgg.isRotateAni = true;
      // 下落后保持在终点位置
      timeoutTask(() => {
        this.luckyEgg.end = 27.04;
        this.luckyEgg.isRotateAni = false;
        console.log('***保持在终点位置***');
      }, 1000);
      timeoutTask(() => {
        console.log('***回到初始位置***');
        this.luckyEgg.isFallLuckyAni = false;
        this.luckyEgg.end = 0;
        this.luckyEgg.top = this.luckyEgg.luckyBeginY;
      }, 4000);
    },
    showResultTip(num, pNickname, money) {
      console.log('***showReusltTip***');
      console.log(prizeItemList);
      console.log(num);
      let desc;
      if (prizeItemList[parseInt(num, 10)]) {
        desc = prizeItemList[parseInt(num, 10)].desc;
      } else {
        desc = '谢谢参与';
      }
      const nickname = pNickname || '匿名';
      if (money) {
        desc = money;
      }
      if (parseInt(num, 10) === 0) {
        // 未抽中
        this.resultTipContent.resultImgSrc = 'https://static.hudongmiao.com/joymewMp/nyn/sadMew-01.png';
        this.resultTipContent.para1 = '很遗憾没有抽中';
        this.resultTipContent.para2 = '谢谢惠顾，再接再厉';
        this.resultTipContent.ptVal = 14;
        this.isResultTipShow = true;
        this.resultTipAni = 'resultTipAni';
        timeoutTask(() => {
          this.isResultTipShow = false;
        }, 4000);
      } else {
        // 抽中
        this.resultTipContent.resultImgSrc = 'https://static.hudongmiao.com/joymewMp/nyn/happyMew-01.png';
        this.resultTipContent.para1 = `恭喜${nickname}`;
        this.resultTipContent.para2 = `获得${desc}奖励`;
        this.resultTipContent.ptVal = 15;
        this.isResultTipShow = true;
        this.resultTipAni = 'resultTipAni';
        timeoutTask(() => {
          this.isResultTipShow = false;
        }, 4000);
      }
    },
    showRechargeTip() {
      this.isRechargeTipShow = true;
      this.rechargeTipAni = 'rechargeTipAni';
      timeoutTask(() => {
        this.isRechargeTipShow = false;
        nynRechargeIndex += 1;
      }, 4000);
    },
    testGameAniStart() {
      this.btnType = 1;
      this.giftListShow = false;
      this.beginAroundAni();
      timeoutTask(() => {
        // 5s后结束扭一扭动画 展示luckyEgg
        this.endAroundAni();
        this.showLuckyEgg(1, 2);
      }, 5000);
      timeoutTask(() => {
        console.log('***6s后 展示resultTip***');
        this.showResultTip(0, this.$store.state.user.name, 2);
      }, 6000);
      timeoutTask(() => {
        console.log('***10s后恢复状态***');
        this.btnType = 0;
        this.giftListShow = true;
      }, 10000);
    },
    gameAniStart(endIndex, endMoney) {
      this.beginAroundAni();
      timeoutTask(() => {
        // 5s后结束扭一扭动画 展示luckyEgg
        this.endAroundAni();
        this.showLuckyEgg(endIndex, endMoney);
      }, 5000);
      timeoutTask(() => {
        console.log('***6s后 展示resultTip***');
        this.showResultTip(endIndex, this.$store.state.user.name, endMoney);
      }, 6000);
      timeoutTask(() => {
        console.log('***10s后恢复状态***');
        this.btnType = 0;
        this.giftListShow = true;
      }, 10000);
    },
    startGame() {
      startNyn({
        turnId: this.turnId,
      })
        .then((res) => {
          console.log(res);
          // 奖池金额刷新
          if (res.totalMoney.balance) {
            this.poolMoney = res.totalMoney.balance;
          }
          // game动画开始
          this.gameAniStart(res.lotteryType, res.endMoney);

          // 5s动画停止后发送广播(必须要中奖的情况)
          if (parseInt(res.endMoney, 10) > 0) {
            timeoutTask(() => {
              this.sendBroad(res.endMoney, res.totalMoney.balance);
            }, 5000);
          }
          timeoutTask(() => {
            lock2 = false;
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
          lock2 = false;
        });
    },
    // 发广播
    sendBroad(golds, remainCoins) {
      sendPrizeInfo({
        gold: golds,
        remainCoin: remainCoins,
        turnId: this.turnId,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          this.$toast.center('网络异常!');
        });
    },
  },
};
</script>
<style lang="less" scoped>
.nynContainer {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .bgArea {
    .bg {
      width: 100%;
      position: absolute;
    }
    .star {
      position: absolute;
      width: 100%;
      height: 267px;
      top: 0;
    }
    .dotFall {
      position: absolute;
      width: 100%;
      height: 663px;
      top: 266px;
    }
  }
  .waitContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .prizePool {
      position: absolute;
      top: 25px;
      width: 529px;
      height: 119px;
      z-index: 1;
      .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .ct {
        font-size: 37px;
        font-weight: 500;
        color: #ffffff;
        text-shadow: 0px 2px 2px rgba(209, 41, 41, 0.5);
        position: absolute;
        .money {
          font-size: 37px;
          font-weight: 500;
          color: #ffeac2;
          text-shadow: 0px 2px 2px rgba(209, 41, 41, 0.5);
          margin-left: 22px;
        }
      }
    }
    .ruleBox {
      width: 658px;
      height: 622px;
      position: absolute;
      bottom: 516px;
    }
    .gameBox {
      width: 769px;
      height: 548px;
      position: absolute;
      bottom: -33px;
      .gameBoxImg {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .tip {
        font-size: 27px;
        font-weight: 500;
        color: #fffdf0;
        position: absolute;
        top: 29px;
        .strong {
          color: #f7d063;
        }
      }
      .startBtn {
        font-size: 38px;
        color: #ffffff;
        width: 282px;
        height: 92px;
        position: absolute;
        top: 64px;
      }
      .dmGiftTitle {
        position: absolute;
        top: 277px;
        width: 358px;
        height: 83px;
      }
      .giftListWrap {
        position: absolute;
        top: 364px;
        .giftItem {
          width: 512px;
          height: 136px;
          position: relative;
          .locatImg {
            width: 100%;
            height: 100%;
            position: absolute;
          }
          .giftImgList {
            position: absolute;
            width: 100%;
            height: 100%;
            .giftImg {
              height: 133px;
              position: absolute;
              &.g1 {
                left: 16px;
              }
              &.g2 {
                left: 203px;
              }
              &.g3 {
                left: 389px;
              }
              img {
                width: 108px;
                height: 108px;
              }
            }
          }
        }
      }
    }
  }
  .gameContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .rechargeTipWarp {
      position: absolute;
      left: 0;
      top: 20px;
      padding-left: 30px;
      padding-right: 30px;
      height: 64px;
      border-radius: 32px;
      background-color: #cd2bfb;
      color: #ffe590;
      font-size: 24px;
      z-index: 2;
      &.rechargeTipAni {
        animation: rechargeTipAni 4s ease-out;
      }
    }
    .star {
      margin-top: 8px;
      margin-right: 8px;
    }
  }
  .eggBoxWrap {
    position: relative;
    width: 658px;
    height: 611px;
    margin-top: -11px;
    background-size: 100% 100%;
    position: absolute;
    bottom: 453px;
    flex-direction: column;
    background-image: url('https://static.hudongmiao.com/joymewMp/nyn/eggBox.png');
    .prizePool {
      width: 474px;
      height: 117px;
      background-image: linear-gradient(180deg, #ff908a 0%, #ff7876 6%, #e1525d 100%);
      box-shadow: 0px 10px 3px 0px rgba(255, 249, 242, 0.31);
      border-radius: 11px;
      font-size: 36px;
      font-weight: 500;
      color: #ffffff;
      text-shadow: 0px 1px 1px rgba(209, 41, 41, 0.5);
      top: -122px;
      position: absolute;
      z-index: 1;
      .price {
        font-size: 36px;
        font-family: PingFang-SC-Heavy, PingFang-SC;
        font-weight: 800;
        color: #fdeab0;
        text-shadow: 0px 1px 1px rgba(209, 41, 41, 0.5);
        margin-left: 10px;
      }
    }
    .countDown {
      width: 264px;
      height: 66px;
      background-image: url('https://static.hudongmiao.com/joymewMp/nyn/marquee.png');
      background-size: 100% 100%;
      position: absolute;
      top: 16px;
      font-size: 28px;
      font-weight: 800;
      color: #fdeab0;
    }
    .eggs {
      position: absolute;
      width: 557px;
      height: 449px;
      top: 81px;
      left: 51px;
      overflow: hidden;
      .eggItem {
        position: absolute;
        .egg {
          position: absolute;
          width: 100%;
          height: 100%;
          .hb {
            width: 80px;
            height: 94px;
            position: absolute;
            left: 29px;
            top: 18px;
            background-image: url('https://static.hudongmiao.com/joymewMp/nyn/hb01.png');
            background-size: 100% 100%;
            label {
              font-size: 24px;
              font-weight: bold;
              text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
              color: #ffffff;
              position: absolute;
              top: 24px;
              white-space: nowrap;
            }
          }
          .eggImg {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .gameBox {
    width: 769px;
    height: 548px;
    position: absolute;
    bottom: -34px;
    .gameBoxImg {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .agreement {
      font-size: 24px;
      font-weight: 400;
      color: #fff;
      position: absolute;
      top: 30px;
    }
    .giftListWrap {
      position: absolute;
      top: 364px;
      .giftItem {
        width: 512px;
        height: 136px;
        position: relative;
        .locatImg {
          width: 100%;
          height: 100%;
          position: absolute;
        }
        .giftImgList {
          position: absolute;
          width: 100%;
          height: 100%;
          .giftImg {
            height: 115px;
            position: absolute;
            margin-top: 12px;
            .lightImage {
              width: 200px;
              height: 200px;
              position: absolute;
            }
            .giftImage {
              width: 108px;
              height: 108px;
              position: absolute;
            }
            &.g1 {
              left: 69px;
            }
            &.g2 {
              left: 259px;
            }
            &.g3 {
              left: 444px;
            }
            &.choosed {
              background-color: #e04b4e;
              border: 2px solid #e04b4e;
              .giftImage {
                width: 108px;
                height: 108px;
                transform: scale(1.4);
              }
            }
          }
        }
      }
    }
    .startBtn {
      font-size: 38px;
      color: #ffffff;
      width: 282px;
      height: 92px;
      position: absolute;
      top: 66px;
    }
    .dmGiftTitle {
      position: absolute;
      top: 270px;
      width: 358px;
      height: 83px;
    }
    .eggExit {
      width: 223px;
      height: 262px;
      position: absolute;
      background-image: url('https://static.hudongmiao.com/joymewMp/nyn/chukou.png');
      background-size: 100% 100%;
      top: 253px;
      left: 58px;
      .luckyEggWrap {
        position: absolute;
        width: 177px;
        height: 213px;
        top: 26px;
        left: 22px;
        overflow: hidden;
        .luckyEgg {
          position: absolute;
          left: 41px;
          top: -110px;
          .egg {
            position: absolute;
            width: 100%;
            height: 100%;
            .hb {
              width: 53px;
              height: 65px;
              position: absolute;
              left: 40px;
              top: 40px;
              background-image: url('https://static.hudongmiao.com/joymewMp/nyn/hb01.png');
              background-size: 100% 100%;
              label {
                font-size: 13px;
                font-weight: bold;
                text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
                color: #feda80;
                position: absolute;
                top: 30px;
                white-space: nowrap;
              }
            }
            .eggImg {
              width: 100%;
              height: 100%;
              position: absolute;
            }
          }
        }
      }
    }
  }
  .resultTipWarp {
    width: 586px;
    height: 269px;
    position: absolute;
    right: 66px;
    top: 342px;
    flex-direction: column;
    padding-left: 26vw;
    padding-top: 44px;
    z-index: 2;
    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .para1 {
      color: #ffffff;
      font-size: 36px;
      font-weight: bold;
      position: relative;
    }
    .para2 {
      color: #ffffff;
      font-size: 32px;
      font-weight: bold;
      margin-top: 5px;
      position: relative;
    }
    &.resultTipAni {
      animation: resultTipAni 4s ease-out;
    }
  }
  .rankContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .topThree {
      width: 100%;
      margin-top: 0px;
      .second {
        width: 205px;
        height: 377px;
        position: relative;
        .rkSecond {
          width: 205px;
          height: 230px;
          position: absolute;
          top: 76px;
          z-index: 2;
        }
        .rkSecondStage {
          width: 204px;
          height: 456px;
          position: absolute;
          top: 190px;
        }
        .headImgBox {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          left: 23px;
          top: 103px;
          z-index: 1;
          .headImg {
            width: 135px;
            height: 135px;
            border-radius: 50%;
            position: absolute;
            top: 14px;
          }
        }
        .name {
          font-size: 28px;
          color: #ffffff;
          width: 100%;
          position: absolute;
          top: 359px;
          text-align: center;
        }
        .money {
          font-size: 28px;
          color: #fff2b4;
          width: 100%;
          position: absolute;
          top: 413px;
          text-align: center;
        }
      }
      .first {
        width: 257px;
        height: 471px;
        position: relative;
        .rkFirst {
          width: 250px;
          height: 267px;
          position: absolute;
          z-index: 2;
        }
        .rkFirstStage {
          width: 204px;
          height: 593px;
          position: absolute;
          left: 26px;
          top: 139px;
        }
        .headImgBox {
          width: 183px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          left: 36px;
          top: 17px;
          z-index: 1;
          .headImg {
            width: 156px;
            height: 156px;
            border-radius: 50%;
            position: absolute;
            top: 27px;
          }
        }
        .name {
          font-size: 28px;
          color: #ffffff;
          width: 100%;
          position: absolute;
          top: 304px;
          text-align: center;
        }
        .money {
          font-size: 28px;
          color: #fff2b4;
          width: 100%;
          position: absolute;
          top: 356px;
          text-align: center;
        }
      }
      .third {
        width: 191px;
        height: 367px;
        position: relative;
        .rkThird {
          width: 188px;
          height: 202px;
          position: absolute;
          z-index: 2;
          top: 115px;
        }
        .rkThirdStage {
          height: 431px;
          position: absolute;
          top: 194px;
          left: 0px;
        }
        .headImgBox {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          left: 14px;
          top: 103px;
          z-index: 1;
          .headImg {
            width: 135px;
            height: 135px;
            border-radius: 50%;
            position: absolute;
            top: 19px;
          }
        }
        .name {
          font-size: 28px;
          color: #ffffff;
          width: 100%;
          position: absolute;
          top: 359px;
          text-align: center;
        }
        .money {
          font-size: 28px;
          color: #fff2b4;
          width: 100%;
          position: absolute;
          top: 413px;
          text-align: center;
        }
      }
    }
    .other {
      width: 670px;
      height: 978px;
      background-image: url('https://static.hudongmiao.com/joymewMp/nyn/rkBox-01.png');
      background-size: 100% 100%;
      position: absolute;
      z-index: 2;
      top: 430px;
      flex-direction: column;
      padding-top: 51px;
      .otherItem {
        width: 548px;
        height: 112px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        width: 494px;
        position: relative;
        .num {
          font-size: 34px;
          color: #ffffff;
        }
        .headImg {
          width: 64px;
          height: 64px;
          margin-left: 15px;
          border-radius: 50%;
        }
        .name {
          font-size: 30px;
          color: #ffffff;
          position: absolute;
          left: 154px;
        }
        .money {
          font-size: 28px;
          color: #fff2b4;
          position: absolute;
          right: 16px;
        }
      }
    }
  }
  &.rankShow {
    overflow: unset;
  }
}
@keyframes rechargeTipAni {
  0% {
    transform: translate3d(-100px, 0, 0);
    opacity: 1;
  }

  25% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  75% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -80px, 0);
    opacity: 0;
  }
}

@keyframes resultTipAni {
  0% {
    transform: translate3d(200px, 0, 0);
    opacity: 1;
  }

  25% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  75% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -80px, 0);
    opacity: 0;
  }
}
.fallAni {
  animation: fallAni 1s linear backwards;
}

.fallLuckyAni {
  animation: fallLuckyAni 1s linear backwards;
}

.rotateAni {
  animation: rotateAni 1s linear backwards infinite;
}
.lightAni {
  animation: lightAni 1s linear backwards infinite;
}
.aroundAni1 {
  animation: aroundAni1 2s linear infinite;
}

.aroundAni2 {
  animation: aroundAni2 2s linear infinite;
}

.aroundAni3 {
  animation: aroundAni3 2s linear infinite;
}

.aroundAni4 {
  animation: aroundAni4 2s linear infinite;
}

.aroundAni5 {
  animation: aroundAni5 2s linear infinite;
}

.aroundAni6 {
  animation: aroundAni6 2s linear infinite;
}

.aroundAni7 {
  animation: aroundAni7 2s linear infinite;
}

.aroundAni8 {
  animation: aroundAni8 2s linear infinite;
}
@keyframes fallLuckyAni {
  0% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(208px);
  }

  50% {
    transform: translateY(150px);
  }

  60% {
    transform: translateY(208px);
  }

  70% {
    transform: translateY(175px);
  }

  80% {
    transform: translateY(208px);
  }

  90% {
    transform: translateY(199px);
  }

  100% {
    transform: translateY(208px);
  }
}

@keyframes fallAni {
  0% {
    transform: translateY(-300%);
    opacity: 0;
  }

  5% {
    transform: translateY(-300%);
  }

  15% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-100%);
  }

  40% {
    transform: translateY(0%);
  }

  50% {
    transform: translateY(-60%);
  }

  70% {
    transform: translateY(0%);
  }

  80% {
    transform: translateY(-30%);
  }

  90% {
    transform: translateY(0%);
  }

  95% {
    transform: translateY(-14%);
  }

  97% {
    transform: translateY(0%);
  }

  99% {
    transform: translateY(-6%);
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes rotateAni {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes aroundAni1 {
  0% {
    transform: translate(0px, 0px);
  }

  20% {
    transform: translate(299px, -150px);
  }

  40% {
    transform: translate(100px, -300px);
  }

  60% {
    transform: translate(-115px, -150px);
  }

  80% {
    transform: translate(-85px, -52px);
  }

  100% {
    transform: translate(185px, -152px);
  }
}

@keyframes aroundAni2 {
  0% {
    transform: translate(0px, 0px);
  }

  20% {
    transform: translate(158px, -222px);
  }

  40% {
    transform: translate(60px, -18px);
  }

  60% {
    transform: translate(-200px, -230px);
  }

  80% {
    transform: translate(-255px, -32px);
  }

  100% {
    transform: translate(0px, -132px);
  }
}

@keyframes aroundAni3 {
  0% {
    transform: translate(0px, 0px);
  }

  20% {
    transform: translate(-360px, -185px);
  }

  40% {
    transform: translate(25px, -10px);
  }

  60% {
    transform: translate(-125px, -210px);
  }

  80% {
    transform: translate(-392px, -100px);
  }

  100% {
    transform: translate(-50px, 15px);
  }
}

@keyframes aroundAni4 {
  0% {
    transform: translate(0px, 0px);
  }

  20% {
    transform: translate(416px, -162px);
  }

  40% {
    transform: translate(120px, -180px);
  }

  60% {
    transform: translate(0px, 20px);
  }

  80% {
    transform: translate(416px, -163px);
  }

  100% {
    transform: translate(216px, 76px);
  }
}

@keyframes aroundAni5 {
  0% {
    transform: translate(0px, 0px);
  }

  20% {
    transform: translate(292px, -108px);
  }

  40% {
    transform: translate(30px, 132px);
  }

  60% {
    transform: translate(-125px, -110px);
  }

  80% {
    transform: translate(150px, -132px);
  }

  100% {
    transform: translate(290px, 60px);
  }
}

@keyframes aroundAni6 {
  0% {
    transform: translate(0px, 0px);
  }

  20% {
    transform: translate(152px, -85px);
  }

  40% {
    transform: translate(-263px, 105px);
  }

  60% {
    transform: translate(152px, -50px);
  }

  80% {
    transform: translate(-160px, -100px);
  }

  100% {
    transform: translate(-263px, 105px);
  }
}

@keyframes aroundAni7 {
  0% {
    transform: translate(0px, 0px);
  }

  20% {
    transform: translate(-412px, -55px);
  }

  40% {
    transform: translate(-190px, 196px);
  }

  60% {
    transform: translate(6px, -40px);
  }

  80% {
    transform: translate(-300px, -70px);
  }

  100% {
    transform: translate(-410px, 136px);
  }
}

@keyframes aroundAni8 {
  0% {
    transform: translate(0px, 0px);
  }

  20% {
    transform: translate(300px, -44px);
  }

  40% {
    transform: translate(408px, 90px);
  }

  60% {
    transform: translate(70px, 170px);
  }

  80% {
    transform: translate(270px, -40px);
  }

  100% {
    transform: translate(408px, 136px);
  }
}
@keyframes lightAni {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
