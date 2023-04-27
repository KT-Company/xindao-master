<!-- 能源碳排放 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getnyzxhm, getnytpfy, getqynytpfy } from "@/2d/api";
import { useYear } from "@/2d/hooks/useTime";
import { useStore } from "vuex";
import { setZhuChart, setBingChart3,setLineChart } from "@/2d/viewCharts/Area";
const store = useStore();
const base = reactive({
  data: {},
});
const baseList = ref([]);
const quanguoTan = ref([]);
const quanguoArea = ref([]);

const fireChart = reactive({
  xData: [],
  data: [
    { name: store.state.year - 1, value: [] },
    { name: store.state.year, value: [] },
  ],
});

const benshi = reactive({
  xData: [],
  data: [
    { name: `本市人均/碳排放量`, value: [] },
    { name: `本市碳排/放总量`, value: [] },
  ],
});

const quanguo = reactive({
  xData: [],
  data: [
    { name: "全国人均/碳排放量", value: [] },
    { name: "全国碳排/放总量", value: [] },
  ],
});

const option = reactive({
  data1: {},
  data2: {},
  data3: {},
  data4: {},
});

const data4 = reactive({
  data: [],
});


onMounted(() => {
  getnytpfy().then((res) => {
    const data = res.data.formInfoList;
    // 寻找某个省份某年的数据
    base.data = data.find(
      (item) => item.year == store.state.year && item.szxs == store.state.szxs
    );
    // 寻找某个省份近几年的数据
    baseList.value = data
      .filter((item) => item.szxs == store.state.szxs)
      .filter((item) => useYear(item, 10));
    quanguoTan.value = data.filter((item) => item.year == store.state.year);

    const colors = [
      "84,116,234",
      "255,159,64",
      "72,192,151",
      "227,227,232",
    ];
    const qita = [
      "山东",
      "内蒙古",
      "山西",
      "辽宁",
      "河南",
      "新疆",
      "湖北",
      "四川",
    ];
    const changsanjiao = ["江苏", "安徽", "浙江", "上海"];
    const jingjinji = [
      "河北",
      "天津",
      "北京",
    ];
    const gangzhuao = ["广东"];
    data4.data = quanguoTan.value.map((item) => {
      let index = 0;
      if (qita.includes(item.szxs)) index = 0;
      if (changsanjiao.includes(item.szxs)) index = 1;
      if (jingjinji.includes(item.szxs)) index = 2;
      if (gangzhuao.includes(item.szxs)) index = 3;
      return {
        name: item.szxs,
        value: item.pflzlzqgb,
        color: colors[index],
        index,
      };
    });
    option.data4 = setBingChart3(data4);
    // pflzlzqgb

    quanguo.xData = baseList.value.map((item) => item.year);
    benshi.xData = quanguo.xData;
    quanguo.data[0].value = baseList.value.map((item) => item.qgrjtpfl);
    quanguo.data[1].value = baseList.value.map((item) => item.qgtpfzl);

    benshi.data[0].value = baseList.value.map((item) => item.rjtpfl);
    benshi.data[1].value = baseList.value.map((item) => item.pflzl);
    option.data2 = setLineChart(quanguo, {
      unit: ["吨", "百万吨"],
      legend: 1,
    });
    option.data3 = setLineChart(benshi, {
      color: [2, 3],
      unit: ["吨", "百万吨"],
      legend: 1,
    });
  });

  getnyzxhm().then((res) => {
    const data = res.data.formInfoList;
    fireChart.data[0].value = data
      .filter((item) => item.year == store.state.year - 1)
      .map((item) => item.hlfdzlm);
    fireChart.data[1].value = data
      .filter((item) => item.year == store.state.year)
      .map((item) => item.hlfdzlm);
    fireChart.xData = data
      .filter((item) => item.year == store.state.year)
      .map((item) => "1-" + item.month + "月");
    option.data1 = setZhuChart(fireChart, {
      color: [0, 2],
      legend: true,
      legendType: 2,
      barW: "25%",
      unit: "单位：亿千瓦小时",
      interval: 0,
    });
  });

  getqynytpfy().then((res) => {
    quanguoArea.value = res.data.formInfoList;
  });
});
</script>

