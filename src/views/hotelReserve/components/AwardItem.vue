<template>
  <div
    v-tap="{ methods: turnToCouponDetail }"
    class="award-item"
  >
    <!-- <div class="award-item" @click.prevent.stop="turnToCouponDetail"> -->
    <div class="item-header">
      <div class="item-label">
        云镜优惠券
      </div>
    </div>
    <div class="item-mid">
      <div class="mid-container">
        <img
          class="item-logo"
          src="~@/assets/image/hlt/choujiang/youhuiquan.png"
        />
        <div class="item-info">
          <div class="item-name">
            {{ award.award_name }}
          </div>
          <div class="item-validate-time">
            {{ award.end_time.replaceAll('-', '.') + '到期' }}
          </div>
        </div>
        <div class="item-other">
          <div class="item-discount">
            {{ '￥' + award.award_discount }}
          </div>
          <div class="item-condition">
            {{ `满${award.award_condition}可用` }}
          </div>
        </div>
      </div>
    </div>
    <div class="item-footer">
      <a
        v-tap.stop
        :href="`tel:${tel}`"
      >
        <div class="tel-container">
          <span>咨询电话</span>
          <img
            class="tel-icon"
            src="~@/assets/image/hlt/choujiang/tel-icon.png"
            alt=""
          />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { saveHotelInfoToLocal } from '@/utils/service';
import wxApi from '@/utils/wxApi';

export default {
  name: 'AwardItem',
  props: {
    award: {
      type: Object,
    },
  },
  computed: {
    ...mapState({
      env: (state) => state.app.env,
    }),
  },
  data() {
    return {
      tel: '',
    };
  },
  mounted() {
    // 获取酒店手机号
    this.tel = localStorage.getItem('hotelTel');
  },
  methods: {
    turnToCouponDetail() {
      console.log('跳转至指定优惠券详情页面');
      // 记录当前奖项id
      saveHotelInfoToLocal({
        key: 'currentId',
        value: this.$props.award.coupon_id,
      });
      if (this.env === 'miniProgram') {
        wxApi.navigateTo('/pages/hotelReserve/preferentialDetail/preferentialDetail');
      } else if (this.env === 'h5') {
        this.$router.push({
          path: '/preferentialDetail',
        });
      } else if (this.env === 'tt') {
        wxApi.navigateToTt('/pages/hotelReserve/preferentialDetail/preferentialDetail');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.award-item {
  width: 100%;
  height: 296px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .item-header {
    width: 100%;
    height: 40px;
    margin-bottom: 18px;
    position: relative;
    .item-label {
      padding: 6px 16px;
      box-sizing: border-box;
      color: #fff;
      font-size: 20px;
      background-image: url('~@/assets/image/hlt/choujiang/label-bg.png');
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .item-mid {
    width: 100%;
    flex: 1;
    padding: 0 30px;
    box-sizing: border-box;

    .mid-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f1f2;

      .item-logo {
        width: 154px;
        height: 150px;
        margin-right: 18px;
      }
      .item-info {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .item-name {
          margin-bottom: 8px;
          color: #333333;
          font-size: 28px;
          font-weight: bold;
        }

        .item-validate-time {
          color: rgba(0, 0, 0, 0.4);
          font-size: 24px;
        }
      }
      .item-other {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .item-discount {
          color: #ff457a;
          font-size: 48px;
          font-weight: bold;
        }
        .item-condition {
          color: rgba(0, 0, 0, 0.4);
          font-size: 30px;
        }
      }
    }
  }

  .item-footer {
    width: 100%;
    height: 67px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    a {
      color: #ff457a;
      &:link,
      &:visited,
      &:hover,
      &:active {
        color: #ff457a;
      }
      .tel-container {
        display: flex;
        align-items: center;
        font-size: 24px;
        span {
          margin-right: 18px;
        }
        .tel-icon {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
