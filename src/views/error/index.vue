<template>
    <div class="error-wrap publicVCenter">
        <div class="error-content publicVCenter">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjODA4MDgwIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTEgMTVoMnYyaC0yem0wLTEzaDJ2MTBoLTJ6Ii8+PC9zdmc+"
                class="error-icon" />
            <div class="error-text">
                发生了错误！
            </div>
            <div class="error-text">
                {{ errorText }}
            </div>
            <!-- <div class="back-btn publicHvCenter" @click="goBack">
                返回
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    errorText: {
      type: String,
      default: '请去活动页面签到！',
    },
  },
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        window.location.href = '/';
      }
    },
  },
};
</script>

<style lang="less" scoped>
.error-wrap {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    justify-content: center;
    align-items: center;

    .error-content {
        display:flex;
        flex-direction: column;
        .error-icon {
            width: 200px;
            height: 200px;
            margin-bottom: 40px;
        }

        .error-text {
            color: #666;
            font-size: 48px;
            margin-bottom: 60px;
            text-align: center;
        }

        .back-btn {
            width: 320px;
            height: 88px;
            background-color: #E08E06;
            color: #fff;
            font-size: 32px;
            border-radius: 44px;
        }
    }
}
</style>
