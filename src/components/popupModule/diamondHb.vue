<template>
  <transition
    enter-active-class="animated faster fadeIn"
    leave-active-class="animated faster fadeOut"
  >
    <div
      v-show="isShowAni"
      class="diamondHbModule publicHvCenter"
    >
      <div class="diamondHbBox">
        <!-- 红包盖 -->
        <div
          class="lidArea publicHCenter"
          :class="{ up: isLidUpAniStart, down: isLidDownAniStart }"
        >
          <div class="avator publicHvCenter">
            <img :src="diamondHbCdp.avator" />
          </div>
          <div class="nickname">
            {{ diamondHbCdp.wx_name }}
          </div>
        </div>
        <!-- 喵钻数目 -->
        <div
          v-show="diamondHbCdp.status !== 2"
          class="diamondNumWrap publicHvCenter"
        >
          <img
            class="goldUnit"
            src="@/assets/image/hd2/diamondIcon.png"
          />
          <div class="diamondNum">
            {{ diamondHbCdp.diamondNum }}
          </div>
        </div>
        <!-- 奖项 -->
        <div
          class="prizeArea"
          :class="{ show: isPShowAniStart }"
        >
          <div
            v-show="diamondHbCdp.isPrize"
            class="prized publicHCenter"
          >
            <div class="senderInfo publicVCenter">
              <img
                :src="diamondHbCdp.avator"
                class="avator"
              />
              {{ diamondHbCdp.wx_name }}
            </div>
            <div class="diamondNum publicVCenter">
              {{ diamondHbCdp.diamondNumLucky }}
              <img
                class="goldUnit"
                src="@/assets/image/hd2/diamondIcon.png"
              />
            </div>
            <div class="getTip">
              已存入我的钱包-喵钻余额
            </div>
            <div
              v-tap="{ methods: openGiftPopupModule, key: 'gift' }"
              class="toSendGiftBtn publicHvCenter"
            >
              发个礼物
            </div>
          </div>
          <div
            v-show="!diamondHbCdp.isPrize"
            class="unPrized publicHCenter"
          >
            <div class="senderInfo publicVCenter">
              <img
                :src="diamondHbCdp.avator"
                class="avator"
              />
              {{ diamondHbCdp.wx_name }}
            </div>
            <div class="unPrizedTip">
              <div class="tit">
                很遗憾
              </div>
              <div class="reason">
                您来得太慢，红包已被抢完啦～
              </div>
            </div>
            <div
              v-tap="{ methods: openGiftPopupModule, key: 'diamond' }"
              class="toSendDiamondHbBtn publicHvCenter"
            >
              我来发一个
            </div>
          </div>
        </div>
        <!-- 点击查看手气的入口 -->
        <div
          v-show="diamondHbCdp.status === 2"
          v-tap="{ methods: openPopupModule, key: diamondHbLuckyModuleKey }"
          class="luckyEnter"
        >
          查看大家手气
        </div>
        <!-- 倒计时 -->
        <div
          v-show="diamondHbCdp.status === 0"
          class="cdArea"
        >
          <div class="cd">
            {{ currentCd }}
          </div>
          <div class="robTip">
            后开抢
          </div>
        </div>
        <!-- 拆红包按钮 -->
        <div
          v-show="diamondHbCdp.status === 1"
          v-tap="{ methods: robHb }"
          class="openBtn publicHCenter"
          :class="{ commonActive: !isRobBtnAniStart, active: isRobBtnAniStart }"
        >
          抢
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { POPUP_MODULE } from '@/assets/constant/index';
import { timeoutTask, sCtMs } from '@/utils/index';
import { robDiamondHb } from '@/api/diamondHb/index';

