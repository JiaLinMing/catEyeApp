export default {
    namespaced: true,
    strict: true,
    state: {
        curpage: 1,
        eachpage: 10,
        maxpage: 0,
        total: 0,
        rows: []
    },
    getters: {

    },
    mutations: {
        getServByPage(state, payload) {
            Object.assign(state, payload)
        },
        setCurPage(state, payload) {
            state.curpage = payload
        },
        setEachPage(state, payload) {
            state.eachpage = payload
        },



    },
    actions: {
        async async_getServByPage(context) {
            const data = await fetch(`/services?page=1&rows=10`, {
                headers: { 'Content-Type': "application/json" },
            })
                .then(response => {
                    return response.json()
                })
            // console.log("data", data);
            context.commit('getServByPage', data)
        },
        async async_deleteServ(context, ids) {
            const data = await fetch('/services/delete', {
                method: 'post',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(ids)  
            })
            context.dispatch('async_getServByPage')
        },
        async async_addServ(context, service) {
            const data = await fetch('/services', {
                method: 'post',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(service)
            })
            console.log("addData", data);
            context.dispatch('async_getServByPage')
        },
        async async_updateServ(context, service){
            const data = await fetch('/services/update', {
                method: 'post',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(service) 
            })
            console.log("addData", data);
            context.dispatch('async_getServByPage')
        }
    }
}

