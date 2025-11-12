<template>
  <transition
    enter-active-class="slideInUp faster animated"
    leave-active-class="slideOutDown faster animated"
  >
    <div
      v-show="isShowAni"
      class="giftModule publicVCenter"
      :class="{ zshl: sceneType === '91' }"
    >
      <div
        v-if="giftNavId === 'list666'"
        class="sendGiftReward publicVCenter"
      >
        购买座驾独享入场特效，让你的入场神摇目夺
      </div>
      <div
        v-if="textTipVisible"
        class="notify publicHvCenter"
      >
        <img
          src="@/assets/image/hd2/laba.png"
          class="broadIcon"
        />
        <div
          ref="ct"
          class="notifyCt"
        >
          <div
            ref="ctTxt"
            class="notifyText"
          >
            {{ textTip }}
          </div>
        </div>
      </div>
      <div
        v-if="szfVisible && sceneType === '0'"
        class="happyValSheet publicVCenter"
      >
        <div class="tit publicHvCenter">
          <p>幸福值</p>
          <p>贡献</p>
        </div>
        <div class="sheetList">
          <div
            v-for="(item, index) in happyValList"
            :key="index"
            class="sheetItem publicVCenter"
          >
            <img
              :src="item.avator"
              class="headImg"
            />
            <div
              v-show="item.type"
              class="relatives publicHvCenter"
            >
              {{ item.type }}
            </div>
            <div class="happyVal publicHvCenter">
              {{ item.size }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="happyValSheet publicVCenter"
        v-if="sceneType === '91'"
      >
        <div class="tit publicHvCenter">
          <p>幸福值</p>
          <p>贡献</p>
        </div>
        <div class="sheetList">
          <div
            v-for="(item, index) in happyValList"
            :key="index"
            class="sheetItem publicVCenter"
          >
            <img
              :src="item.avator"
              class="headImg"
            />
            <div
              v-show="item.type"
              class="relatives publicHvCenter"
            >
              {{ item.type }}
            </div>
            <div class="happyVal publicHvCenter">
              {{ item.size }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="giftBox"
        :class="{ diamondHb: giftNavId === 'sendHb' }"
      >
        <div class="nav publicVCenter">
          <div
            v-for="item in giftTitleList"
            :key="item.id"
            v-tap="{ methods: chooseGiftNav, giftNavId: item.id }"
            class="navItem"
            :class="{ active: giftNavId === item.id }"
          >
            {{ item.name }}
          </div>
          <div
            class="priceWrap publicVCenter"
            v-if="env !== 'h5'"
          >
            <img
              src="@/assets/image/hd2/diamondIcon.png"
              class="goldUnit"
            />
            <label class="price">{{ money }}</label>
            <div
              v-tap="{ methods: rechargeMiaoBi }"
              class="rechargeBtn publicHvCenter"
            >
              充值
              <img
                src="@/assets/image/icon/arrowRight.png"
                class="arrowRight"
              />
            </div>
          </div>
        </div>
        <div
          v-show="giftListVisible"
          class="giftListWrap"
        >
          <swipe
            ref="giftSwipe"
            class="gift-swipe"
            :auto="0"
            :show-indicators="false"
            :continuous="false"
            @change="handleSwiperChange"
          >
            <swipe-item
              v-for="(group, index) in giftList"
              :key="index"
              class="page"
            >
              <div
                v-for="gift in group"
                :key="gift.giftconst"
                v-tap="{ methods: chooseGiftType, giftId: gift.giftconst }"
                class="item publicHvCenter"
              >
                <img
                  class="giftImg"
                  :src="gift.imglink"
                  :class="{ active: gift.giftconst === currentGiftType }"
                />
                <div
                  v-show="gift.giftconst !== currentGiftType"
                  class="name"
                >
                  {{ gift.giftname }}
                </div>
                <div
                  v-show="gift.giftprice"
                  class="price publicHvCenter"
                  :class="{ active: gift.giftconst === currentGiftType }"
                >
                  <img
                    src="@/assets/image/icon/diamond.png"
                    class="unit"
                  />
                  {{ gift.giftprice }}
                </div>
                <div
                  v-show="gift.giftconst === currentGiftType && szfVisible"
                  v-tap="{ methods: send }"
                  class="activeBox"
                >
                  <div class="sendBtn publicHvCenter">赠送</div>
                </div>
                <div
                  v-show="gift.giftconst === currentGiftType && !szfVisible"
                  v-tap="{ methods: purchaseEffect }"
                  class="activeBox"
                >
                  <div class="sendBtn publicHvCenter">{{ effectSendBtnText }}</div>
                </div>
              </div>
            </swipe-item>
            <swipe-item
              key="sendHb"
              class="page"
              v-if="sceneType !== '91'"
            >
              <div class="sendDiamondHb">
                <div class="diamondHbList">
                  <div
                    v-for="(item, index) in diamondHbTypeList"
                    :key="index"
                    v-tap="{ methods: chooseDiamondHbType, index: item.index }"
                    class="diamondHbItem"
                    :class="{ active: item.index == activeDiamondHbType }"
                  >
                    <img
                      src="@/assets/image/diamondHb/hbIcon.png"
                      class="hbIcon animated infinite"
                      :class="{ swing: item.index == activeDiamondHbType }"
                    />
                    <div class="hbSpecs publicHvCenter">
                      <div class="diamondNum publicVCenter">
                        <img
                          src="@/assets/image/hd2/diamondIcon.png"
                          class="goldUnit"
                        />
                        {{ item.diamondNum }}
                      </div>
                      <div class="personNum">{{ item.personNum }}人可领</div>
                    </div>
                  </div>
                </div>
                <div class="diamondHbSetGroup">
                  <div
                    v-tap="{ methods: chooseDiamondHbSet, index: '1' }"
                    class="diamondHbSetItem publicVCenter"
                  >
                    <div
                      class="radio publicHvCenter"
                      :class="{ active: activeDiamondHbSet === '1' }"
                    />
                    <div class="name">5分钟后可领</div>
                  </div>
                  <div
                    v-tap="{ methods: chooseDiamondHbSet, index: '0' }"
                    class="diamondHbSetItem publicVCenter"
                  >
                    <div
                      class="radio publicHvCenter"
                      :class="{ active: activeDiamondHbSet === '0' }"
                    />
                    <div class="name">立即领取</div>
                  </div>
                </div>
                <div
                  v-tap="{ methods: sendDiamondHb }"
                  class="sendHbBtn publicHvCenter"
                >
                  发红包
                </div>
              </div>
            </swipe-item>
          </swipe>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { Swipe, SwipeItem } from 'vue-swipe';
import {
  sendGift, getGiftRankList, buyVipEnterEffect, diamondRecharge, sendGiftCarnival,
} from '@/api/index/index';
import { sendGiftMessage, sendBroasCast } from '@/api/chat/index';
import { sendDiamondHb } from '@/api/diamondHb/index';
import { POPUP_MODULE } from '@/assets/constant/index';
import wxApi from '@/utils/wxApi';
import { timeoutTask } from '@/utils/index';

// 喵钻红包类型列表
const DIAMONDHBTYPES = [
  {
    index: 0,
    diamondNum: 10, // 喵钻数量 10
    personNum: 8, // 可领取的人数 8
  },
  {
    index: 1,
    diamondNum: 20, // 喵钻数量
    personNum: 15, // 可领取的人数
  },
  {
    index: 2,
    diamondNum: 50, // 喵钻数量
    personNum: 30, // 可领取的人数
  },
];

let endBroadAni = false;
let broadAniLock = false;

export default {
  name: 'GiftPopup',
  computed: {
    ...mapState({
      giftTitleList: (state) => state.live.giftTitleList,
      giftList: (state) => state.live.giftList,
      giftListAll: (state) => state.live.giftListAll,
      currentGiftType: (state) => state.app.currentGiftType,
      money: (state) => state.user.money,
      freeSendGift: (state) => state.user.freeSendGift,
      allFreeSendGift: (state) => state.live.allFreeSendGift,
      giftNavId: (state) => state.live.giftNavId,
      enterEffect: (state) => state.user.enterEffect,
      sceneType: (state) => state.live.sceneType,
      env: (state) => state.app.env,
      isCloseCoin: (state) => state.app.isCloseCoin,
      isGiftToHbkd: (state) => state.app.isGiftToHbkd,
      sendGiftLotterySwitch: (state) => state.live.sendGiftLotterySwitch,
    }),
    szfVisible() {
      return this.giftNavId === 'list1' || this.giftNavId === 'list5' || this.giftNavId === 'list6';
    },
    textTipVisible() {
      // 跑马灯文字提示
      // 礼物进红包的情况是否满足
      const inGiftToHbkd = this.szfVisible && this.isGiftToHbkd && this.sceneType === '0';
      // 发礼物抽奖的情况是否满足
      const inLottery = this.sendGiftLotterySwitch;
      return inGiftToHbkd || inLottery;
    },
    textTip() {
      let resultText = '';
      const textInGiftToHbkd = '本场发送的祝福礼物，全部进入红包口袋，最后将以红包雨的游戏返回给各位来宾。';
      const textInLottery = '赠送38.8元以上祝福礼物，即可获得一次免费抽奖机会';
      // 公共前提
      const isCommon = this.szfVisible && this.sceneType === '0';
      // 礼物进红包的情况是否满足
      const inGiftToHbkd = this.isGiftToHbkd;
      // 发礼物抽奖的情况是否满足
      const inLottery = this.sendGiftLotterySwitch && !this.freeSendGift && !this.allFreeSendGift;
      if (isCommon) {
        if (inGiftToHbkd && inLottery) {
          resultText = textInLottery + textInGiftToHbkd;
        } else if (inGiftToHbkd) {
          resultText = textInGiftToHbkd;
        } else if (inLottery) {
          resultText = textInLottery;
        }
      }
      return resultText;
    },
    /**
     * 进场特效按钮文字
     */
    effectSendBtnText() {
      // 当前经常特效已经买了或者拥有免费发礼物权限的情况下
      // 显示发送按钮；其他情况显示购买按钮
      if (this.enterEffect === this.currentGiftType || this.freeSendGift || this.allFreeSendGift) {
        return '发送';
      }
      return '购买';
    },
  },
  watch: {
    giftNavId(newVal) {
      const targetIndex = this.giftTitleList.findIndex((item) => item.id === newVal);
      this.$refs.giftSwipe.goto(targetIndex);
      if (newVal !== 'sendHb') {
        this.setCurrentGiftType(this.giftList[targetIndex][0].giftconst);
      }
    },
    sceneType: {
      handler(newVal) {
        if (['0', '91'].includes(newVal)) {
          this.initHappyValList();
        }
      },
      immediate: true,
    },
    textTipVisible: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            endBroadAni = false;
            this.broadInnerWidth = this.$refs.ct.offsetWidth * 0.13;
            this.broadContentWidth = this.$refs.ctTxt.offsetWidth * 0.13;
            this.startBroadAni();
          });
        } else {
          endBroadAni = true;
          broadAniLock = false;
        }
      },
      immediate: true,
    },
  },
  components: {
    Swipe,
    SwipeItem,
  },
  data() {
    return {
      isShowAni: false,
      giftListVisible: false,
      priceDisplay: 0,
      happyValList: [],
      diamondHbTypeList: DIAMONDHBTYPES,
      activeDiamondHbType: 0, // 被选中的发喵钻红包类型
      activeDiamondHbSet: '1', // 1表示5分钟后可领;0表示立即可领
    };
  },
  beforeDestroy() {
    endBroadAni = true;
    broadAniLock = false;
  },
  mounted() {
    // 执行弹出动画
    this.showAniStart();
    const targetIndex = this.giftTitleList.findIndex((item) => item.id === this.giftNavId);
    this.$refs.giftSwipe.goto(targetIndex);
    this.priceDisplay = this.getCurrentPriceByGiftId(this.currentGiftType);
    timeoutTask(() => {
      this.giftListVisible = true;
    }, 500);
  },
  methods: {
    ...mapMutations({
      setCurrentGiftType: 'app/setCurrentGiftType',
      setUserInfo: 'user/setUserInfo',
      togglePopup: 'app/togglePopup',
      setOrigin: 'app/setOrigin',
      setGiftNavId: 'live/setGiftNavId',
    }),
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    chooseGiftType(g) {
      this.setCurrentGiftType(g.giftId);
      this.priceDisplay = this.getCurrentPriceByGiftId(g.giftId);
    },
    chooseGiftNav(g) {
      console.log(g);
      this.setGiftNavId(g.giftNavId);
    },
    rechargeMiaoBi() {
      this.togglePopup();
      timeoutTask(() => {
        this.togglePopup(POPUP_MODULE.rechargeModule.key);
      }, 200);
    },
    validateSend() {
      let flag = true;
      const giftPrice = this.getCurrentPriceByGiftId(this.currentGiftType);
      _hmt.push(['_trackEvent', '礼物弹框', '点击', '发送礼物']);
      console.log(giftPrice);
      if (this.freeSendGift) {
        flag = true;
      } else if (this.allFreeSendGift) {
        flag = true;
      } else if (giftPrice > this.money) {
        flag = false;
        if (this.env === 'miniProgram' || this.env === 'tt') {
          if (this.isCloseCoin) {
            this.toRecharge();
          } else {
            this.$toast.center('余额不足,请充值!');
            if (this.giftNavId === 'list6') {
              this.setOrigin('sendGiftCarnival');
            } else {
              this.setOrigin('sendGift');
            }
            this.rechargeMiaoBi();
          }
        } else if (this.env === 'h5') {
          diamondRecharge({
            total: giftPrice,
          })
            .then((res) => {
              console.log(res);
              return wxApi.pay(res);
            })
            .then(() => {
              // 前端处理用户余额增加
              const tmpRemainMoney = (parseFloat(this.money) + parseFloat(giftPrice)).toFixed(2);
              this.setUserInfo({
                money: tmpRemainMoney,
              });
              this.send();
            })
            .catch((err) => {
              console.log(err);
              this.$toast.center('充值失败!');
            });
        }
      }
      return flag;
    },
    getCurrentPriceByGiftId(giftId) {
      const targetGift = this.giftListAll.find((item) => item.giftconst === giftId);
      return targetGift.giftprice;
    },
    sendBroadcast() {
      const tempMiaoColor = this.freeSendGift || this.allFreeSendGift ? 'freeGift' : '';
      const sendType = this.freeSendGift || this.allFreeSendGift ? '1' : '';
      sendGiftMessage({
        miaoColor: tempMiaoColor,
        sendType,
      });
    },
    sendCarnival() {
      this.$loading('发送中...');
      sendGiftCarnival()
        .then((res1) => {
          this.$loading.close();
          // 更新 用户余额
          this.setUserInfo({
            money: res1.balance.balance,
          });
          this.$toast.center('发送成功!');
          this.togglePopup();
          return this.sendBroadcast(); // 发送礼物的广播
        })
        .catch((err) => {
          console.log(err);
        });
    },
    send() {
      localStorage.removeItem('tmpGiftId');
      if (!this.validateSend()) {
        return;
      }
      if (this.freeSendGift || this.allFreeSendGift) {
        this.sendFreeGiftLogic();
        return;
      }
      if (this.giftNavId === 'list6') {
        this.sendCarnival();
        return;
      }
      this.$loading('发送中...');
      sendGift()
        .then((res1) => {
          this.$loading.close();
          // 更新 用户余额
          this.setUserInfo({
            money: res1.result.balance,
          });
          this.$toast.center('发送成功!');
          this.togglePopup();
          return this.sendBroadcast(); // 发送礼物的广播
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendFreeGiftLogic() {
      this.sendBroadcast();
      this.$toast.center('发送成功!');
      this.togglePopup();
    },
    toRecharge() {
      console.log('***跳转地址***');
      _hmt.push(['_trackEvent', '礼物弹框', '点击', '点击充值按钮']);
      if (this.env === 'miniProgram') {
        if (this.giftNavId === 'list6') {
          this.setOrigin('sendGiftCarnival');
        } else {
          this.setOrigin('sendGift');
        }

        if (this.isCloseCoin) {
          localStorage.setItem('tmpGiftId', this.currentGiftType);
        }
        console.log(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.priceDisplay}&giftId=${this.currentGiftType}&origin=${this.$store.state.app.origin}`,
        );
        wxApi.navigateTo(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.priceDisplay}&giftId=${this.currentGiftType}&origin=${this.$store.state.app.origin}`,
        );
      } else if (this.env === 'h5') {
        diamondRecharge({
          total: this.priceDisplay,
        })
          .then((res) => {
            console.log(res);
            return wxApi.pay(res);
          })
          .then(() => {
            // 前端处理用户余额增加
            const tmpRemainMoney = (parseFloat(this.money) + parseFloat(this.priceDisplay)).toFixed(2);
            this.setUserInfo({
              money: tmpRemainMoney,
            });
            this.send();
          })
          .catch((err) => {
            console.log(err);
            this.$toast.center('充值失败!');
          });
      } else if (this.env === 'tt') {
        this.setOrigin('sendGift');
        console.log(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.priceDisplay}&giftId=${this.currentGiftType}&origin=${this.$store.state.app.origin}`,
        );
        wxApi.navigateToTt(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.priceDisplay}&giftId=${this.currentGiftType}&origin=${this.$store.state.app.origin}`,
        );
      }
    },
    sendEffectBroad() {
      let tmpCode = '';
      if (this.enterEffect === 'goat') {
        tmpCode = '0093';
      } else if (this.enterEffect === 'bird') {
        tmpCode = '0094';
      } else if (this.enterEffect === 'dragon') {
        tmpCode = '0095';
      } else if (this.enterEffect === 'phoenix') {
        tmpCode = '0096';
      }
      this.$createEnterEffect({
        name: this.$store.state.user.name,
        headImg: this.$store.state.user.headImg,
        enterEffectType: this.enterEffect,
      });
      const c = JSON.stringify({
        code: tmpCode,
        param: {
          headImg: this.$store.state.user.headImg,
          nickname: this.$store.state.user.name,
        },
      });
      this.$loading('发送中...');
      sendBroasCast({
        c,
      })
        .then((res) => {
          console.log(res);
          this.$loading.close();
          this.$toast.center('发送成功!');
          this.togglePopup();
        })
        .catch((err) => {
          console.log(err);
          this.$loading.close();
        });
    },
    purchaseEffect() {
      localStorage.removeItem('tmpGiftId');
      _hmt.push(['_trackEvent', '礼物弹框', '点击', '购买特效']);
      console.log(this.currentGiftType, this.priceDisplay);
      // 当前特效已经买了或者拥有免费发礼物的权限的情况下
      // 直接发送特效广播
      if (this.enterEffect === this.currentGiftType || this.freeSendGift || this.allFreeSendGift) {
        this.sendEffectBroad();
        return;
      }
      buyVipEnterEffect(this.currentGiftType)
        .then((res) => {
          console.log(res);
          if (res.code === '200') {
            this.$toast.center('进场特效购买成功!');
            window.location.reload();
          } else if (res.code === '100') {
            // 喵钻不足 跳转支付
            console.log('***跳转地址***');
            localStorage.setItem('tmpGiftId', this.currentGiftType);
            if (this.env === 'miniProgram') {
              this.setOrigin('purchaseEnterEffect');
              console.log(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.priceDisplay}&origin=${this.$store.state.app.origin}`,
              );
              wxApi.navigateTo(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.priceDisplay}&origin=${this.$store.state.app.origin}`,
              );
            } else if (this.env === 'h5') {
              diamondRecharge({
                total: this.priceDisplay,
              })
                .then((res) => {
                  console.log(res);
                  return wxApi.pay(res);
                })
                .then(() => {
                  // 前端处理用户余额增加
                  const tmpRemainMoney = (parseFloat(this.money) + parseFloat(this.priceDisplay)).toFixed(2);
                  this.setUserInfo({
                    money: tmpRemainMoney,
                  });
                  this.updatePurchaseEffect();
                })
                .catch((err) => {
                  console.log(err);
                  this.$toast.center('充值失败!');
                });
            } else if (this.env === 'tt') {
              this.setOrigin('purchaseEnterEffect');
              console.log(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.priceDisplay}&origin=${this.$store.state.app.origin}`,
              );
              wxApi.navigateToTt(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.priceDisplay}&origin=${this.$store.state.app.origin}`,
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updatePurchaseEffect() {
      const tmpGiftId = localStorage.getItem('tmpGiftId');
      // 购买进场特效
      buyVipEnterEffect(tmpGiftId)
        .then((res) => {
          console.log(res);
          localStorage.removeItem('tmpGiftId');
          if (res.code === '200') {
            this.$toast.center('进场特效购买成功!');
            timeoutTask(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openPopupModule(e) {
      this.togglePopup();
      timeoutTask(() => {
        this.togglePopup(e.key);
      }, 200);
    },
    initHappyValList() {
      const getTypeLabel = (type) => {
        if (!type) {
          return '';
        }
        return type.startsWith('1') ? '男方' : '女方';
      };
      getGiftRankList()
        .then((res) => {
          console.log('giftRankList', res);
          if (res.list.length > 0) {
            const tmpList = res.list.length > 5 ? res.list.slice(0, 5) : res.list;
            this.happyValList = tmpList.map((item) => {
              return {
                ...item,
                type: getTypeLabel(item.type),
              };
            });
          } else {
            for (let i = 0; i < 5; i += 1) {
              this.happyValList.push({
                avator: require('../../assets/image/defaultHeadImg.png'),
                size: 0,
                type: '',
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chooseDiamondHbSet(e) {
      this.activeDiamondHbSet = e.index;
    },
    chooseDiamondHbType(e) {
      this.activeDiamondHbType = e.index;
    },
    sendDiamondHb() {
      localStorage.removeItem('tmpSendDiamondHbData');
      const { diamondNum } = this.diamondHbTypeList[this.activeDiamondHbType];
      const { personNum } = this.diamondHbTypeList[this.activeDiamondHbType];
      if (diamondNum > this.money) {
        localStorage.setItem(
          'tmpSendDiamondHbData',
          JSON.stringify({
            total: diamondNum,
            size: personNum,
            type: this.activeDiamondHbSet,
          }),
        );
        if (this.env === 'miniProgram') {
          this.$toast.center('余额不足,请充值!');
          this.setOrigin('sendDiamondHb');
          wxApi.navigateTo(
            `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${diamondNum}&origin=${this.$store.state.app.origin}`,
          );
        } else if (this.env === 'h5') {
          diamondRecharge({
            total: diamondNum,
          })
            .then((res) => {
              console.log(res);
              return wxApi.pay(res);
            })
            .then(() => {
              // 前端处理用户余额增加
              const tmpRemainMoney = (parseFloat(this.money) + parseFloat(diamondNum)).toFixed(2);
              this.setUserInfo({
                money: tmpRemainMoney,
              });
              this.updateSendDiamondHb();
            })
            .catch((err) => {
              console.log(err);
              this.$toast.center('充值失败!');
            });
        } else if (this.env === 'tt') {
          this.$toast.center('余额不足,请充值!');
          this.setOrigin('sendDiamondHb');
          wxApi.navigateToTt(
            `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${diamondNum}&origin=${this.$store.state.app.origin}`,
          );
        }
        return;
      }
      this.$loading('发送中...');
      sendDiamondHb({
        total: diamondNum,
        size: personNum,
        type: this.activeDiamondHbSet,
      })
        .then((res) => {
          console.log(res);
          // 更新 用户余额
          this.setUserInfo({
            money: res.user.balance,
          });
          this.$loading.close();
          this.$toast.center('发送成功!');
          this.togglePopup();
        })
        .catch((err) => {
          console.log(err);
          this.$loading.close();
        });
    },
    updateSendDiamondHb() {
      const tmpSendDiamondHbData = JSON.parse(localStorage.getItem('tmpSendDiamondHbData'));
      sendDiamondHb(tmpSendDiamondHbData)
        .then((res) => {
          console.log(res);
          localStorage.removeItem('tmpSendDiamondHbData');
          // 更新 用户余额
          this.setUserInfo({
            money: res.user.balance,
          });
          this.$toast.center('发送成功!');
          this.togglePopup();
          this.$store.dispatch('live/getDiamondHbList');
        })
        .catch((err) => {
          console.log(err);
          this.$toast.center('发送失败!');
        });
    },
    startBroadAni() {
      if (endBroadAni) {
        return;
      }
      if (broadAniLock) {
        return;
      }
      broadAniLock = true;
      const tmpDistance = this.broadInnerWidth + this.broadContentWidth;
      const tmpDuration = parseInt(tmpDistance / 8, 10);
      if (this.$refs.ctTxt) {
        this.$refs.ctTxt.style.transition = `transform ${tmpDuration}s linear`;
        this.$refs.ctTxt.style.transform = `translate3d(-${tmpDistance}vw,0vw,0vw)`;
      }
      console.log(tmpDuration);
      timeoutTask(() => {
        broadAniLock = false;
        if (this.$refs.ctTxt) {
          this.$refs.ctTxt.style.transition = 'none 0s linear 0s';
          this.$refs.ctTxt.style.transform = 'translate3d(0vw,0vw,0vw)';
        }
        timeoutTask(() => {
          this.startBroadAni();
        }, 500);
      }, tmpDuration * 1000);
    },
    handleSwiperChange(e) {
      this.setGiftNavId(this.giftTitleList[e].id);
    },
  },
};
</script>
<style lang="less" scoped>
@import 'vue-swipe/dist/vue-swipe.css';

.giftModule {
  position: absolute;
  width: 100%;
  bottom: 0;
  flex-direction: column;
  .sendGiftReward {
    width: 718px;
    height: 70px;
    background-image: url('../../assets/image/hd2/sendGiftReward.png');
    background-size: 100% 100%;
    padding: 0 32px;
    margin-bottom: 10px;
    color: #fff;
    font-size: 32px;
  }
  .notify {
    width: 684px;
    height: 70px;
    font-size: 28px;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 10px;
    background-image: url('~@/assets/image/hd2/textBg.png');
    background-size: 100% 100%;
    margin-left: 34px;
    .broadIcon {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
    .notifyCt {
      width: 618px;
      height: 40px;
      overflow: hidden;
      position: relative;
      .notifyText {
        position: absolute;
        white-space: nowrap;
        transition-property: transform;
        transition-timing-function: linear;
        left: 0px;
      }
    }
  }
  .happyValSheet {
    width: 718px;
    height: 128px;
    border-radius: 12px;
    background-color: rgba(1, 9, 22, 0.96);
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 26px;

    .tit {
      font-size: 24px;
      font-weight: 500;
      color: #dd35a5;
      line-height: 34px;
      flex-direction: column;
    }

    .sheetList {
      margin-left: 35px;
      display: flex;

      .sheetItem {
        flex-direction: column;
        position: relative;
        margin: 0 18px;

        .headImg {
          width: 68px;
          height: 68px;
          border-radius: 50%;
        }

        .relatives {
          width: 56px;
          height: 24px;
          background: #ffffff;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 400;
          color: #5c0f51;
          position: absolute;
          bottom: -8px;
          white-space: nowrap;
        }

        .happyVal {
          position: absolute;
          background: linear-gradient(276deg, #ffd9ae 0%, #e49e2c 100%);
          border-radius: 13px 13px 13px 0px;
          font-size: 16px;
          color: #ffffff;
          left: 50px;
          top: 0px;
          width: 44px;
          height: 26px;

          &::after {
            content: '';
            position: absolute;
            right: 100%;
            bottom: -40px;
            width: 8px;
            height: 40px;
            border-width: 0;
            border-style: solid;
            border-color: transparent;
            margin-right: -3px;
            border-top-width: 8px;
            border-top-color: currentColor;
            border-radius: 84px 0 0 0;
            color: #e49e2c;
          }
        }
      }
    }
  }

  .giftBox {
    width: 750px;
    height: 680px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: rgba(1, 9, 22, 0.96);

    .nav {
      height: 80px;
      display: flex;
      padding: 0 32px;
      padding-left: 0px;
      margin-bottom: 2.5vw;
      position: relative;

      .navItem {
        display: flex;
        align-items: center;
        height: 80px;
        font-size: 26px;
        font-weight: 400;
        margin-left: 35px;
        color: rgba(255, 255, 255, 0.3);
        padding-bottom: 4px;

        &.active {
          font-size: 28px;
          font-weight: 500;
          color: #ffffff;
          border-bottom: 4px solid #fff;
        }
      }
      .priceWrap {
        position: absolute;
        right: 0;
        .goldUnit {
          width: 32px;
          height: 26px;
          margin-top: 8px;
        }

        .price {
          font-size: 28px;
          font-weight: 400;
          color: #ffffff;
          margin-left: 10px;
        }

        .rechargeBtn {
          width: 130px;
          height: 52px;
          font-size: 28px;
          font-weight: 400;
          color: #ffffff;
          .arrowRight {
            width: 32px;
            height: 32px;
            margin-left: 14px;
          }
        }
      }
    }

    .giftListWrap {
      width: 100%;
      height: 77.5vw;
      position: relative;
      padding-bottom: 4vw;
      .gift-swipe {
        .page {
          width: 100%;
          height: 100%;
          position: absolute;
          padding: 0 2%;
          overflow-y: scroll;
          .item {
            position: relative;
            flex-direction: column;
            // margin: 24px 0;
            width: 25%;
            height: 32vw;
            float: left;
            .giftImg {
              width: 14vw;
              height: 14vw;

              &.active {
                animation-name: bounceIn;
                animation-duration: 2.5s;
                animation-iteration-count: infinite;
                animation-delay: 0;
              }
            }

            .stubbleIcon {
              width: 84px;
              height: 40px;
              position: absolute;
              top: -10px;
              right: -30px;
            }

            .name {
              font-size: 3.6vw;
              color: #fff;
              margin-top: 20px;
            }

            .price {
              margin-top: 1.2vw;
              color: rgba(255, 255, 255, 0.6);
              font-size: 3.6vw;
              .unit {
                width: 28px;
                height: 21px;
                margin-right: 6px;
              }
              &.active {
                padding-bottom: 5vw;
              }
            }

            .activeBox {
              position: absolute;
              top: 0;
              width: 90%;
              height: 100%;
              background: rgba(255, 255, 255, 0.16);
              border-radius: 16px;
              .sendBtn {
                width: 100%;
                height: 50px;
                background: linear-gradient(90deg, #fc4d88, #fd024f 100%);
                font-size: 24px;
                font-weight: 400;
                color: #ffffff;
                position: absolute;
                bottom: 0;
                left: 0;
                border-bottom-left-radius: 16px;
                border-bottom-right-radius: 16px;
              }
            }
          }
        }
      }

      .mint-swipe::v-deep {
        .mint-swipe-items-wrap {
          position: relative;
          height: 100%;
        }
      }
    }
    &.diamondHb {
      height: 820px;
      .giftListWrap {
        height: 96vw;
      }
    }
  }

  .sendDiamondHb {
    padding-top: 25px;

    .diamondHbList {
      padding: 0 16px;

      .diamondHbItem {
        width: 686px;
        height: 138px;
        background: linear-gradient(111deg, #262a31, #1d2528 100%);
        margin: 0 auto;
        margin-bottom: 24px;
        border-radius: 12px;
        position: relative;

        .hbIcon {
          width: 92px;
          height: 92px;
          position: absolute;
          top: 24px;
          left: 204px;
        }

        .hbSpecs {
          width: 192px;
          height: 138px;
          background: linear-gradient(125deg, rgba(241, 65, 146, 0.4), rgba(238, 47, 92, 0.4) 100%);
          position: absolute;
          right: 0;
          border-top-right-radius: 12px;
          border-bottom-right-radius: 12px;
          flex-direction: column;

          .diamondNum {
            font-size: 32px;
            font-weight: 600;
            color: #ffffff;

            .goldUnit {
              width: 32px;
              height: 26px;
              margin-right: 5px;
            }
          }

          .personNum {
            font-size: 28px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.7);
            margin-top: 5px;
          }
        }

        &.active {
          .hbSpecs {
            background: linear-gradient(125deg, #f14192, #ee2f5c 100%);
          }
        }
      }
    }

    .diamondHbSetGroup {
      width: 686px;
      margin: 0 auto;
      margin-top: 40px;
      display: flex;
      justify-content: space-around;

      .diamondHbSetItem {
        .radio {
          width: 32px;
          height: 32px;
          border: 2px solid rgba(255, 255, 255, 0.7);
          border-radius: 50%;

          &.active {
            border: none;
            background-color: #ff4d72;

            &::after {
              content: '';
              display: block;
              width: 20px;
              height: 16px;
              background-image: url('../../assets/image/diamondHb/tickIcon.png');
              background-size: 100% 100%;
            }
          }
        }

        .name {
          font-size: 24px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          margin-left: 16px;
        }
      }
    }

    .sendHbBtn {
      width: 686px;
      height: 72px;
      background: linear-gradient(90deg, #fc4d88, #fa45fc 100%);
      border-radius: 12px;
      font-size: 28px;
      font-weight: 500;
      color: #ffffff;
      margin: 0 auto;
      margin-top: 48px;
    }
  }
  &.zshl {
    .giftBox {
      background-color: unset;
      background-image: url('https://ustatic.joymew.com/joymewScreen/zshl/mobile/giftBg.png');
      background-size: 100% 100%;
      padding-top: 143px;
      height: 898px;
      .giftListWrap {
        .gift-swipe {
          .page {
            .item {
              .activeBox {
                .sendBtn {
                  color: #c26b44;
                  background: linear-gradient(90deg, #ffe58f, #ffda64 100%);
                }
              }
            }
          }
        }
      }
      &.diamondHb {
        height: 956px;
        padding-top: 150px;
      }
    }
    .happyValSheet {
      border-radius: unset;
      top: -15px;
      height: 158px;
      width: 100%;
      position: absolute;
      background-color: unset;
      .tit {
        color: #fff5df;
        font-weight: 600;
        font-size: 32px;
        line-height: 38px;
      }
      .sheetList {
        .sheetItem {
          .relatives {
            width: 79px;
            height: 32px;
            bottom: -16px;
            background: unset;
            background-image: url('https://ustatic.joymew.com/joymewScreen/zshl/mobile/hapyName.png');
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
