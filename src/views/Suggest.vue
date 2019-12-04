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
          <el-table-column prop="housePropertyNo" label="房号"></el-table-column>
          <el-table-column prop="inhabitantName" label="姓名" ></el-table-column>
          <el-table-column prop="telNum" label="联系电话" ></el-table-column>
          <el-table-column prop="sugContent" label="内容" ></el-table-column>
          <el-table-column prop="sugDate" label="登记时间" ></el-table-column>
          <el-table-column prop="sugState" label="状态"></el-table-column>
          <el-table-column prop="operate" label="操作" >
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                <el-button type="primary" icon="el-icon-search" @click="showDetail(scope.$index)" ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-Page="currentPage"
            :total="totalCount"
            :page-size="5"
            :pager-count="5"
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
      search: {//记录筛选的数据项
        houseNum: "",
        staffName: "",
        telphone: "",
        status: "",
        time:""
      },
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
      handleCurrentChange(val) {
        this.currentPage=val;
        this.axios
        .post("/suggestion/showByLike",
        {
          
            pageSize:5,
            currentPage:this.currentPage
          
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
        var showId = this.tableData[index].sugId;
        console.log("详情",index);
        this.$router.push({path:'/home/SuggestDetail?id='+showId});
      },
      exportBtn() { // 导出
        this.axios
          .post("/suggestion/excludeExcel")
          .then((res)=> {
            console.log(res);
          })
          .catch((err)=> {
            console.log(err);
          })
      },
      searchBtn() { // 查询
        
        // 时间格式
        var t = this.search.time;
        var startTime1 = t[0].getFullYear()+ "-" + (t[0].getMonth()+1) + "-" +t[0].getDate();
        var endTime1 = t[1].getFullYear()+ "-" + (t[1].getMonth()+1) + "-" +t[1].getDate();
        console.log("开始时间:",startTime1);
        console.log("结束时间:",endTime1);

        // 发送请求
        this.axios
          .post("/suggestion/showByLike",
          {
              beginTime:startTime1,
              endTime:endTime1,
              currentPage:this.currentPage,
              pageSize:this.pagesize
          })
          .then((res) => {
            console.log(res);
            this.axios
              .post("/suggestion/showByLike",
              {
                  currentPage:this.currentPage,
                  pageSize:5  
              })
              .then((res) => {
                console.log(res.data.data);
                this.tableData = (res.data.data.data);
                this.totalCount = res.data.data.totalCount;
                this.loading = false;
                console.log("数据：",this.tableData);
                console.log("总数：",this.totalCount);
              })
              .catch(err=> {
                console.log(err)
              }) 
          })
          .catch(err=> {
            console.log(err)
          }) 
      },
      del(index) { // 删除
        var delId = this.tableData[index].sugId;
        console.log("要删除的编号",delId);

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
            .post("/suggestion/deleteById",
            {
                id: delId
            })
            .then((res) => {
              console.log(res);
              this.axios
                .post("/suggestion/showByLike",
                {
                    pageSize:this.pagesize,
                    currentPage:this.currentPage
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
      this.axios
        .post("/suggestion/showByLike",
        {
            currentPage:this.currentPage,
            pageSize:5  
        })
        .then((res) => {
          console.log(res.data.data);
          this.tableData = (res.data.data.data);
          this.totalCount = res.data.data.totalCount;
          this.loading = false;
          console.log("数据：",this.tableData);
          console.log("总数：",this.totalCount);
        })
        .catch(err=> {
          console.log(err)
        }) 
        // 需要更新
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