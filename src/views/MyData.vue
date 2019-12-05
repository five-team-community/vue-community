<template>
  <div id="myData">
    <div class="content">
      <div class="part1">
        <!-- 标题 -->
        <div class="title">
          <i class="el-icon-s-order"></i>
          <span>基本信息</span>
        </div>
        <div class="main" v-loading="loading">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">用户名:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.name}}</div>
            </el-col>
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">真实姓名:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.realName}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">电话:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.tel}}</div>
            </el-col>
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">状态:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.state}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">用户类型:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.role}}</div>
            </el-col>
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">注册时间:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.registerTime}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">上次登录时间:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.loginTime}}</div>
            </el-col>
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">上次退出时间:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.logoutTime}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12">
              <el-button type="primary" size="medium" icon="el-icon-edit" @click="altermsg">修改信息</el-button>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-button type="danger" size="medium" icon="el-icon-key" @click="openDialog">修改密码</el-button>
            </el-col>
          </el-row>
          <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :center="true" width="400px">
            <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" status-icon>
              <el-form-item label="原密码" prop="oldpass">
                <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="conclePwd">取 消</el-button>
              <el-button type="primary" @click="alterPwd">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import crypto from 'crypto'
export default {
  
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: true,
      role: "",
      ruleForm: {
        oldPass:'',
        pass: "",
        checkPass: ""
      },
      userData: {},
      dialogFormVisible: false,
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    mdPwd(pwd){
      const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
      return md5.update(pwd).digest("hex"); // 加密
    },
    altermsg() {
      console.log("aaa");
      var id=sessionStorage.getItem("userId");
      id=21;
      this.$router.push({ path: "/home/alterUser/"+id });
    },
    alterPwd() {
      console.log("bbb",this.mdPwd(this.ruleForm.oldPass),this.mdPwd(this.ruleForm.pass));
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
           this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/user/changePassword", {
              // userId: sessionStorage.getItem("userId"),
              userId:21,
              oldPassword:this.mdPwd(this.ruleForm.oldPass),
              newPassword:this.mdPwd(this.ruleForm.pass)
            })
            .then(res => {
              console.log(res);
              if(res.data.code=="validate_error"){
                this.$message({
            type: "error",
            message: res.data.message
          });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });


        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    openDialog() {
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].resetFields();
      }
      this.dialogFormVisible = true;
    },
    conclePwd() {
      this.dialogFormVisible = false;
    },
    addZero(v) {
      return v < 10 ? "0" + v : v;
    },
    switchTimeFormat(time) {
      const dateTime = new Date(time);
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const date = dateTime.getDate();

      return `${year}-${this.addZero(month)}-${this.addZero(date)}`;
    },
    formateData(item){
      var data={};
      data.name=item.userName;
      data.realName = item.realName;
      if (item.userState == 1) {
          data.state = "正常";
        } else {
          data.state = "禁用";
        }

      data.tel = item.telNum;
      data.role = item.roleName;
      data.registerTime = item.registerTime;
      data.loginTime = this.switchTimeFormat(item.loginTime);
      data.logoutTime = this.switchTimeFormat(item.logoutTime)||"无";
      return data;
    }
  },
  created() {
    //创建时获取数据
    this.axios
      .post("/user/showSingle", {
        // userId:sessionStorage.getItem("userId")
        userId:21
      })
      .then(res => {
        console.log("查询", res);
        this.userData = this.formateData(res.data.data.data);
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {}
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
.msg{
  height: 40px;
}
.el-button--medium {
  padding: 10px 100px;
  margin-left: 20px;
}
#myData {
  color: @fontColor;
  background-color: white;
  height: 100%;
}
.part1,
.part2 {
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