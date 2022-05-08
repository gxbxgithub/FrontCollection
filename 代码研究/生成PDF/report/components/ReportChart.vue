<template>
  <div>
    <v-chart
      :options="options"
      :style="{ height: '668px', width: '500px', margin: '0 auto' }"
    />
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/dataZoom";

export default {
  name: "ReportChart",
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          icon: "circle",
          left: "center",
          data: ["3rd", "10th"]
        },
        xAxis: {
          type: "category",
          data: [
            "0",
            "2月",
            "4月",
            "6月",
            "9月",
            "12月",
            "15月",
            "18月",
            "21月",
            "2岁",
            "2.5岁",
            "3岁",
            "3.5岁",
            "4岁",
            "4.5岁",
            "5岁",
            "5.5岁",
            "6岁",
            "6.5岁",
            "7岁",
            "7.5岁",
            "8岁",
            "8.5岁",
            "9岁",
            "9.5岁",
            "10岁",
            "10.5岁",
            "11岁",
            "11.5岁",
            "12岁",
            "12.5岁",
            "13岁",
            "13.5岁",
            "14岁",
            "14.5岁",
            "15岁",
            "15.5岁",
            "16岁",
            "16.5岁",
            "17岁",
            "18岁"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "3rd",
            color: "#00BCCD",
            data: [
              47.1,
              54.6,
              60.3,
              64.0,
              67.9,
              71.5,
              74.4,
              76.9,
              79.5,
              82.1,
              86.4,
              89.7,
              93.4,
              96.7,
              100.0,
              103.3,
              106.4,
              109.1,
              111.7,
              114.6,
              117.4,
              119.9,
              122.3,
              124.6,
              126.7,
              128.7,
              130.7,
              132.9,
              135.3,
              138.1,
              141.1,
              145.0,
              148.8,
              152.3,
              155.3,
              157.5,
              159.1,
              159.9,
              160.5,
              160.9,
              161.3
            ],
            type: "line",
            smooth: true
          },
          {
            name: "10th",
            color: "#23D4B8",
            data: [
              48.1,
              55.9,
              61.7,
              65.4,
              69.4,
              73.1,
              76.1,
              78.7,
              81.4,
              84.1,
              88.6,
              91.9,
              95.7,
              99.1,
              102.4,
              105.8,
              109.0,
              112.0,
              114.5,
              117.6,
              120.5,
              123.1,
              125.6,
              128.0,
              130.3,
              132.3,
              134.5,
              136.8,
              139.5,
              142.5,
              145.7,
              149.6,
              153.3,
              156.7,
              159.4,
              161.4,
              162.8,
              163.6,
              164.2,
              164.5,
              164.9
            ],
            type: "line",
            smooth: true
          }
        ],
        dataZoom: [
          {
            type: "inside"
          }
        ]
      }
    };
  }
};
</script>

<style lang="stylus" scoped></style>
