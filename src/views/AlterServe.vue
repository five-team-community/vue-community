<template>
  <div class="addserve">
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-edit"></i>
        <span>修改服务人员信息</span>

        <!-- 返回按钮 -->
        <div class="back">
          <el-button round size="mini" class="back-btn" icon="el-icon-arrow-left" @click="back">返回</el-button>
        </div>
      </div>
      <!-- 表单内容 -->
      <el-form
        :inline="true"
        :model="form"
        class="main"
        size="medium"
        status-icon
        label-width="100px"
        ref="ruleForm"
      >
        <el-form-item label="员工头像:" prop="link">
          <el-avatar shape="square" :size="100" :src="form.fullimg" class="serve-img" style="float:left"></el-avatar>
          <el-upload
            name="photo"
            class="avatar-uploader"
            :action="this.$store.state.ip+'/user/testFile'"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary" >更换头像</el-button>
          </el-upload>

        </el-form-item>

        <el-form-item
          label="真实姓名:"
          prop="name"
          :rules="{ required: true, message: '姓名不能为空', trigger: ['blur','change']}"
        >
          <el-input v-model="form.name" placeholder="请输入姓名" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="手机号:"
          prop="tel"
          :rules="[phone,{ required: true, message: '手机号不能为空', trigger: ['blur','change']}]"
        >
          <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item
          label="身份证号码:"
          prop="idCard"
          :rules="[{ validator: this.validID, trigger: ['blur','change']},{ required: true, message: '身份证号码不能为空', trigger: ['blur','change']}]"
        >
          <el-input v-model="form.idCard" placeholder="请输入身份证号码" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item
          label="性别:"
          :rules="{ required: true, message: '性别不能为空', trigger: ['blur','change']}"
        >
          <el-radio-group v-model="form.sex" :disabled="true">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="年龄:"
          prop="age"
          :rules="{ required: true, message: '年龄不能为空', trigger: ['blur','change']}"
        >
          <el-input v-model="form.age" placeholder="请输入年龄" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item
          label="民族:"
          prop="nation"
          :rules="{ required: true, message: '年龄不能为空', trigger: ['blur','change']}"
        >
          <el-input v-model="form.nation" placeholder="请输入民族"></el-input>
        </el-form-item>

        <el-form-item
          label="学历:"
          prop="education"
          :rules="{ required: true, message: '年龄不能为空', trigger: ['blur','change']}"
        >
          <el-input v-model="form.education" placeholder="请输入从业/就读单位"></el-input>
        </el-form-item>

        <el-form-item
          label="身份:"
          prop="nation"
          :rules="{ required: true, message: '身份不能为空', trigger: ['blur','change']}"
        >
          <el-radio-group v-model="form.sex">
            <el-radio label="家政"></el-radio>
            <el-radio label="回收"></el-radio>
            <el-radio label="维修"></el-radio>
          </el-radio-group>
        </el-form-item>

         <el-form-item label="经验:" prop="experience" :rules="{ required: true, message: '经验不能为空', trigger: ['blur','change']}">
          <el-input v-model="form.experience" placeholder="请输入经验,例如:2年"></el-input>
        </el-form-item>

        <el-form-item label="家庭住址:" prop="address" :rules="{ required: true, message: '家庭住址不能为空', trigger: ['blur','change']}">
          <el-input v-model="form.address" placeholder="请输入家庭住址"></el-input>
        </el-form-item>

        <el-form-item label="服务内容:" prop="serve" :rules="{ required: true, message: '服务内容不能为空', trigger: ['blur','change']}">
          <el-input type="textarea" v-model="form.serve" placeholder="请输入服务内容"></el-input>
        </el-form-item>

        <el-form-item label="工作经历:" prop="work" >
          <el-input type="textarea" v-model="form.work" placeholder="请输入工作经历"></el-input>
        </el-form-item>

        <el-form-item label="培训经历:" prop="train" >
          <el-input type="textarea" v-model="form.train" placeholder="请输入培训经历"></el-input>
        </el-form-item>

        <el-form-item class="control">
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
      form: {
        fullImg:'',
        id: null,
        name: "",
        img: "",
        sex: "",
        tel:'',
        age: "",
        idCard: "",
        identity: "",
        experience: "",
        serve: "",
        address: "",
        isEmpty: "",
        nation: "",
        education: "",
        work: "",
        train: "",
      },
      phone: { validator: checkPhone, trigger: ["blur", "change"] },
    };
  },
  methods: {
    handleSuccess(res) {
      console.log(res.data.filePath);
      this.form.img = res.data.filePath;
      this.form.fullimg=this.$store.state.ip+'/'+this.form.img
      console.log(this.form.fullimg);
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG||isPNG)) {
        this.$message.error("上传头像图片只能是 JPG和 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    back() {
      //返回房产信息列表
      this.$router.push({ path: "/home/serve" });
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
      var myDate = new Date();
      var month = myDate.getMonth() + 1;
      var day = myDate.getDate();
      var age = myDate.getFullYear() - iden.substring(6, 10) - 1;
      if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) {
      age++;
      }
      this.form.age = age;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // ************************************修改***********************************
            this.axios.post("/staff/modifySingle", {
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
              console.log("修改",res.data);
              if(res.data.code=="200"){
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.$router.replace("/home/serve" );
              }
              else{
                this.$message({
                  type: "error",
                  message: "修改失败!"
                });
              }
            })
            .catch(err=> {
              this.$message({
                type: "error",
                message: "修改失败!"
              });
              console.log(err);
            })

        } else {
          this.$message({
            type: "error",
            message: "输入存在不合法!"
          });
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    formateData(item){
      var data = {};
      data.id = item.staffId;
      data.img = item.photo;
      data.fullimg = this.$store.state.ip+'/'+data.img;
      data.name = item.staffName;
      data.sex = item.staffSex;
      data.tel = item.telNum;
      data.idCard = item.idCardNo;
      data.identity = item.staffType;
      data.experience = item.workExperience;
      data.serve = item.serviceItem;
      data.address = item.staffAddr;
      data.isEmpty = item.isFree;
      data.nation = item.staffNation;
      data.education = item.education;
      data.work = item.experienceInfo||"无";
      data.train = item.trainInfo||"无";
      data.link = item.user.userName;
      console.log(data);
      return data;
    }
  },
  computed: {
    gettel() {
      console.log(this.form.link);
      if (this.form.link == "0" || this.form.link) {
        console.log(this.userList[this.form.link]);
        return this.userList[this.form.link].tel;
      } else {
        return null;
      }
    }
  },
  created() {
    //创建时获取数据
    this.axios.post("/staff/showSingle", {
      id:this.$route.params.id
    })
    .then(res => {
      console.log(res.data);
      this.form = this.formateData(res.data.data.data);
      this.go();
      console.log(this.form);
    })
    .catch(err=> {
      console.log(err);
    })
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