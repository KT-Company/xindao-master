<!-- 产业经济 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getcyjj } from "@/2d/api";
import { useYear } from "@/2d/hooks/useTime";
import { useStore } from "vuex";
import { setZhuChart } from "@/2d/viewCharts/Area";
const store = useStore();

// 企业总量点击事件
const handleCompany = (item,index) => {
  pickIndex.value = index
  console.log("item: ", item);
};

const cyzb = reactive({
  data: {},
});
const cyzbList = ref([]);

const option = reactive({
  data1: {},
  data2: {},
  data4: {},
});

const jjzlData = ref([
  { name: "GDP总值(亿)", val: 0 },
  { name: "GDP增速", val: 0 },
  { name: "人均GDP(元)", val: 0 },
  { name: "第一产业(亿)", val: 0 },
  { name: "第二产业(亿)", val: 0 },
  { name: "第三产业(亿)", val: 0 },
]);

const industrialChartData = reactive({
  xData: [],
  data: [{ name: "工业增加值", value: [] }],
});
const totalAmountChartData = reactive({
  xData: [],
  data: [
    { name: "进口总额", value: [] },
    { name: "出口总额", value: [] },
  ],
});

const dataChartData = reactive({
  xData: [],
  data: [
    { name: "存款", value: [] },
    { name: "贷款", value: [] },
  ],
});

const economicData = reactive([
  { name: "(国家级)高新技术企业", value: 0, isPick: true },
  { name: "(国家级)科技部科技型中小企业", value: 0, isPick: false },
  { name: "(国家级)技术创新示范企业", value: 0, isPick: false },
  { name: "(国家级)专精特新“小巨人”企业", value: 0, isPick: false },
  { name: "(市级)专精特新“小巨人”中小企业", value: 0, isPick: false },
  { name: "(市级)专精特新“小巨人”企业", value: 0, isPick: false },
]);
const pickIndex = ref(0)
onMounted(() => {
  getcyjj().then((res) => {
    console.log("getcyjj: ", res);
    const data = res.data.formInfoList;
    cyzb.data = data.find((item) => item.year == store.state.year);
    cyzbList.value = data.filter((item) => useYear(item));

    jjzlData.value[0].val = cyzb.data.gdpzz;
    jjzlData.value[1].val = cyzb.data.gdpzs;
    jjzlData.value[2].val = cyzb.data.rjgdp;
    jjzlData.value[3].val = cyzb.data.dycy;
    jjzlData.value[4].val = cyzb.data.decy;
    jjzlData.value[5].val = cyzb.data.dscy;

    industrialChartData.xData = cyzbList.value.map((item) => item.year);
    industrialChartData.data[0].value = cyzbList.value.map(
      (item) => item.gyzjz
    );

    totalAmountChartData.xData = cyzbList.value.map((item) => item.year);
    totalAmountChartData.data[0].value = cyzbList.value.map(
      (item) => item.jkze || 0
    );
    totalAmountChartData.data[1].value = cyzbList.value.map(
      (item) => item.ckze || 0
    );

    economicData[0].value = cyzb.data.gjjgxjsqyzs;
    economicData[1].value = cyzb.data.gjjkjbkjxzxqy;
    economicData[2].value = cyzb.data.gjjjscxsfqy;
    economicData[3].value = cyzb.data.gjjzjtxxjrqy;
    economicData[4].value = cyzb.data.sjzjtxxjrzxqy;
    economicData[5].value = cyzb.data.sjzjtxxjrqy;

    dataChartData.xData = cyzbList.value.map((item) => item.year || 0);
    dataChartData.data[0].value = cyzbList.value.map(
      (item) => item.gxckye || 0
    );
    dataChartData.data[1].value = cyzbList.value.map(
      (item) => item.gxdkye || 0
    );

    option.data1 = setZhuChart(industrialChartData);

    option.data2 = setZhuChart(totalAmountChartData, {
      color: [1, 0],
      legend: true,
    });

    option.data4 = setZhuChart(dataChartData, {
      legend: true,
    });
  });
});
</script>

