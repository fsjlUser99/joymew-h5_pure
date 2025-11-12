<template>
  <transition
    enter-active-class="animated faster zoomIn"
    leave-active-class="animated faster zoomOut"
  >
    <div
      class="funcTip-wrap publicZIndexUseTip"
      :class="{ zshl: sceneType === '91' }"
    >
      <template v-if="sceneType !== '91'">
        <div
          v-show="funcTipIndex === 0"
          class="modItem"
        >
          <div
            v-tap="{ methods: openMod, key: giftModuleKey }"
            class="sendBtn"
          />
          <img
            src="@/assets/image/funcTip/giftIcon.png"
            class="giftIcon"
          />
          <img
            src="@/assets/image/funcTip/giftText.png"
            class="giftText"
          />
          <img
            src="@/assets/image/funcTip/arrow.png"
            class="arrowIcon"
          />
        </div>
        <div
          v-show="funcTipIndex === 1"
          class="modItem"
        >
          <div
            v-tap="{ methods: openMod, key: bapinModuleKey }"
            class="sendBtn bapin"
          />
          <img
            src="@/assets/image/funcTip/bapinIcon.png"
            class="bapinIcon"
          />
          <img
            src="@/assets/image/funcTip/bapinText.png"
            class="bapinText"
          />
          <img
            src="@/assets/image/funcTip/arrow.png"
            class="arrowIcon bapin"
          />
        </div>
        <div
          v-show="funcTipIndex === 2"
          class="modItem"
        >
          <div
            v-tap="{ methods: openMod, key: photoModuleKey }"
            class="sendBtn photo"
          />
          <img
            src="@/assets/image/funcTip/photoIcon.png"
            class="photoIcon"
          />
          <img
            src="@/assets/image/funcTip/photoText.png"
            class="photoText"
          />
          <img
            src="@/assets/image/funcTip/arrow.png"
            class="arrowIcon photo"
          />
        </div>
        <div
          v-show="funcTipIndex === 3"
          class="modItem"
        >
          <div
            v-tap="{ methods: openMod, key: superDanmuModuleKey }"
            class="sendBtn superBapin"
          />
          <img
            src="@/assets/image/funcTip/superBapinIcon.png"
            class="superBapinIcon"
          />
          <img
            src="@/assets/image/funcTip/superBapinText.png"
            class="superBapinText"
          />
          <img
            src="@/assets/image/funcTip/arrowDown.png"
            class="arrowDownIcon"
          />
        </div>
        <div
          v-show="funcTipIndex === 4"
          class="modItem"
        >
          <div
            v-tap="{ methods: openMod, key: danmuModuleKey }"
            class="sendBtn danmu"
          />
          <img
            src="@/assets/image/funcTip/danmuIcon.png"
            class="danmuIcon"
          />
          <img
            src="@/assets/image/funcTip/danmuText.png"
            class="danmuText"
          />
          <img
            src="@/assets/image/funcTip/arrowDown.png"
            class="arrowDownIcon danmu"
          />
        </div>
      </template>
      <template v-if="sceneType === '91'">
        <div
          class="modItem"
          :class="`step${funcTipIndex}`"
        >
          <div class="operateBtn" v-tap="{ methods: openModZshl }">{{ operateText }}</div>
          <div
            class="guideTip"
            v-html="guideTip"
          />
          <img
            :src="guideCtImg"
            class="ctImg"
          />
        </div>
      </template>
    </div>
  </transition>
</template>
<script>
import { timeoutTask } from '@/utils';
import { mapMutations, mapState } from 'vuex';
import { POPUP_MODULE } from '@/assets/constant/index';

const FUNCTIP_CTS = [
  {
    operateText: '送祝福',
    guideTip: '送个新婚祝福吧~',
    guideCtImg: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/giftSendEntry.png',
  },
  {
    operateText: '送横幅',
    guideTip: '祝福横幅高高挂<br/>礼炮齐鸣贺新婚',
    guideCtImg: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/zfhfIconEtry.png',
  },
  {
    operateText: '发送合影',
    guideTip: '晒晒你和新人的合影吧~',
    guideCtImg: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/photoIcon.png',
  },
  {
    operateText: '发送全屏特效',
    guideTip: '承包整个大屏祝福<br/>你就是万众瞩目的焦点',
    guideCtImg: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/allScreenIcon.png',
  },
  {
    operateText: '发送祥瑞弹幕',
    guideTip: '承载着幸福的弹幕哦~',
    guideCtImg: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/zsdm.png',
  },
];

export default {
  name: 'FuncTip',
  data() {
    return {
      giftModuleKey: POPUP_MODULE.giftModule.key,
      bapinModuleKey: POPUP_MODULE.bapinModule.key,
      photoModuleKey: POPUP_MODULE.photoModule.key,
      superDanmuModuleKey: POPUP_MODULE.superDanmuModule.key,
      danmuModuleKey: POPUP_MODULE.danmuModule.key,
    };
  },
  computed: {
    ...mapState({
      funcTipIndex: (state) => state.app.funcTipIndex,
      sceneType: (state) => state.live.sceneType,
    }),
    operateText() {
      return FUNCTIP_CTS[this.funcTipIndex].operateText;
    },
    guideTip() {
      return FUNCTIP_CTS[this.funcTipIndex].guideTip;
    },
    guideCtImg() {
      return FUNCTIP_CTS[this.funcTipIndex].guideCtImg;
    },
  },
  beforeDestroy() {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
    }),
    openMod(e) {
      this.togglePopup();
      timeoutTask(() => {
        this.togglePopup(e.key);
      }, 200);
    },
    getTargetKeyByFuncTipIndex() {
      const indexMapKey = [this.giftModuleKey, this.bapinModuleKey, this.photoModuleKey, this.superDanmuModuleKey, this.danmuModuleKey];
      return indexMapKey[this.funcTipIndex];
    },
    openModZshl() {
      this.togglePopup();
      timeoutTask(() => {
        const targetKey = this.getTargetKeyByFuncTipIndex();
        this.togglePopup(targetKey);
      }, 200);
    },
  },
};
</script>

