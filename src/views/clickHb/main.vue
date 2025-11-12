<template>
  <!-- 点红包game -->
  <div
    ref="clickHbMain"
    class="main"
  >
    <div class="hbNum publicVCenter">
      <img
        src="@/assets/image/clickHb/hb.png"
        class="hbIcon"
      />
      +{{ currentMoney }}
    </div>
  </div>
</template>
<script>
import { timeoutTask } from '@/utils/index';
import { mapMutations } from 'vuex';
import createjs from 'createjs-cmd';
import { startClickHb, robClickHb } from '@/api/hby/index';
import { Hby } from './hby';

const perScore = 1;
let loopLock = false;
let count = 3;
let tmpInterval = null;
let canVibrate = false; // 是否支持手机震动

export default {
  name: 'ClickHbMain',
  components: {},
  data() {
    return {
      currentMoney: 0,
      newMoney: 0,
      isContinuityClickStatus: false, // 是否处于连续点击状态
    };
  },
  computed: {},
  beforeDestroy() {
    loopLock = true;
    clearInterval(tmpInterval);
  },
  created() {
    loopLock = false;
    count = 3;
    tmpInterval = null;
    if (navigator) {
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
      if (navigator.vibrate) {
        canVibrate = true;
      }
    }
    this.init();
  },
  mounted() {
    console.log(this.$refs.clickHbMain);
    const that = this;
    const myHby = new Hby({
      el: this.$refs.clickHbMain,
      speed: 10,
      sum: 50,
      callback(item, el) {
        // 点击回调
        that.keepContinuityClickStatus();
        if (that.newMoney) {
          item.className = 'clickHb-hb clickHb-hbLucky';
          item.innerHTML = `+${that.newMoney}`;
          // 中奖情况
          that.playAudio(true);
          if (canVibrate) {
            navigator.vibrate(500);
          }
          timeoutTask(() => {
            try {
              // el.removeChild(item);
              that.newMoney = 0;
            } catch (err) {
              console.log(err);
            }
          }, 200);
        } else {
          item.className = 'clickHb-hb clickHb-hbBoom';
          // 未中奖
          that.playAudio();
          timeoutTask(() => {
            try {
              el.removeChild(item);
              clearInterval(item.timer);
            } catch (err) {
              console.log(err);
            }
          }, 200);
        }
      },
    });
    myHby.start();
  },
  methods: {
    ...mapMutations({
      setHbyId: 'game/setHbyId',
    }),
    playAudio(lucky) {
      if (lucky) {
        createjs.Sound.play('getMoney');
      } else {
        createjs.Sound.play('boomb');
      }
    },
    init() {
      try {
        this.requestClickHbId((res) => {
          this.currentMoney = res.gold || 0;
          this.loopRequest();
        });
      } catch (err) {
        console.log(err);
      }
    },
    requestClickHbId(cb) {
      startClickHb()
        .then((res) => {
          console.log(res);
          this.setHbyId(res.hbId);
          if (cb) {
            cb(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addRecord(money) {
      try {
        // 记录点击弹出的金额
        this.newMoney = parseFloat(money).toFixed(2);
        this.currentMoney = (parseFloat(this.currentMoney) + parseFloat(money)).toFixed(2);
      } catch (err) {
        console.log(err);
      }
    },
    robHb() {
      robClickHb({
        perScore,
      })
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            this.addRecord(res.data.gold);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 激活(维持)连续点击状态(距离最近一次点击超过3s则取消连续点击状态)
    keepContinuityClickStatus() {
      this.isContinuityClickStatus = true;
      count = 3; // 每次点击后重新计时
      if (!tmpInterval) {
        // 保证只存在一个定时器
        tmpInterval = setInterval(() => {
          count -= 1;
          if (count === 0) {
            // 3s内没有再次点击取消连点状态并清空定时器
            this.isContinuityClickStatus = false;
            clearInterval(tmpInterval);
            tmpInterval = null;
          }
        }, 1000);
      }
    },
    // 连续点击状态每2s发送一次请求
    loopRequest() {
      if (loopLock) {
        return;
      }
      if (this.isContinuityClickStatus) {
        // 连点状态下发送请求
        this.robHb();
      }
      timeoutTask(() => {
        this.loopRequest();
      }, 2000);
    },
  },
};
</script>
<style>
.clickHb-hb {
  position: absolute;
  display: block;
  width: 128px;
  height: 178px;
  background: url('../../assets/image/clickHb/hb.png') no-repeat;
  background-size: contain;
}
.clickHb-hb.clickHb-hbLucky {
  background: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 188px;
  font-size: 57px;
  font-weight: bold;
  color: #ffffff;
}
.clickHb-hb.clickHb-hbBoom {
  width: 344px;
  height: 331px;
  background: url('../../assets/image/clickHb/hitLight2.png') no-repeat;
  background-size: contain;
}
</style>
<style lang="less" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/image/clickHb/bg.png');
  background-size: 100% 100%;
  .hbNum {
    font-size: 57px;
    font-weight: bold;
    color: #ffffff;
    width: 100%;
    justify-content: flex-end;
    padding: 25px 39px;
    z-index: 1;
    .hbIcon {
      width: 65px;
      height: 90px;
      margin-right: 10px;
    }
  }
}
</style>
