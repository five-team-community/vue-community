<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%">
    <el-table-column label="流程名称" width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.listname }}</span>
      </template>
    </el-table-column>
    <el-table-column label="房产"  width="250">
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
    <el-table-column label="待处理人" width="100" >
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
    <el-table-column label="状态"  width="100">
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
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
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
      }
    }
  }
</script>