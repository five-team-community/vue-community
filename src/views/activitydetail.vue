<template>
  <div class="forms">
    <div id="mynote">
      <div class="content">
        <div class="title">
          <i class="el-icon-s-order"></i>
          <span>查看活动详情</span>
          <div class="back">
            <el-button round size="mini" class="back-btn" icon="el-icon-arrow-left" @click="back">返回</el-button>
          </div>
        </div>
        <el-form  ref="form" :model="form" v-loading="loading"  label-width="80px">
          <el-row>
                <el-col span="12">
          <el-form-item label="活动名称">
            <el-input v-model="form.activityName" prop="activityName"></el-input>
          </el-form-item>
             </el-col>
             <el-col span="12">
          <el-form-item label="活动地址"  >
            <el-input v-model="form.activityAddress" prop="activityAddress" ></el-input>
          </el-form-item>
             </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
          <el-form-item label="开始时间">
            <el-date-picker type="date" placeholder="开始时间"  prop="startTime" v-model="form.startTime" ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col span="12">
            <el-form-item label="结束时间">
              <el-date-picker type="date" placeholder="结束时间" prop="endtime" v-model="form.endTime"></el-date-picker>
            </el-form-item>
          </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
          <el-form-item label="联系人">
            <el-input v-model="form.contactsName" prop="contactsName"></el-input>
          </el-form-item>
                </el-col>
                <el-col span="12">
          <el-form-item label="联系方式">
            <el-input v-model="form.contactsPhone" prop="contactsPhone"></el-input>
          </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="12">
          <el-form-item label="活动描述">
            <el-input v-model="form.description" prop="description"></el-input>
          </el-form-item>
                </el-col>
                <el-col span="12">
          <el-form-item label="报名人数">
            <el-input v-model="form.count" prop="count" disabled></el-input>
          </el-form-item>
                </el-col>
          </el-row>
          <el-form-item class="notedetail" label="活动内容">
            <el-input type="textarea" v-model="form.content" prop="content"></el-input>
          </el-form-item>
          
          <el-form-item class="load" label="图片">
            <el-upload
              name="file"
              :headers="headers"
              class="avatar-uploader"
              action='/api/Announcement/upload'
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="this.form.img" :src="'http://172.16.6.43:8080/'+this.form.img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="change">
          <el-button type="button" icon="el-icon-edit" @click="edit">修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        img: ""
      },
      activeName: "second",
      imgurl: "",
      loading: true
    };
  },
  methods: {
    back() {
      this.$router.push({ path: "/home/NeedDo" });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw));
      this.form.img = this.$store.state.ip+ "/" + res.data.filePath;
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
          startTime: this.form.startTime,
          content: this.form.content,
          contactsName: this.form.contactsName,
          contactsPhone: this.form.contactsPhone,
          count: this.form.count
        })
        .then(res => {
          console.log(res.data);
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
        this.form.img = res.data.data.Activity.img;
        console.log(res.data);
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },
  computed: {
    headers() {
      return{
        "Authorization": sessionStorage.getItem('token'), // 直接从本地获取token就行
        "validateId": sessionStorage.getItem('validateId')
      }
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

.notedetail {
  .el-input {
    height: 100px;
  }
}
.change .el-button {
  background-color: @darkGreenColor;
  color: @navChoose;
  margin-left: 80px;
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
