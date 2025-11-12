<template>
  <!-- 优惠券(废弃) -->
  <div class="couponDetail-wrap">
    <back v-if="env === 'h5'" />
    <section class="section1">
      <!-- <img src="@/assets/image/hotelReserve/c1.png" class="posterImg" /> -->
      <div class="title publicVCenter">
        代金券
      </div>
      <div class="yhInfo">
        <div class="price">
          <label>￥</label>9.9
        </div>
        <div class="tip publicVCenter">
          <div class="tag publicHvCenter">
            减
          </div>
          下单减2元，每人可享受一次
        </div>
      </div>
      <div class="bzInfo publicVCenter">
        <div class="td">
          随时退
        </div>
        <div class="td">
          过期自动退
        </div>
        <div class="saleNum">
          90天销量：34（累计189)
        </div>
      </div>
    </section>
    <section class="section2">
      <div class="title publicVCenter">
        商家信息
      </div>
      <div class="contactInfo">
        <div class="hotelName">
          花嫁丽舍海岛婚礼殿堂
        </div>
        <div class="address">
          上海市新虹桥合川路3088号
        </div>
        <div class="phone publicVCenter">
          <img
            src="@/assets/image/hotelReserve/phoneIcon.png"
            class="phoneIcon"
          />
          电话
        </div>
      </div>
    </section>
    <section class="section3">
      <div class="title publicVCenter">
        详情
      </div>
      <div class="djqInfo">
        <div class="key">
          代金券
        </div>
        <div class="valCt">
          <div class="ctItem">
            <div class="subKey">
              1次
            </div>
            <div class="subVal">
              20000元
            </div>
          </div>
          <div class="ctItem">
            <div class="subKey">
              总价值
            </div>
            <div class="subVal">
              20000元
            </div>
          </div>
          <div class="ctItem">
            <div class="subKey">
              优惠价
            </div>
            <div class="subVal stre">
              9.9元
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section4">
      <div class="title publicVCenter">
        购买须知
      </div>
      <div class="tipList">
        <div class="tipItem">
          <div class="tipTitle">
            有效期
          </div>
          <div class="tipCt">
            ·购买后30天内有效
          </div>
        </div>
        <div class="tipItem">
          <div class="tipTitle">
            除外日期
          </div>
          <div class="tipCt">
            ·每周六、周日不可用
          </div>
          <div class="tipCt">
            ·元旦、春节、劳动节、端午节、中秋节、国庆节、清 明节、情人节、圣诞节不可用
          </div>
        </div>
        <div class="tipItem">
          <div class="tipTitle">
            预约信息
          </div>
          <div class="tipCt">
            ·请您提前1天预约
          </div>
        </div>
        <div class="tipItem">
          <div class="tipTitle">
            规则提醒
          </div>
          <div class="tipCt">
            ·需您当日一次性体验完毕所有项目
          </div>
          <div class="tipCt">
            ·可与其他优惠同享
          </div>
        </div>
        <div class="tipItem">
          <div class="tipTitle">
            温馨提示
          </div>
          <div class="tipCt">
            ·如需优惠券发票，请联系客服
          </div>
        </div>
      </div>
    </section>
    <section class="section5">
      <div class="title publicVCenter">
        本店可用
      </div>
      <div class="canUseInfo publicVCenter">
        <div class="caseUseItem">
          <!-- <img src="@/assets/image/hotelReserve/c1.png" class="useImg" /> -->
          <img
            src="@/assets/image/hotelReserve/rightarrow.png"
            class="rightArrowImg"
          />
        </div>
      </div>
      <div class="btnGroup">
        <div class="btnLeft publicHvCenter">
          咨询客服
        </div>
        <div class="btnRight publicHvCenter">
          ¥7.9限时抢购
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import back from '@/components/back/index.vue';
import { mapState } from 'vuex';

