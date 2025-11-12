<template>
  <transition
    enter-active-class="animated faster zoomIn"
    leave-active-class="animated faster zoomOut"
  >
    <div
      v-show="showAni"
      class="useTip-wrap publicZIndexUseTip"
      ref="useTipWrap"
    >
      <img
        src="@/assets/image/useTip/collectIcon.png"
        class="collectIcon"
      />
      <!-- <div class="qBox publicHvCenter">
        <img
          src="@/assets/image/useTip/qIcon.png"
          class="qIcon"
        />
      </div> -->
      <img
        src="@/assets/image/useTip/qrcodeShare.png"
        class="qrcodeIcon"
      />
      <img
        src="@/assets/image/useTip/giftSendTip.png"
        class="giftSendIcon"
      />
      <img
        v-tap="{ methods: getIt }"
        src="@/assets/image/useTip/getStep.png"
        class="getStepIcon"
      />
    </div>
  </transition>
</template>
<script>
import bgm from '@/assets/constant/audio';
import createjs from 'createjs-cmd';
import { timeoutTask } from '@/utils';
import store from '@/store/index';
import { POPUP_MODULE } from '@/assets/constant/index';

export default {
  name: 'UseTip',
  data() {
    return {
      showAni: false,
    };
  },
  beforeDestroy() {},
  created() {
    this.loadAudioFile();
  },
  mounted() {
    this.showAni = true;
    // timeoutTask(() => {
    //   this.showIconTip();
    // }, 300);
  },
  methods: {
    getIt() {
      this.playAudio();
      this.showAni = false;
      if (store.state.live.sceneType === '0' && store.state.live.identitySwitch && store.state.app.popupModuleKey === -1) {
        store.commit('app/togglePopup', POPUP_MODULE.relativesChooseModule.key);
      }
      timeoutTask(() => {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      }, 500);
    },
    // 加载音频文件
    loadAudioFile() {
      console.log('加载clickStep音频!');
      const loader = new createjs.LoadQueue(true);
      loader.installPlugin(createjs.Sound);
      loader.loadFile({ id: 'clickStep', src: bgm.clickStep });
      loader.on('complete', () => {
        console.log('音频加载成功');
      });
    },
    playAudio() {
      createjs.Sound.play('clickStep');
    },
    showIconTip() {
      const bottomRightCorner = document.querySelector('.bottomRightCorner');
      const qrcodeIcon = document.querySelector('.header .headright-wrap .feedbackAndQrcode .item.qrcode');
      const bottomRightCornerClone = bottomRightCorner.cloneNode(true);
      const qrcodeIconClone = qrcodeIcon.cloneNode(true);
      qrcodeIconClone.style = 'width: 8vw;height: 8vw;position: absolute;top: 25vw;right: 3vw;';
      const { useTipWrap } = this.$refs;
      useTipWrap.appendChild(bottomRightCornerClone);
      useTipWrap.appendChild(qrcodeIconClone);
    },
  },
};
</script>

<style lang="less" scoped>
.useTip-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  .tipBox {
    background-image: url('https://static.hudongmiao.com/joymewH5/img/popupArea/boxTip.png');
    background-size: 100% 100%;
    width: 468px;
    height: 306px;
    position: absolute;
    top: 12px;
    right: 101px;
    padding-top: 50px;
    padding-left: 34px;
    .para {
      font-size: 22px;
      font-weight: 400;
      color: #ffffff;
      margin: 12px 0;
      &:nth-child(1) {
        font-size: 20px;
      }
    }
    .knowBtn {
      width: 100px;
      height: 35px;
      border: 1px solid #ffffff;
      border-radius: 6px;
      position: absolute;
      bottom: 22px;
      right: 83px;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .collectIcon {
    width: 514px;
    height: 260px;
    position: absolute;
    top: 0px;
    left: 104px;
  }
  // .qBox {
  //   position: absolute;
  //   top: 80px;
  //   right: 30px;
  //   width: 60px;
  //   height: 60px;
  //   background-color: #fff;
  //   border-radius: 50%;
  //   .qIcon {
  //     width: 32px;
  //     height: 32px;
  //   }
  // }
  .qrcodeIcon {
    width: 480px;
    height: 300px;
    position: absolute;
    top: 240px;
    right: 24px;
  }
  .nextStepIcon {
    position: absolute;
    width: 298px;
    height: 104px;
    bottom: 254px;
    left: 226px;
  }
  .giftSendIcon {
    width: 516px;
    height: 226px;
    position: absolute;
    right: 100px;
    bottom: 580px;
  }
  .getStepIcon {
    width: 298px;
    height: 104px;
    left: 226px;
    bottom: 254px;
    position: absolute;
  }
}
</style>
