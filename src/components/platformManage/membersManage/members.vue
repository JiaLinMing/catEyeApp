<template>
    <div>
      <el-form :inline="true"  :model="formInline" class="demo-form-inline">
  <el-form-item label="类型">
    <el-select placeholder="姓名" v-model="formInline.type" ref="input2">
      <el-option label="姓名" value="memberName"></el-option>
      <el-option label="电话" value="memberPhone"></el-option>
      <el-option label="区域" value="memberArea"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="内容">
    <el-input placeholder="请输入内容" v-model="formInline.text" ref="input1">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
  </el-form-item>
</el-form>
        <el-table router
        :data="search"
        border
        @row-click="update"
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
        prop="memberAdd[0].addr"
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
            <el-button type="primary" size="small" icon="el-icon-edit" @click="dialogFormVisible = true">修改</el-button>
            <el-button type="warning" size="small" icon="el-icon-delete" @click="RemoveMemberById(rows.row._id)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <!-- 修改的对话框 -->
    <el-dialog title="宠主信息" :visible.sync="dialogFormVisible" style="width:1500px">
      <el-form :model="form" :rules="rules" ref="ValidateForm">
        <el-form-item label="宠主昵称" prop="memberAcount" :label-width="formLabelWidth">
          <el-input v-model="form.memberAcount" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="宠主姓名" prop="memberName" :label-width="formLabelWidth">
          <el-input v-model="form.memberName" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="宠主电话" prop="memberPhone" :label-width="formLabelWidth">
          <el-input v-model="form.memberPhone" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="送货地址" prop="memberAdd[0].addr" :label-width="formLabelWidth">
          <el-input v-model="form.memberAdd[0].addr" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="区域" prop="memberArea" :label-width="formLabelWidth">
          <el-input v-model="form.memberArea" auto-complete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateBtn();dialogFormVisible = false;submitForm('ValidateForm')">确 定</el-button>
      </div>
    </el-dialog>
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
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "members",
  data() {
    return {
      rules: {
        memberAcount: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        memberName: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        memberPhone: [
          { required: true, message: "电话不能为空", trigger: "blur" }
        ],
        "memberAdd[0].addr": [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ],
        memberArea: [
          { required: true, message: "区域不能为空", trigger: "blur" }
        ]
      },
      formInline: {
        text: "",
        type: ""
      },
      dialogFormVisible: false,
      form: {
        memberAcount: "",
        memberName: "",
        memberPhone: "",
        memberAdd: [{ addr: "", name: "", phone: "" }],
        memberArea: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.asyncGetMemberByPage();
  },
  computed: {
    ...mapState("members", ["curpage", "eachpage", "maxpage", "total", "rows"]), //通过路由，映射数据
    ...mapGetters("members", ["search"])
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
    update(row, event, column) {
      //修改,显示信息数据
      Object.assign(this.form, row); //替换，避免双向绑定情况
    },
    updateBtn() {
      let row = this.form;
      this.UpdateMemberById(row);
      this.asyncGetMemberByPage(); //重新刷新页面数据
    },
    submitForm(formName) {
      let flag=true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("修改成功");         
        } else {
          alert("信息不能为空！");
          flag=false;
          return false;
        }
      });
      if(!flag){
        this.dialogFormVisible=true;
      }
    },
    onSubmit() {
      //查询
      const type = this.$refs.input2.value; //类型
      const value = this.$refs.input1.value; //内容
      // this.SearchMember({ type, value });//不用请求数据库，在已有数据列表进行搜索
      this.asyncGetMemberByPage({ type, value }); //请求数据库搜索
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
    ...mapMutations("members", ["setCurPage", "setEachPage", "SearchMember"]),
    ...mapActions("members", [
      "asyncGetMemberByPage",
      "RemoveMemberById",
      "UpdateMemberById"
    ]),
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

