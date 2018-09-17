<template>
  <div>
    <el-row>
      <el-button type="primary" @click="open('添加服务')" icon="el-icon-circle-plus-outline">添加</el-button>
      <el-button type="primary" @click="open('修改服务')" icon="el-icon-edit-outline">修改</el-button>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" :title="option" props="dialogVisible" width="700px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="服务名称" prop="serviceName">
          <el-input v-model="ruleForm.serviceName"></el-input>
        </el-form-item>
        <el-form-item label="服务类别" prop="serviceType">
          <el-select v-model="ruleForm.serviceType" placeholder="请选择服务类型">
            <el-option label="宠物洗澡" value="宠物洗澡"></el-option>
            <el-option label="宠物美容" value="宠物美容"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可用时间" required>
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-time-picker type="date" placeholder="起始时间" v-model="ruleForm.startTime" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" style="padding-left:18px" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-time-picker type="fixed-time" placeholder="结束时间" v-model="ruleForm.endTime" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="服务员等级" prop="serviceLevel">
          <el-radio-group v-model="ruleForm.serviceLevel">
            <el-radio label="高级"></el-radio>
            <el-radio label="普通"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="服务规格" prop="serviceDetail">
          <el-radio-group v-model="ruleForm.serviceDetail">
            <el-radio label="精修"></el-radio>
            <el-radio label="普修"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="适用规格" prop="serviceCanFor">
          <el-radio-group v-model="ruleForm.serviceCanFor">
            <el-radio label="小型宠物"></el-radio>
            <el-radio label="中型宠物"></el-radio>
            <el-radio label="大型宠物"></el-radio>
            <el-radio label="大中小型均可"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="耗时" prop="serviceTime">
          <el-input style="width:200px" type="text" v-model="ruleForm.serviceTime"></el-input> 分钟
        </el-form-item>
        <el-form-item label="价格" prop="servicePrice">
          <el-input style="width:200px" type="text" v-model="ruleForm.servicePrice"></el-input> 元
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm(ruleForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "ServiceForm",
  props: ["selected"],
  data() {
    return {
      ruleForm: {
        serviceName: "",
        serviceType: "",
        startTime: "",
        endTime: "",
        serviceSchedule: "",
        serviceLevel: "",
        serviceDetail: "",
        serviceCanFor: "",
        serviceTime: "",
        servicePrice: "",
        _id: ""
      },

      rules: {
        serviceName: [
          { required: true, message: "请输入服务名称", trigger: "blur" }
        ],
        serviceType: [
          { required: true, message: "请选择服务类型", trigger: "change" }
        ],
        startTime: [
          {
            type: "date",
            required: true,
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "date",
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ],
        serviceLevel: [
          { required: true, message: "请选择服务员等级", trigger: "change" }
        ],
        serviceDetail: [
          { required: true, message: "请选择服务规格", trigger: "change" }
        ],
        servicePrice: [
          { required: true, message: "请填写服务价格", trigger: "blur" }
        ],
        serviceTime: [
          { required: true, message: "请填写服务用时", trigger: "blur" }
        ]
      },
      dialogVisible: false,
      option: ""
    };
  },

  methods: {
    ...mapActions("services", [
      "async_getServById",
      "async_addServ",
      "async_updateServ"
    ]),
    //提交
    submitForm(formName) {
      this.ruleForm.serviceSchedule = this.ruleForm.startTime +'-'+ this.ruleForm.endTime
      delete this.ruleForm.startTime;
      delete this.ruleForm.endTime;
      this.ruleForm.serviceTime = this.ruleForm.serviceTime+'分钟';
      this.ruleForm.servicePrice = this.ruleForm.servicePrice+'元';
      this.async_updateServ(this.ruleForm);
      console.log("submit!", this.ruleForm);
      this.dialogVisible = false;
      // this.resetForm(formName); //提交的回调中清空表单
      // this.$refs[formName].validate(valid => {
        // if (valid) {
        //   //验证通过
        //   alert("submit!");
        //   this.async_updateServ(this.ruleForm);
        //   console.log("submit!", this.ruleForm);
        // } else {
        //   this.$alert("请正确填写相关信息！", "警告", {
        //     confirmButtonText: "确定"
        //   });
        //   return false;
        // }
      // });
    },
    //打开对话框
    open(val) {
      // 修改服务对话框
      if (val === "修改服务") {
        if (this.selected.length != 1) {
          this.$alert("请选择一项服务进行修改！", "警告", {
            confirmButtonText: "确定"
          });
          return;
        } else {
          this.option = val;
          this.dialogVisible = true;
          console.log(this.selected[0]);
          this.ruleForm = this.selected[0];
        }
      }
      //   添加服务对话框
      this.option = val;
      this.dialogVisible = true;
    },
    // 清空重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 关闭对话框
    close() {
      this.resetForm(ruleForm);
      this.dialogVisible = false;
    }
  }
};
</script>

