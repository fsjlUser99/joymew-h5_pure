<template>
  <div
    class="dialog-container"
    @click.prevent.stop
  >
    <div class="chou-container">
      <div class="chou-bg">
        <img
          class="lights"
          src="~@/assets//image/hlt/choujiang/light-icon.png"
          alt=""
        />
        <img
          class="lights lights2"
          src="~@/assets//image/hlt/choujiang/light2-icon.png"
          alt=""
        />
        <div
          class="chou-content"
          :style="{ transform: `rotate(${rDeg}deg)` }"
          :class="{ ani: isChou }"
        >
          <div
            v-for="(item, index) in awardList"
            :key="index"
            class="award-item"
            :style="{ transform: `rotate(${item.deg}deg)`, transformOrigin: 'bottom right' }"
          >
            <div
              v-if="item.award_level === '感谢参与'"
              class="none-award"
            >
              <div class="thanks">
                {{ item.award_level }}
              </div>
              <img
                src="~@/assets/image/hlt/choujiang/smile-icon.png"
                class="smile-icon"
              />
            </div>
            <div
              v-else
              class="award-true"
            >
              <img
                src="~@/assets/image/hlt/choujiang/gift-icon.png"
                class="gift-icon"
              />
              <div class="award-txt">
                {{ item.award_level }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-tap="{ methods: chou }"
          class="chou-btn"
        />
      </div>
      <div class="chou-bottom">
        {{ `已有${totalLotteryPerson}人抽奖，${lotterySize0}人抽中一等奖` }}
      </div>
      <div
        v-if="lotterySize0 !== 0"
        class="bo-bao"
      >
        用户<span class="user-name">温柔的李宁</span>抽中了<span class="award-level">一等奖</span>
      </div>
      <img
        v-tap="{ methods: closeHandler, type: '0' }"
        class="close-btn"
        src="~@/assets/image/hlt/choujiang/close-icon.png"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapMutations } from 'vuex';
