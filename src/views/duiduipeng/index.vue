<template>
  <div class="duiduipeng-container">
    <img
      src="@/assets/image/duiduipeng/duiduipeng-title.png"
      alt=""
      class="title-img"
    />
    <transition-group
      v-if="!isShowRes"
      name="fade"
      tag="div"
      class="mid-container"
    >
      <div
        v-if="is_ok === '0'"
        key="step1"
        class="stepOne"
      >
        <div class="set-info-container">
          <div class="avatar-bg">
            <div
              v-if="formData.avatar"
              class="user-avatar"
            >
              <img :src="formData.avatar" />
            </div>
            <img
              v-else
              src="@/assets/image/duiduipeng/add-icon.png"
              class="add-img"
            />
            <input
              type="file"
              class="chooseFileInput"
              accept=".jpg,.jpeg,.png,.webp,.svg"
              @change="changeAvatar"
            />
            <input
              v-model="formData.nick_name"
              type="text"
              placeholder="输入用户名"
              class="user-name-input"
            />
          </div>
          <div class="user-info-container">
            <div class="info-item">
              <div class="item-label">
                你是?
              </div>
              <div
                class="item-input sex-input"
                :class="{ female: formData.sex === '2' }"
              >
                <div
                  v-for="item in sexMap"
                  :key="item.label"
                  class="input-btn"
                  :class="{ activeBtn: formData.sex === item.value }"
                  @click="changeSex(item.value)"
                >
                  {{ item.label }}
                </div>
              </div>
            </div>
            <div class="info-item">
              <div class="item-label">
                年龄?
              </div>
              <div
                class="item-input down-list-input"
                :class="{ showList: isShowList }"
                @click="isShowList = !isShowList"
              >
                <div class="age-info">
                  {{ downList ? downList[formData.age] : '' }}
                </div>
                <div class="down-list-container">
                  <div
                    v-for="(item, index) in downList"
                    :key="index"
                    class="down-list-item"
                    @click="formData.age = String(index)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="confirm-btn"
          @click="confirmInfo"
        >
          确定
        </div>
      </div>
      <div
        v-else
        key="step2"
        class="stepTwo"
      >
        <div
          class="result-btn"
          @click="showResDialog"
        >
          匹配结果
        </div>
        <div class="wait-user-avatar">
          <div
            class="avatar-border"
            :class="{ female: formData.sex === '2' }"
          />
          <img
            class="wait-avatar"
            :src="formData.avatar"
            alt=""
          />
        </div>
        <div class="user-nick-name">
          {{ formData.nick_name }}
        </div>
        <div class="wait-tip">
          <span>等待匹配</span>
          <div
            v-for="num in 3"
            :key="num"
            class="wait-point"
          />
        </div>
      </div>
    </transition-group>
    <transition name="close">
      <div
        v-if="isShowResDialog"
        class="result-dialog"
        @click.stop.prevent
      >
        <div class="res-container">
          <div class="res-title">
            匹配结果
          </div>
          <div class="list-header">
            <span>轮次</span>
            <span>Ta的头像</span>
            <span>Ta的昵称</span>
          </div>
          <div
            v-if="resList.length"
            class="list-item-container"
          >
            <div
              v-for="(item, index) in resList"
              :key="index"
              class="list-item"
            >
              <div class="info">
                {{ index + 1 }}
              </div>
              <div class="info">
                <img :src="item.avator" />
              </div>
              <div class="info">
                {{ item.wx_name }}
              </div>
            </div>
          </div>
          <div
            v-else
            class="none-res"
          >
            暂未查询您本场对对碰的匹配结果~
          </div>
        </div>
        <img
          class="close-btn"
          src="@/assets/image/duiduipeng/close-icon.png"
          @click="isShowResDialog = false"
        />
      </div>
    </transition>
    <transition name="close">
      <div
        v-if="isShowRes"
        class="res-model"
        @click.stop.prevent
      >
        <div class="res-model-container">
          <div class="user-avator-display">
            <div
              class="user-avator"
              :data-username="dialogObj.left.wx_name || '无'"
            >
              <div
                class="avator-border"
                :class="{ female: dialogObj.left.sex === 2 }"
              />
              <img
                v-if="dialogObj.left.avator"
                class="avator-img"
                :src="dialogObj.left.avator"
              />
              <div
                v-else
                class="avator-img avator-none"
              >
                空
              </div>
            </div>
            <div class="mid-heart-logo" />
            <div
              class="user-avator"
              :data-username="dialogObj.right.wx_name || '无 '"
            >
              <div
                class="avator-border"
                :class="{ female: dialogObj.right.sex === 2 }"
              />
              <img
                v-if="dialogObj.right.avator"
                class="avator-img"
                :src="dialogObj.right.avator"
              />
              <div
                v-else
                class="avator-img avator-none"
              >
                空
              </div>
            </div>
          </div>
          <div
            v-if="!dialogObj.right.wx_name"
            class="res-tip"
          >
            很遗憾！您本轮匹配结果为空～
          </div>
          <div
            v-else
            class="res-tip"
          >
            恭喜！您匹配到了
            <div class="target-username">
              {{ dialogObj.right.wx_name }}
            </div>
          </div>
          <div
            class="close-model-btn"
            @click="isShowRes = false"
          >
            关闭
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { uploadPhoto } from '@/api/index/index';
import { getUserInfo, saveUserInfo, getRecordResult } from '@/api/duiduipeng/index';

