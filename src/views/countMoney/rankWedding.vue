<template>
  <!-- 红包雨、摇一摇、数钞票、切水果、跳一跳game公用排行榜 -->
  <div class="gameRank">
    <img src="https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-rank-bg-wedding.png" class="rankBg" />
    <div class="title" />
    <div class="rank-123">
        <div class="rank-item">
            <div class="rank-number">1</div>
            <div class="avator-wrap">
                <img :src="firstObj.avator" class="avator" />
            </div>
            <div class="score">
                <div class="num">{{ firstObj.score }}元</div>
            </div>
            <div class="name">{{ firstObj.wx_name }}</div>
        </div>
        <div class="rank-item">
            <div class="rank-number">2</div>
            <div class="avator-wrap">
                <img :src="secondObj.avator" class="avator" />
            </div>
            <div class="score">
                <div class="num">{{ secondObj.score }}元</div>
            </div>
            <div class="name">{{ secondObj.wx_name }}</div>
        </div>
        <div class="rank-item">
            <div class="rank-number">3</div>
            <div class="avator-wrap">
                <img :src="thirdObj.avator" class="avator" />
            </div>
            <div class="score">
                <div class="num">{{ thirdObj.score }}元</div>
            </div>
            <div class="name">{{ thirdObj.wx_name }}</div>
        </div>
    </div>
    <!-- 其他排名列表 -->
    <div class="other-rank-list">
        <div
            v-for="(item, index) in commonList"
            :key="index"
            class="rank-list-item"
        >
            <div class="rank-number">{{ index + 4 }}</div>
            <div class="avatar-container">
                <img :src="item.avator" class="avatar-img" />
            </div>
            <div class="username">{{ item.wx_name }}</div>
            <div class="score-text">
                <span>{{ item.score }}分</span>
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .title {
    width: 100vw;
    height: 30vw;
    background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-rank-wedding.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 2;
  }
  .rank-123 {
    width: 100%;
    height: 50vw;
    position: relative;
    z-index: 2;
    .rank-item {
        position: absolute;
        width:45vw;
        height: 50vw;
        background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/cm-rank-item.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .rank-number {
            position: absolute;
            left: 50%;
            top: 5vw;
            transform: translateX(-50%);
            width: 7vw;
            height: 7vw;
            border-radius: 50%;
            border: 4px solid #FF1A6B;
            background-color: #fff;
            color: #FF1A6B;
            font-size: 6vw;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .avator-wrap {
            position: absolute;
            left: 50%;
            top: 52%;
            transform: translate(-50%, -50%);
            width: 18vw;
            height: 18vw;
            border-radius: 50%;
            background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/countmoney-avatar-wedding.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            justify-content: center;
            .avator {
                width: 85%;
                height: 85%;
                border-radius: 50%;
            }
        }
        .score {
            position: absolute;
            width: 28vw;
            height: 10vw;
            left: 50%;
            top: 27vw;
            transform: translateX(-50%);
            background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/button3.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            z-index: 3;
            .num {
                position: absolute;
                width: 20vw;
                left: 4vw;
                top: 2vw;
                color: #9F5200;
                font-size: 2.5vw;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .name {
            position: absolute;
            width: 25vw;
            height: 8vw;
            left: 50%;
            top: 36vw;
            transform: translateX(-50%);
            background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/countMoneyWedding/button2.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 3vw;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .rank-item:nth-child(1) {
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    }
    .rank-item:nth-child(2) {
        left: -6vw;
        bottom: -2vw;
        transform: scale(0.75);
    }
    .rank-item:nth-child(3) {
        right: -6vw;
        bottom: -2vw;
        transform: scale(0.75);
    }
  }
  .other-rank-list {
    width: 90vw;
    margin: 0 auto;
    margin-top: 5vw;
    background: white;
    border-radius: 20px;
    border: 2px solid #FF1A6B;
    box-shadow:
      0 0 20px rgba(255, 105, 180, 0.3),
      0 0 40px rgba(255, 105, 180, 0.2),
      0 0 60px rgba(255, 105, 180, 0.1),
      0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    z-index: 2;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .rank-list-item {
      display: flex;
      align-items: center;
      width: 90%;
      padding: 15px 5px;
      border-bottom: 1px solid #FF69B4;

      &:last-child {
        border-bottom: none;
      }

      .rank-number {
        font-size: 3vw;
        font-weight: bold;
        color: #FF69B4;
        width: 10vw;
        text-align: center;
      }

      .avatar-container {
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
        border: 2px solid #FFA500;
        margin: 0 15px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .username {
        flex: 1;
        line-height: 2;
        font-size: 4vw;
        font-weight: bold;
        color: #FF697D;
        margin-right: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .score-text {
        font-size: 4vw;
        color: #FF697D;
        font-weight: bold;
        margin-right: 15px;
      }
    }
  }
  .rankBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
