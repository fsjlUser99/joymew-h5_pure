<template>
  <!-- 红包雨、摇一摇、数钞票、切水果、跳一跳game公用排行榜(同庆楼版) -->
  <div class="gameRank">
    <div
      class="tip publicHvCenter"
      :style="{ paddingTop: (logoInfo.logoSize / 2) * 0.13 + 'vw' }"
    >
      <img
        src="@/assets/image/rank/coupon/laba.png"
        class="laba"
      />代金券奖励请于同庆楼公众号会员中心查看
    </div>
    <div
      class="rankList"
      :style="{ marginTop: (logoInfo.logoSize / 2 + 60) * 0.13 + 'vw' }"
    >
      <div
        v-for="(item, index) in rankList"
        :key="index"
        class="rankItem publicVCenter"
        :class="{ hasPrize: item.coupon_name }"
      >
        <div class="num">
          {{ index + 1 }}
        </div>
        <img
          :src="item.avator"
          class="avator"
        />
        <div class="name">
          {{ item.wx_name }}
        </div>
        <div
          v-if="type === 'shake' || type === 'countMoney' || type === 'cutFruit' || type === 'jumpBone' || type === 'pigOut'"
          class="score"
        >
          {{ item.score }} <label>分</label>
        </div>
        <div
          v-if="type === 'hby'"
          class="score"
        >
          {{ item.money }}<label>元</label>
        </div>
        <div
          v-if="item.coupon_name"
          class="prize publicVCenter"
          :class="{ goods: item.is_coupon === '0', coupon: item.is_coupon === '1' }"
        >
          {{ item.coupon_name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRank } from '@/api/shake/index';
import { getHbyRank } from '@/api/hby/index';
import { mapState } from 'vuex';

const defaultObj = {
  avator: require('../../assets/image/defaultHeadImg.png'),
  wx_name: '虚位以待',
  score: 0,
  money: 0,
};
export default {
  name: 'CouponRank',
  computed: {
    ...mapState({
      logoInfo: (state) => state.game.logoInfo,
    }),
  },
  props: {
    type: String, // 类型(shake:摇一摇排行榜;hby:红包雨排行榜;countMoney;数钞票排行榜)
    shakeGameCode: {
      type: String,
      default: 'hmPlay6',
    },
  },
  data() {
    return {
      rankList: [],
    };
  },
  beforeDestroy() {},
  created() {
    console.log('***排行榜类型***');
    console.log(this.type);
    if (this.type === 'shake') {
      this.getShakeRank();
    } else if (this.type === 'countMoney') {
      this.getCountMoneyRank();
    } else if (this.type === 'hby') {
      this.getHbyRank();
    } else if (this.type === 'cutFruit') {
      this.getCutFruitRank();
    } else if (this.type === 'jumpBone') {
      this.getJumpBoneRank();
    } else if (this.type === 'pigOut') {
      this.getPigOutRank();
    } else if (this.type === 'clickTiger') {
      this.getClickTigerRank();
    }
  },
  mounted() {},
  methods: {
    // 获取摇一摇排行榜
    getShakeRank() {
      getRank(this.shakeGameCode)
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
          // 摇一摇分数取整
          for (let i = 0; i < tmpLen; i += 1) {
            res.list[i].score = parseInt(res.list[i].score, 10);
          }
          // 空位补齐
          for (let i = tmpLen; i < 10; i += 1) {
            res.list.push(defaultObj);
          }
          this.rankList = res.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取数钞票排行榜
    getCountMoneyRank() {
      getRank('hmPlay7')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
          // 空位补齐
          for (let i = tmpLen; i < 10; i += 1) {
            res.list.push(defaultObj);
          }
          this.rankList = res.list;
          console.log(this.rankList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取狼吞虎咽排行榜
    getPigOutRank() {
      getRank('hmPlay17')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
          // 空位补齐
          for (let i = tmpLen; i < 10; i += 1) {
            res.list.push(defaultObj);
          }
          this.rankList = res.list;
          console.log(this.rankList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取武松打虎排行榜
    getClickTigerRank() {
      getRank('hmPlay18')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
          // 空位补齐
          for (let i = tmpLen; i < 10; i += 1) {
            res.list.push(defaultObj);
          }
          this.rankList = res.list;
          console.log(this.rankList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取红包雨排行
    getHbyRank() {
      getHbyRank()
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
          // 空位补齐
          for (let i = tmpLen; i < 10; i += 1) {
            res.list.push(defaultObj);
          }
          this.rankList = res.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCutFruitRank() {
      getRank('hmPlay9')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
          // 空位补齐
          for (let i = tmpLen; i < 10; i += 1) {
            res.list.push(defaultObj);
          }
          this.rankList = res.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getJumpBoneRank() {
      getRank('hmPlay13')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
          // 空位补齐
          for (let i = tmpLen; i < 10; i += 1) {
            res.list.push(defaultObj);
          }
          this.rankList = res.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.gameRank {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background: radial-gradient(#6016b8, #4c0e9e);
  .tip {
    font-size: 24px;
    color: #ffffff;
    padding-top: 30px;
    .laba {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
  }
  .rankList {
    margin-top: 24px;
    .rankItem {
      position: relative;
      margin: 0 auto;
      margin-bottom: 22px;
      width: 686px;
      height: 72px;
      background-size: 100% 100%;
      padding-left: 16px;
      background-image: url('../../assets/image/rank/coupon/bgCommon.png');
      .num {
        width: 42px;
        font-size: 40px;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
      }
      .avator {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        margin-left: 12px;
        margin-right: 14px;
      }
      .name {
        width: 224px;
        font-size: 32px;
        font-weight: 400;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .score {
        font-size: 52px;
        font-weight: 500;
        color: #ffffff;
        position: absolute;
        right: 24px;
      }
      .prize {
        width: 686px;
        height: 132px;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 72px;
        padding-left: 30px;
        font-size: 44px;
        font-weight: 500;
        color: #fe0b41;
        &.goods {
          background-image: url('../../assets/image/rank/coupon/couponBg2.png');
        }
        &.coupon {
          background-image: url('../../assets/image/rank/coupon/couponBg.png');
        }
      }
      &.hasPrize {
        margin-bottom: 154px;
      }
      &:nth-child(1) {
        background-image: url('../../assets/image/rank/coupon/bg1.png');
        .num {
          color: #fff500;
        }
      }
      &:nth-child(2) {
        background-image: url('../../assets/image/rank/coupon/bg2.png');
        .num {
          color: #95e8ff;
        }
      }
      &:nth-child(3) {
        background-image: url('../../assets/image/rank/coupon/bg3.png');
        .num {
          color: #f9dcba;
        }
      }
    }
  }
}
</style>
