<template>
  <div id="mynote">
    <div class="content">
      <div class="title">
        <i class="el-icon-s-order"></i>
        <span>气费</span>
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-col :span="10">
          <el-form-item label="业主姓名:">
            <el-input v-model="formInline.user" placeholder="业主姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label>
            <div class="block">
              <span class="demonstration">选择时间：</span>
              <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="inhabitantAndHousePropertyVO.housePropertyNo" label="房号"></el-table-column>
        <el-table-column prop="inhabitantAndHousePropertyVO.inhabitant.inhabitantName" label="业主姓名"></el-table-column>
        <el-table-column prop="payMoney" label="剩余金额"></el-table-column>
        <el-table-column prop="payOrder" label="缴费订单号"></el-table-column>
        <el-table-column prop="payDate" label="缴费时间"></el-table-column>
        <el-table-column label="支付方式">
          <template>支付宝</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                class="btn-show"
                @click="gotomoneydetail(scope.$index)"
              ></el-button>
            </el-tooltip>
            <el-button
              type="danger"
              slot="reference"
              icon="el-icon-delete"
              size="mini"
              class="btn-del"
              @click="handleDelete(scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="1"
        :total="2"
        :pager-count="5"
        :hide-on-single-page="true"
        @current-change="changePage"
        class="page"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      formInline: {
        user: "",
        region: ""
      },
      loading: false,
      tableData: [],
      value1: '',
      value2: ''
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    show(index) {
      index = 5 * (this.currentPage - 1) + index;
      console.log("查看", index);
    },
    alter(index) {
      index = 5 * (this.currentPage - 1) + index;
      console.log("修改", index);
    },
    del(index) {
      index = 5 * (this.currentPage - 1) + index;
      console.log("删除", index);
    },
    gotomoneydetail(index) {
      this.$router.push({
        path: "/home/moneydetail?id=" + this.tableData[index].payOrder
      });
      console.log("跳转", this.tableData[index].payOrder);
    },
    changePage(val) {
      this.currentPage = val;
      this.axios
      .post("/pay/leibie", {      
          payProject: "气费",
          currentPage:val,
      })
      .then(res => {
        this.tableData = res.data.data.Pays;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
      
    },
    handleDelete(index) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.axios
            .post("/pay/delorder", {
                payOrder: this.tableData[index].payOrder
            })
            .then(res => {
              console.log("删除成功", res);
              this.axios
                .post("/pay/leibie", {
                  payProject: "气费"
                })
                .then(res => {
                  //  res.data = tableData;
                  this.tableData = res.data.data.Pays;
                  this.loading = false;
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onSubmit() {
      var t = this.value2;
      console.log(this.formInline.user)
        var startTime1 = t[0].getFullYear()+ "-" + (t[0].getMonth()+1) + "-" +t[0].getDate();
        var endTime1 = t[1].getFullYear()+ "-" + (t[1].getMonth()+1) + "-" +t[1].getDate();
        console.log("开始时间:",startTime1);
        console.log("结束时间:",endTime1);
      this.axios
      .get("/pay/leibie", {
          starttime:startTime1,
          endtime:endTime1,
          userName:this.formInline.user
      })
      .then(res => {
        this.tableData = res.data.data.Pays;
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  created() {
    this.axios
      .post("/pay/leibie", {      
          payProject: "气费",
          currentPage:this.currentPage,
      })
      .then(res => {
        this.tableData = res.data.data.Pays;
      })
      .catch(err => {
        console.log(err);
      });
  }, 
  /* this.axios
      .post("/pay/jiemian", {

          inhabitantId:1,
          payUnitId:4,
        
      })
      .then(res => {
        this.tableData = res.data.data.Pays;
        console.log("第一个数据", res.data);
        console.log(res.data.data);
        console.log(this.tableData);
      })
      .catch(err => {
        console.log(err);
      });
  }, */
  computed: {
    getData() {
      var start = 5 * (this.currentPage - 1);
      return this.tableData.slice(start, start + 5);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";
#mynote {
  color: @fontColor;
  background-color: #f3f3f4;
  padding: 20px 10px;
  min-height: 500px;
  .content {
    background: white;
  }
}
.title {
  padding: 15px 20px;
  border-top: 3px solid #e7eaec;
  border-bottom: 1px solid #e7eaec;
  i {
    margin-right: 2px;
  }
  .back {
    float: right;
    .back-btn {
      padding: 5px;
    }
  }
}
.el-form {
  padding: 15px 20px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.btn {
  height: 40px;
}
.btn > div {
  float: right;
  margin-right: 30px;
  color: white;
  .btn-add {
    background: @greenColor;
    color: white;
    &:hover {
      background: @darkGreenColor;
    }
  }
  .btn-search {
    background: @blueColor;
    color: white;
    &:hover {
      background: @darkBlueColor;
    }
  }
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px;
}
</style>
