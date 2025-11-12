import request from '../../utils/request';
import requestWWW from '../../utils/requestWWW';
import store from '../../store/index';

// 获取照片墙列表
export function getPhotoWallList() {
  return request.post('hmGiftController/heartWallList', {
    splid: store.state.live.liveId,
    type: 'xin',
    is_delete: '0',
  });
}

// 发送照片墙
export function sendPhoto(pObj) {
  return request.post('hmGiftController/sendHeartWall', {
    splid: store.state.live.liveId,
    photo_start_url: pObj.imgPathOrigin,
    photo_end_url: pObj.imgPath,
    type: 'xin',
    sort: pObj.id,
  });
}

// 删除照片墙
export function deletePhoto(pObj) {
  return request.post('hmGiftController/editHeartWall', {
    splid: store.state.live.liveId,
    is_delete: '1',
    heart_wall_id: pObj.id,
  });
}

// 获取摄影师照片墙列表
export function getLivePhotoInfo() {
  return requestWWW.post('photo/getPhotoShiList', {
    splid: store.state.live.liveId,
    source: '1',
    token: store.state.app.token,
  });
}

// 获取照片墙图片详情
export function getLivePhotoDetail(imgId) {
  return requestWWW.post('photo/getPhotoShiInfo', {
    splid: store.state.live.liveId,
    id: imgId,
    token: store.state.app.token,
  });
}

// 购买下载照片
export function buyLivePhoto(livePhotoId) {
  return request('hmGiftController/buyPhoto', 'POST', {
    id: livePhotoId,
    splid: store.state.live.liveId,
  });
}
