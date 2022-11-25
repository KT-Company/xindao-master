<!-- 教育医疗 -->
<script setup>
import { ref, reactive, onMounted } from "vue";
import Highchart from "@/2d/components/util/Highchart/Highchart.vue";
import { getjyyl } from "@/2d/api";
import { useYear } from "@/2d/hooks/useTime";
import {
  setSchoolChart,
  setHistogramChartMore,
  setColumnChart,
} from "@/2d/viewCharts/Education";
import { useStore } from "vuex";
const store = useStore();
const base = reactive({
  data: {},
});
// const baseList = ref([]);

const schoolChartData = ref([
  { name: "高等院校", y: 0, h: 0, selected: true },
  { name: "中等院校", y: 0, h: 0, selected: true },
  { name: "小学教育", y: 0, h: 0, selected: true },
  { name: "学前教育", y: 0, h: 0, selected: true },
]);
const medicalChartData = ref([
  { name: "医疗卫生机构", value: 0, unit: "家" },
  { name: "市属医疗机构", value: 0, unit: "家" },
  { name: "床位", value: 0, unit: "万张" },
  { name: "医护人员", value: 0, unit: "万人" },
  { name: "总诊疗人次", value: 0, unit: "亿次" },
]);
const insuranceChartData = reactive({
  xData: ["参保人数（万）", "基金收入（亿）", "基金支出（亿）"],
  data: [
    { name: "职工基本医疗保险", value: [0, 0, 0] },
    { name: "城乡居民基本医疗保险", value: [0, 0, 0] },
  ],
});
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
});
const jiaoyuData = reactive([
  { name: "教育支出占比", value: "0%" },
  { name: "教育总投入(亿元)", value: "0" },
  { name: "教职工人数", value: "0" },
  { name: "专任教师总人数", value: "0" },
  { name: "高考报名人数", value: "0" },
  { name: "中考报名人数", value: "0" },
]);

onMounted(() => {
  getjyyl().then((res) => {
    console.log("getjyyl: ", res);
    const data = res.data.formInfoList;
    base.data = data.find((item) => item.year == store.state.year);
    // baseList.value = data.filter((item) => useYear(item));

    try {
      jiaoyuData[0].value = `${base.data.jyzczb}%`;
      jiaoyuData[1].value = base.data.sjztr;
      jiaoyuData[2].value = base.data.jzgzrs;
      jiaoyuData[3].value = base.data.zrjszrs;
      jiaoyuData[4].value = base.data.gkbmrs;
      jiaoyuData[5].value = base.data.zkbmrs;
    } catch (error) {}

    try {
      schoolChartData.value[0].y = base.data.gdyxs;
      schoolChartData.value[1].y = base.data.zdyxs;
      schoolChartData.value[2].y = base.data.xxjyyxs;
      schoolChartData.value[3].y = base.data.xqjyyxs;
    } catch (error) {}

    try {
      medicalChartData.value[0].value = base.data.ylwsjg;
      medicalChartData.value[1].value = base.data.ssyljg;
      medicalChartData.value[2].value = base.data.cw;
      medicalChartData.value[3].value = base.data.yhrs;
      medicalChartData.value[4].value = base.data.zzlrc;
    } catch (error) {}

    try {
      insuranceChartData.data[0].value[0] = base.data.zgjbylbxrs;
      insuranceChartData.data[0].value[1] = base.data.zgjbylbxjjsr;
      insuranceChartData.data[0].value[2] = base.data.zgjbylbxjjzc;
      insuranceChartData.data[1].value[0] = base.data.cxjmjbylbxrs;
      insuranceChartData.data[1].value[1] = base.data.cxjmjbylbxjjsr;
      insuranceChartData.data[1].value[2] = base.data.cxjmjbylbxjjzc;
    } catch (error) {}



    option.data1 = setSchoolChart(schoolChartData);
    option.data2 = setHistogramChartMore(medicalChartData.value, 3);
    option.data3 = setColumnChart(insuranceChartData);
  });
  var index = -1;
  setInterval(() => {
    index++;
    if (index === schoolChartData.value.length) index = 0;
    schoolChartData.value.forEach((item) => (item.h = 0));
    schoolChartData.value[index].h = 10;
  }, 1000);
});
</script>

