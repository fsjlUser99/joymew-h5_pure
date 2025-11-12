<template>
  <transition enter-active-class="slideInUp faster animated" leave-active-class="slideOutDown faster animated">
    <div v-show="isShowAni" class="photoModule">
      <div v-if="previewShow" class="previewBox publicVCenter">
        <img :src="previewImg" />
        <div class="btnGroup">
          <div v-tap="{ methods: cancelPreview }">取消</div>
          <div v-tap="{ methods: confirmPreview }">确定</div>
        </div>
      </div>
      <div v-if="sceneType === '0' || sceneType === '54'" class="wedding">
        <div v-if="isGiftToHbkd" class="notify publicHvCenter">
          <img src="@/assets/image/hd2/laba.png" class="broadIcon" />
          <div ref="ct" class="notifyCt">
            <div ref="ctTxt" class="notifyText">
              本场发送的现场照片，全部进入红包口袋，最后将以红包雨的游戏返回给各位来宾
            </div>
          </div>
        </div>
        <div class="photoBox publicVCenter">
          <div class="title publicHvCenter">现场照片</div>
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <img src="@/assets/image/hd2/cameraIcon.png" class="cameraImg" />
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '1'" class="qy">
        <div class="photoBox publicVCenter">
          <div class="topTitle">
            <span class="titleName">现场照片</span>
          </div>
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div class="itemLeft">
                <div class="size publicHvCenter">
                  {{ item.name }}
                </div>
                <div class="time">{{ item.time }}s</div>
              </div>
              <div v-if="!item.isFree" class="price publicHvCenter">
                <span class="priceValue">{{ item.price }}</span>
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter" />
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter" />
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter" />
        </div>
      </div>
      <div v-if="sceneType === '2' || sceneType === '26'" class="birth">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/birth/livePhotoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/birth/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '21'" class="bby">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/bby/livePhotoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/bby/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '22'" class="sy">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/sy/photoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/bby/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '23'" class="crl">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/crl/photoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/crl/addIcon.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '24'" class="bly">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/bby/livePhotoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/bby/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '25'" class="myy">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/bby/livePhotoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/bby/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '41'" class="bydl">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/bydl/photoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/bydl/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '42'" class="xsy">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/xsy/photoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/bby/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '43'" class="xsy">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/jbtm/photoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/bby/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '51'" class="txh">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/txh/photoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/txh/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '52'" class="qqy">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/qy/photoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/qy/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '53' || sceneType === '55'" class="hx">
        <div class="photoBox publicVCenter">
          <img src="@/assets/image/hd2/birth/livePhotoTitle.png" class="title" />
          <div class="note publicHvCenter">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="sizeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="item publicHvCenter"
              :class="[item.size, { active: currentPhotoType === item.giftId }]">
              <div v-if="!item.isFree" class="price publicHvCenter">
                {{ item.price }}
                <img src="@/assets/image/icon/diamond.png" class="unit" />
              </div>
              <div v-if="item.isFree" class="price publicHvCenter">
                免费
              </div>
              <div class="size publicHvCenter">
                {{ item.name }}
              </div>
              <div class="time">{{ item.time }}s</div>
            </div>
          </div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div v-tap="{ methods: ganerateRandomWish }" class="ylBtn publicHvCenter">
              语录
            </div>
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus publicHvCenter">
                <img src="@/assets/image/hd2/hx/addPlus.png" class="addIcon" />
              </div>
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
      <div v-if="sceneType === '91'" class="zshl">
        <div class="photoBox">
          <div class="title">
            <span class="titleText">现场照片</span>
          </div>
          <div class="note">您发送的图片会展示在大屏幕上，快来试试吧！</div>
          <div class="txtWrap publicHCenter">
            <textarea ref="text" v-model="content" maxlength="40" cols="30" rows="10" placeholder="输入您的祝福(40字以内)"
              :readonly="!isForbidSend ? false : 'readonly'" />
            <div class="photoWrap publicHvCenter">
              <div v-show="!hasUpload" class="addPlus" />
              <img v-show="hasUpload" v-tap="{ methods: showPreview }" :src="previewImg" class="previewImg" />
              <input v-show="!hasUpload" ref="fileinput" accept="image/*" type="file" class="file" @change="change" />
              <div class="uploadNum">({{ hasUpload ? 1 : 0 }}/1)</div>
            </div>
          </div>
          <div class="typeWrap">
            <div v-for="item in photoTypeList_display" :key="item.id"
              v-tap="{ methods: choosePhotoType, giftId: item.giftId }" class="typeItem">
              <div class="typeBox" :class="{ active: currentPhotoType === item.giftId }">
                <div v-if="!item.isFree" class="price">
                  {{ item.price }}
                  <img src="https://static.hudongmiao.com/joymewScreen/zshl/mobile/tMoney.png" class="tIcon" />
                </div>
                <div v-if="item.isFree" class="price">
                  免费
                </div>
              </div>
              <div class="desc">{{ item.time }}s</div>
            </div>
          </div>
          <div v-tap="{ methods: sendPhoto }" class="btnWrap publicHvCenter">
            发送
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { timeoutTask, generateRandom } from '@/utils/index';
import { uploadPhoto, sendPhotoGift, diamondRecharge } from '@/api/index/index';
import { sendPhotoGiftMessage, securityMsgCheck } from '@/api/chat/index';
import wxApi from '@/utils/wxApi';
import { POPUP_MODULE } from '@/assets/constant/index';
import { generateQuickWishBySceneType } from '@/utils/service';

