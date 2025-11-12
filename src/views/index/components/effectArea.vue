<template>
  <div class="effectArea publicZIndexEffectArea">
    <!-- 进场效果 -->
    <enterEffect />
    <!-- 霸屏 -->
    <Bapin />
    <!-- 祝福礼物 -->
    <div class="giftContainer">
      <div
        ref="svgaContainer"
        class="svgaContainer"
      />
      <div
        ref="vapContainer"
        class="vapContainer"
      />
    </div>
    <!-- 霸气弹幕 -->
    <Danmu />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SVGA from 'svgaplayerweb';
import Danmu from '@/components/Danmu/index.vue';
import Bapin from '@/components/Bapin/index.vue';
import enterEffect from '@/components/enterEffect/index.vue';
import Vap from 'video-animation-player';
import { getJsonConfig } from '@/api/index/index';

export default {
  name: 'EffectArea',
  computed: {
    ...mapState({
      currentGiftEffect: (state) => state.live.currentGiftEffect,
    }),
  },
  components: {
    Danmu,
    Bapin,
    enterEffect,
  },
  mounted() {
    // window.playVap = this.playVap;
    this.deviceWidth = window.innerWidth;
    this.vapGiftHeight = this.deviceWidth * 1.778667;
  },
  watch: {
    currentGiftEffect(newVal) {
      if (!newVal.id) {
        return;
      }
      console.log('***currentGiftEffect***');
      console.log(newVal);
      this.playGiftDanmu(newVal);
      const regex = /vap\/[^/]+\.mp4$/;
      // vap格式的礼物去寻找svga格式礼物
      if (regex.test(newVal.path)) {
        newVal.path = newVal.path.replace('mp4', 'svga');
      }
      this.playSvga(newVal.path);
    },
  },
  methods: {
    playSvga(path) {
      this.SVGAPlayer = new SVGA.Player(this.$refs.svgaContainer);
      this.SVGAPlayer.loops = 1;
      this.SVGAPlayer.onFinished(() => {
        this.$store.commit('live/removeFromGiftQueue');
        this.SVGAPlayer.stopAnimation();
        this.SVGAPlayer.clear();
        this.SVGAPlayer = null;
        try {
          window.Howler.unload();
        } catch (err) {
          console.log(err);
        }
      });

      this.$svgaParser.load(path, (videoItem) => {
        this.SVGAPlayer.setVideoItem(videoItem);
        this.SVGAPlayer.startAnimation();
      });
    },
    playVap(videoPath) {
      // const videoPath =
      //   `https://static.joymew.com/${num}.mp4`;
      // const jsonPath =
      //   `https://static.joymew.com/${num}.json`;
      const jsonPath = videoPath.replace('mp4', 'json');
      getJsonConfig(jsonPath).then((res) => {
        console.log(res.data);
        let vap = new Vap({
          container: this.$refs.vapContainer,
          src: videoPath,
          config: res.data,
          width: this.deviceWidth,
          height: this.vapGiftHeight,
          loop: false,
          onLoadError: (err) => {
            console.log(err);
            vap.destroy();
            vap = null;
            this.$store.commit('live/removeFromGiftQueue');
          },
        });
        vap.play();
        vap.on('ended', () => {
          console.log('销毁');
          vap.destroy();
          vap = null;
          this.$store.commit('live/removeFromGiftQueue');
        });
      });
    },
    playGiftDanmu(pObj) {
      this.$createGiftDanmu({
        nickname: pObj.userName,
        headImg: pObj.headImg,
        giftName: pObj.giftName,
        giftImg: pObj.imgPath,
        shijian: pObj.shijian,
        miaoColor: pObj.miaoColor,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.effectArea {
  position: absolute;
  height: 100%;
  width: 100%;
  pointer-events: none;
  .giftContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    .svgaContainer {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .vapContainer {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
