<template>
  <!-- 主页面 -->
  <div
    id="indexWrap"
    class="index-wrap"
  >
    <!-- 背景 -->
    <background />
    <!-- 头部区域 -->
    <myHeader v-if="env !== 'tt'" />
    <!-- 底部区域 -->
    <bottomArea />
    <!-- 右下角区域 -->
    <bottomRightCorner />
    <!-- 聊天区域 -->
    <chatArea />
    <!-- 弹出区域 -->
    <myPopup />
    <CheckWinningPopup
      ref="checkWinningAni"
      @btnClick="onCheckWinningBtnClick"
    />
    <!-- 效果层区域 -->
    <effect />
    <!-- 按钮 -->
    <transition
      enter-active-class="animated faster zoomIn"
      leave-active-class="animated faster zoomOut"
    >
      <div
        v-if="gameBtnVisible && !inVote"
        ref="startBtn"
        class="btn publicZIndexBtn"
      />
    </transition>
    <div
      v-if="gameBtnVisible"
      v-tap="{ methods: enterGame }"
      class="btnReal publicZIndexRealBtn"
      :class="{ vote: inVote }"
    />
    <!-- 霸屏关闭按钮 -->
    <div
      v-if="bapinCloseIconVisible"
      v-tap="{ methods: closeCurrentBapin }"
      class="bapinCloseBtn publicZIndexRealBtn"
    />
  </div>
</template>
<script>
import { attendGame, getQianDaoInfo } from '@/api/index/index';
import { startBtn } from '@/assets/constant/effect';
import { timeoutTask } from '@/utils/index';
import { otherMessageHandler } from '@/utils/websocket/handleMessage';
import wxApi from '@/utils/wxApi';
import SVGA from 'svgaplayerweb';
import { mapMutations, mapState } from 'vuex';
import background from './components/background.vue';
import bottomArea from './components/bottomArea/index.vue';
import bottomRightCorner from './components/bottomRightCorner/index.vue';
import chatArea from './components/chatArea/index.vue';
import CheckWinningPopup from './components/checkWinningPopup.vue';
import effect from './components/effectArea.vue';
import myHeader from './components/headerArea.vue';
import myPopup from './components/popupArea.vue';

