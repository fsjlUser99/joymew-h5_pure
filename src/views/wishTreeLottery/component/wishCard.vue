<template>
  <div class="wish-card" :class="{ wedding: isWedding }">
    <!-- 左区域 -->
    <div class="left-area" :class="{ wedding: isWedding }">
      <!-- 头像 -->
      <div class="avatar-container">
        <img :src="user.avatar" alt="头像" class="avatar-img" />
      </div>
      <!-- 用户昵称 -->
      <div class="nickname" :class="{ wedding: isWedding }">
        {{ user.nickname }}
      </div>
    </div>
    <!-- 分割线 -->
    <div class="divider" :class="{ wedding: isWedding }">
      <!-- 分割线内容 -->
    </div>
    <!-- 右区域 -->
    <div class="right-area" :class="{ wedding: isWedding }">
      <!-- 愿望内容 -->
      <div class="wish-content" :class="{ wedding: isWedding }">
        {{ user.wish }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WishCard',
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        nickname: '',
        avatar: '',
        wish: '',
      }),
    },
    isWedding: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 数据
    };
  },
  computed: {
    // 计算属性
  },
  watch: {
    // 监听器
  },
  created() {
    // 生命周期钩子
  },
  mounted() {
    console.log('愿望卡片组件已挂载');
  },
  methods: {
    // 方法
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'YouSheFont';
  src: url('https://ustatic.hudongmiao.com/joymewH5/font/youshe.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
.wish-card {
  position: relative;
  width: 60vw;
  height: 100vw;
  background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wish-item-mobile.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 0;
  font-family: 'YouSheFont', sans-serif;
  &.wedding {
    background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wish-item-mobile-wedding.png');
  }

  .left-area {
    position: absolute;
    top: 17vw;
    left: 10.8vw;
    width: 15vw;
    height: 55vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    &.wedding {
      top: 20vw;
    }

    .avatar-container {
      width: 12vw;
      height: 12vw;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 2vw;

      .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .nickname {
      font-size: 6vw;
      color: #d32f2f;
      text-align: center;
      line-height: 1.4;
      word-break: break-all;
      writing-mode: vertical-rl;
      text-orientation: upright;
      height: 30vw;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      letter-spacing: 0.2em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.wedding {
        color: #963511;
      }
    }
  }

  .divider {
    position: absolute;
    top: 17vw;
    left: 27vw;
    width: 0.5vw;
    height: 50vw;
    background-color: #d32f2f;
    transform: translateX(-50%);
    // 分割线样式
    &.wedding {
      background-color: #FEE18D;
      top: 20vw;
    }
  }

      .right-area {
      position: absolute;
      top: 17vw;
      right: 12vw;
      width: 21vw;
      height: 55vw;
      overflow: hidden;
      &.wedding {
        top: 20vw;
      }

      .wish-content {
        color: #d32f2f;
        text-align: center;
        width: 100%;
        word-break: break-all;
        writing-mode: vertical-rl;
        text-orientation: upright;
        position: absolute;
        top: 0;
        left: 0;
        height: auto;
        max-height: 100%;
        display: block;
        text-align-last: start;
        text-align: start;
        &.wedding {
          color: #B76F47;
        }
      }
    }
}
</style>
