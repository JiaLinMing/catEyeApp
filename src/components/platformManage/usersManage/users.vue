<template>
<div>
 
  <div style="margin-top:10px">
    <el-button type="info" @click="handleClick()" icon="el-icon-circle-plus ">增加用户</el-button>
    <addUser @unShow="unShow" :dialogVisible="isShow"/>
    <editUser @editDialogunShow="editDialogunShow" :dialogVisible="editDialogShow" :row="row"/>
    <!-- <el-button type="primary" circle icon="el-icon-search "></el-button> -->
    <el-input size="medium" v-model="input" style="width:450px;margin-left:20px;" placeholder="请输入内容" class="input-with-select">
    <el-select  v-model="select" slot="prepend" placeholder="请选择搜索类型">
      <el-option label="手机号" value="userPhone"></el-option>
      <el-option label="角色" value="userType"></el-option>
      <el-option label="状态" value="userStatus"></el-option>
      <el-option label="登录名" value="userAcount"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
  </el-input>
  </div>
  <el-table
    :data="searchUsers"
    >
    <el-table-column
      label="姓名"
    
      prop="userName">
    </el-table-column>
    <el-table-column
      label="登录名"
      prop="userAcount">
    </el-table-column>
    <el-table-column
      label="密码"
      prop="userPwd">
    </el-table-column>
    <el-table-column
      label="手机号"
      prop="userPhone">
    </el-table-column>
    <el-table-column
      label="邮箱"
      prop="userMail">
    </el-table-column>
    <el-table-column
      label="角色">
      <template slot-scope="scope">
          <span v-if="scope.row.userType==0">平台管理员</span>
          <span v-else>门店管理员</span>
      </template>
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
          <span v-if="scope.row.userStatus==0">申请中</span>
          <span v-else-if="scope.row.userStatus==1">可用</span>
          <span v-else>不可用</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.userStatus==0"
          size="mini"
          type="success"
          @click="handleExamine(scope.$index, scope.row,1)">通过申请</el-button>
          <el-button
          v-if="scope.row.userStatus==0"
          size="mini"
          type="warning"
          @click="handleExamine(scope.$index, scope.row,0)">拒绝申请</el-button>
          <el-button
          v-else
          size="mini"
          icon="el-icon-edit"
          type="primary"
          @click="handleEditClick(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

   <el-pagination
      style="margin:10px 0 0 0px"
      @size-change="handleEachChange"
      @current-change="handleCurChange"
      :current-page="curpage"
      :page-sizes="[10,5, 15, 20, 25]"
      :page-size="eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
   
    return {
      isShow: false,
      editDialogShow: false,
      row:{},
      input: "",
      select: "userPhone",
      count_format: this.rows
    };
  },
  watch: {
    curpage() {
      this.asyncGetusersByPage();
    },
    eachpage() {
      this.asyncGetusersByPage();
    }
  },
  computed: {
    ...mapState("users", ["curpage", "eachpage", "maxpage", "total"]),
    ...mapGetters("users", ["searchUsers"])
  },
  methods: {
    unShow() {
      this.isShow = false;
    },
    editDialogunShow() {
      this.editDialogShow = false;
    },
    //修改用户弹窗的button
    handleEditClick(index,row) {
      this.row=row;
      this.editDialogShow = true;
    },
    //增加用户弹窗的button
    handleClick() {
      this.isShow = true;
    },
    handleEachChange: function(val) {
      this.setEachPage(val);
    },
    handleCurChange(val) {
      this.setCurPage(val);
    },
    //搜索
    search() {
      let type = this.select;
      let input = this.input;
      let obj = { type, input };
      this.setType(obj);
      this.input = "";
    },
    //审核
    handleExamine(index, row, state) {
      let obj = { id: row._id, state };
      if (state == 1) {
        this.$confirm("确认通过审核?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "关闭",
          type: "warning"
        })
          .then(() => {
            this.asyncPassRequest(obj);
            this.$message({
              type: "success",
              message: "审核已通过!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已关闭操作"
            });
          });
      } else {
        this.$confirm("确认拒绝通过申请?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "关闭",
          type: "warning"
        })
          .then(() => {
            this.asyncPassRequest(obj);
            this.$message({
              type: "success",
              message: "申请已拒绝!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已关闭操作"
            });
          });
      }
    },
    
    handleDelete(index, row) {
      this.$confirm("此操作将删除该用户的所有信息, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.asyncDeleteusersByPage(row._id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ...mapActions("users", [
      "asyncGetusersByPage",
      "asyncSearchUsersByPage",
      "asyncDeleteusersByPage",
      "asyncPassRequest"
    ]),
    ...mapMutations("users", ["setEachPage", "setCurPage", "setType"])
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
