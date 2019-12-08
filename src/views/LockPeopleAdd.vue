<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>开锁公司添加</p>
        <a href="javascript:;" class="returnBtn" @click="returnBtn">
          <i class="el-icon-caret-left"></i>返回
        </a>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="contentBox">
        <el-form ref="form" :model="form" label-width="180px">
        
        <el-form-item label="公司名称" prop="companyName" :rules="[{ required: true, message: '名称不能为空', trigger: ['blur','change']}]">
          <el-input v-model="form.companyName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="personName" :rules="[{ required: true, message: '联系人不能为空', trigger: ['blur','change']}]">
          <el-input v-model="form.personName" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="telphone" :rules="[phone,{ required: true, message: '手机号不能为空', trigger: ['blur','change']}]">
          <el-input v-model="form.telphone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="value" :rules="[{ required: true, message: '地址不能为空', trigger: ['blur','change']}]">
          <el-cascader v-model="form.value" :options="options"  @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAddress" :rules="[{ required: true, message: '详细地址不能为空', trigger: ['blur','change']}]">
          <el-input v-model="form.detailAddress" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
        
        <!-- <el-form-item>
          <el-button type="primary" >上传头像</el-button>
        </el-form-item> -->
      </el-form>
      <el-form  label-width="180px">
        <el-form-item label="头像" class="load">
          <el-upload
            name="file"
            class="avatar-uploader"
            :action="this.$store.state.ip+'/unlock/loadHeadImg'"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="this.form.img" :src="this.form.img" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      </div>
      
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
      phone:{validator: checkPhone, trigger: ['blur','change']},
      form: {
          companyName: '',
          personName: '',
          telphone: '',
          detailAddress:'',
          date1: '',
          value:'',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          img:''
      },
      imgurl:'',
      value: [],
      options: [{
          value: '四川省',
          label: '四川省',
          children: [
            {
            value: '成都市',
            label: '成都市',
            children: [{
              value: '郫都区',
              label: '郫都区'
            }, {
              value: '金牛区',
              label: '金牛区'
            }, {
              value: '青羊区',
              label: '青羊区'
            }, {
              value: '锦江区',
              label: '锦江区'
            }]
          }, 
          {
            value: '德阳市',
            label: '德阳市',
            children: [{
              value: '绵竹县',
              label: '绵竹县'
            }, {
              value: '罗江市',
              label: '罗江市'
            }]
          }]
        }, {
          value: '浙江省',
          label: '浙江省',
          children: [
            {
            value: '杭州市',
            label: '杭州市',
            children: [{
              value: '上城区',
              label: '上城区'
            }, {
              value: '下城区',
              label: '下城区'
            }, {
              value: '江干区',
              label: '江干区'
            }, {
              value: '西湖区',
              label: '西湖区'
            }, {
              value: '滨江区',
              label: '滨江区'
            }]
          }, 
          {
            value: '宁波市',
            label: '宁波市',
            children: [{
              value: '江北区',
              label: '江北区'
            }, {
              value: '北仑区',
              label: '北仑区'
            }, {
              value: '镇海区',
              label: '镇海区'
            }, {
              value: '奉化区',
              label: '奉化区'
            }, {
              value: '海曙区',
              label: '海曙区'
            }, {
              value: '象山县',
              label: '象山县'
            }, {
              value: '宁海县',
              label: '宁海县'
            }, {
              value: '余姚市',
              label: '余姚市'
            }, {
              value: '慈溪市',
              label: '慈溪市'
            }]
          }, 
          {
            value: '温州市',
            label: '温州市',
            children: [{
              value: '鹿城区',
              label: '鹿城区'
            }, {
              value: '龙湾区',
              label: '龙湾区'
            }, {
              value: '瓯海区',
              label: '瓯海区'
            }, {
              value: '洞头区',
              label: '洞头区'
            }, {
              value: '乐清市',
              label: '乐清市'
            }, {
              value: '瑞安区',
              label: '瑞安区'
            }]
          }, 
          {
            value: '嘉兴市',
            label: '嘉兴市',
            children: [{
              value: '南湖区',
              label: '南湖区'
            }, {
              value: '秀洲区',
              label: '秀洲区'
            }, {
              value: '嘉善区',
              label: '嘉善区'
            }, {
              value: '海盐县',
              label: '海盐县'
            }, {
              value: '海宁市',
              label: '海宁市'
            }]
          }, 
          {
            value: '绍兴市',
            label: '绍兴市',
            children: [{
              value: '越城区',
              label: '越城区'
            }, {
              value: '柯桥市',
              label: '柯桥市'
            }, {
              value: '新昌县',
              label: '新昌县'
            }, {
              value: '上虞区',
              label: '上虞区'
            }, {
              value: '诸暨区',
              label: '诸暨区'
            }]
          }, 
          {
            value: '湖州市',
            label: '湖州市',
            children: [{
              value: '吴兴区',
              label: '吴兴区'
            }, {
              value: '南浔区',
              label: '南浔区'
            }, {
              value: '德清区',
              label: '德清区'
            }, {
              value: '长兴县',
              label: '长兴县'
            }, {
              value: '安吉区',
              label: '安吉区'
            }]
          }]
        }, 
        {
          value: '北京市',
          label: '北京市',
          children: [{
            value: '朝阳区',
            label: '朝阳区'
          }, {
            value: '海淀区',
            label: '海淀区'
          },{
            value: '门头沟区',
            label: '门头沟区'
          },{
            value: '通州区',
            label: '通州区'
          },{
            value: '大兴区',
            label: '大兴区'
          },{
            value: '怀柔区',
            label: '怀柔区'
          }, {
            value: '密云区',
            label: '密云区'
          }]
        },
        {
          value: '重庆市',
          label: '重庆市',
          children: [{
            value: '万州区',
            label: '万州区'
          }, {
            value: '涪陵区',
            label: '涪陵区'
          },{
            value: '渝中区',
            label: '渝中区'
          },{
            value: '大渡口区',
            label: '大渡口区'
          },{
            value: '江北区',
            label: '江北区'
          },{
            value: '九龙坡区',
            label: '九龙坡区'
          }, {
            value: '渝北区',
            label: '渝北区'
          }]
        },
        {
          value: '上海市',
          label: '上海市',
          children: [{
            value: '黄浦区',
            label: '黄浦区'
          }, {
            value: '徐汇区',
            label: '徐汇区'
          },{
            value: '长宁区',
            label: '长宁区'
          },{
            value: '静安区',
            label: '静安区'
          },{
            value: '普陀区',
            label: '普陀区'
          },{
            value: '虹口区',
            label: '虹口区'
          }, {
            value: '浦东新区',
            label: '浦东新区'
          }]
        }]
    }
  },
  methods: {
    handleSuccess(res,file) {  // 图片上传
      console.log(URL.createObjectURL(file.raw));
      this.form.img = this.$store.state.ip + "/" + res.data.filePath;
      this.imgurl = res.data.filePath;
      console.log(res.data);
    },
    beforeUpload(file) { // 图片判断
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式");
      }
      if(!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB");
      }
      return isJPG && isLt2M;
    },
    handleChange(value) {
      console.log(value);
    },
    onSubmit() { //确认
      console.log('公司!',this.form.companyName);
      console.log('联系人',this.form.personName);
      console.log('电话',this.form.telphone);
      if(this.form.value[2]) {
        console.log('submit!',this.form.value[2]);
        var address = this.form.value[0] + "" + this.form.value[1] + "" + this.form.value[2] + "" + this.form.detailAddress;
      } else {
        address = this.form.value[0] + "" + this.form.value[1] + "" + this.form.detailAddress;
      }
      console.log("地址：",address);

      this.axios
        .post("/unlock/addUnlock",
        {
          companyName:this.form.companyName,
          personName:this.form.personName,
          telNum:this.form.telphone,
          location:address,
          headImg:this.imgurl
        })
        .then((res)=> {
          console.log(res);
        })
        .catch((err)=> {
          console.log(err);
        })

      this.$alert('添加成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `添加成功: ${ action }`
            });
          }
        });
      
      
      
    },
    returnBtn() {
      this.$router.push({path:"/home/LockPeople"});
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/less/base.less";
  .bg {
    background:#f3f3f4;
    height:auto;
    padding:20px;
    .right {
      background: #fff;
      font-size: 13px;
      .headBox {
        padding: 15px 20px;
        text-align: left;
        p {
          display: inline;
          color: #606266;
          font-weight: 600;
        }
        .returnBtn {
          border: 1px solid #23c6c8;
          padding: 1px 5px;
          border-radius: 50px;
          color: #23c6c8;
          float: right;
        }
      }
      .contentBox {
        padding: 20px 20px;
        .el-form {
          width: 600px;
        }
        .el-table--border {
          margin: 0 auto;
        }
      }
    }
    .el-divider--horizontal {
      margin: 0;
    }
    .avatar{
  width: 200px;
  height: 200px;
}

.avatar-uploader-icon{
  font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid black;
}
  }
</style>