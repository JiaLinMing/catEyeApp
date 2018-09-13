<template>
<div>
    <h1>用户管理</h1>
    <el-button type="primary" @click="handleClick()" icon="el-icon-circle-plus ">增加用户</el-button>
    <addUser @unShow="unShow" :dialogVisible="isShow"/>
    <!-- <el-button type="primary" circle icon="el-icon-search "></el-button> -->
    <el-input size="medium" style="width:400px;margin-left:20px;" placeholder="请输入内容" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择搜索类型">
      <el-option label="手机号" value="1"></el-option>
      <el-option label="角色" value="2"></el-option>
      <el-option label="状态" value="3"></el-option>
      <el-option label="登录名" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search">搜索</el-button>
  </el-input>
  <el-table
    :data="rows"
    style="width: 100%">
    <el-table-column
      label="姓名"
      width="120"
      prop="userName">
    </el-table-column>
    <el-table-column
      label="登录名"
      width="130"
      prop="userAcount">
    </el-table-column>
    <el-table-column
      label="密码"
      width="140"
      prop="userPwd">
    </el-table-column>
    <el-table-column
      label="手机号"
      width="140"
      prop="userPhone">
    </el-table-column>
    <el-table-column
      label="邮箱"
      width="150"
      prop="userMail">
    </el-table-column>
    <el-table-column
      label="角色"
      width="130">
      <template slot-scope="scope">
          <span v-if="scope.row.userType==0">平台管理员</span>
          <span v-else>门店管理员</span>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="120">
      <template slot-scope="scope">
          <span v-if="scope.row.userStatus==0">申请中</span>
          <span v-else-if="scope.row.userStatus==1">可用</span>
          <span v-else>不可用</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.userStatus==0"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">通过申请</el-button>
          <el-button
          v-if="scope.row.userStatus==0"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">拒绝申请</el-button>
          <el-button
          v-else
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

   <el-pagination
      @size-change="handleEachChange"
      @current-change="handleCurChange"
      :current-page="curpage"
      :page-sizes="[5, 15, 20, 25]"
      :page-size="eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      select: "",
      isShow: false
    };
  },
  computed: {
    ...mapState("users", ["curpage", "eachpage", "maxpage", "total", "rows"])
  },
  methods: {
    unShow() {
      this.isShow = false;
    },
    handleClick() {
      this.isShow = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleEachChange() {},
    handleCurChange() {}
  }
};
</script>

<style>
.el-select .el-input {
  width: 150px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
