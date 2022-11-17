<!-- 教育医疗 -->
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getjyyl } from "@/2d/api";
import { useYear } from "@/2d/hooks/useTime";
import { setBingChart, setZhuChart } from "@/2d/viewCharts/Area";
import { useStore } from "vuex";
const store = useStore();
const base = reactive({
  data: {},
});
// const baseList = ref([]);

const schoolChartData = ref([
  { name: "小学教育", value: 0 },
  { name: "学前教育", value: 0 },
  { name: "中等院校", value: 0 },
  { name: "高等院校", value: 0 },
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
  data3: {},
});

onMounted(() => {
  getjyyl().then((res) => {
    console.log("getjyyl: ", res);
    const data = res.data.formInfoList;
    base.data = data.find((item) => item.year == store.state.year);
    // baseList.value = data.filter((item) => useYear(item));

    try {
      schoolChartData.value[0].value = base.data.xqjyyxs;
      schoolChartData.value[1].value = base.data.xxjyyxs;
      schoolChartData.value[2].value = base.data.zdyxs;
      schoolChartData.value[3].value = base.data.gdyxs;
    } catch (error) {}

    try {
      insuranceChartData.data[0].value[0] = base.data.zgjbylbxrs;
      insuranceChartData.data[0].value[1] = base.data.zgjbylbxjjsr;
      insuranceChartData.data[0].value[2] = base.data.zgjbylbxjjzc;
      insuranceChartData.data[1].value[0] = base.data.cxjmjbylbxrs;
      insuranceChartData.data[1].value[1] = base.data.cxjmjbylbxjjsr;
      insuranceChartData.data[1].value[2] = base.data.cxjmjbylbxjjzc;
    } catch (error) {}

    option.data1 = setBingChart(schoolChartData.value, { legend: 1 });
    option.data3 = setZhuChart(insuranceChartData, {
      legend: true,
      interval: 0,
      barW: "20%",
    });
  });
});
</script>

<template>
  <Left class="z-left">
    <Bar>
      <div class="b-title">教育概况</div>
      <div class="b-content content1">
        <ul class="bg-hui">
          <li>
            <span class="hui">教育支出占比</span
            ><span>{{ base.data.jyzczb }}%</span>
          </li>
          <li>
            <span class="hui">教育支出占比</span
            ><span>{{ base.data.sjztr }}</span>
          </li>
        </ul>

        <ul class="bg-hui">
          <li>
            <span class="hui">教职工总人数(人)</span
            ><span>{{ base.data.jzgzrs }}</span>
          </li>
          <li>
            <span class="hui">专任教师总人数(人)</span
            ><span>{{ base.data.zrjszrs }}</span>
          </li>
        </ul>

        <ul class="bg-hui">
          <li>
            <span class="hui">高考报名人数(人)</span
            ><span>{{ base.data.gkbmrs }}</span>
          </li>
          <li>
            <span class="hui">中考报名人数(人)</span
            ><span>{{ base.data.zkbmrs }}</span>
          </li>
        </ul>
      </div>
    </Bar>
    <Bar>
      <div class="b-title">院校分布与数量</div>
      <ul class="b-content content2">
        <Echart :option="option.data1"></Echart>
      </ul>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <div class="b-title">医疗概况</div>
      <div class="b-content content1 content-r1">
        <ul class="bg-hui">
          <li>
            <span class="hui">医疗卫生机构(家)</span
            ><span>{{ base.data.ylwsjg }}</span>
          </li>
          <li>
            <span class="hui">市属医疗机构(家)</span
            ><span>{{ base.data.ssyljg }}</span>
          </li>
        </ul>
        <ul class="bg-hui">
          <li>
            <span class="hui">床位(万)</span><span>{{ base.data.cw }}</span>
          </li>
          <li>
            <span class="hui">医护人员(万)</span
            ><span>{{ base.data.yhrs }}</span>
          </li>
          <li>
            <span class="hui">总诊疗人次(亿)</span
            ><span>{{ base.data.zzlrc }}</span>
          </li>
        </ul>
      </div>
    </Bar>
    <Bar>
      <div class="b-title">医疗保险和生育保险主要指标</div>
      <ul class="b-content content3">
        <Echart :option="option.data3"></Echart>
      </ul>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  height: 52% !important;
  top: 22% !important;
}

.z-left {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1.2fr 1fr;
  row-gap: 4%;
}
.z-right {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1.2fr;
  row-gap: 4%;
}

.content1 {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-columns: repeat(1fr);
  row-gap: 5%;
  padding: 3% 0;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    li {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
    }
  }
}

.content-r1{
  row-gap: 7%;
}

.content3{
  padding-bottom: 3%;
}
</style>