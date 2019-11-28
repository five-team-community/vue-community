<template>
  <div style="background:#ddd;height:900px;display: flex;justify-content: center;align-items:center;">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>报修管理</p>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="searchBox">
        <el-row>
          <el-col :span="6">
            <span>房号：</span>
            <el-input v-model="input" placeholder="请输入房号" style="width:50%"></el-input>
          </el-col>
          <el-col :span="6">
            <span>报修部位：</span>
            <el-select v-model="value" placeholder="请选择保修部位">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>联系电话：</span>
            <el-input v-model="input" placeholder="请输入联系电话" style="width:50%"></el-input>
          </el-col>
          <el-col :span="6">
            <span>维修人员：</span>
            <el-select v-model="value" placeholder="请选择维修人员">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>状态：</span>
            <el-select v-model="value" placeholder="请选择状态">
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
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-edit">登记</el-button>
            <el-button type="success" icon="el-icon-check">导出</el-button>
            <el-button type="info" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="contentBox">
        <el-table :data="tableData" stripe border style="width: 98%">
          <el-table-column prop="houseNum" label="房号"></el-table-column>
          <el-table-column prop="name" label="姓名" ></el-table-column>
          <el-table-column prop="phone" label="联系电话" ></el-table-column>
          <el-table-column prop="fixType" label="报修部位" ></el-table-column>
          <el-table-column prop="repairContent" label="报修内容" ></el-table-column>
          <el-table-column prop="repairPersonName" label="维修人员" ></el-table-column>
          <el-table-column prop="regDate" label="登记时间" ></el-table-column>
          <el-table-column prop="repairState" label="状态" style="width: 10%"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <el-button type="primary" icon="el-icon-search"></el-button>
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next"
          :total="400"
          style="float:right"
          background>
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
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          fixType: "单元门禁",
          repairContent: "门锁坏了",
          repairPersonName: "王师傅",
          regDate: "2019-11-26 13:36:55",
          repairState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          fixType: "单元门禁",
          repairContent: "门锁坏了",
          repairPersonName: "王师傅",
          regDate: "2019-11-26 13:36:55",
          repairState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          fixType: "单元门禁",
          repairContent: "门锁坏了",
          repairPersonName: "王师傅",
          regDate: "2019-11-26 13:36:55",
          repairState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          fixType: "单元门禁",
          repairContent: "门锁坏了",
          repairPersonName: "王师傅",
          regDate: "2019-11-26 13:36:55",
          repairState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          fixType: "单元门禁",
          repairContent: "门锁坏了",
          repairPersonName: "王师傅",
          regDate: "2019-11-26 13:36:55",
          repairState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          fixType: "单元门禁",
          repairContent: "门锁坏了",
          repairPersonName: "王师傅",
          regDate: "2019-11-26 13:36:55",
          repairState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          fixType: "单元门禁",
          repairContent: "门锁坏了",
          repairPersonName: "王师傅",
          regDate: "2019-11-26 13:36:55",
          repairState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          fixType: "单元门禁",
          repairContent: "门锁坏了",
          repairPersonName: "王师傅",
          regDate: "2019-11-26 13:36:55",
          repairState: "待处理"
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
  }
}
</style>