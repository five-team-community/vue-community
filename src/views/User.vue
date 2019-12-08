<template>
  <div id="user">
    <!-- 标题 -->
    <div class="title">
      <i class="el-icon-s-order"></i>
      用户列表
    </div>
    <!-- 筛选数据的输入表单 -->
    <div class="choose">
      <el-form :inline="true" :model="search" class="demo-form-inline" size="small">
        <el-form-item label="姓名">
          <el-input v-model="search.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="search.tel" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="search.role" placeholder="选择角色">
            <el-option label="全部" value></el-option>
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="服务人员" value="服务人员"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
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
      <el-table :data="userData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="用户名" width="200"></el-table-column>
        <el-table-column prop="realName" label="真实姓名"></el-table-column>
        <el-table-column prop="tel" label="手机号"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="time" label="注册时间"></el-table-column>
        <el-table-column prop="state" label="用户状态"></el-table-column>

        <!-- 相关操作按钮 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom">
              <el-button type="primary" icon="el-icon-search" size="mini" class="btn-show" @click="show(scope.$index)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                <el-button type="info" icon="el-icon-edit-outline" size="mini" class="btn-alter" @click="alter(scope.$index)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="解除" placement="bottom">
                 <el-button type="danger" icon="el-icon-lock" size="mini" @click="unlock(scope.$index)" v-show="userData[scope.$index].state=='禁用'"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="禁用" placement="bottom">
                 <el-button type="primary" icon="el-icon-unlock" size="mini" @click="lock(scope.$index)" v-show="userData[scope.$index].state=='正常'"></el-button>
              </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="clearfix" v-show="!loading">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="5"
          :total="totalPage"
          :pager-count="5"
          :hide-on-single-page="true"
          @current-change="changePage"
          class="page"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// 模拟的数据

export default {
  data() {
    return {
      loading: true,
      pageSize: 5,
      currentPage: 1, //记录当前页
      totalPage: 0,
      search: {
        //记录筛选的数据项
        name: "",
        tel: "",
        role: ""
      },
      userData: [] //表单所以数据
    };
  },
  methods: {
    exclude() {
      //导出报表
      window.location.href = this.$store.state.ip + "/user/excludeExcel";
    },
    lock(index) {
      this.userData[index].state="禁用";
      var id = this.userData[index].id;
      console.log("禁用", id);
      this.axios
        .post("/user/changeState", {
          userId : id,
          userState:"0"
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    unlock(index) {
      this.userData[index].state="正常";
      var id = this.userData[index].id;
      console.log("解除", id);
      this.axios
        .post("/user/changeState", {
          userId : id,
          userState:"1"
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchMsg() {
      //**********************搜索**************************
      console.log("搜索", this.search);
      this.currentPage = 1;
      this.loading = true;
      this.axios
        .post("/user/showBySearch", {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          telNum: this.search.tel,
          realName: this.search.name,
          roleName: this.search.role
        })
        .then(res => {
          console.log("查询", res);
          this.userData = this.formateData(res.data.data.data);
          console.log(this.userData);
          this.totalPage = res.data.data.count;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    show(index) {
      //查看
      var id = this.userData[index].id;
      this.$router.push({ path: "/home/showUser/" + id });
    },
    alter(index) {
      //修改
      var id = this.userData[index].id;
      this.$router.push({ path: "/home/alterUser/" + id });
    },
    changePage(val) {
      //改变页码
      this.currentPage = val;
      this.loading = true;
      this.axios
        .post("/user/showBySearch", {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          telNum: this.search.tel,
          realName: this.search.name,
          roleName: this.search.role
        })
        .then(res => {
          console.log("查询", res);
          this.userData = this.formateData(res.data.data.data);
          console.log(this.userData);
          this.totalPage = res.data.data.count;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
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
      var arr = [];
      for (var i = 0; i < list.length; i++) {
        var item = {};
        item.id = list[i].userId;
        item.name = list[i].userName;
        item.realName = list[i].realName;
        item.role = list[i].roleName;
        item.tel = list[i].telNum;
        item.time = this.switchTimeFormat(list[i].registerTime);
        if (list[i].userState == 1) {
          item.state = "正常";
        } else {
          item.state = "禁用";
        }
        arr.push(item);
      }
      return arr;
    }
  },
  created() {
    // **************************************获取数据请求*********************************************
    this.axios
      .post("/user/showUserList", {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      .then(res => {
        console.log("查询", res);
        this.userData = this.formateData(res.data.data.data);
        console.log(this.userData);
        this.totalPage = res.data.data.count;
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
#user {
  color: @fontColor;
  background-color: white;
  height: 100%;
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