<style lang="less" scoped>
.funcTip-wrap {
  .modItem {
    .sendBtn {
      position: absolute;
      left: 176px;
      bottom: 82px;
      width: 400px;
      height: 136px;
      background-image: url('../../assets/image/funcTip/giftSendBtn.png');
      background-size: 100% 100%;
      &.bapin {
        background-image: url('../../assets/image/funcTip/bapinSendBtn.png');
      }
      &.photo {
        background-image: url('../../assets/image/funcTip/photoSendBtn.png');
      }
      &.superBapin {
        bottom: 480px;
        background-image: url('../../assets/image/funcTip/superBapinBtn.png');
      }
      &.danmu {
        bottom: 480px;
        background-image: url('../../assets/image/funcTip/danmuSendIcon.png');
      }
    }
    .giftIcon {
      width: 142px;
      height: 142px;
      position: absolute;
      right: 12px;
      bottom: 80vw;
    }
    .bapinIcon {
      width: 142px;
      height: 142px;
      position: absolute;
      right: 12px;
      bottom: 63vw;
    }
    .photoIcon {
      width: 142px;
      height: 142px;
      position: absolute;
      right: 12px;
      bottom: 46vw;
    }
    .superBapinIcon {
      width: 140px;
      height: 140px;
      position: absolute;
      right: 268px;
      bottom: 4vw;
    }
    .danmuIcon {
      width: 140px;
      height: 140px;
      position: absolute;
      right: 18vw;
      bottom: 4vw;
    }
    .bapinText {
      width: 306px;
      height: 80px;
      position: absolute;
      right: 260px;
      bottom: 500px;
    }
    .photoText {
      width: 406px;
      height: 40px;
      position: absolute;
      right: 260px;
      bottom: 390px;
    }
    .giftText {
      width: 310px;
      height: 48px;
      position: absolute;
      right: 260px;
      bottom: 85vw;
    }
    .superBapinText {
      width: 368px;
      height: 80px;
      position: absolute;
      right: 324px;
      bottom: 37vw;
    }
    .danmuText {
      width: 442px;
      height: 40px;
      position: absolute;
      right: 162px;
      bottom: 37vw;
    }
    .arrowIcon {
      width: 58px;
      height: 34px;
      position: absolute;
      right: 186px;
      bottom: 645px;
      &.bapin {
        bottom: 520px;
      }
      &.photo {
        bottom: 390px;
      }
    }
    .arrowDownIcon {
      width: 34px;
      height: 58px;
      position: absolute;
      bottom: 26vw;
      left: 53vw;
      &.danmu {
        left: 70vw;
      }
    }
  }
  &.zshl {
    .modItem {
      .operateBtn {
        width: 35vw;
        height: 11vw;
        background-size: 100% 100%;
        background-image: url('https://ustatic.joymew.com/joymewMp/zshl/bapin/sendBtnGuide.png');
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 19vw;
        text-align: center;
        line-height: 11vw;
        font-size: 28px;
        font-weight: 400;
        color: #a20505;
      }
      .guideTip {
        font-size: 32px;
        color: #fff;
        font-weight: 400;
        position: absolute;
      }
      .ctImg {
        position: absolute;
        width: 19vw;
        right: 0;
      }
      &::after {
        content: '';
        display: block;
        background-size: 100% 100%;
        background-image: url('../../assets/image/funcTip/arrowDown.png');
        position: absolute;
        width: 7vw;
        height: 16vw;
      }
      &.step0 {
        .guideTip {
          left: 31vw;
          bottom: 105vw;
        }
        .ctImg {
          bottom: 96vw;
        }
        &::after {
          transform: rotate(-90deg);
          bottom: 100vw;
          right: 22vw;
        }
      }
      &.step1 {
        .guideTip {
          left: 31vw;
          bottom: 78vw;
        }
        .ctImg {
          bottom: 76vw;
        }
        &::after {
          transform: rotate(-90deg);
          bottom: 76vw;
          right: 22vw;
        }
      }
      &.step2 {
        .guideTip {
          left: 21vw;
          bottom: 61vw;
        }
        .ctImg {
          bottom: 54vw;
        }
        &::after {
          transform: rotate(-90deg);
          bottom: 56vw;
          right: 22vw;
        }
      }
      &.step3 {
        .operateBtn {
          bottom: 58vw;
        }
        .guideTip {
          left: 44vw;
          bottom: 37vw;
        }
        .ctImg {
          bottom: 1vw;
          width: 15vw;
          right: 33vw;
        }
        &::after {
          bottom: 18vw;
          right: 38vw;
        }
      }
      &.step4 {
        .operateBtn {
          bottom: 58vw;
        }
        .guideTip {
          left: 57vw;
          bottom: 37vw;
        }
        .ctImg {
          bottom: 1vw;
          width: 15vw;
          right: 3vw;
        }
        &::after {
          bottom: 18vw;
          right: 6vw;
        }
      }
    }
  }
}
</style>
