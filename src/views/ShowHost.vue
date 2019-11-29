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
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">房号:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.no}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">名称:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.name}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">房产性质:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.nature}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">建筑面积:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.area}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">户型:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.type}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">业主名称:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.host}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">预留电话:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.tel}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">交房时间:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.time}}</div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>

// 模拟数据
var houseData = {
  no:"111",
  name:"瑞通生活社区东1幢1单元RTSH-FJ-001室",
  nature:"商用",
  area:99.00,
  type:"三居室",
  host:"林海",
  tel:"16832428374",
  time:"2018-08-09"
};
var userList=[
  {
    id:1,
    name:"aaa",
    host:"bbb",
    tel:"12324",
    time:"2019-08-07"
  },
   {
    id:2,
    name:"aaa",
    host:"bbb",
    tel:"12324",
    time:"2019-08-07"
  },
   {
    id:3,
    name:"aaa",
    host:"bbb",
    tel:"12324",
    time:"2019-08-07"
  },
   {
    id:4,
    name:"aaa",
    host:"bbb",
    tel:"12324",
    time:"2019-08-07"
  },
   {
    id:5,
    name:"aaa",
    host:"bbb",
    tel:"12324",
    time:"2019-08-07"
  }
]
var usermsg={
    state:200,
    msg:"查询失败！",
    data:{
      id:1,
      name:"aa",
      tel:"123",
    }

}
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
      this.$router.push({path:'/home/house'});
    },
    searchUserTel(){
      this.usermsg=usermsg;
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
    this.userList = userList;
  },
  computed: {}
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
#show-house {
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