<template>
   <div id="mynote">
    <div class="content">
    <div class="title">
        <i class="el-icon-s-order"></i>
        <span>社区活动</span>
      </div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-col :span="14">
        <el-form-item label="活动名称">
          <el-input v-model="form.title" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-select v-model="form.contactsName" placeholder="请选择联系人">
            <el-option v-for="item in options" :key="item.activityId" :label="item.contactsName" :value="item.contactsName"></el-option>
          </el-select>
        </el-form-item>
       
      </el-col>
      <el-col :span="10">
        <el-row>
          <el-button type="primary" @click="onSubmit" icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit">新建</el-button>
        </el-row>
      </el-col>
    </el-form>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      v-loading="loading"
      tooltip-effect="dark"
      style="width: 100%"
      >
      <el-table-column prop="id" label="社区" width="120"> 易居</el-table-column>
      <el-table-column prop="activityName" label="活动名称" width="120">  </el-table-column>
      <el-table-column prop="contactsName" label="联系人" width="120">

      </el-table-column>
      <el-table-column prop="contactsPhone" label="联系方式" width="120">
        
      </el-table-column>
      <el-table-column prop="description" label="描述" width="120">
       
      </el-table-column>
      <el-table-column prop="activityAddress" label="活动地址" width="120"> </el-table-column>
      <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看活动详情" placement="bottom">
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                class="btn-show"
                @click="gotoactivitydetail(scope.$index)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看报名详情" placement="bottom">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                class="btn-show"
                @click="applydetail(scope.$index)"
              ></el-button>
            </el-tooltip>
              <el-button
                type="danger"
                slot="reference"
                icon="el-icon-delete"
                size="mini"
                class="btn-del"
                @click="handleDelete(scope.$index)"
              ></el-button>
          </template>
        </el-table-column>
    </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="5"
        :total="totalCount"
        :pager-count="5"
        :current-page="currentPage"
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
      form: {
        user: "",
        region: ""

      },
      options:{},
      tableData: [
        /* {
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
        } */
      ],
      loading: true,
      currentPage:1,
      totalCount:0
    };
  },
  methods: {
    handleEdit() {
      this.$router.push({
        path: "/home/addActivity" 
      });
    },
    changePage(val) {
      console.log(this.currentPage)
      this.currentPage = val;
      this.axios
      .post("/activity/showAll", {      
          pageIndex:this.currentPage,
          pageSize:5,
        online:true,
      })
      .then(res => {
        this.tableData = res.data.data.Activity;
        console.log(res.data);
        this.loading =false;
      })
      .catch(err => {
        console.log(err);
      });
      
    },
    handleDelete(index) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.axios
            .post("/activity/deleteActivity", {
                activityId: [this.tableData[index].activityId]
            })
            .then(res => {
              console.log("删除成功", res);
              this.axios
                .post("/activity/showAll", {
        pageIndex:1,
        pageSize:5,
        online:true,
      })
                .then(res => {
                  //  res.data = tableData;
                  this.tableData = res.data.data.Activity;
                  this.loading = false;
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      if(this.value2){
         var t = this.value2;
      var startTime1 =
        t[0].getFullYear() + "-" + (t[0].getMonth() + 1) + "-" + t[0].getDate();
      var endTime1 =
        t[1].getFullYear() + "-" + (t[1].getMonth() + 1) + "-" + t[1].getDate();
      console.log("开始时间:", startTime1);
      console.log("结束时间:", endTime1);
      }
      if(this.form.contactsName){
        var contactsName=this.form.contactsName
      }
     console.log(this.form.title,this.form.contactsName,this.currentPage)
      this.axios
        .post("/activity/showAll", {
            activityName: this.form.title,
            pageIndex:this.currentPage,
            pageSize:5,
            contactsName,
        })
        .then(res => {
          this.tableData = res.data.data.Activity;
          this.loading = false;
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotoactivitydetail(index) {
      this.$router.push({
        path: "/home/activitydetail?id=" + this.tableData[index].activityId
      });
      console.log("跳转", this.tableData[index].activityId);
    },
    applydetail(index){
      this.$router.push({
        path: "/home/applydetail?id=" + this.tableData[index].activityId
      });
    }
  },
   created() {
    this.axios
      .post("/activity/showAll", {
        pageIndex:this.currentPage,
        pageSize:5,
        online:true,
      })
      .then(res => {
        //  res.data = tableData;
        this.tableData = res.data.data.Activity;
        this.options=res.data.data.Activity;
        this.totalCount=res.data.data.totalCount;
        console.log(this.options);
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
      });
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
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px;
}
.el-form{
  padding-left: 20px;
  padding-top: 20px;
}
</style>
