<template>
  <div class="mynote">
    <div class="content">
      <div class="title">
        <i class="el-icon-s-order"></i>
        <span>新增公告</span>
        <div class="back">
          <el-button round size="mini" class="back-btn" icon="el-icon-arrow-left" @click="back">返回</el-button>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="公告标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="公告时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="是否推送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item class="notedetail" label="公告内容">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item class="load" label="上传图片">
          <el-upload
            name="file"
            class="avatar-uploader"
            action="http://172.16.6.66:8080/Announcement/upload"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="this.form.img" :src="this.imgurl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :plain="true" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        img: "",
        code: ""
      },
      imgurl: ""
    };
  },
  methods: {
    back() {
      this.$router.push({ path: "/home/Notice" });
    },
    handleSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw));
      this.form.img = "http://172.16.6.66:8080" + "/" + res.data.filePath;
      this.imgurl = res.data.filePath;
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onSubmit() {
      if (this.form.data1) {
        var t = this.form.date1;
        var startTime1 =
          t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
      }

      this.axios
        .post("/Announcement/addAnnouncement", {
          title: this.form.name,
          expirydDate: startTime1,
          content: this.form.desc,
          push: this.form.delivery,
          imgs: this.imgurl
        })
        .then(res => {
          if (res.data.code == "200") {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.$router.push({ path: "/home/Notice" });
          } else {
            this.$message.error("操作失败");
          }
        })
        .catch(err => {
          console.log(err);
        });

      console.log(this.form.code);
    }
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

.notedetail {
  .el-input {
    height: 100px;
  }
}
.avatar {
  width: 200px;
  height: 200px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid black;
}
</style>