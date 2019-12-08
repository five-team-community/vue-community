<template>
  <div id="house">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-s-order"></i>
        房产列表
      </div>
      <!-- 筛选数据的输入表单 -->
      <div class="choose">
        <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
          <el-form-item label="房号">
            <el-input v-model="search.houseNum" placeholder="请输入房号"></el-input>
          </el-form-item>
          <el-form-item label="业主">
            <el-input v-model="search.ownerName" placeholder="请输入业主姓名"></el-input>
          </el-form-item>
          <el-form-item label="预留手机号">
            <el-input v-model="search.ownerPhone" placeholder="请输入预留手机号"></el-input>
          </el-form-item>
          <el-form-item label="是否闲置">
            <el-select v-model="search.houseState" placeholder="是否闲置">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
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
        <el-table :data="houseData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="no" label="房号"></el-table-column>
          <el-table-column prop="name" label="业主姓名"></el-table-column>
          <el-table-column prop="tel" label="预留手机号"></el-table-column>
          <el-table-column prop="time" label="交房时间"></el-table-column>
          <el-table-column prop="isEmpty" label="是否空置"></el-table-column>
          <el-table-column prop="isFree" label="是否计费"></el-table-column>
          <el-table-column prop="blindNum" label="绑定数"></el-table-column>
          <el-table-column prop="blindMax" label="限制绑定数"></el-table-column>

          <!-- 相关操作按钮 -->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
              <el-button type="primary" icon="el-icon-search" size="mini" class="btn-show" @click="show(scope.$index)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                <el-button type="info" icon="el-icon-edit-outline" size="mini" class="btn-alter" @click="alter(scope.$index)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <el-button type="danger" icon="el-icon-delete" size="mini" class="btn-del" @click="del(scope.$index)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="clearfix" v-show="!loading"><el-pagination background layout="prev, pager, next" :page-size="5" :total="totalPage" :pager-count="5" :hide-on-single-page="true" @current-change="changePage" class="page" :current-page="currentPage"></el-pagination></div>
      </div>
      
    </div>
</template>
<script>
export default {
  data() {
    return {
      loading:true,
      currentPage:1,//记录当前页
      pageSize:5,
      totalPage:0,
      search: {//记录筛选的数据项
        houseNum: "",
        ownerName: "",
        ownerPhone: "",
        houseState: ""
      },
      houseData:[]//表单所以数据
    };
  },
  methods: {
    add(){//新增
      this.$router.push({path:'/home/addHouse'});
    },
    exclude(){//导出报表
      window.location.href=this.$store.state.ip+"/InhabitantAndHouseProperty/exportInfo";
    },
    searchMsg(){//************************搜索****************************
      console.log("搜索",this.search);
      this.loading = true;
      this.currentPage = 1;
      this.axios
        .post("/InhabitantAndHouseProperty/selectAllLike", {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          housePropertyNo: this.search.houseNum,
          inhabitantName: this.search.ownerName,
          telNum: this.search.ownerPhone,
          houseState: this.search.houseState
        })
        .then(res => {
          console.log("模糊查询",res.data.data);
          this.houseData = this.fomateData(res.data.data.list);
          this.totalPage = res.data.data.page.totalCount;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });

    },
    show(index){//查看
      console.log("查看",index);
      var id= this.houseData[index].id;
      this.$router.push({path:'/home/showHouse/'+id});
    },
    alter(index){//修改
    var id= this.houseData[index].id;
      this.$router.push({path:'/home/alterHouse/'+id});
    },
    del(index){//删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id= this.houseData[index].id;
        console.log("删除",id);


        // ****************************************删除请求**********************************************
      this.axios
        .get("/InhabitantAndHouseProperty/deleteById", {params:{
          housePropertyId: id
        }})
        .then(res => {
          console.log("bbb",res.data);
          if(res.data.code=="200"){
            this.axios
        .get("/InhabitantAndHouseProperty/getAllInfo", {params:{
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }})
        .then(res => {
          console.log("aaa",res.data.data);
          this.houseData = this.fomateData(res.data.data.list);
          
          this.totalPage = res.data.data.page.totalCount;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
          }
          // this.houseData = this.fomateData(res.data.data.list);
          // this.totalPage = res.data.data.page.totalCount;
          // this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    },
    changePage(val){//改变页码
      this.currentPage=val;
      console.log(val);
      this.loading =true;
      this.axios
        .post("/InhabitantAndHouseProperty/selectAllLike", {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          housePropertyNo: this.search.houseNum,
          inhabitantName: this.search.ownerName,
          telNum: this.search.ownerPhone,
          houseState: this.search.houseState
        })
        .then(res => {
          console.log("模糊查询",res.data.data);
          this.houseData = this.fomateData(res.data.data.list);
          console.log(this.houseData);
          this.totalPage = res.data.data.page.totalCount;
          this.loading = false;
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    fomateData(list){
      var arr=[];
      if(list){
        for(var i= 0;i<list.length;i++){
        var item={};
        item.id=list[i].housePropertyId;
        item.no=list[i].housePropertyNo;
        item.name = list[i].inhabitant.inhabitantName;
        item.tel = list[i].inhabitant.telNum;
        item.time = list[i].ownerTime;
        item.isEmpty = list[i].houseState;
        item.isFree = list[i].isBilling;
        item.blindNum = list[i].count;
        item.blindMax = list[i].maxCount;
        
        arr.push(item);
      }
      }
      return arr;
    }
  },
  created(){
    
    // **************************************获取数据请求*********************************************
    this.axios
        .get("/InhabitantAndHouseProperty/getAllInfo", {params:{
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }})
        .then(res => {
          console.log("aaa",res.data.data);
          this.houseData = this.fomateData(res.data.data.list);
          this.totalPage = res.data.data.page.totalCount;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
#house {
  color: @fontColor;
  background-color: white;
  height: 100%;
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
.mytable {
  padding: 20px 30px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px;
}
.btn-alter {
  background: @blueColor;
  border-color: @blueColor;
}
.page {
  float: right;
  margin-top: 20px;
}
</style>