let endBroadAni = false;
let broadAniLock = false;
export default {
  name: 'PhotoPopup',
  computed: {
    ...mapState({
      previewImg: (state) => state.app.previewImg,
      photoTypeList: (state) => state.live.photoTypeList,
      currentPhotoType: (state) => state.app.currentPhotoType,
      money: (state) => state.user.money,
      freeSendGift: (state) => state.user.freeSendGift,
      allFreeSendGift: (state) => state.live.allFreeSendGift,
      isFreeSendPhoto: (state) => state.live.isFreeSendPhoto,
      sceneType: (state) => state.live.sceneType,
      env: (state) => state.app.env,
      isCloseCoin: (state) => state.app.isCloseCoin,
      isGiftToHbkd: (state) => state.app.isGiftToHbkd,
      customSignWish: (state) => state.live.customSignWish,
      isForbidSend: (state) => state.live.isForbidSend,
    }),
    photoTypeList_display() {
      let tmpList;
      if (this.isFreeSendPhoto) {
        tmpList = this.photoTypeList.map((item) => {
          return {
            ...item,
            isFree: item.size === 'small',
          };
        });
      } else {
        tmpList = this.photoTypeList;
      }
      return tmpList;
    },
  },
  created() { },
  mounted() {
    // 执行弹出动画
    this.showAniStart();
  },
  data() {
    return {
      isShowAni: false, // 控制bapin box弹出动画
      hasUpload: false,
      previewShow: false,
      content: '',
    };
  },
  beforeDestroy() {
    endBroadAni = true;
    broadAniLock = false;
  },
  methods: {
    ...mapMutations({
      setPreviewImg: 'app/setPreviewImg',
      resetPreviewImg: 'app/resetPreviewImg',
      setCurrentPhotoType: 'app/setCurrentPhotoType',
      setUserInfo: 'user/setUserInfo',
      togglePopup: 'app/togglePopup',
      setOrigin: 'app/setOrigin',
    }),
    showAniStart() {
      timeoutTask(() => {
        this.isShowAni = true;
        if (this.sceneType === '0' && this.isGiftToHbkd) {
          this.$nextTick(() => {
            endBroadAni = false;
            this.broadInnerWidth = this.$refs.ct.offsetWidth * 0.13;
            this.broadContentWidth = this.$refs.ctTxt.offsetWidth * 0.13;
            this.startBroadAni();
          });
        }
      }, 100);
    },
    hideAniStart() {
      this.isShowAni = false;
    },
    ganerateRandomWish() {
      if (this.customSignWish.length > 0) {
        console.log('自定义语录', this.customSignWish);
        const sourceQuickWish = this.customSignWish.map((item) => item.bless_str);
        const quickWishLen = sourceQuickWish.length;
        this.content = sourceQuickWish[generateRandom(0, quickWishLen)];
        return;
      }
      this.content = generateQuickWishBySceneType(this.sceneType);
    },
    change(e) {
      try {
        this.$loading('图片加载中...');
        const freader = new FileReader();
        const file = e.target.files[0];
        // const fixOrientation = require('fix-orientation');

        freader.onload = (ev) => {
          const url = ev.target.result;
          this.setPreviewImg(url);
          this.previewShow = true;
          this.hasUpload = true;
          this.$loading.close();
          // fixOrientation(
          //   url,
          //   {
          //     image: true,
          //   },
          //   (fixedImg) => {
          //     this.setPreviewImg(fixedImg);
          //     this.previewShow = true;
          //     this.hasUpload = true;
          //     this.$loading.close();
          //   }
          // );
        };

        freader.onerror = () => {
          this.$loading.close();
          this.$toast.center('图片加载失败');
        };

        freader.readAsDataURL(file); // 读取照片
      } catch (err) {
        this.$loading.close();
      }
    },
    showPreview() {
      this.previewShow = true;
    },
    cancelPreview() {
      this.hasUpload = false;
      this.resetPreviewImg();
      this.$refs.fileinput.value = '';
      this.previewShow = false;
    },
    confirmPreview() {
      this.previewShow = false;
    },
    choosePhotoType(p) {
      _hmt.push(['_trackEvent', '现场照片弹框', '点击', '选择照片类型']);
      this.setCurrentPhotoType(p.giftId);
    },
    sendFreeGiftLogic() {
      this.$loading('发送祝福中...');
      if (this.$store.state.live.noMsgSeckCheckList.indexOf(this.content) > -1) {
        console.log('不需要内容安全审核!');
        this.uploadPhoto()
          .then((res1) => {
            this.setPreviewImg(res1.filePath);
            return this.sendBroadcast();
          })
          .then(() => {
            this.$loading.close();
            this.$toast.center('发送成功!');
            // 清空数据
            this.hasUpload = false;
            this.content = '';
            this.resetPreviewImg();
            this.togglePopup();
          });
      } else {
        securityMsgCheck(this.content)
          .then((res) => {
            console.log(res);
            const tmpSecCheckResult = JSON.parse(res.msg_sec_check);
            if (tmpSecCheckResult.result.suggest === 'pass') {
              console.log('通过内容安全审核');
              this.uploadPhoto()
                .then((res1) => {
                  this.setPreviewImg(res1.filePath);
                  return this.sendBroadcast();
                })
                .then(() => {
                  this.$loading.close();
                  this.$toast.center('发送成功!');
                  // 清空数据
                  this.hasUpload = false;
                  this.content = '';
                  this.resetPreviewImg();
                  this.togglePopup();
                });
            } else {
              console.log('内容非法!');
              this.$loading.close();
              this.$toast.center('内容非法!');
              this.hasUpload = false;
              this.content = '';
              this.resetPreviewImg();
              this.togglePopup();
            }
          })
          .catch((err) => {
            console.log(err);
            console.log('审核api调用异常,放行!');
            this.uploadPhoto()
              .then((res1) => {
                this.setPreviewImg(res1.filePath);
                return this.sendBroadcast();
              })
              .then(() => {
                this.$loading.close();
                this.$toast.center('发送成功!');
                // 清空数据
                this.hasUpload = false;
                this.content = '';
                this.resetPreviewImg();
                this.togglePopup();
              });
          });
      }
    },
    sendPhoto() {
      localStorage.removeItem('tmpGiftId');
      localStorage.removeItem('tmpGiftText');
      localStorage.removeItem('tmpGiftPicture');
      _hmt.push(['_trackEvent', '现场照片弹框', '点击', '发送照片礼物']);
      // 发送前的验证
      if (!this.validateSend()) {
        return;
      }
      if (this.freeSendGift || this.allFreeSendGift) {
        this.sendFreeGiftLogic();
        return;
      }
      this.$loading('发送祝福中...');
      if (this.$store.state.live.noMsgSeckCheckList.indexOf(this.content) > -1) {
        console.log('不需要内容安全审核!');
        this.uploadPhoto().then((res1) => {
          console.log('***上传照片***');
          console.log(res1);
          this.setPreviewImg(res1.filePath);
          return sendPhotoGift({
            content: this.content,
            imgUrl: this.previewImg,
          })
            .then((res2) => {
              // 更新 用户余额
              this.setUserInfo({
                money: res2.result.balance,
              });
              return this.sendBroadcast(); // 发送礼物的广播
            })
            .then((res3) => {
              console.log(res3);
              this.$loading.close();
              this.$toast.center('发送成功!');
              // 清空数据
              this.hasUpload = false;
              this.content = '';
              this.resetPreviewImg();
              this.togglePopup();
            })
            .catch((err) => {
              console.log(err);
              this.$loading.close();
              this.$toast.center('发送失败!');
            });
        });
      } else {
        securityMsgCheck(this.content)
          .then((res) => {
            console.log(res);
            const tmpSecCheckResult = JSON.parse(res.msg_sec_check);
            if (tmpSecCheckResult.result.suggest === 'pass') {
              console.log('通过内容安全审核');
              this.uploadPhoto().then((res1) => {
                console.log('***上传照片***');
                console.log(res1);
                this.setPreviewImg(res1.filePath);
                return sendPhotoGift({
                  content: this.content,
                  imgUrl: this.previewImg,
                })
                  .then((res2) => {
                    // 更新 用户余额
                    this.setUserInfo({
                      money: res2.result.balance,
                    });
                    return this.sendBroadcast(); // 发送礼物的广播
                  })
                  .then((res3) => {
                    console.log(res3);
                    this.$loading.close();
                    this.$toast.center('发送成功!');
                    // 清空数据
                    this.hasUpload = false;
                    this.content = '';
                    this.resetPreviewImg();
                    this.togglePopup();
                  })
                  .catch((err) => {
                    console.log(err);
                    this.$loading.close();
                    this.$toast.center('发送失败!');
                  });
              });
            } else {
              console.log('内容非法!');
              this.$loading.close();
              this.$toast.center('内容非法!');
              this.hasUpload = false;
              this.content = '';
              this.resetPreviewImg();
              this.togglePopup();
            }
          })
          .catch((err) => {
            console.log(err);
            console.log('审核api调用异常,放行!');
            this.uploadPhoto().then((res1) => {
              console.log('***上传照片***');
              console.log(res1);
              this.setPreviewImg(res1.filePath);
              return sendPhotoGift({
                content: this.content,
                imgUrl: this.previewImg,
              })
                .then((res2) => {
                  // 更新 用户余额
                  this.setUserInfo({
                    money: res2.result.balance,
                  });
                  return this.sendBroadcast(); // 发送礼物的广播
                })
                .then((res3) => {
                  console.log(res3);
                  this.$loading.close();
                  this.$toast.center('发送成功!');
                  // 清空数据
                  this.hasUpload = false;
                  this.content = '';
                  this.resetPreviewImg();
                  this.togglePopup();
                })
                .catch((err) => {
                  console.log(err);
                  this.$loading.close();
                  this.$toast.center('发送失败!');
                });
            });
          });
      }
    },
    /**
     * 跳转支付页
     */
    async newJumpPay({
      total, giftImage, giftText, giftId,
    }) {
      const choosedPhotoType = this.photoTypeList.find((item) => item.giftId === giftId);
      const tmpObj = {
        times: choosedPhotoType.time,
      };
      const extraJsonStr = JSON.stringify(tmpObj);
      this.$loading('图片上传中...');
      try {
        const giftImageUrl = await this.TextSecurityCheckThenBase64ToUrl(giftImage, giftText);
        wxApi.navigateTo(
          `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${total}&origin=${this.$store.state.app.origin}&extraJsonStr=${extraJsonStr}&giftImage=${giftImageUrl}&giftText=${giftText}&giftId=${giftId}`,
        );
        this.$loading.close();
      } catch (err) {
        console.log(err);
        this.$toast.center('内容非法!');
      }
    },
    async TextSecurityCheckThenBase64ToUrl() {
      const msgCheckResult = await securityMsgCheck(this.content);
      const tmpSecCheckResult = JSON.parse(msgCheckResult.msg_sec_check);
      if (tmpSecCheckResult.result.suggest === 'pass') {
        const uploadRes = await this.uploadPhoto();
        return uploadRes.filePath;
        // eslint-disable-next-line no-else-return
      } else {
        throw new Error('内容非法!');
      }
    },
    validateSend() {
      let flag = true;
      const choosedPhotoType = this.photoTypeList_display.find((item) => item.giftId === this.currentPhotoType);
      if (!this.content) {
        flag = false;
        this.$toast.center('请输入您的祝福!');
      } else if (!this.previewImg) {
        flag = false;
        this.$toast.center('请选择您发送的图片');
        this.$refs.fileinput.click();
      } else if (choosedPhotoType.isFree) {
        // 本场免费发照片
        flag = true;
      } else if (this.freeSendGift) {
        flag = true;
      } else if (this.allFreeSendGift) {
        flag = true;
      } else if (choosedPhotoType.price > this.money) {
        flag = false;
        if (this.env === 'miniProgram' || this.env === 'tt') {
          this.setOrigin('sendPhoto');
          if (this.isCloseCoin) {
            if (this.$store.state.app.mpType) {
              this.newJumpPay({
                giftId: this.currentPhotoType,
                giftText: this.content,
                giftImage: this.previewImg,
                total: choosedPhotoType.price,
              });
            } else {
              localStorage.setItem('tmpGiftId', this.currentPhotoType);
              localStorage.setItem('tmpGiftText', this.content);
              localStorage.setItem('tmpGiftPicture', this.previewImg);
              wxApi.navigateTo(
                `/pages/pay/pay?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&total=${choosedPhotoType.price}&giftId=${this.currentPhotoType}&origin=${this.$store.state.app.origin}`,
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
            total: choosedPhotoType.price,
          })
            .then((res) => {
              console.log(res);
              return wxApi.pay(res);
            })
            .then(() => {
              // 前端处理用户余额增加
              const tmpRemainMoney = (parseFloat(this.money) + parseFloat(choosedPhotoType.price)).toFixed(2);
              this.setUserInfo({
                money: tmpRemainMoney,
              });
              this.sendPhoto();
            })
            .catch((err) => {
              console.log(err);
              this.$toast.center('充值失败!');
            });
        }
      }
      return flag;
    },
    uploadPhoto() {
      const formData = new FormData();
      const arr = this.previewImg.split(',');
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
    sendBroadcast() {
      const sendType = this.freeSendGift || this.allFreeSendGift ? '1' : '';
      return sendPhotoGiftMessage({
        content: this.content,
        imgUrl: this.previewImg,
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
.previewBox {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 9999;

  img {
    width: 100vw;
  }

  .btnGroup {
    width: 100%;
    height: 10vh;
    background-color: #000;
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;

    div {
      color: #fff;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.photoModule {
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

    .photoBox {
      width: 750px;
      height: 754px;
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

      .note {
        padding: 14px 44px;
        background-color: rgba(226, 46, 214, 0.2);
        border-radius: 32px;
        margin-top: 26px;
        font-size: 24px;
        font-weight: 500;
        color: #ec4040;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #71b3ff 0%, #2c82e4 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #2c82e4;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #c571ff 0%, #e42cd5 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #e42cd5;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff7171 0%, #e42c2c 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #e42c2c;
            }
          }

          &.ba {
            background: linear-gradient(300deg, #c76bfb 0%, #ea1775 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ea1775;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 70px;
        position: relative;

        textarea {
          width: 710px;
          height: 164px;
          border: 2px solid #dddddd;
          border-radius: 10px;
          font-size: 28px;
          padding: 20px 32px;
          color: #b4b7bd;
          outline: none;
          box-sizing: border-box;

          &::placeholder {
            font-size: 28px;
            color: #b4b7bd;
          }
        }

        .photoWrap {
          width: 60px;
          height: 60px;
          background-color: #ffffff;
          position: absolute;
          bottom: 24px;
          right: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .cameraImg {
            width: 48px;
            height: 46px;
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #3b394f;
            position: absolute;
            bottom: 0;
            left: 83px;
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
          top: 11.333vw;
          right: 17.267vw;
        }
      }

      .btnWrap {
        width: 418px;
        height: 90px;
        background: linear-gradient(300deg, #c76bfb 0%, #ea1775 100%);
        margin-top: 46px;
        color: #ffffff;
        font-size: 32px;
        font-weight: 400;
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

    .photoBox {
      width: 750px;
      height: 778px;
      flex-direction: column;
      background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/photoBg.png');
      background-size: 100% 100%;
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
      }

      .note {
        padding: 14px 44px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #ffca76;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 27px;
        display: flex;
        justify-content: center;
        column-gap: 16px;

        .item {
          width: 168px;
          height: 80px;
          border-radius: 8px;
          position: relative;
          background-size: 100% 100%;
          column-gap: 16px;

          .price {
            font-size: 24px;
            color: #fff;
            letter-spacing: 1px;
            flex-direction: column;

            .unit {
              width: 28px;
              height: 21px;
              margin-top: 6px;
            }
          }

          .size {
            color: #ffffff;
            font-size: 24px;
          }

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 6px;
          }

          &.small {
            background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/blueCard.png');
          }

          &.mid {
            background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/redCard.png');
          }

          &.large {
            background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/purpleCard.png');
          }

          &.ba {
            background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/zfhf/goldCard.png');
          }

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
        }
      }

      .txtWrap {
        margin-top: 45px;
        position: relative;

        textarea {
          width: 710px;
          height: 176px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 70px;
            height: 70px;
            background-size: 100% 100%;
            background-image: url('https://static.hudongmiao.com/joymewH5/img/enterprise/bqdm/addIcon.png');
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #864848;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
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

    .photoBox {
      width: 750px;
      height: 824px;
      background-color: #e4fcff;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #81a4ff;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #e59f2f;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/bby/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #3b394f;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
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

    .photoBox {
      width: 750px;
      height: 824px;
      background-color: #f9eded;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #fe91b0;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #e59f2f;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/bby/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #3b394f;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
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

    .photoBox {
      width: 750px;
      height: 824px;
      background-color: #f13333;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #fe91b0;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(300deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ffc483;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/sy/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #efde84;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
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

    .photoBox {
      width: 750px;
      height: 824px;
      background: linear-gradient(140deg, #ffbec1, #fff0cf 100%, #ccf7ff 100%);
      backdrop-filter: blur(26px);
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #42b7c9;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(300deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ffc483;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/crl/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #efde84;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
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

    .photoBox {
      width: 750px;
      height: 824px;
      background-color: #f9eded;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #fe91b0;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #e59f2f;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/bby/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #3b394f;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
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

    .photoBox {
      width: 750px;
      height: 824px;
      background-color: #f9eded;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #fe91b0;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #e59f2f;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/bby/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #3b394f;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
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

    .photoBox {
      width: 750px;
      height: 824px;
      background: #ddffd8;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #58d297;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(300deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ffc483;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/bydl/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #3b394f;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(270deg, #58d297 0%, #a8f56b 100%);
        border-radius: 8px;
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

    .photoBox {
      width: 750px;
      height: 824px;
      background: #fff5c0;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #ff7d89;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(300deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ffc483;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
          font-size: 28px;
          padding: 20px 32px;
          color: #ef8484;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(114deg, #ffc9d3 0%, #ff4352 100%) 1 1;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/crl/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #3b394f;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #ffa7ac, #ff1428 100%);
        border-radius: 8px;
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

    .photoBox {
      width: 750px;
      height: 824px;
      background: #fff5c0;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #ff7d89;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(300deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ffc483;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
          font-size: 28px;
          padding: 20px 32px;
          color: #ef8484;
          outline: none;
          box-sizing: border-box;
          border: 2px solid;
          border-image: linear-gradient(114deg, #ffc9d3 0%, #ff4352 100%) 1 1;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/crl/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #3b394f;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #ffa7ac, #ff1428 100%);
        border-radius: 8px;
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

    .photoBox {
      width: 750px;
      height: 766px;
      background-image: url('../../assets/image/hd2/txh/photoBoxBg.png');
      background-size: 100% 100%;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #6c4c39;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(300deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ffc483;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/txh/rectangle.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #6c4c39;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
        }
      }

      .btnWrap {
        width: 400px;
        height: 92px;
        background: linear-gradient(90deg, #586727, #a12126);
        border-radius: 8px;
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

    .photoBox {
      width: 750px;
      height: 824px;
      background-color: #f24848;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #fe91b0;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #e59f2f;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/qy/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #efde84;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
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

    .photoBox {
      width: 750px;
      height: 824px;
      background-color: #d8ecff;
      flex-direction: column;

      .title {
        width: 342px;
        height: 72px;
      }

      .note {
        padding: 14px 44px;
        background: #84c0e7;
        border-radius: 32px;
        margin-top: 32px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      .sizeWrap {
        width: 100%;
        margin-top: 62px;
        display: flex;
        justify-content: space-around;

        .item {
          width: 148px;
          height: 120px;
          border-radius: 8px;
          position: relative;
          flex-direction: column;

          .price {
            width: 102px;
            height: 34px;
            background-image: url(https://static.hudongmiao.com/joymewH5/img/popupArea/priceBox-danmu.png);
            background-size: 100% 100%;
            position: absolute;
            top: -27px;
            right: 30px;
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

          .time {
            font-size: 24px;
            color: #ffffff;
            margin-top: 14px;
          }

          &.small {
            background: linear-gradient(276deg, #278cff 0%, #71b3ff 100%);

            .size {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }

            &.active {
              box-shadow: 0px 0px 50px #71b3ff;
            }
          }

          &.mid {
            background: linear-gradient(276deg, #ff3333 0%, #ff7a7a 100%);

            .size {
              width: 48px;
              height: 48px;
              font-size: 24px;
            }

            &.active {
              box-shadow: 0px 0px 50px #ff7a7a;
            }
          }

          &.large {
            background: linear-gradient(276deg, #ff35ef 0%, #c777ff 100%);

            .size {
              width: 56px;
              height: 56px;
              font-size: 28px;
            }

            &.active {
              box-shadow: 0px 0px 50px #c777ff;
            }
          }

          &.ba {
            background: linear-gradient(276deg, #f9ac30 0%, #ffc483 100%);

            .size {
              width: 60px;
              height: 60px;
              font-size: 36px;
            }

            &.active {
              box-shadow: 0px 0px 50px #e59f2f;
            }
          }
        }
      }

      .txtWrap {
        margin-top: 48px;
        position: relative;

        textarea {
          width: 710px;
          height: 184px;
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

        .photoWrap {
          width: 78px;
          height: 78px;
          position: absolute;
          bottom: 24px;
          left: 30px;
          border-radius: 50%;

          .addPlus {
            width: 78px;
            height: 78px;
            background-size: 100% 100%;
            background-image: url('../../assets/image/hd2/hx/addBox.png');

            .addIcon {
              width: 28px;
              height: 28px;
            }
          }

          .previewImg {
            position: absolute;
            width: 90px;
            height: 90px;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #3b394f;
            position: absolute;
            bottom: 0;
            left: 83px;
          }
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
    .photoBox {
      width: 750px;
      height: 102vw;
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

      .note {
        color: #bd4224;
        font-size: 3.2vw;
        font-weight: 600;
        text-align: center;
        margin-top: 9vw;
      }

      .txtWrap {
        margin-top: 29px;
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

        .photoWrap {
          width: 59px;
          height: 48px;
          position: absolute;
          bottom: 15px;
          right: 30px;

          .addPlus {
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
            background-image: url('https://static.hudongmiao.com/joymewScreen/zshl/mobile/addPhoto.png');
          }

          .previewImg {
            position: absolute;
            width: 100%;
            height: 100%;
            bottom: 0;
            right: 0;
          }

          .file {
            position: absolute;
            width: 225px;
            height: 60px;
            opacity: 0;
            z-index: 1;
          }

          .uploadNum {
            font-size: 28px;
            font-weight: 400;
            color: #bd4224;
            position: absolute;
            bottom: 7.5px;
            right: 71.25px;
          }
        }
      }

      .typeWrap {
        display: flex;
        margin-top: 30px;
        justify-content: space-around;

        .typeItem {
          width: 160px;

          .typeBox {
            height: 60px;
            background-size: 100% 100%;
            padding: 0px 20px;
            line-height: 60px;

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

      .btnWrap {
        width: 538px;
        height: 105px;
        margin: 48px auto 0 auto;
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
