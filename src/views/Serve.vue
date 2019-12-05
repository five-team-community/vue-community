<template>
  <div id="host">
    <div class="content">

      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-s-order"></i>
        服务人员信息列表
      </div>

      <!-- 筛选数据的输入表单 -->
      <div class="choose">
        <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
          <el-form-item label="姓名：">
            <el-input v-model="search.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input v-model="search.tel" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="身份：">
             <el-select v-model="search.identity" placeholder="选择身份">
               <el-option label="全部" value=""></el-option>
              <el-option label="家政员工" value="家政"></el-option>
              <el-option label="维修员工" value="维修"></el-option>
              <el-option label="回收员工" value="回收"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 新增和搜索按钮 -->
      <div class="btn" style="text-align:right;margin-right:30px">
        <el-button icon="el-icon-upload" class="btn-exclude" @click="exclude">导出报表</el-button>
        <el-button icon="el-icon-plus" class="btn-add" @click="add">新增</el-button>
        <el-button icon="el-icon-search" class="btn-search" @click="searchMsg">搜素</el-button>
      </div>

      <!-- 表格数据 -->
      <div class="mytable">
        <el-table :data="serveList" border style="width: 100%" v-loading="loading" >
          <el-table-column prop="staffName" label="姓名"></el-table-column>
          <el-table-column prop="telNum" label="电话"></el-table-column>
          <el-table-column prop="idCardNo" label="身份证号码" width="180px"></el-table-column>
          <el-table-column prop="staffSex" label="性别"></el-table-column>
          <el-table-column prop="staffType" label="身份"></el-table-column>
          <el-table-column prop="workExperience" label="经验"></el-table-column>
          <el-table-column prop="isFree" label="是否空闲"></el-table-column>

          <!-- 相关操作按钮 -->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-search" size="mini" class="btn-show" @click="show(scope.$index)"></el-button>
              <el-button type="info" icon="el-icon-edit-outline" size="mini" class="btn-alter" @click="alter(scope.$index)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" class="btn-del" @click="del(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="clearfix" v-show="!loading"><el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalPage" :pager-count="5" :hide-on-single-page="true" @current-change="changePage" class="page" :current-page="currentPage"></el-pagination></div>
      </div>
      
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      form:{
        
      },
      loading:true,
      currentPage:1,//记录当前页
      pageSize:5,
      totalPage:0,
      search: {//记录筛选的数据项
        name:'',
        tel:'',
        identity:'',
      },
      serveList:[]//表单所以数据
    };
  },
  methods: {
    add(){//新增
      this.$router.push({path:'/home/addServe'});
    },
    searchMsg(){//搜索
      console.log(this.search);
      this.currentPage=1;
      this.loading = true;

      // ********************************搜索***************************
    this.axios.post("/staff/showBySearch", {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      name: this.search.name,
      telNum: this.search.tel,
      staffType: this.search.identity
    })
    .then(res => {
      console.log(res.data);
      this.serveList = res.data.data.data
      this.loading=false;
    })
    .catch(err=> {
      console.log(err);
    })
      
    },
    exclude(){//导出报表
      window.location.href=this.$store.state.ip+"/staff/excludeExcel";
    },
    show(index){//查看
      var id=this.serveList[index].staffId;
      this.$router.push({path:'/home/showServe/'+id});
    },
    alter(index){//修改
      var id=this.serveList[index].staffId;
      this.$router.push({path:'/home/alterServe/'+id});
    },

     del(index) {
      //***********************************删除**************************************
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id = this.serveList[index].staffId;
          this.axios
            .post("/staff/removeStaff", {
              id: id
            })
            .then(res => {
              if (res.data.message == "删除成功") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                
                // 删除成功之后重新渲染数据
                this.axios
                  .post("/staff/showStaffList", {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                  })
                  .then(res => {
                    console.log(res);
                    this.serveList = res.data.data.data
                    this.loading = false;
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
              else{
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },


    changePage(val){//改变页码
      this.currentPage=val;
      this.loading=true;
    this.axios.post("/staff/showBySearch", {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      name: this.search.name,
      telNum: this.search.tel,
      staffType: this.search.identity
    })
    .then(res => {
      console.log(res.data);
      this.serveList = res.data.data.data
      this.loading=false;
    })
    .catch(err=> {
      console.log(err);
    })
    },


  },
  created(){

    // ***************************获取数据*****************************
    
    this.axios.post("/staff/showStaffList", {
      currentPage: this.currentPage,
      pageSize: this.pageSize
    })
    .then(res => {
      console.log(res.data);
      this.totalPage = res.data.data.count;
      this.serveList = res.data.data.data
      this.loading=false;
    })
    .catch(err=> {
      console.log(err);
    })
  },
};


</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
#host {
  color: @fontColor;
  background-color: white;
  height: 100%;
}
.content {
  background: white;
  min-height: 500px;
}
.title {
  padding: 15px 20px;
  border-top: 3px solid #e7eaec;
  border-bottom: 1px solid #e7eaec;
  i {
    margin-right: 2px;
  }
}

.choose {
  padding: 20px 20px 0 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.box-info {
  width: 100px;
  float: left;
  line-height: 40px;
  text-align: right;
}
.myinput {
  margin-left: 100px;
}
.myinput .el-input {
  width: 90%;
}

.btn{
  margin-left: 30px;
  color: white;
  .btn-exclude{
    color:@yellowColor;
    border-color: @yellowColor;
    &:hover{
      color: white;
      background: @yellowColor;
    }
  }
  .btn-add {
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
.mytable{
  padding: 20px 30px;
}
.el-button--mini, .el-button--mini.is-round{
  padding: 3px;
}
.btn-alter{
  background: @blueColor;
  border-color: @blueColor;
}
.page{
  float: right;
  margin-top: 20px;
  
}
</style>