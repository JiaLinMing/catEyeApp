import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/app/login.vue';
import Reg from './components/app/reg.vue';
import Users from './components/platformManage/usersManage/users.vue'
import Orders from './components/storeManage/ordersManage/orders.vue'
import Manager from './components/app/manager.vue'
import Members from './components/platformManage/membersManage/members.vue'
import Shops from './components/platformManage/shopsManage/shops.vue'
import Services from './components/storeManage/servicesManage/services.vue'
import Goods from './components/storeManage/goodsManage/goods.vue'

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
            path: '/login/:userPhone',
            name: '登录',
            component: Login
        },
        {
            path: '/reg',
            name: 'reg',
            component: Reg
        },
        {
            path: '/manager',
            name: 'manager',
            component: Manager,
            beforeEnter: (to, from, next) => {
                store.dispatch('getSession').then(res => {
                    console.log(store.state.setLogin)
                    if (store.state.setLogin.length > 0) {
                        next()
                    } else {
                        next('/')
                    }
                })
                // if(!store.state.userPhone){
                //     next('/')
                // }else{
                //     next()
                // }
                // let reg = /^\/manager/;
                // let isLogin = false;
                // console.log(to.path);
                // console.log(from);
                // if (reg.test(to.path)) {
                //     if (isLogin) {
                //         next('')
                //     } else {
                //         next('/')
                //     }
                // } else {
                //     next()
                // }
            },
            children: [{
                path: 'users',
                name: 'users',
                component: Users,
                beforeEnter: (to, from, next) => {
                    store.dispatch('users/asyncGetusersByPage');
                    next()
                }
            }, {
                path: 'orders',
                name: 'orders',
                component: Orders,
                beforeEnter: (to, from, next) => {
                    store.dispatch('orders/getSession');
                    next()
                }
            }, {
                path: 'members',
                name: 'members',
                component: Members,
                beforeEnter: (to, from, next) => {
                    store.dispatch('members/asyncGetMemberByPage');
                    next()
                }
            }, {
                path: 'shops',
                name: 'shops',
                component: Shops,
            }, {
                path: 'services',
                name: 'services',
                component: Services,
                beforeEnter: (to, from, next) => {
                    store.dispatch('services/getSession');
                    next()
                }
            },{
                path:'goods',
                path:'goods',
                component:Goods,
                beforeEnter: (to, from, next) => { 
                    store.dispatch('goods/getSession');
                    next()
                }
            }]
        },
    ]
})


export default router;