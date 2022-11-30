<!-- 业务部 -->
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
  data8: {},
  data9: {},
});
const data7Id = ref(0)
const data1 = reactive({
  color: ["rgb(252,110,1)", "rgba(252,110,1,.5)"],
  data: [70],
  perCentum: '+70%',
  titleData: '环比率',
  value0: "22,696,684.59",
  value1: "22,696,684.59",
  value2: "22,696,684.59",
});

const data3List = ref([])
const Xdata3 = ref([])
for (let i = 1; i < 13; i++) {
  Xdata3.value.push(i + '月')
}
Xdata3.value.forEach(item => {
  data3List.value.push({
    name: 'item',
    value: (Math.random() * 5000 + 2000).toFixed(2)
  })
})
const data3 = reactive({
  color: '#FF9F40',
  name: '物流费用',
  Xdata: Xdata3.value,
  dataList: data3List.value,
  isShow: false
});

const data6List = ref([])
const Xdata6 = ref([])
for (let i = 1; i < 13; i++) {
  Xdata6.value.push(i + '月')
}
Xdata6.value.forEach(item => {
  data6List.value.push({
    name: 'item',
    value: (Math.random() * 1).toFixed(2)
  })
})
const data6 = reactive({
  color: '#FF9F40',
  name: '存货周转率',
  Xdata: Xdata6.value,
  dataList: data6List.value,
  isShow: false
});

