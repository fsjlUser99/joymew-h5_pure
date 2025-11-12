<template>
  <transition
    enter-active-class="animated faster fadeIn"
    leave-active-class="animated faster fadeOut"
  >
    <div
      v-show="isShowAni"
      class="lotteryNumModule"
    >
      <div class="tip textCenter">恭喜您已获得抽奖次数</div>
      <div class="num textCenter">x{{ sendGiftLotteryNum }}</div>
      <div
        class="btn textCenter"
        @click="toLottery"
      >
        立即去抽奖
      </div>
      <img
        src="@/assets/image/icon/closeIcon.png"
        class="closeIcon"
        @click="togglePopup"
      />
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import wxApi from '@/utils/wxApi';
//   import { POPUP_MODULE } from '@/assets/constant/index';

export default {
  name: 'LotteryNum',
  data() {
    return {
      isShowAni: false,
    };
  },
  computed: {
    ...mapState({
      sendGiftLotteryNum: (state) => state.live.sendGiftLotteryNum,
    }),
  },
  created() {},
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
    }),
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    toLottery() {
      wxApi.navigateTo(
        '/packageB/pages/sendGiftLottery/index',
      );
      this.togglePopup();
    },
  },
};
</script>
<style lang="less" scoped>
.textCenter {
  text-align: center;
}
.lotteryNumModule {
  position: absolute;
  width: 628px;
  height: 690px;
  left: 58px;
  top: 50%;
  margin-top: -345px;
  background-size: 100% 100%;
  background-image: url('https://ustatic.hudongmiao.com/%20miao/lotteryNumBox_compressed.png');
  font-weight: 500;
  color: #ff2a2a;
  padding-top: 212px;

  .tip {
    font-size: 40px;
  }
  .num {
    font-size: 92px;
    margin-top: 10px;
  }
  .btn {
    width: 350px;
    height: 105px;
    margin: 0 auto;
    margin-top: 130px;
    font-size: 46px;
    line-height: 105px;
    color: #fff;
  }
  .closeIcon {
    width: 68px;
    height: 68px;
    position: absolute;
    bottom: -120px;
    left: 50%;
    margin-left: -34px;
  }
}
</style>
