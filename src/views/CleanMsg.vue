<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>家政管理</p>
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
        </el-form>
      </div>
      <div class="btn">
        <div>
          <el-button icon="el-icon-tickets" class="btn-daochu" >导出</el-button>
          <el-button icon="el-icon-search" class="btn-search" @click="searchBtn">查询</el-button>
        </div>
      </div>
      <div class="contentBox">
        <el-table :data="tableData" stripe border v-loading="loading" style="width: 100%">
          <el-table-column prop="housePropertyNo" label="房号"></el-table-column>
          <el-table-column prop="inhabitantName" label="用户姓名" ></el-table-column>
          <el-table-column prop="inhabitantPhone" label="联系电话" ></el-table-column>
          <el-table-column prop="staffName" label="家政服务人员" ></el-table-column>
          <el-table-column prop="staffPhone" label="服务人员电话" ></el-table-column>
          <el-table-column prop="serviceTime" label="登记时间" ></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
                <el-button type="primary" size="mini" icon="el-icon-search" @click="showDetail(scope.$index)" ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.$index)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :total="totalCount"
          :current-page="currentPage"
          :page-size="5"
          :pager-count="5"
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
      handleCurrentChange(val) { //改变页
        this.currentPage=val;
        console.log(val);
        
        this.axios  // 请求数据 渲染列表
        .get("/InhabitantAndStaff/getAllInhabitantAndStaffInfo",
        {
          params: {
            pageSize:this.pagesize,
            currentPage:this.currentPage
          }
        })
        .then((res) => {
          console.log(res.data.data);
          console.log(res.data.data.inhabitantAndStaffVOList);
          console.log(res.data.data.totalCount);
          this.tableData = res.data.data.inhabitantAndStaffVOList;
          this.currentPage = res.data.data.totalCount;
          this.loading = false;
        })
        .catch(err=> {
          console.log(err)
        }) 


      },
      showDetail(index) { //查看详情
        index = (index+(5)*(this.currentPage-1));
        var showId = this.tableData[index].risId;
        console.log("详情",index);
        this.$router.push({path:'/home/cleanMsgDetail?id='+ showId});
      },
      searchBtn() { // 查询 发送请求数据
        
        console.log("房号:",this.search.houseNum);
        console.log("电话:",this.search.telphone);

        // 请求
        this.axios
          .post("InhabitantAndStaff/getAllInfoLike",
          {
            housePropertyNo:this.search.houseNum,
            inhabitantPhone: this.search.telphone,
            pageSize:5,
            currentPage:this.currentPage
          })
          .then((res) => {
            console.log(res);
            /* this.axios  // 请求数据 渲染列表
              .get("/InhabitantAndStaff/getAllInhabitantAndStaffInfo",
              {
                params: {
                  pageSize:this.pagesize,
                  currentPage:this.currentPage
                }
              })
              .then((res) => {
                console.log(res.data.data);
                console.log(res.data.data.inhabitantAndStaffVOList);
                console.log(res.data.data.totalCount);
                this.tableData = res.data.data.inhabitantAndStaffVOList;
                this.currentPage = res.data.data.totalCount;
                this.loading = false;
              })
              .catch(err=> {
                console.log(err)
              })  */
          })
          .catch(err=> {
            console.log(err)
          }) 
    },
      del(index) { // 删除 发送请求
        console.log("删除的id",this.tableData[index].risId);
        var delId = this.tableData[index].risId;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.axios
            .get("/InhabitantAndStaff/deleteByrisId",{
              params: {
                risId: delId
              }
            })
            .then((res) => {
              console.log(res);
              this.axios  // 请求数据 渲染列表
                .get("/InhabitantAndStaff/getAllInhabitantAndStaffInfo",
                {
                  params: {
                    pageSize:5,
                    currentPage:this.currentPage
                  }
                })
                .then((res) => {
                  console.log(res.data.data);
                  console.log(res.data.data.inhabitantAndStaffVOList);
                  console.log("总数",res.data.data.page.totalCount);
                  this.tableData = res.data.data.inhabitantAndStaffVOList;
                  this.totalCount = res.data.data.page.totalCount;
                  this.loading = false;
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
    this.axios  // 请求数据 渲染列表
        .get("/InhabitantAndStaff/getAllInhabitantAndStaffInfo",
        {
          params: {
            pageSize:5,
            currentPage:this.currentPage
          }
        })
        .then((res) => {
          console.log(res.data.data);
          console.log(res.data.data.inhabitantAndStaffVOList);
          console.log("总数",res.data.data.page.totalCount);
          this.tableData = res.data.data.inhabitantAndStaffVOList;
          this.totalCount = res.data.data.page.totalCount;
          this.loading = false;
        })
        .catch(err=> {
          console.log(err)
        }) 
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
        padding: 15px 20px;
        text-align: left;
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
.el-divider--horizontal {
  margin: 0;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px;
}

</style>