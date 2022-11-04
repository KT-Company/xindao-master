<!-- 产业经济 -->
<!-- 
  数据对接情况：全部完成
 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { setColumnChart } from "@/2d/viewCharts/Education";
import { setHistogramChartMore } from "@/2d/viewCharts/IndustrialEconomy";
import { getcyjj } from "@/2d/api";
import { useYear } from "@/2d/hooks/useTime";
import { useStore } from "vuex";
const store = useStore();
const cyzb = reactive({
  data: {},
});
const cyzbList = ref([]);

const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
});

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
  { name: "(国家级)高新技术企业", value: 0 },
  { name: "(国家级)科技部科技型中小企业", value: 0 },
  { name: "(国家级)技术创新示范企业", value: 0 },
  { name: "(国家级)专精特新“小巨人”企业", value: 0 },
  { name: "(市级)专精特新“小巨人”中小企业", value: 0 },
  { name: "(市级)专精特新“小巨人”企业", value: 0 },
]);

const taxChartData = ref([
  { name: "税收收入", value: 0, unit: "亿" },
  { name: "增值税收入", value: 0, unit: "亿" },
  { name: "企业所得税收入", value: 0, unit: "亿" },
  { name: "个人所得税收入", value: 0, unit: "亿" },
  { name: "地方政府债券", value: 0, unit: "亿" },
  { name: "地方政府债务", value: 0, unit: "亿" },
  { name: "一般公共预算支出", value: 0, unit: "亿" },
  { name: "社会消费品零售总额", value: 0, unit: "亿" },
]);
onMounted(() => {
  getcyjj().then((res) => {
    console.log('getcyjj: ', res);
    const data = res.data.formInfoList;
    cyzb.data = data.find((item) => item.year == store.state.year);
    cyzbList.value = data.filter((item) => useYear(item));

    industrialChartData.xData = cyzbList.value.map((item) => item.year);
    industrialChartData.data[0].value = cyzbList.value.map(
      (item) => item.gyzjz
    );

    totalAmountChartData.xData = cyzbList.value.map((item) => item.year);
    totalAmountChartData.data[0].value = cyzbList.value.map(
      (item) => item.ckze || 0
    );
    totalAmountChartData.data[1].value = cyzbList.value.map(
      (item) => item.jkze || 0
    );

    taxChartData.value[0].value = cyzb.data.sssr;
    taxChartData.value[1].value = cyzb.data.zzssr;
    taxChartData.value[2].value = cyzb.data.qysdssr;
    taxChartData.value[3].value = cyzb.data.grsdssr;
    taxChartData.value[4].value = cyzb.data.dfzfzq;
    taxChartData.value[5].value = cyzb.data.dfzfzw;
    taxChartData.value[6].value = cyzb.data.ybggyszc;
    taxChartData.value[7].value = cyzb.data.shxfplsze;

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

    option.data1 = setColumnChart(industrialChartData, {
      legend: false,
      grid: { top: "15%", bottom: "15%" },
      barW: 25,
      unit: "亿元",
    });

    option.data2 = setColumnChart(totalAmountChartData, {
      barW: 13,
      barImgW: 20,
      grid: { top: "23%", bottom: "10%" },
      unit: "亿美元",
    });

    option.data3 = setHistogramChartMore(taxChartData.value, 4);

    option.data4 = setColumnChart(dataChartData, {
      barW: 13,
      barImgW: 20,
      grid: { top: "23%", bottom: "15%" },
      unit: "亿元",
    });
  });
});
</script>

<template>
  <Left>
    <Title>{{store.state.year}}--经济总量</Title>
    <ul class="industry-main main">
      <li>
        <span>GDP总值</span><span>{{cyzb.data.gdpzz}}亿</span>
      </li>
      <li>
        <span>GDP增速</span><span>{{cyzb.data.gdpzs}}%</span>
      </li>
      <li>
        <span>人均GDP</span><span>{{cyzb.data.rjgdp}}元</span>
      </li>
      <li>
        <span>第一产业</span><span>{{cyzb.data.dycy}}亿</span>
      </li>
      <li>
        <span>第二产业</span><span>{{cyzb.data.decy}}亿</span>
      </li>
      <li>
        <span>第三产业</span><span>{{cyzb.data.dscy}}亿</span>
      </li>
    </ul>
    <Title>工业增加值</Title>
    <div class="industrial-main main">
      <Echart
        :option="option.data1"
        class="h-100"
      ></Echart>
    </div>
    <Title>外贸总量</Title>
    <div class="totalAmount-main main">
      <Echart
        :option="option.data2"
        class="h-100"
      ></Echart>
    </div>
  </Left>
  <Right>
    <Title>2021一一企业总量</Title>
    <ul class="economic-main">
      <li
        v-for="(item, index) in economicData"
        :key="index"
      >
        <span>{{ item.name }}</span>
        <hr />
        <span>{{ item.value }}</span>
      </li>
    </ul>
    <Title>税收与债务</Title>
    <div class="tax-main">
      <Echart
        :option="option.data3"
        class="h-100"
      ></Echart>
    </div>
    <Title>社会存贷款总量</Title>
    <div class="data-main">
      <Echart
        :option="option.data4"
        class="h-100"
      ></Echart>
    </div>
  </Right>
</template>


<style lang="less" scoped>
.main {
  height: calc(33% - var(--titleH));
}

.industry-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 40%;
    padding-left: 18%;

    & span:nth-child(1) {
      color: rgb(194, 194, 194);
      font-size: 0.7vw;
    }

    & span:nth-child(2) {
      font-size: 0.75vw;
      font-weight: bold;
    }

    &:nth-child(1) {
      background: url("@/2d/assets/images/gdp1.png") no-repeat left bottom / 40%
        80%;
    }

    &:nth-child(2) {
      background: url("@/2d/assets/images/gdp2.png") no-repeat left bottom / 40%
        80%;
    }

    &:nth-child(3) {
      background: url("@/2d/assets/images/gdp3.png") no-repeat left bottom / 40%
        80%;
    }

    &:nth-child(4) {
      background: url("@/2d/assets/images/chanye1.png") no-repeat left bottom /
        40% 80%;
    }

    &:nth-child(5) {
      background: url("@/2d/assets/images/chanye2.png") no-repeat left bottom /
        40% 80%;
    }

    &:nth-child(6) {
      background: url("@/2d/assets/images/chanye3.png") no-repeat left bottom /
        40% 80%;
    }
  }
}

.economic-main,
.data-main {
  height: calc(30% - var(--titleH));
}

.tax-main {
  height: calc(40% - var(--titleH));
}

.economic-main {
  display: flex;
  flex-direction: column;
  padding: 0 6%;

  li {
    display: flex;
    align-items: center;
    flex: 1;

    & span:nth-child(1) {
      color: rgb(194, 194, 194);
    }

    hr {
      flex: 1;
      border: 1px solid rgba(184, 184, 184, 0.2);
      height: 1px;
      margin: 0.5% 2% 0 2%;
    }
  }
}
</style>
