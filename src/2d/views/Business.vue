<!-- 业务部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  setPiePercentage,
  setLine,
  setBar,
  setBarAcross,
} from "@/2d/viewCharts/Business";
import useData from "@/2d/hooks/useData";
import { toThreeDigitRating } from "@/2d/utils/num";
import CHART from "@/2d/viewCharts/Params";
import { menu } from "@/2d/hooks/useMenu";
const store = useStore();
const currMenu = menu.value.find((item) => item.id === store.state.menuAid);
const base = useData.data5(currMenu.name);
const base1 = useData.data7(currMenu.name);
const base2 = useData.data8(currMenu.name);
const base3 = useData.data2(currMenu.name);
const base4 = useData.data6(currMenu.name);
const base5 = useData.data1(currMenu.name);

const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
  data5: {},
  data6: {},
  data7: {},
  data8: {},
  data9: {},
});
const data7Id = ref(0);
const data1 = reactive({
  color: ["rgb(252,110,1)", "rgba(252,110,1,.5)"],
  data: [base.qycgzc004],
  perCentum: base.qycgzc004,
  titleData: "环比率",
  value0: toThreeDigitRating(base.qycgzc001),
  value1: toThreeDigitRating(base.qycgzc002),
  value2: toThreeDigitRating(base.qycgzc003),
});
const data3 = reactive({
  color: "#FF9F40",
  // name: "物流费用",
  Xdata: [],
  dataList: [],
  isShow: false,
});

const data6 = reactive({
  color: "#FF9F40",
  name: "存货周转率",
  Xdata: null,
  dataList: null,
  isShow: false,
});

if (store.state.MODE === "BUSINESS") {
  data6.Xdata = base2.chzzl.map((item) => item.period);
  data6.dataList = base2.chzzl.map((item) => item.rate);
  data6.interval = 1;

  data3.Xdata = base2.wlfy.map((item) => item.billDate);
  data3.dataList = base2.wlfy.map((item) => item.taxAmount);
  data3.interval = 1;
} else {
  data6.Xdata = base2.map((item) => item.month);
  data6.dataList = base2.map((item) => item.qychzzl02);

  data3.Xdata = base2.map((item) => item.month);
  data3.dataList = base2.map((item) => item.qywlfy02);
}

onMounted(() => {
  option.data1 = setPiePercentage(data1);
  option.data3 = setLine(data3);
  option.data6 = setLine(data6);
  data2Echarts();
  data4Echarts();
  data5Echarts();
  data7Echarts();
  data8Echarts();
  data9Echarts();
});

const data2Echarts = () => {
  const data2 = reactive({
    color: "#5C73E6",
    name: "供应商排名",
    labelData: null,
    valueData: null,
  });

  //
  if (store.state.MODE === "BUSINESS") {
    data2.labelData = base1.gysphb.map(
      (item, i) => `${i + 1}、` + item.supplierName
    );
    data2.valueData = base1.gysphb.map((item) => item.taxAmount || 0);
  } else {
    data2.labelData = base1
      .filter((item, i) => item.qygyspm01)
      .map((item, i) => `${i + 1}、` + item.qygyspm01);
    data2.valueData = base1
      .filter((item, i) => item.qygyspm01)
      .map((item) => item.qygyspm02 || 0);
  }

  option.data2 = setBarAcross(data2);
};

const data4List = ref([]);
const data4Echarts = () => {
  const data4 = reactive({
    color: "#5C73E6",
    name: "客户销量",
    Xdata: null,
    dataList: null,
    isShow: false,
  });

  if (store.state.MODE === "BUSINESS") {
    data4.Xdata = base1.khxl.map((item) => item.purchaseOrgName);
    data4.dataList = base1.khxl.map((item) => item.taxAmount);
  } else {
    data4.Xdata = base1
      .filter((item) => item.qykhxl01)
      .map((item) => item.qykhxl01);
    data4.dataList = base1
      .filter((item) => item.qykhxl01)
      .map((item) => item.qykhxl02);
  }
  option.data4 = setBar(data4);
};
const data5 = reactive({
  color: ["rgb(91,114,227)", "rgba(91,114,227,.5)"],
  data: [base3.qyckzy03],
  perCentum: base3.qyckzy03 + "%",
  titleData: "总空闲占比",
  value0: toThreeDigitRating(base3.qyckzy01),
  value1: toThreeDigitRating(base3.qyckzy02),
});
const data5Echarts = () => {
  option.data5 = setPiePercentage(data5);
};

let dataObj4 = {
  x: [],
  val: [],
};
if (store.state.MODE === "BUSINESS") {
  dataObj4.x = base4.xsjg.x
  dataObj4.val = base4.xsjg.data
  //   CHART.inventoryNamesLow.forEach((item, i) => {
  //   if (base4.xsjg[item]) {
  //     dataObj4.x.push(CHART.inventoryNames[i]);
  //     dataObj4.val.push(base4.xsjg[item]);
  //   }
  // });
} else {
  CHART.inventoryNamesLow.forEach((item, i) => {
    if (base4[item]) {
      dataObj4.x.push(CHART.inventoryNames[i]);
      dataObj4.val.push(base4[item]);
    }
  });
}

const data7Echarts = () => {
  const data7 = reactive({
    color: "#5C73E6",
    name: "销售结构",
    Xdata: dataObj4.x,
    dataList: dataObj4.val,
    isShow: true,
  });
  option.data7 = setBar(data7, { interval: 0 });
};
let dataObj = {
  x: [],
  val: [],
};
if (store.state.MODE === "BUSINESS") {
  dataObj.x = base.kdj.x
  dataObj.val = base.kdj.data
// CHART.inventoryNamesLow.forEach((item, i) => {
//   if (base.kdj[item]) {
//     dataObj.x.push(CHART.inventoryNames[i]);
//     dataObj.val.push(base.kdj[item]);
//   }
// });
}else{
CHART.inventoryNamesLow.forEach((item, i) => {
  if (base[item]) {
    dataObj.x.push(CHART.inventoryNames[i]);
    dataObj.val.push(base[item]);
  }
});
}

