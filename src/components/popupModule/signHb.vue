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
          <div class="organizer">
            {{ signHbConfig.organizer || "" }}
          </div>
          <div class="avator publicHvCenter">
            <img :src="signHbConfig.avator || avator" />
          </div>
          <!-- <div class="nickname">
            {{ wx_name }}
          </div> -->
          <div class="sendTip1">
            {{ signHbConfig.bless.lineOne || "送来了一个大红包!" }}
          </div>
          <div class="sendTip2">
            {{ signHbConfig.bless.lineTwo || "" }}
          </div>
        </div>
        <!-- 奖项 -->
        <div
          class="prizeArea"
          :class="{ show: isPShowAniStart }"
        >
          <div
            v-show="isPrize"
            class="prized publicHCenter"
          >
            <div class="senderInfo publicVCenter">
              <img
                :src="signHbConfig.avator || avator"
                class="avator"
              />
              {{ signHbConfig.organizer || wx_name }}
            </div>
            <div class="diamondNum publicVCenter">
              {{ prizeMoney }}元
            </div>
            <div class="getTip">
              红包已发送至您的微信零钱。
            </div>
            <div
              v-tap="{ methods: openGiftPopupModule }"
              class="toSendGiftBtn publicHvCenter"
            >
              发个礼物
            </div>
          </div>
          <div
            v-show="!isPrize"
            class="unPrized publicHCenter"
          >
            <div class="senderInfo publicVCenter">
              <img
                :src="signHbConfig.avator || avator"
                class="avator"
              />
              {{ signHbConfig.organizer || wx_name }}
            </div>
            <div class="unPrizedTip">
              <div class="tit">
                很遗憾
              </div>
              <div class="reason">
                您来得太慢，红包已被抢完啦～
              </div>
            </div>
          </div>
        </div>
        <!-- 拆红包按钮 -->
        <div
          v-show="signHbStatus === 0"
          v-tap="{ methods: robHb }"
          class="openBtn publicHCenter"
          :class="{ commonActive: !isRobBtnAniStart, active: isRobBtnAniStart }"
        />
        <!-- 底部主办方提示 -->
        <div
          v-show="signHbConfig.organizer"
          class="organizer-tip"
        >
          {{ `注：红包由${signHbConfig.organizer || '主办方'}送出` }}
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { POPUP_MODULE } from '@/assets/constant/index';
import { robSignHb } from '@/api/index';
import { timeoutTask } from '@/utils/index';

export default {
  name: 'SignHbPopup',
  data() {
    return {
      giftModuleKey: POPUP_MODULE.giftModule.key,
      isShowAni: false, // 控制bapin box弹出动画
      isLidUpAniStart: false,
      isLidDownAniStart: false,
      isPShowAniStart: false,
      isRobBtnAniStart: false,
      robLock: false,
      signHbStatus: 0, // 0:未打开 1:已打开
      avator: require('../../assets/image/defaultHeadImg.png'),
      wx_name: '签到红包',
      isPrize: false, // 是否中奖
      prizeMoney: '0', // 中奖金额
    };
  },
  created() {},
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  computed: {
    ...mapState({
      signHbConfig: (state) => state.app.signHbConfig,
    }),
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
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
      robSignHb()
        .then((res) => {
          console.log('抢签到红包结果:', res);
          if (res.money === '0' || !res.money) {
            this.isPrize = false;
          } else {
            this.isPrize = true;
            this.prizeMoney = res.money;
          }
          this.openHbAniStart().then(() => {
            timeoutTask(() => {
              this.robLock = false;
            }, 1500);
            this.signHbStatus = 1;
          });
        })
        .catch((err) => {
          console.log(err);
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
    openGiftPopupModule() {
      this.setGiftNavId('list1');
      this.togglePopup();
      timeoutTask(() => {
        this.togglePopup(this.giftModuleKey);
      }, 200);
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
    background-image: url("~@/assets/image/signHb/hb-bg.png");
    background-size: 100% 100%;
    position: absolute;
    top: 320px;
    perspective: 400px;
    .lidArea {
      width: 560px;
      height: 548px;
      background-image: url("~@/assets/image/signHb/top.png");
      background-size: 100% 100%;
      transition: all linear 0.5s;
      transform: translateY(0px);
      z-index: 2;
      .organizer {
        width: 320px;
        height: 80px;
        line-height: 80px;
        color: #ff7a00;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
      }
      .avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        position: absolute;
        background-color: #ffffff;
        top: 108px;
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
        top: 240px;
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
    .sendTip1 {
      font-size: 36px;
      font-weight: 500;
      color: #ffde9b;
      margin-bottom: 12px;
      position: absolute;
      top: 280px;
      width: 100%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sendTip2 {
      font-size: 36px;
      font-weight: 500;
      color: #ffde9b;
      margin-bottom: 12px;
      position: absolute;
      top: 340px;
      width: 100%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .prizeArea {
      width: 528px;
      height: 620px;
      position: absolute;
      top: -70px;
      left: 15px;
      z-index: 1;
      transition: all linear 0.1s;
      background-image: url("../../assets/image/diamondHb/prizeBg.png");
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
    .openBtn {
      background-image: url("~@/assets/image/signHb/kai-icon.png");
      background-size: 100% 100%;
      width: 220px;
      height: 220px;
      position: absolute;
      left: 167.5px;
      top: 425px;
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
    .organizer-tip {
      width: fit-content;
      padding: 10px 30px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, .2);
      border-radius: 40px;
      color: #fff;
      font-size: 18px;
      white-space: nowrap;
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%) scale(0.8);
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
