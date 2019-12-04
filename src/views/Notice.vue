<template>
  <div id="mynote">
    <div class="content">
      <div class="title">
        <i class="el-icon-s-order"></i>
        <span>社区公告</span>
      </div>
      <el-form :inline="true" border :model="formInline" class="demo-form-inline">
        <el-col :span="18">
          <el-form-item label="标题">
            <el-input v-model="formInline.user" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item class="block">
            <span class="demonstration">选择时间：</span>
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" @click="putout">新建公告</el-button>
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
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="expirydDate" label="创建日期"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                class="btn-show"
                @click="gotomoneydetail(scope.$index)"
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
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      loading: true,
      value2: "",
      currentPage:1,
      totalCount:0
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    search() {
      if(this.value2){
         var t = this.value2;
      console.log(this.formInline.user);
      var startTime1 =
        t[0].getFullYear() + "-" + (t[0].getMonth() + 1) + "-" + t[0].getDate();
      var endTime1 =
        t[1].getFullYear() + "-" + (t[1].getMonth() + 1) + "-" + t[1].getDate();
      console.log("开始时间:", startTime1);
      console.log("结束时间:", endTime1);
      }
     
      this.axios
        .post("/Announcement/showAll", {
            title: this.formInline.user,
            currentPage:1,
            startTime: startTime1,
            endTime: endTime1
        })
        .then(res => {
          this.tableData = res.data.data.Announcements;
          this.loading = false;
          console.log(res.data)
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
            .post("/Announcement/deleteAnnouncement", {
                announcementsId: this.tableData[index].announcementsId
            })
            .then(res => {
              console.log("删除成功", res);
              this.axios
                .post("/Announcement/showAll", {
                    currentPage: 1,
                    pageSize: 5
                })
                .then(res => {
                  //  res.data = tableData;
                  this.tableData = res.data.data.Announcements;
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
    putout() {
      this.$router.push("/home/putnote");
    },
    changePage(val) {
      this.currentPage=val;
      this.axios
      .post("/Announcement/showAll", {
          currentPage: this.currentPage,
      })
      .then(res => {
        //  res.data = tableData;
        this.tableData = res.data.data.Announcements;
        this.totalCount=res.data.data.totalCount;
        this.loading = false;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    },
    gotomoneydetail(index) {
      this.$router.push({
        path: "/home/notedetail?id=" + this.tableData[index].announcementsId
      });
    },
    currentchange() {
      console.log("当前页");
    }
  },
  created() {
    this.axios
      .post("/Announcement/showAll", {
          currentPage: 1,
      })
      .then(res => {
        //  res.data = tableData;
        this.tableData = res.data.data.Announcements;
        this.totalCount=res.data.data.totalCount;
        this.loading = false;
        console.log(res.data);
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
.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-form {
  padding-left: 20px;
  padding-top: 20px;
}
</style>
