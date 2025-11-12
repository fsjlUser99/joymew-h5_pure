<template>
  <div class="vote-wrap">
    <logoInfo />
    <div class="voteHeader publicVCenter">
      <div class="title">{{ voteTitle }}</div>
      <div
        class="voteTip"
        :class="{ freeVote: voteType === '3' }"
        v-html="voteTip"
      />
    </div>
    <div
      class="voteContent"
      :class="{ limit: voteType !== '3' }"
    >
      <vue-scroll ref="vueScroll">
        <div
          class="voteItem publicVCenter"
          v-for="item in voteList"
          :key="item.id"
          v-tap="{ methods: chooseVoteItem, voteItem: item }"
        >
          <div class="leftInfo publicVCenter">
            <div
              class="avatarBox"
              v-show="item.headimg"
            >
              <img
                :src="item.headimg"
                class="avatar"
              />
            </div>
            <div class="description">{{ item.description }}</div>
          </div>
          <!-- 自由投票的按钮 -->
          <div
            class="voteButton publicHvCenter"
            :class="{ voted: remainVoteSize === '0' }"
            v-show="voteType === '3'"
            v-tap="{ methods: voteFree, voteItem: item }"
          />
          <!-- 选择框 -->
          <div
            class="radioBox publicHvCenter"
            v-show="voteType === '1'"
            :class="{ voted: item.hasVote }"
          />
          <!-- 多选的选择框 -->
          <div
            class="radioBox check publicHvCenter"
            v-show="voteType === '2'"
            :class="{ voted: item.hasVote }"
          />
        </div>
      </vue-scroll>
    </div>
    <div
      class="submitVote publicHvCenter"
      :class="{ voted: remainVoteSize === '0' }"
      v-show="voteType !== '3'"
      v-tap="{ methods: commitVote }"
    />
    <div
      class="popup publicHvCenter"
      v-if="finishPopupVisible"
      @click="finishPopupVisible = false"
    >
      <div class="successBox publicVCenter">
        <div class="para">恭喜您已完成投票</div>
        <div class="para para2">点击确认返回互动主页</div>
        <div
          class="confirmBtn publicHvCenter"
          v-tap="{ methods: backToHome }"
        >
          确认
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  initVote, submitVote, submitVoteRange, getActiveVoteFromLocal, saveActiveVoteToLocal,
} from '@/api/vote/vote';
import logoInfo from '@/components/logoInfo/index.vue';

