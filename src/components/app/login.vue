<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" showdow='always' label-width="80px" class="box-card">
    <el-card style="padding:22px;padding-top:0">
      <h1 style="text-align:center;color:skyblue;margin-bottom:30px">登录</h1>
  <el-form-item label="账 号 ：" prop="userPhone">
    <el-input v-model="ruleForm.userPhone" type='text' placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item label="密 码 ：" prop="userPwd">
    <el-input v-model="ruleForm.userPwd" placeholder="密码"></el-input>
  </el-form-item>
  <el-form-item class="button">
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button type="primary" @click="reg" >注册</el-button>
  </el-form-item>
    </el-card>
</el-form>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        userPhone: this.$route.params.userPhone,
        userPwd: "",
        userType:''
      },
      rules: {
        userPhone: [
          { required: true, message: "请输入11位手机号", trigger: "blur" }
        ],
        userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = this.ruleForm;
          this.$store
            .dispatch("login", data)
            .then(res => {
              this.ruleForm.userType=this.$store.state.validate;
              this.$store.commit('setUser',data)
              if (this.$store.state.validate == 1) {
                this.$alert("登录成功!", "公告", {
                  confirmButtonText: "确定",
                  callback: () => {
                    // if (this.$store.state.userType == 0) {
                      this.$router.push({path:"manager",name:"manager"});
                    // } else {
                    //   this.$router.push(`./orders`);
                    // }
                  }
                });
              } else {
                this.$alert("账号或密码错误!", "公告", {
                  confirmButtonText: "确定"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
          // this.$alert("登录成功!", "公告", {
          //   confirmButtonText: "确定",
          //   callback: () => {
          // this.$router.push(`./login/${this.ruleForm.userPhone}`);
          // }
          // });
        } else {
          return false;
        }
      });
    },
    reg() {
      this.$router.push({ path: "reg", name: "reg" });
    }
  }
};
</script>

<style scoped>
.box-card {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -250px;
}
.button{
    margin-left: 50px
}
</style>


