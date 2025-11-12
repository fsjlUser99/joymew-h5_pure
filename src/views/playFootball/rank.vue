<template>
  <div class="gameRank publicVCenter">
    <img
      src="@/assets/image/playFootball/rankTit.png"
      class="rankTit"
    />
    <div class="tableHeader publicHvCenter">
      <div class="headerItem">
        名次
      </div>
      <div class="headerItem">
        头像
      </div>
      <div class="headerItem">
        昵称
      </div>
      <div class="headerItem">
        得分
      </div>
    </div>
    <div class="tableBody publicVCenter">
      <div
        v-for="(item, index) in rankList"
        :key="index"
        class="rankItem publicVCenter"
      >
        <div
          v-if="index > 2"
          class="num"
        >
          {{ index + 1 }}
        </div>
        <img
          :src="item.avator"
          class="avatar"
        />
        <div class="nickname">
          {{ item.wx_name }}
        </div>
        <div class="score">
          {{ item.score }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRank } from '@/api/shake/index';

export default {
  name: 'GameRank',
  data() {
    return {
      rankList: [],
      defaultHeadImg: require('../../assets/image/defaultHeadImg.png'),
    };
  },
  props: {
    gameCode: {
      type: String,
      default: '',
    },
  },
  computed: {},
  beforeDestroy() {},
  created() {
    this.getRankList();
  },
  mounted() {},
  methods: {
    getRankList() {
      getRank(this.gameCode)
        .then((res) => {
          this.rankList = res.list.slice(0, 8);
          while (this.rankList.length < 8) {
            this.rankList.push({
              avator: this.defaultHeadImg,
              wx_name: '虚位以待',
              score: 0,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

  <style lang="less" scoped>
.gameRank {
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-top: 67px;
  .rankTit {
    width: 688px;
    height: 191px;
    margin-left: 50px;
  }
  .tableHeader {
    background-size: 100% 100%;
    background-image: url('../../assets/image/playFootball/header.png');
    width: 702px;
    height: 98px;
    margin-top: 30px;
    padding: 0 20px;
    .headerItem {
      font-size: 36px;
      font-weight: 500;
      color: #ffffff;
      &:nth-child(1) {
        flex: 1.5;
      }
      &:nth-child(2) {
        flex: 1.5;
      }
      &:nth-child(3) {
        flex: 4;
      }
      &:nth-child(4) {
        flex: 1.5;
      }
    }
  }
  .tableBody {
    background-size: 100% 100%;
    background-image: url('../../assets/image/playFootball/body.png');
    width: 702px;
    padding-bottom: 40px;
    margin-top: 14px;
    padding-top: 24px;
    flex-direction: column;
    .rankItem {
      width: 670px;
      height: 80px;
      background: #f9fff3;
      margin-bottom: 8px;
      position: relative;
      padding-left: 120px;
      &:nth-child(1) {
        &::after {
          content: '';
          display: block;
          width: 36px;
          height: 52px;
          background-size: 100% 100%;
          background-image: url('../../assets/image/playFootball/first.png');
          position: absolute;
          left: 30px;
        }
      }
      &:nth-child(2) {
        &::after {
          content: '';
          display: block;
          width: 48px;
          height: 39px;
          background-size: 100% 100%;
          background-image: url('../../assets/image/playFootball/second.png');
          position: absolute;
          left: 20px;
        }
      }
      &:nth-child(3) {
        &::after {
          content: '';
          display: block;
          width: 44px;
          height: 36px;
          background-size: 100% 100%;
          background-image: url('../../assets/image/playFootball/third.png');
          position: absolute;
          left: 20px;
        }
      }
      .num {
        font-size: 36px;
        color: #333333;
        font-weight: 400;
        position: absolute;
        left: 30px;
      }
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .nickname {
        margin-left: 60px;
        width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30px;
        font-weight: 500;
        color: #333333;
      }
      .score {
        font-size: 30px;
        font-weight: 500;
        color: #333333;
        margin-left: 20px;
      }
    }
  }
}
</style>
