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
      <el-input
        type="month"
        class="searchInput"
        id="startTime"
        placeholder="无限制"
        v-model="startTime"
      >
      </el-input>
      <span>起始日期</span>
      <el-input
        type="month"
        class="searchInput"
        id="endTime"
        placeholder="无限制"
        v-model="endTime"
      >
      </el-input>
      <span>终止日期</span>
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
      hotelData: [
        {
          business: "酒店",
          time: "2018-01",
          MSection: "xxxxx",
          tel: "0373-2284888",
          pay: "5003000",
          cal: "5000000",
          D_value: "3000"
        },
        {
          business: "酒店",
          time: "2018-02",
          MSection: "xxxxx",
          tel: "0373-2888888",
          pay: "4850000",
          cal: "4500000",
          D_value: "350000"
        },
        {
          business: "酒店",
          time: "2018-03",
          MSection: "xxxxx",
          tel: "0373-2355888",
          pay: "6565000",
          cal: "6500000",
          D_value: "65000"
        },
        {
          business: "酒店",
          time: "2018-04",
          MSection: "xxxxx",
          tel: "0373-2488588",
          pay: "5455210",
          cal: "5000000",
          D_value: "455210"
        },
        {
          business: "酒店",
          time: "2018-05",
          MSection: "xxxxx",
          tel: "0373-2877888",
          pay: "5543624",
          cal: "4958321",
          D_value: "585303"
        },
        {
          business: "酒店",
          time: "2018-06",
          MSection: "xxxxx",
          tel: "0373-2588644",
          pay: "5335211",
          cal: "5211300",
          D_value: "123911"
        },
        {
          business: "酒店",
          time: "2018-07",
          MSection: "xxxxx",
          tel: "0373-2388588",
          pay: "4833254",
          cal: "5332000",
          D_value: "-498746"
        },
        {
          business: "酒店",
          time: "2018-08",
          MSection: "xxxxx",
          tel: "0373-2258888",
          pay: "5210354",
          cal: "5133255",
          D_value: "77099"
        },
        {
          business: "酒店",
          time: "2018-09",
          MSection: "xxxxx",
          tel: "0373-2688388",
          pay: "6455300",
          cal: "6000000",
          D_value: "455300"
        },
        {
          business: "酒店",
          time: "2018-10",
          MSection: "xxxxx",
          tel: "0373-2855666",
          pay: "6638000",
          cal: "6300000",
          D_value: "338000"
        },
        {
          business: "酒店",
          time: "2018-11",
          MSection: "xxxxx",
          tel: "0373-2655888",
          pay: "6011322",
          cal: "6300000",
          D_value: "-288678"
        },
        {
          business: "酒店",
          time: "2018-12",
          MSection: "xxxxx",
          tel: "0373-2655555",
          pay: "5355800",
          cal: "6100800",
          D_value: "-745000"
        },
        {
          business: "酒店",
          time: "2019-01",
          MSection: "xxxxx",
          tel: "0373-2633433",
          pay: "5100388",
          cal: "5600344",
          D_value: "-499956"
        },
        {
          business: "酒店",
          time: "2019-02",
          MSection: "xxxxx",
          tel: "0373-2688455",
          pay: "4958880",
          cal: "5233500",
          D_value: "-274620"
        },
        {
          business: "酒店",
          time: "2019-03",
          MSection: "xxxxx",
          tel: "0373-2588188",
          pay: "5135288",
          cal: "4935888",
          D_value: "199400"
        },
        {
          business: "酒店",
          time: "2019-04",
          MSection: "xxxxx",
          tel: "0373-2388288",
          pay: "5358830",
          cal: "5213550",
          D_value: "145280"
        },
        {
          business: "酒店",
          time: "2019-05",
          MSection: "xxxxx",
          tel: "0373-2155888",
          pay: "5355888",
          cal: "5644380",
          D_value: "-288492"
        },
        {
          business: "酒店",
          time: "2019-06",
          MSection: "xxxxx",
          tel: "0373-2358666",
          pay: "5432880",
          cal: "5777808",
          D_value: "-344928"
        }
      ],
      tableData: [],
      screenRule: false,
      startTime: "",
      endTime: ""
    };
  },
  mounted() {
    this.init();
    this.drawLine(this.tableData);
  },
  computed: {
    changeScreenRule() {
      return this.screenRule ? "block" : "none";
    }
  },
  methods: {
    init() {
      this.tableData = this.hotelData;
    },
    // 依据时间查询
    searchSubmit() {
      alert("依据时间查询");
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
      width: 170px;
      margin-left: 145px;
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
