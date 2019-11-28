<template>
  <div id="mynote">
    <h1>社区资讯</h1>
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
          <el-button type="success" @click="putout"><i class="el-icon-upload el-icon--right"></i>发布</el-button>
          <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
        </el-row>
      </el-col>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" > </el-table-column>
      <el-table-column prop="id" label="ID" width="100"> </el-table-column>
      <el-table-column prop="name" label="标题" > </el-table-column>
      <el-table-column label="发布日期" >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="文章内容" >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100"> </el-table-column>
      <el-table-column label="处理" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >查看详情</el-button
          >
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
        user: "",
        region: ""
      },
      tableData: [
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        },
        {
          listname: "物业投诉",
          date: "2016-05-02",
          name: "王小虎",
          phone: 13880888088,
          address: "上海市普陀区金沙江路 1518 弄",
          state: "待处理"
        }
      ],
      loading: false
    };
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
    },
    putout () {
      this.$router.push('/home/putnote')
    },
  }
};
</script>

<style lang="less" scoped>
#mynote{
  margin: 15px;
  h1{
    margin-bottom: 15px;
    text-align: center;
  }
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 300px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  h1 {
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
.el-pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
