import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/about1",
      name: "about1",
      component: () => import("./views/About1.vue")
    },
    {
      path: "/sum_of_hotel",
      name: "sum_of_hotel",
      component: () => import("./views/Sum_of_hotel.vue")
    },
    {
      path: "/sum_of_drugstore",
      name: "sum_of_drugstore",
      component: () => import("./views/Sum_of_drugstore.vue")
    },
    {
      path: "/sum_of_diverschool",
      name: "sum_of_diverschool",
      component: () => import("./views/Sum_of_diverschool.vue")
    }
  ]
});
