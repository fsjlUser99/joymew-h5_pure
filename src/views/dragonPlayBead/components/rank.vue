<!--
  * @Description: 「游龙戏珠」排行榜组件
  * @Author: Ruan Jiazhen
  * @Date: 2023-12-27
-->
<template>
  <div class="gameRank">
    <img
      src="@/assets/image/dragonPlayBead/rank-bg.webp"
      class="rank-bg"
    />
    <div class="no-1 publicHvCenter">
      <img
        :src="rankList[0].avator"
        class="avatar"
      />
      <img
        src="@/assets/image/dragonPlayBead/no-1.webp"
        class="avatar-border"
      />
      <div class="nickname publicHCenter">{{ rankList[0].wx_name }}</div>
      <div class="score">
        {{ rankList[0].score }}
      </div>
    </div>
    <div class="no-2 publicHvCenter">
      <img
        :src="rankList[1].avator"
        class="avatar"
      />
      <img
        src="@/assets/image/dragonPlayBead/no-2.webp"
        class="avatar-border"
      />
      <div class="nickname publicHCenter">{{ rankList[1].wx_name }}</div>
      <div class="score">
        {{ rankList[1].score }}
      </div>
    </div>
    <div class="no-3 publicHvCenter">
      <img
        :src="rankList[2].avator"
        class="avatar"
      />
      <img
        src="@/assets/image/dragonPlayBead/no-3.webp"
        class="avatar-border"
      />
      <div class="nickname publicHCenter">{{ rankList[2].wx_name }}</div>
      <div class="score">
        {{ rankList[2].score }}
      </div>
    </div>
    <div class="other-rank">
      <div
        v-for="(item, index) in rankList.slice(3)"
        :key="index"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/dragonPlayBead/rank-bar.svg"
          class="item-bg"
        />
        <div class="num">
          {{ index + 4 }}
        </div>
        <img
          :src="item.avator"
          class="avatar"
        />
        <div
          class="nickname"
          :class="{ hasPrize: item.coupon_name }"
        >
          {{ item.wx_name }}
        </div>
        <div
          class="score publicVCenter"
          :class="{ hasPrize: item.coupon_name }"
        >
          {{ item.score }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRank } from '@/api/shake/index';

export default {
  name: 'GameRank',
  data() {
    const rankList = Array.from({ length: 10 }, () => ({
      avator: require('@/assets/image/defaultHeadImg.png'),
      wx_name: '虚位以待',
      score: 0,
    }));
    return {
      rankList,
    };
  },
  created() {
    this.getRankList();
  },
  methods: {
    async getRankList() {
      const res = await getRank('hmPlay28');
      const resList = res?.list || [];
      this.rankList = [
        ...resList.slice(0, 10).map((item) => ({
          avator: item.avator,
          wx_name: item.nickname,
          score: item.score,
        })),
        ...this.rankList.slice(resList.length),
      ];
    },
  },
};
</script>

<style lang="less" scoped>
.gameRank {
  position: absolute;
  width: 100vw;
  height: 100vh;

  .rank-bg {
    position: absolute;

    width: 100%;
    height: 100%;
  }
  .no-1,
  .no-2,
  .no-3 {
    position: absolute;
    border-radius: 50%;

    width: 213px;
    height: 433px;

    .avatar {
      position: absolute;
      top: 3.5vw;
      left: 50%;
      transform: translateX(-50%);

      width: 22vw;
      height: 22vw;
      border-radius: 50%;
      object-fit: cover;
    }

    .avatar-border {
      z-index: 1;

      width: 100%;
      height: 100%;
    }

    .nickname,
    .score {
      position: absolute;
      top: 26.5vw;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;

      width: 80%;
      text-align: center;

      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 32px;
      font-weight: bolder;
      color: #fff;
      z-index: 2;
    }
    .score {
      top: 33vw;
    }
  }

  .no-1 {
    left: 50%;
    top: 14vw;

    transform: translateX(-50%);

    .nickname,
    .score {
      -webkit-text-stroke: 2px #c55507;
    }
  }

  .no-2 {
    left: 10vw;
    top: 20vw;

    .nickname,
    .score {
      -webkit-text-stroke: 2px #3b31b9;
    }
  }

  .no-3 {
    right: 10vw;
    top: 22vw;

    .nickname,
    .score {
      -webkit-text-stroke: 2px #ad3302;
    }
  }
  .other-rank {
    position: absolute;
    top: 95vw;
    left: 50%;

    // border: 1px solid #fff;
    width: 90vw;
    height: calc(100vh - 95vw - 20px);
    transform: translateX(-50%);
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    row-gap: 10px;

    .item {
      width: 100%;
      height: 101px;
      position: relative;

      display: grid;
      grid-template-areas: 'num avatar nickname score';
      grid-template-columns: 15vw 15vw 2fr 1fr;
      place-items: center;

      .item-bg {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;

        filter: drop-shadow(0px 8px 16px #a91010);
        box-shadow: inset 0px -4px 0px #e5c593;
      }

      .num {
        grid-area: num;
        font-size: 36px;
        font-weight: bold;
        color: #b0722f;
      }

      .avatar {
        grid-area: avatar;
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
      .nickname {
        grid-area: nickname;
        justify-self: start;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;

        font-size: 40px;
        font-weight: bold;
        color: #b35315;
        white-space: nowrap;
      }
      .score {
        grid-area: score;
        justify-self: end;

        padding-right: 20px;
        font-size: 40px;
        font-weight: bold;
        color: #e86800;
      }
    }
  }
}
</style>
