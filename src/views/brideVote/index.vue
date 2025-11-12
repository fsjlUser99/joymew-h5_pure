<template>
  <vue-scroll class="content">
    <back />
    <div class="tipWrap">
      提示：伴郎伴娘可各投一票
    </div>
    <div class="BridesWrap">
      <div class="BrideSubWrap">
        <div class="titleWrap">
          <div class="title man" />
        </div>

        <div
          v-for="(item, index) in BrideManList"
          :key="item.player_id"
          class="BrideItem"
        >
          <img
            :src="item.img"
            mode=""
            class="bridesImg man"
          />
          <!-- <div class="shareWrap man" @click="toShare(item.player_id)">
            <div class="span">分享</div>
          </div> -->
          <div class="demoTip man">
            {{ item.name }}
          </div>

          <div class="dataInfo">
            <div class="count">
              得票 {{ item.vote_size }}
            </div>
            <div class="split" />
            <div class="rank">
              排名{{ index + 1 }}
            </div>
          </div>
          <div
            class="com-btn"
            :class="[{ man: BrideManCount > 0 }]"
            @click="voteForMan(index)"
          >
            给TA投票
          </div>
        </div>
      </div>
      <div class="BrideSubWrap">
        <div class="titleWrap">
          <div class="title maid" />
        </div>
        <div
          v-for="(item, index) in BrideMaidList"
          :key="item.player_id"
          class="BrideItem"
        >
          <img
            :src="item.img"
            mode=""
            class="bridesImg maid"
          />
          <div class="demoTip maid">
            {{ item.name }}
          </div>
          <div class="dataInfo">
            <div class="count">
              得票 {{ item.vote_size }}
            </div>
            <div class="split" />
            <div class="rank">
              排名{{ index + 1 }}
            </div>
          </div>
          <div
            class="com-btn"
            :class="[{ maid: BrideMaidCount > 0 }]"
            @click="voteForMaid(index)"
          >
            给TA投票
          </div>
        </div>
      </div>

      <van-popup
        v-model="show"
        round
        position="bottom"
        @close="close"
      >
        <div
          v-if="activeBrideUser"
          class="voteBox"
          :class="activeBrideUser.type == '1' ? 'man' : 'maid'"
        >
          <div class="infoWrap">
            <div class="avatar">
              <img
                :src="activeBrideUser.img"
                mode=""
                class="user"
              />
            </div>
            <div class="name">
              {{ activeBrideUser.name }}
            </div>
          </div>

          <div class="label label1">
            与新人是：
          </div>
          <div class="tag-wrap">
            <div class="tag">
              {{ activeBrideUser.pro }}
            </div>
          </div>
          <div class="label label2">
            今日工作：
          </div>
          <div class="tag-wrap">
            <div
              v-for="item in activeBrideUser.tag"
              :key="'tag' + item"
              class="tag"
            >
              {{ item }}
            </div>
          </div>
          <div class="label label3">
            个人介绍
          </div>
          <div class="textarea">
            请大家投我一票吧，求求了。。。
          </div>
          <div
            class="vote-btn"
            @click="voteIt(activeBrideUser.player_id)"
          >
            给TA投票
          </div>
        </div>
      </van-popup>
    </div>

    <div
      v-if="showResult"
      class="mask"
      @click="closeResult"
    >
      <div
        class="startModal"
        @click.stop="foo"
      >
        <img
          src="https://ustatic.hudongmiao.com/joymewApp/bride/voteIcon.png"
          alt=""
          srcset=""
          class="icon"
        />
        <div class="name">
          投票成功
        </div>
        <div
          class="btn"
          @click.stop="sure"
        >
          确定
        </div>
        <div
          class="more"
          @click.stop="exit"
        >
          退出
        </div>
      </div>
    </div>
  </vue-scroll>
</template>

<script>
import { mapState } from 'vuex';
import { initBrideVote, submitBrideVote } from '@/api/vote/brideVote';
import back from '@/components/back/index.vue';

