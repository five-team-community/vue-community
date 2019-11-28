<template>
  <div style="background:#ddd;height:900px;display: flex;justify-content: center;align-items:center;">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>回收订单列表</p>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="searchBox">
        <el-row>
          <el-col :span="6">
            <span>交易号：</span>
            <el-input v-model="input" placeholder="请输入交易号" style="width:50%"></el-input>
          </el-col>
          <el-col :span="6">
            <span>支付方式：</span>
            <el-select v-model="value" placeholder="请选择支付方式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12" class="block">
            <span>登记时间：</span>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="12">
            <p style="float:left">订单总额：<span style="color:red">777</span>元 </p>
            <p style="float:left">实收金额：<span style="color:red">777</span>元</p>
          </el-col>
          <el-col :span="12">
            <el-button type="success" icon="el-icon-check">导出</el-button>
            <el-button type="info" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="contentBox">
        <el-table :data="tableData" stripe border style="width: 98%">
          <el-table-column prop="orderNo" label="交易号"></el-table-column>
          <el-table-column prop="name" label="用户姓名" ></el-table-column>
          <el-table-column prop="recyclePeople" label="回收人员" ></el-table-column>
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
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next"
          :total="40"
          style="float:right">
      </el-pagination>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  data() {
    return {
      tableData: [
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
      ],
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
  }
};
</script>

<style lang="less" scoped>
.right {
  width: 96%;
  height:850px;
  background: #fff;
  font-size: 13px;
}
.el-divider--horizontal {
  margin: 0;
}
.headBox {
  width: 98%;
  height: 50px;
  margin: 0 auto;
  text-align: left;
  line-height: 50px;
  p {
    display: inline;
    color: #606266;
    font-weight: 600;
  }
}
.searchBox {
  width: 98%;
  margin: 0 auto;
  color: #676A6C;
  .el-col-12 {
    margin: 10px 0;
  }
  .el-col-6 {
    margin: 10px 0;
    text-align: left;
    span {
      display: inline-block;
      width: 30%;
      text-align: left;
    }
  }
}
.contentBox {

  .el-table--border {
    margin: 0 auto;
    font-size: 13px;
  }
}
</style>