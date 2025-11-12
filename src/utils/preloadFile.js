/**
 * 文件预加载模块
 * 资源文件分为：系统直接引入(default前缀)的和接口获取的(dynamic前缀)
 * 过程：commit文件、加载文件
 * 数据结构：
 *     file:{ path,type } path:文件路径 type:文件类型(取值：img、video、audio、svga)
 *     backgroundFileList:[]<--->backgroundFileList文件加载完毕 loading页面关闭
 *     defaultFileList:[]
 *     dynamicFileList:[]
 *
 * 思路：
 *    手机请求到背景图片--->commit背景图片--->加载背景图片--->加载完毕发送通知--->开始加载defaultFileList中的资源
 *    defaultFileList中的资源加载完毕 && dynamicFileList commit完毕通知--->开始加载dynamicFileList
 */

import SVGA from 'svgaplayerweb';
import store from '@/store/index';
// import audioResource from '@/assets/constant/audio';
// import { startBtn } from '@/assets/constant/effect';
import { timeoutTask } from '@/utils/index';
import createjs from 'createjs-cmd';

const loadingBg = 'https://static.hudongmiao.com/joymewH5/img/loading/bg.png';
const loadingFan = 'https://static.hudongmiao.com/joymewH5/img/loading/fan.png';
const loadingLeaf = 'https://static.hudongmiao.com/joymewH5/img/loading/leaf.png';
const loadingProgressBarWhite = 'https://static.hudongmiao.com/joymewH5/img/loading/progressBarWhite.png';
const loadingProgressBarYellow = 'https://static.hudongmiao.com/joymewH5/img/loading/progressBarYellow.png';

const backgroundFileList = [];
const defaultFileList = [];
const dynamicFileList = [];

let backgroundFileListIndex = 0;
let defaultFileListIndex = 0;
let dynamicFileListIndex = 0;

