<template>
  <!-- 婚礼版充值 -->
  <div class="rechargeContainer publicVCenter">
    <back v-show="!popupAreaVisible" />
    <img
      src="@/assets/image/rechargeWedding/topBg.png"
      class="topBg"
    />
    <div class="userInfo publicVCenter">
      <div
        v-tap="{ methods: openPopupModule, key: editInfoModuleKey }"
        class="headImgBox"
      >
        <img
          :src="headImg"
          class="headImg"
        />
        <img
          v-show="!isTql"
          src="@/assets/image/rechargeWedding/pencil.png"
          class="pencilImg"
        />
      </div>
      <div class="accountInfo">
        <div class="top publicVCenter">
          <div class="nickname">
            {{ name }}
          </div>
          <div class="level publicHvCenter">
            <img
              src="@/assets/image/rechargeWedding/crown.png"
              class="crownImg"
            />
            <div class="levelVal">
              Lv{{ vipLevel }}
            </div>
          </div>
        </div>
        <div class="bottom publicVCenter">
          余额：{{ money }}
          <img
            src="@/assets/image/rechargeWedding/diamond.png"
            class="diamondImg"
          />
        </div>
      </div>
      <div class="relativeType publicHvCenter">
        <img
          v-if="relativeType === '1'"
          src="@/assets/image/rechargeWedding/boyIcon.png"
          class="relativeIcon"
        />
        <img
          v-if="relativeType === '2'"
          src="@/assets/image/rechargeWedding/girlIcon.png"
          class="relativeIcon"
        />
        {{ relativeTypeText }}
      </div>
    </div>
    <!-- 固定充值金额区域 -->
    <div class="limitRechargeArea publicHCenter">
      <div
        v-for="(item, index) in rechargeList"
        :key="index"
        v-tap="{ methods: recharge, p: item }"
        class="rechargeItem publicHvCenter"
      >
        <img
          src="@/assets/image/rechargeWedding/diamond.png"
          class="diamondIcon"
        />
        <div class="num">
          {{ item }}
        </div>
        <img
          v-if="index === rechargeList.length - 1"
          src="@/assets/image/rechargeWedding/th.png"
          class="thIcon"
        />
      </div>
    </div>
    <!-- 反馈入口 -->
    <feedbackEntry v-show="!popupAreaVisible" />
    <!-- 协议 -->
    <div
      v-tap="{ methods: toAgreement }"
      class="agreement"
    >
      阅读并同意
      <div class="bond">
        《充值服务协议》
      </div>
    </div>
    <!-- 祝福榜单列表 -->
    <div class="wishSheetList publicVCenter">
      <img
        src="@/assets/image/rechargeWedding/bdTitle.png"
        class="bdTitle"
      />
      <div class="vsTitle publicHvCenter">
        <div class="boy publicVCenter">
          <img
            src="@/assets/image/rechargeWedding/boy.png"
            class="sexIcon"
          />
          男方亲友
        </div>
        <img
          src="@/assets/image/rechargeWedding/vs.png"
          class="vsIcon"
        />
        <div class="girl publicVCenter">
          <img
            src="@/assets/image/rechargeWedding/girl.png"
            class="sexIcon"
          />
          女方亲友
        </div>
      </div>
      <div class="gapLine" />
      <div class="listWrap publicHCenter">
        <div class="sexList boy">
          <div
            v-for="(item, index) in giftRankListBoy"
            :key="index"
            class="item"
          >
            <div class="user publicVCenter">
              <div class="baseInfo publicVCenter">
                <img
                  :src="item.avator"
                  class="headImg"
                />
                <div class="name">
                  {{ item.wx_name }}
                </div>
              </div>
            </div>
            <div class="sendGiftNum">
              送出{{ item.size }}个祝福
            </div>
          </div>
        </div>
        <div class="sexList girl">
          <div
            v-for="(item, index) in giftRankListGirl"
            :key="index"
            class="item"
          >
            <div class="user publicVCenter">
              <div class="baseInfo publicVCenter">
                <img
                  :src="item.avator"
                  class="headImg"
                />
                <div class="name">
                  {{ item.wx_name }}
                </div>
              </div>
            </div>
            <div class="sendGiftNum">
              送出{{ item.size }}个祝福
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出区域 -->
    <myPopup />
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import wxApi from '@/utils/wxApi';
import { getRoleGiftRankList, diamondRecharge } from '@/api/index/index';
import { POPUP_MODULE } from '@/assets/constant/index';
import myPopup from '@/views/index/components/popupArea.vue';
import feedbackEntry from '@/components/feedbackEntry/index.vue';
import back from '@/components/back/index.vue';

