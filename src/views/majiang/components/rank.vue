<template>
  <transition name="close">
    <div
      v-if="show"
      class="rank-model"
    >
      <img
        src="~@/assets/image/majiang/rank-title.png"
        class="rank-header"
      />
      <div class="rank-container">
        <div class="list-container">
          <div
            v-for="(rank, index) in showList"
            :key="rank.user_id"
            class="rank-item"
          >
            <!-- 第一名 -->
            <div
              v-if="index === 0"
              class="rank-num"
            >
              <img
                src="~@/assets/image/majiang/rank-1.png"
                class="num-icon"
              />
            </div>
            <!-- 第二名 -->
            <div
              v-else-if="index === 1"
              class="rank-num"
            >
              <img
                src="~@/assets/image/majiang/rank-2.png"
                class="num-icon"
              />
            </div>
            <!-- 第三名 -->
            <div
              v-else-if="index === 2"
              class="rank-num"
            >
              <img
                src="~@/assets/image/majiang/rank-3.png"
                class="num-icon"
              />
            </div>
            <!-- 其它 -->
            <div
              v-else
              class="rank-num"
            >
              {{ index + 1 }}
            </div>
            <!-- 用户头像 -->
            <img
              :src="rank.user_avator || DEFAULTAVATAR"
              class="user-avator"
            />
            <!-- 用户名 -->
            <div class="user-name">
              {{ rank.user_name || "虚位以待" }}
            </div>
            <!-- 所用时长 -->
            <div
              v-if="rank.time"
              class="use-time"
            >
              {{ timeHandler(Number(rank.time)) }}
            </div>
          </div>
        </div>
      </div>
      <!-- 关闭按钮 -->
      <img
        v-show="gameStatus === 2"
        src="~@/assets/image/majiang/close-icon.png"
        class="close-btn"
        @click="close"
      />
    </div>
  </transition>
</template>

<script>
import { DEFAULTAVATAR } from '@/assets/constant/index';
import { mapState } from 'vuex';
import { getRankList } from '../../../api/majiang/majiang';

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      DEFAULTAVATAR,
      showList: [], // 展示的数据，
    };
  },
  watch: {
    show: {
      handler(newVal) {
        if (newVal) {
          this.getData();
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      gameStatus: (state) => state.game.gameStatus,
    }),
  },
  methods: {
    /** 关闭排行榜 */
    close() {
      this.$emit('close');
    },
    /** 处理总排行的时间
     * @param {number} 单位毫秒（ms）
     */
    timeHandler(time) {
      let target = '';
      let remain = Number(time);
      const remainMin = Math.floor(remain / 1000 / 60);
      if (remainMin > 0) {
        remain -= remainMin * 1000 * 60;
      }
      const remainSec = Number(remain / 1000).toFixed(3);
      if (remainMin > 0) {
        target += `${remainMin}分`;
      }
      if (remainSec > 0) {
        target += `${remainSec}秒`;
      }
      return target;
    },
    /** 获取排行榜数据的方法 */
    async getData() {
      const res = await getRankList();
      if (res && res.length) {
        this.showList = res.map((item) => {
          const {
            // eslint-disable-next-line camelcase
            avator, countTime, userId, wx_name,
          } = item;
          return {
            time: countTime,
            user_id: userId,
            user_avator: avator,
            user_name: wx_name,
          };
        });
        // 排序
        this.showList.sort((a, b) => a.time - b.time);
      }
      while (this.showList.length < 10) {
        const len = this.showList.length;
        this.showList.push({
          user_id: String(len),
          user_avator: '',
          user_name: '',
          time: '',
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.rank-model {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  .rank-header {
    width: 508px;
    height: 176px;
    margin-top: 54px;
  }
  .rank-container {
    width: 686px;
    height: 1140px;
    padding: 40px 30px;
    // padding-right: 14px;
    box-sizing: border-box;
    background-image: url("~@/assets/image/majiang/rank-bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .list-container {
      width: 100%;
      height: 100%;
      // padding-right: 25px;
      overflow-y: scroll;
      .rank-item {
        width: 100%;
        height: 110px;
        margin-bottom: 8px;
        padding: 0 37px;
        background-color: #fff;
        border-radius: 16px;
        border: 2px solid #f8e5c2;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .rank-num {
          width: 45px;
          flex-shrink: 0;
          margin-right: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333333;
          font-size: 40px;
          .num-icon {
            height: 34px;
          }
        }
        .user-avator {
          width: 72px;
          height: 72px;
          flex-shrink: 0;
          margin-right: 16px;
          border-radius: 50%;
        }
        .user-name {
          width: 170px;
          flex-shrink: 0;
          margin-right: 20px;
          font-size: 38px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .use-time {
          flex: 1;
          color: #ff6145;
          font-weight: bold;
          text-align: right;
        }
      }
    }
  }
  .close-btn {
    width: 54px;
    height: 54px;
    position: absolute;
    top: 116px;
    right: 42px;
  }
}

.close-enter-active,
.close-leave-active {
  transition: all 0.3s ease-in-out;
}
.close-enter,
.close-leave-to {
  opacity: 0;
}
</style>
