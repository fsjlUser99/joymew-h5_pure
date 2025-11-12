<template>
  <div class="wish-tree-running">
    <!-- 光效层 -->
    <div class="light-effect-layer" :class="{ wedding: isWedding }">
      <img
        :src="lightEffectImage"
        alt="光效"
        class="light-effect-img"
        :class="{ wedding: isWedding }"
      />
    </div>
    <!-- 许愿抽奖图片容器 -->
    <div class="wish-lottery-container">
      <img
        :src="wishLotteryImage"
        alt="许愿抽奖"
        class="wish-lottery-img"
      />
    </div>
    <!-- 愿望卡片和按钮包装器 -->
    <div class="wish-card-wrapper">
      <!-- 左按钮 -->
      <div class="left-btn" @click="prevWish">
        <img
          :src="buttonIcon"
          alt="左按钮"
          class="btn-icon"
        />
      </div>
      <!-- 愿望卡片组件 -->
      <div class="wish-card-container">
        <WishCard
          :user="dummyUser"
          :isWedding="isWedding"
          class="wish-card"
          :class="{
            'slide-out-left': slideDirection === 'left',
            'slide-out-right': slideDirection === 'right',
            'slide-in-left': slideDirection === 'left-in',
            'slide-in-right': slideDirection === 'right-in'
          }"
        />
      </div>
      <!-- 右按钮 -->
      <div class="right-btn" @click="nextWish">
        <img
          :src="buttonIcon"
          alt="右按钮"
          class="btn-icon"
        />
      </div>
    </div>
    <!-- 自定义按钮 -->
    <div class="custom-btn" :class="{ wedding: isWedding }" @click="handleCustomClick">自定义</div>
    <!-- 发送按钮 -->
    <div class="send-btn-container" :class="{ wedding: isWedding }" @click="handleSendClick">
      <div class="send-btn-text" :class="{ wedding: isWedding }">
        点击发送
      </div>
    </div>
    <!-- 发送次数提示 -->
    <div class="send-chance-tip">您有{{ 3 - hasSendSize }}次发送机会</div>

    <!-- 编辑愿望弹窗 -->
    <EditWishPopup
      :visible="showEditWishPopup"
      :isWedding="isWedding"
      @close="closeEditWishPopup"
      @confirm="handleWishConfirm"
    />
    <!-- 提示弹窗 -->
    <TipPopup
      :visible="showTipPopup"
      :text="tipText"
      :iconUrl="tipIconUrl"
      :isWedding="isWedding"
      @close="closeTipPopup"
    />
  </div>
</template>

<script>
import { generateRandom } from '@/utils/index';
import WishCard from './wishCard.vue';
import EditWishPopup from './editWishPopup.vue';
import TipPopup from './tipPopup.vue';
import { sendWishTree } from '../api';

const DEFAULT_WISHES = ['创新进取开新局，事业辉煌耀未来', '恭喜发财，万事如意，心想事成', '前程似锦，步步高升，财源广进'];

