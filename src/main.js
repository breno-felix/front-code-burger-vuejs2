import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLidate from "vuelidate";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueLogger from "vuejs-logger";
import options from "./plugins/vue-logger";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueLidate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueLogger, options);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
