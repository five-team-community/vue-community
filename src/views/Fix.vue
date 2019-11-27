<template>
  <div style="background:#ddd;height:900px;display: flex;justify-content: center;align-items:center;">
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          partName: '外围设备',
        }, 
        {
          partName: '单元楼道',      
        }, 
        {
          partName: '车位',
        }, 
        {
          partName: '单元门禁',
        }, 
        {
          partName: '地下室',
        }, 
        {
          partName: '电梯轿厢',
        }, 
        {
          partName: '公共走道',
        }, 
        {
          partName: '门',
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-divider--horizontal {
    margin: 0;
  }
  .right {
    width: 96%;
    height: 850px;
    background: #fff;
    font-size: 13px;
    .head {
      width: 98%;
      height: 50px;
      text-align: left;
      line-height: 50px;
      margin: 0 auto;
      p {
        display: inline;
        color: #606266;
        font-weight: 600;
      }
    }
    .button-group {
      width: 100%;
      height: 40px;
      margin: 10px 0;
    }
  }
</style>