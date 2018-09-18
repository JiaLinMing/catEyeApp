<template>
      <el-dialog :show-close="false" title="修改信息" :visible.sync="dialogVisible">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="订单编号" :label-width="formLabelWidth" prop="_id">
      <el-input v-model="ruleForm._id" style="width:250px" readonly></el-input>
    </el-form-item>
    <el-form-item label="收货人" :label-width="formLabelWidth" prop="customer">
      <el-input v-model="ruleForm.customer" style="width:250px"></el-input>
    </el-form-item>
    <el-form-item label="收货人手机号" :label-width="formLabelWidth" prop="phone">
      <el-input v-model="ruleForm.phone" style="width:250px"></el-input>
    </el-form-item>
    <el-form-item label="收获地址" :label-width="formLabelWidth" prop="addr">
      <el-input v-model="ruleForm.addr" style="width:250px"></el-input>
    </el-form-item>
    <el-form-item label="店铺名" :label-width="formLabelWidth" prop="shop">
      <el-input v-model="ruleForm.shop" style="width:250px"></el-input>
    </el-form-item>
    <el-form-item label="服务类型" :label-width="formLabelWidth" prop="type">
    <el-select v-model="ruleForm.type">
      <el-option label="平台管理员" value="0"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="订单状态" :label-width="formLabelWidth" prop="state">
    <el-select v-model="ruleForm.state">
      <el-option label="未支付" value="-1"></el-option>
      <el-option label="未完成" value="0"></el-option>
      <el-option label="已完成" value="1"></el-option>
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
    radioVal: {}
  },
  watch: {
    radioVal: {
      handler(newValue, oldValue) {
        Object.assign(this.ruleForm, newValue);
      },
      deep: true
    }
  },
  data() {
    return {
      ruleForm: {
        _id: "",
        customer: "",
        phone: "",
        addr: "",
        shop: "",
        type: "",
        state: ""
      },
      rules: {
        cumstor: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ],
        addr: [{ required: true, message: "请输入收货地址", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入11位手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号应该11位数字", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "120px"
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
          this.$store.dispatch("orders/asyncEditorder", data);
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
