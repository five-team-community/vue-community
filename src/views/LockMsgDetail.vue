<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>开锁信息详情</p>
        <a href="javascript:;" class="returnBtn" @click="returnBtn">
          <i class="el-icon-caret-left"></i>返回
        </a>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="contentBox">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">房号:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">123123</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">用户:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">张大炮</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">用户联系电话:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">136567891234</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">开锁人员:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">刘师傅</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">开锁人员电话:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">12345678911</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">登记时间:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">2019-10-19</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">状态:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">已完成</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">路径:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">好</div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    returnBtn() {
      this.$router.push({path:'/home/lockMsg'});
    }
  }
}
</script>


<style lang="less" scoped>
  @import "../assets/less/base.less";
  .el-divider--horizontal {
    margin: 0;
  }
  .bg {
    /* background:#f3f3f4; */
    height:auto;
    padding:20px;
    .right {
      background: #fff;
      font-size: 13px;
      .headBox {
        text-align: left;
        padding: 14px 20px 7px;
        p {
          display: inline;
          color: #606266;
          font-weight: 600;
        }
        .returnBtn {
          border: 1px solid #23c6c8;
          padding: 1px 5px;
          border-radius: 50px;
          color: #23c6c8;
          float: right;
        }
      }
      .contentBox {
        padding: 20px;
        .CBtitle{
          color: @fontColor;
          font-weight: 600;
          text-align: right;
          line-height: 45px;
          font-size: 14px;
        }
        .CBmsg{
          color: @fontColor;
          line-height: 45px;
          font-size: 14px;
        }
      }
    }
  }
</style>