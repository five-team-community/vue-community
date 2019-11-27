<template>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="标题"
      width="120">
    </el-table-column>
    <el-table-column
      label="创建日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      label="发布日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      label="失效日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column label="处理">
      <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
          id:1,
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
        loading: false,
        multipleSelection: []
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
       toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>