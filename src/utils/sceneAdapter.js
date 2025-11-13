import { WISH } from '@/assets/constant/index';

/**
 * 根据场景类型获取对应的别名(alias)
 * 这个函数作为适配器，避免了重新创建完整的sceneInfo.js文件
 * 它利用了已有的WISH对象和getWishBySceneType函数中的映射关系
 * 
 * @param {string} sceneType 场景类型
 * @returns {string} 对应的别名，如果找不到则返回默认值'wedding'
 */
export const getAliasBySceneType = (sceneType) => {
  // 根据sceneType映射到对应的alias
  // 这个映射关系与getWishBySceneType函数中的映射保持一致
  const sceneTypeToAliasMap = {
    '0': 'wedding',      // 婚礼版
    '1': 'annualMeeting', // 企业版
    '2': 'birth',         // 生日版(通用)
    '21': 'bby',          // 宝宝宴
    '22': 'sy',           // 寿宴
    '23': 'crl',          // 成人礼
    '24': 'bly',          // 百露宴
    '25': 'myy',          // 满月宴
    '26': 'birth',        // 圆锁宴
    '41': 'bydl',         // 毕业典礼
    '42': 'xsy',          // 谢师宴
    '43': 'jbtm',         // 金榜题名
    '51': 'txh',          // 同学会
    '52': 'qqy',          // 乔迁宴
    '53': 'hx',           // 会销
    '54': 'dhy',          // 订婚宴
    '55': 'wl',           // 文旅版
    '91': 'zshl',         // 婚礼版(中式)
  };

  // 返回对应的alias，如果找不到则返回默认值'wedding'
  return sceneTypeToAliasMap[sceneType] || 'wedding';
};

/**
 * 获取场景信息对象，模拟sceneInfo.js的结构
 * 这个函数返回一个包含alias属性的对象，与sceneInfo.js的结构兼容
 * 
 * @param {string} sceneType 场景类型
 * @returns {Object} 包含alias属性的对象
 */
export const getSceneInfoBySceneType = (sceneType) => {
  const alias = getAliasBySceneType(sceneType);
  
  // 返回与sceneInfo.js兼容的结构
  return {
    alias,
    // 可以根据需要添加其他属性
    sceneType,
  };
};

/**
 * 获取所有可用的场景类型和别名的映射
 * 
 * @returns {Object} 场景类型到别名的映射对象
 */
export const getAllSceneTypeAliases = () => {
  return {
    '0': 'wedding',
    '1': 'annualMeeting',
    '2': 'birth',
    '21': 'bby',
    '22': 'sy',
    '23': 'crl',
    '24': 'bly',
    '25': 'myy',
    '26': 'birth',
    '41': 'bydl',
    '42': 'xsy',
    '43': 'jbtm',
    '51': 'txh',
    '52': 'qqy',
    '53': 'hx',
    '54': 'dhy',
    '55': 'wl',
    '91': 'zshl',
  };
};