import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/app/login.vue';
import Reg from './components/app/reg.vue';


import store from './store'
Vue.use(Router)


const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/reg',
            name: 'reg',
            component: reg
        },{
            path: '/manager',
            name: 'manager',
            component: manager
        }
    ]
})


export default router;