let requestLock = false;
export default {
  name: 'RechargeWedding',
  data() {
    return {
      giftRankListBoy: [],
      giftRankListGirl: [],
      editInfoModuleKey: POPUP_MODULE.editInfoModule.key,
    };
  },
  computed: {
    ...mapState({
      name: (state) => state.user.name,
      headImg: (state) => state.user.headImg,
      vipLevel: (state) => state.user.vipLevel,
      money: (state) => state.user.money,
      relativeType: (state) => state.user.relativeType,
      rechargeList: (state) => state.live.rechargeList,
      popupAreaVisible: (state) => state.app.popupAreaVisible,
    }),
    ...mapGetters({
      isTql: 'user/isTql',
    }),
    relativeTypeText() {
      return this.relativeType === '1' ? '男方亲友' : '女方亲友';
    },
  },
  components: {
    feedbackEntry,
    myPopup,
    back,
  },
  created() {
    requestLock = false;
    this.getGiftRankList();
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
      setUserInfo: 'user/setUserInfo',
    }),
    toAgreement() {
      window.location.href = '/agreement/index.html';
    },
    getGiftRankList() {
      getRoleGiftRankList()
        .then((res) => {
          console.log(res);
          this.giftRankListBoy = res.list1.map((item) => {
            return {
              ...item,
              wx_name: item.wx_name.length > 4 ? `${item.wx_name.slice(0, 4)}...` : item.wx_name,
            };
          });
          this.giftRankListGirl = res.list2.map((item) => {
            return {
              ...item,
              wx_name: item.wx_name.length > 4 ? `${item.wx_name.slice(0, 4)}...` : item.wx_name,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openPopupModule(e) {
      if (this.isTql) {
        return;
      }
      this.togglePopup(e.key);
    },
    recharge(e) {
      if (requestLock) {
        return;
      }
      requestLock = true;
      diamondRecharge({
        total: e.p,
      })
        .then((res) => {
          console.log(res);
          return wxApi.pay(res);
        })
        .then(() => {
          // 前端处理用户余额增加
          const tmpRemainMoney = (parseFloat(this.money) + parseFloat(e.p)).toFixed(2);
          this.setUserInfo({
            money: tmpRemainMoney,
          });
          this.$toast.center('充值成功!');
          requestLock = false;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.center('充值失败!');
          requestLock = false;
        });
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.rechargeContainer {
  position: relative;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #f4f7f9;
  .topBg {
    width: 100%;
    height: 678px;
    position: absolute;
  }
  .userInfo {
    width: 100%;
    margin-top: 120px;
    padding: 0 40px;
    position: relative;
    .headImgBox {
      position: relative;
      width: 110px;
      height: 110px;
      .headImg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .pencilImg {
        width: 40px;
        height: 40px;
        position: absolute;
        top: -10px;
        right: -2px;
      }
    }
    .accountInfo {
      margin-left: 36px;
      .top {
        .nickname {
          font-size: 36px;
          color: #ffffff;
          font-weight: 500;
        }
        .level {
          width: 48px;
          height: 42px;
          position: relative;
          margin-left: 20px;
          .crownImg {
            width: 100%;
            height: 100%;
          }
          .levelVal {
            font-size: 20px;
            color: #fff;
            position: absolute;
            margin-top: 2vw;
          }
        }
      }
      .bottom {
        margin-top: 16px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 24px;
        .diamondImg {
          width: 32px;
          height: 26px;
          margin-left: 14px;
        }
      }
    }
    .relativeType {
      width: 140px;
      height: 48px;
      background: rgba(255, 255, 255, 0.28);
      border-radius: 24px;
      font-size: 20px;
      color: rgba(255, 255, 255, 0.6);
      position: absolute;
      right: 40px;
      bottom: 0;
      .relativeIcon {
        width: 22px;
        height: 24px;
        margin-right: 10px;
      }
    }
  }
  .limitRechargeArea {
    flex-wrap: wrap;
    margin-top: 140px;
    position: relative;
    .rechargeItem {
      width: 187px;
      height: 100px;
      margin: 12px 12px;
      background-color: #eee9ff;
      border-radius: 10px;
      position: relative;
      .diamondIcon {
        width: 64px;
        height: 52px;
        margin-top: 12px;
      }
      .num {
        font-size: 42px;
        font-weight: 500;
        color: #9c2cf3;
        margin-left: 6px;
      }
      .thIcon {
        width: 74px;
        height: 32px;
        position: absolute;
        top: -16px;
        right: -16px;
      }
    }
  }
  .agreement {
    font-size: 22px;
    font-weight: 500;
    color: #666666;
    margin-top: 12px;
    position: relative;
    display: flex;
    .bond {
      color: #dc2f2f;
    }
  }
  .wishSheetList {
    position: relative;
    margin-top: 90px;
    width: 690px;
    height: 856px;
    background: #ffffff;
    box-shadow: 0px 4px 10px -2px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    flex-direction: column;
    .bdTitle {
      width: 372px;
      height: 86px;
      position: absolute;
      top: -42px;
    }
    .vsTitle {
      width: 100%;
      margin-top: 84px;
      .boy {
        font-size: 32px;
        font-weight: 600;
        color: #4526c2;
        .sexIcon {
          width: 36px;
          height: 40px;
          margin-right: 8px;
        }
      }
      .vsIcon {
        width: 52px;
        height: 52px;
        margin: 0 58px;
      }
      .girl {
        font-size: 32px;
        font-weight: 600;
        color: #ea1877;
        .sexIcon {
          width: 32px;
          height: 44px;
          margin-right: 8px;
        }
      }
    }
    .gapLine {
      width: 636px;
      height: 2px;
      border: 1px solid #eeeeee;
      margin-top: 24px;
    }
    .listWrap {
      width: 100%;
      margin-top: 36px;
      height: 800px;
      overflow-y: scroll;
      .sexList {
        width: 35%;
        margin: 0 24px;
        .item {
          margin-bottom: 60px;
          .user {
            justify-content: space-between;
            .baseInfo {
              margin-right: 12px;
              .headImg {
                width: 56px;
                height: 56px;
                margin-right: 14px;
                border-radius: 50%;
              }
              .name {
                font-size: 28px;
                color: #514e4e;
                font-weight: 400;
              }
            }
            .level {
              width: 36px;
              height: 30px;
              position: relative;
              .crownImg {
                width: 100%;
                height: 100%;
              }
            }
          }
          .sendGiftNum {
            font-size: 28px;
            font-weight: 400;
            color: #4526c2;
            margin-top: 12px;
          }
        }
      }
    }
  }
}
</style>
