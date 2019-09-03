import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/views/index.vue";
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
			path: '/',
			name:'index',
      component: Index,
      redirect: '/home',
      children: [{
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ './views/home/index.vue')
			},
			{
        path: 'order',
        component: () => import(/* webpackChunkName: "login" */ './views/order/index.vue'),
      }
		]
		},
		{
			path: '/login',
			name:'login',
      component: () => import(/* webpackChunkName: "login" */ './views/user/login.vue'),
		},
		{
			path: '/404',
			component: () => import('@/views/404'),
		},
		{ path: '*', redirect: '/404' }
  ]
})
