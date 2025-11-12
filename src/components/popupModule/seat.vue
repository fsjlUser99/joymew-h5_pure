<template>
  <transition
    enter-active-class="animated faster fadeIn"
    leave-active-class="animated faster fadeOut"
  >
    <div
      v-show="isShowAni"
      class="seatModule publicHvCenter"
    >
      <div
        v-if="boxType === 0"
        class="seatBox publicVCenter"
      >
        <div
          v-if="!seatMyDisplay"
          class="key"
        >
          未查询到您的桌号:
        </div>
        <div
          v-if="seatMyDisplay"
          class="key"
        >
          您的桌号为:
        </div>
        <div
          v-if="!seatMyDisplay"
          class="seatNum"
        >
          空
        </div>
        <div
          v-if="seatMyDisplay"
          class="seatNum"
        >
          {{ seatMyDisplay }}
        </div>
        <div
          v-if="!seatMyDisplay"
          class="sameNum"
        >
          请输入您的姓名或手机号查询
        </div>
        <div
          v-if="seatMyDisplay"
          class="sameNum"
        >
          同桌人数: {{ sameNum }}
        </div>
        <div
          v-if="seatMyDisplay"
          class="members"
        >
          <div
            v-for="(item, index) in seatSearchListDisplay"
            :key="index"
            class="member publicHvCenter"
          >
            {{ item }}
          </div>
        </div>
        <input
          v-if="!seatMyDisplay"
          v-model="namephone"
          name="namephone"
          placeholder="请输入姓名或手机号"
          class="ipt"
          style="width: 80%"
          maxlength="20"
        />
        <div
          v-if="!seatMyDisplay"
          class="getIt publicHvCenter search"
          @click="toSearch"
        >
          立即查询
        </div>
        <div class="getIts publicVCenter">
          <div
            v-if="seatMyDisplay"
            class="getIt publicHvCenter sec"
            @click="reSearch"
          >
            重新查询
          </div>
          <div
            v-if="seatMyDisplay"
            class="getIt publicHvCenter"
            @click="checkSeat"
          >
            查看席位表
          </div>
        </div>
        <img
          src="@/assets/image/dz/seat/closeIcon.png"
          class="closeIcon"
          @click="togglePopup"
        />
      </div>
      <div
        v-if="boxType === 1"
        class="resultBox publicVCenter"
      >
        <img
          src="@/assets/image/dz/seat/empty.png"
          class="emptyImg"
        />
        <div class="tip">
          暂无您的桌号信息，可以查看席位表
        </div>
        <div class="line" />
        <div class="getIts publicVCenter">
          <div
            class="getIt2 sec"
            @click="reSearch"
          >
            重新查询
          </div>
          <div
            class="getIt2"
            @click="checkSeat"
          >
            查看席位表
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { POPUP_MODULE } from '@/assets/constant/index';

export default {
  name: 'SeatPopup',
  data() {
    return {
      giftModuleKey: POPUP_MODULE.giftModule.key,
      isShowAni: false,
      seatMyDisplay: '',
      seatSearchListDisplay: [],
      // name: '',
      // phone: '',
      namephone: '',
      boxType: 0,
    };
  },
  created() {
    this.seatMyDisplay = this.seatMy;
    this.seatSearchListDisplay = this.seatSearchList;
  },
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  computed: {
    ...mapState({
      seatSearchList: (state) => state.live.seatSearchList,
      seatMy: (state) => state.live.seatMy,
      seatList: (state) => state.live.seatList,
    }),
    sameNum() {
      return this.seatSearchList.length;
    },
    inQuery() {
      return !this.seatMyDisplay && this.boxType === 0;
    },
  },
  watch: {
    inQuery: {
      handler(newVal) {
        if (newVal) {
          this.setInSeatQuery(true);
        } else {
          this.setInSeatQuery(false);
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.setInSeatQuery(false);
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
      setSeatSearchInfo: 'live/setSeatSearchInfo',
      setInSeatQuery: 'app/setInSeatQuery',
    }),
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    reSearch() {
      this.boxType = 0;
      this.seatMyDisplay = '';
      this.seatSearchListDisplay = [];
    },
    checkSeat() {
      this.$router.push({
        path: '/seat',
      });
    },
    toSearch() {
      if (!this.namephone) {
        this.$toast.center('请输入姓名或手机号!');
        return;
      }
      const targetSeat = this.seatList.find((item) => item.seat_val.indexOf(this.namephone) > -1);
      if (targetSeat) {
        this.seatMyDisplay = targetSeat.seat_number;
        this.seatSearchListDisplay = targetSeat.userListReal;
        this.setSeatSearchInfo({
          namephone: this.namephone,
        });
      } else {
        this.boxType = 1;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.seatModule {
  position: absolute;
  width: 100%;
  bottom: 0;
  .seatBox {
    width: 560px;
    height: 820px;
    background-image: url(../../assets/image/dz/seat/bg.png);
    background-size: 100% 100%;
    position: absolute;
    // top: 320px;
    bottom: 320px;
    flex-direction: column;
    padding-top: 40px;
    .key {
      font-size: 44px;
      font-weight: 500;
      color: #3a8439;
    }
    .seatNum {
      font-size: 120px;
      font-weight: 600;
      color: #bd8d2c;
      margin-top: 100px;
    }
    .sameNum {
      font-size: 32px;
      font-weight: 500;
      color: #bd8d2c;
      margin-top: 80px;
    }
    .members {
      display: flex;
      align-content: flex-start;
      flex-wrap: wrap;
      margin-top: 40px;
      width: 70vw;
      height: 24vw;
      overflow-y: scroll;
      .member {
        padding: 10px 5px;
        background: #bd8d2c;
        border-radius: 4px;
        margin: 0 10px;
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .ipt {
      width: 470px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid #bd8d2c;
      border-radius: 4px;
      margin-top: 20px;
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 28px;
      font-weight: 400;
      color: #bd8d2c;
      &::placeholder {
        font-size: 28px;
        color: rgba(189, 141, 44, 0.5);
      }
    }
    .getIt {
      width: 210px;
      height: 60px;
      background: #3a8439;
      border-radius: 234px;
      font-size: 28px;
      font-weight: 500;
      color: #ffffff;
      margin-top: 10px;
      &.search {
        margin-top: 40px;
      }
      &.sec {
        background: unset;
        margin-right: 30px;
        background-color: rgba(58, 132, 57, 0.6);
      }
    }
    .closeIcon {
      width: 67px;
      height: 67px;
      position: absolute;
      bottom: -90px;
    }
  }
  .resultBox {
    width: 560px;
    height: 570px;
    background: #ffffff;
    border-radius: 48px;
    position: absolute;
    bottom: 480px;
    flex-direction: column;
    padding-top: 10px;
    .emptyImg {
      width: 272px;
      height: 292px;
    }
    .tip {
      width: 324px;
      font-size: 28px;
      font-weight: 400;
      color: #333333;
      line-height: 40px;
      margin-top: 15px;
    }
    .line {
      width: 556px;
      height: 2px;
      background: #dddddd;
      margin-top: 48px;
    }
    .getIt2 {
      font-size: 36px;
      font-weight: 500;
      color: #000000;
      margin-top: 36px;
      &.sec {
        margin-right: 40px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>
