<template>
  <transition
    enter-active-class="slideInUp faster animated"
    leave-active-class="slideOutDown faster animated"
  >
    <div
      v-show="isShowAni"
      class="superDanmuModule"
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
              本场发送的全屏特效，全部进入红包口袋，最后将以红包雨的游戏返回给各位来宾
            </div>
          </div>
        </div>
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/superDanmuTitle.png"
            class="titleText"
          />
          <img
            v-tap="{ methods: handleClose }"
            src="@/assets/image/hd2/closeIcon.png"
            class="closeIcon"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              <img
                src="@/assets/image/hd2/diamondIcon.png"
                class="goldUnit"
              />
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '1'"
        class="qy"
      >
        <div class="superDanmuBox publicVCenter">
          <div class="topTitle">
            <span class="titleName">超级霸屏</span>
          </div>
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">
                  {{ item.time }}
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
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            />
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              <img
                src="https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/diamodBIg.png"
                class="goldUnit"
              />
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            />
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '2' || sceneType === '26'"
        class="birth"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/birth/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              <img
                src="@/assets/image/hd2/diamondIcon.png"
                class="goldUnit"
              />
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '21'"
        class="bby"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/bby/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              <img
                src="@/assets/image/hd2/diamondIcon.png"
                class="goldUnit"
              />
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '22'"
        class="sy"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/sy/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              <img
                src="@/assets/image/hd2/diamondIcon.png"
                class="goldUnit"
              />
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '23'"
        class="crl"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/crl/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              剩余喵币：
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '24'"
        class="bly"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/bby/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              <img
                src="@/assets/image/hd2/diamondIcon.png"
                class="goldUnit"
              />
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '25'"
        class="myy"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/bby/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              <img
                src="@/assets/image/hd2/diamondIcon.png"
                class="goldUnit"
              />
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '41'"
        class="bydl"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/bydl/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              剩余喵币：
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '42'"
        class="xsy"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/xsy/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              剩余喵币：
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '43'"
        class="jbtm"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/jbtm/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              剩余喵币：
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '51'"
        class="txh"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/txh/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              剩余喵币：
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '52'"
        class="qqy"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/qy/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              <img
                src="@/assets/image/hd2/diamondIcon.png"
                class="goldUnit"
              />
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="sceneType === '53' || sceneType === '55'"
        class="hx"
      >
        <div class="superDanmuBox publicVCenter">
          <img
            src="@/assets/image/hd2/hx/superDanmuTitle.png"
            class="title"
          />
          <div class="effectPreview publicHvCenter">
            <img :src="superDanmuPreview" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem publicVCenter"
            >
              <div
                class="typeBox publicHvCenter"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
                <div class="price publicVCenter">
                  {{ item.price }}
                  <img src="@/assets/image/hd2/diamondIcon.png" />
                </div>
              </div>
              <div class="desc">
                {{ item.giftname }}
              </div>
            </div>
          </div>
          <div class="txtWrap">
            <textarea
              ref="text"
              v-model="content"
              maxlength="40"
              cols="30"
              rows="10"
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
            <div
              v-tap="{ methods: ganerateRandomWish }"
              class="ylBtn publicHvCenter"
            >
              语录
            </div>
          </div>
          <div class="payWrap publicVCenter">
            <div class="priceWrap publicVCenter">
              <img
                src="@/assets/image/hd2/diamondIcon.png"
                class="goldUnit"
              />
              <label class="price">{{ money }}</label>
            </div>
            <div
              v-tap="{ methods: bapinNow }"
              class="sendBtn publicHvCenter"
            >
              立即发送
            </div>
          </div>
        </div>
      </div>
      <div
        class="zshl"
        v-if="sceneType === '91'"
      >
        <div class="superDanmuBox">
          <div class="title">
            <span class="titleText">全屏特效</span>
          </div>
          <div class="effectPreview">
             <img src="https://ustatic.joymew.com/joymewH5/img/afe.gif" />
          </div>
          <div class="typeWrap">
            <div
              v-for="item in superDanmuTypeList"
              :key="item.giftId"
              v-tap="{ methods: chooseSuperDanmuType, giftId: item.giftId }"
              class="typeItem"
            >
              <div
                class="typeBox"
                :class="{ active: currentSuperDanmuType === item.giftId }"
              >
                <div class="time">{{ item.time }}秒</div>
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
              placeholder="霸屏内容(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'"
            />
          </div>
          <div
            v-tap="{ methods: bapinNow }"
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
import { sendSuperDanmuGift, diamondRecharge } from '@/api/index/index';
import { sendSuperDanmuGiftMessage, securityMsgCheck } from '@/api/chat/index';
import { superDanmuPreview } from '@/assets/constant/effect';
import wxApi from '@/utils/wxApi';
import { timeoutTask, generateRandom } from '@/utils/index';
import { generateQuickWishBySceneType } from '@/utils/service';

