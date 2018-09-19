<template>
    <div>
        <!-- 增加Dialog表格 -->
        <!-- <AddGoods v-if="this.clickState!=1" :val="currentSelected" :ids="ids" :curpage="curpage" :eachpage="eachpage" @getDeleteState="getDeleteState" /> -->
        <addGoodsForShop @getDeleteState="getDeleteState" :shopId="shopId" :deleteIds="deleteIds" />
        <el-table ref="multipleTable" :data="goodsData.rows" tooltip-effect="dark" show-overflow-tooltip style="width: 100%" @selection-change="handleSelectionChange" highlight-current-row @current-change="tableHandleCurrentChange">
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="goodsData.curpage" :page-sizes="[5, 10, 15, 20]" :page-size="goodsData.eachpage" layout="total, sizes, prev, pager, next, jumper" :total="goodsData.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations,mapGetters } from "vuex";
export default {
  name: "GoodsForShop",
  props: {
    clickState: {
      default: 0
    },
    shopId: {
      //被选中的门店Id
      default: ""
    }
  },
  data() {
    return {
      currentSelected: "",
      deleteIds: [], //待删除的id
      goodsForShopId: [], //门店对应商品的Id
      deleteState: 0,
      state: {
        curpage: 1, //当前页码
        eachpage: 5, //每页显示数
        maxpage: 0, //总页码
        total: 0, //总数
        rows: [] //分页查询
      }
      //   curpage: Number,
      //   eachpage: Number
    };
  },
  mounted() {
    this.asyncGetGoods();
  },
  computed:{
          ...mapState("shop",["goodsData"]),
  },
  methods: {
    ...mapActions("shop", ["asyncGetGoods"]),
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
      console.log(val);
      if (this.deleteState === 1) {
        this.deleteIds = val.map(item => item._id); //要删除的id
      } else if (this.clickState === 1) {
        //在门店中要添加的商品id
        this.goodsForShopId = val.map(item => item._id);
        // this.$emit("getAddIdForShop", this.goodsForShopId);
      }
    },
    getAddIdForShop() {//获取商品Id
      this.$emit("getAddIdForShop", this.goodsForShopId);
    },
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
