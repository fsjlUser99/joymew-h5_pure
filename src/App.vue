<template>
  <div id="app">
    <router-view />
    <loading v-if="!isInOtherWeviewH5" />
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import wxApi from '@/utils/wxApi';
import connectWS from '@/utils/websocket/index';
import { getUrlParam, isEndWithX, timeoutTask } from '@/utils/index';
import { getToken as getStoredToken, setToken as persistToken } from '@/utils/auth';
import {
  formatPhotoTypeList,
  formatDanmuTypeList,
  formatSuperDanmuTypeList,
  formatBapinTypeList,
  getGameInfoByGameCode,
  getSeatPopupFlag,
  updateSeatPopupFlag,
  removeSeatPopupFlag,
} from '@/utils/service';
import {
  getLiveInfo,
  getGiftList,
  getHBKDInfo,
  getGameStatus,
  buyVipEnterEffect,
  editUserInfo,
  sendGift,
  sendBapinGift,
  sendDanmuGift,
  uploadPhoto,
  sendPhotoGift,
  sendGiftCarnival,
  getH5DirectVisitInfo,
} from '@/api/index/index';
import {
  sendGiftMessage, sendBapinGiftMessage, sendDanmuGiftMessage, sendPhotoGiftMessage,
} from '@/api/chat/index';
import { sendDiamondHb } from '@/api/diamondHb/index';
import { POPUP_MODULE, WEBVIEWH5 } from '@/assets/constant/index';
import loading from '@/components/loading/loading.vue';

