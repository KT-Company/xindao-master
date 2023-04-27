<!-- 区域层 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { setColumnChart } from "@/2d/viewCharts/Education";
import { getIntinterval } from "@/2d/utils/myRandom";
import { setSchoolChart } from "@/2d/viewCharts/Education";
import Highchart from "@/2d/components/util/Highchart/Highchart.vue";
import {
  setStackedChart,
  setLineCharts,
  setAddValue,
  setLineChartsQYJ,
} from "@/2d/viewCharts/Area";
import { getqycyjj } from "@/2d/api";
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
  data5: {},
  data6: {},
  data7: {},
});
const fixedAssetsChartData = reactive({
  xData: [],
  data: [{ name: "固定资产投入", value: [] }],
});
const areaAssetsChartData = ref([
  { name: "存货", y: 35, h: 0, selected: true },
  { name: "货币资金", y: 15, h: 0, selected: true },
  { name: "固定资产", y: 50, h: 0, selected: true },
]);

const gongyeChart = reactive({
  xData: [],
  data: [
    { name: "工业增加值", value: [] },
    { name: "中间投入", value: [] },
    { name: "工业总产值", value: [] },
    { name: "应交增值税", value: [] },
  ],
});

onMounted(() => {
  // getqycyjj().then((res) => {
  //   console.log("getqycyjj: ", res);
  // });

  for (let index = 0; index < 12; index++) {
    fixedAssetsChartData.xData.push(`${index + 1}月`);
    gongyeChart.xData.push(`${index + 1}月`);
    gongyeChart.data[0].value.push(getIntinterval(100, 0));
    gongyeChart.data[1].value.push(getIntinterval(100, 0));
    gongyeChart.data[2].value.push(getIntinterval(100, 0));
    gongyeChart.data[3].value.push(getIntinterval(100, 0));
    fixedAssetsChartData.data[0].value.push(getIntinterval(100, 20));
    option.data1 = setColumnChart(fixedAssetsChartData, {
      legend: false,
      grid: {
        top: "15%",
        left: "10%",
        bottom: "20%",
      },
      barW: 15,
      barImgW: 22,
      color: 1,
    });
  }
  option.data2 = setSchoolChart(areaAssetsChartData, "%");
  option.data3 = setStackedChart(gongyeChart);
  var index = -1;
  setInterval(() => {
    index++;
    if (index === areaAssetsChartData.value.length) index = 0;
    areaAssetsChartData.value.forEach((item) => (item.h = 0));
    areaAssetsChartData.value[index].h = 10;
  }, 1000);

  // 区域纳税总额度
  let xftj = [];
  let month = 0;
  let xftjdata2 = [];

  for (let i = 0; i < 12; i++) {
    let sum = Math.floor(Math.random() * 3000 + 1);
    month += 1;
    xftj.push({ name: month + "月", value: sum });
    let sum2 = Math.floor(Math.random() * 2000 + 3000);

    xftjdata2.push(sum2);
  }

  option.data4 = setLineCharts(
    xftj,
    "rgba(0, 7, 13, 1)",
    "rgba(255, 186, 52,0.2)",
    "rgba(255, 186, 52, .3)",
    "rgba(255, 186, 52,1)",
    6000,
    "区域纳税额/亿"
  );
  option.data6 = setLineCharts(
    xftj,
    "rgba(0, 7, 13, 1)",
    "rgba(46,255,105,0.27)",
    "rgba(46,255,105,0.27)",
    "rgba(46,255,105,0.27)",
    6000,
    "消费指数"
  );
  option.data7 = setLineChartsQYJ(
    xftj,
    "rgba(0, 7, 13, 1)",
    "rgba(255, 186, 52,0.2)",
    "rgba(255, 186, 52, .3)",
    "#2860FF",
    6000,
    xftjdata2
  );

  //  工业增加值
  let month2 = [];
  for (let i = 0; i < 12; i++) {
    month += 1;
    month2.push(month + "月");
  }
  let addValue2 = reactive({
    xData: month2,
    data: [
      { name: "共工业增加值", value: [] },
      { name: "中间投入", value: [] },
      { name: "工业总产量", value: [] },
      { name: "应交增值税", value: [] },
    ],
  });
  for (let j = 0; j < 12; j++) {
    for (let i = 0; i < 4; i++) {
      addValue2.data[i].value.push(getIntinterval(2000, 0));
    }
  }
  let data2color = [
    ["rgba(0,66,255, .8)", "rgba(0,66,255, 0.2)"],
    ["rgba(255,168,0, .8)", "rgba(255,168,0, 0.2)"],
    ["rgba(255,255,255, .8)", "rgba(255,255,255, 0.2)"],
    ["rgba(84,0,255, .8)", "rgba(84,0,255, 0.2)"],
  ];
  option.data3 = setAddValue(addValue2, data2color);
  // 服务增加值
  const addValue = reactive({
    xData: [],
    data: [
      { name: "中和服务中心", value: [] },
      { name: "供应", value: [] },
      { name: "经销", value: [] },
      { name: "物流", value: [] },
      { name: "政务", value: [] },
      { name: "银行", value: [] },
      { name: "销售", value: [] },
    ],
  });
  let year = 2009;
  for (let i = 0; i < 6; i++) {
    year += 1;
    addValue.xData.push(year);
  }
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 7; i++) {
      addValue.data[i].value.push(getIntinterval(2000, 0));
    }
  }
  let data5color = [
    ["rgba(0,66,255, .8)", "rgba(0,66,255, 0.2)"],
    ["rgba(255,168,0, .8)", "rgba(255,168,0, 0.2)"],
    ["rgba(255,255,255, .8)", "rgba(255,255,255, 0.2)"],
    ["rgba(84,0,255, .8)", "rgba(84,0,255, 0.2)"],
    ["rgba(0,255,246, .8)", "rgba(0,255,246, 0.2)"],
    ["rgba(255,240,0, .8)", "rgba(255,240,0, 0.2)"],
    ["rgba(0,255,72, .8)", "rgba(0,255,72, 0.2)"],
  ];
  option.data5 = setAddValue(addValue, data5color);
});

