<template>
  <div id="show-house">
    <div class="content">

      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-s-order"></i>
        <span>用户信息详情</span>

        <!-- 返回按钮 -->
        <div class="back">
          <el-button round size='mini' class="back-btn" icon='el-icon-arrow-left' @click="back">返回</el-button>
        </div>
      </div>
      <div class="main" v-loading="loading">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">用户名:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{userData.name}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">真实姓名:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{userData.realName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">电话:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{userData.tel}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">状态:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{userData.state}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">用户类型:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{userData.role}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">注册时间:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{userData.registerTime}}</div>
          </el-col>
        </el-row>
          <el-row :gutter="10">
          
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">上次登录时间:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{userData.loginTime}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">上次退出时间:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{userData.logoutTime}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>



export default {
  data() {
    return {  
      loading: true,
      houseData: {},//房产信息
      userList:[],//绑定用户
      dialogFormVisible: false,
      form: {
        tel:''
      },
      userData: {}
    };
  },
  methods: {
    back(){//返回房产信息列表
      this.$router.push({path:'/home/user'});
    },
    searchUserTel(){
      console.log(this.userData.data);
    },
     addZero(v) {
      return v < 10 ? "0" + v : v;
    },
    switchTimeFormat(time) {
      const dateTime = new Date(time);
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const date = dateTime.getDate();

      return `${year}-${this.addZero(month)}-${this.addZero(date)}`;
    },
    formateData(item){
      var data={};
      data.name=item.userName;
      data.realName = item.realName;
      if (item.userState == 1) {
          data.state = "正常";
        } else {
          data.state = "禁用";
        }

      data.tel = item.telNum;
      data.role = item.roleName;
      data.registerTime = item.registerTime;
      data.loginTime = this.switchTimeFormat(item.loginTime);
      data.logoutTime = this.switchTimeFormat(item.logoutTime)||"无";
      return data;
    }

  },
  created() {//创建时获取数据
    this.axios
      .post("/user/showSingle", {
        userId:this.$route.params.id
      })
      .then(res => {
        console.log("查询", res);
        this.userData = this.formateData(res.data.data.data);
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
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
.msg{
  height: 40px;
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