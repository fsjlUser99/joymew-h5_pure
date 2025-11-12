<template>
  <transition
    enter-active-class="animated faster fadeIn"
    leave-active-class="animated faster fadeOut"
  >
    <div
      v-show="isShowAni"
      class="diamondHbLuckyModule publicHvCenter"
    >
      <div class="diamondHbLuckyBox publicHCenter">
        <div class="title">
          查看大家手气
        </div>
        <div class="luckyList">
          <vue-scroll :ops="scrollOption">
            <div
              v-for="(item, index) in diamondHbLuckyList"
              :key="index"
              class="luckyItem publicVCenter"
            >
              <div class="nickname">
                {{ item.nickname }}
              </div>
              <div class="lucky publicVCenter">
                <div class="diamondNum">
                  {{ item.diamondNum }}
                </div>
                <img
                  src="@/assets/image/hd2/diamondIcon.png"
                  class="goldUnit"
                />
              </div>
            </div>
          </vue-scroll>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex';
import { getDiamondHbRankById } from '@/api/diamondHb/index';

export default {
  name: 'DiamondHbLuckyPopup',
  created() {
    getDiamondHbRankById(this.diamondHbCdp.id).then((res) => {
      this.diamondHbLuckyList = res.list.map((item) => {
        return {
          nickname: item.wx_name,
          diamondNum: item.money,
        };
      });
    });
  },
  computed: {
    ...mapState({
      diamondHbCdp: (state) => state.live.diamondHbCdp,
    }),
  },
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  data() {
    return {
      isShowAni: false, // 控制bapin box弹出动画
      scrollOption: {},
      diamondHbLuckyList: [],
    };
  },
  methods: {
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
  },
};
</script>
<style lang="less" scoped>
.diamondHbLuckyModule {
  position: absolute;
  width: 100%;
  top: 0;
  .diamondHbLuckyBox {
    width: 498px;
    height: 747px;
    background: rgba(255, 249, 229, 1);
    border-radius: 20px;
    position: absolute;
    top: 141px;
    .title {
      font-size: 30px;
      font-weight: 400;
      color: #c87a3a;
      position: absolute;
      display: flex;
      align-items: center;
      top: 49px;

      &::before {
        display: block;
        content: '';
        width: 74px;
        height: 1px;
        background: #c87a3a;
        position: absolute;
        left: -89px;
      }

      &::after {
        display: block;
        content: '';
        width: 74px;
        height: 1px;
        background: #c87a3a;
        position: absolute;
        right: -89px;
      }
    }
    .luckyList {
      width: 391px;
      height: 590px;
      position: absolute;
      top: 108px;
      .luckyItem {
        width: 100%;
        justify-content: space-between;
        margin-bottom: 34px;
        .nickname {
          font-size: 30px;
          font-weight: 400;
          color: #c87a3a;
        }
        .lucky {
          .goldUnit {
            width: 32px;
            height: 26px;
            margin-left: 7px;
            margin-top: 8px;
          }
          .diamondNum {
            font-size: 30px;
            font-weight: 400;
            color: #c87a3a;
          }
        }
      }
    }
  }
}
</style>
