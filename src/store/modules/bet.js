import {
  ADD_BET
} from '../mutation-types';

const state = () => ({
  bet: []
});

const mutations = {
  [ADD_BET](state, bet) {
    state.bet = [...bet];
  }
};
const actions = {
  addBetAction({ commit }, bet) {
    commit(ADD_BET, bet);
  }
};

const getters = {
  getBet: (state) => state.bet
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
