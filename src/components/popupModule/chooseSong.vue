<template>
  <transition
    enter-active-class="slideInUp faster animated"
    leave-active-class="slideOutDown faster animated"
  >
    <div
      v-show="isShowAni"
      class="chooseSongModule"
    >
      <div class="chooseSongBox publicVCenter">
        <img
          v-tap="{ methods: closePopupModule }"
          src="@/assets/image/popupArea/closeIcon.png"
          class="closeIcon"
        />
        <img
          src="@/assets/image/popupArea/chooseSongTitle.png"
          class="chooseSongTitle"
        />
        <div class="nav publicVCenter">
          <div
            v-tap="{ methods: chooseNav, navIndex: 0 }"
            class="navItem publicVCenter"
            :class="{ active: navIndex === 0 }"
          >
            现场歌单
          </div>
          <div
            v-tap="{ methods: chooseNav, navIndex: 1 }"
            class="navItem publicVCenter"
            :class="{ active: navIndex === 1 }"
          >
            <div class="navAvatarList">
              <img
                v-for="(avatar, index) in newThreeAvatars"
                :key="index"
                :src="avatar"
                class="navAvatar"
              />
            </div>
            已点 ({{ orderedNum }}首)
          </div>
        </div>
        <!-- nav0 -->
        <div
          v-if="navIndex === 0"
          class="songSheetWrap"
        >
          <div
            v-for="item in songSheetList"
            :key="item.music_id"
            v-tap="{ methods: chooseSongs, param: item.music_id }"
            class="songItem publicVCenter"
            :class="{ active: choosedSongId === item.music_id }"
          >
            <div class="radio" />
            <div class="info">
              <div class="songName">
                {{ item.music_name }}
              </div>
              <div class="chooseNum">{{ item.dot_size }}人点过</div>
            </div>
            <div class="price">
              <div class="priceVal">{{ item.music_price }} ¥</div>
              <!-- <div class="orderPeopleNum">
                {{ item.dot_size }}人点过
              </div> -->
            </div>
          </div>
        </div>
        <!-- <div class="operateArea publicVCenter" v-if="navIndex === 0">
          <div class="payInfo">
            <label class="price">{{ choosedPrice }}</label
            >￥
          </div>
          <div class="payBtn publicHvCenter" v-tap="{ methods: orderSong }">立即支付</div>
        </div> -->
        <!-- nav1 -->
        <div
          v-if="navIndex === 1"
          class="playSheetWrap"
        >
          <div
            v-for="(item, index) in songOrderList"
            :key="index"
            class="songItem publicVCenter"
          >
            <div class="songName">
              {{ item.title }}
            </div>
            <div class="userInfo">
              <img
                :src="item.avator"
                class="headImg"
              />
              <div class="userName">
                {{ item.wx_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isShowIdentityChooseDialog"
        class="identityChooseDialogWrap publicHvCenter"
      >
        <div class="shade" />
        <div class="identityChooseDialog publicVCenter">
          <img
            v-tap="{ methods: closeIdentityChooseDialog }"
            src="@/assets/image/popupArea/closeIcon.png"
            class="closeIcon"
          />
          <div class="identityTit">{{ isWeddingScene ? '点歌为新人送祝福' : '点歌送祝福' }}</div>
          <div class="formItem" v-if="isWeddingScene">
            <div class="formKey">您是?</div>
            <div class="formVal typeFrom">
              <div
                v-tap="{ methods: chooseTypeFrom, typeFrom: '1' }"
                class="typeFormBtn publicHvCenter"
                :class="{ active: relationshipForm.typeFrom === '1' }"
              >
                男方亲友
              </div>
              <div
                v-tap="{ methods: chooseTypeFrom, typeFrom: '2' }"
                class="typeFormBtn publicHvCenter"
                :class="{ active: relationshipForm.typeFrom === '2' }"
              >
                女方亲友
              </div>
            </div>
          </div>
          <div class="formItem" v-if="isWeddingScene">
            <div class="formKey">您与新郎/新娘的关系是?</div>
            <div class="formVal relationShip">
              <!-- <div
                v-for="item in relationshipList"
                :key="item.id"
                v-tap="{ methods: chooseRelation, relationId: item.id }"
                class="relationShipItem publicVCenter"
                :class="{ active: item.id === relationshipForm.relationship }"
              >
                <div class="radio" />
                <div class="relationShipName">
                  {{ item.name }}
                </div>
              </div> -->
              <input
                v-model="relationshipForm.relationship"
                class="relationship-input"
                type="text"
                placeholder="如：舅舅、姑姑、叔叔等"
              />
            </div>
          </div>
          <div class="formItem">
            <div class="formKey">{{ isWeddingScene ? '您的姓名？' : '您的姓名' }}</div>
            <div class="formVal relationShip">
              <input
                v-model="relationshipForm.nickname"
                class="relationship-input"
                type="text"
                placeholder="请填写"
              />
            </div>
          </div>
          <div class="formItem">
            <div class="formKey">{{ isWeddingScene ? '给新郎新娘送一句祝福吧' : '送一句祝福吧' }}</div>
            <div class="formVal bless-container">
              <textarea
                v-model="relationshipForm.bless"
                class="bless-txtarea"
                maxlength="20"
                type="text"
                :placeholder="isWeddingScene ? '请填写祝福语（20字）' : '请填写祝福语（20字）'"
              />
              <div
                v-tap="{ methods: getTmpBless }"
                class="yulu-btn"
              >
                语录
              </div>
            </div>
          </div>
          <div
            v-tap="{ methods: orderSong }"
            class="payBtn publicHvCenter"
          >
            支付 ¥{{ choosedPrice }}点歌送祝福
          </div>
          <div
            v-tap="{ methods: closeIdentityChooseDialog }"
            class="cancelBtn"
          >
            取消
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { POPUP_MODULE } from '@/assets/constant/index';
import { getSongOrderedList } from '@/api/index/index';
import wxApi from '@/utils/wxApi';
import { timeoutTask, generateRandom } from '@/utils/index';
import { generateQuickWishBySceneType } from '@/utils/service';

const RELATIONS = [
  {
    id: '1',
    name: '舅舅',
  },
  {
    id: '2',
    name: '姑姑',
  },
  {
    id: '3',
    name: '叔叔',
  },
  {
    id: '4',
    name: '外公',
  },
  {
    id: '5',
    name: '外婆',
  },
  {
    id: '6',
    name: '婶婶',
  },
  {
    id: '7',
    name: '爷爷',
  },
  {
    id: '8',
    name: '奶奶',
  },
  {
    id: '9',
    name: '亲友',
  },
];
export default {
  name: 'ChooseSongPopup',
  computed: {
    ...mapState({
      sceneType: (state) => state.live.sceneType,
      giftSendVisible: (state) => state.app.giftSendVisible,
      songSheetList: (state) => state.app.songSheetList,
      customSignWish: (state) => state.live.customSignWish,
    }),
    isWeddingScene() {
      return this.sceneType === '0';
    },
    choosedPrice() {
      let tempPrice = 0;
      if (this.choosedSongId) {
        tempPrice = this.songSheetList.find((item) => item.music_id === this.choosedSongId).music_price;
      }
      return tempPrice;
    },
    orderedNum() {
      return this.songOrderList.length;
    },
    newThreeAvatars() {
      return this.songOrderList.map((item) => item.avator).slice(-3);
    },
  },
  created() {},
  mounted() {
    // 执行弹出动画
    this.showAniStart();
    this.initOrderedSongList();
  },
  data() {
    return {
      isShowAni: false, // chooseSong box弹出动画
      chooseSongModuleKey: POPUP_MODULE.chooseSongModule.key,
      navIndex: 0,
      choosedSongId: '',
      songOrderList: [],
      relationshipList: RELATIONS,
      relationshipForm: {
        typeFrom: '', // 1: 男方亲友 2: 女方亲友
        relationship: '',
        nickname: '', // 姓名
        bless: '', // 输入的祝福语
      },

      isShowIdentityChooseDialog: false,
    };
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
      setOrigin: 'app/setOrigin',
    }),
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    openPopupModule(e) {
      this.togglePopup();
      timeoutTask(() => {
        this.togglePopup(e.key);
      }, 200);
    },
    chooseNav(p) {
      console.log(p.navIndex);
      this.navIndex = p.navIndex;
    },
    closePopupModule() {
      this.hideAniStart();
      timeoutTask(() => {
        this.togglePopup();
      }, 200);
    },
    chooseSongs(p) {
      if (this.choosedSongId === p.param) {
        this.choosedSongId = '';
        return;
      }
      this.choosedSongId = p.param;
      this.isShowIdentityChooseDialog = true;
    },
    initOrderedSongList() {
      getSongOrderedList()
        .then((res) => {
          console.log(res);
          this.songOrderList = res.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * 跳转支付页
     */
    newJumpPay({ giftId, giftText }) {
      wxApi.navigateTo(
        `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&giftId=${giftId}&origin=${this.$store.state.app.origin}&giftText=${giftText}`,
      );
    },
    orderSong() {
      if (!this.choosedSongId) {
        this.$toast.center('请选择音乐!');
        return;
      }

      // 条件校验
      if (this.isWeddingScene) {
        if (!this.relationshipForm.typeFrom) {
          this.$toast.center('请选择亲友!');
          return;
        }
        if (!this.relationshipForm.relationship) {
          this.$toast.center('请输入您与新郎/新娘的关系!');
          return;
        }
      }

      if (!this.relationshipForm.nickname) {
        this.$toast.center('请输入您的姓名!');
        return;
      }
      if (!this.relationshipForm.bless) {
        this.$toast.center('请输入您要发送的祝福语!');
        return;
      }
      // 构建发送的数据
      const giftPayload = {
        nickname: this.relationshipForm.nickname,
        bless: this.relationshipForm.bless,
      };

      if (this.isWeddingScene) {
        giftPayload.typeFrom = this.relationshipForm.typeFrom;
        giftPayload.relationship = this.relationshipForm.relationship;
      }

      this.setOrigin('orderSong');
      if (this.$store.state.app.mpType) {
        // 新的跳转支付逻辑
        this.newJumpPay({
          giftId: this.choosedSongId,
          // 使用构建好的 payload
          giftText: JSON.stringify(giftPayload),
        });
      } else {
        // 旧的跳转支付逻辑
        wxApi.navigateTo(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&origin=${
            this.$store.state.app.origin
          }&giftconst=${this.choosedSongId}&guanxi=${JSON.stringify(giftPayload)}`,
        );
      }
      this.closeIdentityChooseDialog();
    },
    closeIdentityChooseDialog() {
      this.isShowIdentityChooseDialog = false;
      this.relationshipForm.bless = '';
      this.choosedSongId = '';
    },
    chooseTypeFrom(e) {
      this.relationshipForm.typeFrom = e.typeFrom;
    },
    chooseRelation(e) {
      console.log(e);
      this.relationshipForm.relationship = e.relationId;
    },
    // 点击语录
    getTmpBless() {
      // Use the same logic as ganerateRandomWish from bapin.vue
      if (this.customSignWish && this.customSignWish.length > 0) {
        console.log('自定义语录', this.customSignWish);
        const sourceQuickWish = this.customSignWish.map((item) => item.bless_str);
        const quickWishLen = sourceQuickWish.length;
        this.relationshipForm.bless = sourceQuickWish[generateRandom(0, quickWishLen)];
        return;
      }
      this.relationshipForm.bless = generateQuickWishBySceneType(this.sceneType);
    },
  },
};
</script>
<style lang="less" scoped>
.chooseSongModule {
  position: absolute;
  width: 100%;
  bottom: 0;
  .chooseSongBox {
    width: 750px;
    height: 72vh;
    background: radial-gradient(#2f116b, #170d41);
    flex-direction: column;
    position: relative;
    .closeIcon {
      width: 48px;
      height: 48px;
      position: absolute;
      right: 16px;
      top: 4px;
    }
    .chooseSongTitle {
      width: 342px;
      height: 72px;
    }
    .nav {
      justify-content: space-around;
      width: 100%;
      margin-top: 40px;
      .navItem {
        font-size: 28px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6);
        position: relative;
        flex-direction: column;
        .navAvatarList {
          margin-right: 28px;
          position: absolute;
          right: 120px;
          white-space: nowrap;
          .navAvatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: -8px;
            &:nth-child(3) {
              margin-right: 0;
            }
          }
        }
        &.active {
          color: #fff;
          &::after {
            display: block;
            content: '';
            width: 32px;
            height: 4px;
            background: #ffffff;
            border-radius: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .songSheetWrap {
      width: 100%;
      height: 65vh;
      overflow-y: scroll;
      padding-top: 40px;
      .songItem {
        width: 686px;
        height: 136px;
        background: #3c2183;
        border-radius: 16px;
        margin: 0 auto;
        margin-bottom: 16px;
        padding: 20px 32px;
        position: relative;
        .radio {
          width: 24px;
          height: 24px;
          opacity: 1;
          border: 2px solid #ffffff;
          border-radius: 40px;
        }
        .info {
          margin-left: 32px;
          .songName {
            width: 63vw;
            font-size: 32px;
            font-weight: 400;
            color: #c2baf5;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .chooseNum {
            font-size: 28px;
            font-weight: 400;
            color: #c2baf5;
            margin-top: 8px;
          }
        }
        .price {
          font-size: 32px;
          color: #c2baf5;
          position: absolute;
          right: 32px;
          display: flex;
          align-items: flex-end;
          flex-direction: column;
          .orderPeopleNum {
            font-size: 28px;
            margin-top: 8px;
          }
        }
        &.active {
          .radio {
            background-image: url('../../assets/image/popupArea/tickIcon.png');
            background-size: 100% 100%;
          }
        }
      }
    }
    .operateArea {
      justify-content: space-between;
      padding: 0 32px;
      margin-top: 32px;
      width: 100%;
      position: absolute;
      bottom: 60px;
      .payInfo {
        font-size: 28px;
        font-weight: 400;
        color: #c2baf5;
        .num {
          color: #ff3675;
        }
        .price {
          color: #ff3675;
          font-size: 40px;
          margin-left: 12px;
        }
      }
      .payBtn {
        width: 252px;
        height: 72px;
        opacity: 1;
        background: linear-gradient(90deg, #6c47ff, #ff68f9 100%);
        border-radius: 12px;
        color: #fff;
      }
    }
    .playSheetWrap {
      width: 100%;
      height: 80vh;
      overflow-y: scroll;
      margin-top: 32px;
      .songItem {
        width: 686px;
        height: 136px;
        background: linear-gradient(180deg, rgba(84, 75, 168, 0), #544ba8 100%);
        border-radius: 16px;
        margin: 0 auto;
        margin-bottom: 24px;
        position: relative;
        .songName {
          width: 484px;
          font-size: 36px;
          font-weight: 400;
          color: #ece9ff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-left: 32px;
        }
        .userInfo {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
          position: absolute;
          right: 16px;
          .headImg {
            width: 56px;
            height: 56px;
            border-radius: 50%;
          }
          .userName {
            font-size: 28px;
            font-weight: 400;
            color: #c2baf5;
            margin-top: 4px;
            max-width: 200px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .identityChooseDialogWrap {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .shade {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .identityChooseDialog {
      flex-direction: column;
      width: 560px;
      padding: 32px 0;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 24px;
      position: relative;
      z-index: 1;
      padding-top: 48px;
      .closeIcon {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 23px;
        top: 24px;
      }
      .identityTit {
        font-size: 32px;
        margin-bottom: 34px;
      }
      .formItem {
        padding: 0 24px;
        margin-bottom: 20px;
        width: 100%;
        .formKey {
          font-size: 28px;
          font-weight: 500;
          margin-bottom: 26px;
        }
        .formVal {
          &.typeFrom {
            display: flex;
            justify-content: center;
            gap: 34px;
          }
          &.relationShip {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            row-gap: 32px;
            column-gap: 40px;
            .relationship-input {
              width: 100%;
              height: 70px;
              padding: 24px;
              box-sizing: border-box;
              border-radius: 8px;
              border: 2px solid #d9d9d9;
            }
          }
          .typeFormBtn {
            width: 144px;
            height: 50px;
            border: 2px solid #565ef5;
            border-radius: 94px;
            color: #565ef5;
            font-size: 24px;
            &.active {
              color: #ffffff;
              background-image: linear-gradient(266deg, #31a3fd 0%, #565ef5 100%);
              border: unset;
            }
            &:last-of-type {
              color: #f55670;
              border: 2px solid #f55670;
              &.active {
                color: #fff;
                background-image: linear-gradient(266deg, #fd31f7 0%, #f55670 100%);
              }
            }
          }
          .relationShipItem {
            .radio {
              width: 32px;
              height: 32px;
              border: 2px solid #ffffff;
              border-radius: 40px;
            }
            .relationShipName {
              margin-left: 16px;
              font-size: 32px;
              font-weight: 400;
              color: #ffffff;
            }
            &.active {
              .radio {
                background-image: url('../../assets/image/popupArea/tickIcon.png');
                background-size: 100% 100%;
              }
            }
          }
          &.bless-container {
            width: 100%;
            position: relative;
            .bless-txtarea {
              width: 100%;
              height: 140px;
              padding: 16px 110px 16px 24px;
              box-sizing: border-box;
              border: 2px solid #d9d9d9;
              border-radius: 8px;
              font-size: 28px;
              resize: none;
            }
            .yulu-btn {
              width: fit-content;
              padding: 10px 16px;
              box-sizing: border-box;
              background-color: #231f44;
              border-radius: 10px;
              color: #c2baf5;
              font-size: 28px;
              position: absolute;
              top: 16px;
              right: 24px;
            }
          }
        }
      }
      .payBtn {
        margin-top: 30px;
        width: 512px;
        height: 80px;
        background-image: linear-gradient(90deg, #6c47ff, #ff68f9 100%);
        border-radius: 12px;
        font-size: 28px;
        font-weight: 500;
        color: #ffffff;
      }
      .cancelBtn {
        margin-top: 30px;
        font-size: 28px;
        font-weight: 400;
        color: #aba8eb;
      }
    }
  }
}
</style>
