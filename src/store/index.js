import Vue from "vue";
import Vuex from "vuex";
import general from "./modules/general";
import seller from "./modules/seller";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    general,
    seller,
  },
});
