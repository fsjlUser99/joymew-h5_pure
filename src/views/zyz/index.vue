<template>
  <div class="zyzContainer">
    <div class="bgArea">
      <img
        v-if="gameStatus === 1 || gameStatus === 2"
        src="https://static.hudongmiao.com/joymewMp/zyz/zyzBg2.png"
        class="bg"
      />
      <img
        v-if="gameStatus === 3"
        src="https://static.hudongmiao.com/joymewMp/zyz/rankBg.png"
        class="bg"
      />
      <div
        v-if="gameStatus === 1 || gameStatus === 2"
        class="shade"
      />
      <img
        v-if="gameStatus === 2"
        src="https://static.hudongmiao.com/joymewMp/zyz/title.png"
        class="title"
      />
    </div>
    <!-- 等待界面 -->
    <div
      v-if="gameStatus === 1"
      class="waitContainer publicVCenter"
    >
      <!-- 奖池金额 -->
      <div class="totalMoney publicHvCenter">
        奖池总金额: {{ poolMoney }}元
        <img
          src="https://static.hudongmiao.com/joymewMp/zyz/coins.png"
          class="coinsImg"
        />
      </div>
      <div class="ruleBox publicHCenter">
        <img
          src="https://static.hudongmiao.com/joymewMp/zyz/ruleBox.png"
          class="ruleBoxImg"
        />
        <div class="ruleContent">
          <div class="para">
            1、主持人点击开始按钮，转一转立即开始；
          </div>
          <div class="para">
            2、转一转时长150秒，在倒计时结束前单个参与者可以不限次数参与转一转；
          </div>
          <div class="para">
            3、参与者购买高级别弹幕后，系统将免费赠送机会；
          </div>
          <div class="para">
            4、所有奖项均为随机事件，参与者的消费将计入总奖池，中奖者的奖金将从奖池中扣除。
          </div>
        </div>
      </div>
      <div class="giftListWrap">
        <div
          v-for="(item, index) in giftList"
          :key="item.id"
          v-tap="{ methods: chooseGift, p: item.id }"
          class="giftItem publicHCenter"
          :class="{ active: item.isChoosed ? 'active' : '' }"
        >
          <div class="fudai" />
          <img
            :src="item.imgUrl"
            class="giftImg"
            :class="'g' + (index + 1)"
          />
        </div>
      </div>
      <div
        v-tap="{ methods: toGame }"
        class="startBtn"
      />
    </div>
    <!-- game界面 -->
    <div
      v-if="gameStatus === 2"
      class="gameContainer publicVCenter"
    >
      <!-- 奖池金额 -->
      <div class="totalMoney publicHvCenter">
        奖池总金额: {{ poolMoney }}元
        <img
          src="https://static.hudongmiao.com/joymewMp/zyz/coins.png"
          class="coinsImg"
        />
      </div>
      <!-- 转盘区域 -->
      <div class="wheelArea publicHvCenter">
        <img
          src="https://static.hudongmiao.com/joymewMp/zyz/wheelBorder.png"
          class="wheelBorderImg"
        />
        <img
          src="https://static.hudongmiao.com/joymewMp/zyz/wheel.png"
          class="wheelImg"
        />
        <img
          src="https://static.hudongmiao.com/joymewMp/zyz/wheelInner.png"
          class="wheelInnerImg"
          :style="{ transform: 'rotate(' + wheelRodateDeg + 'deg)' }"
        />
        <img
          src="https://static.hudongmiao.com/joymewMp/zyz/wheelBtn.png"
          class="wheelBtn"
        />
        <div class="countdown publicVCenter">
          <div class="time">
            {{ countDownNum }}
          </div>
          <div class="timeKey">
            倒计时
          </div>
        </div>
        <div class="prizeWrap">
          <div
            v-for="(item, index) in prizeItemList"
            :key="index"
            class="prizeItem"
          >
            <div class="prizeName">
              {{ item }}
            </div>
            <img
              v-if="index !== 3 && index !== 8"
              src="https://static.joymew.com/joymewMp/zyz/hb.png"
              class="hbImg"
            />
          </div>
        </div>
      </div>
      <!-- 选择发送礼物 -->
      <div
        v-tap="{ methods: toAgreement }"
        class="agreement"
      >
        阅读并同意《充值服务协议》
      </div>
      <div class="giftListWrap">
        <div
          v-for="(item, index) in giftList"
          :key="item.id"
          v-tap="{ methods: chooseGift, p: item.id }"
          class="giftItem publicHCenter"
          :class="{ active: item.isChoosed ? 'active' : '' }"
        >
          <div class="fudai" />
          <img
            :src="item.imgUrl"
            class="giftImg"
            :class="'g' + (index + 1)"
          />
        </div>
      </div>
      <div class="startBtn publicHvCenter">
        <div
          v-tap="{ methods: recharge }"
          class="text"
        >
          发送礼物
        </div>
        <!-- <div class="text" v-tap="{ methods: testRecharge }">发送礼物</div> -->
      </div>
      <!-- 中奖结果 -->
      <div
        v-if="isLuckyShow"
        class="luckyWrap publicVCenter"
        :class="luckyAni"
      >
        <div class="tit">
          中奖啦
        </div>
        <div class="congragulations">
          恭喜你! 获得
          <label>{{ luckyMoney }}</label>
          元红包!
        </div>
        <div class="wechatTip">
          微信已实时到账
        </div>
        <div class="money">
          {{ luckyMoney }}元
        </div>
      </div>
    </div>
    <!-- game排行榜界面 -->
    <div
      v-if="gameStatus === 3"
      class="rankContainer publicVCenter"
    >
      <div
        v-if="topRankList[0]"
        class="firstLucky publicVCenter"
      >
        <div class="num publicHvCenter">
          <div class="text">
            1
          </div>
        </div>
        <div class="headImgBox publicHvCenter">
          <img
            :src="topRankList[0].headimgurl"
            class="headImg"
          />
        </div>
        <div class="name publicHvCenter">
          <div class="text">
            {{ topRankList[0].nickname }}
          </div>
        </div>
        <div class="money">
          <div class="text">
            {{ topRankList[0].money }}元
          </div>
        </div>
      </div>
      <div
        v-if="topRankList[1]"
        class="secondLucky publicVCenter"
      >
        <div class="num publicHvCenter">
          <div class="text">
            2
          </div>
        </div>
        <div class="headImgBox publicHvCenter">
          <img
            :src="topRankList[1].headimgurl"
            class="headImg"
          />
        </div>
        <div class="name publicHvCenter">
          <div class="text">
            {{ topRankList[1].nickname }}
          </div>
        </div>
        <div class="money">
          <div class="text">
            {{ topRankList[1].money }}元
          </div>
        </div>
      </div>
      <div
        v-if="topRankList[2]"
        class="thirdLucky publicVCenter"
      >
        <div class="num publicHvCenter">
          <div class="text">
            3
          </div>
        </div>
        <div class="headImgBox publicHvCenter">
          <img
            :src="topRankList[2].headimgurl"
            class="headImg"
          />
        </div>
        <div class="name publicHvCenter">
          <div class="text">
            {{ topRankList[2].nickname }}
          </div>
        </div>
        <div class="money">
          <div class="text">
            {{ topRankList[2].money }}元
          </div>
        </div>
      </div>
      <div class="otherWrap">
        <div class="otherLuckyList publicVCenter">
          <div
            v-for="(item, index) in otherRankList"
            :key="index"
            class="item"
          >
            <div class="left publicVCenter">
              <div class="num">
                {{ item.num }}
              </div>
              <div class="headImgBox publicHvCenter">
                <img
                  :src="item.headimgurl"
                  class="headImg"
                />
              </div>
              <div class="name">
                {{ item.nickname }}
              </div>
            </div>
            <div class="right publicVCenter">
              {{ item.money }}元
            </div>
          </div>
        </div>
      </div>
      <!-- 反馈入口 -->
      <!-- <feedbackEntry userId="{{userId}}"></feedbackEntry> -->
    </div>
  </div>
