<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>新增报修信息</p>
        <a href="javascript:;" class="returnBtn" @click="returnBtn">
          <i class="el-icon-caret-left"></i>返回
        </a>
      </div>
      <el-divider></el-divider>
      <div class="add-content">
        <el-row>
          <el-col :span="4" class="add-left">
            <p>
              房产
              <span>*</span>：
            </p>
          </el-col>
          <el-col :span="20" class="add-right">
            <a href="javascript:;" class="chooseUser">
              <i class="el-icon-user-solid"></i>
              <el-button type="text" @click="dialogTableVisible = true">选择用户</el-button>
            </a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="add-left">
            <p>
              电话
              <span>*</span>：
            </p>
          </el-col>
          <el-col :span="20" class="add-right">
            <input class="writePho" type="text" placeholder="请输入电话号码" style="width:60%;" />
          </el-col>
        </el-row>
        <el-row class="textarea-row">
          <el-col :span="4" class="add-left">
            <p>
              内容
              <span>*</span>：
            </p>
          </el-col>
          <el-col :span="20" class="add-right">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea"
              style="width:60%;"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="upload-row">
          <el-col :span="4" class="add-left">
            <p>图片：</p>
          </el-col>
          <el-col :span="20" class="add-right">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :file-list="fileList"
            >
              <el-button
                size="small"
                type="primary"
                style="background:rgb(221,221,221);border:none;color:#676a6c"
              >
                <i class="el-icon-upload2"></i>点击上传
              </el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="btn-row">
          <el-col :span="24">
            <el-button type="success" style="float:right;margin-left:10px;padding: 10px 14px;">
              <i class="el-icon-folder-checked"></i>保存
            </el-button>
            <el-button type="primary" style="float:right;padding: 10px 14px;">
              <i class="el-icon-refresh-right"></i>重置
            </el-button>
            <el-button type="danger" style="float:right;padding: 10px 14px;">
              <i class="el-icon-close"></i>取消
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 模态框 -->
    <div>
      <el-dialog title="请选择用户" :visible.sync="dialogTableVisible">
        <el-divider></el-divider>
        <el-col :span="12" style="margin:10px 0;">
          <span>手机号：</span>
          <input type="text" placeholder="请输入手机号" style="padding:6px 12px" />
        </el-col>
        <el-col :span="12" style="margin:10px 0;">
          <el-button type="primary" style="padding:8px 16px;float:right">
            <i class="el-icon-search"></i>查询
          </el-button>
        </el-col>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="用户姓名" width="320"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="8"
        ></el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
var tableData = [
  {
          phone:"12365498755",
          name: "王小虎",

        },
        {
          phone:"12365498755",
          name: "王小虎",

        },
        {
          phone:"12365498755",
          name: "王小虎",

        },
        {
          phone:"12365498755",
          name: "王小虎",

        },
        {
          phone:"12365498755",
          name: "王小虎",

        },
        {
          phone:"12365498755",
          name: "王小虎",

        },
        {
          phone:"12365498755",
          name: "王小虎",

        }
];

export default {
  data() {
    return {
      textarea: "",
      currentPage: 1,
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      tableData: [],
      multipleSelection: [],
      dialogTableVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    returnBtn() {
      this.$router.push({path:'/home/fixMsg'});
    },
     handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  created() {
    this.tableData = tableData;
  },
  computed: {
    showData() {
      var start = 5*(this.currentPage-1);
      return this.tableData.slice(start,start+5);
    }
  },
  
};
</script>

<style lang="less" scoped>
  .bg {
    background:#f3f3f4;
    height:auto;
    padding:20px 10px;
  }
.right {
  background: #fff;
  font-size: 13px;
  .headBox {
    padding: 14px 20px 7px;
    text-align: left;
    p {
      display: inline;
      color: #606266;
      font-weight: 600;
    }
    .returnBtn {
      border: 1px solid #23c6c8;
      padding: 1px 5px;
      border-radius: 50px;
      color: #23c6c8;
      float: right;
    }
  }
  .add-content {
    padding: 15px 20px 20px;
    .el-row {
      height: 50px;
      margin: 5px 0;
    }
    .el-col-4 {
      text-align: right;
    }
    p {
      color: #676a6c;
      font-weight: 600;
      float: left;
      padding: 5px 15px 0;
      float: right;
      span {
        color: red;
        font-weight: 600;
      }
    }
    .chooseUser {
      border: 1px solid #f8ac59;
      background: #fff;
      color: #f8ac59;
      padding: 2px 5px;
      border-radius: 3px;
    }
    .writePho {
      text-indent: 15px;
      padding: 6px 0;
      border: 1px solid #e5e6e7;
    }
    .textarea-row {
      height: 70px;
    }
    .upload-row {
      height: auto;
    }
    .btn-row {
      margin: 10px 0;
    }
  }
}

.el-divider {
  margin: 0;
}
</style>