export default {
  name: 'CouponDetail',
  computed: {
    ...mapState({
      env: (state) => state.app.env,
    }),
  },
  components: {
    back,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
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
.couponDetail-wrap {
  background: #f7f6f2;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  .section1 {
    background-color: #ffffff;
    .posterImg {
      width: 100%;
      height: 468px;
    }
    .title {
      font-size: 36px;
      font-weight: 400;
      color: #333333;
      height: 98px;
      width: 686px;
      border-bottom: 2px solid #f0f0f0;
      margin: 0 auto;
    }
    .yhInfo {
      height: 182px;
      width: 686px;
      border-bottom: 2px solid #f0f0f0;
      padding-top: 16px;
      margin: 0 auto;
      .price {
        font-size: 56px;
        font-weight: 500;
        color: #13d4c6;
        color: 18px;
        label {
          font-size: 28px;
        }
      }
      .tip {
        margin-top: 16px;
        font-size: 28px;
        font-weight: 400;
        color: #333333;
        .tag {
          width: 28px;
          height: 28px;
          background: #bd8aec;
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          margin-right: 22px;
        }
      }
    }
    .bzInfo {
      height: 90px;
      width: 686px;
      position: relative;
      margin: 0 auto;
      .td {
        font-size: 24px;
        font-weight: 400;
        color: #bddc89;
        margin-right: 49px;
      }
      .saleNum {
        position: absolute;
        right: 0;
        font-size: 20px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
  .section2 {
    background-color: #ffffff;
    margin-top: 16px;
    .title {
      font-size: 24px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      height: 82px;
      border-bottom: 2px solid #f0f0f0;
      margin: 0 auto;
      width: 686px;
    }
    .contactInfo {
      height: 156px;
      width: 686px;
      margin: 0 auto;
      padding-top: 32px;
      position: relative;
      .hotelName {
        font-size: 28px;
        font-weight: 400;
        color: #333333;
      }
      .address {
        font-size: 24px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
        margin-top: 18px;
      }
      .phone {
        flex-direction: column;
        font-size: 18px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.25);
        position: absolute;
        right: 10px;
        top: 50px;
        .phoneIcon {
          width: 36px;
          height: 36px;
          margin-bottom: 2px;
        }
        &::after {
          content: '';
          display: block;
          width: 2px;
          height: 60px;
          background: #f0f0f0;
          position: absolute;
          left: -40px;
        }
      }
    }
  }
  .section3 {
    background-color: #ffffff;
    margin-top: 16px;
    .title {
      font-size: 24px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      height: 82px;
      border-bottom: 2px solid #f0f0f0;
      margin: 0 auto;
      width: 686px;
    }
    .djqInfo {
      width: 686px;
      margin: 0 auto;
      padding-top: 32px;
      position: relative;
      display: flex;
      justify-content: space-between;
      .key {
        font-size: 28px;
        font-weight: 400;
        color: #333333;
      }
      .valCt {
        font-size: 28px;
        font-weight: 400;
        color: #333333;
        .ctItem {
          width: 252px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
          .subVal {
            &.stre {
              color: #ff457a;
            }
          }
        }
      }
    }
  }
  .section4 {
    background-color: #ffffff;
    margin-top: 16px;
    padding-bottom: 8px;
    .title {
      font-size: 24px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      height: 82px;
      border-bottom: 2px solid #f0f0f0;
      margin: 0 auto;
      width: 686px;
    }
    .tipList {
      padding-top: 32px;
      .tipItem {
        margin-bottom: 16px;
        padding-left: 32px;
        padding-right: 60px;
        .tipTitle {
          font-size: 28px;
          font-weight: 500;
          color: #333333;
          margin-bottom: 8px;
        }
        .tipCt {
          font-size: 28px;
          font-weight: 400;
          color: #333333;
          margin-bottom: 8px;
        }
      }
    }
  }
  .section5 {
    background-color: #ffffff;
    margin-top: 16px;
    padding-bottom: 90px;
    .title {
      font-size: 24px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      height: 82px;
      border-bottom: 2px solid #f0f0f0;
      margin: 0 auto;
      width: 686px;
    }
    .canUseInfo {
      padding-top: 32px;
      .caseUseItem {
        justify-content: space-between;
        padding: 0 32px;
        .useImg {
          width: 328px;
          height: 184px;
        }
        .rightArrowImg {
          width: 48px;
          height: 48px;
        }
      }
    }
    .btnGroup {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding: 0 32px;
      .btnLeft {
        width: 332px;
        height: 76px;
        background: #13d4c6;
        border-radius: 8px;
        font-size: 28px;
        font-weight: 500;
        color: #ffffff;
      }
      .btnRight {
        width: 330px;
        height: 76px;
        background: #ff9a00;
        border-radius: 8px;
        font-size: 28px;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>
