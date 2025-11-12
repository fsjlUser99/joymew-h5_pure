<template>
  <!-- 放鞭炮主界面 -->
  <div class="main">
    <userScore :myRank="myRank" :currentScore="score" :nickname="nickname" :headImg="headImg" />
    <!-- 这里是游戏主容器, Phaser的canvas会注入到这里 -->
    <div ref="gameContainer" class="game-container" />
    <broad v-if="mpType && scoreAdd" :broadContent="broadContent" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Phaser from 'phaser';
import broad from '@/components/broad/index.vue';
import { sendScore } from '@/api/shake/index';
import userScore from './components/userScore.vue';

const gameCode = 'hmPlay34';
// 游戏资源 URL
const assets = {
  way: 'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/way2.png',
  smoke: 'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/smoke.png',
  fire: 'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/fire.png',
  ren: [
    'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/ren-1.png',
    'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/ren-2.png',
    'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/ren-3.png',
    'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/ren-4.png',
    'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/ren-5.png',
    'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/ren-6.png',
  ],
  bianpao: [
    'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/bianpao-1.png',
    'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/bianpao-2.png',
    'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/bianpao-3.png',
    'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/bianpao-4.png',
  ],
  // 新增资源
  rocket: 'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/rocket-icon.png',
  lizi: 'https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/lizi.png',
};

