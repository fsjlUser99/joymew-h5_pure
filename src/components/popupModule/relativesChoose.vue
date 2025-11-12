<template>
  <transition
    enter-active-class="slideInUp faster animated"
    leave-active-class="slideOutDown faster animated"
  >
    <div
      class="relativesChooseModule"
      v-show="isShowAni"
    >
      <div class="relativesChooseBox publicVCenter">
        <div class="relativesChooseBoxProduction">亲友团</div>
        <div class="relativesChooseSelf">您是：</div>
        <div class="mfOptions">
          <div
            class="male malestyle"
            :class="{ active: active === '1' }"
            @click="onClick('1')"
          >
            <img
              src="@/assets/image/hd2/boy.png"
              alt=""
            />
            男方
          </div>
          <div
            class="female malestyle"
            :class="{ factive: active === '2' }"
            @click="onClick('2')"
          >
            <img
              src="@/assets/image/hd2/girl.png"
              alt=""
            />
            女方
          </div>
        </div>
        <div class="relationOptions">您与新郎/新娘的关系是：</div>
        <div
          class="itemOptions"
          v-if="genderType == '1'"
        >
          <div
            class="itemOption"
            :class="{ choose: index === selectedIndex }"
            v-for="(item, index) in RELATIVES"
            :key="index"
            @click="getItem(index)"
          >
            <template v-if="index < 12">
              <span>{{ item }}</span>
            </template>
            <template v-if="index === 12">
              <span v-show="isEdting">{{ item }}</span>
              <input
                v-show="!isEdting"
                type="text"
                v-model="customText"
                maxlength="4"
                class="customInput"
                @blur="changeItem()"
                ref="customInputBoy"
              />
            </template>
          </div>
        </div>
        <div
          class="itemOptions"
          v-else
        >
          <div
            class="itemOption"
            :class="{ fchoose: index === selectedIndex }"
            v-for="(item, index) in RELATIVES"
            :key="index"
            @click="getItem(index)"
          >
            <template v-if="index < 12">
              <span>{{ item }}</span>
            </template>
            <template v-if="index === 12">
              <span v-show="isEdting">{{ item }}</span>
              <input
                v-show="!isEdting"
                type="text"
                v-model="customText"
                maxlength="4"
                class="customInput"
                @blur="changeItem()"
                ref="customInputGirl"
              />
            </template>
          </div>
        </div>
        <div class="confirm">
          <div
            class="confirmButton confirmButtons"
            v-if="genderType == '1'"
            @click="toReqEditRelatives()"
          >
            确定
          </div>
          <div
            class="confirmSecondButton confirmButtons"
            v-else
            @click="toReqEditRelatives()"
          >
            确定
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex';
import { reqEditRelatives } from '@/api/index';
import { securityMsgCheck } from '@/api/chat/index';
import { RELATIVES } from '@/assets/constant/index';

