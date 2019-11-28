<template>

<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="待处理人">
    <el-select v-model="formInline.region" placeholder="待处理人">
      <el-option label="王小虎" value="shanghai"></el-option>
      <el-option label="李小龙" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="联系电话">
    <el-input v-model="formInline.user" placeholder="联系电话"></el-input>
  </el-form-item>
  <el-form-item label="状态">
    <el-select v-model="formInline.region" placeholder="状态">
      <el-option label="待处理" value="shanghai"></el-option>
      <el-option label="已处理" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

