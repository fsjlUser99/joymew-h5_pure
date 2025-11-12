export const SCENE_INFO = [
  {
    sceneName: '婚礼版',
    sceneType: '0',
    // bg: require('../image/hd2/hunli-bg-new.png'),
    bg: 'https://static.hudongmiao.com/joymewH5/img/hlbg_compressed2.png',
    recommendGiftText: '送我们一个新婚祝福吧',
  },
  {
    sceneName: '中式婚礼版',
    sceneType: '91',
    bg: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/zsbgs.png',
    recommendGiftText: '送我们一个新婚祝福吧',
  },
  {
    sceneName: '年会版',
    sceneType: '1',
    bg:
      'https://static.hudongmiao.com/joymewH5/img/enterprise/bg.png',
    recommendGiftText: '送给企业一个未来祝福吧',
  },
  {
    sceneName: '生日版',
    sceneType: '2',
    bg: 'https://static.hudongmiao.com/joymewMp/joymewIndex/birthBg3.png',
    recommendGiftText: '送我一个生日祝福吧',
  },
  {
    sceneName: '宝宝宴',
    sceneType: '21',
    bg: 'https://static.hudongmiao.com/joymewH5/img/birthPhoneBg2.png',
    recommendGiftText: '送我一个生日祝福吧',
  },
  {
    sceneName: '寿宴',
    sceneType: '22',
    bg: 'https://static.joymew.com/joymewMp/joymewIndex/syMobileBg3.png',
    recommendGiftText: '送我一个生日祝福吧',
  },
  {
    sceneName: '成人礼',
    sceneType: '23',
    bg: 'https://static.joymew.com/joymewMp/joymewIndex/crlMobileBg4.png',
    recommendGiftText: '送我一个生日祝福吧',
  },
  {
    sceneName: '百露宴',
    sceneType: '24',
    bg: 'https://static.hudongmiao.com/joymewMp/bly/blyBg.png',
    recommendGiftText: '送我一个生日祝福吧',
  },
  {
    sceneName: '满月宴',
    sceneType: '25',
    bg: 'https://static.hudongmiao.com/joymewMp/myyBg.png',
    recommendGiftText: '送我一个生日祝福吧',
  },
  {
    sceneName: '圆锁宴',
    sceneType: '26',
    bg: 'https://static.hudongmiao.com/joymewMp/joymewIndex/birthBg3.png',
    recommendGiftText: '送我一个生日祝福吧',
  },
  {
    sceneName: '毕业礼',
    sceneType: '41',
    bg: 'https://static.joymew.com/joymewMp/joymewIndex/bydlMobileBg.png',
    recommendGiftText: '送我一个毕业祝福吧',
  },
  {
    sceneName: '谢师宴',
    sceneType: '42',
    bg: 'https://static.joymew.com/joymewMp/joymewIndex/xsyMobileBg.png',
    recommendGiftText: '送我一个祝福吧',
  },
  {
    sceneName: '金榜题名',
    sceneType: '43',
    bg: 'https://static.joymew.com/joymewMp/joymewIndex/jbtmMobileBg2.png',
    recommendGiftText: '送我一个祝福吧',
  },
  {
    sceneName: '同学会',
    sceneType: '51',
    bg: 'https://static.joymew.com/joymewMp/joymewIndex/txhBg.png',
    recommendGiftText: '送我一个祝福吧',
  },
  {
    sceneName: '乔迁宴',
    sceneType: '52',
    bg: 'https://static.joymew.com/joymewMp/joymewIndex/qqyBg.png',
    recommendGiftText: '送我一个祝福吧',
  },
  {
    sceneName: '会销',
    sceneType: '53',
    bg: 'https://static.joymew.com/joymewMp/joymewIndex/hxBg.png',
    recommendGiftText: '送我一个祝福吧',
  },
  {
    sceneName: '订婚宴',
    sceneType: '54',
    bg: 'https://static.joymew.com/joymewMp/joymewIndex/dhyMobileBg.png',
    recommendGiftText: '送我一个祝福吧',
  },
  {
    sceneName: '文旅版',
    sceneType: '55',
    bg: 'https://ustatic.hudongmiao.com/joymewMp/joymewIndex/wlInnerBg.png',
    recommendGiftText: '送我一个祝福吧',
  },
];
export const getSceneInfoBySceneType = (pSceneType) => {
  const tmpLen = SCENE_INFO.length;
  let tmpObj = null;
  for (let i = 0; i < tmpLen; i += 1) {
    if (SCENE_INFO[i].sceneType === pSceneType) {
      tmpObj = SCENE_INFO[i];
      break;
    }
  }
  return tmpObj;
};
