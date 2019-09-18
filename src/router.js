import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import About1 from "./views/About1.vue";
import Sum_of_hotel from "./views/Sum_of_hotel.vue";
import Sum_of_drugstore from "./views/Sum_of_drugstore.vue";
import Sum_of_diverschool from "./views/Sum_of_diverschool.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/about1",
      name: "about1",
      component: About1
    },
    {
      path: "/sum_of_hotel",
      name: "sum_of_hotel",
      component: Sum_of_hotel
    },
    {
      path: "/sum_of_drugstore",
      name: "sum_of_drugstore",
      component: Sum_of_drugstore
    },
    {
      path: "/sum_of_diverschool",
      name: "sum_of_diverschool",
      component: Sum_of_diverschool
    }
  ]
});
