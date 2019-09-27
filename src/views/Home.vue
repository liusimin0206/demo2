<template>
  <div id="home">
    <div id="container" style="width:1150px; height:650px"></div>
    <!-- 搜索框 -->
    <div id="myPageTop">
      请输入关键字：
      <input id="tipinput" />
    </div>
    <!-- 图例 -->
    <div id="myLegend">
      <img src="../image/legend.png" height="40px" alt="图例" />
    </div>
    <!-- 表格 -->
    <div id="table">
      <el-table
        :data="tableData"
        border
        style=" width: 1150px;height: 100%; line-height: 18px; "
        max-height="250"
        :empty-text="defaultresult"
      >
        <el-table-column prop="id" label="纳税人识别号"></el-table-column>
        <el-table-column prop="name" label="纳税人姓名"></el-table-column>
        <el-table-column prop="tel" label="纳税人联系方式"></el-table-column>
        <el-table-column prop="state" label="交纳状态"></el-table-column>
        <el-table-column prop="pay" label="实际缴纳金额"></el-table-column>
        <el-table-column prop="cal" label="预计缴纳金额"></el-table-column>
        <el-table-column prop="D_value" label="缴纳差值"></el-table-column>
      </el-table>
    </div>
    <!-- 表格查询 -->
    <div id="search">
      <el-input
        class="searchInput"
        id="searchId"
        placeholder="全部"
        v-model="searchId"
      >
      </el-input>
      <el-input
        class="searchInput"
        id="searchName"
        placeholder="全部"
        v-model="searchName"
      >
      </el-input>
      <el-input
        class="searchInput"
        id="searchTel"
        placeholder="全部"
        v-model="searchTel"
      >
      </el-input>
      <el-select
        id="searchState"
        v-model="searchState"
        style="width: 160px;"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button id="searchSubmit" @click="searchSubmit">个体查询</el-button>
    </div>
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
export default {
  props: ["layers"],
  data() {
    return {
      map: {},
      infoWindow: {},
      tableData: [],
      drugstore: [],
      hotel: [],
      driverschool: [],
      drugStoreLayer: [],
      hotelLayer: [],
      driverSchoolLayer: [],
      resultMarkerArray: [],
      searchId: "",
      searchName: "",
      searchTel: "",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "已缴费",
          label: "已缴费"
        },
        {
          value: "未缴费",
          label: "未缴费"
        },
        {
          value: "缴费不足",
          label: "缴费不足"
        }
      ],
      searchState: "",
      defaultresult: "查询结果",

      OffLineData: {
        drugstore: [
          {
            name: "新乡市中心医院",
            center: "113.865366,35.296382",
            lng: "113.865366",
            lat: "35.296382",
            id: "100000010",
            tel: "0100-15532533",
            state: "已缴费",
            pay: "500000",
            cal: "500000",
            D_value: "0"
          },
          {
            name: "新乡医学院第三附属医院",
            center: "113.925962,35.280968",
            lng: "113.925962",
            lat: "35.280968",
            id: "100000011",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "500000",
            D_value: "-500000"
          },
          {
            name: "第二人民医院",
            center: "113.879099,35.315574",
            lng: "113.879099",
            lat: "35.315574",
            id: "100000012",
            tel: "0100-15533333",
            state: "缴费不足",
            pay: "200000",
            cal: "500000",
            D_value: "-300000"
          },
          {
            name: "河南省精神病医院",
            center: "113.897223,35.328852",
            lng: "113.897223",
            lat: "35.328852",
            id: "100000013",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "500000",
            D_value: "-500000"
          },
          {
            name: "河南省结核病医院",
            center: "114.059671,35.410892",
            lng: "114.059671",
            lat: "35.410892",
            id: "100000014",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "500000",
            D_value: "-500000"
          },
          {
            name: "新乡市中心医院",
            center: "113.865604,35.297137",
            lng: "113.865604",
            lat: "35.297137",
            id: "100000015",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "500000",
            D_value: "-500000"
          },
          {
            name: "新乡市传染病医院",
            center: "113.873617,35.273174",
            lng: "113.873617",
            lat: "35.273174",
            id: "100000016",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "500000",
            cal: "500000",
            D_value: "0"
          },
          {
            name: "新乡县人民医院",
            center: "113.775722,35.194679",
            lng: "113.775722",
            lat: "35.194679",
            id: "100000017",
            tel: "0100-15533333",
            state: "缴费不足",
            pay: "300000",
            cal: "500000",
            D_value: "-200000"
          },
          {
            name: "获嘉县中医院",
            center: "113.652244,35.26298",
            lng: "113.652244",
            lat: "35.26298",
            id: "100000018",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "1000000",
            D_value: "-1000000"
          },
          {
            name: "辉县市中医院",
            center: "113.794339,35.456804",
            lng: "113.794339",
            lat: "35.456804",
            id: "100000019",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "500000",
            D_value: "-500000"
          },
          {
            name: "辉县市人民医院",
            center: "113.818486,35.455709",
            lng: "113.818486",
            lat: "35.455709",
            id: "100000020",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "300000",
            cal: "300000",
            D_value: "0"
          },
          {
            name: "辉县市第三人民医院",
            center: "113.827247,35.431288",
            lng: "113.827247",
            lat: "35.431288",
            id: "100000021",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "500000",
            D_value: "-500000"
          },
          {
            name: "延津县中医院",
            center: "114.194279,35.164944",
            lng: "114.194279",
            lat: "35.164944",
            id: "100000022",
            tel: "0100-15533333",
            state: "缴费不足",
            pay: "250000",
            cal: "500000",
            D_value: "-250000"
          },
          {
            name: "原阳县人民医院",
            center: "113.972457,35.054294",
            lng: "113.972457",
            lat: "35.054294",
            id: "100000023",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "500000",
            D_value: "-500000"
          },
          {
            name: "新乡市第四人民医院",
            center: "113.862999,35.306797",
            lng: "113.862999",
            lat: "35.306797",
            id: "100000024",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "500000",
            D_value: "-500000"
          },
          {
            name: "河南省荣康医院",
            center: "114.36151,33.5371",
            lng: "114.36151",
            lat: "33.5371",
            id: "100000025",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "300000",
            cal: "300000",
            D_value: "0"
          },
          {
            name: "新乡市第一人民医院",
            center: "113.868361,35.307062",
            lng: "113.868361",
            lat: "35.307062",
            id: "100000026",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "480000",
            cal: "480000",
            D_value: "0"
          },
          {
            name: "辉县市城关镇卫生院",
            center: "113.799756,35.46418",
            lng: "113.799756",
            lat: "35.46418",
            id: "100000027",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "370000",
            D_value: "-370000"
          },
          {
            name: "新乡市中医院",
            center: "113.88508,35.288007",
            lng: "113.88508",
            lat: "35.288007",
            id: "100000028",
            tel: "0100-15533333",
            state: "缴费不足",
            pay: "200000",
            cal: "520000",
            D_value: "-320000"
          },
          {
            name: "新乡仁爱妇产医院",
            center: "113.896513,35.304032",
            lng: "113.896513",
            lat: "35.304032",
            id: "100000029",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "600000",
            cal: "600000",
            D_value: "0"
          },
          {
            name: "中国人民解放军第三七一医院",
            center: "113.875376,35.288362",
            lng: "113.875376",
            lat: "35.288362",
            id: "100000030",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "2000000",
            cal: "2000000",
            D_value: "0"
          }
        ],

        hotel: [
          {
            name: "格林豪泰酒店",
            center: "113.883219,35.284612",
            lng: "113.883219",
            lat: "35.284612",
            id: "300000010",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "200000",
            cal: "200000",
            D_value: "0"
          },
          {
            name: "新乡国际饭店",
            center: "113.891716,35.29428",
            lng: "113.891716",
            lat: "35.29428",
            id: "300000011",
            tel: "0100-15533333",
            state: "缴费不足",
            pay: "300000",
            cal: "400000",
            D_value: "-100000"
          },
          {
            name: "新乡开元名都大酒店",
            center: "113.926477,35.307729",
            lng: "113.926477",
            lat: "35.307729",
            id: "300000012",
            tel: "0100-15533333",
            state: "缴费不足",
            pay: "300000",
            cal: "400000",
            D_value: "-100000"
          },
          {
            name: "荷塘月色假日酒店",
            center: "113.93918,35.296522",
            lng: "113.93918",
            lat: "35.296522",
            id: "300000013",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "400000",
            cal: "400000",
            D_value: "0"
          },
          {
            name: "新乡市阳光宾馆",
            center: "114.0457,35.283903",
            lng: "114.0457",
            lat: "35.283903",
            id: "300000014",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "400000",
            cal: "400000",
            D_value: "0"
          },
          {
            name: "新乡仟那酒店",
            center: "113.878608,35.281671",
            lng: "113.878608",
            lat: "35.281671",
            id: "300000015",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "630000",
            cal: "630000",
            D_value: "0"
          },
          {
            name: "新乡莲七酒店",
            center: "113.897221,35.274772",
            lng: "113.897221",
            lat: "35.274772",
            id: "300000016",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "450000",
            cal: "450000",
            D_value: "0"
          },
          {
            name: "新乡熙园天成酒店",
            center: "113.930014,35.307277",
            lng: "113.930014",
            lat: "35.307277",
            id: "300000017",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "400000",
            D_value: "-400000"
          },
          {
            name: "新乡cc度假酒店",
            center: "113.91402,35.411805",
            lng: "113.91402",
            lat: "35.411805",
            id: "300000018",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "250000",
            D_value: "-250000"
          },
          {
            name: "新乡宜兰酒店",
            center: "113.957842,35.079391",
            lng: "113.957842",
            lat: "35.079391",
            id: "300000019",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "400000",
            cal: "400000",
            D_value: "0"
          },
          {
            name: "新乡柏维酒店",
            center: "113.887923,35.276495",
            lng: "113.887923",
            lat: "35.276495",
            id: "300000020",
            tel: "0100-15533333",
            state: "缴费不足",
            pay: "400000",
            cal: "500000",
            D_value: "-100000"
          },
          {
            name: "新乡中源阳光国际酒店",
            center: "114.053014,35.376696",
            lng: "114.053014",
            lat: "35.376696",
            id: "300000021",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "680000",
            cal: "680000",
            D_value: "0"
          },
          {
            name: "新乡卡尔顿商务酒店",
            center: "113.877027,35.305804",
            lng: "113.877027",
            lat: "35.305804",
            id: "300000022",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "1200000",
            cal: "1200000",
            D_value: "0"
          },
          {
            name: "新乡银星酒店",
            center: "113.863658,35.29638",
            lng: "113.863658",
            lat: "35.29638",
            id: "300000023",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "300000",
            D_value: "-300000"
          },
          {
            name: "新乡铭恒假日酒店",
            center: "113.901394,35.268131",
            lng: "113.901394",
            lat: "35.268131",
            id: "300000024",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "450000",
            cal: "450000",
            D_value: "0"
          },
          {
            name: "新乡长城宾馆",
            center: "113.966121,35.052865",
            lng: "113.966121",
            lat: "35.052865",
            id: "300000025",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "400000",
            cal: "400000",
            D_value: "0"
          },
          {
            name: "新乡贝壳酒店",
            center: "113.86778,35.304256",
            lng: "113.86778",
            lat: "35.304256",
            id: "300000026",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "400000",
            cal: "400000",
            D_value: "0"
          },
          {
            name: "新乡开元名都大酒店",
            center: "113.926796,35.307548",
            lng: "113.926796",
            lat: "35.307548",
            id: "300000027",
            tel: "0100-15533333",
            state: "缴费不足",
            pay: "200000",
            cal: "400000",
            D_value: "-200000"
          },
          {
            name: "新乡锦江之星",
            center: "113.862547,35.303728",
            lng: "113.862547",
            lat: "35.303728",
            id: "300000028",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "400000",
            cal: "400000",
            D_value: "0"
          },
          {
            name: "新乡中州国际饭店",
            center: "113.893312,35.312554",
            lng: "113.893312",
            lat: "35.312554",
            id: "300000029",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "500000",
            cal: "500000",
            D_value: "0"
          }
        ],
        driverSchool: [
          {
            name: "河南省工业科技学校",
            center: "113.873323,35.27589",
            lng: "113.873323",
            lat: "35.27589",
            id: "200000010",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "400000",
            D_value: "-400000"
          },
          {
            name: "河南科技学院",
            center: "113.938555,35.280375",
            lng: "113.938555",
            lat: "35.280375",
            id: "200000012",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "400000",
            D_value: "-400000"
          },
          {
            name: "河南省获嘉县亢村高中",
            center: "113.690383,35.126618",
            lng: "113.690383",
            lat: "35.126618",
            id: "200000013",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "250000",
            cal: "250000",
            D_value: "0"
          },
          {
            name: "新乡市高级技工学校",
            center: "114.08053,35.403369",
            lng: "114.08053",
            lat: "35.403369",
            id: "200000014",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "270000",
            cal: "270000",
            D_value: "0"
          },
          {
            name: "延津县东屯乡小屯初级中学",
            center: "114.072592,35.330605",
            lng: "114.072592",
            lat: "35.330605",
            id: "200000015",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "500000",
            D_value: "-500000"
          },
          {
            name: "新乡市新华区八一路小学",
            center: "113.847859,35.309677",
            lng: "113.847859",
            lat: "35.309677",
            id: "200000016",
            tel: "0100-15533333",
            state: "缴费不足",
            pay: "200000",
            cal: "400000",
            D_value: "-200000"
          },
          {
            name: "新乡市三十三中",
            center: "113.936151,35.276742",
            lng: "113.936151",
            lat: "35.276742",
            id: "200000017",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "300000",
            D_value: "-300000"
          },
          {
            name: "新乡县洪门镇原堤学校",
            center: "113.967234,35.26778",
            lng: "113.967234",
            lat: "35.26778",
            id: "200000018",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "260000",
            D_value: "-260000"
          },
          {
            name: "新乡市郊区王村镇小里小学校",
            center: "113.811393,35.325447",
            lng: "113.811393",
            lat: "35.325447",
            id: "200000019",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "250000",
            cal: "250000",
            D_value: "0"
          },
          {
            name: "河南省新乡市第十中学校",
            center: "113.87865,35.290871",
            lng: "113.87865",
            lat: "35.290871",
            id: "200000020",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "400000",
            D_value: "-400000"
          },
          {
            name: "河南师范大学实验中学",
            center: "113.902932,35.320956",
            lng: "113.902932",
            lat: "35.320956",
            id: "200000021",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "400000",
            D_value: "-400000"
          },
          {
            name: "河南省新乡县合河中学",
            center: "113.763843,35.332416",
            lng: "113.763843",
            lat: "35.332416",
            id: "200000022",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "400000",
            D_value: "-400000"
          },
          {
            name: "新乡四中",
            center: "113.88303,35.305288",
            lng: "113.88303",
            lat: "35.305288",
            id: "200000023",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "700000",
            D_value: "-700000"
          },
          {
            name: "新乡医学院",
            center: "113.933714,35.289328",
            lng: "113.933714",
            lat: "35.289328",
            id: "200000024",
            tel: "0100-15533333",
            state: "缴费不足",
            pay: "160000",
            cal: "400000",
            D_value: "-240000"
          },
          {
            name: "新乡市信息工程学校",
            center: "113.873373,35.292754",
            lng: "113.873373",
            lat: "35.292754",
            id: "200000025",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "750000",
            D_value: "-750000"
          },
          {
            name: "新乡教育学院院校",
            center: "113.911287,35.326202",
            lng: "113.911287",
            lat: "35.326202",
            id: "200000026",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "320000",
            D_value: "-320000"
          },
          {
            name: "新乡广播电视大学",
            center: "113.886877,35.295581",
            lng: "113.886877",
            lat: "35.295581",
            id: "200000027",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "500000",
            D_value: "-500000"
          },
          {
            name: "辉县市职专",
            center: "113.774842,35.438329",
            lng: "113.774842",
            lat: "35.438329",
            id: "200000028",
            tel: "0100-15533333",
            state: "未缴费",
            pay: "0",
            cal: "400000",
            D_value: "-400000"
          },
          {
            name: "新乡市博睿培训学校",
            center: "113.89333,35.30556",
            lng: "113.89333",
            lat: "35.30556",
            id: "200000029",
            tel: "0100-15533333",
            state: "已缴费",
            pay: "200000",
            cal: "200000",
            D_value: "0"
          }
        ]
      }
    };
  },
  // computed: {
  //   a(){return this.layers.drugstore.show} ,
  //   b(){return this.layers.hotel.show},
  //   c(){return this.layers.driverschool.show},
  // },
  mounted() {
    try {
      // 离线版
      throw "error";
      // this.$http.get("/api/layers").then(res => {
      //   const data = res.data;
      //   this.drugstore = data.drugstore;
      //   this.hotel = data.hotel;
      //   this.driverschool = data.driverSchool;
      //   this.init();
      // });
    } catch (e) {
      this.drugstore = this.OffLineData.drugstore;
      this.hotel = this.OffLineData.hotel;
      this.driverschool = this.OffLineData.driverSchool;
      this.init();
    }
  },
  methods: {
    init() {
      this.map = new AMap.Map("container", {
        center: [113.875837, 35.298343],
        resizeEnable: true,
        zoom: 13
      });
      this.map.setFeatures(["road", "bg", "building"]);
      this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });

      var autoOptions = {
        input: "tipinput"
      };
      var auto = new AMap.Autocomplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
        map: this.map
      }); //构造地点查询类
      AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
      function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name); //关键字查询
      }

      this.addToolBar();

      // this.creatDrugstoreLayer();
      this.creatMarkerPointLayer(
        this.drugstore,
        this.drugStoreLayer,
        "poi-marker-default"
      );
      this.creatMarkerPointLayer(
        this.hotel,
        this.hotelLayer,
        "poi-marker-sanjiao"
      );
      this.creatMarkerPointLayer(
        this.driverschool,
        this.driverSchoolLayer,
        "poi-marker-fangkuai"
      );
      // this.creatHotelLayer();
      // this.creatdriverSchoolLayer();
    },
    // 创建pointdata的点图层
    creatMarkerPointLayer(pointdata, layer, iconName) {
      for (let i = 0; i < pointdata.length; i++) {
        let marker = new AMap.Marker({
          position: [pointdata[i].lng, pointdata[i].lat],
          map: this.map

          // offset: new AMap.Pixel(-13, -30)
        });
        if (pointdata[i].state == "已缴费") {
          marker.setIcon(require("../image/" + iconName + "-green.png"));
        } else if (pointdata[i].state == "未缴费") {
          marker.setIcon(require("../image/" + iconName + "-red.png"));
        } else if (pointdata[i].state == "缴费不足") {
          marker.setIcon(require("../image/" + iconName + "-y.png"));
        } else {
          marker.setIcon(require("../image/" + iconName + ".png"));
        }

        marker.content =
          "<div >交纳状态:" +
          pointdata[i].state +
          "<br/>实际缴纳金额:" +
          pointdata[i].pay +
          "<br/>缴纳差值:" +
          pointdata[i].D_value +
          "</div>";
        // 可用来加文字;
        marker.setLabel({
          offset: new AMap.Pixel(0, -4), //设置文本标注偏移量
          content: "<div class='info'>" + pointdata[i].name + "</div>", //设置文本标注内容
          direction: "bottom" //设置文本标注方位
        });
        marker.on("click", this.markerClick);
        // marker.emit("click", { target: marker });
        layer.push(marker);
      }
    },

    //图层点击事件
    markerClick(e) {
      // console.log(e.target.content);
      // let info=[];
      // info.push.e.target.content;
      this.infoWindow.setContent(e.target.content);
      this.infoWindow.open(this.map, e.target.getPosition());
    },

    // 切换图层显示与隐藏
    toggleLayer(showLayer, layerName) {
      if (!showLayer) {
        for (let i = 0; i < this[layerName].length; i++) {
          this[layerName][i].hide();
        }
      } else {
        for (let i = 0; i < this[layerName].length; i++) {
          this[layerName][i].show();
        }
      }
    },
    // toggleLayer(showLayer, layerName) {
    //   showLayer ? this[layerName].show() : this[layerName].hide();
    // },
    //查询
    searchSubmit() {
      for (let i = 0; i < this.resultMarkerArray.length; i++) {
        this.resultMarkerArray[i].hide();
      }

      let newResult = []
        .concat(this.drugstore)
        .concat(this.hotel)
        .concat(this.driverschool);

      this.tableData = [];
      for (let i = 0; i < newResult.length; i++) {
        if (newResult[i].id.indexOf(this.searchId) != -1) {
          if (newResult[i].name.indexOf(this.searchName) != -1) {
            if (newResult[i].tel.indexOf(this.searchTel) != -1) {
              if (newResult[i].state.indexOf(this.searchState) != -1) {
                this.tableData.push(newResult[i]);
              }
            }
          }
        }
      }
      this.resultMarkerArray = [];

      for (let i = 0; i < this.tableData.length; i++) {
        let resultMarker = new AMap.Marker({
          icon: require("../image/poi-marker-result.png"),
          position: [this.tableData[i].lng, this.tableData[i].lat],
          map: this.map
          // offset: new AMap.Pixel(-13, -30)
        });
        resultMarker.content =
          "<div >交纳状态:" +
          this.tableData[i].state +
          "<br/>实际缴纳金额:" +
          this.tableData[i].pay +
          "<br/>缴纳差值:" +
          this.tableData[i].D_value +
          "</div>";

        //可用来加文字
        // marker.setLabel({
        //   offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
        //   content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
        //   direction: "right" //设置文本标注方位
        // });
        resultMarker.on("click", this.markerClick);
        this.resultMarkerArray.push(resultMarker);
      }
      // 自动缩放地图
      this.map.setFitView(
        this.resultMarkerArray,
        false,
        [100, 100, 100, 100],
        15
      );
      if (this.tableData.length == 0) {
        this.defaultresult = "查询结果为空";
      } else {
        this.defaultresult = "查询结果";
      }
    },
    // 加工具条
    addToolBar() {
      this.map.plugin(["AMap.ToolBar"], () => {
        this.map.addControl(new AMap.ToolBar());
      });
      if (location.href.indexOf("&guide=1") !== -1) {
        this.map.setStatus({ scrollWheel: false });
      }
    }
  },
  watch: {
    "layers.drugstore.show"(value) {
      this.toggleLayer(value, "drugStoreLayer");
    },
    "layers.hotel.show"(value) {
      this.toggleLayer(value, "hotelLayer");
    },
    "layers.driverSchool.show"(value) {
      this.toggleLayer(value, "driverSchoolLayer");
    }
  }
};
</script>
<style lang="scss" scoped>
#home {
  #container {
  }
  .input-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    line-height: 35px;
    border-radius: 0.25rem;
    width: 10rem;
    border-width: 0;
    border-radius: 0.4rem;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
    position: fixed;
    bottom: 1rem;
    left: 3rem;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 0.75rem 1.25rem;
  }
  #search {
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .searchInput {
      width: 150px;
      margin-right: 15px;
    }
    #searchSubmit {
      margin-left: 350px;
    }
  }
  #myPageTop {
    position: absolute;
    top: 40px;
    left: 400px;

    font-size: 14px;
    background: none 0px 0px repeat scroll rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    border-color: rgb(204, 204, 204);
    border-image: initial;
    margin: 1px auto;
    padding: 6px;
    #tipinput {
      width: 170px;

      /* -webkit-writing-mode: horizontal-tb !important; */
      text-rendering: auto;
      color: initial;
      letter-spacing: normal;
      word-spacing: normal;
      text-transform: none;
      text-indent: 0px;
      text-shadow: none;
      display: inline-block;
      text-align: start;
      -webkit-appearance: textfield;
      background-color: white;
      -webkit-rtl-ordering: logical;
      cursor: text;
      margin: 0em;
      font: 400 13.3333px Arial;
      padding: 1px 0px;
      border-width: 2px;
      border-style: inset;
      border-color: initial;
      border-image: initial;
    }
  }
  #myLegend {
    position: absolute;
    left: 1200px;
    top: 40px;
  }
}
</style>

<style lang="scss">
.amap-marker-label {
  border: 0 none;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
