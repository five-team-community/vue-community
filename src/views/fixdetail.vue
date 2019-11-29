<template>
  <div class="forms">
    <div id="mynote">
      <div class="content">
        <div class="title">
          <i class="el-icon-s-order"></i>
          <span>查看维修详情</span>
          <div class="back">
            <el-button round size="mini" class="back-btn" icon="el-icon-arrow-left" @click="back">返回</el-button>
          </div>
        </div>

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登记信息" name="first">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">社区：美居社区</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">报修人：</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">联系电话：</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">房产</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">报修类型</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">提交时间：</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">内容：</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">状态：</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">附件：</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">报修物品：</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">报修途径：</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">业主评价：</div>
              </el-col>
            </el-row>
            <el-button type="button" icon="el-icon-edit">修改</el-button>
            <el-button type="button" icon="el-icon-edit">派工</el-button>
          </el-tab-pane>
          <el-tab-pane label="处理记录" name="second">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column prop="id" label="处理时间"></el-table-column>
              <el-table-column prop="name" label="处理状态"></el-table-column>
              <el-table-column label="处理内容">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column label="附件">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
            </el-table>
            <el-button type="button" icon="el-icon-edit">修改</el-button>
            <el-button type="button" icon="el-icon-edit">派工</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
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
@import "../assets/less/base.less";
.title {
  padding: 15px 20px;
  border-top: 3px solid #e7eaec;
  border-bottom: 1px solid #e7eaec;
  i {
    margin-right: 2px;
  }
  .back {
    float: right;
    .back-btn {
      padding: 5px;
    }
  }
}
#mynote {
  color: @fontColor;
  background-color: #f3f3f4;
  padding: 20px 10px;
  min-height: 500px;
  .content {
    background: white;
  }
}
.forms {
  border: 1px solid black;
}
.el-tabs {
  margin: 15px;
  .el-col {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border: 1px solid lightgray;
  }
}
.el-button{
  float: right;
  margin: 10px;
}
</style>
