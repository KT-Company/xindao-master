<!-- 环境人口 -->
<script setup>
import { ref, onMounted, reactive } from "vue";
import { gethjrk } from "@/2d/api";
import {
  setYearManNumber,
  setConsumptionStatistics,
  setXFTJ
} from "@/2d/viewCharts/Environmental";
import { setPublicTransport } from "@/2d/viewCharts/transportation";
import { useYear } from "@/2d/hooks/useTime";

import { useStore } from "vuex";
const store = useStore();
const base = reactive({
  data: {}
});

const optionYearManNumber = reactive({ data: {} }); //历年人口数据
let ymnData = ref([]);

let newbase = reactive({ data: {} });
let datajson = ref({ data: {} });
let rate60 = ref();
let rate14 = ref();
let rate59 = ref();
let num60 = ref();
let num14 = ref();
let num59 = ref();

const optionConsumptionStatistics = reactive({ data: {} }); //消费统计
let ConsumptionStatisticsData = ref([]);

const urbanAirQuality = ref([]); //天气空气质量

let ecologicalEnvironment = ref([
  { data: null },
  { data: null },
  { data: null },
  { data: null },
  { data: null }
]); //生态环境

const optionXFTJ = reactive({ data: {} }); //消费统计
let XFTJData = ref([]);
// 社会消费品零售总额(亿元)
let shxfplsze = ref();
// 物价指数
let jmxfjgzscpi = ref();

