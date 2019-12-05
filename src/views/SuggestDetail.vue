<template>
  <div class="bg">
    <div class="right">
      <div class="headBox">
        <i class="el-icon-s-open"></i>
        <p>建议信息详情</p>
        <a href="javascript:;" class="returnBtn" @click="returnBtn">
          <i class="el-icon-caret-left"></i>返回
        </a>
      </div>
      <el-divider style="margin:0"></el-divider>
      <div class="contentBox" >
        <el-row :gutter="10" v-if="tableData[0]">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">房号:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{tableData[0].housePropertyNo}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">用户:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{tableData[0].inhabitantName}}</div></el-col>
        </el-row>
        <el-row :gutter="10" v-if="tableData[0]">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">用户联系电话:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{tableData[0].telNum}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">建议内容:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{tableData[0].sugContent}}</div></el-col>
        </el-row>
        <el-row :gutter="10" v-if="tableData[0]">
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">登记时间:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{tableData[0].sugDate}}</div></el-col>
          <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="CBtitle">状态:</div></el-col>
          <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="CBmsg">{{tableData[0].sugState}}</div></el-col>
        </el-row>
        
      </div>
      <el-button class="btns" type="primary" icon="el-icon-edit" :class="{showBtn:isShow}" @click="changeStatus" >查看</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow:false,
      tableData:[]
    }
  },
  methods: {
    changeStatus() { // 更改状态
        console.log(this.tableData[0].sugState);
        console.log(this.tableData[0].sugId);
        var nowStatus = this.tableData[0].sugState;
        var nowId = this.tableData[0].sugId;
        console.log(typeof nowStatus);
        if(nowStatus == 0) {
          console.log("改变状态");
          nowStatus = 1;
        }
        this.axios
          .post("/suggestion/updateState",
          {
         
              id: nowId,
              sugState: nowStatus
        
          })
          .then((res)=> {
            console.log(res);
          })
          .catch((err)=> {
            console.log(err);
          })
        

        this.$alert('修改成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `添加成功: ${ action }`
            });
          }
        });

    
        
      },
    returnBtn() {
      this.$router.push({path:'/home/suggest'});
    }
  },
  created() { // 发送请求 渲染界面
    var str = location.href;
    var num = str.indexOf("=");
    str = str.substr(num+1);
    str = Number(str);
    console.log(str);

    this.axios
        .get("/suggestion/showById",
          {
            params: {
              id : str
            }
          })
        .then((res) => {
          console.log(res.data);
          console.log("得到的数据",res.data.data.data);
          this.tableData.push(res.data.data.data);

          if(this.tableData[0].sugState == 1) {
            this.isShow = true;
          }

          this.tableData.map((item)=> {
            console.log(item.sugState);
            if(item.sugState == 0) {
              item.sugState = "未读"
            } else {
              item.sugState = "已读"
            }
          })
        })
        .catch(err=> {
          console.log(err)
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
        margin: 20px;
      }
    }
  }
  .showBtn {
    display: none;
  }
</style>