</template>
<script>
import {
  getPoolMoney, getZyzInfo, getZyzRank, zyzRecharge, startZyz, sendPrizeInfo,
} from '@/api/zyz/index';
import { sendBroasCast } from '@/api/chat/index';
import wxApi from '@/utils/wxApi';
import { timeoutTask, generateRandom } from '@/utils/index';

const zhufuList = ['美酒佳肴,不甚荣幸', '醉酒饱德，不胜感激', '小小红包,感谢招待', '感谢招待,祝愿安康'];
// 礼物数组
const giftList = [
  {
    id: 1,
    gift: 'rocket1',
    name: '火箭小号',
    imgUrl: 'https://static.hudongmiao.com/joymewMp/zyz/rocket1.png',
    isChoosed: true,
  },
  {
    id: 2,
    gift: 'rocket2',
    name: '火箭中号',
    imgUrl: 'https://static.hudongmiao.com/joymewMp/zyz/rocket2.png',
    isChoosed: false,
  },
  {
    id: 3,
    gift: 'rocket3',
    name: '大号大号',
    imgUrl: 'https://static.hudongmiao.com/joymewMp/zyz/rocket3.png',
    isChoosed: false,
  },
];

let tmpInterval = null; // 用于倒计时
let tmpInterval2 = null; // 用于轮询
let lock = false; // 锁，用于确保 倒计时方法 一轮只调用一次
let lock2 = false; // 锁，用于确保 执行动画的过程中不可以点按钮
let lock3 = false; // 锁，用于确保 开始game按钮不能连续点击