onMounted(() => {
  var database = [];
  for (let index = 0; index < 30; index++) {
    let num = index < 10 ? `0${index}` : index;
    database.push({
      year: `20${num}`,
      czrknldrs0_14s: 2019,
      czrknldrs14_59s: 2019,
      czrknldrs_60sys: 2019,
      zrksl: 219,
      shxfplsze: 2019,
      qnkqzlylts: 2019,
      qnzwrts: 2019,
      pm2_5njnd: 2019,
      cynjnd: 2019,
      sthjzlzsei: 2019,
      slfgl: 2019,
      rjgyldmj: 2019,
      wscll: 2019,
      xnycbyl: 2019,
      jmxfjgzscpi: 89
    });
  }

  // getEnvironmental().then((res) => {
  //   // 历年人口增长
  //   let yearManNumber = res.data.yearManNumber
  //   console.log(yearManNumber);
  //   console.log('yearManNumber==================================');
  //   optionYearManNumber.data = setYearManNumber(yearManNumber);
  //   // 消费统计
  //   let consumptionStatistics = res.data.consumptionStatistics
  //   optionConsumptionStatistics.data = setConsumptionStatistics(consumptionStatistics);
  //   // 城市空气质量
  urbanAirQuality.value = [
    {
      id: 0,
      name: "全年空气质量优良天数",
      value: "0",
      unit: "天"
    },
    {
      id: 1,
      name: "全年重污染日",
      value: "0",
      unit: "天"
    },
    {
      id: 2,
      name: "PM2.5年均浓度",
      value: "0",
      unit: "微克/m³"
    },
    {
      id: 3,
      name: "臭氧年均浓度",
      value: "0",
      unit: "微克/m³"
    }
  ];
  //   urbanAirQuality.value.forEach((item, index) => {
  //     item.img = require(`@/2d/assets/images/uq-bg-${index + 1}.png`);
  //     switch (index) {
  //       case 0:
  //         item.color = "#00FF48"
  //         break;
  //       case 1:
  //         item.color = "#FF2727"
  //         break;
  //       case 2:
  //         item.color = "#527FFF"
  //         break;
  //       case 3:
  //         item.color = "#FFA800"
  //         break;
  //     }
  //   })
  //   // 生态环境
  ecologicalEnvironment.value = [
    {
      id: 0,
      name: "人均公园绿地面积",
      value: 0,
      unit: "m²",
      maxData: 345784
    },
    { id: 1, name: "森林覆盖率达", value: 0, unit: "%", maxData: 100 },
    {
      id: 2,
      name: "新能源车保有量达",
      value: 0,
      unit: "万辆",
      maxData: 100
    },
    { id: 3, name: "污水处理率达", value: 0, unit: "%", maxData: 100 },
    { id: 4, name: "生态环境质量指数EI", value: 0, unit: "", maxData: 100 }
  ];

  //   // 消费统计
  //   let xftj = []
  //   let year = 1988

  //   for (let i = 0; i < 30; i++) {
  //     let sum = Math.floor(Math.random() * 120 + 1);
  //     year += 1
  //     xftj.push(
  //       { name: year, value: sum }

  //     )
  //   }
  //   console.log(xftj);
  //   console.log('xftj-------------------------------------');
  //   optionXFTJ.data = setXFTJ(xftj);
  // });

  gethjrk().then((res) => {
    console.log("gethjrk: ", res);
    const datas = res.data.formInfoList;
    base.data = datas.filter((item) => useYear(item));
    // 历练人口-------------------------------------------------
    base.data.forEach((item, index) => {
      ymnData.value.push({
        id: index + 1,
        name: item.year,
        value: item.zrksl
      });
    });
    let data = ymnData.value;

    optionYearManNumber.data = setYearManNumber(data);
    // 人口结构
    newbase.data = base.data.find((item) => item.year == store.state.year);

    datajson.data = newbase.data;

    let totalNumber =
      datajson.data.czrknldrs0_14s +
      datajson.data.czrknldrs14_59s +
      datajson.data.czrknldrs_60sys;
    rate60.value = (
      (datajson.data.czrknldrs_60sys / totalNumber) *
      100
    ).toFixed(2);
    rate14.value = ((datajson.data.czrknldrs0_14s / totalNumber) * 100).toFixed(
      2
    );
    rate59.value = (
      (datajson.data.czrknldrs14_59s / totalNumber) *
      100
    ).toFixed(2);
    num60.value = datajson.data.czrknldrs_60sys;
    num14.value = datajson.data.czrknldrs0_14s;
    num59.value = datajson.data.czrknldrs14_59s;

    // 消费统计
    base.data.forEach((item, index) => {
      shxfplsze.value = item.shxfplsze;
      ConsumptionStatisticsData.value.push({
        id: index + 1,
        name: item.year,
        value: item.shxfplsze
      });
    });
    let dataConsumptionStatistics = ymnData.value;

    optionConsumptionStatistics.data = setConsumptionStatistics(
      dataConsumptionStatistics
    );

    // 天气质量
    urbanAirQuality.value.forEach((item, index) => {
      item.img = require(`@/2d/assets/images/uq-bg-${index + 1}.png`);
      switch (index) {
        case 0:
          (item.color = "#00FF48"), (item.value = datajson.data.qnkqzlylts);
          break;
        case 1:
          (item.color = "#FF2727"), (item.value = datajson.data.qnzwrts);

          break;
        case 2:
          (item.color = "#527FFF"), (item.value = datajson.data.pm2_5njnd);

          break;
        case 3:
          (item.color = "#FFA800"), (item.value = datajson.data.cynjnd);

          break;
      }
    });
    // 生态环境
    for (let i = 0; i < 5; i++) {}
    ecologicalEnvironment.value.forEach((item, index) => {
      switch (index) {
        case 0:
          (item.id = 0),
            (item.name = "人均公园绿地面积"),
            (item.unit = "m²"),
            (item.maxData = 22222);
          item.value = datajson.data.rjgyldmj;

          break;
        case 1:
          (item.id = 1),
            (item.name = "森林覆盖率达"),
            (item.unit = "%"),
            (item.maxData = 2222);
          item.value = datajson.data.slfgl;

          break;
        case 2:
          (item.id = 2),
            (item.name = "新能源车保有量达"),
            (item.unit = "万辆"),
            (item.maxData = 2222);
          item.value = datajson.data.xnycbyl;

          break;
        case 3:
          (item.id = 3),
            (item.name = "污水处理率达"),
            (item.unit = "%"),
            (item.maxData = 2222);
          item.value = datajson.data.wscll;

          break;
        case 4:
          (item.id = 3),
            (item.name = "生态环境质量指数EI"),
            (item.unit = ""),
            (item.maxData = 2222);
          item.value = datajson.data.sthjzlzsei;

          break;
      }
      // item.data = setPublicTransport(res.data.ecologicalEnvironment[index], "#FFF5EE", require("@/2d/assets/images/pie-bg-w.png"), item.maxData)
    });
    ecologicalEnvironment.value.forEach((item, index) => {
      item.data = setPublicTransport(
        item.value,
        "",
        "#FFF5EE",
        require("@/2d/assets/images/pie-bg-w.png"),
        item.maxData
      );
    });
    // console.log('ecologicalEnvironment', ecologicalEnvironment.value);
    // 消费指标

    base.data.forEach((item, index) => {
      jmxfjgzscpi.value = item.jmxfjgzscpi;
      XFTJData.value.push({
        id: index + 1,
        name: item.year,
        value: item.jmxfjgzscpi
      });
    });
    let dataXFTJ = JSON.parse(JSON.stringify(XFTJData.value));
    optionXFTJ.data = setXFTJ(dataXFTJ);
  });
});
const message = ref("page2");
</script>

