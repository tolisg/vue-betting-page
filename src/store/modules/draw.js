import dataServices from '@/shared/api/dataServices';
import {
  ADD_DRAW,
  GET_DRAWS,
  GET_DRAW,
  DELETE_DRAW
} from '../mutation-types';

const state = () => ({
  draws: [],
  draw: {}
});

const mutations = {
  [ADD_DRAW](state, draw) {
    state.draws.unshift(draw);
  },
  [GET_DRAWS](state, draws) {
    state.draws = draws;
  },
  [GET_DRAW](state, draw) {
    state.draw = draw;
  },
  [DELETE_DRAW](state, deletedDrawId) {
    // eslint-disable-next-line no-underscore-dangle
    state.draws = [...state.draws.filter((o) => o._id !== deletedDrawId)];
  }
};
const actions = {
  async addDrawAction({ commit }, draw) {
    const addedDraw = await dataServices.addDraw(draw);
    commit(ADD_DRAW, addedDraw);
  },
  async getDrawsAction({ commit }) {
    const draws = await dataServices.getDraws();
    commit(GET_DRAWS, draws);
  },
  async getDrawAction({ commit }, drawId) {
    const draw = await dataServices.getDraw(drawId);
    commit(GET_DRAW, draw);
  },
  async deleteDrawAction({ commit }, draw) {
    const deletedDrawId = await dataServices.deleteDraw(draw);
    commit(DELETE_DRAW, deletedDrawId);
  }
};

const getters = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
