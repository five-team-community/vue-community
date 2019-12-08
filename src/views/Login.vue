<template>
  <div id="Login">
    <div class="login-box">
      <div class="title">
        <img src="../assets/img/login-logo.png" alt />
      </div>
      <div class="login-item">
        <input type="text" name="username" placeholder="用户名" v-model="username"/>
      </div>
      <div class="login-item">
        <input type="password" name="password" placeholder="密码" v-model="password"/>
      </div>
      <div class="login-item">
        <input type="button" name="login-btn" value="立即登录" class="login-btn" @click='login'/>
      </div>
    </div>
  </div>
</template>
<script>
import crypto from 'crypto'
export default {
  name: "Login",
  data(){
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login(){
      console.log("你点击了登录",this.username,this.password);
      const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
      const newPass = md5.update(this.password).digest("hex"); // 加密
      console.log(newPass);

      // *********************登录******************************

      this.axios.post("/user/login", {
        userName: this.username,
        userPasswd: newPass
      })
      .then((res) => {
        console.log(res)
        if(res.data.code == "success") {

          // 保存token
          var token = res.data.data.token;
          var validateId = res.data.data.validateId;
          sessionStorage.setItem("validateId",validateId);
          sessionStorage.setItem("token", token);


          sessionStorage.setItem('userId',res.data.data.user.userId);
          sessionStorage.setItem('userName',res.data.data.user.userName);
          sessionStorage.setItem('userRole',res.data.data.user.roles[0].roleName);


          //获取参数（未登录时想访问的路由）
          var url = this.$route.query.redirect;

          url = url ? url : "/home/house"
          // 切换路由
          this.$router.replace(url)
        } else {
          console.log(res.data.message);
          this.$message.error(res.data.message);
        }
      })
      .catch(err=> {
        console.log(err)
      })
      
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

#Login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(../assets/img/login-bg.png) center;
  background-size: cover;
}

.login-box {
  width: 300px;
  position: fixed;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  background: #f0edff;
  border-radius: 5px;
  padding: 30px 10px;
}
.title {
  width: 160px;
  margin: 0 auto;
}
.title img {
  width: 100%;
}
.login-item {
  width: 270px;
  margin: 25px auto;
}
.login-item input {
  height: 35px;
  border-radius: 3px;
  width: 260px;
  border: 1px solid #ddd;
  padding: 0 5px;
}
.login-item .login-btn{
  height: 45px;
  border-radius: 5px;
  background: @yellowColor;
  color: white;
  cursor: pointer;
}
.login-item .login-btn:hover{
  background: @lightYellowColor;
}
</style>