<template>
  <Left>
    <Title>历年人口数据</Title>
    <div id="fire-chart">
      <Echart :option="optionYearManNumber.data" class="fire-chart"></Echart>
    </div>
    <Title>人口结构(常住人口年龄分布)</Title>
    <div class="left-box2">
      <div class="lan">
        <div class="line-box">
          <div class="span">{{ rate59 }} %</div>
          <div class="line"></div>
        </div>
        <div class="wrap dpy-column">
          <div class="total">{{ num59 }}</div>
          <div class="period">15-59岁</div>
        </div>
      </div>
      <div class="lv">
        <div class="wrap dpy-column">
          <div class="total">{{ num60 }}</div>
          <div class="period">60岁</div>
        </div>
        <div class="line-box">
          <div class="span">{{ rate60 }} %</div>
          <div class="line"></div>
        </div>
      </div>
      <div class="huang">
        <div class="wrap dpy-column">
          <div class="total">{{ num14 }}</div>
          <div class="period">0-14岁</div>
        </div>
        <div class="line-box">
          <div class="span">{{ rate14 }} %</div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <Title>消费统计</Title>
    <div id="div-box3">
      <div class="title">
        社会消费品零售总额(元)<span>{{ shxfplsze }}</span>
      </div>
      <div id="chart2">
        <Echart
          :option="optionConsumptionStatistics.data"
          :style="{ height: '160px' }"
        ></Echart>
      </div>
    </div>
  </Left>
  <Right>
    <Title>城市天气质量</Title>
    <div class="uq-wrap dpy-row">
      <div
        class="uq-box dpy-row"
        v-for="item in urbanAirQuality"
        :key="item.id"
      >
        <div
          :style="{
            background: `url(${item.img})`,
            'background-size': '100% 100%'
          }"
          class="img"
        ></div>
        <div>
          <div class="title">{{ item.name }}</div>
          <div :style="{ color: `${item.color}` }">
            {{ item.value
            }}<span :style="{ color: `${item.color}` }">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <Title>生态环境</Title>
    <div class="st-wrap dpy-row" v-if="ecologicalEnvironment[0].data">
      <div
        v-for="item in ecologicalEnvironment"
        :key="item.index"
        class="dpy-row"
        :class="item.id == 4 ? 'full' : 'half'"
      >
        <Echart
          :option="item.data"
          :style="{ height: '50px' }"
          class="echarts3"
        >
        </Echart>
        <div>
          <div class="name">{{ item.name }}</div>
          <div class="value">
            {{ item.value }}<span class="span">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <Title>物价指数</Title>
    <div class="xftj-wrap">
      <div class="title">
        居民消费价格指数CPI :<span>{{ jmxfjgzscpi }}</span>
      </div>
      <Echart
        :option="optionXFTJ.data"
        :style="{ height: '100%' }"
        class="echarts4"
      >
      </Echart>
    </div>
  </Right>
</template>
<style lang="less" scoped>
#fire-chart {
  height: calc(25% - var(--titleH));

  .fire-chart {
    height: 100%;
  }
}

