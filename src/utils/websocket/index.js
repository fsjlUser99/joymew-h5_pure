import WebsocketHeartbeatJs from 'websocket-heartbeat-js';
import { CHAT_HOST } from '@/assets/constant/host';
import store from '@/store/index';
import handleMessage from './handleMessage';
import app from '../../main';
// 定义websocketHeartbeatJs
// 用于保证全局只有一个websocket连接
let websocketHeartbeatJs;

export default function connectWS() {
  // 连接websocket
  if (store.state.app.isInOtherWeviewH5) {
    // 其他webview容器打开应用的情况下不需要连接websocket
    console.log('其他webview容器打开应用的情况下不需要连接websocket');
    return;
  }
  if (websocketHeartbeatJs) {
    // 如果websocketHeartbeatJs已经存在,则不需要再次连接
    console.log('websocketHeartbeatJs已经存在,则不需要再次连接');
    return;
  }
  websocketHeartbeatJs = new WebsocketHeartbeatJs({
    url: `${CHAT_HOST}haimiao?miaoId=${store.state.app.token}&splid=${store.state.live.liveId}&kind=2`,
    pingTimeout: 120000,
    pingMsg: 'wxhb',
    repeatLimit: 100,
  });
  websocketHeartbeatJs.onopen = () => {
    app.$toast.center('聊天服务器连接成功');
  };
  websocketHeartbeatJs.onmessage = (e) => {
    try {
      const message = JSON.parse(e.data);
      handleMessage(message);
    } catch (e2) {
      // 非json格式空操作
    }
  };
  websocketHeartbeatJs.onreconnect = () => {
    if (store.state.app.needLogin) {
      websocketHeartbeatJs.close();
    }
    app.$toast.center('聊天服务器重连中....');
  };
  websocketHeartbeatJs.onerror = () => {
    if (store.state.app.needLogin) {
      app.$toast.center('登录已过期,请删除小程序重新进入!');
      return;
    }
    app.$toast.center('聊天服务器连接失败');
  };
}
