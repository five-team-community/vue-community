<template>
  <div class="addHouse">
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-edit"></i>
        <span>新增服务人员信息</span>

        <!-- 返回按钮 -->
        <div class="back">
          <el-button round size="mini" class="back-btn" icon="el-icon-arrow-left" @click="back">返回</el-button>
        </div>
      </div>
      <!-- 表单内容 -->
      <el-form
        :inline="true"
        :model="form"
        class="main"
        size="medium"
        status-icon
        label-width="100px"
        ref="ruleForm"
      >
       <el-upload
        name="photo"
        class="upload-demo"
        ref="photo"
        action="http://172.16.6.43:8080/user/testFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

</el-upload>
<el-upload
  name="photo"
  class="avatar-uploader"
  action="http://172.16.6.43:8080/user/testFile"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl:'',
      fileList: [],
      form: {}
    };
  },
  methods: {
    submitUpload() {
        this.$refs.photo.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = file
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    back() {
      //返回房产信息列表
      this.$router.push({ path: "/home/serve" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.addHouse {
  color: @fontColor;
  background-color: #f3f3f4;

  min-height: 500px;
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
  .back {
    float: right;
    .back-btn {
      padding: 5px;
    }
  }
}
.main {
  padding: 20px;
}
.el-form--inline .el-form-item {
  width: 500px;
}

.el-input--medium,
.el-select,
.time-input {
  width: 300px;
}
.reset-btn {
  background: @blueGreenColor;
  color: white;
  border-color: @blueGreenColor;
}
.el-form--inline .el-form-item[data-v-695795b9].control {
  text-align: right;
  width: 100%;
}
</style>