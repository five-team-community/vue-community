<template>
  <div id="house">
    <div class="content">
      <div class="title">
        <i class="el-icon-s-order">房产列表</i>
      </div>
      <div class="choose"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
#house {
  color: @fontColor;
  background-color: #f3f3f4;
  padding: 20px 10px;
}
.content{
  background: white;
  margin-left: 10px
}
.title{
  margin-left: 10px;
}
</style>