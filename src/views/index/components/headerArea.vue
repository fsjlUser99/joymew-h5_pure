<template>
  <div class="header publicZIndexHeader">
    <div class="topBroadWrap publicHCenter">
      <div
        v-if="broadMessageVisible"
        class="broadBox publicVCenter"
      >
        <img
          src="@/assets/image/hd2/laba.png"
          class="broadIcon"
        />
        <div
          ref="broadContainer"
          class="broadTextContainer"
        >
          <!-- 内容区域 -->
          <div
            ref="broadText"
            class="broadTextArea"
            :style="{
              transform: 'translateX(' + broadMoveDistance + 'px)',
              transition: 'transform ' + broadMoveDuration + 's linear',
            }"
            @transitionend="onBroadTransitionEnd"
          >
            <div
              v-for="item in broadMessageList"
              :key="item.id"
              ref="broadTextItem"
              class="broadTextItem"
            >
              <label class="nickname">{{ item.nickname }}</label>
              {{ item.action }}
              <label class="giftname">{{ item.giftname }}</label>
              {{ item.gifttype }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="headleft-wrap">
      <!-- 个人中心入口 -->
      <div
        class="myEntry publicVCenter"
        v-tap="{ methods: toUserCenter }"
      >
        <img
          :src="headImg"
          class="headImg"
        />
        <div class="info">
          <div class="nickname">{{ name }}</div>
          <div class="otinfo publicVCenter">
            <div
              class="relative"
              v-if="relativeTypeText"
              :class="{ male: relativeType.startsWith('1-'), female: relativeType.startsWith('2-') }"
            >
              {{ relativeTypeText }}
            </div>
            <div class="rank-info">
              祝福榜第
              <span>{{ myRankNum }}</span>
              名
            </div>
          </div>
        </div>
      </div>
      <!-- 中奖信息和亲友团 -->
      <div class="prizeAndRelative publicVCenter">
        <div
          class="item prize publicVCenter"
          v-if="!isTql && env === 'miniProgram'"
          v-tap="{ methods: toWinningRecord }"
        >
          中奖信息
        </div>
        <div
          class="item relative publicVCenter"
          v-if="identitySwitch && sceneType === '0'"
          v-tap="{ methods: openPopupModule, key: relativesChooseModuleKey }"
        >
          亲友团
        </div>
      </div>
      <!-- 广告入口 -->
      <div
        class="outer-ad"
        v-if="adVisible"
        v-tap="{ methods: toAd }"
      >
        <img src="https://ustatic.hudongmiao.com/joymewH5/img/ad/fuli-hb.png" />
      </div>
    </div>
    <div class="headright-wrap">
      <!-- 签到排名入口 -->
      <div
        v-if="signRankListSize > 0 && (miniProgramType || mpType)"
        v-tap="{ methods: toSignRank }"
        class="signRankEntry publicVCenter"
      >
        <div
          class="sinavatar-topthree-box publicHvCenter"
          v-for="(item, index) in signRankListTopThree"
          :key="index"
        >
          <img
            :src="item.avator"
            class="signavatar-topthree"
          />
          <div class="num">{{ index + 1 }}</div>
        </div>
        <div class="sign-num publicHvCenter">
          {{ signRankListSizeStr }}
        </div>
      </div>
      <!-- 反馈和二维码入口 -->
      <div class="feedbackAndQrcode publicVCenter">
        <div
          class="item feedback"
          v-tap="{ methods: toFeedBack }"
          v-if="vip_add_recharge"
        />
        <div
          class="item qrcode"
          v-tap="{ methods: openPopupModule, key: qrcodeModuleKey }"
        />
        <!-- 送祝福抽奖入口 -->
        <div
          class="item lottery"
          @click="toSendGiftLottery"
          v-if="sendGiftLotteryEntryVisible"
        />
      </div>
      <!-- 伴郎伴娘-->
      <div
        class="blbn"
        @click="toBlBn"
        v-if="isBrideVote && sceneType === '0'"
      />
      <!-- 喵钻红包 -->
      <div
        v-tap="{ methods: openPopupModule, key: diamondHbModuleKey }"
        class="diamondHb publicVCenter"
        :class="headDiamondHb.status === 1 ? 'animated infinite swing' : ''"
        v-if="diamondHbQueue.length > 0"
      >
        <div class="hbNum publicHvCenter">
          {{ diamondHbQueue.length }}
        </div>
        <div
          v-if="headDiamondHb && headDiamondHb.status === 0"
          class="diamondAvator publicHvCenter"
        >
          <img :src="headDiamondHb.avator" />
        </div>
        <div
          v-if="headDiamondHb.status === 0"
          class="countDown"
        >
          {{ headDiamondHb.hbCd }}
        </div>
        <div
          v-if="headDiamondHb.status === 1"
          class="openBtn publicHvCenter"
        >
          开
        </div>
      </div>
      <!-- 席位表-->
      <transition
        enter-active-class="slideInLeft faster animated"
        leave-active-class="slideOutLeft faster animated"
      >
        <div
          v-tap="{ methods: openPopupModule, key: seatModuleKey }"
          v-if="seatSwitch"
          class="seatEntry publicHvCenter"
        >
          {{ seatMyDisplay }}
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { getFloatGiftList } from '@/api/index/index';
import { POPUP_MODULE } from '@/assets/constant/index';
import { generateRandomId, timeoutTask } from '@/utils/index';
import { getPopModuleByKey } from '@/utils/service';
import wxApi from '@/utils/wxApi';
// import { Swipe, SwipeItem } from 'vue-swipe';
import { mapGetters, mapMutations, mapState } from 'vuex';

let broadSrollLock = false;

export default {
  name: 'MyHeader',
  computed: {
    ...mapState({
      name: (state) => state.user.name,
      headImg: (state) => state.user.headImg,
      rechargeList: (state) => state.live.rechargeList,
      sceneType: (state) => state.live.sceneType,
      isVipHeadBoxGetted: (state) => state.user.isVipHeadBoxGetted,
      vipLevel: (state) => state.user.vipLevel,
      relativeType: (state) => state.user.relativeType,
      currentStatus: (state) => state.user.currentStatus,
      deskNum: (state) => state.user.deskNum,
      editUserInfoPrice: (state) => state.app.editUserInfoPrice,
      diamondHbQueue: (state) => state.live.diamondHbQueue,
      isExamineLive: (state) => state.live.isExamineLive,
      env: (state) => state.app.env,
      loadingVisible: (state) => state.app.loadingVisible,
      isCloseCoin: (state) => state.app.isCloseCoin,
      seatSwitch: (state) => state.live.seatSwitch,
      seatMy: (state) => state.live.seatMy,
      miniProgramType: (state) => state.app.miniProgramType,
      mpType: (state) => state.app.mpType,
      vip_add_recharge: (state) => state.user.vip_add_recharge,
      isBrideVote: (state) => state.app.isBrideVote,
      signRankListSize: (state) => state.live.signRankListSize,
      myRankNum: (state) => state.live.myRankNum,
      isForbidBuyHbq: (state) => state.user.isForbidBuyHbq,
      isLocationInvalid: (state) => state.live.isLocationInvalid,
      identitySwitch: (state) => state.live.identitySwitch,
      sendGiftLotterySwitch: (state) => state.live.sendGiftLotterySwitch,
    }),
    ...mapGetters({
      isTql: 'user/isTql',
      signRankListTopThree: 'live/signRankListTopThree',
      relativeTypeText: 'user/relativeTypeText',
    }),
    headDiamondHb() {
      let tHeadDiamondHb = {
        id: '',
        diamondNum: 0,
        wx_name: '',
        avator: '',
        startTime: '',
        hbCd: '',
        status: 0,
      };
      if (this.diamondHbQueue[0]) {
        [tHeadDiamondHb] = this.diamondHbQueue;
      }
      return tHeadDiamondHb;
    },
    seatMyDisplay() {
      return this.seatMy ? this.seatMy : '空';
    },
    broadMessageVisible() {
      return this.broadMessageList.length > 0;
    },
    qrcodePath() {
      let tmpPath = 'https://static.hudongmiao.com/joymewH5/img/qrcodeIcon.png';
      if (this.sceneType === '1') {
        tmpPath = 'https://static.hudongmiao.com/joymewH5/img/enterprise/qrcodeIcon.png';
      } else if (this.sceneType === '91') {
        tmpPath = 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/qc.png';
      }
      return tmpPath;
    },
    signRankListSizeStr() {
      return this.signRankListSize > 99 ? '99+' : this.signRankListSize;
    },
    /**
     * 送礼物入口可见性
     * 开关打开&&互动小程序环境&&不是免费发礼物&&可以发礼物
     */
    sendGiftLotteryEntryVisible() {
      const isFreeSendGift = this.$store.state.user.freeSendGift || this.$store.state.live.allFreeSendGift;
      const canSendGift = this.$store.state.app.giftSendVisible;
      const isHd = ['haimao', 'ledong', 'haimiao'].includes(this.$store.state.app.mpType);
      return this.sendGiftLotterySwitch && isHd && !isFreeSendGift && canSendGift;
    },
    /**
     * 广告可见性
     */
    adVisible() {
      return ['haimao', 'haimiao'].includes(this.mpType) && this.$store.state.app.switchFuligoAd;
    },
  },
  watch: {
    broadMessageVisible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.broadScrollDistance = this.getBroadScrollDistance();
          this.scrollBroadText();
        });
      }
    },
  },
  data() {
    return {
      qrcodeModuleKey: POPUP_MODULE.qrcodeModule.key,
      diamondHbModuleKey: POPUP_MODULE.diamondHbModule.key,
      moreModuleKey: POPUP_MODULE.moreModule.key,
      seatModuleKey: POPUP_MODULE.seatModule.key,
      sendGiftGameModuleKey: POPUP_MODULE.sendGiftGameModule.key,
      relativesChooseModuleKey: POPUP_MODULE.relativesChooseModule.key,
      broadMoveDistance: 0,
      broadMoveDuration: 0,
      broadMessageList: [],
    };
  },
  created() {
    broadSrollLock = false;
    this.getFloatDanmuList();
  },
  mounted() {},
  beforeDestroy() {
    broadSrollLock = true;
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
      updateDiamondHbCdp: 'live/updateDiamondHbCdp',
    }),
    toBlBn() {
      if (this.isForbidBuyHbq) {
        // this.$toast.center('系统繁忙!');
        return;
      }
      if (this.isLocationInvalid) {
        this.$toast.center(this.$store.state.live.locationInvalidReason);
        return;
      }
      _hmt.push(['_trackEvent', '顶部区域', '点击', '伴郎伴娘']);
      const splid = this.$store.state.live.liveId;
      wxApi.navigateTo(`/pages/share/vote/vote?splid=${splid}`);
    },
    toFeedBack() {
      if (this.env === 'miniProgram') {
        _hmt.push(['_trackEvent', '顶部区域', '点击', '客服反馈']);
        this.judgeMpTypeThenToFeedback();
      } else if (this.env === 'h5') {
        this.$router.push({
          path: '/feedback',
        });
      }
    },
    judgeMpTypeThenToFeedback() {
      if (this.mpType) {
        wxApi.navigateTo('/packageC/pages/feedback/feedback');
      } else {
        wxApi.navigateTo('/pages/feedback/feedback');
      }
    },
    toUserCenter() {
      if (this.isForbidBuyHbq) {
        // this.$toast.center('系统繁忙!');
        return;
      }
      if (this.isLocationInvalid) {
        this.$toast.center(this.$store.state.live.locationInvalidReason);
        return;
      }
      if (this.env === 'miniProgram') {
        _hmt.push(['_trackEvent', '顶部区域', '点击', '进入个人中心']);
        wxApi.tmpNavigateTo('recharge', {
          openId: this.$store.state.user.openId,
          userId: this.$store.state.user.userId,
          money: this.$store.state.user.money,
          rechargeListStr: this.rechargeList,
          name: this.name,
          headImg: this.headImg,
          relativeType: this.relativeType,
          deskNum: this.deskNum,
          currentStatus: this.currentStatus,
          editUserInfoPrice: this.editUserInfoPrice,
          isCloseCoin: this.isCloseCoin,
          vipLevel: this.vipLevel,
        });
      } else if (this.env === 'h5') {
        if (this.sceneType === '0') {
          this.$router.push({
            path: '/rechargeWedding',
          });
        } else {
          this.$router.push({
            path: '/rechargeOther',
          });
        }
      } else if (this.env === 'tt') {
        if (this.sceneType === '0' && !this.isTql) {
          wxApi.navigateToTt(
            `/pages/recharge2/recharge2?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&money=${this.$store.state.user.money}&rechargeListStr=${this.rechargeList}&name=${this.name}&headImg=${this.headImg}&isVipHeadBoxGetted=${this.isVipHeadBoxGetted}&relativeType=${this.relativeType}&vipLevel=${this.vipLevel}&deskNum=${this.deskNum}&currentStatus=${this.currentStatus}&editUserInfoPrice=${this.editUserInfoPrice}`,
          );
          console.log(
            `/pages/recharge2/recharge2?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&money=${this.$store.state.user.money}&rechargeListStr=${this.rechargeList}&name=${this.name}&headImg=${this.headImg}&isVipHeadBoxGetted=${this.isVipHeadBoxGetted}&relativeType=${this.relativeType}&vipLevel=${this.vipLevel}&deskNum=${this.deskNum}&currentStatus=${this.currentStatus}&editUserInfoPrice=${this.editUserInfoPrice}`,
          );
        } else {
          wxApi.navigateToTt(
            `/pages/recharge/recharge?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&money=${this.$store.state.user.money}&rechargeListStr=${this.rechargeList}&name=${this.name}&headImg=${this.headImg}&isVipHeadBoxGetted=${this.isVipHeadBoxGetted}&relativeType=${this.relativeType}&vipLevel=${this.vipLevel}&deskNum=${this.deskNum}&currentStatus=${this.currentStatus}&editUserInfoPrice=${this.editUserInfoPrice}`,
          );
          console.log(
            `/pages/recharge/recharge?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&money=${this.$store.state.user.money}&rechargeListStr=${this.rechargeList}&name=${this.name}&headImg=${this.headImg}&isVipHeadBoxGetted=${this.isVipHeadBoxGetted}&relativeType=${this.relativeType}&vipLevel=${this.vipLevel}&deskNum=${this.deskNum}&currentStatus=${this.currentStatus}&editUserInfoPrice=${this.editUserInfoPrice}`,
          );
        }
      }
    },
    toWinningRecord() {
      if (this.env === 'miniProgram') {
        _hmt.push(['_trackEvent', '顶部区域', '点击', '查看抽奖中奖结果']);
        this.jumpMpTypeThenToWinningRecord();
      }
    },
    jumpMpTypeThenToWinningRecord() {
      if (this.mpType) {
        wxApi.navigateTo('/packageB/pages/winningRecord/winningRecord');
      } else {
        wxApi.navigateTo('/pages/winningRecord/winningRecord');
      }
    },
    toSignRank() {
      if (this.env === 'miniProgram') {
        _hmt.push(['_trackEvent', '顶部区域', '点击', '查看送祝福排名']);
        wxApi.navigateTo(`/packageA/pages/wishRank/wishRank?userId=${this.$store.state.user.userId}`);
      }
    },
    openPopupModule(e) {
      if (this.isForbidBuyHbq) {
        // this.$toast.center('系统繁忙!');
        return;
      }
      if (this.isLocationInvalid) {
        this.$toast.center(this.$store.state.live.locationInvalidReason);
        return;
      }
      const tmpPopModuleObj = getPopModuleByKey(e.key);
      const keyName = tmpPopModuleObj ? tmpPopModuleObj.name : e.key;
      _hmt.push(['_trackEvent', '顶部区域', '点击', `点击${keyName}`]);
      if (e.key === this.diamondHbModuleKey) {
        // 喵钻红包弹出层出现前需要更新喵钻红包信息
        this.updateDiamondHbCdp();
      }
      this.togglePopup(e.key);
    },
    getBroadScrollDistance() {
      const broadContainerDom = this.$refs.broadContainer;
      const broadContainerWidth = broadContainerDom.offsetWidth;
      let broadTotalWidth = 0;
      this.$refs.broadTextItem.forEach((item) => {
        broadTotalWidth += item.offsetWidth;
      });
      return broadTotalWidth - broadContainerWidth;
    },
    scrollBroadText() {
      if (broadSrollLock) {
        return;
      }
      if (this.broadScrollDistance <= 32) {
        return;
      }
      this.broadMoveDistance = -(this.broadScrollDistance + 100);
      this.broadMoveDuration = this.broadScrollDistance / 50;
    },
    onBroadTransitionEnd() {
      this.broadMoveDistance = 0;
      this.broadMoveDuration = 0;
      timeoutTask(() => {
        this.scrollBroadText();
      }, 3000);
    },
    getFloatDanmuList() {
      getFloatGiftList()
        .then((res) => {
          console.log(res);
          const tmpGiftList = res.giftList.map((item) => ({
            id: generateRandomId(),
            nickname: item.wx_name,
            action: '送来了',
            giftname: item.giftname,
            gifttype: '祝福',
          }));
          const tmpHbkdList = res.hbkdList.map((item) => ({
            id: generateRandomId(),
            nickname: item.wx_name,
            action: '在奖池里投了现金红包',
            giftname: item.allGold,
            gifttype: '元',
          }));
          const tmpHeartList = res.heartList.map((item) => ({
            id: generateRandomId(),
            nickname: item.wx_name,
            action: '送来了',
            giftname: item.giftname,
            gifttype: '祝福弹幕',
          }));
          this.broadMessageList = tmpGiftList.concat(tmpHbkdList).concat(tmpHeartList).slice(0, 30);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toSendGiftLottery() {
      wxApi.navigateTo('/packageB/pages/sendGiftLottery/index');
    },
    toAd() {
      // const OUTERLINK =
      //   'https://engine.nqwlkj.cn/index/activity?appKey=B3qXgTY7iwBJeUUiCXpLtWMKxvE&adslotId=470634&uk_a1=__IMEI__&uk_a2=__IMEI2__&uk_a3=__MUID__&uk_b1=__IDFA__&uk_b2=__IDFA2__&uk_c1=__OAID__&uk_c2=__OAID2__';
      const OUTERLINK = this.$store.state.app.switchFuligoAdUrl;
      wxApi.navigateTo(`/packageC/pages/outerLink/outerLink?link=${encodeURIComponent(OUTERLINK)}`);
    },
  },
};
</script>
<style lang="less" scoped>
@import 'vue-swipe/dist/vue-swipe.css';

.header {
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 80px 24px 0 24px;
  .topBroadWrap {
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    .broadBox {
      width: 100%;
      height: 40px;
      background: rgba(0, 0, 0, 0.2);
      .broadIcon {
        width: 16px;
        height: 16px;
        margin: 0 16px;
      }
      .broadTextContainer {
        width: 666px;
        overflow: hidden;
        .broadTextArea {
          display: flex;
          flex-wrap: nowrap;
          gap: 20px;
          .broadTextItem {
            font-size: 20px;
            font-weight: 400;
            flex-shrink: 0;
            color: #ffffff;
            .nickname {
              color: #ffec44;
            }
            .giftname {
              color: #ff4b8c;
            }
          }
        }
      }
    }
  }
  .headleft-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    .myEntry {
      height: 80px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 94px;
      padding: 0 28px 0 4px;
      .headImg {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .info {
        color: #ffffff;
        font-weight: 400;
        .nickname {
          width: 162px;
          font-size: 24px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .otinfo {
          margin-top: 10px;
          .relative {
            padding: 4px 8px;
            font-size: 14px;
            border-radius: 18px;
            display: inline-block;
            margin-right: 6px;
            &.male {
              background: linear-gradient(266deg, #31a3fd 0%, #565ef5 100%);
            }
            &.female {
              background-color: #f34c91;
            }
          }
          .rank-info {
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            span {
              color: #ff4b8c;
            }
          }
        }
      }
    }
    .prizeAndRelative {
      margin-top: 22px;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
      .item {
        background-size: 100% 100%;
        width: 140px;
        height: 56px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 58px;
        padding: 0 12px;
        white-space: nowrap;
        &.prize {
          margin-right: 24px;
          &::before {
            content: '';
            display: inline-block;
            width: 36px;
            height: 36px;
            background-size: 100% 100%;
            background-image: url('https://ustatic.joymew.com/joymewH5/img/icons/prizebIcon.png');
            margin-right: 5px;
          }
        }
        &.relative {
          &::before {
            content: '';
            display: inline-block;
            width: 32px;
            height: 32px;
            background-size: 100% 100%;
            background-image: url('https://ustatic.joymew.com/joymewH5/img/icons/qyTIcon.png');
            margin-right: 14px;
          }
        }
      }
    }
    .outer-ad {
      img {
        width: 78px;
        height: 78px;
      }
    }
  }
  .headright-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    .signRankEntry {
      gap: 8px;
      position: relative;
      .sinavatar-topthree-box {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        position: relative;
        .signavatar-topthree {
          width: 94%;
          height: 94%;
          border-radius: 50%;
        }
        .num {
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 44px;
          height: 20px;
          border-radius: 36px;
          color: #fff;
          font-size: 16px;
          text-align: center;
          line-height: 20px;
        }
        &:nth-child(1) {
          background-color: #ff496e;
          .num {
            background-color: #ff496e;
          }
        }
        &:nth-child(2) {
          background-color: #e77131;
          .num {
            background-color: #e77131;
          }
        }
        &:nth-child(3) {
          background-color: #e8b643;
          .num {
            background-color: #e8b643;
          }
        }
      }
      .sign-num {
        min-width: 80px;
        height: 56px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 102px;
        font-size: 28px;
        font-weight: 400;
        color: #ffffff;
        padding: 0 20px;
      }
      &::before {
        content: '祝福榜';
        display: block;
        width: 32px;
        height: 72px;
        background: #ff496e;
        border-radius: 38px;
        font-size: 16px;
        color: #fff;
        position: absolute;
        left: -46px;
        top: 50%;
        transform: translateY(-50%);
        writing-mode: vertical-rl;
        text-orientation: upright;
        text-align: center;
        line-height: 36px;
      }
    }
    .feedbackAndQrcode {
      margin-top: 32px;
      column-gap: 20px;
      .item {
        width: 60px;
        height: 60px;
        background-size: 100% 100%;
        &.feedback {
          background-image: url('https://ustatic.joymew.com/joymewH5/img/icons/feedbackIcon.png');
        }
        &.qrcode {
          background-image: url('https://ustatic.joymew.com/joymewH5/img/icons/qrcodeIcon.png');
        }
        &.lottery {
          background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/lucky.png');
        }
      }
    }
    .blbn {
      width: 90px;
      height: 90px;
      background-image: url('~@/assets/image/vote/voteBride.png');
      background-size: 100% 100%;
    }
    .diamondHb {
      position: relative;
      width: 60px;
      height: 80px;
      background-image: url('../../../assets/image/diamondHb/miniHbBg.png');
      background-size: 100% 100%;
      flex-direction: column;

      .hbNum {
        border-radius: 50%;
        background-color: #ffec6c;
        font-size: 12px;
        font-weight: 400;
        color: rgba(168, 7, 53, 1);
        position: absolute;
        top: -18px;
        right: -18px;
        min-width: 28px;
        min-height: 28px;
      }

      .diamondAvator {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid #ffec6c;
        position: absolute;
        top: 2px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .countDown {
        font-size: 18px;
        color: #ffec6c;
        position: absolute;
        bottom: 6px;
        font-weight: 400;
      }

      .openBtn {
        position: absolute;
        top: 20px;
        width: 36px;
        height: 36px;
        background: #f5f4d9;
        color: #ca2e1b;
        border-radius: 50%;
        font-size: 18px;
      }
    }
    .seatEntry {
      position: relative;
      right: -32px;
      width: 142px;
      height: 58px;
      background-color: #429041;
      color: #ffffff;
      font-size: 28px;
      font-weight: 500;
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
    }
    .sendGiftLotteryEntry {
      position: relative;
      right: -32px;
      width: 142px;
      height: 58px;
      background-color: rgba(0, 0, 0, 0.8);
      color: #ffffff;
      font-size: 28px;
      font-weight: 500;
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
    }
  }
}
</style>
