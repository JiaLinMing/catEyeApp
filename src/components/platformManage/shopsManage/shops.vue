<template>
    <div>
        <el-table router
        :data="rows"
        border
        style="width: 100%">
        <el-table-column
        fixed
        prop="shopName"
        label="门店名称">
        </el-table-column>
        <el-table-column
        prop="shopLicenceNum"
        label="营业执照号码">
        </el-table-column>
        <el-table-column
        prop="shopCorporate"
        label="法人">
        </el-table-column>
        <el-table-column
        prop="shopAdd"
        label="营业地址">
        </el-table-column>
        <el-table-column
        prop="shopTel"
        label="联系电话">
        </el-table-column>
        <el-table-column
        prop="state"
        label="状态">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="rows">
            <el-button type="primary" size="small">编辑状态</el-button>
        </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curpage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "shops",
  created() {
    this.asyncGetShopByPage();
  },
  computed: {
    ...mapState("shops", ["curpage", "eachpage", "maxpage", "total", "rows"]) //通过路由，映射数据
  },
  watch: {
    //监听的数据发生变化而变化
    curpage() {
      //监听当前页curpage的变化
      this.asyncGetShopByPage(); //请求数据库，更新数据
    },
    eachpage() {
      //监听每页显示数eachpage的变化
      this.asyncGetShopByPage();
    }
  },
  methods: {
    handleSizeChange: function(val) {
      //每页条数
      // console.log(`每页 ${val} 条`);
      this.setEachPage(val);
    },
    handleCurrentChange: _.debounce(function(val) {
      //当前页
      // console.log(`当前页: ${val}`);
      this.setCurPage(val);
    }, 500), //_.debounce通过lodash的方法来设置使用频率，防止在未执行完上一次watch的时候，又重复执行watch
    ...mapMutations("shops", ["setCurPage", "setEachPage"]),
    ...mapActions("shops", ["asyncGetShopByPage", "RemoveMemberById"]),
    firstPage() {
      this.asyncGetShopByPage({ curpage: 1 });
    },
    nextPage() {
      this.asyncGetShopByPage({ curpage: this.curpage + 1 });
    },
    prevPage() {
      this.asyncGetShopByPage({ curpage: this.curpage - 1 });
    },
    lastPage() {
      this.asyncGetShopByPage({ curpage: this.maxpage });
    }
  }
};
</script>


