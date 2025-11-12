<template>
  <div
    class="gift publicVCenter"
    :class="'gift-' + sceneType"
    @click="openPopup"
  >
    <img
      class="gift-icon"
      :src="giftIcon"
      v-if="giftIcon"
    />
    <img
      :src="giftText"
      class="gift-text"
      v-if="giftText"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { POPUP_MODULE } from '@/assets/constant/index';
import { checkPermission } from './func';

const SCENETYPE_ICONS_MAP = {
  '0,54': ['https://static.hudongmiao.com/joymewH5/img/icons/wedding/giftIconClear_compressed.png'],
  1: ['https://static.hudongmiao.com/joymewH5/img/enterprise/giftIcon.png'],
  '2,26': ['https://ustatic.joymew.com/joymewH5/img/icons/giftIcon.png', 'https://ustatic.joymew.com/joymewH5/img/icons/giftName.png'],
  '21,24,25': [
    'https://ustatic.joymew.com/joymewH5/img/icons/bby/giftIcon.png',
    'https://ustatic.joymew.com/joymewH5/img/icons/bby/giftName.png',
  ],
  22: ['https://ustatic.joymew.com/joymewH5/img/icons/sy/giftIcon.png'],
  23: ['https://ustatic.joymew.com/joymewH5/img/icons/crl/giftIcon.png'],
  41: ['https://ustatic.joymew.com/joymewH5/img/icons/crl/1/giftIcon.png'],
  42: ['https://ustatic.joymew.com/joymewH5/img/icons/crl/1/2/giftIcon.png'],
  43: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/giftIcon.png'],
  51: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/giftIcon.png'],
  52: ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/giftIcon.png'],
  '53,55': ['https://ustatic.joymew.com/joymewH5/img/icons/jbtm/txh/qy/hx/giftIcon.png'],
  91: ['https://ustatic.joymew.com/joymewScreen/zshl/mobile/giftSendEntry.png'],
};

const SCENETYPE_ICONS_MAP_KEYS = Object.keys(SCENETYPE_ICONS_MAP);

export default {
  computed: {
    ...mapState({
      sceneType: (state) => state.live.sceneType,
    }),
    giftIcon() {
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
    giftText() {
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
      this.$store.commit('app/togglePopup', POPUP_MODULE.giftModule.key);
    },
  },
};
</script>

<style lang="less" scoped>
.gift {
  flex-direction: column;
  &.gift-0,
  &.gift-54 {
    .gift-icon {
      width: 118px;
      height: 116px;
    }
  }
  &.gift-1 {
    .gift-icon {
      width: 120px;
      height: 126px;
    }
  }
  &.gift-2,
  &.gift-21,
  &.gift-24,
  &.gift-25,
  &.gift-26 {
    .gift-icon {
      width: 136px;
      height: 136px;
    }
    .gift-text {
      width: 160px;
      height: 48px;
      margin-top: -12px;
    }
  }
  &.gift-22 {
    .gift-icon {
      width: 150px;
      height: 163px;
    }
  }
  &.gift-23 {
    .gift-icon {
      width: 162px;
      height: 180px;
    }
  }
  &.gift-41 {
    .gift-icon {
      width: 134px;
      height: 140px;
    }
  }
  &.gift-42 {
    .gift-icon {
      width: 160px;
      height: 182px;
    }
  }
  &.gift-43 {
    .gift-icon {
      width: 142px;
      height: 155px;
    }
  }
  &.gift-51,
  &.gift-52 {
    .gift-icon {
      width: 128px;
      height: 156px;
    }
  }
  &.gift-53,
  &.gift-55 {
    .gift-icon {
      width: 134px;
      height: 156px;
    }
  }
  &.gift-91 {
    .gift-icon {
      width: 132px;
      height: 152px;
    }
  }
}
</style>
