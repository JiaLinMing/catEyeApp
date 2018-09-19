<template>
  <div>
    <div>
      <el-button type="primary" @click="dialogClick">增加商品</el-button>
      <el-button v-if="deleteState==0" @click="getDeleBtn">删除</el-button>
      <el-button v-else @click="deleteSelected">确认删除</el-button>
    </div>
    <el-dialog width='80%' title="收货地址" :visible.sync="dialogTableVisible" append-to-body>
      <Goods :clickState="clickState" @getAddIdForShop="getAddIdForShop" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "AddGoodsForShop",
  props: {
    msg: String,
    shopId: {
      //被选中的门店Id
      default: ""
    },
    deleteIds:{
      default:[]
    }
  },
  data() {
    return {
      dialogTableVisible: false, //对话框状态
      clickState: 0, //用于Goods组件中使用哪个按钮组件的判断状态值
      ids: [],
      deleteState: 0 //删除按钮状态
    };
  },
  methods: {
    ...mapActions("shop", ["asyncAddGoods","asyncDeleteGoods"]),

    getDeleBtn() {
      this.deleteState = 1;
      this.$emit("getDeleteState", this.deleteState);
    },
    //删除所选项
    deleteSelected() {
      console.log(this.deleteIds);
      if (this.deleteIds.length === 0) {
        this.deleteState = 0;
      } else {
        this.asyncDeleteGoods(this.deleteIds);
        this.deleteState = 0;
      }
      this.$emit("getDeleteState", this.deleteState);
    },
    dialogClick() {
      //改回状态
      this.dialogTableVisible = true;
      this.clickState = 1;
    },
    dialogConfirm() {
      //dialog确认按钮
      this.dialogTableVisible = false;
      this.asyncAddGoods(this.ids);
      this.clickState = 0;
    },
    dialogCancel() {
      //dialog取消按钮
      this.dialogTableVisible = false;
      this.clickState = 0;
    },
    getAddIdForShop(ids) {
      //获取多选选中的商品ID
      console.log(ids);
      this.ids = ids;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