export default {
  name: 'WishTreeRunning',
  components: {
    WishCard,
    EditWishPopup,
    TipPopup,
  },
  props: {
    // 轮次
    wishTreeSort: {
      type: Number,
      default: 1,
    },
    // 已发送次数
    hasSendSize: {
      type: Number,
      default: 0,
    },
    // 是否为婚礼版
    isWedding: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 祝福语数组
      wishList: DEFAULT_WISHES,
      // 当前祝福语索引
      currentWishIndex: 0,
      // 滑动方向
      slideDirection: '',
      // 模拟用户数据用于调试
      dummyUser: this.getDefaultDummyUser(),
      // 数据
      // 控制编辑愿望弹窗显示
      showEditWishPopup: false,
      // 控制提示弹窗显示
      showTipPopup: false,
      // 提示弹窗文字
      tipText: '',
      // 提示弹窗图标
      tipIconUrl: '',

    };
  },
  computed: {
    // 许愿抽奖图片地址 - 基于isWedding的计算属性
    wishLotteryImage() {
      return this.isWedding
        ? 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-title-mobile-wedding.png'
        : 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-title-mobile.png';
    },
    // 光效图片地址 - 基于isWedding的计算属性
    lightEffectImage() {
      return this.isWedding
        ? 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-light-mobile-wedding.png'
        : 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-light-mobile.png';
    },
    // 按钮图标地址 - 基于isWedding的计算属性
    buttonIcon() {
      return this.isWedding
        ? 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-right-mobile-wedding.png'
        : 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-right-mobile.png';
    },

  },
  watch: {
    // 监听器
  },
  created() {
    // 生命周期钩子
  },
  mounted() {
    console.log('许愿树运行页组件已挂载');
    console.log('当前轮次:', this.wishTreeSort);
    console.log('已发送次数:', this.hasSendSize);
    // 初始化祝福语
    this.updateWish();
  },
  methods: {
    getDefaultDummyUser() {
      const randomIndex = generateRandom(0, DEFAULT_WISHES.length);
      return {
        nickname: this.$store.state.user.name,
        avatar: this.$store.state.user.headImg,
        wish: DEFAULT_WISHES[randomIndex],
      };
    },
    // 切换到上一个祝福语
    prevWish() {
      this.slideDirection = 'right';
      setTimeout(() => {
        this.currentWishIndex = (this.currentWishIndex - 1 + this.wishList.length) % this.wishList.length;
        this.updateWish();
        this.slideDirection = 'right-in';
        setTimeout(() => {
          this.slideDirection = '';
        }, 300);
      }, 300);
    },
    // 切换到下一个祝福语
    nextWish() {
      this.slideDirection = 'left';
      setTimeout(() => {
        this.currentWishIndex = (this.currentWishIndex + 1) % this.wishList.length;
        this.updateWish();
        this.slideDirection = 'left-in';
        setTimeout(() => {
          this.slideDirection = '';
        }, 300);
      }, 300);
    },
    // 更新祝福语
    updateWish() {
      this.dummyUser.wish = this.wishList[this.currentWishIndex];
    },
    // 自定义按钮点击事件
    handleCustomClick() {
      console.log('自定义按钮被点击');
      // 显示编辑愿望弹窗
      this.showEditWishPopup = true;
    },
    // 发送按钮点击事件
    async handleSendClick() {
      console.log('发送按钮被点击');

      // 检查发送机会
      const remainingChances = 3 - this.hasSendSize;
      if (remainingChances <= 0) {
        console.log('发送机会已用完');
        // 显示抽奖机会为零的提示弹窗
        this.showZeroChanceTip();
        return;
      }

      try {
        // 调用发送祝福接口
        const response = await sendWishTree({
          content: this.dummyUser.wish,
          wish_tree_sort: this.wishTreeSort.toString(), // 轮次转为字符串
        });
        console.log('发送祝福成功:', response);

        // 发送成功后显示成功提示弹窗
        this.showSuccessTip();

        // 发送成功后发出sended事件
        this.$emit('sended');
      } catch (error) {
        console.error('发送祝福失败:', error);
      }
    },
    // 关闭编辑愿望弹窗
    closeEditWishPopup() {
      this.showEditWishPopup = false;
    },
    // 处理愿望确认事件
    handleWishConfirm(wishText) {
      console.log('用户输入的祝福语:', wishText);
      // 将新的祝福语添加到wishList中
      this.wishList.push(wishText);
      // 将当前索引设置为新添加的祝福语索引
      // todo 这里的添加逻辑需要优化
      this.currentWishIndex = this.wishList.length - 1;
      // 更新当前显示的祝福语
      this.updateWish();
      this.showEditWishPopup = false;
    },
    // 显示抽奖机会为零的提示弹窗
    showZeroChanceTip() {
      this.tipText = '您已经发了3条,不能再发哦!';
      this.tipIconUrl = this.isWedding
        ? 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-notice-wedding.png'
        : 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-notice2.png';
      this.showTipPopup = true;

      // 2秒后自动关闭弹窗
      setTimeout(() => {
        this.closeTipPopup();
      }, 2000);
    },
    // 显示发送成功提示弹窗
    showSuccessTip() {
      this.tipText = '祝福发送成功！';
      this.tipIconUrl = this.isWedding
        ? 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-yes-wedding.png'
        : 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-yes.png';
      this.showTipPopup = true;

      // 2秒后自动关闭弹窗
      setTimeout(() => {
        this.closeTipPopup();
      }, 2000);
    },
    // 关闭提示弹窗
    closeTipPopup() {
      this.showTipPopup = false;
    },
  },
};
</script>