<template>
  <Left>
    <Title>教育概况{{store.state.year}}年</Title>
    <ul class="education-main">
      <li
        v-for="(item,index) in jiaoyuData"
        :key="item.name"
      >
        <p>
          <span :class="['num-type','animation-downUp',[0,3,4].includes(index) ? 'num-jianbian-lan' : 'num-jianbian-huang']">{{ item.value }}</span>
        </p>
        <p>{{ item.name }}</p>
      </li>
    </ul>
    <Title>院校分布与数量</Title>
    <div class="school-main">
      <div class="school-chart-bg"></div>
      <Highchart
        :option="option.data1"
        uid="gg"
      ></Highchart>
    </div>
  </Left>

  <Right>
    <Title>{{store.state.year}}一一医疗指标</Title>
    <div class="medical-main">
      <Echart
        :option='option.data2'
        class="h-100"
      ></Echart>
    </div>
    <Title>医疗保险和生育保险主要指标</Title>
    <div class="insurance-main">
      <Echart
        :option='option.data3'
        class="h-100"
      ></Echart>
    </div>
  </Right>
</template>

<style lang="less" scoped>
.education-main {
  height: calc(60% - var(--titleH));
  // border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  li {
    // border: 1px solid pink;
    width: 40%;
    & p:nth-child(1) {
      height: 70%;
      text-align: center;
      padding-top: 6%;
      span {
        font-size: 1.2vw;
        font-weight: bold;
      }
    }
    &:nth-child(1) p:nth-child(1) {
      background: url("@/2d/assets/images/guanghuan-lan.png") no-repeat center
        bottom / 75% 75%;
      span {
        animation: downUp 1s infinite alternate-reverse;
      }
    }
    &:nth-child(2) p:nth-child(1) {
      background: url("@/2d/assets/images/guanghuan-huang.png") no-repeat center
        bottom / 75% 75%;
    }
    &:nth-child(3) p:nth-child(1) {
      background: url("@/2d/assets/images/guanghuan-huang.png") no-repeat center
        bottom / 75% 75%;
    }
    &:nth-child(4) p:nth-child(1) {
      background: url("@/2d/assets/images/guanghuan-lan.png") no-repeat center
        bottom / 75% 75%;
    }
    &:nth-child(5) p:nth-child(1) {
      background: url("@/2d/assets/images/guanghuan-lan.png") no-repeat center
        bottom / 75% 75%;
    }
    &:nth-child(6) p:nth-child(1) {
      background: url("@/2d/assets/images/guanghuan-huang.png") no-repeat center
        bottom / 75% 75%;
    }
    & p:nth-child(2) {
      background: url("@/2d/assets/images/fang-lan.png") no-repeat center center /
        100% 100%;
      height: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8vw;
    }
  }
}
.school-main {
  height: calc(40% - var(--titleH));
  position: relative;
  .school-chart-bg {
    position: absolute;
    background: url("@/2d/assets/images/chart-yuanpan.png") no-repeat center
      center / 100% 100%;
    height: 70%;
    width: 100%;
    bottom: -15%;
    left: 50%;
    transform: translateX(-50%);
  }
  .school-title-box {
    height: 30%;
    display: flex;
  }
  #gg {
    height: 100%;
  }
}

.medical-main {
  height: calc(55% - var(--titleH));
}
.insurance-main {
  height: calc(45% - var(--titleH));
}

.animation-downUp {
  animation: downUp 1s infinite alternate-reverse;
}

@keyframes downUp {
  from {
    transform: translateY(50%);
  }

  to {
    transform: translateY(-30%);
  }
}
</style>