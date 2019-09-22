<template>
  <div class="box">
    <div id="container" style="width:1150px; height:650px"></div>
    <div class="input-card">
      <div class="input-item">
        <el-checkbox
          v-model="showDrugstore"
          @change="toggleLayer(showDrugstore, 'drugStoreLayer')"
          >药店 ○</el-checkbox
        >
      </div>
      <div class="input-item">
        <el-checkbox
          v-model="showHotel"
          @change="toggleLayer(showHotel, 'hotelLayer')"
          >酒店 △</el-checkbox
        >
      </div>
      <div class="input-item">
        <el-checkbox
          v-model="showDriverschool"
          @change="toggleLayer(showDriverschool, 'driverschoolLayer')"
          >驾校󠄀󠄀󠄀 </el-checkbox
        >
      </div>
    </div>
    <div id="myPageTop">
      请输入关键字：
      <input id="tipinput" />
    </div>
    <div id="myLegend">
      <img src="../image/legend.png" height="40px" alt="图例" />
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style=" width: 1150px;height: 100%; line-height: 18px;"
        empty-text="查询结果"
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
    <div id="search">
      <el-input id="searchId" placeholder="请输入内容" v-model="searchId">
      </el-input>
      <el-input id="searchName" placeholder="请输入内容" v-model="searchName">
      </el-input>
      <el-input id="searchTel" placeholder="请输入内容" v-model="searchTel">
      </el-input>

      <button>个体查询</button>
    </div>
  </div>
</template>

