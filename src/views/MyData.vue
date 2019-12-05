<template>
  <div id="myData">
    <div class="content">
      <div class="part1">
        <!-- 标题 -->
        <div class="title">
          <i class="el-icon-s-order"></i>
          <span>基本信息</span>
        </div>
        <div class="main">
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
              <div class="item-title">性别:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.sex}}</div>
            </el-col>
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">电话:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.tel}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">身份证:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.idCard}}</div>
            </el-col>
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">用户类型:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.type}}</div>
            </el-col>
          </el-row>
           <div class="part2">

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
              <div class="item-title">性别:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.sex}}</div>
            </el-col>
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">电话:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.tel}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">身份证:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.idCard}}</div>
            </el-col>
            <el-col :xs="24" :sm="6" :md="3" :lg="2">
              <div class="item-title">用户类型:</div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="9" :lg="10">
              <div class="msg">{{userData.type}}</div>
            </el-col>
          </el-row>
      </div>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12">
              <el-button type="primary" size="medium" icon="el-icon-edit" @click="altermsg">修改信息</el-button>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-button
                type="danger"
                size="medium"
                icon="el-icon-key"
                @click="openDialog"
              >修改密码</el-button>
            </el-col>
          </el-row>
          <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :center="true" width="400px">
            <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" status-icon>
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

// 模拟数据
var userData = {
  id: 1,
  name: "111",
  realName: "222",
  type: "管理员",
  sex: "nan",
  tel: "1321",
  idCard: "2423432423423"
};

export default {
  data() {
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      role:'',
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      userData: {},
      dialogFormVisible: false,
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    altermsg() {
      console.log("aaa");
      this.$router.push({ path: "/home/alterUser" });
    },
    alterPwd(){
      this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    openDialog(){
      if(this.$refs["ruleForm"]){
        this.$refs["ruleForm"].resetFields();  
      }
      this.dialogFormVisible = true;
    },
    conclePwd(){
      this.dialogFormVisible = false;

    }
  },
  created() {
    //创建时获取数据
    this.userData = userData;

  },
  computed: {}
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
.el-button--medium {
  padding: 10px 100px;
  margin-left: 20px;
}
#MyData {
  color: @fontColor;
  background-color: #f3f3f4;
  padding: 20px 10px;
  min-height: 500px;
}
.part1,.part2{
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