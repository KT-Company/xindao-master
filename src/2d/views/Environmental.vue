<!-- 环境人口 -->
<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { gethjrk } from "@/2d/api";
import { useYear, useLastYear } from "@/2d/hooks/useTime";
import { setZhuChart } from "@/2d/viewCharts/Area";
import {
  setZhexianChart,
  setZhuLineChart,
} from "@/2d/viewCharts/Environmental";

import { useStore } from "vuex";
const store = useStore();
const base = reactive({
  data: {},
});
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
});

const data1 = reactive({
  xData: [],
  data: [{ name: "历年人口数据", value: [] }],
});

const data2 = reactive({
  xData: [],
  data: [
    { name: "社会消费品零售总额", value: [] },
    { name: "上年", value: [] },
  ],
});

const data3 = reactive({
  xData: [],
  data: [{ name: "物价指数", value: [] }],
});

const total = computed(() => {
  return (
    base.data.czrknldrs0_14s +
    base.data.czrknldrs14_59s +
    base.data.czrknldrs_60sys
  );
});

const sthj = ref([
  { img: null, name: "生态环境质量指数EI", value: 0, unit: "" },
  { img: null, name: "森林覆盖率达", value: 0, unit: "%" },
  { img: null, name: "人均公园绿地面积", value: 0, unit: "㎡" },
  { img: null, name: "污水处理率达", value: 0, unit: "%" },
  { img: null, name: "新能源车保有量达", value: 0, unit: "万辆" },
]);
for (let index = 0; index < 5; index++) {
  sthj.value[index].img = require(`@/2d/assets/images/sthj${index + 1}.png`);
}
const baseList = ref([]);
onMounted(() => {
  gethjrk().then((res) => {
    console.log("环境人口: ", res);
    const data = res.data.formInfoList;
    base.data = data.find((item) => item.year == store.state.year);
    baseList.value = data.filter((item) => useYear(item));

    data1.xData = baseList.value.map((item) => item.year);
    data1.data[0].value = baseList.value.map((item) => item.zrksl);
    option.data1 = setZhuChart(data1);

    data2.xData = data1.xData;
    data2.data[0].value = baseList.value.map((item) => item.shxfplsze);
    data2.data[1].value = data
      .filter((item) => useLastYear(item))
      .map((item) => item.shxfplsze || 0);

    option.data2 = setZhuLineChart(data2, {
      unit: ["亿元", "亿元"],
    });

    sthj.value[0].value = base.data.sthjzlzsei;
    sthj.value[1].value = base.data.slfgl;
    sthj.value[2].value = base.data.rjgyldmj;
    sthj.value[3].value = base.data.wscll;
    sthj.value[4].value = base.data.xnycbyl;

    data3.xData = data1.xData;
    data3.data[0].value = baseList.value.map((item) => item.jmxfjgzscpi);
    option.data3 = setZhexianChart(data3);
  });
});
const message = ref("page2");
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>总人口</Title>
      <Content>
        <div class="bg-hui zrk-info">
          <span class="hui">总人口数量：</span><span>{{base.data.zrksl}}<span class="hui">万人</span></span>
        </div>
        <div class="zrk-chart">
          <Title class="zrk-title"><span>历年人口数据</span><span class="hui unit">单位：万人</span></Title>
          <Content>
            <Echart :option="option.data1"></Echart>
          </Content>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>人口结构</Title>
      <Content class="rkjg-main">
        <div>
          <p class="rkjg-bg1">{{ (base.data.czrknldrs0_14s/total* 100).toFixed(2) }}%</p>
          <p>
            <span>{{ base.data.czrknldrs0_14s }}</span>
            <span class="hui">0-14岁</span>
            <span class="unit1">(万人)</span>
          </p>
        </div>
        <div>
          <p class="rkjg-bg2">{{ (base.data.czrknldrs14_59s/total* 100).toFixed(2) }}%</p>
          <p>
            <span>{{ base.data.czrknldrs14_59s }}</span>
            <span class="hui">15-59岁</span>
            <span class="unit1">(万人)</span>
          </p>
        </div>
        <div>
          <p class="rkjg-bg3">{{ (base.data.czrknldrs_60sys/total * 100).toFixed(2) }}%</p>
          <p>
            <span>{{ base.data.czrknldrs_60sys }}</span>
            <span class="hui">60岁及以上</span>
            <span class="unit1">(万人)</span>
          </p>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>消费</Title>
      <Content>
        <div class="bg-hui xf-info">
          <p class="hui">社会消费品零售总额</p>
          <p>{{ base.data.shxfplsze }}<span class="hui">亿元</span></p>
        </div>
        <div class="xf-chart">
          <Echart :option="option.data2"></Echart>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>城市空气质量</Title>
      <Content class="cskqzl-main">
        <div class="bg-hui">
          <p><span class="val1">{{base.data.qnkqzlylts}}</span>天</p>
          <p class="hui">全年空气质量优良天数</p>
        </div>
        <div class="bg-hui">
          <p><span class="val1">{{base.data.qnzwrts}}</span>天</p>
          <p class="hui">全年重污染日</p>
        </div>
        <div class="bg-hui">
          <p><span class="val1">{{base.data.pm2_5njnd}}</span>微克/m³</p>
          <p class="hui">PM2.5年均浓度</p>
        </div>
        <div class="bg-hui">
          <p><span class="val1">{{base.data.cynjnd}}</span>微克/m³</p>
          <p class="hui">臭氧年均浓度</p>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>生态环境</Title>
      <Content class="sthj-main">
        <div
          v-for="(item,i) in sthj"
          :key="i"
        >
          <p>
            <img :src=item.img>
            <span class="hui">{{item.name}}</span>
          </p>
          <p>{{item.value}}<span class="unit1">{{ item.unit}}</span></p>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>物价指数</Title>
      <Content>
        <div class="wjzs-info bg-hui">
          <span class="hui">居民消费价格指数CPI</span>
          <span>{{base.data.jmxfjgzscpi}}</span>
        </div>
        <div class="wjzs-chart">
          <Echart :option="option.data3"></Echart>
        </div>
      </Content>
    </Bar>
  </Right>
