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
          <el-form-item label="">
            <div class="block">
              <span class="demonstration">选择时间：</span>
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    <el-table
      ref="multipleTable"
      :data="getData"
      tooltip-effect="dark"
      style="width: 100%"
      >
      <el-table-column prop="id" label="房号" >F01</el-table-column>
      <el-table-column prop="name" label="业主姓名"> </el-table-column>
      <el-table-column label="原金额" >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="充值金额">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="现有金额" >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="缴费订单号">
        <template >1</template>
      </el-table-column>
      <el-table-column label="缴费时间" >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template>支付宝</template>
      </el-table-column>
      <el-table-column prop="state" label="状态"> </el-table-column>
      <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-search" size="mini" class="btn-show" @click="show(scope.$index)"></el-button>
              <el-button type="info" icon="el-icon-edit-outline" size="mini" class="btn-alter" @click="alter(scope.$index)"></el-button>
              <el-button type="danger" slot="reference" icon="el-icon-delete" size="mini" class="btn-del" @click="del(scope.$index)"></el-button>
            </template>
          </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next"   :page-size="5"
        :total="10"
        :pager-count="5"
        :hide-on-single-page="true"
        @current-change="changePage"
        class="page">
    </el-pagination>
  </div>
  </div>
</template>
<script>
    var  tableData = [
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        }
    ];
export default {
  data() {
    return {
      currentPage: 1,
      formInline: {
        user: "",
        region: ""
      },
      loading: false,
      tableData:[]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
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
    changePage(val) {
      this.currentPage = val;
    },
  },
  created() {
    this.tableData = tableData;
  },
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
#mynote{
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
    .back-btn{
      padding: 5px;
    }
  }
}
.el-form{
  padding: 15px 20px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.btn{
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
.el-button--mini, .el-button--mini.is-round{
  padding: 3px;
}
</style>
