<!-- 营销部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  setPiePercentage,
  setLine,
  setBar,
  setBarAcross,
} from "@/2d/viewCharts/Business";
import { toThreeDigitRating } from "@/2d/utils/num";
import useData from "@/2d/hooks/useData";
import CHART from "@/2d/viewCharts/Params";
const base = useData.data6("经销企业");
const base1 = useData.data7("经销企业");
const base2 = useData.data8("经销企业");
const base3 = useData.data5("经销企业");
const store = useStore();
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
  data5: {},
  data6: {},
  data7: {},
});
onMounted(() => {
  data1Echarts();
  data2Echarts();
  data3Echarts();
  data4Echarts();
  data5Echarts();
  data6Echarts();
  data7Echarts();
});
const data1 = reactive({
  color: ["rgb(252,110,1)", "rgba(252,110,1,.5)"],
  data: [base.schdqk04],
  perCentum: `+${base.schdqk04}%`,
  titleData: "环比率",
  value0: toThreeDigitRating(base.schdqk04),
  value1: toThreeDigitRating(base.schdqk02),
  value2: toThreeDigitRating(base.schdqk03),
});
const data1Echarts = () => {
  option.data1 = setPiePercentage(data1);
};
const data2 = reactive({
  color: ["rgb(91,114,227)", "rgba(91,114,227,.5)"],
  data: [base.ggtfqk04],
  perCentum: `+${base.ggtfqk04}%`,
  titleData: "环比率",
  value0: toThreeDigitRating(base.ggtfqk01),
  value1: toThreeDigitRating(base.ggtfqk02),
  value2: toThreeDigitRating(base.ggtfqk03),
});
const data2Echarts = () => {
  option.data2 = setPiePercentage(data2);
};

const data3 = reactive({
  color: ["rgb(252,110,1)", "rgba(252,110,1,.5)"],
  data: [base.scktqk04],
  perCentum: "+70%",
  titleData: "环比率",
  value0: toThreeDigitRating(base.scktqk01),
  value1: base.scktqk02,
  value2: base.scktqk03,
});
const data3Echarts = () => {
  option.data3 = setPiePercentage(data3);
};

const data4Echarts = () => {
  const data4 = reactive({
    color: "#5C73E6",
    name: "客户销量",
    Xdata: base1.filter((item) => item.qykhxl01).map((item) => item.qykhxl01),
    dataList: base1
      .filter((item) => item.qykhxl01)
      .map((item) => item.qykhxl02),
    isShow: false,
  });
  option.data4 = setBar(data4, { interval: 1 });
};

const data5Echarts = () => {
  const data5 = reactive({
    color: "#FF9F40",
    name: "销售毛利率",
    Xdata: base2.map((item) => item.month),
    dataList: base2.map((item) => item.qyxsmlv02),
    isShow: true,
  });
  option.data5 = setLine(data5);
};
let dataObj = {
  x: [],
  val: [],
};
CHART.inventoryNamesLow.forEach((item, i) => {
  if (base[item]) {
    dataObj.x.push(CHART.inventoryNames[i]);
    dataObj.val.push(base[item]);
  }
});
const data6Echarts = () => {
  const data6 = reactive({
    color: "#5C73E6",
    name: "销售结构",
    Xdata: dataObj.x,
    dataList: dataObj.val,
    isShow: true,
  });
  option.data6 = setBar(data6);
};
let dataObj3 = {
  x: [],
  val: [],
};
CHART.inventoryNamesLow.forEach((item, i) => {
  if (base3[item]) {
    dataObj3.x.push(CHART.inventoryNames[i]);
    dataObj3.val.push(base3[item]);
  }
});
const data7Echarts = () => {
  const data7 = reactive({
    color: "rgba(255,159,64)",
    name: "客单价",
    Xdata: dataObj3.x,
    dataList: dataObj3.val,
    isShow: true,
  });
  option.data7 = setBar(data7);
};
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>市场获单情况</Title>
      <Content class="dpy-row wrap-data-pie">
        <div class="echart-data-box">
          <Echart
            :option="option.data1"
            class="echart-data"
          ></Echart>
        </div>
        <div class="type-wrap">
          <div>￥{{ data1.value0 }}</div>
          <p>本月</p>
          <div>￥{{ data1.value1 }}</div>
          <p>环比</p>
          <div class="type-left">￥{{ data1.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>广告投放情况</Title>
      <Content class="dpy-row wrap-data-pie">
        <div class="echart-data-box">
          <Echart
            :option="option.data2"
            class="echart-data"
          ></Echart>
        </div>
        <div class="type-wrap">
          <div>￥{{ data2.value0 }}</div>
          <p>本月</p>
          <div>￥{{ data2.value1 }}</div>
          <p>环比</p>
          <div class="type-left">￥{{ data2.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>市场开拓情况</Title>
      <Content class="dpy-row wrap-data-pie">
        <div class="echart-data-box">
          <Echart
            :option="option.data3"
            class="echart-data"
          ></Echart>
        </div>
        <div class="type-wrap type-wrap-pie">
          <p>累计总投入</p>
          <div>￥{{ data3.value0 }}</div>
          <p>已开拓市场</p>
          <div>{{ data3.value1 }}</div>
          <p>未开拓市场</p>
          <div>{{ data3.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>客户销量</Title>
      <div class="data4-warp">
        <!-- <span>单位：亿</span> -->
        <Echart
          :option="option.data4"
          class="echart-data"
        ></Echart>
      </div>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>销售毛利率</Title>
      <Content>
        <div class="data5-warp">
          <!-- <span>单位：亿</span> -->
          <Echart
            :option="option.data5"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>销售结构</Title>
      <Content>
        <div class="data6-warp">
          <!-- <span>单位：亿</span> -->
          <Echart
            :option="option.data6"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>客单价</Title>
      <Content>
        <div class="data7-warp">
          <!-- <span>单位：亿</span> -->
          <Echart
            :option="option.data7"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 187fr 187fr 202fr 211fr;
  row-gap: 1.6%;
  top: 11.68% !important;
  height: 76.64% !important;

  .wrap-data-pie {
    box-sizing: border-box;
    justify-content: left;

    .echart-data-box {
      padding-right: 2vw;

      .echart-data {
        height: 7rem;
        width: 7rem;
      }
    }

    .type-wrap {
      position: relative;

      & > div {
        font-size: 0.8vw;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #cae0ff;
      }

      & > p {
        font-size: 0.4rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #cae0ff;
        opacity: 0.7;
        padding-top: 0.7vh;
        word-break: keep-all;
      }

      .type-left {
        position: relative;
        // left: -.8vw;
      }
    }

    .type-wrap-pie {
      top: -0.2vh;
    }
  }

  .data4-warp {
    height: 100%;
    .echart-data {
      width: 100%;
      height: 100%;
    }
  }
}

.z-right {
  display: grid;
  grid-template-rows: 240fr 259fr 300fr;
  row-gap: 1.6%;
  top: 11.68% !important;
  height: 76.64% !important;

  .data5-warp {
    height: 100%;
    .echart-data {
      width: 100%;
      height: 100%;
    }
  }

  .data6-warp {
    height: 100%;
    .echart-data {
      width: 100%;
      height: 100%;
    }
  }

  .data7-warp {
    height: 100%;
    .echart-data {
      width: 100%;
      height: 100%;
    }
  }
}

span {
  font-size: 0.1vw;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #cae0ff;
  opacity: 0.7;
  float: right;
  padding-right: 1vw;
}
</style>