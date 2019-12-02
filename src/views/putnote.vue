<template>
<div class="mynote">
    <div class="content">
    <div class="title">
        <i class="el-icon-s-order"></i>
        <span>新增公告</span>
        <div class="back">
          <el-button round size='mini' class="back-btn" icon='el-icon-arrow-left' @click="back">返回</el-button>
        </div>
      </div>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="公告标题" >
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="公告时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="是否推送">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item class="notedetail" label="公告内容">
      <el-input type="textarea"  v-model="form.desc" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.axios
        .get("/pay/leibie",{
          payProject:'物业费'
        }) 
        .then(res => {
        console.log(res.data)
        console.log(res);
/*         res.data = tableData; */
/*         this.tableData = tableData; */
        })
        .catch(err => {
          console.log(err);
        })
        console.log(this.form.name);
    },
    back() {
        console.log('back');
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
.mynote{
  color: @fontColor;
  background-color: #f3f3f4;
  padding: 20px 10px;
  min-height: 500px;
.content {
  background: white;
}

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
 .btn{
  height: 40px;
}
.btn > div {
  float: right;
  margin-right: 30px;
  color: white;
  .btn-add {
    background: @greenColor;
    color: white;
    &:hover {
      background: @darkGreenColor;
    }
  }
  .btn-search {
    background: @blueColor;
    color: white;
    &:hover {
      background: @darkBlueColor;
    }
  }
}
.mytable{
  padding: 20px 30px;
}
.el-button--mini, .el-button--mini.is-round{
  padding: 3px;
}
.btn-alter{
  background: @blueColor;
  border-color: @blueColor;
}
.page{
  float: right;
  margin-top: 20px;
  
}
.el-form{
    padding:  50px 30px;
}
.el-form-item{
    height: 40px;
    
}
.notedetail{
  .el-input{
  height: 100px;
  }

}
</style>