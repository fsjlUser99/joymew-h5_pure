<template>
  <!-- 赛龙舟(团队) -->
  <div class="dragonBoatTeam-wrap">
    <logoInfo />
    <div
      v-show="!myTeamId && gameStatus !== 3"
      class="chooseTeam publicVCenter"
    >
      <div class="chooseTip">
        请选择队伍
      </div>
      <div
        v-for="item in dragonBoatTeamList"
        :key="item.id"
        v-tap="{ methods: chooseTeam, teamInfo: item }"
        class="gameTeam"
      >
        <div class="teamAvator publicHvCenter">
          <img :src="item.teamLogo" />
        </div>
        <div class="teamTitle">
          {{ item.teamName }}
        </div>
      </div>
    </div>
    <div
      v-if="myTeamId"
      class="myGameTeam"
    >
      <div class="teamAvator publicHvCenter">
        <img :src="myTeamInfo.logo" />
      </div>
      <div class="teamTitle">
        {{ myTeamInfo.name }}
      </div>
    </div>
    <van-dialog
      v-model="dialogVisible"
      title="选择队伍"
      :message="messageChoosed"
      show-cancel-button
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
    <transition enter-active-class="slideInRight faster animated">
      <wait v-if="gameStatus === 1 || (!myTeamId && gameStatus !== 3)" />
      <shakeMain
        v-if="gameStatus === 2 && myTeamId"
        :team-id="myTeamId"
      />
      <rank
        v-if="gameStatus === 3 && !isTql"
        type="shake"
        :dragon-boat-team-list="dragonBoatTeamList"
      />
      <couponRank
        v-if="gameStatus === 3 && isTql"
        type="shake"
      />
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import { Dialog } from 'vant';
import logoInfo from '@/components/logoInfo/index.vue';
import wait from '@/views/dragonBoatTeamShake/wait.vue';
import shakeMain from '@/views/dragonBoatTeamShake/main.vue';
import rank from '@/views/dragonBoatTeamShake/rank.vue';
import couponRank from '@/components/gameRank/couponRank.vue';
import { getDragonBoatTeamInfo, chooseDragonBoatTeam } from '@/api/shake/index';

export default {
  name: 'DragonBoatTeamShakeIndex',
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
    }),
    ...mapGetters({
      isTql: 'user/isTql',
    }),
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
    wait,
    shakeMain,
    rank,
    logoInfo,
    couponRank,
  },
  data() {
    return {
      myTeamId: '', // 我的团队id
      myTeamInfo: {
        // 我的团队信息
        name: '',
        logo: '',
      },
      dialogVisible: false,
      messageChoosed: '',
      teamIdChoosed: '',
      dragonBoatTeamList: [], // 龙舟团队列表
    };
  },
  created() {
    getDragonBoatTeamInfo()
      .then((res) => {
        console.log('赛龙舟信息:', res);
        this.dragonBoatTeamList = res.list.map((item) => {
          return {
            id: item.dragon_id.toString(),
            teamLogo: item.icon,
            teamName: item.title,
          };
        });
        this.initMyteamInfo(res.teamId);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    chooseTeam(e) {
      console.log(e);
      this.teamIdChoosed = e.teamInfo.id;
      this.messageChoosed = `确认选择${e.teamInfo.teamName}吗?`;
      this.dialogVisible = true;
    },
    handleConfirm() {
      chooseDragonBoatTeam(this.teamIdChoosed)
        .then((res) => {
          console.log(res);
          this.$toast.center('加入成功!');
          this.initMyteamInfo(this.teamIdChoosed);
        })
        .catch((err) => {
          console.log(err);
          this.$toast.center('加入失败!');
          this.myTeamId = '';
        });
    },
    handleCancel() {
      this.$toast.center('取消成功!');
      this.myTeamId = '';
    },
    initMyteamInfo(pTeamId) {
      this.myTeamId = pTeamId || '';
      if (this.myTeamId) {
        for (let i = 0; i < this.dragonBoatTeamList.length; i += 1) {
          if (this.dragonBoatTeamList[i].id === this.myTeamId) {
            this.myTeamInfo.name = this.dragonBoatTeamList[i].teamName;
            this.myTeamInfo.logo = this.dragonBoatTeamList[i].teamLogo;
          }
        }
      }
    },
  },
  beforeCreated() {},
};
</script>
<style lang="less" scoped>
.dragonBoatTeam-wrap::v-deep {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .myGameTeam {
    width: 240px;
    height: 60px;
    position: absolute;
    left: 120px;
    top: 60px;
    z-index: 1;
    color: #000;
    .teamAvator {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      top: -12px;
      left: -78px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .teamTitle {
      font-size: 31px;
      position: absolute;
      font-weight: 600;
      left: 20px;
      width: 77%;
      height: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 60px;
      text-align: left;
    }
    // &.team1 {
    //   color: #17b6ab;
    // }
    // &.team2 {
    //   color: #fdba01;
    // }
    // &.team3 {
    //   color: #1b86a7;
    // }
    // &.team4 {
    //   color: #00a450;
    // }
    // &.team5 {
    //   color: #c71129;
    // }
  }
  .chooseTeam {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    flex-direction: column;
    padding-top: 120px;
    z-index: 1;
    .chooseTip {
      font-size: 32px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 120px;
    }
    .gameTeam {
      width: 50%;
      height: 103px;
      border: 4px solid #fff;
      border-radius: 65px;
      margin-bottom: 65px;
      position: relative;
      .teamAvator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        top: -14px;
        left: -59px;
        img {
          width: 110px;
          height: 110px;
          border-radius: 50%;
        }
      }
      .teamTitle {
        font-size: 31px;
        position: absolute;
        color: #fff;
        font-weight: 600;
        left: 60px;
        width: 77%;
        height: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 103px;
        text-align: center;
      }
      &:nth-child(2) {
        background: #17b6ab;
      }
      &:nth-child(3) {
        background: #fdba01;
      }
      &:nth-child(4) {
        background: #1b86a7;
      }
      &:nth-child(5) {
        background: #00a450;
      }
      &:nth-child(6) {
        background: #c71129;
      }
    }
  }
  .van-dialog {
    width: 520px;
    font-size: 32px;
    .van-dialog__header {
      line-height: 48px;
    }
    .van-dialog__message {
      line-height: 58px;
      font-size: 32px;
    }
    .van-dialog__cancel,
    .van-dialog__confirm {
      height: 78px;
      font-size: 32px;
    }
  }
}
</style>
