<template>
  <div class="cardMsg">
    <div class="hostCardCt">
      <div
        class="hostCardWrap"
        :style="{ backgroundImage: `url(${cardBg})` }"
        v-tap="{ methods: toHost, type: '' }"
      >
        <div class="avatarname publicVCenter">
          <img
            :src="message.advertiseContent.avatar"
            class="avatar"
          />
          <div class="nickname" :style="{ color: textColor }">
            {{ message.advertiseContent.emcee_name }}
          </div>
        </div>
        <div
          v-if="phonenumber"
          class="phonenumber"
          :style="{ color: textColor }"
        >
          电话：{{ phoneText }}
        </div>
        <div
          v-if="!message.advertiseContent.introduce"
          class="introduce"
           :style="{ color: textColor }"
        >
          欢迎大家参加本场活动,我是本场活动的主持人
          <label>{{ message.advertiseContent.emcee_name }}</label>
          ,有需要联系我!
        </div>
        <div
          v-if="message.advertiseContent.introduce"
          class="introduce"
           :style="{ color: textColor }"
        >
          {{ message.advertiseContent.introduce }}
        </div>
        <div
          class="goldenCard"
          v-if="!dz_hltcard"
        >
          {{ rankText }}
        </div>
      </div>
      <div class="operateArea">
        <div
          v-if="comment_json"
          v-tap="{ methods: toHost, type: 'addWechat' }"
          class="btn publicHvCenter"
        >
          添加微信
        </div>
        <div
          v-tap="{ methods: toHost, type: 'hostReserve' }"
          class="btn publicHvCenter"
        >
          预定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import wxApi from '@/utils/wxApi';
import { jumpToReserve } from '@/views/index/components/bottomRightCorner/modules/func';

export default {
  name: 'CardMsg',
  props: {
    message: {
      type: Object,
      default: () => ({
        advertiseType: '', // (hostCard主持人卡片)
        advertiseContent: {
          avatar: '',
          emcee_name: '',
          phone: '',
          introduce: '',
          rank: '',
          cardBg: '',
        },
      }),
    },
  },
  computed: {
    phonenumber() {
      return store.state.user.emceeInfo.phonenumber;
    },
    phoneText() {
      return this.message.advertiseContent.phone ? this.message.advertiseContent.phone : this.phonenumber;
    },
    rankText() {
      return this.message.advertiseContent.rank ? this.message.advertiseContent.rank : '金牌主持人';
    },
    comment_json() {
      return store.state.user.emceeInfo.comment_json;
    },
    cardBg() {
      return this.message.advertiseContent.cardBg
        ? this.message.advertiseContent.cardBg
        : 'https://ustatic.joymew.com/joymewMp/zshl/cardType2.png';
    },
    textColor() {
      return this.message.advertiseContent.textColor || '#FFFFFF';
    },
    dz_hltcard() {
      return store.state.live.dz_hltcard;
    },
  },
  components: {},
  methods: {
    /**
     * 跳转主持风采页面
     */
    toHost(e) {
      // 被拉黑不可点击
      if (store.state.user.isForbidBuyHbq) {
        return;
      }
      // 地理位置不符合要求不可点击
      if (store.state.live.isLocationInvalid) {
        this.$toast.center(store.state.live.locationInvalidReason);
        return;
      }
      if (this.dz_hltcard) {
        jumpToReserve(e.type);
        return;
      }
      this.toWeddingReserve(e.type);
    },
    /**
     * 跳转婚礼预定
     */
    toWeddingReserve(action) {
      wxApi.navigateTo(`/pages/reserve/reserve?action=${action}`);
    },
  },
};
</script>

<style lang="less" scoped>
.cardMsg {
  padding-left: 10vw;
  .hostCardCt {
    background-color: rgba(149, 68, 68, 0.4);
    border-radius: 32px;
    color: #ffffff;
    padding: 20px 18px;
    .hostCardWrap {
      position: relative;
      background-size: 100% 100%;
      background-image: url('https://ustatic.joymew.com/joymewMp/zshl/cardType2.png');
      padding: 23px 26px;

      .avatarname {
        .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }

        .nickname {
          width: 200px;
          font-size: 28px;
          font-weight: 400;
          color: #ffffff;
          margin-left: 10px;
        }
      }

      .phonenumber {
        font-size: 28px;
        font-weight: 400;
        color: #ffffff;
        margin-top: 23px;
      }

      .introduce {
        margin-top: 16px;
        font-size: 28px;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
        label {
          color: #ffbe83;
        }
      }

      .goldenCard {
        padding: 8px 10px 8px 14px;
        background: linear-gradient(107deg, #fff383 93%, #ffbe83 100%);
        position: absolute;
        top: 35px;
        right: 0;
        font-size: 18px;
        font-weight: 500;
        color: #5f4a00;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
    }
    .operateArea {
      display: flex;
      justify-content: space-evenly;
      margin-top: 23px;

      .btn {
        width: 144px;
        height: 50px;
        background-color: rgba(255, 190, 131, 0.3);
        border-radius: 28px;
        font-size: 24px;
        font-weight: 400;
        color: #ffffff;
        border: 2px solid #ffbe83;
      }
    }
  }
}
</style>
