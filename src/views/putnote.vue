<template>
<div class="putnote">
    <div class="title">
        <i class="el-icon-s-order"></i>
        <span>房产列表</span>
        <div class="back">
          <el-button round size='mini' class="back-btn" icon='el-icon-arrow-left' @click="back">返回</el-button>
        </div>
      </div>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="公告标题">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker placeholder="选择时间" v-model="form.date2"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="是否推送">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="公告内容">
      <el-input type="textarea" v-model="form.desc" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
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
    }
  }
};
</script>
<style lang="less" scoped>
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
 .putnote{
     width: 800px;
 }
</style>