<template>
  <div
    v-show="popupAreaVisible"
    class="popupArea publicZIndexPopupArea"
  >
    <div
      v-tap="{ methods: closePopupModule }"
      class="shade"
    />
    <giftModule
      v-if="giftModuleKey === popupModuleKey"
      ref="giftModule"
    />
    <danmuModule
      v-if="danmuModuleKey === popupModuleKey"
      ref="danmuModule"
    />
    <bapinModule
      v-if="bapinModuleKey === popupModuleKey"
      ref="bapinModule"
    />
    <photoModule
      v-if="photoModuleKey === popupModuleKey"
      ref="photoModule"
    />
    <rechargeModule
      v-if="rechargeModuleKey === popupModuleKey"
      ref="rechargeModule"
    />
    <qrcodeModule
      v-if="qrcodeModuleKey === popupModuleKey"
      ref="qrcodeModule"
    />
    <recommendGiftModule
      v-if="recommendGiftModuleKey === popupModuleKey"
      ref="recommendGiftModule"
    />
    <editInfoModule
      v-if="editInfoModuleKey === popupModuleKey"
      ref="editInfoModule"
    />
    <superDanmuModule
      v-if="superDanmuModuleKey === popupModuleKey"
      ref="superDanmuModule"
    />
    <diamondHbModule
      v-if="diamondHbModuleKey === popupModuleKey"
      ref="diamondHbModule"
    />
    <diamondHbLuckyModule
      v-if="diamondHbLuckyModuleKey === popupModuleKey"
      ref="diamondHbLuckyModule"
    />
    <funcTipModule
      v-if="funcTipModuleKey === popupModuleKey"
      ref="funcTipModule"
    />
    <moreModule
      v-if="moreModuleKey === popupModuleKey"
      ref="moreModule"
    />
    <signHbModule
      v-if="signHbModuleKey === popupModuleKey"
      ref="signHbModule"
    />
    <seatModule
      v-if="seatModuleKey === popupModuleKey"
      ref="seatModule"
    />
    <sendGiftGameModule
      v-if="sendGiftGameModuleKey === popupModuleKey"
      ref="sendGiftGameModule"
    />
    <signRankModule
      v-if="signRankModuleKey === popupModuleKey"
      ref="signRankModule"
    />
    <chooseSongModule
      v-if="chooseSongModuleKey === popupModuleKey"
      ref="chooseSongModule"
    />
    <relativesChooseModule v-if="relativesChooseModuleKey === popupModuleKey" ref="relativesChooseModule"/>
    <lotteryNum v-if="lotteryNumKey === popupModuleKey" ref="lotteryNumModule" />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import giftModule from '@/components/popupModule/gift.vue';
import bapinModule from '@/components/popupModule/bapin.vue';
import danmuModule from '@/components/popupModule/danmu.vue';
import photoModule from '@/components/popupModule/photo.vue';
import rechargeModule from '@/components/popupModule/recharge.vue';
import qrcodeModule from '@/components/popupModule/qrcode.vue';
import recommendGiftModule from '@/components/popupModule/recommendGift.vue';
import editInfoModule from '@/components/popupModule/editInfo.vue';
import superDanmuModule from '@/components/popupModule/superDanmu.vue';
import diamondHbModule from '@/components/popupModule/diamondHb.vue';
import diamondHbLuckyModule from '@/components/popupModule/diamondHbLucky.vue';
import funcTipModule from '@/components/popupModule/funcTip.vue';
import moreModule from '@/components/popupModule/more.vue';
import signHbModule from '@/components/popupModule/signHb.vue';
import seatModule from '@/components/popupModule/seat.vue';
import sendGiftGameModule from '@/components/popupModule/sendGiftGame.vue';
import signRankModule from '@/components/popupModule/signRank.vue';
import chooseSongModule from '@/components/popupModule/chooseSong.vue';
import relativesChooseModule from '@/components/popupModule/relativesChoose.vue';
import lotteryNum from '@/components/popupModule/lotteryNum.vue';
import { POPUP_MODULE } from '@/assets/constant/index';
import { timeoutTask } from '@/utils/index';

