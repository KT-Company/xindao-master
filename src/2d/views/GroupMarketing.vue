<!-- 物流公司 -->
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
const data1Echarts = () => {
  const data1 = reactive({
    color: "#C99827",
    name: "客户销量",
    Xdata: base7.map((item) => item.qykhxl01),
    dataList: base7.map((item) => item.qykhxl02 || 0),
    isShow: false,
  });
  option.data1 = setBar(data1, { interval: 1 });
};

const data2Echarts = () => {
  const data2 = reactive({
    color: "#5C73E6",
    name: "客单价",
    Xdata: CHART.inventoryNames,
    dataList: [
      base5.rm01001,
      base5.rm01002,
      base5.rm01003,
      base5.rm01004,
      base5.rm01005,
      base5.rm01006,
      base5.rm01007,
      base5.rm01008,
      base5.rm01009,
      base5.rm01010,
      base5.rm01011,
      base5.rm01012,
      base5.rm01013,
      base5.rm01014,
      base5.rm01015,
      base5.rm01016,
      base5.rm01017,
      base5.rm01018,
      base5.fp00001,
      base5.fp00002,
      base5.fp00003,
    ],
    isShow: true,
  });
  option.data2 = setBar(data2);
};

const data3Echarts = () => {
  const data3 = reactive({
    color: "#4EBA92",
    name: "销售毛利率",
    Xdata: base8.map((item) => item.month),
    dataList: base8.map((item) => item.qyxsmlv02),
    isShow: true,
  });
  option.data3 = setLineFinancial(data3);
};
const data4Echarts = () => {
  const data4 = reactive({
    color: "#CCCCCC",
    name: "销售结构",
    Xdata: CHART.inventoryNames,
    dataList: [
      base6.rm01001,
      base6.rm01002,
      base6.rm01003,
      base6.rm01004,
      base6.rm01005,
      base6.rm01006,
      base6.rm01007,
      base6.rm01008,
      base6.rm01009,
      base6.rm01010,
      base6.rm01011,
      base6.rm01012,
      base6.rm01013,
      base6.rm01014,
      base6.rm01015,
      base6.rm01016,
      base6.rm01017,
      base6.rm01018,
      base6.fp00001,
      base6.fp00002,
      base6.fp00003,
    ],
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