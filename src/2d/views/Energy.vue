<!-- 能源碳排放 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import {
  setFireChart,
  setCarbonChart1,
  setCarbonChart2,
  setFireChartB,
  lineChart,
} from "@/2d/viewCharts/Energy";
import { getnyzxhm, getnytpfy, getqynytpfy } from "@/2d/api";
import { useYear } from "@/2d/hooks/useTime";
import { useStore } from "vuex";
// import { getRandomList } from "@/2d/utils/myRandom";
const store = useStore();
const base = reactive({
  data: {},
});
const baseList = ref([]);
const quanguoTan = ref([]);
const quanguoArea = ref([]);

const fireChart = reactive({
  xData: [],
  data: [
    { name: store.state.year - 1, value: [] },
    { name: store.state.year, value: [] },
  ],
});

const quanguo = reactive({
  xData: [],
  data: [
    { name: "全国人均碳排放量", value: [] },
    { name: "全国碳排放总量", value: [] },
  ],
});

const renjun = reactive({
  xData: [],
  data: [
    { name: "北京人均碳排放量", value: [] },
    { name: "北京碳排放总量", value: [] },
  ],
});

const option = reactive({
  data1: {},
  data2: {},
  data3: {},
});

// const qynytpfy = reactive({data:{}})

onMounted(() => {
  getnytpfy().then((res) => {
    console.log("nytpfy: ", res);

    const data = res.data.formInfoList;
    // 寻找某个省份某年的数据
    base.data = data.find(
      (item) => item.year == store.state.year && item.szxs == store.state.szxs
    );
    // 寻找某个省份近几年的数据
    baseList.value = data
      .filter((item) => item.szxs == store.state.szxs)
      .filter((item) => useYear(item, 10));
    quanguoTan.value = data.filter((item) => item.year == store.state.year);
    // quanguoTan.value = getRandomList(quanguoList, 4);

    quanguo.xData = baseList.value.map((item) => item.year);
    quanguo.data[0].value = baseList.value.map((item) => item.qgrjtpfl);
    quanguo.data[1].value = baseList.value.map((item) => item.qgtpfzl);

    renjun.xData = baseList.value.map((item) => item.year);
    renjun.data[0].value = baseList.value.map((item) => item.rjtpfl);
    renjun.data[1].value = baseList.value.map((item) => item.pflzl);
    option.data2 = setCarbonChart1(quanguo);
    option.data3 = setCarbonChart2(renjun);
  });

  getnyzxhm().then((res) => {
    console.log("getnyzxhm: ", res);
    const data = res.data.formInfoList;
    fireChart.data[0].value = data
      .filter((item) => item.year == store.state.year - 1)
      .map((item) => item.hlfdzlm);
    fireChart.data[1].value = data
      .filter((item) => item.year == store.state.year)
      .map((item) => item.hlfdzlm);
    fireChart.xData = data
      .filter((item) => item.year == store.state.year)
      .map((item) => "1-" + item.month + "月");
    option.data1 = window.publicParams.fireBackup
      ? setFireChartB(fireChart)
      : lineChart(fireChart);
  });

  getqynytpfy().then((res) => {
    quanguoArea.value = res.data.formInfoList;
    console.log("getqynytpfy: ", res);
  });
});
</script>

<template>
  <Left class="z-left" v-if="false">
    <Bar>
      <div class="b-title">能源总消耗</div>
      <div class="b-content">
        <Echart :option="option.data1"></Echart>
      </div>
    </Bar>

    <Bar>
      <div class="b-title">新能源</div>
      <div class="b-content">

      </div>
    </Bar>

    <Bar>
      <div class="b-title">其他资源</div>
      <div class="b-content">

      </div>
    </Bar>

  </Left>
  <Right class="z-right" v-if="false">
    <Bar>
      <div class="b-title">全国碳排放</div>
      <div class="b-content">

      </div>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 386fr 244.5fr 307fr;
  row-gap: 1.6%;
}
.z-right {
  display: grid;
  grid-template-rows: 1fr;
}
</style>