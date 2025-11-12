<template>
  <!-- 摄影师上传的照片墙 -->
  <div class="photographerWall-wrap">
    <back v-if="env === 'h5'" />
    <div class="listContent">
      <div
        v-if="imgList.length > 0"
        class="photoWallList"
      >
        <vue-scroll
          ref="vueScroll"
          :ops="options"
        >
          <div
            v-for="item in imgList"
            :key="item.id"
            v-tap="{ methods: previewImg, imgInfo: item }"
            class="photoItem"
          >
            <img :src="item.piclink_small" />
          </div>
        </vue-scroll>
      </div>
      <div
        v-if="imgList.length === 0"
        class="noUpBox"
      >
        <img
          src="@/assets/image/hd2/noUp.png"
          class="noUp"
        />
        <div class="noUpTip">
          暂无图片上传
        </div>
        <div class="waitUpTip">
          等待摄影师上传中
        </div>
      </div>
    </div>
    <div class="previewArea">
      <van-image-preview
        v-model="previewVisible"
        :images="previewList"
        class="previewArea"
      />
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant';
import { mapMutations, mapState } from 'vuex';
import { getLivePhotoInfo } from '@/api/photoWall/photoWall';
import back from '@/components/back/index.vue';

export default {
  name: 'PhotographerWallIndex',
  data() {
    return {
      options: {
        bar: {
          opacity: 0,
        },
      },
      previewVisible: false,
      imgList: [],
      previewList: [],
    };
  },
  watch: {},
  computed: {
    ...mapState({
      env: (state) => state.app.env,
    }),
  },
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
    back,
  },
  created() {
    this.getPhotoList();
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setOrigin: 'app/setOrigin',
    }),
    previewImg(pObj) {
      console.log(pObj);
      const tmpList1 = [pObj.imgInfo.piclink];
      const tmpList2 = this.imgList
        .filter((item) => {
          return item.id !== pObj.imgInfo.id;
        })
        .map((item) => {
          return item.piclink;
        });
      const tmpList3 = tmpList1.concat(tmpList2);
      this.previewList = tmpList3;
      this.previewVisible = true;
    },
    getPhotoList() {
      getLivePhotoInfo()
        .then((res) => {
          console.log(res);
          this.imgList = res.list1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
img {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;

  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
.photographerWall-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .listContent {
    position: relative;
    width: 100vw;
    height: 100vh;
    .photoWallList {
      position: relative;
      width: 100%;
      height: 90%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-top: 40px;
      .__vuescroll::v-deep {
        .__view {
          display: flex;
          flex-wrap: wrap;
          padding: 0 20px;
          align-content: flex-start;
          .photoItem {
            width: 220px;
            height: 220px;
            border-radius: 24px;
            margin-right: 14px;
            margin-bottom: 14px;
            &:nth-child(3n) {
              margin-right: 0px;
            }
            img {
              width: 100%;
              height: 100%;
              border-radius: 40px;
            }
          }
        }
      }
    }
    .noUpBox {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      .noUp {
        width: 750px;
        height: 1204px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .noUpTip {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 478px;
        font-size: 28px;
        color: #999999;
      }
      .waitUpTip {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 478px;
        font-size: 28px;
        color: #333333;
        bottom: 74px;
      }
    }
  }
  .previewArea::v-deep {
    .van-image-preview__overlay {
      background-color: rgba(0, 0, 0, 1);
    }
    .van-image-preview__index {
      font-size: 3.867vw;
      top: 4.133vw;
    }
  }
}
</style>
