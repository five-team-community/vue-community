<template>
  <div class="right">
    <div class="head">
      <i class="el-icon-s-open"></i>
      <p>报修分类</p>
    </div>
    <el-divider></el-divider>
    <div class="button-group">
      <el-button type="primary" style="float:right;margin:0 30px;">主要按钮</el-button>
      <el-button type="primary" style="float:right">主要按钮</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 96%;float: right;margin:30px">
      <el-table-column prop="partName" label="报修部位" style="width: 50%">
      </el-table-column>
      <el-table-column prop="operate" label="操作" style="width: 50%">
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="success" icon="el-icon-share"></el-button>
        <el-button type="danger" icon="el-icon-delete"></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          type: '外围设备',
        }, 
        {
          type: '单元楼道',      
        }, 
        {
          type: '车位',
        }, 
        {
          type: '单元门禁',
        }, 
        {
          type: '地下室',
        }, 
        {
          type: '电梯轿厢',
        }, 
        {
          type: '公共走道',
        }, 
        {
          type: '门',
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .right {
    width: 100%;
    .head {
      height: 50px;
      text-align: left;
      line-height: 50px;
      margin: 0 30px;
      p {
        display: inline;
        color: #606266;
        font-weight: 600;
      }
    }
    .button-group {
      width: 100%;
      height: 40px;
    }
  }
</style>