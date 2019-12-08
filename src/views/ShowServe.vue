<template>
  <div id="show-serve">
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-s-order"></i>
        <span>服务人员信息详情</span>

        <!-- 返回按钮 -->
        <div class="back">
          <el-button round size="mini" class="back-btn" icon="el-icon-arrow-left" @click="back">返回</el-button>
        </div>
      </div>
      <div class="main" v-loading="loading">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">头像:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div>
              <el-avatar shape="square" :size="100" :src="serveData.img" class="serve-img"></el-avatar>
            </div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">姓名:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.name}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">性别:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.sex}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">年龄:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.age}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">身份证号:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.idCard}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">电话号码:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.tel}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">民族:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.nation}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">学历:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.education}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">身份:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.identity}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">是否空闲:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.isEmpty}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">服务内容:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.serve}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">经验:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.experience}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">家庭住址:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.address}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">关联用户:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">{{serveData.link}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">工作经历:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg" style="word-wrap: break-word; padding-right:50px;">{{serveData.work}}</div>
          </el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">培训经历:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg" style="word-wrap: break-word; padding-right:50px;">{{serveData.train}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
// 模拟数据

export default {
  data() {
    return {
      loading: true,  //加载标识符
      serveData: {}
    };
  },

  methods: {
    back() {
      //返回房产信息列表
      this.$router.push({ path: "/home/serve" });
    },
    getAge(idCard){
      var myDate = new Date();
      var month = myDate.getMonth() + 1;
      var day = myDate.getDate();
      var age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
      if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day) {
      age++;
      }
      return age;
    },
    formateData(item){
      var data = {};
      data.id = item.staffId;
      data.img = this.$store.state.ip+'/'+item.photo;
      data.name = item.staffName;
      data.sex = item.staffSex;
      data.tel = item.telNum;
      data.idCard = item.idCardNo;
      data.age = this.getAge(item.idCardNo);
      data.identity = item.staffType;
      data.experience = item.workExperience;
      data.serve = item.serviceItem;
      data.address = item.staffAddr;
      data.isEmpty = item.isFree;
      data.nation = item.staffNation;
      data.education = item.education;
      data.work = item.experienceInfo||"无";
      data.train = item.trainInfo||"无";
      data.link = item.user.userName;
      console.log(data);
      return data;
    }
  },
  created() {
    //************************获取数据**********************
     this.axios.post("/staff/showSingle", {
      id:this.$route.params.id
    })
    .then(res => {
      console.log(res.data);
      this.serveData = this.formateData(res.data.data.data)
      this.loading=false;
    })
    .catch(err=> {
      console.log(err);
    })
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
#show-serve {
  color: @fontColor;
  background-color: white;
  height: 100%;
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
    .back-btn {
      padding: 5px;
    }
  }
}
.serve-img {
  margin-top: 15px;
}
.main {
  padding: 20px;
}
.choose .el-button--text {
  margin-top: 10px;
  color: #a7b1c2;
  padding: 15px 20px;
}
.btn-choose.el-button--text {
  color: @fontColor;
  border: 1px solid @lineColor;
}
.tab-content {
  border: 1px solid @lineColor;
}
.item-title {
  color: @fontColor;
  font-weight: 600;
  text-align: right;
  line-height: 45px;
  font-size: 14px;
}
.msg {
  color: @fontColor;
  line-height: 45px;
  height: 45px;
  font-size: 14px;
}
@media screen and (max-width: 768px) {
  .item-title {
    text-align: left;
  }
}
.el-tabs--border-card > .el-tabs__content {
  padding: 30px;
}
.add-btn {
  text-align: right;
  padding: 5px 20px;
  padding-top: 20px;
  margin-top: 30px;
  border-top: 1px solid @lineColor;
}
.searchTel-btn {
  background: @blueColor;
  border-color: @blueColor;
}
</style>