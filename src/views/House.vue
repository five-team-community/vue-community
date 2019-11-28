<template>
  <div id="house">
    <div class="content">
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
            <el-input v-model="search.host" placeholder="请输入业主姓名"></el-input>
          </el-form-item>
          <el-form-item label="预留手机号">
            <el-input v-model="search.telphone" placeholder="请输入预留手机号"></el-input>
          </el-form-item>
          <el-form-item label="是否闲置">
            <el-select v-model="search.isEmpty" placeholder="是否闲置">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 新增和搜索按钮 -->
      <div class="btn">
        <div>
          <el-button icon="el-icon-plus" class="btn-add" @click='add'>新增</el-button>
          <el-button icon="el-icon-search" class="btn-search" @click='searchMsg'>搜素</el-button>
        </div>
      </div>

      <!-- 表格数据 -->
      <div class="mytable">
        <el-table :data="getData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="no" label="房号"></el-table-column>
          <el-table-column prop="host" label="业主姓名"></el-table-column>
          <el-table-column prop="tel" label="预留手机号"></el-table-column>
          <el-table-column prop="time" label="交房时间"></el-table-column>
          <el-table-column prop="isEmpty" label="是否空置"></el-table-column>
          <el-table-column prop="isCount" label="是否计费"></el-table-column>
          <el-table-column prop="blindNum" label="绑定数"></el-table-column>
          <el-table-column prop="blindMax" label="限制绑定数"></el-table-column>

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
        <div class="clearfix" v-show="!loading"><el-pagination background layout="prev, pager, next" :page-size="5" :total="houseData.length" :pager-count="5" :hide-on-single-page="true" @current-change="changePage" class="page"></el-pagination></div>
      </div>
      
    </div>
  </div>
</template>
<script>
// 模拟的数据
var houseData=[
  {
    no:"1",
    host:"aaa",
    tel:"12324234",
    time:"2018-08-07",
    isEmpty:"是",
    isCount:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    no:"2",
    host:"aaa",
    tel:"12324234",
    time:"2018-08-07",
    isEmpty:"是",
    isCount:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    no:"3",
    host:"aaa",
    tel:"12324234",
    time:"2018-08-07",
    isEmpty:"是",
    isCount:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    no:"4",
    host:"aaa",
    tel:"12324234",
    time:"2018-08-07",
    isEmpty:"是",
    isCount:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    no:"5",
    host:"aaa",
    tel:"12324234",
    time:"2018-08-07",
    isEmpty:"是",
    isCount:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    no:"6",
    host:"aaa",
    tel:"12324234",
    time:"2018-08-07",
    isEmpty:"是",
    isCount:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    no:"7",
    host:"aaa",
    tel:"12324234",
    time:"2018-08-07",
    isEmpty:"是",
    isCount:"计费",
    blindNum:3,
    blindMax:20
  },{
    no:"8",
    host:"aaa",
    tel:"12324234",
    time:"2018-08-07",
    isEmpty:"是",
    isCount:"计费",
    blindNum:3,
    blindMax:20
  }
]
export default {
  data() {
    return {
      loading:true,
      currentPage:1,//记录当前页
      search: {//记录筛选的数据项
        houseNum: "",
        host: "",
        telphone: "",
        isEmpty: ""
      },
      houseData:[]//表单所以数据
    };
  },
  methods: {
    add(){//新增
      this.$router.push({path:'/home/addHouse'});
    },
    searchMsg(){//搜索
      console.log(this.search);
    },
    show(index){//查看
      index = 5*(this.currentPage-1)+index;
      console.log("查看",index);
      this.$router.push({path:'/home/showHouse?id='+index});
    },
    alter(index){//修改
      index = 5*(this.currentPage-1)+index;
      this.$router.push({path:'/home/alterHouse?id='+index});
    },
    del(index){//删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        index = 5*(this.currentPage-1)+index;
        console.log("删除",index);
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
    }
  },
  created(){
    this.loading = false;
    this.houseData=houseData;//创建时获取数据
  },
  computed: {
    getData(){//计算当前页的数据，table绑定该值
      var start=5*(this.currentPage-1);
      return this.houseData.slice(start,start+5);
   }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
#house {
  color: @fontColor;
  background-color: #f3f3f4;
  padding: 20px 10px;
  min-height: 500px;
}
.content {
  background: white;
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
  height: 40px;
}
.btn > div {
  float: right;
  margin-right: 30px;
  color: white;
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