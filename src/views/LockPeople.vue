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
          <el-form-item label="开锁公司">
            <el-input v-model="search.unlockCompanyName" placeholder="请输入公司名称"></el-input>
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
        <el-table :data="showData" stripe border style="width: 100%">
          <el-table-column prop="companyName" label="开锁公司名称"></el-table-column>
          <el-table-column prop="personName" label="联系人" ></el-table-column>
          <el-table-column prop="telNum" label="联系电话" ></el-table-column>
          <el-table-column prop="location" label="公司地址" ></el-table-column>
          <el-table-column prop="operate" label="操作" >
            <template slot-scope="scope">
               <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
                 <el-button type="primary" icon="el-icon-search" @click="showDetail(scope.$index)" ></el-button>
               </el-tooltip>
               <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                 <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index)"></el-button>
               </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
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
export default {
  data() {
    return {
      pageSize:5,
      currentPage:1,
      testData:[],
      loading:true,
      search:{
        unlockCompanyName:""
      },
      
      
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    showDetail(index) { // 查看详情
      console.log("查看的id：",index);
    },
    del(index) { // 删除
      console.log("删除成功!",index);
      
      /* this.axios
      .get("/unlock/removeById",
      {
        params:{
          unkockId:id
        }
      })
      .then((res)=> {
        console.log(res.data);
      })
      .then((err)=> {
        console.log(err);
      }) */
    },
    addBtn() { // 添加信息
      console.log("添加成功!");
      this.$router.push({path:"/home/LockPeopleAdd"})
    },
    exportBtn() { // 导出
      console.log("导出成功!");
    },
    searchBtn() { // 查询
      console.log("查询结果：",this.search.unlockCompanyName);
    },
    
  },
  created() {
    this.loading=true;
    this.axios
      .get("/unlock/getAll",
      {
        params:{
          pageSize:this.pageSize,
          currentPage:this.currentPage
        }
      })
      .then((res)=> {
        console.log(res.data);
      })
      .then((err)=> {
        console.log(err);
      })
  },
  computed: {
    showData() {
      return this.testData;
    }
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

</style>