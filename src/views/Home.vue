<template>
  <div class="box">
    <div id="container" style="width:1150px; height:650px"></div>
    <div class="input-card">
      <div class="input-item">
        <el-checkbox
          v-model="showDrugstore"
          @change="toggleLayer(showDrugstore, 'drugStoreLayer')"
          >药店</el-checkbox
        >
      </div>
      <div class="input-item">
        <el-checkbox
          v-model="showHotel"
          @change="toggleLayer(showHotel, 'hotelLayer')"
          >酒店</el-checkbox
        >
      </div>
      <div class="input-item">
        <el-checkbox
          v-model="showDriverschool"
          @change="toggleLayer(showDriverschool, 'driverschoolLayer')"
          >驾校</el-checkbox
        >
      </div>
    </div>
    <div id="myPageTop">
      请输入关键字：
      <input id="tipinput" />
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style=" width: 1150px;height: 100%; line-height: 18px;"
      >
        <el-table-column prop="id" label="纳税人识别号"></el-table-column>
        <el-table-column prop="name" label="纳税人姓名"></el-table-column>
        <el-table-column
          prop="tel_phone"
          label="纳税人联系方式"
        ></el-table-column>
        <el-table-column prop="is_jiaona" label="交纳状态"></el-table-column>
        <el-table-column
          prop="shiji_money"
          label="实际缴纳金额"
        ></el-table-column>
        <el-table-column
          prop="yuji_money"
          label="预计缴纳金额"
        ></el-table-column>
        <el-table-column prop="chazhi_money" label="缴纳差值"></el-table-column>
      </el-table>
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
      drugstore: [
        {
          name: "新乡市中心医院",
          center: "113.865366,35.296382",
          lng: "113.865366",
          lat: "35.296382"
        },
        {
          name: "新乡医学院第三附属医院",
          center: "113.925962,35.280968",
          lng: "113.925962",
          lat: "35.280968"
        },
        {
          name: "第二人民医院",
          center: "113.879099,35.315574",
          lng: "113.879099",
          lat: "35.315574"
        }
      ],
      hotel: [
        {
          name: "格林豪泰酒店",
          center: "113.883219,35.284612",
          lng: "113.883219",
          lat: "35.284612"
        },
        {
          name: "新乡国际饭店",
          center: "113.891716,35.29428",
          lng: "113.891716",
          lat: "35.29428"
        },
        {
          name: "新乡开元名都大酒店",
          center: "113.926477,35.307729",
          lng: "113.926477",
          lat: "35.307729"
        },
        {
          name: "荷塘月色假日酒店",
          center: "113.93918,35.296522",
          lng: "113.93918",
          lat: "35.296522"
        }
      ],
      driverschool: [
        {
          name: "河南省工业科技学校",
          center: "113.873323,35.27589",
          lng: "113.873323",
          lat: "35.27589"
        },
        {
          name: "河南科技学院",
          center: "113.938555,35.280375",
          lng: "113.938555",
          lat: "35.280375"
        }
      ],
      tableData: [
        {
          id: "10000010",
          name: "张三",
          tel_phone: "0100-15533333",
          is_jiaona: "已缴费",
          shiji_money: "500000",
          yuji_money: "500000",
          chazhi_money: "0"
        },
        {
          id: "10000011",
          name: "李四",
          tel_phone: "0100-15533333",
          is_jiaona: "未缴费",
          shiji_money: "0",
          yuji_money: "500000",
          chazhi_money: "-500000"
        },
        {
          id: "10000012",
          name: "王五",
          tel_phone: "0100-15533333",
          is_jiaona: "已缴费",
          shiji_money: "200000",
          yuji_money: "500000",
          chazhi_money: "-300000"
        }
      ],
      drugStoreLayer: [],
      hotelLayer: [],
      driverschoolLayer: [],
      showDrugstore: true,
      showHotel: true,
      showDriverschool: true
    };
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
      for (let i = 0; i < this.drugstore.length; i++) {
        let marker = new AMap.Marker({
          // icon:
          // "http://imga5.5054399.com/upload_pic/2019/5/16/4399_11240875591.jpg",
          icon: "../image/poi-marker-default.png",
          position: [this.drugstore[i].lng, this.drugstore[i].lat],
          map: this.map
          // offset: new AMap.Pixel(-13, -30)
        });
        marker.content =
          "经度：" + this.drugstore[i].lng + "，纬度：" + this.drugstore[i].lat;
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
    markerClick(e) {
      console.log("aaa");
      this.infoWindow.setContent(e.target.content);
      this.infoWindow.open(this.map, e.target.getPosition());
    },
    // 创建酒店点图层
    creatHotelLayer() {
      for (let i = 0; i < this.hotel.length; i++) {
        let marker = new AMap.Marker({
          icon: "../image/poi-marker-fangkuai.png",
          // icon: "../../image/poi-marker-fangkuai.png",
          position: [this.hotel[i].lng, this.hotel[i].lat],
          map: this.map
          // offset: new AMap.Pixel(-13, -30)
        });
        marker.content =
          "经度：" + this.hotel[i].lng + "，纬度：" + this.hotel[i].lat;
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
      for (let i = 0; i < this.driverschool.length; i++) {
        let marker = new AMap.Marker({
          icon: "../image/poi-marker-sanjiao",
          // icon: "../../image/poi-marker-default.png",
          position: [this.driverschool[i].lng, this.driverschool[i].lat],
          map: this.map
          // offset: new AMap.Pixel(-13, -30)
        });
        marker.content =
          "经度：" +
          this.driverschool[i].lng +
          "，纬度：" +
          this.driverschool[i].lat;
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
#myPageTop {
  position: absolute;
  top: 40px;
  left: 1100px;
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
