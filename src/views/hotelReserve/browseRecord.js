import store from '@/store/index';
import { saveBrowseRecord } from '@/api/hotelReserve/index';
import { getUrlParam } from '@/utils/index';
/**
 * 需求：创建出"酒店浏览记录保存"接口所需要的对象
 *
 * splid、user_name、user_headimg可提前赋值
 *
 */

export default {
  browseRecord: {}, // 临时用 即时销毁
  data() {
    return {
      stay_time: '',
      start_time: '',
      page_id: '',
      page_name: '',
      page_type: '',
      splid: '',
      user_name: '',
      user_headimg: '',
      start_time_timestamp: '',
    };
  },
  init() {
    this.browseRecord = this.data();
    this.browseRecord.splid = store.state.live.liveId;
    this.browseRecord.user_name = store.state.user.name;
    this.browseRecord.user_headimg = store.state.user.headImg;
  },
  enterPage({ pageId = '', pageType, pageName }) {
    this.init();
    this.browseRecord.start_time = this.getCurrentDate();
    this.browseRecord.start_time_timestamp = this.getCurrentTimestamp();
    this.browseRecord.page_id = pageId;
    this.browseRecord.page_name = pageName;
    this.browseRecord.page_type = pageType;
  },
  leavePage() {
    const leaveTimetamp = this.getCurrentTimestamp();
    this.browseRecord.stay_time = Math.floor(
      (leaveTimetamp - this.browseRecord.start_time_timestamp) / 1000,
    ).toString();
    const resultObj = {
      ...this.browseRecord,
      token: getUrlParam('token'),
    };
    this.browseRecord = {};
    console.log('浏览记录:', resultObj);
    saveBrowseRecord(resultObj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getCurrentDate() {
    const d = new Date();
    const year = d.getFullYear();
    let month = d.getMonth();
    month = month + 1 > 12 ? 1 : month + 1;
    month = month > 9 ? month : `0${month.toString()}`;
    const day = d.getDate();
    let hour = d.getHours();
    hour = hour > 9 ? hour : `0${hour.toString()}`;
    let minute = d.getMinutes();
    minute = minute > 9 ? minute : `0${minute.toString()}`;
    const second = d.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  },
  getCurrentTimestamp() {
    return new Date().getTime();
  },
};
