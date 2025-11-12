<template>
  <transition
    enter-active-class="slideInUp faster animated"
    leave-active-class="slideOutDown faster animated"
  >
    <div
      v-show="isShowAni"
      class="editInfoModule"
    >
      <div class="infoForm">
        <div class="formItem publicVCenter">
          <div class="key">头像</div>
          <div class="formCt publicVCenter">
            <img
              :src="formData.avator"
              class="headImg"
            />
            <img
              src="@/assets/image/hd2/arrowRightGray.png"
              class="arrowRightGray"
            />
            <input
              ref="fileinput"
              accept="image/*"
              type="file"
              class="file"
              @change="change"
            />
          </div>
        </div>
        <div class="formItem publicVCenter">
          <div class="key">贵宾姓名</div>
          <div class="formCt">
            <input
              v-model="formData.wx_name"
              class="nameIpt"
              type="text"
              placeholder="请输入贵宾姓名"
              maxlength="13"
            />
          </div>
        </div>
        <div class="formItem publicVCenter">
          <div class="key">亲友团</div>
          <div class="formCt">
            <div class="relativeGroup publicVCenter">
              <div class="radioItem publicVCenter">
                <div class="radioLabel boy publicVCenter">
                  <img
                    src="@/assets/image/hd2/boy.png"
                    class="sexIcon boy"
                  />
                  男方亲友
                </div>
                <input
                  v-model="formData.type"
                  type="radio"
                  class="relativesRadio"
                  value="1"
                  name="relatives"
                  :checked="formData.type === '1'"
                />
              </div>
              <div class="radioItem publicVCenter">
                <div class="radioLabel girl publicVCenter">
                  <img
                    src="@/assets/image/hd2/girl.png"
                    class="sexIcon girl"
                  />
                  女方亲友
                </div>
                <input
                  v-model="formData.type"
                  type="radio"
                  class="relativesRadio"
                  value="2"
                  name="relatives"
                  :checked="formData.type === '2'"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="formItem publicVCenter">
          <div class="key">桌号</div>
          <div
            class="deskNum publicVCenter"
            @click="show"
          >
            {{ formData.table_number }}桌
            <img
              src="@/assets/image/hd2/arrowRightGray.png"
              class="arrowRightGray"
            />
          </div>
          <VuePicker
            :data="pickData"
            :show-toolbar="true"
            :visible.sync="pickerVisible"
            @confirm="confirm"
          />
        </div>
        <div class="formItem publicVCenter">
          <div class="key">身份</div>
          <div class="identyLabels publicHCenter">
            <div
              v-for="(item, index) in statusList"
              :key="index"
              class="label publicHvCenter"
              :class="{ active: item === formData.position }"
              @click="chooseStatus(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="formConfirmItem publicVCenter">
          <div
            class="confirmBtn publicHvCenter"
            @click="confirmEdit"
          >
            确认修改
          </div>
          <div class="editTip">确认修改需要消耗{{ editUserInfoPrice }}个喵钻</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { POPUP_MODULE } from '@/assets/constant/index';
import { uploadPhoto, editUserInfo, diamondRecharge } from '@/api/index/index';
import VuePicker from 'vue-pickers';
import wxApi from '@/utils/wxApi';
import { timeoutTask } from '@/utils';

