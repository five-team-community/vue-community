<template>
  <div class="addserve">
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
          <el-input v-model="form.name" placeholder="请输入用户名" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="真实姓名:"
          prop="realName"
          :rules="{ required: true, message: '真实姓名不能为空', trigger: ['blur','change']}"
        >
          <el-input v-model="form.name" placeholder="真实请输入真实姓名" autocomplete="off"></el-input>
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
          <el-radio-group v-model="form.role">
            <el-radio label="管理员" value="管理员"></el-radio>
            <el-radio label="服务人员" value="服务人员"></el-radio>
            <el-radio label="普通用户" value="普通用户"></el-radio>
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
    // 身份证验证
    async validID(rule, value, callback) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(value)) {
        await this.go();
        callback();
      } else {
        callback(new Error("身份证号码不正确"));
      }
    },

    // 实现自动生成生日，性别，年龄
    go() {
      let iden = this.form.idCard;
      let sex = null;
      sex = iden.substring(16, 17);
      sex = iden.substring(13, 14);
      if (sex % 2 === 0) sex = "女";
      else sex = "男";
      this.form.sex = sex;
    },
    resetPwd() {
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
            .post("/staff/modifySingle", {
              staffId: this.form.id,
              photo: this.form.img,
              staffName: this.form.name,
              telNum: this.form.tel,
              idCardNo: this.form.idCard,
              staffSex: this.form.sex,
              staffNation: this.form.nation,
              education: this.form.education,
              staffType: this.form.identity,
              workExperience: this.form.experience,
              staffAddr: this.form.address,
              serviceItem: this.form.serve,
              experienceInfo: this.form.work,
              trainInfo: this.form.train,
              checkInTime: new Date()
            })
            .then(res => {
              console.log("修改", res.data);
              if (res.data.code == "200") {
                this.$router.replace("/home/serve");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
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
  // computed: {
  //   gettel() {
  //     console.log(this.form.link);
  //     if (this.form.link == "0" || this.form.link) {
  //       console.log(this.userList[this.form.link]);
  //       return this.userList[this.form.link].tel;
  //     } else {
  //       return null;
  //     }
  //   }
  // },
  created() {
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

.addHouse {
  color: @fontColor;
  background-color: #f3f3f4;

  min-height: 500px;
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