export default {
  name: 'DiamondHbPopup',
  created() {},
  mounted() {
    // 执行弹出动画
    this.showAniStart();
    if (this.diamondHbCdp.status === 0) {
      this.currentCd = this.diamondHbCdp.hbCd;
      this.updateCurrentCd();
    }
  },
  computed: {
    ...mapState({
      diamondHbCdp: (state) => state.live.diamondHbCdp,
    }),
  },
  data() {
    return {
      giftModuleKey: POPUP_MODULE.giftModule.key,
      diamondHbLuckyModuleKey: POPUP_MODULE.diamondHbLuckyModule.key,
      isShowAni: false, // 控制bapin box弹出动画
      isLidUpAniStart: false,
      isLidDownAniStart: false,
      isPShowAniStart: false,
      isRobBtnAniStart: false,
      robLock: false,
      currentCd: '',
    };
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
      updateDiamondHbCdpStatus: 'live/updateDiamondHbCdpStatus',
      updateDiamondHbCdp: 'live/updateDiamondHbCdp',
      setUserInfo: 'user/setUserInfo',
      setGiftNavId: 'live/setGiftNavId',
      setIsOpenDiamondHb: 'live/setIsOpenDiamondHb',
    }),
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    robHb() {
      if (this.robLock) {
        return;
      }
      this.robLock = true;
      this.setIsOpenDiamondHb(true);
      this.$loading('抢红包中...');
      robDiamondHb(this.diamondHbCdp.id)
        .then((res) => {
          console.log(res);
          this.$loading.close();
          if (res.data.status === 1 && res.data.user) {
            // 更新 用户余额
            this.setUserInfo({
              money: res.data.user.balance,
            });
          }
          this.updateDiamondHbCdp({
            status: res.data.status,
            gold: res.data.gold || 0,
          });
          // 更新红包队列
          this.$store.dispatch('live/getDiamondHbList');
          this.openHbAniStart().then(() => {
            timeoutTask(() => {
              this.robLock = false;
              this.setIsOpenDiamondHb(false);
            }, 1500);
            this.updateDiamondHbCdpStatus(2);
          });
        })
        .catch((err) => {
          console.log(err);
          this.$loading.close();
          this.robLock = false;
          this.setIsOpenDiamondHb(false);
        });
    },
    openHbAniStart() {
      return new Promise((resolve, reject) => {
        try {
          // 按钮动画开始
          this.isRobBtnAniStart = true;
          timeoutTask(() => {
            // 按钮动画结束
            this.isRobBtnAniStart = false;
            // 红包盖子打开
            this.isLidUpAniStart = true;
            resolve(1);
            timeoutTask(() => {
              // 奖项露出
              this.isPShowAniStart = true;
              // 红包盖子关闭
              this.isLidDownAniStart = true;
            }, 500);
          }, 1000);
        } catch (err) {
          reject(err);
        }
      });
    },
    openPopupModule(e) {
      this.togglePopup();
      timeoutTask(() => {
        this.togglePopup(e.key);
      }, 200);
    },
    openGiftPopupModule(e) {
      if (e.key === 'gift') {
        this.setGiftNavId('list1');
      } else if (e.key === 'diamond') {
        this.setGiftNavId('sendHb');
      }
      this.togglePopup();
      timeoutTask(() => {
        this.togglePopup(this.giftModuleKey);
      }, 200);
    },
    updateCurrentCd() {
      const { startTime } = this.diamondHbCdp;
      let subSecond = parseInt((startTime - new Date().getTime()) / 1000, 10); // 时间差
      if (subSecond >= 0) {
        const tmpInterval = setInterval(() => {
          subSecond = parseInt((startTime - new Date().getTime()) / 1000, 10);
          if (subSecond > 0) {
            this.currentCd = sCtMs(subSecond);
          } else {
            clearInterval(tmpInterval);
            // 红包变成可点状态
            this.updateDiamondHbCdpStatus(1);
            this.currentCd = '';
          }
        }, 1000);
      } else {
        // 红包变成可点状态
        this.updateDiamondHbCdpStatus(1);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.diamondHbModule {
  position: absolute;
  width: 100%;
  top: 0;
  .diamondHbBox {
    width: 560px;
    height: 734px;
    background-image: url(../../assets/image/diamondHb/hbBg.png);
    background-size: 100% 100%;
    position: absolute;
    top: 320px;
    perspective: 400px;
    .lidArea {
      width: 560px;
      height: 548px;
      background-image: url(../../assets/image/diamondHb/hbLid.png);
      background-size: 100% 100%;
      transition: all linear 0.5s;
      transform: translateY(0px);
      z-index: 2;
      .avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        position: absolute;
        background-color: #ffffff;
        top: 88px;
        img {
          width: 114px;
          height: 114px;
          border-radius: 50%;
        }
      }
      .nickname {
        font-size: 28px;
        font-weight: 400;
        color: #ffffff;
        position: absolute;
        top: 220px;
      }
      &.up {
        transform: translateY(-240px);
        z-index: 1;
      }
      &.down {
        transform: translateY(0px);
        z-index: 1;
      }
    }
    .diamondNumWrap {
      position: absolute;
      top: 330px;
      width: 100%;
      .goldUnit {
        width: 64px;
        height: 52px;
        margin-right: 12px;
      }
      .diamondNum {
        font-size: 52px;
        font-weight: 500;
        color: #ffde9b;
        margin-bottom: 12px;
      }
    }
    .prizeArea {
      width: 528px;
      height: 620px;
      position: absolute;
      top: -70px;
      left: 15px;
      z-index: 1;
      transition: all linear 0.1s;
      background-image: url('../../assets/image/diamondHb/prizeBg.png');
      background-size: 100% 100%;
      opacity: 0;
      .prized {
        position: absolute;
        width: 100%;
        height: 100%;
        .senderInfo {
          font-size: 28px;
          font-weight: 400;
          color: #c87a3a;
          position: absolute;
          top: 88px;
          .avator {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 8px;
          }
        }
        .diamondNum {
          font-size: 92px;
          font-weight: 500;
          color: #c87a3a;
          position: absolute;
          top: 194px;
          .goldUnit {
            width: 64px;
            height: 52px;
            margin-left: 12px;
            margin-top: 24px;
          }
        }
        .getTip {
          font-size: 28px;
          font-weight: 400;
          color: #c87a3a;
          position: absolute;
          top: 388px;
        }
        .toSendGiftBtn {
          width: 320px;
          height: 68px;
          background: linear-gradient(90deg, #fffeec, #ffde8d 100%);
          border-radius: 54px;
          font-size: 36px;
          font-weight: 500;
          color: #ca2e1b;
          position: absolute;
          bottom: -100px;
        }
      }
      .unPrized {
        position: absolute;
        width: 100%;
        height: 100%;
        .senderInfo {
          font-size: 28px;
          font-weight: 400;
          color: #c87a3a;
          position: absolute;
          top: 88px;
          .avator {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 8px;
          }
        }
        .unPrizedTip {
          position: absolute;
          top: 220px;
          width: 100%;
          .tit {
            font-size: 40px;
            font-weight: 400;
            color: #c87a3a;
            text-align: center;
          }
          .reason {
            font-size: 28px;
            font-weight: 400;
            color: #c87a3a;
            margin-top: 20px;
            text-align: center;
          }
        }
        .toSendDiamondHbBtn {
          width: 320px;
          height: 68px;
          background: linear-gradient(90deg, #fffeec, #ffde8d 100%);
          border-radius: 54px;
          font-size: 36px;
          font-weight: 500;
          color: #ca2e1b;
          position: absolute;
          bottom: -100px;
        }
      }
      &.show {
        opacity: 1;
      }
    }
    .luckyEnter {
      position: absolute;
      font-size: 28px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 25px;
      left: 200px;
      padding-bottom: 4px;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: #ffffff;
        position: absolute;
        bottom: 0;
      }
    }
    .cdArea {
      background-image: url('../../assets/image/diamondHb/openBtnBg.png');
      background-size: 100% 100%;
      width: 328px;
      height: 320px;
      position: absolute;
      left: 112.5px;
      top: 390px;
      padding-top: 102px;
      .cd {
        font-size: 56px;
        font-weight: 500;
        color: #9a5804;
        text-align: center;
      }
      .robTip {
        font-size: 24px;
        font-weight: 400;
        color: #9a5804;
        text-align: center;
      }
    }
    .openBtn {
      background-image: url('../../assets/image/diamondHb/openBtnBg.png');
      background-size: 100% 100%;
      width: 328px;
      height: 320px;
      position: absolute;
      left: 112.5px;
      top: 390px;
      font-size: 88px;
      font-weight: 500;
      color: #9a5804;
      padding-top: 12vw;
      z-index: 2;
      &.active {
        animation-name: rotateY;
        animation-duration: 1s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      }
      &.commonActive {
        animation-name: scaleAni;
        animation-duration: 2s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
      }
    }
  }
  @keyframes rotateY {
    0% {
      transform: rotateY(0deg) translateZ(10px);
      opacity: 1;
    }

    70% {
      transform: rotateY(720deg) translateZ(10px);
      opacity: 1;
    }

    100% {
      transform: rotateY(720deg) translateZ(-400px);
      opacity: 0;
    }
  }
  @keyframes scaleAni {
    0% {
      transform: scale(1);
    }

    70% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(1);
    }
  }
}
</style>
