<template>
  <!-- xxx酒店会所 -->
  <div
    ref="scrollWrap"
    class="hotelReserveIndex-wrap"
    :style="wrapstyle"
  >
    <!-- <back v-if="env === 'h5'" /> -->
    <section class="block1">
      <div class="hotelCarousel">
        <van-swipe
          ref="carousel"
          :show-indicators="false"
          @change="handleCarouselChange"
        >
          <van-swipe-item
            v-for="(item, index) in mediaCarouselList"
            :key="index"
            class="cus"
            @click="playMedia"
          >
            <img
              v-if="item.type === 'img'"
              class="imgItem"
              :src="item.mediaPath"
            />
            <video
              v-if="item.type === 'video'"
              :ref="`video${index}`"
              class="videoItem"
              :src="item.mediaPath"
              :poster="item.poster"
              webkit-playsinline="true"
              playsinline="true"
              x5-video-player-type="h5-page"
            />
            <img
              v-if="item.type === 'video' && !item.isPlay"
              class="playIcon"
              src="https://ustatic.hudongmiao.com/joymewCustomer/play-icon.png"
            />
          </van-swipe-item>
        </van-swipe>
        <div
          v-if="currentMediaType"
          class="navDot"
        >
          <div
            class="dot"
            :class="{ active: currentMediaType === 'video' }"
            @click="chooseSwipeNav('video')"
          >
            视频
          </div>
          <div
            class="dot"
            :class="{ active: currentMediaType === 'img' }"
            @click="chooseSwipeNav('img')"
          >
            照片
          </div>
        </div>
      </div>
      <div class="hotelName">
        <div class="name">
          {{ hotelName }}
        </div>
        <div class="authBox">
          <img
            src="@/assets/image/icon/auth_icon.png"
            alt="认证图片"
            class="auth-img"
          />
          已认证
        </div>
      </div>
      <div
        v-if="baseLabelList.length > 0"
        class="labelList"
      >
        <div
          v-for="(item, index) in baseLabelList"
          :key="index"
          class="labelItem"
        >
          {{ item }}
        </div>
      </div>
      <div class="contactInfo">
        <div class="address">
          <img
            src="@/assets/image/icon/location_icon.png"
            alt="位置icon"
            class="location_icon"
          />
          {{ location }}
        </div>
        <div class="phone-info">
          <div class="phoneIconBox">
            <img
              src="@/assets/image/icon/phone_icon.png"
              class="phoneIcon"
            />
          </div>
          <div class="phone-val">
            电话
          </div>
          <a :href="phone" />
        </div>
        <div class="deco-bar1" />
        <div class="deco-bar2" />
        <div class="deco-bar3" />
        <div class="deco-bar4" />
        <div class="deco-bar5" />
      </div>
      <div
        v-if="baseParaList.length > 0"
        class="paraInfo"
      >
        <div class="paraItem">
          <div class="value-info">
            <label>{{ baseParaList[0] }}</label>年
          </div>
          <div class="key">
            装修时间
          </div>
        </div>
        <div class="paraItem">
          <div class="value-info">
            <label>{{ baseParaList[1].split('/')[0] }}</label>个/最多{{ baseParaList[1].split('/')[1] }}桌
          </div>
          <div class="key">
            宴会厅
          </div>
        </div>
        <div class="paraItem">
          <div class="value-info">
            <label>{{ baseParaList[2] }}</label>/桌
          </div>
          <div class="key">
            最低餐标
          </div>
        </div>
        <div class="paraItem">
          <div class="value-info">
            <label>{{ baseParaList[3] }}</label>
          </div>
          <div class="key">
            停车位
          </div>
        </div>
      </div>
    </section>
    <section
      v-if="mallList.length > 0 && env !== 'h5'"
      class="block6"
      :class="{ open: isDMOpen }"
    >
      <div
        v-tap="{ methods: getMoreDM }"
        class="currentNav publicVCenter"
      >
        选择门店 ({{ mallList.length }})<img
          src="@/assets/image/hotelReserve/downarrow.png"
          class="downArr"
        />
      </div>
      <div class="cardList">
        <div
          v-for="(item, index) in mallList"
          :key="index"
          v-tap="{ methods: toMall, weddingId: item.wedding_id }"
          class="card publicVCenter"
        >
          <img
            :src="item.cover"
            class="poster"
          />
          <div class="ct">
            <div class="name">
              {{ item.store_name }}
            </div>
            <div class="price">
              {{ item.location }}
            </div>
            <div class="contains">
              {{ item.phone }}
            </div>
          </div>
          <img
            src="@/assets/image/hotelReserve/rightarrow.png"
            class="rightArrow"
          />
        </div>
      </div>
    </section>
    <van-sticky>
      <div class="navList publicVCenter">
        <div
          v-tap="{ methods: chooseNav, navVal: 0 }"
          class="navItem"
          :class="{ active: currentNav === 0 }"
        >
          优惠活动
        </div>
        <div
          v-if="hotelId !== 11"
          v-tap="{ methods: chooseNav, navVal: 1 }"
          class="navItem"
          :class="{ active: currentNav === 1 }"
        >
          宴会厅
        </div>
        <div
          v-if="hotelId !== 11"
          v-tap="{ methods: chooseNav, navVal: 2 }"
          class="navItem"
          :class="{ active: currentNav === 2 }"
        >
          精选套餐
        </div>
        <div
          v-if="hotelId === 11"
          v-tap="{ methods: chooseNav, navVal: 3 }"
          class="navItem"
          :class="{ active: currentNav === 3 }"
        >
          精选单品
        </div>
      </div>
    </van-sticky>
    <section
      ref="nav0"
      class="block2 discount"
      :class="{ open: isDCOpen }"
    >
      <div class="currentNav">
        优惠活动 ({{ discountList.length }})
      </div>
      <div class="cardList">
        <div
          v-for="(item, index) in discountList"
          :key="index"
          v-tap="{ methods: toDiscountDetail, id: item.id }"
          class="card"
        >
          <div class="topPoster">
            <img :src="item.content.coverPath" />
          </div>
          <div class="info">
            <div class="hotelName">
              {{ item.content.name }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="discountList.length > 2"
        v-tap="{ methods: getMoreDc }"
        class="getMoreInfo publicHvCenter"
      >
        查看更多{{ discountList.length - 2 }}个优惠活动
        <img src="@/assets/image/hotelReserve/downarrow.png" />
      </div>
    </section>
    <section
      v-if="hotelId !== 11"
      ref="nav1"
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
        <img src="@/assets/image/hotelReserve/downarrow.png" />
      </div>
    </section>
    <section
      v-if="hotelId !== 11"
      ref="nav2"
      class="block4"
      :class="{ open: isMOpen }"
    >
      <div class="currentNav">
        精选套餐 ({{ menuList.length }})
      </div>
      <div class="cardList">
        <div
          v-for="(item, index) in menuList"
          :key="index"
          v-tap="{ methods: toMenuDetail, id: item.id }"
          class="card publicVCenter"
        >
          <div
            class="poster"
            :style="{ backgroundImage: 'url(' + item.content.coverPath + ')' }"
          />
          <div class="ct">
            <div class="name">
              {{ item.content.name }}
            </div>
            <div
              v-show="item.content.dishList.length > 0"
              class="contains"
            >
              含一份菜单
            </div>
            <div class="price">
              ¥
              <label>{{ item.content.pricePerDesk }}</label>/桌
            </div>
          </div>
          <img
            src="@/assets/image/hotelReserve/rightarrow.png"
            class="rightArrow"
          />
        </div>
      </div>
      <div
        v-show="menuList.length > 3"
        v-tap="{ methods: getMoreMenu }"
        class="getMoreInfo publicHvCenter"
      >
        查看更多{{ menuList.length - 3 }}个菜单
        <img src="@/assets/image/hotelReserve/downarrow.png" />
      </div>
    </section>
    <section
      v-if="hotelId === 11"
      ref="nav3"
      class="block5"
      :class="{ open: isDPOpen }"
    >
      <div class="currentNav">
        精选单品 ({{ setMealListDisplay.length }})
      </div>
      <div class="typeList">
        <div
          v-for="item in typeList"
          :key="item.id"
          v-tap="{ methods: chooseType, name: item.label }"
          class="typeItem"
          :class="{ active: activeType === item.label }"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="cardList">
        <div
          v-for="(item, index) in setMealListDisplay"
          :key="index"
          v-tap="{ methods: toPackageDetail, id: item.id }"
          class="card"
        >
          <div class="poster">
            <img :src="item.content.coverPath" />
          </div>
          <div class="info">
            <div class="hotelName">
              {{ item.content.name }}
            </div>
            <div class="type">
              {{ item.content.type }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="setMealListDisplay.length > 2"
        v-tap="{ methods: getMoreDP }"
        class="getMoreInfo publicHvCenter"
      >
        查看更多{{ setMealListDisplay.length - 2 }}个精选单品
        <img src="@/assets/image/hotelReserve/downarrow.png" />
      </div>
    </section>
    <ReserveBtn
      :visible="!reverseVisible"
      :phone="phone"
      @show="showReseveBox"
    />
    <ReserveBox
      :splid="splid"
      :visible="reverseVisible"
      @cancel="closeReseveBox"
      @sure="sureReseveBox"
    />
    <div class="previewArea">
      <van-image-preview
        v-model="previewVisible"
        :images="previewList"
        class="previewArea"
      />
    </div>
    <!-- 抽奖入口 -->
    <img
      v-if="activity_id"
      v-tap="{ methods: showDialog }"
      src="~@/assets/image/hlt/gift-icon.png"
      class="gift-entrence"
      :class="{ enter: enter }"
    />
    <!-- 抽奖弹窗 -->
    <chou-jiang-dialog
      v-if="isShowChou"
      @close="closeChouDialog"
    />
    <!-- 库存不足弹窗 -->
    <none-award
      v-if="isShowNone"
      :type="dialogType"
      @close="closeNone"
    />
    <!-- 中奖弹窗 -->
    <get-award
      v-if="isShowGet"
      :award="lotteryAward"
      @close="isShowGet = false"
    />
    <!-- 二维码弹窗 -->
    <WechatQrcode v-if="wechatQrcodeVisible" @close="wechatQrcodeVisible=false"/>
  </div>
</template>
<script>
import {
  getHotelInfo, getBanquetList, getMenuList, getDiscountList, getSetMealList,
} from '@/api/hotelReserve/index';
import { mapState } from 'vuex';
import wxApi from '@/utils/wxApi';
import { saveHotelInfoToLocal } from '@/utils/service';
import {
  Swipe, SwipeItem, Sticky, ImagePreview,
} from 'vant';
// import back from '@/components/back/index.vue';
import ReserveBtn from './components/ReserveBtn.vue';
import ReserveBox from './components/ReserveBox.vue';
import ChouJiangDialog from './components/ChouJiangDialog.vue';
import NoneAward from './components/NoneAward.vue';
import GetAward from './components/GetAward.vue';
import WechatQrcode from './components/WechatQrcode.vue';
import browseRecord from './browseRecord';

export default {
  name: 'HotelReserveIndex',
  computed: {
    ...mapState({
      emceeId: (state) => state.live.emceeId,
      env: (state) => state.app.env,
      hltHotelName: (state) => state.app.hltHotelName,
      isCanLottery: (state) => state.live.isCanLottery,
      activity_id: (state) => state.live.activityId,
      bottom: (state) => state.app.bottom,
      enter: (state) => state.app.enter,
    }),
    wrapstyle() {
      return {
        paddingBottom: `${(Number(this.bottom) + 96) * 0.133333}vw`,
      };
    },
    mediaCarouselList() {
      const videoList = this.carouselVideoList.map((item) => {
        let returnObj;
        if (typeof item === 'string') {
          returnObj = {
            poster: `${item}?vframe/jpg/offset/1/w/500/h/400`,
            mediaPath: item,
            type: 'video',
            isPlay: false,
          };
        } else {
          returnObj = {
            poster: item.poster,
            mediaPath: item.path,
            type: 'video',
            isPlay: false,
          };
        }
        return returnObj;
      });
      const imgList = this.carouselList.map((item) => {
        return {
          mediaPath: item,
          type: 'img',
        };
      });
      return [...videoList, ...imgList];
    },
  },
  watch: {
    emceeId: {
      handler(newVal) {
        if (newVal) {
          this.requestBaseInfo();
        }
      },
      immediate: true,
    },
    isCanLottery: {
      handler(newVal) {
        if (Number(newVal) === 0 && !this.isShowChou) {
          setTimeout(() => {
            this.isShowChou = true;
          }, 1000);
        }
      },
    },
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Sticky.name]: Sticky,
    [ImagePreview.Component.name]: ImagePreview.Component,
    ReserveBtn,
    ReserveBox,
    ChouJiangDialog,
    NoneAward,
    GetAward,
    WechatQrcode,
    // back,
  },
  data() {
    return {
      carouselList: [],
      carouselVideoList: [],
      baseParaList: [],
      baseLabelList: [],
      currentMediaType: '', // 取值video、img
      currentCarouselIndex: 0,
      previewVisible: false,
      previewList: [],
      hotelName: '',
      location: '',
      phone: '',
      currentNav: 0,
      banquetHallList: [],
      menuList: [],
      setMealList: [],
      setMealListDisplay: [],
      discountList: [],
      mallList: [],
      isDCOpen: false,
      isBHOpen: false,
      isMOpen: false,
      isDMOpen: false,
      isDPOpen: false,
      hotelId: '',
      reverseVisible: false,
      splid: '',
      activeType: '全部',
      isShowChou: false,
      isShowNone: false,
      isShowGet: false,
      dialogType: '2',
      lotteryAward: {},
      typeList: [
        {
          id: 0,
          label: '全部',
        },
        {
          id: 1,
          label: '主纱',
        },
        {
          id: 2,
          label: '出门纱',
        },
        {
          id: 3,
          label: '礼服',
        },
        {
          id: 4,
          label: '中式',
        },
        {
          id: 5,
          label: '妈妈装',
        },
        {
          id: 6,
          label: '敬酒服',
        },
        {
          id: 7,
          label: '伴娘服',
        },
        {
          id: 8,
          label: '迎宾纱',
        },
        {
          id: 9,
          label: '睡袍/晨袍',
        },
        {
          id: 10,
          label: '晚礼服',
        },
        {
          id: 11,
          label: '儿童礼服',
        },
      ],
      wechatQrcodeVisible: false,
    };
  },
  created() {
    this.splid = this.$store.state.live.liveId;
    if (this.$route.query.type === 'addWechat') {
      this.wechatQrcodeVisible = true;
    }
  },
  beforeDestroy() {
    if (this.env === 'h5') {
      browseRecord.leavePage();
    }
  },
  mounted() {
    if (this.env === 'h5') {
      browseRecord.enterPage({
        pageId: '',
        pageType: '1',
        pageName: '首页',
      });
    } else if (this.env === 'miniProgram') {
      wxApi.postMsg({
        pageId: '',
        pageType: '1',
        pageName: '首页',
      });
    }
    if (Number(this.isCanLottery) === 0) {
      setTimeout(() => {
        this.isShowChou = true;
      }, 1000);
    }
  },
  methods: {
    showReseveBox() {
      this.reverseVisible = true;
    },
    closeReseveBox() {
      this.reverseVisible = false;
    },
    sureReseveBox() {
      this.reverseVisible = false;
    },
    chooseType(p) {
      this.activeType = p.name;
      if (p.name === '全部') {
        this.setMealListDisplay = this.setMealList;
        return;
      }
      this.setMealListDisplay = this.setMealList.filter((item) => item.content.type === p.name);
    },
    chooseNav(p) {
      console.log(p.navVal);
      if (p.navVal === this.currentNav) {
        return;
      }
      this.currentNav = p.navVal;
      if (this.hotelId !== 11) {
        const dis1 = this.$refs.nav0.offsetTop;
        const dis2 = this.$refs.nav1.offsetTop;
        const dis3 = this.$refs.nav2.offsetTop;
        if (this.currentNav === 0) {
          this.scrollAni(dis1 - 100);
        } else if (this.currentNav === 1) {
          this.scrollAni(dis2 - 150);
        } else if (this.currentNav === 2) {
          this.scrollAni(dis3 - 200);
        }
      } else {
        const dis1 = this.$refs.nav0.offsetTop;
        const dis4 = this.$refs.nav3.offsetTop;
        if (this.currentNav === 0) {
          this.scrollAni(dis1 - 100);
        } else if (this.currentNav === 3) {
          this.scrollAni(dis4);
        }
      }
    },
    scrollAni(targetVal) {
      const currentDistance = this.$refs.scrollWrap.scrollTop;
      let lastTop = 0;
      if (currentDistance < targetVal) {
        const tmpInterval = setInterval(() => {
          if (this.$refs.scrollWrap.scrollTop >= targetVal) {
            clearInterval(tmpInterval);
          } else {
            const speed = Math.floor(targetVal / 6);
            this.$refs.scrollWrap.scrollTop += speed;
            if (this.$refs.scrollWrap.scrollTop === lastTop) {
              clearInterval(tmpInterval);
            } else {
              lastTop = this.$refs.scrollWrap.scrollTop;
            }
          }
        }, 10);
      } else if (currentDistance > targetVal) {
        const tmpInterval = setInterval(() => {
          if (this.$refs.scrollWrap.scrollTop <= targetVal) {
            clearInterval(tmpInterval);
          } else {
            const speed = Math.floor(targetVal / 6);
            this.$refs.scrollWrap.scrollTop -= speed;
            if (this.$refs.scrollWrap.scrollTop === lastTop) {
              clearInterval(tmpInterval);
            } else {
              lastTop = this.$refs.scrollWrap.scrollTop;
            }
          }
        }, 10);
      }
    },
    toDiscountDetail(pObj) {
      // 原套餐路由不变，内容变为优惠活动
      saveHotelInfoToLocal({
        key: 'currentId',
        value: pObj.id,
      });
      if (this.env === 'miniProgram') {
        wxApi.navigateTo('/pages/hotelReserve/packageDetail/packageDetail');
      } else if (this.env === 'h5') {
        this.$router.push({
          path: '/packageDetail',
        });
      } else if (this.env === 'tt') {
        wxApi.navigateToTt('/pages/hotelReserve/packageDetail/packageDetail');
      }
    },
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
    toPackageDetail(pObj) {
      // 精选单品
      saveHotelInfoToLocal({
        key: 'currentId',
        value: pObj.id,
      });
      if (this.env === 'miniProgram') {
        wxApi.navigateTo('/pages/hotelReserve/msWeddingDressDetail/msWeddingDressDetail');
      } else if (this.env === 'h5') {
        this.$router.push({
          path: '/msWeddingDressDetail',
        });
      } else if (this.env === 'tt') {
        wxApi.navigateToTt('/pages/hotelReserve/msWeddingDressDetail/msWeddingDressDetail');
      }
    },
    toMenuDetail(pObj) {
      saveHotelInfoToLocal({
        key: 'currentId',
        value: pObj.id,
      });
      if (this.env === 'miniProgram') {
        wxApi.navigateTo('/pages/hotelReserve/menuDetail/menuDetail');
      } else if (this.env === 'h5') {
        this.$router.push({
          path: '/menuDetail',
        });
      } else if (this.env === 'tt') {
        wxApi.navigateToTt('/pages/hotelReserve/menuDetail/menuDetail');
      }
    },
    getMoreDc() {
      this.isDCOpen = !this.isDCOpen;
    },
    getMoreBanquetHall() {
      this.isBHOpen = !this.isBHOpen;
    },
    getMoreMenu() {
      this.isMOpen = !this.isMOpen;
    },
    getMoreDM() {
      this.isDMOpen = !this.isDMOpen;
    },
    getMoreDP() {
      this.isDPOpen = !this.isDPOpen;
    },
    toMall(e) {
      console.log(e.weddingId);
      this.hotelId = e.weddingId;
      this.banquetHallList.splice(0);
      this.menuList.splice(0);
      this.setMealList.splice(0);
      this.setMealListDisplay.splice(0);
      this.mallList.splice(0);
      this.discountList.splice(0);
      this.requestBaseInfoByHotelId();
      this.scrollAni(0);
    },
    requestBaseInfoByHotelId() {
      getHotelInfo()
        .then((res) => {
          console.log(res);
          const tmpIndex = res.list.findIndex((item) => item.wedding_id === this.hotelId);
          const [mallInfoFirst] = res.list;
          let tmpMallInfo = null;
          if (tmpIndex > -1) {
            tmpMallInfo = res.list[tmpIndex];
          } else {
            tmpMallInfo = mallInfoFirst;
          }
          const hotelInfo = JSON.parse(tmpMallInfo.json_data);
          this.carouselList = hotelInfo.carouselList;
          if (hotelInfo.carouselVideoList) {
            this.carouselVideoList = hotelInfo.carouselVideoList;
            if (this.carouselVideoList.length > 0) {
              this.currentMediaType = 'video';
            }
          }
          if (hotelInfo.baseParaList) {
            this.baseParaList = hotelInfo.baseParaList;
          }
          if (hotelInfo.baseLabelList) {
            this.baseLabelList = hotelInfo.baseLabelList;
          }
          this.hotelName = tmpMallInfo.store_name;
          this.location = hotelInfo.location.des;
          this.phone = `tel:${hotelInfo.phone}`;
          const localHotelTel = localStorage.getItem('hotelTel');
          if (!localHotelTel || localHotelTel !== hotelInfo.phone) {
            localStorage.setItem('hotelTel', hotelInfo.phone);
          }
          this.requestBanquetInfo();
          this.requestMenuInfo();
          this.requestDiscountInfo();
          this.requestSetMealInfo();
          this.requestMallInfo(res.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取酒店基本信息
    requestBaseInfo() {
      getHotelInfo()
        .then((res) => {
          console.log(res);
          const tmpIndex = res.list.findIndex((item) => item.store_name === this.hltHotelName);
          const [mallInfoFirst] = res.list;
          let tmpMallInfo = null;
          if (tmpIndex > -1) {
            tmpMallInfo = res.list[tmpIndex];
          } else {
            tmpMallInfo = mallInfoFirst;
          }
          this.hotelId = tmpMallInfo.wedding_id;
          const hotelInfo = JSON.parse(tmpMallInfo.json_data);
          this.carouselList = hotelInfo.carouselList;
          if (hotelInfo.carouselVideoList) {
            this.carouselVideoList = hotelInfo.carouselVideoList;
            if (this.carouselVideoList.length > 0) {
              this.currentMediaType = 'video';
            }
          }
          if (hotelInfo.baseParaList) {
            this.baseParaList = hotelInfo.baseParaList;
          }
          if (hotelInfo.baseLabelList) {
            this.baseLabelList = hotelInfo.baseLabelList;
          }
          this.hotelName = tmpMallInfo.store_name || hotelInfo.hotelName;
          this.location = hotelInfo.location.des;
          this.phone = `tel:${hotelInfo.phone}`;
          const localHotelTel = localStorage.getItem('hotelTel');
          if (!localHotelTel || localHotelTel !== hotelInfo.phone) {
            localStorage.setItem('hotelTel', hotelInfo.phone);
          }
          this.requestBanquetInfo();
          this.requestMenuInfo();
          this.requestSetMealInfo();
          this.requestDiscountInfo();
          this.requestMallInfo(res.list);
          if (this.env === 'h5') {
            wxApi.initWXAPI().then((res) => {
              console.log(res);
              wxApi.onSharePYQ({
                title: this.hotelName,
                link: `https://shm.hudongmiao.com/h5UserLogin/yunJingH51?splid=${this.splid}`,
                imgUrl: 'https://ustatic.hudongmiao.com/joymewMp/defaultAvatar/yunjin.png',
              });
              wxApi.onShareHY({
                title: '云境盛宴',
                desc: this.hotelName,
                link: `https://shm.hudongmiao.com/h5UserLogin/yunJingH51?splid=${this.splid}`,
                imgUrl: 'https://ustatic.hudongmiao.com/joymewMp/defaultAvatar/yunjin.png',
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取宴会厅信息
    requestBanquetInfo() {
      getBanquetList(this.hotelId)
        .then((res) => {
          console.log(res);
          if (res.list.length > 0) {
            this.banquetHallList = res.list.map((item) => {
              return {
                content: JSON.parse(item.json_data),
                id: item.wedding_banquet_id,
              };
            });
            saveHotelInfoToLocal({
              key: 'banquetList',
              value: this.banquetHallList,
            });
          } else {
            this.banquetHallList = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取优惠活动信息
    requestDiscountInfo() {
      getDiscountList(this.hotelId)
        .then((res) => {
          console.log(res);
          if (res.list.length > 0) {
            this.discountList = res.list.map((item) => {
              return {
                content: JSON.parse(item.img_json_data),
                id: item.wedding_activity_id,
              };
            });
            saveHotelInfoToLocal({
              key: 'discountList',
              value: this.discountList,
            });
          } else {
            this.discountList = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取菜单信息
    requestMenuInfo() {
      getMenuList(this.hotelId)
        .then((res) => {
          console.log(res);
          if (res.list.length > 0) {
            this.menuList = res.list.map((item) => {
              return {
                content: JSON.parse(item.json_data),
                id: item.wedding_menu_id,
              };
            });
            saveHotelInfoToLocal({
              key: 'menuList',
              value: this.menuList,
            });
          } else {
            this.menuList = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取套餐信息
    requestSetMealInfo() {
      getSetMealList(this.hotelId)
        .then((res) => {
          console.log(res);
          if (res.list.length > 0) {
            this.setMealList = res.list.map((item) => {
              return {
                content: JSON.parse(item.json_data),
                id: item.wedding_package_id,
              };
            });
            this.setMealListDisplay = this.setMealList;
            console.log('获取套餐信息');
            console.log(this.setMealList);
            saveHotelInfoToLocal({
              key: 'setMealList',
              value: this.setMealList,
            });
          } else {
            this.setMealList = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取商家信息
    requestMallInfo(list) {
      this.mallList = list
        .map((item) => {
          const tmpObj = JSON.parse(item.json_data);
          return {
            ...item,
            phone: tmpObj.phone,
            cover: tmpObj.carouselList[0],
            location: tmpObj.location.des,
          };
        })
        .filter((item) => item.wedding_id !== this.hotelId);
    },
    // 播放当前轮播视频
    playMedia() {
      const { type } = this.mediaCarouselList[this.currentCarouselIndex];
      if (type === 'video') {
        // this.mediaCarouselList[this.currentCarouselIndex].isPlay = true;
        // 判断isPlay为true时，调用video pause方法并设置isPlay为false
        if (this.mediaCarouselList[this.currentCarouselIndex].isPlay) {
          this.$refs[`video${this.currentCarouselIndex}`][0].pause();
          this.mediaCarouselList[this.currentCarouselIndex].isPlay = false;
        } else {
          this.$refs[`video${this.currentCarouselIndex}`][0].play();
          this.mediaCarouselList[this.currentCarouselIndex].isPlay = true;
        }
      } else if (type === 'img') {
        this.previewImg(this.mediaCarouselList[this.currentCarouselIndex].mediaPath);
      }
      this.$forceUpdate();
    },
    // 轮播切换回调处理
    handleCarouselChange(e) {
      console.log(e);
      this.currentCarouselIndex = e;
      // 遍历所有video 设置为暂停
      this.mediaCarouselList.forEach((item, index) => {
        if (item.type === 'video') {
          this.$refs[`video${index}`][0].pause();
          this.mediaCarouselList[index].isPlay = false;
        }
      });
      if (this.currentMediaType) {
        const videoStartIndex = this.mediaCarouselList.findIndex((item) => item.type === 'video');
        const imgStartIndex = this.mediaCarouselList.findIndex((item) => item.type === 'img');
        if (this.currentCarouselIndex >= videoStartIndex && this.currentCarouselIndex < imgStartIndex) {
          this.currentMediaType = 'video';
        } else if (this.currentCarouselIndex >= imgStartIndex) {
          this.currentMediaType = 'img';
        }
      }
      this.$forceUpdate();
    },
    // 预览当前轮播图片
    previewImg(imgPath) {
      const tmpList1 = [imgPath];
      const tmpList2 = this.carouselList.filter((item) => {
        return item !== imgPath;
      });
      const tmpList3 = tmpList1.concat(tmpList2);
      this.previewList = tmpList3;
      this.previewVisible = true;
    },
    // 选择轮播图nav 图片/视频
    chooseSwipeNav(type) {
      this.currentMediaType = type;
      if (type === 'video') {
        this.currentCarouselIndex = this.mediaCarouselList.findIndex((item) => item.type === 'video');
      } else if (type === 'img') {
        this.currentCarouselIndex = this.mediaCarouselList.findIndex((item) => item.type === 'img');
      }
      this.$refs.carousel.swipeTo(this.currentCarouselIndex);
    },
    // 展示弹窗的逻辑
    showDialog() {
      // 判断是否能够抽奖，不能抽奖则跳转至我的优惠页面
      if (Number(this.isCanLottery) === 1) {
        // 跳转至我的优惠页面
        this.turnToMyPreferential();
        return;
      }
      this.isShowChou = true;
    },
    closeNone(type) {
      this.isShowNone = false;
      // 跳转至我的优惠页面
      if (type === '3') {
        this.turnToMyPreferential();
      }
    },
    // 关闭抽奖弹窗
    closeChouDialog(param) {
      this.isShowChou = false;
      if (String(param.type) === '0') return;
      if (String(param.type) === '1') {
        this.lotteryAward = { ...param.award, phone: this.phone };
        console.log('中奖的奖项数据', this.lotteryAward);
        this.isShowGet = true;
        return;
      }
      this.isShowNone = true;
      this.dialogType = String(param.type);
    },
    // 跳转至我的优惠页面
    turnToMyPreferential() {
      if (this.env === 'miniProgram') {
        wxApi.navigateTo('/pages/hotelReserve/myPreferential/myPreferential');
      } else if (this.env === 'h5') {
        this.$router.push({
          path: '/myPreferential',
        });
      } else if (this.env === 'tt') {
        wxApi.navigateToTt('/pages/hotelReserve/myPreferential/myPreferential');
      }
    },
  },
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

.hotelReserveIndex-wrap {
  background-color: #f7f6f2;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;

  .block1 {
    background-color: #fff;
    margin-bottom: 16px;

    .cus {
      height: 422px;
    }

    .hotelCarousel::v-deep {
      position: relative;

      .van-swipe-item {
        .imgItem {
          width: 100%;
          height: 100%;
        }

        .videoItem {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .playIcon {
          width: 120px;
          height: 120px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .navDot {
        background: rgba(0, 0, 0, 0.6);
        border-radius: 50px;
        display: flex;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 18px;
        z-index: 2;

        .dot {
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          font-weight: 400;
          color: #ffffff;
          padding: 10px 16px;

          &.active {
            background-color: #ffffff;
            color: #333333;
          }
        }
      }
    }

    .hotelName {
      margin-top: 32px;
      font-size: 44px;
      font-weight: 500;
      color: #333333;
      padding: 0 32px;
      display: flex;
      align-items: center;

      .name {
        max-width: 75%;
      }

      .authBox {
        display: flex;
        align-items: center;
        background: #fef1cd;
        font-size: 24px;
        font-weight: 500;
        color: #c55e06;
        border-radius: 42px;
        padding: 6px 16px;
        margin-left: 16px;

        .auth-img {
          width: 32px;
          height: 32px;
          margin-right: 4px;
        }
      }
    }

    .labelList {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 16px;
      padding: 0 32px;

      .labelItem {
        font-size: 24px;
        font-weight: 400;
        color: #333333;
        background-color: #f2f4f7;
        border-radius: 4px;
        padding: 4px 8px;
        white-space: nowrap;
      }
    }

    .evaluateInfo {
      padding: 0 36px;
      margin-top: 16px;

      .starList {
        img {
          width: 36px;
          height: 36px;
          margin-right: 8px;
        }
      }

      .num {
        font-size: 24px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.25);
        margin-left: 8px;
      }
    }

    .contactInfo {
      background-color: #e8f0fd;
      border-radius: 8px;
      margin: 24px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      padding-right: 32px;
      position: relative;

      .address {
        font-size: 28px;
        font-weight: 400;
        color: #333333;
        max-width: 530px;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1;

        .location_icon {
          width: 36px;
          height: 36px;
          margin-right: 8px;
        }
      }

      .phone-info {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 1;

        .phoneIconBox {
          width: 48px;
          height: 48px;
          background: #ffffff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.4);
          margin-bottom: 4px;
          .phoneIcon {
            width: 28px;
            height: 28px;
          }
        }
        .phone-val {
          font-size: 18px;
        }

        a {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }

      .deco-bar1 {
        position: absolute;
        right: 80px;
        top: 45px;
        width: 106px;
        height: 10px;
        transform: rotate(60deg);
        background: linear-gradient(180deg, rgba(104, 152, 254, 0.2) 0%, rgba(104, 152, 254, 0) 100%);
      }

      .deco-bar2 {
        position: absolute;
        right: 40px;
        top: 30px;
        width: 80px;
        height: 10px;
        transform: rotate(60deg);
        background: linear-gradient(180deg, rgba(104, 152, 254, 0.2) 0%, rgba(104, 152, 254, 0) 100%);
      }

      .deco-bar3 {
        position: absolute;
        right: 40px;
        top: 80px;
        width: 80px;
        height: 10px;
        transform: rotate(-30deg);
        background: linear-gradient(180deg, rgba(104, 152, 254, 0.2) 0%, rgba(104, 152, 254, 0) 100%);
      }

      .deco-bar4 {
        position: absolute;
        right: 0px;
        top: 80px;
        width: 40px;
        height: 10px;
        transform: rotate(-30deg);
        background: linear-gradient(180deg, rgba(104, 152, 254, 0.2) 0%, rgba(104, 152, 254, 0) 100%);
      }

      .deco-bar5 {
        position: absolute;
        right: 0px;
        top: 20px;
        width: 40px;
        height: 10px;
        transform: rotate(-30deg);
        background: linear-gradient(180deg, rgba(104, 152, 254, 0.2) 0%, rgba(104, 152, 254, 0) 100%);
      }
    }

    .paraInfo {
      display: flex;
      margin-top: 8px;
      padding: 0 32px;
      padding-bottom: 32px;
      justify-content: space-between;

      .paraItem {
        display: flex;
        flex-direction: column;
        align-items: center;

        .value-info {
          font-size: 36px;
          font-weight: 400;
          color: #333333;
          height: 40px;
          line-height: 40px;
          label {
            font-size: 36px;
            font-weight: 500;
          }
        }

        .key {
          font-size: 28px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.4);
          line-height: 50px;
        }
      }
    }
  }

  .navList {
    width: 100%;
    justify-content: space-around;
    padding-top: 40px;
    background-color: #fff;
    padding-bottom: 32px;

    .navItem {
      font-size: 32px;
      font-weight: 400;
      color: #333333;
      position: relative;

      &.active {
        font-size: 36px;

        &::after {
          content: '';
          display: block;
          height: 4px;
          background-color: #fbd786;
          position: absolute;
          bottom: -12px;
        }
      }

      &:nth-child(1) {
        &.active {
          &::after {
            width: 108px;
          }
        }
      }

      &:nth-child(2) {
        &.active {
          &::after {
            width: 75px;
          }
        }
      }

      &:nth-child(3) {
        &.active {
          &::after {
            width: 75px;
          }
        }
      }
    }
  }

  .block2 {
    padding-bottom: 24px;
    background-color: #fff;
    margin-bottom: 16px;
    padding-top: 32px;

    .currentNav {
      padding: 0 32px;
      font-size: 36px;
      font-weight: 500;
      color: #333333;
    }

    .cardList {
      padding: 0 32px;
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height: 457px;
      overflow: hidden;

      .card {
        width: 332px;
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

  .block5 {
    padding-top: 40px;
    padding-bottom: 120px;
    background-color: #fff;
    margin-bottom: 16px;

    .currentNav {
      font-size: 36px;
      font-weight: 500;
      color: #333333;
      padding: 0 32px;
    }

    .typeList {
      padding: 0 32px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20px;

      .typeItem {
        padding: 0 20px;
        margin-bottom: 20px;
        height: 40px;
        background: #ffffff;
        border-radius: 8px;
        font-size: 28px;
        color: #333333;
        box-shadow: 0px 0px 2px 0px rgba(189, 189, 189, 0.8);

        &.active {
          background: #fff7e7;
        }
      }
    }

    .cardList {
      padding: 0 32px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      height: 620px;
      overflow: hidden;

      .card {
        width: 320px;
        position: relative;
        margin-bottom: 24px;

        .poster {
          width: 100%;
          height: 520px;
          border-radius: 20px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .info {
          padding: 12px 24px;

          .hotelName {
            font-size: 32px;
            font-weight: 400;
            color: #333333;
          }

          .type {
            font-size: 28px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.6);
            margin-top: 14px;
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
  }

  .block3 {
    padding-top: 40px;
    padding-bottom: 24px;
    background-color: #fff;
    margin-bottom: 16px;

    .currentNav {
      font-size: 36px;
      font-weight: 500;
      color: #333333;
      padding: 0 32px;
    }

    .cardList {
      margin-top: 24px;
      padding: 0 32px;

      .card {
        width: 100%;
        height: 192px;
        display: flex;
        position: relative;
        margin-bottom: 24px;

        .poster {
          width: 192px;
          height: 192px;
          border-radius: 20px;
        }

        .ct {
          padding: 12px 24px;

          .name {
            font-size: 32px;
            font-weight: 400;
            color: #333333;
          }

          .price {
            font-size: 21px;
            font-weight: 400;
            color: #ff3675;
            margin-top: 14px;

            label {
              font-size: 28px;
            }
          }

          .contains {
            font-size: 28px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.4);
            margin-top: 12px;
          }
        }

        .rightArrow {
          width: 32px;
          height: 32px;
          position: absolute;
          right: 0;
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
        width: 32px;
        height: 32px;
        margin-left: 8px;
      }
    }
  }

  .block4 {
    padding-top: 40px;
    padding-bottom: 24px;
    background-color: #fff;
    margin-bottom: 16px;

    .currentNav {
      font-size: 36px;
      font-weight: 500;
      color: #333333;
      padding: 0 32px;
      position: relative;

      .downArr {
        width: 28px;
        height: 28px;
        position: absolute;
        right: 32px;
      }
    }

    .cardList {
      margin-top: 24px;
      padding: 0 32px;
      max-height: 630px;
      overflow: hidden;

      .card {
        width: 100%;
        height: 192px;
        display: flex;
        position: relative;
        margin-bottom: 24px;

        .poster {
          width: 192px;
          height: 192px;
          border-radius: 20px;
          background-size: cover;
        }

        .ct {
          padding: 12px 24px;

          .name {
            font-size: 32px;
            font-weight: 400;
            color: #333333;
          }

          .price {
            font-size: 21px;
            font-weight: 400;
            color: #ff3675;
            margin-top: 14px;

            label {
              font-size: 28px;
            }
          }

          .contains {
            font-size: 28px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.4);
            margin-top: 12px;
          }
        }

        .rightArrow {
          width: 32px;
          height: 32px;
          position: absolute;
          right: 0;
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
        max-height: unset;
        height: auto;
      }

      .getMoreInfo {
        img {
          transform: rotate(-180deg);
        }
      }
    }
  }

  .block6 {
    padding-top: 40px;
    padding-bottom: 24px;
    background-color: #fff;
    margin-bottom: 16px;

    .currentNav {
      font-size: 36px;
      font-weight: 500;
      color: #333333;
      padding: 0 32px;
      position: relative;

      .downArr {
        width: 28px;
        height: 28px;
        position: absolute;
        right: 32px;
      }
    }

    .cardList {
      margin-top: 24px;
      padding: 0 32px;
      height: 0;
      overflow: hidden;

      .card {
        width: 100%;
        height: 192px;
        display: flex;
        position: relative;
        margin-bottom: 24px;

        .poster {
          width: 192px;
          height: 192px;
          border-radius: 20px;
          background-size: cover;
        }

        .ct {
          padding: 12px 24px;

          .name {
            font-size: 32px;
            font-weight: 400;
            color: #333333;
          }

          .price {
            font-size: 21px;
            font-weight: 400;
            color: #ff3675;
            margin-top: 14px;

            label {
              font-size: 28px;
            }
          }

          .contains {
            font-size: 28px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.4);
            margin-top: 12px;
          }
        }

        .rightArrow {
          width: 32px;
          height: 32px;
          position: absolute;
          right: 0;
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
      .downArr {
        transform: rotate(180deg);
      }

      .cardList {
        max-height: unset;
        height: auto;
      }
    }
  }

  .previewArea::v-deep {
    .van-image-preview__overlay {
      background-color: rgba(0, 0, 0, 1);
    }

    .van-image-preview__index {
      font-size: 3.867vw;
      top: 4.133vw;
    }
  }

  .gift-entrence {
    width: 152px;
    height: 152px;
    border-radius: 50%;
    position: fixed;
    bottom: 210px;
    right: 24px;
    &.enter {
      bottom: 250px;
    }
  }
}
</style>
