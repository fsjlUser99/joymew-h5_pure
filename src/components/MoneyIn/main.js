import Vue from 'vue';
import audioContent from '@/assets/constant/audio';
import createjs from 'createjs-cmd';
import MoneyIn from './MoneyIn.vue';

const MoneyInContructor = Vue.extend(MoneyIn);

function createMoneyIn(money) {
  const moneyIn = new MoneyInContructor({
    data: {
      money,
    },
  });
  moneyIn.$mount();
  document.getElementById('app').appendChild(moneyIn.$el);
}

function loadAudioFile() {
  const loader = new createjs.LoadQueue(true);
  loader.installPlugin(createjs.Sound);
  loader.loadFile({ id: 'moneyIn', src: audioContent.moneyIn });
  loader.on('complete', () => {
    console.log('音频加载成功');
  });
}

loadAudioFile();

export default {
  createMoneyIn,
};