// 中间列表类容
let contentListBtn = ref([
  { name: "三圈关系", id: 0, change: true },
  { name: "资金流", id: 1, change: false },
  { name: "信息流", id: 2, change: false },
  { name: "物流", id: 3, change: false },
]);
let contentListBtnId = ref(0);
const changData = (id) => {
  contentListBtnId.value = id;
  contentListBtn.value.forEach((item) => {
    item.change = false;
    if (item.id == id) {
      item.change = true;
    }
  });
};
let btnBoeeomData = [
  {
    id: 0,
    title: "建筑基本信息",
    data: [
      { title: "开发商:", value: "中建五局" },
      { title: "物业名称:", value: "新都物业有限公司" },
      { title: "详细地址:", value: "北京市" },
      { title: "所属地块:", value: "DK-01" },
      { title: "占地面积:", value: "64123㎡" },
      { title: "层数:", value: "25层" },
      { title: "智能话设施:", value: "办公自动化系统" },
      { title: "LEED认证:", value: "是" },
      { title: "外立面材料:", value: "单元式玻璃幕墙" },
    ],
  },
  {
    id: 1,
    title: "建筑基本信息1",
    data: [
      { title: "开发商:", value: "中建五局" },
      { title: "物业名称:", value: "新都物业有限公司" },
      { title: "详细地址:", value: "北京市" },
      { title: "所属地块:", value: "DK-01" },
      { title: "占地面积:", value: "64123㎡" },
      { title: "层数:", value: "25层" },
      { title: "智能话设施:", value: "办公自动化系统" },
      { title: "LEED认证:", value: "是" },
      { title: "外立面材料:", value: "单元式玻璃幕墙" },
    ],
  },
  {
    id: 2,
    title: "建筑基本信息2",
    data: [
      { title: "开发商:", value: "中建五局" },
      { title: "物业名称:", value: "新都物业有限公司" },
      { title: "详细地址:", value: "北京市" },
      { title: "所属地块:", value: "DK-01" },
      { title: "占地面积:", value: "64123㎡" },
      { title: "层数:", value: "25层" },
      { title: "智能话设施:", value: "办公自动化系统" },
      { title: "LEED认证:", value: "是" },
      { title: "外立面材料:", value: "单元式玻璃幕墙" },
    ],
  },
  {
    id: 3,
    title: "建筑基本信息3",
    data: [
      { title: "开发商:", value: "中建五局" },
      { title: "物业名称:", value: "新都物业有限公司" },
      { title: "详细地址:", value: "北京市" },
      { title: "所属地块:", value: "DK-01" },
      { title: "占地面积:", value: "64123㎡" },
      { title: "层数:", value: "25层" },
      { title: "智能话设施:", value: "办公自动化系统" },
      { title: "LEED认证:", value: "是" },
      { title: "外立面材料:", value: "单元式玻璃幕墙" },
    ],
  },
];
</script>

