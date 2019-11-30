<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>回收管理</p>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="searchBox">
       <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
          <el-form-item label="房号">
            <el-input v-model="search.houseNum" placeholder="请输入房号"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="search.telphone" placeholder="请输入用户电话"></el-input>
          </el-form-item>
          <el-form-item label="服务人员">
            <el-select v-model="search.staFFName" placeholder="请选择服务人员">
              <el-option label="staff"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="search.status" placeholder="请选择状态">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登记时间">
            <el-date-picker v-model="search.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn" >
        <div>
          <el-button icon="el-icon-tickets" class="btn-daochu" >导出</el-button>
          <el-button icon="el-icon-search" class="btn-search" @click="searchBtn">查询</el-button>
        </div>
      </div>
      <div class="contentBox">
        <el-table :data="showData" stripe border style="width: 100%">
          <el-table-column prop="houseNum" label="房号"></el-table-column>
          <el-table-column prop="name" label="姓名" ></el-table-column>
          <el-table-column prop="phone" label="用户联系电话" ></el-table-column>
          <el-table-column prop="recyclePeople" label="回收人员" ></el-table-column>
          <el-table-column prop="regDate" label="登记时间" ></el-table-column>
          <el-table-column prop="cleanState" label="状态" style="width: 10%"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-search" @click="showDetail(scope.$index)" ></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5,10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next"
          :total="8"
          >
      </el-pagination>
  </div>
    </div>
  </div>
</template>

<script>
/* var tableData = [
  {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          cleanPeople: "李大妈",
          regDate: "2019-11-26 13:36:55",
          cleanState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          cleanPeople: "李大妈",
          regDate: "2019-11-26 13:36:55",
          cleanState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          cleanPeople: "李大妈",
          regDate: "2019-11-26 13:36:55",
          cleanState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          cleanPeople: "李大妈",
          regDate: "2019-11-26 13:36:55",
          cleanState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          cleanPeople: "李大妈",
          regDate: "2019-11-26 13:36:55",
          cleanState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          cleanPeople: "李大妈",
          regDate: "2019-11-26 13:36:55",
          cleanState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          cleanPeople: "李大妈",
          regDate: "2019-11-26 13:36:55",
          cleanState: "待处理"
        },
        {
          houseNum: "FFFF-0001",
          name: "王小虎",
          phone: "12345678911",
          cleanPeople: "李大妈",
          regDate: "2019-11-26 13:36:55",
          cleanState: "待处理"
        }
] */
export default {
  data() {
    return {
      currentPage: 1,
      pagesize:5,
      tableData:[],
      search: {//记录筛选的数据项
        houseNum: "",
        staffName: "",
        telphone: "",
        status: "",
        time:""
      },
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
      }
    };
  },
  methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        console.log(val);
      },
      showDetail(index) { // 查看详情
        index = (index+(this.pagesize)*(this.currentPage-1));
        console.log("详情",index);
        this.$router.push({path:'/home/recycleMsgDetail?id='+index});
      },
      searchBtn() { // 查询 请求数据
        this.axios
          .post("/repairInfo/getAllRepairInfo",{
            houseNum:this.houseNum,
            telNum: this.search.telphone,
            staffName:this.search.staffName,
            repairState:this.search.stauts,
            regDate:this.search.time
          })
          .then((res) => {
            console.log(res);
          })
          .catch(err=> {
            console.log(err)
          }) 
      },
      del(index) { // 删除 发送请求
        console.log(index);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 删除
          this.axios
            .post("/repairInfo/getAllRepairInfo",{
              id: index
            })
            .then((res) => {
              console.log(res);
            })
            .catch(err=> {
              console.log(err)
            }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
  },
  created() {
    this.axios
        .get("/repairInfo/getAllRepairInfo" )
        .then((res) => {
          console.log(res.data.data);
        })
        .catch(err=> {
          console.log(err)
        }) 
  },
  computed: {
    showData() {
      console.log(this.pagesize);
      console.log(this.currentPage);
      var start = (this.pagesize)*(this.currentPage-1);
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
        padding: 20px 20px 0;
      }
      .btn {
        width: 100%;
        height: 40px;
        div {
          float:right;
          margin-right:20px;
          .btn-daochu {
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
      }
      .contentBox {
        padding: 20px 20px;
        .el-table--border {
          margin: 0 auto;
        }
      }
    }
  }

.el-divider--horizontal {
  margin: 0;
}
</style>