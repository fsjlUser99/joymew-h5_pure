// ------regionStart(亲友)------

const RELATIVES = {
  0: '亲友',
  1: '父母',
  2: '舅舅',
  3: '叔叔',
  4: '伯伯',
  5: '阿姨',
  6: '姐妹',
  7: '兄弟',
  8: '朋友',
  9: '同学',
  10: '师长',
  11: '同事',
  12: '自定义',
};

/**
 * type取值格式 1(男方亲友),2(女方亲友),''或者1-1(表示男方父母)、2-1(表示女方父母)
 */
const getRelativeTypeLabel = (type) => {
  if (type.includes('-')) {
    const tmpSubTypeInfos = type.split('-');
    const firstLevelType = tmpSubTypeInfos[0];
    const secondLevelType = tmpSubTypeInfos[1];
    const firstLevelTypeLabel = firstLevelType === '1' ? '男方' : '女方';
    let secondLevelTypeLabel;
    if (/^\d+$/.test(secondLevelType)) {
      secondLevelTypeLabel = RELATIVES[secondLevelType];
    } else {
      secondLevelTypeLabel = secondLevelType;
    }
    return `${firstLevelTypeLabel}${secondLevelTypeLabel}`;
  }
  if (type === '1') {
    return '男方亲友';
  }
  if (type === '2') {
    return '女方亲友';
  }
  return '';
};

/**
 * 获取亲友信息
 */
export const getRelativeInfo = (type) => {
  return {
    relativeType: type || '',
    relativeTypeLabel: getRelativeTypeLabel(type),
  };
};

// ------regionEnd(亲友)------

// ------regionStart(礼物信息)------
/**
 * 聊天记录中的礼物图标(通用)
 */
const CHAT_ICON = {
  bapin: 'https://ustatic.joymew.com/joymewScreen/hd2/bapinIconNew.png',
  photo: 'https://ustatic.joymew.com/joymewScreen/hd2/photoIconNew.png',
  rocket: 'https://ustatic.joymew.com/joymewScreen/hd2/danmuIconNew.png',
  superDanmu: 'https://ustatic.joymew.com/joymewScreen/hd2/superDanmuIcon.png',
  hbkd: 'https://ustatic.joymew.com/joymewScreen/hd2/hbkdIconNew.png',
  photoWall: 'https://ustatic.joymew.com/joymewScreen/hd2/photoWallIconNew.png',
};
/**
 * 中式婚礼版聊天记中的图标
 */
const CHATICON_ZSHL = {
  bapin: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/zfhfIconEtry.png',
  photo: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/photoIcon.png',
  rocket: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/zsdm.png',
  superDanmu: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/allScreenIcon.png',
  hbkd: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/hbkdIcon.png',
  photoWall: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/photoInstant.png',
};
/**
 * 获取霸气弹幕名称
 */
const getBqName = ({ giftId, sceneType }) => {
  if (sceneType === '91') {
    const DANMU_NAME = ['飞龙在天', '有凤来仪', '麒麟送子'];
    const targetNum = Number(giftId.split('_')[2]);
    return DANMU_NAME[targetNum - 1];
  }
  return '火箭弹幕';
};

/**
 * 获取礼物图片
 */
const getGiftImg = ({ giftType, giftId, sceneType }) => {
  if (sceneType === '91') {
    if (giftId.includes('Miao_Bq')) {
      const XR_DANMUS = [
        'https://ustatic.joymew.com/joymewMp/zshl/danmu/dragonIcon.png',
        'https://ustatic.joymew.com/joymewMp/zshl/danmu/phonixIcon.png',
        'https://ustatic.joymew.com/joymewMp/zshl/danmu/sklinIcon.png',
      ];
      const targetNum = Number(giftId.split('_')[2]);
      return XR_DANMUS[targetNum - 1];
    }
    return CHATICON_ZSHL[giftType];
  }
  return CHAT_ICON[giftType];
};
/**
 * 根据已知条件获取礼物信息
 */
const judgeAndGetGiftInfo = ({ giftId, sceneType, giftListAll }) => {
  const giftInfo = {
    giftName: '',
    giftType: '',
    giftImg: '',
  };
  if (giftId.includes('Miao_Bp')) {
    giftInfo.giftName = '祝福横幅';
    giftInfo.giftType = 'bapin';
    giftInfo.giftImg = getGiftImg({ giftType: giftInfo.giftType, giftId, sceneType });
  } else if (giftId.includes('Miao_Tp')) {
    giftInfo.giftName = '照片霸屏';
    giftInfo.giftType = 'photo';
    giftInfo.giftImg = getGiftImg({ giftType: giftInfo.giftType, giftId, sceneType });
  } else if (giftId.includes('Miao_Bq')) {
    giftInfo.giftName = getBqName({ giftId, sceneType });
    giftInfo.giftType = 'rocket';
    giftInfo.giftImg = getGiftImg({ giftType: giftInfo.giftType, giftId, sceneType });
  } else if (giftId.includes('Miao_SuperDanmu')) {
    giftInfo.giftName = '超级弹幕';
    giftInfo.giftType = 'superDanmu';
    giftInfo.giftImg = getGiftImg({ giftType: giftInfo.giftType, giftId, sceneType });
  } else if (giftId.includes('hbkd')) {
    giftInfo.giftName = '红包';
    giftInfo.giftType = 'hbkd';
    giftInfo.giftImg = getGiftImg({ giftType: giftInfo.giftType, giftId, sceneType });
  } else if (giftId.includes('Miao_PhotoWall')) {
    giftInfo.giftName = '照片墙';
    giftInfo.giftType = 'photoWall';
    giftInfo.giftImg = getGiftImg({ giftType: giftInfo.giftType, giftId, sceneType });
  } else if (giftId) {
    const tmpGift = giftListAll.find((item) => item.giftconst === giftId);
    if (tmpGift) {
      giftInfo.giftName = tmpGift.giftname;
      giftInfo.giftType = 'gift';
      giftInfo.giftImg = tmpGift.imglink;
    }
  }

  return giftInfo;
};

/**
 * 获取礼物信息
 */
export const getGiftInfo = ({ giftId, sceneType, giftListAll }) => {
  if (!giftId) {
    return {};
  }
  const { giftName, giftType, giftImg } = judgeAndGetGiftInfo({ giftId, sceneType, giftListAll });
  return {
    giftName,
    giftType,
    giftImg,
  };
};

// ------regionEnd(礼物信息)------
