<template>
  <!-- 红包雨等待 -->
  <div class="wait">
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/hbyTitle.png"
      class="hbyTitle"
    />
    <div class="circle">
      <img
        src="https://static.hudongmiao.com/joymewH5/img/hby/lightCircle.png"
        class="outerCircle"
      />
      <img
        src="https://static.hudongmiao.com/joymewH5/img/hby/lightCircleInner.png"
        class="innerCircle"
      />
      <img
        src="https://static.hudongmiao.com/joymewH5/img/hby/shakeMobile.png"
        class="shakeMobile shakeAni"
      />
    </div>
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/coin.png"
      class="coin"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/bendHb1.png"
      class="bendHb1"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/bendHb2.png"
      class="bendHb2"
    />
    <img
      src="https://static.hudongmiao.com/joymewH5/img/hby/bendHb3.png"
      class="bendHb3"
    />
    <div
      v-if="sceneType === '0'"
      class="quickWishWrap"
    >
      <div
        v-for="(item, index) in quickWishList"
        :key="index"
        v-tap="{ methods: quickSend, message: { key: index, value: item } }"
        class="quickWishItem"
      >
        {{ item }}
      </div>
    </div>
    <div
      v-if="giftSendVisible && sceneType === '0'"
      class="bqWrap publicHCenter"
    >
      <div
        v-tap="{ methods: openPopupModule, key: danmuModuleKey }"
        class="bqEntry"
      />
    </div>
    <!-- 弹出区域 -->
    <myPopup />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { HBYWQUICKWISH, POPUP_MODULE } from '@/assets/constant/index';
import { sendChatMessage } from '@/api/chat/index';
import { generateRandom } from '../../../utils/index';
import myPopup from '../../index/components/popupArea.vue';

export default {
  name: 'HbyWait',
  computed: {
    ...mapState({
      giftSendVisible: (state) => state.app.giftSendVisible,
      sceneType: (state) => state.live.sceneType,
    }),
  },
  components: { myPopup },
  data() {
    return {
      quickWishList: [],
      isBtnLock: false, // 按钮锁 限制 点击按钮发送消息请求结束前不能再次点击
      danmuModuleKey: POPUP_MODULE.danmuModule.key,
    };
  },
  created() {
    this.initQuickWishList();
  },
  mounted() {},
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
    }),
    initQuickWishList() {
      const tmpList = [];
      const tmpLen = HBYWQUICKWISH.length;
      const tmpIndex = generateRandom(0, tmpLen);
      let tmpIndex2 = generateRandom(0, tmpLen);
      let tmpIndex3 = generateRandom(0, tmpLen);
      while (tmpIndex === tmpIndex2) {
        tmpIndex2 = generateRandom(0, tmpLen);
      }
      while (tmpIndex3 === tmpIndex || tmpIndex3 === tmpIndex2) {
        tmpIndex3 = generateRandom(0, tmpLen);
      }
      tmpList.push(HBYWQUICKWISH[tmpIndex]);
      tmpList.push(HBYWQUICKWISH[tmpIndex2]);
      tmpList.push(HBYWQUICKWISH[tmpIndex3]);
      this.quickWishList = tmpList;
    },
    quickSend(e) {
      if (this.isBtnLock) {
        return;
      }
      _hmt.push(['_trackEvent', '红包雨等待界面', '点击', '发送快捷弹幕']);
      // 锁住按钮
      this.isBtnLock = true;
      sendChatMessage(e.message.value, 0)
        .then((res) => {
          console.log(res);
          // 按钮解锁
          this.isBtnLock = false;
          this.quickWishList.splice(e.message.key, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openPopupModule(e) {
      _hmt.push(['_trackEvent', '红包雨等待界面', '点击', '发送霸气弹幕']);
      this.togglePopup(e.key);
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.wait {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(https://static.hudongmiao.com/joymewH5/img/hby/bg.png);
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .hbyTitle {
    margin-top: 215px;
    width: 546px;
    height: 216px;
  }
  .circle {
    width: 517px;
    height: 479px;
    position: relative;
    margin-top: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    .outerCircle {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .innerCircle {
      position: absolute;
      width: 440px;
      height: 441px;
    }
    .shakeMobile {
      position: absolute;
      width: 283px;
      height: 319px;
    }
  }
  .coin {
    width: 137px;
    height: 138px;
    position: absolute;
    top: 591px;
    right: 8px;
  }
  .bendHb1 {
    width: 148px;
    height: 111px;
    position: absolute;
    top: 610px;
    left: -2px;
  }
  .bendHb2 {
    width: 128px;
    height: 83px;
    position: absolute;
    top: 941px;
    left: 62px;
  }
  .bendHb3 {
    width: 128px;
    height: 83px;
    position: absolute;
    top: 747px;
    right: 13px;
  }
  .shakeAni {
    animation-name: shakeAni;
    animation-duration: 2s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
  }
  .quickWishWrap {
    display: flex;
    position: absolute;
    bottom: 412px;
    .quickWishItem {
      width: 236px;
      height: 53px;
      background-size: 100% 100%;
      font-size: 24px;
      padding: 0 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      line-height: 53px;
      &:nth-child(1) {
        background-image: url('../../../assets/image/hd2/hbyQuickWishBg1.png');
        color: #a607ec;
      }
      &:nth-child(2) {
        background-image: url('../../../assets/image/hd2/hbyQuickWishBg1.png');
        margin: 0 8px;
        color: #e50000;
      }
      &:nth-child(3) {
        background-image: url('../../../assets/image/hd2/hbyQuickWishBg1.png');
        color: #f3c322;
      }
    }
  }
  .bqWrap {
    position: absolute;
    bottom: 291px;
    .bqEntry {
      width: 292px;
      height: 76px;
      background-image: url('../../../assets/image/hd2/hbyBq.png');
      background-size: 100% 100%;
    }
  }
  @keyframes shakeAni {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(25deg);
    }
    60% {
      transform: rotate(-25deg);
    }
    70% {
      transform: rotate(25deg);
    }
    80% {
      transform: rotate(-25deg);
    }
    90% {
      transform: rotate(25deg);
    }
    100% {
      transform: rotate(-25deg);
    }
  }
}
</style>
