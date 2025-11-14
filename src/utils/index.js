import Vue from 'vue';

// 定时器任务
export const timeoutTask = (task, time) => {
  const tmpTimeout = setTimeout(() => {
    task();
    clearTimeout(tmpTimeout);
  }, time);
};

// 获取url中的参数
export const getUrlParam = (key) => {
  const tmpRes = window.location.search.match(
    new RegExp(`[?&]${key}=([^&]+)`, 'i'),
  );
  let result;
  if (tmpRes === null || tmpRes.length < 1) {
    result = '';
  } else {
    [, result] = tmpRes;
  }
  return result;
};

// 生成随机数(min到max,不包括max)
export const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// 生成随机id(随机字母加当前时间戳构成)
export const generateRandomId = (pLen) => {
  let tmpId = '';
  const charStr = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
  const tmpLen1 = charStr.length;
  const tmplen2 = pLen || 6; // 生成的id字母部分的长度，默认长度为6
  for (let i = 0; i < tmplen2; i += 1) {
    tmpId += charStr.charAt(Math.floor(Math.random() * tmpLen1));
  }
  tmpId += new Date().getTime();
  return tmpId;
};

const ismobile = () => {
  const u = navigator.userAgent;
  let tmpResult = '';
  if (
    /AppleWebKit.*Mobile/i.test(navigator.userAgent)
    || /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(
      navigator.userAgent,
    )
  ) {
    if (window.location.href.indexOf('?mobile') < 0) {
      try {
        if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
          tmpResult = '0';
        } else {
          tmpResult = '1';
        }
      } catch (e) {
        console.log(e);
      }
    }
  } else if (u.indexOf('iPad') > -1) {
    tmpResult = '0';
  } else {
    tmpResult = '1';
  }
  return tmpResult;
};
// GMT转普通日期格式如：2021-09-27T11:13:26.403+0000转2021-09-27 19:13:26
export const newDateTransform = (timedata, t) => {
  let target = t;
  if (ismobile() === '0') {
    target = t - 8;
  }
  const date = new Date(timedata.substr(0, 19));
  const currentTime = date.getTime();
  const offset = date.getTimezoneOffset() * 60000;
  const utcTime = currentTime + offset;
  const newDate = new Date(utcTime + target * 3600000);
  const Year = newDate.getFullYear();
  const Month = newDate.getMonth() + 1 < 10
    ? `0${newDate.getMonth() + 1}`
    : newDate.getMonth() + 1;
  const d = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const Hours = newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
  const Minutes = newDate.getMinutes() < 10
    ? `0${newDate.getMinutes()}`
    : newDate.getMinutes();
  const Seconds = newDate.getSeconds() < 10
    ? `0${newDate.getSeconds()}`
    : newDate.getSeconds();
  const overTime = `${Year}/${Month}/${d} ${Hours}:${Minutes}:${Seconds}`;
  return overTime;
};
// 获取圆形头像
export const getRoundImg = (img) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const r = canvas.width / 2;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = ctx.createPattern(img, 'no-repeat');
  ctx.clearRect(0, 0, img.width, img.height);
  ctx.arc(img.width / 2, img.height / 2, r, 0, Math.PI * 2);
  ctx.fill();
  const dataURL = canvas.toDataURL('image/png');
  return dataURL;
};

export const loadImg = (path) => new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = '';
  img.src = path;
  img.onload = () => {
    resolve(img);
  };
  img.onerror = () => {
    reject();
  };
});

// 判断非负数
export const isUnNegtiveDigit = (targetStr) => {
  const r = /^(\d+)$|^(\d+\.\d{1,2})$/;
  return r.test(targetStr);
};
// 判断正整数
export const isPositiveInteger = (value) => {
  return /^[1-9]\d*$/.test(value);
};

// 秒转分:秒
export const sCtMs = (seconds) => {
  const minute = parseInt(seconds / 60, 10);
  let second = seconds % 60;
  if (second === 0) {
    second = '00';
  } else if (second < 10) {
    second = `0${second}`;
  }
  return `${minute}:${second}`;
};

// yyyy-MM-dd HH:mm:ss格式转时间戳
export const formatDateConvertTS = (dateStr) => {
  return new Date(dateStr.replace(/-/g, '/')).getTime();
};
// 获取当前时间
export const getCurrentDate = () => {
  return new Date(+new Date() + 8 * 3600 * 1000)
    .toJSON()
    .substr(0, 19)
    .replace('T', ' ');
};
// 日期字符串转Date
export const dateStrConvert = (dateStr) => {
  const SEPARATOR_BAR = '-';
  const SEPARATOR_SLASH = '/';
  const SEPARATOR_DOT = '.';
  let dateArray;
  if (dateStr.indexOf(SEPARATOR_BAR) > -1) {
    dateArray = dateStr.split(SEPARATOR_BAR);
  } else if (dateStr.indexOf(SEPARATOR_SLASH) > -1) {
    dateArray = dateStr.split(SEPARATOR_SLASH);
  } else {
    dateArray = dateStr.split(SEPARATOR_DOT);
  }
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
};
// 比较日期
export const dateCompare = (dateStr) => {
  const dateTime = dateStrConvert(dateStr).getTime();

  // 减去24小时
  const compareDateTime = new Date().getTime() - 24 * 60 * 60 * 1000;
  if (compareDateTime > dateTime) {
    return true;
  }
  if (compareDateTime === dateTime) {
    return false;
  }
  return false;
};

// 获取当前位置
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const tmpCrd = position.coords;
        resolve(tmpCrd);
      },
      (positionError) => {
        console.log(positionError);
        reject(positionError);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
};

// 根据两个点的经纬度信息计算出距离 单位km
export const getDistance = (lat1, lng1, lat2, lng2) => {
  const radLat1 = (lat1 * Math.PI) / 180.0;
  const radLat2 = (lat2 * Math.PI) / 180.0;
  const a = radLat1 - radLat2;
  const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  let s = 2
    * Math.asin(
      Math.sqrt(
        (Math.sin(a / 2) ** 2)
          + Math.cos(radLat1) * Math.cos(radLat2) * (Math.sin(b / 2) ** 2),
      ),
    );
  s *= 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s;
};

// 动态渲染某个组件到某个节点下
export const renderComp = (root, compConfig) => {
  const vueInstance = new Vue(compConfig);
  vueInstance.$mount();
  root.appendChild(vueInstance.$el);
};
