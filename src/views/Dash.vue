<template>
  <div class="content">
    <el-row :gutter="20" style="margin:30px 10px">
      <el-col :span="12">
        <div class="grid-content bg-purple userTotal">
          <div class="grid-content-item userCount">
            <div>
              <div class="el-icon-s-custom userIcon"></div>
              <div class="userNum">
                <span>{{userTotal}}</span>
                <br />用户总数
              </div>
            </div>
          </div>
          <div class="grid-content-item" style="width: 30%;padding:20px">
            <el-card class="box-card fix" style="height: 68px" shadow="hover">
              <i class="el-icon-thumb">登记报修</i>
            </el-card>
            <el-card class="box-card recycle" style="height:68px; margin-top:20px" shadow="hover">
              <i class="el-icon-box">登记回收</i>
            </el-card>
          </div>
          <div class="grid-content-item userEcharts">
            <v-chart :options="userOption" style="width:100%" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple communityTotal">
          <!-- 标题 -->
          <div class="title">
            <i class="el-icon-s-comment"></i>
            <span>社区统计(最新一月数据)</span>
          </div>
          <div class="clearfix">
            <div class="commentItem">
              <span style="color:#EE5F6E">{{communityNum}}</span>
              <br />
              <label>帖子总数</label>
            </div>
            <div class="commentItem">
              <span style="color: #1E85C6">{{commentNum}}</span>
              <br />
              <label>帖子评论数</label>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin:30px 10px">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <!-- 标题 -->
          <div class="title">
            <i class="el-icon-thumb"></i>
            <span>报修统计</span>
          </div>
          <el-row class="fix-row">
            <el-col :span='8'>
            <div class="num">
              <span style="color:#8E8E8E">{{fixNum.total}}</span>
              <br />
              <label>总数</label>
            </div></el-col>
            <el-col :span='16'><v-chart :options="fix" style="width:100%" /></el-col>
          </el-row>
          <el-row class="fix-row">
            <el-col :span='8'><div class="num">
              <span style="color:#EE5F6E">{{fixNum.state1}}</span><br /><label>总数</label>
            </div></el-col>
            <el-col :span='8'><div class="num">
              <span style="color:#1E85C6">{{fixNum.state2}}</span><br /><label>总数</label>
            </div></el-col>
            <el-col :span='8'><div class="num">
              <span style="color:#F8AF5F">{{fixNum.state3}}</span><br /><label>总数</label>
            </div></el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <!-- 标题 -->
          <div class="title">
            <i class="el-icon-box"></i>
            <span>回收统计</span>
          </div>
          <el-row class="recycle-row">
            <el-col :span='8'>
            <div class="num">
              <span style="color:#8E8E8E">{{recycleNum.total}}</span>
              <br />
              <label>总数</label>
            </div></el-col>
            <el-col :span='16'><v-chart :options="recycle" style="width:100%" /></el-col>
          </el-row>
          <el-row class="recycle-row">
          <el-col :span='8'><div class="num">
            <span style="color:#EE5F6E">{{recycleNum.state1}}</span><br /><label>总数</label>
          </div></el-col>
          <el-col :span='8'><div class="num">
            <span style="color:#1E85C6">{{recycleNum.state2}}</span><br /><label>总数</label>
          </div></el-col>
          <el-col :span='8'><div class="num">
            <span style="color:#F8AF5F">{{recycleNum.state3}}</span><br /><label>总数</label>
          </div></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less" scoped>
@import "../assets/less/base.less";

