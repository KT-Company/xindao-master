<!-- 营销部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  setPiePercentage, setLine, setBar, setBarAcross
} from "@/2d/viewCharts/Business";
const store = useStore();
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
  data5: {},
  data6: {},
  data7: {},
});
onMounted(() => {
  data1Echarts()
  data2Echarts()
  data3Echarts()
  data4Echarts()
  data5Echarts()
  data6Echarts()
  data7Echarts()
})
const data1 = reactive({
  color: ["rgb(252,110,1)", "rgba(252,110,1,.5)"],
  data: [70],
  perCentum: '+70%',
  titleData: '环比率',
  value0: "22,696,684.59",
  value1: "22,696,684.59",
  value2: "22,696,684.59",
});
const data1Echarts = () => {
  option.data1 = setPiePercentage(data1)
}
const data2 = reactive({
  color: ["rgb(91,114,227)", "rgba(91,114,227,.5)"],
  data: [70],
  perCentum: '+70%',
  titleData: '环比率',
  value0: "22,696,684.59",
  value1: "22,696,684.59",
  value2: "22,696,684.59",
});
const data2Echarts = () => {
  option.data2 = setPiePercentage(data2)
}

const data3 = reactive({
  color: ["rgb(252,110,1)", "rgba(252,110,1,.5)"],
  data: [70],
  perCentum: '+70%',
  titleData: '环比率',
  value0: "50,000",
  value1: "东北、华北、华东、 华中、西北",
  value2: "华南、西南",
});
const data3Echarts = () => {
  option.data3 = setPiePercentage(data3)

}

const data4List = ref([])
const Xdata4 = ref(["山东精航制造有限公司", "新明创新科技销售有限公司"])
const data4Echarts = () => {
  Xdata4.value.forEach(item => {
    data4List.value.push({
      name: item,
      value: (Math.random() * 3000 + 1000).toFixed(2)
    })
  })
  const data4 = reactive({
    color: '#5C73E6',
    name: '客户销量',
    Xdata: Xdata4.value,
    dataList: data4List.value,
    isShow: false
  });
  option.data4 = setBar(data4)
}

const data5List = ref([])
const Xdata5 = ref([])

const data5Echarts = () => {
  for (let i = 1; i < 13; i++) {
    Xdata5.value.push(i + '月')
  }
  Xdata5.value.forEach(item => {
    data5List.value.push({
      name: 'item',
      value: (Math.random() * 100).toFixed(2)
    })
  })
  const data5 = reactive({
    color: '#FF9F40',
    name: '存货周转率',
    Xdata: Xdata5.value,
    dataList: data5List.value,
    isShow: true
  });
  option.data5 = setLine(data5)

}


const data6List = ref([])
const Xdata6 = ref([
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
const data6Echarts = () => {
  Xdata6.value.forEach(item => {
    data6List.value.push({
      name: item,
      value: (Math.random() * 3000 + 1000).toFixed(2)
    })
  })
  const data6 = reactive({
    color: '#5C73E6',
    name: '销售结构',
    Xdata: Xdata6.value,
    dataList: data6List.value,
    isShow: true
  });
  option.data6 = setBar(data6)
}

const data7List = ref([])
const Xdata7 = ref([
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
const data7Echarts = () => {
  Xdata7.value.forEach(item => {
    data7List.value.push({
      name: item,
      value: (Math.random() * 18000 + 9300).toFixed(2)
    })
  })
  const data7 = reactive({
    color: 'rgba(255,159,64)',
    name: '客单价',
    Xdata: Xdata7.value,
    dataList: data7List.value,
    isShow: true
  });
  option.data7 = setBar(data7)
}
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>市场获单情况</Title>
      <Content class="dpy-row wrap-data-pie">
        <div class="echart-data-box">
          <Echart :option="option.data1" class="echart-data"></Echart>
        </div>
        <div class="type-wrap">
          <div>￥{{ data1.value0 }}</div>
          <p>本月</p>
          <div>￥{{ data1.value1 }}</div>
          <p>环比</p>
          <div class="type-left">+￥{{ data1.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>广告投放情况</Title>
      <Content class="dpy-row wrap-data-pie">
        <div class="echart-data-box">
          <Echart :option="option.data2" class="echart-data"></Echart>
        </div>
        <div class="type-wrap">
          <div>￥{{ data2.value0 }}</div>
          <p>本月</p>
          <div>￥{{ data2.value1 }}</div>
          <p>环比</p>
          <div class="type-left">+￥{{ data2.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>市场开拓情况</Title>
      <Content class="dpy-row wrap-data-pie">
        <div class="echart-data-box">
          <Echart :option="option.data3" class="echart-data"></Echart>
        </div>
        <div class="type-wrap type-wrap-pie">
          <p>累计投入</p>
          <div>￥{{ data3.value0 }}</div>
          <p>已开拓</p>
          <div>{{ data3.value1 }}</div>
          <p>未开拓</p>
          <div>{{ data3.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>客户销量</Title>
      <div class="data4-warp">
        <span>单位：亿</span>
        <Echart :option="option.data4" class="echart-data"></Echart>
      </div>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>销售毛利率</Title>
      <Content>
        <div class="data5-warp">
          <span>单位：亿</span>
          <Echart :option="option.data5" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>销售结构</Title>
      <Content>
        <div class="data6-warp">
          <span>单位：亿</span>
          <Echart :option="option.data6" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>客单价</Title>
      <Content>
        <div class="data7-warp">
          <span>单位：亿</span>
          <Echart :option="option.data7" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 187fr 187fr 202fr 211fr;
  row-gap: 1.6%;
  top: 11.68% !important;
  height: 76.64% !important;

  .wrap-data-pie {
    padding: 1vh 0;
    box-sizing: border-box;
    justify-content: left;

    .echart-data-box {
      padding-right: 2vw;

      .echart-data {
        height: 7rem;
        width: 7rem;
      }
    }



    .type-wrap {
      position: absolute;
      top: 1vh;
      left: 45%;

      &>div {
        font-size: .8vw;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #CAE0FF;
      }

      &>p {
        font-size: .4rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #CAE0FF;
        opacity: 0.7;
        padding-top: .7vh;
      }

      .type-left {
        position: absolute;
        left: -.8vw;
      }
    }

    .type-wrap-pie {
      top: -2vh;

      &>div {
        font-size: .71vw;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #CAE0FF;
      }

      &>div:nth-of-type(2) {
        width: 70%;
      }
    }
  }

  .data4-warp {
    .echart-data {
      width: 100%;
      height: 15vh;
    }
  }
}

.z-right {
  display: grid;
  grid-template-rows: 240fr 259fr 300fr;
  row-gap: 1.6%;
  top: 11.68% !important;
  height: 76.64% !important;

  .data5-warp {
    .echart-data {
      width: 100%;
      height: 15vh;
    }
  }

  .data6-warp {
    .echart-data {
      width: 100%;
      height: 17vh;
    }
  }

  .data7-warp {
    .echart-data {
      width: 100%;
      height: 20vh;
    }
  }
}

span {
  font-size: .1vw;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #CAE0FF;
  opacity: 0.7;
  float: right;
  padding-right: 1vw;
}
</style>