import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/views/index.vue";
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'hash',
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
        component: () => import(/* webpackChunkName: "order" */ './views/order/index.vue'),
      },
			{
        path: 'goods',
        component: () => import(/* webpackChunkName: "goods" */ './views/goods/index.vue'),
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
