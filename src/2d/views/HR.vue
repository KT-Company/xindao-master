<!-- 人力资源部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { setYuanChart } from "@/2d/viewCharts/Area";
import useData from "@/2d/hooks/useData";
import { toThreeDigitRating } from "@/2d/utils/num";
const store = useStore();
const base = useData.data5("制造集团");
const option = reactive({
  data1: {},
  data2: {},
  data3: {},
});
const data1 = reactive({
  name: `${base.ryxbzb01}:${base.ryxbzb02}`,
  value: base.ryxbzb03,
  nanzy: base.ryxbzb01,
  nvzy: base.ryxbzb02,
});
const data2 = reactive({
  name: "离职率",
  value: base.ryld03,
  dyzzrs: base.ryld01,
  dylzrs: base.ryld02,
});
const data3 = reactive({
  name: "环比率",
  value: base.ryxczc04,
  lj: toThreeDigitRating(base.ryxczc01),
  by: toThreeDigitRating(base.ryxczc02),
  hb: toThreeDigitRating(base.ryxczc03),
});
onMounted(() => {
  option.data1 = setYuanChart(data1, { color: 1, title: 2 });
  option.data2 = setYuanChart(data2, {});
  option.data3 = setYuanChart(data3, { color: 1 });
});
</script>

<template>
  <Left class="z-left">
    <Bar>
      <div class="b-title">人员性别占比</div>
      <div class="b-content ryxb-content">
        <div class="ryxb-cahrt cahrt">
          <Echart :option="option.data1"></Echart>
        </div>
        <div class="ryxb-info info">
          <div>
            <p class="title hui">男职员</p>
            <p class="value">{{data1.nanzy}}人</p>
          </div>
          <div>
            <p class="title hui m-t1">女职员</p>
            <p class="value">{{data1.nvzy}}人</p>
          </div>
        </div>
      </div>
    </Bar>

    <Bar>
      <div class="b-title">人员流动</div>
      <div class="b-content ryxb-content">
        <div class="ryxb-cahrt cahrt">
          <Echart :option="option.data2"></Echart>
        </div>
        <div class="ryxb-info info">
          <div>
            <p class="title hui">当月在职</p>
            <p class="value">{{data2.dyzzrs}}人</p>
          </div>
          <div>
            <p class="title hui m-t1">当月离职</p>
            <p class="value">{{data2.dylzrs}}人</p>
          </div>
        </div>
      </div>
    </Bar>

    <Bar>
      <div class="b-title">薪资支出</div>
      <div class="b-content ryxb-content">
        <div class="ryxb-cahrt cahrt">
          <Echart :option="option.data3"></Echart>
        </div>
        <div class="ryxb-info info">
          <div>
            <p class="title hui">累计</p>
            <p class="value">￥{{data3.lj}}</p>
          </div>
          <div>
            <p class="title hui">本月</p>
            <p class="value">￥{{data3.by}}</p>
          </div>
          <div class="huanbi">
            <p class="title hui">环比</p>
            <p class="value">￥{{data3.hb}}</p>
            <!-- <span class="value">+</span> -->
          </div>
        </div>
      </div>
    </Bar>
  </Left>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  height: 60% !important;
  top: 20% !important;
  row-gap: 3%;
}
.b-content {
  display: flex;
  // padding: 3% 0 2% 0%;
  height: calc(100% - 4rem);
  margin-top: 1rem;
}
.cahrt {
  width: 40%;
  display: flex;
}

.info {
  width: 60%;
  padding-left: 4%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.title {
  font-size: 0.6vw;
}
.value {
  font-size: 0.8vw;
  color: rgba(201, 223, 254);
}
.huanbi {
  position: relative;
  span {
    position: absolute;
    bottom: 0;
    left: -0%;
    transform: translateX(-100%);
  }
}
</style>