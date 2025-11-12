<!-- 【兔子投篮】游戏的游戏组件（包括游戏开始前等待和游戏中两个状态） -->
<template>
  <div class="container">
    <SvgaPlayer
      v-if="gameStatus === 1"
      :style-obj="{
        width: '274px',
        height: '110px',
      }"
      :replace-image-list="[
        {
          id: 'img_10',
          image: BASKETBALL_SHOOT.replaceImg,
        },
      ]"
      :svga-file="BASKETBALL_SHOOT.waitTitle"
      class="title"
    />
    <p
      v-if="gameStatus === 1"
      class="tip"
    >
      等待主持人开始游戏
    </p>
    <!-- 分数板 -->
    <div
      v-if="gameStatus === 2"
      class="score"
    >
      <p>分数：{{ score }}</p>
    </div>
    <!-- 点击提示动画 -->
    <div class="tip-click">
      <img
        src="@/assets/image/basketball-shoot/hand.png"
        alt="to click"
        class="img"
      />
      <p class="text">
        点击投篮
      </p>
    </div>
    <canvas
      ref="stageDom"
      class="stage"
    />
  </div>
</template>

<script>
import SvgaPlayer from '@/components/SvgaPlayer.vue';
import createjs from 'createjs-cmd';
import { BASKETBALL_SHOOT } from '../assets/constant/effect';
import { BASKETBALL_SHOOT_GAME } from '../assets/constant/others';
import { preloadFileList } from '../utils/preloadFile';

const {
  pageHeight,
  pageWidth,
  designWidth,
  designHeight,
  basketWidth,
  basketTop,
  ballWidth,
  ballBottom,
  basketImg,
  ballImg,
  ballBackTime,
} = BASKETBALL_SHOOT_GAME;

// 非响应式的数据
let stage = null;
let ball = null;
let basket = null;
/** 篮筐当前移动方向 */
let basketMoveDirection = 'right';

