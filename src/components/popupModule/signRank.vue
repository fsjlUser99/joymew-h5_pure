<template>
  <transition
    enter-active-class="slideInUp faster animated"
    leave-active-class="slideOutDown faster animated"
  >
    <div v-show="isShowAni" class="signRankModule">
      <div class="signRankBox publicVCenter">
        <div class="nav-title publicHvCenter">
          签到用户
          <img
            v-tap="{ methods: closePopupModule }"
            src="@/assets/image/rank/signRankCloseIcon.png"
            class="closeIcon"
          />
        </div>
        <div class="tip-slogan publicVCenter">送出祝福礼物后排序更靠前哦～</div>
        <div class="rank-list-wrap">
          <div
            v-for="(item, index) in signRankList"
            :key="index"
            class="rank-item publicVCenter"
          >
            <div class="rank-num publicHCenter" :class="'rankindex' + index">
              {{ index + 1 }}
            </div>
            <img :src="item.avator" class="avatar" />
            <div class="nickname">
              {{ item.wx_name }}
            </div>
            <div v-if="item.money" class="mark publicHvCenter">已送祝福</div>
            <!-- 亲友 -->
            <div
              class="position publicHvCenter"
              :class="{
                man: item.position === '1',
                woman: item.position === '2',
              }"
            >
              {{ item.positionName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { timeoutTask } from '@/utils';

export default {
  name: 'SignRankPopup',
  beforeDestroy() {},
  created() {},
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  computed: {
    ...mapState({
      signRankList: (state) => state.live.signRankList,
    }),
  },
  data() {
    return {
      isShowAni: false,
    };
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
    }),
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    closePopupModule() {
      this.hideAniStart();
      timeoutTask(() => {
        this.togglePopup();
      }, 200);
    },
  },
};
</script>
<style lang="less" scoped>
.signRankModule {
  position: absolute;
  width: 100%;
  bottom: 0;
  .signRankBox {
    width: 750px;
    height: 974px;
    flex-direction: column;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    .nav-title {
      height: 96px;
      font-size: 34px;
      font-weight: 500;
      color: #161823;
      position: relative;
      width: 100%;
      .closeIcon {
        width: 56px;
        height: 56px;
        position: absolute;
        top: 24px;
        right: 24px;
      }
    }
    .tip-slogan {
      font-size: 24px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 60px;
      background: #fafafa;
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1) inset;
      padding: 0 32px;
    }
    .rank-list-wrap {
      height: 780px;
      overflow-y: scroll;
      .rank-item {
        width: 750px;
        margin-bottom: 30px;
        .rank-num {
          font-size: 32px;
          font-weight: 500;
          color: #b3b3b3;
          width: 94px;
          &.rankindex0 {
            color: #ea4240;
          }
          &.rankindex1 {
            color: #ed6e38;
          }
          &.rankindex2 {
            color: #e9b23c;
          }
        }
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        .nickname {
          margin-left: 20px;
          font-size: 30px;
          font-weight: 500;
          color: #333333;
          max-width: 300px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .mark {
          width: 100px;
          height: 30px;
          background: #fa97bb;
          border-radius: 62px;
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          margin-left: 16px;
        }
        .position {
          width: 100px;
          height: 32px;
          border-radius: 18px;
          font-size: 20px;
          font-weight: 400;
          color: #ffffff;
          margin-left: 16px;
          &.man {
            background: linear-gradient(266deg, #31a3fd 0%, #565ef5 100%);
          }
          &.woman {
            background: linear-gradient(266deg, #fd31f7 0%, #f55670 100%);
          }
        }
      }
    }
  }
}
</style>
