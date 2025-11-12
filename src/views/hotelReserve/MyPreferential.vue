<template>
  <div class="my-preferential-page">
    <back v-if="env === 'h5'" />
    <div class="item-container">
      <div
        v-for="(award, index) in dataList"
        :key="index"
        class="award-item"
      >
        <award-item :award="award" />
      </div>
      <div
        v-show="currentPage < totalPage"
        v-tap="{ methods: moreData }"
        class="show-more"
      >
        查看更多
      </div>
    </div>
    <section
      v-if="banquetHallList.length"
      class="block2"
      :class="{ open: isBHOpen }"
    >
      <div class="currentNav">
        宴会厅 ({{ banquetHallList.length }})
      </div>
      <div class="cardList">
        <div
          v-for="(item, index) in banquetHallList"
          :key="index"
          v-tap="{ methods: toHotelDetail, id: item.id }"
          class="card"
        >
          <div class="topPoster">
            <img :src="item.content.detail.posterList[0]" />
          </div>
          <div class="info">
            <div class="hotelName">
              {{ item.content.name }}
            </div>
            <div class="trait">
              <label v-if="item.content.floorHeight !== 0">层高 {{ item.content.floorHeight }}米</label>
              <label v-if="item.content.columnStatus !== '2'">{{ item.content.columnStatus === '0' ? '无柱' : '有柱' }}</label>
            </div>
            <div class="toDetailBtn publicHvCenter">
              了解详情
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="banquetHallList.length > 2"
        v-tap="{ methods: getMoreBanquetHall }"
        class="getMoreInfo publicHvCenter"
      >
        查看更多{{ banquetHallList.length - 2 }}个宴会厅
        <img src="~@/assets/image/hotelReserve/downarrow.png" />
      </div>
    </section>
    <ReserveBtn
      :visible="!reverseVisible"
      :phone="phone"
      @show="reverseVisible = true"
    />
    <ReserveBox
      :splid="splid"
      :visible="reverseVisible"
      @cancel="reverseVisible = false"
      @sure="reverseVisible = false"
    />
  </div>
</template>

<script>
import { getMyPreferentialData } from '@/api/hotelReserve/hlt';
import { saveHotelInfoToLocal, getHotelInfoFromLocal } from '@/utils/service';
import wxApi from '@/utils/wxApi';
import { mapState } from 'vuex';
import back from '@/components/back/index.vue';
import AwardItem from './components/AwardItem.vue';
import ReserveBtn from './components/ReserveBtn.vue';
import ReserveBox from './components/ReserveBox.vue';

