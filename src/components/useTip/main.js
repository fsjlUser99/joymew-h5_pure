import Vue from 'vue';

import useTip from './useTip.vue';

const UseTip = Vue.extend(useTip);

function createUseTipDom() {
  const useTip = new UseTip();
  useTip.$mount();
  const indexWrap = document.getElementById('indexWrap');
  indexWrap.appendChild(useTip.$el);
}

const install = (vue) => {
  vue.prototype.$createUseTip = createUseTipDom;
};

export default { install };
