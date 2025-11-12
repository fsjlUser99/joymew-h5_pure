import Vue from 'vue';
import giftDanmu from './giftDanmu.vue';
import giftDanmuFree from './giftDanmuFree.vue';

const GiftDanmuConstructor = Vue.extend(giftDanmu);
const GiftDanmuFreeConstructor = Vue.extend(giftDanmuFree);

function createDanmuDom(user) {
  // 信息不完善
  if (!user.nickname || !user.giftName) {
    return;
  }
  // 构建 弹幕dom
  let danmu = null;
  if (user.miaoColor === 'freeGift') {
    danmu = new GiftDanmuFreeConstructor({
      data: {
        nickname: user.nickname,
        headImg: user.headImg,
        giftName: user.giftName,
        giftImg: user.giftImg,
        shijian: parseFloat(user.shijian) || 5,
      },
    });
  } else {
    danmu = new GiftDanmuConstructor({
      data: {
        nickname: user.nickname,
        headImg: user.headImg,
        giftName: user.giftName,
        giftImg: user.giftImg,
        shijian: parseFloat(user.shijian) || 5,
      },
    });
  }
  danmu.$mount();
  document.getElementById('danmuContainer').appendChild(danmu.$el);
}

const install = (vue) => {
  vue.prototype.$createGiftDanmu = createDanmuDom;
};

export default { install };
