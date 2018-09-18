<template>
    <div>
        <div style="margin-top: 20px">
            <el-button @click="getAddBtn">增加</el-button>
            <el-button :plain="true" @click="getPutBtn">修改</el-button>
            <el-button v-if="deleteState==0" @click="getDeleBtn">删除</el-button>
            <el-button v-else @click="deleteSelected">确认</el-button>
            <el-input style="width:600px" placeholder="请输入内容" v-model="input" class="input-with-select marginLeft">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="商品名" value="goodsName"></el-option>
                    <el-option label="商品类型" value="goodsType"></el-option>
                    <el-option label="宠物种类" value="goodsOnlyFor"></el-option>
                </el-select>
                <el-button @click="getGoods" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <el-dialog width=1000px className="getDialog" title="商品信息" :visible.sync="dialogFormVisible">
            <el-form className="getDialog" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item class="inputWidth" label="名称" prop="name">
                    <el-input v-model="ruleForm.goodsName"></el-input>
                </el-form-item>
                <el-form-item class="inputWidth" label="品类">
                    <el-input v-model="ruleForm.goodsType" placeholder="请输入品类"></el-input>
                </el-form-item>
                <el-form-item class="inputWidth" label="适用规格">
                    <el-input v-model="ruleForm.goodsCanFor" placeholder="请输入适用规格"></el-input>
                </el-form-item>
                <el-form-item class="inputWidth" label="专属规格">
                    <el-input v-model="ruleForm.goodsOnlyFor" placeholder="请输入专属规格" prop="goodsCanFor"></el-input>
                </el-form-item>
                <el-form-item inline label="产地" prop="goodsRegion">
                    <el-select v-model="ruleForm.goodsRegion" placeholder="请选择产地">
                        <el-option label="中国" value="中国"></el-option>
                        <el-option label="美国" value="美国"></el-option>
                        <el-option label="欧洲" value="欧洲"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="inputWidth" label="保质期" prop="goodsTime">
                    <el-input-number v-model="ruleForm.goodsTime" controls-position="right" :min="1" :max="100"></el-input-number>
                     个月
                </el-form-item>
                <el-form-item label="包装规格">
                    <el-input class="inputWidth" v-model="ruleForm.goodsSize" placeholder="请输入包装规格"></el-input>
                </el-form-item>

                <el-form-item label="口味">
                    <el-input v-model="ruleForm.goodsTaste" placeholder="请输入品类"></el-input>
                </el-form-item>
                <el-form-item class="inputWidth" label="特殊公用" prop="goodsSpecial">
                    <el-input v-model="ruleForm.goodsSpecial"></el-input>
                </el-form-item>
                <el-form-item label="出产日期" required>
                    <el-col :span="6">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.goodsDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item class="inputWidth" label="价格" prop="goodsPrice">
                    <el-input v-model="ruleForm.goodsPrice"></el-input>
                </el-form-item>

                <el-form-item label="特色说明" prop="goodsIntro">
                    <el-input type="textarea" v-model="ruleForm.goodsIntro"></el-input>
                </el-form-item>
                <el-form-item label="上传图片" prop="">
                    <!-- <el-input type="textarea" v-model="ruleForm.goodsIntro"></el-input> -->
                    <addPhoto @getPhotoPath="getPhotoPath" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="btnState==0" type="primary" @click="addData">确 定</el-button>
                <el-button v-else type="primary" @click="putData">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddGoods",
  props: {
    val: {
      default: ""
    },
    ids: {
      default: []
    },
    curpage: {
      default: Number
    },
    eachpage: {
      default: Number
    }
  },

  methods: {
    ...mapActions("goods", [
      "asyncGetGoods",
      "asyncAddGoods",
      "asyncPutGoods",
      "asyncDeleteGoods"
    ]),
    //确定增加数据
    addData() {
      this.asyncAddGoods(this.ruleForm);
      this.dialogFormVisible = false;
    },
    //确定修改数据
    putData() {
      console.log(this.ruleForm._id);
      this.asyncPutGoods(this.ruleForm);
      this.dialogFormVisible = false;
    },
    //增加按钮和修改按钮
    getAddBtn() {
      this.btnState = 0;
      this.dialogFormVisible = true;
    },
    getPutBtn() {
      this.btnState = 1;
      if (this.val === "") {
        this.$message("请选择一条需要修改的信息");
        return;
      } else {
        this.ruleForm = this.val;
        this.dialogFormVisible = true;
      }
    },
    getDeleBtn() {
      this.deleteState = 1;
      this.$emit("getDeleteState", this.deleteState);
    },
    //删除所选项
    deleteSelected() {
      console.log(this.ids);
      if (this.ids.length === 0) {
        this.deleteState = 0;
      } else {
        this.asyncDeleteGoods(this.ids);
        this.deleteState = 0;
      }
      this.$emit("getDeleteState", this.deleteState);
      this.asyncGetGoods({ curpage: this.curpage, eachpage: this.eachpage });
    },
    getGoods() {
      this.asyncGetGoods({
        curpage: 1,
        eachpage: this.eachpage,
        select: this.select,
        type: this.input
      });
    },
    getPhotoPath(arr){
        console.log(arr);
        this.ruleForm.goodsImg = arr;
    }
  },
  data() {
    return {
      input: "",
      select: "",
      //删除按钮状态
      deleteState: 0,
      //按钮名字
      addBtn: "增加",
      putBtn: "修改",
      //按钮状态判断dialog确定按钮组件选择
      btnState: 0,
      //dialog显示状态
      dialogTableVisible: false,
      dialogFormVisible: false,
      //表单
      ruleForm: {
        goodsName: "",
        goodsType: "",
        goodsCanFor: "",
        goodsOnlyFor: "",
        goodsDate: "",
        type: "",
        goodsSize: "",
        goodsTaste: "",
        goodsRegion: "",
        goodsTime: "",
        goodsIntro: "",
        goodsSpecial: "",
        goodsImg:[],
        _id: ""
      },
      //表单规则
      rules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        goodsTime: [
          { required: true, message: "请输入保质期", trigger: "blur" },
        ],
        goodsCanFor: [
          { required: true, message: "请选类别", trigger: "change" }
        ],
        goodsRegion: [
          { required: true, message: "请选择产地", trigger: "change" }
        ],
        goodsPrice: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { min: 3, max: 5, message: "输入数字", trigger: "blur" }
        ],
        date1: [
          {
            type: "date",
            required: false,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        goodsIntro: [
          { required: true, message: "请填写特色说明", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inputWidth {
  width: 320px;
}
.marginLeft {
  margin-left: 12px;
}

.el-select .el-input {
  width: 300px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
