<template>
  <div id="Login">
    <div class="login-box">
      <div class="title">
        登录
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"Login",
}
</script>

<style lang="less" scoped>
@import '../assets/less/base.less';

#Login{
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(../assets/img/login-bg.png);
}

</style>