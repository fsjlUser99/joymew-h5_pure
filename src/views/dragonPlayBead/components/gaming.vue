<!--
  * @Description: 「游龙戏珠」游戏中组件
  * @Author: Ruan Jiazhen
  * @Date: 2023-12-26
-->
<template>
  <div class="main">
    <img
      src="@/assets/image/dragonPlayBead/gaming-bg.webp"
      class="bg"
    />
    <span class="score">{{ score }}</span>
    <img
      :src="dragonHead"
      class="dragon-head"
    />
    <img
      src="@/assets/image/dragonPlayBead/arrow.webp"
      class="arrow-ani"
    />
    <div class="bead-ani">
      <img
        v-for="id in beadList"
        :key="id"
        src="@/assets/image/dragonPlayBead/bead.webp"
        class="bead"
        @animationend="handleBeadAniEnd(id)"
      />
    </div>
    <img
      src="@/assets/image/dragonPlayBead/treasure-bowl.webp"
      class="treasure-bowl"
    />
    <div
      class="touch-area"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    />
    <broad
      v-if="mpType && scoreAdd"
      :broadContent="broadContent"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { submitScore } from '@/api/api-game';
import closeMouse from '@/assets/image/dragonPlayBead/dragon-head-close-mouse.webp';
import openMouse from '@/assets/image/dragonPlayBead/dragon-head-open-mouse.webp';
import createjs from 'createjs-cmd';
import broad from '@/components/broad/index.vue';

export default {
  name: 'CountMoneyMain',
  data() {
    return {
      dragonHead: openMouse,
      startY: 0,
      lock: false,
      audioLock: false,
      beadList: [],
      moneyList: [],
      count: 0,
      score: 0,
      submitScoreInterval: null,
      time: 0,
      timer: null,
      scoreAdd: 0,
    };
  },
  components: {
    broad,
  },
  watch: {
    score(newVal) {
      if (newVal >= 0 && !this.submitScoreInterval) {
        this.intervalSubmitScore();
      }
    },
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
    this.getScore();
    this.timer = setInterval(() => {
      this.time += 1;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.submitScoreInterval);
    clearInterval(this.timer);
  },
  methods: {
    handleBeadAniEnd(item) {
      this.beadList = this.beadList.filter((v) => v !== item);
      this.dragonHead = closeMouse;
      createjs.Sound.play('eat');
      setTimeout(() => {
        this.dragonHead = openMouse;
      }, 100);
      this.score += 100;
    },
    handleTouchStart(e) {
      if (this.lock) return;
      this.lock = true;
      this.startY = e.touches[0].pageY;
    },
    handleTouchEnd(e) {
      const endY = e.changedTouches[0].pageY;
      if (endY < this.startY) {
        const beadCount = Math.floor(this.time / 10) + 1;
        for (let i = 0; i < beadCount; i += 1) {
          setTimeout(() => {
            const beadId = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
            this.beadList.push(beadId);
          }, i * 100);
        }
      }
      this.lock = false;
    },
    async getScore() {
      const res = await submitScore(this.score);
      this.score = Math.max(res.score, this.score);
      this.scoreAdd = res.addScoreInfo?.startScore || 0;
    },
    intervalSubmitScore() {
      this.submitScoreInterval = setInterval(async () => {
        const res = await submitScore(this.score);
        this.score = Math.max(res.score, this.score);
        this.scoreAdd = res.addScoreInfo?.startScore || 0;
      }, 1800);
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

.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .bg {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: top;
  }

  .score {
    position: absolute;
    top: 26.5vw;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    font-size: 40px;
    color: #fbdd75;
  }

  .dragon-head {
    position: absolute;
    top: 40vw;
    left: 50%;
    transform: translateX(-50%);
    width: 55.6vw;
    height: 41.86vw;
    object-fit: cover;
    object-position: top;
  }

  .arrow-ani {
    position: absolute;
    bottom: 53vw;
    left: 50%;
    transform: translateX(-50%);
    width: 28.1vw;
    height: 20vw;
    object-fit: contain;

    animation: arrowAni 0.65s linear infinite;

    @keyframes arrowAni {
      0% {
        bottom: 50vw;
        opacity: 0;
      }

      50% {
        bottom: 75vw;
        opacity: 0.8;
      }

      100% {
        bottom: 100vw;
        opacity: 0;
      }
    }
  }

  .bead-ani {
    position: absolute;
    bottom: 55vw;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 60vw;

    .bead {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 23.6vw;
      height: 23.6vw;
      object-fit: contain;
      object-position: top;

      animation: beadAni 0.3s linear forwards;

      @keyframes beadAni {
        0% {
          bottom: 0;
        }

        100% {
          bottom: 100%;
        }
      }
    }
  }

  .treasure-bowl {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 102.1vw;
    object-fit: cover;
    object-position: top;
  }

  .touch-area {
    position: absolute;
    bottom: 0;

    width: 100%;
    height: 140vw;
  }
}
</style>