.userTotal {
  height: 200px;
}
.fix-row{
  border-bottom: 1px solid #F3F3F4;
  padding: 20px;
  height: 138px;
  overflow: hidden;
}
.recycle-row{
  border-bottom: 1px solid #F3F3F4;
  padding: 20px;
  height: 138px;
  overflow: hidden;
}
.title {
  padding: 15px 20px;
  line-height: 21px;
  height: 21px;
  border-top: 3px solid #e7eaec;
  border-bottom: 1px solid #e7eaec;
  i {
    margin-right: 2px;
  }
}
.num{
  padding: 0 20px;
  span {
    display: inline-block;
    line-height: 60px;
    font-size: 34px;
  }
  label{
    font-size: 14px;
    color: #8E8E8E;
  }
}
.commentItem{
  float: left;
  width: 50%;
  height: 145px;
  padding: 20px 40px;
  box-sizing: border-box;
  span {
    display: inline-block;
    line-height: 80px;
    font-size: 36px;
  }
}
.userTotal .grid-content-item {
  // width: 50%;
  float: left;
  height: 200px;
  box-sizing: border-box;
}
.userCount {
  padding: 20px;
  width: 40%;
  & > div {
    background: @greenColor;
    height: 100%;
    border-radius: 5px;
    div {
      text-align: center;
      color: white;
    }
    .el-icon-s-custom {
      width: 100%;
      text-align: center;
      font-size: 60px;
      line-height: 80px;
    }
    .userNum {
      span {
        font-size: 22px;
      }
    }
  }
}
.box-card {
  text-align: center;
  color: white;
  i {
    line-height: 28px;
  }
}
.fix {
  background: #ffd205;
}
.recycle {
  background: #ffa172;
}
.userEcharts {
  width: 30%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: white;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.cpntent {
  padding: 20px;
  color: @fontColor;
}
.part {
  background: white;
  border-radius: 5px;
}
</style>

<script>
// 导入vue-echarts插件
import ECharts from "../components/ECharts";
// 按需导入echarts的图形类型
import "echarts/lib/chart/radar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
// 导入工具部分
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
// register component to use
import "echarts/lib/component/legendScroll";
// register component to use
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markArea";
import "echarts/lib/component/dataZoom";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    var date = new Date();
    var year = date.getFullYear(); //获取完整的年份(4位)
    var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    // var year = 2019;
    // var month = 3;
    var timeData = [];
    for (var i = 0; i < 7; i++) {
      var time = year + "-" + month;

      month = month - 1;
      if (month < 1) {
        year = year - 1;
        month = 12;
      }
      timeData.unshift(time);
    }

    return {
      userTotal: 0,
      communityNum: 0,
      commentNum: 0,
      fixNum:{
        total:0,
        state1:0,
        state2:0,
        state3:0,
      },
      recycleNum:{
        total:0,
        state1:0,
        state2:0,
        state3:0,
      },
      fix: {
        title: {
           text: "半年趋势" ,
           left: 'center',
           textStyle:{
             fontSize: 14,
           }
           },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top:0,
          x: 0,
          y: 0,
          x2: 0,
          y2: 340,
        },
        xAxis: [
          {
            show: false,
            type: "category",
            boundaryGap: false,
            data: timeData
          }
        ],
        yAxis: [
          {
            show: false,
            splitLine: {
              show: false
            }
          }
        ],
        series: {
          name: "维修服务",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [3, 132, 101, 134, 90, 230],
          itemStyle: {
            normal: {
              color: "#01C0C8"
            }
          }
        }
      },
      recycle: {
        title: {
           text: "半年趋势" ,
           left: 'center',
           textStyle:{
             fontSize: 14,
           }
           },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top:0,
          x: 0,
          y: 0,
          x2: 0,
          y2: 340,
        },
        xAxis: [
          {
            show: false,
            type: "category",
            boundaryGap: false,
            data: timeData
          }
        ],
        yAxis: [
          {
            show: false,
            splitLine: {
              show: false
            }
          }
        ],
        series: {
          name: "维修服务",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: [50, 24, 57, 14, 37, 28],
          itemStyle: {
            normal: {
              color: "#FB9678"
            }
          }
        }
      },
      userOption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "用户组成",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "25%"],
            avoidLabelOverlap: false,
            legend: {
              orient: "vertical",
              x: "left",
              data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
            },
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "18",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      }
    };
  },
  created() {
    this.axios
      .post("/dynamic//lastMonthTotalCount", {
      })
      .then(res => {
        console.log(res);
        this.communityNum = res.data.data.dynamicTotalCount;
        this.commentNum = res.data.data.discussesTotalCount;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>