<style lang="less" scoped>
.wish-tree-running {
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10px;
  // 运行页样式

  .light-effect-layer {
    position: absolute;
    top: -10vw;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &.wedding {
      top: -15vw;
    }

    .light-effect-img {
      width: 200vw;
      height: 200vw;
      object-fit: cover;
      animation: rotate 10s linear infinite;

      &.wedding {
        width: 150vw;
        height: 150vw;
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .wish-lottery-container {
    margin-bottom: 20px;

    .wish-lottery-img {
      width: 80vw;
      height: auto;
      display: block;
    }
  }

  .wish-card-wrapper {
    margin-top: 12vw;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .left-btn {
      width: 12vw;
      height: 12vw;
      margin-right: 3vw;
      margin-bottom: 6vw;
      cursor: pointer;

      .btn-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transform: rotate(180deg);
      }
    }

    .right-btn {
      width: 12vw;
      height: 12vw;
      margin-left: 3vw;
      margin-bottom: 6vw;
      cursor: pointer;

      .btn-icon {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .wish-card-container {
      position: relative;
      width: 60vw;
      height: 100vw;
      overflow: hidden;
    }

    .wish-card {
      z-index: 3;
      transition: transform 0.3s ease-in-out;
    }

    // 向左滑出
    .slide-out-left {
      transform: translateX(-100%);
    }

    // 向右滑出
    .slide-out-right {
      transform: translateX(100%);
    }

    // 从右向左滑入
    .slide-in-left {
      transform: translateX(100%);
      animation: slideInLeft 0.3s ease-in-out forwards;
    }

    // 从左向右滑入
    .slide-in-right {
      transform: translateX(-100%);
      animation: slideInRight 0.3s ease-in-out forwards;
    }

    @keyframes slideInLeft {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
  }

  .custom-btn {
    margin: 5vw auto 0 auto;
    width: 44vw;
    height: 9vw;
    line-height: 9vw;
    text-align: center;
    font-size: 4.2vw;
    letter-spacing: 0.2em;
    color: #d32f2f;
    font-weight: bold;
    border-radius: 25px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 0, 0),
      #fff 50%,
      rgba(255, 255, 255, 0)
    );
    z-index: 4;
    box-shadow: 0 2px 8px rgba(211, 47, 47, 0.3);
    user-select: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &.wedding {
      color: #FF3D7F;
    }
  }

  .custom-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(211, 47, 47, 0.5);
  }

  .custom-btn:active {
    transform: translateY(0);
  }

  .send-btn-container {
    margin-top: 3vw;
    background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-button2.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    width: 50vw;
    height: 20vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    z-index: 4;
    user-select: none;
    cursor: pointer;

    &.wedding {
      background-image: url('https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-button2-wedding.png');
    }
  }

  .send-btn-text {
    line-height: 20vw;
    font-size: 5vw;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 1vw;

    &.wedding {
      margin-bottom: 2vw;
    }
  }

}
  .send-chance-tip {
    margin-top: 0;
    color: #fff;
    text-align: center;
    font-size: 3.8vw;
    line-height: 1.5;
    width: 100%;
    text-shadow: 0 2px 4px rgba(0,0,0,0.18);
    font-weight: normal;
    letter-spacing: 0.05em;
  }
</style>
