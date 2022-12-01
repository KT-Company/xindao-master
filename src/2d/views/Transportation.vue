<!-- 交通出行 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getjtcx } from "@/2d/api";
import { useStore } from "vuex";
import { setBingChart2 } from "@/2d/viewCharts/Area";
const store = useStore();
const base = reactive({
  data: {},
});

const ggjt = ref([
  { name: "公交总里程", value: 0, unit: "公里" },
  { name: "年客运量", value: 0, unit: "亿人次" },
  { name: "出租车保有量", value: 0, unit: "万辆" },
  { name: "共享自行车投放量", value: 0, unit: "万辆" },
]);

const option = reactive({
  data1: {},
});

const data1 = reactive({
  name: "铁路总里程 单位(公里)",
  data: [
    { name: "", value: 0 },
    { name: "", value: 0 },
  ],
});

const chuxing = ref([
  { name: "交通通信支出", value: 0, unit: "元/年" },
  { name: "平均通勤时耗", value: 0, unit: "分钟" },
  { name: "平均通勤距离", value: 0, unit: "公里" },
]);

const zhineng = ref([
  { name: "智能图像采集终端", value: 0, unit: "个" },
  { name: "智能停车场", value: 0, unit: "个" },
  { name: "智能信号灯", value: 0, unit: "个" },
]);
const wuliu = ref([
  { name: "物流企业总数", value: 0, unit: "家" },
  { name: "物流运输总量", value: 0, unit: "亿件" },
  { name: "货运量", value: 0, unit: "万吨" },
]);
onMounted(() => {
  getjtcx().then((res) => {
    console.log('res: ', res);
    const data = res.data.formInfoList;
    base.data = data.find((item) => item.year == store.state.year);
    data1.data[0].value = base.data.gstlzlc;
    data1.data[1].value = base.data.pttlzlc;
    option.data1 = setBingChart2(data1, { title: 2 });

    ggjt.value[0].value = base.data.gjzlc
    ggjt.value[1].value = base.data.nkyl
    ggjt.value[2].value = base.data.czcbyl
    ggjt.value[3].value = base.data.gxzxctfl

    chuxing.value[0].value = base.data.jttxzc;
    chuxing.value[1].value = base.data.pjtqsh;
    chuxing.value[2].value = base.data.pjtqjl;

    zhineng.value[0].value = base.data.zntxcjzds;
    zhineng.value[1].value = base.data.zntcc;
    zhineng.value[2].value = base.data.znxhd;

    wuliu.value[0].value = base.data.wlysqyzs;
    wuliu.value[1].value = base.data.wlyszl;
    wuliu.value[2].value = base.data.hyl;
  });
});
</script>

<template>

  <Left class="z-left">

    <Bar>
      <div class="b-title">交通里程</div>
      <div class="b-content jtlc-c">
        <ul class="jtlc-titles">
          <li class="bg-hui">
            <p class="big-val">{{base.data.glzlcs}}<span class="hui">公里</span></p>
            <p class="hui">公路总里程</p>
          </li>
          <li class="bg-hui">
            <p class="big-val">{{base.data.gsglzlc}}<span class="hui">公里</span></p>
            <p class="hui">高速公路总里程</p>
          </li>
        </ul>
        <div class="jtlc-chart-c">
          <div class="jtlc-chart">
            <Echart :option="option.data1"></Echart>
          </div>
          <ul class="jtlc-info">
            <li>
              <p class="hui-s gstlzlc">高速铁路总里程</p>
              <p class="hui-s"><span class="jtlc-val hui-s">{{base.data.gstlzlc}}</span>公里</p>
            </li>
            <li>
              <p class="hui-s pttlzlc">普通铁路总里程</p>
              <p class="hui-s"><span class="jtlc-val hui-s">{{base.data.pttlzlc}}</span>公里</p>
            </li>
          </ul>
        </div>
        <div class="csgdjt bg-hui">
          <span class="hui">城市轨道交通总里程</span>
          <p>
            <span class="big-val">{{base.data.csgdjtzlc}}</span>
            <span class="hui">公里</span>
          </p>
        </div>
      </div>
    </Bar>

    <Bar>
      <div class="b-title">公共交通</div>
      <ul class="b-content ggjt-c">
        <li
          v-for="(item,i) in ggjt"
          :key="i"
        >
          <span class="hui-s">{{item.name}}</span>
          <p>
            <span class="big-val">{{item.value}}</span>
            <span class="hui">{{item.unit}}</span>
          </p>
        </li>
      </ul>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <div class="b-title">出行数据</div>
      <ul class="b-content ct1">
        <li
          class="ct1-1"
          v-for="(item,i) in chuxing"
          :key="i"
        >
          <p class="big-val">{{item.value}}</p>
          <p class="hui">{{item.unit}}</p>
          <p class="hui-s ct-name">{{item.name}}</p>
        </li>
      </ul>
    </Bar>
    <Bar>
      <div class="b-title">智能交通</div>
      <ul class="b-content ct1">
        <li
          class="ct1-1 ct1-2"
          v-for="(item,i) in zhineng"
          :key="i"
        >
          <p class="big-val">{{item.value}}</p>
          <p class="hui">{{item.unit}}</p>
          <p class="hui-s">{{item.name}}</p>
        </li>
      </ul>
    </Bar>
    <Bar>
      <div class="b-title">物流运输</div>
      <ul class="b-content ct1 ct3">
        <li
          class="ct1-1 ct1-3"
          v-for="(item,i) in wuliu"
          :key="i"
        >
          <div>
            <p class="big-val">{{item.value}}</p>
            <p class="hui">{{item.unit}}</p>
          </div>
          <p class="hui-s">{{item.name}}</p>
        </li>
      </ul>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.ct-name{
  font-size: .6vw !important;
}
.z-left {
  display: grid;
  grid-template-rows: 406fr 321fr;
  row-gap: 2.35%;
  height: 69% !important;
  top: 15.7% !important;
}
.z-right {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: 2%;
  height: 69% !important;
  top: 15.7% !important;
}

