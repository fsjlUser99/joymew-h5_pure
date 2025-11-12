<template>
  <div class="main">
    <div
      v-show="visible"
      class="reserve-box-wrap"
      @click="cancel"
    >
      <transition
        enter-active-class="slideInUp faster animated"
        leave-active-class="slideOutDown faster animated"
      >
        <div
          class="reserve-box"
          :style="styleObj"
          :class="[{ enter: enter }]"
          @click.stop="foo"
        >
          <div class="input-wrap">
            <div class="name-wrap">
              您的姓名:
            </div>
            <div class="content-wrap">
              <input
                v-model="name"
                type="text"
                class="input"
                :readonly="hasReserve"
              />
            </div>
          </div>

          <div class="input-wrap">
            <div class="name-wrap">
              手机号码:
            </div>
            <div class="content-wrap">
              <input
                v-model="phone"
                type="number"
                class="input"
                :readonly="hasReserve"
              />
            </div>
          </div>

          <div
            v-if="!isYj"
            class="input-wrap"
          >
            <div class="name-wrap">
              预算:
            </div>
            <div class="content-wrap">
              <van-dropdown-menu class="v-menu">
                <van-dropdown-item
                  v-model="time"
                  class="v-menu-item"
                  :options="option1"
                  :disabled="hasReserve"
                />
              </van-dropdown-menu>
              <!-- <input type="text" class="input" v-model="time" :disabled="hasReserve" /> -->
            </div>
          </div>
          <div class="input-wrap">
            <div class="name-wrap">
              婚礼日期:
            </div>
            <div
              class="content-wrap"
              @click="showDatePicker"
            >
              <div class="input">
                {{ currentDateString || '请选择' }}
              </div>
            </div>
          </div>

          <!-- <div class="result-show">
            <div class="start" :style="type ? ';' : 'color:#ff457a;'">开始日期</div>
            <div class="now">{{ currentDateString || 请选择 }}</div>
          </div> -->

          <div class="btn-group">
            <div
              class="cancel-btn"
              @click.stop="cancel"
            >
              取消
            </div>
            <div
              v-if="!hasReserve"
              class="sure-btn"
              @click.stop="submit"
            >
              确定
            </div>
            <div
              v-if="hasReserve"
              class="sure-btn finish"
              @click.stop="submit"
            >
              已预订
            </div>
          </div>
        </div>
      </transition>
    </div>

    <van-popup
      v-model="datePickerVisible"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div class="start-date">
        <van-datetime-picker
          v-model="secondDate"
          class="date-picker"
          :show-toolbar="!false"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirmDate"
          @cancel="datePickerVisible = false"
        />
      </div>
    </van-popup>
    <!-- <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" /> -->
    <!-- <van-picker title="标题" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel" @change="onChange" /> -->
  </div>
</template>

<script>
import { reserveHost, getReserveInfo, reserveHostHlt } from '@/api/hotelReserve/index';
import { mapState, mapGetters } from 'vuex';

