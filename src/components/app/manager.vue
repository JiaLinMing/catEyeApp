<template>
<el-container>
  <el-header height="70px" >猫眼后台管理系统
    <div style="float:right">
    <span>欢迎你{{this.$store.state.setLogin[0].userPhone}}</span>
    <el-button @click="logout"  type="button" native-type="button" class="el-icon-circle-close" style="margin:0 20px;color:red;background:pink">注销</el-button>
    </div>
  </el-header>
<el-container style="height:600px">
<el-aside width="200px">Aside</el-aside>
<el-main>
<el-menu 
  :default-active="activeIndex"
  router
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item v-if="userType==0" index="/manager/users" style="margin-left:60px;font-size:18px;">用户管理</el-menu-item>
  <el-menu-item v-if="userType==0" index="/manager/shops" style="margin-left:60px;font-size:18px">门店管理</el-menu-item>
  <el-menu-item v-if="userType==0" index="/manager/members" style="margin-left:60px;font-size:18px">宠主管理</el-menu-item>
  <el-menu-item v-if="userType==1" index="/manager/goods" style="margin-left:60px;font-size:18px">商品管理</el-menu-item>
  <!-- <el-menu-item v-if="userType==1" index="/manager/shops" style="margin-left:60px;font-size:18px">商品管理</el-menu-item> -->
  <el-menu-item v-if="userType==1" index="/manager/services" style="margin-left:60px;font-size:18px">服务管理</el-menu-item>
  <el-menu-item v-if="userType==1" index="/manager/orders" style="margin-left:60px;font-size:18px">订单管理</el-menu-item>
</el-menu>
<router-view></router-view>
</el-main>
</el-container>
<el-footer>footer</el-footer>
</el-container>
</template>

<script>
export default {
  name: "manager",
  data() {
    console.log(this.$store.state.setLogin);
    return {
      userType: this.$store.state.setLogin[0].userType,
      activeIndex: window.location.hash.split("#")[1]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$confirm("确认注销登录?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("logout").then(res => {
            this.$router.push(`/`);
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer {
  background-color: rosybrown;
  color: #333;
  line-height: 60px;
}

/* .el-footer{
  margin-top: 10px
} */
.el-aside {
  background-color: skyblue;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-aside h1 {
  font-size: 62px;
}
</style>

