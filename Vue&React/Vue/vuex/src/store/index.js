import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    a: 0,
    b: 0
  },
  mutations: {
    change(state) {
      state.a += 1;
      state.b += 2;
    }
  },
  actions: {
    change({ commit }) {
      commit('change');
    }
  },
  modules: {}
});
