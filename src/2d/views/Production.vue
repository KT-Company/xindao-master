<!-- 生产部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { setZhuChart, setBingChart4 } from "@/2d/viewCharts/Area";
import { setZhexiantu } from "@/2d/viewCharts/Environmental";
import { setJinduChart } from "@/2d/viewCharts/Production";
import useData from "@/2d/hooks/useData";
const base = useData.data7('制造集团')
const base1 = useData.data8('制造集团')
console.log('base: ', base);
const store = useStore();
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
});

const data1 = reactive({
  xData: ["X4mini", "X4SE", "X4PRO"],
  data: [
    { name: "已完工", value: [1, 2, 3] },
    { name: "生产中", value: [1, 2, 3] },
    { name: "待生产", value: [1, 2, 3] },
  ],
});

const data2 = reactive({
  xData: base1.map(item=>item.month),
  data: [
    { name: "实际产量", value: base1.map(item=>item.qyclzs02) },
    { name: "计划产量", value: [1, 2, 3, 6, 5, 6, 7, 8, 9, 2, 11, 12] },
  ],
});

const data3 = reactive({
  name: "设备状态",
  data: [
    { name: "完工", color: "92,115,230", value: 20 },
    { name: "生产中", color: "255,159,64", value: 30 },
    { name: "空闲", color: "72,192,151", value: 50 },
  ],
});

const grpgqk = ref([
  { name: "初级工人", value: 2, target: 12,zhanbi:2 },
  { name: "中级工人", value: 2, target: 12,zhanbi:2 },
  { name: "高级工人", value: 2, target: 12,zhanbi:2 },
]);

option.data1 = setZhuChart(data1, {
  barW: "10%",
  color: [0, 3, 1],
  legend: true,
  unit: "亿元",
  grid: {
    top: "20%",
  },
});

option.data2 = setZhexiantu(data2);
option.data3 = setBingChart4(data3);
grpgqk.value[0].option = setJinduChart(grpgqk.value[0].zhanbi);
grpgqk.value[1].option = setJinduChart(grpgqk.value[1].zhanbi);
grpgqk.value[2].option = setJinduChart(grpgqk.value[2].zhanbi);
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>工人派工情况</Title>
      <Content class="grpgqk-main">
        <div
          class="bg-hui1 grpgqk-list"
          v-for="(item,i) in grpgqk"
          :key="i"
        >
          <div class="grpgqk1">
            <p class="hui grpgqk-a">{{item.name}}</p>
            <p class="grpgqk-cahrt">
              <Echart :option="item.option"></Echart>
            </p>
          </div>
          <div class="grpgqk2">
            <p class="grpgqk-a"></p>
            <p><span class="zi">{{item.value}}</span>/<span>{{item.target}}</span></p>
          </div>
          <div class="grpgqk3">
            <p class="hui grpgqk-a">空闲率</p>
            <p class="zi">{{item.zhanbi}}%</p>
          </div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>生产进度</Title>
      <Content class="scjd">
        <div class="scjdchart">
          <Echart :option="option.data1"></Echart>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>设备状态</Title>
      <Content class="sbzt-main">
        <div class="sbzt-chart">
          <Echart :option="option.data3"></Echart>
        </div>
        <ul class="sbzt-info">
          <li
            class="bg-hui"
            v-for="(item,i) in data3.data"
            :key="i"
          >
            <span class="sbzt-name hui">{{item.name}}</span>
            <span class="sbzt-val">{{item.value}}</span>
          </li>
        </ul>
      </Content>
    </Bar>
    <Bar>
      <Title>产量走势</Title>
      <Content>
        <div class="scjdchart">
          <Echart :option="option.data2"></Echart>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  display: grid;
  grid-template-rows: 415fr 277fr;
  row-gap: 1.9%;
  top: 17.335% !important;
  height: 65.4% !important;
}

.scjdchart {
  height: 90%;
  margin-top: 3%;
}

.sbzt-main {
  .sbzt-chart {
    height: 70%;
  }
  .sbzt-info {
    padding: 5% 0;
    height: 28.6%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2%;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .sbzt-name {
        position: relative;
        &:nth-child(1)::before {
          content: "";
          top: 50%;
          transform: translate(-200%, -50%);
          left: 0;
          height: 0.4rem;
          width: 0.4rem;
          background: rgba(92, 115, 230);
          position: absolute;
        }
      }
      &:nth-child(2) .sbzt-name::before {
        background: rgba(255, 159, 64);
      }
      &:nth-child(3) .sbzt-name::before {
        background: rgba(72, 192, 151);
      }
    }
  }
}

.grpgqk-main {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: 6%;
  padding: 6% 0;
  .grpgqk-list {
    display: grid;
    grid-template-columns: 4.5fr 1fr 1.2fr;
    // column-gap: 2%;
    padding: 0 4%;
    align-items: center;
    .grpgqk1,
    .grpgqk2,
    .grpgqk3 {
      display: flex;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      p:nth-of-type(1) {
        height: 50%;
        display: flex;
        align-items: flex-end;
        padding: 0.25rem 0;
      }
      p:nth-of-type(2) {
        height: 50%;
        padding: 0.25rem 0;
      }
    }

    .grpgqk-cahrt{
      padding-top: .4rem !important;
    }
    .grpgqk2 {
      padding-left: 10%;
    }

    .grpgqk3 {
      align-items: flex-end;
      justify-content: end;
    }
  }
}
</style>