<template>
  <!-- 赛龙舟(团队)排行榜 -->
  <div class="prizeSheet publicHCenter">
    <img
      src="@/assets/image/dragonBoatTeamShake/boatAni.gif"
      class="boatAni"
    />
    <div class="shade" />
    <div class="gameRank publicVCenter">
      <div
        v-if="teamList1[0]"
        class="topFirst"
      >
        <div class="topName">
          {{ teamList1[0].teamName }}
        </div>
        <div class="topInfo publicVCenter">
          <div class="tAvator publicHvCenter">
            <img :src="teamList[0].teamLogo" />
          </div>
          <div class="tName">
            {{ teamList1[0].teamName }}
          </div>
        </div>
      </div>
      <div
        v-if="teamList2.length > 0"
        class="topOther"
      >
        <div
          v-for="(item, index) in teamList2"
          :key="item.id"
          class="topOtherInfo publicVCenter"
        >
          <div class="topOtherAvator publicHvCenter">
            <img :src="item.teamLogo" />
          </div>
          <div class="topOtherNum publicHvCenter">
            0{{ index + 2 }}
          </div>
          <div class="topOtherName">
            {{ item.teamName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDragonBoatTeamRank } from '@/api/shake/index';
import { generateRandomId } from '@/utils/index';

export default {
  name: 'DragonBoatTeamShakeRank',
  props: {
    dragonBoatTeamList: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      teamList1: [], // 第一名
      teamList2: [], // 其他名次
      teamList: [],
    };
  },
  computed: {},
  beforeDestroy() {},
  mounted() {
    getDragonBoatTeamRank()
      .then((res) => {
        console.log(res);
        this.handleTeamList(res.teamList);
        this.initRankList();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleTeamList(pTeamList) {
      const tmpTeamLen = pTeamList.length;
      for (let i = 0; i < tmpTeamLen; i += 1) {
        if (pTeamList[i].info) {
          this.teamList.push({
            id: pTeamList[i].id,
            teamLogo: pTeamList[i].info.icon,
            teamName: pTeamList[i].info.title,
          });
        }
      }
      // 补齐
      if (this.teamList.length < 5) {
        for (let i = this.teamList.length; i < 5; i += 1) {
          this.teamList.push({
            id: generateRandomId(),
            teamLogo: require('../../assets/image/dragonBoatTeamShake/avator.png'),
            teamName: '虚位以待',
          });
        }
      }
    },
    initRankList() {
      if (this.teamList.length <= 1) {
        this.teamList1 = this.teamList[0] || [];
      } else {
        this.teamList1 = this.teamList.slice(0, 1);
        this.teamList2 = this.teamList.slice(1, this.teamList.length);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.prizeSheet {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/image/dragonBoatTeamShake/gameBg.png);
  background-size: cover;
  .boatAni {
    position: absolute;
    width: 250px;
    height: 140px;
    bottom: 350px;
    left: 50%;
    transform: translateX(-50%);
  }
  .shade {
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .gameRank {
    position: relative;
    flex-direction: column;
    .topFirst {
      width: 736px;
      height: 620px;
      background-image: url(~@/assets/image/dragonBoatTeamShake/firstCe.png);
      background-size: 100% 100%;
      .topName {
        color: #fff;
        font-size: 48px;
        font-weight: 600;
        text-align: center;
        padding-top: 150px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .topInfo {
        flex-direction: column;
        padding-top: 217px;
        .tAvator {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #edc14b;
          img {
            width: 75px;
            height: 75px;
            border-radius: 50%;
          }
        }
        .tName {
          color: #fff;
          font-size: 24px;
          font-weight: 400;
          margin-top: 7px;
        }
      }
    }
    .topOther {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      .topOtherInfo {
        width: 120px;
        margin: 0 40px;
        flex-direction: column;
        .topOtherAvator {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #edc14b;
          img {
            width: 75px;
            height: 75px;
            border-radius: 50%;
          }
        }
        .topOtherNum {
          width: 108px;
          height: 34px;
          background-image: url(~@/assets/image/dragonBoatTeamShake/nameRibbon.png);
          background-size: 100% 100%;
          color: #fff;
          padding-bottom: 7px;
          font-size: 22px;
          margin-top: -13px;
        }
        .topOtherName {
          color: #fef791;
          font-size: 24px;
          margin-top: 5px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
      }
    }
  }
}
</style>
