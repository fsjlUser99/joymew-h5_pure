import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import live from './modules/live';
import user from './modules/user';
import game from './modules/game';
import chat from './modules/chat/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    live,
    user,
    game,
    chat,
  },
});

export default store;
