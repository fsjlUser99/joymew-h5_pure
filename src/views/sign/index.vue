<template>
  <div class="joymewIndex">
    <div :class="['signWrap', sceneAlias, customSignBg ? 'customSignBg' : '']">
      <!-- 背景 -->
      <div class="bg">
        <img
          v-if="customSignBg"
          :src="customSignBg"
          class="customBg"
        />
      </div>
      <!-- 表单 -->
      <div class="signForm">
        <div
          v-if="sceneType === '1'"
          class="title"
        >
          {{ activityTitle }}
        </div>

        <div class="formItem">
          <div class="formItem-key">祝福语:</div>
          <div class="formItem-value">
            <input
              v-model="wish"
              class="inputWish"
              maxlength="20"
              placeholder="请输入祝福语"
            />
            <span
              class="iconfont icon-shuaxin"
              @click="refreshWish" />
          </div>
        </div>


        <div
          v-if="isForcePhone"
          class="formItem"
        >
          <div class="formItem-key">手机号:</div>
          <div class="formItem-value">
            <input
              v-model="phoneNumber"
              class="inputPhone"
              maxlength="11"
              placeholder="请输入手机号"
              type="tel"
            />
          </div>
        </div>

        <div class="buttonWrap">
          <div
            class="signButton"
            @click="sign" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { generateRandom } from '@/utils/index';
import { getWishBySceneType } from '@/utils/service';
import { signIn } from '@/api/index/index';
import { getSceneInfoBySceneType } from '@/utils/sceneAdapter';

export default {
  name: 'SignContainer',
  data() {
    return {
      wish: '',
      phoneNumber: '',
    };
  },
  computed: {
    ...mapState({
      // live module
      customSignWish: (state) => state.live.customSignWish,
      sceneType: (state) => state.live.sceneType,
      activityTitle: (state) => state.live.title,
      customSignBg: (state) => {
        // Only return background if it's a custom background
        return state.live.isCustomBackground ? state.live.background : '';
      },
      isOverDate: (state) => state.live.isOverDate,
      isForcePhone: (state) => state.live.isForcePhone,
      identitySwitch: (state) => state.live.identitySwitch,
      // user module
      userPhone: (state) => state.user.userPhone,
    }),
    sceneAlias() {
      if (this.sceneType) {
        const sceneInfo = getSceneInfoBySceneType(this.sceneType);
        return sceneInfo.alias;
      }
      return ''; // default
    },
  },
  async mounted() {
    // 加载公共样式
    try {
      await import('./styles/common.css');
      console.log('Common styles loaded successfully');
    } catch (error) {
      console.error('Failed to load common styles:', error);
    }
    // this.refreshWish();
    this.phoneNumber = this.userPhone || '';
  },
  watch: {
    sceneAlias: {
      async handler(newAlias) {
        if (newAlias) {
          this.refreshWish();
          try {
            // 动态导入场景样式
            await import('./styles/' + newAlias + '.css');
            console.log('Dynamic styles for ' + newAlias + ' loaded successfully');
          } catch (error) {
            console.error('Failed to load dynamic styles for ' + newAlias + ':', error);
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    refreshWish() {
      const customSignLen = this.customSignWish.length;
      if (customSignLen > 0) {
        const tmpWish = this.customSignWish[generateRandom(0, customSignLen)];
        if (typeof tmpWish === 'object' && tmpWish !== null) {
          this.wish = tmpWish.bless_str;
        } else {
          this.wish = tmpWish;
        }
        return;
      }
      this.wish = getWishBySceneType(this.sceneType);
    },
    sign() {
      if (!this.wish) {
        this.$toast.center('祝福语不能为空!');
        return;
      }
      if (this.isOverDate) {
        this.$toast.center('活动已结束!');
        return;
      }
      if (this.isForcePhone) {
        if (!this.phoneNumber) {
          this.$toast.center('手机号不能为空!');
          return;
        }
        if (this.phoneNumber.length !== 11) {
          this.$toast.center('手机号格式错误!');
          return;
        }
      }
      signIn({
        wish: this.wish,
        phonenumber: this.phoneNumber,
      })
        .then(() => {
          this.$store.commit('app/setQiandaoleme', true);
          this.$toast.center('签到成功!');
          this.$router.replace({
            path: '/',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>

</style>
