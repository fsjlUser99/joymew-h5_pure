<template>
  <div class="vote-wrap">
    <logoInfo />
    <div class="title publicHvCenter">
      {{ voteTitle }}
    </div>
    <div class="remainVote publicHvCenter">
      剩余票数：
      <label>{{ remainVote }}</label>票
    </div>
    <div class="voteItemWrap publicVCenter">
      <div class="scrollWrap">
        <div
          v-for="(item, index) in voteList"
          :key="index"
          class="voteItem publicVCenter"
        >
          <div class="voteContent">
            {{ item.description }}
          </div>
          <div
            v-tap="{ methods: vote, content: item }"
            class="voteBtn publicHvCenter"
          >
            投票
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { initVote, submitVote } from '@/api/vote/vote';
import logoInfo from '@/components/logoInfo/index.vue';

let btnLock = false;

export default {
  name: 'Vote',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
    }),
  },
  components: {
    logoInfo,
  },
  data() {
    return {
      voteSize: 0,
      remainVote: 0,
      voteTitle: '',
      voteList: [],
    };
  },
  created() {
    btnLock = false;
    this.initVoteInfo();
  },
  methods: {
    initVoteInfo() {
      initVote()
        .then((res) => {
          console.log(res);
          this.voteSize = parseInt(res.voteSize, 10) || 1;
          this.remainVote = parseInt(res.remain_vote, 10) || 0;
          this.voteTitle = (res.vote_list[0] && res.vote_list[0].title) || '';
          if (res.vote_list && res.vote_list.length > 0) {
            this.voteList = res.vote_list;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    vote(item) {
      if (this.remainVote === 0) {
        this.$toast.center('可用投票数为0!');
        return;
      }
      if (btnLock) {
        return;
      }
      btnLock = true;
      submitVote({
        voteId: item.content.id,
        voteSize: this.voteSize,
      })
        .then((res) => {
          console.log(res);
          this.remainVote = res.remain_vote;
          btnLock = false;
        })
        .catch((err) => {
          console.log(err);
          btnLock = false;
          this.$toast.center('投票失败!');
        });
    },
  },
};
</script>
<style lang="less" scoped>
.vote-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(5, 39, 135, 1);
  overflow-y: scroll;
  .title {
    width: 100%;
    height: 120px;
    font-size: 36px;
    font-weight: bold;
    color: #ffffff;
  }
  .remainVote {
    width: 100%;
    height: 40px;
    font-size: 32px;
    font-weight: 400;
    color: #fff;
    label {
      font-weight: bold;
      margin-right: 4px;
    }
  }
  .voteItemWrap {
    background-color: rgba(5, 39, 135, 1);
    padding-top: 28px;
    padding-bottom: 140px;
    flex-direction: column;
    .voteItem {
      width: 690px;
      height: 108px;
      background: #4169e1;
      border-radius: 2px;
      margin-top: 20px;
      box-sizing: border-box;
      justify-content: space-between;
      padding: 0 40px;
      .voteContent {
        font-size: 30px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      .voteBtn {
        width: 150px;
        height: 64px;
        background: #ff4500;
        border-radius: 42px;
        font-size: 30px;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
</style>
