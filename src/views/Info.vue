<template>
  <div id="mynote">
    <div class="content">
    <div class="title">
        <i class="el-icon-s-order"></i>
        <span>社区资讯</span>
      </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-col :span="14">
        <el-form-item label="标题">
          <el-input v-model="formInline.user" placeholder="标题"></el-input>
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
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </el-row>
      </el-col>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
     >
      <el-table-column type="selection" > </el-table-column>
      <el-table-column prop="name" label="标题" > </el-table-column>
      <el-table-column label="发布日期" >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="类别" >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="文章内容" >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                class="btn-show"
                @click="gotomoneydetail"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
              <el-button
                type="info"
                icon="el-icon-edit-outline"
                size="mini"
                class="btn-alter"
                @click="alter(scope.$index)"
              ></el-button>
            </el-tooltip>
              <el-button
                type="danger"
                slot="reference"
                icon="el-icon-delete"
                size="mini"
                class="btn-del"
                @click="open"
              ></el-button>
          </template>
        </el-table-column>
    </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="5"
        :total="10"
        :pager-count="5"
        :hide-on-single-page="true"
        @current-change="changePage"
        class="page"
      ></el-pagination>
    </div>
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
    onSubmit() {
      console.log("submit!");
    }
  },
  created() {
    this.axios
        .get("/activity/showActivityUser"  ,{
         params:{
            activityId:'1'
         } 
        } ) 
        .then(res => {
        console.log(res.data)
        console.log(res);
/*         this.tableData = tableData; */
        })
        .catch(err => {
          console.log(err);
        })
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";
#mynote {
  color: @fontColor;
  background-color: #f3f3f4;
  min-height: 500px;
    padding: 20px 10px;
  .content {
    background: white;
  }
}
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
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px;
}
.el-form{
  padding-left: 20px;
  padding-top: 20px;
}
</style>
