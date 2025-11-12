<template>
  <!-- 红包雨、摇一摇、数钞票、切水果、跳一跳game公用排行榜 -->
  <div class="gameRank">
    <img src="@/assets/image/rank/rankBg.png" class="rankBg" />
    <div class="firstRank publicHvCenter">
      <img :src="firstObj.avator" class="headImg" />
      <div class="num">
        1
      </div>
      <div class="name publicHCenter">
        <div>{{ firstObj.wx_name }}</div>
      </div>
      <div
        v-if="
          type === 'shake' ||
            type === 'countMoney' ||
            type === 'cutFruit' ||
            type === 'jumpBone' ||
            type === 'pigOut' ||
            type === 'clickTiger'
        "
        class="score"
        :class="{ hasPrize: firstObj.coupon_name }"
      >
        {{ firstObj.score }}分
      </div>
      <div
        v-if="type === 'hby'"
        class="score"
        :class="{ hasPrize: firstObj.coupon_name }"
      >
        {{ firstObj.money }}元
      </div>
      <div
        v-if="firstObj.coupon_name"
        class="prize"
        :class="{
          s1: firstObj.coupon_name.length <= 7,
          s2: firstObj.coupon_name.length > 7
        }"
      >
        {{ firstObj.coupon_name }}
      </div>
    </div>
    <div class="secondRank publicHvCenter">
      <img :src="secondObj.avator" class="headImg" />
      <div class="num">
        2
      </div>
      <div class="name publicHCenter">
        <div>{{ secondObj.wx_name }}</div>
      </div>
      <div
        v-if="
          type === 'shake' ||
            type === 'countMoney' ||
            type === 'cutFruit' ||
            type === 'jumpBone' ||
            type === 'pigOut' ||
            type === 'clickTiger'
        "
        class="score"
        :class="{ hasPrize: secondObj.coupon_name }"
      >
        {{ secondObj.score }}分
      </div>
      <div
        v-if="type === 'hby'"
        class="score"
        :class="{ hasPrize: secondObj.coupon_name }"
      >
        {{ secondObj.money }}元
      </div>
      <div
        v-if="secondObj.coupon_name"
        class="prize"
        :class="{
          s1: secondObj.coupon_name.length <= 6,
          s2: secondObj.coupon_name.length > 6
        }"
      >
        {{ secondObj.coupon_name }}
      </div>
    </div>
    <div class="thirdRank publicHvCenter">
      <img :src="thirdObj.avator" class="headImg" />
      <div class="num">
        3
      </div>
      <div class="name publicHCenter">
        <div>{{ thirdObj.wx_name }}</div>
      </div>
      <div
        v-if="
          type === 'shake' ||
            type === 'countMoney' ||
            type === 'pigOut' ||
            type === 'cutFruit' ||
            type === 'jumpBone' ||
            type === 'clickTiger'
        "
        class="score"
        :class="{ hasPrize: thirdObj.coupon_name }"
      >
        {{ thirdObj.score }}分
      </div>
      <div
        v-if="type === 'hby'"
        class="score"
        :class="{ hasPrize: thirdObj.coupon_name }"
      >
        {{ thirdObj.money }}元
      </div>
      <div
        v-if="thirdObj.coupon_name"
        class="prize"
        :class="{
          s1: thirdObj.coupon_name.length <= 6,
          s2: thirdObj.coupon_name.length > 6
        }"
      >
        {{ thirdObj.coupon_name }}
      </div>
    </div>
    <div class="otherRank">
      <div
        v-for="(item, index) in commonList"
        :key="index"
        class="item publicVCenter"
      >
        <div class="left publicVCenter">
          <div class="num">
            {{ index + 4 }}
          </div>
          <img :src="item.avator" class="headImg" />
          <div class="name" :class="{ hasPrize: item.coupon_name }">
            {{ item.wx_name }}
          </div>
        </div>
        <div
          v-if="
            type === 'shake' ||
              type === 'countMoney' ||
              type === 'pigOut' ||
              type === 'cutFruit' ||
              type === 'jumpBone' ||
              type === 'clickTiger'
          "
          class="score publicVCenter"
          :class="{ hasPrize: item.coupon_name }"
        >
          {{ item.score }}分
        </div>
        <div
          v-if="type === 'hby'"
          class="score publicVCenter"
          :class="{ hasPrize: item.coupon_name }"
        >
          {{ item.money }}元
        </div>
        <div v-if="item.coupon_name" class="prize">
          {{ item.coupon_name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRank } from '@/api/shake/index';
import { getHbyRank } from '@/api/hby/index';
import moneyInManager from '@/components/MoneyIn/main';

const defaultObj = {
  avator: require('../../assets/image/defaultHeadImg.png'),
  wx_name: '虚位以待',
  score: 0,
  money: 0,
};
export default {
  name: 'GameRank',
  props: {
    type: String, // 类型(shake:摇一摇排行榜;hby:红包雨排行榜;countMoney;数钞票排行榜)
    shakeGameCode: {
      type: String,
      default: 'hmPlay6',
    },
  },
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
      console.log('获取到当前gameCode');
      getRank(this.shakeGameCode)
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
    // 获取数钞票排行榜
    getCountMoneyRank() {
      getRank('hmPlay7')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
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
    // 获取数钞票排行榜
    getPigOutRank() {
      getRank('hmPlay17')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
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
    // 武松打虎排行榜
    getClickTigerRank() {
      getRank('hmPlay18')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
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
    // 获取红包雨排行
    getHbyRank() {
      getHbyRank()
        .then((res) => {
          console.log(res);
          this.checkHbyRankHasMyInfo(res.list);
          const tmpLen = res.list.length;
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
    getCutFruitRank() {
      getRank('hmPlay9')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
          if (tmpLen === 0) {
            // 情况1
            // 空操作
            this.caseHandle(1);
          } else if (tmpLen === 1) {
            // 情况2
            [this.firstObj] = res.list;
            this.caseHandle(2);
            console.log(this.firstObj);
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
    getJumpBoneRank() {
      getRank('hmPlay13')
        .then((res) => {
          console.log(res);
          const tmpLen = res.list.length;
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
    checkHbyRankHasMyInfo(hbyList) {
      if (hbyList.length === 0 || !hbyList) {
        return;
      }
      const tmpTargetHbyInfo = hbyList.find(
        (item) => item.user_id === this.$store.state.user.userId,
      );
      if (tmpTargetHbyInfo && tmpTargetHbyInfo.money) {
        moneyInManager.createMoneyIn(tmpTargetHbyInfo.money);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.gameRank {
  position: absolute;
  height: 100vh;
  overflow-y: scroll;
  .rankBg {
    width: 100%;
  }
  .firstRank {
    width: 150px;
    height: 150px;
    background-color: #fee857;
    position: absolute;
    left: 41vw;
    top: 21vw;
    border-radius: 50%;
    .headImg {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      position: absolute;
      z-index: 1;
    }
    .num {
      width: 88px;
      height: 64px;
      position: absolute;
      background-image: url("../../assets/image/rank/goldenCrown.png");
      background-size: 100% 100%;
      top: -7vw;
      color: #ffffff;
      text-align: center;
      line-height: 75px;
    }
    .name {
      width: 305px;
      height: 85px;
      background-image: url("../../assets/image/rank/goldenRibbon.png");
      background-size: 100% 100%;
      font-size: 28px;
      color: #ca8820;
      position: absolute;
      top: 10vw;
      line-height: 15.2vw;
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
      font-size: 44px;
      color: #ffffff;
      position: absolute;
      top: 29vw;
      width: 33vw;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      text-align: center;
      &.hasPrize {
        top: 26vw;
      }
    }
    .prize {
      color: #fffc29;
      position: absolute;
      font-weight: 500;
      top: 35vw;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      width: 33vw;
      &.s1 {
        font-size: 32px;
      }
      &.s2 {
        font-size: 18px;
      }
    }
  }
  .secondRank {
    width: 116px;
    height: 116px;
    background-color: #fac4ff;
    position: absolute;
    left: 12vw;
    top: 27vw;
    border-radius: 50%;
    .headImg {
      width: 106px;
      height: 106px;
      border-radius: 50%;
      position: absolute;
      z-index: 1;
    }
    .num {
      width: 88px;
      height: 64px;
      position: absolute;
      background-image: url("../../assets/image/rank/pinkCrown.png");
      background-size: 100% 100%;
      top: -6vw;
      color: #ffffff;
      text-align: center;
      line-height: 75px;
    }
    .name {
      width: 212px;
      height: 87px;
      background-image: url("../../assets/image/rank/goldenRibbon.png");
      background-size: 100% 100%;
      font-size: 24px;
      color: #de36b7;
      position: absolute;
      top: 10vw;
      line-height: 15.6vw;
      z-index: 2;
      div {
        width: 26vw;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        white-space: nowrap;
      }
    }
    .score {
      font-size: 44px;
      color: #ffffff;
      position: absolute;
      top: 24vw;
      width: 26vw;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      left: -2vw;
      &.hasPrize {
        top: 21vw;
      }
    }
    .prize {
      color: #fffc29;
      position: absolute;
      font-weight: 500;
      width: 26vw;
      top: 29vw;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      &.s1 {
        font-size: 32px;
      }
      &.s2 {
        font-size: 18px;
      }
    }
  }
  .thirdRank {
    width: 116px;
    height: 116px;
    background-color: #fac4ff;
    position: absolute;
    right: 12vw;
    top: 28vw;
    border-radius: 50%;
    .headImg {
      width: 106px;
      height: 106px;
      border-radius: 50%;
      position: absolute;
      z-index: 1;
    }
    .num {
      width: 88px;
      height: 64px;
      position: absolute;
      background-image: url("../../assets/image/rank/pinkCrown.png");
      background-size: 100% 100%;
      top: -6vw;
      color: #ffffff;
      text-align: center;
      line-height: 75px;
    }
    .name {
      width: 212px;
      height: 87px;
      background-image: url("../../assets/image/rank/goldenRibbon.png");
      background-size: 100% 100%;
      font-size: 24px;
      color: #de36b7;
      position: absolute;
      top: 10vw;
      line-height: 15.6vw;
      z-index: 2;
      div {
        width: 26vw;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        white-space: nowrap;
      }
    }
    .score {
      font-size: 44px;
      color: #ffffff;
      position: absolute;
      top: 24vw;
      width: 26vw;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      left: -6vw;
      &.hasPrize {
        top: 22vw;
      }
    }
    .prize {
      color: #fffc29;
      position: absolute;
      font-weight: 500;
      width: 26vw;
      top: 29vw;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      &.s1 {
        font-size: 32px;
      }
      &.s2 {
        font-size: 18px;
      }
    }
  }
  .otherRank {
    width: 90vw;
    position: absolute;
    top: 63vw;
    left: 50%;
    transform: translateX(-50%);
    .item {
      padding: 3.5vw 7.5vw;
      position: relative;
      .left {
        .num {
          font-size: 36px;
          color: #333333;
          width: 6vw;
        }
        .headImg {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin-right: 28px;
        }
        .name {
          font-size: 28px;
          color: #333333;
          width: 39vw;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &.hasPrize {
            width: 18vw;
          }
        }
      }
      .score {
        font-size: 28px;
        color: #666666;
        position: absolute;
        right: 7.5vw;
        &.hasPrize {
          right: 33vw;
        }
      }
      .prize {
        font-size: 28px;
        color: #dd2db5;
        position: absolute;
        right: 5vw;
        width: 25vw;
      }
    }
  }
}
</style>
