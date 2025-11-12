<template>
  <!-- 谁最牛排行榜 -->
  <div class="gameRank">
    <div class="title-wrap">
      <div class="title cattleText">
        福运榜
      </div>
    </div>
    <div class="topFirst">
      <div class="order cattleText">
        第一名
      </div>
      <div class="img-wrap">
        <img
          :src="firstObj.headimgurl"
          class="headImg"
        />
        <div class="wrap" />
      </div>
      <div class="name cattleText">
        {{ firstObj.nickname }}
      </div>
      <div class="score cattleText">
        {{ firstObj.score }}
      </div>
    </div>
    <div class="top">
      <div class="top1" />
      <img
        :src="firstObj.headimgurl"
        class="headImg"
      />

      <div class="name publicHCenter">
        <div>{{ firstObj.nickname }}</div>
      </div>
      <div class="score publicVCenter">
        {{ firstObj.score }}分<label v-if="firstObj.coupon_name">{{ firstObj.coupon_name }}</label>
      </div>
    </div>
    <div class="top">
      <div class="top2" />
      <img
        :src="secondObj.headimgurl"
        class="headImg"
      />
      <div class="name publicHCenter">
        <div>{{ secondObj.nickname }}</div>
      </div>
      <div class="score publicVCenter">
        {{ secondObj.score }}分<label v-if="secondObj.coupon_name">{{ secondObj.coupon_name }}</label>
      </div>
    </div>
    <div class="top">
      <div class="top3" />
      <img
        :src="thirdObj.headimgurl"
        class="headImg"
      />
      <div class="name publicHCenter">
        <div>{{ thirdObj.nickname }}</div>
      </div>
      <div class="score publicVCenter">
        {{ thirdObj.score }}分<label v-if="thirdObj.coupon_name">{{ thirdObj.coupon_name }}</label>
      </div>
    </div>
    <div class="otherRank">
      <div
        v-for="(item, index) in commonList"
        :key="index"
        class="item"
        :class="{hasPrize: item.coupon_name}"
      >
        <div
          class="img-wrap"
          :style="'background-image: url(' + item.headimgurl + ')'"
        >
          <div class="num">
            {{ index + 4 }}
          </div>
        </div>
        <div class="name">
          {{ item.nickname }}
        </div>
        <div class="score publicVCenter">
          {{ item.score }}分<label v-if="item.coupon_name">{{ item.coupon_name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapState } from 'vuex';
import { getRank } from '@/api/shake/index';

const defaultObj = {
  headimgurl: require('../../assets/image/defaultHeadImg.png'),
  nickname: '虚位以待',
  score: 0,
  money: 0,
};
export default {
  name: 'GameRank',
  // props: {
  //   type: String, // 类型(shake:摇一摇排行榜;hby:红包雨排行榜;countMoney;数钞票排行榜)
  // },
  data() {
    return {
      commonList: [], // 除去1,2,3名
      firstObj: {}, // 第一名
      secondObj: {}, // 第二名
      thirdObj: {}, // 第三名
    };
  },
  computed: {},
  beforeDestroy() {},
  created() {
    console.log('***排行榜类型***');
    this.getShakeRank();
  },
  mounted() {},
  methods: {
    // 获取摇一摇排行榜
    getShakeRank() {
      getRank('hmPlay8')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
          // 摇一摇分数取整
          for (let i = 0; i < tmpLen; i += 1) {
            res.list[i].score = parseInt(res.list[i].score, 10);
          }
          if (tmpLen === 0) {
            // 情况1
            // 空操作
            this.caseHandle(1);
          } else if (tmpLen === 1) {
            // 情况2
            [this.firstObj] = res.list;
            this.caseHandle(2);
          } else if (tmpLen === 2) {
            // 情况3
            [this.firstObj, this.secondObj] = res.list;
            this.caseHandle(3);
          } else if (tmpLen === 3) {
            // 情况4
            [this.firstObj, this.secondObj, this.thirdObj] = res.list;
            this.caseHandle(4);
          } else if (tmpLen >= 4 && tmpLen <= 10) {
            // 情况5
            [this.firstObj, this.secondObj, this.thirdObj] = res.list;
            for (let i = 3; i < res.list.length; i += 1) {
              this.commonList.push(res.list[i]);
            }
            this.caseHandle(5);
          } else {
            // 情况6
            [this.firstObj, this.secondObj, this.thirdObj] = res.list;
            for (let i = 3; i < 10; i += 1) {
              this.commonList.push(res.list[i]);
            }
            this.caseHandle(6);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    caseHandle(num) {
      switch (num) {
        case 1:
          this.firstObj = defaultObj;
          this.secondObj = defaultObj;
          this.thirdObj = defaultObj;
          for (let i = 3; i < 10; i += 1) {
            this.commonList.push(defaultObj);
          }
          break;
        case 2:
          this.secondObj = defaultObj;
          this.thirdObj = defaultObj;
          for (let i = 3; i < 10; i += 1) {
            this.commonList.push(defaultObj);
          }
          break;
        case 3:
          this.thirdObj = defaultObj;
          for (let i = 3; i < 10; i += 1) {
            this.commonList.push(defaultObj);
          }
          break;
        case 4:
          for (let i = 3; i < 10; i += 1) {
            this.commonList.push(defaultObj);
          }
          break;
        case 5:
          for (let i = 3 + this.commonList.length; i < 10; i += 1) {
            this.commonList.push(defaultObj);
          }
          break;
        case 6:
          // 空操作
          break;
        default:
          console.log('default');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cattleText {
  color: #fff7c6;
}
.gameRank {
  position: absolute;
  width: 100%;
  // min-height: 100%;
  min-height: 1624px;
  overflow-y: scroll;
  background-image: url('~@/assets/image/rank/cattle/rankBg.png');
  background-size: 100% 100%;
  .title-wrap {
    width: 643px;
    height: 403px;
    margin: 0 auto;
    background-image: url('~@/assets/image/rank/cattle/title-wrap.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      margin-top: -22vw;
      font-size: 72px;
      font-weight: 400;
    }
  }
  .topFirst {
    width: 417px;
    height: 555px;
    margin: 0 auto;
    margin-bottom: 28px;
    background-image: url('~@/assets/image/rank/cattle/topFirst.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .order {
      font-size: 28px;
      margin-top: 80px;
    }
    .img-wrap {
      width: 221px;
      height: 172px;
      position: relative;
      margin-top: 10px;
      img {
        width: 172px;
        height: 172px;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        margin: 0 auto;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      .wrap {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 221px;
        height: 172px;
        background-image: url('~@/assets/image/rank/cattle/headImg.png');
        background-size: 100% 100%;
      }
    }
    .name {
      margin-top: 10px;
      width: 212px;
      height: 88px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url('~@/assets/image/rank/cattle/box.png');
      background-size: 100% 100%;
      font-size: 30px;
    }
    .score {
      margin-top: 40px;
      font-size: 26px;
    }
  }
  .top {
    width: 702px;
    height: 103px;
    margin: 0 auto;
    background-image: url('~@/assets/image/rank/cattle/top.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .top1,
    .top2,
    .top3 {
      width: 86px;
      height: 76px;
      background-size: 100% 100%;
      margin-left: 59px;
      margin-right: 28px;
    }
    .top1 {
      background-image: url('~@/assets/image/rank/cattle/top1.png');
    }
    .top2 {
      background-image: url('~@/assets/image/rank/cattle/top2.png');
    }
    .top3 {
      background-image: url('~@/assets/image/rank/cattle/top3.png');
    }
    .headImg {
      width: 82.7px;
      height: 82.7px;
    }

    .name {
      width: 305px;
      height: 85px;
      background-size: 100% 100%;
      font-size: 29.11px;
      color: #fff5af;
      line-height: 85px;
      z-index: 2;
      div {
        width: 22vw;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        white-space: nowrap;
      }
    }
    .score {
      font-size: 29.11px;
      color: #fc2c3d;
      width: 33vw;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-direction: column;
      label {
        font-size: 18px;
        color: #de36b7;
        font-weight: 500;
      }
    }
  }
  .otherRank {
    width: 100%;
    height: 200px;
    margin-top: 62px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 40px;
    padding: 0 10px;
    &.hasPrize {
      height: 36vw;
    }
    .item {
      width: 85px;
      height: 200px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      flex-grow: 1;
      .img-wrap {
        width: 85px;
        height: 85px;
        background-size: 100% 100%;
        position: relative;
        .num {
          width: 28px;
          height: 28px;
          font-size: 25.46px;
          color: #333333;
          margin-right: 32px;
          background-color: #980b17;
          color: #fded9e;
          display: flex;
          justify-content: center;
          border-radius: 50%;
          align-items: center;
          position: absolute;
          transform: translate(-50%, -50%);
        }
        .headImg {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin-right: 28px;
        }
      }

      .name {
        text-align: center;
        margin-top: 10px;
        font-size: 22.12px;
        color: #ffffff;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .score {
        margin-top: 10px;
        width: 100%;
        text-align: center;
        font-size: 25.46px;
        color: #980b17;
        flex-direction: column;
        label {
          font-size: 18px;
          color: #de36b7;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
