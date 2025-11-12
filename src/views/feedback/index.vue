<template>
  <!-- 反馈投诉 -->
  <div class="container">
    <div class="complaints-form">
      <div class="type-wrap">
        <div
          v-for="(item, index) in typeList"
          :key="index"
          v-tap="{ methods: chooseType, p: item }"
          class="type-item publicVCenter"
        >
          <div
            class="my-radio"
            :class="{ active: item.isActive }"
          />
          <div class="radio-value">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="description-wrap">
        <div class="key">
          问题描述
        </div>
        <div class="desc-wrap publicHCenter">
          <textarea
            v-model="desc"
            placeholder="请填写描述以便我们提供更好的帮助"
            maxlength="120"
            @input="descInput"
          />
          <div class="numberV">
            {{ txtVal }}/120
          </div>
        </div>
      </div>
      <div class="img-wrap">
        <div class="key">
          相关截图
        </div>
        <div
          class="valueCell"
          :class="{ 'ui-uploader-cell': uploaderList.length === 0, 'ui-uploader-cell-other': uploaderList.length !== 0 }"
        >
          <div
            v-for="(item, index) in uploaderList"
            :key="index"
            class="ui-uploader-item"
          >
            <img
              v-tap="{ methods: removeCurrentImg, p: index }"
              class="removeIcon"
              src="@/assets/image/hd2/closeIcon.png"
            />
            <img
              class="uImg"
              :src="item"
            />
          </div>
          <div
            v-if="showUpload"
            class="ui-uploader publicHvCenter"
          >
            +
            <input
              ref="fileinput"
              accept="image/*"
              type="file"
              class="fileInput"
              @change="change"
            />
          </div>
        </div>
      </div>
      <div class="contact-wrap publicVCenter">
        <div class="phone-key">
          联系方式
        </div>
        <input
          v-model="phone"
          placeholder="请输入手机号"
          type="number"
          maxlength="11"
        />
      </div>
      <div class="contact-way">
        <div class="phoneItem">
          客服电话：19512368757
        </div>
        <div class="phoneItem">
          投诉电话：400-082-2298
        </div>
      </div>
      <div
        v-tap="{ methods: back }"
        class="submit-btn-wrap publicHCenter"
      >
        <div class="btn publicHvCenter back">
          返回
        </div>
        <div
          v-tap="{ methods: submit }"
          class="btn publicHvCenter"
        >
          提交
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { uploadPhoto, submitFeedback } from '@/api/index/index';

