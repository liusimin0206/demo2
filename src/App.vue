<template>
  <div id="app">
    <el-container>
      <!-- header -->
      <el-header height="1px">Header</el-header>
      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="300px">
          <el-menu default-active="$router.path" router>
            <!-- 类似的添加导航菜单 index传值代表路由跳转 -->

            <el-menu-item index="/" @click="changeLayersShow">
              <i class="el-icon-menu"></i>
              <span slot="title">图层显示</span>
            </el-menu-item>
            <el-menu-item-group>
              <el-menu-item v-for="item in layers" :key="item.layerName">
                <el-checkbox
                  :label="item.name"
                  v-model="item.show"
                ></el-checkbox>
              </el-menu-item>
            </el-menu-item-group>
            <el-submenu index>
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>汇总报表</span>
              </template>
              <el-menu-item index="/about1">全市历年税收情况</el-menu-item>
              <el-menu-item index="/about">各行业税收比</el-menu-item>
              <el-menu-item index="/sum_of_hotel"
                >酒店行业税收汇总</el-menu-item
              >
              <el-menu-item index="/sum_of_diverschool"
                >驾校行业税收汇总</el-menu-item
              >
              <el-menu-item index="/sum_of_drugstore"
                >药店行业税收汇总</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧主视图 -->
        <el-main>
          <router-view :layers="layers" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      layers: {
        drugstore: {
          show: true,
          name: "药店 ○"
        },
        hotel: {
          show: true,
          name: "酒店 △"
        },
        driverSchool: {
          show: true,
          name: "驾校󠄀󠄀 "
        }
      }
    };
  },
  methods: {
    changeLayersShow() {
      this.layers.drugstore.show = true;
      this.layers.hotel.show = true;
      this.layers.driverSchool.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  .el-container {
    height: 100%;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 100px;
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    height: 100%;
    background-color: #e9eef3;
    color: #333;
    text-align: center;
  }
}
</style>
