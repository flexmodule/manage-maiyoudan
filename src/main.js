import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/element.js'
import "@/scss/base/_reset.scss";
import "@/scss/base/_common.scss";
import "@/scss/element/element-ui.scss";
Vue.config.productionTip = false
Vue.prototype.$baseurl=process.env.VUE_APP_BASEURL
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