export default {
  data() {
    return {
      showResult: false,
      BrideMaidList: [],
      BrideManList: [],
      activeManIndex: null,
      activeMaidIndex: 0,
      show: false,
      BrideManCount: 0,
      BrideMaidCount: 0,
    };
  },

  computed: {
    ...mapState({}),
    activeBrideUser() {
      const {
        BrideMaidList, BrideManList, activeManIndex, activeMaidIndex,
      } = this;
      if (activeManIndex !== null) {
        // const target = BrideManList[activeManIndex];
        return BrideManList[activeManIndex];
      }
      if (activeMaidIndex !== null) {
        return BrideMaidList[activeMaidIndex];
      }
      return null;
    },
  },
  components: {
    back,
  },
  created() {
    this.getBrideVoteList();
  },
  methods: {
    getBrideVoteList() {
      initBrideVote().then((res) => {
        console.log(res);
        const handleFunc = (item) => {
          const bride = JSON.parse(item.data_json || '{}');
          const pro = bride.realtionship;
          const tag = bride.work.split(',');
          return {
            ...item,
            ...bride,
            pro,
            tag,
          };
        };
        if (res.list.list1) {
          this.BrideManList = res.list.list1.map(handleFunc);
          // this.BrideManList = this.BrideManList.concat(this.BrideManList);
          // this.BrideManList = this.BrideManList.concat(this.BrideManList);
          // this.BrideManList = this.BrideManList.concat(this.BrideManList);
        }
        if (res.list.list2) {
          this.BrideMaidList = res.list.list2.map(handleFunc);
        }
        if (res.remain_vote1) {
          this.BrideManCount = Number(res.remain_vote1);
        }
        if (res.remain_vote2) {
          this.BrideMaidCount = Number(res.remain_vote2);
        }
      });
    },
    toShare(id) {
      console.log(id);
    },
    voteForMan(index) {
      console.log('伴郎', index);
      this.activeManIndex = index;
      this.activeMaidIndex = null;
      this.show = true;
    },
    voteForMaid(index) {
      console.log('伴娘', index);
      this.activeManIndex = null;
      this.activeMaidIndex = index;
      this.show = true;
    },
    close() {
      this.activeManIndex = null;
      this.activeMaidIndex = null;
    },
    voteIt() {
      const { activeBrideUser, BrideManCount, BrideMaidCount } = this;
      if (activeBrideUser === null) {
        this.$toast.center('错误!');
        return;
      }
      const { type } = activeBrideUser;
      const playerId = activeBrideUser.player_id;
      if (type === '1' && BrideManCount <= 0) {
        this.$toast.center('票数不足!');

        return;
      }
      if (type === '2' && BrideMaidCount <= 0) {
        this.$toast.center('票数不足!');

        return;
      }
      submitBrideVote({
        playerId: String(playerId),
        type: String(type),
      })
        .then((res) => {
          console.log(res);
          // this.$toast.center('投票成功!');
          this.getBrideVoteList();
          this.close();
          this.show = false;
          this.showResult = true;
        })
        .catch((err) => {
          console.log(err);

          this.$toast.center('投票失败!');
        });
      // console.log(player_id, type);
    },
    closeResult() {
      this.showResult = false;
    },
    foo() {},
    sure() {
      this.showResult = false;
    },
    exit() {
      this.showResult = false;
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
view {
  box-sizing: border-box;
}

.content {
  width: 100vw;
  background-color: #f9f7f7;
  min-height: 100vh;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-image: url(https://ustatic.hudongmiao.com/joymewApp/hd/brides/bg.png);
  .tipWrap {
    margin-top: 32px;
    font-size: 28px;
    color: #fff;
    text-align: center;
    width: 100%;
  }
  .BridesWrap {
    width: 750px;
    box-sizing: border-box;
    padding: 32px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .BrideSubWrap {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;

      .titleWrap {
        width: 334px;
        display: flex;
        justify-content: center;
        align-items: center;

        .title {
          width: 240px;
          height: 90px;
          background-size: 100% 100%;
          &.man {
            background-image: url(https://ustatic.hudongmiao.com/joymewApp/hd/brides/bridesman.png);
          }
          &.maid {
            background-image: url(https://ustatic.hudongmiao.com/joymewApp/hd/brides/bridesmaid.png);
          }
        }
      }

      .BrideItem {
        width: 334px;
        height: 552px;
        background: #ffffff;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        margin-top: 20px;
        .bridesImg {
          // background-color: #000000;
          width: 334px;
          height: 334px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;

          &.man {
            // border-bottom: 1px solid rgb(67, 128, 427, 0.1);
          }
          &.maid {
            // border-bottom: 1px solid rgb(235, 86, 123, 0.1);
          }
        }

        .shareWrap {
          width: 144px;
          height: 144px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          position: absolute;
          font-size: 20px;
          .span {
            width: 60px;
            text-align: center;
            position: absolute;

            color: #fff;
            transform: scale(0.7, 0.7);
          }
          &.man {
            top: -72px;
            right: -72px;
            .span {
              bottom: 24px;
              left: 12px;
            }
          }
          &.maid {
            top: -72px;
            left: -72px;

            .span {
              bottom: 24px;

              right: 18px;
            }
          }
        }

        .demoTip {
          width: 128px;
          height: 60px;
          font-size: 32px;

          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
          position: absolute;
          top: 304px;

          &.man {
            border-bottom-right-radius: 60px;
            border-top-right-radius: 60px;
            background: #4380f7;
            border-bottom: 1px solid rgb(67, 128, 427, 1.3);

            left: 0;
          }
          &.maid {
            right: 0;
            border-bottom-left-radius: 60px;
            border-top-left-radius: 60px;
            background: #eb567b;
            border-bottom: 1px solid rgb(235, 86, 123, 1.3);
          }
        }

        .dataInfo {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
          color: #333333;
          margin: 32px 0;

          .split {
            margin: 0 10px;
            width: 2px;
            height: 22px;
            background: rgba(0, 0, 0, 0.15);
            border-radius: 38px;
          }
        }

        .com-btn {
          margin: 0 auto;
          width: 286px;
          height: 76px;
          background: #e2e2e2;
          border-radius: 82px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 32px;
          color: #ffffff;
          &.man {
            background: #4380f7;
          }
          &.maid {
            background: #eb567b;
          }
        }
      }
    }
  }
}
::v-deep .van-popup {
  overflow-y: visible;
}
.voteBox {
  width: 750px;
  min-height: 946px;
  padding-bottom: 120px;
  // background: #ffffff;
  position: relative;

  &.man {
    @manColor: #4380f7;
    .infoWrap {
      .avatar {
        background: @manColor;
      }
      .name {
        color: @manColor;
      }
    }
    .tag-wrap {
      .tag {
        border: 2px solid @manColor;
        color: @manColor;
      }
    }
    .textarea {
      border: 2px solid @manColor;
    }
    .vote-btn {
      background: @manColor;
    }
  }
  &.maid {
    // --baseColor: #eb567b;
    @manColor: #eb567b;
    .infoWrap {
      .avatar {
        background: @manColor;
      }
      .name {
        color: @manColor;
      }
    }
    .tag-wrap {
      .tag {
        border: 2px solid @manColor;
        color: @manColor;
      }
    }
    .textarea {
      border: 2px solid @manColor;
    }
    .vote-btn {
      background: @manColor;
    }
  }
  .infoWrap {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -68px);
    .avatar {
      width: 136px;
      height: 136px;
      background: #eb567b;
      border-radius: 136px;
      display: flex;
      justify-content: center;
      align-items: center;
      .user {
        width: 124px;
        height: 124px;
        border-radius: 124px;
      }
    }
    .name {
      text-align: center;
      color: #eb567b;
      font-size: 28px;
      font-weight: 500;
      margin-top: 16px;
    }
  }
  padding: 0 32px;

  .label {
    color: #333333;
    font-size: 28px;
    &.label1 {
      padding-top: 156px;
    }
    &.label2 {
      margin-top: 32px;
    }
    &.label3 {
      margin-top: 32px;
    }
  }
  .tag-wrap {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    .tag {
      margin-right: 10px;
      padding: 8px 40px;
      margin-top: 16px;

      border: 2px solid #eb567b;
      border-radius: 50px;
      color: #eb567b;
      font-size: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .textarea {
    width: 688px;
    height: 196px;
    border: 2px solid #eb567b;
    padding: 16px 32px;
    color: #333333;
    font-size: 28px;
    margin-top: 32px;
  }
  .vote-btn {
    width: 286px;
    height: 84px;
    margin: 0 auto;
    margin-top: 48px;

    background: #eb567b;
    border-radius: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 32px;
    font-weight: 500;
  }
  // overflow: hidden;
  // border-top-left-radius: 20px;
  // border-top-right-radius: 20px;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  .startModal {
    width: 506px;
    height: 634px;
    background: #ffffff;
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 48px;
    box-sizing: border-box;
    .icon {
      display: block;
      margin: 0 auto;
      width: 196px;
      height: 196px;
    }
    .name {
      color: #4380f7;
      margin-top: 34px;
      text-align: center;
      font-size: 40px;
    }
    .btn {
      width: 390px;
      height: 96px;
      background: #4380f7;
      border-radius: 50px;
      color: #ffffff;
      font-size: 32px;
      margin: 0 auto;
      margin-top: 80px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    .more {
      margin: 0 auto;
      text-align: center;
      margin-top: 32px;
      color: rgba(0, 0, 0, 0.4);
      font-size: 32px;
    }
  }
}
</style>
