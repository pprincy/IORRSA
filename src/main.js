import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import vuetify from "./plugins/vuetify";
import "./plugins/moment";
import "./plugins/vue-filters";
import "./plugins/vue-signature-pad";
import i18n from "./plugins/i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
