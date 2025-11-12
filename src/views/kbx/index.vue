<template>
  <div class="kbxContainer">
    <!-- 等待界面 -->
    <div
      v-if="gameStatus === 1"
      class="waitContainer publicVCenter"
    >
      <img
        src="https://static.hudongmiao.com/joymewMp/img/kbx/kbxWaitBg.png"
        class="bg"
      />
      <img
        src="https://static.hudongmiao.com/joymewMp/img/kbx/kbxWaitBx.png"
        class="kbxWaitBx"
      />
      <div class="tip2">
        只需送出弹幕礼物，免费获得一次夺取宝箱的机会
      </div>
      <div class="sendGiftItem item1">
        送出小号火箭：获取一个宝箱
      </div>
      <div class="sendGiftItem item2">
        送出中号火箭：获取二个宝箱
      </div>
      <div class="sendGiftItem item3">
        送出大号火箭：获取三个宝箱
      </div>
      <div class="tip3">
        ps:如果宝箱被抢完，您支付得金额将原路退回您得账户
      </div>
      <div
        v-tap="{ methods: enterGame }"
        class="btn"
      >
        开始
      </div>
    </div>
    <!-- game界面 -->
    <div
      v-if="gameStatus === 2 && !myBoxesVisible"
      class="gameContainer publicVCenter"
    >
      <img
        src="https://static.hudongmiao.com/joymewMp/kbx/bg3-01.png"
        class="bg"
      />
      <img
        src="https://static.hudongmiao.com/joymewMp/kbx/title3-01.png"
        class="title"
      />
      <img
        src="https://static.hudongmiao.com/joymewMp/kbx/ribbonLeft.png"
        class="ribbonLeft"
      />
      <img
        src="https://static.hudongmiao.com/joymewMp/kbx/ribbonRigth.png"
        class="ribbonRight"
      />
      <div
        v-for="(item, index) in boxes"
        :key="index"
        v-tap="{ methods: chooseBoxes, p: item }"
        class="bx publicHvCenter"
        :class="{ active: item.isChoosed }"
        :style="{ left: item.left + 'vw', top: item.top + 'vw' }"
      >
        <img
          src="https://static.hudongmiao.com/joymewMp/kbx/bx3.png"
          class="bxImg"
          :class="{ buyed: item.isBuyed }"
        />
        <div class="num">
          {{ item.num }}
        </div>
      </div>
      <div class="giftListWrap publicHvCenter">
        <div class="giftItem publicHCenter">
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
      <div
        v-tap="{ methods: buy }"
        class="btn"
      >
        获取宝箱
      </div>
      <div
        v-tap="{ methods: toMyBoxes }"
        class="myBoxBtn"
      />
      <div
        v-tap="{ methods: toAgreement }"
        class="agreement"
      >
        阅读并同意《充值服务协议》
      </div>
    </div>
    <!-- 我的宝箱界面 -->
    <div
      v-if="gameStatus === 2 && myBoxesVisible"
      class="myBoxes publicVCenter"
    >
      <img
        src="https://static.hudongmiao.com/joymewMp/kbx/bg4-01.png"
        class="bg"
      />
      <img
        src="https://static.hudongmiao.com/joymewMp/kbx/title2-01.png"
        class="title"
      />
      <div class="myBxList publicHCenter">
        <div
          v-for="(item, index) in luckyBoxes"
          :key="index"
          class="bx"
          :class="{ active: item.isChoosed }"
          :style="{ left: item.left + 'vw', top: item.top + 'vw' }"
        >
          <img
            :src="
              item.open === '0'
                ? 'https://static.hudongmiao.com/joymewMp/kbx/bx3.png'
                : 'https://static.hudongmiao.com/joymewMp/kbx/bxOpen3.png'
            "
            class="bxImg"
          />
          <div
            class="num"
            :class="{ active: item.open === '0' }"
          >
            {{ item.num }}
          </div>
        </div>
      </div>
      <div class="myWinRecord publicHvCenter">
        <img
          src="https://static.hudongmiao.com/joymewMp/kbx/loveIcon.png"
          class="loveIcon"
        />
        <label>我的中奖记录</label>
        <img
          src="https://static.hudongmiao.com/joymewMp/kbx/loveIcon.png"
          class="loveIcon"
        />
      </div>
      <div
        v-for="(item, index) in luckyBoxes"
        :key="index"
        class="winItem publicVCenter"
        :class="'item' + (index + 1)"
      >
        <div class="bxName">
          {{ item.num }}号宝箱
        </div>
        <div class="bxStatus">
          {{ item.open === '0' ? '未开启' : item.money === '0' ? '谢谢参与' : item.money }}
        </div>
      </div>
      <div
        v-tap="{ methods: toBuyBoxes }"
        class="btn"
      >
        返回
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
    <!-- 反馈入口 -->
    <!-- <feedbackEntry userId="{{userId}}"></feedbackEntry> -->
  </div>
