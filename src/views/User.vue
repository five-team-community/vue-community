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
          <el-table-column prop="housePropertyNo" label="房号"></el-table-column>
          <el-table-column prop="ownerName" label="业主姓名"></el-table-column>
          <el-table-column prop="ownerPhone" label="预留手机号"></el-table-column>
          <el-table-column prop="ownerTime" label="交房时间"></el-table-column>
          <el-table-column prop="houseState" label="是否空置"></el-table-column>
          <el-table-column prop="isBilling" label="是否计费"></el-table-column>
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
</template>
<script>
// 模拟的数据
var houseData=[
  {
    housePropertyId:1,
    housePropertyNo:"1",
    ownerName:"aaa",
    ownerPhone:"12324234",
    ownerTime:"2018-08-07",
    houseState:"是",
    isBilling:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    housePropertyId:2,
    housePropertyNo:"2",
    ownerName:"aaa",
    ownerPhone:"12324234",
    ownerTime:"2018-08-07",
    houseState:"是",
    isBilling:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    housePropertyId:3,
    housePropertyNo:"3",
    ownerName:"aaa",
    ownerPhone:"12324234",
    ownerTime:"2018-08-07",
    houseState:"是",
    isBilling:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    housePropertyId:4,
    housePropertyNo:"4",
    ownerName:"aaa",
    ownerPhone:"12324234",
    ownerTime:"2018-08-07",
    houseState:"是",
    isBilling:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    housePropertyId:5,
    housePropertyNo:"5",
    ownerName:"aaa",
    ownerPhone:"12324234",
    ownerTime:"2018-08-07",
    houseState:"是",
    isBilling:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    housePropertyId:6,
    housePropertyNo:"6",
    ownerName:"aaa",
    ownerPhone:"12324234",
    ownerTime:"2018-08-07",
    houseState:"是",
    isBilling:"计费",
    blindNum:3,
    blindMax:20
  },
  {
    housePropertyId:7,
    housePropertyNo:"7",
    ownerName:"aaa",
    ownerPhone:"12324234",
    ownerTime:"2018-08-07",
    houseState:"是",
    isBilling:"计费",
    blindNum:3,
    blindMax:20
  },{
    housePropertyId:8,
    housePropertyNo:"8",
    ownerName:"aaa",
    ownerPhone:"12324234",
    ownerTime:"2018-08-07",
    houseState:"是",
    isBilling:"计费",
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
        var housePropertyId= this.housePropertyId;
        console.log("删除",housePropertyId);

        // ****************************************删除请求**********************************************


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
    }
  },
  created(){
    
    // **************************************获取数据请求*********************************************



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
  background-color: white;
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