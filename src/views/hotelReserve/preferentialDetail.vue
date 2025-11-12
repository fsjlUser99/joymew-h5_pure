<template>
  <div class="detail-page">
    <back v-if="env === 'h5'" />
    <div class="coupon-container">
      <div class="coupon-top part">
        <div class="coupon-name">
          {{ couponData.award_name }}
        </div>
        <div class="coupon-validate">
          {{ `用券时间：${couponData.start_time} 至 ${couponData.end_time}` }}
        </div>
        <div class="coupon-content">
          {{ `优惠内容：满${couponData.award_condition}元减${couponData.award_discount}元` }}
        </div>
      </div>
      <div class="coupon-bottom part">
        <div class="coupon-intro">
          {{ `使用须知：${couponData.intro || '暂无'}` }}
        </div>
        <div class="coupon-tip">
          <span>具体使用方法可电话联系客服或到店咨询</span>
          <a :href="`tel:${tel}`">客服电话：{{ tel }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotelInfoFromLocal } from '@/utils/service';
import { mapState } from 'vuex';
import back from '@/components/back/index.vue';

export default {
  name: 'PreferentialDetail',
  components: {
    back,
  },
  computed: {
    ...mapState({
      env: (state) => state.app.env,
    }),
  },
  data() {
    return {
      couponList: [],
      couponId: '',
      couponData: {},
      tel: '',
    };
  },
  mounted() {
    this.getCouponListData();
    // 获取手机号
    this.tel = localStorage.getItem('hotelTel');
  },
  methods: {
    // 获取对应的优惠券数据
    getCouponListData() {
      // 获取所有的优惠券数据
      this.couponList = getHotelInfoFromLocal('couponList');
      // 获取当前查看的优惠券id
      this.couponId = getHotelInfoFromLocal('currentId');
      // 通过id在所有优惠券数据中对应的数据
      this.couponData = this.couponList.find((item) => {
        if (item.coupon_id === this.couponId) {
          item.end_time = item.end_time.replaceAll('-', '.');
          item.start_time = item.start_time.replaceAll('-', '.');
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.detail-page {
  width: 100%;
  height: 100vh;
  padding: 32px 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: #ff457a;

  .coupon-container {
    width: 100%;
    min-height: 736px;
    padding: 50px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('~@/assets/image/hlt/choujiang/coupon-bg.png');
    background-size: 100% 100%;
    border-radius: 20px;

    .part {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .coupon-top {
      min-height: 300px;
      border-bottom: 4px dashed rgba(0, 0, 0, 0.4);
      padding-bottom: 40px;
      .coupon-name {
        width: 100%;
        margin-bottom: 34px;
        color: #333333;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        word-wrap: break-word;
      }
      .coupon-validate {
        width: 100%;
        margin-bottom: 50px;
        color: rgba(0, 0, 0, 0.4);
        font-size: 34px;
        text-align: left;
      }
      .coupon-content {
        width: 100%;
        color: #333333;
        font-size: 34px;
        text-align: left;
      }
    }
    .coupon-bottom {
      flex: 1;
      padding-top: 56px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .coupon-intro {
        width: 100%;
        color: #333333;
        font-size: 32px;
        line-height: 46px;
        text-align: left;
      }
      .coupon-tip {
        color: rgba(0, 0, 0, 0.4);
        font-size: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        a {
          margin-top: 20px;
          display: inline-block;
          &:link,
          &:visited,
          &:hover,
          &:active {
            color: #743920;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
