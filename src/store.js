import Vue from 'vue'
import Vuex from 'vuex'

import users from './components/platformManage/usersManage/store';
import orders from './components/storeManage/ordersManage/store';
import members from './components/platformManage/membersManage/store';
import shops from './components/platformManage/shopsManage/store';
import services from './components/storeManage/servicesManage/store'
import goods from './components/storeManage/goodsManage/store'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        orders,
        users,
        members,
        shops,
        services,
        goods
    },
    namespaced: true,
    state: {
        userPhone: "",
        userAcount: "",
        userId:'',
        userPwd: "",
        userMail: "",
        validate: '',
        userType: '',
        setLogin:[]
    },
    mutations: {
        validate(context, payload) {
            this.state.validate=payload[0].userStatus;
            this.state.userId=payload[0]._id;
        },
        setUser(context, payload) {
            this.state.userPhone = payload.userPhone
        },
        setLogin(context,payload){
            this.state.setLogin=payload
        }
    },
    actions: {
        async reg(context, data) {
            await fetch(`/users/reg`, {
                headers: {
                    "content-type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
        },
        async login(context, data) {
            let userInfo = await fetch(`/users/login`, {
                headers: {
                    "content-type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(data)
            }).then(res => res.json())
            context.commit('validate', userInfo)
        },
        async logout(context){
            await fetch(`/logout`,{
                headers: {
                    "content-type": "application/json"
                },
            })
            
        },
        async getSession(context) {
           let data= await fetch(`/getSession`, {
                headers: {
                    "content-type": "application/json"
                },
            }).then(res=>res.json())
            context.commit('setLogin',data)
        },
    }
})