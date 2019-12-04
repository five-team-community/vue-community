<template>
  <div id="show-house">
    <div class="content">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-s-order"></i>
        <span>报修信息详情</span>
        <span>(ID={{this.tabledata.infoId}})</span>
        <!-- 返回按钮 -->
        <div class="back">
          <el-button round size='mini' class="back-btn" icon='el-icon-arrow-left' @click="back">返回</el-button>
        </div>
      </div>
      <div class="main">
        <el-tabs type="border-card" v-loading="loading">
          <!-- 基本信息 -->
          <el-tab-pane>
            <span slot="label"><i class="el-icon-s-management"></i> 基本信息</span>
            <el-row :gutter="10" v-if="this.tabledata.houseProperty">
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">房号:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg" >{{this.tabledata.houseProperty.housePropertyNo}}</div></el-col>
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">用户名称:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10"  ><div class="msg">{{this.tabledata.inhabitant.inhabitantName}}</div></el-col>
            </el-row>
            <el-row :gutter="10" v-if="this.tabledata.inhabitant">
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">联系电话:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{this.tabledata.inhabitant.telNum}}</div></el-col>
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">登记时间:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{this.tabledata.regDate}}</div></el-col>
            </el-row>
            <el-row :gutter="10" v-if="this.tabledata.repairsParts">
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">报修部位:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{this.tabledata.repairsParts[0].partName}}</div></el-col>
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">报修内容:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{this.tabledata.repairContent}}</div></el-col>
            </el-row>
            <el-row :gutter="10" v-if="this.tabledata">
              <el-col :xs="24" :sm="6" :md="3" :lg="2" ><div class="item-title">状态:</div></el-col>
              <el-col :xs="24" :sm="18" :md="9" :lg="10" ><div class="msg">{{this.tabledata.repairState}}</div></el-col>
              
            </el-row>
          </el-tab-pane>

        </el-tabs>
        
      </div>
      <div class="btns">
        <el-button type="primary" id="pg" :class="{showBtn:isShow}" @click="add">派工</el-button>
      </div>
    </div>
    <el-dialog title="选择报修人员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="报修人员" :label-width="formLabelWidth">
          <el-select v-model="form.value1" placeholder="请选择报修人员">
            <el-option v-for="item in options" :key="item.staffId" :label="item.staffName" :value="item.staffId">{{item.staffName}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okBtn">确 定</el-button>
      </div>
</el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {  
      dialogFormVisible: false,
      usermsg: {},
      loading:true,
      options:[],
      tabledata:[],
      value:"",
      isShow:true,
      form: {
        value1:"",
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
  },
  methods: {
    back(){//返回房产信息列表
      this.$router.push({path:'/home/fixMsg'});
    },
    add() {
      this.dialogFormVisible = true;
      this.axios 
        .get("/staff/getRepairPersonList")
        .then((res)=>{
          console.log(res.data.data.data);
          this.options = res.data.data.data;
        })
        .catch((err)=> {
          console.log(err);
        })
    },
    okBtn() {
      console.log(this.form.value1);
      
      this.dialogFormVisible = false;
      var fixId = this.tabledata.infoId;
      console.log(fixId);
      var selectStaffId = this.form.value1;
      
      // 请求数据
      this.axios
        .get("/repairInfo/setStaff",
        {
          params:{
            infoId:fixId,
            staffId:selectStaffId
          }
        })
        .then((res)=> {
          console.log(res);
        })
        .catch((err)=> {
          console.log(err);
        })

    }
  },
  created() {// 创建时获取数据
    var str = location.href;
    var num = str.indexOf("=");
    str = str.substr(num+1);
    str = Number(str);
    console.log("报修信息编号",str);
    
    
    this.axios
      .post("/repairInfo/getRepairInfoById",
      {
          infoId:str
      })
      .then((res)=> {
        console.log(res.data.data.data);
        this.tabledata = res.data.data.data;
        this.loading = false;
        console.log(this.tabledata.repairState);
        console.log(this.tabledata);

        
        if(this.tabledata.repairState == 0) {
          console.log("可以派工");
          this.isShow = false;
        }
      })
      .catch((err)=> {
        console.log(err);
      })
  },
  computed: {}
};
</script>

<style lang="less" scoped>
@import "../assets/less/base.less";
#show-house {
  color: @fontColor;
  background-color: #f3f3f4;
  padding: 20px 10px;
  min-height: 500px;
}
.ss {
  display: none;
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
.main{
  padding: 20px;
}
.choose .el-button--text{
  margin-top: 10px;
  color: #A7B1C2;
  padding: 15px 20px;
}
.btn-choose.el-button--text{
  color: @fontColor;
  border: 1px solid @lineColor;
}
.tab-content{
  border: 1px solid @lineColor;
}
.item-title{
  color: @fontColor;
  font-weight: 600;
  text-align: right;
  line-height: 45px;
  font-size: 14px;
}
.msg{
  color: @fontColor;
  line-height: 45px;
  font-size: 14px;
}
@media screen and (max-width: 768px) {
  .item-title{
    text-align: left;
  }
}
.el-tabs--border-card>.el-tabs__content{
  padding: 30px;
}
.add-btn{
  text-align: right;
  padding: 5px 20px;
  padding-top:20px;
  margin-top: 30px;
  border-top: 1px solid @lineColor;
}
.searchTel-btn{
  background: @blueColor;
  border-color: @blueColor;
}
.btns {
  padding: 20px;
}
.showBtn {
  display: none;
}
</style>
