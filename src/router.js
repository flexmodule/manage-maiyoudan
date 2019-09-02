import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "index" */ './views/index.vue'),
      redirect: '/home',
      children: [{
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ './views/home/index.vue')
      }]
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "user" */ './views/user/login.vue')
    }
  ]
})
