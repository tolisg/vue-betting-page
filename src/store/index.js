import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import draw from './modules/draw';
import bet from './modules/bet';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    draw,
    bet
  }
});
