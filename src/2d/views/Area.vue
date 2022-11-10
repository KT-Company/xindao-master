<!-- 区域层 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import {
  setYuanChart,
  setZhuChart,
  setQuXianChart,
  setBingChart,
} from "@/2d/viewCharts/Area";
import { getqycyjj } from "@/2d/api";
import { useStore } from "vuex";
const store = useStore();
// 当前年
const baseA = reactive({
  data: {},
});
const baseListA = ref([]);
const zjz = {
  gy: { name: "工业增加值", value: [] },
  fw: { name: "服务增加值", value: [] },
};

// 去年
const baseB = reactive({
  data: {},
});
const baseListB = ref([]);

const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
  data5: {},
  data6: {},
  data7: {},
  data8: {},
});

const data2 = reactive({
  xData: [],
  data: [],
});
const data3 = reactive({
  xData: [],
  data: [
    {
      name: "消费价格指数",
      value: [],
    },
  ],
});
const data4 = reactive({
  xData: [],
  data: [
    {
      name: "区域纳税总额",
      value: [],
    },
  ],
});
const data5 = reactive({
  xData: [],
  data: [
    {
      name: "固定资产投入 ",
      value: [],
    },
  ],
});
const data6 = reactive({
  xData: [],
  data: [
    {
      name: "企业数量",
      value: [],
    },
  ],
});
const data7 = reactive({
  xData: [],
  data: [
    {
      name: "企业总资产",
      value: [],
    },
  ],
});
const data8 = ref([
  { name: "存货", value: 0 },
  { name: "货币资金", value: 0 },
  { name: "固定资产", value: 0 },
]);
const pickWho = ref(1);
const handleZJZ = (type) => {
  pickWho.value = type;
  if (type === 1) data2.data[0] = zjz.gy;
  else data2.data[0] = zjz.fw;

  option.data2 = setZhuChart(data2);
};

const heads = ref([
  { id: 1, name: "三圈关系", img: require("@/2d/assets/images/sanquan.png") },
  { id: 2, name: "物流", img: require("@/2d/assets/images/wuliu.png") },
  { id: 3, name: "信息流", img: require("@/2d/assets/images/xinxiliu.png") },
  { id: 4, name: "资金流", img: require("@/2d/assets/images/zijinliu.png") },
]);
// 三圈关系.... 点击事件
const handleHeads = (id) => {
  console.log("id: ", id);
};

onMounted(() => {
  getqycyjj().then((res) => {
    console.log("getqycyjj: ", res);
    const data = res.data.formInfoList;
    baseListA.value = data.filter((item) => item.year == store.state.year);
    baseListB.value = data.filter((item) => item.year == store.state.year - 1);
    baseA.data = baseListA.value.find((item) => item.qy == "海景区");
    baseB.data = baseListB.value.find((item) => item.qy == "海景区");
    const areaA = data.filter((item) => item.qy == "海景区");

    option.data1 = setYuanChart({ name: "GDP增速", value: baseA.data.gdpzs });

    data2.xData = areaA.map((item) => item.year);
    zjz.gy.value = areaA.map((item) => item.gyzjz);
    zjz.fw.value = areaA.map((item) => item.dscy);
    handleZJZ(pickWho.value);

    data3.xData = data2.xData;
    data3.data[0].value = areaA.map((item) => item.gxckye);
    option.data3 = setQuXianChart(data3);

    data4.xData = data2.xData;
    data4.data[0].value = areaA.map((item) => item.sssr);
    option.data4 = setQuXianChart(data4, { color: [1] });

    data5.xData = data2.xData;
    data5.data[0].value = areaA.map((item) => item.dycy);
    option.data5 = setZhuChart(data5);

    data6.xData = data2.xData;
    data6.data[0].value = areaA.map((item) => item.gjjgxjsqyzs);
    option.data6 = setZhuChart(data6);

    data7.xData = data2.xData;
    data7.data[0].value = areaA.map((item) => item.gxdkye);
    option.data7 = setQuXianChart(data7, { color: [1] });

    data8.value[0].value = baseA.data.zzssr
    data8.value[1].value = baseA.data.qysdssr
    data8.value[2].value = baseA.data.grsdssr
    option.data8 = setBingChart(data8.value);
  });
});
</script>

