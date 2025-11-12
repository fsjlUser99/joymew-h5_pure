<template>
  <div class="container">
    <SvgaPlayer
      :style-obj="{
        width: '80vw',
        height: '30vw',
      }"
      :svga-file="BASKETBALL_SHOOT.prizeSheetTitle"
      class="title"
    />
    <div class="rank-list">
      <!-- 第一名 -->
      <div class="rank-item no-1">
        <img
          src="@/assets/image/basketball-shoot/rank-list-no-1-number.png"
          class="num-img"
        />
        <img />
        <img
          src="@/assets/image/basketball-shoot/rank-list-no-1-bg.png"
          alt=""
          class="bg"
        />
        <img
          :src="rankList[0].avatar"
          alt="avatar"
          class="avatar"
        />
        <div class="name">
          {{ rankList[0].name }}
        </div>
        <div class="score">
          {{ rankList[0].score }}
        </div>
      </div>
      <!-- 第二名 -->
      <div class="rank-item no-2">
        <img
          src="@/assets/image/basketball-shoot/rank-list-no-2-number.png"
          class="num-img"
        />
        <img />
        <img
          src="@/assets/image/basketball-shoot/rank-list-no-2-bg.png"
          alt=""
          class="bg"
        />
        <img
          :src="rankList[1].avatar"
          alt="avatar"
          class="avatar"
        />
        <div class="name">
          {{ rankList[1].name }}
        </div>
        <div class="score">
          {{ rankList[1].score }}
        </div>
      </div>
      <!-- 第三名 -->
      <div class="rank-item no-3">
        <img
          src="@/assets/image/basketball-shoot/rank-list-no-3-number.png"
          class="num-img"
        />
        <img />
        <img
          src="@/assets/image/basketball-shoot/rank-list-no-2-bg.png"
          alt=""
          class="bg"
        />
        <img
          :src="rankList[2].avatar"
          alt="avatar"
          class="avatar"
        />
        <div class="name">
          {{ rankList[2].name }}
        </div>
        <div class="score">
          {{ rankList[2].score }}
        </div>
      </div>
      <!-- 第4-8名 -->
      <div class="others">
        <div
          v-for="(player, index) in rankList.slice(3, 8)"
          :key="player.id"
          class="rank-item"
        >
          <img
            class="avatar-border"
            src="@/assets/image/basketball-shoot/rank-avatar-border.png"
          />
          <img
            class="avatar"
            :src="player.avatar"
          />
          <div class="rank">
            {{ index + 4 }}
          </div>
          <div class="name">
            {{ player.name }}
          </div>
          <div class="score">
            {{ player.score }}
          </div>
        </div>
      </div>

      <!-- 「我知道了」按钮 -->
      <div
        class="btn"
        @click="$router.push('/')"
      >
        我知道了
      </div>
    </div>
  </div>
</template>

<script>
import SvgaPlayer from '@/components/SvgaPlayer.vue';
import { BASKETBALL_SHOOT } from '../assets/constant/effect';

export default {
  name: 'BasketballShootRank',
  components: {
    SvgaPlayer,
  },
  props: {
    /** 排行榜列表 */
    rankList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      BASKETBALL_SHOOT,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  .title {
    position: absolute;
    top: 27px;
    left: 50%;
    transform: translateX(-50%);

    width: 68.7179vw;
    height: 23.5897vw;
  }

  .rank-list {
    position: absolute;
    top: 38.6667vw;
    left: 50%;
    transform: translateX(-50%);

    width: 88.2667vw;
    height: 76.97vh;
    border: 2px solid #ffffff;
    border-radius: 16px;
    background-color: rgba(#ffffff, 0.1);
    box-shadow: 0px 4px 16px 0px rgba(#fff, 0.25) inset;

    // 模糊背景
    backdrop-filter: blur(10px);

    // 第一名、第二名、第三名
    .no-1,
    .no-2,
    .no-3 {
      position: absolute;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .num-img {
        width: 5.3333vw;
        height: 7.2vw;
      }

      .bg {
        width: 100%;
        object-fit: cover;
      }

      .avatar {
        position: absolute;
        object-fit: cover;
      }

      .name {
        position: absolute;
        bottom: 20%;
        left: 50%;
        transform: translateX(-50%);

        font-size: 30px;
        font-weight: 700;
        color: #ffffff;
      }

      .score {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);

        font-weight: 900;
      }
    }

    // 第一名
    .no-1 {
      top: 2vh;
      left: 50%;
      transform: translateX(-50%);

      width: 200px;

      .avatar {
        width: 110px;
        height: 110px;
        top: 62px;
        left: 28%;
      }

      .score {
        // 文字渐变色
        background: linear-gradient(270deg, #fff4dc 0%, #ffc04e 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        font-size: 8.2667vw;
        line-height: 8.2667vw;
      }
    }

    // 第二名
    .no-2,
    .no-3 {
      top: 25vh;

      width: 180px;

      .num-img {
        width: 38px;
        height: 46px;
      }

      .avatar {
        top: 53px;
        left: 41px;
        width: 93px;
        height: 93px;
      }

      .name {
        font-size: 20px;
        bottom: 25%;
      }

      .score {
        font-size: 40px;
        line-height: 40px;
        bottom: 10%;

        color: #fff;
      }
    }

    .no-2 {
      left: 88px;
    }

    .no-3 {
      right: 88px;
    }

    // 第4-8名
    .others {
      position: absolute;
      bottom: 15vh;
      left: 50%;
      transform: translateX(-50%);
      display: grid;
      // 优先使用列宽，如果列宽不够，则自动换行
      grid-auto-flow: column;
      grid-auto-columns: 106px;
      column-gap: 18px;

      .rank-item {
        position: relative;
        display: grid;
        grid-template:
          'avatar' 106px
          'rank' 10px
          'name' min-content
          'score' min-content;
        place-items: center;
        .avatar-border {
          grid-area: avatar;

          width: 106px;
          height: 106px;
          object-fit: cover;
        }

        .avatar {
          grid-area: avatar;
          width: 80px;
          height: 80px;

          border-radius: 50%;
          object-fit: cover;
        }

        .rank {
          grid-area: rank;
          align-self: flex-start;

          transform: translateY(-20px);

          width: 20px;
          height: 20px;

          background-color: rgba(218, 190, 137, 0.5);
          border: 2px solid #ffce75;
          border-radius: 50%;

          display: flex;
          justify-content: center;
          align-items: center;

          font-size: 8px;
          color: #ffffff;
        }

        .name {
          grid-area: name;
          font-size: 1vw;
          color: #ffffff;
        }

        .score {
          grid-area: score;
          font-size: 4vw;
          font-weight: bolder;
          color: #ffffff;

          // 文字渐变色
          background: linear-gradient(270deg, #fff4dc 0%, #ffc04e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    // 「我知道了」按钮
    .btn {
      position: absolute;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%);

      width: 468px;
      height: 104px;
      background: #ff4365;
      border-radius: 52px;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 46px;
      color: #ffffff;
    }
  }
}
</style>
