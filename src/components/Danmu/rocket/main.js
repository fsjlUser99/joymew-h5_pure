import Vue from 'vue';
import { generateRandom, timeoutTask } from '@/utils/index';
import store from '@/store/index';
import smallRocket from './smallRocket.vue';
import midRocket from './midRocket.vue';
import bigRocket from './bigRocket.vue';
import zshlRocket from './zshlRocket.vue';

const SmallRocketConstructor = Vue.extend(smallRocket);
const MidRocketConstructor = Vue.extend(midRocket);
const BigRocketConstructor = Vue.extend(bigRocket);
const ZshlRocketConstructor = Vue.extend(zshlRocket);
// const allTime = 10;
const lineInfo = {
  height: 40, // 轨道高度
  num: 3, // 轨道数目
  line: [], // 轨道数组
};

for (let i = 0; i < lineInfo.num; i += 1) {
  lineInfo.line.push({
    index: i,
    inUse: false,
  });
}

const waitRocket = [];
/* eslint-disable */
function update() {
  if (waitRocket.length > 0) {
    const rocket = waitRocket.pop();
    // 创建rocket dom
    createRocketDom(rocket);
  }
}

function getRocket(user) {
  let rocket = null;
  if (store.state.live.sceneType === '91') {
    console.log('中式婚礼弹幕:', user);
    rocket = new ZshlRocketConstructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        content: user.content,
        top: user.top,
        rocketType: user.rocketType,
      }
    });
  } else {
    if (user.rocketType === 0) {
      rocket = new SmallRocketConstructor({
        data: {
          headImg: user.headImg,
          name: user.name,
          content: user.content,
          top: user.top,
        },
      });
    } else if (user.rocketType === 1) {
      rocket = new MidRocketConstructor({
        data: {
          headImg: user.headImg,
          name: user.name,
          content: user.content,
          top: user.top,
        },
      });
    } else if (user.rocketType === 2) {
      rocket = new BigRocketConstructor({
        data: {
          headImg: user.headImg,
          name: user.name,
          content: user.content,
          top: user.top,
        },
      });
    } else {
      rocket = new SmallRocketConstructor({
        data: {
          headImg: user.headImg,
          name: user.name,
          content: user.content,
          top: user.top,
        },
      });
    }
  }
  return rocket;
}

function createRocketDom(user) {
  const danmuContainerDom = document.getElementById('danmuContainer');
  // 不在首页
  if (!danmuContainerDom) {
    console.log('不在首页');
    return;
  }
  // 用户信息不完善
  if (!user.name || !user.headImg) {
    return;
  }
  const freeLine = lineInfo.line.filter((item) => !item.inUse);
  // 轨道都被占用
  if (freeLine.length === 0) {
    waitRocket.push(user);
    return;
  }

  // 随机占用一条轨道
  const freeLineIndex = freeLine[generateRandom(0, freeLine.length)].index;
  lineInfo.line[freeLineIndex].inUse = true;
  user.top = freeLineIndex * lineInfo.height + 15;
  // 构建 弹幕dom
  const rocket = getRocket(user);
  rocket.$mount();
  danmuContainerDom.appendChild(rocket.$el);

  // 弹幕完全进入屏幕 释放轨道
  timeoutTask(() => {
    lineInfo.line[freeLineIndex].inUse = false;
    update();
  }, 5000);
}

const install = (vue) => {
  vue.prototype.$createRocketDanmu = createRocketDom;
};

export default { install };
