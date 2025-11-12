/* eslint-disable */
import Vue from "vue";
import store from "@/store/index";
import loveBapinLevel1 from "./enterpriseBapinLevel1.vue";
import loveBapinLevel2 from "./enterpriseBapinLevel2.vue";
import loveBapinLevel3 from "./enterpriseBapinLevel3.vue";
import loveBapinLevel4 from "./enterpriseBapinLevel4.vue";
import bapinZshl from "./bapinZshl.vue"

const LoveBapinLevel1Constructor = Vue.extend(loveBapinLevel1);
const LoveBapinLevel2Constructor = Vue.extend(loveBapinLevel2);
const LoveBapinLevel3Constructor = Vue.extend(loveBapinLevel3);
const LoveBapinLevel4Constructor = Vue.extend(loveBapinLevel4);
const BapinZshlConstructor = Vue.extend(bapinZshl);

const waitBapin = [];
let isPlaying = false;
let bapinTimeout;
/**
 * 生成霸屏实例对象
 */
function getBapinDom(user) {
  // 中式婚礼版情况
  if(store.state.live.sceneType === '91') {
    return new BapinZshlConstructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        content: user.content,
        time: user.time,
        bapinType: user.bapinType
      }
    });
  }
  // 其他情况
  let bapin = null;
  if (user.bapinType === 0) {
    bapin = new LoveBapinLevel1Constructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        content: user.content,
        time: user.time
      }
    });
  } else if (user.bapinType === 1) {
    bapin = new LoveBapinLevel2Constructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        content: user.content,
        time: user.time
      }
    });
  } else if (user.bapinType === 2) {
    bapin = new LoveBapinLevel3Constructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        content: user.content,
        time: user.time
      }
    });
  } else {
    bapin = new LoveBapinLevel4Constructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        content: user.content,
        time: user.time
      }
    });
  }
  return bapin;
}

// 播放霸屏
function playBapin() {
  if (waitBapin.length > 0) {
    const bapin = waitBapin.shift();
    // 创建bapin dom
    createBapinDom(bapin);
  }
}
// user {name、headImg、content、time、bapinType}
function createBapinDom(user) {
  // 用户信息不完善
  if (!user.name || !user.headImg) {
    return;
  }
  // 霸屏正在播放中
  if (isPlaying) {
    waitBapin.push(user);
    return;
  }
  isPlaying = true;
  // 构建霸屏dom
  const bapin = getBapinDom(user);

  bapin.$mount();
  document.getElementById("bapinContainer").appendChild(bapin.$el);

  // 当前霸屏播放结束后去播放下一个霸屏
  bapinTimeout = setTimeout(() => {
    isPlaying = false;
    playBapin();
  }, user.time * 1000);
}

function closeCurrentBapin() {
  clearTimeout(bapinTimeout);
  // 立即播放下一个霸屏
  isPlaying = false;
  playBapin();
}

const install = vue => {
  vue.prototype.$createLoveBapin = createBapinDom;
  vue.prototype.$closeCurrentCrownBapin = closeCurrentBapin;
};

export default { install };
