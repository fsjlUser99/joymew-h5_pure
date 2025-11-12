/** 获取 [min, max) 区间的任意整数 */
export const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