</template>
<script>
import {
  getGameState, getBoxesList, getMyBoxes, robBox, kbxRecharge,
} from '@/api/kbx/index';
import wxApi from '@/utils/wxApi';
import { Dialog } from 'vant';
import { timeoutTask, generateRandom } from '@/utils/index';
import { sendBroasCast } from '@/api/chat/index';

const BX = [
  {
    num: '01',
    left: 16.77,
    top: 21.84,
  },
  {
    num: '02',
    left: 36.53,
    top: 21.84,
  },
  {
    num: '03',
    left: 57.72,
    top: 21.84,
  },
  {
    num: '05',
    left: 8.06,
    top: 44,
  },
  {
    num: '06',
    left: 27.69,
    top: 44,
  },
  {
    num: '07',
    left: 47.45,
    top: 44,
  },
  {
    num: '08',
    left: 67.73,
    top: 44,
  },
  {
    num: '09',
    left: 4.81,
    top: 68,
  },
  {
    num: '10',
    left: 26.13,
    top: 68,
  },
  {
    num: '11',
    left: 47.32,
    top: 68,
  },
  {
    num: '12',
    left: 67.73,
    top: 68,
  },
  {
    num: '13',
    left: 5.46,
    top: 88,
  },
  {
    num: '15',
    left: 26.78,
    top: 88,
  },
  {
    num: '16',
    left: 46.8,
    top: 88,
  },
  {
    num: '17',
    left: 68.38,
    top: 88,
  },
  {
    num: '18',
    left: 15.21,
    top: 108,
  },
  {
    num: '19',
    left: 36.27,
    top: 108,
  },
  {
    num: '20',
    left: 57.72,
    top: 108,
  },
];
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

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      gameStatus: 1,
      myBoxesVisible: false,
      gift_show: {
        // 当前显示的礼物
        id: 3,
        gift: 'rocket3',
        name: '大号火箭',
        imgUrl: 'https://static.hudongmiao.com/joymewMp/zyz/rocket3.png',
        price: 0,
      },
      boxes: [],
      luckyBoxes: [],
      remain: 3,
      money: 0,
      dialogVisible: false,
      messageTip: '',
      messageType: 0,
    };
  },
  created() {
    requestLock = false;
    getGameState()
      .then((res) => {
        console.log(res);
        if (res.success) {
          if (res.data.status === '1') {
            this.gameStatus = 2;
            this.getBoxes();
          } else if (res.data.status === '2') {
            this.$toast.center('本轮开宝箱已经结束!');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getBoxes() {
      getBoxesList()
        .then((res) => {
          console.log(res);
          if (res.success && res.data) {
            const tmpLen = res.data.length;
            this.boxes.splice(0);
            for (let i = 0; i < tmpLen; i += 1) {
              this.boxes.push({
                id: res.data[i].eggId,
                isBuyed: res.data[i].userId !== '0',
                isChoosed: false,
                buyerId: res.data[i].userId,
                num: BX[i].num,
                left: BX[i].left,
                top: BX[i].top,
              });
            }
            this.money = parseFloat(res.message);
            this.setRemain();
            this.updateGift();
          } else {
            this.$toast.center('获取宝箱信息失败!');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 设置还可以购买的宝箱个数(一共可购买三个)
    setRemain() {
      let tmpRemain = 0;
      const tmpLen = this.boxes.length;
      for (let i = 0; i < tmpLen; i += 1) {
        if (this.boxes[i].buyerId === this.$store.state.user.userId) {
          tmpRemain += 1;
        }
      }
      this.remain = tmpRemain;
    },
    // 获取选择的宝箱数目时更新祝福列表
    updateGift() {
      const hasChoosedNum = this.getChoosedBoxesNum(false);
      this.boxesMapGift(hasChoosedNum);
    },
    getChoosedBoxesNum(isIncludeBuyed) {
      const len = this.boxes.length;
      let tmpNum = 0;
      if (isIncludeBuyed) {
        for (let i = 0; i < len; i += 1) {
          if (this.boxes[i].isChoosed || this.boxes[i].buyerId === this.$store.state.user.userId) {
            tmpNum += 1;
          }
        }
      } else {
        for (let i = 0; i < len; i += 1) {
          if (this.boxes[i].isChoosed) {
            tmpNum += 1;
          }
        }
      }
      return tmpNum;
    },
    boxesMapGift(choosedNum) {
      giftList[0].price = this.money.toFixed(2);
      giftList[1].price = (this.money * 2).toFixed(2);
      giftList[2].price = (this.money * 3).toFixed(2);
      if (choosedNum === 3) {
        // 选了3个宝箱<---> 大火箭
        this.gift_show.id = giftList[2].id;
        this.gift_show.gift = giftList[2].gift;
        this.gift_show.name = giftList[2].name;
        this.gift_show.imgUrl = giftList[2].imgUrl;
        this.gift_show.price = giftList[2].price;
      } else if (choosedNum === 2) {
        // 选了2个宝箱<---> 中火箭
        this.gift_show.id = giftList[1].id;
        this.gift_show.gift = giftList[1].gift;
        this.gift_show.name = giftList[1].name;
        this.gift_show.imgUrl = giftList[1].imgUrl;
        this.gift_show.price = giftList[1].price;
      } else {
        // 选了1个宝箱或者还没有选蛋<--->小火箭
        this.gift_show.id = giftList[0].id;
        this.gift_show.gift = giftList[0].gift;
        this.gift_show.name = giftList[0].name;
        this.gift_show.imgUrl = giftList[0].imgUrl;
        this.gift_show.price = giftList[0].price;
      }
    },
    getLuckyBoxes() {
      getMyBoxes()
        .then((res) => {
          console.log(res);
          if (res.success) {
            if (res.data && res.data.length > 0) {
              this.luckyBoxes.splice(0);
              const tmpLen = res.data.length;
              for (let i = 0; i < tmpLen; i += 1) {
                if (res.data[i].eggId) {
                  const tmpEggId = parseInt(res.data[i].eggId, 10);
                  if (tmpEggId <= 3) {
                    res.data[i].num = `0${tmpEggId}`;
                  } else if (tmpEggId >= 4 && tmpEggId <= 8) {
                    res.data[i].num = `0${tmpEggId + 1}`;
                  } else if (tmpEggId >= 9 && tmpEggId <= 12) {
                    res.data[i].num = `${tmpEggId + 1}`;
                  } else {
                    res.data[i].num = `${tmpEggId + 2}`;
                  }
                  this.luckyBoxes.push(res.data[i]);
                }
              }
            }
          } else {
            this.$toast.center('获取宝箱信息失败!');
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.center('获取宝箱信息失败!');
        });
    },
    enterGame() {
      getGameState()
        .then((res) => {
          console.log(res);
          if (res.success) {
            if (res.data.status === '0') {
              this.$toast.center('请等待大屏开启开宝箱!');
            } else if (res.data.status === '1') {
              this.getBoxes();
              this.gameStatus = 2;
            } else if (res.data.status === '2') {
              this.$toast.center('本轮开宝箱已经结束!');
            } else {
              this.$toast.center('请等待大屏开启开宝箱!');
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
    toMyBoxes() {
      this.getLuckyBoxes();
      this.myBoxesVisible = true;
    },
    toBuyBoxes() {
      this.myBoxesVisible = false;
    },
    // 通过boxesId查找宝箱所在数组的索引
    findBoxIndexByBoxId(boxId) {
      let tmpIndex = -1;
      const tmpLen = this.boxes.length;
      for (let i = 0; i < tmpLen; i += 1) {
        if (this.boxes[i].id === boxId) {
          tmpIndex = i;
          break;
        }
      }
      return tmpIndex;
    },
    // 选择宝箱
    chooseBoxes(e) {
      const index = this.findBoxIndexByBoxId(e.p.id);
      if (this.boxes[index].isBuyed) {
        this.$toast.center('这个宝箱已经被抢走啦!');
        return;
      }
      // 如果选中 取消选中
      if (this.boxes[index].isChoosed) {
        this.boxes[index].isChoosed = false;
        this.updateGift();
        return;
      }
      // 最多3个宝箱 包括已经购买的
      const hasChoosedNum = this.getChoosedBoxesNum(true);
      if (hasChoosedNum >= 3) {
        this.$toast.center('最多只能选择三个宝箱哦');
        return;
      }
      if (!this.boxes[index].isChoosed) {
        this.boxes[index].isChoosed = true;
        this.updateGift();
      }
    },
    // 获取已经选择的宝箱列表
    getChoosedBoxesList() {
      const len = this.boxes.length;
      const tmpChoosedBoxes = [];
      for (let i = 0; i < len; i += 1) {
        if (this.boxes[i].isChoosed) {
          tmpChoosedBoxes.push(this.boxes[i]);
        }
      }
      return tmpChoosedBoxes;
    },
    // 支付
    recharge(money) {
      return new Promise((resolve, reject) => {
        kbxRecharge({
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
                  // 充值完成 等待后台加喵钻逻辑完成后 去买宝箱
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
    // 买宝箱
    buy() {
      // 获取选中的宝箱
      const choosed = this.getChoosedBoxesList();
      if (choosed.length === 0) {
        this.$toast.center('请先选一个宝箱!');
        return;
      }
      if (requestLock) {
        return;
      }
      if (this.$store.state.user.isForbidBuyHbq) {
        this.$toast.center('您没有权限买宝箱!');
        return;
      }
      requestLock = true;
      const choosedStr = choosed
        .map((item) => {
          return item.id;
        })
        .join(',');
      this.robBox(choosedStr)
        .then((res) => {
          console.log(res);
          if (res.code === 'success') {
            requestLock = false;
            if (res.resultList.length === 0) {
              this.messageTip = '很遗憾您选择的宝箱都被抢走了\r\n未抢到的宝箱，已退回至您的账户中';
              this.messageType = 0;
              this.dialogVisible = true;
            } else {
              if (choosed.length > res.resultList.length) {
                this.messageTip = `恭喜您,成功抢到了${res.resultList.length}个宝箱!\r\n 未抢到的宝箱，已退回至您的账户中`;
                this.messageType = 1;
                this.dialogVisible = true;
              } else {
                this.messageTip = `恭喜您,成功抢到了${res.resultList.length}个宝箱!`;
                this.messageType = 1;
                this.dialogVisible = true;
              }
              console.log(res.resultList);
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
            this.getBoxes();
          } else if (res.code === 'error3') {
            if (res.NeedMoney) {
              return this.recharge(res.NeedMoney);
            }
            this.$toast.center('购买失败!');
          } else if (res.code === 'error4') {
            this.$toast.center('开宝箱已经结束!');
            requestLock = false;
          } else {
            this.$toast.center('购买失败!');
            requestLock = false;
          }
          return null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 抢宝箱
    robBox(boxId) {
      return new Promise((resolve, reject) => {
        this.$toast.center('奋力争抢中...');
        robBox({
          boxIds: boxId,
          sort: 0,
        })
          .then((res) => {
            console.log(res);
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
            this.$toast.center('抢购失败!');
          });
      });
    },
    handleConfirm() {
      if (this.messageType === 1) {
        this.getLuckyBoxes();
        this.myBoxesVisible = true;
      }
    },
    handleCancel() {},
  },
};
</script>
<style lang="less" scoped>
.kbxContainer::v-deep {
  .waitContainer {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    flex-direction: column;
    transition: all 0.3s ease-out;
    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .kbxWaitBx {
      width: 750px;
      height: 780px;
      position: absolute;
      top: -102px;
      left: 0;
    }
    .tip2 {
      font-size: 22px;
      font-weight: 400;
      color: #ffffff;
      position: absolute;
      top: 680px;
    }
    .sendGiftItem {
      width: 618px;
      height: 70px;
      border-radius: 8px;
      position: absolute;
      font-size: 28px;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 70px;
      &.item1 {
        top: 737px;
        background: #d1000e;
      }
      &.item2 {
        top: 820px;
        background: #fcab0f;
      }
      &.item3 {
        top: 909px;
        background: #63a8ff;
      }
    }
    .tip3 {
      font-size: 24px;
      font-weight: 400;
      color: #fefefe;
      position: absolute;
      top: 1009px;
    }
    .btn {
      width: 439px;
      height: 106px;
      background-image: url('https://static.hudongmiao.com/joymewMp/kbx/btn2.png');
      background-size: 100% 100%;
      position: absolute;
      top: 1060px;
      text-align: center;
      font-size: 40px;
      font-weight: 400;
      color: #ffffff;
      text-shadow: 0px 2px 1px #880c0c;
      line-height: 83px;
    }
  }
  .gameContainer {
    position: absolute;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    flex-direction: column;
    transition: all 0.3s ease-out;
    background-color: #9c0f11;
    .bg {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .title {
      width: 327px;
      height: 89px;
      position: absolute;
      top: 43px;
    }
    .ribbonLeft {
      width: 117px;
      height: 124px;
      position: absolute;
      left: 51px;
      top: 225px;
    }
    .ribbonRight {
      width: 117px;
      height: 124px;
      position: absolute;
      right: 51px;
      top: 225px;
    }
    .bx {
      width: 200px;
      height: 139px;
      position: absolute;
      transition: all 0.3s linear;
      &.active {
        animation-name: bounce;
        transform-origin: center bottom;
        animation-duration: 1s;
        transform: scale(1.2);
      }
      .bxImg {
        position: absolute;
        width: 100%;
        height: 100%;
        &.buyed {
          filter: gray;
        }
      }
      .num {
        font-size: 20px;
        color: #b97601;
        position: relative;
        left: -21px;
        top: -21px;
        font-weight: bold;
      }
    }
    .giftListWrap {
      position: absolute;
      top: 125vw;
      .giftItem {
        width: 78px;
        height: 92px;
        position: relative;
        opacity: 1;
        .giftImg {
          position: absolute;
          &.g1 {
            width: 45px;
            height: 92px;
          }
          &.g2 {
            width: 39px;
            height: 92px;
          }
          &.g3 {
            width: 43px;
            height: 92px;
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
    .btn {
      width: 439px;
      height: 106px;
      background-image: url('https://static.hudongmiao.com/joymewMp/kbx/btn2.png');
      background-size: 100% 100%;
      position: absolute;
      top: 138vw;
      text-align: center;
      font-size: 40px;
      font-weight: 400;
      color: #ffffff;
      text-shadow: 0px 2px 1px #880c0c;
      line-height: 83px;
    }
    .myBoxBtn {
      width: 103px;
      height: 103px;
      background-image: url('https://static.hudongmiao.com/joymewMp/kbx/myBoxBtn.png');
      background-size: 100% 100%;
      position: absolute;
      right: 43px;
      top: 138vw;
    }
    .agreement {
      font-size: 24px;
      font-weight: 400;
      color: #ffd027;
      position: absolute;
      top: 153vw;
    }
  }
  .myBoxes {
    position: absolute;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    flex-direction: column;
    transition: all 0.3s ease-out;
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .title {
      position: absolute;
      width: 458px;
      height: 244px;
      top: 37px;
    }
    .myBxList {
      position: absolute;
      width: 100%;
      top: 420px;
      .bx {
        width: 200px;
        height: 139px;
        position: relative;
        .bxImg {
          width: 100%;
          height: 100%;
        }
        .num {
          font-size: 20px;
          color: #b97601;
          position: absolute;
          left: 69px;
          font-weight: bold;
          top: 36px;
          &.active {
            top: 46px;
            left: 62px;
          }
        }
      }
    }
    .myWinRecord {
      position: absolute;
      top: 571px;
      width: 100%;
      font-size: 36px;
      font-weight: 500;
      color: #ffffff;
      .loveIcon {
        width: 29px;
        height: 25px;
        margin: 20px;
      }
    }
    .winItem {
      width: 596px;
      height: 114px;
      background: rgba(255, 109, 119, 0.3);
      border-radius: 8px;
      position: absolute;
      justify-content: space-between;
      padding: 0 60px 0 35px;
      .bxName {
        font-size: 28px;
        font-weight: 400;
        color: #ffffff;
      }
      .bxStatus {
        font-size: 28px;
        font-weight: 400;
        color: #fff32e;
      }
      &.item1 {
        top: 716px;
      }
      &.item2 {
        top: 858px;
      }
      &.item3 {
        top: 1002px;
      }
    }
    .btn {
      width: 439px;
      height: 106px;
      background-image: url('https://static.hudongmiao.com/joymewMp/kbx/btn2.png');
      background-size: 100% 100%;
      position: absolute;
      bottom: 12px;
      text-align: center;
      font-size: 40px;
      font-weight: 400;
      color: #ffffff;
      text-shadow: 0px 2px 1px #880c0c;
      line-height: 83px;
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
