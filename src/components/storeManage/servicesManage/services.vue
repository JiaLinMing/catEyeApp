<template>
  <div>
    <el-row style="display:flex;margin:10px 0 0 10px" v-if="option!='shop'">
      <serviceForm :selected="selectedServ" />
      <el-button type="info" @click="deleteServices" icon="el-icon-remove-outline" style="margin-left:10px">删除</el-button>
      <div style="margin-left:10px">
        <el-input placeholder="请输入内容" v-model="text" class="input-with-select">
          <el-select v-model="type" slot="prepend" placeholder="请选择">
            <el-option label="类型" value="serviceType"></el-option>
            <el-option label="名称" value="serviceName"></el-option>
            <el-option label="价格" value="servicePrice"></el-option>
          </el-select>
          <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
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
      <el-table-column prop="serviceDetail" label="详情" show-overflow-tooltip>
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
    <span v-if="option ==='shop'" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ensureAdd" style="margin-top:15px">选择完毕</el-button>
    </span>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "services",
  mounted() {
    this.async_getServByPage();
  },
  props: ["option"],
  data() {
    return {
      innerVisible : true,
      selectedServ: [],
      text: "",
      type: ""
    };
  },
  computed: {
    ...mapState("services", ["curpage", "eachpage", "maxpage", "total", "rows"])
  },
  methods: {
    ...mapActions("services", ["async_getServByPage", "async_deleteServ"]),
    ...mapMutations("services", ["setEachPage", "setCurPage"]),
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
        });
      } else {
        let ids = this.selectedServ.map(item => item._id);
        //   console.log("ids",ids);
        this.async_deleteServ(ids);
        this.async_getServByPage();
      }
    },
    search() {
      this.async_getServByPage({
        curpage: 1,
        eachpage: this.eachpage,
        type: this.type,
        text: this.text
      });
      this.type = "";
      this.text = "";
    },
    ensureAdd(){
      if (this.option === "shop") {
        console.log(this.selectedServ);
        let ids = this.selectedServ.map(item=>item._id);
        console.log(ids);
        this.$emit("getSelect", ids);
      }
    }
  }
};
</script>

<style>
.el-select {
  width: 100px;
}
.input-with-select {
  width: 200px;
}
</style>
