<template>
  <!-- 精选套餐 -->
  <div class="menuDetail-wrap">
    <back v-if="env === 'h5'" />
    <div class="navTop">
      <div
        v-for="item in navList"
        :key="item.id"
        v-tap="{ methods: chooseNav, currentId: item.id }"
        class="navItem"
        :class="{ active: activeId === item.id }"
      >
        <div class="deskNum">
          {{ item.pricePerDesk }}元/桌
        </div>
      </div>
    </div>
    <section class="section1">
      <img
        :src="coverPath"
        class="posterImg"
      />
      <div class="name">
        {{ name }}
      </div>
      <div
        v-show="dishList.length > 0"
        class="desc"
      >
        含一个菜单
      </div>
    </section>
    <section class="section2">
      <div class="menuBox">
        <img
          :src="coverPath"
          class="posterImg"
        />
        <div
          v-for="(item, index) in dishList"
          :key="index"
          class="menuItem"
        >
          {{ item }}
        </div>
      </div>
    </section>
    <section
      v-if="otherPriceVisible"
      class="section4"
    >
      <div class="tit">
        -其他费用-
      </div>
      <div class="infoList">
        <div class="infoItem">
          <div class="label">
            服务费
          </div>
          <div class="ct">
            <div class="ctItem">
              {{ otherPrice.servicePrice }}
            </div>
          </div>
        </div>
        <div class="infoItem">
          <div class="label">
            开瓶费
          </div>
          <div class="ct">
            <div class="ctItem">
              {{ otherPrice.openBottlePrice }}
            </div>
          </div>
        </div>
        <div class="infoItem">
          <div class="label">
            进场费
          </div>
          <div class="ct">
            <div class="ctItem">
              {{ otherPrice.approachPrice }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      v-if="additionInfo.length > 2"
      class="section4"
    >
      <div class="tit">
        -附加信息-
      </div>
      <div class="infoList">
        <div class="infoItem">
          <div class="label">
            附加信息
          </div>
          <div class="ct">
            <div class="ctItem">
              {{ additionInfo }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="contactBtn publicHvCenter">立即咨询</div> -->
    </section>
  </div>
</template>
<script>
import { getHotelInfoFromLocal } from '@/utils/service';
import back from '@/components/back/index.vue';
import wxApi from '@/utils/wxApi';
import { mapState } from 'vuex';
import browseRecord from './browseRecord';

export default {
  name: 'MenuDetail',
  computed: {
    ...mapState({
      env: (state) => state.app.env,
    }),
    otherPriceVisible() {
      return (
        (this.otherPrice.servicePrice && this.otherPrice.servicePrice !== '0')
        || (this.otherPrice.openBottlePrice && this.otherPrice.openBottlePrice !== '0')
        || (this.otherPrice.approachPrice && this.otherPrice.approachPrice !== '0')
      );
    },
  },
  components: {
    back,
  },
  data() {
    return {
      navList: [],
      activeId: 0,
      coverPath: '',
      name: '',
      dishList: [],
      otherPrice: {
        servicePrice: '',
        openBottlePrice: '',
        approachPrice: '',
      },
      additionInfo: '',
    };
  },
  created() {
    this.getMenuInfo();
  },
  beforeDestroy() {
    if (this.env === 'h5') {
      browseRecord.leavePage();
    }
  },
  mounted() {
    if (this.env === 'h5') {
      browseRecord.enterPage({
        pageId: this.activeId,
        pageType: '3',
        pageName: this.name,
      });
    } else if (this.env === 'miniProgram') {
      wxApi.postMsg({
        pageId: this.activeId,
        pageType: '3',
        pageName: this.name,
      });
    }
  },
  methods: {
    chooseNav(pObj) {
      this.activeId = pObj.currentId;
      this.getMenuInfo(this.activeId);
    },
    getMenuInfo(cId) {
      const currentId = cId || getHotelInfoFromLocal('currentId');
      this.activeId = currentId;
      const menuList = getHotelInfoFromLocal('menuList');
      const currrentMenuInfo = menuList.find((item) => item.id === currentId).content;
      this.navList = menuList.map((item) => {
        return {
          id: item.id,
          pricePerDesk: item.content.pricePerDesk,
        };
      });
      this.name = currrentMenuInfo.name;
      this.coverPath = currrentMenuInfo.coverPath;
      this.dishList = currrentMenuInfo.dishList;
      this.otherPrice.servicePrice = currrentMenuInfo.otherPrice.servicePrice;
      this.otherPrice.openBottlePrice = currrentMenuInfo.otherPrice.openBottlePrice;
      this.otherPrice.approachPrice = currrentMenuInfo.otherPrice.approachPrice;
      this.additionInfo = currrentMenuInfo.additionInfo;
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
.menuDetail-wrap {
  background: #f7f6f2;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  .navTop {
    width: 750px;
    height: 82px;
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
      .deskNum {
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
  .section1 {
    padding-top: 32px;
    padding-bottom: 32px;
    background-color: #fff;
    .posterImg {
      width: 100%;
      height: 476px;
    }
    .name {
      padding: 0 32px;
      font-size: 40px;
      font-weight: 500;
      color: #333333;
      padding-top: 32px;
    }
    .desc {
      padding: 0 32px;
      margin-top: 8px;
      font-size: 28px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
    }
  }
  .section2 {
    background: #fff;
    padding-top: 40px;
    margin-top: 16px;
    padding-bottom: 56px;
    .menuBox {
      text-align: center;
      width: 686px;
      border: 2px solid #dddddd;
      margin: 0 auto;
      padding-bottom: 40px;
      .posterImg {
        width: 686px;
        height: 250px;
        margin-bottom: 40px;
      }
      .menuItem {
        margin-bottom: 16px;
        font-size: 28px;
        font-weight: 400;
        color: #333333;
        text-align: center;
      }
    }
  }
  .section4 {
    background: #fff;
    padding-top: 48px;
    margin-top: 16px;
    padding-bottom: 48px;
    .tit {
      font-size: 40px;
      font-weight: 500;
      color: #333333;
      text-align: center;
    }
    .infoList {
      margin-top: 32px;
      padding-left: 48px;
      padding-right: 32px;
      .infoItem {
        display: flex;
        justify-content: space-between;
        margin-bottom: 32px;
        .label {
          font-size: 28px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.4);
        }
        .ct {
          font-size: 28px;
          font-weight: 400;
          color: #333333;
          width: 514px;
        }
      }
    }
    .contactBtn {
      width: 606px;
      height: 76px;
      background: #ff457a;
      border-radius: 8px;
      margin: 0 auto;
      margin-top: 50px;
      font-size: 24px;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
