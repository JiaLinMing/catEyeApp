export default {
    namespaced: true,
    strict: true,
    state: {
        curpage: 1,
        eachpage: 10,
        maxpage: 0,
        total: 0,
        rows: [],
        userId: ''
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
        setUserId(state, payload) {
            state.userId = payload
        }


    },
    actions: {
        async async_getServByPage(context, { curpage, eachpage, type, text } = {}) {
            const data = await fetch(`/services?page=${curpage || context.state.curpage}&rows=${eachpage || context.state.eachpage}&type=${type}&text=${text}&userId=${context.state.userId}`, {
                headers: { 'Content-Type': "application/json" },
            })
                .then(response => {
                    return response.json()
                })
            console.log("data", data);
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
            service.userId = context.state.userId
            const data = await fetch('/services/add', {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(service)
            })
            console.log("addData", data);
            context.dispatch('async_getServByPage')
        },
        async async_updateServ(context, service) {
            const data = await fetch('/services/update', {
                method: 'post',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(service)
            })
            console.log("addData", data);
            context.dispatch('async_getServByPage')
        },
        async getSession(context) {
            const data = await fetch('/getSession', {
                headers: { 'Content-Type': "application/json" },
            })
                .then(response => {
                    return response.json()
                })
            context.commit('setUserId', data[0]._id);
            context.dispatch('async_getServByPage')
        }
    }
}

