import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Setup from '../components/Setup.vue'
import Login from '../components/Login.vue'
import List from '../components/List.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/setup',
    name: 'Setup',
    component: Setup,
    meta: {
      auth: true
    }
  },
  {
    path: '/list',
    name: 'List',
    component: List,
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  let auth = to.matched.some(record => record.meta.auth)

  if ((user && auth) || (user && !auth)) {
    next();
  }
  else {
    next('login');
  }
});

export default router