onMounted(() => {
  option.data1 = setPiePercentage(data1)
  option.data3 = setLine(data3)
  option.data6 = setLine(data6)
  data2Echarts()
  data4Echarts()
  data5Echarts()
  data7Echarts()
  data8Echarts()
  data9Echarts()
})
const labelData = ref([
  "1、丰弘创新科技销售有限公司",
  "2、晶弘贸易有限公司",
  "3、金德商贸有限公司",
  "4、新宇创新科技销售有限公司",
  "5、捷凯创新科技(集团)有限公司",
])
const valueData = ref([
  2500, 1688, 16, 14, 10
])
const data2Echarts = () => {
  labelData
  const data2 = reactive({
    color: '#5C73E6',
    name: '供应商排名',
    labelData: labelData.value,
    valueData: valueData.value,
  });
  option.data2 = setBarAcross(data2)
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
const data5 = reactive({
  color: ["rgb(91,114,227)", "rgba(91,114,227,.5)"],
  data: [70],
  perCentum: '+70%',
  titleData: '总空闲率',
  value0: "267,001",
  value1: "52,999",
});
const data5Echarts = () => {
  option.data5 = setPiePercentage(data5)
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
      value: (Math.random() * 3000 + 1000).toFixed(2)
    })
  })
  const data7 = reactive({
    color: '#5C73E6',
    name: '销售结构',
    Xdata: Xdata7.value,
    dataList: data7List.value,
    isShow: true
  });
  option.data7 = setBar(data7)
}
const data9List = ref([])
const Xdata9 = ref([
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
const data9Echarts = () => {
  Xdata9.value.forEach(item => {
    data9List.value.push({
      name: item,
      value: (Math.random() * 3000 + 1000).toFixed(2)
    })
  })
  const data9 = reactive({
    color: '#5C73E6',
    name: '销售结构',
    Xdata: Xdata9.value,
    dataList: data9List.value,
    isShow: true
  });
  option.data9 = setBar(data9)
}

const data8List = ref([])
const Xdata8 = ref([
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
const data8Echarts = () => {
  Xdata8.value.forEach(item => {
    data8List.value.push({
      name: item,
      value: (Math.random() * 18000 + 9300).toFixed(2)
    })
  })
  const data8 = reactive({
    color: 'rgba(255,159,64)',
    name: '企业库存情况',
    Xdata: Xdata8.value,
    dataList: data8List.value,
    isShow: true
  });
  option.data8 = setBar(data8)
}
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>采购支出</Title>
      <Content class="dpy-row wrap-data1">
        <div class="echart-data1-box">
          <Echart :option="option.data1" class="echart-data1"></Echart>
        </div>
        <div class="type-wrap">
          <div>￥{{ data1.value0 }}</div>
          <p>本月</p>
          <div>￥{{ data1.value1 }}</div>
          <p>环比</p>
          <div>+￥{{ data1.value2 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>供应商排名</Title>
      <Content>
        <div class="data2-warp">
          <Echart :option="option.data2" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>物流费用</Title>
      <Content>
        <div class="data3-warp">
          <span>单位：亿</span>
          <Echart :option="option.data3" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>客户销量</Title>
      <Content>
        <div class="data4-warp">
          <span>单位：亿</span>
          <Echart :option="option.data4" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业仓库容积</Title>
      <Content class="dpy-row wrap-data5">
        <div class="echart-data5-box">
          <Echart :option="option.data5" class="echart-data"></Echart>
        </div>
        <div class="type-wrap">
          <p>总占用量</p>
          <div>{{ data5.value0 }}</div>
          <p>总空闲量</p>
          <div>{{ data5.value1 }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>存货周转率</Title>
      <Content>
        <div class="data6-warp">
          <span>单位：亿</span>
          <Echart :option="option.data6" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <!-- <Title>销售结构/客单价</Title> -->
      <div class="data7-title dpy-row">
        <p :class="data7Id == 0 ? '' : 'active'" @click="data7Id = 0">销售结构</p>/<p :class="data7Id == 0 ? 'active' : ''"
          @click="data7Id = 1">客单价</p>
      </div>
      <Content>
        <div class="data7-warp" v-if="data7Id == 0">
          <span>单位：亿</span>
          <Echart :option="option.data7" class="echart-data"></Echart>
        </div>
        <div class="data7-warp" v-else>
          <span>单位：亿</span>
          <Echart :option="option.data9" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业库存情况</Title>
      <Content>
        <div class="data8-warp">
          <span>单位：亿</span>
          <Echart :option="option.data8" class="echart-data"></Echart>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 201fr 222fr 196fr 295fr;
  row-gap: 2%;

  .wrap-data1 {
    padding: 1vh 0;
    box-sizing: border-box;
    justify-content: left;

    .echart-data1-box {
      padding-right: 2vw;

      .echart-data1 {
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

      &>p {
        font-size: .5rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #CAE0FF;
        opacity: 0.7;
        padding-top: .7vh;
      }

      &>div:nth-of-type(3) {
        position: absolute;
        left: -.8vw;
      }
    }
  }

  .data2-warp {
    .echart-data {
      width: 100%;
      height: 14vh;
    }


  }

  .data3-warp {
    .echart-data {
      width: 100%;
      height: 11vh;
    }


  }

  .data4-warp {
    .echart-data {
      width: 100%;
      height: 20vh;
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


}

.z-right {
  display: grid;
  grid-template-rows: 201.3fr 196fr 259fr 259fr;
  row-gap: 2%;

  .wrap-data5 {
    padding: 1vh 0;
    box-sizing: border-box;
    justify-content: left;

    .echart-data5-box {
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

      &>p {
        font-size: .5rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #CAE0FF;
        opacity: 0.7;
        padding-top: .7vh;
      }
    }
  }

  .data6-warp {
    .echart-data {
      width: 100%;
      height: 11vh;
    }


  }

  .data7-title {
    justify-content: flex-start;
    font-size: var(--titleSize);
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    height: 2rem;

    p {
      cursor: pointer;
      font-size: var(--titleSize);
    }

    .active {
      color: #FFFFFF;
      opacity: 0.5;
    }
  }

  .data7-warp {
    .echart-data {
      width: 100%;
      height: 15vh;
    }


  }

  .data8-warp {
    .echart-data {
      width: 100%;
      height: 15vh;
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
}
</style>