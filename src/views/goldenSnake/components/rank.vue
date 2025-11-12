<template>
  <div class="gl-rank">
    <div class="gl-whiteboard">
      <img
        class="gl-wb-top"
        src="https://ustatic.hudongmiao.com/mew/common/8637bd6da0e746068ba87f8449995760"
      />
      <div class="gl-winner">
        <div class="one">
          <img :src="rankList[1].avator" />
          <img src="https://ustatic.hudongmiao.com/mew/common/7469e0dac8f44bb4ae760a898d7a63f6" />
          <span>{{rankList[1].wx_name}}</span>
          <span>{{rankList[1].score}}分</span>
        </div>
        <div class="two">
          <img :src="rankList[0].avator" />
          <img
            src="https://ustatic.hudongmiao.com/mew/common/984cbc420ac84067a5230c163add1695"
          />
          <span>{{rankList[0].wx_name}}</span>
          <span>{{rankList[0].score}}分</span>
        </div>
        <div class="three">
          <img :src="rankList[2].avator" />
          <img
            src="https://ustatic.hudongmiao.com/mew/common/170d3c3b1bac422ba12d8de6dea60018"
          />
          <span>{{rankList[2].wx_name}}</span>
          <span>{{rankList[2].score}}分</span>
        </div>
      </div>
      <div class="gl-winner-bottom">
        <div
          v-for="(item, index) in rankList.slice(3,10)"
          :key="index"
          class="item"
        >
          <div class="left">
            <img
              :src="item.avator"
            />
            <span>{{index + 4}}</span>
          </div>
          <div class="center">{{item.wx_name}}</div>
          <div class="right">{{item.score}}分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 第一名:https://ustatic.hudongmiao.com/mew/common/984cbc420ac84067a5230c163add1695
 * 第二名:https://ustatic.hudongmiao.com/mew/common/7469e0dac8f44bb4ae760a898d7a63f6
 * 第三名:https://ustatic.hudongmiao.com/mew/common/170d3c3b1bac422ba12d8de6dea60018
 * 排行榜白板：https://ustatic.hudongmiao.com/mew/common/2a9dc9b57e0f4b3990bc78f40ab1033e
 * 排行榜头部：https://ustatic.hudongmiao.com/mew/common/8637bd6da0e746068ba87f8449995760
 *
 */
import { getRank } from '@/api/shake/index';

export default {
  async created() {
    /**
     * @type {Array<{
     *  avator: String;
     *  score: Number;
     *  wx_name: String;
     * }>} data
     */
    const { list } = await getRank('hmPlay32');
    list.forEach((item, index) => { this.$set(this.rankList, index, item); });
    // console.eror(this.data);
    // alert(JSON.stringify(this.rankList));
  },
  data: () => ({
    rankList: new Array(10).fill({
      avator: 'https://ustatic.joymew.com/joymewScreen/screenImage/defaultHeadImg.png',
      wx_name: '虚以待位',
      score: 0,
    }),
  }),
  methods: {},
};
</script>

<style scoped lang="less">
.gl-rank {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  .gl-whiteboard {
    background-image: url(https://ustatic.hudongmiao.com/mew/common/2a9dc9b57e0f4b3990bc78f40ab1033e);
    background-size: 100% 100%;
    width: 716px;
    height: calc(100% - 224px - 128px);
    margin: 224px 0 0 0;
    position: relative;
    padding-top: 148px;
    display: flex;
    flex-direction: column;
    .gl-wb-top {
      width: 610px;
      height: 160px;
      position: absolute;
      top: -122px;
      left: 50%;
      transform: translateX(-50%);
    }

    .gl-winner {
      display: flex;
      justify-content: space-around;
      > div {
        display: flex;
        flex-direction: column;
        height: fit-content;
        > span:nth-child(3) {
          z-index: 10;
          margin-top: -12px;
          width: 124px;
          height: 32px;
          background: linear-gradient(90deg, #ffc58e, #ff596f 100%);
          border: 0.96px solid;
          border-image: linear-gradient(103deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 100%) 0.47999992966651917
            0.47999992966651917;
          border-radius: 46px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: white;
          font-size: 16px;
          font-weight: 600;
          padding: 6px 16px;
          box-sizing: border-box;
          text-align: center;
        }

        > span:nth-child(4) {
          margin-top: 40px;
          width: 100%;
          text-align: center;
          color: #ff3e55;
          // position: absolute;
          // bottom: -60px;
          white-space: nowrap;
          // left: 50%;
          // transform: translateX(-50%);
          font-weight: 700;
          font-size: 32px;
        }
      }
      .one {
        position: relative;
        > img:first-child {
          width: 122px;
          height: 122px;
          border-radius: 50%;
        }

        > img:nth-child(2) {
          width: 212px;
          height: 212px;
          position: absolute;
          left: -29px;
          top: -61px;
        }
      }

      .two {
        position: relative;
        transform: translateY(-66px);
        > img:first-child {
          width: 135px;
          height: 135px;
          border-radius: 50%;
        }

        > img:nth-child(2) {
          width: 228px;
          height: 230px;
          position: absolute;
          left: -28px;
          top: -65.5px;
        }
      }

      .three {
        position: relative;
        > img:first-child {
          width: 108px;
          height: 108px;
          border-radius: 50%;
        }

        > img:nth-child(2) {
          width: 192px;
          height: 194px;
          position: absolute;
          left: -28px;
          top: -57px;
        }
      }
    }

    .gl-winner-bottom {
      margin-top: 35px;
      margin-bottom: 72px;
      //   background-color: red;
      flex: 1 1 0;
      overflow: scroll;
      .item:first-child {
        margin-top: 0;
      }
      .item {
        height: 100px;
        display: flex;
        align-items: center;
        padding: 0 74px 0 42px;
        margin-top: 32px;

        .left {
          width: 100px;
          height: 100px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 4px solid #ff7989;
          }
          span {
            position: absolute;
            bottom: -18px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(180deg, #ff9191, #ff4242 100%);
            border: 2px solid #ffec86;
            width: 36px;
            height: 36px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 24px;
            box-sizing: border-box;
          }
        }

        .center {
          flex: 1 1 0;
          padding: 0 22px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #333333;
          font-size: 32px;
        }

        .right {
          font-size: 40px;
          font-weight: 700;
          color: #ff3e55;
        }
      }
    }
  }
}
</style>
