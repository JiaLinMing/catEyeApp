export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 5,
        maxpage: 0,
        rows: [],
        total: 0
    },
    mutations: {
        getShopByPage(state, payload) {
            // state=payload;
            Object.assign(state, payload);
        },
        setCurPage(state, payload) {
            state.curpage = payload
        },
        setEachPage(state, payload) {
            state.eachpage = payload
        },
    },
    actions: {
        async asyncGetShopByPage(context, { curpage, eachpage } = {}) {//请求数据库
            const data = await fetch(`/shops?page=${curpage || context.state.curpage}&rows=${eachpage || context.state.eachpage}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
                return response.json();
            });
            context.commit("getShopByPage", data);
        },
        // async RemoveMemberById(context,id){//根据id，删除数据
        //     await fetch('/shops/'+id,{
        //         method:"DELETE",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //     });
        //     context.dispatch("asyncGetShopByPage");//重新发出请求，渲染数据
        // }
    }
}