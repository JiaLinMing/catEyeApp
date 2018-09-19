<template>
    <div>
        <addShop />
        <el-table :data="rows" style="width: 100%">
            <el-table-column fixed prop="shopName" label="店名" width="150">
            </el-table-column>
            <el-table-column prop="shopLicenceNum" label="营业执照号码" width="150">
            </el-table-column>
            <el-table-column prop="shopImg" label="头像" width="150">
            </el-table-column>
            <el-table-column prop="shopAdd" label="营业地址" width="150">
            </el-table-column>
            <el-table-column prop="shopCorporate" label="法人" width="150">
            </el-table-column>
            <el-table-column prop="shopTel" label="联系电话" width="150">
            </el-table-column>
            <el-table-column label="商品" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row,scope.state = 1)" type="text">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="服务" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row,scope.state = 0)" type="text">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="state" label="审核状态" width="150">
            </el-table-column>
        </el-table>

        <el-dialog title="详情" :visible.sync="dialogVisible" width="800px">
            <ServiceForShop v-if="typeState===0"  />
            <GoodsForShop v-else />
            <span slot="footer" class="dialog-footer">
                <el-button @click='dialogVisible = false'>取 消</el-button>
                <el-button type="primary" @click="open()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "Shop",
  mounted() {
    this.async_getShopByPage();
  },
  data() {
    return {
      dialogVisible: false,
      selected: [],
      typeState:0//判断查看类型
    };
  },
  computed: {
    ...mapState("shop", ["curpage", "eachpage", "maxpage", "total", "rows","userId","shopId"])

  },
  methods: {
    ...mapActions("shop", ["async_getShopByPage"]),
    ...mapMutations("shop", ["setEachPage", "setCurPage","setShopId"]),
    handleSizeChange(val) {
      this.setEachPage(val);
      this.async_getServByPage();
    },
    handleCurrentChange(val) {
      this.setCurPage(val);
      this.async_getServByPage();
    },
    handleClick(row,state) {
        console.log(state);
        this.typeState = state;
      this.setShopId(row._id)
      this.dialogVisible = true;
    },
    open(){
        this.dialogVisible = false;
        //打开对话框应重新请求
    }
  }
};
</script>