export default {
  name: 'BasketballShootGame',
  components: {
    SvgaPlayer,
  },
  model: {
    prop: 'score',
    event: 'update:score',
  },
  props: {
    /** 当前游戏状态 */
    gameStatus: {
      type: Number,
      default: 1,
    },
    /** 游戏分数 */
    score: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      /** 兔子投篮常量 */
      BASKETBALL_SHOOT,
      /** 页面高度 */
      pageHeight,
      /** 页面宽度 */
      pageWidth,
    };
  },
  computed: {
    /** 篮筐和篮球的缩放比例 */
    scale() {
      return pageWidth / designWidth;
    },
    /** 篮筐距离顶部的距离 */
    basketTop() {
      return (pageHeight / designHeight) * basketTop;
    },
    /** 篮球距离底部的距离 */
    ballBottom() {
      return (pageHeight / designHeight) * ballBottom;
    },
  },
  watch: {
    gameStatus(val) {
      if (val === 2) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.startGame();
          });
        }, 100);
      }
    },
  },
  async mounted() {
    console.log('mounted', this.gameStatus);
    await preloadFileList([basketImg, ballImg]);
    this.init();
    if (this.gameStatus === 2) {
      this.startGame();
    }
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    // #region 初始化相关
    /**
     * 根据宽度等比缩放篮筐并返回篮筐容器
     * @param width 篮筐的宽度
     * @param offsetTop 篮筐距离顶部的距离
     * @returns {createjs.Sprite} 篮筐
     */
    createBasket(width = basketWidth, offsetTop = basketTop) {
      // 篮筐宽度
      const basketImgWidth = 120;
      // 篮筐高度
      const basketImgHeight = 103;

      const spriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        images: [basketImg],
        frames: {
          width: basketImgWidth,
          height: basketImgHeight,
          count: 25,
          regX: basketImgWidth / 2,
          regY: 0,
        },
        animations: {
          normal: 0,
          shoot: [1, 24, 'normal', 5],
        },
      });
      const basket = new createjs.Sprite(spriteSheet, 'normal');
      const scale = width / basketImgWidth;
      basket.scale = scale;
      basket.x = pageWidth / 2;
      basket.y = offsetTop;
      return basket;
    },
    createBall(width = ballWidth, offsetBottom = ballBottom) {
      // 单张篮球图片的长宽
      const ballImgWidth = 80;
      const spriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        images: [ballImg],
        frames: {
          width: ballImgWidth,
          height: ballImgWidth,
          count: 14,
          regX: ballImgWidth / 2,
          regY: ballImgWidth,
        },
        animations: {
          normal: 0,
          // 滚动动画
          rolling: [1, 13, 'rolling', 0.5],
          // 进球动画
          shoot: [1, 24, 'normal', 0.5],
        },
      });

      const ball = new createjs.Sprite(spriteSheet, 'normal');
      ball.scaleX = width / ballImgWidth;
      ball.scaleY = width / ballImgWidth;

      // 设置篮球的初始位置
      ball.x = pageWidth / 2;
      ball.y = pageHeight - offsetBottom;
      return ball;
    },
    // 初始化
    init() {
      ball = this.createBall(ballWidth * this.scale, this.ballBottom);
      ball.gotoAndPlay('rolling');
      basket = this.createBasket(this.scale * basketWidth, this.basketTop);
      console.log('this.$refs', this.$refs.stageDom);
      const { stageDom } = this.$refs;
      stageDom.width = pageWidth;
      stageDom.height = pageHeight;

      stage = new createjs.Stage(stageDom);
      stage.addChild(ball, basket);
      stage.update();
      console.log('stage', stage);

      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener('tick', stage);
    },

    // #endregion

    // #region 游戏中相关
    /**
     * 移动篮筐
     * @param {object} 篮筐
     * @param {number} delta 时间间隔
     */
    moveBasket(basket, delta) {
      const { x } = basket;
      const { width } = basket.getBounds();
      const { scale } = basket;
      if (basketMoveDirection === 'right') {
        basket.x = x + delta / 2;
        if (basket.x > pageWidth - (width * scale) / 2) {
          basketMoveDirection = 'left';
        }
      } else {
        basket.x = x - delta / 2;
        if (basket.x < (width * scale) / 2) {
          basketMoveDirection = 'right';
        }
      }
    },
    /**
     * 在特定容器上方出现加分动画
     * @param {createjs.Container} container 容器
     */
    createAddScoreAnimation(container) {
      const text = new createjs.Text('+1', 'bold 30px Arial', '#FF4365');
      text.x = container.x + container.getBounds().width / 2;
      text.y = container.y;
      text.textAlign = 'center';
      text.textBaseline = 'middle';
      stage.addChild(text);
      createjs.Tween.get(text)
        .to({ y: text.y - 50, alpha: 0 }, 1000)
        .call(() => {
          stage.removeChild(text);
        });
    },
    /**
     * 在特定横坐标位置投篮
     * @param x 横坐标位置
     */
    shoot(x = pageWidth / 2) {
      // 在点击位置创建个篮球
      const targetBallBottom = (designHeight / pageHeight) * ballBottom;
      let ball = this.createBall(ballWidth * this.scale, targetBallBottom);
      ball.x = x - ballWidth / 2;
      ball.alpha = 0;

      stage.addChild(ball);
      ball.gotoAndPlay('shoot');
      // 篮球向上运动
      createjs.Tween.get(ball)
        .to({ alpha: 2, y: this.basketTop }, ballBackTime / 2, createjs.Ease.cubicOut)
        .call(() => {
          stage.setChildIndex(ball, 0);

          let flag = true;
          // 监听篮球是否进入篮筐
          ball.addEventListener('tick', () => {
            if (flag && this.isInBasket(ball, basket)) {
              basket.gotoAndPlay('shoot');
              flag = false;
              this.createAddScoreAnimation(basket);
              ball.removeEventListener('tick');
              this.$emit('update:score', this.score + 1);
            }
          });
        })
        .to({ alpha: 0, y: pageHeight - this.ballBottom }, ballBackTime / 2, createjs.Ease.cubicIn)
        .call(() => {
          // 篮球运动结束后，移除篮球
          stage.removeChild(ball);
          ball = null;
        });
    },
    /**
     * 判断篮球是否进入篮筐
     * @param {object} ball 篮球
     * @param {object} basket 篮筐
     * @returns {boolean} 是否进入篮筐
     */
    isInBasket(ball, basket) {
      const basketRect = basket.getBounds();
      const basketX = basket.x + basketRect.x;
      const basketY = basket.y + basketRect.y;
      return ball.x > basketX && ball.x < basketX + basketRect.width && ball.y > basketY && ball.y < basketY + basketRect.height;
    },

    /** 开始游戏 */
    startGame() {
      console.log('startGame', stage);

      ball.gotoAndPlay('normal');
      createjs.Ticker.setFPS(60);
      createjs.Ticker.addEventListener('tick', (event) => {
        this.moveBasket(basket, event.delta);
      });
      // 支持触摸
      createjs.Touch.enable(stage);
      // 监听点击事件
      stage.addEventListener('stagemousedown', (event) => {
        this.shoot(event.stageX);
      });
    },

    // #endregion

    /** 销毁createjs相关内容 */
    destroy() {
      console.log('destroy');
      // 销毁舞台
      stage.removeAllChildren();
      stage.removeAllEventListeners();
      stage = null;
      // 销毁篮球
      ball.removeAllEventListeners();
      ball = null;
      // 销毁篮筐
      if (this.basketContainer) {
        this.basketContainer.removeAllChildren();
        this.basketContainer.removeAllEventListeners();
        this.basketContainer = null;
      }
      this.basket = null;

      // 销毁Tween和Ticker
      createjs.Ticker.reset();
      // 因为Ticker在reset时没有通知到Tween，所以需要手动重置
      // eslint-disable-next-line no-underscore-dangle
      createjs.Tween._inited = undefined;
      createjs.Ticker.removeAllEventListeners();
    },
  },
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  .title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    width: 274px;
    height: 73px;
  }

  .tip {
    position: absolute;
    top: 13vh;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    font-size: 30px;
    color: #ffffff;

    // 不断变化的省略号
    &::after {
      content: '';
      animation: ellipsis 1.5s infinite;

      @keyframes ellipsis {
        25% {
          content: '.';
        }

        50% {
          content: '..';
        }

        75% {
          content: '...';
        }

        100% {
          content: '';
        }
      }
    }
  }

  .score {
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffd926;
    width: 52.5641vw;
    height: 10vw;
    border-radius: 0px 0px 20px 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 6.1538vw;
    color: #ffffff;
  }

  // 点击提示动画
  .tip-click {
    position: absolute;
    bottom: 10%;
    left: 70%;
    transform: translateX(-50%);
    width: 16vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: img 1s infinite;

      @keyframes img {
        0% {
          transform: translateY(0) translateX(0);
        }

        50% {
          transform: translateY(-30px) translateX(-30px);
        }

        100% {
          transform: translateY(0) translateX(0);
        }
      }
    }

    .text {
      margin-top: 10px;
      font-size: 30px;
      font-weight: bold;
      color: rgba(#fff, 0.5);
    }
  }
}
</style>
