// 其他的一些常量
import BasketImg from '@/assets/image/basketball-shoot/basket-goal-ani.png';
import BallImg from '@/assets/image/basketball-shoot/shoot-ball-ani.png';

/** 兔子投篮游戏相关常量 */
export const BASKETBALL_SHOOT_GAME = {
  /** 页面宽度 */
  pageWidth: document.documentElement.clientWidth,
  /** 页面高度 */
  pageHeight: document.documentElement.clientHeight,
  /** 原始设计稿宽度 */
  designWidth: 375,
  /** 原始设计稿高度 */
  designHeight: 812,
  /** 原始篮筐宽度 */
  basketWidth: 99,
  /** 原始篮筐距上边界距离 */
  basketTop: 185,
  /** 原始篮球宽度 */
  ballWidth: 90,
  /** 原始篮球距下边界距离 */
  ballBottom: 240,
  /** 篮筐图片（精灵图） */
  basketImg: BasketImg,
  /** 篮球图片 */
  ballImg: BallImg,
  /** 篮筐单次循环的时间 */
  basketMoveTime: 2000,
  /** 篮球抛出后回到底部的时间 */
  ballBackTime: 1000,
};
