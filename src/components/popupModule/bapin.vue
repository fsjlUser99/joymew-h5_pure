<template>
  <transition
    enter-active-class="slideInUp faster animated"
    leave-active-class="slideOutDown faster animated"
  >
    <div
      v-show="isShowAni"
      class="bapinModule"
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
              本场发送的祝福横幅，全部进入红包口袋，最后将以红包雨的游戏返回给各位来宾
            </div>
          </div>
        </div>
        <div class="bapinBox publicVCenter">
          <div class="title publicHvCenter">祝福横幅</div>
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '1'"
        class="qy"
      >
        <div class="bapinBox publicVCenter">
          <div class="topTitle">
            <span class="titleName">祝福横幅</span>
            <!-- <img src="https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/closeIcon.png" alt="关闭按钮" class="closeIcon" /> -->
          </div>
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <div
              class="headImgBox publicHvCenter"
              v-show="previewCtVisible"
              :class="currentBapinType"
            >
              <img
                :src="headImg"
                class="headImg"
              />
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">
                  {{ item.shijian }}
                  <span class="second">秒</span>
                </div>
                <div class="price publicVCenter">
                  <span>{{ item.price }}</span>
                  <img src="https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/birth/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '21'"
        class="bby"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/bby/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '22'"
        class="sy"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/sy/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '23'"
        class="crl"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/crl/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '24'"
        class="bly"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/bby/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '25'"
        class="myy"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/bby/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '41'"
        class="bydl"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/bydl/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '42'"
        class="xsy"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/xsy/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '43'"
        class="jbtm"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/jbtm/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '51'"
        class="txh"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/txh/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '52'"
        class="qqy"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/qy/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '53' || sceneType === '55'"
        class="hx"
      >
        <div class="bapinBox publicVCenter">
          <img
            src="@/assets/image/hd2/hx/bapinTitle.png"
            class="title"
          />
          <div class="effectPreview">
            <transition
              enter-active-class="slideInRight faster animated"
              leave-active-class="slideOutLeft faster animated"
            >
              <div
                v-show="previewVisible"
                ref="effectPreview"
                class="effectPreviewContent"
              />
            </transition>
            <img
              v-show="previewCtVisible"
              :src="headImg"
              class="headImg"
            />
            <div
              v-show="previewCtVisible"
              class="name"
            >
              {{ name }}
            </div>
            <div
              v-show="previewCtVisible"
              class="content"
            >
              {{ previewWish }}
            </div>
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/icon/diamond.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
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
            发送
          </div>
        </div>
      </div>
      <div
        class="zshl"
        v-if="sceneType === '91'"
      >
        <div class="bapinBox">
          <div class="title">
            <span class="titleText">祝福横幅</span>
          </div>
          <div class="effectPreview">
            <img
              :src="previewWish"
              v-if="previewVisible"
            />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in bapinTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseBapinType, giftId: item.giftId }"
              class="typeItem"
            >
              <div
                class="typeBox"
                :class="{ active: currentBapinType === item.giftId }"
              >
                <div class="time">{{ item.shijian }}秒</div>
                <div class="price publicVCenter">
                  <img
                    src="https://static.hudongmiao.com/joymewScreen/zshl/mobile/tMoney.png"
                    class="tIcon"
                  />
                  {{ item.price }}
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="请输入祝福内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
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
import { sendBapinGift, diamondRecharge } from '@/api/index/index';
import { sendBapinGiftMessage, securityMsgCheck } from '@/api/chat/index';
import { POPUP_MODULE } from '@/assets/constant/index';
import { BapinLove, BapinEnterprise, ZSHL_BAPIN_PREVIEW } from '@/assets/constant/effect';
import SVGA from 'svgaplayerweb';
import wxApi from '@/utils/wxApi';
import { generateQuickWishBySceneType } from '@/utils/service';
import { timeoutTask, generateRandom } from '@/utils/index';

let endBroadAni = false;
let broadAniLock = false;

