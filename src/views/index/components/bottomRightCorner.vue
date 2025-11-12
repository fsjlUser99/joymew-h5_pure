<!-- TODO 待重构后的bottomRightCorner稳定运行一段时间后删除此文件 -->
<template>
  <div
    ref="bottomRightCorner"
    class="bottomRightCorner publicZIndexBottomRightCorner"
    :class="{
      pe: photographerVisible,
      qy: sceneType === '1',
      birth: sceneType === '2',
      bby: sceneType === '21',
      sy: sceneType === '22',
      crl: sceneType === '23',
      bly: sceneType === '24',
      myy: sceneType === '25',
      bydl: sceneType === '41',
      xsy: sceneType === '42',
      jbtm: sceneType === '43',
      txh: sceneType === '51',
      qqy: sceneType === '52',
      hx: sceneType === '53',
      zshl: sceneType === '91',
    }"
  >
    <!-- 婚礼版 -->
    <div
      v-if="sceneType === '0' || sceneType === '54'"
      class="wedding"
    >
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <img
        v-if="hotelReserveVisible"
        v-tap="{ methods: openPopupModule, key: 'hotelReserve' }"
        class="reserveItem"
        :src="hotelReserveIcon"
      />
      <img
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="item"
        src="@/assets/image/hd2/giftIconNew.png"
      />
      <img
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="item"
        src="@/assets/image/hd2/bapinIconNew.png"
      />
      <img
        v-if="giftSendVisible && !isOpenAdvert"
        v-tap="{ methods: openPopupModule, key: photoModuleKey }"
        class="item"
        src="@/assets/image/hd2/photoIconNew.png"
      />
      <img
        v-if="hbkdVisible && !isExamineLive && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="item"
        src="@/assets/image/hd2/hbkdIconNew.png"
      />
      <img
        v-if="photographerVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'photographerImg' }"
        class="item"
        src="@/assets/image/hd2/photographerIcon.png"
      />
      <img
        v-if="chooseSongVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: chooseSongModuleKey }"
        class="item"
        src="@/assets/image/hd2/songIcon.png"
      />
    </div>
    <!-- 企业版 -->
    <div
      v-if="sceneType === '1'"
      class="qy"
    >
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <img
        v-tap="{ methods: openPopupModule, key: 'hotelReserve' }"
        class="reserveItem"
        :src="hotelReserveIcon"
        v-if="hotelReserveVisible"
      />
      <img
        v-tap="{ methods: openPopupModule, key: 'photographerImg' }"
        class="photographerItem"
        src="@/assets/image/hd2/photographerIcon.png"
        v-if="photographerVisible && env !== 'tt'"
      />
      <img
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="giftItem"
        src="https://static.hudongmiao.com/joymewH5/img/enterprise/giftIcon.png"
      />
      <img
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="bapinItem"
        src="https://static.hudongmiao.com/joymewH5/img/enterprise/zfIcon.png"
      />
      <img
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="hbkdItem"
        src="https://static.hudongmiao.com/joymewH5/img/enterprise/hbkdIcon.png"
      />
    </div>
    <!-- 生日通用版 -->
    <div
      v-if="sceneType === '2'"
      class="birth"
    >
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/birth/giftIcon.png"
          class="giftIcon"
        />
        <img
          src="@/assets/image/hd2/birth/giftName.png"
          class="giftName"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/birth/bapinIcon.png"
          class="giftIcon spe"
        />
        <img
          src="@/assets/image/hd2/birth/bapinName.png"
          class="giftName"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/birth/hbIcon.png"
          class="giftIcon"
        />
        <img
          src="@/assets/image/hd2/birth/hbkdName.png"
          class="giftName"
        />
      </div>
    </div>
    <!-- 宝宝宴 -->
    <div
      v-if="sceneType === '21'"
      class="bby"
    >
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/bby/giftIcon.png"
          class="giftIcon"
        />
        <img
          src="@/assets/image/hd2/bby/giftName.png"
          class="giftName"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/bby/bapinIcon.png"
          class="giftIcon spe"
        />
        <img
          src="@/assets/image/hd2/bby/bapinName.png"
          class="giftName"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/bby/hbIcon.png"
          class="giftIcon"
        />
        <img
          src="@/assets/image/hd2/bby/hbkdName.png"
          class="giftName"
        />
      </div>
    </div>
    <!-- 寿宴 -->
    <div
      v-if="sceneType === '22'"
      class="sy"
    >
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="item"
      >
        <img
          src="@/assets/image/hd2/sy/giftIcon.png"
          class="giftIcon"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="item"
      >
        <img
          src="@/assets/image/hd2/sy/bapinIcon.png"
          class="giftIcon"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="item"
      >
        <img
          src="@/assets/image/hd2/sy/hbkdIcon.png"
          class="giftIcon"
        />
      </div>
    </div>
    <!-- 成人礼 -->
    <div
      v-if="sceneType === '23'"
      class="crl"
    >
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="item"
      >
        <img
          src="@/assets/image/hd2/crl/giftIcon.png"
          class="giftIcon"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="item"
      >
        <img
          src="@/assets/image/hd2/crl/bapinIcon.png"
          class="giftIcon"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="item"
      >
        <img
          src="@/assets/image/hd2/crl/hbkdIcon.png"
          class="giftIcon"
        />
      </div>
    </div>
    <!-- 百露宴 -->
    <div
      v-if="sceneType === '24'"
      class="bly"
    >
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/bby/giftIcon.png"
          class="giftIcon"
        />
        <img
          src="@/assets/image/hd2/bby/giftName.png"
          class="giftName"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/bby/bapinIcon.png"
          class="giftIcon spe"
        />
        <img
          src="@/assets/image/hd2/bby/bapinName.png"
          class="giftName"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/bby/hbIcon.png"
          class="giftIcon"
        />
        <img
          src="@/assets/image/hd2/bby/hbkdName.png"
          class="giftName"
        />
      </div>
    </div>
    <!-- 满月宴 -->
    <div
      v-if="sceneType === '25'"
      class="myy"
    >
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->

      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/bby/giftIcon.png"
          class="giftIcon"
        />
        <img
          src="@/assets/image/hd2/bby/giftName.png"
          class="giftName"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/bby/bapinIcon.png"
          class="giftIcon spe"
        />
        <img
          src="@/assets/image/hd2/bby/bapinName.png"
          class="giftName"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="item publicVCenter"
      >
        <img
          src="@/assets/image/hd2/bby/hbIcon.png"
          class="giftIcon"
        />
        <img
          src="@/assets/image/hd2/bby/hbkdName.png"
          class="giftName"
        />
      </div>
    </div>
    <!-- 毕业礼 -->
    <div
      v-if="sceneType === '41'"
      class="bydl"
    >
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <img
        v-tap="{ methods: openPopupModule, key: 'photographerImg' }"
        class="photographerItem"
        src="@/assets/image/hd2/photographerIcon.png"
        v-if="photographerVisible && env !== 'tt'"
      />
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="giftItem"
      >
        <img
          src="@/assets/image/hd2/bydl/giftIcon.png"
          class="giftIcon"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="bapinItem"
      >
        <img
          src="@/assets/image/hd2/bydl/bapinIcon.png"
          class="bapinIcon"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="hbkdItem"
      >
        <img
          src="@/assets/image/hd2/bydl/hbkdIcon.png"
          class="hdkdIcon"
        />
      </div>
    </div>
    <!-- 谢师宴 -->
    <div
      v-if="sceneType === '42'"
      class="xsy"
    >
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="giftItem"
      >
        <img
          src="@/assets/image/hd2/xsy/giftIcon.png"
          class="giftIcon"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="bapinItem"
      >
        <img
          src="@/assets/image/hd2/xsy/bapinIcon.png"
          class="bapinIcon"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="hbkdItem"
      >
        <img
          src="@/assets/image/hd2/xsy/hbkdIcon.png"
          class="hdkdIcon"
        />
      </div>
    </div>
    <!-- 金榜题名 -->
    <div
      v-if="sceneType === '43'"
      class="jbtm"
    >
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="giftItem"
      >
        <img
          src="@/assets/image/hd2/jbtm/giftIcon.png"
          class="giftIcon"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="bapinItem"
      >
        <img
          src="@/assets/image/hd2/jbtm/bapinIcon.png"
          class="bapinIcon"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="hbkdItem"
      >
        <img
          src="@/assets/image/hd2/jbtm/hbkdIcon.png"
          class="hdkdIcon"
        />
      </div>
    </div>
    <!-- 同学会 -->
    <div
      v-if="sceneType === '51'"
      class="txh"
    >
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="giftItem"
      >
        <img
          src="@/assets/image/hd2/txh/giftIcon.png"
          class="giftIcon"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="bapinItem"
      >
        <img
          src="@/assets/image/hd2/txh/bapinIcon.png"
          class="bapinIcon"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="hbkdItem"
      >
        <img
          src="@/assets/image/hd2/txh/hbkdIcon.png"
          class="hdkdIcon"
        />
      </div>
    </div>
    <!-- 乔迁宴 -->
    <div
      v-if="sceneType === '52'"
      class="qqy"
    >
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <img
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="giftItem"
        src="@/assets/image/hd2/qy/giftIcon.png"
      />
      <img
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="bapinItem"
        src="@/assets/image/hd2/qy/bapinIcon.png"
      />
      <img
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="hbkdItem"
        src="@/assets/image/hd2/qy/hbkdIcon.png"
      />
    </div>
    <!-- 会销 -->
    <div
      v-if="sceneType === '53'"
      class="hx"
    >
      <!-- <bubble
        v-if="giftSendVisible"
        ref="bubble"
      /> -->
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="giftItem"
      >
        <img
          src="@/assets/image/hd2/hx/giftIcon.png"
          class="giftIcon"
        />
      </div>
      <div
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="bapinItem"
      >
        <img
          src="@/assets/image/hd2/hx/bapinIcon.png"
          class="bapinIcon"
        />
      </div>
      <div
        v-if="hbkdVisible && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="hbkdItem"
      >
        <img
          src="@/assets/image/hd2/hx/hbIcon.png"
          class="hdkdIcon"
        />
      </div>
    </div>
    <!-- 中式婚礼版 -->
    <div
      v-if="sceneType === '91'"
      class="zshl"
    >
      <div
        class="item item--hosting-style"
        v-if="mpType && yuehunSwitch && env === 'miniProgram' && !hotelReserveVisible"
        v-tap="{ methods: onClickHostingStyle, hostId: hostingStyleInfo.hostId, liveId: hostingStyleInfo.liveId }"
      >
        <img
          :src="hostingStyleInfo.avatar"
          alt="avatar"
          class="item__avatar"
        />
        <img
          class="item__text"
          src="https://ustatic.joymew.com/joymewH5/img/hostingStyle.svg"
        />
      </div>
      <img
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: giftModuleKey }"
        class="item gift"
        src="https://ustatic.joymew.com/joymewScreen/zshl/mobile/giftSendEntry.png"
      />
      <img
        v-if="giftSendVisible"
        v-tap="{ methods: openPopupModule, key: bapinModuleKey }"
        class="item bapin"
        src="https://ustatic.joymew.com/joymewScreen/zshl/mobile/zfhfIconEtry.png"
      />
      <img
        v-if="giftSendVisible && !isOpenAdvert"
        v-tap="{ methods: openPopupModule, key: photoModuleKey }"
        class="item photo"
        src="https://ustatic.joymew.com/joymewScreen/zshl/mobile/photoIcon.png"
      />
      <img
        v-if="hbkdVisible && !isExamineLive && env !== 'tt'"
        v-tap="{ methods: openPopupModule, key: 'hbkd' }"
        class="item hbkd"
        src="https://ustatic.joymew.com/joymewScreen/zshl/mobile/hbkdIcon.png"
      />
    </div>
  </div>
