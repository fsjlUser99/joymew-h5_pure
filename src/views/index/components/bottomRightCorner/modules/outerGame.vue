<template>
  <div
    class="outerGame publicVCenter"
    @click="openPopup"
  >
    <img
      :src="imgIcon"
      class="outerGameIcon"
    />
  </div>
</template>

<script>
import wxApi from '@/utils/wxApi';
import { checkPermission } from './func';

const ICON = 'https://ustatic.hudongmiao.com/joymewH5/newImg/outer-game_icon.png';

export default {
  data() {
    return {
      imgIcon: ICON,
    };
  },
  methods: {
    openPopup() {
      // validate
      if (!checkPermission()) {
        return;
      }
      // action
      console.log('跳转外部游戏页面');
      _hmt.push(['_trackEvent', '右下角区域', '点击', '跳转外场游戏页面']);
      const gameParam = this.$store.getters['app/outerGameParam'];
      if (gameParam) {
        const { APPID, wxgamecid } = gameParam;
        const QUERY = encodeURIComponent(`?wxgamecid=${wxgamecid}`);
        wxApi.navigateTo(`/packageC/pages/outerLink/outerLink?appId=${APPID}&query=${QUERY}`);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.outerGame {
  flex-direction: column;
  .outerGameIcon {
    width: 112px;
    height: 116px;
  }
}
</style>
