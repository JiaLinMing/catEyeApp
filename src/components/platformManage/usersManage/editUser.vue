<template>
      <el-dialog :show-close="false" title="修改信息" :visible.sync="dialogVisible">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
      <el-input v-model="ruleForm.userName" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="登录名" :label-width="formLabelWidth" prop="userAcount">
      <el-input v-model="ruleForm.userAcount" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="userPwd">
      <el-input v-model="ruleForm.userPwd" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="手机号" :label-width="formLabelWidth" prop="userPhone">
      <el-input v-model="ruleForm.userPhone" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userMail">
      <el-input v-model="ruleForm.userMail" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="角色" :label-width="formLabelWidth" prop="userType">
    <el-select v-model="ruleForm.userType">
      <el-option v-if="ruleForm.userType==0" label="平台管理员" value="0"></el-option>
       <el-option v-else label="门店管理员" value="1"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="状态" :label-width="formLabelWidth" prop="userStatus">
    <el-select v-model="ruleForm.userStatus">
      <el-option label="可用" value="1"></el-option>
      <el-option label="不可用" value="-1"></el-option>
    </el-select>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialogunShow">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    row: {}
  },
  watch: {
    row: {
      handler(newValue, oldValue) {
        this.ruleForm = newValue;
      },
      deep: true
    }
  },
  data() {
    return {
      ruleForm: {
        userName: "",
        userAcount: "",
        userPwd: "",
        userPhone: "",
        userMail: "",
        userStatus: "",
        userType: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        userAcount: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        userPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[a-zA-Z\d_]{6,15}$/,
            message: "密码由字母、数字、下划线组成，长度为6到15位",
            trigger: "blur"
          }
        ],
        userPhone: [
          { required: true, message: "请输入11位手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号应该11位数字", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        userMail: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      },
      formLabelWidth: "100px"
    };
  },
  methods: {
    editDialogunShow() {
      this.$emit("editDialogunShow");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = this.ruleForm;
          this.$store.dispatch("users/asyncEdituser", data);
          this.$alert("修改成功！", "公告", {
            confirmButtonText: "确定",
            callback: () => {
              this.$emit("editDialogunShow");
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
