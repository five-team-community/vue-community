<template>
  <div class="user-item">
    <div class="line"></div>
    <div class="content clearfix">
      <div class="name">用户名:{{user.inhabitantName}}</div>
      <div class="host">关联业主:{{user.ownerName}}</div>
      <div class="tel">手机号:{{user.telNum}}</div>
      <div class="time">绑定时间:<i class="el-icon-date"></i> {{user.checkInTime}}</div>
      <div class="del">
      <el-button type="danger" plain round size="medium" @click="del" icon="el-icon-link">解绑用户</el-button>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"UserItem",
  props:{
    user:Object,
  },
  methods:{
   del(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id=this.user.inhabitantId;
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
   }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
.user-item{
  position: relative;
  padding: 5px;
  margin: 5px;
  background: #FBFBFB;
  .content>div{
    float: left;
    width: 20%;
    padding: 0 10px;
    box-sizing: border-box;
    // text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .del{
    text-align: right;
  }
  .line{
    width: 2px;
    height: 50px;
    background: #BBBBBB;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover{
    background: #E9E9E9;
    .line{
      background: @greenColor;
    }
  }
}
</style>