<template>
  <div id="show-house">
    <div class="content">

      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-s-management"></i>
        <span>业主信息详情</span>

        <!-- 返回按钮 -->
        <div class="back">
          <el-button round size='mini' class="back-btn" icon='el-icon-arrow-left' @click="back">返回</el-button>
        </div>
      </div>
      <div class="main">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="3" ><div class="item-title">绑定用户:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="9" ><div class="msg">{{houseData.link}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="3" ><div class="item-title">绑定房产:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="9" ><div class="msg">{{houseData.no}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="3" ><div class="item-title">真实姓名:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="9" ><div class="msg">{{houseData.name}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="3" ><div class="item-title">预留手机号:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="9" ><div class="msg">{{houseData.tel}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="3" ><div class="item-title">身份证号码:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="9" ><div class="msg">{{houseData.idCard}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="3" ><div class="item-title">性别:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="9" ><div class="msg">{{houseData.sex}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="3" ><div class="item-title">籍贯:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="9" ><div class="msg">{{houseData.birthplace}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="3" ><div class="item-title">出生年月:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="9" ><div class="msg">{{houseData.birthday}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="3" ><div class="item-title">职业:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="9" ><div class="msg">{{houseData.work}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="3" ><div class="item-title">从业/就读单位:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="9" ><div class="msg">{{houseData.workPlace}}</div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>

// 模拟数据
var houseData = {
  id:1,
  no:"1",
  name:"aaa",
  tel:"1232434",
  sex:'男',
  idCard:'513022199802168027',
  time:"2019-08-07",
  link:'bbb',
  birthday:'1998-03-08',
  birthplace:'四川',
  work:'aaa',
  workPlace:'ccc',
};
export default {
  data() {
    return {  
      houseData: {},//房产信息
      userList:[],//绑定用户
      dialogFormVisible: false,
      form: {
        tel:''
      },
      usermsg: {}
    };
  },
  components: {

  },
  methods: {
    back(){//返回房产信息列表
      this.$router.push({path:'/home/host'});
    },
    searchUserTel(){
      console.log(this.usermsg.data);
    },
    addBind(){
      if(!this.usermsg.state){
        this.$message.error("请输入要绑定的用户手机号");
      }
      else if(this.usermsg.state==200){
        console.log(this.usermsg.data.id);
        this.usermsg={};
        this.form.tel="";
        this.dialogFormVisible = false;
      }
      else{
        this.$message.error(this.usermsg.msg);
      }
    }
  },
  created() {//创建时获取数据
    this.houseData = houseData;

  },
  computed: {}
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
#show-house {
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
  .back {
    float: right;
    .back-btn{
      padding: 5px;
    }
  }
}
.main{
  padding: 20px;
}
.choose .el-button--text{
  margin-top: 10px;
  color: #A7B1C2;
  padding: 15px 20px;
}
.btn-choose.el-button--text{
  color: @fontColor;
  border: 1px solid @lineColor;
}
.tab-content{
  border: 1px solid @lineColor;
}
.item-title{
  color: @fontColor;
  font-weight: 600;
  text-align: right;
  line-height: 45px;
  font-size: 14px;
}
.msg{
  color: @fontColor;
  line-height: 45px;
  font-size: 14px;
}
@media screen and (max-width: 768px) {
  .item-title{
    text-align: left;
  }
}
.el-tabs--border-card>.el-tabs__content{
  padding: 30px;
}
.add-btn{
  text-align: right;
  padding: 5px 20px;
  padding-top:20px;
  margin-top: 30px;
  border-top: 1px solid @lineColor;
}
.searchTel-btn{
  background: @blueColor;
  border-color: @blueColor;
}
</style>