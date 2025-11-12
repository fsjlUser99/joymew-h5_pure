import Phaser from 'phaser';
/**
 * 背景板：https://ustatic.hudongmiao.com/mew/common/6cb7c7d3aff64cbdbf691324cec968b0
 * 手指：https://ustatic.hudongmiao.com/mew/common/f87ea202675e4db4bc1cf0126558e4c5
 * 蛇头：https://ustatic.hudongmiao.com/mew/common/2d4fa230e8ff4316baa10b8b76e75067
 * 标题：https://ustatic.hudongmiao.com/mew/common/cfbc072fcbb94a76bd75c56f8a11f244
 * 元宝：https://ustatic.hudongmiao.com/mew/common/edcbce7849a54527ad42e0d81e3d72d3
 * 炸弹：https://ustatic.hudongmiao.com/mew/common/8eba5f5d0e8244aba33978e254f17cce
 * @date 2024-12-04
 * 吃到炸弹的声音：https://ustatic.hudongmiao.com/mew/common/6855f83fec1e4c068dfc673e79e26338
 * 吃到元宝的声音：https://ustatic.hudongmiao.com/mew/common/6efbcfc078e24fa5b070c6c67ee0dac2
 * 扫码报名的声音：https://ustatic.hudongmiao.com/mew/common/4eb30f980c7141438ae15e1d19743960
 * 游戏开始的声音：https://ustatic.hudongmiao.com/mew/common/9897696c638346fbba0e371d252e0e0b
 * 游戏结束的声音：https://ustatic.hudongmiao.com/mew/common/bbb9f6db406b4dc18afd5ceeba6627a5
 */

const resource = {
  // 手指
  fingle: 'https://ustatic.hudongmiao.com/mew/common/f87ea202675e4db4bc1cf0126558e4c5',
  // 蛇头
  player: 'https://ustatic.hudongmiao.com/mew/common/2d4fa230e8ff4316baa10b8b76e75067',
  // 炸弹
  bomb: 'https://ustatic.hudongmiao.com/mew/common/8eba5f5d0e8244aba33978e254f17cce',
  // 元宝
  yuanbao: 'https://ustatic.hudongmiao.com/mew/common/edcbce7849a54527ad42e0d81e3d72d3',
  // 背景
  background: 'https://ustatic.hudongmiao.com/mew/common/6cb7c7d3aff64cbdbf691324cec968b0',
  // 翡翠/绿宝石
  jade: 'https://ustatic.hudongmiao.com/mew/common/9a1642c77c1348728bb0045415f1be77',
  // 吃到炸弹的声音
  eatBomb: 'https://ustatic.hudongmiao.com/joymewScreen/audio/snakeGame/eatBomb.mp3',
  // 吃到元宝的声音
  eatYuanbao: 'https://ustatic.hudongmiao.com/joymewScreen/audio/snakeGame/eatYuanbao.mp3',
  // 吃到翡翠的声音
  eatJade: 'https://ustatic.hudongmiao.com/joymewScreen/audio/snakeGame/eatYuanbao2.mp3',
};
/**
 * @type {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody}
 */
let player;
/**
 * @type {Phaser.Physics.Arcade.Group}
 */
// let coin;
const radio = window.innerWidth / 750;
/**
 * @type {Array<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>}
 */
const gameObjs = [];

/**
 * 自动追踪的炸弹
 * @type {Array<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>} autoTrackBomb
 */
const autoTrackBomb = [];

/**
 *
 * @param {{
 *  onGameStart: Function
 *  onScoreChange: Function
 *  yuanbao: Number
 *  jade: Number
 *  bomb: Number
 * }} s 分数改变的回调函数
 * @returns
 */
