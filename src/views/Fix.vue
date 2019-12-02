<template>
  <div class="bg">
    <div class="right">
      <div class="head">
        <i class="el-icon-s-open"></i>
        <p>报修分类</p>
      </div>
      <el-divider></el-divider>
      <div class="button-group">
        <el-button type="primary" style="float:right;" @click="dialogFormVisible = true">添加报修部位</el-button>
      </div>
      <div class="content">
        <el-table :data="showDate" border stripe>
        <el-table-column prop="partName" label="报修部位" style="width: 50%">
        </el-table-column>
        <el-table-column prop="operate" label="操作" style="width: 50%">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="edit(scope.$index)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="del(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
          <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="8"
          layout="prev, pager, next"
          background></el-pagination>
        </div>
      </div>
      <div class="addFixPart">
        <el-dialog title="添加报修部位" :visible.sync="dialogFormVisible" >
          <el-divider></el-divider>
          <el-form :model="form" style="margin:10px 0">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="okadd">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="editFixPart">
        <el-dialog title="修改报修部位" :visible.sync="dialogFormVisible2" >
          <el-divider></el-divider>
          <el-form :model="form2" style="margin:10px 0">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form2.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="okedit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        pagesize:10,
        currentPage: 1,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form: {
          name: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        form2: {
          name: '',
          ind:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage=val;
        console.log(val);
      },
      okadd() { // 确认添加
        console.log("添加的内容",this.form.name);
        console.log(typeof(this.form.name));
        this.axios
          .get("/repairPart/addRepairsParts",
            {
              params: {
                partName: this.form.name
              }
            })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
        /* var newName = this.form.name; */
        /* tableData.push({"partName":newName}); */
        this.dialogFormVisible = false;
        
      },
      okedit() { // 确认修改
        console.log("修改的内容：",this.form2.name);
        console.log("要修改的id：",this.form2.ind+1);
        var news = this.form2.name;
        var ind = this.form2.ind+1;
        this.dialogFormVisible2 = false;
        // 请求数据
        this.axios
          .get("/repairPart/addRepairsPartsById",
          {
            params: {
              partId: ind,
              partName: news
            }
          })
      },
      del(index) { //删除
        console.log(index+(this.pagesize)*(this.currentPage-1));
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 请求数据
          this.axios
            .get("/repairPart/removeRepairsPartsById",
            {
              params: {
                partId : index
              }
            })
            .then((res)=> {
              console.log(res)
            })
            .catch((err)=> {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      edit(index) { //修改
        this.dialogFormVisible2 = true;
        this.form2.ind = index;
        console.log("选择的id",index);
      }
    },
    created() {
      this.axios
        .get("/repairPart/getAllRepairsParts",
        {
          params: {
            pageSize: this.pagesize,
            currentPage: this.currentPage
          }
        })
        .then((res) => {
          console.log(res.data.data.data);
          this.tableData = (res.data.data.data);
          console.log(this.tableData);
        })
        .catch(err=> {
          console.log(err)
        }) 
    },
    computed: {
      showDate() {
        var start = 10*(this.currentPage-1);
        return this.tableData.slice(start,start+10);
      }
    }
  }
</script>

<style lang="less" scoped>
  .bg {
    background:#f3f3f4;
    height:auto;
    padding:20px 10px;
    .right {
      background: #fff;
      font-size: 13px;
      .head {
        text-align: left;
        padding: 12px 20px;
        p {
          display: inline;
          color: #606266;
          font-weight: 600;
        }
      }
      .button-group {
        height: 40px;
        margin: 10px 0;
        padding: 0 20px;
      }
      .content {
        padding: 20px;
      }
    }
  }

  .el-divider--horizontal {
    margin: 0;
  }
  
</style>