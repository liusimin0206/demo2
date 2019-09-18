

<template>
  <div class="box">
    <div id="container" style="width:1150px; height:650px"></div>
    <div class="input-card">
      <div class="input-item">
        <el-checkbox
          v-model="showDrugstore"
          @change="toggleLayer(showDrugstore, 'drugStoreLayer')"
        >药店</el-checkbox>
      </div>
      <div class="input-item">
        <el-checkbox v-model="showHotel" @change="toggleLayer(showHotel, 'hotelLayer')">酒店</el-checkbox>
      </div>
      <div class="input-item">
        <el-checkbox
          v-model="showDriverschool"
          @change="toggleLayer(showDriverschool, 'driverschoolLayer')"
        >驾校</el-checkbox>
      </div>
    </div>
    <div id="myPageTop">
      请输入关键字：
      <input id="tipinput" />
    </div>
    <div>
      <el-table :data="tableData" border style=" width: 1150px;height: 100%; line-height: 18px;">
        <el-table-column prop="id" label="纳税人识别号"></el-table-column>
        <el-table-column prop="name" label="纳税人姓名"></el-table-column>
        <el-table-column prop="tel_phone" label="纳税人联系方式"></el-table-column>
        <el-table-column prop="is_jiaona" label="交纳状态"></el-table-column>
        <el-table-column prop="shiji_money" label="实际缴纳金额"></el-table-column>
        <el-table-column prop="yuji_money" label="预计缴纳金额"></el-table-column>
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
      drugstore: [
        { name: "新乡市中心医院", center: "113.865366,35.296382" },
        { name: "新乡医学院第三附属医院", center: "113.925962,35.280968" },
        { name: "第二人民医院", center: "113.879099,35.315574" }
      ],
      hotel: [
        { name: "格林豪泰酒店", center: "113.883219,35.284612" },
        { name: "新乡国际饭店", center: "113.891716,35.29428" },
        { name: "新乡开元名都大酒店", center: "113.926477,35.307729" },
        { name: "荷塘月色假日酒店", center: "113.93918,35.296522" }
      ],
      driverschool: [
        { name: "河南省工业科技学校", center: "113.873323,35.27589" },
        { name: "河南科技学院", center: "113.938555,35.280375" }
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
      drugStoreLayer: {},
      hotelLayer: {},
      driverschoolLayer: {},
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
      this.drugStoreLayer = new Loca.PointLayer({});
      // this.drugStoreLayer.setMap(this.map);
      this.drugStoreLayer.setData(this.drugstore, {
        // 指定经纬度所在字段
        lnglat: "center"
      });
      this.drugStoreLayer.setMap(this.map);
      this.drugStoreLayer.setOptions({
        style: {
          // 圆形半径，单位像素
          radius: 12,
          // 填充颜色
          color: "#ff0000",
          // 描边颜色
          borderColor: "#5a6aff",
          // 描边宽度，单位像素
          borderWidth: 1,
          // 透明度 [0-1]
          // opacity: this.showDrugstore ? 0.9 : 0
          opacity: 0.9
        }
      });
      this.drugStoreLayer.render();
    },
    // 创建酒店点图层
    creatHotelLayer() {
      this.hotelLayer = new Loca.PointLayer({});
      // this.drugStoreLayer.setMap(this.map);
      this.hotelLayer.setData(this.hotel, {
        // 指定经纬度所在字段
        lnglat: "center"
      });
      this.hotelLayer.setMap(this.map);
      this.hotelLayer.setOptions({
        style: {
          // 圆形半径，单位像素
          radius: 12,
          // 填充颜色
          color: "#0000ff",
          // 描边颜色
          borderColor: "#5a6aff",
          // 描边宽度，单位像素
          borderWidth: 1,
          // 透明度 [0-1]
          // opacity: this.showDrugstore ? 0.9 : 0
          opacity: 0.9
        }
      });
      this.hotelLayer.render();
    },
    // 创建驾校点图层
    creatDriverschoolLayer() {
      this.driverschoolLayer = new Loca.PointLayer({});
      // this.drugStoreLayer.setMap(this.map);
      this.driverschoolLayer.setData(this.driverschool, {
        // 指定经纬度所在字段
        lnglat: "center"
      });
      this.driverschoolLayer.setMap(this.map);
      this.driverschoolLayer.setOptions({
        style: {
          // 圆形半径，单位像素
          radius: 12,
          // 填充颜色
          color: "#00ff00",
          // 描边颜色
          borderColor: "#5a6aff",
          // 描边宽度，单位像素
          borderWidth: 1,
          // 透明度 [0-1]
          // opacity: this.showDrugstore ? 0.9 : 0
          opacity: 0.9
        }
      });
      this.driverschoolLayer.render();
    },
    // 切换图层显示与隐藏
    toggleLayer(showLayer, layerName) {
      showLayer ? this[layerName].show() : this[layerName].hide();
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

   
