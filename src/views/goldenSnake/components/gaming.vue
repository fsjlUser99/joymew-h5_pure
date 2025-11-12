<template>
  <div
    class="gs-gaming"
    id="gs-gaming"
  >
    <!-- <div class="cd">
      <div
        class="stripe"
        :class="{ play: play }"
      />
    </div> -->
    <div class="top-message">
      <div class="score">得分:{{ score }}</div>
      <!-- <img
        class="price"
        src="https://ustatic.hudongmiao.com/mew/common/6912f877a5054d339d095b7eed9027c8"
      /> -->
      <!-- <div class="cd-text">
        <img
          src="https://ustatic.hudongmiao.com/mew/common/c896fdbb0c7a4bdb859ad27184dbad5e"
          alt=""
        />
        <span>{{ time }}</span>
      </div> -->
    </div>
    <broad
      v-if="mpType && scoreAdd"
      :broadContent="broadContent"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { submitScore } from '@/api/api-game';
import broad from '@/components/broad/index.vue';
import init from '../index';

export default {
  data: () => ({
    score: 0,
    time: 60,
    intervalCode: '',
    game: null,
    scoreAdd: 0,
  }),
  components: {
    broad,
  },
  computed: {
    ...mapState({
      mpType: (state) => state.app.mpType,
    }),
    broadContent() {
      return `您已通过加分宝增加${this.scoreAdd}初始积分哦～`;
    },
  },
  created() {
    clearInterval(this.intervalCode);
    this.initScore();
  },
  mounted() {
    this.game = init({
      onGameStart: () => {
        // this.play = true;
        this.intervalCode = setInterval(() => {
          if (this.time-- === 0) {
            clearInterval(this.intervalCode);
            return;
          }
          submitScore(this.score)
            .then((res) => {
              console.log(res);
              this.score = Math.max(res.score, this.score);
              this.scoreAdd = res.addScoreInfo?.startScore || 0;
            })
            .catch((err) => {
              console.log(err);
            });
        }, 2e3);
      },
      onScoreChange: (score) => {
        this.score += score;
        if (this.score < 0) {
          this.score = 0;
        }
      },
      jade: 10,
      yuanbao: 5,
      bomb: -1,
    });
  },
  beforeDestroy() {
    clearInterval(this.intervalCode);
    if (this.game) {
      this.game.destroy();
    }
  },
  methods: {
    // 初始化分数
    initScore() {
      submitScore(this.score)
        .then((res) => {
          console.log(res);
          this.score = Math.max(res.score, this.score);
          this.scoreAdd = res.addScoreInfo?.startScore || 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.broad {
  position: absolute;
  top: 3vw;
  width: 55vw;
  border-radius: 2.4vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0 1.2vw;
}
.gs-gaming {
  width: 100%;
  height: 100%;
  position: relative;

  .cd {
    background-size: 100% 100%;
    position: absolute;
    background-color: #fd8d11;
    border-radius: 100px;
    // border: 8px solid #ea6e22;
    overflow: hidden;
    height: 36px;
    width: 556px;
    top: 136px;
    left: 50%;
    transform: translateX(-50%);

    .stripe {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 100px;
      overflow: hidden;
      left: -100%;

      &.play {
        animation: move-stripe 60s linear reverse forwards;
      }

      &::after {
        background: repeating-linear-gradient(-45deg, #fef2a0 0, #fef2a0 24px, #fbdf59 24px, #fbdf59 48px);
        content: '';
        display: block;
        height: 300px;
        width: 100%;
        animation: play-stripe linear 60s infinite;
      }
    }

    @keyframes move-stripe {
      to {
        left: 0;
      }
    }

    @keyframes play-stripe {
      to {
        width: 1000%;
      }
    }
  }

  .top-message {
    position: absolute;
    height: 120px;
    top: 0;
    left: 0;
    width: 100%;
    // background-color: red;
    padding: 36px 0 30px 0;
    display: flex;

    .score {
      padding: 0 22px 0 8px;
      color: #feed5a;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 0 50px 50px 0;
      display: flex;
      align-items: center;
    }

    .price {
      margin-left: auto;
      width: 140px;
      height: 56px;
    }

    .cd-text {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;

      img {
        width: 118px;
        height: 44px;
      }

      span {
        color: white;
        font-size: 40px;
      }
    }
  }
}
</style>
