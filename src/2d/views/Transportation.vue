<!-- 交通出行 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getqycyjj } from "@/2d/api";
import { useStore } from "vuex";
const store = useStore();
// 当前年
const baseA = reactive({
  data: {},
});
const baseListA = ref([]);

// 去年
const baseB = reactive({
  data: {},
});
const baseListB = ref([]);

const ggjt = ref([
  { name: "公交总里程", value: 28580.0, unit: "公里" },
  { name: "年客运量", value: 53.5, unit: "亿人次" },
  { name: "出租车保有量", value: 100, unit: "万辆" },
  { name: "共享自行车投放量", value: 85.3, unit: "万辆" },
]);

const option = reactive({
  data1: {},
});

onMounted(() => {
  getqycyjj().then((res) => {
    const data = res.data.formInfoList;
    baseListA.value = data.filter((item) => item.year == store.state.year);
    baseListB.value = data.filter((item) => item.year == store.state.year - 1);
    baseA.data = baseListA.value.find((item) => item.qy == "海景区");
    baseB.data = baseListB.value.find((item) => item.qy == "海景区");
    const areaA = data.filter((item) => item.qy == "海景区");
  });
});
</script>

<template>

  <Left class="z-left">
    <!-- <Bar>
      <div class="b-content">
        <span class="unit1 hui">单位：亿</span>
        <Echart :option="option.data2"></Echart>
      </div>
    </Bar> -->

    <Bar>
      <div class="b-title">交通里程</div>
      <div class="b-content">
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
            <span class="ggjt-val">{{item.value}}</span>
            <span class="hui">{{item.unit}}</span>
          </p>
        </li>
      </ul>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <div class="b-title">出行数据</div>
      <div class="b-content">

      </div>
    </Bar>
    <Bar>
      <div class="b-title">智能交通</div>
      <div class="b-content">

      </div>
    </Bar>
    <Bar>
      <div class="b-title">物流运输</div>
      <div class="b-content">

      </div>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
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
    .ggjt-val{
      font-weight: bold;
      font-size: .85vw;
    }
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
</style>