export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 5,
        maxpage: 0,
        rows: [],
        total: 0,
        type: "",
        value: ""
    },
    mutations: {
        getMemberByPage(state, payload) {
            Object.assign(state, payload);
        },
        setCurPage(state, payload) {
            state.curpage = payload
        },
        setEachPage(state, payload) {
            state.eachpage = payload
        },
        SearchMember: function (state, payload) {//把查询的类型和内容放进state里面，后面getters用
            state.type = payload.type;
            state.value = payload.value;
        }
    },
    getters: {//关联的
        search: function (state) {//查询关联
            switch (state.type) {
                case "memberName":
                    return state.rows.filter(item => !item.memberName.indexOf(state.value));
                case "memberPhone":
                    return state.rows.filter(item => !item.memberPhone.indexOf(state.value));
                case "memberArea":
                    return state.rows.filter(item => !item.memberArea.indexOf(state.value));
                default:
                    return state.rows;
            }
        }
    },
    actions: {
        async asyncGetMemberByPage(context, { curpage, eachpage,type,value } = {}) {//请求数据库
            const data = await fetch(`/members`, {
                method: "POST",
                body:JSON.stringify({
                    page:curpage || context.state.curpage,
                    rows:eachpage || context.state.eachpage,
                    type:type || context.state.type,
                    value:value || context.state.value
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
                return response.json();
            });
            context.commit("getMemberByPage", data);
        },
        async RemoveMemberById(context, id) {//根据id，删除数据
            await fetch('/members/' + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            context.dispatch("asyncGetMemberByPage");//重新发出请求，渲染数据
        },
        async UpdateMemberById(context, row) {//修改
            let memberAcount = row.memberAcount;
            let memberName = row.memberName;
            let memberPhone = row.memberPhone;
            let memberArea = row.memberArea;
            let memberAdd = row.memberAdd;
            const obj = { memberAcount, memberName, memberPhone, memberArea, memberAdd };
            let id = row._id;
            await fetch('/members/' + id, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        },
    }
}