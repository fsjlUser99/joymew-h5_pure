<template>
  <div class="qrcodeModule publicHCenter">
    <div
      class="qrcodeBox publicVCenter"
      :class="{ show: isShowAni }"
    >
      <img
        :src="qrcodeUrl"
        class="qrcodeImg"
      />
      <div class="para">
        赠人玫瑰，手留余香
      </div>
      <div class="para">
        来宾扫码不方便?
      </div>
      <div class="para">
        请让ta扫一扫,
      </div>
      <div class="para">
        会加大抢红包的几率哦!
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { timeoutTask } from '../../utils/index';

export default {
  name: 'DanmuPopup',
  computed: {
    ...mapState({
      qrcodeUrl: (state) => state.live.qrcodeUrl,
    }),
  },
  created() {},
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  data() {
    return {
      isShowAni: false, // 控制bapin box弹出动画
      content: '',
    };
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
    }),
    showAniStart() {
      timeoutTask(() => {
        this.isShowAni = true;
      }, 100);
    },
    hideAniStart() {
      this.isShowAni = false;
    },
  },
};
</script>
<style lang="less" scoped>
.qrcodeModule {
  position: absolute;
  top: 380px;
  width: 448px;
  height: 596px;
  left: 157px;
  .qrcodeBox {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 16px;
    flex-direction: column;
    left: 593px;
    transition: all 0.2s linear;
    &.show {
      transform: translateX(-593px);
    }
    .qrcodeImg {
      width: 400px;
      height: 400px;
      background: #fec84e;
      border-radius: 16px;
      margin-bottom: 25px;
      margin-top: 23px;
    }
    .para {
      font-size: 24px;
      font-weight: bold;
      color: #666666;
    }
  }
}
</style>
