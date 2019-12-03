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
      <div class="main">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2">
            <div class="item-title">头像:</div>
          </el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10">
            <div class="msg">
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
var serveData = {
  id: 1,
  name: "aaa",
  img: require("@/assets/img/logo.png"),
  // img:"http://172.16.6.43:8080/test/img1.jpg",
  tel: "12324234",
  sex: "男",
  age: "30",
  idCard: "513022199802168027",
  identity: "家政",
  experience: "2年",
  serve: "厨房打扫",
  address: "四川省成都市",
  isEmpty: "空闲",
  nation: "汉族",
  education: "高中",
  work:
    "fdskfhkajfhkashfkasjhfkjashfkasfkjjjjjasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  train: "assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
  link: "2324"
};
export default {
  data() {
    return {
      serveData: {}
    };
  },

  methods: {
    back() {
      //返回房产信息列表
      this.$router.push({ path: "/home/serve" });
    }
  },
  created() {
    //创建时获取数据
    this.serveData = serveData;
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
#show-serve {
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