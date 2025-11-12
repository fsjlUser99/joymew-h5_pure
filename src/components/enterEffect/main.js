/* eslint-disable */
import Vue from 'vue';
import store from '@/store/index';
import goat from './goat.vue';
import bird from './bird.vue';
import dragon from './dragon.vue';
import lion from './lion.vue';
import phoenix from './phoenix.vue';
import common from './common.vue';

const goatConstructor = Vue.extend(goat);
const birdConstructor = Vue.extend(bird);
const dragonConstructor = Vue.extend(dragon);
const lionConstructor = Vue.extend(lion);
const phoenixConstructor = Vue.extend(phoenix);
const commonConstructor = Vue.extend(common);

const waitEnterEffect = [];
let isPlaying = false;
//  观察Observer ended属性变化，当前动画播放完毕播放下一个
const Observer = {};
Object.defineProperty(Observer, 'ended', {
  configurable: true,
  enumerable: true,
  get() {
    return false;
  },
  set(val) {
    if (val) {
      console.log('当前进场动画执行完毕!');
      isPlaying = false;
      playEnterEffect();
    }
  },
});
Object.defineProperty(Observer, 'enterEffectContainerMounted', {
  configurable: true,
  enumerable: true,
  get() {
    return false;
  },
  set(val) {
    if (val) {
      console.log('挂载根节点dom渲染完毕!');
      playEnterEffect();
    }
  },
});
store.commit('app/initEnterEffectContainerMountedObserver', Observer);
// 播放进场效果
function playEnterEffect() {
  if (waitEnterEffect.length > 0) {
    const enterEffect = waitEnterEffect.shift();
    // 创建bapin dom
    createEnterEffectDom(enterEffect);
  }
}
// user {name、headImg、time、enterEffectType}
function createEnterEffectDom(user) {
  // 用户信息不完善
  if (!user.name || !user.headImg) {
    return;
  }
  // 进场效果正在播放中
  if (isPlaying) {
    waitEnterEffect.push(user);
    return;
  }

  if (store.state.app.isInOtherWeviewH5) {
    // 其他webview容器打开应用的情况下不需要创建进场效果
    return;
  }

  if (!document.getElementById('enterEffectContainer')) {
    // 父级节点还没渲染完毕
    waitEnterEffect.push(user);
    return;
  }

  isPlaying = true;
  // 构建 进场效果dom
  let enterEffect = null;
  if (user.enterEffectType === 'goat') {
    enterEffect = new goatConstructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        Observer: Observer,
      },
    });
  } else if (user.enterEffectType === 'bird') {
    enterEffect = new birdConstructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        Observer: Observer,
      },
    });
  } else if (user.enterEffectType === 'dragon') {
    enterEffect = new dragonConstructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        Observer: Observer,
      },
    });
  } else if (user.enterEffectType === 'lion') {
    enterEffect = new lionConstructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        Observer: Observer,
      },
    });
  } else if (user.enterEffectType === 'phoenix') {
    enterEffect = new phoenixConstructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        Observer: Observer,
      },
    });
  } else if (user.enterEffectType === 'common') {
    enterEffect = new commonConstructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        Observer: Observer,
      },
    });
  } else {
    enterEffect = new goatConstructor({
      data: {
        headImg: user.headImg,
        name: user.name,
        Observer: Observer,
      },
    });
  }
  if (enterEffect) {
    enterEffect.$mount();
    document
      .getElementById('enterEffectContainer')
      .appendChild(enterEffect.$el);
  }
}

const install = vue => {
  vue.prototype.$createEnterEffect = createEnterEffectDom;
};

export default { install };
