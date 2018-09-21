export default {
    namespaced: true,
    strict: true,
    state: {
        type: 'all',
        input: "",
        curpage: 1,
        eachpage: 5,
        rows: [],
        maxpage: 0,
        total: 0,
        userId:''
    },
    mutations: {
        getOrdersByPage(state, payload) {
            Object.assign(state, payload)
        },
        setEachPage(state, payload) {
            state.eachpage = payload,
                state.curpage = 1
        },
        setCurPage(state, payload) {
            state.curpage = payload
        },
        setType(state, data) {
            state.type = data.type;
            state.input = data.input;
            console.log(state.input)
        },
        setUserId(state, payload) {
            state.userId = payload
        }
    },
    getters: {
        searchOrders(state) {
            switch (state.type) {
                case "_id":
                    return state.rows.filter(item => !item._id.indexOf(state.input));
                case "phone":
                    return state.rows.filter(item => !item.phone.indexOf(state.input));
                case "state":
                    return state.rows.filter(item => ((item.state == "1" ? "已完成" : (item.state == "0" ? "未完成" : "未支付")) == state.input));
                default:
                    return state.rows
            }
        }
    },
    actions: {
        async asyncGetOrdersByPage(context, state) {
            const rows = context.state.eachpage;
            const page = context.state.curpage;
            const userId=context.state.userId
            const data = await fetch(`/orders?page=${page}&rows=${rows}&userId=${userId}`, {
                headers: { 'Content-Type': "application/json" },
            })
                .then(response => {
                    return response.json()
                })
            context.commit('getOrdersByPage', data)
        },
        async asyncEditorder(context, data) {
            await fetch(`/orders/editOrder`, {
                headers: {
                    "content-type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
            context.dispatch("asyncGetOrdersByPage")
        },
        async getSession(context){
            const data = await fetch(`/getSession`, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            });
            context.commit('setUserId',data[0]._id);
            
            context.dispatch("asyncGetOrdersByPage")
        }
    }

}