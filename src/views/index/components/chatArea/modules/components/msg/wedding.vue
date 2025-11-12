<template>
  <div class="msg">
    <div class="top publicVCenter">
      <img
        :src="message.headImg"
        class="headImg"
      />
      <div class="nickname">
        {{ message.userName }}
      </div>
      <div
        v-show="message.vipLevel"
        class="level publicHvCenter"
      >
        LV{{ message.vipLevel }}
      </div>
      <div
        v-show="message.relativeType && !isTql"
        class="relatives publicHvCenter"
        :class="{
          boy: message.relativeType.startsWith('1'),
          girl: message.relativeType.startsWith('2'),
        }"
      >
        {{ message.relativeTypeLabel }}
      </div>
      <div
        v-show="message.currentStatus"
        class="status publicHvCenter"
      >
        {{ message.currentStatus }}
      </div>
      <div
        v-show="message.deskNum"
        class="deskNum publicHvCenter"
      >
        {{ message.deskNum }}
      </div>
    </div>
    <div class="content">
      <!-- 礼物消息内容 -->
      <div
        class="gift"
        v-show="message.giftType"
      >
        <label>{{ giftSendActionText }}</label>
        <label class="giftName">{{ message.giftName }}</label>
        <img
          :src="message.giftImg"
          class="giftImg"
        />
      </div>
      <!-- 普通消息内容 -->
      <div class="common" v-show="message.content">
        {{ message.content }}
      </div>
    </div>
    <img
      :src="message.photoUrl"
      class="photo"
      v-if="message.photoUrl"
    />
    <div class="bottom publicVCenter">
      <div class="date">{{ message.sendDate }}</div>
      <div
        class="resendBtn"
        v-show="message.giftType"
        v-tap="{ methods: openPopupOrToPage, giftType: message.giftType }"
      />
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { POPUP_MODULE } from '@/assets/constant/index';
import router from '@/router';
import wxApi from '@/utils/wxApi';

export default {
  name: 'Msg',
  props: {
    message: {
      type: Object,
      default: () => ({
        headImg: '',
        userName: '',
        vipLevel: '',
        relativeType: '', // 亲友值 (1-1)
        relativeLabel: '', // 亲友文本 (男方父母)
        currentStatus: '', // 身份 (钻石王老五、伴郎)
        deskNum: '', // 座位号
        giftType: '', // (hbkd红包口袋)
        giftName: '',
        giftImg: '',
        content: '', // 消息文本
        photoUrl: '', // 照片
        sendDate: '',
      }),
    },
  },
  computed: {
    isTql() {
      return store.getters['user/isTql'];
    },
    giftSendActionText() {
      return this.message.giftType === 'hbkd' ? '发送了' : '送来了';
    },
  },
  components: {},
  methods: {
    /**
     * 打开发礼物弹窗或者页面跳转
     */
    openPopupOrToPage(e) {
      // 被拉黑不可点击
      if (store.state.user.isForbidBuyHbq) {
        return;
      }
      // 地理位置不符合要求不可点击
      if (store.state.live.isLocationInvalid) {
        this.$toast.center(store.state.live.locationInvalidReason);
        return;
      }
      _hmt.push(['_trackEvent', '弹幕区域', '点击', '再次点击发送']);
      const giftTypeMap = {
        gift: POPUP_MODULE.giftModule.key,
        bapin: POPUP_MODULE.bapinModule.key,
        photo: POPUP_MODULE.photoModule.key,
        rocket: POPUP_MODULE.danmuModule.key,
        superDanmu: POPUP_MODULE.superDanmuModule.key,
      };
      const popupKey = giftTypeMap[e.giftType];
      if (popupKey !== undefined) {
        // 弹出弹窗
        store.commit('app/togglePopup', popupKey);
      } else {
        // 跳转页面
        this.toPage(e.giftType);
      }
    },
    /**
     * 跳转页面
     */
    toPage(giftType) {
      const toHbkd = () => {
        if (store.state.app.env === 'miniProgram') {
          let tmpHbkdRechargeListStr;
          const templateMode = store.state.live.hbkdRechargeNewList.length > 0;
          if (templateMode) {
            tmpHbkdRechargeListStr = JSON.stringify(store.state.live.hbkdRechargeNewList);
          } else {
            tmpHbkdRechargeListStr = store.state.live.hbkdRechargeList;
          }
          wxApi.tmpNavigateTo('hbkdRecharge', {
            openId: store.state.user.openId,
            userId: store.state.user.userId,
            templateMode,
            hbkdRemainVisible: store.state.app.hbkdRemainVisible,
            hbkdRechargeListStr: tmpHbkdRechargeListStr,
            hbkdRechargeListNewStr: tmpHbkdRechargeListStr,
          });
        } else if (store.state.app.env === 'h5') {
          router.push({
            path: '/hbkdRecharge',
          });
        }
      };
      const toPhotoWall = () => {
        if (store.state.app.env === 'miniProgram') {
          wxApi.navigateTo('/pages/photoWall/photoWall');
        } else if (store.state.app.env === 'h5') {
          router.push({
            path: '/photoWall',
          });
        }
      };
      if (giftType === 'hbkd') {
        toHbkd();
      } else if (giftType === 'photoWall') {
        toPhotoWall();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.msg {
  .top {
    .headImg {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .nickname {
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
      margin-left: 10px;
    }

    .level {
      padding: 2px 8px;
      background: linear-gradient(257deg, #fd9931 0%, #f5b456 100%);
      border-radius: 18px;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
      margin-left: 10px;
    }

    .relatives {
      padding: 2px 8px;
      border-radius: 18px;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
      margin-left: 10px;

      &.boy {
        background: linear-gradient(257deg, #31a3fd 0%, #565ef5 100%);
      }

      &.girl {
        background: linear-gradient(257deg, #fd31f7 0%, #f55670 100%);
      }
    }

    .status {
      padding: 2px 8px;
      background: rgba(193, 209, 255, 0.13);
      border-radius: 18px;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
      margin-left: 10px;
    }

    .deskNum {
      background: #f34c91;
      position: absolute;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
      top: -18px;
      right: -18px;
      border-radius: 50%;
      width: 44px;
      height: 44px;
    }
  }

  .content {
    font-size: 32px;
    margin-top: 18px;

    .gift {
      display: grid;
      grid-template-areas:
        'commonLabel giftImg'
        'giftNameLabel giftImg';
      row-gap: 10px;
      column-gap: 42px;
      label {
        color: #fa3fc3;
        grid-area: commonLabel;
        &.giftName {
          color: #fff9bf;
          font-size: 48px;
          font-weight: 500;
          grid-area: giftNameLabel;
          justify-self: end;
        }
      }

      .giftImg {
        height: 122px;
        grid-area: giftImg;
      }
    }

    .common {
      margin-top: 23px;
    }
  }

  .photo {
    width: 456px;
    height: auto;
    margin-top: 10px;
  }

  .bottom {
    justify-content: space-between;
    margin-top: 23px;

    .date {
      font-size: 20px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.4);
    }

    .resendBtn {
      width: 130px;
      height: 44px;
      background-size: 100% 100%;
      background-image: url('https://static.hudongmiao.com/joymewH5/img/chat/myResendBtn.png');
    }
  }
}
</style>