export default function initGame({
  /**
   * 游戏初始化完成之后的回调函数
   */
  onGameStart,
  /**
   * 当分数改变的时候的回调函数
   * 参数为加分后的分数
   */
  onScoreChange,
  /**
   * 吃到翡翠加的分数
   */
  jade,
  /**
   * 吃到元宝加的分数
   */
  yuanbao,
  /**
   * 吃到炸弹扣的分数
   */
  bomb,
}) {
  /**
   * 默认情况: 元宝加2分翡翠加5分，炸弹加0分
   */
  if (!jade) {
    jade = 10;
  }
  if (!yuanbao) {
    yuanbao = 5;
  }
  if (!bomb) {
    bomb = -1;
  }
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 0,
        },
      },
    },
    scene: {
      preload() {
        this.load
          .image('player', resource.player)
          .image('bomb', resource.bomb)
          .image('yuanbao', resource.yuanbao)
          .image('jade', resource.jade)
          .image('background', resource.background)
          .audio('eatBomb', resource.eatBomb)
          .audio('eatYuanbao', resource.eatYuanbao)
          .audio('eatJade', resource.eatJade);
      },
      create() {
        const bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        player = this.physics.add.sprite(0, window.innerHeight - 71 - radio * 254, 'player').setOrigin(0, 0);
        player.setDisplaySize(radio * 230, radio * 254);
        player.body.collideWorldBounds = true;

        this.time.addEvent({
          delay: 5e3,
          loop: true,
          callback: () => {
            /**
             * 每隔一段时间生成一个追踪玩家的炸弹
             * 这个炸弹只会在生成时，朝着玩家移动的方向移动
             */
            const bombObj = this.physics.add
              .image(Phaser.Math.FloatBetween(radio * 156, window.innerWidth - radio * 156), 0, 'bomb')
              .setDisplaySize(radio * 156, radio * 156);
            const angleToPlayer = Phaser.Math.Angle.Between(
              bombObj.x,
              bombObj.y,
              player.x + player.displayWidth / 2,
              player.y + player.displayHeight / 2,
            );
            this.physics.velocityFromRotation(angleToPlayer, 200, bombObj.body.velocity);
            this.physics.add.overlap(
              player,
              bombObj,
              (_, bombObj) => {
                autoTrackBomb.forEach((i, $i) => {
                  if (i === bombObj) {
                    autoTrackBomb.splice($i, i);
                  }
                });
                onScoreChange(bomb);
                this.sound.add('eatBomb').play();
                bombObj.destroy();
                const txt = this.add
                  .text(player.x + player.displayWidth / 2, player.y, String(bomb), {
                    fontSize: `${48}px`,
                    color: '#FF000F',
                    fontStyle: 'bold',
                  })
                  .setOrigin(0.5, 0.5);
                this.tweens.add({
                  targets: txt,
                  y: txt.y - Phaser.Math.FloatBetween(50, 150),
                  x: txt.x,
                  alpha: 0,
                  scale: 0,
                  ease: 'Sine.easeInOut',
                  duration: 1e3,
                  onComplete: () => txt.destroy(),
                });
              },
              null,
              this,
            );

            autoTrackBomb.push(bombObj);
          },
        });

        this.time.addEvent({
          delay: 500,
          callback: () => {
            let obj;
            const number = Math.random();
            let objType;
            let objScore;
            /**
             * 三种，同等概率生成
             * 元宝、炸弹、翡翠
             * 炸弹下落速度偏慢，元宝和翡翠比炸弹普遍快
             * 概率如下：（具体以下面代码为准）
             * 炸弹：20%
             * 翡翠：30%
             * 元宝：50%
             */
            if (number < 0.2) {
              // 炸弹
              obj = this.physics.add
                .image(Phaser.Math.FloatBetween(radio * 156, window.innerWidth - radio * 156), 0, 'bomb')
                .setGravityY(Phaser.Math.FloatBetween(400, 450))
                .setVelocityX(Phaser.Math.FloatBetween(-100, 100))
                .setDisplaySize(156 * radio, 156 * radio);
              objType = 1;
              objScore = bomb;
            } else if (number < 0.5) {
              // 翡翠
              obj = this.physics.add
                .image(Phaser.Math.FloatBetween(radio * 156, window.innerWidth - radio * 162), 0, 'jade')
                .setGravityY(Phaser.Math.FloatBetween(500, 550))
                .setVelocityX(Phaser.Math.FloatBetween(-200, 200))
                .setDisplaySize(156 * radio, 162 * radio);
              objType = 2;
              objScore = jade;
            } else {
              // 元宝
              obj = this.physics.add
                .image(Phaser.Math.FloatBetween(radio * 136, window.innerWidth - radio * 136), 0, 'yuanbao')
                .setDisplaySize(136 * radio, 114 * radio)
                .setGravityY(Phaser.Math.FloatBetween(350, 450))
                .setVelocityX(Phaser.Math.FloatBetween(-200, 200));
              objType = 3;
              objScore = yuanbao;
            }

            gameObjs.push(obj);
            this.physics.add.overlap(
              player,
              obj,
              (_, obj) => {
                if (objType === 1) {
                  // 说明吃到了炸弹
                  onScoreChange(bomb);
                  this.sound.add('eatBomb').play();
                } else if (objType === 2) {
                  // 说明吃到了翡翠
                  onScoreChange(jade);
                  this.sound.add('eatJade').play();
                } else {
                  // 说明吃到了元宝
                  // 判断逻辑依据上述代码
                  onScoreChange(yuanbao);
                  this.sound.add('eatYuanbao').play();
                }
                /**
                 * 如果发生碰撞则移除gameObjs
                 */
                gameObjs.forEach((i, $i) => {
                  if (i === obj) {
                    gameObjs.splice($i, i);
                  }
                });
                obj.destroy();
                const txt = this.add
                  .text(player.x + player.displayWidth / 2, player.y, objScore > 0 ? `+${objScore}` : String(objScore), {
                    fontSize: `${48}px`,
                    color: '#FF000F',
                    fontStyle: 'bold',
                  })
                  .setOrigin(0.5, 0.5);

                // const endPoint = {
                //   x: Math.random() > 0.5 ? Phaser.Math.FloatBetween(50, 100) : -Phaser.Math.FloatBetween(-100, -50),
                //   y: Phaser.Math.FloatBetween(100, 200),
                // };
                // const path = new Phaser.Curves.QuadraticBezier(
                //   { x: txt.x, y: txt.y },
                //   { x: endPoint.x * Math.random(), y: endPoint.y * Math.random() },
                //   endPoint,
                // );

                this.tweens.add({
                  targets: txt,
                  y: txt.y - Phaser.Math.FloatBetween(50, 150),
                  x: txt.x,
                  alpha: 0,
                  scale: 0,
                  ease: 'Sine.easeInOut',
                  //   onUpdate({ progress }, target) {
                  //     const { x, y } = path.getPointAt(progress);
                  //     target.setPosition(x, y);
                  //   },
                  duration: 1e3,
                  //   ease: 'Bounce',
                  onComplete: () => txt.destroy(),
                });
              },
              null,
              this,
            );
          },
          callbackScope: this,
          loop: true,
        });
        /**
         * @type {Phaser.Physics.Arcade.ArcadePhysics}
         */

        if (onGameStart) {
          onGameStart();
        }
      },
      update() {
        // todo: 优化
        // player.setX(Phaser.Math.Clamp(this.input.x, player.width / 2, this.cameras.main.width - player.width / 2))
        if (this.input.x > player.displayWidth / 2 && this.input.x < window.innerWidth - player.displayWidth / 2) {
          player.setX(this.input.x - player.displayWidth / 2);
        }

        // coin.children.iterate((coin) => {
        //   if (coin.x <= 0) {
        //     coin.setVelocityX(Math.abs(coin.body.velocity.x));
        //   } else if (coin.x >= window.innerWidth) {
        //     coin.setVelocityX(-Math.abs(coin.body.velocity.x));
        //   }
        // });

        for (let i = 0; i < gameObjs.length;) {
          if (!gameObjs[i].active) {
            gameObjs.splice(i, 1);
          } else if (gameObjs[i].y > window.innerHeight) {
            gameObjs[i].destroy();
            gameObjs.splice(i, 1);
          } else {
            //   alert(gameObjs[i].x)
            if (gameObjs[i].x < 0) {
              gameObjs[i].setVelocityX(Math.abs(gameObjs[i].body.velocity.x));
            } else if (gameObjs[i].x >= window.innerWidth) {
              gameObjs[i].setVelocityX(-Math.abs(gameObjs[i].body.velocity.x));
            }
            i++;
          }
        }

        for (let i = 0; i < autoTrackBomb.length;) {
          if (!autoTrackBomb[i].active) {
            autoTrackBomb.splice(i, 1);
          } else if (autoTrackBomb[i].y > window.innerHeight) {
            autoTrackBomb[i].destroy();
            autoTrackBomb.splice(i, 1);
          } else {
            if (autoTrackBomb[i].x < 0) {
              autoTrackBomb[i].setVelocityX(Math.abs(autoTrackBomb[i].body.velocity.x));
            } else if (autoTrackBomb[i].x >= window.innerWidth) {
              autoTrackBomb[i].setVelocityX(-Math.abs(autoTrackBomb[i].body.velocity.x));
            }
            i++;
          }
        }
      },
    },
    parent: 'gs-gaming',
  });
}
