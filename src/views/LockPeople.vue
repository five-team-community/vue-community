<template>
  <div class="bg"> 
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>开锁公司信息管理</p>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="searchBox">
       <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
          <el-form-item label="公司名称">
            <el-input v-model="search.companyName" placeholder="请输入公司"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn" >
        <div>
          <el-button icon="el-icon-plus" class="btn-add" @click="addBtn">添加开锁公司</el-button>
          <el-button icon="el-icon-tickets" class="btn-daochu" @click="exportBtn">导出</el-button>
          <el-button icon="el-icon-search" class="btn-search" @click="searchBtn">查询</el-button>
        </div>
      </div>
      <div class="contentBox" v-loading="loading">
        <el-table :data="testData" stripe border style="width: 100%">
          <el-table-column prop="companyName" label="开锁公司名称"></el-table-column>
          <el-table-column prop="personName" label="联系人" ></el-table-column>
          <el-table-column prop="telNum" label="联系电话" ></el-table-column>
          <el-table-column prop="location" label="公司地址" ></el-table-column>
          <el-table-column prop="operate" label="操作" >
            <template slot-scope="scope">
               <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                 <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.$index)"></el-button>
               </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            layout="total, prev, pager, next"
            :page-size="5"
            :total="totalCount"
            :pager-count="5"
            :current-Page="currentPage"
            @current-change="handleCurrentChange"
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
      totalCount:0,
      currentPage:1,
      testData:[],
      loading:true,
      search:{
        companyName:""
      },
      
      
    }
  },
  methods: {
    handleCurrentChange(val) { // 换页
      this.currentPage = val;
      console.log("当前页数",this.currentPage);
      // 请求
      this.axios
      .post("/unlock/getAll",
      {
          pageSize:5,
          currentPage:this.currentPage
      })
      .then((res)=> {
        this.testData = res.data.data.data;
        console.log("换页后",this.testData);
        this.totalCount = res.data.data.totalCount;
        this.loading= false;
      })
      .then((err)=> {
        console.log(err);
      })
      
    },
    del(index) { // 删除
      
      var delId = this.testData[index].unlockId;
      console.log("删除的id!",delId);

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
            .post("/unlock/removeById",
            {
                unlockId:delId
            })
            .then((res)=> {
              console.log("删除成功并输出数据",res.data);
              this.axios
                .post("/unlock/getAll",
                {
                    pageSize:5,
                    currentPage:this.currentPage
                })
                .then((res)=> {
                  console.log(res.data.data.data);
                  this.testData = res.data.data.data;
                  this.totalCount = res.data.data.totalCount;
                  this.loading= false;
                })
                .then((err)=> {
                  console.log(err);
                })
            })
            .then((err)=> {
              console.log(err);
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      
      
    },
    addBtn() { // 添加信息
      console.log("进入添加页面!");
      this.$router.push({path:"/home/LockPeopleAdd"})
    },
    exportBtn() { // 导出
      console.log("导出成功!");
    },
    searchBtn() { // 查询
      console.log("查询结果：",this.search.companyName);
      this.axios
        .get("/unlock/getAllByParam",
        {
          params:{
            companyName:this.search.companyName,
          pageSize:5,
          currentPage:this.currentPage
          }
        })
        .then((res)=> {
          console.log(res.data);
          this.testData = res.data.data.data;
          this.totalCount = res.data.data.totalCount;
          this.loading= false;
        })
        .catch((err)=> {
          console.log(err);
        })
    },
    
  },
  created() {
    this.axios
      .post("/unlock/getAll",
      {
          pageSize:5,
          currentPage:this.currentPage
      })
      .then((res)=> {
        console.log(res.data.data.data);
        this.testData = res.data.data.data;
        this.totalCount = res.data.data.totalCount;
        this.loading= false;
      })
      .then((err)=> {
        console.log(err);
      })
  },
  computed: {
  }
}
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
    }
    .el-divider--horizontal {
      margin: 0;
    }
  }
.el-divider--horizontal {
  margin: 0;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px;
}
</style>