const cleanupGroup = (group) => {
  group.getChildren().forEach((sprite) => {
    if (sprite.y < -100) {
      sprite.destroy();
    }
  });
};
export default {
  name: 'ShakeMain',
  components: {
    userScore,
    broad,
  },
  data() {
    return {
      gameInstance: null, // 用于持有Phaser游戏实例
      scoreDeltaToSend: 0, // “增量桶”，用于累积待提交的分数
      score: 0, // 本次分数
      scoreAdd: 0,
      myRank: 0,
    };
  },
  computed: {
    ...mapState({
      mpType: (state) => state.app.mpType,
    }),
    broadContent() {
      return `您已通过加分宝增加${this.scoreAdd}初始积分哦～`;
    },
    nickname() {
      return this.$store.state.user.name;
    },
    headImg() {
      return this.$store.state.user.headImg;
    },
  },
  mounted() {
    // 定义一个常量来控制游戏速度，方便统一调整
    const GAME_SPEED = 8; // 增加速度使效果更明显

    // ---- Phaser 游戏场景定义 (已修正)----
    class GameScene extends Phaser.Scene {
      constructor() {
        super({ key: 'GameScene' });
        this.vue = null; // 用于存储Vue实例引用
        this.particles_bg = null; // 初始化粒子背景
      }

      // 1. 预加载资源
      preload() {
        this.load.image('way', assets.way);
        this.load.image('smoke', assets.smoke);
        this.load.image('fire', assets.fire);

        // 加载火箭图标
        this.load.image('rocket', assets.rocket);
        //  加载粒子背景
        this.load.image('lizi', assets.lizi);

        assets.ren.forEach((url, index) => {
          this.load.image(`ren-${index}`, url);
        });
        assets.bianpao.forEach((url, index) => {
          this.load.image(`bianpao-${index}`, url);
        });

        this.load.audio('boom', 'https://ustatic.hudongmiao.com/joymewH5/audio/boom.mp3');
      }

      // 2. 创建游戏对象
      create(data) {
        this.vue = data.vue;
        const wayTexture = this.textures.get('way');
        const wayOriginalWidth = wayTexture.source[0].width;

        // 创建时使用原始宽度，高度填满屏幕
        this.track = this.add.tileSprite(375, 1334 / 2, wayOriginalWidth, 1334, 'way');
        // 计算缩放比例，使其宽度撑满750px的游戏画布
        this.track.setScale(577 / wayOriginalWidth, 1);

        // 创建粒子背景层
        // 在道路之上，其他元素之下创建，以保证正确的层级
        this.particles_bg = this.add.tileSprite(375, 1334 / 2, 265, 781, 'lizi');
        // 同样进行缩放以适应道路宽度
        this.particles_bg.setScale(577 / 265, 1334 / 781);
        this.particles_bg.setAlpha(0.7); // 可以设置一些透明度让效果更柔和

        this.audiences = this.physics.add.group();
        this.firecrackers = this.physics.add.group();

        this.smokeEmitter = this.add.particles(0, 0, 'smoke', {
          speed: { min: -100, max: 100 },
          angle: { min: 0, max: 360 },
          scale: { start: 1, end: 0 },
          blendMode: 'NORMAL',
          lifespan: 800,
          emitting: false,
        });

        this.setupTimers();

        for (let y = 0; y < 1334; y += Phaser.Math.Between(300, 500)) {
          // 随机生成左边或右边的观众
          if (Math.random() > 0.4) {
            const side = Math.random() > 0.5 ? 'left' : 'right';
            const x = side === 'left' ? 50 : 750 - 50;
            const randomKey = `ren-${Phaser.Math.Between(0, 5)}`;
            const audience = this.audiences.create(x, y, randomKey);
            audience.setScale(2);
            audience.setVelocityY(GAME_SPEED * 60);
          }

          // 随机生成一个鞭炮
          if (Math.random() > 0.3) {
            this.spawnFirecrackerAt(y); // 我们把生成逻辑提炼成一个新函数
          }
        }
      }

      // 3. 游戏循环
      update() {
        this.track.tilePositionY -= GAME_SPEED;
        // 让粒子背景一起滚动
        this.particles_bg.tilePositionY -= GAME_SPEED;

        // 让物理组中的所有对象也以同样的速度向上移动
        // （由于创建时设置了速度，这里不需要再手动遍历）

        cleanupGroup(this.audiences);
        cleanupGroup(this.firecrackers);
      }

      setupTimers() {
        this.time.addEvent({
          delay: Phaser.Math.Between(800, 2000),
          callback: () => this.spawnAudience('left'),
          loop: true,
        });
        this.time.addEvent({
          delay: Phaser.Math.Between(800, 2000),
          callback: () => this.spawnAudience('right'),
          loop: true,
        });
        this.time.addEvent({
          delay: 300,
          callback: this.spawnFirecracker,
          callbackScope: this,
          loop: true,
        });
      }

      spawnAudience(side) {
        // 调整了X坐标，让人物更靠边
        const x = side === 'left' ? 50 : 750 - 50;
        const y = -100; // 从屏幕上方外部生成
        const randomKey = `ren-${Phaser.Math.Between(0, 4)}`;
        const audience = this.audiences.create(x, y, randomKey);
        audience.setScale(2);
        audience.setVelocityY(GAME_SPEED * 60); // 设置为正值，向下移动
      }

      spawnFirecrackerAt(yPos) {
        const x = Phaser.Math.Between(250, 500);
        const y = yPos; // 使用传入的y坐标

        const scoreMap = [10, 20, 30, 50];
        const crackerIndex = Phaser.Math.Between(0, 3);
        const randomKey = `bianpao-${crackerIndex}`;
        const points = scoreMap[crackerIndex];

        const cracker = this.firecrackers.create(x, y, randomKey);
        cracker.setScale(0.8);
        cracker.setData('points', points);
        cracker.setVelocityY(GAME_SPEED * 60);
        cracker.setInteractive();
        cracker.on('pointerdown', () => this.explode(cracker));
      }

      // 旧的spawnFirecracker函数现在只负责决定从哪里生成
      spawnFirecracker() {
        // 从屏幕顶部外部生成
        this.spawnFirecrackerAt(-100);
      }

      explode(cracker) {
        if (!cracker.active) return;

        this.sound.play('boom');
        const points = cracker.getData('points') || 160; // 读取分数，如果没读到给个默认值
        const { x, y } = cracker;

        cracker.destroy();

        const fireEffect = this.add.image(x, y, 'fire');
        this.tweens.add({
          targets: fireEffect,
          alpha: { from: 1, to: 0 },
          scale: { from: 1, to: 1.5 },
          duration: 400,
          onComplete: () => {
            fireEffect.destroy();
          },
        });
        // 新的、正确的方式:
        // 1. 先将发射器移动到鞭炮的位置
        this.smokeEmitter.setPosition(x, y);
        // 2. 然后调用explode，只传入粒子数量
        this.smokeEmitter.explode(20);

        // 创建分数文本和火箭图标
        const scoreText = this.add
          .text(x, y, `+${points}分`, {
            fontFamily: '"Arial Black", Arial, sans-serif',
            fontSize: '52px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 4,
          })
          .setOrigin(0.5); // 设置中心点为文本中央

        // 基于文本位置创建火箭，放在文本左边，-30为间距
        const rocketIcon = this.add.image(scoreText.x - scoreText.width / 2 - 30, y, 'rocket').setOrigin(0.5);

        // 创建动画，让分数和火箭一起向上飘动并消失
        this.tweens.add({
          targets: [scoreText, rocketIcon], // 同时作用于分数和火箭
          y: y - 100, // 向上移动的目标Y坐标
          alpha: { from: 1, to: 0 }, // 从不透明到完全透明
          duration: 800,
          ease: 'Power2',
          onComplete: () => {
            scoreText.destroy();
            rocketIcon.destroy(); // 动画结束后销毁两者
          },
        });

        if (this.vue) {
          this.vue.addScore(points);
        }
      }
    }
    const config = {
      type: Phaser.AUTO,
      width: 750,
      height: 1334,
      parent: this.$refs.gameContainer,
      transparent: true,
      physics: {
        default: 'arcade',
        arcade: {
          fps: 60, // 假定一个稳定的FPS
        },
      },
      scene: [GameScene],
    };

    // 创建游戏实例
    this.gameInstance = new Phaser.Game(config);

    // **关键：将Vue实例传递给Phaser场景**
    // 这样Phaser内部就可以通过 this.vue.addScore() 来调用Vue的方法
    this.gameInstance.scene.start('GameScene', { vue: this });

    this.intervalSubmitScore();
  },

  beforeDestroy() {
    // 组件销毁时，也要销毁Phaser游戏实例，释放资源
    if (this.gameInstance) {
      this.gameInstance.destroy(true);
      this.gameInstance = null;
    }
    clearInterval(this.tmpInterval);
  },

  methods: {
    // 这个方法会由Phaser场景调用
    addScore(points) {
      // 1. 实时更新UI上的总分，给玩家即时反馈
      this.score += points;

      // 2. 将获得的分数放入“增量桶”
      this.scoreDeltaToSend += points;
    },
    intervalSubmitScore() {
      this.tmpInterval = setInterval(() => {
        // 如果“增量桶”里没有分数，就没必要提交，节省请求
        if (this.scoreDeltaToSend === 0) {
          return;
        }
        // 1. 取出当前桶里的所有分数准备发送
        const scoreToSend = this.scoreDeltaToSend;

        // 2. 【关键】立刻清空桶。这样在API请求期间新得的分数会累积到下一次
        this.scoreDeltaToSend = 0;
        sendScore(scoreToSend, gameCode, 1)
          .then((res) => {
            console.log(res);
            this.score = res.fenshu;
            this.scoreAdd = res.addScoreInfo?.startScore || 0;
            this.myRank = res.myRank || 0;
          })
          .catch((err) => {
            console.log(err);
            // 4. 【重要】如果提交失败，需要把刚才取出的分数还回桶里，以便下次重试
            this.scoreDeltaToSend += scoreToSend;
          });
      }, 1800);
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 750px;
    height: 325px;
    background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/top-deco.png');
    background-size: 100% 100%;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 750px;
    height: 320px;
    background-image: url('https://ustatic.hudongmiao.com/joymewH5/img/playFireworks/bottom-deco.png');
    background-size: 100% 100%;
    z-index: 1;
  }

  .top-score_wrap {
    z-index: 1;
  }

  .game-container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%); // 水平居中
    width: 750px;
    height: 1334px;

    // Phaser的canvas会自动缩放以适应容器，我们让容器全屏
    /deep/ canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
