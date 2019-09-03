<template>
  <div class="lineEchart" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from "echarts";
// 引入折线图等组件
require("echarts/theme/macarons");

export default {
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  methods: {
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          boundaryGap: false,
          axisTick: {
            show: true
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: [
          {
            type: "value",
            name: "订单数量(笔)",
            axisLine: {
              lineStyle: {
                color: "#FF005A"
              }
            },
            min: 0
          },
          {
            type: "value",
            name: "交易金额(元)",
            min: 0
          }
        ],
        legend: {
          data: ["订单数量", "交易金额"]
        },
        series: [
          {
            name: "订单数量",
            yAxisIndex: "0",
            showAllSymbol: true, //动画效果
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",
            data: expectedData,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "交易金额",
            yAxisIndex: "1",
            showAllSymbol: true, //动画效果
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          }
        ]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  mounted() {
    console.log(this.$el);
    this.initChart();
  }
};
</script>

<style lang="scss" scoped>
.lineEchart {
  width: 100%;
  height: 300px;
}
</style>
