<template>
  <div class="hbWallContainer">
    <div class="bgArea">
      <img
        v-if="gameStatus === 1"
        src="https://static.hudongmiao.com/joymewMp/hbWall/waitBg.png"
        class="waitBg"
      />
      <img
        v-if="gameStatus === 2"
        src="https://static.hudongmiao.com/joymewMp/zyz/zyzBg2.png"
        class="bg"
      />
      <img
        v-if="gameStatus === 3"
        src="https://static.hudongmiao.com/joymewMp/hbWall/rankBg.png"
        class="bg"
      />
      <img
        v-if="gameStatus === 3"
        src="https://static.hudongmiao.com/joymewMp/hbWall/shine.png"
        class="shine"
      />
      <div
        v-if="gameStatus === 2"
        class="shade"
      />
    </div>
    <!-- 等待界面 -->
    <div
      v-if="gameStatus === 1"
      class="waitContainer"
    >
      <div class="ruleBox">
        <div class="title">
          <img
            src="https://static.hudongmiao.com/joymewMp/hbWall/cs.png"
            class="csImg"
          />
          <div class="text">
            活动规则
          </div>
        </div>
        <div class="ruleContent">
          <div class="para">
            1、只需送出弹幕礼物，免费获得一次夺取宝箱的机会；
          </div>
          <div class="para">
            2、送出小火箭：获取一个红包;送出中火箭：获取二个红包;送出大火箭：获取三个红包。
          </div>
          <div class="para">
            3、如果红包被抢完，您支付得金额将原路退回您得账户
          </div>
        </div>
      </div>
      <div
        v-tap="{ methods: enterGame }"
        class="startBtn"
      />
    </div>
    <!-- 红包墙界面 -->
    <div
      v-if="gameStatus === 2"
      class="gameContainer publicVCenter"
    >
      <div class="wall publicHCenter">
        <div class="hbListWrap">
          <div
            v-for="(item, index) in hbs"
            :key="index"
            v-tap="{ methods: chooseHbs, p: item }"
            class="hbItem"
            :class="{ choosed: item.isChoosed, reverse: item.isOpen }"
          >
            <div class="FM publicVCenter">
              <div class="num">
                {{ item.num }}
              </div>
              <img
                v-if="item.isBuyed"
                :src="item.headImg"
                class="headImg"
              />
            </div>
            <div class="ZM publicVCenter">
              <div class="headImgBox publicHvCenter">
                <img
                  v-if="item.isBuyed"
                  :src="item.headImg"
                  class="headImg"
                />
                <img
                  v-if="!item.isBuyed"
                  :src="defaultHeadImg"
                  class="headImg"
                />
              </div>
              <div
                v-if="item.isBuyed"
                class="name"
              >
                {{ item.name }}
              </div>
              <div
                v-if="!item.isBuyed"
                class="name"
              >
                虚位以待
              </div>
              <div class="money">
                ￥{{ item.gold }}
              </div>
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
      <div class="giftListWrap publicHvCenter">
        <div class="giftItem publicHCenter">
          <div class="fudai" />
          <img
            :src="gift_show.imgUrl"
            class="giftImg"
            :class="'g' + gift_show.id"
          />
        </div>
        <div class="money">
          ￥{{ gift_show.price }}
        </div>
      </div>
      <div class="startBtn publicHvCenter">
        <div
          v-tap="{ methods: buy }"
          class="text"
        >
          获取红包
        </div>
      </div>
    </div>
    <!-- 排行榜界面 -->
    <div
      v-if="gameStatus === 3"
      class="rankContainer publicVCenter"
    >
      <div class="rankTitle">
        福运榜
      </div>
      <div
        v-if="rankList1[0]"
        class="first publicVCenter"
      >
        <div class="num">
          第一名
        </div>
        <div class="headImgBox">
          <img
            :src="rankList1[0].avator"
            class="headImg"
          />
          <div class="leftDesc" />
          <div class="rightDesc" />
        </div>
        <div class="name publicHvCenter">
          <div class="text">
            {{ rankList1[0].wx_name }}
          </div>
        </div>
        <div class="money">
          {{ rankList1[0].totalGold }}元
        </div>
      </div>
      <div class="topThree">
        <div
          v-if="rankList1[0]"
          class="ttItem publicVCenter"
        >
          <img
            src="https://static.joymew.com/joymewMp/hbWall/gold.png"
            class="goldImg"
          />
          <div class="headImgBox">
            <img
              :src="rankList1[0].avator"
              class="headImg"
            />
          </div>
          <div class="name">
            {{ rankList1[0].wx_name }}
          </div>
          <div class="money">
            {{ rankList1[0].totalGold }}元
          </div>
        </div>
        <div
          v-if="rankList1[1]"
          class="ttItem"
        >
          <img
            src="https://static.joymew.com/joymewMp/hbWall/silver.png"
            class="silverImg"
          />
          <div class="headImgBox">
            <img
              :src="rankList1[1].avator"
              class="headImg"
            />
          </div>
          <div class="name">
            {{ rankList1[1].wx_name }}
          </div>
          <div class="money">
            {{ rankList1[1].totalGold }}元
          </div>
        </div>
        <div
          v-if="rankList1[2]"
          class="ttItem"
        >
          <img
            src="https://static.joymew.com/joymewMp/hbWall/cron.png"
            class="cronImg"
          />
          <div class="headImgBox">
            <img
              :src="rankList1[2].avator"
              class="headImg"
            />
          </div>
          <div class="name">
            {{ rankList1[2].wx_name }}
          </div>
          <div class="money">
            {{ rankList1[2].totalGold }}元
          </div>
        </div>
      </div>
      <div class="otherLuckyList">
        <div
          v-for="(item, index) in rankList2"
          :key="index"
          class="item publicVCenter"
        >
          <div class="headImgBox">
            <img
              :src="item.avator"
              class="headImg"
            />
            <div class="num">
              {{ index + 4 }}
            </div>
          </div>
          <div class="name">
            <div class="text">
              {{ item.wx_name }}
            </div>
          </div>
          <div class="money">
            {{ item.totalGold }}元
          </div>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="dialogVisible"
      title="温馨提示"
      :message="messageTip"
      show-cancel-button
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>
<script>
import {
  getGameState, getHbList, buyHb, hbqRecharge, getHbRankList,
} from '@/api/kbx/index';
import { timeoutTask, generateRandom } from '@/utils/index';
import wxApi from '@/utils/wxApi';
import { sendBroasCast } from '@/api/chat/index';
import { Dialog } from 'vant';