<template>
  <Left>
    <Title>区域GDP</Title>
    <div class="main">
      <div class="GDP-wrap dpy-row">
        <div class="GDP-img dpy-column">
          <div class="percent">+58%</div>
          <div class="title">环比率</div>
        </div>
        <div class="GDP-data">
          <div class="box1">
            <div class="GDP-top dpy-row">
              <div class="icon"></div>
              <div class="text">本月</div>
            </div>
            <div class="GDP-bottom dpy-row">
              <div class="text">￥</div>
              <div class="text">22,332,323,232.23</div>
            </div>
          </div>
          <div class="box2">
            <div class="GDP-top dpy-row">
              <div class="icon"></div>
              <div class="text">环比</div>
            </div>
            <div class="GDP-bottom dpy-row">
              <div class="text">￥</div>
              <div class="text">22,332,323,232.23</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Title>工业增加值</Title>
    <div class="main">
      <Echart :option="option.data3" class="h-100"></Echart>
    </div>
    <Title>区域纳税总额</Title>
    <div class="main">
      <Echart :option="option.data4" class="h-100"></Echart>
    </div>
  </Left>
  <Right>
    <Title>服务增加值</Title>
    <div class="main">
      <Echart :option="option.data5" class="h-100"></Echart>
    </div>
    <Title>消费价格指数</Title>
    <div class="main">
      <Echart :option="option.data6" class="h-100"></Echart>
    </div>
    <Title>企业数量及总资产</Title>
    <div class="main">
      <Echart :option="option.data7" class="h-100"></Echart>
    </div>
  </Right>

  <div class="bottom">
    <div class="bottom-left">
      <Title class="bottom-title">固定资产投入</Title>
      <div class="bottom-main">
        <Echart :option="option.data1" class="h-100"></Echart>
      </div>
    </div>
    <div class="bottom-right">
      <Title class="bottom-title">区域资产结构</Title>
      <div class="bottom-main area-main">
        <div class="area-bg"></div>
        <Highchart :option="option.data2" uid="areaChart"></Highchart>
      </div>
    </div>
  </div>

  <div class="center-content">
    <div class="btn-list dpy-row">
      <div
        v-for="item in contentListBtn"
        :key="item.id"
        :class="item.change ? 'change' : 'unchange'"
        class="btn"
        @click="changData(item.id)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="center-bg" v-if="false">
      <div class="tetel">{{ btnBoeeomData[contentListBtnId].title }}</div>
      <div class="center-box">
        <div
          v-for="item in btnBoeeomData[contentListBtnId].data"
          :key="item.id"
          class="center-list"
        >
          <span class="span-title">{{ item.title }}</span>
          <span class="span-value">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <div class="dong"></div>
  </div>
</template>

<style lang="less" scoped>
.main {
  height: calc(33.33% - var(--titleH));
  // border: 1px solid red;
}