<template>
  <div class="area-head">
    <ul class="animated bounceInDown">
      <li v-for="item in heads" :key="item.id" @click="handleHeads(item.id)">
        <img :src="item.img" /><span>{{ item.name }}</span>
      </li>
    </ul>
  </div>

  <Left class="z-left">
    <Bar>
      <div class="b-title">区域GDP</div>
      <div class="b-content gdp">
        <div class="gdp-chart h-100">
          <Echart :option="option.data1"></Echart>
        </div>
        <div class="qy-gdp h-100">
          <p class="gdp-name">本年</p>
          <p class="gdp-val">
            ￥{{ baseA.data.gdpzz }} <span class="yi">亿元</span>
          </p>
          <p class="gdp-name">环比</p>
          <p class="gdp-val">
            +￥{{ baseB.data.gdpzz }} <span class="yi">亿元</span>
          </p>
        </div>
      </div>
    </Bar>

    <Bar>
      <div class="b-title">
        <span
          :class="['zjz-name', pickWho == 1 ? '' : 'hui']"
          @click="handleZJZ(1)"
          >工业增加值</span
        >
        /
        <span
          :class="['zjz-name', pickWho == 2 ? '' : 'hui']"
          @click="handleZJZ(2)"
          >服务增加值</span
        >
      </div>
      <div class="b-content">
        <span class="unit1 hui">单位：亿</span>
        <Echart :option="option.data2"></Echart>
      </div>
    </Bar>

    <Bar>
      <div class="b-title">消费价格指数</div>
      <div class="b-content"><Echart :option="option.data3"></Echart></div>
    </Bar>

    <Bar>
      <div class="b-title">区域纳税总额</div>
      <div class="b-content">
        <span class="unit1 hui">单位：亿</span>
        <Echart :option="option.data4"></Echart>
      </div>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <div class="b-title">固定资产投入</div>
      <div class="b-content">
        <span class="unit1 hui">单位：亿</span>
        <Echart :option="option.data5"></Echart>
      </div>
    </Bar>

    <Bar>
      <div class="c-title">企业数量</div>
      <div class="h28">
        <span class="unit1 hui">单位：家</span>
        <Echart :option="option.data6"></Echart>
      </div>
      <div class="c-title">企业总资产</div>
      <div class="h28">
        <span class="unit1 hui">单位：亿</span>
        <Echart :option="option.data7"></Echart>
      </div>
      <div class="c-title d-title">
        <span>区域资产结构</span
        ><span class="hui">当前：{{ store.state.year }}</span>
      </div>
      <div class="h26">
        <Echart :option="option.data8"></Echart>
      </div>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-columns: 4fr;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 2%;
}
.z-right {
  display: grid;
  grid-template-columns: 4fr;
  grid-template-rows: 1fr 3fr;
  row-gap: 2%;
}

.b-title {
  font-size: 1vw;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  height: 20%;
}

.c-title {
  font-size: 1vw;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  height: 6%;
}

.yi {
  font-size: 0.8vw;
}

.area-head {
  position: absolute;
  width: 25%;
  height: 4%;
  left: 50%;
  transform: translateX(-50%);
  top: 9%;
  ul {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
  }
  li {
    display: flex;
    padding: 0 3%;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 2vw;
    transition: 0.3s;
    &:hover {
      scale: 1.1;
      * {
        color: rgb(255, 166, 0);
      }
    }
    img {
      height: 50%;
      margin-right: 0.4vw;
    }
  }
}

.unit1 {
  position: absolute;
  right: 1%;
  top: -2%;
  font-size: 0.5vw;
}

.b-content {
  // border: 1px solid red;
  height: 80%;
  position: relative;
}
.gdp {
  display: flex;
  .gdp-chart {
    width: 40%;
  }

  .qy-gdp {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 4%;
    p {
      &,
      * {
        color: rgba(202, 224, 255);
      }

      &:nth-child(3) {
        margin-top: 5%;
      }
    }
    .gdp-name {
      font-size: 0.8vw;
    }
    .gdp-val {
      font-size: 1.1vw;
    }
  }
}

.zjz-name {
  cursor: pointer;
}
.h28 {
  position: relative;
  height: 28%;
  padding-bottom: 3%;
}
.h26 {
  position: relative;
  height: 26%;
}
.d-title {
  display: flex;
  justify-content: space-between;
  span:nth-child(2) {
    font-size: 0.8vw;
    font-weight: normal;
  }
}
</style>