// 礼物数组
const giftList = [
  {
    id: 1,
    gift: 'rocket1',
    name: '小号火箭',
    imgUrl: 'https://static.hudongmiao.com/joymewMp/zyz/rocket1.png',
  },
  {
    id: 2,
    gift: 'rocket2',
    name: '中号火箭',
    imgUrl: 'https://static.hudongmiao.com/joymewMp/zyz/rocket2.png',
  },
  {
    id: 3,
    gift: 'rocket3',
    name: '大号火箭',
    imgUrl: 'https://static.hudongmiao.com/joymewMp/zyz/rocket3.png',
  },
];
const wishList = ['醉酒饱德，不胜感激', '美酒佳肴,不甚荣幸', '感谢招待,祝愿安康', '小小红包,感谢招待'];
let requestLock = false;
// 限制只有一个轮询存在
let tmpInterval = null; // 刚进入红包墙的轮询
let tmpInterval2 = null; // 点击开始game中的轮询
let baseMoney = 0;

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      defaultHeadImg: require('../../assets/image/defaultHeadImg.png'),
      gameStatus: 1,
      hbs: [],
      gift_show: {
        id: 3,
        gift: 'rocket3',
        name: '大号火箭',
        imgUrl: 'https://static.hudongmiao.com/joymewMp/zyz/rocket3.png',
        price: 0,
      },
      myHbsVisible: false,
      isLuckyShow: false,
      luckyAni: '',
      chooseHbIds: [],
      remain: 3,
      activeGiftIndex: -1,
      luckyHbs: [],
      sort: '',
      rankList1: [],
      rankList2: [],
      dialogVisible: false,
      messageTip: '',
    };
  },
  created() {
    requestLock = false;
    tmpInterval = null;
    tmpInterval2 = null;
    baseMoney = 0;
    getGameState()
      .then((res) => {
        console.log(res);
        if (res.success) {
          if (res.data.status === '1') {
            if (this.hbs.length === 0) {
              this.getHbs();
            }
            clearInterval(tmpInterval2);
            tmpInterval2 = null;
            if (!tmpInterval) {
              // 轮询更新红包列表
              tmpInterval = setInterval(() => {
                this.updateHbs(true);
              }, 4000);
            }
          } else if (res.data.status === '2') {
            this.$toast.center('本轮红包墙已经结束!');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  beforeDestroy() {
    // 清除定时器
    clearInterval(tmpInterval);
    clearInterval(tmpInterval2);
    tmpInterval = null;
    tmpInterval2 = null;
  },
  methods: {
    getHbs() {
      getHbList(false).then((res) => {
        if (res.success) {
          console.log('***红包列表***');
          console.log(res);
          this.hbs.splice(0);
          const tmpLen = res.data.list.length;
          let tmpNum = -1;
          let tmpState;
          let tmpIsOpen;
          let tmpIsBuyed;
          let tmpCanBuy;
          let tmpUserId;
          let tmpName;
          let tmpHeadImg;
          for (let i = 0; i < tmpLen; i += 1) {
            if (i < 3) {
              // +1
              tmpNum = i + 1;
            } else if (i < 12) {
              // +2
              tmpNum = i + 2;
            } else if (i < 21) {
              // +3
              tmpNum = i + 3;
            } else {
              // +4
              tmpNum = i + 4;
            }
            tmpIsOpen = false;
            tmpIsBuyed = false;
            tmpCanBuy = false;
            tmpState = res.data.list[i].userId;
            tmpUserId = '';
            tmpName = '';
            tmpHeadImg = '';
            if (tmpState === '0') {
              if (res.data.list[i].userInfo) {
                // 未打开已购买
                tmpIsBuyed = true;
                tmpUserId = res.data.list[i].userInfo.USER_ID;
                tmpName = res.data.list[i].userInfo.wx_name;
                tmpHeadImg = res.data.list[i].userInfo.avator;
              } else {
                // 未打开未购买
                tmpCanBuy = true;
              }
            } else if (tmpState === '100') {
              // 红包已经在大屏被拆开
              tmpIsOpen = true;
              // 且被人购买
              if (res.data.list[i].userInfo) {
                tmpIsBuyed = true;
                tmpUserId = res.data.list[i].userInfo.USER_ID;
                tmpName = res.data.list[i].userInfo.wx_name;
                tmpHeadImg = res.data.list[i].userInfo.avator;
              }
            } else {
              // 红包已经被别人购买
              tmpIsBuyed = true;
              tmpUserId = res.data.list[i].userInfo.USER_ID;
              tmpName = res.data.list[i].userInfo.wx_name;
              tmpHeadImg = res.data.list[i].userInfo.avator;
            }
            this.hbs.push({
              id: res.data.list[i].eggId,
              gold: res.data.list[i].money,
              isOpen: tmpIsOpen,
              isBuyed: tmpIsBuyed,
              canBuy: tmpCanBuy,
              isChoosed: false,
              userId: tmpUserId,
              name: tmpName,
              headImg: tmpHeadImg,
              num: tmpNum,
            });
          }
          baseMoney = parseFloat(res.data.hbqMoney);
          this.gameStatus = 2;
          this.sort = res.data.sort;
          this.updateGift();
        } else {
          this.$toast.center('获取红包信息失败!');
        }
      });
    },
    getChoosedHbsNum(isIncludeBuyed) {
      const tmpLen = this.hbs.length;
      let tmpCount = 0;
      if (isIncludeBuyed) {
        for (let i = 0; i < tmpLen; i += 1) {
          if (this.hbs[i].isChoosed || this.hbs[i].userId === this.$store.state.user.userId) {
            tmpCount += 1;
          }
        }
      } else {
        for (let i = 0; i < tmpLen; i += 1) {
          if (this.hbs[i].isChoosed) {
            tmpCount += 1;
          }
        }
      }
      return tmpCount;
    },
    hbsMapGift(choosedNum) {
      const tmpMoney = baseMoney;
      giftList[0].price = tmpMoney.toFixed(2);
      giftList[1].price = (tmpMoney * 2).toFixed(2);
      giftList[2].price = (tmpMoney * 3).toFixed(2);
      if (choosedNum === 3) {
        // 选了3个红包<--->大火箭
        this.gift_show.id = giftList[2].id;
        this.gift_show.gift = giftList[2].gift;
        this.gift_show.name = giftList[2].name;
        this.gift_show.imgUrl = giftList[2].imgUrl;
        this.gift_show.price = giftList[2].price;
      } else if (choosedNum === 2) {
        // 选了2个红包<--->中火箭
        this.gift_show.id = giftList[1].id;
        this.gift_show.gift = giftList[1].gift;
        this.gift_show.name = giftList[1].name;
        this.gift_show.imgUrl = giftList[1].imgUrl;
        this.gift_show.price = giftList[1].price;
      } else {
        // 选了1个红包或者还没有选红包<--->小火箭
        this.gift_show.id = giftList[0].id;
        this.gift_show.gift = giftList[0].gift;
        this.gift_show.name = giftList[0].name;
        this.gift_show.imgUrl = giftList[0].imgUrl;
        this.gift_show.price = giftList[0].price;
      }
    },
    updateGift() {
      const hasChoosedNum = this.getChoosedHbsNum(false);
      this.hbsMapGift(hasChoosedNum);
    },
    // 更新红包列表
    updateHbs() {
      return new Promise((resolve, reject) => {
        getHbList()
          .then((res) => {
            if (res.success && res.data) {
              console.log(res);
              if (res.data.finished === '1') {
                clearInterval(tmpInterval2);
                clearInterval(tmpInterval);
                tmpInterval2 = null;
                tmpInterval = null;
                this.handleGameEnd();
                resolve();
                return;
              }
              const tmpLen = res.data.list.length;
              let tmpState;
              let tmpIsOpen;
              let tmpIsBuyed;
              let tmpCanBuy;
              let tmpUserId;
              let tmpName;
              let tmpHeadImg;
              for (let i = 0; i < tmpLen; i += 1) {
                tmpIsOpen = false;
                tmpIsBuyed = false;
                tmpCanBuy = false;
                tmpState = res.data.list[i].userId;
                tmpUserId = '';
                tmpName = '';
                tmpHeadImg = '';
                if (tmpState === '0') {
                  if (res.data.list[i].userInfo) {
                    // 未打开已购买
                    tmpIsBuyed = true;
                    tmpUserId = res.data.list[i].userInfo.USER_ID;
                    tmpName = res.data.list[i].userInfo.wx_name;
                    tmpHeadImg = res.data.list[i].userInfo.avator;
                  } else {
                    // 未打开未购买
                    tmpCanBuy = true;
                  }
                } else if (tmpState === '100') {
                  tmpIsOpen = true;
                  if (res.data.list[i].userInfo) {
                    // 打开已购买
                    tmpIsBuyed = true;
                    tmpUserId = res.data.list[i].userInfo.USER_ID;
                    tmpName = res.data.list[i].userInfo.wx_name;
                    tmpHeadImg = res.data.list[i].userInfo.avator;
                  } else {
                    // 打开未购买
                    // 空操作
                  }
                }
                if (this.hbs[i]) {
                  this.hbs[i].isOpen = tmpIsOpen;
                  this.hbs[i].isBuyed = tmpIsBuyed;
                  this.hbs[i].canBuy = tmpCanBuy;
                  if (!tmpCanBuy && this.hbs[i].isChoosed) {
                    // 选中的红包已经不可以购买了
                    this.hbs[i].isChoosed = false;
                    this.updateGift();
                  }
                  this.hbs[i].userId = tmpUserId;
                  this.hbs[i].name = tmpName;
                  this.hbs[i].headImg = tmpHeadImg;
                }
              }
              this.sort = res.data.sort;
              resolve();
            } else {
              reject();
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    enterGame() {
      getGameState()
        .then((res) => {
          console.log(res);
          if (res.success) {
            if (res.data.status === '0') {
              this.$toast.center('请等待大屏开启红包墙!');
            } else if (res.data.status === '1') {
              this.getHbs();
              clearInterval(tmpInterval);
              tmpInterval = null;
              if (!tmpInterval2) {
                // 轮询更新红包列表
                tmpInterval2 = setInterval(() => {
                  this.updateHbs(true);
                }, 4000);
              }
            } else if (res.data.status === '2') {
              this.$toast.center('本轮开红包已经结束!');
            } else {
              this.$toast.center('请等待大屏开启红包墙!');
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toAgreement() {
      window.location.href = '/agreement/index.html';
    },
    findHbIndexByHbId(hbId) {
      let tmpIndex = -1;
      const tmpLen = this.hbs.length;
      for (let i = 0; i < tmpLen; i += 1) {
        if (this.hbs[i].id === hbId) {
          tmpIndex = i;
          break;
        }
      }
      return tmpIndex;
    },
    chooseHbs(e) {
      console.log(e.p.id);
      const index = this.findHbIndexByHbId(e.p.id);
      if (this.hbs[index].isOpen) {
        this.$toast.center('这个红包已经被拆开啦！');
        return;
      }
      if (this.hbs[index].isBuyed) {
        this.$toast.center('这个红包已经被抢走啦！');
        return;
      }
      if (this.hbs[index].canBuy) {
        // 如果选中 取消选中
        if (this.hbs[index].isChoosed) {
          this.hbs[index].isChoosed = false;
          this.updateGift();
          return;
        }
        // 最多3个红包 包括已经购买的
        const hasChoosedNum = this.getChoosedHbsNum(true);
        if (hasChoosedNum >= 3) {
          this.$toast.center('最多只能选择三个红包哦!');
          return;
        }
        if (!this.hbs[index].isChoosed) {
          this.hbs[index].isChoosed = true;
          this.updateGift();
        }
      }
    },
    getChoosedHbIds() {
      const len = this.hbs.length;
      const tmpChoosedHbIds = [];
      for (let i = 0; i < len; i += 1) {
        if (this.hbs[i].isChoosed) {
          tmpChoosedHbIds.push(this.hbs[i].id);
        }
      }
      return tmpChoosedHbIds;
    },
    robHb(pHbIdStr, pSort) {
      return new Promise((resolve, reject) => {
        this.$toast.center('奋力争抢中...');
        buyHb({
          hbIds: pHbIdStr,
          sort: pSort,
        })
          .then((res) => {
            console.log(res);
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
            this.$toast.center('抢购失败');
          });
      });
    },
    buy() {
      if (this.$store.state.user.isForbidBuyHbq) {
        this.$toast.center('您没有权限买红包!');
        return;
      }
      let choosed;
      this.updateHbs()
        .then(() => {
          choosed = this.getChoosedHbIds();
          if (choosed.length === 0) {
            this.$toast.center('请选择一个红包!');
            return null;
          }
          if (requestLock) {
            return null;
          }
          requestLock = true;
          const chooseIdsStr = choosed.join(',');
          return this.robHb(chooseIdsStr, this.sort);
        })
        .then((res) => {
          if (!res) {
            return null;
          }
          if (res.code === '200') {
            // 喵钻足正常抢红包
            if (res.resultList.length === 0) {
              this.messageTip = '很遗憾您选择的红包都被抢走了\r\n未抢到的红包，已退回至您的账户中';
              this.dialogVisible = true;
            } else {
              if (choosed.length > res.resultList.length) {
                this.messageTip = `恭喜您,成功抢到了${res.resultList.length}个红包！ \r\n 未抢到的红包，已退回至您的账户中`;
                this.dialogVisible = true;
              } else {
                this.messageTip = `恭喜您,成功抢到了${res.resultList.length}个红包!`;
                this.dialogVisible = true;
              }
              let tmpCode = '';
              if (this.gift_show.id === 1) {
                tmpCode = 5002;
              } else if (this.gift_show.id === 2) {
                tmpCode = 6002;
              } else if (this.gift_show.id === 3) {
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
              // 发送广播
              sendBroasCast({
                c,
              });
            }
            requestLock = false;
          } else if (res.code === '304') {
            // 喵钻不足
            if (res.NeedMoney) {
              return this.recharge(res.NeedMoney);
            }
            this.$toast.center('购买失败!');
          } else if (res.code === '303') {
            this.$toast.center('用户信息异常!');
            requestLock = false;
          } else if (res.code === '302') {
            this.$toast.center('一个人最多抢到3个红包!');
            requestLock = false;
          } else if (res.code === '301') {
            this.$toast.center('不是最新的轮次!');
            requestLock = false;
          } else {
            this.$toast.center('购买失败!');
            requestLock = false;
          }
          return null;
        })
        .catch((err) => {
          console.log(err);
          requestLock = false;
        });
    },
    recharge(money) {
      return new Promise((resolve, reject) => {
        hbqRecharge({
          money,
        })
          .then((res) => {
            console.log(res);
            if (res.status === 'success') {
              wxApi
                .pay(res)
                .then((res2) => {
                  console.log(res2);
                  resolve(res2);
                  this.$toast.center('充值成功!');
                  requestLock = false;
                  // 充值完成 等待后台加喵钻逻辑完成后 去买红包
                  timeoutTask(() => {
                    this.buy();
                  }, 500);
                })
                .catch((err) => {
                  console.log(err);
                  this.$toast.center('充值失败!');
                  requestLock = false;
                  reject(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    handleGameEnd() {
      getHbRankList()
        .then((res) => {
          console.log(res);
          const tmpResultList = res.data.list;
          this.gameStatus = 3;
          this.rankList1 = tmpResultList.slice(0, 3);
          this.rankList2 = tmpResultList.slice(3, 10);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleConfirm() {
      this.updateHbs();
    },
    handleCancel() {},
  },
};
</script>
<style lang="less" scoped>
.hbWallContainer::v-deep {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .bgArea {
    position: absolute;
    width: 100%;
    height: 100%;
    .waitBg {
      position: absolute;
      width: 100%;
    }
    .bg {
      position: absolute;
      width: 105%;
      height: 100%;
      position: absolute;
      left: -2%;
    }
    .shine {
      width: 595px;
      height: 691px;
      position: absolute;
      left: 78px;
      z-index: 1;
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
  }
  .waitContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    .ruleBox {
      width: 389px;
      height: 689px;
      position: absolute;
      top: 307px;
      left: 320px;
      .title {
        width: 258px;
        height: 64px;
        background: #c41321;
        border-radius: 32px;
        position: absolute;
        left: 20px;
        top: -36px;
        display: flex;
        align-items: center;
        padding-left: 98px;
        .csImg {
          width: 123px;
          height: 103px;
          position: absolute;
          left: -27px;
          top: -39px;
        }
        .text {
          font-size: 30px;
          font-weight: normal;
          color: #7a0a0e;
          text-shadow: 0px 5px 5px rgba(132, 0, 15, 0.75);
          background: linear-gradient(0deg, #efd178 0%, #fbf9b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .ruleContent {
        position: absolute;
        width: 100%;
        top: 65px;
        .para {
          font-size: 28px;
          font-weight: 400;
          color: #ffffda;
          width: 100%;
          margin: 20px 0;
          line-height: 44px;
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
      left: 322px;
    }
  }
  .gameContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .wall {
      position: absolute;
      width: 100%;
      height: 785px;
      top: 0px;
      background-image: url('https://static.joymew.com/joymewMp/hbWall/wall.png');
      background-size: 100% 100%;
      .hbListWrap {
        width: 660px;
        height: 650px;
        position: absolute;
        top: 100px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .hbItem {
          position: relative;
          width: 90px;
          height: 131px;
          cursor: pointer;
          .FM {
            position: absolute;
            width: 100%;
            height: 100%;
            transition: transform 0.8s ease-in-out;
            backface-visibility: hidden;
            transform: rotateY(0deg);
            flex-direction: column;
            background-image: url('https://static.hudongmiao.com/joymewMp/hbWall/hbF.png');
            background-size: 100% 100%;
            .num {
              font-size: 28px;
              font-weight: bold;
              color: #edd890;
              position: absolute;
              right: 12px;
              top: 6px;
            }
            .headImg {
              left: 0;
              width: 58px;
              height: 58px;
              border-radius: 50%;
              position: absolute;
              top: 25px;
            }
          }
          .ZM {
            position: absolute;
            width: 100%;
            height: 100%;
            transition: transform 0.8s ease-in-out;
            backface-visibility: hidden;
            transform: rotateY(-180deg);
            flex-direction: column;
            background-image: url('https://static.hudongmiao.com/joymewMp/hbWall/hbZ.png');
            background-size: 100% 100%;
          }
          &.choosed {
            transform: translateY(-40px) scale(1.1);
            z-index: 1;
          }
          &.reverse {
            .FM {
              transform: rotateY(180deg);
            }
            .ZM {
              transform: rotateY(0deg);
              .name {
                font-size: 18px;
                font-weight: bold;
                color: #870f18;
                margin-top: 5px;
              }
              .money {
                font-size: 18px;
                font-weight: bold;
                color: #870f18;
                margin-top: 5px;
              }
              .headImgBox {
                width: 61px;
                height: 61px;
                background: #650c15;
                border-radius: 50%;
                .headImg {
                  width: 58px;
                  height: 58px;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
    .agreement {
      font-size: 24px;
      font-weight: 400;
      color: #ffffff;
      position: absolute;
      bottom: 150px;
    }
    .giftListWrap {
      position: absolute;
      top: 826px;
      .giftItem {
        width: 135px;
        height: 158px;
        position: relative;
        opacity: 1;
        .fudai {
          width: 100%;
          height: 100%;
          position: absolute;
          background-image: url('https://static.joymew.com/joymewMp/zyz/fd1.png');
          background-size: 100% 100%;
        }
        .giftImg {
          position: absolute;
          top: 41px;
          &.g1 {
            width: 45px;
            height: 108px;
          }
          &.g2 {
            width: 38px;
            height: 109px;
          }
          &.g3 {
            width: 43px;
            height: 110px;
          }
        }
      }
      .money {
        font-size: 48px;
        font-weight: bold;
        color: #edd890;
        position: relative;
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
  }
  .rankContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .rankTitle {
      font-size: 62px;
      font-weight: normal;
      color: #7a0a0e;
      text-shadow: 0px 5px 5px rgba(132, 0, 15, 0.75);
      background: linear-gradient(0deg, #efd178 0%, #fbf9b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: absolute;
      top: 199px;
      letter-spacing: 16px;
    }
    .first {
      width: 349px;
      height: 409px;
      position: absolute;
      top: 190px;
      background-image: url('https://static.joymew.com/joymewMp/hbWall/firstBg.png');
      background-size: 100% 100%;
      flex-direction: column;
      .num {
        font-size: 28px;
        font-weight: 400;
        color: #fc2c3d;
        text-shadow: 3px 5px 9px #e13120;
        background: linear-gradient(0deg, #fffbc6 0%, #ffffff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: absolute;
        top: 54px;
      }
      .headImgBox {
        position: absolute;
        width: 108px;
        height: 108px;
        background: #fff0ce;
        border: 4px solid;
        border-image: linear-gradient(3deg, #d16f39, #fff1ae, #d16f39) 4 4;
        transform: rotate(45deg);
        top: 123px;
        .headImg {
          width: 106px;
          height: 103px;
          position: absolute;
          top: -2px;
          left: -1px;
        }
        .leftDesc {
          position: absolute;
          width: 36px;
          height: 36px;
          background: rgba(255, 240, 206, 0);
          border: 4px solid;
          border-image: linear-gradient(3deg, #d16f39, #fff1ae, #d16f39) 4 4;
          left: -17px;
          top: 86px;
        }
        .rightDesc {
          position: absolute;
          width: 36px;
          height: 36px;
          background: rgba(255, 240, 206, 0);
          border: 4px solid;
          border-image: linear-gradient(3deg, #d16f39, #fff1ae, #d16f39) 4 4;
          right: -19px;
          top: -21px;
        }
      }
      .name {
        position: absolute;
        top: 248px;
        width: 212px;
        height: 88px;
        font-size: 30px;
        font-weight: 400;
        background-image: url('https://static.joymew.com/joymewMp/hbWall/nameBox.png');
        background-size: 100% 100%;
        color: #ffc683;
        text-shadow: #b53b48 1px 0 0, #b53b48 0 1px 0, #b53b48 -1px 0 0, #b53b48 0 -1px 0, #b53b48 2px 0 0, #b53b48 0 2px 0,
          #b53b48 -2px 0 0, #b53b48 0 -2px 0, #b53b48 3px 0 0, #b53b48 0 3px 0, #b53b48 -3px 0 0, #b53b48 0 -3px 0;
        .text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .money {
        font-size: 36px;
        font-weight: 400;
        color: #fc2c3d;
        text-shadow: 3px 5px 9px #e13120;
        background: linear-gradient(0deg, #fffbc6 0%, #ffffff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: absolute;
        top: 325px;
      }
    }
    .topThree {
      width: 702px;
      height: 360px;
      position: absolute;
      top: 597px;
      .ttItem {
        position: relative;
        width: 100%;
        height: 130px;
        background-image: url('https://static.joymew.com/joymewMp/hbWall/jx.png');
        background-size: 100% 100%;
        .goldImg {
          width: 86px;
          height: 75px;
          position: absolute;
          left: 59px;
        }
        .silverImg {
          width: 84px;
          height: 76px;
          position: absolute;
          left: 59px;
        }
        .cronImg {
          width: 83px;
          height: 82px;
          position: absolute;
          left: 59px;
        }
        .headImgBox {
          width: 83px;
          height: 83px;
          background: #fff0ce;
          border: 4px solid;
          border-image: linear-gradient(3deg, #d16f39, #fff1ae, #d16f39) 4 4;
          position: absolute;
          left: 173px;
          .headImg {
            width: 79px;
            height: 79px;
          }
        }
        .name {
          font-size: 29px;
          font-weight: 400;
          color: #ffc683;
          text-shadow: #b53b48 1px 0 0, #b53b48 0 1px 0, #b53b48 -1px 0 0, #b53b48 0 -1px 0, #b53b48 2px 0 0, #b53b48 0 2px 0,
            #b53b48 -2px 0 0, #b53b48 0 -2px 0, #b53b48 3px 0 0, #b53b48 0 3px 0, #b53b48 -3px 0 0, #b53b48 0 -3px 0;
          position: absolute;
          left: 301px;
          width: 174px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .money {
          font-size: 29px;
          font-weight: 400;
          color: #fc2c3d;
          text-shadow: 3px 5px 9px #e13120;
          background: linear-gradient(0deg, #fffbc6 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: absolute;
          left: 491px;
          width: 171px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .otherLuckyList {
      position: absolute;
      top: 1002px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      .item {
        width: 93px;
        flex-direction: column;
        position: relative;
        .headImgBox {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          .headImg {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .num {
            width: 34px;
            height: 34px;
            background: #682b1f;
            border-image: linear-gradient(125deg, #b24816, #762e22) 2 2;
            border-radius: 50%;
            font-size: 30px;
            font-weight: normal;
            color: #fded9e;
            position: absolute;
            left: -2px;
            top: -2px;
          }
        }
        .name {
          width: 90px;
          margin-top: 4px;
          .text {
            color: #fee4de;
            font-size: 26px;
            font-weight: normal;
            background: linear-gradient(0deg, #db9f69 0%, #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 90px;
            white-space: nowrap;
            text-align: center;
          }
        }
        .money {
          font-size: 30px;
          font-weight: normal;
          color: #fded9e;
          white-space: nowrap;
        }
      }
    }
  }
  .van-dialog {
    width: 520px;
    font-size: 32px;
    .van-dialog__header {
      line-height: 48px;
    }
    .van-dialog__message {
      line-height: 58px;
      font-size: 32px;
    }
    .van-dialog__cancel,
    .van-dialog__confirm {
      height: 78px;
      font-size: 32px;
    }
  }
}
</style>
