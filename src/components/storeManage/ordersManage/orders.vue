<template>
<div>
  <div style="margin:10px 0 0 10px">
 <el-button type="info" @click="changeOrder()" icon="el-icon-edit ">修改订单</el-button>
 <editOrder @editDialogunShow="editDialogunShow" :dialogVisible="orderDialog" :radioVal="radioVal"/>
 <el-input size="medium" v-model="input" style="width:500px;margin-left:20px;" placeholder="请输入内容" class="input-with-select">
    <el-select  v-model="select" slot="prepend" placeholder="请选择搜索类型">
      <el-option label="订单编号" value="_id"></el-option>
      <el-option label="收货人手机号" value="phone"></el-option>
      <el-option label="订单状态" value="state"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
  </el-input>
  </div>
  <el-table
    :data="searchOrders"
    @filter-change="filterChange"
    style="width: 100%"
    ref="multipleTable">
    <el-table-column label="" width="32">
        <template slot-scope="scope">
                <!-- label可以使用tableData中的某个字段，注意该字段的值不要重复 -->
            <el-radio v-model="radioVal" :label="scope.row">&thinsp;</el-radio>
        </template>
    </el-table-column>
    <el-table-column
      prop="_id"
      label="订单编号"
      width="230">
    </el-table-column>
    <el-table-column
      prop="customer"
      label="收货人">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="收货人手机号">
    </el-table-column>
    <el-table-column
      prop="addr"
      label="收货地址"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="shop"
      label="店铺名">
    </el-table-column>
    <el-table-column
      prop="type"
      label="服务类型">
    </el-table-column>
    <el-table-column
      prop="state"
      label="订单状态"
      column-key="state "
      :filters="[
      { text: '已完成', value: '1' },
       {text:'未完成',value:'0'},
       {text:'未支付',value:'-1'}]"
      :filter-method="filterTag"
      :filter-multiple="false"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.state == '-1' ? 'danger' : (scope.row.state==0 ? 'warning' : 'success')"
          disable-transitions>{{scope.row.state==-1 ? '未支付':(scope.row.state==0?'未完成':'已完成')}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
          <el-pagination
      @size-change="handleEachChange"
      @current-change="handleCurChange"
      :current-page="curpage"
      :page-sizes="[10,5, 15, 20, 25]"
      :page-size="eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  name: "orders",
  data() {
    return {
      input: "",
      select: "_id",
      radioVal: {},
      orderDialog: false
    };
  },
  computed: {
    ...mapState("orders", ["curpage", "eachpage", "maxpage", "total"]),
    ...mapGetters("orders", ["searchOrders"])
  },
  watch: {
    curpage() {
      this.asyncGetOrdersByPage();
    },
    eachpage() {
      this.asyncGetOrdersByPage();
    }
  },
  methods: {
    filterChange(filters) {
      console.log(filters);
    },
    editDialogunShow() {
      this.orderDialog = false;
    },
    //修改订单
    changeOrder() {
      console.log(this.radioVal);
      if (Object.keys(this.radioVal).length == 0) {
        this.$alert("请选择一条数据进行修改", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            return;
          }
        });
      } else {
        this.orderDialog = true;
      }
    },
    //搜索
    search() {
      let type = this.select;
      let input = this.input;
      let obj = { type, input };
      this.setType(obj);
      this.input = "";
    },
    getTemplateRow(index, row) {
      //获取选中数据
      this.templateSelection = row;
    },
    formatter(row, column) {
      return row.addr;
    },
    filterTag(value, row) {
      return row.state === value;
    },
    handleEachChange: function(val) {
      this.setEachPage(val);
    },
    handleCurChange(val) {
      this.setCurPage(val);
    },
    ...mapActions("orders", ["asyncGetOrdersByPage"]),
    ...mapMutations("orders", ["setEachPage", "setCurPage", "setType"])
  }
};
</script>