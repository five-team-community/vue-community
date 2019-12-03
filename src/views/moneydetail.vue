<template>
  <div class="forms">
    <div id="mynote">
      <div class="content">
        <div class="title">
          <i class="el-icon-s-order"></i>
          <span>缴费详情</span>
          <div class="back">
            <el-button round size="mini" class="back-btn" icon="el-icon-arrow-left" @click="back">返回</el-button>
          </div>
        </div>

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">社区：易居社区</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">房号：{{tableData[0].inhabitantAndHousePropertyVO.housePropertyNo}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">业主姓名：{{tableData[0].inhabitantAndHousePropertyVO.inhabitant.inhabitantName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">发票订单号：{{tableData[0].payOrder}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">支付时间：{{tableData[0].payDate}}</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">剩余金额：￥{{tableData[0].payMoney}}</div>
              </el-col>
            </el-row>
            <el-row>
              
              <el-col :span="12">
                <div class="grid-content bg-purple-light">支付方式：{{tableData[0].payTheWay}}</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">缴费类型：{{tableData[0].payProject}}</div>
              </el-col>
            </el-row>
             <el-row>
              
              <el-col :span="12">
                <div class="grid-content bg-purple-light">缴费公司：{{tableData[0].company.companyName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">备注：</div>
              </el-col>
            </el-row>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      activeName: "second"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    back(){//返回房产信息列表
        this.$router.push({path:'/home/waterMoney'});
      },
  },
  created () {
    var str = location.href;
    var num = str.indexOf("=");
    str = str.substr(num+1);
    str = Number(str);
    this.axios
        .post("/pay/xiangqing",{
            payId:str,

        }) 
        .then(res => {
          this.tableData = res.data.data.Pays; 
          console.log(res.data)
        })
        .catch(err => {
          return err;
          
        })
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";
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
#mynote {
  color: @fontColor;
  background-color: #f3f3f4;
  padding: 20px 10px;
  min-height: 500px;
  .content {
    background: white;
    padding-bottom: 50px;
  }
}
.el-tabs {
  margin: 15px;
  .el-col {
    height: 80px;
    line-height: 80px;
    padding-left: 20px;
    
  }
}
.el-tabs .el-button{
  float: right;
  margin: 20px;
  background-color: @darkGreenColor;
  color: @navChoose;
}
</style>