const typeList = [
  {
    name: '支付未到账',
    isActive: false,
  },
  {
    name: '误点击支付',
    isActive: false,
  },
  {
    name: '不明的扣款',
    isActive: false,
  },
  {
    name: '红包未到账',
    isActive: false,
  },
  {
    name: '其他原因',
    isActive: false,
  },
];
let btnLock = false;
export default {
  name: 'Feedback',
  data() {
    return {
      phone: '',
      typeList,
      txtVal: 0,
      desc: '',
      uploaderList: [],
      showUpload: true,
    };
  },
  computed: {},
  watch: {
    uploaderList: {
      handler(newVal) {
        if (newVal.length >= 3) {
          this.showUpload = false;
        } else {
          this.showUpload = true;
        }
      },
      immediate: true,
    },
  },
  created() {
    btnLock = false;
  },
  mounted() {},
  methods: {
    removeCurrentImg(e) {
      this.uploaderList.splice(e.p, 1);
    },
    chooseType(e) {
      if (e.p.isActive) {
        this.resetTypeList();
      } else {
        const tmpCount = this.getTypeListActiveNum();
        if (tmpCount === 0) {
          this.updateTypeList(e.p.name);
        } else {
          this.resetTypeList();
          this.updateTypeList(e.p.name);
        }
      }
    },
    resetTypeList() {
      const tmpLen = this.typeList.length;
      for (let i = 0; i < tmpLen; i += 1) {
        if (this.typeList[i].isActive) {
          this.typeList[i].isActive = false;
        }
      }
    },
    updateTypeList(name) {
      const tmpLen = this.typeList.length;
      for (let i = 0; i < tmpLen; i += 1) {
        if (this.typeList[i].name === name) {
          this.typeList[i].isActive = !this.typeList[i].isActive;
          break;
        }
      }
    },
    getTypeListActiveNum() {
      const tmpLen = this.typeList.length;
      let tmpCount = 0;
      for (let i = 0; i < tmpLen; i += 1) {
        if (this.typeList[i].isActive) {
          tmpCount += 1;
        }
      }
      return tmpCount;
    },
    descInput(e) {
      this.txtVal = e.target.value.length;
      if (this.txtVal >= 120) {
        this.$toast.center('问题内容不能超过120字哦!');
        this.desc = this.desc.slice(0, 120);
      }
    },
    change(e) {
      try {
        this.$loading('图片上传中...');
        const freader = new FileReader();
        const file = e.target.files[0];

        freader.onload = (ev) => {
          const url = ev.target.result;
          this.uploadPhoto(url)
            .then((res) => {
              console.log(res);
              this.uploaderList.push(res.filePath);
              this.$loading.close();
              this.$toast.center('图片上传成功!');
            })
            .catch((err) => {
              console.log(err);
              this.$loading.close();
              this.$toast.center('图片上传失败!');
            });
        };

        freader.onerror = () => {
          this.$loading.close();
          this.$toast.center('图片上传失败!');
        };

        freader.readAsDataURL(file); // 读取照片
      } catch (err) {
        this.$loading.close();
      }
    },
    uploadPhoto(tempPreviewImg) {
      const formData = new FormData();
      const arr = tempPreviewImg.split(',');
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      /* eslint-disable */
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], 'complaintsImg');
      formData.append('file', file);
      formData.append('prefix', 'complaints');
      return uploadPhoto(formData);
    },
    submit() {
      let tmpActiveTypeStr = '';
      let tmpImgUrl = '';
      const tempLen = this.typeList.length;
      for (let i = 0; i < tempLen; i += 1) {
        if (this.typeList[i].isActive) {
          tmpActiveTypeStr += this.typeList[i].name;
        }
      }
      if (!tmpActiveTypeStr) {
        this.$toast.center('至少选择一个问题类型哦!');
        return;
      }
      if (!this.desc) {
        this.$toast.center('请填写问题描述!');
        return;
      }
      if (!this.phone) {
        this.$toast.center('请填写手机号!');
        return;
      }
      if (this.phone.length !== 11) {
        this.$toast.center('手机号格式不正确!');
        return;
      }
      if (this.uploaderList.length > 0) {
        tmpImgUrl = this.uploaderList.join(',');
      }
      if (btnLock) {
        return;
      }
      btnLock = true;
      submitFeedback({
        desc: this.desc,
        phone: this.phone,
        type: tmpActiveTypeStr,
        imgurl: tmpImgUrl,
      })
        .then((res) => {
          console.log(res);
          btnLock = false;
          this.$toast.center('投诉信息提交成功!');
          this.desc = '';
          this.phone = '';
          this.resetTypeList();
          this.uploaderList.splice(0);
        })
        .catch((err) => {
          console.log(err);
          btnLock = false;
        });
    },
    back() {
      this.$router.go(-1);
    },
  },
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
  position: relative;
  .complaints-form {
    .type-wrap {
      .type-item {
        margin-left: 30px;
        height: 88px;
        border-bottom: 1px solid #e5e5e5;
        .my-radio {
          width: 46px;
          height: 46px;
          border: 2px solid #c9c9c9;
          border-radius: 50%;
          margin-right: 20px;
          background-size: 100% 100%;
          &.active {
            background-image: url('https://img.hidongtv.com/hidong-wechat/complaints-tick.png');
          }
        }
        .radio-value {
          color: #000;
          font-size: 34px;
        }
      }
    }
    .description-wrap {
      margin-top: 20px;
      .key {
        padding-left: 29px;
        font-size: 34px;
        color: #000;
      }
      .desc-wrap {
        position: relative;
        margin-top: 20px;
        textarea {
          width: 690px;
          height: 140px;
          outline: none;
          border-radius: 4px;
          border: 1px solid #979797;
          box-sizing: border-box;
          padding: 12px;
        }
        .numberV {
          position: absolute;
          right: 5vw;
          bottom: 1vw;
          font-size: 3.2vw;
        }
      }
    }
    .img-wrap {
      margin-top: 20px;
      .key {
        box-sizing: border-box;
        padding-left: 29px;
        font-size: 34px;
        color: #000;
      }
      .valueCell {
        .ui-uploader-item {
          width: 118px;
          height: 118px;
          margin-right: 18px;
          margin-bottom: 18px;
          padding-bottom: 2px;
          padding-right: 2px;
          position: relative;
          .removeIcon {
            width: 6vw;
            height: 6vw;
            position: absolute;
            right: -1vw;
            top: -1vw;
          }
          .uImg {
            width: 100%;
            height: 100%;
          }
        }
        .ui-uploader {
          width: 135px;
          height: 135px;
          margin-right: 20px;
          background: #efefef;
          border-radius: 4px;
          color: #878787;
          font-size: 72px;
          position: relative;
          .fileInput {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
        &.ui-uploader-cell {
          width: 690px;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          margin-left: 30px;
        }
        &.ui-uploader-cell-other {
          width: 690px;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          margin-left: 30px;
        }
      }
    }
    .contact-wrap {
      margin-top: 20px;
      margin-left: 29px;
      .phone-key {
        font-size: 34px;
        color: #000;
        margin-right: 17px;
      }
      input {
        outline: none;
        width: 42vw;
        height: 9vw;
        border-radius: 1.067vw;
        border: 1px solid #dedede;
        box-sizing: border-box;
        padding: 2vw;
        font-size: 4vw;
        letter-spacing: 0.2vw;
      }
    }
    .contact-way {
      display: flex;
      width: 100%;
      justify-content: space-around;
      padding: 32px 12px;
      .phoneItem {
        font-size: 3.2vw;
        color: #878787;
      }
    }
    .submit-btn-wrap {
      position: fixed;
      bottom: 20px;
      width: 100%;
      justify-content: space-around;
      .btn {
        width: 320px;
        height: 89px;
        background: #1aad19;
        border-radius: 20px;
        font-size: 4vw;
        font-weight: 700;
        color: #fff;
        &.back {
          background: #ffffff;
          color: #1aad19;
          border: 1px solid #1aad19;
        }
      }
    }
  }
}
</style>