export default {
  name: 'RelativesChoose',
  data() {
    return {
      selectedIndex: 0,
      isShowAni: false, // 抽屉开关
      active: '1', //
      genderType: '1',
      RELATIVES: [],
      type: '',
      customText: '自定义', // 自定义的值
      isEdting: true,
    };
  },
  created() {
    this.RELATIVES = this.convertOriginRelativesToArray(RELATIVES);
    this.RELATIVES = JSON.parse(JSON.stringify(this.RELATIVES));
    // console.log(this.$store.getters['user/relativeTypeText']);
    // console.log(this.RELATIVES);
    this.initActive(this.$store.getters['user/relativeTypeText']);
  },
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
    }),
    initActive(relativeText) {
      const parseRelativeText = (text) => {
        return {
          gender: text.slice(0, 2),
          relation: text.slice(2),
        };
      };
      // 1. relativeText中匹配出一级信息(男方/女方)、二级信息(关系)
      const { gender, relation } = parseRelativeText(relativeText);
      this.active = gender === '男方' ? '1' : '2';
      this.genderType = gender === '男方' ? '1' : '2';
      // 2. 匹配出二级信息(关系)
      let index = this.RELATIVES.findIndex((item) => item === relation);
      if (index === -1) {
        index = 12;
      }
      if (!this.$store.getters['user/relativeTypeText']) {
        index = 0;
      }
      this.selectedIndex = index;
      if (index === 12) {
        this.customText = relation;
        this.RELATIVES[12] = relation;
        this.type = `${`${this.genderType}-${this.customText}`}`;
      } else {
        this.type = `${`${this.genderType}-${index}`}`;
      }
    },
    onClick(active) {
      this.active = active;
      this.genderType = active;
    },
    convertOriginRelativesToArray(originObj) {
      return Object.keys(originObj).map((key) => originObj[key]);
    },
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    getItem(index) {
      this.selectedIndex = index;
      if (index < 12) {
        this.type = `${`${this.genderType}-${index}`}`;
      }
      if (index === 12) {
        this.showInputThenFocus();
      }
    },
    showInputThenFocus() {
      this.isEdting = false;
      this.customText = '';
      this.$nextTick(() => {
        this.inputFocus();
      });
    },
    inputFocus() {
      if (this.genderType === '1') {
        this.$refs.customInputBoy[0].focus();
      } else {
        this.$refs.customInputGirl[0].focus();
      }
    },
    // 输入框失焦
    changeItem() {
      this.isEdting = true;
      if (!this.customText) {
        this.type = '1-12';
        return;
      }
      this.RELATIVES[12] = this.customText;
      this.type = `${`${this.genderType}-${this.customText}`}`;
    },
    checkUnCustom(relationNumStr) {
      const tmpArr = [];
      for (let i = 0; i <= 12; i += 1) {
        tmpArr.push(String(i));
      }
      return tmpArr.includes(relationNumStr);
    },
    async toReqEditRelatives() {
      if (!this.type) {
        this.$toast.center('请选择关系');
        return;
      }
      if (this.type === '1-12') {
        this.$toast.center('请输入自定义关系');
        this.showInputThenFocus();
        return;
      }
      this.$loading('请求中...');
      try {
        const relation = this.type.split('-')[1];
        let tmpSecCheckResult = 'noNeedCheck';
        if (!this.checkUnCustom(relation)) {
          const checkRes = await securityMsgCheck(this.customText);
          tmpSecCheckResult = JSON.parse(checkRes.msg_sec_check);
        }
        if (tmpSecCheckResult?.result?.suggest === 'pass' || tmpSecCheckResult === 'noNeedCheck') {
          await reqEditRelatives(this.type);
          this.togglePopup();
          this.$store.commit('user/setUserInfo', {
            relativeType: this.type,
          });
          this.$loading.close();
          this.$toast.center('选择关系成功');
        } else {
          this.$loading.close();
          this.$toast.center('文字非法!');
        }
      } catch (err) {
        console.log(err);
        this.$loading.close();
        this.$toast.center('选择关系失败');
      }
    },
  },
};
</script>
<style lang="less" scoped>
.relativesChooseModule {
  position: absolute;
  width: 100%;
  bottom: 0;

  .active {
    color: #fff;
    background-color: #4cb7f3;
  }

  .factive {
    color: #fff;
    background-color: #f34c91;
  }

  .choose {
    color: #fff;
    background-color: #4cb7f3;
  }

  .fchoose {
    color: #fff;
    background-color: #f34c91;
  }

  .relativesChooseBox {
    width: 750px;
    height: 1032px;
    padding: 0 40px;
    background-color: #f3f6fa;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    flex-direction: column;
    position: relative;

    .relativesChooseBoxProduction {
      width: 100%;
      height: 128px;
      font-size: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .relativesChooseSelf {
      width: 100%;
      height: 104px;
      font-size: 30px;
      display: flex;
      align-items: center;
    }

    .mfOptions {
      width: 100%;
      height: 72px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      img {
        width: 36px;
        height: 42px;
        margin-right: 10px;
      }

      .malestyle {
        width: 200px;
        height: 72px;
        font-size: 34px;
        border-radius: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed lightslategray;
      }
    }

    .relationOptions {
      width: 100%;
      height: 78px;
      font-size: 30px;
      display: flex;
      align-items: center;
    }

    .itemOptions {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .itemOption {
        width: 200px;
        height: 72px;
        font-size: 34px;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 10px;
      }

      .customInput {
        width: 100%;
        height: 100%;
        font-size: 34px;
        color: #000;
        // margin-top: 10px;
        // margin-left: 10px;
        border-style: none;
        text-align: center;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
      }
    }

    // 确定
    .confirm {
      width: 100%;
      height: 100px;
      position: absolute;
      bottom: 100px;
      display: flex;
      justify-content: center;
      align-items: center;

      .confirmButton {
        background-color: #4cb7f3;
      }

      .confirmButtons {
        width: 418px;
        height: 90px;
        border-radius: 50px;
        font-size: 32px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .confirmSecondButton {
        background-color: #f34c91;
      }
    }
  }
}
</style>
