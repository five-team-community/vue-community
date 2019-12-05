<template>
  <div id="mynote">
    <div class="content">
      <div class="title">
        <i class="el-icon-s-order"></i>
        <span>社区活动报名表</span>
      </div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-col :span="14">
          <el-form-item label="姓名：">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sexs" placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-row>
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
            <el-button icon="el-icon-upload" class="btn-exclude" @click="exclude">导出报表</el-button>
          </el-row>
        </el-col>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100% ;text-align:center;"
      >
        <el-table-column prop="inhabitantName" label="姓名"></el-table-column>
        <el-table-column prop="inhabitantSex" label="性别"></el-table-column>
        <el-table-column prop="birthplace" label="籍贯"></el-table-column>
        <el-table-column prop="telNum" label="联系电话"></el-table-column>
        <el-table-column prop="idCardNo" label="身份证号"></el-table-column>
        <el-table-column prop="workingUnit" label="家庭地址"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="2"
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
        region: "",
        sexs: ""
      },
      options: {},
      tableData: [
      ],
      loading: true,
      currentPage: 1,
      totalCount: 0
    };
  },
  methods: {
    handleEdit() {
      this.$router.push({
        path: "/home/addActivity"
      });
    },
    changePage(val) {
       var str = location.href;
      var num = str.indexOf("=");
      str = str.substr(num + 1);
      str = Number(str);
      console.log(this.currentPage);
      this.currentPage = val;
      this.axios
        .post("/activity/showActivityUser", {
          pageIndex: this.currentPage,
          pageSize: 2,
          activityId:str
        })
        .then(res => {
          this.tableData = res.data.data.userList;
          this.totalCount=res.data.data.totalCount;
          console.log(res.data);
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      var str = location.href;
      var num = str.indexOf("=");
      str = str.substr(num + 1);
      str = Number(str);
      console.log(this.form.user, this.form.sexs, this.currentPage);
      this.axios
        .post("/activity/showActivityUser", {
          inhabitantName: this.form.user,
          pageIndex: this.currentPage,
          pageSize: 5,
          inhabitantSex: this.form.sexs,
          activityId: str
        })
        .then(res => {
          this.tableData = res.data.data.userList;
          this.totalCount=res.data.data.totalCount;
          this.loading = false;
          console.log(res.data);
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
    applydetail(index) {
      this.$router.push({
        path: "/home/applydetail?id=" + this.tableData[index].activityId
      });
    },
    exclude() {
      //导出报表
      window.location.href =
       this.$store.state.ip+"/activity/userList?activityId=1";
    }
  },
  created() {
    var str = location.href;
    var num = str.indexOf("=");
    str = str.substr(num + 1);
    str = Number(str);
    this.axios
      .post("/activity/showActivityUser", {
        pageIndex: this.currentPage,
        pageSize: 2,
        activityId: str
      })
      .then(res => {
        //  res.data = tableData;
        this.tableData = res.data.data.userList;
        this.totalCount = res.data.data.totalCount;
        console.log(res.data);
        console.log(res.data.data.totalCount)
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
.el-pagination {
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
.el-form {
  padding-left: 20px;
  padding-top: 20px;
}
.el-table {
  text-align: center;
}
</style>
