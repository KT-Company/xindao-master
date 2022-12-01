<!-- 物流公司 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import useData from "@/2d//hooks/useData";
import {
  setYuanChart,
  setQuXianChart,
  setShuiQiuChart,
} from "@/2d/viewCharts/Area";
import { toThreeDigitRating } from "@/2d/utils/num";
const store = useStore();
const base = useData.data2("物流企业");
const base3 = useData.data3("物流企业");
const base4 = useData.data4("物流企业");
const base1 = useData.data1("物流企业");
const qyyhck = reactive({
  value1: base1?.qyyhckxj || 0,
  value2: `${base1?.qyyhckxj02 || 0}亿`,
});

const option = reactive({
  data1: {},
  data2: {},
  data3: {},
});

const data1 = reactive({
  name: "环比率",
  value: base.wlcbzc04,
  value1: toThreeDigitRating(base.wlcbzc01),
  value2: toThreeDigitRating(base.wlcbzc02),
  value3: toThreeDigitRating(base.wlcbzc03),
});

const data2 = reactive({
  name: "环比率",
  value: base.wlddqk04,
  value1: base.wlddqk01,
  value2: base.wlddqk03,
  value3: base.wlddqk02,
});

const data3 = reactive({
  xData: base4.map((item) => item.month),
  data: [{ name: "货主下单趋势", value: base4.map((item) => item.wlhzxdqs02) }],
});

const hzxdph = ref(
  base3.map((item) => {
    return { name: item.wlhzxd01, value: item.wlhzxd02 };
  })
);

const clqk = reactive({
  data1: [
    { name: "运行中", value: base.wlclqk01, unit: "辆" },
    { name: "空闲中", value: base.wlclqk02, unit: "辆" },
    { name: "总空闲率", value: base.wlclqk03 + "%", unit: "" },
  ],
  data2: [
    { name: "中型货车空闲率", value: base.wlclqk04 + "%" },
    { name: "大型货车空闲率", value: base.wlclqk05 + "%" },
  ],
});

onMounted(() => {
  option.data1 = setYuanChart(data1, { color: 2, title: 1 });
  option.data2 = setShuiQiuChart(data2);

  option.data3 = setQuXianChart(data3, {
    color: [1],
    interval: 0,
  });
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
      <Title>物流成本支出</Title>
      <Content class="wlcbzc-main">
        <div class="wlcbzc-cahrt">
          <Echart :option="option.data1"></Echart>
        </div>
        <div class="wlcbzc-info">
          <p class="zise val1">￥{{data1.value1}}</p>
          <p><span class="name1">本月</span><span class="val1">￥{{data1.value2}}</span></p>
          <p><span class="name1">环比</span><span class="val1">￥{{data1.value3}}</span></p>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>货主下单排行</Title>
      <Content class="hzxdph-main">
        <div
          class="hzxdph-item"
          v-for="(item,i) in hzxdph"
          :key="i"
        >
          <p><span class="hui-s">{{item.name}}</span><span>￥{{item.value}}</span></p>
          <img src="@/2d/assets/images/jianbian-huang.png">
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>车辆情况</Title>
      <Content class="clqk-main">
        <div class="clqk-list">
          <div
            class="clqk-item"
            v-for="(item,i) in clqk.data1"
            :key="i"
          >
            <p class="val1">{{item.value}}</p>
            <p class="hui">{{item.unit}}</p>
            <p class="hui-s">{{item.name}}</p>
          </div>
        </div>
        <div class="clqk-info">
          <div
            class="bg-hui"
            v-for="(item,i) in clqk.data2"
            :key="i"
          >
            <span class="hui">{{item.name}}</span>
            <span>{{item.value}}</span>
          </div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>订单情况</Title>
      <Content class="ddqk-main">
        <div class="ddqk-chart">
          <Echart :option="option.data2"></Echart>
        </div>
        <div class="ddqk-info">
          <p class="valb">￥{{data2.value1}}</p>
          <p class="bg-hui"><span class="hui">环比</span><span class="valb">￥{{data2.value2}}</span></p>
          <p class="bg-hui"><span class="hui">本月</span><span class="valb">￥{{data2.value3}}</span></p>
        </div>

      </Content>
    </Bar>
    <Bar>
      <Title>货主下单趋势</Title>
      <Content class="hzxdqs-main">
        <Echart :option="option.data3"></Echart>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 197fr 271fr 470fr;
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
        max-width: var(--valbgSize);
        // contain
        background: url("@/2d/assets/icons/ico-comsive-0.png") no-repeat center
          center/ 100% 100%;
      }
    }
  }

  .wlcbzc-main {
    padding: 8% 0;
    display: flex;
    align-items: center;
    .wlcbzc-cahrt {
      width: 50%;
      height: 90%;
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

  .hzxdph-main {
    padding: 5% 0;
    overflow: auto;
    .hzxdph-item {
      height: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 10px;
      img {
        width: 100%;
        margin-top: 0.5rem;
      }
      p {
        display: flex;
        justify-content: space-between;
        & span:nth-child(2) {
          font-weight: bold;
        }
      }
    }
  }
}
.z-right {
  display: grid;
  grid-template-rows: 369fr 243fr 326fr;
  row-gap: 1.6%;
  .clqk-main {
    padding: 5% 0;
    .clqk-list {
      height: 42%;
      margin-top: 4%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 7%;
      div {
        background: url("@/2d/assets/images/kuang-lvbiao.png") no-repeat center
          center / 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        p:nth-child(1) {
          height: 40%;
          display: flex;
          align-items: flex-end;
          font-weight: bold;
        }
        p:nth-child(2) {
          margin-top: 5%;
          height: 15%;
          font-size: 0.6vw;
        }
        p:nth-child(3) {
          height: 30%;
          display: flex;
          align-items: center;
        }
      }
    }
    .clqk-info {
      margin-top: 10%;
      height: 34%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div {
        height: 43%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4%;
      }
    }
  }

  .hzxdqs-main {
    padding-bottom: 5%;
  }

  .ddqk-main {
    display: flex;
    padding: 5% 0;
    .ddqk-chart {
      width: 40%;
    }
    .ddqk-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
      margin-left: 5%;
      p {
        height: 22%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 6%;
        &:nth-child(1) {
          padding: 0;
        }
      }
    }
  }
}
</style>