const sexMap = [
  {
    label: '男神',
    value: '1',
  },
  {
    label: '女神',
    value: '2',
  },
];
export default {
  name: 'Duiduipeng',
  data() {
    return {
      step: 1,
      isNeedUpload: false,
      isShowResDialog: false,
      formData: {
        avatar: '',
        nick_name: '',
        sex: '1',
        age: '',
      },
      is_ok: 0,
      avatar: null,
      sexMap,
      downList: null,
      isShowList: false,
      resList: [],
      localIndex: null,
      pair_sort: 0,
      isShowRes: false,
      isSuccess: false,
      dialogObj: {
        left: {
          sex: 1,
          wx_name: '',
          avator: '',
        },
        right: {
          sex: 2,
          wx_name: '',
          avator: '',
        },
      },
      timer: null,
    };
  },
  created() {
    //  获取用户数据
    this.getUserInfo();
  },
  mounted() {
    //  轮询匹配结果
    this.timer = setInterval(this.getRecordResultList, 4000);
  },
  beforeDestroy() {
    console.log('***结束轮询***');
    clearInterval(this.timer);
  },
  methods: {
    //  进入页面获取用户基本信息
    async getUserInfo() {
      const res = await getUserInfo();
      const target = { ...res };
      this.formData.nick_name = target.wx_name;
      this.formData.avatar = target.avator;
      this.is_ok = String(target.is_ok);
      if (target.sex) {
        this.formData.sex = String(target.sex);
      }
      if (target.ageTypeMap) {
        this.downList = JSON.parse(JSON.stringify(target.ageTypeMap));
        this.formData.age = '1';
      }
    },
    changeSex(val) {
      this.formData.sex = val;
    },
    changeAvatar(event) {
      console.log('选中的文件', event);
      this.avatar = event.target.files['0'];
      const reader = new FileReader();
      reader.readAsDataURL(this.avatar);
      reader.onload = (e) => {
        this.formData.avatar = e.target.result;
      };
      this.isNeedUpload = true;
    },
    //  确定个人信息
    async confirmInfo() {
      //  验证表单完整度
      if (!this.formData.avatar) {
        this.$toast.center('请选择您的头像~');
        return;
      }
      if (!this.formData.nick_name) {
        this.$toast.center('请填写您的昵称~');
        return;
      }

      //  判断是否需要上传头像
      if (this.isNeedUpload) {
        this.$loading('头像上传中，请稍等~');
        const res = await this.uploadPhoto();
        const target = res;
        this.formData.avatar = target.filePath;
        this.$loading.close();
        this.$toast.center('头像上传成功~');
        this.isNeedUpload = false;
      }
      if (!this.formData.avatar || this.formData.avatar.indexOf('http') === -1) {
        this.$toast.center('头像上传失败~');
        return;
      }
      //  保存信息
      await saveUserInfo({
        avator: this.formData.avatar,
        wx_name: this.formData.nick_name,
        sex: this.formData.sex,
        age: this.formData.age,
      });

      //  跳转至下一步
      this.is_ok = '1';
    },
    //  上传头像
    uploadPhoto() {
      const formData = new FormData();
      formData.append('file', this.avatar);
      formData.append('prefix', 'duiduipeng');
      return uploadPhoto(formData);
    },
    //  请求匹配结果
    async showResDialog() {
      // await this.getRecordResultList();
      //  展示弹窗
      this.isShowResDialog = true;
    },
    //  获取匹配结果
    async getRecordResultList() {
      const res = await getRecordResult();
      const target = res;
      //  判断上次的结果数据是否为空，不为空则说明已经匹配成功，将匹配成功标记变为true
      if (!this.isSuccess && this.resList.length) {
        this.isSuccess = true;
      }
      //  获取大屏当前轮次,如果本地记录的轮次大于获取到的，说明清空了数据
      if (this.pair_sort > Number(target.pair_sort)) {
        this.isSuccess = false;
      }
      this.pair_sort = Number(target.pair_sort);
      //  更新结果数据
      if (target.list && target.list.length) {
        this.resList = [];
        target.list.map((item) => {
          const resTarget = {
            avator: '',
            wx_name: '',
            sex: 1,
          };
          //  判断性别，决定取值
          if (this.formData.sex === '2') {
            resTarget.avator = item.left_user_img;
            resTarget.wx_name = item.left_user_name;
            resTarget.sex = Number(item.left_sex);
          } else {
            resTarget.avator = item.right_user_img;
            resTarget.wx_name = item.right_user_name;
            resTarget.sex = Number(item.right_sex);
          }
          this.resList.push(resTarget);
          return item;
        });
      }
      //  判断是否弹窗
      if (this.pair_sort > 0) {
        //  如果本地记录的指针为null则说明刚开始，移动本地指针
        if (!this.localIndex || this.localIndex === this.pair_sort || this.pair_sort + 1 < this.localIndex) {
          //  判断当前是否已经匹配成功，成功则不弹窗，反之弹出结果
          if (!this.isSuccess) {
            //  更改数据
            const left = {
              wx_name: target.myInfo.wx_name,
              avator: target.myInfo.avator,
              sex: Number(target.myInfo.sex),
            };
            const right = {
              wx_name: '',
              avator: '',
              sex: 1,
            };
            //  目标用户性别取当前用户的另一种
            if (left.sex === 1) {
              right.sex = 2;
            } else {
              right.sex = 1;
            }
            //  如果有结果，则右边对象用结果对象
            if (this.resList && this.resList.length) {
              right.avator = this.resList[this.resList.length - 1].avator;
              right.wx_name = this.resList[this.resList.length - 1].wx_name;
            }
            this.dialogObj = {
              left,
              right,
            };
            //  如果匹配结果窗口处于活跃状态，关闭当前窗口
            if (this.isShowResDialog) this.isShowResDialog = false;
            this.isShowRes = true;
          }
          this.localIndex = this.pair_sort + 1;
        }
      } else {
        //  如果当前轮次为0，则说明还未开始匹配，移动指针不弹窗
        this.localIndex = 1;
        //  匹配成功标记至反
        this.isSuccess = false;
        //  关闭弹窗
        if (this.isShowRes) this.isShowRes = false;
        //  结果也要置空
        this.resList = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
img {
  -webkit-user-drag: none;
}
.duiduipeng-container {
  width: 100%;
  height: 100vh;
  padding: 0 17px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('~@/assets/image/duiduipeng/page-bg.png');
  background-size: 100% 100%;
  position: relative;

  .title-img {
    width: 631px;
    margin-top: 127px;
  }

  .mid-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .stepOne {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      .set-info-container {
        width: 715px;
        height: 715px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-image: url('~@/assets/image/duiduipeng/mid-bg.png');
        background-size: 100% 100%;

        .avatar-bg {
          width: 267px;
          height: 267px;
          margin-top: 69px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url('~@/assets/image/duiduipeng/choose-bg.png');
          background-size: 100% 100%;
          cursor: pointer;
          position: relative;

          .user-avatar {
            width: 160px;
            height: 160px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            transform: rotate(45deg);
            overflow: hidden;

            img {
              width: 240px;
              height: 240px;
              transform: rotate(-45deg);
            }
          }

          .add-img {
            width: 69px;
            height: 69px;
          }

          .chooseFileInput {
            width: 160px;
            height: 160px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            transform: rotate(45deg);
            opacity: 0;
          }

          .user-name-input {
            width: 185px;
            height: 53px;
            background-color: #fff;
            border-radius: 48px;
            border: none;
            outline: none;
            color: #0f1a48;
            font-size: 29px;
            font-weight: bold;
            // line-height: 53px;
            text-align: center;
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .user-info-container {
          margin-top: 66px;

          .info-item {
            margin-bottom: 19px;
            display: flex;
            justify-content: center;
            align-items: center;
            .item-label {
              margin-right: 38px;
              color: #ffffff;
              font-size: 35px;
              font-weight: bold;
            }
            .item-input {
              width: 246px;
              height: 85px;
              border-radius: 96px;
              background-color: #fff;
              display: flex;
              align-items: center;
              position: relative;
              .input-btn {
                flex: 1;
                height: 100%;
                border-radius: 96px;
                color: #333333;
                font-size: 31px;
                font-weight: bold;
                line-height: 85px;
                text-align: center;
                z-index: 2;
                cursor: pointer;
              }
              .activeBtn {
                color: #ffffff;
              }
            }
            .sex-input {
              &::after {
                content: '';
                display: block;
                width: 50%;
                height: 100%;
                border-radius: 96px;
                background-image: linear-gradient(135deg, #00e4f7, #448cff);
                position: absolute;
                z-index: 1;
                transition: all 0.2s ease-in-out;
              }
            }
            .female {
              &::after {
                transform: translateX(100%);
                background-image: linear-gradient(135deg, #ffa0d4, #ff449e);
              }
            }
            &:last-of-type {
              margin-bottom: 0;
            }
            .down-list-input {
              padding-left: 30px;
              box-sizing: border-box;
              font-size: 31px;
              font-weight: bold;
              position: relative;

              &::after {
                content: '';
                display: block;
                width: 58px;
                height: 58px;
                border-radius: 50%;
                background-image: url('~@/assets/image/duiduipeng/down-icon.png');
                background-size: 100% 100%;
                position: absolute;
                right: 19px;
                transition: all 0.3s ease-in-out;
              }
              .down-list-container {
                width: 100%;
                height: 0;
                padding: 0 20px;
                box-sizing: border-box;
                background-color: #fff;
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border-radius: 30px;
                overflow: hidden;
                transition: all 0.3s ease-in-out;
                .down-list-item {
                  height: 70px;
                  line-height: 70px;
                }
              }
            }

            .showList {
              &::after {
                transform: rotate(-180deg);
              }
              .down-list-container {
                height: 210px;
              }
            }
          }
        }
      }

      .confirm-btn {
        width: 410px;
        height: 119px;
        margin-top: -35px;
        background-image: url('~@/assets/image/duiduipeng/confirm-bg.png');
        background-size: 100% 100%;
        color: #a04d00;
        font-size: 46px;
        font-weight: bold;
        line-height: 119px;
        text-align: center;
        text-indent: 23px;
        letter-spacing: 23px;
        text-shadow: #ffeba5 7px 7px 8px, #ffeba5 -7px -7px 8px, #ffeba5 -7px 7px 8px, #ffeba5 7px -7px 8px;
        cursor: pointer;
      }
    }

    .stepTwo {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .result-btn {
        margin-bottom: 75px;
        color: #3a4eff;
        font-size: 46px;
        font-weight: bold;
        text-decoration: underline;
      }

      .wait-user-avatar {
        width: 319px;
        height: 319px;
        margin-bottom: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: relative;

        .avatar-border {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-image: url('~@/assets/image/duiduipeng/left-border.png');
          background-size: 100% 100%;
          position: absolute;
          animation: xuanzhuan 5s linear infinite;
        }
        .female {
          background-image: url('~@/assets/image/duiduipeng/right-border.png');
        }

        .wait-avatar {
          width: 241px;
          height: 241px;
          border-radius: 50%;
        }
      }

      .user-nick-name {
        width: 227px;
        height: 65px;
        margin-bottom: 71px;
        background-color: rgba(0, 0, 0, 0.76);
        border-radius: 67px;
        color: #ffffff;
        font-size: 38px;
        line-height: 65px;
        text-align: center;
      }

      .wait-tip {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        color: #ffffff;
        font-size: 42px;

        .wait-point {
          width: 10px;
          height: 10px;
          margin-left: 15px;
          margin-bottom: 8px;
          border-radius: 50%;
          background-color: #fff;
          animation: jump 2.4s ease-in-out infinite;
          &:nth-of-type(2) {
            animation-delay: 0.7s;
          }
          &:nth-of-type(3) {
            animation-delay: 1.5s;
          }
        }
      }
    }
  }

  .result-dialog {
    width: 100%;
    height: 100vh;
    padding: 0 55px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    z-index: 3;

    .res-container {
      width: 100%;
      height: 892px;
      padding: 0 15px 40px 15px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 46px;
      background-color: #fff;
      .res-title {
        width: 294px;
        height: 83px;
        margin-bottom: 38px;
        background-image: url('~@/assets/image/duiduipeng/res-title-bg.png');
        background-size: 100% 100%;
        color: #ffffff;
        font-size: 46px;
        font-weight: bold;
        line-height: 83px;
        text-align: center;
      }
      .list-header {
        width: 100%;
        height: 67px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 2px solid rgba(217, 217, 217, 0.8);

        span {
          display: block;
          flex: 1;
          color: rgba(0, 0, 0, 0.4);
          font-size: 27px;
          text-align: center;
          line-height: 67px;
        }
      }

      .list-item-container {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .list-item {
          width: 100%;
          height: 67px;
          display: flex;
          align-items: center;

          .info {
            flex: 1;
            height: 100%;
            text-align: center;
            line-height: 67px;
            border-bottom: 2px solid rgba(217, 217, 217, 0.8);
            &:nth-of-type(2) {
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
            }
          }
        }
      }

      .none-res {
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(0, 0, 0, 0.4);
      }
    }

    .close-btn {
      margin-top: 37px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
  }

  .res-model {
    width: 100%;
    height: 100vh;
    padding: 0 42px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;

    .res-model-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .user-avator-display {
        width: 100%;
        height: 406px;
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

        .user-avator {
          width: 192px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          .avator-border {
            width: 192px;
            height: 192px;
            background-image: url('~@/assets/image/duiduipeng/left-border.png');
            background-size: 100% 100%;
            border-radius: 50%;
            animation: xuanzhuan infinite 5s linear;
          }

          .avator-img {
            width: 145px;
            height: 145px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
          }

          .avator-none {
            background-color: #e3e3e3;
            color: #c2c2c2;
            font-size: 42px;
            font-weight: bold;
            text-align: center;
            line-height: 145px;
          }

          .female {
            background-image: url('~@/assets/image/duiduipeng/right-border.png');
          }

          &::after {
            content: attr(data-username);
            display: block;
            width: 175px;
            height: 50px;
            padding: 0 20px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 40px;
            position: absolute;
            bottom: 40px;
            color: #ffffff;
            font-size: 27px;
            line-height: 50px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }

        .mid-heart-logo {
          width: 406px;
          height: 406px;
          margin: 0 -62px;
          background-image: url('~@/assets/image/duiduipeng/mid-logo.png');
          background-size: 100% 100%;
          animation: bodong infinite ease-in-out 2s;
        }
      }

      .res-tip {
        width: 100%;
        margin-bottom: 113px;
        color: #ffffff;
        font-size: 42px;
        text-align: center;

        .target-username {
          display: inline-block;
          margin-left: 12px;
          background-image: linear-gradient(105deg, #00e4f7, #448cff);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: bold;
          font-size: 42px;
        }
      }

      .close-model-btn {
        width: 410px;
        height: 119px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 98px;
        background-image: url('~@/assets/image/duiduipeng/confirm-bg.png');
        background-size: 100% 100%;
        color: #a04d00;
        font-size: 46px;
        font-weight: bold;
        text-indent: 23px;
        letter-spacing: 23px;
        text-shadow: #ffeba5 7px 7px 8px, #ffeba5 -7px -7px 8px, #ffeba5 -7px 7px 8px, #ffeba5 7px -7px 8px;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  width: 0;
  height: 0;
  opacity: 0;
}
.close-enter-active,
.close-leave-active {
  transition: all 0.3s ease-in-out;
}
.close-enter,
.close-leave-to {
  opacity: 0;
}
@keyframes xuanzhuan {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes jump {
  0% {
    transform: translateY(0) scale(1.2);
  }
  10% {
    transform: translateY(0) scale(1.2);
  }
  45% {
    transform: translateY(-16px);
  }
  55% {
    transform: translateY(-16px);
  }
  90% {
    transform: translateY(0) scale(1.2);
  }
  100% {
    transform: translateY(0) scale(1.2);
  }
}
@keyframes bodong {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}
</style>
