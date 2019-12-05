<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>报修订单列表</p>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="searchBox">
        <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
          <el-form-item label="交易号">
            <el-input v-model="search.orderNo" placeholder="请输入交易号"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="search.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="登记时间">
            <el-date-picker v-model="search.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <div>
          <el-button icon="el-icon-tickets" class="btn-daochu" @click="exportBnt">导出</el-button>
          <el-button icon="el-icon-search" class="btn-search" @click="searchBtn">查询</el-button>
        </div>
      </div>
      <div class="totalMoney">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="TMtitle">订单总额：</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="TMmoney">￥{{this.totalMoney}}.00</div></el-col>
        </el-row>
      </div>
      <div class="contentBox">
        <el-table :data="tableData" stripe border v-loading="loading" style="width: 100%">
          <el-table-column prop="orderNo" label="交易号"></el-table-column>
          <el-table-column prop="repairsInfo.inhabitant.inhabitantName" label="用户姓名" ></el-table-column>
          <el-table-column prop="repairsInfo.repairContent" label="报修内容" ></el-table-column>
          <el-table-column prop="payDate" label="订单创建时间" ></el-table-column>
          <el-table-column prop="orderMoney" label="支付金额" ></el-table-column>
          <el-table-column prop="orderStatus" label="支付状态" >已完成</el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="prev, pager, next"
          :total="totalCount"
          :current-page="currentPage"
          :pager-count="5"
          background>
      </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentPage:1,
      totalCount:0,
      loading:true,
      tableData: [],
      totalMoney:"",
      search: {//记录筛选的数据项
        orderNo: "",
        userName:"",
        time: ""
      },
        value: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
    };
  },
  methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val;

        this.axios
          .get("/repairOrder/getAllOrders",
          {
            params: {
              pageSize:5,
              currentPage: this.currentPage
            }
          })
          .then((res)=> {
            console.log(res.data.data);
            console.log(res.data.data.totalMoney);
            this.totalMoney = res.data.data.totalMoney;
            this.totalCount = res.data.data.totalCount;
            this.tableData = res.data.data.data;
            this.loading= false;
          })
          .catch((err)=> {
            console.log(err);
          })
      },
      searchBtn() { // 查询
        if(this.search.time) {
          // 时间格式
          var t = this.search.time;
          console.log(t);
          var startTime1 = t[0].getFullYear()+ "-" + (t[0].getMonth()+1) + "-" +t[0].getDate();
          var endTime1 = t[1].getFullYear()+ "-" + (t[1].getMonth()+1) + "-" +t[1].getDate();
          console.log("开始时间:",startTime1);
          console.log("结束时间:",endTime1);
        }
        console.log("订单编号:",this.search.orderNo);
        console.log("用户名:",this.search.userName);
        console.log("每页:",5);
        console.log("页数:",this.currentPage);
        // 请求数据
        this.axios
          .get("/repairOrder/getAllOrdersByParam",
          {
            params: {
              orderNo: this.search.orderNo,
              inhabitantName: this.search.userName,
              beginTime:startTime1,
              endTime:endTime1,
              pageSize:5,
              currentPage:this.currentPage
            }
          })
          .then((res) => {
            console.log(res.data.data);
            this.totalMoney = res.data.data.totalMoney;
            this.totalCount = res.data.data.totalCount;
            this.tableData = res.data.data.data;
          })
          .catch((err) => {
            console.log(err);
          })
      },
      exportBnt() { // 导出
        this.axios
          .get("/repairOrder/exportOrder")
          .then((res)=> {
            console.log(res);
          })
          .catch((err)=> {
            console.log(err);
          })
      }
  },
  
  created() {
    this.axios
      .get("/repairOrder/getAllOrders",
      {
        params: {
          pageSize:5,
          currentPage: this.currentPage
        }
      })
      .then((res)=> {
        console.log(res.data.data);
        console.log(res.data.data.totalMoney);
        this.totalMoney = res.data.data.totalMoney;
        this.totalCount = res.data.data.totalCount;
        this.tableData = res.data.data.data;
        this.loading= false;
      })
      .catch((err)=> {
        console.log(err);
      })
  },
  computed: {
    
  }
};
</script>

<style lang="less" scoped>
  @import "../assets/less/base.less";
  .bg {
    background:#f3f3f4;
    height:auto;
    padding:20px;
    .right {
      background: #fff;
      font-size: 13px;
      .headBox {
        text-align: left;
        padding: 15px 20px;
        p {
          display: inline;
          color: #606266;
          font-weight: 600;
        }
      }
      .searchBox {
        width: 98%;
        padding: 20px 20px 0;
      }
      .btn {
          width: 100%;
          height: 40px;
          div {
            float:right;
            margin-right:20px;
            .btn-daochu {
              background:@greenColor;
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
      }
      .totalMoney {
        padding: 5px 20px;
        font-size: 16px;
        color: #676a6c;
        .TMtitle {
          font-weight: 600;
        }
        .TMmoney {
          color: red;
        }
      }
      .contentBox {
        padding: 20px 20px;
        .el-table--border {
          margin: 0 auto;
          font-size: 13px;
        }
      }
      .block {
        width: 100%;
        height: 30px;
        padding: 10px 0;
        .el-pagination {
          float: right;
        }
      }
    }
  }

.el-divider--horizontal {
  margin: 0;
}



</style>