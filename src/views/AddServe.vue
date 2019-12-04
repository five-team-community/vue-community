<template>
  <div class="addserve">
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-edit"></i>
        <span>新增服务人员信息</span>

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
          <el-upload
            name="photo"
            class="avatar-uploader"
            action="http://172.16.6.43:8080/user/testFile"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="this.form.img" :src="this.$store.state.ip+'/'+this.form.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
          <el-input v-model="form.idCard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>

        <el-form-item label="性别:" :rules="{ required: true, message: '性别不能为空', trigger: ['blur','change']}">
          <el-radio-group v-model="form.sex" :disabled="true" >
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄:" prop="age" :rules="{ required: true, message: '年龄不能为空', trigger: ['blur','change']}">
          <el-input v-model="form.age" placeholder="请输入年龄" ></el-input>
        </el-form-item>

        <el-form-item label="民族:" prop="nation" :rules="{ required: true, message: '年龄不能为空', trigger: ['blur','change']}">
          <el-input v-model="form.nation" placeholder="请输入民族"></el-input>
        </el-form-item>

        <el-form-item label="学历:" prop="education" :rules="{ required: true, message: '年龄不能为空', trigger: ['blur','change']}">
          <el-input v-model="form.education" placeholder="请输入从业/就读单位"></el-input>
        </el-form-item>

        <el-form-item label="身份:" prop="identity" :rules="{ required: true, message: '身份不能为空', trigger: ['blur','change']}">
          <el-radio-group v-model="form.identity" >
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
        id: null,
        name: "",
        img: "",
        sex: "",
        age: "",
        tel:"",
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
      area: {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      }
    };
  },
  methods: {
    handleSuccess(res, file) {
      console.log(res.data.filePath);
      console.log(URL.createObjectURL(file.raw));
      this.form.img = res.data.filePath;
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
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
        await this.go(value.length);
        callback();
      } else {
        callback(new Error("身份证号码不正确"));
      }
    },

    // 实现自动生成生日，性别，年龄
    go(val) {
      let iden = this.form.idCard;
      let sex = null;

      if (val === 18) {
        sex = iden.substring(16, 17);
      }
      if (val === 15) {
        sex = iden.substring(13, 14);
      }

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
      //  *******************************新增****************************
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post("/staff/addStaff", {
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
              console.log(res.data);
              if(res.data.code=="add_success"){
                this.$router.replace("/home/serve" );
              }
            })
            .catch(err=> {
              console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>
<style lang="less" >
@import "../assets/less/base.less";
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: @greenColor;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
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