.ggjt-c {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 4% 0;
  li {
    height: 16%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4% 0 6%;
  }
  li:nth-child(1) {
    background: url("@/2d/assets/images/ggjt-hong.png") no-repeat center center /
      100% 100%;
  }
  li:nth-child(2) {
    background: url("@/2d/assets/images/ggjt-huang.png") no-repeat center center /
      100% 100%;
  }
  li:nth-child(3) {
    background: url("@/2d/assets/images/ggjt-lan.png") no-repeat center center /
      100% 100%;
  }
  li:nth-child(4) {
    background: url("@/2d/assets/images/ggjt-hui.png") no-repeat center center /
      100% 100%;
  }
}
// .big-val {
//   font-weight: bold;
//   font-size: 0.85vw;
// }
.jtlc-c {
  display: grid;
  grid-template-rows: 54fr 120fr 40fr;
  // border: 1px solid red;
  height: calc(100% - 5.8rem);
  margin-top: 1.75rem;
  row-gap: 15.35%;
  .jtlc-titles {
    display: flex;
    justify-content: space-between;
    li {
      width: 44.9%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .jtlc-chart-c {
    display: flex;
    .jtlc-chart {
      height: 100%;
      width: 40%;
    }
    .jtlc-info {
      height: 100%;
      width: 60%;
      padding-left: 8%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .jtlc-val {
        // font-weight: bold;
        font-size: 1vw;
      }
    }
  }
  .csgdjt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
  }
}

.ct1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // padding: 9.3% 0;
  padding: 5% 0;
  column-gap: 6.5%;
}

.ct1-1 {
  background: url("@/2d/assets/images/kuang-lvbiao.png") no-repeat center center /
    100% 100%;
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
.ct1-2 {
  background: url("@/2d/assets/images/kuang-jubiao.png") no-repeat center center /
    100% 100%;
}
.ct3 {
  column-gap: 0%;
  li {
    background: none;
    padding: 0 11.2%;
    div {
      height: 70%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
}
.ct1-3:nth-child(1) {
  div {
    background: url("@/2d/assets/images/yq-hui.png") no-repeat center center /
      contain;
  }
}
.ct1-3:nth-child(2) {
  div {
    background: url("@/2d/assets/images/yq-lan.png") no-repeat center center /
      contain;
  }
}
.ct1-3:nth-child(3) {
  div {
    background: url("@/2d/assets/images/yq-zi.png") no-repeat center center /
      contain;
  }
}

.gstlzlc,
.pttlzlc {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    top: 50%;
    left: 0%;
    transform: translate(-200%, -50%);
  }
}

.gstlzlc::before {
  background: rgba(72, 124, 223);
}
.pttlzlc::before {
  background: rgba(112, 100, 188);
}
</style>