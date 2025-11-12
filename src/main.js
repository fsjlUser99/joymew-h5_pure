import Vue from 'vue';
import toast from 'vue2-toast';
import vueTap from 'v-tap';
import vueScroll from 'vuescroll';
import SVGA from 'svgaplayerweb';
import {
  DatetimePicker,
  DropdownItem,
  DropdownMenu,
  Popup,
} from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import giftDanmu from './components/Danmu/giftDanmu/main';
import rocketDanmu from './components/Danmu/rocket/main';
import bapin from './components/Bapin/main';
import enterEffect from './components/enterEffect/main';
import useTip from './components/useTip/main';
import '@/utils/hdOptimizationTmpPatch';

import './assets/styles/public.css';
import './assets/styles/toast.css';
import './assets/styles/animate.css';

Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.config.productionTip = false;
Vue.use(toast);
Vue.use(vueTap);
Vue.use(vueScroll);
Vue.use(giftDanmu);
Vue.use(rocketDanmu);
Vue.use(bapin);
Vue.use(enterEffect);
Vue.use(useTip);
Vue.prototype.$svgaParser = new SVGA.Parser();

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default app;
