<template>
  <div
    class="hbkd publicVCenter"
    :class="'hbkd-' + sceneType"
    @click="toHBKD"
  >
    <img
      class="hbkd-icon"
      :src="hbkdIcon"
      v-if="hbkdIcon"
    />
    <img
      :src="hbkdText"
      class="hbkd-text"
      v-if="hbkdText"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { checkPermission, jumpToHBKD } from './func';

const SCENETYPE_ICONS_MAP = {
  '0,54': ['https://static.hudongmiao.com/joymewH5/img/icons/wedding/hbkdIconClear_compressed.png'],
  1: ['https://static.hudongmiao.com/joymewH5/img/enterprise/hbkdIcon.png'],
  '2,26': [
    'https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbIconBirth.png',
    'https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbkdNameBirth.png',
  ],
  '21,24,25': [
    'https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbIconBBY.png',
    'https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbdkNameBBY.png',
  ],
  22: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbkdIconSy.png'],
  23: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbkdIconCRL.png'],
  41: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbkdIconBYDL.png'],
  42: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbkdIconXsy.png'],
  43: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbkdIconJBTM.png'],
  51: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbkdIconTXH.png'],
  52: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbkdIconQQY.png'],
  '53,55': ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hbkds/hbIconHX.png'],
  91: ['https://ustatic.joymew.com/joymewScreen/zshl/mobile/hbkdIcon.png'],
};
const SCENETYPE_ICONS_MAP_KEYS = Object.keys(SCENETYPE_ICONS_MAP);
export default {
  computed: {
    ...mapState({
      sceneType: (state) => state.live.sceneType,
    }),
    hbkdIcon() {
      const index = SCENETYPE_ICONS_MAP_KEYS.findIndex((item) => {
        if (item.includes(',')) {
          const arr = item.split(',');
          return arr.includes(this.sceneType);
        }
        return item === this.sceneType;
      });
      if (index > -1) {
        const key = SCENETYPE_ICONS_MAP_KEYS[index];
        return SCENETYPE_ICONS_MAP[key][0];
      }
      return null;
    },
    hbkdText() {
      const index = SCENETYPE_ICONS_MAP_KEYS.findIndex((item) => {
        if (item.includes(',')) {
          const arr = item.split(',');
          return arr.includes(this.sceneType);
        }
        return item === this.sceneType;
      });
      if (index > -1) {
        const key = SCENETYPE_ICONS_MAP_KEYS[index];
        return SCENETYPE_ICONS_MAP[key][1];
      }
      return null;
    },
  },
  methods: {
    toHBKD() {
      // validate
      if (!checkPermission()) {
        return;
      }
      // action
      jumpToHBKD();
    },
  },
};
</script>

<style lang="less" scoped>
.hbkd {
  flex-direction: column;
  &.hbkd-0,
  &.hbkd-54 {
    .hbkd-icon {
      width: 118px;
      height: 116px;
    }
  }
  &.hbkd-1 {
    .hbkd-icon {
      width: 120px;
      height: 126px;
    }
  }
  &.hbkd-2,
  &.hbkd-21,
  &.hbkd-24,
  &.hbkd-25,
  &.hbkd-26 {
    .hbkd-icon {
      width: 136px;
      height: 136px;
    }
    .hbkd-text {
      width: 160px;
      height: 48px;
      margin-top: -12px;
    }
  }
  &.hbkd-22 {
    .hbkd-icon {
      width: 150px;
      height: 163px;
    }
  }
  &.hbkd-23 {
    .hbkd-icon {
      width: 162px;
      height: 180px;
    }
  }
  &.hbkd-41 {
    .hbkd-icon {
      width: 134px;
      height: 148px;
    }
  }
  &.hbkd-42 {
    .hbkd-icon {
      width: 160px;
      height: 244px;
    }
  }
  &.hbkd-43 {
    .hbkd-icon {
      width: 142px;
      height: 194px;
    }
  }
  &.hbkd-51 {
    .hbkd-icon {
      width: 128px;
      height: 156px;
    }
  }
  &.hbkd-52 {
    .hbkd-icon {
      width: 128px;
      height: 144px;
    }
  }
  &.hbkd-53,
  &.hbkd-55 {
    .hbkd-icon {
      width: 134px;
      height: 156px;
    }
  }
  &.hbkd-91 {
    .hbkd-icon {
      width: 128px;
      height: 142px;
    }
  }
}
</style>
