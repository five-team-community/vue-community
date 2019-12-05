<template>
  <div class="user-item">
    <div class="line"></div>
    <div class="content clearfix">
      <div class="name">用户名:{{user.name}}</div>
      <div class="state">与户主关系:{{user.state}}</div>
      <div class="tel">手机号:{{user.tel}}</div>
      <div class="time">身份证号:{{user.idCard}}</div>
      <div class="del">
      <el-button type="danger" plain round size="medium" @click="del" icon="el-icon-link" v-show="user.state!='房主'">解绑用户</el-button>
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
     var id=this.user.id;
      this.$emit('delFn',id); 
      this.$confirm('此操作将永久解绑该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios
        .post("/InhabitantAndHouseProperty/deleteRelationship", {
          inhabitantId:id
        })
        .then(res => {
          if(res.data.code == "200"){
            this.$message({
              type: 'success',
              message: '解绑成功!'
            });
          }
          else{
            this.$message({
              type: 'success',
              message: '解绑失败!'
            });
          }
        });
        })
        .catch(err => {
          console.log(err);
            this.$message({
          type: 'success',
          message: '解绑失败!'
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