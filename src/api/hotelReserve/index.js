import requestWWW from '../../utils/requestWWW';
import request from '../../utils/request';
import store from '../../store/index';

// 获取酒店信息
export const getHotelInfo = () => {
  return requestWWW.post('/wedding/newGetWedding', {
    userId: store.state.live.emceeId,
  });
};
// 获取宴会厅列表
export const getBanquetList = (weddingId) => {
  return requestWWW.get(
    `/weddingBanquet/getWeddingBanquetList?wedding_id=${weddingId}`,
  );
};
// 获取菜单列表
export const getMenuList = (weddingId) => {
  return requestWWW.get(
    `/weddingMenu/getWeddingMenuList?wedding_id=${weddingId}`,
  );
};
// 获取套餐列表
export const getSetMealList = (weddingId) => {
  return requestWWW.get(
    `/weddingPackage/getWeddingPackageList?wedding_id=${weddingId}`,
  );
};
// 获取优惠活动列表
export const getDiscountList = (weddingId) => {
  return requestWWW.get(
    `/weddingActivity/getWeddingActivityList?wedding_id=${weddingId}`,
  );
};

// 预定主持
export const reserveHost = (pObj) => {
  return requestWWW.post('/schedule/save', pObj);
};
// 云境预定
export const reserveHostHlt = (pObj) => {
  return requestWWW.post('/schedule/save2', pObj);
};
// 获取预定信息
export const getReserveInfo = ({ splid, token }) => {
  return requestWWW.post('/schedule/getUserSchedule', {
    splid,
    token,
  });
};
// 保存浏览记录
export const saveBrowseRecord = (pObj) => {
  return requestWWW.post('/book/saveBookInfo', pObj);
};

// 获取主持人信息
export function reqGetHostProfile() {
  return request.get(
    `hostStyle/getInfo?userId=${store.state.live.emceeId}`,
  );
}