export default {
  name: 'MyPreferential',
  components: {
    back,
    AwardItem,
    ReserveBtn,
    ReserveBox,
  },
  data() {
    return {
      dataList: [],
      showCount: 10,
      currentPage: 1,
      totalPage: 0,
      totalResult: 0,
      reverseVisible: false,
      isBHOpen: false,
      splid: '',
      banquetHallList: [],
      phone: `tel:${localStorage.getItem('hotelTel')}`,
    };
  },
  computed: {
    ...mapState({
      env: (state) => state.app.env,
      activityId: (state) => state.live.activityId,
      liveId: (state) => state.live.liveId,
    }),
  },
  watch: {
    activityId: {
      handler(newVal) {
        if (newVal) {
          // 获取活动数据
          this.getData();
        }
      },
      immediate: true,
    },
    liveId: {
      handler(newVal) {
        if (newVal) {
          // 获取活动数据
          this.splid = newVal;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.getBanquetHallList();
  },
  methods: {
    // 获取我的优惠券数据
    async getData() {
      const { list, totalPage, totalResult } = await getMyPreferentialData({
        showCount: this.showCount,
        currentPage: this.currentPage,
      });
      this.totalPage = totalPage;
      this.totalResult = totalResult;
      console.log('我的优惠数据', list);
      if (!list) {
        this.dataList = [];
        return;
      }
      list.map((item) => {
        if (item.content_json) {
          const copy = JSON.parse(item.content_json);
          const base = JSON.parse(item.data_json);
          const newItem = {
            award_name: copy.award_name,
            award_level: copy.award_level,
            award_condition: copy.award_condition,
            award_discount: copy.award_discount,
            end_time: item.end_time,
            start_time: item.start_time,
            intro: base.tips || '',
            coupon_id: item.coupon_id,
          };
          this.dataList.push(newItem);
        }
        return item;
      });
      // 将优惠券列表保存到缓存中
      saveHotelInfoToLocal({
        key: 'couponList',
        value: this.dataList,
      });
    },
    // 更多数据
    moreData() {
      if (this.currentPage >= this.totalPage) return;
      this.currentPage += 1;
      this.getData();
    },
    // 从缓存中获取对应的宴会厅数据
    getBanquetHallList() {
      this.banquetHallList = getHotelInfoFromLocal('banquetList');
    },
    // 跳转至宴会厅详情
    toHotelDetail(pObj) {
      saveHotelInfoToLocal({
        key: 'currentId',
        value: pObj.id,
      });
      if (this.env === 'miniProgram') {
        wxApi.navigateTo('/pages/hotelReserve/hotelDetail/hotelDetail');
      } else if (this.env === 'h5') {
        this.$router.push({
          path: '/hotelDetail',
        });
      } else if (this.env === 'tt') {
        wxApi.navigateToTt('/pages/hotelReserve/hotelDetail/hotelDetail');
      }
    },
    // 查看更多宴会厅
    getMoreBanquetHall() {
      this.isBHOpen = !this.isBHOpen;
    },
  },
};
</script>

<style lang="less" scoped>
.my-preferential-page {
  width: 100%;
  height: 100vh;
  padding: 32px 24px;
  padding-bottom: 150px;
  box-sizing: border-box;
  background-color: #f5f6f7;
  overflow-y: scroll;

  .item-container {
    width: 100%;
    .award-item {
      margin-bottom: 16px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    .show-more {
      width: 100%;
      margin-top: 50px;
      color: rgba(0, 0, 0, 0.4);
      font-size: 25px;
      text-align: center;
      text-decoration: underline;
    }
  }
  .block2 {
    width: 100%;
    padding-top: 32px;
    padding-bottom: 24px;
    background-color: #fff;
    margin-top: 50px;
    margin-bottom: 16px;
    box-sizing: border-box;
    .currentNav {
      padding: 0 32px;
      font-size: 36px;
      font-weight: 500;
      color: #333333;
    }
    .cardList {
      padding: 0 20px;
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height: 457px;
      overflow: hidden;
      .card {
        width: 49%;
        height: 448px;
        background: #ffffff;
        box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
        margin-bottom: 24px;
        .topPoster {
          height: 250px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          height: 238px;
          padding: 16px;
          .hotelName {
            font-size: 28px;
            font-weight: 500;
            color: #333333;
          }
          .trait {
            display: flex;
            justify-content: space-between;
            font-size: 24px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.4);
            margin-top: 8px;
          }
          .toDetailBtn {
            width: 128px;
            height: 36px;
            background: #ff457a;
            border-radius: 34px;
            font-size: 20px;
            font-weight: 400;
            color: #ffffff;
            margin: 0 auto;
            margin-top: 32px;
          }
        }
      }
    }
    .getMoreInfo {
      font-size: 24px;
      font-weight: 400;
      color: #333333;
      margin-top: 24px;
      width: 100%;
      img {
        width: 24px;
        height: 24px;
        margin-left: 8px;
        transition: all 0.3s linear;
      }
    }
    &.open {
      .cardList {
        height: auto;
      }
      .getMoreInfo {
        img {
          transform: rotate(-180deg);
        }
      }
    }
    &.discount {
      .cardList {
        height: 45vw;
        .card {
          height: 45vw;
          .info {
            height: 15vw;
          }
        }
      }
    }
  }
}
</style>
