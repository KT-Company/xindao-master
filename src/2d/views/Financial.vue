<!-- 财务部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  setPiePercentage,
  setLineFinancial,
  setBar,
  setBarAcross,
} from "@/2d/viewCharts/Business";
import useData from "@/2d/hooks/useData";
import { toThreeDigitRating } from "@/2d/utils/num";
const base1 = useData.data1("制造集团");
const base8 = useData.data8("制造集团");
const store = useStore();
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
  data5: {},
});
onMounted(() => {
  data1Echarts();
  data2Echarts();
  data3Echarts();
  data4Echarts();
  data5Echarts();
});
const data1 = reactive({
  color: ["rgb(124,95,174)", "rgba(124,95,174,.5)"],
  data: [base1.qyyysr04],
  perCentum: `+${base1.qyyysr04}%`,
  titleData: "环比率",
  value0: toThreeDigitRating(base1.qyyysr01),
  value1: toThreeDigitRating(base1.qyyysr02),
  value2: toThreeDigitRating(base1.qyyysr03),
});
const data1Echarts = () => {
  option.data1 = setPiePercentage(data1);
};
const data2 = reactive({
  color: ["rgb(78,186,146)", "rgba(78,186,146,.5)"],
  data: [base1.qycbzc04],
  perCentum: `+${base1.qycbzc04}%`,
  titleData: "环比率",
  value0: toThreeDigitRating(base1.qycbzc01),
  value1: toThreeDigitRating(base1.qycbzc02),
  value2: toThreeDigitRating(base1.qycbzc03),
});
const data2Echarts = () => {
  option.data2 = setPiePercentage(data2);
};

const data3List = ref([]);
const Xdata3 = ref([]);
const data3Echarts = () => {
  for (let i = 1; i < 13; i++) {
    Xdata3.value.push(i + "月");
  }
  Xdata3.value.forEach((item) => {
    data3List.value.push({
      name: item,
      value: (Math.random() * 1).toFixed(2),
    });
  });
  const data3 = reactive({
    color: "#7D60B0",
    name: "总资产增长率",
    Xdata: base8.map((item) => item.month),
    dataList: base8.map((item) => item.qyzczzzl02),
    isShow: false,
  });
  option.data3 = setLineFinancial(data3);
};

const data4Echarts = () => {
  const data4 = reactive({
    color: "#FF9F40",
    name: "资产负债率",
    Xdata: base8.map((item) => item.month),
    dataList: base8.map((item) => item.qyzcfzl02),
    isShow: true,
  });
  option.data4 = setLineFinancial(data4);
};

const data5Echarts = () => {
  const data5 = reactive({
    color: "#4EBA92",
    name: "销售毛利率",
    Xdata: base8.map((item) => item.month),
    dataList: base8.map((item) => item.qyxsmlv02),
    isShow: true,
  });
  option.data5 = setLineFinancial(data5);
};
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>企业营业收入</Title>
      <Content class="dpy-row wrap-data-pie">
        <div class="echart-data-box">
          <Echart :option="option.data1" class="echart-data"></Echart>
        </div>
        <div class="type-wrap">
          <div class="purple">￥{{ data1.value0 }}</div>
          <p>本月</p>
          <div>￥{{ data1.value1 }}</div>
          <p>环比</p>
          <div class="type-left">￥{{ data1.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业成本支出</Title>
      <Content class="dpy-row wrap-data-pie">
        <div class="echart-data-box">
          <Echart :option="option.data2" class="echart-data"></Echart>
        </div>
        <div class="type-wrap">
          <div class="green">￥{{ data2.value0 }}</div>
          <p>本月</p>
          <div>￥{{ data2.value1 }}</div>
          <p>环比</p>
          <div class="type-left">￥{{ data2.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>总资产增长率</Title>
      <Content>
        <div class="data3-warp">
          <Echart :option="option.data3" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>资产负债率</Title>
      <Content>
        <div class="data4-warp">
          <Echart :option="option.data4" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>销售毛利率</Title>
      <Content>
        <div class="data5-warp">
          <Echart :option="option.data5" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,.z-right{
  top: 15.9% !important;
}
.z-left {
  display: grid;
  grid-template-rows: 231fr 233fr 244fr;
  row-gap: 2%;
  height: 68.44% !important;
  top: 17% !important;

  .wrap-data-pie {
    padding: 1vh 0;
    box-sizing: border-box;
    justify-content: left;

    .echart-data-box {
      padding-right: 2vw;

      .echart-data {
        height: 9rem;
        width: 9rem;
      }
    }

    .type-wrap {
      position: relative;
      top: -1vh;

      &>div {
        font-size: 1vw;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #cae0ff;
      }

      .purple {
        color: #7d60b0 !important;
      }

      .green {
        color: #4eba92;
      }

      &>p {
        font-size: 0.5rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #cae0ff;
        opacity: 0.7;
        padding-top: 1.3vh;
      }
    }
  }

  .data3-warp {
    .echart-data {
      width: 100%;
      height: 20vh;
    }
  }
}

.z-right {
  display: grid;
  grid-template-rows: 362fr 362fr;
  row-gap: 2%;
  height: 68.44% !important;
  top: 17% !important;

  .data4-warp {
    .echart-data {
      width: 100%;
      height: 29vh;
    }
  }

  .data5-warp {
    .echart-data {
      width: 100%;
      height: 29vh;
    }
  }
}
</style>