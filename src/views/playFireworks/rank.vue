<template>
  <!-- 放烟花游戏排行榜 -->
  <div class="gameRank publicVCenter">
    <div class="rank-list_wrap publicHCenter">
      <!-- 使用 transition-group 包裹排行榜项，实现动画 -->
      <transition-group
        name="rank-list-item"
        tag="div"
        class="rank-list"
      >
        <div
          class="rank-item publicVCenter"
          v-for="(item, index) in rankList"
          :key="item.id || index"
          :class="{ topThree: index < 3 }"
          :style="{ transitionDelay: index * 0.07 + 's' }"
        >
          <div class="num publicHvCenter">{{ index + 1 }}</div>
          <div class="avatar publicHvCenter"><img :src="item.avator" /></div>
          <div class="nickname">{{ item.wx_name }}</div>
          <div class="score">{{ item.score }}</div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { getRank } from '@/api/shake/index';

const defaultObj = {
  avator: require('@/assets/image/defaultHeadImg.png'),
  wx_name: '虚位以待',
  score: 0,
};
const gameCode = 'hmPlay34';

export default {
  name: 'GameRank',
  data() {
    return {
      rankList: [],
    };
  },
  computed: {
    nickname() {
      return this.$store.state.user.name;
    },
  },
  created() {
    this.getCountMoneyRank();
  },
  methods: {
    // 获取摇一摇排行榜
    getCountMoneyRank() {
      getRank(gameCode)
        .then((res) => {
          // 摇一摇分数取整
          res.list.forEach((item) => {
            item.score = parseInt(item.score, 10);
          });

          // 取前10条数据
          this.rankList = res.list.slice(0, 10);
          // 不足10条用默认数据填充
          while (this.rankList.length < 10) {
            this.rankList.push({ ...defaultObj });
          }
        })
        .catch((err) => {
          console.error(err);
          // 出错时显示默认数据
          this.topThree = Array(3)
            .fill()
            .map(() => ({ ...defaultObj }));
          this.commonList = Array(7)
            .fill()
            .map(() => ({ ...defaultObj }));
        });
    },
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'YouSheFont';
  src: url('https://ustatic.hudongmiao.com/joymewH5/font/youshe.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
.gameRank {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/game-rank_new2.png');
  background-color: #c2170a;
  background-size: 750px 1461px;
  background-repeat: no-repeat;
  flex-direction: column;

  .rank-list_wrap {
    background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/rank-box_bg.png');
    background-size: 100% 100%;
    width: 750px;
    height: 935px;
    position: absolute;
    top: 371px;
    padding-top: 40px;

    .rank-list {
      width: 83%;
      height: 96%;
      padding: 20px 0;
      overflow-y: scroll;
      .rank-item {
        width: 600px;
        height: 88px;
        margin: 0 auto;
        border-bottom: 1px solid #d60202;
        padding: 0 32px 0 24px;
        .num {
          background-size: 100% 100%;
          width: 43px;
          height: 43px;
          background-color: #d60202;
          font-size: 26px;
          color: #fff;
          border-radius: 50%;
          margin-right: 20px;
        }

        .avatar {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .nickname {
          font-size: 34px;
          color: #d60202;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: 'YouSheFont', sans-serif;
        }

        .score {
          font-size: 35px;
          color: #d60202;
          width: 120px;
          text-align: right;
        }

        &.topThree {
          height: 97px;
          background: linear-gradient(90deg, #d60202 0%, #e3051f 28%, #ff6200 100%);
          border-radius: 9px 9px 9px 9px;
          border-bottom: unset;
          .num {
            background-color: unset;
            font-size: 0;
            margin-right: 10px;
          }

          .avatar {
            width: 76px;
            height: 78px;
            border: 7px solid #f1c800;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .nickname {
            color: #fcff40;
          }

          .score {
            color: #fff;
          }
        }

        &:nth-child(1) {
          margin-bottom: 9px;
          .num {
            width: 43px;
            height: 65px;
            background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/rank-one.png);
          }
        }

        &:nth-child(2) {
          margin-bottom: 9px;
          .num {
            width: 47px;
            height: 58px;
            background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/rank-two.png);
          }
        }

        &:nth-child(3) {
          .num {
            width: 47px;
            height: 58px;
            background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/rank-three.png);
          }
        }
        &:last-child {
          border-bottom: unset;
        }
      }
    }
  }

  @media (min-height: 700px) {
    .rank-list_wrap {
      height: 1020px;
    }
  }
}

/* 列表项进入动画样式 */
.rank-list-item-enter-active,
.rank-list-item-leave-active {
  transition: all 0.5s ease-out;
}

.rank-list-item-enter,
.rank-list-item-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.rank-list-item-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
