<template>
  <!-- 许愿树抽奖 -->
  <div class="wish-tree-lottery-wrap">
    <!-- 背景组件 -->
    <wishTreeLotteryBg :bgImage="currentBgImage" />
    <!-- 运行页组件 -->
    <wishTreeRunning
      :wish-tree-sort="wishTreeData.wishTreeSort"
      :has-send-size="wishTreeData.hasSendSize"
      :isWedding="isWedding"
      @sended="handleWishSended"
    />
    <!-- 弹窗组件 -->
    <tipPopup
      :visible="showTipPopup"
      :text="'游戏还未开始，请稍后！'"
      :iconUrl="tipIconUrl"
      :isWedding="isWedding"
      @close="showTipPopup = false"
    />
    <!-- 抽奖结果弹窗 -->
    <resultWishPopup
      :visible="hasWishTreeLucky"
      :status="lotteryResult"
       :isWedding="isWedding"
      @close="hasWishTreeLucky = false"
    />
  </div>
</template>

<script>
import { otherMessageHandler } from '@/utils/websocket/handleMessage';
import wishTreeLotteryBg from './component/wishTreeLotteryBg.vue';
import wishTreeRunning from './component/wishTreeRuning.vue';
import tipPopup from './component/tipPopup.vue';
import resultWishPopup from './component/resultWishPopup.vue';
import { getWishTreeStatus, getWishTreeResult } from './api';
import { isWeddingVersion } from './utils';

export default {
  name: 'WishTreeLotteryIndex',
  computed: {
    // 判断是否为婚礼版
    isWedding() {
      return isWeddingVersion();
    },
    // 根据当前状态返回对应的背景图片
    currentBgImage() {
      // 根据是否为婚礼版返回不同的背景图片
      if (this.isWedding) {
        return 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-bg-mobile-wedding.png';
      }
      return 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-bg-mobile.png';
    },
    // 提示弹窗图标地址 - 基于isWedding的计算属性
    tipIconUrl() {
      return this.isWedding
        ? 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-notice-wedding.png'
        : 'https://ustatic.hudongmiao.com/joymewH5/newImg/wishTree/wishtree-notice2.png';
    },
  },
  components: {
    wishTreeLotteryBg,
    wishTreeRunning,
    tipPopup,
    resultWishPopup,
  },
  data() {
    return {
      // 当前游戏状态，默认开始状态
      currentStatus: 2, // 修改为结束状态用于调试
      // 弹窗显示状态
      showTipPopup: false,
      // 愿望树数据
      wishTreeData: {
        hasSendSize: 0, // 已经发送的次数
        wishTreeSort: 1, // 轮次
      },
      hasWishTreeLucky: false,
      lotteryResult: 0, // 0: 未中奖, 1: 中奖
    };
  },
  watch: {
    // 监听器
  },
  created() {
    // 生命周期钩子
  },
  beforeDestroy() {
    otherMessageHandler.off(this.handleToShowResult);
  },
  async mounted() {
    console.log('许愿树抽奖');

    try {
      const response = await getWishTreeStatus();
      console.log('愿望树状态响应:', response);
      // 存储愿望树初始化数据
      if (response) {
        this.wishTreeData.hasSendSize = parseInt(response.has_send_size, 10) || 0;
        this.wishTreeData.wishTreeSort = parseInt(response.wish_tree_sort, 10) || 1;
        console.log('愿望树数据已更新:', this.wishTreeData);
        otherMessageHandler.on(this.handleToShowResult);
      }
    } catch (error) {
      console.error('获取愿望树状态失败:', error);
    }
  },
  methods: {
    // 处理愿望发送完成事件
    handleWishSended() {
      console.log('收到愿望发送完成事件');
      // 手动增加已发送次数
      this.wishTreeData.hasSendSize += 1;
      console.log('愿望树数据已更新:', this.wishTreeData);
    },
    handleToShowResult(msg) {
      if (msg?.data?.data?.action === 'wishTreeCanGetResult') {
        this.checkLotteryResult();
      }
    },
    async checkLotteryResult() {
      try {
        const response = await getWishTreeResult();
        console.log('愿望树结果响应:', response);
        if (response.myWinningRecordList && response.myWinningRecordList.length) {
          this.lotteryResult = 1; // 设置为中奖状态
        } else {
          this.lotteryResult = 0; // 设置为未中奖状态
        }
        this.hasWishTreeLucky = true;
      } catch (error) {
        console.error('获取愿望树结果失败:', error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wish-tree-lottery-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
