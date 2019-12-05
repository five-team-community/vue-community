<template>
  <div class="alterUser">
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-edit"></i>
        <span>修改用户信息</span>

        <!-- 返回按钮 -->
        <div class="back">
          <el-button round size="mini" class="back-btn" icon="el-icon-arrow-left" @click="back">返回</el-button>
        </div>
      </div>
      <!-- 表单内容 -->
      <el-form
        :model="form"
        class="main"
        size="medium"
        status-icon
        label-width="100px"
        ref="ruleForm"
      >
        <el-form-item
          label="用户名:"
          prop="name"
          :rules="{ required: true, message: '用户名不能为空', trigger: ['blur','change']}"
        >
          <el-input v-model="form.name" placeholder="真实请输入用户名" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item
          label="真实姓名:"
          prop="realName"
          :rules="{ required: true, message: '真实姓名不能为空', trigger: ['blur','change']}"
        >
          <el-input v-model="form.realName" placeholder="真实请输入真实姓名" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="手机号:"
          prop="tel"
          :rules="[phone,{ required: true, message: '手机号不能为空', trigger: ['blur','change']}]"
        >
          <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item
          label="用户类型:"
          prop="role"
          :rules="{ required: true, message: '用户类型不能为空', trigger: ['blur','change']}"
        >
          <el-radio-group v-model="form.role" :disabled="true">
            <el-radio label="管理员" value="管理员"></el-radio>
            <el-radio label="服务人员" value="服务人员"></el-radio>
            <el-radio label="普通住户" value="住户"></el-radio>
            <el-radio label="业主" value="业主"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="control">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-edit"
            @click="resetPwd"
            class="resetPwd"
          >重置密码</el-button>
          <el-button type="danger" icon="el-icon-close" @click="back">取消</el-button>
          <el-button @click="resetForm('ruleForm')" class="reset-btn" icon="el-icon-refresh-left">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" icon="el-icon-document-add">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import crypto from "crypto";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      imageUrl: "",
      fileList: [],
      form: {},
      phone: { validator: checkPhone, trigger: ["blur", "change"] }
    };
  },
  methods: {
    back() {
      //返回房产信息列表
      this.$router.push({ path: "/home/user" });
    },
    resetPwd() {
      const md5 = crypto.createHash("md5"); // md5 加密，不可逆加密
      var n = md5.update("123456").digest("hex"); // 加密
      console.log(n);
      this.$confirm("此操作会将密码重置为123456, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // ****************************************重置请求**********************************************
          this.axios
            .post("/user/resetPassword", {
              userId: this.$route.params.id
            })
            .then(res => {
              console.log("重置", res);
              if (res.data.code == "reset_success") {
                this.$message({
                  type: "success",
                  message: "重置密码成功!"
                });
              }
              // console.log(this.form);
              // this.loading = false;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置密码"
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // ************************************修改***********************************
          this.axios
            .post("/user/modifyUser", {
              userId: this.$route.params.id,
              realName: this.form.realName,
              roleName: this.form.role,
              telNum: this.form.tel
            })
            .then(res => {

              console.log("修改", res.data);
              if (res.data.code == "modify_success") {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.back();
              } else {
                this.$message({
                  type: "error",
                  message: "修改失败!"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "修改失败!"
              });
              console.log(err);
            });
        } else {
           this.$message({
            type: "error",
            message: "有输入不合规范!"
          });
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    formateData(item) {
      var data = {};
      data.name = item.userName;
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
      data.logoutTime = this.switchTimeFormat(item.logoutTime) || "无";
      return data;
    }
  },

  created() {
    console.log("aaa");
    this.axios
      .post("/user/showSingle", {
        userId: this.$route.params.id
      })
      .then(res => {
        console.log("查询", res);
        this.form = this.formateData(res.data.data.data);
        console.log(this.form);
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";

.alterUser {
  color: @fontColor;
  background-color: white;
  height: 100%;
}
.resetPwd {
  background: @yellowColor;
  border-color: @yellowColor;
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
.main {
  padding: 20px;
}
.el-form--inline .el-form-item {
  width: 500px;
}

.el-input--medium,
.el-select,
.time-input {
  width: 300px;
}
.reset-btn {
  background: @blueGreenColor;
  color: white;
  border-color: @blueGreenColor;
}
.el-form--inline .control {
  text-align: right;
  width: 100%;
}
</style>