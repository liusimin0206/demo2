<template>
  <div class="about">
    <el-table :data="tableData" border style="width: 100%;line-height:18px">
      <el-table-column prop="business" label="纳税行业"></el-table-column>
      <el-table-column prop="time" label="纳税时间"></el-table-column>
      <el-table-column prop="Management_Section" label="管理科室"></el-table-column>
      <el-table-column prop="tel_phone" label="联系电话"></el-table-column>
      <el-table-column prop="shiji_money" label="实际缴纳金额"></el-table-column>
      <el-table-column prop="yuji_money" label="预计缴纳金额"></el-table-column>
      <el-table-column prop="chazhi_money" label="缴纳差值"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        // {
        //   business: "酒店",
        //   time: "2014-01",
        //   Management_Section: "xxxxx",
        //   tel_phone: "0100-15533333",
        //   shiji_money: "500000",
        //   yuji_money: "500000",
        //   chazhi_money: "0"
        // },
        // {
        //   business: "药店",
        //   time: "2014-02",
        //   Management_Section: "xxxxx",
        //   tel_phone: "0100-15533333",
        //   shiji_money: "0",
        //   yuji_money: "500000",
        //   chazhi_money: "-500000"
        // },
        {
          business: "驾校",
          time: "2014-03",
          Management_Section: "xxxxx",
          tel_phone: "0100-15533333",
          shiji_money: "200000",
          yuji_money: "500000",
          chazhi_money: "-300000"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.about {
  background: white;
}
</style>