const data9Echarts = () => {
  const data9 = reactive({
    color: "#5C73E6",
    name: "客单价",
    Xdata: dataObj.x,
    dataList: dataObj.val,
    isShow: true,
  });
  option.data9 = setBar(data9, { interval: 0 });
};

let dataObj5 = {
  x: [],
  val: [],
};
CHART.inventoryNamesLow.forEach((item, i) => {
  if (base5[item]) {
    dataObj5.x.push(CHART.inventoryNames[i]);
    dataObj5.val.push(base5[item]);
  }
});
const data8Echarts = () => {
  const data8 = reactive({
    color: "rgba(255,159,64)",
    name: "企业库存情况",
    Xdata: dataObj5.x,
    dataList: dataObj5.val,
    isShow: true,
  });
  option.data8 = setBar(data8);
};
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>采购支出</Title>
      <Content class="dpy-row wrap-data1">
        <div class="echart-data1-box">
          <Echart
            :option="option.data1"
            class="echart-data1"
          ></Echart>
        </div>
        <div class="type-wrap">
          <div>￥{{ data1.value0 }}</div>
          <p>本月</p>
          <div>￥{{ data1.value1 }}</div>
          <p>环比</p>
          <div>￥{{ data1.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>供应商排名</Title>
      <Content>
        <div class="data2-warp">
          <Echart
            :option="option.data2"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>物流费用</Title>
      <Content>
        <div class="data3-warp">
          <!-- <span>单位：亿</span> -->
          <Echart
            :option="option.data3"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>客户销量</Title>
      <Content>
        <div class="data4-warp">
          <!-- <span>单位：亿</span> -->
          <Echart
            :option="option.data4"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业仓库容积</Title>
      <Content class="dpy-row wrap-data5">
        <div class="echart-data5-box">
          <Echart
            :option="option.data5"
            class="echart-data"
          ></Echart>
        </div>
        <div class="type-wrap">
          <p>总占用量</p>
          <div>{{ data5.value0 }}</div>
          <p>总空闲量</p>
          <div>{{ data5.value1 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>存货周转率</Title>
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
      <!-- <Title>销售结构/客单价</Title> -->
      <div class="data7-title dpy-row">
        <p
          :class="data7Id == 0 ? '' : 'active'"
          @click="data7Id = 0"
        >销售结构</p>/<p
          :class="data7Id == 0 ? 'active' : ''"
          @click="data7Id = 1"
        >客单价</p>
      </div>
      <Content>
        <div
          class="data7-warp"
          v-if="data7Id == 0"
        >
          <!-- <span>单位：亿</span> -->
          <Echart
            :option="option.data7"
            class="echart-data"
          ></Echart>
        </div>
        <div
          class="data7-warp"
          v-else
        >
          <!-- <span>单位：亿</span> -->
          <Echart
            :option="option.data9"
            class="echart-data"
          ></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业库存情况</Title>
      <Content>
        <div class="data8-warp">
          <!-- <span>单位：亿</span> -->
          <Echart
            :option="option.data8"
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
  grid-template-rows: 201fr 222fr 196fr 295fr;
  row-gap: 2%;

  .wrap-data1 {
    padding: 1vh 0;
    box-sizing: border-box;
    justify-content: left;

    .echart-data1-box {
      padding-right: 2vw;

      .echart-data1 {
        height: 9rem;
        width: 9rem;
      }
    }

    .type-wrap {
      position: relative;
      top: -1vh;

      & > div {
        font-size: 1vw;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #cae0ff;
      }

      & > p {
        font-size: 0.5rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #cae0ff;
        opacity: 0.7;
        padding-top: 0.7vh;
      }

      & > div:nth-of-type(3) {
        position: absolute;
        // left: -.8vw;
      }
    }
  }

  .data2-warp {
    height: 100%;
    .echart-data {
      width: 100%;
      height: 100%;
    }
  }

  .data3-warp {
    height: 100%;
    .echart-data {
      width: 100%;
      height: 100%;
    }
  }

  .data4-warp {
    height: 100%;
    .echart-data {
      width: 100%;
      height: 100%;
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
}

.z-right {
  display: grid;
  grid-template-rows: 201.3fr 196fr 259fr 259fr;
  row-gap: 2%;

  .wrap-data5 {
    padding: 1vh 0;
    box-sizing: border-box;
    justify-content: left;

    .echart-data5-box {
      padding-right: 2vw;

      .echart-data {
        height: 9rem;
        width: 9rem;
      }
    }

    .type-wrap {
      position: relative;
      top: -1vh;

      & > div {
        font-size: 1vw;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #cae0ff;
      }

      & > p {
        font-size: 0.5rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #cae0ff;
        opacity: 0.7;
        padding-top: 0.7vh;
      }
    }
  }

  .data6-warp {
    height: 100%;
    .echart-data {
      width: 100%;
      height: 100%;
    }
  }

  .data7-title {
    justify-content: flex-start;
    font-size: var(--titleSize);
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    height: 2rem;

    p {
      cursor: pointer;
      font-size: var(--titleSize);
    }

    .active {
      color: #ffffff;
      opacity: 0.5;
    }
  }

  .data7-warp {
    height: 100%;
    .echart-data {
      width: 100%;
      height: 100%;
    }
  }

  .data8-warp {
    height: 100%;
    .echart-data {
      width: 100%;
      height: 100%;
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
}
</style>