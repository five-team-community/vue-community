<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="登记信息" name="first">
        <el-row>
  <el-col :span="12"><div class="grid-content bg-purple">1</div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light">2</div></el-col>
</el-row>
    </el-tab-pane>
    <el-tab-pane label="处理记录" name="second">配置管理</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>