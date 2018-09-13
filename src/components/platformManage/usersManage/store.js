export default {
    namespaced: true,
    strict: true,
    state: {

        curpage: 1,
        eachpage: 10,
        rows: [],
        maxpage: 0,
        total: 0
    },
    mutations:{
        getUsersByPage(state,payload){
            Object.assign(state,payload)
        }
    },
    actions: {
        async asyncGetusersByPage(context) {
            console.log(context)
            const rows = context.state.eachpage;
            const page = context.state.curpage;
            const data = await fetch(`/users?page=${page}&rows=${rows}`, {
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => res.json())
            console.log(data)
            context.commit("getUsersByPage",data)
        },
        async asyncAdduser(content){
            console.log(conttext)
        }
    }
}