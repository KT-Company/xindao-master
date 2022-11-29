<!-- 物流公司 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  setBar, setLineFinancial
} from "@/2d/viewCharts/Business";
const store = useStore();
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
});
onMounted(() => {
  data1Echarts()
  data2Echarts()
  data3Echarts()
  data4Echarts()
})
const data1List = ref([])
const Xdata1 = ref(["山东精杭制造有限公司", "新明创新科技销售有限公司"])
const data1Echarts = () => {
  Xdata1.value.forEach(item => {
    data1List.value.push({
      name: item,
      value: (Math.random() * 3000 + 1000).toFixed(2)
    })
  })
  const data1 = reactive({
    color: '#C99827',
    name: '客户销量',
    Xdata: Xdata1.value,
    dataList: data1List.value,
    isShow: false
  });
  option.data1 = setBar(data1)
}

const data2List = ref([])
const Xdata2 = ref([
  "FP00 001",
  "RM01 001",
  "RM01 002",
  "RM01 003",
  "RM01 004",
  "RM01 005",
  "RM01 006",
  "RM01 007",
  "RM01 008",
])
const data2Echarts = () => {
  Xdata2.value.forEach(item => {
    data2List.value.push({
      name: item,
      value: (Math.random() * 3000 + 1000).toFixed(2)
    })
  })
  const data2 = reactive({
    color: '#5C73E6',
    name: '客单价',
    Xdata: Xdata2.value,
    dataList: data2List.value,
    isShow: true
  });
  option.data2 = setBar(data2)
}

const data3List = ref([])
const Xdata3 = ref([])
const data3Echarts = () => {
  for (let i = 1; i < 13; i++) {
    Xdata3.value.push(i + '月')
  }
  Xdata3.value.forEach(item => {
    data3List.value.push({
      name: item,
      value: (Math.random() * 100).toFixed(2)
    })
  })
  const data3 = reactive({
    color: '#4EBA92',
    name: '销售毛利率',
    Xdata: Xdata3.value,
    dataList: data3List.value,
    isShow: true
  });
  option.data3 = setLineFinancial(data3)
}

const data4List = ref([])
const Xdata4 = ref([
  "FP00 001",
  "RM01 001",
  "RM01 002",
  "RM01 003",
  "RM01 004",
  "RM01 005",
  "RM01 006",
  "RM01 007",
  "RM01 008",
])
const data4Echarts = () => {
  Xdata4.value.forEach(item => {
    data4List.value.push({
      name: item,
      value: (Math.random() * 3000 + 1000).toFixed(2)
    })
  })
  const data4 = reactive({
    color: '#CCCCCC',
    name: '销售结构',
    Xdata: Xdata4.value,
    dataList: data4List.value,
    isShow: true
  });
  option.data4 = setBar(data4)
}
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>客户销量</Title>
      <Content>
        <div class="data1-warp">
          <Echart :option="option.data1" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>客单价</Title>
      <Content>
        <div class="data2-warp">
          <Echart :option="option.data2" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>销售毛利率</Title>
      <Content>
        <div class="data3-warp">
          <Echart :option="option.data3" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>销售结构</Title>
      <Content>
        <div class="data4-warp">
          <Echart :option="option.data4" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  display: grid;
  grid-template-rows: 297fr 317fr;
  row-gap: 2%;
  top: 20.95% !important;
  height: 58.1% !important;
}

.data1-warp,
.data2-warp,
.data3-warp,
.data4-warp {
  .echart-data {
    width: 100%;
    height: 23vh;
  }
}
</style>