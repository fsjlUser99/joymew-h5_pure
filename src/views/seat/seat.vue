<template>
  <vue-scroll
    ref="vueScroll"
    :ops="options"
  >
    <div class="seat">
      <back />
      <div class="search">
        <input
          v-model="searchName"
          type="text"
          placeholder="输入您的姓名或手机号"
        />
        <img
          src="@/assets/image/dz/seat/search.png"
          class="searchIcon"
          @click="toSearch"
        />
      </div>
      <div class="result">
        <div
          v-if="!result"
          class="unSearch"
        >
          您可以直接搜索查看您的席位
        </div>
        <div
          v-if="result"
          class="searchResult"
        >
          您的位置在
          <span>{{ result }}</span>
        </div>
      </div>
      <div
        v-if="seatList.length > 0"
        class="seats sheet"
      >
        <div
          v-for="item in seatList"
          :key="item.id"
          class="item"
        >
          <div class="number">
            {{ item.seat_number }}
          </div>
          <div class="users">
            <div
              v-for="(itemInner, indexInner) in item.userListReal"
              :key="indexInner"
              class="userItem"
            >
              {{ itemInner }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="emptySeats"
      >
        <img
          src="@/assets/image/dz/seat/noSeatImage.png"
          class="noSeatImage"
        />
        <div class="emptyTip">
          暂无席位表......
        </div>
      </div>
    </div>
  </vue-scroll>
</template>

<script>
import { mapState } from 'vuex';
import back from '@/components/back/index.vue';

export default {
  components: {
    back,
  },
  data() {
    return {
      searchName: '',
      result: '',
      options: {
        bar: {
          opacity: 0.3,
        },
      },
    };
  },
  computed: {
    ...mapState({
      seatList: (state) => state.live.seatList,
    }),
  },
  methods: {
    toSearch() {
      this.updateResult();
      if (!this.searchName) {
        this.$toast.center('请输入您的名字或手机号');
        return;
      }
      this.seatList.forEach((item) => {
        const tmpLen = item.userList.length;
        for (let i = 0; i < tmpLen; i += 1) {
          if (item.userList[i].indexOf(this.searchName) > -1) {
            this.updateResult(item.seat_number);
            break;
          }
        }
      });

      if (!this.result) {
        this.$toast.center('很抱歉，没有搜索到您的名字');
      }
    },
    updateResult(result) {
      if (!result) {
        this.result = '';
      }
      if (this.result) {
        this.result = `${this.result},${result}`;
      } else {
        this.result = result;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.seat {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 30px 20px;
  .search {
    height: 7vw;
    position: relative;
    width: 75vw;
    top: -1vw;
    margin-left: 55%;
    transform: translateX(-50%);
    input {
      width: 100%;
      height: 8vw;
      background: rgba(237, 237, 237, 1);
      border-radius: 33px;
      border: none;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .searchIcon {
      position: absolute;
      width: 30px;
      height: 30px;
      padding: 2vw;
      right: 10px;
      top: 0px;
    }
  }
  .result {
    font-size: 26px;
    font-weight: normal;
    color: rgba(102, 102, 102, 1);
    line-height: 26px;
    margin: 36px auto 0 auto;
    text-align: center;
    .searchResult {
      span {
        font-size: 45px;
        color: #4e8cee;
        padding: 0 10px;
        line-height: 60px;
      }
    }
  }
  .seats {
    margin-top: 40px;
    padding-bottom: 20px;
    &.sheet {
      .item {
        overflow: hidden;
        color: #666666;
        font-size: 30px;
        &:not(:first-child) {
          margin-top: 48px;
        }
        .number {
          width: 25%;
          float: left;
          text-align: center;
          line-height: 50px;
          &::after {
            content: ' :';
          }
        }
        .users {
          width: 75%;
          float: left;
          .userItem {
            float: left;
            margin-left: 15px;
            line-height: 50px;
          }
        }
      }
    }
  }
  .emptySeats {
    margin-top: 40px;
    .noSeatImage {
      width: 100%;
    }
    .emptyTip {
      font-size: 26px;
      font-weight: normal;
      color: rgba(102, 102, 102, 1);
      margin-top: 40px;
      text-align: center;
    }
  }
}
</style>
