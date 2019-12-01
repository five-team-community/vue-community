<template>
  <v-chart :options="work" />
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

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";

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
      work: {
        title: { text: "服务项目统计" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["家政服务", "报修服务", "开锁服务"]
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: timeData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "家政服务",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [3, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "维修服务",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "回收服务",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
    };
  },
  
};
</script>