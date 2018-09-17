<template>
    <el-dialog title="新增管理员" :visible.sync="dialogVisible" @close="unShow">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="userPhone">
      <el-input v-model="ruleForm.userPhone" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="登录名" :label-width="formLabelWidth" prop="userAcount">
      <el-input v-model="ruleForm.userAcount" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="userPwd">
      <el-input v-model="ruleForm.userPwd" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
      <el-input v-model="ruleForm.userName" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="userMail">
      <el-input v-model="ruleForm.userMail" style="width:200px"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="unShow">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      ruleForm: {
        userPhone: "",
        userAcount: "",
        userPwd: "",
        userName: "",
        userMail: "",
        userStatus: "1",
        userType: "0"
      },
      rules: {
        userPhone: [
          { required: true, message: "请输入11位手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号应该11位数字", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
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
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        userMail: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      },
      formLabelWidth: "100px"
    };
  },
  methods: {
    unShow() {
      this.$emit("unShow");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = this.ruleForm;
          this.$store.dispatch("users/asyncAdduser", data);
          this.$alert("新增成功！", "公告", {
            confirmButtonText: "确定",
            callback: () => {
              this.$emit("unShow");
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

<style scoped>
</style>

