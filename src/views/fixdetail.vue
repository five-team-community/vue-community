<template>
  <div class="forms">
    <h1>查看报修详情</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登记信息" name="first">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">社区：{{}}</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">报修人：</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">联系电话：</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">房产</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">报修类型</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">提交时间：</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">内容：</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">状态：</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">附件：</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">报修物品：</div></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple">报修途径：</div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple-light">业主评价：</div></el-col
          >
        </el-row>
        <el-button type="button" icon="el-icon-edit">修改</el-button>
        <el-button type="button">派工</el-button>
      </el-tab-pane>
      <el-tab-pane label="处理记录" name="second">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" > </el-table-column>
          <el-table-column prop="id" label="处理时间" > </el-table-column>
          <el-table-column prop="name" label="处理状态" >
          </el-table-column>
          <el-table-column label="处理内容" >
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="附件" >
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
        </el-table>
        <el-button type="button" icon="el-icon-edit">修改</el-button>
        <el-button type="button" >派工</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less" scoped>
.forms {
  border: 1px solid black;
  margin: 10px;
}
.el-tabs {
  margin: 15px;
  .el-row {
    margin-left: 15px;
    height: 50px;
    border: 1px solid black;
  }
}
</style>
