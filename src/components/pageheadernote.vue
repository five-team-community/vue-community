<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-col :span="14">
      <el-form-item label="标题">
        <el-input v-model="formInline.user" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.region" placeholder="状态">
          <el-option label="待处理" value="shanghai"></el-option>
          <el-option label="已处理" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-row>
        <el-button type="primary" icon="el-icon-edit">新建</el-button>
        <el-button type="success"
          ><i class="el-icon-upload el-icon--right"></i>发布</el-button
        >
        <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
      </el-row>
    </el-col>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
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
