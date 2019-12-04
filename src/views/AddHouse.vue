<template>
  <div class="addHouse">
   <div class="content">
      <!-- 标题 -->
    <div class="title">
      <i class="el-icon-edit"></i>
      <span>新增房产信息</span>

      <!-- 返回按钮 -->
      <div class="back">
        <el-button round size='mini' class="back-btn" icon='el-icon-arrow-left' @click="back">返回</el-button>
      </div>
    </div>

    <!-- 表单内容 -->
    <el-form :inline="true" :model="form" class="main" size="medium" status-icon label-width="100px" ref="ruleForm">

      <el-form-item label="房号:" prop="no"
      :rules="{ required: true, message: '房号不能为空', trigger: ['blur','change']}">
        <el-input v-model="form.no" placeholder="请输入房号" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="预留手机号:" prop="tel" :rules="[phone,{ required: true, message: '手机号不能为空', trigger: ['blur','change']}]" >
        <el-input v-model="form.tel" placeholder="请输入预留手机号"></el-input>
      </el-form-item>

      <el-form-item label="业主姓名:" prop='host'
      :rules="{ required: true, message: '业主姓名不能为空', trigger: ['blur','change']}">
        <el-input v-model="form.host" placeholder="请输入业主姓名"></el-input>
      </el-form-item>

      <el-form-item label="身份证号码:" prop="idCard" :rules="[{ validator: this.validID, trigger: ['blur','change']},{ required: true, message: '身份证号码不能为空', trigger: ['blur','change']}]" >
        <el-input v-model="form.idCard" placeholder="请输入身份证号码"></el-input>
      </el-form-item>

      <el-form-item label="业主籍贯:" prop='birthPlace'>
        <el-input v-model="form.birthplace" placeholder="请输入业主籍贯" :disabled='true'></el-input>
      </el-form-item>

      <el-form-item label="建筑面积:" prop='area'
      :rules="[{ required: true, message: '建筑面积不能为空', trigger: ['blur','change']},
      { type: 'number', message: '面积必须为数字值', trigger: ['blur','change']}]">
        <el-input v-model.number="form.area" placeholder="请输入建筑面积"></el-input>
      </el-form-item>

      <el-form-item label="户型:" prop='type' :rules="{ required: true, message: '户型不能为空', trigger: ['blur','change']}">
        <el-input v-model="form.type" placeholder="请输入户型"></el-input>
      </el-form-item>

      <el-form-item label="房产性质" prop="nature" :rules="{ required: true, message: '房产性质不能为空', trigger: ['blur','change']}">
        <el-select v-model="form.nature" placeholder="请选择房产性质">
        <el-option label="商用" value="shanghai"></el-option>
        <el-option label="住宅" value="beijing"></el-option>
        <el-option label="办公" value="beijing"></el-option>
      </el-select>
      </el-form-item>

       <el-form-item label="交房时间:" :rules="{ required: true, message: '交房时间不能为空', trigger: ['blur','change']}">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.time" class="time-input"></el-date-picker>
      </el-form-item>

      <el-form-item label="最大绑定数:" prop='blindMax' :rules="[
      { type: 'number', message: '必须为数字值', trigger: ['blur','change']}]">
         <el-input-number v-model="form.blindMax" @change="handleChange" :min="1" :max="50" label="最大绑定数"></el-input-number>
      </el-form-item>

      <el-form-item label="是否空置:">
        <el-radio-group v-model="form.isEmpty">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否计费:">
        <el-radio-group v-model="form.isCount">
          <el-radio label="计费"></el-radio>
          <el-radio label="暂停计费"></el-radio>
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
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      return {
        form: {
         no:'',
         tel:'',
         host:'',
         nature:'',
         area:'',
         time:'',
         type:'',
         blindMax:5,
         isEmpty:'否',
         isCount:'计费',
         birthplace:'',
         idCard:'',
        },
        phone:{validator: checkPhone, trigger: ['blur','change']},
        area: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
          31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
          43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
          61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
        },
      }
    },
    methods: {
      back(){//返回房产信息列表
        this.$router.push({path:'/home/house'});
      },
       // 身份证验证
      async validID(rule,value,callback)
      {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
        let reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(value)) {
          await this.go();
          callback()
        } else {
          callback(new Error('身份证号码不正确'))
        }
      },
       go() {
        let iden = this.form.idCard;
        this.form.birthplace = this.area[iden.substring(0,2)];
        console.log(this.form);
      },
      handleChange(value) {
        console.log(value);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("提交");
            this.axios
        .post("/InhabitantAndHouseProperty/addHousePropertyInfo", {
         housePropertyNo: this.form.no,
         houseArea: this.form.area,
         houseStyle: this.form.type,
         houseNature: this.form.nature,
         ownerTime: this.form.time,
         maxCount: this.form.blindMax,
         houseState: this.form.isEmpty,
         telNum: this.form.tel,
         inhabitantName: this.form.host,
         birthplace:this.form.birthplace,
         idCardNo:this.form.idCard
        })
        .then(res => {
          console.log("aaa",res.data.data);

        })
        .catch(err => {
          console.log(err);
        });
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
  }
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
    .back-btn{
      padding: 5px;
    }
  }
}
.main{
  padding: 20px;
}
.el-form--inline .el-form-item{
  width: 500px;
}

.el-input--medium,.el-select,.time-input{
  width: 300px;
}
.reset-btn{
  background: @blueGreenColor;
  color: white;
  border-color: @blueGreenColor;
}
.el-form--inline .el-form-item[data-v-695795b9].control{
  text-align: right;
  width: 100%;
}
</style>