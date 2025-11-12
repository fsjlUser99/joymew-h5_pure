<template>
  <div class="playFootball-wrap publicVCenter">
    <img
      src="@/assets/image/playFootball/men.png"
      class="men"
      :class="{ ani: menAni }"
    />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1" />
      <gameMain
        v-if="gameStatus === 2"
        @menMove="handleMenmove"
      />
      <gameRank
        v-if="gameStatus === 3 && mpType !== 'haimao'"
        :gameCode="gameCode"
      />
    </transition>
    <!-- 当满足小程序跳转条件但用户返回时，显示返回按钮 -->
    <backToRank :gameCode="gameCode" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { timeoutTask } from '@/utils/index';
import bgm from '@/assets/constant/audio';
import createjs from 'createjs-cmd';
import backToRank from '@/components/gameRank/backToRank.vue';
import wxApi from '@/utils/wxApi';
import wait from './wait.vue';
import gameMain from './main.vue';
import gameRank from './rank.vue';

const GAME_CODE = 'hmPlay20';

export default {
  name: 'PlayFootballIndex',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
      mpType: (state) => state.app.mpType,
      userId: (state) => state.user.userId,
    }),
  },
  components: {
    wait,
    gameMain,
    gameRank,
    backToRank,
  },
  watch: {
    gameStatus(newVal) {
      // 当游戏状态变为3（结束）时，进行判断
      if (newVal === 3 && this.mpType === 'haimao') {
        wxApi.navigateTo(`/packageGame/pages/commonRank/commonRank?userId=${this.userId}&gameCode=${this.gameCode}`);
      }
    },
  },
  data() {
    return {
      menAni: '',
      gameCode: GAME_CODE,
    };
  },
  created() {
    this.loadAudioFile();
  },
  methods: {
    // 加载音频文件
    loadAudioFile() {
      const loader = new createjs.LoadQueue(true);
      loader.installPlugin(createjs.Sound);
      loader.loadFile({ id: 'footballHit', src: bgm.footballHit });
      loader.on('complete', () => {
        console.log('音频加载成功');
      });
    },
    handleMenmove() {
      if (this.menAni) {
        return;
      }
      this.menAni = '1';
      timeoutTask(() => {
        this.menAni = '';
      }, 300);
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.playFootball-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: url('https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/playFootball/europChapBg.png');
  flex-direction: column;
  .men {
    width: 443px;
    height: 213px;
    position: absolute;
    bottom: 37vh;
    &.ani {
      animation-name: menAni;
      animation-duration: 0.3s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
}
@keyframes menAni {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  6.5% {
    -webkit-transform: translateX(-6px) rotateY(-9deg);
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    -webkit-transform: translateX(5px) rotateY(7deg);
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    -webkit-transform: translateX(-3px) rotateY(-5deg);
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    -webkit-transform: translateX(2px) rotateY(3deg);
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
</style>
