<template>
  <div
    class="bapin publicVCenter"
    :class="'bapin-' + sceneType"
    @click="openPopup"
  >
    <img
      :src="bapinIcon"
      class="bapin-icon"
      v-if="bapinIcon"
    />
    <img
      :src="bapinText"
      class="bapin-text"
      v-if="bapinText"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { POPUP_MODULE } from '@/assets/constant/index';
import { checkPermission } from './func';

const SCENETYPE_ICONS_MAP = {
  '0,54': ['https://static.hudongmiao.com/joymewH5/img/icons/wedding/bapinIconClear_compressed.png'],
  1: ['https://static.hudongmiao.com/joymewH5/img/enterprise/zfIcon.png'],
  '2,26': [
    'https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinIcon1.png',
    'https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinName1.png',
  ],
  '21,24,25': [
    'https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinIcon2.png',
    'https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinName2.png',
  ],
  22: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinIcon3.png'],
  23: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinIcon4.png'],
  41: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinIcon6.png'],
  42: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinIcon7.png'],
  43: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinIcon8.png'],
  52: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinIcon10.png'],
  '53,55': ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinIcon11.png'],
  91: ['https://ustatic.joymew.com/joymewScreen/zshl/mobile/zfhfIconEtry.png'],
  51: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/bapinIcon9.png'],
};
const SCENETYPE_ICONS_MAP_KEYS = Object.keys(SCENETYPE_ICONS_MAP);

export default {
  computed: {
    ...mapState({
      sceneType: (state) => state.live.sceneType,
    }),
    bapinIcon() {
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
    bapinText() {
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
    openPopup() {
      // validate
      if (!checkPermission()) {
        return;
      }
      // action
      this.$store.commit('app/togglePopup', POPUP_MODULE.bapinModule.key);
    },
  },
};
</script>

<style lang="less" scoped>
.bapin {
  flex-direction: column;
  &.bapin-0,
  &.bapin-54 {
    .bapin-icon {
      width: 118px;
      height: 116px;
    }
  }
  &.bapin-1 {
    .bapin-icon {
      width: 120px;
      height: 126px;
    }
  }
  &.bapin-2,
  &.bapin-21,
  &.bapin-24,
  &.bapin-25,
  &.bapin-26 {
    .bapin-icon {
      width: 136px;
      height: 136px;
    }
    .bapin-text {
      width: 160px;
      height: 48px;
      margin-top: -12px;
    }
  }
  &.bapin-22 {
    .bapin-icon {
      width: 150px;
      height: 163px;
    }
  }
  &.bapin-23 {
    .bapin-icon {
      width: 162px;
      height: 180px;
    }
  }
  &.bapin-41,
  &.bapin-53,
  &.bapin-55 {
    .bapin-icon {
      width: 134px;
      height: 146px;
    }
  }
  &.bapin-42 {
    .bapin-icon {
      width: 160px;
      height: 188px;
    }
  }
  &.bapin-43 {
    .bapin-icon {
      width: 142px;
      height: 155px;
    }
  }
  &.bapin-51 {
    .bapin-icon {
      width: 128px;
      height: 156px;
    }
  }
  &.bapin-52 {
    .bapin-icon {
      width: 128px;
      height: 134px;
    }
  }
  &.bapin-91 {
    .bapin-icon {
      width: 134px;
      height: 128px;
    }
  }
}
</style>
