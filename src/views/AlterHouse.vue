<template>
  <div class="addHouse">
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-s-order"></i>
        <span>修改房产信息</span>

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
        <el-form-item label="房号:" prop="no">
          <el-input v-model="form.no" placeholder="请输入房号" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item
          label="预留手机号:"
          prop="tel"
          :rules="[phone,{ required: true, message: '手机号不能为空', trigger: ['blur','change']}]"
        >
          <el-input v-model="form.tel" placeholder="请输入预留手机号"></el-input>
        </el-form-item>

        <el-form-item
          label="业主名称:"
          prop="host"
          :rules="{ required: true, message: '业主名称不能为空', trigger: ['blur','change']}"
        >
          <el-input v-model="form.host" placeholder="请输入业主名称"></el-input>
        </el-form-item>

        <el-form-item
          label="建筑面积:"
          prop="area"
          :rules="[{ required: true, message: '建筑面积不能为空', trigger: ['blur','change']},
      { type: 'number', message: '面积必须为数字值', trigger: ['blur','change']}]"
        >
          <el-input v-model.number="form.area" placeholder="请输入建筑面积"></el-input>
        </el-form-item>

        <el-form-item label="户型:" prop="type">
          <el-input v-model="form.type" placeholder="请输入户型"></el-input>
        </el-form-item>

        <el-form-item label="房产性质" prop="nature">
          <el-select v-model="form.nature" placeholder="请选择房产性质">
            <el-option label="商用" value="shanghai"></el-option>
            <el-option label="住宅" value="beijing"></el-option>
            <el-option label="办公" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交房时间:" prop="time">
          <el-date-picker
            format = "yyyy-MM-dd"
            value-format="timestamp"
            type="date"
            placeholder="选择日期"
            v-model="form.time"
            class="time-input"
          ></el-date-picker>
        </el-form-item>

        <el-form-item
          label="最大绑定数:"
          prop="blindMax"
          :rules="[
      { type: 'number', message: '必须为数字值', trigger: ['blur','change']}]"
        >
          <el-input-number
            v-model="form.blindMax"
            @change="handleChange"
            :min="1"
            :max="50"
            label="最大绑定数"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="是否空置:">
          <el-radio-group v-model="form.isEmpty">
            <el-radio label="是" value="是"></el-radio>
            <el-radio label="否" value="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否计费:">
          <el-radio-group v-model="form.isCount">
            <el-radio label="计费" value="是"></el-radio>
            <el-radio label="暂停计费" value="否"></el-radio>
          </el-radio-group>
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
      form: {},
      phone: { validator: checkPhone, trigger: ["blur", "change"] }
    };
  },
  methods: {
    back() {
      //返回房产信息列表
      this.$router.push({ path: "/home/house" });
    },
    handleChange(value) {
      console.log(value);
    },
    formateTime(date){
      date = date.substring(0,19);    
      date = date.replace(/-/g,'/'); 
      return new Date(date).getTime();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.axios
            .post("/InhabitantAndHouseProperty/updateHousePropertyInfo", {
              housePropertyId: this.$route.params.id,
              housePropertyNo: this.form.no,
              houseArea: this.form.area,
              houseStyle: this.form.type,
              houseNature: this.form.nature,
              ownerTime: this.form.time,
              maxCount: this.form.blindMax,
              houseState: this.form.isEmpty,
              telNum: this.form.tel,
              inhabitantId: this.form.hostId,           
              inhabitantName: this.form.host,
              birthplace: this.form.birthplace,
              idCardNo: this.form.idCard
            })
            .then(res => {
              this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.back();
              console.log("aaa", res);
            })
            .catch(err => {
              console.log(err);
               this.$message({
                type: "error",
                message: "修改失败!"
              });
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
    formateData(item){
      console.log(item);
      var data={};
      data.id = item.housePropertyId;
      data.no = item.housePropertyNo;
      data.name = item.houseName;
      data.nature = item.houseNature;
      data.area = Number(item.houseArea);
      data.style = item.houseStyle;
      data.hostId = item.inhabitant.inhabitantId;
      data.host = item.inhabitant.inhabitantName;
      data.tel = item.inhabitant.telNum;
      data.time = this.formateTime(item.ownerTime);
      data.blindMax = item.maxCount;
      console.log(data);
      return data;
    },
  },
  created() {
  console.log(this.$route.params.id);
    this.axios
    .get("/InhabitantAndHouseProperty/selectById", {params:{
      housePropertyId: this.$route.params.id
    }})
    .then(res => {    
      this.form = this.formateData(res.data.data.inhabitantAndHousePropertyVO);
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