export default {
  name: 'BapinPopup',
  computed: {
    ...mapState({
      bapinTypeList: (state) => state.live.bapinTypeList,
      currentBapinType: (state) => state.app.currentBapinType,
      money: (state) => state.user.money,
      freeSendGift: (state) => state.user.freeSendGift,
      allFreeSendGift: (state) => state.live.allFreeSendGift,
      headImg: (state) => state.user.headImg,
      name: (state) => state.user.name,
      sceneType: (state) => state.live.sceneType,
      env: (state) => state.app.env,
      isCloseCoin: (state) => state.app.isCloseCoin,
      isGiftToHbkd: (state) => state.app.isGiftToHbkd,
      customSignWish: (state) => state.live.customSignWish,
      isForbidSend: (state) => state.live.isForbidSend,
    }),
  },
  beforeDestroy() {
    this.destroySvga();
    endBroadAni = true;
    broadAniLock = false;
  },
  created() {},
  mounted() {
    // 执行弹出动画
    this.showAniStart();
    console.log('***bapinTypeList***');
    console.log(this.bapinTypeList);
    this.playPreviewAni();
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
      previewVisible: false,
      previewWish: '',
      previewCtVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setCurrentBapinType: 'app/setCurrentBapinType',
      setUserInfo: 'user/setUserInfo',
      togglePopup: 'app/togglePopup',
      setOrigin: 'app/setOrigin',
    }),
    destroySvga() {
      console.log('销毁');
      if (this.SVGAPlayer) {
        this.SVGAPlayer.stopAnimation();
        this.SVGAPlayer.clear();
        this.SVGAPlayer = null;
      }
    },
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    chooseBapinType(d) {
      _hmt.push(['_trackEvent', '祝福横幅弹框', '点击', '选择类型']);
      this.setCurrentBapinType(d.giftId);
      this.playPreviewAni();
    },
    ganerateRandomWish() {
      _hmt.push(['_trackEvent', '祝福横幅弹框', '点击', '点击语录']);
      if (this.customSignWish.length > 0) {
        console.log('自定义语录', this.customSignWish);
        const sourceQuickWish = this.customSignWish.map((item) => item.bless_str);
        const quickWishLen = sourceQuickWish.length;
        this.content = sourceQuickWish[generateRandom(0, quickWishLen)];
        return;
      }
      this.content = generateQuickWishBySceneType(this.sceneType);
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
      const choosedBapinType = this.bapinTypeList.find((item) => item.giftId === this.currentBapinType);
      if (!this.currentBapinType) {
        flag = false;
        this.$toast.center('请选择霸屏类型!');
      } else if (!this.content) {
        flag = false;
        this.$toast.center('请输入霸屏内容!');
      } else if (this.freeSendGift) {
        flag = true;
      } else if (this.allFreeSendGift) {
        flag = true;
      } else if (choosedBapinType.price > this.money) {
        flag = false;
        if (this.env === 'miniProgram' || this.env === 'tt') {
          this.setOrigin('sendBapin');
          if (this.isCloseCoin) {
            if (this.$store.state.app.mpType) {
              // 新的跳转逻辑
              this.newJumpPay({
                total: choosedBapinType.price,
                giftId: this.currentBapinType,
                giftText: this.content,
              });
            } else {
              // 旧的跳转逻辑
              localStorage.setItem('tmpGiftId', this.currentBapinType);
              localStorage.setItem('tmpGiftText', this.content);
              wxApi.navigateTo(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${choosedBapinType.price}&giftId=${this.currentBapinType}&origin=${this.$store.state.app.origin}`,
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
            total: choosedBapinType.price,
          })
            .then((res) => {
              console.log(res);
              return wxApi.pay(res);
            })
            .then(() => {
              // 前端处理用户余额增加
              const tmpRemainMoney = (parseFloat(this.money) + parseFloat(choosedBapinType.price)).toFixed(2);
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
    playPreviewAni() {
      if (this.sceneType === '91') {
        console.log('中式婚礼霸屏预览');
        // 1、销毁视频预览元素
        this.previewVisible = false;
        this.previewWish = '';
        // 2、延迟0.3秒后重新创建预览元素
        timeoutTask(() => {
          let tmpIndex = -1;
          for (let i = 0; i < this.bapinTypeList.length; i += 1) {
            if (this.bapinTypeList[i].giftId === this.currentBapinType) {
              tmpIndex = i;
              break;
            }
          }
          this.previewWish = ZSHL_BAPIN_PREVIEW[tmpIndex];
          this.previewVisible = true;
        }, 300);
        return;
      }
      this.previewCtVisible = false;
      this.previewVisible = false;
      this.destroySvga();
      timeoutTask(() => {
        this.$nextTick(() => {
          let tmpIndex = -1;
          let tmpBapinStr = '';
          let tmpBapinSvga = '';
          for (let i = 0; i < this.bapinTypeList.length; i += 1) {
            if (this.bapinTypeList[i].giftId === this.currentBapinType) {
              tmpIndex = i;
              break;
            }
          }
          tmpBapinStr = this.sceneType === '1' ? `bapinEnterprise${tmpIndex + 1}` : `bapinLove${tmpIndex + 1}`;
          tmpBapinSvga = this.sceneType === '1' ? BapinEnterprise[tmpBapinStr] : BapinLove[tmpBapinStr];
          this.SVGAPlayer = new SVGA.Player(this.$refs.effectPreview);
          this.$svgaParser.load(
            tmpBapinSvga,
            (videoItem) => {
              this.SVGAPlayer.setVideoItem(videoItem);
              this.SVGAPlayer.startAnimation();
              this.previewVisible = true;
              if (this.customSignWish.length > 0) {
                const sourceQuickWish = this.customSignWish.map((item) => item.bless_str);
                const quickWishLen = sourceQuickWish.length;
                this.previewWish = sourceQuickWish[generateRandom(0, quickWishLen)];
              } else {
                this.previewWish = generateQuickWishBySceneType(this.sceneType);
              }

              timeoutTask(() => {
                this.previewCtVisible = true;
              }, 500);
            },
            (err) => {
              return Promise.reject(err);
            },
          );
        });
      }, 500);
    },
    sendFreeGiftLogic() {
      this.$loading('发送中...');
      if (this.$store.state.live.noMsgSeckCheckList.indexOf(this.content) > -1) {
        console.log('不需要内容安全审核!');
        this.sendBroadcast(this.content);
        this.content = '';
        this.$loading.close();
        this.$toast.center('发送成功!');
        this.togglePopup();
      } else {
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
      }
    },
    send() {
      _hmt.push(['_trackEvent', '祝福横幅弹框', '点击', '发送祝福横幅']);
      localStorage.removeItem('tmpGiftId');
      localStorage.removeItem('tmpGiftText');
      if (!this.validateSend()) {
        return;
      }
      if (this.freeSendGift || this.allFreeSendGift) {
        this.sendFreeGiftLogic();
        return;
      }
      this.$loading('发送中...');
      if (this.$store.state.live.noMsgSeckCheckList.indexOf(this.content) > -1) {
        console.log('不需要内容安全审核!');
        sendBapinGift({
          content: this.content,
        })
          .then((res1) => {
            console.log(res1);
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
          });
      } else {
        securityMsgCheck(this.content)
          .then((res) => {
            console.log(res);
            const tmpSecCheckResult = JSON.parse(res.msg_sec_check);
            if (tmpSecCheckResult.result.suggest === 'pass') {
              console.log('通过内容安全审核');
              sendBapinGift({
                content: this.content,
              })
                .then((res1) => {
                  console.log(res1);
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
                });
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
            sendBapinGift({
              content: this.content,
            })
              .then((res1) => {
                console.log(res1);
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
              });
          });
      }
    },
    sendBroadcast(content) {
      const sendType = this.freeSendGift || this.allFreeSendGift ? '1' : '';
      sendBapinGiftMessage({
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
.bapinModule {
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background: #170d41;

      .title {
        width: 376px;
        height: 72px;
        background: linear-gradient(276deg, #ff7171 0%, #e42c2c 100%);
        border-radius: 0px 0px 20px 20px;
        font-size: 40px;
        font-weight: 500;
        color: #ffffff;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #71b3ff 0%, #2c82e4 100%);

              &.active {
                box-shadow: 0px 0px 50px #2c82e4;
              }
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff7171 0%, #e42c2c 100%);

              &.active {
                box-shadow: 0px 0px 50px #e42c2c;
              }
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #c571ff 0%, #e42cd5 100%);

              &.active {
                box-shadow: 0px 0px 50px #e42cd5;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #e49e2c 0%, #ffc27f 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc27f;
              }
            }

            .desc {
              color: #e59f2f;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 32px;
        position: relative;

        textarea {
          width: 710px;
          height: 164px;
          font-size: 28px;
          padding: 20px 32px;
          padding-right: 18vw;
          color: #b4b7bd;
          outline: none;
          box-sizing: border-box;
          border-image: linear-gradient(99deg, #f836a8, #5817bb 100%) 1 1;
          border-radius: 12px;
          background-color: transparent;

          &::placeholder {
            font-size: 28px;
            color: #4a465d;
          }
        }

        .ylBtn {
          width: 88px;
          height: 48px;
          background: #231f44;
          border-radius: 10px;
          font-size: 28px;
          font-weight: 400;
          color: #c2baf5;
          position: absolute;
          top: 80px;
          right: 30px;
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

    .bapinBox {
      width: 750px;
      height: 898px;
      flex-direction: column;
      background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/cardBg.png');
      background-size: 100% 804px;
      background-position-y: 94px;
      background-repeat: no-repeat;

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
        .closeIcon {
          width: 98px;
          height: 98px;
          position: absolute;
          top: 0px;
          right: 0px;
        }
      }

      .effectPreview {
        width: 100%;
        height: 280px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }
        .headImgBox {
          position: absolute;
          width: 125px;
          height: 125px;
          top: 22px;
          left: 262px;
          z-index: 1;
          border-radius: 50%;
          background-color: #52d2ff;
          .headImg {
            width: 92%;
            height: 92%;
            border-radius: 50%;
          }
          &.Miao_Bp_2_qy {
            top: 5.467vw;
            left: 42vw;
            background-color: #f24c3f;
          }
          &.Miao_Bp_3_qy {
            top: 6.467vw;
            left: 41vw;
            background-color: #fffcaa;
          }
          &.Miao_Bp_4_qy {
            top: 50px;
            left: 320px;
            width: 106px;
            height: 106px;
            background-color: #fedd67;
          }
        }

        .content {
          font-size: 4vw;
          font-weight: 700;
          color: #fff;
          left: 9vw;
          top: 22vw;
          letter-spacing: 0.667vw;
          width: 79vw;
          height: 6vw;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }
      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;
          position: relative;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;
            background-size: 100% 100%;
            position: relative;
            .time {
              font-size: 32px;
              font-weight: 400;
              color: #ffffff;
              .second {
                font-size: 18px;
              }
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 22px;
              flex-direction: column;
              img {
                width: 30px;
                height: 23px;
                margin-top: 6px;
              }
            }
            &.active {
              &.active {
                &::before {
                  content: '';
                  display: block;
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  background-size: 100% 100%;
                  background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/selected.png');
                }
              }
              &::after {
                content: '';
                background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/textSelected.png');
                width: 131px;
                height: 43px;
                background-size: 100% 100%;
                position: absolute;
                bottom: -55px;
              }
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/blueCard.png');
            }

            .desc {
              color: #badaff;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/redCard.png');
            }

            .desc {
              color: #ffd9d9;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/purpleCard.png');
            }

            .desc {
              color: #ffbdfc;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/goldCard.png');
            }

            .desc {
              color: #ffe7c1;
            }
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
        background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/sendBtn.png');
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #e4fcff;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #e59f2f;
            }
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #f9eded;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #e59f2f;
            }
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #f13333;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #badaff;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #ffd9d9;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #ffbdfc;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #ffe7c1;
            }
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background: linear-gradient(140deg, #ffbec1, #fff0cf 100%, #ccf7ff 100%);
      backdrop-filter: blur(26px);

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #e232d9;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #e59f2f;
            }
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #f9eded;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #e59f2f;
            }
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #f9eded;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #e59f2f;
            }
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #ddffd8;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #e232d9;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #e59f2f;
            }
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #fff5c0;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #e232d9;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #e59f2f;
            }
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
        background-image: url('../../assets/image/hd2/xsy/btnBottom.png');
        background-size: 100% 100%;
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #fff5c0;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #e232d9;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #e59f2f;
            }
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
        background-image: url('../../assets/image/hd2/xsy/btnBottom.png');
        background-size: 100% 100%;
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #fff5c0;
      background-image: url('../../assets/image/hd2/txh/danmuBoxBg.png');
      background-size: 100% 100%;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #e232d9;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #e59f2f;
            }
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #f24848;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 234px;
        background-color: #000;
        margin-top: 32px;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 46px;
        justify-content: space-around;
        width: 90%;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            border-radius: 8px;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #ffffff;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #71b3ff;
              }
            }

            .desc {
              color: #badaff;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

              &.active {
                box-shadow: 0px 0px 50px #ff7a7a;
              }
            }

            .desc {
              color: #ffd9d9;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #ffbdfc;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #ffe7c1;
            }
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

    .bapinBox {
      width: 750px;
      height: 900px;
      flex-direction: column;
      background-color: #d8ecff;

      .title {
        width: 342px;
        height: 72px;
      }

      .effectPreview {
        width: 100%;
        height: 260px;
        background-color: #000;
        margin: 32px auto 0 auto;
        position: relative;

        .effectPreviewContent {
          width: 100%;
          height: 100%;
        }

        .headImg {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          top: 75px;
          left: 122px;
          z-index: 1;
        }

        .name {
          font-size: 21px;
          color: #fdf47b;
          position: absolute;
          left: 250px;
          top: 70px;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          z-index: 1;
        }

        .content {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          left: 268px;
          top: 105px;
          letter-spacing: 5px;
          width: 370px;
          height: 45px;
          z-index: 1;
          position: absolute;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 30px;
        justify-content: space-around;
        width: 100%;

        .typeItem {
          width: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .typeBox {
            height: 90px;
            background-size: 100% 100%;
            .time {
              font-size: 28px;
              font-weight: 400;
              color: #c13727;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              margin-left: 12px;
            }

            img {
              width: 24px;
              margin-top: 6px;
              margin-left: 3px;
            }

            &.active {
              border: 2px solid #fad9a6;
            }
          }

          .desc {
            font-size: 28px;
            font-weight: 400;
            margin-top: 10px;
          }

          &:nth-child(1) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewScreen/zshl/mobile/smallDb.png');
            }

            .desc {
              color: #2c82e4;
            }
          }

          &:nth-child(2) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewScreen/zshl/mobile/middleDb.png');
            }

            .desc {
              color: #e63030;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewScreen/zshl/mobile/bigDb.png');
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(4) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewScreen/zshl/mobile/biggerDb.png');
            }

            .desc {
              color: #e59f2f;
            }
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
          border-image: linear-gradient(90deg, #83effe 0%, #00bdff 100%) 1 1;
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
    .bapinBox {
      width: 750px;
      height: 972px;
      background-color: #fad9a6;

      .title {
        height: 142px;
        position: relative;
        font-weight: 600;
        font-size: 44px;
        color: #b92525;
        .titleText {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        &::before {
          display: block;
          content: '';
          width: 750px;
          height: 253px;
          background-size: 100% 100%;
          background-image: url('https://ustatic.joymew.com/joymewMp/zshl/bapin/bapin4-1.png');
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -6vw;
        }
      }

      .effectPreview {
        width: 710px;
        height: 253px;
        margin: 32px auto 0 auto;
        position: relative;
        background-color: #000;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 30px;
        justify-content: space-around;

        .typeItem {
          width: 160px;

          .typeBox {
            height: 90px;
            background-size: 100% 100%;
            padding: 15px 20px;
            line-height: 1.2;

            .time {
              font-size: 28px;
              font-weight: 400;
              color: #c13727;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              color: #c13727;
              .tIcon {
                width: 20px;
                height: 20px;
                margin-right: 6px;
              }
            }
            &.active {
              box-shadow: 0px 0px 50px #c13727;
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
              background-image: url('https://static.hudongmiao.com/joymewScreen/zshl/mobile/smallDb.png');
            }
          }

          &:nth-child(2) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewScreen/zshl/mobile/middleDb.png');
              .time {
                color: #fad9a6;
              }
              .price {
                color: #fad9a6;
              }
            }
          }

          &:nth-child(3) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewScreen/zshl/mobile/bigDb.png');
              .time {
                color: #fad9a6;
              }
              .price {
                color: #fad9a6;
              }
            }
          }

          &:nth-child(4) {
            .typeBox {
              background-image: url('https://static.hudongmiao.com/joymewScreen/zshl/mobile/biggerDb.png');
            }
          }
        }
      }

      .txtWrap {
        margin-top: 30px;
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

      .btnWrap {
        width: 538px;
        height: 105px;
        margin: 29px auto 0 auto;
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
