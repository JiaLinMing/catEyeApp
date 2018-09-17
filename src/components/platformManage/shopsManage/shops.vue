<template>
    <div>
        <el-table router
        :data="rows"
        border
        @row-click="update"
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
            <el-button type="primary" size="small" icon="el-icon-edit" @click="dialogFormVisible = true">编辑状态</el-button>
        </template>
        </el-table-column>
    </el-table>
    <!-- 状态更改对话框 -->
    <el-dialog title="编辑门店状态" :visible.sync="dialogFormVisible" style="width:1200px">
  <el-form :model="form">
    <el-form-item label="状态" :label-width="formLabelWidth">
      <el-select v-model="form.state" placeholder="请选择">
        <el-option label="未审核" value="未审核"></el-option>
        <el-option label="待审核" value="待审核"></el-option>
        <el-option label="已审核" value="已审核"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateBtn();dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
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
  data(){
    return {
      dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          _id: '',
          state: '',
        },
        row:'',
        formLabelWidth: '200px'
    }
  },
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
    update(row, event, column) {
      //修改,显示信息数据
      console.log(row.state);
      // this.form=row;
      Object.assign(this.form,row)
      // console.log(row._id);
    },
    updateBtn(){//确定修改
      let state=this.form.state;
      let id=this.form._id;
      let row={state,id};
      this.UpdateShopById(row);
      this.asyncGetShopByPage();
    },
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
    ...mapActions("shops", ["asyncGetShopByPage","UpdateShopById"]),
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


