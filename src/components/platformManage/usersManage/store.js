export default {
    namespaced: true,
    strict: true,
    state: {
        type: 'all',
        input: "",
        curpage: 1,
        eachpage: 10,
        rows: [],
        maxpage: 0,
        total: 0
    },

    mutations: {
        getUsersByPage(state, payload) {
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
        }
    },
    getters: {
        searchUsers(state) {
            switch (state.type) {
                case "userPhone":
                    return state.rows.filter(item => !item.userPhone.indexOf(state.input));
                case "userType":
                    return state.rows.filter(item => ((item.userType == "1" ? "门店管理员" : "平台管理员") == state.input));
                case "userStatus":
                    return state.rows.filter(item => ((item.userStatus == "1" ? "可用" : (item.userStatus == "0" ? "申请中" : "不可用")) == state.input));
                case "userAcount":
                    return state.rows.filter(item => !item.userAcount.indexOf(state.input));
                default:
                    return state.rows
            }
        }
    },
    actions: {
        async asyncGetusersByPage(context) {
            const rows = context.state.eachpage;
            const page = context.state.curpage;
            const data = await fetch(`/users?page=${page}&rows=${rows}`, {
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => res.json())
            context.commit("getUsersByPage", data)
        },
        async asyncAdduser(context, data) {
            await fetch(`/users`, {
                headers: {
                    "content-type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
            context.dispatch("asyncGetusersByPage")
        },
        async asyncDeleteusersByPage(context, id) {
            await fetch(`/users/${id}`, {
                headers: {
                    "content-type": "application/json"
                },
            })
            context.dispatch("asyncGetusersByPage")
        },
        async asyncEdituser(context, data) {
            await fetch(`/users/editUser`, {
                headers: {
                    "content-type": "application/json"
                },
                method:'POST',
                body:JSON.stringify(data)
            })
            context.dispatch("asyncGetusersByPage")
        },
        async asyncPassRequest(context, obj) {
            let id = obj.id;
            let state = obj.state
            await fetch(`/users/examine`, {
                headers: {
                    "content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(obj)
            })
            context.dispatch("asyncGetusersByPage")
        }
    }
}