<template>
  <div class="forms">
    <div id="mynote">
      <div class="content">
        <div class="title">
          <i class="el-icon-s-order"></i>
          <span>查看资讯详情</span>
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

        <el-form ref="form" :model="form" v-loading='loading' label-width="80px">
          <el-form-item label="资讯标题">
            <el-input v-model="form.ciTitle" prop="ciTitle"></el-input>
          </el-form-item>
          <el-form-item label="资讯类型">
            <el-input v-model="form.ciType" prop="ciType"></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="发布时间"
                prop="ciDate"
                v-model="form.ciDate"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item class="notedetail" label="资讯内容">
            <el-input
              type="textarea"
              v-model="form.ciContent"
              prop="ciContent"
              :autosize="{ minRows: 2, maxRows: 10}"
            ></el-input>
          </el-form-item>
           <el-form-item class="load" label="上传图片">
    <el-upload
            name="file"
            :headers="headers"
            class="avatar-uploader"
            action='/api/Announcement/upload'
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="this.imgurl" :src="imgurl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
    </el-form-item>
        </el-form>
        <div class="change" >
          <el-button type="button" icon="el-icon-edit" @click="edit"
            >修改</el-button
          >
          <el-button type="button"  @click="back"
            >取消</el-button
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
      form: {
        img:''
      },
      activeName: "second",
      imgurl:'',
      loading:true
    };
  },
  methods: {
    back() {
      this.$router.push({ path: "/home/InfO" });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
      handleSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw));
      this.imgurl = this.$store.state.ip+"/"+res.data.filePath;
      this.form.img=res.data.filePath;
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
        .post("/communityInfo/updateById", {
            id:str,
            ciTitle:this.form.ciTitle,
            ciType: this.form.ciType,
            ciContent: this.form.ciContent,
            Image:this.form.img
        })
        .then(res => {
          console.log(res.data);
          if (res.data.code == "200") {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.$router.push({ path: "/home/Info" });
          } else {
            this.$message.error("操作失败");
          }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
      this.$router.push({ path: "/home/Info" });
    }
  },
  computed: {
    headers() {
      return{
        "Authorization": sessionStorage.getItem('token'), // 直接从本地获取token就行
        "validateId": sessionStorage.getItem('validateId')
      }
    }
  },
  created() {
    var str = location.href;
    var num = str.indexOf("=");
    str = str.substr(num + 1);
    str = Number(str);
    this.axios
      .post("/communityInfo/showById", {
          id: str
      })
      .then(res => {
        this.form = res.data.data.data;
        this.form.img=res.data.data.data.ciImage;
        console.log(res.data.data.data);
        this.imgurl=this.$store.state.ip+"/"+this.form.img
        this.loading=false
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

.notedetail {
  .el-input {
    height: 100px;
  }
}
.change .el-button {
margin-left: 100px;
  margin: 20px;
  background-color: @darkGreenColor;
  color: @navChoose;
}
.avatar{
  width: 200px;
  height: 200px;
}

.avatar-uploader-icon{
  font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid black;
}
</style>
