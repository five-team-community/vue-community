<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>开锁订单列表</p>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="searchBox">
        <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
          <el-form-item label="交易号">
            <el-input v-model="search.houseNum" placeholder="请输入交易号"></el-input>
          </el-form-item>
          <el-form-item label="登记时间">
            <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <div>
          <el-button icon="el-icon-tickets" class="btn-daochu" >导出</el-button>
          <el-button icon="el-icon-search" class="btn-search" >查询</el-button>
        </div>
      </div>
      <div class="totalMoney">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="TMtitle">订单总额：</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="TMmoney">666</div></el-col>
        </el-row>
      </div>
      <div class="contentBox">
        <el-table :data="showData" stripe border style="width: 100%">
          <el-table-column prop="orderNo" label="交易号"></el-table-column>
          <el-table-column prop="name" label="用户姓名" ></el-table-column>
          <el-table-column prop="recyclePeople" label="开锁人员" ></el-table-column>
          <el-table-column prop="payDate" label="支付时间" ></el-table-column>
          <el-table-column prop="orderMoney" label="金额" ></el-table-column>
          <el-table-column prop="operate" label="操作">
            <el-button type="primary" icon="el-icon-search"></el-button>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next"
          :total="8"
          :pager-count="5"
          >
      </el-pagination>
  </div>
    </div>
  </div>
</template>

<script>
var tableData = [
  {
          orderNo: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          recyclePeople: "王师傅",
          payDate: "2019-11-26 13:36:55",
          orderMoney: "50"
        },
        {
          orderNo: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          recyclePeople: "王师傅",
          payDate: "2019-11-26 13:36:55",
          orderMoney: "50"
        },
        {
          orderNo: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          recyclePeople: "王师傅",
          payDate: "2019-11-26 13:36:55",
          orderMoney: "50"
        },
        {
          orderNo: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          recyclePeople: "王师傅",
          payDate: "2019-11-26 13:36:55",
          orderMoney: "50"
        },
        {
          orderNo: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          recyclePeople: "王师傅",
          payDate: "2019-11-26 13:36:55",
          orderMoney: "50"
        },
        {
          orderNo: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          recyclePeople: "王师傅",
          payDate: "2019-11-26 13:36:55",
          orderMoney: "50"
        },
        {
          orderNo: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          recyclePeople: "王师傅",
          payDate: "2019-11-26 13:36:55",
          orderMoney: "50"
        },
        {
          orderNo: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          recyclePeople: "王师傅",
          payDate: "2019-11-26 13:36:55",
          orderMoney: "50"
        }
]
export default {
  methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val;
      }
  },
  data() {
    return {
      tableData: [],
      currentPage:1,
      pagesize:5,
      search:{

      },
      input: '',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
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
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
    };
  },
  created() {
    this.tableData =tableData;
  },
  computed: {
    showData() {
      console.log("本页具有几个数据:",this.pagesize);
      console.log("第几页：",this.currentPage);
      var start =(this.pagesize) * (this.currentPage-1);
      return this.tableData.slice(start,start+(this.pagesize));
    }
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
    }
  }

.el-divider--horizontal {
  margin: 0;
}



</style>