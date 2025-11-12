<template>
  <div class="msg">
    <img
      :src="message.headImg"
      class="headImg"
    />
    <div class="messageRight">
      <div class="nickname">{{ message.userName }}</div>
      <div
        class="messageMain"
        :class="{ hasPhoto: message.photoUrl }"
      >
        <div class="content">
          <div
            v-show="message.giftType"
            class="gift publicVCenter"
          >
            <label>{{ giftSendActionText }}</label>
            {{ message.giftName }}
            <img
              :src="message.giftImg"
              class="giftImg"
            />
          </div>
          <div class="common" v-show="message.content">
            {{ message.content }}
          </div>
        </div>
        <img
          v-if="message.photoUrl"
          :src="message.photoUrl"
          class="photo"
        />
        <div
          class="bottom publicVCenter"
          :class="{ onlyDate: !message.giftType }"
        >
          <div class="date">
            {{ message.sendDate }}
          </div>
        </div>
      </div>
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
  display: flex;
  .headImg {
    width: 67px;
    height: 67px;
    border-radius: 50%;
  }
  .messageRight {
    flex: 1;
    .nickname {
      font-size: 3.6vw;
      font-weight: 300;
      color: #ffffff;
      margin-bottom: 8px;
      padding: 5px 16px 0 16px;
    }
    .messageMain {
      font-size: 3.6vw;
      color: #ffdb86;
      min-height: 138px;
      position: relative;
      padding: 10px 25px;
      .content {
        position: relative;
        z-index: 1;
        .gift {
          font-size: 3.2vw;
          label {
            margin-right: 12px;
          }

          .giftImg {
            height: 16.267vw;
            margin-left: 6.667vw;
            width: 20vw;
            object-fit: contain;
          }
        }

        .common {
          padding-top: 23px;
        }
      }

      .photo {
        width: 100%;
        height: auto;
        position: relative;
        z-index: 1;
      }

      .bottom {
        position: relative;
        z-index: 1;
        justify-content: space-between;
        margin-top: 23px;

        .date {
          font-size: 3.2vw;
          font-weight: 400;
          color: #ffdb86;
        }

        .resendBtn {
          width: 124px;
          height: 42px;
          background-size: 100% 100%;

          &.gift {
            background-image: url('~@/assets/image/chat/gift.png');
          }

          &.bapin {
            background-image: url('~@/assets/image/chat/bapin.png');
          }

          &.photo {
            background-image: url('~@/assets/image/chat/photo.png');
          }

          &.hbkd {
            background-image: url('~@/assets/image/chat/hbkd.png');
          }

          &.rocket {
            background-image: url('~@/assets/image/chat/rocket.png');
          }

          &.superDanmu {
            background-image: url('~@/assets/image/chat/superDanmu.png');
          }

          &.photoWall {
            background-image: url('~@/assets/image/chat/superDanmu.png');
          }
        }
        &.onlyDate {
          justify-content: flex-end;
        }
      }
      &::after {
        content: '';
        background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/chatBox.png');
        background-size: 100% 100%;
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      &.hasPhoto {
        &::after {
          background-image: none;
          background-color: rgba(149, 68, 68, 0.4);
          border-radius: 4.267vw;
        }
      }
    }
  }
}
</style>
