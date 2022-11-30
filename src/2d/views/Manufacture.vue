<!-- 制造集团 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { setShuiQiuChart, setYuanChart } from "@/2d/viewCharts/Area";
import { setBar } from "@/2d/viewCharts/Business";
const store = useStore();
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
  data5: {},
});
const qyyhck = reactive({
  value1: "4965548547",
  value2: "49.65亿",
});

const qyyhdk = reactive({
  value1: "4965548547",
  value2: "49.65亿",
});

const data1 = reactive({
  name: "完成率",
  value: 62.9,
  value1: "12451254",
  value2: "0",
});

const data2 = reactive({
  name: "支出率",
  value: 62.9,
  value1: "12451254",
  value2: "0",
});

const data3 = reactive({
  name: "环比率",
  value: 58,
  value1: "3,400,111",
  value2: "3,400,111",
  value3: "3,400,111",
});

const data4 = reactive({
  name: "环比率",
  value: 58,
  value1: "3,400,111",
  value2: "3,400,111",
  value3: "3,400,111",
});

const data6List = ref([]);
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
]);
Xdata6.value.forEach((item) => {
  data6List.value.push({
    name: item,
    value: (Math.random() * 3000 + 1000).toFixed(2),
  });
});

const data5 = reactive({
  color: "rgba(255,159,64)",
  name: "企业库存情况",
  Xdata: Xdata6.value,
  dataList: data6List.value,
  isShow: true,
});
option.data5 = setBar(data5);

const ckrj = ref([
  { name: "总占用量", value: 267001, unit: "㎡" },
  { name: "总空闲量", value: 267001, unit: "㎡" },
  { name: "总空闲率", value: 267001 + "%", unit: "" },
]);

onMounted(() => {
  option.data1 = setShuiQiuChart(data1);
  option.data2 = setShuiQiuChart(data2);
  option.data3 = setYuanChart(data3, { color: 2 });
  option.data4 = setYuanChart(data4, { color: 3 });
});
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>企业银行存款</Title>
      <Content class="qyyhck">
        <p class="qyyhck-info">
          <span class="hui">单位：元</span>
          <span class="hui">详细金额：{{ qyyhck.value1 }}元</span>
        </p>
        <div class="qyyhck-value">
          <span
            :class="[item.includes('.') ? 'fg' :'money-bg']"
            v-for="(item,i) in qyyhck.value2"
            :key="i"
          >
            {{item}}
          </span>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业银行贷款</Title>
      <Content class="qyyhck">
        <p class="qyyhck-info">
          <span class="hui">单位：元</span>
          <span class="hui">详细金额：{{ qyyhck.value1 }}元</span>
        </p>
        <div class="qyyhck-value">
          <span
            :class="[item.includes('.') ? 'fg' :'money-bg1']"
            v-for="(item,i) in qyyhdk.value2"
            :key="i"
          >
            {{item}}
          </span>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>年度收入指标</Title>
      <Content class="nd-main">
        <div class="nd-chart">
          <Echart :option="option.data1"></Echart>
        </div>
        <div class="nd-info">
          <p class="bg-hui"><span class="hui">指标</span><span>￥{{data1.value1}}</span></p>
          <p class="bg-hui"><span class="hui">已完成</span><span>￥{{data1.value2}}</span></p>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>年度采购预算</Title>
      <Content class="nd-main">
        <div class="nd-chart">
          <Echart :option="option.data2"></Echart>
        </div>
        <div class="nd-info">
          <p class="bg-hui"><span class="hui">预算</span><span>￥{{data2.value1}}</span></p>
          <p class="bg-hui"><span class="hui">已支出</span><span>￥{{data2.value2}}</span></p>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业营业收入</Title>
      <Content class="qy-main">
        <div class="wlcbzc-cahrt">
          <Echart :option="option.data3"></Echart>
        </div>
        <div class="wlcbzc-info">
          <p class="zise val1">￥{{data3.value1}}</p>
          <p><span class="name1">本月</span><span class="val1">￥{{data3.value2}}</span></p>
          <p><span class="name1">环比</span><span class="val1">￥{{data3.value3}}</span></p>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业成本支出</Title>
      <Content class="qy-main">
        <div class="wlcbzc-cahrt">
          <Echart :option="option.data4"></Echart>
        </div>
        <div class="wlcbzc-info">
          <p class="lvse val1">￥{{data4.value1}}</p>
          <p><span class="name1">本月</span><span class="val1">￥{{data4.value2}}</span></p>
          <p><span class="name1">环比</span><span class="val1">￥{{data4.value3}}</span></p>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业仓库容积</Title>
      <Content class="ckrj-main">
        <div
          class="ct1-1"
          v-for="(item,i) in ckrj"
          :key="i"
        >
          <p class="big-val">{{item.value}}</p>
          <p class="hui">{{item.unit}}</p>
          <p class="hui-s">{{item.name}}</p>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业库存情况</Title>
      <Content>
        <Echart :option="option.data5"></Echart>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 205fr 212fr 253fr 253fr;
  row-gap: 1.6%;
  .qyyhck {
    padding: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .qyyhck-info {
      height: 30%;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .qyyhck-value {
      height: 65%;
      margin-top: 2%;
      width: 100%;
      display: flex;
      justify-content: center;
      span {
        margin: 0 0.5rem;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.9vw;
      }
      .fg {
        flex: 0.1;
        margin: 0;
      }
      .money-bg {
        // contain
        background: url("@/2d/assets/icons/ico-comsive-0.png") no-repeat center
          center/ 100% 100%;
      }
      .money-bg1 {
        // contain
        background: url("@/2d/assets/icons/ico-comsive-14.png") no-repeat center
          center/ 100% 100%;
      }
    }
  }

  .nd-main {
    display: flex;
    padding: 5% 5% 5% 0;
    justify-content: space-between;
    align-items: center;
    .nd-chart {
      width: 40%;
      height: 100%;
    }
    .nd-info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
      margin-left: 5%;
      p {
        height: 19%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4%;
        margin: 1rem 0;
      }
    }
  }
}
.z-right {
  display: grid;
  grid-template-rows: 223.1fr 225.1fr 218.1fr 257fr;
  row-gap: 1.6%;
  .qy-main {
    padding: 5% 0;
    display: flex;
    align-items: center;
    .wlcbzc-cahrt {
      width: 50%;
      height: 100%;
    }
    .wlcbzc-info {
      width: 50%;
      height: 100%;
      padding-left: 5%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        display: flex;
        flex-direction: column;
        &,
        * {
          color: rgba(202, 224, 255);
        }
      }
    }
  }

  .ckrj-main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    // padding: 9.3% 0;
    padding: 5% 0;
    column-gap: 6.5%;
    .ct1-1 {
      background: url("@/2d/assets/images/kuang-lvbiao.png") no-repeat center
        center / 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 0 13%;
      p:nth-child(1) {
        width: 100%;
        height: 35%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      p:nth-child(2) {
        width: 100%;
        text-align: center;
      }
      p:nth-child(3) {
        width: 100%;
        height: 40%;
        text-align: center;
      }
    }
  }
}
</style>