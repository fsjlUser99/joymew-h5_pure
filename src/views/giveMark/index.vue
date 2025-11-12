<template>
  <div class="giveMark-index">
    <logoInfo />
    <giveMark
      v-if="markStep === 0"
      :current-player="currentPlayer"
      :remain-piao="remainPiao"
      @resultEmit="handleResult"
    />
    <scoreResult
      v-if="markStep === 1"
      :mark="mark"
      :current-player="currentPlayer"
    />
  </div>
</template>
<script>
import { getCurrentMarkUserInfo, sendMark } from '@/api/giveMark/giveMark';
import { mapState, mapMutations } from 'vuex';
import logoInfo from '@/components/logoInfo/index.vue';
import giveMark from './giveMark.vue';
import scoreResult from './scoreResult.vue';

export default {
  name: 'GiveMarkIndex',
  computed: {
    ...mapState({
      canGetMarkUserInfo: (state) => state.game.canGetMarkUserInfo,
    }),
  },
  watch: {
    canGetMarkUserInfo(newVal) {
      if (newVal) {
        this.getCurrentPlayerInfo();
      }
    },
  },
  components: { giveMark, scoreResult, logoInfo },
  data() {
    return {
      orderBy: '',
      markStep: 0,
      mark: 0,
      remainPiao: 0,
      currentPlayer: {
        id: '',
        num: '',
        name: '',
        avator: '',
      },
    };
  },
  created() {
    this.getCurrentPlayerInfo();
  },
  methods: {
    ...mapMutations({
      setCanMarkUserInfo: 'game/setCanMarkUserInfo',
    }),
    getCurrentPlayerInfo() {
      getCurrentMarkUserInfo()
        .then((res) => {
          console.log(res);
          this.orderBy = res.order_by;
          this.currentPlayer.id = res.playerInfo.player_id;
          this.currentPlayer.num = res.playerInfo.number_info;
          this.currentPlayer.name = res.playerInfo.player_name;
          this.currentPlayer.avator = res.playerInfo.img_url;
          this.remainPiao = res.remain_piao;
          this.setCanMarkUserInfo(false);
          if (res.markInfo !== 'false') {
            this.mark = parseFloat(res.markInfo);
            this.markStep = 1;
          } else {
            this.markStep = 0;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleResult(mark) {
      sendMark({
        markUserId: this.currentPlayer.id,
        score: mark,
        orderBy: this.orderBy,
      })
        .then((res) => {
          console.log(res);
          if (res.msg === '评分成功') {
            this.mark = parseFloat(mark);
            this.markStep = 1;
          } else if (res.msg === '不能重复评分') {
            this.markStep = 1;
          }
          this.$toast.center(res.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.giveMark-index {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