export default {
  name: 'App',
  components: {
    loading,
  },
  data() {
    return {
      hasBootstrapped: false,
    };
  },
  computed: {
    ...mapState({
      isInOtherWeviewH5: (state) => state.app.isInOtherWeviewH5,
      isCloseCoin: (state) => state.app.isCloseCoin,
      needLogin: (state) => state.app.needLogin,
    }),
  },
  watch: {
    '$route.fullPath'() {
      this.tryBootstrap();
    },
    needLogin(val) {
      if (val) {
        this.hasBootstrapped = false;
      }
    },
  },
  created() {
    this.tryBootstrap();
  },
  mounted() {
    connectWS();
    // 注入svga音频播放脚本支持
    this.insertAudioSupportScript();
  },
  methods: {
    ...mapMutations({
      setToken: 'app/setToken',
      setActivityId: 'live/setActivityId',
      setActivityTitle: 'live/setActivityTitle',
      setActivityIntro: 'live/setActivityIntro',
      setAwardConfig: 'live/setAwardConfig',
      setTotalAward: 'live/setTotalAward',
      setIsCanLottery: 'live/setIsCanLottery',
      setLotterySize0: 'live/setLotterySize0',
      setTotalLotteryPerson: 'live/setTotalLotteryPerson',
      setUserInfo: 'user/setUserInfo',
      setEmceeInfo: 'user/setEmceeInfo',
      setLiveId: 'live/setLiveId',
      setHotelConfig: 'app/setHotelConfig',
      setSceneType: 'live/setSceneType',
      setTitle: 'live/setTitle',
      setBackground: 'live/setBackground',
      togglePopup: 'app/togglePopup',
      setGiftList: 'live/setGiftList',
      setPhotoTypeList: 'live/setPhotoTypeList',
      setCurrentPhotoType: 'app/setCurrentPhotoType',
      setDanmuTypeList: 'live/setDanmuTypeList',
      setCurrentDanmuType: 'app/setCurrentDanmuType',
      setSuperDanmuTypeList: 'live/setSuperDanmuTypeList',
      setCurrentSuperDanmuType: 'app/setCurrentSuperDanmuType',
      setBapinTypeList: 'live/setBapinTypeList',
      setCurrentBapinType: 'app/setCurrentBapinType',
      setRechargeList: 'live/setRechargeList',
      setHbkdRechargeList: 'live/setHbkdRechargeList',
      setHbkdInfo: 'live/setHbkdInfo',
      setQrcodeUrl: 'live/setQrcodeUrl',
      setZyzList: 'live/setZyzList',
      setNynList: 'live/setNynList',
      setCustomSignWish: 'live/setCustomSignWish',
      setOrigin: 'app/setOrigin',
      initRcGiftAtText: 'app/initRcGiftAtText',
      setGiftSendVisible: 'app/setGiftSendVisible',
      setHbkdVisible: 'app/setHbkdVisible',
      setHbkdRemainVisible: 'app/setHbkdRemainVisible',
      setHeartWallPrice: 'app/setHeartWallPrice',
      setEditUserInfoPrice: 'app/setEditUserInfoPrice',
      setIsFreeSendPhoto: 'live/setIsFreeSendPhoto',
      setEmceeId: 'live/setEmceeId',
      setPhotographerWallInfo: 'app/setPhotographerWallInfo',
      setHotelReserveVisible: 'app/setHotelReserveVisible',
      setHotelReserveIcon: 'app/setHotelReserveIcon',
      setIsInOtherWeviewH5: 'app/setIsInOtherWeviewH5',
      setForcePhone: 'live/setForcePhone',
      setIsOverDate: 'live/setIsOverDate',
      setAllFreeSendGift: 'live/setAllFreeSendGift',
      setLogoInfo: 'game/setLogoInfo',
      setIsCloseCoin: 'app/setIsCloseCoin',
      setSeatInfo: 'live/setSeatInfo',
      setUserPhone: 'user/setUserPhone',
      setSeatSearchInfo: 'live/setSeatSearchInfo',
      setIsGiftToHbkd: 'app/setIsGiftToHbkd',
      setIsHlt: 'app/setIsHlt',
      setMiniProgramType: 'app/setMiniProgramType',
      setMpType: 'app/setMpType',
      setHltHotelName: 'app/setHltHotelName',
      setIsBrideVote: 'app/setIsBrideVote',
      setChooseSongVisible: 'app/setChooseSongVisible',
      setSongSheetList: 'app/setSongSheetList',
      setIsForbidSend: 'live/setIsForbidSend',
      setGiveMarkVersion: 'game/setGiveMarkVersion',
      setSignHbConfig: 'app/setSignHbConfig',
      setHbkdRechargeNewList: 'live/setHbkdRechargeNewList',
      setLocationVal: 'live/setLocationVal',
      setIdentitySwitch: 'live/setIdentitySwitch',
      setSwitchFuligoAd: 'app/setSwitchFuligoAd',
      setSwitchContent: 'app/setSwitchContent',
    }),
    tryBootstrap() {
      if (this.$route.meta && this.$route.meta.skipAppBootstrap) {
        return;
      }
      if (this.hasBootstrapped) {
        return;
      }
      const isGuessHbPay = isEndWithX(window.location.href, 'guessHbPay');
      const urlToken = getUrlParam('token');
      if (urlToken) {
        persistToken(urlToken);
      }
      const storedToken = getStoredToken();
      if (!storedToken && !isGuessHbPay) {
        this.$store.commit('app/setNeedLogin', true);
        return;
      }
      this.hasBootstrapped = true;
      this.initializeApp(storedToken, isGuessHbPay);
    },
    initializeApp(token, isGuessHbPay) {
      if (isGuessHbPay) {
        this.setIsInOtherWeviewH5(true);
        this.initGuessHbLogic();
        return;
      }
      if (token) {
        this.setToken(token);
        this.$store.commit('app/setNeedLogin', false);
      }
      this.setLiveId(getUrlParam('liveId'));
      this.setUserPhone(getUrlParam('userPhone'));
      this.setIsHlt(getUrlParam('isHlt'));
      this.setMiniProgramType(getUrlParam('miniProgramType'));
      this.setMpType(getUrlParam('mpType'));
      this.setHotelConfig({
        type: getUrlParam('type'),
        bottom: getUrlParam('bottom'),
        enter: getUrlParam('enter'),
        userphone: getUrlParam('userphone'),
      });
      this.setIsInOtherWeviewH5(WEBVIEWH5.some((item) => isEndWithX(window.location.href, item)));
      wxApi
        .judgeEnv()
        .then(() => {
          return this.$store.state.app.env;
        })
        .then((rEnv) => {
          if (rEnv === 'h5' && isEndWithX(window.location.href, 'hotelReserve')) {
            this.initH5HotelReserveLogic();
          } else if (rEnv === 'h5') {
            wxApi.initWXAPI().then((res) => {
              console.log(res);
            });
          }
          return getLiveInfo();
        })
        .then((res) => {
          console.log('活动信息:', res);
          if (res) {
            this.handleLiveInfo(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setEnterSceneInfo() {
      if (this.$store.state.app.isInOtherWeviewH5) {
        // 其他webview容器打开应用的情况下不需要设置进入场景
        return;
      }
      if (this.$store.state.app.env === 'h5') {
        // h5版互动不需要设置进入场景
        return;
      }
      if (this.$store.state.app.mpType) {
        return;
      }
      // 进入场景
      const origin = getUrlParam('origin');
      if (origin === 'sendGift') {
        if (this.isCloseCoin && localStorage.getItem('tmpGiftId')) {
          sendGift({
            giftId: localStorage.getItem('tmpGiftId'),
          })
            .then((res1) => {
              // 更新 用户余额
              this.setUserInfo({
                money: res1.result.balance,
              });
              return sendGiftMessage({
                giftId: localStorage.getItem('tmpGiftId'),
              }); // 发送礼物的广播
            })
            .then(() => {
              localStorage.removeItem('tmpGiftId');
              this.$toast.center('发送成功!');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // 发礼物
          this.togglePopup(POPUP_MODULE.giftModule.key);
        }
      } else if (origin === 'sendGiftCarnival') {
        if (this.isCloseCoin && localStorage.getItem('tmpGiftId')) {
          sendGiftCarnival({
            giftId: localStorage.getItem('tmpGiftId'),
          })
            .then((res1) => {
              // 更新 用户余额
              this.setUserInfo({
                money: res1.result.balance,
              });
              return sendGiftMessage({
                giftId: localStorage.getItem('tmpGiftId'),
              }); // 发送礼物的广播
            })
            .then(() => {
              localStorage.removeItem('tmpGiftId');
              this.$toast.center('发送成功!');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // 发礼物
          this.togglePopup(POPUP_MODULE.giftModule.key);
        }
      } else if (origin === 'sendBapin') {
        if (this.isCloseCoin && localStorage.getItem('tmpGiftId') && localStorage.getItem('tmpGiftText')) {
          sendBapinGift({
            content: localStorage.getItem('tmpGiftText'),
            giftId: localStorage.getItem('tmpGiftId'),
          })
            .then((res1) => {
              console.log(res1);
              // 更新 用户余额
              this.setUserInfo({
                money: res1.result.balance,
              });
              return sendBapinGiftMessage({
                giftId: localStorage.getItem('tmpGiftId'),
                content: localStorage.getItem('tmpGiftText'),
              }); // 发送礼物的广播
            })
            .then(() => {
              localStorage.removeItem('tmpGiftId');
              localStorage.removeItem('tmpGiftText');
              this.$toast.center('发送成功!');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // 发霸屏
          this.togglePopup(POPUP_MODULE.bapinModule.key);
        }
      } else if (origin === 'sendPhoto') {
        if (
          this.isCloseCoin
          && localStorage.getItem('tmpGiftId')
          && localStorage.getItem('tmpGiftText')
          && localStorage.getItem('tmpGiftPicture')
        ) {
          this.uploadPhoto().then((res1) => {
            console.log(res1);
            return sendPhotoGift({
              imgUrl: res1.filePath,
              giftId: localStorage.getItem('tmpGiftId'),
              content: localStorage.getItem('tmpGiftText'),
            })
              .then((res2) => {
                // 更新 用户余额
                this.setUserInfo({
                  money: res2.result.balance,
                });
                return sendPhotoGiftMessage({
                  giftId: localStorage.getItem('tmpGiftId'),
                  content: localStorage.getItem('tmpGiftText'),
                  imgUrl: res1.filePath,
                }); // 发送礼物的广播
              })
              .then((res3) => {
                console.log(res3);
                localStorage.removeItem('tmpGiftId');
                localStorage.removeItem('tmpGiftText');
                localStorage.removeItem('tmpGiftPicture');
                this.$toast.center('发送成功!');
              })
              .catch((err) => {
                console.log(err);
              });
          });
        } else {
          // 发照片
          this.togglePopup(POPUP_MODULE.photoModule.key);
        }
      } else if (origin === 'sendDanmu') {
        if (this.isCloseCoin && localStorage.getItem('tmpGiftId') && localStorage.getItem('tmpGiftText')) {
          sendDanmuGift({
            giftId: localStorage.getItem('tmpGiftId'),
            content: localStorage.getItem('tmpGiftText'),
          })
            .then((res1) => {
              // 更新 用户余额
              this.setUserInfo({
                money: res1.result.balance,
              });
              return sendDanmuGiftMessage({
                giftId: localStorage.getItem('tmpGiftId'),
                content: localStorage.getItem('tmpGiftText'),
              }); // 发送礼物的广播
            })
            .then(() => {
              this.$toast.center('发送成功!');
              localStorage.removeItem('tmpGiftId');
              localStorage.removeItem('tmpGiftText');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // 发弹幕
          this.togglePopup(POPUP_MODULE.danmuModule.key);
        }
      } else if (origin === 'sendDanmuHby') {
        // 红包雨等待界面发弹幕
        this.$router.push({
          path: '/hby',
        });
        if (this.isCloseCoin && localStorage.getItem('tmpGiftId') && localStorage.getItem('tmpGiftText')) {
          sendDanmuGift({
            content: localStorage.getItem('tmpGiftText'),
            giftId: localStorage.getItem('tmpGiftId'),
          })
            .then((res1) => {
              // 更新 用户余额
              this.setUserInfo({
                money: res1.result.balance,
              });
              return sendDanmuGiftMessage({
                giftId: localStorage.getItem('tmpGiftId'),
                content: localStorage.getItem('tmpGiftText'),
              }); // 发送礼物的广播
            })
            .then(() => {
              this.$toast.center('发送成功!');
              localStorage.removeItem('tmpGiftId');
              localStorage.removeItem('tmpGiftText');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          timeoutTask(() => {
            this.togglePopup(POPUP_MODULE.danmuModule.key);
          }, 1000);
        }
      } else if (origin === 'purchaseEnterEffect') {
        const tmpGiftId = localStorage.getItem('tmpGiftId');
        // 购买进场特效
        buyVipEnterEffect(tmpGiftId)
          .then((res) => {
            console.log(res);
            localStorage.removeItem('tmpGiftId');
            if (res.code === '200') {
              this.$toast.center('进场特效购买成功!');
              timeoutTask(() => {
                window.location.reload();
              }, 1000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (origin === 'editInfo') {
        const tmpEditInfo = JSON.parse(localStorage.getItem('tmpEditInfo'));
        editUserInfo(tmpEditInfo)
          .then((res) => {
            localStorage.removeItem('tmpEditInfo');
            if (res.code === '200') {
              this.$toast.center('修改成功!');
              this.setUserInfo({
                name: tmpEditInfo.wx_name,
                headImg: tmpEditInfo.avator,
                relativeType: tmpEditInfo.type,
                deskNum: tmpEditInfo.table_number,
                currentStatus: tmpEditInfo.position,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (origin === 'sendDiamondHb') {
        const tmpSendDiamondHbData = JSON.parse(localStorage.getItem('tmpSendDiamondHbData'));
        sendDiamondHb(tmpSendDiamondHbData)
          .then((res) => {
            console.log(res);
            localStorage.removeItem('tmpSendDiamondHbData');
            // 更新 用户余额
            this.setUserInfo({
              money: res.user.balance,
            });
            this.$toast.center('发送成功!');
          })
          .catch((err) => {
            console.log(err);
            this.$toast.center('发送失败!');
          });
      }
      this.setOrigin('');
    },
    handleLiveInfo(res) {
      // 设置用户信息
      let tempOpenId = res.user.openid;
      if (this.$store.state.app.env === 'h5' && res.user.h5_openid) {
        console.log('设置h5版的openId');
        tempOpenId = res.user.h5_openid;
      }
      this.setUserInfo({
        userId: res.user.USER_ID,
        openId: tempOpenId,
        unionid: res.user.unionid,
        name: res.user.wx_name,
        headImg: res.user.avator,
        money: res.money.balance,
        freeSendGift: res.freeSendGift,
        miao_vip_splid: res.user.miao_vip_splid,
        miao_vip: res.user.miao_vip,
        vipLevel: res.user.vip_level,
        relativeType: res.user.type,
        currentStatus: res.user.position,
        deskNum: res.user.table_number,
        enterEffect: res.user.miao_vip_car,
        isForbidBuyHbq: res.isForBidBuyHbq,
        vip_add_recharge: res.user.vip_add_recharge,
      });
      // 设置司仪信息
      if (res.siyiInfo) {
        this.setEmceeInfo({
          highPrivilege: res.siyiInfo.high_privilege,
          isHideSuper: res.siyiInfo.is_hide_super,
          isUserH5: res.siyiInfo.is_user_h5,
          signShowPhone: res.siyiInfo.sign_show_phone,
          phone_advert_json: res.siyiInfo.phone_advert_json,
          is_open_advert: res.siyiInfo.is_open_advert,
          emcee_name: res.siyiInfo.emcee_name,
          avatar: res.siyiInfo.avator,
          comment_json: res.siyiInfo.comment_json,
          card_json: res.siyiInfo.card_json,
          rank_city: res.siyiInfo.rank_city,
          rank_country: res.siyiInfo.rank_country,
          rank_province: res.siyiInfo.rank_province,
          phonenumber: res.siyiInfo.phonenumber,
          yue_switch: res.siyiInfo.yue_switch,
          unionid: res.siyiInfo.unionid,
        });
        this.setChooseSongVisible(res.siyiInfo.is_open_music);
        if (res.siyiInfo.is_open_music === '1') {
          this.setSongSheetList(res.siyiInfo.musicList);
        }
      }
      // 进场动画
      if (res.user.miao_vip_car) {
        this.$createEnterEffect({
          name: res.user.wx_name,
          headImg: res.user.avator,
          enterEffectType: res.user.miao_vip_car,
        });
      } else {
        this.$createEnterEffect({
          name: res.user.wx_name,
          headImg: res.user.avator,
          enterEffectType: 'common',
        });
      }
      // 设置抽奖活动（幸运大转盘）的id
      if (res.splid && res.splid.activity && res.splid.activity.id) {
        // 保存对应的id
        this.setActivityId(res.splid.activity.id);
      }
      // 保存大转盘抽奖活动的奖项配置数据
      if (res.splid && res.splid.activity && res.splid.activity.prize_json) {
        // 保存抽奖活动的奖项数据
        // 1.将json数据格式进行转化
        const copy = JSON.parse(res.splid.activity.prize_json);
        const target = [];
        // 2.将奖项数据进行存储
        Object.keys(copy).forEach((key) => {
          // 如果key为数字，保存对应索引数据
          if (!Number.isNaN(Number(key))) {
            target.push({ ...copy[key] });
          }
        });
        this.setTotalAward(copy.totalPrizeCount);
        // 3.保存总奖品数量
        this.setAwardConfig(target);
      }
      // 保存大转盘抽奖人数数据
      if (res.splid && res.splid.activity && res.splid.activity.info_json) {
        const copy = JSON.parse(res.splid.activity.info_json);
        // 保存抽到一等奖的人数
        if (copy.lotterySize0) {
          this.setLotterySize0(copy.lotterySize0);
        }
        // 保存抽了奖的总人数
        if (copy.totalSize) {
          this.setTotalLotteryPerson(copy.totalSize);
        }
      }
      // 保存抽奖活动的基本设置
      if (res.splid && res.splid.activity && res.splid.activity.data_json) {
        const copy = JSON.parse(res.splid.activity.data_json);
        const { tips } = copy;
        this.setActivityIntro(tips || '');
      }
      if (res.splid && res.splid.activity && res.splid.activity.title) {
        this.setActivityTitle(res.splid.activity.title);
      }
      // 是否能够抽奖
      if (res.isCanLottery) {
        this.setIsCanLottery(res.isCanLottery);
      }
      // 是否能幸运抽奖
      if (res.sendGiftLotterySwitch) {
        this.$store.commit('live/setSendGiftLotterySwitch', res.sendGiftLotterySwitch);
      }
      // 设置活动信息
      this.setSceneType(res.splid.scenario);
      this.initRcGiftAtText();
      this.setTitle(res.splid.theme);
      this.setBackground(res.splid.phone_piclink);
      this.setQrcodeUrl(res.splid.sp_qrurl);
      this.setGiftSendVisible(res.splid.hide_gift_switch);
      this.setHbkdVisible(res.splid.hide_hbkd_switch);
      this.setHbkdRemainVisible(res.splid.hui_suo_switch);
      this.setIsFreeSendPhoto(res.splid.isFreeSendPhoto);
      this.setEmceeId(res.splid.userId);
      this.setHotelReserveIcon(res.splid.wedding_icon);
      this.setHotelReserveVisible(res.splid.is_show_wedding);
      this.setForcePhone(res.splid.forcephone);
      this.setAllFreeSendGift(res.splid.is_free_send_gift);
      this.setIsCloseCoin(res.splid.is_close_coin);
      this.setIsGiftToHbkd(res.splid.is_gift_to_hbkd);
      this.setIsBrideVote(res.splid.vote_switch);
      this.setIsForbidSend(res.splid.is_forbid_send);
      this.setIsOverDate({
        usingDate: res.splid.using_date,
        isEndWedding: res.splid.is_end_wedding,
      });
      this.setLocationVal(res.splid.location_val);
      this.setIdentitySwitch(res.splid.identity_switch);
      if (res.splid.seatSwitch && res.splid.seatSwitch === '1') {
        this.setSeatInfo(res.splid.seatList);
        if (!getSeatPopupFlag()) {
          this.togglePopup(POPUP_MODULE.seatModule.key);
          updateSeatPopupFlag();
        }
        this.setSeatSearchInfo();
      } else {
        removeSeatPopupFlag();
      }
      // 设置评分游戏版本
      this.setGiveMarkVersion(res.splid.pf_switch);
      // 设置充值列表
      this.setRechargeList(res.miaoBiList);
      this.setHbkdRechargeList(res.redBaoList);
      // 设置幸运大转盘奖项
      this.setZyzList(res.luckyNynList);
      // 设置扭一扭奖项
      this.setNynList(res.nynList);
      // 设置照片墙价格
      this.setHeartWallPrice(res.heart_wall_price);
      // 设置编辑个人信息价格
      this.setEditUserInfoPrice(res.edit_user_price);
      // 设置摄影师照片墙信息
      this.setPhotographerWallInfo({
        photo_shi_switch: res.splid.photo_shi_switch,
        photo_one_price: res.photo_one_price,
      });
      // 设置自定义签到语
      this.setCustomSignWish(res.signWish);
      // 设置logo信息
      if (res.splid.title_piclink) {
        this.setLogoInfo({
          fontColor: res.splid.title_fontcolor,
          fontSize: res.splid.title_fontsize,
          name: res.splid.title_name,
          logoPath: res.splid.title_piclink,
          logoSize: res.splid.picsize,
        });
      }
      // 设置当前婚礼堂酒店名
      this.setHltHotelName(res.splid.hotel_name);
      // 设置红包口袋New列表
      this.setHbkdRechargeNewList(res?.siyiInfo?.hbkd_str);
      // 直接点链接进入婚宴预定的情况取消执行下面的逻辑
      if (this.$store.state.app.env === 'h5' && isEndWithX(window.location.href, 'hotelReserve')) {
        return;
      }
      // 获取game状态
      this.getGameState();
      // 获取礼物列表
      this.getGiftList();
      // 获取红包口袋金额
      this.getHBKDInfo();
      // 获取喵钻红包列表
      this.$store.dispatch('live/getDiamondHbList');
      // 获取签到排名
      this.$store.dispatch('live/getSignRankList');
      // 签到红包
      if (res.is_can_rob_sun === '1') {
        this.togglePopup(POPUP_MODULE.signHbModule.key);
      }

      // 设置不需要文本内容审核的内容列表
      this.$store.commit('live/initNoMsgSeckCheckList');

      // 设置签到红包的配置信息
      if (res.splid && res.splid.sun_info_json) {
        this.setSignHbConfig(JSON.parse(res.splid.sun_info_json));
      }
      // 获取当前位置信息
      if (this.$store.state.live.locationVal) {
        this.$store.dispatch('live/initLocationLogic');
      }
      // 设置福利购广告是否可见
      this.setSwitchFuligoAd({
        fuliSwitch: res.switch_fuligo_jianlai,
        url: res.switch_fuligo_jianlai_url,
      });
      // 设置更多开关
      this.setSwitchContent(res.switch_content);
    },
    handleGiftInfo(res) {
      console.log('*****new gift_list******');
      console.log(res);
      this.setGiftList({
        giftTitleList: res.title,
        giftListObj: res.data,
      });
      // 照片类型列表赋值
      if (res.data.list4) {
        const photoTypeListFormat = formatPhotoTypeList(res.data.list4);
        this.setPhotoTypeList(photoTypeListFormat);
        this.setCurrentPhotoType(photoTypeListFormat[0].giftId);
      }
      // 霸气弹幕类型列表赋值
      const danmuTypeListFormat = formatDanmuTypeList(res.data.list2);
      this.setDanmuTypeList(danmuTypeListFormat);
      this.setCurrentDanmuType(danmuTypeListFormat[0].giftId);

      // 超级弹幕类型列表赋值
      const superDanmuTypeListFormat = formatSuperDanmuTypeList(res.data.list667);
      this.setSuperDanmuTypeList(superDanmuTypeListFormat);
      this.setCurrentSuperDanmuType(superDanmuTypeListFormat[0].giftId);

      //  霸屏类型列表赋值
      const bapinTypeListFormat = formatBapinTypeList(res.data.list3);
      this.setBapinTypeList(bapinTypeListFormat);
      this.setCurrentBapinType(bapinTypeListFormat[0].giftId);
    },
    getGameState() {
      if (this.$store.state.app.isInOtherWeviewH5) {
        // 其他webview容器打开应用的情况下不需要获取进入game状态
        return;
      }
      getGameStatus()
        .then((res) => {
          console.log('game状态:', res);
          if (res.playInfo) {
            const gameBaseInfo = getGameInfoByGameCode(res.playInfo, res?.webSocketData);
            this.$store.commit('game/setGameInfo', {
              currentGameCode: res.playInfo,
              enterType: gameBaseInfo.enterType,
              gameUrl: gameBaseInfo.gameUrl,
              needShake: gameBaseInfo.needShake,
            });
            if (res.status === '0' || res.status === '1') {
              // game等待中
              this.$store.commit('game/setGameStatus', 1);
              // game按钮出现
              if (res.playInfo === 'sign' || res.playInfo === 'hmPlay19') {
                console.log('签到或送祝福游戏无等待界面执行空操作');
              } else {
                this.$store.commit('app/setGameBtnVisible', true);
              }
              // TODO 以后这个地方需要后端优化，或者先在路由的meta中配置，然后这里直接读取meta中的配置生成
              // NOTENEW 新的游戏需要加到这里
              const specialHandleGame = [
                'hmPlay1',
                'hmPlay6',
                'hmPlay7',
                'hmPlay8',
                'hmPlay9',
                'hmPlay11',
                'hmPlay12',
                'hmPlay13',
                'hmPlay17',
                'hmPlay18',
                'hmPlay19',
                'hmPlay20',
                'hmPlay21',
                'hmPlay23',
                'hmPlay24',
                'hmPlay25',
                'hmPlay26',
                'hmPlay27',
                'hmPlay28',
                'hmPlay32',
                'hmPlay33',
                'hmPlay34',
              ];
              if (specialHandleGame.indexOf(res.playInfo) > -1 && res.status === '1') {
                // 狼吞虎咽、红包雨、摇一摇、数钞票、谁最牛、跳一跳、武松打虎、踢足球特殊处理(0表示game等待、1表示game进行中)
                this.$store.commit('game/setGameStatus', 2);
                if (res.playInfo === 'hmPlay19') {
                  this.$store.commit('app/setGameBtnVisible', true);
                  this.togglePopup(16);
                }
              }
            } else if (res.status === '2') {
              this.$store.commit('game/setGameStatus', 2);
            } else if (res.status === '3') {
              this.$store.commit('game/setGameStatus', 3);
              // game按钮消失
              this.$store.commit('app/setGameBtnVisible', false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGiftList() {
      if (this.$store.state.app.isInOtherWeviewH5) {
        // 其他webview容器打开应用的情况下不需要获取礼物列表
        return;
      }
      getGiftList()
        .then((res) => {
          console.log(res);
          this.handleGiftInfo(res);
          if (this.$store.state.app.env === 'miniProgram' || this.$store.state.app.env === 'tt') {
            this.setEnterSceneInfo();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHBKDInfo() {
      if (this.$store.state.app.isInOtherWeviewH5) {
        // 其他webview容器打开应用的情况下不需要获取红包口袋金额
        return;
      }
      getHBKDInfo()
        .then((res) => {
          console.log(res);
          this.setHbkdInfo({
            remainMoney: res.money,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initGuessHbLogic() {
      console.log('初始化猜红包逻辑');
    },
    initH5HotelReserveLogic() {
      console.log('h5直接访问婚宴预定逻辑');
      if (getUrlParam('token')) {
        return;
      }
      if (this.$store.state.app.inWeixinBrowse) {
        window.location.href = `/h5UserLogin/yunJingH51?splid=${getUrlParam('splid')}`;
        return;
      }
      getH5DirectVisitInfo()
        .then((res) => {
          console.log(res);
          window.location = `/?liveId=${getUrlParam('splid')}&token=${res.token}&isHlt=${getUrlParam('isHlt')}&time=${getUrlParam(
            'time',
          )}#/hotelReserve`;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadPhoto() {
      const formData = new FormData();
      const tmpPreviewImg = localStorage.getItem('tmpGiftPicture');
      const arr = tmpPreviewImg.split(',');
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      /* eslint-disable */
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], 'photo');
      formData.append('file', file);
      formData.append('prefix', 'love');
      return uploadPhoto(formData);
    },
    // 注入svga音频播放脚本支持
    insertAudioSupportScript() {
      const audioSupportScript = document.createElement('script');
      audioSupportScript.src = 'https://static.hudongmiao.com/joymewH5/howler.core.min.js';
      document.getElementsByTagName('head')[0].appendChild(audioSupportScript);
    },
  },
};
</script>
<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
}
body,
html {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

div {
  box-sizing: border-box;
}

#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
