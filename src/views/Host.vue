<template>
  <div id="host">
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-s-order"></i>
        业主信息列表
      </div>
      <!-- 筛选数据的输入表单 -->
      <div class="choose">
        <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
          <el-form-item label="房号：">
            <el-input v-model="search.houseNum" placeholder="请输入房号"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="search.host" placeholder="请输入业主姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="search.telphone" placeholder="请输入预留手机号"></el-input>
          </el-form-item>
          <el-form-item class="btn">
              <el-button icon="el-icon-plus" class="btn-add" @click='add'>新增</el-button>
              <el-button icon="el-icon-search" class="btn-search" @click='searchMsg'>搜素</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 新增和搜索按钮 -->
      <div class="btn">
        
      </div>

      <!-- 表格数据 -->
      <div class="mytable">
        <el-table :data="hostData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="no" label="房号"></el-table-column>
          <el-table-column prop="name" label="真实姓名"></el-table-column>
          <el-table-column prop="idCard" label="身份证号码" width="180px"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="tel" label="手机号"></el-table-column>
          <el-table-column prop="time" label="绑定时间"></el-table-column>
          <el-table-column prop="link" label="关联注册用户"></el-table-column>
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
        <div class="clearfix" v-show="!loading"><el-pagination background layout="prev, pager, next" :page-size="5" :total="hostData.length" :pager-count="5" :hide-on-single-page="true" @current-change="changePage" class="page"></el-pagination></div>
      </div>
      
    </div>
  </div>
</template>
<script>
// 模拟的数据
var hostData=[
  {
    id:1,
    no:"1",
    name:"aaa",
    tel:"12324234",
    sex:'男',
    idCard:'513022199802168027',
    time:"2018-08-07",
    link:'bbb'
  },
  {
    id:2,
    no:"1",
    name:"aaa",
    tel:"12324234",
    sex:'男',
    idCard:'513022199802168027',
    time:"2018-08-07",
    link:'bbb'
  },

  {
    id:3,
    no:"1",
    name:"aaa",
    tel:"12324234",
    sex:'男',
    idCard:'513022199802168027',
    time:"2018-08-07",
    link:'bbb'
  },
  {
    id:4,
    no:"1",
    name:"aaa",
    tel:"12324234",
    sex:'男',
    idCard:'513022199802168027',
    time:"2018-08-07",
    link:'bbb'
  },
  {
    id:5,
    no:"1",
    name:"aaa",
    tel:"12324234",
    sex:'男',
    idCard:'513022199802168027',
    time:"2018-08-07",
    link:'bbb'
  },

  {
    id:6,
    no:"1",
    name:"aaa",
    tel:"12324234",
    sex:'男',
    idCard:'513022199802168027',
    time:"2018-08-07",
    link:'bbb'
  },
  {
    id:7,
    no:"1",
    name:"aaa",
    tel:"12324234",
    sex:'男',
    idCard:'513022199802168027',
    time:"2018-08-07",
    link:'bbb'
  },
  {
    id:8,
    no:"1",
    name:"aaa",
    tel:"12324234",
    sex:'男',
    idCard:'513022199802168027',
    time:"2018-08-07",
    link:'bbb'
  },
  {
    id:9,
    no:"1",
    name:"aaa",
    tel:"12324234",
    sex:'男',
    idCard:'513022199802168027',
    time:"2018-08-07",
    link:'bbb'
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
      hostData:[]//表单所以数据
    };
  },
  methods: {
    add(){//新增
      this.$router.push({path:'/home/addHost'});
    },
    searchMsg(){//搜索
      console.log(this.search);
    },
    show(index){//查看
      index = 5*(this.currentPage-1)+index;
      var id=this.hostData[index].id;
      this.$router.push({path:'/home/showHost?id='+id});
    },
    alter(index){//修改
      index = 5*(this.currentPage-1)+index;
      var id=this.hostData[index].id;
      this.$router.push({path:'/home/alterHost?id='+id});
    },
    del(index){//删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        index = 5*(this.currentPage-1)+index;
        var id=this.hostData[index].id;
        console.log("删除",id);
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
    },
    // formateData(){

    // }
  },
  created(){
    // this.axios.post("/inhabitant/showInhabitants", {
    //   })
    //   .then((res) => {
    //     console.log(res.data.data)
    //   })
    //   .catch(err=> {
    //     console.log(err)
    //   })

    this.loading = false;
    this.hostData=hostData;//创建时获取数据
  },
  computed: {
  //   getData(){//计算当前页的数据，table绑定该值

  //  }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
#host {
  color: @fontColor;
  background-color: #f3f3f4;

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
  margin-left: 30px;
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