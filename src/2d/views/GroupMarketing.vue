<!-- 营销部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { setBar, setLineFinancial } from "@/2d/viewCharts/Business";
import useData from "@/2d/hooks/useData";
import { toThreeDigitRating } from "@/2d/utils/num";
import CHART from "@/2d/viewCharts/Params";
const base7 = useData.data7("制造集团");
const base5 = useData.data5("制造集团");
const base8 = useData.data8("制造集团");
const base6 = useData.data6("制造集团");

const store = useStore();
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
});
onMounted(() => {
  data1Echarts();
  data2Echarts();
  data3Echarts();
  data4Echarts();
});
let khxl = null;

if (store.state.MODE === "BUSINESS") {
  khxl = base7.khxl.map((item) => {
    return {
      qykhxl01: item.purchaseOrgName,
      qykhxl02: item.taxAmount,
    };
  });
} else {
  khxl = base7.filter((item) => item.qykhxl01);
}
const data1Echarts = () => {
  const data1 = reactive({
    color: "#C99827",
    name: "客户销量",
    Xdata: khxl.map((item) => item.qykhxl01),
    dataList: khxl.map((item) => item.qykhxl02 || 0),
    isShow: false,
  });
  option.data1 = setBar(data1, { interval: 1, barW: "5%" });

};
let dataObj = {
  x: [],
  val: [],
};

if (store.state.MODE === "BUSINESS") {
  dataObj.x = base5.kdj.x
  dataObj.val = base5.kdj.data
  // if (base5.kdj[item]) {
  //   dataObj.x.push(CHART.inventoryNames[i]);
  //   dataObj.val.push(base5.kdj[item]);
  // }
} else {
  CHART.inventoryNamesLow.forEach((item, i) => {
    if (base5[item]) {
      dataObj.x.push(CHART.inventoryNames[i]);
      dataObj.val.push(base5[item]);
    }
  });
}

const data2Echarts = () => {
  const data2 = reactive({
    color: "#5C73E6",
    name: "客单价",
    Xdata: dataObj.x,
    dataList: dataObj.val,
  });
  option.data2 = setBar(data2);
};

const data3Echarts = () => {
  const data3 = reactive({
    color: "#4EBA92",
    name: "销售毛利率",
    Xdata: null,
    dataList: null,
    isShow: true,
  });

  if (store.state.MODE === "BUSINESS") {
    data3.Xdata = Object.keys(base8.xsmll);
    data3.dataList = Object.values(base8.xsmll);
    data3.interval = 1;
  } else {
    data3.Xdata = base8.map((item) => item.month);
    data3.dataList = base8.map((item) => item.qyxsmlv02);
  }
  option.data3 = setLineFinancial(data3);
};

let dataObj1 = {
  x: [],
  val: [],
};
if (store.state.MODE === "BUSINESS") {
  dataObj1.x = base6.xsjg.x;
  dataObj1.val = base6.xsjg.data;
} else {
  CHART.inventoryNamesLow.forEach((item, i) => {
    if (base6[item]) {
      dataObj1.x.push(CHART.inventoryNames[i]);
      dataObj1.val.push(base6[item]);
    }
  });
}

const data4Echarts = () => {
  const data4 = reactive({
    color: "#CCCCCC",
    name: "销售结构",
    Xdata: dataObj1.x,
    dataList: dataObj1.val,
    isShow: true,
  });
  option.data4 = setBar(data4);
};
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>客户销量</Title>
      <Content>
        <div class="data1-warp">
          <Echart
            :option="option.data1"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>客单价</Title>
      <Content>
        <div class="data2-warp">
          <Echart
            :option="option.data2"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>销售毛利率</Title>
      <Content>
        <div class="data3-warp">
          <Echart
            :option="option.data3"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>销售结构</Title>
      <Content>
        <div class="data4-warp">
          <Echart
            :option="option.data4"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  display: grid;
  grid-template-rows: 297fr 317fr;
  row-gap: 2%;
  top: 20.95% !important;
  height: 58.1% !important;
}

.data1-warp,
.data2-warp,
.data3-warp,
.data4-warp {
  .echart-data {
    width: 100%;
    height: 23vh;
  }
}
</style>