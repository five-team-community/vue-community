<template>
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>
        <el-page-header  content="详情页面">
        </el-page-header>
    </el-header>
    <el-main>
        <h1>社区公告</h1>
        <pageheadernote></pageheadernote>
        <tablenote></tablenote>
        <changepage></changepage>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>
</template>
<script>
import pageheadernote from '@/components/pageheadernote.vue'
import tablenote from '@/components/table-note.vue'
import changepage from '@/components/changepage.vue'
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    components: {
    tablenote,
    pageheadernote,
    changepage
  },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="less" scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 300px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
     h1{
        margin-bottom: 15px;
    }
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
