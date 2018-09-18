<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" showdow='always' label-width="80px" class="box-card">
    <el-card style="padding:0 22px">
      <h1 style="text-align:center;color:skyblue">注册</h1>
  <el-form-item label="手机号：" prop="userPhone">
    <el-input v-model="ruleForm.userPhone" type='text' placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item label="用户名：" prop="userAcount">
    <el-input v-model="ruleForm.userAcount" type='text' placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="姓 名 ：" prop="userName">
    <el-input v-model="ruleForm.userName" type='text' placeholder="请输入姓名"></el-input>
  </el-form-item>
  <el-form-item label="密 码 ：" prop="userPwd" >
    <el-input v-model="ruleForm.userPwd" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item label="邮 箱  ：" prop="userMail">
    <el-input v-model="ruleForm.userMail" placeholder="请输入邮箱"></el-input>
  </el-form-item>
  <el-form-item class="button">
    <el-button type="primary" @click="submitForm('ruleForm')" >注册</el-button>
  </el-form-item>
    </el-card>
</el-form>
</template>

<script>
export default {
  name: "reg",
  data() {
    return {
      ruleForm: {
        userPhone: "",
        userAcount: "",
        userPwd: "",
        userMail: "",
        userName:""
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
        userName:[{
          required:true,message:'请输入姓名',trigger:'blur'
        }],
        userPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[a-zA-Z\d_]{6,15}$/,
            message: "密码由字母、数字、下划线组成，长度为6到15位",
            trigger: "blur"
          }
        ],
        userMail: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = this.ruleForm;
          console.log(data);
          this.$store.dispatch("reg", data);
          this.$alert("注册成功!", "公告", {
            confirmButtonText: "确定",
            callback: () => {
              this.$router.push(`./login/${this.ruleForm.userPhone}`)
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
.box-card {
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -300px;
}
.button{
    margin-left: 140px
}
</style>

