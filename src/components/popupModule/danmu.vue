<template>
  <transition
    enter-active-class="slideInUp faster animated"
    leave-active-class="slideOutDown faster animated"
  >
    <div
      v-show="isShowAni"
      class="danmuModule"
    >
      <div
        v-if="sceneType === '0' || sceneType === '54'"
        class="wedding"
      >
        <div
          v-if="isGiftToHbkd"
          class="notify publicHvCenter"
        >
          <img
            src="@/assets/image/hd2/laba.png"
            class="broadIcon"
          />
          <div
            ref="ct"
            class="notifyCt"
          >
            <div
              ref="ctTxt"
              class="notifyText"
            >
              本场发送的霸气弹幕，全部进入红包口袋，最后将以红包雨的游戏返回给各位来宾
            </div>
          </div>
        </div>
        <div class="danmuBox publicVCenter">
          <div class="title publicHvCenter">霸气弹幕</div>
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '1'"
        class="qy"
      >
        <div class="danmuBox publicVCenter">
          <div class="topTitle">
            <span class="titleName">火箭弹幕</span>
            <!-- <img src="https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/closeIcon.png" alt="关闭按钮" class="closeIcon" /> -->
          </div>
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="desc">
                {{ item.wish }}
              </div>
              <div class="price publicHvCenter">
                <img
                  src="https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/diamondIcon.png"
                  class="unit"
                />
                <span class="price">{{ item.price }}</span>
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            />
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          />
        </div>
      </div>
      <div
        v-if="sceneType === '2' || sceneType === '26'"
        class="birth"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/birth/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '21'"
        class="bby"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/bby/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '22'"
        class="sy"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/sy/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '23'"
        class="crl"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/crl/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '24'"
        class="bly"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/bby/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '25'"
        class="myy"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/bby/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '41'"
        class="bydl"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/xsy/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '42'"
        class="xsy"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/xsy/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '43'"
        class="jbtm"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/jbtm/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '51'"
        class="txh"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/txh/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '52'"
        class="qqy"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/qy/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '53' || sceneType === '55'"
        class="hx"
      >
        <div class="danmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/birth/danmuTitle.png"
            class="title"
          />
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="item publicHvCenter"
              :class="[item.size, { active: currentDanmuType === item.giftId }]"
            >
              <div class="price publicHvCenter">
                {{ item.price }}
                <img
                  src="@/assets/image/icon/diamond.png"
                  class="unit"
                />
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            霸气发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '91'"
        class="zshl"
      >
        <div class="danmuBox">
          <div class="title">祥瑞弹幕</div>
          <div class="txtWrap publicHCenter">
            <textarea
              ref="text"
              v-model="content"
              maxlength="25"
              cols="30"
              rows="10"
              placeholder="请输入霸气弹幕(25字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
          </div>
          <div class="sizeWrap">
            <div
              v-for="item in danmuTypeList"
              :key="item.id"
              v-tap="{ methods: chooseDanmuType, giftId: item.giftId }"
              class="typeItem"
            >
              <div
                class="typeBox"
                :class="{ active: currentDanmuType === item.giftId }"
              >
                <div class="size">
                  {{ item.name }}
                </div>
                <div class="price publicVCenter">
                  <img
                    src="https://static.hudongmiao.com/joymewScreen/zshl/mobile/tMoney.png"
                    class="tIcon"
                  />
                  {{ item.price }}
                </div>
              </div>
              <div class="desc">
                {{ item.wish }}
              </div>
            </div>
          </div>
          <div
            v-tap="{ methods: send }"
            class="btnWrap publicHvCenter"
          >
            发送
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { sendDanmuGift, diamondRecharge } from '@/api/index/index';
import { sendDanmuGiftMessage, securityMsgCheck } from '@/api/chat/index';
import { POPUP_MODULE } from '@/assets/constant/index';
import wxApi from '@/utils/wxApi';
import { generateQuickWishBySceneType } from '@/utils/service';
import { timeoutTask, generateRandom } from '@/utils/index';

