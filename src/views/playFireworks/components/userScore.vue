<template>
  <div class="top-score_wrap publicVCenter">
    <div class="rank-box publicHvCenter">
      <div class="rank publicVCenter">
        <img
          src="https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/bar-icon.png"
          alt=""
          class="rank-icon"
        />
        <div class="rank-val">第{{ myRank }}名</div>
      </div>
      <div class="avatar-wrap publicHvCenter">
        <img
          :src="headImg"
          alt=""
          class="avatar"
        />
        <img
          src="https://ustatic.hudongmiao.com/joymewH5/img/moneyTree/avatar-border.png"
          alt=""
          class="border-deco"
        />
      </div>
      <div class="score publicVCenter">
        <img
          src="https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/star-icon.png"
          alt=""
          class="score-icon"
        />
        <div class="score-val">{{ currentScore }}分</div>
      </div>
    </div>
    <div class="nickname">{{ nickname }}</div>
  </div>
</template>

<script>
export default {
  name: 'UserScore',
  props: {
    myRank: {
      type: [String, Number],
      default: 0,
    },
    currentScore: {
      type: [String, Number],
      default: 0,
    },
    nickname: {
      type: String,
      default: '',
    },
    headImg: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="less" scoped>
.top-score_wrap {
  position: absolute;
  width: 100%;
  height: 325px;
  top: 0;
  left: 0;
  background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/top-userinfo_bg.png);
  background-size: 100% 100%;
  flex-direction: column;

  .rank-box {
    width: 586px;
    height: 119px;
    background-image: url(https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/tu-box.png);
    background-size: 100% 100%;
    color: #fff;
    font-size: 30px;
    position: relative;
    margin-top: 32px;
    .rank {
      position: absolute;
      left: 82px;
      top: 40px;

      .rank-icon {
        width: 30px;
        height: 26px;
      }

      .rank-val {
        margin-left: 9px;
      }
    }

    .avatar-wrap {
      position: relative;
      width: 136px;
      height: 132px;

      .avatar {
        width: 101px;
        height: 98px;
        border-radius: 50%;
      }

      .border-deco {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .score {
      position: absolute;
      left: 386px;
      top: 39px;

      .score-icon {
        width: 30px;
      }

      .score-val {
        margin-left: 9px;
      }
    }
  }

  .nickname {
    font-size: 28px;
    color: #fff;
    width: 35%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    margin-top: 15px;
  }
}
</style>
