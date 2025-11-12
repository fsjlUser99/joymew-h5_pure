// 题库
const questions = [
  {
    mahjongSubjectList: [21, 22, 23, 24, 24, 25, 26, 27, 28, 28, 28, 28, 29],
    mahjongAnswerList: [21, 24, 27],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 7, 8, 9],
    mahjongAnswerList: [1, 4, 7],
  },
  {
    mahjongSubjectList: [21, 21, 23, 24, 24, 25, 25, 26, 27, 28, 29, 29, 29],
    mahjongAnswerList: [21, 23, 26, 29],
  },
  {
    mahjongSubjectList: [12, 13, 13, 13, 14, 14, 15, 15, 16, 16, 17, 18, 19],
    mahjongAnswerList: [11, 12, 14, 17],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 3, 4, 4, 5, 6, 7, 7, 8, 9],
    mahjongAnswerList: [2, 3, 4, 5, 8],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 3, 4, 4, 6, 7, 7, 8, 8, 9],
    mahjongAnswerList: [2, 3, 4, 5],
  },
  {
    mahjongSubjectList: [11, 12, 12, 13, 13, 14, 15, 15, 15, 16, 17, 17, 18],
    mahjongAnswerList: [16, 17, 19],
  },
  {
    mahjongSubjectList: [22, 22, 22, 22, 23, 23, 24, 24, 24, 25, 26, 29, 29],
    mahjongAnswerList: [25, 29],
  },
  {
    mahjongSubjectList: [2, 2, 3, 3, 4, 4, 5, 6, 6, 7, 7, 8, 8],
    mahjongAnswerList: [2, 5, 8],
  },
  {
    mahjongSubjectList: [11, 12, 12, 13, 13, 14, 14, 15, 16, 17, 17, 17, 18],
    mahjongAnswerList: [13, 16, 18, 19],
  },
];

// 1-9 -> 万；11-19 -> 筒；21-29 -> 条
const MAJIANGLIST = [
  {
    imgUrl: require('../../assets/image/majiang/1.png'),
    value: 1,
  },
  {
    imgUrl: require('../../assets/image/majiang/2.png'),
    value: 2,
  },
  {
    imgUrl: require('../../assets/image/majiang/3.png'),
    value: 3,
  },
  {
    imgUrl: require('../../assets/image/majiang/4.png'),
    value: 4,
  },
  {
    imgUrl: require('../../assets/image/majiang/5.png'),
    value: 5,
  },
  {
    imgUrl: require('../../assets/image/majiang/6.png'),
    value: 6,
  },
  {
    imgUrl: require('../../assets/image/majiang/7.png'),
    value: 7,
  },
  {
    imgUrl: require('../../assets/image/majiang/8.png'),
    value: 8,
  },
  {
    imgUrl: require('../../assets/image/majiang/9.png'),
    value: 9,
  },
  {
    imgUrl: require('../../assets/image/majiang/11.png'),
    value: 11,
  },
  {
    imgUrl: require('../../assets/image/majiang/12.png'),
    value: 12,
  },
  {
    imgUrl: require('../../assets/image/majiang/13.png'),
    value: 13,
  },
  {
    imgUrl: require('../../assets/image/majiang/14.png'),
    value: 14,
  },
  {
    imgUrl: require('../../assets/image/majiang/15.png'),
    value: 15,
  },
  {
    imgUrl: require('../../assets/image/majiang/16.png'),
    value: 16,
  },
  {
    imgUrl: require('../../assets/image/majiang/17.png'),
    value: 17,
  },
  {
    imgUrl: require('../../assets/image/majiang/18.png'),
    value: 18,
  },
  {
    imgUrl: require('../../assets/image/majiang/19.png'),
    value: 19,
  },
  {
    imgUrl: require('../../assets/image/majiang/21.png'),
    value: 21,
  },
  {
    imgUrl: require('../../assets/image/majiang/22.png'),
    value: 22,
  },
  {
    imgUrl: require('../../assets/image/majiang/23.png'),
    value: 23,
  },
  {
    imgUrl: require('../../assets/image/majiang/24.png'),
    value: 24,
  },
  {
    imgUrl: require('../../assets/image/majiang/25.png'),
    value: 25,
  },
  {
    imgUrl: require('../../assets/image/majiang/26.png'),
    value: 26,
  },
  {
    imgUrl: require('../../assets/image/majiang/27.png'),
    value: 27,
  },
  {
    imgUrl: require('../../assets/image/majiang/28.png'),
    value: 28,
  },
  {
    imgUrl: require('../../assets/image/majiang/29.png'),
    value: 29,
  },
];

// 根据数字生成对应的麻将对象
const getMajiangByNum = (num) => {
  let tmpIndex = -1;
  // 获取对应的麻将索引
  tmpIndex = MAJIANGLIST.findIndex((item) => item.value === num);
  if (tmpIndex < 0) return { imgUrl: '', value: '' };
  return MAJIANGLIST[tmpIndex];
};

export default {
  questions,
  majiangList: MAJIANGLIST,
  getMajiangByNum,
};