<template>
  <Left class="z-left">
    <Bar>
      <div class="b-title">能源总消耗</div>
      <div class="b-content nyzh-c">
        <div class="nyzh-info">
          <div class="bg-hui info-b1">
            <span class="hui">煤炭总用量</span>
            <p><span class="big-val">{{base.data.mtzyly}}</span><span class="hui">万吨</span></p>
          </div>
          <div class="bg-hui info-b1">
            <span class="hui">火力发电量</span>
            <p><span class="big-val">{{base.data.hlfdzly}}</span><span class="hui">亿千瓦小时</span></p>
          </div>
        </div>
        <div class="nyzh-chart">
          <Echart :option="option.data1"></Echart>
        </div>

      </div>
    </Bar>

    <Bar>
      <div class="b-title">新能源</div>
      <ul class="b-content xny-c">
        <li class="xny-bar">
          <div class="ydl">
            <p class="big-val">{{ base.data.ydl }}</p>
            <p class="hui">亿千瓦时</p>
          </div>
          <div class="hui-s">用电量</div>
        </li>
        <li class="xny-bar">
          <div class="trq">
            <p class="big-val">{{ base.data.trqxfl }}</p>
            <p class="hui">亿立方米</p>
          </div>
          <div class="hui-s">天然气消费量</div>
        </li>
        <li class="xny-bar">
          <div class="yhsy">
            <p class="big-val">{{ base.data.yhsyqgyzl }}</p>
            <p class="hui">万吨</p>
          </div>
          <div class="hui-s">液化石油气供应总量</div>
        </li>
      </ul>
    </Bar>

    <Bar>
      <div class="b-title">其他资源</div>
      <ul class="b-content qtzy-c">
        <li>
          <div class="qtzy-info qtzy-info1">
            <p class="big-val">{{ base.data.jsydgyzl }}</p>
            <p class="hui">公顷</p>
          </div>
          <div class="hui-s">建设用地供应总量</div>
        </li>
        <li>
          <div class="qtzy-info qtzy-info2">
            <p class="big-val">{{ base.data.szyzl }}</p>
            <p class="hui">亿立方米</p>
          </div>
          <div class="hui-s">水资源总量</div>
        </li>
      </ul>
    </Bar>

  </Left>
  <Right class="z-right">
    <Bar>
      <div class="b-title">全国碳排放</div>
      <ul class="b-content qgtpf-c">
        <li class="qgtpf-info">
          <div class="bg-hui">
            <p class="hui">占全国碳排放总量的</p>
            <p><span class="big-val">{{base.data.pflzlzqgb}}</span><span class="hui">%</span></p>
          </div>
          <div class="bg-hui">
            <p class="hui">人均碳排放量</p>
            <p><span class="big-val">{{base.data.rjtpfl}}</span><span class="hui">吨</span></p>
          </div>
        </li>
        <li class="qgtpf-chart">
          <Echart :option="option.data4"></Echart>
        </li>
        <li class="qgtpf-legend">
          <div class="bg-hui">
            <span class="legend-item">其他部分省份</span>
            <span class="hui">其他部分省份</span>
          </div>
          <div class="bg-hui">
            <span class="legend-item">长三角</span>
            <span class="hui">长三角</span>
          </div>
          <div class="bg-hui">
            <span class="legend-item">京津翼</span>
            <span class="hui">京津翼</span>
          </div>
          <div class="bg-hui">
            <span class="legend-item">粤港澳</span>
            <span class="hui">粤港澳</span>
          </div>
        </li>
        <li>
          <Echart :option="option.data2"></Echart>
        </li>
        <li>
          <Echart :option="option.data3"></Echart>
        </li>
      </ul>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 386fr 244.5fr 307fr;
  row-gap: 1.6%;
}
.z-right {
  display: grid;
  grid-template-rows: 1fr;
}

.nyzh-c {
  display: flex;
  flex-direction: column;
  padding: 4% 0 2% 0;
  .nyzh-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 25%;
    .info-b1 {
      height: 40.5%;
      display: flex;
      justify-content: space-between;
      padding: 0 4%;
      align-items: center;
    }
  }
  .nyzh-chart {
    height: calc(75% - 2rem);
    margin-top: 2rem;
  }
}

.xny-c {
  padding: 5% 0;
  display: flex;
  justify-content: space-between;
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28.7%;
    div:nth-child(1) {
      height: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 5%;
    }
    div:nth-child(2) {
      height: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      text-align: center;
    }
  }
}

.ydl {
  background: url("@/2d/assets/images/dian.png") no-repeat center center / 100%
    100%;
}
.trq {
  background: url("@/2d/assets/images/huo.png") no-repeat center center / 100%
    100%;
}
.yhsy {
  background: url("@/2d/assets/images/you.png") no-repeat center center / 100%
    100%;
}

.qtzy-c {
  padding: 12% 0;
  display: flex;
  justify-content: space-around;
  li {
    width: 39%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .qtzy-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 75%;
      width: 100%;
    }
    .qtzy-info1 {
      background: url("@/2d/assets/images/xiankuang-zi.png") no-repeat center
        center / contain;
    }
    .qtzy-info2 {
      background: url("@/2d/assets/images/xiankuang-ju.png") no-repeat center
        center / contain;
    }
  }
}

.qgtpf-c {
  display: grid;
  grid-template-rows: 1fr 4.5fr 0.6fr 2.6fr 2.6fr;
  row-gap: 2%;
  padding-top: 4%;
  li {
  }
}

.qgtpf-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    height: 44%;
    display: flex;
    justify-content: space-between;
    padding: 0 4%;
    align-items: center;
  }
}

.qgtpf-legend {
  display: grid;
  grid-template-columns: 112fr 68fr 69fr 70fr;
  column-gap: 2%;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  div:nth-child(1) .legend-item {
    height: 0.5rem;
    visibility: hidden;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      height: 0.5rem;
      width: 0.5rem;
      background: rgb(92, 115, 230);
      visibility: visible;
      transform: translateX(50%);
    }
  }
  div:nth-child(2) .legend-item {
    height: 0.5rem;
    visibility: hidden;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      height: 0.5rem;
      width: 0.5rem;
      background: rgb(255, 159, 64);
      visibility: visible;
      transform: translateX(50%);
    }
  }
  div:nth-child(3) .legend-item {
    height: 0.5rem;
    visibility: hidden;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      height: 0.5rem;
      width: 0.5rem;
      background: rgb(72, 192, 151);
      visibility: visible;
      transform: translateX(50%);
    }
  }
  div:nth-child(4) .legend-item {
    height: 0.5rem;
    visibility: hidden;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      height: 0.5rem;
      width: 0.5rem;
      background: rgb(199, 211, 235);
      visibility: visible;
      transform: translateX(50%);
    }
  }
}
</style>