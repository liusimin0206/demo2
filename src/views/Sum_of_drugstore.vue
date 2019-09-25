<template>
  <div class="SumOfDrugStore" @click="screenRule = false">
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
      drugStoreData: [
        {
          business: "药店",
          time: "2018-01",
          MSection: "xxxxx",
          tel: "0373-2655888",
          pay: "383233",
          cal: "500000",
          D_value: "-116767"
        },
        {
          business: "药店",
          time: "2018-02",
          MSection: "xxxxx",
          tel: "0373-2438858",
          pay: "432850",
          cal: "465000",
          D_value: "-32150"
        },
        {
          business: "药店",
          time: "2018-03",
          MSection: "xxxxx",
          tel: "16559453466",
          pay: "465280",
          cal: "476580",
          D_value: "-11300"
        },
        {
          business: "药店",
          time: "2018-04",
          MSection: "xxxxx",
          tel: "13121335948",
          pay: "483500",
          cal: "513500",
          D_value: "-30000"
        },
        {
          business: "药店",
          time: "2018-05",
          MSection: "xxxxx",
          tel: "0373-2165888",
          pay: "513540",
          cal: "483560",
          D_value: "29980"
        },
        {
          business: "药店",
          time: "2018-06",
          MSection: "xxxxx",
          tel: "0373-2588688",
          pay: "535540",
          cal: "513580",
          D_value: "21960"
        },
        {
          business: "药店",
          time: "2018-07",
          MSection: "xxxxx",
          tel: "13586456677",
          pay: "554836",
          cal: "532144",
          D_value: "22692"
        },
        {
          business: "药店",
          time: "2018-08",
          MSection: "xxxxx",
          tel: "0373-2588466",
          pay: "514355",
          cal: "534500",
          D_value: "-20145"
        },
        {
          business: "药店",
          time: "2018-09",
          MSection: "xxxxx",
          tel: "0373-2533455",
          pay: "513122",
          cal: "493325",
          D_value: "19797"
        },
        {
          business: "药店",
          time: "2018-10",
          MSection: "xxxxx",
          tel: "13515556455",
          pay: "532580",
          cal: "483500",
          D_value: "49080"
        },
        {
          business: "药店",
          time: "2018-11",
          MSection: "xxxxx",
          tel: "0373-2356888",
          pay: "523500",
          cal: "533550",
          D_value: "-10050"
        },
        {
          business: "药店",
          time: "2018-12",
          MSection: "xxxxx",
          tel: "0373-2658588",
          pay: "514500",
          cal: "493855",
          D_value: "20645"
        },
        {
          business: "药店",
          time: "2019-01",
          MSection: "xxxxx",
          tel: "16535854364",
          pay: "535587",
          cal: "523580",
          D_value: "12007"
        },
        {
          business: "药店",
          time: "2019-02",
          MSection: "xxxxx",
          tel: "0373-2685359",
          pay: "514458",
          cal: "513580",
          D_value: "878"
        },
        {
          business: "药店",
          time: "2019-03",
          MSection: "xxxxx",
          tel: "0373-2458988",
          pay: "535562",
          cal: "521500",
          D_value: "14062"
        },
        {
          business: "药店",
          time: "2019-04",
          MSection: "xxxxx",
          tel: "0373-2365855",
          pay: "515538",
          cal: "535587",
          D_value: "-20049"
        },
        {
          business: "药店",
          time: "2019-05",
          MSection: "xxxxx",
          tel: "13513486588",
          pay: "532280",
          cal: "493385",
          D_value: "38895"
        },
        {
          business: "药店",
          time: "2019-06",
          MSection: "xxxxx",
          tel: "0373-2658388",
          pay: "513522",
          cal: "532580",
          D_value: "-19058"
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
      this.tableData = this.drugStoreData;
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
          text: "药店行业预期财政收入与实际收入"
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
.SumOfDrugStore {
  background: white;
  #table {
  }
  #search {
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .searchInput {
      width: 150px;
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
