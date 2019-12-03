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
        <el-form-item label="公司名称">
          <el-input v-model="form.companyName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.personName" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.telphone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader v-model="form.value" :options="options"  @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
      </div>
      
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
          companyName: '',
          personName: '',
          telphone: '',
          date1: '',
          value:'',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
      },
      value: [],
      options: [{
          value: 'zhinan',
          label: '四川省',
          children: [
            {
            value: 'shejiyuanze',
            label: '成都市',
            children: [{
              value: 'yizhi',
              label: '郫都区'
            }, {
              value: 'fankui',
              label: '金牛区'
            }, {
              value: 'xiaolv',
              label: '青羊区'
            }, {
              value: 'kekong',
              label: '锦江区'
            }]
          }, 
          {
            value: 'daohang',
            label: '德阳市',
            children: [{
              value: 'cexiangdaohang',
              label: '绵竹县'
            }, {
              value: 'dingbudaohang',
              label: '罗江市'
            }]
          }]
        }, {
          value: 'zujian',
          label: '浙江省',
          children: [
            {
            value: 'basic',
            label: '杭州市',
            children: [{
              value: 'layout',
              label: '上城区'
            }, {
              value: 'color',
              label: '下城区'
            }, {
              value: 'typography',
              label: '江干区'
            }, {
              value: 'icon',
              label: '西湖区'
            }, {
              value: 'button',
              label: '滨江区'
            }]
          }, 
          {
            value: 'form',
            label: '宁波市',
            children: [{
              value: 'radio',
              label: '江北区'
            }, {
              value: 'checkbox',
              label: '北仑区'
            }, {
              value: 'input',
              label: '镇海区'
            }, {
              value: 'input-number',
              label: '奉化区'
            }, {
              value: 'select',
              label: '海曙区'
            }, {
              value: 'cascader',
              label: '象山县'
            }, {
              value: 'switch',
              label: '宁海县'
            }, {
              value: 'slider',
              label: '余姚市'
            }, {
              value: 'time-picker',
              label: '慈溪市'
            }]
          }, 
          {
            value: 'data',
            label: '温州市',
            children: [{
              value: 'table',
              label: '鹿城区'
            }, {
              value: 'tag',
              label: '龙湾区'
            }, {
              value: 'progress',
              label: '瓯海区'
            }, {
              value: 'tree',
              label: '洞头区'
            }, {
              value: 'pagination',
              label: '乐清市'
            }, {
              value: 'badge',
              label: '瑞安区'
            }]
          }, 
          {
            value: 'notice',
            label: '嘉兴市',
            children: [{
              value: 'alert',
              label: '南湖区'
            }, {
              value: 'loading',
              label: '秀洲区'
            }, {
              value: 'message',
              label: '嘉善区'
            }, {
              value: 'message-box',
              label: '海盐县'
            }, {
              value: 'notification',
              label: '海宁市'
            }]
          }, 
          {
            value: 'navigation',
            label: '绍兴市',
            children: [{
              value: 'menu',
              label: '越城区'
            }, {
              value: 'tabs',
              label: '柯桥市'
            }, {
              value: 'breadcrumb',
              label: '新昌县'
            }, {
              value: 'dropdown',
              label: '上虞区'
            }, {
              value: 'steps',
              label: '诸暨区'
            }]
          }, 
          {
            value: 'others',
            label: '湖州市',
            children: [{
              value: 'dialog',
              label: '吴兴区'
            }, {
              value: 'tooltip',
              label: '南浔区'
            }, {
              value: 'popover',
              label: '德清区'
            }, {
              value: 'card',
              label: '长兴县'
            }, {
              value: 'carousel',
              label: '安吉区'
            }]
          }]
        }, 
        {
          value: 'ziyuan',
          label: '北京市',
          children: [{
            value: 'axure',
            label: '朝阳区'
          }, {
            value: 'sketch',
            label: '海淀区'
          },{
            value: 'sketch',
            label: '门头沟区'
          },{
            value: 'sketch',
            label: '通州区'
          },{
            value: 'sketch',
            label: '大兴区'
          },{
            value: 'sketch',
            label: '怀柔区'
          }, {
            value: 'jiaohu',
            label: '密云区'
          }]
        },
        {
          value: 'ziyuan',
          label: '重庆市',
          children: [{
            value: 'axure',
            label: '万州区'
          }, {
            value: 'sketch',
            label: '涪陵区'
          },{
            value: 'sketch',
            label: '渝中区'
          },{
            value: 'sketch',
            label: '大渡口区'
          },{
            value: 'sketch',
            label: '江北区'
          },{
            value: 'sketch',
            label: '九龙坡区'
          }, {
            value: 'jiaohu',
            label: '渝北区'
          }]
        },
        {
          value: 'ziyuan',
          label: '上海市',
          children: [{
            value: 'axure',
            label: '黄浦区'
          }, {
            value: 'sketch',
            label: '徐汇区'
          },{
            value: 'sketch',
            label: '长宁区'
          },{
            value: 'sketch',
            label: '静安区'
          },{
            value: 'sketch',
            label: '普陀区'
          },{
            value: 'sketch',
            label: '虹口区'
          }, {
            value: 'jiaohu',
            label: '浦东新区'
          }]
        }]
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      console.log('submit!',this.form.companyName);
      console.log('submit!',this.form.personName);
      console.log('submit!',this.form.telphone);
      console.log('submit!',this.form.value);
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
  }
</style>