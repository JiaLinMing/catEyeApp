<template>
    <div>
        <!-- <div style="margin-top: 20px">
            <el-button>取消选择</el-button>
            <el-button @click="dialogFormVisible = true">增加</el-button>
        </div> -->
        <!-- 增加Dialog表格 -->
        <addGoods v-if="this.clickState!=1" :val="currentSelected" :ids="ids" :curpage="curpage" :eachpage="eachpage" @getDeleteState="getDeleteState" />
        <el-table ref="multipleTable" :data="rows" tooltip-effect="dark" show-overflow-tooltip style="width: 100%" @selection-change="handleSelectionChange" highlight-current-row @current-change="tableHandleCurrentChange">
            <el-table-column v-if="deleteState===1" type="selection" width="55">
            </el-table-column>
            <el-table-column v-else-if="this.clickState===1" type="selection" width="55">
            </el-table-column>
            <el-table-column label="名称" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsName }}
                </template>
            </el-table-column>
            <el-table-column label="品类" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsType }}
                </template>
            </el-table-column>
            <el-table-column label="适用规格" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsCanFor }}
                </template>
            </el-table-column>
            <el-table-column label="专属规格" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsOnlyFor }}
                </template>
            </el-table-column>
            <el-table-column label="包装规格" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsSize }}
                </template>
            </el-table-column>
            <el-table-column label="口味" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsTaste }}
                </template>
            </el-table-column>
            <el-table-column label="特殊功用" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsSpecial }}
                </template>
            </el-table-column>
            <el-table-column label="产地" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsRegion }}
                </template>
            </el-table-column>
            <el-table-column label="出产日期" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsDate }}
                </template>
            </el-table-column>
            <el-table-column label="保质期" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsTime }}
                </template>
            </el-table-column>
            <el-table-column label="特色说明" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsIntro }}
                </template>
            </el-table-column>
            <el-table-column label="价格" width="120">
                <template slot-scope="scope">
                    {{ scope.row.goodsPrice }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="图片" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curpage" :page-sizes="[5, 10, 15, 20]" :page-size="eachpage" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "Goods",
  props: {
    clickState: {
      default: 0
    }
  },
  data() {
    return {
      currentSelected: "",
      ids: [],//待删除的id
      goodsForShopId:[],
      deleteState: 0
      //   curpage: Number,
      //   eachpage: Number
    };
  },
  mounted() {
    this.asyncGetGoods();
  },
  computed: {
    ...mapState("goods", ["curpage", "eachpage", "maxpage", "total", "rows"])
  },
  methods: {
    ...mapActions("goods", ["asyncGetGoods"]),
    //按删除按钮改变删除转态值
    getDeleteState(state) {
      this.deleteState = state;
    },
    tableHandleCurrentChange(val) {
      //获取单选数据
      this.currentSelected = val;
    },
    handleSizeChange(val) {
      //每页显示
      this.asyncGetGoods({ eachpage: val });
    },
    handleCurrentChange(val) {
      //当页显示
      this.asyncGetGoods({ curpage: val });
    },
    handleSelectionChange(val) {
      //将方法交给子组件调用
      console.log("val", val);
      if (this.deleteState === 1) {
        this.ids = val.map(item => item._id);//要删除的id
      }
      else if(this.clickState === 1){//在门店中要添加的商品id
        this.goodsForShopId = val.map(item => item._id);
        this.$emit("getAddIdForShop", this.goodsForShopId);
      }
    },
    // getAddIdForShop(){
    //     this.$emit("getAddIdForShop", this.goodsForShopId);
        
    // },
    toggleSelection(rows) {
      // if (rows) {
      //   rows.forEach(row => {
      //     this.$refs.multipleTable.toggleRowSelection(row);
      //   });
      // } else {
      //   this.$refs.multipleTable.clearSelection();
      // }
      console.log("rows", rows);
    },
    firstPage() {
      this.asyncGetGoods({ curpage: 1 });
    },
    lastPage() {
      this.asyncGetGoods({ curpage: this.maxpage });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
