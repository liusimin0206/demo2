<template>
  <div id="home">
    <div id="container" style="width:1150px; height:650px"></div>
    <!-- 药店酒店驾校复选框 -->
    <!-- <div class="input-card">
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
          @change="toggleLayer(showDriverschool, 'driverSchoolLayer')"
          >驾校󠄀󠄀󠄀 </el-checkbox
        >
      </div>
    </div> -->
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
        style=" width: 1150px;height: 100%; line-height: 18px;"
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
      defaultresult: "查询结果"
    };
  },
  // computed: {
  //   a(){return this.layers.drugstore.show} ,
  //   b(){return this.layers.hotel.show},
  //   c(){return this.layers.driverschool.show},
  // },
  mounted() {
    this.$http.get("/api/layers").then(res => {
      const data = res.data;
      this.drugstore = data.drugstore;
      this.hotel = data.hotel;
      this.driverschool = data.driverSchool;
      this.init();
    });
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
