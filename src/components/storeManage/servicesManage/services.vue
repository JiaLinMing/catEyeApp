<template>
    <div>
        <el-row style="display:flex">
            <ServiceForm :selected="selectedServ" />
            <el-button type="primary" @click="deleteServices" icon="el-icon-remove-outline" style="margin-left:10px">删除</el-button>
            <el-input style="width:200px;margin-left:10px" placeholder="请输入搜索内容" prefix-icon="el-icon-search" clearable>
            </el-input>
        </el-row>

        <el-table ref="multipleTable" :data="rows" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curpage" :page-sizes="[10, 15, 20, 25]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "services",
  mounted() {
    this.async_getServByPage();
  },
  data() {
    return {
      selectedServ:[]
    };
  },
  computed: {
    ...mapState("services", ["curpage", "eachpage", "maxpage", "total", "rows"])
  },
  methods: {
    ...mapActions("services", ["async_getServByPage","async_deleteServ"]),
    handleSelectionChange(val) {
      //val为被选中的信息[]
      this.multipleSelection = val;
      this.selectedServ = val;
    },
    handleSizeChange(val) {
      this.setEachPage(val);
      this.async_getServByPage();
    },
    handleCurrentChange(val) {
      this.setCurPage(val);
      this.async_getServByPage();
    },
    deleteServices() {
      if (this.selectedServ.length === 0) {
        this.$alert("请选择需要删除的服务！", "警告", {
          confirmButtonText: "确定"
        })
      }else{
          let ids = this.selectedServ.map(item => item._id);
        //   console.log("ids",ids);
            this.async_deleteServ(ids);
            this.async_getServByPage();
      }
    }
  }
};
</script>

<style>
</style>
