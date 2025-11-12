/**
 * 目标模块资源加载
 * 属性：
 *    文件列表：
 *      moduleFileList:[
 *          {
 *              path,
 *              type,// type取值img、audio
 *          },
 *      ]
 *    总进度：
 *      totalProgress
 *    当前进度：
 *      currentProgress
 * 方法：
 *    更新当前进度：
 *      updateCurrentProgress
 *    加载两种格式文件资源
 *      loadImgFile、loadAudioFile
 *     提交模块资源(moduleFileList push值)
 *      commitModuleFileList
 *     清空资源列表
 *      clearModuleFileList
 *     加载模块资源
 *      loadModuleFileList
 *     加载索引
 *      loadIndex
 */
import store from '@/store/index';

const moduleFileList = [];
let totalProgress = 0;
let currentProgress = 0;
let loadIndex = 0;
const Observer = {};
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
// 更新当前进度
const updateCurrentProgress = () => {
  if (currentProgress < totalProgress) {
    store.commit('app/updateCurrentLoadingProgress', currentProgress);
  } else {
    Observer.moduleFileListLoaded = true;
  }
};

// 加载moduleFileList
const loadModuleFileList = () => {
  if (moduleFileList[loadIndex]) {
    if (moduleFileList[loadIndex].type === 'img') {
      loadImgFile(moduleFileList[loadIndex].path)
        .then(() => {
          currentProgress += 1;
          updateCurrentProgress();
          loadIndex += 1;
          loadModuleFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (moduleFileList[loadIndex].type === 'audio') {
      loadAudioFile(moduleFileList[loadIndex].path)
        .then(() => {
          currentProgress += 1;
          updateCurrentProgress();
          loadIndex += 1;
          loadModuleFileList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};

// 清空模块资源
const clearModuleFileList = () => {
  loadIndex = 0;
  moduleFileList.splice(0);
};
Object.defineProperty(Observer, 'moduleFileListCommited', {
  configurable: true,
  enumerable: true,
  get() {
    return false;
  },
  set(val) {
    console.log('***moduleFileListCommited***');
    if (val) {
      console.log('***compute totalProgress and start load moduleFileList***');
      totalProgress = moduleFileList.length;
      loadModuleFileList();
    }
  },
});
Object.defineProperty(Observer, 'moduleFileListLoaded', {
  configurable: true,
  enumerable: true,
  get() {
    return false;
  },
  set(val) {
    console.log('***moduleFileListLoaded***');
    if (val) {
      console.log('***clear moduleFileList and hide loading page***');
      clearModuleFileList();
      store.commit('app/setLoading', false);
    }
  },
});

// 提交模块资源
const commitModuleFileList = (fileList, type) => {
  fileList.forEach((item) => {
    moduleFileList.push({
      path: item,
      type,
    });
  });
};

export default commitModuleFileList;
