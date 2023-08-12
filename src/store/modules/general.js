const state = {
  snackbar: { active: false, color: "", message: "" },
};

const getters = {};

const actions = {
  snackBar({ commit }, data) {
    commit("setSnackbar", {
      active: true,
      color: data.color ? data.color : "success",
      message: data.message,
    });
  },
};

const mutations = {
  setSnackbar(state, snackbar) {
    state.snackbar = snackbar;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