const tdata = [];
for (let i = 0; i < 90; i += 1) {
  if (i < 3) {
    tdata.push({
      label: i + 1,
      value: i + 1,
    });
  } else if (i < 12) {
    tdata.push({
      label: i + 2,
      value: i + 2,
    });
  } else if (i < 21) {
    tdata.push({
      label: i + 3,
      value: i + 3,
    });
  } else if (i < 30) {
    tdata.push({
      label: i + 4,
      value: i + 4,
    });
  } else if (i < 39) {
    tdata.push({
      label: i + 5,
      value: i + 5,
    });
  } else if (i < 48) {
    tdata.push({
      label: i + 6,
      value: i + 6,
    });
  } else if (i < 57) {
    tdata.push({
      label: i + 7,
      value: i + 7,
    });
  } else if (i < 66) {
    tdata.push({
      label: i + 8,
      value: i + 8,
    });
  } else if (i < 75) {
    tdata.push({
      label: i + 9,
      value: i + 9,
    });
  } else if (i < 84) {
    tdata.push({
      label: i + 10,
      value: i + 10,
    });
  } else {
    tdata.push({
      label: i + 11,
      value: i + 11,
    });
  }
}
export default {
  name: 'EditInfoPopup',
  computed: {
    ...mapState({
      editUserInfoPrice: (state) => state.app.editUserInfoPrice,
      money: (state) => state.user.money,
      env: (state) => state.app.env,
    }),
  },
  components: {
    VuePicker,
  },
  created() {
    this.initData();
  },
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  data() {
    return {
      isShowAni: false, // editInfo box弹出动画
      photoModuleKey: POPUP_MODULE.editInfoModule.key,
      pickerVisible: false,
      pickData: [tdata],
      statusList: ['伴郎', '伴娘', '单身贵族', '高富帅', '白富美', '钻石王老五'],
      formData: {
        avator: '',
        wx_name: '',
        type: '1',
        table_number: '',
        position: '',
      },
    };
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
      setUserInfo: 'user/setUserInfo',
      setOrigin: 'app/setOrigin',
    }),
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    show() {
      this.pickerVisible = true;
    },
    confirm(res) {
      this.formData.table_number = res[0].value;
    },
    change(e) {
      try {
        this.$loading('图片加载中...');
        const freader = new FileReader();
        const file = e.target.files[0];
        freader.onload = (ev) => {
          const url = ev.target.result;
          this.formData.avator = url;
          this.$loading.close();
        };

        freader.onerror = () => {
          this.$loading.close();
          this.$toast.center('图片加载失败');
        };

        freader.readAsDataURL(file); // 读取照片
      } catch (err) {
        this.$loading.close();
      }
    },
    uploadPhoto() {
      const formData = new FormData();
      const arr = this.formData.avator.split(',');
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      /* eslint-disable */
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], 'photo');
      formData.append('file', file);
      formData.append('prefix', 'avator');
      return uploadPhoto(formData);
    },
    chooseStatus(position) {
      this.formData.position = position;
    },
    initData() {
      this.formData.avator = this.$store.state.user.headImg;
      this.formData.wx_name = this.$store.state.user.name;
      this.formData.type = this.$store.state.user.relativeType;
      this.formData.table_number = this.$store.state.user.deskNum;
      this.formData.position = this.$store.state.user.currentStatus;
    },
    /**
     * 跳转支付页
     */
    newJumpPay({ total, extraJsonStr }) {
      wxApi.navigateTo(
        `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${total}&origin=${this.$store.state.app.origin}&extraJsonStr=${extraJsonStr}`,
      );
    },
    edit1() {
      this.$loading('信息修改中...');
      this.uploadPhoto()
        .then((res1) => {
          console.log(res1);
          this.formData.avator = res1.filePath;
          return editUserInfo(this.formData);
        })
        .then((res2) => {
          console.log(res2);
          this.$loading.close();
          if (res2.code === '200') {
            this.$toast.center('修改成功!');
            const tmpRemainMoney = (parseFloat(this.money) - parseFloat(this.editUserInfoPrice)).toFixed(2);
            this.setUserInfo({
              name: this.formData.wx_name,
              headImg: this.formData.avator,
              relativeType: this.formData.type,
              deskNum: this.formData.table_number,
              currentStatus: this.formData.position,
              money: tmpRemainMoney,
            });
            this.closePopupModule();
          } else if (res2.code === '100') {
            console.log('需要充值');
            console.log('***跳转地址***');
            localStorage.setItem('tmpEditInfo', JSON.stringify(this.formData));
            if (this.env === 'miniProgram') {
              this.setOrigin('editInfo');
              if (this.$store.state.app.mpType) {
                this.newJumpPay({
                  total: this.editUserInfoPrice,
                  extraJsonStr: JSON.stringify(this.formData),
                });
              } else {
                wxApi.navigateTo(
                  `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.editUserInfoPrice}&origin=${this.$store.state.app.origin}`,
                );
              }
            } else if (this.env === 'h5') {
              diamondRecharge({
                total: this.editUserInfoPrice,
              })
                .then((res) => {
                  console.log(res);
                  return wxApi.pay(res);
                })
                .then(() => {
                  // 前端处理用户余额增加
                  const tmpRemainMoney = (parseFloat(this.money) + parseFloat(this.editUserInfoPrice)).toFixed(2);
                  this.setUserInfo({
                    money: tmpRemainMoney,
                  });
                  this.updateEdit();
                })
                .catch((err) => {
                  console.log(err);
                  this.$toast.center('充值失败!');
                });
            } else if (this.env === 'tt') {
              this.setOrigin('editInfo');
              console.log(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.editUserInfoPrice}&origin=${this.$store.state.app.origin}`,
              );
              wxApi.navigateToTt(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.editUserInfoPrice}&origin=${this.$store.state.app.origin}`,
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.$loading.close();
        });
    },
    edit2() {
      editUserInfo(this.formData)
        .then((res) => {
          console.log(res);
          this.$loading.close();
          if (res.code === '200') {
            this.$toast.center('修改成功!');
            const tmpRemainMoney = (parseFloat(this.money) - parseFloat(this.editUserInfoPrice)).toFixed(2);
            this.setUserInfo({
              name: this.formData.wx_name,
              headImg: this.formData.avator,
              relativeType: this.formData.type,
              deskNum: this.formData.table_number,
              currentStatus: this.formData.position,
              money: tmpRemainMoney,
            });
            this.closePopupModule();
          } else if (res.code === '100') {
            console.log('需要充值');
            console.log('***跳转地址***');
            localStorage.setItem('tmpEditInfo', JSON.stringify(this.formData));
            if (this.env === 'miniProgram') {
              this.setOrigin('editInfo');
              if (this.$store.state.app.mpType) {
                this.newJumpPay({
                  total: this.editUserInfoPrice,
                  extraJsonStr: JSON.stringify(this.formData),
                });
              } else {
                wxApi.navigateTo(
                  `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.editUserInfoPrice}&origin=${this.$store.state.app.origin}`,
                );
              }
            } else if (this.env === 'h5') {
              diamondRecharge({
                total: this.editUserInfoPrice,
              })
                .then((res) => {
                  console.log(res);
                  return wxApi.pay(res);
                })
                .then(() => {
                  // 前端处理用户余额增加
                  const tmpRemainMoney = (parseFloat(this.money) + parseFloat(this.editUserInfoPrice)).toFixed(2);
                  this.setUserInfo({
                    money: tmpRemainMoney,
                  });
                  this.updateEdit();
                })
                .catch((err) => {
                  console.log(err);
                  this.$toast.center('充值失败!');
                });
            } else if (this.env === 'tt') {
              this.setOrigin('editInfo');
              console.log(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.editUserInfoPrice}&origin=${this.$store.state.app.origin}`,
              );
              wxApi.navigateToTt(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${this.editUserInfoPrice}&origin=${this.$store.state.app.origin}`,
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
          hideWxLoading();
        });
    },
    confirmEdit() {
      localStorage.removeItem('tmpEditInfo');
      if (!this.formData.avator) {
        this.$toast.center('头像不能为空!');
        return;
      }
      if (!this.formData.wx_name) {
        this.$toast.center('姓名不能为空!');
        return;
      }
      if (!this.formData.type) {
        this.$toast.center('请选择亲友团!');
        return;
      }
      if (!this.formData.table_number) {
        this.$toast.center('请选择桌号!');
        return;
      }
      if (!this.formData.position) {
        this.$toast.center('请选择身份!');
        return;
      }
      console.log(this.formData);
      if (this.formData.avator.indexOf('base64') > -1) {
        this.edit1();
      } else {
        this.edit2();
      }
    },
    closePopupModule() {
      this.hideAniStart();
      timeoutTask(() => {
        this.togglePopup();
      }, 200);
    },
    updateEdit() {
      const tmpEditInfo = JSON.parse(localStorage.getItem('tmpEditInfo'));
      editUserInfo(tmpEditInfo)
        .then((res) => {
          localStorage.removeItem('tmpEditInfo');
          if (res.code === '200') {
            this.$toast.center('修改成功!');
            const tmpRemainMoney = (parseFloat(this.money) - parseFloat(this.editUserInfoPrice)).toFixed(2);
            this.setUserInfo({
              name: tmpEditInfo.wx_name,
              headImg: tmpEditInfo.avator,
              relativeType: tmpEditInfo.type,
              deskNum: tmpEditInfo.table_number,
              currentStatus: tmpEditInfo.position,
              money: tmpRemainMoney,
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
.editInfoModule {
  position: absolute;
  width: 100%;
  bottom: 0;
  .infoForm {
    width: 750px;
    height: 1130px;
    background: #ffffff;
    position: relative;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: 0 50px;
    padding-top: 30px;
    .formItem {
      justify-content: space-between;
      height: 138px;
      .key {
        font-size: 32px;
        font-weight: 400;
        color: #8f9297;
      }
      .formCt {
        position: relative;
        .headImg {
          width: 76px;
          height: 76px;
          border-radius: 50%;
        }
        .arrowRightGray {
          width: 28px;
          height: 28px;
          margin-left: 30px;
        }
        .file {
          position: absolute;
          right: 0px;
          width: 200px;
          opacity: 0;
        }
        .nameIpt {
          font-weight: 400;
          color: #5b5e63;
          font-size: 32px;
          text-align: right;
          width: 256px;
          outline: none;
          border: none;
          &::placeholder {
            font-size: 32px;
            color: #5b5e63;
          }
        }
        .relativeGroup {
          .radioItem {
            &:nth-child(1) {
              margin-right: 66px;
            }
            .radioLabel {
              font-weight: 400;
              font-size: 28px;
              margin-right: 16px;
              &.boy {
                color: #6112b0;
              }
              &.girl {
                color: #ed3488;
              }
              .sexIcon {
                &.boy {
                  width: 32px;
                  height: 32px;
                  margin-right: 8px;
                }
                &.girl {
                  width: 28px;
                  height: 34px;
                  margin-right: 8px;
                }
              }
            }
          }
        }
      }
      .deskNum {
        font-weight: 400;
        color: #5b5e63;
        font-size: 32px;
        .arrowRightGray {
          margin-left: 30px;
          width: 28px;
          height: 28px;
        }
      }
      .identyLabels {
        width: 520px;
        flex-wrap: wrap;
        margin-top: 110px;
        .label {
          width: 135px;
          height: 64px;
          border-radius: 30px;
          border: 2px solid #eeeeee;
          font-size: 28px;
          font-weight: 400;
          color: #5b5e63;
          margin: 25px 10px;
          white-space: nowrap;
          &.active {
            background: linear-gradient(276deg, #71b3ff 0%, #2c82e4 100%);
            color: #ffffff;
          }
        }
      }
    }
    .formConfirmItem {
      flex-direction: column;
      margin-top: 150px;
      .confirmBtn {
        width: 418px;
        height: 90px;
        background: linear-gradient(300deg, #c76bfb 0%, #ea1775 100%);
        align-items: center;
        font-size: 32px;
        font-weight: 400;
        color: #ffffff;
      }
      .editTip {
        font-size: 24px;
        font-weight: 400;
        color: #e14d4d;
        margin-top: 14px;
      }
    }
  }
}
</style>
