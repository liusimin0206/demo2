import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.use(VueAxios, axios);

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 公共css
require("../src/assets/global.scss");

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