let totalProgress = 0; // 总进度
let currentProgress = 0; // 当前进度
// 观察者模式(被观察：背景图片加载完毕、defaultFileList资源加载完毕&&dynamicFileList commit)
const Observer = {
  defaultFileListLoaded_display: false,
  dynamicFileListCommited_display: false,
};
// 加载图片文件
const loadImgFile = (path) => {
  const img = new Image();
  img.src = path;
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(path);
    };
    img.onerror = () => {
      reject();
    };
  });
};
// 加载视频文件
const loadVideoFile = (path) => {
  const video = document.createElement('video');
  return new Promise((resolve, reject) => {
    video.src = path;
    video.addEventListener('canplay', () => {
      resolve(path);
    });
    video.onerror = () => {
      reject();
    };
  });
};
// 加载音频文件
const loadAudioFile = (path) => {
  const audio = new Audio();
  audio.src = path;
  return new Promise((resolve, reject) => {
    audio.addEventListener('canplay', () => {
      resolve(path);
    });
    audio.onerror = () => {
      reject();
    };
  });
};
// 加载svga文件
const loadSVGAFile = (path) => {
  const parser = new SVGA.Parser();
  return new Promise((resolve, reject) => {
    parser.load(
      path,
      (videoItem) => {
        resolve(videoItem);
      },
      (err) => {
        reject(err);
      },
    );
  });
};
// 更新当前进度
const updateCurrentProgress = () => {
  let tmpPercentage = 0;
  if (totalProgress === 0 || currentProgress >= totalProgress) {
    tmpPercentage = 100;
  } else {
    tmpPercentage = ((currentProgress / totalProgress) * 100).toFixed(0);
  }

  store.commit('app/updateCurrentLoadingProgress', tmpPercentage);
  if (currentProgress >= totalProgress && totalProgress !== 0) {
    timeoutTask(() => {
      store.commit('app/setLoading', false);
    }, 500);
    // 通知加载defaultFileList
    // Observer.backgroundFileListLoaded = true;
  }
};
// 计算总进度
const computeTotalProgress = () => {
  totalProgress = backgroundFileList.length;
};
// 加载backgroundFileList
const loadBackgroundFileList = () => {
  if (backgroundFileList[backgroundFileListIndex]) {
    if (backgroundFileList[backgroundFileListIndex].type === 'img') {
      loadImgFile(backgroundFileList[backgroundFileListIndex].path)
        .then(() => {
          currentProgress += 1;
          updateCurrentProgress();
          backgroundFileListIndex += 1;
          loadBackgroundFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
// 加载defaultFileList
const loadDefaultFileList = () => {
  if (defaultFileList[defaultFileListIndex]) {
    if (defaultFileList[defaultFileListIndex].type === 'img') {
      loadImgFile(defaultFileList[defaultFileListIndex].path)
        .then(() => {
          defaultFileListIndex += 1;
          loadDefaultFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (defaultFileList[defaultFileListIndex].type === 'video') {
      loadVideoFile(defaultFileList[defaultFileListIndex].path)
        .then(() => {
          defaultFileListIndex += 1;
          loadDefaultFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (defaultFileList[defaultFileListIndex].type === 'svga') {
      loadSVGAFile(defaultFileList[defaultFileListIndex].path)
        .then(() => {
          defaultFileListIndex += 1;
          loadDefaultFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (defaultFileList[defaultFileListIndex].type === 'audio') {
      loadAudioFile(defaultFileList[defaultFileListIndex].path)
        .then(() => {
          defaultFileListIndex += 1;
          loadDefaultFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    Observer.defaultFileListLoaded = true;
    Observer.defaultFileListLoaded_display = true;
  }
};
// 加载dynamicFileList
const loadDynamicFileList = () => {
  if (dynamicFileList[dynamicFileListIndex]) {
    if (dynamicFileList[dynamicFileListIndex].type === 'img') {
      loadImgFile(dynamicFileList[dynamicFileListIndex].path)
        .then(() => {
          dynamicFileListIndex += 1;
          loadDynamicFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (dynamicFileList[dynamicFileListIndex].type === 'video') {
      loadVideoFile(dynamicFileList[dynamicFileListIndex].path)
        .then(() => {
          dynamicFileListIndex += 1;
          loadDynamicFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (dynamicFileList[dynamicFileListIndex].type === 'svga') {
      loadSVGAFile(dynamicFileList[dynamicFileListIndex].path)
        .then(() => {
          dynamicFileListIndex += 1;
          loadDynamicFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (dynamicFileList[dynamicFileListIndex].type === 'audio') {
      loadAudioFile(dynamicFileList[dynamicFileListIndex].path)
        .then(() => {
          dynamicFileListIndex += 1;
          loadDynamicFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
// 定义属性backgroundFileListCommited 背景图片提交完毕开始加载背景图片
Object.defineProperty(Observer, 'backgroundFileListCommited', {
  configurable: true,
  enumerable: true,
  get() {
    return false;
  },
  set(val) {
    if (val) {
      console.log('backgroundFileList Commited');
      computeTotalProgress();
      // 加载背景资源
      loadBackgroundFileList();
    }
  },
});

// 定义属性backgroundFileListLoaded 背景图片加载完毕开始加载defaultFileList
Object.defineProperty(Observer, 'backgroundFileListLoaded', {
  configurable: true,
  enumerable: true,
  get() {
    return false;
  },
  set(val) {
    if (val) {
      console.log('backgroundFileList loaded');
      // 开始加载defaultFileList
      loadDefaultFileList();
    }
  },
});

// 定义属性defaultFileListLoaded  defaultFileList加载完毕
Object.defineProperty(Observer, 'defaultFileListLoaded', {
  configurable: true,
  enumerable: true,
  get() {
    return Observer.defaultFileListLoaded_display;
  },
  set(val) {
    console.log('defaultFileList Loaded', Observer.dynamicFileListCommited);
    if (val && Observer.dynamicFileListCommited) {
      console.log('load dynamicFileList');
      // 开始加载dynamicFileList
      loadDynamicFileList();
    }
  },
});

// 定义属性dynamicFileListCommited 接口获取的文件提交完毕并且背景图片加载完毕 开始加载dynamicFileList
Object.defineProperty(Observer, 'dynamicFileListCommited', {
  configurable: true,
  enumerable: true,
  get() {
    return Observer.dynamicFileListCommited_display;
  },
  set(val) {
    console.log('dynamicFileListCommited');
    if (val && Observer.defaultFileListLoaded) {
      console.log('load dynamicFileList');
      // 开始加载dynamicFileList
      loadDynamicFileList();
    }
  },
});

// 系统直接引入的资源先commit
// Object.keys(audioResource).forEach((item) => { defaultFileList.push({ path: audioResource[item], type: 'audio' }); });
// Object.keys(RocketDanmu).forEach((item) => { defaultFileList.push({ path: RocketDanmu[item], type: 'svga' }); });
// Object.keys(Bapin).forEach((item) => { defaultFileList.push({ path: Bapin[item], type: 'svga' }); });

// defaultFileList.push({ path: LoadingMew, type: 'svga' });
// defaultFileList.push({ path: startBtn, type: 'svga' });
backgroundFileList.push({ path: loadingBg, type: 'img' });
backgroundFileList.push({ path: loadingFan, type: 'img' });
backgroundFileList.push({ path: loadingLeaf, type: 'img' });
backgroundFileList.push({ path: loadingProgressBarWhite, type: 'img' });
backgroundFileList.push({ path: loadingProgressBarYellow, type: 'img' });

/**
 * 接口获取的资源提交
 */
export const commitDynamicFileList = (fileList, type) => {
  fileList.forEach((item) => {
    dynamicFileList.push({
      path: item,
      type,
    });
  });
  // Observer.dynamicFileListCommited = true;
  // Observer.dynamicFileListCommited_display = true;
};
/**
 * 接口获取的背景资源提交后触发资源加载逻辑
 * 背景资源加载映射为进度条更新--->背景资源加载完毕其他类型资源开始加载
 */
export const commitBackgroundFileList = (pFile) => {
  backgroundFileList.push(pFile);
  // 通知加载背景资源
  Observer.backgroundFileListCommited = true;
};

/**
 * 加载指定的资源
 * @param [] fileList
 * @return Promise
 */
export const preloadFileList = (fileList) => {
  const loader = new createjs.LoadQueue(false);
  return new Promise((resolve, reject) => {
    loader.loadManifest(fileList);
    loader.on('complete', () => {
      resolve();
    });
    loader.on('error', () => {
      reject();
    });
  });
};
