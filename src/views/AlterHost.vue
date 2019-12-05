<template>
  <div class="addHouse">
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-edit"></i>
        <span>修改业主信息</span>

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
        label-width="120px"
        ref="ruleForm"
      >
        <el-form-item
          label="真实姓名:"
          prop="name"
          :rules="{ required: true, message: '姓名不能为空', trigger: ['blur','change']}"
        >
          <el-input v-model="form.name" placeholder="请输入姓名" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item
          label="身份证号码:"
          prop="idCard"
          :rules="[{ validator: this.validID, trigger: ['blur','change']},{ required: true, message: '身份证号码不能为空', trigger: ['blur','change']}]"
        >
          <el-input v-model="form.idCard" placeholder="请输入身份证号码" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item
          label="预留手机号:"
          prop="tel"
          :rules="[phone,{ required: true, message: '手机号不能为空', trigger: ['blur','change']}]"
        >
          <el-input v-model="form.tel" placeholder="请输入预留手机号"></el-input>
        </el-form-item>

        <el-form-item label="性别:">
          <el-radio-group v-model="form.sex" :disabled="true">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="籍贯:" prop="birthplace">
          <el-input v-model="form.birthplace" placeholder="请输入籍贯" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="出生年月:" prop="birthday">
          <el-input v-model="form.birthday" placeholder="请输入出生年月" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="职业:" prop="work">
          <el-input v-model="form.work" placeholder="请输入职业"></el-input>
        </el-form-item>

        <el-form-item label="从业/就读单位:" prop="workPlace">
          <el-input v-model="form.workPlace" placeholder="请输入从业/就读单位"></el-input>
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

    
    // 验证手机号的函数
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
      form: {},

      // 手机号验证规则
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
    back() {
      //返回房产信息列表
      this.$router.push({ path: "/home/host" });
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
      let birth = null;
      let myDate = new Date();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();

      if (val === 18) {
        sex = iden.substring(16, 17);
        birth =
          iden.substring(6, 10) +
          "-" +
          iden.substring(10, 12) +
          "-" +
          iden.substring(12, 14);
        if (
          iden.substring(10, 12) < month ||
          (iden.substring(10, 12) == month && iden.substring(12, 14) <= day)
        );
      }
      if (val === 15) {
        sex = iden.substring(13, 14);
        birth =
          "19" +
          iden.substring(6, 8) +
          "-" +
          iden.substring(8, 10) +
          "-" +
          iden.substring(10, 12);
        if (
          iden.substring(8, 10) < month ||
          (iden.substring(8, 10) == month && iden.substring(10, 12) <= day)
        );
      }

      if (sex % 2 === 0) sex = "女";
      else sex = "男";
      this.form.sex = sex;
      this.form.birthday = birth;
      this.form.birthplace = this.area[iden.substring(0, 2)];
      console.log(this.form);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // **************************提交修改************************
          this.axios
            .post("/inhabitant/modifyInhabitant", {
              inhabitantId: this.$route.params.id,
              inhabitantName: this.form.name,
              idCardNo: this.form.idCard,
              telNum: this.form.tel,
              inhabitantSex: this.form.sex,
              birthplace: this.form.birthplace,
              workingUnit: this.form.workPlace,
              career: this.form.work
            })
            .then(res => {
              console.log("aaa", res);
              if (res.data.code == "200") {
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

      return `${year}-${this.addZero(month)}-${this.addZero(date)}}`;
    },
    // 实现自动生成生日，性别，年龄
    getBirth(iden) {
      return (
        iden.substring(6, 10) +
        "-" +
        iden.substring(10, 12) +
        "-" +
        iden.substring(12, 14)
      );
    },
    formateData(item) {
      var houseData = {};
      houseData.id = item.inhabitantId;
      houseData.link = item.user.userName;
      houseData.houseList = item.housePropertyList;
      houseData.name = item.inhabitantName;
      houseData.tel = item.telNum;
      houseData.sex = item.inhabitantSex;
      houseData.idCard = item.idCardNo;
      houseData.birthday = this.getBirth(item.idCardNo);
      houseData.sex = item.inhabitantSex;
      houseData.birthplace = item.birthplace;
      houseData.work = item.career;
      houseData.workPlace = item.workingUnit;
      houseData.time = this.switchTimeFormat(item.checkInTime);
      console.log(houseData);

      return houseData;
    }
  },
  created() {
    this.axios
      .post("/inhabitant/showSingle", {
        id: this.$route.params.id
      })
      .then(res => {
        console.log(res);
        this.form = this.formateData(res.data.data.data);
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
  background-color: white;
  height: 100%;
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