<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>报修管理</p>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="searchBox">
       <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
          <el-form-item label="房号">
            <el-input v-model="search.houseNum" placeholder="请输入房号"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="search.telphone" placeholder="请输入用户联系电话"></el-input>
          </el-form-item>
          <el-form-item label="报修服务人员">
            <el-input v-model="search.staffName" placeholder="请输入报修人员姓名"></el-input>
          </el-form-item>
          <el-form-item label="登记时间">
            <el-date-picker v-model="search.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn" >
        <div>
          <el-button icon="el-icon-tickets" class="btn-daochu" @click="exportBtn">导出</el-button>
          <el-button icon="el-icon-search" class="btn-search" @click="searchBtn">查询</el-button>
        </div>
      </div>
      <div class="contentBox">
        <el-table :data="tableData" stripe border v-loading="loading" style="width: 100%">
          <el-table-column prop="houseProperty.housePropertyNo" label="房号"></el-table-column>
          <el-table-column prop="inhabitant.inhabitantName" label="姓名" ></el-table-column>
          <el-table-column prop="staff.telNum" label="联系电话" ></el-table-column>
          <el-table-column prop="repairsParts[0].partName" label="报修部位" ></el-table-column>
          <el-table-column prop="repairContent" label="报修内容" ></el-table-column>
          <el-table-column prop="staff.staffName" label="维修人员" ></el-table-column>
          <el-table-column prop="regDate" label="登记时间" ></el-table-column>
          <el-table-column prop="repairState" label="状态" style="width: 10%"></el-table-column>
          <el-table-column prop="operate" label="操作" >
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom-end">
                <el-button type="primary" icon="el-icon-search" @click="showDetail(scope.$index)" ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom-end">
                <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :total="totalCount"
            :current-page="currentPage"
            :page-size="5"
            layout="total, prev, pager, next"
            background></el-pagination>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentPage: 1,
      totalCount:0,
      tableData:[],
      search: {//记录查询的数据
        houseNum: "",
        staffName:"",
        telphone: "",
        stauts: "",
        time:""
      },
      startTime1:"",
      endTime1:"",
      loading:true,
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
    handleCurrentChange(val) { // 改变页
      this.currentPage=val;
      console.log("改变也",this.currentPage);

      console.log("当前每页有",5,"个数据");
    console.log("当前为第",this.currentPage,"页");
      
      this.axios
        .get("/repairInfo/getAllRepairInfo",
        {
          params: {
            pageSize: 5,
            currentPage: this.currentPage 
          }
        })
        .then((res) => {
          console.log(res.data.data.data);
          this.tableData = (res.data.data.data);
          this.totalCount = res.data.data.totalCount;
          this.loading = false;
          console.log(this.tableData);
        })
        .catch(err=> {
          console.log(err)
        }) 



    },
    showDetail(index) { // 查看详情
      index = 5*(this.currentPage-1)+index;
      var fixId = this.tableData[index].infoId;
      console.log("详情",index);
      this.$router.push({path:'/home/fixdetail?id='+fixId});
    },
    exportBtn() { // 导出
      this.axios
        .get("/repairInfo/exportInfo")
        .then((res)=> {
          console.log(res);
        })
        .catch((err)=> {
          console.log(err);
        })
    },
    searchBtn() { // 查询 请求数据
      if(this.search.time) {
        // 时间格式
        var t = this.search.time;
        console.log(t);
        this.startTime1 = t[0].getFullYear()+ "-" + (t[0].getMonth()+1) + "-" +t[0].getDate();
        this.endTime1 = t[1].getFullYear()+ "-" + (t[1].getMonth()+1) + "-" +t[1].getDate();
        console.log("开始时间:",this.startTime1);
        console.log("结束时间:",this.endTime1);
      }
      console.log("房号:",this.search.houseNum);
      console.log("电话:",this.search.telphone);
      console.log("服务人员姓名:",this.search.staffName);

      this.axios
        .get("/repairInfo/getAllRepairInfoByParam",{
          params:{
            housePropertyNo:this.search.houseNum,
            telNum: this.search.telphone,
            staffName:this.search.staffName,
            beginTime:this.startTime1,
            endTime:this.endTime1,
            pageSize: 5,
            currentPage:this.currentPage
          }
        })
        .then((res) => {
          console.log(res.data.data);
          this.tableData = (res.data.data.data);
          this.totalCount = res.data.data.totalCount;
          this.loading = false;
        })
        .catch(err=> {
          console.log(err)
        }) 
    },
    del(index) { // 删除 请求数据
      console.log("要删除的id",this.tableData[index].infoId);
      var delId = this.tableData[index].infoId;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // 请求数据
        this.axios
          .post("/repairInfo/deleteRepairInfoById",
          {
            
              infoId: delId
            
          })
          .then((res) => {
            console.log(res);
            this.axios
              .get("/repairInfo/getAllRepairInfo",
              {
                params: {
                  pageSize: 5,
                  currentPage: this.currentPage 
                }
              })
              .then((res) => {
                console.log(res.data.data.data);
                this.tableData = (res.data.data.data);
                this.loading = false;
                console.log(this.tableData);
              })
              .catch(err=> {
                console.log(err)
              }) 
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
    console.log("当前每页有",5,"个数据");
    console.log("当前为第",this.currentPage,"页");
    this.axios
        .get("/repairInfo/getAllRepairInfo",
        {
          params: {
            pageSize:5,
            currentPage:this.currentPage
          }
        })
        .then((res) => {
          console.log(res.data.data);
          this.tableData = (res.data.data.data);
          this.totalCount = res.data.data.totalCount;
          this.loading = false;
          console.log(this.tableData);
        })
        .catch(err=> {
          console.log(err)
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
    }
  }
.el-divider--horizontal {
  margin: 0;
}
</style>