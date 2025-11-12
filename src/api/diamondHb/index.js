import request from '../../utils/request';
import store from '../../store/index';

// 发送喵钻红包
export function sendDiamondHb(pObj) {
  return request.post('redPackage/sendRedPackage', {
    splid: store.state.live.liveId,
    total: pObj.total,
    size: pObj.size,
    type: pObj.type,
  });
}

// 抢喵钻红包
export function robDiamondHb(packageId) {
  return request.post('redPackage/robRedPackage', {
    splid: store.state.live.liveId,
    package_id: packageId,
  });
}

// 获取喵钻红包列表
export function getDiamondHbList() {
  return request.post('redPackage/getRedPackageList', {
    splid: store.state.live.liveId,
  });
}

// 根据id获取某个喵钻红包列表
export function getDiamondHbRankById(packageId) {
  return request.post('redPackage/getRedPackageInfo', {
    package_id: packageId,
  });
}