let endBroadAni = false;
let broadAniLock = false;
export default {
  name: 'SuperDanmuPopup',
  computed: {
    ...mapState({
      superDanmuTypeList: (state) => state.live.superDanmuTypeList,
      currentSuperDanmuType: (state) => state.app.currentSuperDanmuType,
      money: (state) => state.user.money,
      freeSendGift: (state) => state.user.freeSendGift,
      allFreeSendGift: (state) => state.live.allFreeSendGift,
      sceneType: (state) => state.live.sceneType,
      env: (state) => state.app.env,
      isGiftToHbkd: (state) => state.app.isGiftToHbkd,
      customSignWish: (state) => state.live.customSignWish,
      isForbidSend: (state) => state.live.isForbidSend,
    }),
  },
  created() {},
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
      superDanmuPreview,
    };
  },
  beforeDestroy() {
    endBroadAni = true;
    broadAniLock = false;
  },
  methods: {
    ...mapMutations({
      setCurrentSuperDanmuType: 'app/setCurrentSuperDanmuType',
      togglePopup: 'app/togglePopup',
      setOrigin: 'app/setOrigin',
      setUserInfo: 'user/setUserInfo',
    }),
    showAniStart() {
      this.isShowAni = true;
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    validateSend() {
      let flag = true;
      const choosedSuperDanmuType = this.superDanmuTypeList.find((item) => item.giftId === this.currentSuperDanmuType);
      console.log('当前选中:', choosedSuperDanmuType);
      if (!this.content) {
        flag = false;
        this.$toast.center('请输入霸屏内容!');
      } else if (this.freeSendGift) {
        flag = true;
      } else if (this.allFreeSendGift) {
        flag = true;
      } else if (choosedSuperDanmuType.price > this.money) {
        flag = false;
        if (this.env === 'miniProgram') {
          this.setOrigin('sendSuperDanmu');
          if (this.$store.state.app.mpType) {
            wxApi.navigateTo(
              `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&giftText=${this.content}&giftId=${this.currentSuperDanmuType}&origin=${this.$store.state.app.origin}`,
            );
          } else {
            wxApi.navigateTo(
              `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&content=${this.content}&giftconst=${this.currentSuperDanmuType}&origin=${this.$store.state.app.origin}`,
            );
          }
        } else if (this.env === 'h5') {
          const tmpPrice = (choosedSuperDanmuType.price - this.money).toFixed(2);
          diamondRecharge({
            total: tmpPrice,
          })
            .then((res) => {
              console.log(res);
              return wxApi.pay(res);
            })
            .then(() => {
              // 前端处理用户余额增加
              const tmpRemainMoney = (parseFloat(this.money) + parseFloat(tmpPrice)).toFixed(2);
              this.setUserInfo({
                money: tmpRemainMoney,
              });
              this.updateSend();
            })
            .catch((err) => {
              console.log(err);
              this.$toast.center('充值失败!');
            });
        }
      }
      return flag;
    },
    sendFreeGiftLogic() {
      const sendType = this.freeSendGift || this.allFreeSendGift ? '2' : '';
      if (this.$store.state.live.noMsgSeckCheckList.indexOf(this.content) > -1) {
        console.log('不需要内容安全审核!');
        sendSuperDanmuGiftMessage({
          content: this.content,
          sendType,
        })
          .then(() => {
            this.$toast.center('发送成功!');
            this.content = '';
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
              sendSuperDanmuGiftMessage({
                content: this.content,
                sendType,
              })
                .then(() => {
                  this.$toast.center('发送成功!');
                  this.content = '';
                  this.togglePopup();
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log('内容非法!');
              this.content = '';
              this.$toast.center('内容非法!');
              this.togglePopup();
            }
          })
          .catch((err) => {
            console.log(err);
            console.log('审核api调用异常,放行!');
            sendSuperDanmuGiftMessage({
              content: this.content,
              sendType,
            })
              .then(() => {
                this.$toast.center('发送成功!');
                this.content = '';
                this.togglePopup();
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    },
    bapinNow() {
      localStorage.removeItem('tmpSuperDanmuInfo');
      _hmt.push(['_trackEvent', '超级霸屏弹框', '点击', '发送超级霸屏']);
      if (!this.validateSend()) {
        return;
      }
      if (this.freeSendGift || this.allFreeSendGift) {
        this.sendFreeGiftLogic();
        return;
      }

      if (this.$store.state.live.noMsgSeckCheckList.indexOf(this.content) > -1) {
        console.log('不需要内容安全审核!');
        sendSuperDanmuGift({
          content: this.content,
        })
          .then((res) => {
            let tmpResult = null;
            if (res.code === '200') {
              // 更新 用户余额
              this.setUserInfo({
                money: res.balance.balance,
              });

              tmpResult = sendSuperDanmuGiftMessage({
                content: this.content,
              });
            }
            return tmpResult;
          })
          .then(() => {
            this.$toast.center('发送成功!');
            this.content = '';
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
              sendSuperDanmuGift({
                content: this.content,
              })
                .then((res) => {
                  let tmpResult = null;
                  if (res.code === '200') {
                    // 更新 用户余额
                    this.setUserInfo({
                      money: res.balance.balance,
                    });

                    tmpResult = sendSuperDanmuGiftMessage({
                      content: this.content,
                    });
                  }
                  return tmpResult;
                })
                .then(() => {
                  this.$toast.center('发送成功!');
                  this.content = '';
                  this.togglePopup();
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log('内容非法!');
              this.content = '';
              this.$toast.center('内容非法!');
              this.togglePopup();
            }
          })
          .catch((err) => {
            console.log(err);
            console.log('审核api调用异常,放行!');
            sendSuperDanmuGift({
              content: this.content,
            })
              .then((res) => {
                let tmpResult = null;
                if (res.code === '200') {
                  // 更新 用户余额
                  this.setUserInfo({
                    money: res.balance.balance,
                  });

                  tmpResult = sendSuperDanmuGiftMessage({
                    content: this.content,
                  });
                }
                return tmpResult;
              })
              .then(() => {
                this.$toast.center('发送成功!');
                this.content = '';
                this.togglePopup();
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    },
    handleClose() {
      this.hideAniStart();
      timeoutTask(() => {
        this.togglePopup();
      }, 200);
    },
    ganerateRandomWish() {
      _hmt.push(['_trackEvent', '超级弹幕弹框', '点击', '点击语录']);
      if (this.customSignWish.length > 0) {
        console.log('自定义语录', this.customSignWish);
        const sourceQuickWish = this.customSignWish.map((item) => item.bless_str);
        const quickWishLen = sourceQuickWish.length;
        this.content = sourceQuickWish[generateRandom(0, quickWishLen)];
        return;
      }
      this.content = generateQuickWishBySceneType(this.sceneType);
    },
    chooseSuperDanmuType(d) {
      _hmt.push(['_trackEvent', '超级弹幕弹框', '点击', '选择超级弹幕类型']);
      this.setCurrentSuperDanmuType(d.giftId);
    },
    updateSend() {
      // const tmpSuperDanmuInfo = JSON.parse(localStorage.getItem('tmpSuperDanmuInfo'));
      sendSuperDanmuGift({
        content: this.content,
        giftId: this.currentSuperDanmuType,
      })
        .then((res) => {
          localStorage.removeItem('tmpSuperDanmuInfo');
          let tmpResult = null;
          if (res.code === '200') {
            // 更新 用户余额
            this.setUserInfo({
              money: res.balance.balance,
            });
            tmpResult = sendSuperDanmuGiftMessage({
              content: this.content,
              giftId: this.currentSuperDanmuType,
            });
          }
          return tmpResult;
        })
        .then(() => {
          this.$toast.center('发送成功!');
          this.content = '';
          this.togglePopup();
        })
        .catch((err) => {
          console.log(err);
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
.superDanmuModule {
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background: #170d41;

      .titleBox {
        width: 400px;
        height: 72px;
        position: relative;
        color: #fff;
        font-weight: 500;

        .titleText {
          position: relative;
          width: 343px;
          height: 72px;
        }

        .time {
          font-size: 28px;
          position: relative;
        }

        .price {
          width: 102px;
          height: 34px;
          background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0px;
          right: -40px;
          font-size: 24px;
          color: #8a4e41;
          letter-spacing: 1px;

          .unit {
            width: 28px;
            height: 21px;
            margin-left: 6px;
          }
        }
      }

      .titleText {
        position: relative;
        width: 343px;
        height: 72px;
        image-rendering: -moz-crisp-edges;
        image-rendering: -o-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        -ms-interpolation-mode: nearest-neighbor;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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
              background: linear-gradient(276deg, #c571ff 0%, #e42cd5 100%);

              &.active {
                box-shadow: 0px 0px 50px #e42cd5;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(3) {
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
        width: 686px;
        height: 116px;
        margin-top: 32px;
        position: relative;
        border: 2px solid;
        border-image: linear-gradient(99deg, #f836a8, #5817bb 100%) 1 1;
        border-radius: 12px;

        textarea {
          width: 580px;
          height: 116px;
          font-size: 28px;
          padding: 20px 32px;
          color: #b4b7bd;
          outline: none;
          border: none;
          box-sizing: border-box;
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
          top: 20px;
          right: 32px;
        }
      }

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          .goldUnit {
            width: 26px;
            height: 24px;
            margin-top: 15px;
          }

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #fc4d88, #fa45fc 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
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

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

        .typeItem {
          width: 168px;
          flex-direction: column;
          margin: 0 5px;

          .typeBox {
            width: 168px;
            height: 80px;
            background-size: 100% 100%;
            border-radius: 8px;
            column-gap: 20px;
            position: relative;
            .time {
              font-size: 28px;
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
              flex-direction: column;
              img {
                width: 24px;
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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          .goldUnit {
            width: 52px;
            height: 40px;
          }

          .price {
            color: #fff;
            font-size: 32px;
            margin-left: 12px;
          }
        }

        .sendBtn {
          width: 315px;
          height: 110px;
          background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/sendNow.png');
          background-size: 100% 100%;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background-color: #e4fcff;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(3) {
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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          .goldUnit {
            width: 26px;
            height: 24px;
            margin-top: 15px;
          }

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #83effe, #00bdff 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background-color: #f9eded;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          .goldUnit {
            width: 26px;
            height: 24px;
            margin-top: 15px;
          }

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #ff9dba, #ff5b89 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background-color: #f13333;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #ffccfc;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #ffe8c2;
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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          .goldUnit {
            width: 26px;
            height: 24px;
            margin-top: 15px;
          }

          .price {
            color: #efde84;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #f6be70, #f7d8b2 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background: linear-gradient(140deg, #ffbec1, #fff0cf 100%, #ccf7ff 100%);
      backdrop-filter: blur(26px);

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(3) {
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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          color: #ef8484;
          font-size: 28px;

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background-image: url('../../assets/image/hd2/crl/btnBottom.png');
          background-size: 100% 100%;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background-color: #f9eded;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          .goldUnit {
            width: 26px;
            height: 24px;
            margin-top: 15px;
          }

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #ff9dba, #ff5b89 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background-color: #f9eded;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          .goldUnit {
            width: 26px;
            height: 24px;
            margin-top: 15px;
          }

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #ff9dba, #ff5b89 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background: #ddffd8;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(3) {
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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          color: #8bc986;
          font-size: 28px;

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(270deg, #58d297 0%, #a8f56b 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background: #fff5c0;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(3) {
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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          color: #ef8484;
          font-size: 28px;

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #ffa7ac, #ff1428 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background: #fff5c0;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(3) {
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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          color: #ef8484;
          font-size: 28px;

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #ffa7ac, #ff1428 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 802px;
      flex-direction: column;
      background-image: url('../../assets/image/hd2/txh/photoBoxBg.png');
      background-size: 100% 100%;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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
              background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

              &.active {
                box-shadow: 0px 0px 50px #c777ff;
              }
            }

            .desc {
              color: #e232d9;
            }
          }

          &:nth-child(3) {
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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          color: #dbcda0;
          font-size: 28px;

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #586727 0%, #a12126 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
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

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background-color: #f24848;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          .goldUnit {
            width: 26px;
            height: 24px;
            margin-top: 15px;
          }

          .price {
            color: #dfe23a;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #f2ed90, #f5cc74 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
      }
    }
  }

  .hx {
    img {
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;

      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      -ms-interpolation-mode: nearest-neighbor;
    }

    .superDanmuBox {
      width: 750px;
      height: 860px;
      flex-direction: column;
      background-color: #d8ecff;

      .title {
        width: 342px;
        height: 72px;
      }

      .closeIcon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 16px;
        right: 16px;
      }

      .effectPreview {
        width: 100%;
        height: 220px;
        background-color: #000;
        margin-top: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 32px;
        justify-content: space-around;
        width: 668px;

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
              color: #e232d9;
            }
          }

          &:nth-child(3) {
            .typeBox {
              background: linear-gradient(270deg, #f9ac30 0%, #ffc483);

              &.active {
                box-shadow: 0px 0px 50px #ffc483;
              }
            }

            .desc {
              color: #e232d9;
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

      .payWrap {
        justify-content: space-between;
        padding: 0 34px;
        width: 100%;
        margin-top: 64px;

        .priceWrap {
          .goldUnit {
            width: 26px;
            height: 24px;
            margin-top: 15px;
          }

          .price {
            color: #ff3675;
            font-size: 40px;
            margin-left: 6px;
          }
        }

        .sendBtn {
          width: 252px;
          height: 72px;
          background: linear-gradient(90deg, #83effe 0%, #00bdff 100%);
          border-radius: 12px;
          font-size: 28px;
          color: #fff;
        }
      }
    }
  }

  .zshl {
    .superDanmuBox {
      width: 750px;
      height: 137vw;
      background-color: #fad9a6;

      .title {
        height: 18.933vw;
        position: relative;
        font-weight: 600;
        font-size: 5.867vw;
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
        background-color: #000;
        margin: 32px auto 0 auto;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 11vw;
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
              transform: scale(1.1);
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
