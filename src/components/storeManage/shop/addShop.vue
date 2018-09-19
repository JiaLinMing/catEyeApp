<template>
    <div>
        <el-row>
            <el-button @click="dialogVisible = true" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
        </el-row>
        <el-dialog title="新增门店信息" :visible.sync="dialogVisible" width="700px" :before-close="close">
            <!-- Form -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="店名" prop="shopName">
                    <el-input v-model="ruleForm.shopName"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号码" prop="shopLicenceNum">
                    <el-input v-model="ruleForm.shopLicenceNum"></el-input>
                </el-form-item>
                <el-form-item label="营业地址" prop="shopAdd">
                    <el-input v-model="ruleForm.shopAdd"></el-input>
                </el-form-item>
                <el-form-item label="定位" required>
                    <el-col :span="11">
                        <el-form-item prop="longitude">
                            <el-input type="text" placeholder="经度:例 104.5246" v-model="ruleForm.longitude" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="padding-left:18px">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="latitude">
                            <el-input type="text" placeholder="纬度:例 30.6536" v-model="ruleForm.latitude" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="法人" prop="shopCorporate">
                    <el-input style="width:200px" type="text" v-model="ruleForm.shopCorporate"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="shopTel">
                    <el-input style="width:200px" type="text" v-model="ruleForm.shopTel"></el-input>
                </el-form-item>
                <!-- 上传图片 -->
                <addPhoto @getShopImg="getPhotoPath" />

                <el-form-item>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "addShop",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        shopName: "",
        shopLicenceNum: "",
        shopAdd: "",
        shopCorporate: "",
        shopTel: "",
        longitude: "",
        latitude: "",
        shopLocation: {},
        state: "待审核",
        shopImg: [],
        services: [],
        goods: []
      },
      rules: {
        shopName: [
          { required: true, message: "请输入门店名称", trigger: "blur" }
        ],
        shopLicenceNum: [
          { required: true, message: "请输入营业执照号码", trigger: "blur" }
        ],
        shopAdd: [
          { required: true, message: "请输入门店地址", trigger: "blur" }
        ],
        shopCorporate: [
          { required: true, message: "请输入法人姓名", trigger: "blur" }
        ],
        shopTel: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        longitude: [
          { required: true, message: "请输入经度信息", trigger: "blur" }
        ],
        latitude: [
          { required: true, message: "请输入纬度信息", trigger: "blur" }
        ]
      }
    };
  },
  computed: { ...mapState("shop", ["userId"]) },
  methods: {
    getShopImg(path) {
      this.ruleForm.shopImg = path;
    },
    getPhotoPath(arr){//获取图片路径
        this.goodsImg = arr;
        console.log(this.goodsImg);
        this.ruleForm.goodsImg = arr;
    },
    handleClose() {
    //   console.log("点X关闭");
      this.close();
    },
    // 清空重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 关闭对话框
    close() {
      this.resetForm("ruleForm");
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.shopLocation = {
            longitude: this.longitude,
            latitude: this.latitude
          };
          delete this.ruleForm.longitude;
          delete this.ruleForm.latitude;
          ruleForm.userId = this.userId;
          this.async_addShop(this.ruleForm);
          this.resetForm("ruleForm");
        } else {
          this.$alert("请完整填写相关信息！", "警告", {
            confirmButtonText: "确定"
          });
          return false;
        }
      });
    }
  }
};
</script>
