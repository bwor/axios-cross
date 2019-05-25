// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import Router from 'vue-router'
//import axios from 'axios' // 1、在这里引入axios
import axios from './utils/axios'
Vue.prototype.$axios = axios;// 2、在vue中使用axios
//引入element-ui 框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入阿里矢量库图标
import './assets/icon/iconfont.css'
//引入echarts 图表
import echarts from 'echarts'
//引入剪贴板
import VueClipboard from 'vue-clipboard2'
//引入 vuex
import store from './store'
Vue.prototype.$echarts=echarts
Vue.config.productionTip = false
axios.defaults.headers.common['Authentication-Token'] = store.getters.getToken;
Vue.use(ElementUI);
Vue.use(VueClipboard)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  
})


