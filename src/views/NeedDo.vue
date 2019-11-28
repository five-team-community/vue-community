<template>
  <div id="mynote">
    <div class="title">
        <i class="el-icon-s-order"></i>
        <span>我的待办</span>
      </div>
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
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column label="流程名称" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.listname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房产" width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 10px">{{ scope.row.phone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="待处理人" width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="最后处理时间" width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <span size="medium">{{ scope.row.state }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="处理">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
  </div>
</template>
<script>


export default {
  data() {
      return {
         formInline: {
          user: '',
          region: ''
        },
        tableData: [
        {
          listname: '物业投诉',
          date: '2016-05-02',
          name: '王小虎',
          phone:13880888088,
          address: '上海市普陀区金沙江路 1518 弄',
          state:'待处理'

        }, 
        {
          listname: '物业投诉',
          date: '2016-05-02',
          name: '王小虎',
          phone:13880888088,
          address: '上海市普陀区金沙江路 1518 弄',
          state:'待处理'

        }, 
        {
          listname: '物业投诉',
          date: '2016-05-02',
          name: '王小虎',
          phone:13880888088,
          address: '上海市普陀区金沙江路 1518 弄',
          state:'待处理'

        }, 
        {
          listname: '物业投诉',
          date: '2016-05-02',
          name: '王小虎',
          phone:13880888088,
          address: '上海市普陀区金沙江路 1518 弄',
          state:'待处理'

        }, 
        {
          listname: '物业投诉',
          date: '2016-05-02',
          name: '王小虎',
          phone:13880888088,
          address: '上海市普陀区金沙江路 1518 弄',
          state:'待处理'

        }, 
        ],
        loading: false
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);

      },
      handleClick(tab, event) {
      console.log(tab, event);
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

#mynote{
  margin: 15px;
  h1{
    margin-bottom: 15px;
    text-align: center;
  }
}
.el-pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.el-table {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>