let loading = false;
export default {
  name: 'ReverseBox',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    entry: {
      type: String,
      default: '',
    },
    splid: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      datePickerVisible: false,
      option1: [
        { text: '请选择预算范围', value: '' },
        { text: '10万-15万', value: '10万-15万' },
        { text: '15万-20万', value: '15万-20万' },
        { text: '20万-25万', value: '20万-25万' },
        { text: '25万-50万', value: '25万-50万' },
        { text: '50万及以上', value: '50万及以上' },
      ],
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      minDate: new Date(new Date().setHours(24 * 1)),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(new Date().setHours(24 * 1)),
      secondDate: new Date(new Date().setHours(24 * 1)),
      hasReserve: false,
      reserveTime: '',
      reserveTimeReal: '',
      remark: '',
      time: '',
      timeLable: '',
      name: '',
      phone: '',
      date: '',
      currentTimeIndex: '',
      timeList: [
        {
          id: '1',
          name: '午宴',
        },
        {
          id: '2',
          name: '晚宴',
        },
      ],
    };
  },
  computed: {
    currentDateString() {
      const add0 = (n) => (Number(n) > 9 ? n : `0${n}`);
      if (this.currentDate) {
        const yyyy = this.currentDate.getFullYear();
        const mm = Number(this.currentDate.getMonth()) + 1;
        const dd = this.currentDate.getDate();
        return `${yyyy}-${add0(mm)}-${add0(dd)}`;
      }

      return '';
    },
    styleObj() {
      if (!this.visible) {
        return {};
      }
      return {
        paddingBottom: `${Number(this.bottom) + 20}px`,
      };
    },
    ...mapState({
      bottom: (state) => state.app.bottom,
      enter: (state) => state.app.enter,
      user_name: (state) => state.user.name,
      headimg: (state) => state.user.headImg,
      userphone: (state) => state.app.userphone,
      highPrivilege: (state) => state.user.emceeInfo.highPrivilege,
    }),
    ...mapGetters({
      isYj: 'app/isYj',
    }),
  },
  watch: {
    user_name: {
      handler(newVal) {
        if (newVal) {
          this.name = newVal;
        }
      },
      immediate: true,
    },
    userphone: {
      handler(newVal) {
        if (newVal) {
          this.phone = newVal;
        }
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {
    this.initData();
  },
  methods: {
    showDatePicker() {
      if (this.hasReserve) {
        // return;
      }
      this.datePickerVisible = true;
    },
    confirmDate() {
      this.currentDate = this.secondDate;
      this.datePickerVisible = false;
    },
    onConfirm(value, index) {
      this.$toast.center(`当前值：${value}, 当前索引：${index}`);
    },
    onChange(picker, value, index) {
      this.$toast.center(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      this.$toast.center('取消');
    },
    initData() {
      const { splid } = this;
      console.log('splid', splid);
      // return ;

      getReserveInfo({
        splid,
        token: this.$store.state.app.token,
      })
        .then((res) => {
          console.log(res);
          if (res.size === 0) {
            this.hasReserve = false;
          } else {
            this.hasReserve = true;
            const reserveInfo = res.list[0];
            // this.date = reserveInfo.date;
            if (reserveInfo.date) {
              this.currentDate = new Date(`${reserveInfo.date.replace(/-/g, '/')} 00:00:00`);
              this.secondDate = new Date(`${reserveInfo.date.replace(/-/g, '/')} 00:00:00`);
            }

            this.reserveTime = reserveInfo.time_interval === '1' ? '午宴' : '晚宴';
            this.reserveTimeReal = reserveInfo.time_interval;
            this.name = reserveInfo.customer_name;
            this.phone = reserveInfo.customer_phone;
            this.remark = reserveInfo.remark;
            this.time = reserveInfo.time_interval;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.$emit('cancel', {});
    },
    sure() {
      this.$emit('sure', {});
    },
    foo() {},
    submit() {
      const {
        name, phone, hasReserve, currentDateString,
      } = this;
      if (hasReserve) {
        this.$toast.center('已经预订过了');
        return;
      }
      console.log(name);
      if (!name) {
        this.$toast.center('请输入您的姓名');
        return;
      }
      if (!phone) {
        this.$toast.center('请输入您的手机号码');

        return;
      }
      const TEL_REGEXP = /^\d{11}$/;
      if (!TEL_REGEXP.test(phone)) {
        this.$toast.center('请输入合法的手机号码');

        return;
      }
      if (!currentDateString) {
        this.$toast.center('请选择预定日期');
        return;
      }
      if (this.highPrivilege === 5) {
        this.fetchReserveHostHlt();
      } else {
        this.fetchReserveHost();
      }
    },
    fetchReserveHostHlt() {
      if (loading) {
        this.$toast.center('预定中...');
        return;
      }
      loading = true;
      const {
        name, phone, splid, currentDateString, time,
      } = this;
      reserveHostHlt({
        splid,
        date: currentDateString,
        time_interval: time,
        customer_name: name,
        customer_phone: phone,
        headimg: this.headimg,
        kind: '2',
        token: this.$store.state.app.token,
      })
        .then((res) => {
          loading = false;
          this.$emit('sure', {
            boxVisible: false,
          });
          this.hasReserve = true;
          setTimeout(() => {
            this.$toast.center('预定成功');
          }, 800);
          console.log(res);
        })
        .catch((err) => {
          loading = false;
          console.log(err);
        });
    },
    fetchReserveHost() {
      // showWxLoading('预定中...');
      if (loading) {
        this.$toast.center('预定中...');
        return;
      }
      loading = true;
      const {
        name, phone, splid, currentDateString, time,
      } = this;
      reserveHost({
        splid,
        date: currentDateString,
        time_interval: time,
        customer_name: name,
        customer_phone: phone,
        headimg: this.headimg,
        kind: '2',
        token: this.$store.state.app.token,
      })
        .then((res) => {
          loading = false;
          this.$emit('sure', {
            boxVisible: false,
          });
          this.hasReserve = true;
          setTimeout(() => {
            this.$toast.center('预定成功');
          }, 800);
          console.log(res);
        })
        .catch((err) => {
          loading = false;
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.reverse-box-placeholder {
  width: 750px;
  height: 76px;
  box-sizing: content-box;
}
.reserve-box-wrap {
  position: fixed;
  width: 750px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  bottom: 0px;
  left: 0;
  z-index: 10;

  .reserve-box {
    width: 750px;
    // min-height: 514px;
    min-height: 514px;
    padding-bottom: 30px;
    bottom: 0px;
    position: fixed;
    &.enter {
      bottom: 98px;
    }
    padding-top: 62px;
    background: #fff;
    // background: blue;
    box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    font-size: 32px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .input-wrap {
      width: 686px;
      height: 108px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 2px solid #f0f0f0;
      box-sizing: border-box;
      &.noborder {
        border: none;
      }
      .name-wrap {
        width: 180px;
        font-size: 32px;
        color: #333333;
        box-sizing: border-box;
      }
      .content-wrap {
        flex-grow: 1;
        box-sizing: border-box;

        .input {
          box-sizing: border-box;

          color: rgba(0, 0, 0, 0.25);
          width: 100%;
          height: 110%;
          border: none;
        }
      }
    }
    .btn-group {
      width: 750px;
      height: 128px;
      background: #ffffff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .sure-btn,
      .cancel-btn {
        &.finish {
          background: #dcdcdc;
        }
        width: 330px;
        height: 76px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
      }
      .sure-btn {
        background: #ff457a;
        color: #fff;
      }
      .cancel-btn {
        background: transparent;
        color: rgba(0, 0, 0, 0.4);
      }
    }
    .start-date {
      width: 686px;
      height: 316px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .date-picker {
        flex: 1;
      }
    }
    .result-show {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .start {
        font-size: 28px;
        color: #6bc5ff;
        margin-top: 15px;
      }
      .now {
        margin-top: 5px;
        font-size: 32px;
        margin-top: 15px;

        color: #333;
      }
    }
    .v-menu {
      /deep/.van-dropdown-menu__bar {
        box-shadow: none;
        display: flex;
        .van-dropdown-menu__item {
          flex: 1;
        }
        .van-dropdown-menu__item {
          justify-content: flex-start;
        }
      }
    }
  }
}
.main::v-deep {
  .van-dropdown-menu__bar {
    height: 12vw;
  }
  .van-ellipsis {
    font-size: 4.267vw;
    color: rgba(0, 0, 0, 0.25);
    line-height: 4.9333vw;
  }
  .van-cell {
    font-size: 3.867vw;
    line-height: 7.2vw;
  }
  .van-picker__toolbar {
    height: 12.867vw;
  }
  .van-picker__cancel {
    font-size: 3.867vw;
  }
  .van-picker__confirm {
    font-size: 3.867vw;
  }
}
</style>