let enterGameLock = false; // 锁,限制按钮连续点击
export default {
  name: 'Index2',
  computed: {
    ...mapState({
      gameBtnVisible: (state) => state.app.gameBtnVisible,
      gameUrl: (state) => state.game.gameUrl,
      needShake: (state) => state.game.needShake,
      enterType: (state) => state.game.enterType,
      gameStatus: (state) => state.game.gameStatus,
      bapinCloseIconVisible: (state) => state.app.bapinCloseIconVisible,
      isForbidBuyHbq: (state) => state.user.isForbidBuyHbq,
      isLocationInvalid: (state) => state.live.isLocationInvalid,
      env: (state) => state.app.env,
    }),
    inVote() {
      return this.$store.state.game.currentGameCode === 'vote';
    },
  },
  data() {
    return {
      isMounted: false,
    };
  },
  watch: {
    gameBtnVisible(newVal) {
      try {
        if (newVal) {
          console.log('***svga startBtn 展示***');
          this.$nextTick(() => {
            this.SVGAPlayer = new SVGA.Player(this.$refs.startBtn);
            this.$svgaParser.load(startBtn, (videoItem) => {
              this.SVGAPlayer.setVideoItem(videoItem);
              this.SVGAPlayer.startAnimation();
            });
          });
        } else {
          console.log('***svga startBtn 销毁***');
          if (this.SVGAPlayer) {
            this.SVGAPlayer.stopAnimation();
            this.SVGAPlayer.clear();
            this.SVGAPlayer = null;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    '$store.state.live.sceneType': {
      handler(newVal) {
        if (newVal === '0' && this.isMounted) {
          this.judgeShowGuide();
        }
      },
    },
  },
  async created() {
    if (!this.$store.state.app.qiandaoleme) {
      const data = await getQianDaoInfo();
      this.$store.commit('app/setQiandaoleme', data.qian_dao_le_me || false);
      if (!this.$store.state.app.qiandaoleme) {
        this.$router.push('/error');
      }
    }
  },
  async mounted() {
    enterGameLock = false;
    if (this.gameBtnVisible && !this.inVote) {
      this.$nextTick(() => {
        this.SVGAPlayer = new SVGA.Player(this.$refs.startBtn);
        this.$svgaParser.load(startBtn, (videoItem) => {
          this.SVGAPlayer.setVideoItem(videoItem);
          this.SVGAPlayer.startAnimation();
        });
      });
    }
    otherMessageHandler.on(this.handleMsgToOpenCheckWinningPopup);
    this.isMounted = true;
    if (this.$store.state.live.sceneType) {
      this.judgeShowGuide();
    } else {
      // 监听sceneType获取到后再判断是否显示引导
      this.isMounted = true;
    }
  },
  components: {
    background,
    myHeader,
    bottomArea,
    chatArea,
    myPopup,
    effect,
    bottomRightCorner,
    CheckWinningPopup,
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
      setIsCloseCurrentBapin: 'app/setIsCloseCurrentBapin',
    }),
    closeCurrentBapin() {
      this.setIsCloseCurrentBapin(true);
    },
    enterGame() {
      if (this.isForbidBuyHbq) {
        // this.$toast.center('系统繁忙!');
        return;
      }
      if (this.isLocationInvalid) {
        this.$toast.center(this.$store.state.live.locationInvalidReason);
        return;
      }
      if (enterGameLock) {
        return;
      }
      enterGameLock = true;
      timeoutTask(() => {
        enterGameLock = false;
      }, 300);
      if (this.needShake) {
        if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
          // ios 13兼容性处理
          DeviceMotionEvent.requestPermission()
            .then((permissionState) => {
              if (permissionState === 'granted') {
                this.$toast.center('摇一摇授权成功!');
              }
            })
            .catch((err) => {
              console.log(err);
              this.$toast.center('用户未授权摇一摇!');
            });
        }
      }
      attendGame()
        .then(() => {
          if (this.enterType === 'mp') {
            let tmpGameUrl;
            // 如果当前处于game进行中的状态 进入小程序会直接进入game
            if (this.gameStatus === 2) {
              tmpGameUrl = `${this.gameUrl}&gameStatus=2`;
            } else {
              tmpGameUrl = this.gameUrl;
            }
            wxApi.navigateTo(tmpGameUrl);
          } else if (this.enterType === 'h5') {
            console.log('跳转h5页面!');
            this.$router.push({
              path: this.gameUrl,
            });
          } else if (this.enterType === 'thirdParty') {
            window.location.href = this.gameUrl;
          } else if (this.enterType === 'popup') {
            this.togglePopup(this.gameUrl);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onCheckWinningBtnClick() {
      _hmt.push(['_trackEvent', '查看抽奖结果弹窗', '点击', '跳转查看抽奖中奖记录']);
      if (this.env === 'miniProgram') {
        this.judgeMpTypeThenToWinningRecord();
      }
    },
    judgeMpTypeThenToWinningRecord() {
      if (this.$store.state.app.mpType) {
        wxApi.navigateTo('/packageB/pages/winningRecord/winningRecord');
      } else {
        wxApi.navigateTo('/pages/winningRecord/winningRecord');
      }
    },
    handleMsgToOpenCheckWinningPopup(msg) {
      if (msg?.data?.data?.action !== 'openCheckWinningPopup') return;
      this.$refs.checkWinningAni.show();
    },
    judgeShowGuide() {
      // 婚礼版开启了亲友设置，每切换一场活动都要显示引导，其他情况只展示一次
      const storageUseTipFlag = localStorage.getItem('useTipFlag');
      const showGuide = () => {
        localStorage.setItem('useTipFlag', this.$store.state.live.liveId);
        this.$createUseTip();
      };
      const showGuideWhenWedingAndNeedRelativeChoose = () => {
        if (!storageUseTipFlag || storageUseTipFlag !== this.$store.state.live.liveId) {
          showGuide();
        }
      };
      const showGuideWhenCommon = () => {
        if (!storageUseTipFlag) {
          showGuide();
        }
      };
      if (this.$store.state.live.sceneType === '0' && this.$store.state.live.identitySwitch) {
        showGuideWhenWedingAndNeedRelativeChoose();
      } else {
        showGuideWhenCommon();
      }
    },
  },
  beforeDestroy() {
    otherMessageHandler.off(this.handleMsgToOpenCheckWinningPopup);
  },
};
</script>
<style lang="less" scoped>
.index-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .hbkdIcon {
    position: absolute;
    width: 124px;
    height: 122px;
    right: 12px;
    bottom: 296px;
  }

  .btn {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    top: -15vw;
  }

  .btnReal {
    position: absolute;
    width: 412.5px;
    height: 180px;
    bottom: 31vw;
    left: 111px;

    &.vote {
      background: linear-gradient(118deg, #6ef7ff, #f0ffb5 100%);
      border-radius: 40px;
      width: 380px;
      height: 100px;
      animation-name: heartBeat;
      animation-duration: 1.3s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;

      &::after {
        content: '投票';
        color: #006265;
        font-size: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      @keyframes heartBeat {
        0% {
          transform: scale(1);
        }

        50% {
          transform: scale(1.2);
        }

        100% {
          transform: scale(1);
        }
      }
    }
  }

  .bapinCloseBtn {
    width: 8vw;
    height: 8vw;
    position: absolute;
    background-image: url('https://static.hudongmiao.com/joymewScreen/img/qrcode/close.png');
    background-size: 100% 100%;
    top: 2vw;
    right: 2vw;
  }
}
</style>