let endBroadAni = false;
let broadAniLock = false;
export default {
  name: 'DanmuPopup',
  computed: {
    ...mapState({
      danmuTypeList: (state) => state.live.danmuTypeList,
      currentDanmuType: (state) => state.app.currentDanmuType,
      money: (state) => state.user.money,
      freeSendGift: (state) => state.user.freeSendGift,
      allFreeSendGift: (state) => state.live.allFreeSendGift,
      sceneType: (state) => state.live.sceneType,
      env: (state) => state.app.env,
      isCloseCoin: (state) => state.app.isCloseCoin,
      isGiftToHbkd: (state) => state.app.isGiftToHbkd,
      customSignWish: (state) => state.live.customSignWish,
      isForbidSend: (state) => state.live.isForbidSend,
    }),
  },
  created() {
    if (window.location.href.indexOf('hby') > -1) {
      this.gift_source = 'hby';
    }
  },
  beforeDestroy() {
    endBroadAni = true;
    broadAniLock = false;
  },
  mounted() {
    // 执行弹出动画
    this.showAniStart();
    if (this.sceneType === '0' && this.isGiftToHbkd) {
      this.$nextTick(() => {
        endBroadAni = false;
        this.broadInnerWidth = this.$refs.ct.offsetWidth * 0.13;
        this.broadContentWidth = this.$refs.ctTxt.offsetWidth * 0.13;
        this.startBroadAni();
      });
    }
  },
  data() {
    return {
      isShowAni: false, // 控制bapin box弹出动画
      content: '',
      gift_source: '',
    };
  },
  methods: {
    ...mapMutations({
      setCurrentDanmuType: 'app/setCurrentDanmuType',
      setUserInfo: 'user/setUserInfo',
      togglePopup: 'app/togglePopup',
      setOrigin: 'app/setOrigin',
    }),
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    chooseDanmuType(d) {
      _hmt.push(['_trackEvent', '霸气弹幕弹框', '点击', '选择霸气弹幕类型']);
      this.setCurrentDanmuType(d.giftId);
    },
    ganerateRandomWish() {
      _hmt.push(['_trackEvent', '霸气弹幕', '点击', '点击语录']);
      if (this.customSignWish.length > 0) {
        console.log('自定义语录', this.customSignWish);
        const sourceQuickWish = this.customSignWish.map((item) => item.bless_str);
        const quickWishLen = sourceQuickWish.length;
        this.content = sourceQuickWish[generateRandom(0, quickWishLen)];
        return;
      }
      this.content = generateQuickWishBySceneType(this.sceneType);
    },
    sendFreeGiftLogic() {
      this.$loading('发送中...');
      securityMsgCheck(this.content)
        .then((res) => {
          console.log(res);
          const tmpSecCheckResult = JSON.parse(res.msg_sec_check);
          if (tmpSecCheckResult.result.suggest === 'pass') {
            console.log('通过内容安全审核');
            this.sendBroadcast(this.content);
            this.content = '';
            this.$loading.close();
            this.$toast.center('发送成功!');
            this.togglePopup();
          } else {
            console.log('内容非法!');
            this.content = '';
            this.$loading.close();
            this.$toast.center('内容非法!');
            this.togglePopup();
          }
        })
        .catch((err) => {
          console.log(err);
          console.log('审核api调用异常,放行!');
          this.sendBroadcast(this.content);
          this.content = '';
          this.$loading.close();
          this.$toast.center('发送成功!');
          this.togglePopup();
        });
    },
    send() {
      localStorage.removeItem('tmpGiftId');
      localStorage.removeItem('tmpGiftText');
      _hmt.push(['_trackEvent', '霸气弹幕弹框', '点击', '发送霸气弹幕']);
      if (!this.validateSend()) {
        return;
      }
      if (this.freeSendGift || this.allFreeSendGift) {
        this.sendFreeGiftLogic();
        return;
      }
      this.$loading('发送中...');
      securityMsgCheck(this.content)
        .then((res) => {
          console.log(res);
          const tmpSecCheckResult = JSON.parse(res.msg_sec_check);
          if (tmpSecCheckResult.result.suggest === 'pass') {
            console.log('通过内容安全审核');
            sendDanmuGift({
              content: this.content,
              giftSource: this.gift_source,
            })
              .then((res1) => {
                this.$loading.close();
                // 更新 用户余额
                this.setUserInfo({
                  money: res1.result.balance,
                });
                return this.sendBroadcast(this.content); // 发送礼物的广播
              })
              .then(() => {
                this.content = '';
                this.$toast.center('发送成功!');
                this.togglePopup();
              })
              .catch((err) => {
                console.log(err);
                this.$loading.close();
              });
          } else {
            console.log('内容非法!');
            this.$loading.close();
            this.content = '';
            this.$toast.center('内容非法!');
            this.togglePopup();
          }
        })
        .catch((err) => {
          console.log(err);
          console.log('审核api调用异常,放行!');
          sendDanmuGift({
            content: this.content,
            giftSource: this.gift_source,
          })
            .then((res1) => {
              this.$loading.close();
              // 更新 用户余额
              this.setUserInfo({
                money: res1.result.balance,
              });
              return this.sendBroadcast(this.content); // 发送礼物的广播
            })
            .then(() => {
              this.content = '';
              this.$toast.center('发送成功!');
              this.togglePopup();
            })
            .catch((err) => {
              console.log(err);
              this.$loading.close();
            });
        });
    },
    /**
     * 跳转支付页
     */
    newJumpPay({ total, giftId, giftText }) {
      wxApi.navigateTo(
        `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${total}&giftId=${giftId}&origin=${this.$store.state.app.origin}&giftText=${giftText}`,
      );
    },
    validateSend() {
      let flag = true;
      const choosedDanmuType = this.danmuTypeList.find((item) => item.giftId === this.currentDanmuType);
      if (!this.currentDanmuType) {
        flag = false;
        this.$toast.center('请选择弹幕类型!');
      } else if (!this.content) {
        flag = false;
        this.$toast.center('请输入弹幕内容!');
      } else if (this.freeSendGift) {
        flag = true;
      } else if (this.allFreeSendGift) {
        flag = true;
      } else if (choosedDanmuType.price > this.money) {
        flag = false;
        if (this.env === 'miniProgram' || this.env === 'tt') {
          if (this.gift_source === 'hby') {
            // 红包雨等待界面的霸气弹幕
            this.setOrigin('sendDanmuHby');
          } else {
            this.setOrigin('sendDanmu');
          }
          if (this.isCloseCoin) {
            if (this.$store.state.app.mpType) {
              this.setOrigin('sendDanmu');
              // 新的跳转逻辑
              this.newJumpPay({
                total: choosedDanmuType.price,
                giftId: this.currentDanmuType,
                giftText: this.content,
              });
            } else {
              // 旧的跳转逻辑
              localStorage.setItem('tmpGiftId', this.currentDanmuType);
              localStorage.setItem('tmpGiftText', this.content);
              wxApi.navigateTo(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${choosedDanmuType.price}&giftId=${this.currentBapinType}&origin=${this.$store.state.app.origin}`,
              );
            }
          } else {
            this.$toast.center('余额不足,请充值!');
            this.togglePopup();
            timeoutTask(() => {
              this.togglePopup(POPUP_MODULE.rechargeModule.key);
            }, 200);
          }
        } else if (this.env === 'h5') {
          diamondRecharge({
            total: choosedDanmuType.price,
          })
            .then((res) => {
              console.log(res);
              return wxApi.pay(res);
            })
            .then(() => {
              // 前端处理用户余额增加
              const tmpRemainMoney = (parseFloat(this.money) + parseFloat(choosedDanmuType.price)).toFixed(2);
              this.setUserInfo({
                money: tmpRemainMoney,
              });
              this.send();
            })
            .catch((err) => {
              console.log(err);
              this.$toast.center('充值失败!');
            });
        }
      }
      return flag;
    },
    sendBroadcast(content) {
      const sendType = this.freeSendGift || this.allFreeSendGift ? '1' : '';
      sendDanmuGiftMessage({
        content,
        sendType,
      });
    },
    startBroadAni() {
      if (endBroadAni) {
        return;
      }
      if (broadAniLock) {
        return;
      }
      broadAniLock = true;
      const tmpDistance = this.broadInnerWidth + this.broadContentWidth;
      const tmpDuration = parseInt(tmpDistance / 8, 10);
      if (this.$refs.ctTxt) {
        this.$refs.ctTxt.style.transition = `transform ${tmpDuration}s linear`;
        this.$refs.ctTxt.style.transform = `translate3d(-${tmpDistance}vw,0vw,0vw)`;
      }
      console.log(tmpDuration);
      timeoutTask(() => {
        broadAniLock = false;
        if (this.$refs.ctTxt) {
          this.$refs.ctTxt.style.transition = 'none 0s linear 0s';
          this.$refs.ctTxt.style.transform = 'translate3d(0vw,0vw,0vw)';
        }
        timeoutTask(() => {
          this.startBroadAni();
        }, 500);
      }, tmpDuration * 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.danmuModule {
  position: absolute;
  width: 100%;
  bottom: 0;

  .wedding {
    .notify {
      width: 684px;
      height: 70px;
      font-size: 28px;
      font-weight: 400;
      color: #ffffff;
      margin-bottom: 10px;
      background-image: url('~@/assets/image/hd2/textBg.png');
      background-size: 100% 100%;
      margin-left: 34px;

      .broadIcon {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }

      .notifyCt {
        width: 618px;
        height: 40px;
        overflow: hidden;
        position: relative;

        .notifyText {
          position: absolute;
          white-space: nowrap;
          transition-property: transform;
          transition-timing-function: linear;
          left: 0px;
        }
      }
    }

    .danmuBox {
      width: 750px;
      height: 670px;
      background: #ffffff;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      flex-direction: column;

      .title {
        width: 410px;
        height: 76px;
        background: linear-gradient(276deg, #ff7171 0%, #e42c2c 100%);
        border-radius: 0px 0px 20px 20px;
        font-size: 40px;
        font-weight: 500;
        color: #ffffff;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #71b3ff 0%, #2c82e4 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #2c82e4;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #c571ff 0%, #e42cd5 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #e42cd5;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff7171 0%, #e42c2c 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #e42c2c;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 164px;
          font-size: 28px;
          padding: 20px 32px;
          color: #4a465d;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(99deg, #f836a8, #5817bb 100%) 1 1;
          border-radius: 12px;

          &::placeholder {
            font-size: 28px;
            color: #b4b7bd;
          }
        }
        .ylBtn {
          width: 88px;
          height: 48px;
          background: #ff7a7a;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 418px;
        height: 90px;
        margin-top: 46px;
        background: linear-gradient(300deg, #c76bfb 0%, #ea1775 100%);
        font-size: 32px;
        font-weight: 400;
        color: #ffffff;
        border-radius: 10px;
      }
    }
  }

  .qy {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 700px;
      flex-direction: column;
      background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/rocketDanmuBg.png');
      background-size: 100% 674px;
      background-repeat: no-repeat;
      background-position-y: 94px;
      .topTitle {
        height: 94px;
        background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/topBg.png');
        background-size: 100% 100%;
        position: relative;
        color: #fff;
        font-size: 32px;
        line-height: 94px;
        font-weight: 500;
        text-align: center;
        width: 100%;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 50px;
        column-gap: 23px;

        .item {
          width: 161px;
          height: 162px;
          position: relative;
          flex-direction: column;
          &::after {
            content: '';
            display: block;
            width: 150px;
            height: 80px;
            background-size: 100% 100%;
            position: absolute;
            top: 8px;
          }
          &.active {
            &::before {
              content: '';
              display: block;
              width: 161px;
              height: 162px;
              position: absolute;
              top: 0;
              left: 0;
              background-size: 100% 100%;
              background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/selected.png');
            }
          }

          &.small {
            background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/blue.png');

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &::after {
              background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/greenDragon.png');
            }
          }

          &.mid {
            background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/yellow.png');

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &::after {
              background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/redDragon.png');
            }
          }

          &.large {
            background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/red.png');

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }
            &::after {
              background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/blueDragon.png');
            }
          }

          .price {
            width: 102px;
            height: 34px;
            font-size: 24px;
            color: #fff;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-right: 8px;
            }
          }
          .desc {
            font-size: 24px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 12vw;
          }
        }
      }

      .txtWrap {
        margin-top: 45px;
        position: relative;

        textarea {
          width: 710px;
          height: 126px;
          font-size: 28px;
          padding: 20px 100px 20px 32px;
          color: #864848;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-radius: 12px;
          background-color: #fff;

          &::placeholder {
            font-size: 28px;
            color: #864848;
          }
        }

        .ylBtn {
          width: 66px;
          height: 66px;
          background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/yl.png');
          background-size: 100% 100%;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }
      .btnWrap {
        width: 399px;
        height: 130px;
        background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/sendBtn.png');
        background-size: 100% 100%;
        margin-top: 22px;
      }
    }
  }

  .birth {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background-color: #e4fcff;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #849cef;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(270deg, #ffbfc7 0%, #72b2ff 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #849cef;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #81a4ff;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #83effe, #00bdff 100%);
        border-radius: 8px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .bby {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background-color: #f9eded;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #ef8484;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(106deg, #6af0ff 0%, #ff65a0 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #ef8484;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #ff96c8;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #ff9dba, #ff5b89 100%);
        border-radius: 8px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .sy {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background-color: #f13333;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #fff;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(106deg, #f6be70 0%, #f7d8b2 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #ef8484;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #ff7a7a;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #f6be70, #f7d8b2 100%);
        border-radius: 8px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .crl {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background: linear-gradient(140deg, #ffbec1, #fff0cf 100%, #ccf7ff 100%);
      backdrop-filter: blur(26px);
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #fff;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(106deg, #ff65a0 0%, #6af0ff 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #ef8484;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #42b7c9;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background-image: url('../../assets/image/hd2/crl/btnBottom.png');
        background-size: 100% 100%;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .bly {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background-color: #f9eded;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #ef8484;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(106deg, #6af0ff 0%, #ff65a0 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #ef8484;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #ff96c8;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #ff9dba, #ff5b89 100%);
        border-radius: 8px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .myy {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background-color: #f9eded;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #ef8484;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(106deg, #6af0ff 0%, #ff65a0 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #ef8484;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #ff96c8;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #ff9dba, #ff5b89 100%);
        border-radius: 8px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .bydl {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background: #ddffd8;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #8bc986;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(270deg, #58d297 0%, #a8f56b 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #8bc986;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #58d297;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(270deg, #58d297 0%, #a8f56b 100%);
        border-radius: 12px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .xsy {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background: #fff5c0;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #ef8484;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(106deg, #ffc9d3 0%, #ff4352 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #ef8484;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #ff7d89;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #ffa7ac, #ff1428 100%);
        border-radius: 12px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .jbtm {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background: #fff5c0;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #ef8484;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(106deg, #ffc9d3 0%, #ff4352 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #ef8484;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #ff7d89;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #ffa7ac, #ff1428 100%);
        border-radius: 12px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .txh {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 614px;
      background-image: url('../../assets/image/hd2/txh/danmuBoxBg.png');
      background-size: 100% 100%;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #dbcda0;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(90deg, #dbcda0, #ab8a4c 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #dbcda0;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #6c4c39;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #586727 0%, #a12126 100%);
        border-radius: 12px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .qqy {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background-color: #f24848;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #ffffff;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(99deg, #f6be70, #f7d8b2 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #ef8484;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #ff7a7a;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #f2ed90, #f5cc74 100%);
        border-radius: 8px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .hx,.wl {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .danmuBox {
      width: 750px;
      height: 672px;
      background-color: #d8ecff;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .sizeWrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;

        .item {
          width: 200px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 48px;
              height: 48px;
              border: 2px solid #ffffff;
              border-radius: 50%;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 68px;
              height: 68px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: 10px;
            right: -30px;
            font-size: 24px;
            color: #8a4e41;
            letter-spacing: 1px;

            .unit {
              width: 28px;
              height: 21px;
              margin-left: 6px;
            }
          }

          .size {
            color: #ffffff;
            border-radius: 50%;
            border: solid 1px #ffffff;
          }

          .desc {
            font-size: 28px;
            letter-spacing: 1px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #8695c9;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(99deg, #83effe, #00bdff 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #8695c9;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #84c0e7;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #fff;
          position: absolute;
          top: 20px;
          right: 32px;
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #83effe 0%, #00bdff 100%);
        border-radius: 8px;
        margin-top: 48px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 500;
      }
    }
  }

  .zshl {
    .danmuBox {
      width: 750px;
      height: 750px;
      background-color: #ffd997;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('https://ustatic.joymew.com/joymewScreen/zshl/mobile/bg.png');
      .title {
        width: 382px;
        height: 112px;
        background-image: url('https://ustatic.joymew.com/joymewScreen/zshl/mobile/titBg.png');
        background-size: 100% 100%;
        margin: 0 auto;
        font-size: 44px;
        color: #b92525;
        text-align: center;
        font-weight: 600;
        line-height: 112px;
        white-space: nowrap;
        padding-left: 30px;
        letter-spacing: 48px;
      }

      .txtWrap {
        margin-top: 75px;
        position: relative;

        textarea {
          width: 710px;
          height: 160px;
          font-size: 32px;
          padding: 25px 20px;
          color: #bc3724;
          outline: none;
          box-sizing: border-box;
          border: 2px solid #bc3724;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: rgba(188, 55, 36, 0.5);
          }
        }
      }

      .sizeWrap {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;

        .typeItem {
          width: 230px;
          height: 158px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .typeBox {
            width: 100%;
            height: 141px;
            background-size: 100% 100%;
            border-radius: 20px;
            line-height: 1.2;
            padding-top: 6vw;
            .size {
              font-size: 28px;
              font-weight: 400;
            }
            .price {
              font-size: 24px;
              font-weight: 400;
              .tIcon {
                width: 20px;
                height: 20px;
                margin-right: 6px;
              }
            }
            &.active {
              transform: scale(1.2);
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 20px;
            color: #333333;
            text-align: center;
          }

          &:nth-child(1) {
            .typeBox {
              padding-left: 16vw;
              background-image: url('https://ustatic.joymew.com/joymewMp/long.png');
              color: #ffe4a1;
            }
          }

          &:nth-child(2) {
            width: 226px;
            .typeBox {
              padding-left: 17vw;
              background-image: url('https://ustatic.joymew.com/joymewMp/fehuang.png');
              color: #b92525;
            }
          }

          &:nth-child(3) {
            .typeBox {
              padding-left: 15vw;
              background-image: url('https://ustatic.joymew.com/joymewMp/qilin.png');
              color: #fad9a6;
            }
          }
        }
      }

      .btnWrap {
        width: 538px;
        height: 105px;
        margin: 10vw auto 0 auto;
        color: #fad9a6;
        font-size: 32px;
        font-weight: 500;
        background-size: 100% 100%;
        background-image: url('https://static.hudongmiao.com/joymewScreen/zshl/mobile/giftSendBtn.png');
      }
    }
  }
}
</style>
