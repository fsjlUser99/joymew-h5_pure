<template>
  <div class="auth-login">
    <div
      v-if="status === 'processing'"
      class="auth-login__message"
    >
      正在登录，请稍候…
    </div>
    <div
      v-else-if="status === 'authorizing'"
      class="auth-login__message"
    >
      正在跳转至微信授权…
    </div>
    <div
      v-else-if="status === 'error'"
      class="auth-login__message"
    >
      <p>登录失败：{{ errorMessage }}</p>
      <button
        type="button"
        class="auth-login__button"
        @click="restartAuth"
      >
        重新登录
      </button>
    </div>
    <div
      v-else
      class="auth-login__message"
    >
      <p v-if="!isWeixin">请在微信内打开链接以完成登录。</p>
      <p v-else-if="!wechatAppId">缺少微信应用配置，请联系管理员。</p>
      <button
        v-if="isWeixin && wechatAppId"
        type="button"
        class="auth-login__button"
      >
        立即前往微信授权
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { h5UserLogin } from '@/api/auth';
import { getToken as getStoredToken } from '@/utils/auth';

const UA = navigator.userAgent.toLowerCase();

export default {
  name: 'AuthLogin',
  data() {
    return {
      status: 'idle',
      errorMessage: '',
    };
  },
  computed: {
    redirect() {
      return this.$route.query.redirect || '/';
    },
    isWeixin() {
      return /micromessenger/.test(UA);
    },
    wechatAppId() {
      return process.env.VUE_APP_WECHAT_APP_ID || process.env.VUE_APP_WECHAT_APPID || '';
    },
  },
  created() {
    this.bootstrap();
  },
  methods: {
    ...mapMutations({
      setToken: 'app/setToken',
      setNeedLogin: 'app/setNeedLogin',
    }),
    async bootstrap() {
      // 1. 检查是否已有token
      const existingToken = getStoredToken();
      if (existingToken) {
        this.navigateAfterLogin();
        return;
      }

      // 2. 获取splid(即liveId)
      const splid = this.$route.query.splid || this.$route.query.liveId;
      if (!splid) {
        this.showError('缺少必要参数splid');
        return;
      }

      // 3. 直接调用登录接口
      await this.login(splid);
    },
    async login(splid) {
      try {
        this.status = 'loading';
        const result = await h5UserLogin({ splid });
        const token = result?.token || result?.data?.token;

        if (!token) {
          throw new Error('登录失败,未获取到token');
        }

        // 存储token并跳转
        this.setToken(token);
        this.navigateAfterLogin();
      } catch (err) {
        // 后端会处理OAuth重定向,这里只处理真正的错误
        console.error('登录错误:', err);
        this.showError(err.message);
      }
    },
    restartAuth() {
      this.errorMessage = '';
      this.status = 'idle';
      this.bootstrap();
    },
    navigateAfterLogin() {
      const target = this.redirect || '/';
      this.$router.replace(target);
    },
  },
};
</script>

<style scoped>
.auth-login {
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background: #101522;
  color: #ffffff;
  text-align: center;
  padding: 24px;
}

.auth-login__message {
  max-width: 320px;
  line-height: 1.6;
}

.auth-login__button {
  margin-top: 16px;
  padding: 10px 24px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #ff7a45 0%, #ff4d4f 100%);
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
}

.auth-login__button:active {
  opacity: 0.9;
}
</style>
