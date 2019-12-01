<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>建议管理</p>
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
            <el-select v-model="search.staffName" placeholder="请选择服务人员">
              <el-option label="staff" value="staff"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="search.status" placeholder="请选择状态">
              <el-option label="已处理" value="true"></el-option>
              <el-option label="待处理" value="false"></el-option>
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
          <el-table-column prop="housePropertyNo" label="房号"></el-table-column>
          <el-table-column prop="inhabitantName" label="姓名" ></el-table-column>
          <el-table-column prop="telNum" label="联系电话" ></el-table-column>
          <el-table-column prop="sugContent" label="内容" ></el-table-column>
          <el-table-column prop="sugDate" label="登记时间" ></el-table-column>
          <el-table-column prop="sugState" label="状态"></el-table-column>
          <el-table-column prop="operate" label="操作" >
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-search" @click="showDetail(this.tableData.sugId)" ></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5,10]"
            :page-size="5"
            layout="total, sizes, prev, pager, next"
            :total="8"
            background></el-pagination>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
/* var tableData = [
  
]; */
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
        console.log(val);
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        console.log(val);
      },
      showDetail(index) { // 查看详情
        index = 5*(this.currentPage-1)+index;
        console.log("详情",index);
        this.$router.push({path:'/home/SuggestDetail?id='+index});
      },
      searchBtn() { // 查询
        
        // 时间格式
        var t = this.search.time;
        console.log(t);
        var startTime = t[0];
        var endTime = t[1];
        var startTime1 = t[0].getFullYear()+ "-" + (t[0].getMonth()+1) + "-" +t[0].getDate();
        var endTime1 = t[1].getFullYear()+ "-" + (t[1].getMonth()+1) + "-" +t[1].getDate();
        console.log("开始时间:",startTime);
        console.log("开始时间:",startTime1);
        console.log("结束时间:",endTime);
        console.log("结束时间:",endTime1);

        // 发送请求
        this.axios
          .get("/suggestion/showByDate",{
            params: {
              beginTime:startTime1,
              endTime:endTime1
            }
          })
          .then((res) => {
            console.log(res);
          })
          .catch(err=> {
            console.log(err)
          }) 
      },
      del(index) { // 删除
        console.log("删除的id" ,index);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 数据请求
          this.axios
            .get("/suggestion/deleteById",{
              params:{
                id: index
              }
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
        .get("/suggestion/showAll" )
        .then((res) => {
          console.log(res.data.data.data);
          this.tableData = (res.data.data.data);
          console.log(this.tableData);
        })
        .catch(err=> {
          console.log(err)
        }) 
        // 需要更新
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
      .block {
        width: 100%;
        height: 30px;
        padding: 10px 0;
        .el-pagination {
          float: right;
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