<template>
  <div class="get-award">
    <div class="get-container">
      <div class="gift-banner">
        <img
          src="~@/assets/image/hlt/choujiang/gift.png"
          class="gift-img"
        />
      </div>
      <div class="award-container">
        <div class="award-title">
          恭喜您抽中<span>{{ award.award_level }}</span>
        </div>
        <img
          src="~@/assets/image/hlt/choujiang/youhuiquan.png"
          alt=""
          class="award-logo"
        />
        <div class="award-info">
          <div class="award-item">
            <div class="item-label">
              婚礼抵扣券：
            </div>
            <div class="item-data">
              {{ `满${award.award_condition}减${award.award_discount}` }}
            </div>
          </div>
          <div class="award-item">
            <div class="item-label">
              有效期至：
            </div>
            <div class="item-data">
              {{ award.end_time }}
            </div>
          </div>
          <div class="award-item">
            <div class="item-label">
              详细情况请咨询客服：
            </div>
            <!-- <div class="item-data">{{ award.phone.slice(4) }}</div> -->
            <div class="item-data">
              <a :href="award.phone">{{ award.phone.slice(4) }}</a>
            </div>
          </div>
        </div>
        <div
          v-tap="{ methods: closeHandler }"
          class="sure-btn"
        >
          收下优惠券
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GetAward',
  props: {
    award: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    closeHandler() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="less" scoped>
.get-award {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  .get-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &::before,
    &::after {
      content: '';
      display: table;
      clear: both;
    }

    .gift-banner {
      width: 508px;
      height: 470px;
      background-image: url('~@/assets/image/hlt/choujiang/gift-light.png');
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .gift-img {
        width: 480px;
        height: 276px;
      }
    }

    .award-container {
      width: 576px;
      margin-top: -216px;
      padding: 40px 52px;
      box-sizing: border-box;
      background-image: url('~@/assets/image/hlt/choujiang/get-bg.png');
      background-size: 100% 100%;
      border-radius: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .award-title {
        margin-bottom: 24px;
        color: #ec5f72;
        font-weight: bold;
        font-size: 46px;
        white-space: nowrap;
        span {
          margin-left: 24px;
        }
      }

      .award-logo {
        width: 240px;
        height: 240px;
        margin-bottom: 32px;
      }
      .award-info {
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
        .award-item {
          width: 100%;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #743920;
          font-size: 24px;

          &:first-of-type {
            margin-bottom: 24px;
            font-size: 28px;
          }

          &:last-of-type {
            margin-bottom: 48px;
            .item-data {
              text-decoration: underline;
              a {
                color: #743920;
                &:link,
                &:visited,
                &:hover,
                &:active {
                  color: #743920;
                }
              }
            }
          }
        }
      }

      .sure-btn {
        width: 416px;
        height: 96px;
        margin-bottom: 26px;
        background-image: linear-gradient(103deg, #ff825e 0%, #ff6c87 100%, #f24ebd 100%);
        border-radius: 92px;
        color: #ffffff;
        font-weight: bold;
        line-height: 96px;
        text-align: center;
        letter-spacing: 2px;
      }
    }
  }
}
</style>
