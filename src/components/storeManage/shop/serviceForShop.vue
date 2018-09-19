<template>
    <div>
        <el-row>
            <!-- <ServiceForm :selected="selectedServ" /> -->
            <el-button @click='innerVisible = true' type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
            <el-button @click='deleteServices' type="primary" icon="el-icon-remove-outline" style="margin-left:10px">删除</el-button>
        </el-row>
        <!-- 第三层，添加服务时显示该门店管理员ID下所有服务 -->
        <el-dialog title="门店服务信息" :visible.sync="innerVisible" append-to-body width="800px">
            <Services :option='shop' v-on:getSelect="getSelect" />
            <span slot="footer" class="dialog-footer">
                <el-button @click='innerVisible = false'>取 消</el-button>
                <el-button type="primary" @click="addServices">确认添加</el-button>
            </span>
        </el-dialog>

        <el-table ref="multipleTable" :data="serviceData.rows" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="serviceType" label="服务类型" width="120">
            </el-table-column>
            <el-table-column prop="serviceName" label="服务名称" width="120">
            </el-table-column>
            <el-table-column prop="serviceLevel" label="级别" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="servicePrice" label="价格" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="serviceDetial" label="详情" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="serviceTime" label="耗时" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="serviceSchedule" label="排期" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="serviceCanFor" label="适用规格" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="serviceData.curpage" :page-sizes="[5, 10, 20, 25]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="serviceData.total">
        </el-pagination>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "ServiceForShop",
  mounted() {
    this.async_getServByPage();
  },
  data() {
    return {
      shop: "shop",
      innerVisible: false,
      selectedServ: []
    };
  },
  computed: { ...mapState("shop", ["serviceData"]) },
  methods: {
    ...mapActions("shop", ["async_getServByPage", "async_deleteServ","async_addServ"]),
    handleSelectionChange(val) {
      //val为被选中的信息[]
      this.multipleSelection = val;
      this.selectedServ = val;
    },
    handleSizeChange(val) {
      this.async_getServByPage({ page: this.serviceData.curpage, rows: val });
      //   this.pageData = this.serviceData;
    },
    handleCurrentChange(val) {
    //   this.pageData.curpage = val;
      this.async_getServByPage({ page: val, rows: this.serviceData.eachpage });
      //   this.pageData = this.serviceData;
    },
    getSelect(data) {
        //获取子组件传过来的被选中的ids[]
      this.selectedServ = data;
    },
    deleteServices() {
      if (this.selectedServ.length === 0) {
        this.$alert("请选择需要删除的服务！", "警告", {
          confirmButtonText: "确定"
        });
      } else {
        let ids = this.selectedServ.map(item => item._id);
        //   console.log("ids",ids);
        this.async_deleteServ(ids);
        this.async_getServByPage();
        // this.pageData = this.serviceData;
      }
    },
    addServices() {
      if (this.selectedServ.length === 0) {
        this.$alert("请选择需要添加的服务！", "警告", {
          confirmButtonText: "确定"
        });
      } else {
        let ids = this.selectedServ.map(item => item._id);
        //   console.log("ids",ids);
        this.async_addServ({ ids });
        this.async_getServByPage();
        this.innerVisible = false;
        // this.pageData = this.serviceData;
      }
    }
  }
};
</script>

