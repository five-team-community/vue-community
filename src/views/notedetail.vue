<template>
  <div class="forms">
    <div id="mynote">
      <div class="content">
        <div class="title">
          <i class="el-icon-s-order"></i>
          <span>查看公告详情</span>
          <div class="back">
            <el-button
              round
              size="mini"
              class="back-btn"
              icon="el-icon-arrow-left"
              @click="back"
              >返回</el-button
            >
          </div>
        </div>

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="公告标题">
            <el-input v-model="form.title" prop="title"></el-input>
          </el-form-item>
          <el-form-item label="公告时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                prop="expirydDate"
                v-model="form.expirydDate"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="是否推送">
            <el-switch v-model="form.push" prop="push"></el-switch>
          </el-form-item>
          <el-form-item class="notedetail" label="公告内容">
            <el-input
              type="textarea"
              v-model="form.content"
              prop="content"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="change">
          <el-button type="button" icon="el-icon-edit" @click="edit"
            >修改</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      activeName: "second"
    };
  },
  methods: {
    back() {
      this.$router.push({ path: "/home/NeedDo" });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    edit() {
      var str = location.href;
      var num = str.indexOf("=");
      str = str.substr(num + 1);
      str = Number(str);

      this.axios
        .get("/Announcement/update", {
          params: {
            announcementsId: str,
            title: this.form.title,
            expirydDate: this.expirydDate,
            push: this.push,
            content: this.content
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          return err;
        });
      this.$router.push({ path: "/home/Notice" });
    }
  },
  created() {
    var str = location.href;
    var num = str.indexOf("=");
    str = str.substr(num + 1);
    str = Number(str);
    this.axios
      .get("/Announcement/showOne", {
        params: {
          announcementsId: str
        }
      })
      .then(res => {
        this.form = res.data.data.Announcement;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";
.mynote {
  color: @fontColor;
  background-color: #f3f3f4;
  padding: 20px 10px;
  min-height: 500px;
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
.btn {
  height: 40px;
}
.btn > div {
  float: right;
  margin-right: 30px;
  color: white;
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
.el-form {
  padding: 50px 30px;
}
.el-form-item {
  height: 40px;
}
.notedetail {
  .el-input {
    height: 100px;
  }
}
.change .el-button {
  float: right;
  margin: 20px;
  background-color: @darkGreenColor;
  color: @navChoose;
}
</style>
