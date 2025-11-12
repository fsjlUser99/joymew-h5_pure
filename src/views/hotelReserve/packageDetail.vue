<template>
  <!-- 精选单品 -->
  <div class="hotelDetail-wrap">
    <back v-if="env === 'h5'" />
    <div class="navTop">
      <div
        v-for="item in navList"
        :key="item.id"
        v-tap="{ methods: chooseNav, currentId: item.id }"
        class="navItem"
        :class="{ active: activeId === item.id }"
      >
        <div class="name">
          {{ item.name }}
        </div>
        <div class="type">
          {{ item.type }}
        </div>
      </div>
    </div>
    <section class="introArea publicVCenter">
      <div class="name">
        {{ name }}
      </div>
      <div class="baseInfo">
        <div class="infoItem publicVCenter">
          {{ desc }}
        </div>
      </div>
    </section>
    <section class="posterImgWrap">
      <img
        v-for="(item, index) in posterList"
        :key="index"
        :src="item"
        class="posterImg"
      />
    </section>
  </div>
</template>
<script>
import { getHotelInfoFromLocal } from '@/utils/service';
import back from '@/components/back/index.vue';
import { mapState } from 'vuex';
import wxApi from '@/utils/wxApi';
import browseRecord from './browseRecord';

export default {
  name: 'DiscountDetail',
  computed: {
    ...mapState({
      env: (state) => state.app.env,
    }),
  },
  components: {
    back,
  },
  data() {
    return {
      navList: [],
      activeId: '',
      name: '',
      desc: '',
      posterList: [],
    };
  },
  beforeDestroy() {
    if (this.env === 'h5') {
      browseRecord.leavePage();
    }
  },
  created() {
    this.getDiscountInfo();
  },
  mounted() {
    if (this.env === 'h5') {
      browseRecord.enterPage({
        pageId: this.activeId,
        pageType: '5',
        pageName: this.name,
      });
    } else if (this.env === 'miniProgram') {
      wxApi.postMsg({
        pageId: this.activeId,
        pageType: '5',
        pageName: this.name,
      });
    }
  },
  methods: {
    toggleDetailInfo() {
      this.isDetailOpen = !this.isDetailOpen;
    },
    chooseNav(pObj) {
      this.activeId = pObj.currentId;
      this.getDiscountInfo(this.activeId);
    },
    getDiscountInfo(cId) {
      const currentId = cId || getHotelInfoFromLocal('currentId');
      this.activeId = currentId;
      const discountList = getHotelInfoFromLocal('setMealList');
      const currrentDiscountInfo = discountList.find((item) => item.id === currentId).content;
      this.navList = discountList.map((item) => {
        return {
          id: item.id,
          name: item.content.name,
          type: item.content.type,
        };
      });
      this.name = currrentDiscountInfo.name;
      this.desc = currrentDiscountInfo.desc;
      this.posterList = currrentDiscountInfo.carouselList;
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
img {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;

  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
.hotelDetail-wrap {
  background-color: #ffffff;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  .navTop {
    width: 750px;
    height: 140px;
    background: #f7f6f2;
    position: fixed;
    overflow-x: scroll;
    top: 0;
    z-index: 1;
    white-space: nowrap;
    .navItem {
      width: 184px;
      height: 100%;
      flex-direction: column;
      font-size: 24px;
      font-weight: 400;
      color: #333333;
      position: relative;
      display: inline-block;
      padding-top: 25px;
      .name {
        margin-bottom: 8px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 12px;
      }
      .type {
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 12px;
      }
      &::before {
        content: '';
        width: 2px;
        height: 48px;
        opacity: 1;
        background: #dddddd;
        position: absolute;
        right: 0;
        top: 38px;
      }
      &:last-child {
        &::before {
          background: transparent;
        }
      }
      &.active {
        color: #ff457a;
        &::after {
          content: '';
          display: block;
          width: 108px;
          height: 6px;
          background: #ff457a;
          position: absolute;
          bottom: 0;
          left: 35px;
        }
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .introArea {
    padding-top: 177px;
    flex-direction: column;
    .name {
      font-size: 40px;
      font-weight: 400;
      color: #000000;
    }
    .baseInfo {
      margin-top: 40px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      .infoItem {
        padding: 0 20px;
        position: relative;
        &::before {
          content: '';
          width: 2px;
          height: 24px;
          opacity: 1;
          background: #dddddd;
          position: absolute;
          right: 0;
        }
        &:last-child {
          &::before {
            background: transparent;
          }
        }
      }
    }
    .advanBox {
      width: 686px;
      border: 2px solid #dddddd;
      margin-top: 62px;
      flex-direction: column;
      padding: 8px 0;
      .advanList {
        flex-direction: column;
        overflow: hidden;
        height: 67.5px;
        .advanItem {
          width: 622px;
          display: flex;
          padding: 24px 0;
          border-bottom: 2px solid #f0f0f0;
          justify-content: space-between;
          .label {
            font-size: 28px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.4);
            white-space: nowrap;
          }
          .ct {
            font-size: 28px;
            font-weight: 400;
            color: #333333;
          }
          .subItem {
            width: 50%;
          }
        }
      }
      .collapase {
        font-size: 28px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
        margin-top: 32px;
        margin-bottom: 16px;
        img {
          width: 24px;
          height: 24px;
          margin-left: 8px;
          transition: all 0.3s linear;
        }
      }
      &.open {
        .advanList {
          height: auto;
        }
        .collapase {
          img {
            transform: rotate(-180deg);
          }
        }
      }
    }
  }
  .posterImgWrap {
    margin-top: 48px;
    .posterImg {
      width: 100%;
    }
    .contactBtn {
      width: 606px;
      height: 76px;
      background: #ff457a;
      border-radius: 8px;
      font-size: 24px;
      font-weight: 500;
      color: #ffffff;
      margin: 0 auto;
      margin-top: 26px;
      margin-bottom: 94px;
    }
  }
}
</style>
