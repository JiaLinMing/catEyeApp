export default {
    namespaced: true,
    state: {
        curpage: 1,  //当前页码
        eachpage: 5, //每页显示数
        maxpage: 0, //总页码
        total: 0,   //总数
        rows: [],     //分页查询
        userId:"5b98b93cd69ba22094a463eb"
    },
    mutations: {
        getGoodsByPage(state, payload) {
            Object.assign(state, payload);
        },
        setUserId(state, payload) {
            state.userId = payload
        }
        // setEachPage(state, payload) {
        //     state.eachpage = payload
        // },
        // deleteStaff(state, payload) {
        //     state.rows = state.rows.filter(item => item._id != payload);
        // }
    },
    getters: {

    },
    actions: {
        //获取所有数据
        async asyncGetGoods(context, { curpage, eachpage,select,type } = {}) {
            let userId = context.state.userId;
            const data = await fetch(`/goods?page=${curpage || context.state.curpage}&rows=${eachpage || context.state.eachpage}&select=${select}&type=${type}&userId=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            });
            console.log(data)
            context.commit("getGoodsByPage", data);
        },
        //增加数据
        async asyncAddGoods(context,data) {
            data.userId = context.state.userId;
            const text = await fetch(`/goods`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data) 
            }).then(response => {
                return response.json();
            });
            context.dispatch("asyncGetGoods");
        },

        //修改数据
        async asyncPutGoods(context,obj) {
            let id = obj._id;
            delete obj._id;
            const data = await fetch(`/goods/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(obj) 
            }).then(response => {
                return response.text();
            });
        },
        //删除数据
        async asyncDeleteGoods(context,ids) {
            const data = await fetch(`/goods/${ids}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(ids)
            }).then(response => {
                return response.text();
            });
            console.log(data);
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
        }
    }
}