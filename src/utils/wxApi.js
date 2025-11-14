// weixin-jssdk api封装
import { getAppId } from '@/api/guessHb/index';
import store from '@/store/index';
import wx from 'weixin-js-sdk';
import { tmpGetNewUrl } from './hdOptimizationTmpPatch';
import { tt } from './ttjssdk';

export default {
  // 初始化api
  initWXAPI: () => {
    return new Promise((resolve, reject) => {
      getAppId()
        .then((res) => {
          console.log(res);
          const {
            appId, timestamp, nonceStr, signature,
          } = res.qianMing;
          wx.config({
            debug: false,
            appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList: ['chooseWXPay', 'updateAppMessageShareData', 'updateTimelineShareData'],
          });
          wx.error((err) => {
            reject(err);
            console.log('wxApi校验失败', err);
          });
          wx.ready((res) => {
            resolve(res);
            console.log('wxApi校验成功', res);
          });
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  },
  // 支付
  pay: (param) => {
    return new Promise((resolve, reject) => {
      wx.chooseWXPay({
        timestamp: param.obj.timeStamp,
        nonceStr: param.obj.nonceStr,
        package: param.obj.package,
        signType: param.obj.signType,
        paySign: param.obj.paySign,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
        complete: (res) => {
          if (res.errMsg === 'chooseWXPay:ok') {
            resolve(res);
          } else {
            reject(res);
          }
        },
      });
    });
  },
  // 小程序页面跳转
  navigateTo: (path) => {
    // 兼容性代码
    if (store.state.app.mpType) {
      localStorage.setItem('refreshUserInfoFlag', '1');
    }
    wx.miniProgram.navigateTo({
      url: path,
    });
  },
  /**
   * 临时跳转
   * 为了兼容重构后的互动小程序
   * 待另外两个小程序也重构完毕统一写法
   * @param {String} pageName 页面名称
   * @param {Object} queryObj 跳转页面携带的参数
   */
  tmpNavigateTo(pageName, queryObj) {
    const newUrl = tmpGetNewUrl(pageName, queryObj);
    console.log('newUrl:', newUrl);
    // 兼容性代码
    if (store.state.app.mpType) {
      localStorage.setItem('refreshUserInfoFlag', '1');
    }
    wx.miniProgram.navigateTo({
      url: newUrl,
    });
  },
  // 抖音小程序页面跳转
  navigateToTt: (path) => {
    tt.miniProgram.navigateTo({
      url: path,
    });
  },
  // 获取执行环境
  getEnv: () => {
    return new Promise((resolve, reject) => {
      try {
        wx.miniProgram.getEnv((res) => {
          resolve(res);
        });
      } catch (err) {
        reject(err);
      }
    });
  },
  postMsg(msg) {
    wx.miniProgram.postMessage({
      data: msg,
    });
  },
  onSharePYQ({ title, link, imgUrl }) {
    wx.updateTimelineShareData({
      title,
      link,
      imgUrl,
      success: (res) => {
        console.log(res);
      },
    });
  },
  onShareHY({
    title, desc, link, imgUrl,
  }) {
    wx.updateAppMessageShareData({
      title,
      desc,
      link,
      imgUrl,
      success: (res) => {
        console.log(res);
      },
    });
  },
  /**
   * 开始录音
   */
  startRecord() {
    wx.startRecord();
  },
  /**
   * 停止录音
   */
  stopRecord() {
    return new Promise((resolve) => {
      wx.stopRecord({
        success: (res) => {
          resolve(res);
        },
      });
    });
  },
  /**
   * 监听录音自动停止
   */
  onVoiceRecordEnd() {
    return new Promise((resolve) => {
      wx.onVoicePlayEnd({
        complete: (res) => {
          resolve(res);
        },
      });
    });
  },
};
