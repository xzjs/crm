import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.name == 'Login' || localStorage.token) {
    next();
  }
  next({
    path: '/login'
  });
});

export default router;
