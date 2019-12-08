<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>回收信息详情</p>
        <a href="javascript:;" class="returnBtn" @click="returnBtn">
          <i class="el-icon-caret-left"></i>返回
        </a>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="contentBox" v-loading="loading">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">房号:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{this.tableData.housePropertyNo}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">用户:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{this.tableData.inhabitantName}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">用户联系电话:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{this.tableData.inhabitantPhone}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">回收类别:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{this.tableData.regenerantStyle}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">回收人员性别:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{this.tableData.inhabitantSex}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">登记时间:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{this.tableData.recycleTime}}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">状态:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{this.tableData.recycleState}}</div></el-col>
        </el-row>
      </div>
      <div class="btns">
        <el-button type="primary" id="pg" :class="{showBtn:isShow}" @click="add">派工</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      isShow:true,
      loading:true
    }
  },
  methods: {
    returnBtn() {
      this.$router.push({path:'/home/recycleMsg'});
    },
    add() {
      this.$confirm('确认派工', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '派工成功!'
          });
          this.axios
            .get("/InhabitantAndRecycle/updateState",
            {
              params:{
                regenerantId:this.tableData.regenerantId
              }
            })
            .then((res)=>{
              console.log(res);
            })
            .catch((err)=> {
              console.log(err);
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    }
  },
  created() {
    var str = location.href;
    var num = str.indexOf("=");
    str = str.substr(num+1);
    str = Number(str);
    console.log("回收信息编号",str);

    this.axios
      .get("/InhabitantAndRecycle/selectDetailInfoById",
      {
        params:{
          regenerantId:str
        }
      })
      .then((res)=> {
        console.log(res.data.data.inhabitantAndRecycleVO);
        this.tableData = res.data.data.inhabitantAndRecycleVO;
        this.loading = false;
        if(this.tableData.recycleState != 1) {
          console.log("需要改变状态");
          this.isShow = false;
        }
        if(this.tableData.recycleState == 1) {
          this.tableData.recycleState = "已回收";
        } else {
          this.tableData.recycleState = "未回收";
        }
      })
      .catch((err)=> {
        console.log(err);
      })
  }
}
</script>


<style lang="less" scoped>
  @import "../assets/less/base.less";
  .el-divider--horizontal {
    margin: 0;
  }
  .bg {
    /* background:#f3f3f4; */
    height:auto;
    padding:20px;
    .right {
      background: #fff;
      font-size: 13px;
      .headBox {
        text-align: left;
        padding: 14px 20px 7px;
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
      .contentBox {
        padding: 20px;
        .CBtitle{
          color: @fontColor;
          font-weight: 600;
          text-align: right;
          line-height: 45px;
          font-size: 14px;
        }
        .CBmsg{
          color: @fontColor;
          line-height: 45px;
          font-size: 14px;
        }
      }
      .btns {
        padding: 20px;
      }
    }
  }
  .showBtn {
    display: none;
  }
</style>