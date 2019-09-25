<template>
  <div class="SumOfDriverSchool" @click="screenRule = false">
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
      driverSchoolData: [
        {
          business: "驾校",
          time: "2018-01",
          MSection: "xxxxx",
          tel: "010-15533333",
          pay: "200000",
          cal: "500000",
          D_value: "-300000"
        },
        {
          business: "驾校",
          time: "2018-02",
          MSection: "xxxxx",
          tel: "15534623383",
          pay: "500000",
          cal: "480000",
          D_value: "-20000"
        },
        {
          business: "驾校",
          time: "2018-03",
          MSection: "xxxxx",
          tel: "18235131566",
          pay: "400000",
          cal: "500000",
          D_value: "-100000"
        },
        {
          business: "驾校",
          time: "2018-04",
          MSection: "xxxxx",
          tel: "17856052333",
          pay: "530000",
          cal: "500000",
          D_value: "300000"
        },
        {
          business: "驾校",
          time: "2018-05",
          MSection: "xxxxx",
          tel: "17135347966",
          pay: "380000",
          cal: "240000",
          D_value: "140000"
        },
        {
          business: "驾校",
          time: "2018-06",
          MSection: "xxxxx",
          tel: "13513691355",
          pay: "372411",
          cal: "321104",
          D_value: "51307"
        },
        {
          business: "驾校",
          time: "2018-07",
          MSection: "xxxxx",
          tel: "13544556677",
          pay: "516087",
          cal: "467705",
          D_value: "48382"
        },
        {
          business: "驾校",
          time: "2018-08",
          MSection: "xxxxx",
          tel: "13665656444",
          pay: "465577",
          cal: "513222",
          D_value: "-47645"
        },
        {
          business: "驾校",
          time: "2018-09",
          MSection: "xxxxx",
          tel: "17888664543",
          pay: "645646",
          cal: "564483",
          D_value: "81163"
        },
        {
          business: "驾校",
          time: "2018-10",
          MSection: "xxxxx",
          tel: "16315567877",
          pay: "365443",
          cal: "436621",
          D_value: "-71178"
        },
        {
          business: "驾校",
          time: "2018-11",
          MSection: "xxxxx",
          tel: "18235444633",
          pay: "456661",
          cal: "543321",
          D_value: "-86660"
        },
        {
          business: "驾校",
          time: "2018-12",
          MSection: "xxxxx",
          tel: "15135446654",
          pay: "656544",
          cal: "589921",
          D_value: "66623"
        },
        {
          business: "驾校",
          time: "2019-01",
          MSection: "xxxxx",
          tel: "15535452456",
          pay: "376500",
          cal: "424355",
          D_value: "-47855"
        },
        {
          business: "驾校",
          time: "2019-02",
          MSection: "xxxxx",
          tel: "13845645533",
          pay: "456553",
          cal: "432000",
          D_value: "24553"
        },
        {
          business: "驾校",
          time: "2019-03",
          MSection: "xxxxx",
          tel: "13154536688",
          pay: "325645",
          cal: "453000",
          D_value: "-127355"
        },
        {
          business: "驾校",
          time: "2019-04",
          MSection: "xxxxx",
          tel: "13643547877",
          pay: "365548",
          cal: "356545",
          D_value: "9003"
        },
        {
          business: "驾校",
          time: "2019-05",
          MSection: "xxxxx",
          tel: "13125556888",
          pay: "456655",
          cal: "395555",
          D_value: "61100"
        },
        {
          business: "驾校",
          time: "2019-06",
          MSection: "xxxxx",
          tel: "13513354566",
          pay: "335455",
          cal: "355400",
          D_value: "-19945"
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
      this.tableData = this.driverSchoolData;
    },
    // 依据时间查询
    searchSubmit() {
      alert("依据时间查询");
    },
    drawLine(tData) {
      // 基于准备好的dom,初始化echarts实例
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
          text: "驾校行业预期财政收入与实际收入"
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
              /*坐标轴,轴线的设置*/
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
          //   position: "right" /*轴的位置,默认是左边*/,
          //   axisLabel: {
          //     formatter:
          //       "{value} °C" /*{value}指的series中对应的值, 可以用回调函数设置*/
          //   },
          //   splitLine: {
          //     /*网格线,不画,*/
          //     show: false
          //   }
          // }
        ],
        series: [
          {
            name: "实际缴纳金额" /*数据的名称*/,
            type: "line" /*这个数据的类型,画折线*/,
            data: yPay,
            yAxisIndex: 0 /*与上面y轴的数组中,第一组数据对应*/
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
.SumOfDriverSchool {
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
