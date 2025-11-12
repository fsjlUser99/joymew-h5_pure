<template>
  <div
    class="recommendGiftModule publicHCenter"
    :class="{ giftShow: status === 1, noWedding: sceneType !== '0', zshl: sceneType === '91' }"
  >
    <div
      v-show="status === 0"
      class="sendBox publicVCenter"
      :class="{ show: isShowAni }"
    >
      <img
        :src="headImg"
        class="atHeadImg"
      />
      <div class="atWrap">
        <div class="atName">@{{ name }}</div>
        <div class="atInfo">
          {{ atText }}
        </div>
      </div>
      <div
        v-tap="{ methods: toSend }"
        class="atBtn publicHvCenter"
      >
        立即赠送
      </div>
    </div>
    <div
      v-show="status === 1"
      class="giftBox"
      :class="{ show: isShowAni, noWedding: sceneType !== '0' }"
    >
      <div
        v-if="sceneType === '0'"
        class="giftTitle publicHvCenter"
      >
        <img
          src="@/assets/image/popupArea/marryText.png"
          class="marryTextImg"
        />
        <img
          src="@/assets/image/popupArea/xn.png"
          class="xnImg"
        />
        <img
          src="@/assets/image/popupArea/wedding.png"
          class="weddingImg"
        />
        <img
          src="@/assets/image/popupArea/xl.png"
          class="xlImg"
        />
      </div>
      <div
        class="giftList publicHCenter"
        :class="{ noWedding: sceneType !== '0' }"
      >
        <div
          v-if="rGiftList[0]"
          v-tap="{
            methods: sendGift,
            giftId: rGiftList[0].giftId,
            price: rGiftList[0].price,
          }"
          class="giftItem left publicHvCenter"
        >
          <img
            :src="rGiftList[0].giftImg"
            class="giftImg"
          />
          <label class="giftName">{{ rGiftList[0].giftName }}</label>
          <div class="giftPrice publicHvCenter">
            {{ rGiftList[0].price }}
            <img
              src="@/assets/image/icon/diamond.png"
              class="unit"
            />
          </div>
        </div>
        <div
          v-if="rGiftList[1]"
          v-tap="{
            methods: sendGift,
            giftId: rGiftList[1].giftId,
            price: rGiftList[1].price,
          }"
          class="giftItem right publicHvCenter"
        >
          <img
            :src="rGiftList[1].giftImg"
            class="giftImg"
          />
          <label class="giftName">{{ rGiftList[1].giftName }}</label>
          <div class="giftPrice publicHvCenter">
            {{ rGiftList[1].price }}
            <img
              src="@/assets/image/icon/diamond.png"
              class="unit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import wxApi from '@/utils/wxApi';
import { timeoutTask, generateRandom } from '@/utils/index';
import { sendRecommendGift, diamondRecharge } from '@/api/index/index';
import { sendRecommendGiftMessage } from '@/api/chat/index';