export default {
  name: 'Vote',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
    }),
    voteTitle() {
      return this.voteList.length > 0 ? this.voteList[0].title : '';
    },
    voteTip() {
      let tmpTip = `您可以自由投票，剩余票数<span>${this.remainVoteSize}</span>`;
      if (this.voteType === '1') {
        tmpTip = '选择<span style="color: #53ffff;font-weight:600">1</span>个选项进行投票';
      } else if (this.voteType === '2') {
        tmpTip = `最少选<span style="color: #53ffff;font-weight:600">${this.minLimit}</span>个选项、最多选<span style="color: #53ffff;font-weight:600">${this.maxLimit}</span>个选项进行投票`;
      }
      return tmpTip;
    },
  },
  components: {
    logoInfo,
  },
  data() {
    return {
      voteList: [],
      voteType: '1', // 1：固定一项 2：多项 3：自由投票
      remainVoteSize: '0',
      minLimit: '0',
      maxLimit: '0',
      finishPopupVisible: false,
    };
  },
  created() {
    this.initVoteInfo();
  },
  /* eslint-disable */
  methods: {
    initVoteInfo() {
      initVote()
        .then((res) => {
          console.log(res);
          const { vote_list, vote_json_str, remain_vote, voteSize } = res;
          if (vote_json_str) {
            const voteJsonObj = JSON.parse(vote_json_str);
            const { type, max_limit, min_limit } = voteJsonObj;
            this.voteType = type;
            this.minLimit = min_limit;
            this.maxLimit = max_limit;
          }
          // 根据缓存回显已投数据
          if (this.voteType === '1') {
            const voteIdsStr = getActiveVoteFromLocal({
              voteType: this.voteType,
              remain_vote,
              voteSize,
            });
            if (voteIdsStr) {
              vote_list.forEach((voteItem) => {
                if (voteIdsStr.includes(voteItem.id)) {
                  voteItem.hasVote = true;
                }
              });
            }
            this.voteList = vote_list.map((item) => {
              return {
                ...item,
                description: item.description.replace('<br/>', ' '),
              };
            });

            // 设置投票状态(可投、不可投)
            this.remainVoteSize = voteIdsStr ? '0' : remain_vote;
          } else if (this.voteType === '3') {
            this.voteList = vote_list.map((item) => {
              return {
                ...item,
                description: item.description.replace('<br/>', ' '),
              };
            });
            // 自由投票的情况下不需要回显已投数据
            this.remainVoteSize = remain_vote;
          } else {
            submitVoteRange('')
              .then((res) => {
                console.log(res);
                // 之前提交过 投票状态设为不可投
                if (res.vote_val) {
                  this.remainVoteSize = '0';
                  // 根据缓存回显已投数据
                  const voteIdsStr = getActiveVoteFromLocal({
                    voteType: this.voteType,
                    remain_vote,
                    voteSize,
                  });
                  if (voteIdsStr) {
                    vote_list.forEach((voteItem) => {
                      if (voteIdsStr.includes(voteItem.id)) {
                        voteItem.hasVote = true;
                      }
                    });
                  }
                  this.voteList = vote_list.map((item) => {
                    return {
                      ...item,
                      description: item.description.replace('<br/>', ' '),
                    };
                  });
                } else {
                  // 之前没提交过
                  //  投票状态设为可投
                  this.remainVoteSize = remain_vote;
                  // 清空缓存
                  localStorage.removeItem('activeVote');
                  this.voteList = vote_list.map((item) => {
                    return {
                      ...item,
                      description: item.description.replace('<br/>', ' '),
                    };
                  });
                }
              })
              .catch((err) => {
                console.log(err);
                // 之前没提交过
                //  投票状态设为可投
                this.remainVoteSize = remain_vote;
                // 清空缓存
                localStorage.removeItem('activeVote');
                this.voteList = vote_list.map((item) => {
                  return {
                    ...item,
                    description: item.description.replace('<br/>', ' '),
                  };
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chooseVoteItem(voteItem) {
      if (this.voteType === '3') {
        return;
      }
      if (this.remainVoteSize === '0') {
        this.$toast.center('投票机会用光啦!');
        return;
      }
      const voteId = voteItem.voteItem.id;
      // 固定一项的情况
      if (this.voteType === '1') {
        const activeVoteIds = this.getActiveVoteIds();
        const targetIndex = this.voteList.findIndex((voteItem) => voteItem.id === voteId);
        if (activeVoteIds.length === 0) {
          // 数组都未选中
          this.voteList[targetIndex].hasVote = true;
        } else if (this.voteList[targetIndex].hasVote) {
          // 当前数组项已选中
          this.voteList[targetIndex].hasVote = false;
        } else if (!this.voteList[targetIndex].hasVote) {
          // 当前数组项未选中
          // 取消数组中已选中的项
          this.voteList.forEach((voteItem) => {
            voteItem.hasVote = false;
          });
          // 设置当前选中
          this.voteList[targetIndex].hasVote = true;
        }
        this.$forceUpdate();
      } else if (this.voteType === '2') {
        // 多选的情况
        const minLimit = parseInt(this.minLimit, 10);
        const maxLimit = parseInt(this.maxLimit, 10);
        const activeVoteIds = this.getActiveVoteIds();
        const targetIndex = this.voteList.findIndex((voteItem) => voteItem.id === voteId);
        if (!this.voteList[targetIndex].hasVote && activeVoteIds.length === maxLimit) {
          // 即将点击选中
          const toLen = activeVoteIds.length + 1;
          if (toLen < minLimit || toLen > maxLimit) {
            this.$toast.center(`请选择${minLimit}-${maxLimit}项`);
            return;
          }
        }
        this.voteList[targetIndex].hasVote = !this.voteList[targetIndex].hasVote;
        this.$forceUpdate();
      }
    },
    voteFree(voteItem) {
      if (this.remainVoteSize === '0') {
        this.$toast.center('投票机会用光啦!');
        return;
      }
      const voteId = voteItem.voteItem.id;
      const targetIndex = this.voteList.findIndex((voteItem) => voteItem.id === voteId);
      if (this.voteList[targetIndex].hasVote) {
        this.$toast.center('当前项已经投过啦!');
        return;
      }
      if (this.btnLock) {
        return;
      }
      this.btnLock = true;
      submitVote({
        voteId,
        voteSize: this.remainVoteSize,
      })
        .then((res) => {
          console.log(res);
          // 当前项设置为投过
          // this.voteList[targetIndex].hasVote = true;
          // 剩余投票次数
          this.remainVoteSize = res.remain_vote;
          this.btnLock = false;
          // 选中信息保存到本地缓存
          // const voteIds = this.getActiveVoteIds();
          // const voteIdsStr = voteIds.join(',');
          // saveActiveVoteToLocal(voteIdsStr);
          // 提示投票成功
          if (this.remainVoteSize === '0') {
            this.finishPopupVisible = true;
          } else {
            this.$toast.center('投票成功!');
          }
        })
        .catch((err) => {
          console.log(err);
          this.btnLock = false;
          this.$toast.center('投票失败!');
        });
    },
    commitVote() {
      if (this.remainVoteSize === '0') {
        this.$toast.center('投票机会用光啦!');
        return;
      }
      if (this.btnLock) {
        return;
      }
      if (this.voteType === '1') {
        // 固定一项的情况
        const activeVoteIds = this.getActiveVoteIds();
        if (activeVoteIds.length === 0) {
          this.$toast.center('请选择投票项!');
          return;
        }
        // 非预期情况
        if (activeVoteIds.length > 1) {
          this.$toast.center('只能选择一项!');
          return;
        }
        this.btnLock = true;
        submitVote({
          voteId: activeVoteIds[0],
          voteSize: this.remainVoteSize,
        })
          .then((res) => {
            console.log(res);
            // 剩余投票次数
            this.remainVoteSize = res.remain_vote;
            this.btnLock = false;
            // 选中信息保存到本地缓存
            const voteIds = this.getActiveVoteIds();
            const voteIdsStr = voteIds.join(',');
            saveActiveVoteToLocal(voteIdsStr);
            // 提示投票成功
            // this.$toast.center('投票成功!');
            this.finishPopupVisible = true;
          })
          .catch((err) => {
            console.log(err);
            this.btnLock = false;
            this.$toast.center('投票失败!');
          });
      } else if (this.voteType === '2') {
        // 范围情况
        const activeVoteIds = this.getActiveVoteIds();
        if (activeVoteIds.length === 0) {
          this.$toast.center('请选择投票项!');
          return;
        }
        const minLimit = parseInt(this.minLimit, 10);
        const maxLimit = parseInt(this.maxLimit, 10);
        // 非预期情况
        if (activeVoteIds.length < minLimit || activeVoteIds.length > maxLimit) {
          this.$toast.center('投票项数量不在范围内!');
          return;
        }
        this.btnLock = true;
        const voteIdsStr = activeVoteIds.join(',');
        submitVoteRange(voteIdsStr)
          .then((res) => {
            console.log(res);
            // 剩余投票次数
            this.remainVoteSize = '0';
            this.btnLock = false;
            // 选中信息保存到本地缓存
            const voteIds = this.getActiveVoteIds();
            const voteIdsStr = voteIds.join(',');
            saveActiveVoteToLocal(voteIdsStr);
            // 提示投票成功
            // this.$toast.center('投票成功!');
            this.finishPopupVisible = true;
          })
          .catch((err) => {
            console.log(err);
            this.btnLock = false;
            this.$toast.center('投票失败!');
          });
      }
    },
    getActiveVoteIds() {
      return this.voteList.filter((voteItem) => voteItem.hasVote).map((voteItem) => voteItem.id);
    },
    backToHome() {
      this.$router.replace({
        path: '/',
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
  background-image: url('https://static.hudongmiao.com/joymewH5/img/vote/voteBg.png');
  background-size: 100% 100%;
  overflow: hidden;

  .voteHeader {
    height: 294px;
    flex-direction: column;
    padding-top: 76px;
    color: #fff;
    padding-top: 70px;

    .title {
      font-size: 48px;
      font-weight: 900;
      text-align: center;
      padding: 0 20px;
    }

    .voteTip {
      margin-top: 30px;
      font-size: 32px;
      font-weight: 400;

      &.freeVote {
        font-size: 36px;
      }
    }
  }

  .voteContent {
    height: calc(100% - 374px);
    padding-bottom: 40px;
    color: #fff;

    .voteItem {
      justify-content: space-between;
      width: 686px;
      height: 120px;
      margin: 0 auto 24px auto;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 16px;
      padding: 0 28px 0 26px;

      .leftInfo {
        .avatarBox {
          width: 68px;
          height: 68px;
          position: relative;

          .avatar {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .description {
          margin-left: 20px;
          width: 340px;
          font-size: 28px;
          font-weight: 400;
        }
      }

      .voteButton {
        width: 132px;
        height: 70px;
        background: linear-gradient(118deg, #6ef7ff, #f0ffb5 100%);
        border-radius: 16px;
        font-size: 28px;
        font-weight: 500;
        color: #006265;
        position: relative;

        &::after {
          content: '投票';
          display: block;
          position: absolute;
        }

        &.voted {
          background: #e3e3e3;
          color: #7c7c7c;

          &::after {
            content: '投票';
          }
        }
      }

      .radioBox {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #c8c9cc;
        position: relative;

        &.check {
          border-radius: unset;
        }

        &::after {
          content: '';
          display: none;
          background: linear-gradient(118deg, #6ef7ff, #f0ffb5 100%);
          width: 40%;
          height: 40%;
          position: absolute;
          border-radius: 50%;
        }

        &.voted {
          &::after {
            display: block;
          }
        }
      }
    }

    &.limit {
      height: calc(100% - 294px);
    }
  }

  .submitVote {
    width: 380px;
    height: 80px;
    background: linear-gradient(118deg, #6ef7ff, #f0ffb5 100%);
    border-radius: 50px;
    color: #006265;
    font-size: 32px;
    font-weight: 500;
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 1;

    &::after {
      content: '投票';
      display: block;
      position: absolute;
    }

    &.voted {
      background: #e3e3e3;
      color: #7c7c7c;

      &::after {
        content: '已投票';
      }
    }
  }

  .popup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.6);
    .successBox {
      flex-direction: column;
      width: 520px;
      height: 608px;
      padding-top: 294px;
      z-index: 1;
      background-image: url('https://static.hudongmiao.com/joymewH5/img/vote/success.png');
      background-size: 100% 100%;
      margin-top: -150px;
      .para {
        font-size: 48px;
        font-weight: 500;
        color: #007c80;

        &.para2 {
          font-size: 32px;
          font-weight: 400;
          margin-top: 14px;
        }
      }

      .confirmBtn {
        margin-top: 68px;
        width: 216px;
        height: 80px;
        background: #458fff;
        border-radius: 138px;
        font-size: 32px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
}
</style>
