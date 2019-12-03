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
          <el-form-item label="活动名称">
            <el-input v-model="form.activityName" prop="activityName"></el-input>
          </el-form-item>
          <el-form-item label="活动地址">
            <el-input v-model="form.activityAddress" prop="activityAddress"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="开始时间"
                prop="startTime"
                v-model="form.startTime"
              ></el-date-picker>
            </el-col>
            <el-form-item label="结束时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="结束时间"
                prop="endtime"
                v-model="form.endTime"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input v-model="form.description" prop="description"></el-input>
          </el-form-item>
          <el-form-item class="notedetail" label="活动内容">
            <el-input
              type="textarea"
              v-model="form.content"
              prop="content"
            ></el-input>
          </el-form-item>
          <el-form-item label="报名人数">
            <el-input v-model="form.count" prop="count" disabled="true" ></el-input>
          </el-form-item>
          <el-button type="file" icon="el-icon-submit">上传图片</el-button>
        </el-form>
        <div class="change" >
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
        .post("/activity/update", {
            activityId: str,
            activityName: this.form.activityName,
            activityAddress: this.form.activityAddress,
            endTime: this.form.endTime,
            startTime:this.form.startTime,
            content: this.form.content,
            description:this.form.description,
            count:this.form.count,
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          return err;
        });
      this.$router.push({ path: "/home/Activity" });
    }
  },
  created() {
    var str = location.href;
    var num = str.indexOf("=");
    str = str.substr(num + 1);
    str = Number(str);
    this.axios
      .post("/activity/showOne", {
          activityId: str
      })
      .then(res => {
        this.form = res.data.data.Activity;
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
