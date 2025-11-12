<template>
  <!-- 摇一摇游戏排行榜 -->
  <div class="gameRank">
    <HbRank :topThree="topThree" :commonList="commonList"  :myRank="myRank" :myOwnInfo="myOwnInfo" v-if="isRedPacketMode"/>
    <CommonRank :topThree="topThree" :commonList="commonList"  :myRank="myRank" :myOwnInfo="myOwnInfo" v-else/>
  </div>
</template>

<script>
import { getRank } from '@/api/shake/index';
import CommonRank from './components/CommonRank.vue';
import HbRank from './components/HbRank.vue';

const defaultObj = {
  avator: require('@/assets/image/defaultHeadImg.png'),
  wx_name: '虚位以待',
  score: 0,
  prize: 0,
};
const gameCode = 'hmPlay33';

export default {
  name: 'GameRank',
  components: {
    CommonRank,
    HbRank,
  },
  data() {
    return {
      topThree: [],
      commonList: [],
      myRank: 0,
      isRedPacketMode: false,
      myOwnInfo: {
        avator: defaultObj.avator,
        nickname: this.$store.state.user.name || '我',
        score: 0,
        prize: 0,
      },
    };
  },
  computed: {
    nickname() {
      return this.$store.state.user.name;
    },
  },
  created() {
    this.getShakeRank();
  },
  methods: {
    getPrizeForRank(rank, prizeSettings) {
      if (!prizeSettings || rank === 0) {
        return 0;
      }
      return prizeSettings[`rank${rank}`] !== undefined ? parseFloat(prizeSettings[`rank${rank}`]) : 0;
    },

    // Get shake rank list
    getShakeRank() {
      getRank(gameCode, 1)
        .then((res) => {
          let prizeSettings = null;
          if (res.money_tree_json) {
            try {
              prizeSettings = JSON.parse(res.money_tree_json);
              this.isRedPacketMode = true;
            } catch (e) {
              console.error('Error parsing money_tree_json in GameRank:', e);
              this.isRedPacketMode = false;
            }
          }

          const processList = (list, startIndex) => {
            return list.map((item, index) => {
              const rank = startIndex + index;
              const prize = this.getPrizeForRank(rank, prizeSettings);
              return {
                ...item,
                score: parseInt(item.score, 10),
                prize,
              };
            });
          };

          this.topThree = processList(res.list.slice(0, 3), 1);
          while (this.topThree.length < 3) this.topThree.push({ ...defaultObj });

          this.commonList = processList(res.list.slice(3, 10), 4);
          while (this.commonList.length < 7) this.commonList.push({ ...defaultObj });
          this.myRank = res.myRank;
          this.myOwnInfo = {
            avator: res.myAvator || this.$store.state.user.avator || defaultObj.avator,
            nickname: res.myWxName || this.$store.state.user.name || '我',
            score: parseInt(res.myScore, 10) || 0,
            prize: this.getPrizeForRank(this.myRank, prizeSettings),
          };
          // 红包模式但未上榜的情况
          if (this.isRedPacketMode && (this.myRank === 0 || !this.myRank)) {
            this.myOwnInfo.prize = 0;
          }
        })
        .catch((err) => {
          console.error('getRank failed:', err);
          this.topThree = Array(3).fill().map(() => ({ ...defaultObj }));
          this.commonList = Array(7).fill().map(() => ({ ...defaultObj }));
          this.isRedPacketMode = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>

.gameRank {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/rank-bg.png');
  background-size: 100% 100%;
  overflow-y: auto;
  &::before {
    content: "";
    position: absolute;
    width: 572px;
    height: 282px;
    background: url('https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/bg-deco_light.png');
    background-size: 100% 100%;
    top: 0;
    left: 50%;
    display: block;
    transform: translateX(-50%);
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 50px;
    position: absolute;
    top: 1570px;
  }
}
</style>
