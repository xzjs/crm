import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login';
import Start from '../views/Start';
import Analyze from '../views/Analyze';
import Home from '../views/Home';
import Show from '../views/Show';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home/start'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'start',
        component: Start
      },
      {
        path: 'analyze',
        component: Analyze
      },
      {
        path: 'show/:id',
        component: Show
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.name == 'Login' || localStorage.isLogin) {
    next();
  } else {
    next({
      path: '/login'
    });
  }
});

export default router;
