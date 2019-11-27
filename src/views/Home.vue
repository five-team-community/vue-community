<template>
  <div class="home">
    <div class="nav">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#2F4050"
        active-text-color="#fff"
        text-color="#fff"
        unique-opened=true
        router=true
      >
        <div class="nav-header">
          <div class="nav-header-l" v-show="!isCollapse">
            <img src="../assets/img/login-logo.png" alt />
          </div>
          <div class="nav-header-s" v-show="isCollapse">
            <img src="../assets/img/logo.png" alt />
          </div>
        </div>
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
          <!-- <el-menu-item-group>
            <el-menu-item index="1-3">服务人员管理</el-menu-item>
          </el-menu-item-group> -->
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
            <el-menu-item index="/home/cleanPeople">人员管理</el-menu-item>
            <el-menu-item index="/home/cleanMsg">家政信息</el-menu-item>
            <el-menu-item index="/home/cleanMoney">收费订单</el-menu-item>
          </el-submenu>
          <el-submenu index="1-4">
            <span slot="title">回收管理</span>
            <!-- <el-menu-item index="1-4-1">回收物品</el-menu-item> -->
            <el-menu-item index="/home/recycleMsg">回收信息</el-menu-item>
            <el-menu-item index="/home/recycleMoney">收费订单</el-menu-item>
          </el-submenu>
          <el-submenu index="1-4">
            <span slot="title">开锁服务</span>
            <el-menu-item index="/home/lockPeople">人员管理</el-menu-item>
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
            <el-menu-item index="/home/hotic">社区公告</el-menu-item>
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
          <el-menu-item-group>
            <el-menu-item index="/home/role">角色管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main" :class="{'main-open':isCollapse}">
      <div class="top">
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
        <div class="top-right"></div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      isCollapse: false,
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
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.nav {
  float: left;
  height: 100%;
  background: @navColor;
  i {
    color: white;
  }
}
.main{
  margin-left: 200px;
  transition: .3s ease-in-out
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
  padding: 30px 0;
}
.nav-header-l {
  width: 120px;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
.nav-header-s {
  width: 40px;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
.el-menu {
  background: @navColor;
  border-right: none;
}
.el-submenu__title:hover {
  background-color: @navChoose;
}
.top {
  height: 30px;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  .top-left {
    float: left;
    height: 100%;
    margin-left: 20px;
  }
}
</style>