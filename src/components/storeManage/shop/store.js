export default {
    namespaced: true,
    state: {
        curpage: 1,  //当前页码
        eachpage: 5, //每页显示数
        maxpage: 0, //总页码
        total: 0,   //总数
        rows: [],     //分页查询
        goodsData: {
            curpage: 1,  //当前页码
            eachpage: 5, //每页显示数
            maxpage: 0, //总页码
            total: 0,   //总数
            rows: [],
        },
        serviceData: {
            curpage: 1,
            eachpage: 5,
            maxpage: 0,
            total: 0,
            rows: []
        },
        shopId:"5b98baabd69ba22094a463ec",
        userId: ''
    },
    mutations: {
        //商品查询
        getGoodsForShop(state, payload) {
            Object.assign(state.goodsData, payload)
        },
        //门店查询
        getShopByPage(state, payload) {
            Object.assign(state, payload)
        },
        setCurPage(state, payload) {
            state.curpage = payload
        },
        setEachPage(state, payload) {
            state.eachpage = payload
        },
        setShopId(state, payload) {
            state.shopId = payload
        },
        //服务查询
        setServiceData(state, payload) {
            Object.assign(state.serviceData, payload);
            console.log(state.serviceData)
        },
        setUserId(state, payload) {
            state.userId = payload
        }
    },
    getters: {
    },
    actions: {
        //门店
        async async_getShopByPage(context, { curpage, eachpage } = {}) {
            const data = await fetch(`/shop?page=${curpage || context.state.curpage}&rows=${eachpage || context.state.eachpage}&userId=${context.state.userId}`, {
                headers: { 'Content-Type': "application/json" },
            })
                .then(response => {
                    return response.json()
                })
            // console.log("data", data);
            context.commit('getShopByPage', data)
        },
        async async_addShop(context, shop) {
            const data = await fetch('/shop/addShop', {
                method: 'post',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(shop)
            })
            console.log("addData", data);
            context.dispatch('async_getShopByPage')
        },
        //服务
        async async_getServByPage(context, { page, rows } = {}) {
            const data = await fetch(`/shop/services?page=${page || 1}&rows=${rows || 5}&ShopId=${context.state.shopId}`, {
                headers: { 'Content-Type': "application/json" },
            })
                .then(response => {
                    return response.json()
                })
            // console.log("data", data);
            // Object.assign(context.state.serviceData, data)
            context.commit('setServiceData', data)


        },
        async async_deleteServ(context, ids) {
            const data = await fetch('/shop/delService', {
                method: 'post',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ ids, shopId: context.state.shopId })
            })
            context.dispatch('async_getServByPage')
        },
        async async_addServ(context, ids) {
            const data = await fetch('/shop/addService', {
                method: 'post',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ ids, shopId: context.state.shopId })
            })
            console.log("addData", data);
            context.dispatch('async_getServByPage')
        },
        //商品
        //获取数据
        async asyncGetGoods(context, { curpage, eachpage } = {}) {
            let shopId = context.state.shopId;
            console.log(shopId);
            const data = await fetch(`/shops?page=${curpage||context.state.goodsData.curpage}&rows=${eachpage||context.state.goodsData.eachpage}&id=${shopId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            });
            console.log(data);
            context.commit("getGoodsForShop", data);
        },
        //增加数据
        async asyncAddGoods(context, ids) {
            let shopId = context.state.shopId;
            let obj = {ids,shopId};
            const text = await fetch(`/shops`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(response => {
                return response.text();
            });
            // if(text=="suc"){
                context.dispatch("asyncAddGoods",{shopId:""});
            // }
        },
        //删除数据
        async asyncDeleteGoods(context, ids) {
            let shopId = context.state.shopId;
            console.log(ids);
            const data = await fetch(`/shops/${shopId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ids)
            }).then(response => {
                return response.text();
            });
            context.commit("asyncGetGoods")
        },
        //获取用户Id
        async getSession(context) {
            const data = fetch('/getSession', {
                headers: { 'Content-Type': "application/json" },
            })
                .then(response => {
                    return response.json()
                })
            context.commit('setUserId', data[0]._id)
        }
    }
}