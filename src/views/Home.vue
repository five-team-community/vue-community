<template>
  <div class="home">
    <el-container >
  <el-aside :width="navWidth" style="transition: 0.3s ease-in-out;">
    <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#2F4050"
        active-text-color="#fff"
        text-color="#fff"
        :unique-opened="true"
        :router="true">
        <el-menu-item class="nav-header" style="padding :30px 10px">
          <router-link to="/home">
            <img src="../assets/img/login-logo.png" alt v-show="!isCollapse" width="120px"/>
            <img src="../assets/img/logo.png" alt v-show="isCollapse" width="40px"/>
          </router-link>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-office-building"></i>
            <span slot="title">基础档案</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/house">房产管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/host">业主管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/serve">服务人员管理</el-menu-item>
          </el-menu-item-group>

        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-brush"></i>
            <span slot="title">物业管理</span>
          </template>
          <el-submenu index="1-1">
            <span slot="title">客服工单</span>
            <el-menu-item index="/home/needDo">我的待办</el-menu-item>
            <el-menu-item index="/home/hadDo">我的已办</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <span slot="title">报修管理</span>
            <el-menu-item index="/home/fix">报修部位</el-menu-item>
            <el-menu-item index="/home/fixMsg">报修信息</el-menu-item>
            <el-menu-item index="/home/fixMoney">收费订单</el-menu-item>
          </el-submenu>
          <el-submenu index="1-3">
            <span slot="title">家政管理</span>

            <el-menu-item index="/home/cleanMsg">家政信息</el-menu-item>
            <el-menu-item index="/home/cleanMoney">收费订单</el-menu-item>
          </el-submenu>
          <el-submenu index="1-4">
            <span slot="title">回收管理</span>
     
            <el-menu-item index="/home/recycleMsg">回收信息</el-menu-item>
            <el-menu-item index="/home/recycleMoney">收费订单</el-menu-item>
          </el-submenu>
          <el-submenu index="1-5">
            <span slot="title">开锁服务</span>
            <el-menu-item index="/home/lockPeople">合作公司</el-menu-item>
            <el-menu-item index="/home/lockMsg">开锁信息</el-menu-item>
            <el-menu-item index="/home/lockMoney">收费订单</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-coin"></i>
            <span slot="title">收费管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/waterMoney">水费账单</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/energyMoney">电费账单</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/gasMoney">气费账单</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/serveMoney">物业费账单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-school"></i>
            <span slot="title">社区运营</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/Notice">社区公告</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/activity">社区活动</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/home/info">社区资讯</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-collection-tag"></i>
            <span slot="title">平台管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/user">用户管理</el-menu-item>
          </el-menu-item-group>

        </el-submenu>
      </el-menu>
  </el-aside>
  
  <el-container>
    <el-header height="50px">
      <div class="top-left">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <button
            type="button"
            @click="change"
            class="open-btn"
            :class="{'el-icon-s-fold': !isCollapse, 'el-icon-s-unfold':isCollapse}"
          ></button>
        </el-radio-group>
      </div>
      <div class="top-right">
        <span class="welcome">欢迎您来到易居社区服务平台</span>
        <el-dropdown>
        <i class="el-icon-s-custom" style="margin-left: 15px">aaa</i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="mydata">个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
    </el-header>
    
    <el-main style="background-color: #f3f3f4;">
      <router-view />
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      navWidth:"200px",
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    change() {
      this.isCollapse = !this.isCollapse;

      if(this.navWidth == "200px"){

        this.navWidth = "65px";

      }
      else if(this.navWidth == "65px"){
        this.navWidth = "200px";
      }
      
    },
    mydata(){
      console.log("aaa");
      this.$router.push({path:'/home/myData'});
    },
    logout(){
      sessionStorage.clear();
      this.$router.replace({path:'/login'});
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
.welcome{
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.nav-header a{
  display: inline-block;
  width: 100%;
  height: 100%;
}
.top-right a{
  color: @fontColor;
}
.el-aside{
  background: @navColor;
}
.right {
  background: #2F4050;
}
.main {
  background: white;
  margin-left: 200px;
  transition: 0.3s ease-in-out;
}
.main-open {
  margin-left: 65px;
}
.open-btn {
  color: white;
  background: @greenColor;
  padding: 5px 10px;
  border-radius: 2px;
  border: none;
  font-size: 20px;
}
.nav-header {
  background: url("../assets/img/header-profile.png") center;
  width: 100%;
  height: 120px;
  padding-top: 30px;
  text-align: center
}

.el-menu {
  background: @navColor;
  border-right: none;
}
.el-submenu__title:hover {
  background-color: @navChoose;
}
.el-header{
  padding: 10px 20px;
}
.top-left {
  float: left;
  // margin-left: 10px;
}
.top-right{
  float: right;
}

.el-main{
  padding: 20px 10px;
}
</style>