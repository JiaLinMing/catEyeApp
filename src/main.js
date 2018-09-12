
import Vue from 'vue'
import lodash from 'lodash'

import Vue from 'vue'
import App from './App.vue'

import store from './store';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import App from "./App.vue";
Vue.config.productionTip = false
new Vue({
  // store,
  // router,
  render: h => h(App)
}).$mount('#app')
