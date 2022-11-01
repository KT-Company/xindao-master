<!-- 政务中心 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { setColumnChart } from "@/2d/viewCharts/Education";
import { getMonth } from "@/2d/utils/month";
import { setLineChart } from '@/2d/viewCharts/Government'
const store = useStore();
const option = reactive({
  data1: {},
  data2: {},
});
const base = reactive({
  data: {},
});

const data1 = reactive({
  xData: getMonth(),
  data: [
    {
      name: "碳排放总配置数量",
      value: [300, 600, 700, 620, 450, 280, 300, 600, 700, 620, 450, 280],
    },
    {
      name: "累计碳排放数量",
      value: [390, 690, 790, 690, 490, 290, 390, 690, 790, 690, 490, 290],
    },
  ],
});
const data2 = reactive({
  xData: [
    "有限责任公司",
    "股份有限公司",
    "国有企业",
    "个体工商户",
    "独资企业",
    "外商投资企业",
  ],
  data: [{ name: "企业数量", value: [300, 600, 700, 620, 450, 280] }],
});

onMounted(() => {
  option.data1 = setLineChart(data1,{
    jianbian:['rgba(83,223,132, 1)','rgba(83,223,132,0.2)'],
  }, 'rgba(30,133,75, .3)', '#2860FF',)
  option.data2 = setColumnChart(data2, {
    legend: false,
    grid: {
      top: "15%",
      bottom: "30%",
    },
    color: 1,
    unit: "家",
    rotate: 45,
  });
});
</script>

<template>
  <Left>
    <Title>个人所得税与总收入比率</Title>
    <div class="main grsds-main">
      <div class="huan"><span class="num-jianbian-shenhui">45%</span><span class="num-jianbian-shenhui">比率</span></div>
      <div class="grsds-val">
        <p class="grsds-p"><span class="icon-lan"></span><span class="hui">总收入</span></p>
        <p>￥22696684.59</p>
        <p class="grsds-p"><span class="icon-lv"></span><span class="hui">个人所得税</span></p>
        <p>￥12,696,684.59</p>
      </div>
    </div>
    <Title>碳排量</Title>
    <div class="main">
      <Echart :option="option.data1"></Echart>
    </div>
  </Left>
  <Right>
    <Title>增值税与总收入比率</Title>
    <div class="main grsds-main">
      <div class="huan huan2"><span class="num-jianbian-shenhui">45%</span><span class="num-jianbian-shenhui">比率</span></div>
      <div class="grsds-val">
        <p class="grsds-p"><span class="icon-lan"></span><span class="hui">总收入</span></p>
        <p>￥22696684.59</p>
        <p class="grsds-p"><span class="icon-lv"></span><span class="hui">增值税</span></p>
        <p>￥12,696,684.59</p>
      </div>
    </div>
    <Title>企业类型数量</Title>
    <div class="main">
      <Echart :option="option.data2"></Echart>
    </div>
  </Right>
</template>

<style lang="less" scoped>
.main {
  // border: 1px solid red;
  height: calc(50% - var(--titleH));
}

.grsds-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .huan {
    margin-top: 6%;
    background: url("@/2d/assets/images/shuanghuan-lv.png") no-repeat center
      center / 100% 100%;
    width: 42%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span {
      font-size: 3rem;
      color: transparent;
      font-weight: bold;
      &:nth-child(2) {
        font-size: 0.8vw;
      }
    }
  }
  .grsds-val {
    height: 40%;
    width: 42%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    p {
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      span:nth-child(2) {
        margin-left: 0.4vw;
        font-size: 0.6vw;
      }
    }
    .grsds-p {
      font-size: 0.8rem;
    }
  }
}

.huan2 {
  background: url("@/2d/assets/images/shuanghuan.png") no-repeat center center /
    100% 100% !important;
}
</style>