import { chouJiang } from '@/api/hotelReserve/hlt';
import wxApi from '@/utils/wxApi';
const levelMap = {
  0: {
    txt: '感谢参与',
  },
  1: {
    txt: '一等奖',
  },
  2: {
    txt: '二等奖',
  },
  3: {
    txt: '三等奖',
  },
  4: {
    txt: '四等奖',
  },
  5: {
    txt: '五等奖',
  },
  6: {
    txt: '六等奖',
  },
};
export default {
  name: 'choujiangDialog',
  data() {
    return {
      levelMap,
      timer: null,
      awardList: [
        {
          award_name: '感谢参与',
          award_level: '感谢参与',
          award_condition: '1',
          award_discount: '1',
          award_probability: '1',
          award_count: '93',
          deg: 45,
        },
        {
          award_name: '感谢参与',
          award_level: '感谢参与',
          award_condition: '1',
          award_discount: '1',
          award_probability: '1',
          award_count: '93',
          deg: 105,
        },
        {
          award_name: '感谢参与',
          award_level: '感谢参与',
          award_condition: '1',
          award_discount: '1',
          award_probability: '1',
          award_count: '93',
          deg: 165,
        },
        {
          award_name: '感谢参与',
          award_level: '感谢参与',
          award_condition: '1',
          award_discount: '1',
          award_probability: '1',
          award_count: '93',
          deg: 225,
        },
        {
          award_name: '感谢参与',
          award_level: '感谢参与',
          award_condition: '1',
          award_discount: '1',
          award_probability: '1',
          award_count: '93',
          deg: 285,
        },
        {
          award_name: '感谢参与',
          award_level: '感谢参与',
          award_condition: '1',
          award_discount: '1',
          award_probability: '1',
          award_count: '93',
          deg: 345,
        },
      ],
      chouNumber: 526,
      getNum: 226,
      rDeg: 0,
      isChou: false,
      degs: [
        {
          min: -25,
          max: 25,
        },
        {
          min: 35,
          max: 85,
        },
        {
          min: 95,
          max: 145,
        },
        {
          min: 155,
          max: 205,
        },
        {
          min: 215,
          max: 265,
        },
        {
          min: 275,
          max: 325,
        },
        {
          min: -25,
          max: 25,
        },
      ], // 奖项的旋转区间
    };
  },
  computed: {
    ...mapState({
      totalLotteryPerson: (state) => state.live.totalLotteryPerson,
      lotterySize0: (state) => state.live.lotterySize0,
      awardConfig: (state) => state.live.awardConfig,
      env: (state) => state.app.env,
    }),
  },
  mounted() {
    // 处理奖项配置数据
    const copy = [...this.awardConfig];
    // 判断设置的奖项长度，并对奖项放置的顺序进行处理
    this.handlerAwardData(copy);
    console.log('奖项数据', this.awardList);
  },
  methods: {
    ...mapMutations({
      setIsCanLottery: 'live/setIsCanLottery',
    }),
    closeHandler(e) {
      // 获取关闭类型，0为关闭当前弹窗，1为关闭当前弹窗并弹出中奖弹窗，2为关闭当前弹窗并弹出未中奖，3为关闭当前弹窗并弹出库存不足弹窗
      this.$emit('close', e);
    },
    // 抽奖
    async chou() {
      if (this.timer) return;
      this.isChou = true;
      // 调用抽奖接口，获取抽奖结果
      const res = await chouJiang();
      const { code, end_time } = res;
      // const res = this.getRandomNum(1, 3);
      console.log('抽奖结果', code, res);
      // 获取对应抽奖结果的旋转度数区间
      const randomDeg = this.getRandomDeg(Number(code));
      // 判断是否能够进行抽奖
      if (Number(code) === -1) {
        // 弹窗显示库存不足
        this.closeHandler({ type: '3' });
        return;
      }
      if (Number(code) === -2) {
        // 提示抽奖次数已达上限，并跳转至我的优惠券页面
        this.$toast.center('抽奖次数已达上限');
        setTimeout(() => {
          // 跳转至我的优惠券页面
          if (this.env === 'miniProgram') {
            wxApi.navigateTo('/pages/hotelReserve/myPreferential/myPreferential');
          } else if (this.env === 'h5') {
            this.$router.push({
              path: '/myPreferential',
            });
          } else if (this.env === 'tt') {
            wxApi.navigateToTt('/pages/hotelReserve/myPreferential/myPreferential');
          }
        }, 1500);
        return;
      }
      this.rDeg = 3 * 360 - randomDeg;
      this.timer = setTimeout(() => {
        this.isChou = false;
        clearInterval(this.timer);
        this.timer = null;
        this.rDeg = -randomDeg - 360;
        if (Number(code) === 0) {
          this.closeHandler({ type: '2' });
          return;
        }
        // 显示中奖弹窗,并回传中奖的奖项数据
        // 获取对应中奖的奖项数据
        let target = {};
        this.awardList.forEach((item) => {
          if (item.award_level === this.levelMap[code].txt) {
            target = { ...item, end_time };
          }
        });
        this.closeHandler({ type: '1', award: { ...target } });
        // 将是否能够抽奖的状态修改为 1
        this.setIsCanLottery('1');
      }, 4000);
    },
    // 获取对应奖项的角度
    getRandomNum(min, max) {
      const random = Math.floor(Math.random() * (max - min + 1));
      return random + min;
    },
    // 获取抽奖结果对应的随机角度
    getRandomDeg(res) {
      if (Number(res) < 0) res = 0;
      let randomDeg = 0;
      // 参照对应奖项对应的角度区间
      const target = [];
      this.awardList.forEach((item) => {
        if (item.award_level === this.levelMap[res].txt) {
          target.push({ ...item.degs });
        }
      });
      // 判断查询出来的角度区间长度是否是唯一的，不是唯一则为感谢参与，再次进行生成随机数，对其进行随机处理
      let deg = { ...target[0] };
      if (target.length > 1) {
        const randomIndex = this.getRandomNum(0, target.length - 1);
        deg = { ...target[randomIndex] };
      }
      randomDeg = this.getRandomNum(deg.min, deg.max);
      return randomDeg;
    },
    // 初始化奖项的位置
    handlerAwardData(config) {
      const len = config.length;
      // 当配置的奖项只有一个时，数组的第一个元素放置奖项，其余为谢谢参与
      if (len === 1) {
        this.awardList[0] = { ...config[0] };
      }
      // 当配置的奖项有两个时，数组的第一个、第四个元素放置奖项，其余为谢谢参与
      if (len === 2) {
        this.awardList[0] = { ...config[0] };
        this.awardList[3] = { ...config[1] };
      }
      // 当配置的奖项有三个时，数组的第一个、第三个、第五个元素放置奖项，其余为谢谢参与
      if (len === 3) {
        this.awardList[0] = { ...config[0] };
        this.awardList[2] = { ...config[1] };
        this.awardList[4] = { ...config[2] };
      }
      // 当配置的奖项有四个时，数组的第一个、第三个、第五个、第二个元素放置奖项，其余为谢谢参与
      if (len === 4) {
        this.awardList[0] = { ...config[0] };
        this.awardList[2] = { ...config[1] };
        this.awardList[4] = { ...config[2] };
        this.awardList[1] = { ...config[3] };
      }
      // 当配置的奖项有五个时，数组的第一个、第三个、第五个、第二个元素放置奖项，其余为谢谢参与
      if (len === 5) {
        this.awardList[0] = { ...config[0] };
        this.awardList[2] = { ...config[1] };
        this.awardList[4] = { ...config[2] };
        this.awardList[1] = { ...config[3] };
        this.awardList[3] = { ...config[4] };
      }
      // 当配置的奖项有六个时，数组的第一个、第三个、第五个、第二个元素放置奖项，其余为谢谢参与
      if (len === 6) {
        this.awardList[0] = { ...config[0] };
        this.awardList[2] = { ...config[1] };
        this.awardList[4] = { ...config[2] };
        this.awardList[1] = { ...config[3] };
        this.awardList[3] = { ...config[4] };
        this.awardList[5] = { ...config[5] };
      }
      this.awardList = this.awardList.map((item, index) => {
        item.deg = 45 + index * 60;
        item.degs = this.degs[index];
        return item;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-container {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  .chou-container {
    width: 628px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .chou-bg {
      width: 100%;
      height: 628px;
      background-image: url('~@/assets/image/hlt/choujiang/chou-bg.png');
      background-size: 100%;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .lights {
        width: 628px;
        height: 628px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
      .lights2 {
        width: 582px;
        height: 572px;
      }

      .chou-content {
        width: 510px;
        height: 510px;
        background-color: skyblue;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        .award-item {
          width: 50%;
          height: 50%;
          background-color: #fdf9ed;
          position: absolute;
          color: #ff004f;
          font-size: 24px;
          font-weight: bold;
          clip-path: polygon(0 0, 75% 0, 100% 100%, 0 75%);

          &:nth-last-of-type(2n) {
            background-color: #fee7be;

            .award-txt {
              width: 25px;
              bottom: 70px;
            }
          }
          .award-txt {
            width: 25px;
            letter-spacing: 2px;
          }

          &:first-of-type {
            background-color: #fb3606;
            color: #fffb4f;
          }

          .none-award {
            transform: rotate(-45deg);
            position: absolute;
            top: 70px;
            left: 75px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 26px;
            .thanks {
              letter-spacing: 4px;
              margin-bottom: 20px;
            }
            .smile-icon {
              width: 64px;
              height: 64px;
            }
          }

          .award-true {
            display: flex;
            flex-direction: column;
            align-items: center;
            transform: rotate(-45deg);
            position: absolute;
            bottom: 60px;
            left: 88px;
            .gift-icon {
              width: 68px;
              height: 68px;
              margin-bottom: -15px;
            }
          }
        }
      }
      .ani {
        transition: all 3s ease-in-out;
      }

      .chou-btn {
        width: 176px;
        height: 176px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 50%;
        background-image: url('~@/assets/image/hlt/choujiang/chou-icon.png');
        background-size: 100% 100%;

        &::after {
          content: '';
          display: block;
          width: 60px;
          height: 68px;
          background-image: url('~@/assets/image/hlt/choujiang/zhizhen-icon.png');
          background-size: 100% 100%;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateY(-100% + 30px) translateX(-50%);
        }
      }
    }
    .chou-bottom {
      width: 449px;
      height: 214px;
      margin-top: -72px;
      padding-top: 106px;
      box-sizing: border-box;
      background-image: url('~@/assets/image/hlt/choujiang/bottom-img.png');
      background-size: 100% 100%;
      color: #ffffff;
      font-size: 24px;
      text-align: center;
    }
    .bo-bao {
      width: 100%;
      margin-top: -30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 24px;

      .user-name {
        margin: 0 10px;
      }
      .award-level {
        margin: 0 10px;
        color: #ff457a;
      }
    }

    .close-btn {
      width: 64px;
      height: 64px;
      margin-top: 56px;
    }
  }
}
</style>
