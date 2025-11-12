import { generateRandom } from '@/utils/index';
import { QUICKWISHES } from '@/assets/constant/index';

const SCENETYPE_CLASSNAME_MAP = [
  {
    sceneType: '0',
    className: 'wedding',
  },
  {
    sceneType: '1',
    className: 'annualMeeting',
  },
  {
    sceneType: '2',
    className: 'birth',
  },
  {
    sceneType: '21',
    className: 'bby',
  },
  {
    sceneType: '22',
    className: 'sy',
  },
  {
    sceneType: '23',
    className: 'crl',
  },
  {
    sceneType: '24',
    className: 'bly',
  },
  {
    sceneType: '25',
    className: 'myy',
  },
  {
    sceneType: '26',
    className: 'birth', // 圆锁宴版本 样式和生日通用一致
  },
  {
    sceneType: '41',
    className: 'bydl',
  },
  {
    sceneType: '42',
    className: 'xsy',
  },
  {
    sceneType: '43',
    className: 'jbtm',
  },
  {
    sceneType: '51',
    className: 'txh',
  },
  {
    sceneType: '52',
    className: 'qqy',
  },
  {
    sceneType: '53',
    className: 'hx',
  },
  {
    sceneType: '54',
    className: 'dhy',
  },
  {
    sceneType: '55',
    className: 'wl',
  },
  {
    sceneType: '91',
    className: 'zshl',
  },
];

/**
 * 辅助方法
 * @param {*} customSignWish 自定义祝福语
 * @returns
 */
const getWishesFromCustomWish = (customSignWish) => {
  const tmpWishes = [];
  const tmpSignWishes = customSignWish.map((item) => item.bless_str);
  const tmpLen = tmpSignWishes.length;
  for (let i = 0; i < 3; i++) {
    tmpWishes.push(tmpSignWishes[generateRandom(0, tmpLen)]);
  }
  return tmpWishes;
};

/**
 * 辅助方法
 * @param {*} sourceQuickWishOfScene 当前版本下的默认祝福语
 * @returns
 */
const getWishesFromDefaultWish = (defaultWish) => {
  const tmpWishes = [];
  const tmpLen = defaultWish.length;
  for (let i = 0; i < 3; i++) {
    tmpWishes.push(defaultWish[generateRandom(0, tmpLen)]);
  }
  return tmpWishes;
};

/**
 * 根据版本类名生成默认祝福语
 */
export const generateDefaultWishes = (sceneClassName) => {
  return QUICKWISHES[sceneClassName];
};

/**
 * 获取场景对应的类名
 */
export const getSceneClassName = (sceneType) => {
  const tmpClassNameMap = SCENETYPE_CLASSNAME_MAP.find((item) => item.sceneType === sceneType);
  return tmpClassNameMap.className;
};

/**
 * 获取快捷祝福语
 */
export const getWishes = (defaultWish, customSignWish) => {
  if (customSignWish.length > 0) {
    return getWishesFromCustomWish(customSignWish);
  }
  return getWishesFromDefaultWish(defaultWish);
};
