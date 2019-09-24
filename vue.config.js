const fs = require("fs");
module.exports = {
  publicPath: "./",
  devServer: {
    before(app) {
      app.get("/api/layers", (req, res) => {
        const data = fs.readFileSync(`mock/layers.json`).toString();
        const json = JSON.parse(data);
        return res.json(json);
      });
    }
  },
  configureWebpack: {
    externals: {
      AMap: "AMap" // 高德地图配置
    }
  }
};