.bottom {
  height: calc(34.5% - var(--titleH));
  pointer-events: auto;
  width: 49%;
  position: absolute;
  bottom: 5%;
  left: 26%;
  display: flex;
  justify-content: space-between;

  .bottom-left,
  .bottom-right {
    width: 47%;
    height: 100%;

    .bottom-title {
      height: 18%;
    }

    .bottom-main {
      height: calc(100% - 18%);
      width: 100%;
    }
  }
}

#areaChart {
  height: 100%;
}

.area-main {
  position: relative;

  .area-bg {
    position: absolute;
    background: url("@/2d/assets/images/chart-yuanpan.png") no-repeat center
      center / 100% 100%;
    height: 75%;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    bottom: -20%;
  }
}

.GDP-wrap {
  width: 100%;
  height: 100%;
  padding: 0 1rem;

  .GDP-img {
    width: 35%;
    height: 66%;
    background: url("@/2d/assets/images/shuanghuan.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    justify-content: center;

    .percent {
      font-family: DINCond-Bold;
      font-size: 3rem;
      background-image: linear-gradient(
        0deg,
        rgba(155, 207, 255, 0.76) 0.9521484375%,
        #ffffff 100%
      );
      -webkit-background-clip: text;
      color: transparent;
      // color: linear-gradient(0deg, rgba(155, 207, 255, 0.76) 0.9521484375%, #FFFFFF 100%);
      // text-shadow: 0px 2px 1px rgba(0, 3, 4, 0.45);
    }
  }

  .GDP-data {
    & > div {
      margin: 1.5rem 0;
    }

    .dpy-row {
      justify-content: start;
    }

    .icon {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }

    .GDP-top {
      .text {
        color: #ffffff;
        opacity: 0.7;
        margin-left: 1rem;
      }
    }

    .GDP-bottom {
      .text {
        font-family: Microsoft YaHei;
        font-weight: 400;
        font-size: 1.3vw;
        color: #ffffff;
        opacity: 1;
      }
    }

    .box1 {
      .icon {
        background: #0042ff;
      }
    }

    .box2 {
      .icon {
        background: #00ff00;
      }
    }
  }
}

.center-content {
  // height: calc(34.5% - var(--titleH));
  pointer-events: auto;
  width: 37%;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%);

  .btn {
    width: 17%;
    height: 2.7rem;
    line-height: 0rem;
    text-align: center;
    font-size: 5rem;
    cursor: pointer;
  }

  .change {
    color: #ffffff;
    text-shadow: 2px 0px 3px rgba(11, 54, 57, 0.14);

    background: url("@/2d/assets/images/top-button-pick.png") no-repeat;
    background-size: 100% 100%;

    span {
      text-shadow: 2px 0px 3px rgba(11, 54, 57, 0.14);
      background: linear-gradient(
        180deg,
        #e8eeff 71.044921875%,
        #124efb 99.5849609375%
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  span {
    font-size: 1.2rem;
    font-family: DINCond-Bold;
  }

  .unchange {
    background: url("@/2d/assets/images/top-button.png") no-repeat;
    background-size: 100% 100%;

    span {
      text-shadow: 2px 0px 3px rgba(11, 54, 57, 0.14);
      background: linear-gradient(
        180deg,
        #e8eeff 71.044921875%,
        #bfcae8 99.5849609375%
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  .center-bg {
    width: 50%;
    height: 25rem;
    background: url("@/2d/assets/images/tanchuang-bg.png") no-repeat;
    background-size: 100% 100%;

    .tetel {
      padding: 1rem 0;
      font-size: 1.5rem;
      font-family: DINCond-Bold;
      font-weight: 700;
      text-shadow: 2px 0px 3px rgba(11, 54, 57, 0.14);
      background: linear-gradient(
        180deg,
        #e8eeff 71.044921875%,
        #bfcae8 99.5849609375%
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      text-align: center;
    }

    .center-box {
      width: 100%;

      .center-list {
        margin-top: 0.5rem;

        .span-title {
          width: 50%;
          display: inline-block;
          text-align: right;
          padding-right: 1rem;
          font-size: 1rem;
        }

        .span-value {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>