.left-box2 {
  position: relative;
  height: calc(43% - var(--titleH));
  // overflow: hidden;
  width: 100%;

  .lan {
    position: absolute;
    top: 1%;
    left: 5%;
    height: 50%;
    width: 50%;

    .wrap {
      width: 65%;
      height: 10%;
      background: url("@/2d/assets/images/yuan-lan.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 25%;

      .total {
        font-size: 36px;
      }

      .period {
        color: #afc4ff;
      }
    }

    .line-box {
      position: absolute;
      top: 40%;
      width: 50%;
      height: 50%;

      .span {
        color: #124efb;
      }

      .line {
        width: 50%;
        height: 2px;
        background: linear-gradient(270deg, rgba(18, 78, 251, 0), #124efb);
        border-radius: 1px;
      }
    }
  }

  .lv {
    position: relative;
    top: 0%;
    left: 50%;
    height: 36%;
    width: 30%;

    .wrap {
      position: absolute;
      width: 100%;
      height: 50%;
      background: url("@/2d/assets/images/yuan-lv.png") no-repeat;
      background-size: 100% 90%;

      .total {
        font-size: 1.6vw;
      }

      .period {
        color: #49ffdf;
      }
    }

    .line-box {
      position: absolute;
      top: 50%;
      left: 100%;

      .span {
        color: #49ffdf;
        text-align: right;
      }

      .line {
        width: 63px;
        height: 2px;
        background: linear-gradient(270deg, #17ffc9, rgba(23, 255, 201, 0));
        border-radius: 1px;
      }
    }
  }

  .huang {
    position: relative;
    height: 40%;
    width: 32%;
    top: 10%;
    left: 35%;

    .wrap {
      width: 92%;
      height: 70%;
      background: url("@/2d/assets/images/yuan-huang.png") no-repeat;
      background-size: 100% 90%;

      .total {
        font-size: 1.6vw;
      }

      .period {
        color: #ffaf15;
      }
    }

    .line-box {
      position: absolute;
      top: 50%;
      left: 90%;

      .span {
        color: #ffa800;
        text-align: right;
      }

      .line {
        width: 63px;
        height: 2px;
        background: linear-gradient(
          270deg,
          rgba(255, 179, 31, 0.99),
          rgba(255, 176, 22, 0)
        );
        border-radius: 1px;
      }
    }
  }

  .wrap {
    padding: 5rem 0;
  }

  .period {
    font-size: 1.4vm;
    // font-family: Source Han Sans CN;
    font-weight: 300;
  }

  .span {
    font-size: 1.6vm;
    // font-family: Source Han Sans CN;
    font-weight: 400;
  }

  .total {
    font-size: 3.6vm;
    font-family: DINCond-Bold;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.9;
  }
}

#div-box3 {
  height: calc(25% - var(--titleH));
  text-align: center;

  .title {
    width: 100%;
    // height: 30%;
    line-height: 3rem;
    background: url("@/2d/assets/images/chart-title-bai-bg.png") no-repeat;
    background-size: 100% 100%;

    span {
      margin-left: 0.5rem;
      vertical-align: middle;

      font-size: 1.3rem;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #ffffff;
    }
  }

  #chart2 {
    height: 80%;

    .chart2 {
      width: 100%;
      height: 100%;
    }
  }
}

.uq-wrap {
  height: calc(24% - var(--titleH));
  width: 100%;
  flex-flow: wrap;

  padding: 0 2rem;

  .uq-box {
    width: 48%;
    padding-right: 1rem;

    .title {
      font-size: 0.8rem;
      white-space: nowrap;
      width: 7rem;
    }

    .img {
      width: 5rem;
      height: 4.5rem;
    }

    span {
      font-size: 0.1rem;
    }
  }
}

.st-wrap {
  height: calc(35% - var(--titleH));
  flex-flow: wrap;
  padding: 0 1rem;

  & > div {
    background: url("@/2d/assets/images/t-pie-bg.png") no-repeat;
    background-size: 100% 100%;

    .name {
      font-size: 0.117rem;
      // font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.6;
    }
  }

  .echarts3 {
    width: 30%;
  }

  .full {
    width: 100%;

    .echarts3 {
      width: 14%;
    }

    justify-content: left;
  }

  .half {
    width: 45%;
    justify-content: left;

    .echarts3 {
      width: 30%;
    }
  }
}

.xftj-wrap {
  height: calc(32% - var(--titleH));
  text-align: center;

  .title {
    width: 100%;
    // height: 29%;
    line-height: 3.4rem;
    background: url("@/2d/assets/images/chart-title-lan-bg.png") no-repeat;
    background-size: 100% 100%;

    span {
      margin-left: 0.5rem;
      vertical-align: middle;

      font-size: 1.3rem;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #ffffff;
    }
  }

  .echarts4 {
    height: 100%;
    width: 100%;
  }
}
</style>
