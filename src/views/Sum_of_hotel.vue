<template>
  <div class="SumOfHotel" @click="screenRule = false">
    <div id="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%;line-height:18px"
        max-height="850"
      >
        <el-table-column prop="business" label="纳税行业"></el-table-column>
        <el-table-column prop="time" label="纳税时间"></el-table-column>
        <el-table-column prop="MSection" label="管理科室"></el-table-column>
        <el-table-column prop="tel" label="联系电话"></el-table-column>
        <el-table-column prop="pay" label="实际缴纳金额"></el-table-column>
        <el-table-column prop="cal" label="预计缴纳金额"></el-table-column>
        <el-table-column prop="D_value" label="缴纳差值"></el-table-column>
      </el-table>
    </div>
    <div id="search">
      <el-date-picker
        class="searchInput"
        v-model="value2"
        value-format="yyyy-MM"
        type="monthrange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-button id="searchSubmit" @click="searchSubmit">查询</el-button>
    </div>
    <div id="drawChart">
      <el-button id="chartBtn" @click.stop="screenRule = true"
        >图表绘制</el-button
      >
    </div>

    <div id="chart" :style="{ display: changeScreenRule }">
      <div id="mainChart" @click.stop="screenRule = true"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hotelData: [],
      tableData: [],
      screenRule: false,

      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            }
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //存放时间段
      value2: ["", ""]
    };
  },
  mounted() {
    this.init(this.processTime);
  },
  computed: {
    processTime() {
      let start = this.value2[0] == "" ? "0-0" : this.value2[0];
      let end = this.value2[1] == "" ? "9999-0" : this.value2[1];
      return { startTime: start, endTime: end };
    },
    changeScreenRule() {
      return this.screenRule ? "block" : "none";
    }
  },
  methods: {
    init(timeOb) {
      let url =
        "/homework1_4_war/rest/demo/query_hangye?hangye=2&betime=" +
        timeOb.startTime +
        "&edtime=" +
        timeOb.endTime;
      this.$http.get(url).then(res => {
        const data = res.data;
        this.hotelData = data.value;
        this.tableData = this.hotelData;
        this.drawLine(this.tableData);
      });
    },
    // 依据时间查询
    searchSubmit() {
      this.init(this.processTime);
    },
    drawLine(tData) {
      // 基于准备好的dom，初始化echarts实例
      let xTime = [];
      let yPay = [];
      let yCal = [];
      for (let i = 0; i < tData.length; i++) {
        xTime.push(tData[i].time);
        yPay.push(tData[i].pay);
        yCal.push(tData[i].cal);
      }

      let myChart = this.$echarts.init(document.getElementById("mainChart"));
      // 绘制图表
      // var arr = [1, 2, 3, 4, 5, 6];
      var option = {
        title: {
          text: "酒店行业预期财政收入与实际收入"
        },
        tooltip: {
          /*鼠标跟随效果*/
          trigger: "axis"
        },
        legend: {
          /*中间的小图标*/
          data: ["实际缴纳金额", "预计缴纳金额"]
        },

        //右上角工具条
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },

        xAxis: [
          {
            type: "category",

            data: xTime,
            show: true,
            splitLine: {
              show: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "金额(元)",
            axisLabel: {
              /*坐标轴的刻度文字设置*/
              formatter: "{value} 元",
              textStyle: {
                color: "black"
              }
            },
            splitLine: {
              /*网格线的设置*/
              show: true
            },
            axisLine: {
              /*坐标轴，轴线的设置*/
              lineStyle: {
                color: "red"
              }
            },
            axisTick: {
              /*坐标轴刻度的设置*/
              lineStyle: {
                color: "blue"
              }
            }
          }
          // {
          //   type: "value",
          //   name: "户均持股数(股/户)",
          //   position: "right" /*轴的位置，默认是左边*/,
          //   axisLabel: {
          //     formatter:
          //       "{value} °C" /*{value}指的series中对应的值， 可以用回调函数设置*/
          //   },
          //   splitLine: {
          //     /*网格线，不画，*/
          //     show: false
          //   }
          // }
        ],
        series: [
          {
            name: "实际缴纳金额" /*数据的名称*/,
            type: "line" /*这个数据的类型，画折线*/,
            data: yPay,
            yAxisIndex: 0 /*与上面y轴的数组中，第一组数据对应*/
          },
          {
            name: "预计缴纳金额",
            type: "line",
            data: yCal,
            yAxisIndex: 0
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.SumOfHotel {
  background: white;
  #table {
  }
  #search {
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .searchInput {
      margin-left: 200px;
      margin-right: 5px;
    }
    #searchSubmit {
      margin-left: 350px;
    }
  }
  #drawChart {
    margin: 10px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    #chartBtn {
      margin: 5px;
    }
  }
  #chart {
    border: 1px solid;
    width: 100%;
    margin: auto;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.6);
    overflow: auto;
    text-align: center;
    // display: none;
    #mainChart {
      background: white;
      width: 1000px;
      height: 600px;
      margin: auto;
      margin-top: 50px;
      border-radius: 5px;
    }
  }
}
</style>