</template>
<script>
// import bubble from '@/components/bubble/bubble2.vue';
import { POPUP_MODULE } from '@/assets/constant/index';
import { getPopModuleByKey } from '@/utils/service';
import wxApi from '@/utils/wxApi';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'BottomRightCorner',
  computed: {
    ...mapState({
      hbkdRechargeList: (state) => state.live.hbkdRechargeList,
      hbkdRechargeNewList: (state) => state.live.hbkdRechargeNewList,
      remainMoney: (state) => state.live.remainMoney,
      giftSendVisible: (state) => state.app.giftSendVisible,
      hbkdVisible: (state) => state.app.hbkdVisible,
      photographerVisible: (state) => state.app.photographerVisible,
      sceneType: (state) => state.live.sceneType,
      hotelReserveVisible: (state) => state.app.hotelReserveVisible,
      hotelReserveIcon: (state) => state.app.hotelReserveIcon,
      isExamineLive: (state) => state.live.isExamineLive,
      chooseSongVisible: (state) => state.app.chooseSongVisible,
      isForbidBuyHbq: (state) => state.user.isForbidBuyHbq,
      isLocationInvalid: (state) => state.live.isLocationInvalid,
      isOpenAdvert: (state) => state.user.emceeInfo.isOpenAdvert,
      mpType: (state) => state.app.mpType,
      env: (state) => state.app.env,
      hostingStyleInfo(state) {
        return {
          avatar: state.user.emceeInfo.avatar,
          hostId: state.live.emceeId,
          liveId: state.live.liveId,
        };
      },
    }),
    yuehunSwitch() {
      return this.$store.getters['user/yuehunSwitch'];
    },
  },
  // components: { bubble },
  data() {
    return {
      giftModuleKey: POPUP_MODULE.giftModule.key,
      bapinModuleKey: POPUP_MODULE.bapinModule.key,
      qrcodeModuleKey: POPUP_MODULE.qrcodeModule.key,
      photoModuleKey: POPUP_MODULE.photoModule.key,
      chooseSongModuleKey: POPUP_MODULE.chooseSongModule.key,
    };
  },
  watch: {
    // giftSendVisible: function giftSendVisible(newVal) {
    //   if (newVal) {
    //     this.$nextTick(() => {
    //       if (this.$refs.bubble) {
    //         this.$refs.bubble.init();
    //       }
    //     });
    //   }
    // },
  },
  mounted() {
    // if (this.giftSendVisible) {
    //   this.$nextTick(() => {
    //     if (this.$refs.bubble) {
    //       this.$refs.bubble.init();
    //     }
    //   });
    // }
  },
  methods: {
    ...mapMutations({
      togglePopup: 'app/togglePopup',
    }),
    onClickHostingStyle() {
      // wxApi.navigateTo(`/packageA/pages/hostingStyle/hostingStyle?hostId=${e.hostId}&liveId=${e.liveId}`);
      wxApi.navigateTo('/pages/reserve/reserve');
    },
    judgeMpTypeThenToPhotographerWall() {
      if (this.mpType) {
        wxApi.navigateTo('/packageC/pages/photographerWall/photographerWall');
      } else {
        wxApi.navigateTo('/pages/photographerWall/photographerWall');
      }
    },
    openPopupModule(e) {
      if (this.isForbidBuyHbq) {
        // this.$toast.center('系统繁忙!');
        return;
      }
      if (this.isLocationInvalid) {
        this.$toast.center(this.$store.state.live.locationInvalidReason);
        return;
      }
      if (e.key === 'hbkd') {
        if (this.env === 'miniProgram') {
          _hmt.push(['_trackEvent', '右下角区域', '点击', '点击hbkd']);
          let tmpHbkdRechargeListStr;
          const templateMode = this.hbkdRechargeNewList.length > 0;
          if (templateMode) {
            tmpHbkdRechargeListStr = JSON.stringify(this.hbkdRechargeNewList);
          } else {
            tmpHbkdRechargeListStr = this.hbkdRechargeList;
          }
          wxApi.tmpNavigateTo('hbkdRecharge', {
            openId: this.$store.state.user.openId,
            userId: this.$store.state.user.userId,
            templateMode,
            hbkdRemainVisible: this.$store.state.app.hbkdRemainVisible,
            hbkdRechargeListStr: tmpHbkdRechargeListStr,
            hbkdRechargeListNewStr: tmpHbkdRechargeListStr,
          });
        } else if (this.env === 'h5') {
          this.$router.push({
            path: '/hbkdRecharge',
          });
        } else if (this.env === 'tt') {
          wxApi.navigateToTt(
            `/pages/hbkdRecharge/hbkdRecharge?openId=${this.$store.state.user.openId}&userId=${this.$store.state.user.userId}&remainMoney=${this.remainMoney}&hbkdRemainVisible=${this.$store.state.app.hbkdRemainVisible}&hbkdRechargeListStr=${this.hbkdRechargeList}`,
          );
        }
      } else if (e.key === 'photographerImg') {
        if (this.env === 'miniProgram') {
          _hmt.push(['_trackEvent ', '右下角区域', '点击', '点击livePhoto']);
          this.judgeMpTypeThenToPhotographerWall();
        } else if (this.env === 'h5') {
          this.$router.push({
            path: '/photographerWall',
          });
        } else if (this.env === 'tt') {
          wxApi.navigateToTt('/pages/photographerWall/photographerWall');
        }
      } else if (e.key === 'hotelReserve') {
        if (this.env === 'miniProgram') {
          _hmt.push(['_trackEvent', '右下角区域', '点击', '点击hotelReserve']);
          wxApi.navigateTo('/pages/hotelReserve/hotelReserve');
        } else if (this.env === 'h5') {
          this.$router.push({
            path: '/hotelReserve',
          });
        } else if (this.env === 'tt') {
          wxApi.navigateToTt('/pages/hotelReserve/hotelReserve');
        }
      } else if (e.key === 'weddingReserve') {
        // yueSwitch表示是否开通约婚服务 isLiveMaster表示当前用户是否为这场活动的主持人
        if (this.env === 'miniProgram') {
          _hmt.push(['_trackEvent', '右下角区域', '点击', '点击weddingReserve']);
          if (this.mpType) {
            wxApi.navigateTo('/pages/reserve/reserve');
          } else if (this.$store.state.user.emceeInfo.yue_switch === '1') {
            console.log(`/pages/weddingReserveVip/weddingReserveVip?userId=${this.$store.state.live.emceeId}`);
            wxApi.navigateTo(`/pages/weddingReserveVip/weddingReserveVip?userId=${this.$store.state.live.emceeId}`);
          } else {
            console.log(
              `/pages/weddingReserve/weddingReserve?isLiveMaster=${this.$store.getters['user/isLiveMaster']}&introduce=${this.$store.state.live.yuehunIntroduce}`,
            );
            wxApi.navigateTo(
              `/pages/weddingReserve/weddingReserve?isLiveMaster=${this.$store.getters['user/isLiveMaster']}&introduce=${this.$store.state.live.yuehunIntroduce}`,
            );
          }
        }
      } else {
        const tmpPopModuleObj = getPopModuleByKey(e.key);
        const keyName = tmpPopModuleObj ? tmpPopModuleObj.name : e.key;
        _hmt.push(['_trackEvent', '右下角区域', '点击', `点击${keyName}`]);
        this.togglePopup(e.key);
      }
    },
  },
};
</script>
<style lang="less" scoped>
img {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;

  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
.bottomRightCorner {
  width: 134px;
  position: absolute;
  right: 0px;
  bottom: 218px;
  // 主持风采项
  .item--hosting-style {
    --avatar-diameter: 85px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item__avatar {
      box-sizing: border-box;
      width: var(--avatar-diameter);
      height: var(--avatar-diameter);
      border: 2px solid #ffffff;
      border-radius: 50%;
    }

    .item__text {
      width: calc(var(--avatar-diameter) * 1.2);
      object-fit: contain;
    }
  }
  .wedding {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .reserveItem {
      width: 120px;
      height: 120px;
      margin-bottom: -12px;
      border-radius: 50%;
    }
    .item {
      width: 118px;
      height: 116px;
    }
  }
  .qy {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 22px;

    .reserveItem {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    .photographerItem {
      width: 118px;
      height: 116px;
    }
    .giftItem {
      width: 120px;
      height: 126px;
    }
    .bapinItem {
      width: 120px;
      height: 126px;
    }
    .hbkdItem {
      width: 120px;
      height: 126px;
    }
  }
  .birth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item {
      width: 160px;
      height: auto;
      flex-direction: column;

      &--hosting-style {
        --avatar-diameter: 110px;
        margin-bottom: 14px;
      }

      .giftIcon {
        width: 136px;
        height: 136px;
        &.spe {
          width: 143px;
        }
      }
      .giftName {
        width: 160px;
        height: 48px;
        margin-top: -12px;
      }
    }
  }
  .bby {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item {
      width: 160px;
      height: auto;
      flex-direction: column;

      &--hosting-style {
        --avatar-diameter: 110px;

        margin-bottom: 14px;
      }
      .giftIcon {
        width: 136px;
        height: 136px;
        &.spe {
          width: 143px;
        }
      }
      .giftName {
        width: 160px;
        height: 48px;
        margin-top: -12px;
      }
    }
  }
  .sy {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item {
      width: 150px;
      height: 163px;

      &--hosting-style {
        --avatar-diameter: 100px;

        margin-bottom: 8px;
      }

      .giftIcon {
        width: 150px;
        height: 163px;
      }
    }
  }
  .crl {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item {
      width: 162px;
      height: 180px;

      &--hosting-style {
        --avatar-diameter: 100px;
      }

      .giftIcon {
        width: 162px;
        height: 180px;
      }
    }
  }
  .bly {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item {
      width: 160px;
      height: auto;
      flex-direction: column;

      &--hosting-style {
        --avatar-diameter: 110px;

        margin-bottom: 14px;
      }

      .giftIcon {
        width: 136px;
        height: 136px;
        &.spe {
          width: 143px;
        }
      }
      .giftName {
        width: 160px;
        height: 48px;
        margin-top: -12px;
      }
    }
  }
  .myy {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item {
      width: 160px;
      height: auto;
      flex-direction: column;

      &--hosting-style {
        --avatar-diameter: 110px;

        margin-bottom: 14px;
      }

      .giftIcon {
        width: 136px;
        height: 136px;
        &.spe {
          width: 143px;
        }
      }
      .giftName {
        width: 160px;
        height: 48px;
        margin-top: -12px;
      }
    }
  }
  .bydl {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item--hosting-style {
      --avatar-diameter: 100px;
      margin-bottom: 14px;
    }
    .photographerItem {
      width: 118px;
      height: 116px;
    }
    .giftItem {
      width: 134px;
      height: 140px;
      .giftIcon {
        width: 134px;
        height: 140px;
      }
    }
    .bapinItem {
      width: 134px;
      height: 146px;
      margin-top: 35px;
      margin-bottom: 36px;
      .bapinIcon {
        width: 134px;
        height: 146px;
      }
    }
    .hbkdItem {
      width: 134px;
      height: 148px;
      .hdkdIcon {
        width: 134px;
        height: 148px;
      }
    }
  }
  .xsy {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item--hosting-style {
      --avatar-diameter: 90px;
    }
    .giftItem {
      width: 160px;
      height: 182px;
      .giftIcon {
        width: 160px;
        height: 182px;
      }
    }
    .bapinItem {
      width: 160px;
      height: 188px;
      margin-bottom: -9vw;
      .bapinIcon {
        width: 160px;
        height: 188px;
      }
    }
    .hbkdItem {
      width: 160px;
      height: 244px;
      .hdkdIcon {
        width: 160px;
        height: 244px;
      }
    }
  }
  .jbtm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item--hosting-style {
      --avatar-diameter: 100px;
      margin-bottom: 24px;
    }
    .giftItem {
      width: 142px;
      height: 155px;
      .giftIcon {
        width: 142px;
        height: 155px;
      }
    }
    .bapinItem {
      width: 142px;
      height: 155px;
      margin-top: 3.2vw;
      .bapinIcon {
        width: 142px;
        height: 155px;
      }
    }
    .hbkdItem {
      width: 142px;
      height: 194px;
      .hdkdIcon {
        width: 142px;
        height: 194px;
      }
    }
  }
  .txh {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item--hosting-style {
      --avatar-diameter: 100px;
      margin-bottom: 24px;
    }
    .giftItem {
      width: 128px;
      height: 156px;
      .giftIcon {
        width: 128px;
        height: 156px;
      }
    }
    .bapinItem {
      width: 128px;
      height: 156px;
      margin-top: 3.2vw;
      .bapinIcon {
        width: 128px;
        height: 156px;
      }
    }
    .hbkdItem {
      width: 128px;
      height: 156px;
      .hdkdIcon {
        width: 128px;
        height: 156px;
      }
    }
  }
  .qqy {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item--hosting-style {
      --avatar-diameter: 100px;
      margin-bottom: 22px;
    }
    .giftItem {
      width: 128px;
      height: 158px;
    }
    .bapinItem {
      width: 128px;
      height: 134px;
      margin-top: 26px;
    }
    .hbkdItem {
      width: 128px;
      height: 144px;
      margin-top: 22px;
    }
  }
  .hx,.wl {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item--hosting-style {
      --avatar-diameter: 110px;
      margin-bottom: 36px;
    }
    .giftItem {
      width: 134px;
      height: 156px;
      .giftIcon {
        width: 134px;
        height: 156px;
      }
    }
    .bapinItem {
      width: 134px;
      height: 156px;
      margin-top: 35px;
      margin-bottom: 36px;
      .bapinIcon {
        width: 134px;
        height: 146px;
      }
    }
    .hbkdItem {
      width: 134px;
      height: 156px;
      .hdkdIcon {
        width: 134px;
        height: 156px;
      }
    }
  }
  .zshl {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    .item {
      &.gift {
        width: 148px;
        height: 177px;
      }
      &.bapin {
        width: 155px;
        height: 147px;
      }
      &.photo {
        width: 139px;
        height: 153px;
      }
      &.hbkd {
        width: 145px;
        height: 170px;
      }
    }
  }
  &.pe {
    .item {
      margin-top: 0;
    }
  }
  &.qy {
    width: 160px;
  }
  &.birth {
    width: 168px;
  }
  &.bby {
    width: 168px;
  }
  &.sy {
    width: 150px;
  }
  &.crl {
    width: 162px;
  }
  &.bly {
    width: 168px;
  }
  &.myy {
    width: 168px;
  }
  &.bydl {
    width: 150px;
  }
  &.xsy {
    width: 160px;
  }
  &.jbtm {
    width: 150px;
  }
  &.txh {
    width: 160px;
  }
  &.qqy {
    width: 160px;
  }
  &.hx,&.wl {
    width: 154px;
  }
  &.zshl {
    width: 140px;
  }
}
</style>
