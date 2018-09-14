<template>
    <div>
      <el-form :inline="true"  :model="formInline" class="demo-form-inline">
  <el-form-item label="类型">
    <el-select placeholder="姓名" v-model="formInline.region">
      <el-option label="姓名" value="name"></el-option>
      <el-option label="电话" value="tel"></el-option>
      <el-option label="区域" value="area"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="内容">
    <el-input placeholder="请输入内容" v-model="formInline.user"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
        <el-table router
        :data="rows"
        border
        style="width: 100%">
        <el-table-column
        fixed
        prop="memberAcount"
        label="宠主昵称">
        </el-table-column>
        <el-table-column
        fixed
        prop="memberName"
        label="宠主姓名">
        </el-table-column>
        <el-table-column
        prop="memberPhone"
        label="宠主电话">
        </el-table-column>
        <el-table-column
        prop="memberAdd"
        label="送货地址">
        </el-table-column>
        <el-table-column
        prop="memberArea"
        label="区域">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="rows">
            <el-button type="primary" size="small">修改</el-button>
            <el-button type="warning" size="small" @click="RemoveMemberById(rows.row._id)" >删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curpage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "members",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  created() {
    this.asyncGetMemberByPage();
  },
  computed: {
    ...mapState("members", ["curpage", "eachpage", "maxpage", "total", "rows"]) //通过路由，映射数据
  },
  watch: {
    //监听的数据发生变化而变化
    curpage() {
      //监听当前页curpage的变化
      this.asyncGetMemberByPage(); //请求数据库，更新数据
    },
    eachpage() {
      //监听每页显示数eachpage的变化
      this.asyncGetMemberByPage();
    }
  },
  methods: {
    onSubmit() {//查询
      console.log("submit!");
    },
    
    handleSizeChange: function(val) {
      //每页条数
      // console.log(`每页 ${val} 条`);
      this.setEachPage(val);
    },
    handleCurrentChange: _.debounce(function(val) {
      //当前页
      // console.log(`当前页: ${val}`);
      this.setCurPage(val);
    }, 500), //_.debounce通过lodash的方法来设置使用频率，防止在未执行完上一次watch的时候，又重复执行watch
    ...mapMutations("members", ["setCurPage", "setEachPage"]),
    ...mapActions("members", ["asyncGetMemberByPage", "RemoveMemberById"]),
    firstPage() {
      this.asyncGetMemberByPage({ curpage: 1 });
    },
    nextPage() {
      this.asyncGetMemberByPage({ curpage: this.curpage + 1 });
    },
    prevPage() {
      this.asyncGetMemberByPage({ curpage: this.curpage - 1 });
    },
    lastPage() {
      this.asyncGetMemberByPage({ curpage: this.maxpage });
    }
  }
};
</script>

<style>
</style>

