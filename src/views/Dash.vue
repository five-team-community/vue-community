<template>
  <div class="content">
    <el-row :gutter="20" style="margin:30px 10px">
      <el-col :span="12">
        <div class="grid-content bg-purple userTotal">
          <div class="grid-content-item userCount">
            <div class="toUser">
              <div class="el-icon-s-custom userIcon"></div>
              <div class="userNum">
                <span>{{userTotal}}</span>
                <br />用户总数
              </div>
            </div>
          </div>
          <div class="grid-content-item" style="width: 30%;padding:20px">
            <div  @click="toFix">
              <el-card class="box-card fix" style="height: 68px" shadow="hover">
              <i class="el-icon-s-order">查看资讯</i>
            </el-card>
            </div>
            <div @click="toRecycle">
              <el-card class="box-card recycle" style="height:68px; margin-top:20px" shadow="hover">
              <i class="el-icon-s-claim">查看公告</i>
            </el-card>
            </div>
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
            <div class="right-btn">
              <router-link to="/home/fixMsg">
                查看更多
                <i class="el-icon-arrow-right"></i>
              </router-link>
            </div>
          </div>
          <el-row class="fix-row">
            <el-col :span="8">
              <div class="num">
                <span style="color:#8E8E8E">{{fixNum.total}}</span>
                <br />
                <label>总数</label>
              </div>
            </el-col>
            <el-col :span="16">
              <v-chart :options="fix" style="width:100%" />
            </el-col>
          </el-row>
          <el-row class="fix-row">
            <el-col :span="8">
              <div class="num">
                <span style="color:#EE5F6E">{{fixNum.state1}}</span>
                <br />
                <label>未受理</label>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="num">
                <span style="color:#1E85C6">{{fixNum.state2}}</span>
                <br />
                <label>待处理</label>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="num">
                <span style="color:#F8AF5F">{{fixNum.state3}}</span>
                <br />
                <label>已完成</label>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <!-- 标题 -->
          <div class="title">
            <i class="el-icon-box"></i>
            <span>回收统计</span>
            <div class="right-btn">
              <router-link to="/home/recycleMsg">
                查看更多
                <i class="el-icon-arrow-right"></i>
              </router-link>
            </div>
          </div>
          <el-row class="recycle-row">
            <el-col :span="8">
              <div class="num">
                <span style="color:#8E8E8E">{{recycleNum.total}}</span>
                <br />
                <label>总数</label>
              </div>
            </el-col>
            <el-col :span="16">
              <v-chart :options="recycle" style="width:100%" />
            </el-col>
          </el-row>
          <el-row class="recycle-row">
            <el-col :span="8">
              <div class="num">
                <span style="color:#EE5F6E">{{recycleNum.state1}}</span>
                <br />
                <label>总数</label>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="num">
                <span style="color:#1E85C6">{{recycleNum.state2}}</span>
                <br />
                <label>总数</label>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="num">
                <span style="color:#F8AF5F">{{recycleNum.state3}}</span>
                <br />
                <label>总数</label>
              </div>
            </el-col>
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
.right-btn {
  float: right;
  a {
    color: #8e8e8e;
  }
}
.userTotal {
  height: 200px;
}
.fix-row {
  border-bottom: 1px solid #f3f3f4;
  padding: 20px;
  height: 138px;
  overflow: hidden;
}
.recycle-row {
  border-bottom: 1px solid #f3f3f4;
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
.num {
  padding: 0 20px;
  span {
    display: inline-block;
    line-height: 60px;
    font-size: 34px;
  }
  label {
    font-size: 14px;
    color: #8e8e8e;
  }
}

.commentItem {
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
  cursor: pointer;
  text-align: center;
  color: white;
  i {
    display: inline-block;
    width: 100%;
    height: 100%;
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
    return {
      userTotal: 0,
      communityNum: 0,
      commentNum: 0,
      fixNum: {
        total: 0,
        state1: 0,
        state2: 0,
        state3: 0
      },
      recycleNum: {
        total: 15,
        state1: 2,
        state2: 5,
        state3: 8
      },
      userNum: {},
      fix: {
        title: {
          text: "半年趋势",
          left: "center",
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: 0,
          x: 0,
          y: 0,
          x2: 0,
          y2: 340
        },
        xAxis: [
          {
            show: false,
            type: "category",
            boundaryGap: false
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
          text: "半年趋势",
          left: "center",
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: 0,
          x: 0,
          y: 0,
          x2: 0,
          y2: 340
        },
        xAxis: [
          {
            show: false,
            type: "category",
            boundaryGap: false
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
      userOption: {}
    };
  },
  methods:{
    toFix(){
      console.log("aaa");
      this.$router.push({ path: "/home/info" });
    },
    toRecycle(){
this.$router.push({ path: "/home/Notice" });
    },
    toUser(){
this.$router.push({ path: "/home/user" });
    }
  },
  created() {
    // 获取社区数据
    this.axios
      .post("/dynamic/lastMonthTotalCount", {})
      .then(res => {
        console.log(res);
        this.communityNum = res.data.data.dynamicTotalCount||0;
        this.commentNum = res.data.data.discussesTotalCount||0;
      })
      .catch(err => {
        console.log(err);
      });

    // 报修数据
    this.axios
      .post("/repairInfo/getAllStaCount", {})
      .then(res => {
        console.log(res);
        this.fixNum.state1 = res.data.data.count1||0;
        this.fixNum.state2 = res.data.data.count2||0;
        this.fixNum.state3 = res.data.data.count3||0;
        this.fixNum.total =
          res.data.data.count1 + res.data.data.count2 + res.data.data.count3;
      })
      .catch(err => {
        console.log(err);
      });

    // 用户数据
    this.axios
      .post("/user/countList", {})
      .then(res => {
        console.log(res);

        this.userNum = [
          { value: res.data.data.godCount||0, name: "住户" },
          { value: res.data.data.inhabitantCount||0, name: "业主" },
          { value: res.data.data.staffCount||0, name: "服务人员" },
          { value: res.data.data.adminCount||0, name: "管理员" }
        ];
        this.userTotal =
          res.data.data.godCount +
          res.data.data.adminCount +
          res.data.data.inhabitantCount +
          res.data.data.staffCount;
        this.userOption = {
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
                x: "left"
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
              data: this.userNum,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                },
                normal: {
                  color: function(params) {
                    //自定义颜色
                    var colorList = [
                      "#4DD3D8",
                      "#F8AF5F",
                      "#FCB5A0",
                      "#FFD205",
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        };
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>