</template>
<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 376fr 240.5fr 321fr;
  row-gap: 1.6%;
}
.z-right {
  display: grid;
  grid-template-rows: 226fr 400fr 312fr;
  row-gap: 1.6%;
}

.zrk-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4%;
  height: 10%;
  margin: 5% 0;
}

.zrk-chart {
  height: 76%;
  .zrk-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:nth-child(1) {
      font-size: var(--titleSize);
    }
  }
}

.rkjg-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10%;
  padding: 4% 0;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .rkjg-bg1 {
      background: url("@/2d/assets/images/yq-hui.png") no-repeat center center /
        contain;
    }
    .rkjg-bg2 {
      background: url("@/2d/assets/images/yq-lv.png") no-repeat center center /
        contain;
    }
    .rkjg-bg3 {
      background: url("@/2d/assets/images/yq-huang.png") no-repeat center center /
        contain;
    }
    & p:nth-child(1) {
      height: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    & p:nth-child(2) {
      height: 28%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.xf-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 12%;
  padding: 0 4%;
  margin: 5% 0;
}

.xf-chart {
  height: 71%;
}

.cskqzl-main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  padding: 5% 0;
  row-gap: 10%;
  column-gap: 5%;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}

.sthj-main {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  row-gap: 4%;
  padding: 5% 0;
  div {
    display: flex;
    background: rgba(124, 124, 124, 0.2);
    align-items: center;
    justify-content: space-between;
    padding: 0 4%;
    img {
      opacity: 0.34;
      width: 2rem;
      margin-right: 0.4rem;
    }
    p {
      display: flex;
      align-items: center;
    }
  }
}

.wjzs-info {
  display: flex;
  margin: 5% 0;
  height: 13%;
  justify-content: space-between;
  align-items: center;
  padding: 0 4%;
}

.wjzs-chart {
  height: 70%;
}
</style>
