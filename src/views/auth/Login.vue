<template>
  <div class="auth-login">
    <div v-if="status === 'processing'" class="auth-login__message">正在登录，请稍候…</div>
    <div v-else-if="status === 'authorizing'" class="auth-login__message">正在跳转至微信授权…</div>
    <div v-else-if="status === 'error'" class="auth-login__message">
      <p>登录失败：{{ errorMessage }}</p>
      <button type="button" class="auth-login__button" @click="restartAuth">重新登录</button>
    </div>
    <div v-else class="auth-login__message">
      <p v-if="!isWeixin">请在微信内打开链接以完成登录。</p>
      <p v-else-if="!wechatAppId">缺少微信应用配置，请联系管理员。</p>
      <button
        v-if="isWeixin && wechatAppId"
        type="button"
        class="auth-login__button"
        @click="startWechatAuth"
      >
        立即前往微信授权
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { loginByWechat } from '@/api/auth';
import { buildWechatOAuthUrl, getToken as getStoredToken } from '@/utils/auth';

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
    bootstrap() {
      const existingToken = getStoredToken();
      if (existingToken) {
        this.navigateAfterLogin();
        return;
      }
      const { code } = this.$route.query;
      if (code) {
        this.exchangeCode(code);
        return;
      }
      if (this.isWeixin && this.wechatAppId) {
        this.startWechatAuth();
      } else {
        this.status = 'ready';
      }
    },
    startWechatAuth() {
      if (!this.isWeixin || !this.wechatAppId) {
        this.status = 'error';
        this.errorMessage = '当前环境无法发起微信授权。';
        return;
      }
      this.status = 'authorizing';
      const redirectBase = `${window.location.origin}${window.location.pathname}${window.location.search}`;
      const redirectQuery = this.redirect
        ? `#/login?redirect=${encodeURIComponent(this.redirect)}`
        : '#/login';
      const redirectUri = `${redirectBase}${redirectQuery}`;
      const authUrl = buildWechatOAuthUrl({
        appId: this.wechatAppId,
        redirectUri,
        state: this.redirect,
      });
      window.location.replace(authUrl);
    },
    restartAuth() {
      this.errorMessage = '';
      this.status = 'idle';
      this.bootstrap();
    },
    async exchangeCode(code) {
      this.status = 'processing';
      try {
        const payload = {
          code,
          liveId: this.$route.query.liveId || this.$store.state.live.liveId || '',
        };
        const result = await loginByWechat(payload);
        const token = result && (result.token || (result.data && result.data.token));
        if (!token) {
          throw new Error('未获取到有效的登录凭证');
        }
        this.setToken(token);
        this.setNeedLogin(false);
        this.navigateAfterLogin();
      } catch (err) {
        console.error(err);
        this.status = 'error';
        this.errorMessage = err.message || '登录失败，请稍后重试';
      }
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
