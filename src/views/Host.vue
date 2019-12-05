<template>
  <div id="host">
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-s-order"></i>
        业主信息列表
      </div>
      <!-- 筛选数据的输入表单 -->
      <div class="choose">
        <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
          <el-form-item label="房号：">
            <el-input v-model="search.houseNum" placeholder="请输入房号"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="search.host" placeholder="请输入业主姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="search.telphone" placeholder="请输入预留手机号"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 新增和搜索按钮 -->
      <div class="btn" style="text-align:right;margin-right:30px">
        <el-button icon="el-icon-upload" class="btn-exclude" @click="exclude">导出报表</el-button>
        <el-button icon="el-icon-search" class="btn-search" @click="searchMsg">搜素</el-button>
      </div>

      <!-- 表格数据 -->
      <div class="mytable">
        <el-table :data="hostData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="no" label="房号"></el-table-column>
          <el-table-column prop="name" label="真实姓名"></el-table-column>
          <el-table-column prop="idCard" label="身份证号码" width="180px"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="tel" label="手机号"></el-table-column>
          <el-table-column prop="time" label="绑定时间"></el-table-column>
          <el-table-column prop="link" label="关联注册用户"></el-table-column>
          <!-- 相关操作按钮 -->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                class="btn-show"
                @click="show(scope.$index)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-edit-outline"
                size="mini"
                class="btn-alter"
                @click="alter(scope.$index)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                class="btn-del"
                @click="del(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="clearfix" v-show="!loading">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalPage"
            :pager-count="5"
            :hide-on-single-page="true"
            @current-change="changePage"
            class="page"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 模拟的数据

export default {
  data() {
    return {
      loading: true,  //加载标识符
      currentPage: 1, //记录当前页
      pageSize: 5,  //每页显示数
      totalPage: 0,  //数据总数
      search: {
        //记录筛选的数据项
        houseNum: "",
        host: "",
        telphone: ""
      },
      hostData: [] //表单所以数据
    };
  },
  methods: {

    searchMsg() {
      //****************************搜索******************************
      this.loading = true;
      this.currentPage = 1;
      this.axios
        .post("/inhabitant/searchInhabitant", {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          houseNo: this.search.houseNum,
          name: this.search.host,
          telNum: this.search.telphone
        })
        .then(res => {
          console.log("aaa", res);
          this.hostData = [];
          this.formateData(res.data.data.data);
          this.totalPage = res.data.data.count;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    show(index) {
      //查看
      var id = this.hostData[index].id;
      this.$router.push({ path: "/home/showHost/" + id });
    },

    alter(index) {
      //修改
      var id = this.hostData[index].id;
      this.$router.push({ path: "/home/alterHost/" + id });
    },

    del(index) {
      //***********************************删除**************************************
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id = this.hostData[index].id;
          this.axios.post("/inhabitant/removeInhabitant", {
            id: id
          })
          .then(res => {
            if (res.data.message == "删除成功") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });

              // 删除成功后重新获取数据
              this.axios.post("/inhabitant/showInhabitants", {
                currentPage: this.currentPage,
                pageSize: this.pageSize
              })
              .then(res => {
                console.log(res);
                this.hostData = [];
                this.formateData(res.data.data.data);
                this.loading = false;
              })
              .catch(err => {
                console.log(err);
              });
            }
            else{
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: "删除出错!"
            });
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
    changePage(val) {
      //改变页码
      this.currentPage = val;
      this.loading = true;
      this.axios
        .post("/inhabitant/searchInhabitant", {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          houseNo: this.search.houseNum,
          name: this.search.host,
          telNum: this.search.telphone
        })
        .then(res => {
          console.log(res);
          this.hostData = [];
          this.formateData(res.data.data.data);
          this.totalPage = res.data.data.count;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    exclude() {
      //导出报表

      window.location.href = this.$store.state.ip +"/inhabitant/excludeExcel";
    },
    addZero(v) {
      return v < 10 ? "0" + v : v;
    },
    switchTimeFormat(time) {
      const dateTime = new Date(time);
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const date = dateTime.getDate();

      return `${year}-${this.addZero(month)}-${this.addZero(date)}`;
    },
    formateData(list) {
      for (var i = 0; i < list.length; i++) {
        var item = {};
        item.id = list[i].inhabitantId;
        item.no = list[i].housePropertyList[0].housePropertyNo;
        item.name = list[i].inhabitantName;
        item.idCard = list[i].idCardNo;
        item.sex = list[i].inhabitantSex;
        item.tel = list[i].telNum;
        item.time = this.switchTimeFormat(list[i].checkInTime);
        item.link = list[i].user.userName;
        this.hostData.push(item);
      }
    }
  },
  created() {
    this.axios
      .post("/inhabitant/showInhabitants", {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        console.log(res);
        this.hostData = [];
        this.totalPage = res.data.data.count;
        this.formateData(res.data.data.data);
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
#host {
  color: @fontColor;

  background-color: white;

  height: 100%;
}
.content {
  background: white;
}
.title {
  padding: 15px 20px;
  border-top: 3px solid #e7eaec;
  border-bottom: 1px solid #e7eaec;
  i {
    margin-right: 2px;
  }
}
.choose {
  padding: 20px 20px 0 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.box-info {
  width: 100px;
  float: left;
  line-height: 40px;
  text-align: right;
}
.myinput {
  margin-left: 100px;
}
.myinput .el-input {
  width: 90%;
}

.btn {
  margin-left: 30px;
  color: white;
  .btn-exclude {
    color: @yellowColor;
    border-color: @yellowColor;
    &:hover {
      color: white;
      background: @yellowColor;
    }
  }
  .btn-add {
    background: @greenColor;
    color: white;
    &:hover {
      background: @darkGreenColor;
    }
  }
  .btn-search {
    background: @blueColor;
    color: white;
    &:hover {
      background: @darkBlueColor;
    }
  }
}
.mytable {
  padding: 20px 30px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 3px;
}
.btn-alter {
  background: @blueColor;
  border-color: @blueColor;
}
.page {
  float: right;
  margin-top: 20px;
}
</style>