<script>
import AMap from "AMap"; // 引入高德地图
export default {
  data() {
    return {
      map: {},
      infoWindow: {},
      tableData: [],
      drugstore: [
        {
          name: "新乡市中心医院",
          center: "113.865366,35.296382",
          lng: "113.865366",
          lat: "35.296382",
          id: "100000010",
          tel: "0100-15533333",
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
        }
      ],
      hotel: [
        {
          name: "格林豪泰酒店",
          center: "113.883219,35.284612",
          lng: "113.883219",
          lat: "35.284612",
          id: "100000013",
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
          id: "100000014",
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
          id: "100000015",
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
          id: "100000016",
          tel: "0100-15533333",
          state: "已缴费",
          pay: "400000",
          cal: "400000",
          D_value: "0"
        }
      ],
      driverschool: [
        {
          name: "河南省工业科技学校",
          center: "113.873323,35.27589",
          lng: "113.873323",
          lat: "35.27589",
          id: "100000017",
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
          id: "100000018",
          tel: "0100-15533333",
          state: "未缴费",
          pay: "0",
          cal: "400000",
          D_value: "-400000"
        }
      ],
      drugStoreLayer: [],
      hotelLayer: [],
      driverschoolLayer: [],
      showDrugstore: true,
      showHotel: true,
      showDriverschool: true,
      searchId: "",
      searchName: "",
      searchTel: ""
    };
  },
  computed: {
    // tableData() {
    //   return []
    //     .concat(this.showDrugstore ? this.drugstore : [])
    //     .concat(this.showHotel ? this.hotel : [])
    //     .concat(this.showDriverschool ? this.driverschool : []);
    // }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.map = new AMap.Map("container", {
        center: [113.875837, 35.298343],
        resizeEnable: true,
        zoom: 15
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

      this.creatDrugstoreLayer();
      this.creatHotelLayer();
      this.creatDriverschoolLayer();
    },
    // 创建药店点图层
    creatDrugstoreLayer() {
      // this.tableData.push.apply(this.tableData, this.drugstore);
      let iconName = "poi-marker-default";
      for (let i = 0; i < this.drugstore.length; i++) {
        let marker = new AMap.Marker({
          position: [this.drugstore[i].lng, this.drugstore[i].lat],
          map: this.map
          // offset: new AMap.Pixel(-13, -30)
        });
        if (this.drugstore[i].state == "已缴费") {
          marker.setIcon(require("../image/" + iconName + "-green.png"));
        } else if (this.drugstore[i].state == "未缴费") {
          marker.setIcon(require("../image/" + iconName + "-red.png"));
        } else if (this.drugstore[i].state == "缴费不足") {
          marker.setIcon(require("../image/" + iconName + "-y.png"));
        } else {
          marker.setIcon(require("../image/" + iconName + ".png"));
        }

        marker.content = this.drugstore[i].name;
        //可用来加文字
        // marker.setLabel({
        //   offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
        //   content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
        //   direction: "right" //设置文本标注方位
        // });
        marker.on("click", this.markerClick);
        // marker.emit("click", { target: marker });
        this.drugStoreLayer.push(marker);
      }
    },
    //图层点击事件
    markerClick(e) {
      console.log("aaa");
      this.infoWindow.setContent(e.target.content);
      this.infoWindow.open(this.map, e.target.getPosition());
    },
    // 创建酒店点图层
    creatHotelLayer() {
      // this.tableData.push.apply(this.tableData, this.hotel);
      let iconName = "poi-marker-sanjiao";
      for (let i = 0; i < this.hotel.length; i++) {
        let marker = new AMap.Marker({
          icon: require("../image/poi-marker-sanjiao.png"),
          // icon: "../../image/poi-marker-fangkuai.png",
          position: [this.hotel[i].lng, this.hotel[i].lat],
          map: this.map
          // offset: new AMap.Pixel(-13, -30)
        });

        if (this.hotel[i].state == "已缴费") {
          marker.setIcon(require("../image/" + iconName + "-green.png"));
        } else if (this.hotel[i].state == "未缴费") {
          marker.setIcon(require("../image/" + iconName + "-red.png"));
        } else if (this.hotel[i].state == "缴费不足") {
          marker.setIcon(require("../image/" + iconName + "-y.png"));
        } else {
          marker.setIcon(require("../image/" + iconName + ".png"));
        }
        marker.content = this.hotel[i].name;
        //可用来加文字
        // marker.setLabel({
        //   offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
        //   content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
        //   direction: "right" //设置文本标注方位
        // });
        marker.on("click", this.markerClick);
        // marker.emit("click", { target: marker });
        this.hotelLayer.push(marker);
      }
    },
    // 创建驾校点图层
    creatDriverschoolLayer() {
      // this.tableData.push.apply(this.tableData, this.driverschool);
      let iconName = "poi-marker-fangkuai";
      for (let i = 0; i < this.driverschool.length; i++) {
        let marker = new AMap.Marker({
          icon: require("../image/poi-marker-fangkuai.png"),
          // icon: "../../image/poi-marker-default.png",
          position: [this.driverschool[i].lng, this.driverschool[i].lat],
          map: this.map
          // offset: new AMap.Pixel(-13, -30)
        });
        if (this.driverschool[i].state == "已缴费") {
          marker.setIcon(require("../image/" + iconName + "-green.png"));
        } else if (this.driverschool[i].state == "未缴费") {
          marker.setIcon(require("../image/" + iconName + "-red.png"));
        } else if (this.driverschool[i].state == "缴费不足") {
          marker.setIcon(require("../image/" + iconName + "-y.png"));
        } else {
          marker.setIcon(require("../image/" + iconName + ".png"));
        }
        marker.content = this.driverschool[i].name;
        //可用来加文字
        // marker.setLabel({
        //   offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
        //   content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
        //   direction: "right" //设置文本标注方位
        // });
        marker.on("click", this.markerClick);
        // marker.emit("click", { target: marker });
        this.driverschoolLayer.push(marker);
      }
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
    // 加工具条
    addToolBar() {
      this.map.plugin(["AMap.ToolBar"], () => {
        this.map.addControl(new AMap.ToolBar());
      });
      if (location.href.indexOf("&guide=1") !== -1) {
        this.map.setStatus({ scrollWheel: false });
      }
    }
  }
};
</script>
<style>
#search {
  line-height: 0px;
}
#searchId {
  position: absolute;
  left: 0px;
  display: inline;
  width: 150px;
}
#searchName {
  position: absolute;
  left: 300px;
  display: inline;
  width: 150px;
}
#searchTel {
  position: absolute;
  left: 500px;
  display: inline;
  width: 150px;
}
#container {
  line-height: 18px;
}
#myLegend {
  position: absolute;
  left: 1200px;
  top: 40px;
  line-height: 18px;
}
#myPageTop {
  position: absolute;
  top: 40px;
  left: 400px;
  line-height: 18px;
  font-size: 14px;
  background: none 0px 0px repeat scroll rgb(255, 255, 255);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(204, 204, 204);
  border-image: initial;
  margin: 1px auto;
  padding: 6px;
}
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
  top: 1rem;
  right: 1rem;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 0.75rem 1.25rem;
}
</style>
