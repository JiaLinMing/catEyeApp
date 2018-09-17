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
        async UpdateShopById(context, row) {//修改
            let id = row.id;
            let state = row.state;
            const obj = { state };
            await fetch('/shops/' + id, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        }
    }
}