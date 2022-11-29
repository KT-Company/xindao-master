<!-- 财务部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  setPiePercentage, setLineFinancial, setBar, setBarAcross
} from "@/2d/viewCharts/Business";
const store = useStore();
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
  data5: {},
});
onMounted(() => {
  data1Echarts()
  data2Echarts()
  data3Echarts()
  data4Echarts()
  data5Echarts()
})
const data1 = reactive({
  color: ["rgb(124,95,174)", "rgba(124,95,174,.5)"],
  data: [58],
  perCentum: '+58%',
  titleData: '环比率',
  value0: "3,400,111",
  value1: "3,400,111",
  value2: "3,400,111",
});
const data1Echarts = () => {
  option.data1 = setPiePercentage(data1)
}
const data2 = reactive({
  color: ["rgb(78,186,146)", "rgba(78,186,146,.5)"],
  data: [58],
  perCentum: '+58%',
  titleData: '环比率',
  value0: "0",
  value1: "0",
  value2: "0",
});
const data2Echarts = () => {
  option.data2 = setPiePercentage(data2)
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
      value: (Math.random() * 1).toFixed(2)
    })
  })
  const data3 = reactive({
    color: '#7D60B0',
    name: '资产负债率',
    Xdata: Xdata3.value,
    dataList: data3List.value,
    isShow: false
  });
  option.data3 = setLineFinancial(data3)
}


const data4List = ref([])
const Xdata4 = ref([])
const data4Echarts = () => {
  for (let i = 1; i < 13; i++) {
    Xdata4.value.push(i + '月')
  }
  Xdata4.value.forEach(item => {
    data4List.value.push({
      name: item,
      value: (Math.random() * 100).toFixed(2)
    })
  })
  const data4 = reactive({
    color: '#FF9F40',
    name: '资产负债率',
    Xdata: Xdata4.value,
    dataList: data4List.value,
    isShow: true
  });
  option.data4 = setLineFinancial(data4)
}

const data5List = ref([])
const Xdata5 = ref([])
const data5Echarts = () => {
  for (let i = 1; i < 13; i++) {
    Xdata5.value.push(i + '月')
  }
  Xdata5.value.forEach(item => {
    data5List.value.push({
      name: item,
      value: (Math.random() * 100).toFixed(2)
    })
  })
  const data5 = reactive({
    color: '#4EBA92',
    name: '销售毛利率',
    Xdata: Xdata5.value,
    dataList: data5List.value,
    isShow: true
  });
  option.data5 = setLineFinancial(data5)
} 
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>企业营业收入</Title>
      <Content class="dpy-row wrap-data-pie">
        <div class="echart-data-box">
          <Echart :option="option.data1" class="echart-data"></Echart>
        </div>
        <div class="type-wrap">
          <div class="purple">￥{{ data1.value0 }}</div>
          <p>本月</p>
          <div>￥{{ data1.value1 }}</div>
          <p>环比</p>
          <div class="type-left">￥{{ data1.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业成本支出</Title>
      <Content class="dpy-row wrap-data-pie">
        <div class="echart-data-box">
          <Echart :option="option.data2" class="echart-data"></Echart>
        </div>
        <div class="type-wrap">
          <div class="green">￥{{ data2.value0 }}</div>
          <p>本月</p>
          <div>￥{{ data2.value1 }}</div>
          <p>环比</p>
          <div class="type-left">￥{{ data2.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>总资产增长率</Title>
      <Content>
        <div class="data3-warp">
          <Echart :option="option.data3" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>资产负债率</Title>
      <Content>
        <div class="data4-warp">
          <Echart :option="option.data4" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>销售毛利率</Title>
      <Content>
        <div class="data5-warp">
          <Echart :option="option.data5" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 231fr 233fr 244fr;
  row-gap: 2%;
  height: 68.44% !important;

  .wrap-data-pie {
    padding: 1vh 0;
    box-sizing: border-box;
    justify-content: left;

    .echart-data-box {
      padding-right: 2vw;

      .echart-data {
        height: 9rem;
        width: 9rem;
      }
    }

    .type-wrap {
      position: relative;
      top: -1vh;

      &>div {
        font-size: 1vw;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #CAE0FF;
      }

      .purple {
        color: #7D60B0 !important;
      }

      .green {
        color: #4EBA92;
      }

      &>p {
        font-size: .5rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #CAE0FF;
        opacity: 0.7;
        padding-top: 1.3vh;
      }
    }
  }

  .data3-warp {
    .echart-data {
      width: 100%;
      height: 20vh;
    }


  }
}

.z-right {
  display: grid;
  grid-template-rows: 362fr 362fr;
  row-gap: 2%;
  height: 68.44% !important;

  .data4-warp {
    .echart-data {
      width: 100%;
      height: 29vh;
    }
  }

  .data5-warp {
    .echart-data {
      width: 100%;
      height: 29vh;
    }
  }

}
</style>