export default {
  name: 'RecommendGiftPopup',
  computed: {
    ...mapState({
      headImg: (state) => state.user.headImg,
      name: (state) => state.user.name,
      sceneType: (state) => state.live.sceneType,
      atText: (state) => state.app.atText,
      rcGiftList: (state) => state.live.rcGiftList,
      freeSendGift: (state) => state.user.freeSendGift,
      allFreeSendGift: (state) => state.live.allFreeSendGift,
      env: (state) => state.app.env,
    }),
    rGiftList() {
      const tmpList = [];
      const tmpList2 = this.rcGiftList;
      const tmpLen = tmpList2.length;
      try {
        if (tmpLen > 2) {
          const tmpIndex = generateRandom(0, tmpLen);
          let tmpIndex2 = generateRandom(0, tmpLen);
          while (tmpIndex === tmpIndex2) {
            tmpIndex2 = generateRandom(0, tmpLen);
          }
          tmpList.push(tmpList2[tmpIndex]);
          tmpList.push(tmpList2[tmpIndex2]);
        } else {
          tmpList.push(tmpList2[0]);
          tmpList.push(tmpList2[1]);
        }
      } catch (err) {
        console.log(err);
      }
      return tmpList;
    },
  },
  created() {},
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  data() {
    return {
      isShowAni: false, // 控制bapin box弹出动画
      content: '',
      status: 0, // 0: 发送框显示 1: 礼物选择框显示
    };
  },
  methods: {
    ...mapMutations({
      setOrigin: 'app/setOrigin',
      togglePopup: 'app/togglePopup',
    }),
    showAniStart() {
      timeoutTask(() => {
        this.isShowAni = true;
      }, 100);
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    toSend() {
      this.status = 1;
    },
    sendBroadcast(e) {
      sendRecommendGiftMessage({
        giftId: e.giftId,
      });
    },
    sendGift(e) {
      if (!this.validateSend()) {
        // 免费发礼物直接发送广播，不需要支付
        this.sendBroadcast(e);
        this.togglePopup();
        return;
      }
      if (this.env === 'miniProgram') {
        console.log('***跳转地址***');
        if (this.$store.state.app.mpType) {
          this.setOrigin('sendGift');
          wxApi.navigateTo(
            `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${e.price}&giftId=${e.giftId}&origin=${this.$store.state.app.origin}`,
          );
        } else {
          this.setOrigin('sendRecommendGift');
          console.log(
            `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${e.price}&giftId=${e.giftId}&origin=${this.$store.state.app.origin}`,
          );
          wxApi.navigateTo(
            `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${e.price}&giftId=${e.giftId}&origin=${this.$store.state.app.origin}`,
          );
        }
      } else if (this.env === 'h5') {
        diamondRecharge({
          total: e.price,
        })
          .then((res) => {
            console.log(res);
            return wxApi.pay(res);
          })
          .then(() => {
            sendRecommendGift({
              giftId: e.giftId,
            })
              .then((res2) => {
                if (res2.code === 200) {
                  this.$toast.center('喵钻不足!发送失败!');
                }
                this.$toast.center('发送成功!');
                return sendRecommendGiftMessage({
                  giftId: e.giftId,
                }); // 发送礼物的广播
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            this.$toast.center('充值失败!');
          });
      } else if (this.env === 'tt') {
        console.log('***跳转地址***');
        this.setOrigin('sendRecommendGift');
        console.log(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${e.price}&giftId=${e.giftId}&origin=${this.$store.state.app.origin}`,
        );
        wxApi.navigateToTt(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${e.price}&giftId=${e.giftId}&origin=${this.$store.state.app.origin}`,
        );
      }
    },
    validateSend() {
      let flag = true;
      if (this.freeSendGift) {
        flag = false;
      } else if (this.allFreeSendGift) {
        flag = false;
      }
      console.log(flag);
      return flag;
    },
  },
};
</script>
<style lang="less" scoped>
.recommendGiftModule {
  position: absolute;
  width: 100%;
  height: 240px;
  bottom: 0;
  &.giftShow {
    height: 709px;
    &.noWedding {
      height: 49.533vw;
    }
  }
  .sendBox {
    width: 750px;
    height: 240px;
    background-image: url('../../assets/image/popupArea/recommendGiftCard.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transition: all 0.2s linear;
    position: absolute;
    top: 240px;
    &.show {
      transform: translateY(-240px);
    }
    .atHeadImg {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 21px;
      margin-left: 38px;
    }
    .atWrap {
      letter-spacing: 2px;
      .atName {
        font-size: 28px;
        color: #333333;
      }
      .atInfo {
        font-size: 22px;
        color: #b3a4a8;
        margin-top: 15px;
      }
    }
    .atBtn {
      width: 190px;
      height: 70px;
      background-image: url('../../assets/image/popupArea/recommendGiftBtn.png');
      background-size: 100% 100%;
      position: absolute;
      right: 34px;
      font-size: 30px;
      letter-spacing: 3px;
      color: #a24935;
    }
  }
  .giftBox {
    width: 750px;
    height: 709px;
    transition: all 0.2s linear;
    position: absolute;
    top: 709px;
    &.show {
      transform: translateY(-709px);
    }
    &.noWedding {
      top: 93.533vw;
      height: 54.533vw;
    }
    .giftTitle {
      position: absolute;
      width: 100%;
      height: 319px;
      .marryTextImg {
        width: 370px;
        height: 107px;
        position: absolute;
        top: 0;
      }
      .xnImg {
        width: 77px;
        height: 146px;
        position: absolute;
        left: 166px;
        top: 178px;
      }
      .weddingImg {
        width: 196px;
        height: 248px;
        position: absolute;
        top: 71px;
      }
      .xlImg {
        width: 71px;
        height: 169px;
        position: absolute;
        right: 166px;
        top: 178px;
      }
    }
    .giftList {
      position: absolute;
      width: 100%;
      top: 324px;
      &.noWedding {
        top: 3.2vw;
      }
      .giftItem {
        width: 330px;
        height: 330px;
        border-radius: 24px;
        flex-direction: column;
        position: relative;
        &.left {
          background: linear-gradient(-12deg, #079ad1 0%, #9a0dd5 100%);
          margin-right: 31px;
        }
        &.right {
          background: linear-gradient(0deg, #ff536b, #b86afa);
        }
        .giftImg {
          width: 165px;
        }
        .giftName {
          font-size: 34px;
          font-weight: 500;
          color: #ffffff;
          margin-top: 12px;
        }
        .giftPrice {
          width: 100px;
          height: 38px;
          position: absolute;
          right: 20px;
          top: 17px;
          background-image: url('https://static.hudongmiao.com/joymewH5/img/gift/priceBox.png');
          background-size: 100% 100%;
          font-size: 24px;
          font-weight: 400;
          color: #ffffff;
          .unit {
            width: 28px;
            height: 21px;
            margin-left: 12px;
          }
        }
      }
    }
  }
  &.zshl {
    .sendBox {
      background-image: url('https://ustatic.joymew.com/joymewMp/zshl/bapin/rcZshlBg.png');
      height: 26vw;
      padding-bottom: 4vw;
      .atHeadImg {
        width: 112px;
        height: 112px;
      }
      .atWrap {
        .atName {
          color: #742e0c;
          font-size: 24px;
        }
        .atInfo {
          color: #ea4f32;
          font-size: 28px;
        }
      }
      .atBtn {
        color: #fffac9;
        font-size: 28px;
        background-image: url('https://ustatic.joymew.com/joymewMp/zshl/bapin/rcBtnBg.png');
        width: 196px;
        height: 84px;
      }
    }
  }
}
</style>
