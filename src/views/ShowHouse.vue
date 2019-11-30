<template>
  <div id="show-house">
    <div class="content">

      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-s-order"></i>
        <span>房产信息详情</span>

        <!-- 返回按钮 -->
        <div class="back">
          <el-button round size='mini' class="back-btn" icon='el-icon-arrow-left' @click="back">返回</el-button>
        </div>
      </div>
      <div class="main">
        <el-tabs type="border-card">

          <!-- 基本信息 -->
          <el-tab-pane>
            <span slot="label"><i class="el-icon-s-management"></i> 基本信息</span>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">房号:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.housePropertyNo}}</div></el-col>
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">名称:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.houseName}}</div></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">房产性质:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.houseNature}}</div></el-col>
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">建筑面积:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.houseArea}}</div></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">户型:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.houseStyle}}</div></el-col>
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">业主名称:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.ownerName}}</div></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">预留电话:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.ownerPhone}}</div></el-col>
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">交房时间:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{houseData.ownerTime}}</div></el-col>
            </el-row>
          </el-tab-pane>

          <!-- 绑定用户 -->
           <el-tab-pane>
            <span slot="label"><i class="el-icon-user-solid"></i> 绑定用户</span>

            <!-- 每条数据信息的组件 -->
            <userItem v-for="item in userList" :key="item.id" :user="item"></userItem>

            <!-- 新增按钮 -->
            <div class="add-btn">
              <el-button type="primary" plain round size="medium" @click="dialogFormVisible = true" icon="el-icon-plus">新增绑定</el-button>
              <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
                <el-dialog title="新增绑定" :visible.sync="dialogFormVisible" :center="true" width="400px">
                  <el-form :model="form" :inline="true">
                    <el-form-item>
                      <el-input v-model="form.tel" aria-placeholder="请输入手机号查找注册用户"></el-input>
                    </el-form-item>
                    <el-form-item >
                      <el-button type="primary" class="searchTel-btn" @click="searchUserTel">查询</el-button>
                    </el-form-item>
                    <el-form-item v-if="usermsg.state==200">
                      用户名:{{usermsg.data.name}}<br>
                      联系电话:{{usermsg.data.tel}}
                    </el-form-item>
                    <el-form-item v-else>
                      {{usermsg.msg}}
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addBind">确 定</el-button>
                  </div>
                </el-dialog>


                <!-- <el-form :inline="true" :model="searchTel" class="demo-form-inline">
                  <el-form-item label="">
                    <el-input v-model="searchTel.tel" placeholder="请输入手机号查找注册用户"></el-input>
                  </el-form-item>
                  
                  <el-form-item>
                    <el-button type="primary" class="searchTel-btn" @click="searchUserTel">查询</el-button>
                  </el-form-item>
                </el-form> -->

            </div>
            
          </el-tab-pane>
        </el-tabs>
        
      </div>
    </div>
  </div>
</template>
<script>
import UserItem from '../components/UserItem'
// 模拟数据
var houseData = {
  housePropertyId:1,
  housePropertyNo:"111",
  houseName:"瑞通生活社区东1幢1单元RTSH-FJ-001室",
  houseNature:"商用",
  houseArea:99.00,
  houseStyle:"三居室",
  ownerName:"林海",
  ownerPhone:"16832428374",
  ownerTime:"2018-08-09"
};
var userList=[
  {
    inhabitantId:1,
    inhabitantName:"aaa",
    ownerName:"bbb",
    telNum:"12324",
    checkInTime:"2019-08-07"
  },
   {
    inhabitantId:2,
    inhabitantName:"aaa",
    ownerName:"bbb",
    telNum:"12324",
    checkInTime:"2019-08-07"
  },
   {
    inhabitantId:3,
    inhabitantName:"aaa",
    ownerName:"bbb",
    telNum:"12324",
    checkInTime:"2019-08-07"
  },
   {
    inhabitantId:4,
    inhabitantName:"aaa",
    ownerName:"bbb",
    telNum:"12324",
    checkInTime:"2019-08-07"
  },
   {
    inhabitantId:5,
    inhabitantName:"aaa",
    ownerName:"bbb",
    telNum:"12324",
    checkInTime:"2019-08-07"
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
    UserItem//引入组件
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