export default {
  data() {
    return {
      gameStatus: 1, // game状态(控制页面显示)
      giftList,
      luckyMoney: 0,
      wheelRodateDeg: 0,
      isLuckyShow: false,
      luckyAni: '',
      poolMoney: 0, // 奖池金额
      prizeItemList: [],
      prizeItemValList: [],
      countDownNum: 0, // 倒计时
      isEntry: false, // 充值入口
      topRankList: [], // 排行榜列表
      otherRankList: [],
      turnId: '', // 一场game的id 0代表要充值 否则代表这场game的场id
      defaultHeadImg: require('../../assets/image/defaultHeadImg.png'),
    };
  },
  created() {
    lock = false;
    lock2 = false;
    lock3 = false;
    tmpInterval = null;
    tmpInterval2 = null;
    this.prizeItemList = this.$store.state.live.zyzList.split(',');
    this.prizeItemValList = this.$store.state.live.zyzList.replace(/[\u4e00-\u9fa5]/g, '').split(',');
    console.log(this.prizeItemList, this.prizeItemValList);
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
    chooseGift(e) {
      this.giftList.forEach((item) => {
        if (item.id === e.p) {
          item.isChoosed = true;
        } else {
          item.isChoosed = false;
        }
      });
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
    // 获取game相关信息
    requestGameInitInfo() {
      getZyzInfo()
        .then((res) => {
          console.log(res);
          this.turnId = res.id;
          if (res.endTime === '0') {
            this.$toast.center('转一转尚未开始');
          } else {
            const countTime = this.timeHandle(res.endTime);
            this.countDown(countTime);
            this.gameStatus = 2;
            // 轮询获取充值和中奖列表
            if (!tmpInterval2) {
              tmpInterval2 = setInterval(() => {
                console.log('tmpInterval2');
                this.requestTipList();
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
    // 获取排行榜列表
    requestRankList() {
      getZyzRank()
        .then((res) => {
          console.log(res);
          lock = false;
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
          // 不足七个补齐
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
    // 获取充值和中奖列表
    requestTipList() {
      getPoolMoney()
        .then((res) => {
          console.log(res);
          const subTime = this.timeHandle(res.endTime);
          if (subTime <= 0) {
            // game提前结束
            this.requestRankList();
          }
          this.poolMoney = res.balance;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    testRecharge() {
      this.gameAniStart('58');
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
          wish: zhufuList[generateRandom(0, 4)],
        },
      });
      sendBroasCast({
        c,
      });
    },
    recharge() {
      if (!this.isEntry) {
        this.$toast.center('购买入口关闭!');
        return;
      }
      if (lock2) {
        return;
      }
      lock2 = true;
      zyzRecharge()
        .then((res) => {
          console.log(res);
          return wxApi.pay(res);
        })
        .then(() => {
          this.$toast.center('礼物发送成功!');
          this.sendGift(this.getChoosedGift());
          // startGame
          timeoutTask(() => {
            console.log('***2s后自动转一转***');
            this.tapstartZyz();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          this.$toast.center('支付失败!');
          lock2 = false;
        });
    },
    getChoosedGift() {
      return this.giftList.find((item) => {
        return item.isChoosed;
      });
    },
    tapstartZyz() {
      getZyzInfo()
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
    // 根据奖项查找下标
    findIndexByPrizeItem(prizeItem) {
      const tmpLen = this.prizeItemValList.length;
      let tmpIndex = -1;
      for (let i = 0; i < tmpLen; i += 1) {
        if (this.prizeItemValList[i] === prizeItem) {
          tmpIndex = i;
          break;
        }
      }
      return tmpIndex;
    },
    showLucky() {
      this.luckyAni = 'showLuckyAni';
      this.isLuckyShow = true;
      // 4s后消失
      timeoutTask(() => {
        this.luckyAni = 'hideLuckyAni';
        timeoutTask(() => {
          this.isLuckyShow = false;
        }, 100);
      }, 4000);
    },
    gameAniStart(endMoney) {
      const endIndex = this.findIndexByPrizeItem(endMoney);
      // 转盘当前选中项
      let nowIndex = 0;
      // 圈数(周期)
      let circle = 0;
      // 转盘 加速阶段 缓冲阶段(确保<=5)
      // 情况1：前三个周期->最后一个周期小于5   ani1 ani2
      // 情况2:前三个周期->最后一个周期大于5   ani1 + endIndex-4
      const step1 = setInterval(() => {
        if (nowIndex === 9) {
          nowIndex = 0;
          this.wheelRodateDeg = nowIndex * 36;
          circle += 1;
        }
        if (circle === 3) {
          // 三圈后判断是否进入缓冲阶段
          if (endIndex < 4) {
            clearInterval(step1);
            const step2 = setInterval(() => {
              if (nowIndex === endIndex) {
                clearInterval(step2);
                this.wheelRodateDeg = nowIndex * 36;
                timeoutTask(() => {
                  this.showLucky();
                }, 500);
              } else {
                this.wheelRodateDeg = nowIndex * 36;
                if (nowIndex === 9) {
                  nowIndex = 0;
                } else {
                  nowIndex += 1;
                }
              }
            }, 500);
          } else if (nowIndex === endIndex - 4) {
            clearInterval(step1);
            const step2 = setInterval(() => {
              if (nowIndex === endIndex) {
                clearInterval(step2);
                this.wheelRodateDeg = nowIndex * 36;
                timeoutTask(() => {
                  this.showLucky();
                }, 500);
              } else {
                this.wheelRodateDeg = nowIndex * 36;
                if (nowIndex === 9) {
                  nowIndex = 0;
                } else {
                  nowIndex += 1;
                }
              }
            }, 500);
          } else {
            this.wheelRodateDeg = nowIndex * 36;
            nowIndex += 1;
          }
        } else {
          this.wheelRodateDeg = nowIndex * 36;
          nowIndex += 1;
        }
      }, 100);
    },
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
    startGame() {
      startZyz({
        turnId: this.turnId,
      })
        .then((res) => {
          console.log('startZyz result:', res);
          // res.data.desc 奖项；endMoney中奖的金额；totalMoney 奖池金额
          // 奖池金额刷新
          if (res.totalMoney.remainCoin) {
            this.poolMoney = res.totalMoney.remainCoin;
          }
          this.luckyMoney = res.endMoney;
          // game动画开始
          this.gameAniStart(res.endMoney);

          // 4s动画停止后发送广播(必须要中奖的情况)
          if (parseInt(res.endMoney, 10) > 0) {
            timeoutTask(() => {
              this.sendBroad(res.endMoney, res.totalMoney.balance);
            }, 4000);
          }
          timeoutTask(() => {
            lock2 = false;
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          lock2 = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.zyzContainer {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .bgArea {
    width: 100%;
    height: 100%;
    position: absolute;
    .bg {
      width: 105%;
      position: absolute;
      left: -2%;
    }
    .shade {
      width: 100vw;
      height: 100vh;
      opacity: 0.6;
      background-color: #000000;
      position: absolute;
      top: 0;
      left: 0;
    }
    .title {
      position: absolute;
      width: 101%;
      height: 185px;
      top: -10px;
      left: -3px;
    }
  }
  .waitContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .totalMoney {
      position: absolute;
      top: 0px;
      width: 526px;
      height: 70px;
      background: #ac0c00;
      box-shadow: 0px 3px 7px 0px #f6544a, 0px 1px 3px 0px rgba(0, 0, 0, 0.35);
      border-radius: 29px;
      font-size: 44px;
      color: #fcf5cd;
      .coinsImg {
        width: 97px;
        height: 80px;
        position: absolute;
        left: -59px;
      }
    }
    .ruleBox {
      width: 880px;
      height: 740px;
      position: absolute;
      top: 186px;
      overflow: hidden;
      .ruleBoxImg {
        width: 880px;
        top: -65px;
        position: absolute;
        left: 70px;
      }
      .ruleContent {
        font-size: 28px;
        font-weight: 400;
        color: #ffffda;
        position: absolute;
        width: 475px;
        top: 140px;
        .para {
          margin: 20px 0;
        }
      }
    }
    .giftListWrap {
      display: flex;
      justify-content: space-around;
      position: absolute;
      top: 860px;
      .giftItem {
        width: 196px;
        height: 230px;
        position: relative;
        opacity: 0.3;
        .fudai {
          width: 100%;
          height: 100%;
          position: absolute;
          background-image: url('https://static.joymew.com/joymewMp/zyz/fd1.png');
          background-size: 100% 100%;
        }
        .giftImg {
          position: absolute;
          top: 61px;
          &.g1 {
            width: 67px;
            height: 157px;
          }
          &.g2 {
            width: 55px;
            height: 159px;
          }
          &.g3 {
            width: 63px;
            height: 160px;
          }
        }
        &.active {
          opacity: 1;
        }
      }
    }
    .startBtn {
      width: 390px;
      height: 114px;
      background-image: url('https://static.joymew.com/joymewMp/zyz/startBtn.png');
      background-size: 100% 100%;
      position: absolute;
      bottom: 0px;
    }
  }
  .gameContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .totalMoney {
      position: absolute;
      top: 32px;
      width: 526px;
      height: 70px;
      background: #ac0c00;
      box-shadow: 0px 3px 7px 0px #f6544a, 0px 1px 3px 0px rgba(0, 0, 0, 0.35);
      border-radius: 29px;
      font-size: 44px;
      color: #fcf5cd;
      .coinsImg {
        width: 97px;
        height: 80px;
        position: absolute;
        left: -59px;
      }
    }
    .wheelArea {
      width: 681px;
      height: 681px;
      position: absolute;
      top: 121px;
      .wheelBorderImg {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .wheelImg {
        position: absolute;
        width: 612px;
        height: 612px;
      }
      .wheelInnerImg {
        position: absolute;
        width: 611px;
        height: 611px;
      }
      .wheelBtn {
        position: absolute;
        width: 248px;
        height: 248px;
        top: 230px;
      }
      .countdown {
        width: 205px;
        height: 205px;
        position: absolute;
        top: 273px;
        flex-direction: column;
        .time {
          font-size: 72px;
          font-weight: normal;
          color: #dca96f;
          text-shadow: #5f191b 1px 0 0, #5f191b 0 1px 0, #5f191b -1px 0 0, #5f191b 0 -1px 0, #5f191b 2px 0 0, #5f191b 0 2px 0,
            #5f191b -2px 0 0, #5f191b 0 -2px 0;
        }
        .timeKey {
          font-size: 48px;
          color: #dca96f;
          margin-top: -14px;
          text-shadow: #5f191b 1px 0 0, #5f191b 0 1px 0, #5f191b -1px 0 0, #5f191b 0 -1px 0, #5f191b 2px 0 0, #5f191b 0 2px 0,
            #5f191b -2px 0 0, #5f191b 0 -2px 0;
        }
      }
      .prizeWrap {
        position: absolute;
        width: 100%;
        height: 100%;
        .prizeItem {
          position: absolute;
          width: 169px;
          height: 194px;
          .prizeName {
            font-size: 38px;
            font-weight: normal;
            color: #2d0800;
            position: absolute;
            width: 120px;
            text-align: center;
            white-space: nowrap;
          }
          .hbImg {
            width: 90px;
            height: 109px;
            position: absolute;
          }
          &:nth-child(1) {
            left: 237px;
            top: 51px;
            .prizeName {
              left: -34px;
              top: 21px;
              transform: rotate(-20deg);
            }
            .hbImg {
              transform: rotate(-41deg);
              top: 77px;
              left: 10px;
            }
          }
          &:nth-child(2) {
            left: 360px;
            top: 51px;
            .prizeName {
              left: 7px;
              top: 22px;
              transform: rotate(11deg);
            }
            .hbImg {
              top: 80px;
              left: -11px;
              transform: rotate(-8deg);
            }
          }
          &:nth-child(3) {
            left: 437px;
            top: 165px;
            .prizeName {
              left: 59px;
              top: 5px;
              transform: rotate(53deg);
            }
            .hbImg {
              transform: rotate(33deg);
              top: 13px;
              left: 0px;
            }
          }
          &:nth-child(4) {
            left: 535px;
            top: 271px;
            .prizeName {
              left: -53px;
              top: 50px;
              transform: rotate(0deg);
            }
          }
          &:nth-child(5) {
            left: 640px;
            top: 546px;
            .prizeName {
              left: -140px;
              top: -78px;
              transform: rotate(-58deg);
            }
            .hbImg {
              transform: rotate(-81deg);
              top: -152px;
              left: -190px;
            }
          }
          &:nth-child(6) {
            left: 613px;
            top: 653px;
            .prizeName {
              left: -247px;
              top: -81px;
              transform: rotate(-22deg);
            }
            .hbImg {
              transform: rotate(-46deg);
              top: -184px;
              left: -262px;
            }
          }
          &:nth-child(7) {
            left: 405px;
            top: 534px;
            .prizeName {
              left: -209px;
              top: 30px;
              transform: rotate(20deg);
            }
            .hbImg {
              top: -68px;
              left: -168px;
            }
          }
          &:nth-child(8) {
            left: 176px;
            top: 398px;
            .prizeName {
              left: -106px;
              top: 69px;
              transform: rotate(57deg);
            }
            .hbImg {
              top: -5px;
              left: -25px;
              transform: rotate(36deg);
            }
          }
          &:nth-child(9) {
            left: 273px;
            top: 376px;
            .prizeName {
              left: -216px;
              top: -66px;
              transform: rotate(0deg);
            }
          }
          &:nth-child(10) {
            left: 237px;
            top: 238px;
            .prizeName {
              left: -162px;
              top: -70px;
              transform: rotate(-55deg);
            }
            .hbImg {
              top: -51px;
              left: -81px;
              transform: rotate(-76deg);
            }
          }
        }
      }
    }
    .agreement {
      font-size: 24px;
      font-weight: 400;
      color: #fff;
      position: absolute;
      bottom: 132px;
    }
    .giftListWrap {
      display: flex;
      justify-content: space-around;
      position: absolute;
      top: 800px;
      .giftItem {
        width: 196px;
        height: 230px;
        position: relative;
        opacity: 0.3;
        .fudai {
          width: 100%;
          height: 100%;
          position: absolute;
          background-image: url('https://static.joymew.com/joymewMp/zyz/fd1.png');
          background-size: 100% 100%;
        }
        .giftImg {
          position: absolute;
          top: 61px;
          &.g1 {
            width: 67px;
            height: 157px;
          }
          &.g2 {
            width: 55px;
            height: 159px;
          }
          &.g3 {
            width: 63px;
            height: 160px;
          }
        }
        &.active {
          opacity: 1;
        }
      }
    }
    .startBtn {
      width: 390px;
      height: 114px;
      background-image: url('https://static.joymew.com/joymewMp/zyz/startBtn2.png');
      background-size: 100% 100%;
      position: absolute;
      bottom: 0px;
      .text {
        position: absolute;
        top: 19px;
        font-size: 48px;
        font-weight: 400;
        color: #c14532;
        background: linear-gradient(177deg, #fcd58e 0%, #f8a65d 99.31640625%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .luckyWrap {
      width: 548px;
      height: 607px;
      flex-direction: column;
      position: absolute;
      top: 176px;
      left: 85px;
      background-image: url('https://static.joymew.com/joymewMp/zyz/prizeResultBox2.png');
      background-size: 100% 100%;
      .tit {
        font-size: 60px;
        font-weight: 400;
        color: #d5261d;
        -webkit-text-stroke: 1px #d32f10;
        text-stroke: 1px #d32f10;
        position: absolute;
        top: 85px;
      }
      .congragulations {
        font-size: 30px;
        font-weight: 400;
        color: #5e493d;
        position: absolute;
        top: 188px;
        label {
          color: #d5261d;
          font-size: 48px;
        }
      }
      .wechatTip {
        font-size: 24px;
        font-weight: normal;
        color: #8c7e77;
        position: absolute;
        top: 251px;
      }
      .money {
        font-size: 36px;
        font-weight: 400;
        color: #fba140;
        position: absolute;
        bottom: 105px;
      }
      &.showLuckyAni {
        animation: zoomIn 0.1s linear;
      }
      .hideLuckyAni {
        animation: zoomOut 0.1s linear;
      }
    }
  }
  .rankContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .firstLucky {
      flex-direction: column;
      position: absolute;
      width: 221px;
      height: 272px;
      background-image: url('https://static.joymew.com/joymewMp/zyz/moneyBg.png');
      background-size: 100% 100%;
      top: 324px;
      .num {
        width: 120px;
        height: 72px;
        background-image: url('https://static.joymew.com/joymewMp/zyz/nt.png');
        background-size: 100% 100%;
        top: -27px;
        position: absolute;
        .text {
          font-size: 31px;
          font-weight: normal;
          color: #fded9e;
          background: linear-gradient(0deg, #db9f69 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .headImgBox {
        position: absolute;
        top: 38px;
        width: 78px;
        height: 78px;
        background: #e88f5d;
        border-radius: 50%;
        .headImg {
          border-radius: 50%;
          width: 72px;
          height: 72px;
        }
      }
      .name {
        width: 164px;
        height: 43px;
        position: absolute;
        top: 125px;
        background-image: url('https://static.joymew.com/joymewMp/zyz/nameBg.png');
        background-size: 100% 100%;
        background-position-x: 10px;
        .text {
          width: 124px;
          font-size: 24px;
          font-weight: normal;
          color: #fde8e2;
          background: linear-gradient(0deg, #dca96f 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: center;
        }
      }
      .money {
        position: absolute;
        top: 177px;
        .text {
          font-size: 42px;
          color: #fee4de;
          background: linear-gradient(0deg, #db9f69 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .secondLucky {
      flex-direction: column;
      position: absolute;
      width: 221px;
      height: 272px;
      background-image: url('https://static.joymew.com/joymewMp/zyz/moneyBg.png');
      background-size: 100% 100%;
      top: 355px;
      left: 30px;
      .num {
        width: 59px;
        height: 66px;
        background-image: url('https://static.joymew.com/joymewMp/zyz/secondMedal.png');
        background-size: 100% 100%;
        top: -27px;
        position: absolute;
        .text {
          font-size: 31px;
          font-weight: normal;
          color: #fded9e;
          background: linear-gradient(0deg, #db9f69 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .headImgBox {
        position: absolute;
        top: 38px;
        width: 78px;
        height: 78px;
        background: #e88f5d;
        border-radius: 50%;
        .headImg {
          border-radius: 50%;
          width: 72px;
          height: 72px;
        }
      }
      .name {
        width: 164px;
        height: 43px;
        position: absolute;
        top: 125px;
        background-image: url('https://static.joymew.com/joymewMp/zyz/nameBg.png');
        background-size: 100% 100%;
        background-position-x: 10px;
        .text {
          width: 124px;
          font-size: 24px;
          font-weight: normal;
          color: #fde8e2;
          background: linear-gradient(0deg, #dca96f 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: center;
        }
      }
      .money {
        position: absolute;
        top: 177px;
        .text {
          font-size: 42px;
          color: #fee4de;
          background: linear-gradient(0deg, #db9f69 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .thirdLucky {
      flex-direction: column;
      position: absolute;
      width: 221px;
      height: 272px;
      background-image: url('https://static.joymew.com/joymewMp/zyz/moneyBg.png');
      background-size: 100% 100%;
      top: 355px;
      right: 30px;
      .num {
        width: 59px;
        height: 66px;
        background-image: url('https://static.joymew.com/joymewMp/zyz/thirdMedal.png');
        background-size: 100% 100%;
        top: -27px;
        position: absolute;
        .text {
          font-size: 31px;
          font-weight: normal;
          color: #fded9e;
          background: linear-gradient(0deg, #db9f69 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .headImgBox {
        position: absolute;
        top: 38px;
        width: 78px;
        height: 78px;
        background: #e88f5d;
        border-radius: 50%;
        .headImg {
          border-radius: 50%;
          width: 72px;
          height: 72px;
        }
      }
      .name {
        width: 164px;
        height: 43px;
        position: absolute;
        top: 125px;
        background-image: url('https://static.joymew.com/joymewMp/zyz/nameBg.png');
        background-size: 100% 100%;
        background-position-x: 10px;
        .text {
          width: 124px;
          font-size: 24px;
          font-weight: normal;
          color: #fde8e2;
          background: linear-gradient(0deg, #dca96f 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: center;
        }
      }
      .money {
        position: absolute;
        top: 177px;
        .text {
          font-size: 42px;
          color: #fee4de;
          background: linear-gradient(0deg, #db9f69 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
    .otherWrap {
      position: absolute;
      width: 100%;
      height: 600px;
      overflow-y: scroll;
      top: 641px;
      padding-bottom: 40px;
      .otherLuckyList {
        position: absolute;
        width: 100%;
        flex-direction: column;
        .item {
          width: 660px;
          height: 90px;
          background: #e8cdbb;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          padding: 0 40px;
          margin: 6px 0;
          .left {
            .num {
              font-size: 36px;
              font-weight: bold;
              color: #fce67d;
            }
            .headImgBox {
              width: 51px;
              height: 50px;
              border-radius: 12px;
              background-color: #e69269;
              margin-left: 11px;
              .headImg {
                width: 51px;
                height: 50px;
                border-radius: 12px;
              }
            }
            .name {
              width: 180px;
              font-size: 30px;
              font-weight: bold;
              color: #ffffff;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin-left: 16px;
            }
          }
          .right {
            width: 100px;
            font-size: 33px;
            font-weight: bold;
            color: #9d0a20;
          }
        }
      }
    }
  }
  @keyframes zoomIn {
    from {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
      opacity: 0;
    }
  }
}
</style>
