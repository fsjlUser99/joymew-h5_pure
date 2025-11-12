<template>
  <transition
    enter-active-class="slideInUp faster animated"
    leave-active-class="slideOutDown faster animated"
  >
    <div
      v-show="isShowAni"
      class="moreModule"
    >
      <div class="moreBox publicVCenter">
        <div class="title">
          更多
        </div>
        <div class="cItem">
          <div class="cTit">
            红包玩法
          </div>
          <div class="dList publicVCenter">
            <div
              v-tap="{ methods: openDiamondHb }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/diamondHb.png"
                class="img1"
              />
              <label>发红包</label>
            </div>
            <div
              v-tap="{ methods: openTip, name: '摇红包' }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/hby.png"
                class="img2"
              />
              <label>摇红包</label>
            </div>
            <div
              v-tap="{ methods: openTip, name: '点红包' }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/clickHb.png"
                class="img3"
              />
              <label>点红包</label>
            </div>
            <div
              v-tap="{ methods: openTip, name: '猜红包' }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/guessHb.png"
                class="img4"
              />
              <label>猜红包</label>
            </div>
            <div
              v-tap="{ methods: openTip, name: '红包墙' }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/hbWall.png"
                class="img5"
              />
              <label>红包墙</label>
            </div>
          </div>
        </div>
        <div class="cItem">
          <div class="cTit">
            互动玩法
          </div>
          <div class="dList publicVCenter">
            <div
              v-tap="{ methods: toPhotoWall }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/photoWall.png"
                class="img6"
              />
              <label>照片墙</label>
            </div>
            <div
              v-tap="{ methods: openTip, name: '数钞票' }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/countMoney.png"
                class="img7"
              />
              <label>数钞票</label>
            </div>
            <div
              v-tap="{ methods: openTip, name: '追新娘' }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/husWife.png"
                class="img8"
              />
              <label>追新娘</label>
            </div>
            <div
              v-tap="{ methods: openTip, name: '抽奖' }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/lottery.png"
                class="img9"
              />
              <label>抽奖</label>
            </div>
            <div
              v-tap="{ methods: openTip, name: '切水果' }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/cutFruit.png"
                class="img10"
              />
              <label>切水果</label>
            </div>
            <div
              v-tap="{ methods: openTip, name: '开宝箱' }"
              class="dItem publicVCenter"
            >
              <img
                src="@/assets/image/more/kbx.png"
                class="img11"
              />
              <label>开宝箱</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations } from 'vuex';
import { POPUP_MODULE } from '@/assets/constant/index';
import { timeoutTask } from '@/utils';
import wxApi from '@/utils/wxApi';

export default {
  name: 'MorePopup',
  data() {
    return {
      isShowAni: false,
      giftModuleKey: POPUP_MODULE.giftModule.key,
    };
  },
  beforeDestroy() {},
  created() {},
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
      setGiftNavId: 'live/setGiftNavId',
    }),
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    closePopupModule() {
      this.hideAniStart();
      timeoutTask(() => {
        this.togglePopup();
      }, 200);
    },
    toPhotoWall() {
      console.log('/pages/photoWall/photoWall');
      _hmt.push(['_trackEvent', '更多', '点击', '点击爱心照片墙']);
      wxApi.navigateTo('/pages/photoWall/photoWall');
    },
    openDiamondHb() {
      this.closePopupModule();
      timeoutTask(() => {
        this.setGiftNavId('sendHb');
        this.togglePopup(this.giftModuleKey);
      }, 500);
    },
    openTip(e) {
      this.$toast.center(`请等待大屏开启${e.name}!`);
    },
  },
};
</script>
<style lang="less" scoped>
.moreModule {
  position: absolute;
  width: 100%;
  bottom: 0;
  .moreBox {
    width: 750px;
    height: 644px;
    flex-direction: column;
    background: #000000;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding-top: 16px;
    .title {
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 38px;
    }
    .cItem {
      padding: 0 32px;
      margin-bottom: 56px;
      width: 100%;
      .cTit {
        font-size: 28px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
      }
      .dList {
        margin-top: 34px;
        justify-content: space-between;
        width: 100%;
        .dItem {
          flex-direction: column;
          height: 128px;
          justify-content: space-between;
          position: relative;
          label {
            font-size: 24px;
            color: #ffffff;
          }
          .img1 {
            width: 76px;
            height: 78px;
          }
          .img2 {
            width: 58px;
            height: 67px;
          }
          .img3 {
            width: 62px;
            height: 72px;
          }
          .img4 {
            width: 80px;
            height: 42px;
            margin-top: 2vw;
          }
          .img5 {
            width: 53px;
            height: 64px;
          }
          .img6 {
            width: 90px;
            height: 80px;
          }
          .img7 {
            width: 80px;
            height: 36px;
            margin-top: 3vw;
          }
          .img8 {
            width: 65px;
            height: 80px;
          }
          .img9 {
            width: 64px;
            height: 64px;
          }
          .img10 {
            width: 80px;
            height: 41px;
            margin-top: 3vw;
          }
          .img11 {
            width: 64px;
            height: 66px;
          }
        }
      }
    }
  }
}
</style>
