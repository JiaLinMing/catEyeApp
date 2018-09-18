
import Vue from 'vue'
import App from './App.vue'

import users from './components/platformManage/usersManage/users.vue'
// import usersList from './components/platformManage/usersManage/usersList.vue'
import addUser from './components/platformManage/usersManage/addUser.vue'
import editUser from './components/platformManage/usersManage/editUser.vue'
import orders from './components/storeManage/ordersManage/orders.vue';
import editOrder from './components/storeManage/ordersManage/editOrder.vue';
import members from './components/platformManage/membersManage/members.vue';
import shops from './components/platformManage/shopsManage/shops.vue';
import services from './components/storeManage/servicesManage/services.vue';
import serviceForm from  './components/storeManage/servicesManage/serviceForm.vue';
import addGoods from './components/storeManage/goodsManage/addGoods.vue';
import addPhoto from './components/storeManage/goodsManage/addPhoto.vue';
import goods from './components/storeManage/goodsManage/goods.vue';

import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// Vue.component('users', users);
Vue.component('addUser',addUser);
Vue.component('editUser',editUser);
// Vue.component('orders',orders);
Vue.component('editOrder',editOrder);
Vue.component('serviceForm',serviceForm);
Vue.component('addGoods',addGoods);
Vue.component('addPhoto',addPhoto)
import router from './router'

Vue.config.productionTip = false
new Vue({
  store,
  router, 
  render: h => h(App)
}).$mount('#app')