let lock = false;
export default {
  name: 'MyPopup',
  computed: {
    ...mapState({
      popupAreaVisible: (state) => state.app.popupAreaVisible,
      popupModuleKey: (state) => state.app.popupModuleKey,
      sceneType: (state) => state.live.sceneType,
      isOpenDiamondHb: (state) => state.live.isOpenDiamondHb,
      inSeatQuery: (state) => state.app.inSeatQuery,
    }),
  },
  watch: {
    popupAreaVisible(newVal) {
      // 是否需要刷新用户信息
      if (this.getNeedRefreshUserStatus(newVal)) {
        localStorage.removeItem('refreshUserInfoFlag');
        this.$store.dispatch('user/refreshUserInfo');
      }
    },
  },
  components: {
    giftModule,
    bapinModule,
    danmuModule,
    photoModule,
    rechargeModule,
    qrcodeModule,
    recommendGiftModule,
    editInfoModule,
    superDanmuModule,
    diamondHbModule,
    diamondHbLuckyModule,
    funcTipModule,
    moreModule,
    signHbModule,
    seatModule,
    sendGiftGameModule,
    signRankModule,
    chooseSongModule,
    relativesChooseModule,
    lotteryNum,
  },
  data() {
    return {
      giftModuleKey: POPUP_MODULE.giftModule.key,
      bapinModuleKey: POPUP_MODULE.bapinModule.key,
      danmuModuleKey: POPUP_MODULE.danmuModule.key,
      photoModuleKey: POPUP_MODULE.photoModule.key,
      rechargeModuleKey: POPUP_MODULE.rechargeModule.key,
      qrcodeModuleKey: POPUP_MODULE.qrcodeModule.key,
      recommendGiftModuleKey: POPUP_MODULE.recommendGiftModule.key,
      editInfoModuleKey: POPUP_MODULE.editInfoModule.key,
      superDanmuModuleKey: POPUP_MODULE.superDanmuModule.key,
      diamondHbModuleKey: POPUP_MODULE.diamondHbModule.key,
      diamondHbLuckyModuleKey: POPUP_MODULE.diamondHbLuckyModule.key,
      funcTipModuleKey: POPUP_MODULE.funcTipModule.key,
      moreModuleKey: POPUP_MODULE.moreModule.key,
      signHbModuleKey: POPUP_MODULE.signHbModule.key,
      seatModuleKey: POPUP_MODULE.seatModule.key,
      sendGiftGameModuleKey: POPUP_MODULE.sendGiftGameModule.key,
      signRankModuleKey: POPUP_MODULE.signRankModule.key,
      chooseSongModuleKey: POPUP_MODULE.chooseSongModule.key,
      relativesChooseModuleKey: POPUP_MODULE.relativesChooseModule.key,
      lotteryNumKey: POPUP_MODULE.lotteryNumModule.key,
    };
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
    }),
    /**
     * 判断是否需要刷新用户信息
     */
    getNeedRefreshUserStatus(popupVisible) {
      return this.$store.state.app.mpType && popupVisible && localStorage.getItem('refreshUserInfoFlag');
    },
    closePopupModule() {
      if (lock) {
        return;
      }
      if (this.isOpenDiamondHb) {
        this.$toast.center('红包开启过程中不能关闭!');
        return;
      }
      if (this.inSeatQuery) {
        console.log('席位查询过程中不能关闭');
        return;
      }
      if (this.sendGiftGameModuleKey === this.popupModuleKey) {
        this.$toast.center('送祝福游戏过程中不能关闭!');
        return;
      }
      lock = true;
      console.log('***closePopupModule***');
      console.log(this.popupModuleKey);
      switch (this.popupModuleKey) {
        case this.giftModuleKey:
          this.$refs.giftModule.hideAniStart();
          break;
        case this.bapinModuleKey:
          this.$refs.bapinModule.hideAniStart();
          break;
        case this.danmuModuleKey:
          this.$refs.danmuModule.hideAniStart();
          break;
        case this.photoModuleKey:
          this.$refs.photoModule.hideAniStart();
          break;
        case this.rechargeModuleKey:
          this.$refs.rechargeModule.hideAniStart();
          break;
        case this.qrcodeModuleKey:
          this.$refs.qrcodeModule.hideAniStart();
          break;
        case this.editInfoModuleKey:
          this.$refs.editInfoModule.hideAniStart();
          break;
        case this.superDanmuModuleKey:
          this.$refs.superDanmuModule.hideAniStart();
          break;
        case this.diamondHbModuleKey:
          this.$refs.diamondHbModule.hideAniStart();
          break;
        case this.diamondHbLuckyModuleKey:
          this.$refs.diamondHbLuckyModule.hideAniStart();
          break;
        case this.moreModuleKey:
          this.$refs.moreModule.hideAniStart();
          break;
        case this.seatModuleKey:
          this.$refs.seatModule.hideAniStart();
          break;
        case this.signRankModuleKey:
          this.$refs.signRankModule.hideAniStart();
          break;
        case this.chooseSongModuleKey:
          this.$refs.chooseSongModule.hideAniStart();
          break;
        case this.relativesChooseModuleKey:
          this.$refs.relativesChooseModule.hideAniStart();
          break;
        default:
          console.log('switch参数异常!');
      }
      timeoutTask(() => {
        this.togglePopup();
        timeoutTask(() => {
          lock = false;
        }, 200);
      }, 200);
    },
  },
};
</script>
<style lang="less" scoped>
.popupArea {
  position: absolute;
  width: 100%;
  height: 100%;
  .shade {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