<template>
  <Left class="z-left">
    <Bar>
      <div class="b-title">经济总量</div>
      <ul class="b-content content1">
        <li v-for="(item, i) in jjzlData" :key="i">
          <span class="t1-val">{{ item.val }}</span>
          <span class="t1-name hui">{{ item.name }}</span>
        </li>
      </ul>
    </Bar>

    <Bar>
      <div class="b-title">工业增加值</div>
      <div class="b-content">
        <span class="unit1 hui">单位：亿</span>
        <Echart :option="option.data1"></Echart>
      </div>
    </Bar>

    <Bar>
      <div class="b-title">外贸总量</div>
      <div class="b-content">
        <ul class="wmzl-list">
          <li>
            <span class="hui">进出口总额(亿)</span>
            <span>{{ cyzb.data.jckze }}</span>
          </li>
          <li>
            <span class="hui">出口总额(亿)</span>
            <span>{{ cyzb.data.ckze }}</span>
          </li>
          <li>
            <span class="hui">进口总额(亿)</span>
            <span>{{ cyzb.data.jkze }}</span>
          </li>
        </ul>
        <div class="wmzl-chart">
          <span class="unit1 hui">单位：亿</span>
          <Echart :option="option.data2"></Echart>
        </div>
      </div>
    </Bar>
  </Left>
  <Right class="z-right">
    <Bar>
      <div class="b-title">企业总量</div>
      <ul class="b-content content2">
        <li
          v-for="(item, index) in economicData"
          :key="index"
          @click="handleCompany(item,index)"
          :class="[pickIndex === index ? 'pick-item' : '']"
        >
          <span class="hui">{{ item.name }}</span>
          <span>{{ item.value }}</span>
        </li>
      </ul>
    </Bar>

    <Bar>
      <div class="b-title">社会存贷款总量</div>
      <div class="b-content">
        <ul class="shcdk-list">
          <li>
            <span class="hui">各项存款余额(亿)</span
            ><span>{{ cyzb.data.gxckye }}</span>
          </li>
          <li>
            <span class="hui">各项贷款余额(亿)</span
            ><span>{{ cyzb.data.gxdkye }}</span>
          </li>
        </ul>
        <div class="shcdk-chart">
          <span class="unit1 hui">单位：亿</span>
          <Echart :option="option.data4"></Echart>
        </div>
      </div>
    </Bar>

    <Bar>
      <div class="b-title">税收与债务</div>
      <div class="b-content content3">
        <ul class="c3-list1">
          <li>
            <span class="hui">税收收入(亿)</span
            ><span>{{ cyzb.data.sssr }}</span>
          </li>
          <li>
            <span class="hui">增值税收入(亿)</span
            ><span>{{ cyzb.data.zzssr }}</span>
          </li>
          <li>
            <span class="hui">企业所得税收入(亿)</span
            ><span>{{ cyzb.data.qysdssr }}</span>
          </li>
          <li>
            <span class="hui">个人所得税收入(亿)</span
            ><span>{{ cyzb.data.grsdssr }}</span>
          </li>
        </ul>

        <ul>
          <li>
            <span class="hui">地方政府债券(亿)</span
            ><span>{{ cyzb.data.dfzfzq }}</span>
          </li>
          <li>
            <span class="hui">地方政府债务(亿)</span
            ><span>{{ cyzb.data.dfzfzw }}</span>
          </li>
        </ul>

        <ul>
          <li>
            <span class="hui">一般公共预算支出(亿)</span
            ><span>{{ cyzb.data.ybggyszc }}</span>
          </li>
        </ul>
      </div>
    </Bar>
  </Right>
</template>


<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-columns: 3fr;
  grid-template-rows: 1fr 0.8fr 1.4fr;
  row-gap: 2%;
}
.z-right {
  display: grid;
  grid-template-columns: 3fr;
  grid-template-rows: 1fr 1.2fr 1fr;
  row-gap: 2%;
}

.content1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(1fr);
  gap: 4%;
  li {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    .t1-val {
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #ffffff;
    }
    // .t1-name {
    //   color: rgb(199 202 208);
    // }
  }
}

.unit1 {
  position: absolute;
  right: 1%;
  top: -2%;
  font-size: 0.5vw;
}

.wmzl-list {
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  li {
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    height: 30%;
  }
}

.wmzl-chart {
  height: 60%;
  position: relative;
  margin-top: 5%;
}

.content2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  li {
    background: rgba(255, 255, 255, 0.1);
    // border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    height: 15%;
    transition: 0.3s ease;
    &:hover {
      cursor: pointer;
      // background: rgba(255, 0, 0, 0.5);
      // border: 1px solid rgba(255, 0, 0, 0.8);
      scale: 1.05;
    }
  }
}
.pick-item {
  background: rgba(255, 0, 0, 0.5) !important;
  // border: 1px solid rgba(255, 0, 0, 0.8) !important;
  border-left: 2px solid rgba(255, 0, 0, 0.8) !important;
}
.shcdk-list {
  height: 28%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5%;
    height: 45%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}

.shcdk-chart {
  margin-top: 2%;
  height: 70%;
  position: relative;
}

.content3 {
  display: grid;
  grid-template-columns: 3fr;
  grid-template-rows: 4fr 2fr 1fr;
  row-gap: 4%;
  ul {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5%;
    }
  }
  .c3-list1 {
    padding: 1% 0;
  }
}
</style>
