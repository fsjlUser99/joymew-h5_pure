import store from '@/store/index';

/**
 * 新旧url映射对象
 * {
 *   页面名称: {
 *     'old': pageInfo-a,
 *     'new': pageInfo-b
 *   }
 * }
 *
 * pageInfo: string | object
 *     string: 页面路径
 *     object: 多个页面路径、根据具体业务选择对应的页面地址
 *
 */
export const URL_MAP = {
  recharge: {
    old: {
      wedding: '/pages/recharge2/recharge2',
      other: '/pages/recharge/recharge',
    },
    new: {
      wedding: '/packageA/pages/rechargeWedding/rechargeWedding',
      other: '/packageA/pages/recharge/recharge',
    },
  },
  hbkdRecharge: {
    old: {
      template: '/pages/hbkdRechargeNew/hbkdRechargeNew',
      other: '/pages/hbkdRecharge/hbkdRecharge',
    },
    new: '/packageA/pages/hbkdRecharge/hbkdRecharge',
  },
};

/**
 * 调整游戏地址
 * @param {Object} gameInfo
 * gameInfo: {
 *   enterType: 'h5' | 'mp',
 *   gameUrl: string,
 *   needShake: boolean
 * }
 * @returns {void}
 * @description 调整gameInfo中的gameUrl
 */
export const tmpAdjustGameUrl = (gameInfo) => {
  const { gameUrl: oldGameUrl } = gameInfo;
  const newGameUrl = `/packageGame${oldGameUrl}`;
  gameInfo.gameUrl = newGameUrl;
};

/**
 * 对象转queryParam
 * {a:1,b:2,c:3} => a=1&b=2&c=3
 * @returns {string}
 */
const objectToQueryParam = (obj) => {
  return Object.keys(obj).map((key) => `${key}=${obj[key]}`).join('&');
};

/**
 * 根据业务参数得到页面信息类型
 * @returns {'wedding' | 'other' | 'template'}
 */
const getPageInfoTypeByService = (pageName, queryObj, options) => {
  if (pageName === 'recharge') {
    const { sceneType, isTql } = options;
    if (sceneType === '0' && !isTql) {
      return 'wedding';
    }
    return 'other';
  }
  if (pageName === 'hbkdRecharge') {
    const { templateMode } = queryObj;
    if (templateMode) {
      return 'template';
    }
    return 'other';
  }
  return undefined;
};

/**
 * 获取新的url
 * @param {String} pageName 页面名称
 * @param {Object} queryObj 跳转页面携带的参数
 */
export const tmpGetNewUrl = (pageName, queryObj) => {
  let targetPath;
  // 1、从URL_MAP中得到页面信息
  const isHltValid = store.state.app.isHlt;
  const pageInfo = store.state.app.mpType || isHltValid ? URL_MAP[pageName].new : URL_MAP[pageName].old;

  // 2、逻辑分支：页面信息的类型是对象还是字符串
  if (typeof pageInfo === 'string') {
    // 如果是字符串 直接作为目标路径
    targetPath = pageInfo;
  } else {
    // 如果是对象 根据页面名称、业务参数获取到对应的页面信息类型
        const pageInfoType = getPageInfoTypeByService(pageName, queryObj, {
          sceneType: store.state.live.sceneType,
          isTql: store.getters['user/isTql'],
        });
    // 根据类型得到目标路径
    targetPath = pageInfo[pageInfoType];
  }
  // 3、拼接路径和参数得到最终跳转地址
  return `${targetPath}?${objectToQueryParam(queryObj)}`;
};
