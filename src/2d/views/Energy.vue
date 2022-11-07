<!-- 能源碳排放 -->
<!-- 
  数据对接情况：{
    蜂窝图未对接
    火力发电未对接
    其他对接完成
  }
 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import {
  setFireChart,
  setCarbonChart1,
  setCarbonChart2,
} from "@/2d/viewCharts/Energy";
import { getnyzxhm, getnytpfy } from "@/2d/api";
import { useYear } from "@/2d/hooks/useTime";
import { useStore } from "vuex";
import { getRandomList } from '@/2d/utils/myRandom'
const store = useStore();
const base = reactive({
  data: {},
});
const baseList = ref([]);
const quanguoTan = ref([])

const fireChart = reactive({
  xData: [
    "1-2月",
    "1-3月",
    "1-4月",
    "1-5月",
    "1-6月",
    "1-7月",
    "1-8月",
    "1-9月",
    "1-10月",
    "1-11月",
    "1-12月",
  ],
  data: [
    [199, 199, 50, 199, 199, 199, 199, 199, 199, 199, 199],
    [99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99],
  ],
});

const quanguo = reactive({
  xData: [],
  data: [
    { name: "全国人均碳排放量", value: [] },
    { name: "全国碳排放总量", value: [] },
  ],
});

const renjun = reactive({
  xData: [],
  data: [
    { name: "北京人均碳排放量", value: [] },
    { name: "北京碳排放总量", value: [] },
  ],
})

const option = reactive({
  data1: {},
  data2: {},
  data3: {},
});

onMounted(() => {
  getnytpfy().then((res) => {
    console.log('nytpfy: ', res);

    const data = res.data.formInfoList;
    // 寻找某个省份某年的数据
    base.data = data.find((item) => item.year == store.state.year && item.szxs == store.state.szxs);
    // 寻找某个省份近几年的数据 
    baseList.value = data.filter((item) => item.szxs == store.state.szxs).filter(item=>useYear(item, 11))
    const quanguoList = data.filter((item) => item.year == store.state.year);
    quanguoTan.value =  getRandomList(quanguoList,4)
    
    quanguo.xData = baseList.value.map(item=>item.year)
    quanguo.data[0].value = baseList.value.map(item=>item.qgrjtpfl)
    quanguo.data[1].value = baseList.value.map(item=>item.qgtpfzl)

    renjun.xData = baseList.value.map(item=>item.year)
    renjun.data[0].value = baseList.value.map(item=>item.rjtpfl)
    renjun.data[1].value = baseList.value.map(item=>item.pflzl)

    option.data1 = setFireChart(fireChart);
    option.data2 = setCarbonChart1(quanguo);
    option.data3 = setCarbonChart2(renjun);
  });


  getnyzxhm().then(res=>{
    console.log('getnyzxhm: ', res);

  })

});
</script>

<template>
  <Left>
    <Title>火力发电量统计图</Title>
    <div class="fire-main">
      <ul class="fire-box">
        <li class="fire-item">
          <span class="fire-title">煤炭总用量</span>
          <p><span class="fire-val">{{ base.data.mtzyly }}</span><span class="fire-unit">万吨</span></p>
        </li>
        <li class="fire-item">
          <span class="fire-title">火力发电量</span>
          <p><span class="fire-val">{{ base.data.hlfdzly }}</span><span class="fire-unit">亿千瓦小时</span></p>
        </li>
      </ul>
      <Echart
        :option="option.data1"
        class="fire-chart"
      ></Echart>
    </div>
    <Title>新能源</Title>
    <div class="new-energy">
      <div class="new-energy-box">
        <div class="new-energy-item1">
          <span class="color1 animation-downUp">{{ base.data.ydl }}</span>
        </div>
        <div class="new-energy-item2">
          <span>用电量</span>
          <span>（亿千瓦时）</span>
        </div>
      </div>
      <div class="new-energy-box">
        <div class="new-energy-item1">
          <span class="color2 animation-downUp">{{ base.data.trqxfl }}</span>
        </div>
        <div class="new-energy-item2">
          <span>天然气消费量</span>
          <span>（亿立方米）</span>
        </div>
      </div>
      <div class="new-energy-box">
        <div class="new-energy-item1">
          <span class="color3 animation-downUp">{{ base.data.yhsyqgyzl }}</span>
        </div>
        <div class="new-energy-item2">
          <span>液化石油气供应总量</span>
          <span>（万吨）</span>
        </div>
      </div>
    </div>
    <Title>其他资源</Title>
    <ul class="other">
      <li>
        <span class="other-title">建设用地供应总量</span>
        <p><span class="other-val num-jianbian-hui num-type">{{ base.data.jsydgyzl }}</span><span class="other-unit">公顷</span></p>
      </li>
      <li>
        <span class="other-title">水资源总量</span>
        <p><span class="other-val num-jianbian-hui num-type">{{ base.data.szyzl }}</span><span class="other-unit">亿立方米</span></p>
      </li>
    </ul>

  </Left>
  <Right>
    <Title>全国碳排放</Title>
    <div class="carbon-emissions">
      <div class="box1">
        <ul class="box1-bg">
          <li v-for="(item,index) in quanguoTan" :key="index">
            <p><span class="val">{{item.pflzlzqgb || 0}}</span><span class="unit">%</span></p>
            <span>{{item.szxs}}</span>
          </li>
          <!-- <li>
            <p><span class="val">5.38</span><span class="unit">%</span></p>
            <span>广东</span>
          </li>
          <li>
            <p><span class="val">5.38</span><span class="unit">%</span></p>
            <span>广东</span>
          </li>
          <li>
            <p><span class="val">2.90</span><span class="unit">%</span></p>
            <span>四川</span>
          </li> -->
        </ul>
        <div class="box1-data">
          <p>
            <span>京津冀：</span><span>10.66 %</span>
          </p>
          <p>
            <span>长三角：</span><span>16.41 %</span>
          </p>
          <p>
            <span>粤港澳：</span><span>5.38 %</span>
          </p>
          <p>
            <span>其他省份：</span><span>40.62 %</span>
          </p>
        </div>
      </div>
      <div class="box2">
        <div class="chart-box">
          <div class="chart-title"></div>
          <Echart
            :option="option.data2"
            class="h-100"
          ></Echart>
        </div>
        <div class="chart-box">
          <div class="chart-title"></div>
          <Echart
            :option="option.data3"
            class="h-100"
          ></Echart>
        </div>
      </div>
    </div>

  </Right>
</template>

<style lang="less" scoped>
.fire-main {
  height: calc(50% - var(--titleH));
}
.fire-box {
  padding-left: 15%;
  height: 25%;
  .fire-item {
    display: flex;
    position: relative;
    align-items: center;
    width: auto;
    background: url("@/2d/assets/images/title-1-bg.png") no-repeat center center /
      100% 100%;
    height: 50%;
    p {
      position: absolute;
      right: 13%;
    }
    .fire-title {
      position: absolute;
      left: 13%;
    }
    .fire-val {
      color: #7ba2ffff;
      font-size: 1vw;
      font-weight: bold;
      padding-right: 0.3vw;
    }
    .fire-unit {
      color: #999999ff;
      font-size: 0.6vw;
    }
  }
}
.fire-chart {
  height: 75%;
}

.new-energy {
  height: calc(28% - var(--titleH));
  display: flex;
  justify-content: space-around;
  .new-energy-box {
    display: inline-block;
    width: 25%;
    &:nth-of-type(1) .new-energy-item1 {
      background: url("@/2d/assets/images/pan-weilan.png") no-repeat center
        bottom / 80% 70%;
    }
    &:nth-of-type(2) .new-energy-item1 {
      background: url("@/2d/assets/images/pan-ju.png") no-repeat center bottom /
        80% 70%;
    }
    &:nth-of-type(3) .new-energy-item1 {
      background: url("@/2d/assets/images/pan-lan.png") no-repeat center bottom /
        80% 70%;
    }
    &:nth-of-type(1) .new-energy-item2 {
      background: url("@/2d/assets/images/fang-weilan.png") no-repeat center
        center / 100% 100%;
    }
    &:nth-of-type(2) .new-energy-item2 {
      background: url("@/2d/assets/images/fang-ju.png") no-repeat center center /
        100% 100%;
    }
    &:nth-of-type(3) .new-energy-item2 {
      background: url("@/2d/assets/images/fang-lan.png") no-repeat center center /
        100% 100%;
    }
    .new-energy-item1 {
      height: 70%;
      display: flex;
      justify-content: center;
      padding-top: 3%;
      span {
        font-family: YouSheBiaoTiHei;
        font-weight: bold;
        font-size: 1.1vw;
      }
    }
    .new-energy-item2 {
      height: 30%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 0.55vw;
      }
    }
  }
}

.other {
  height: calc(22% - var(--titleH));
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  li {
    background: url("@/2d/assets/images/other-item-bg.png") no-repeat center
      center / 100% 100%;
    width: 85%;
    height: 39%;
    display: flex;
    position: relative;
    align-items: center;
    .other-title {
      font-weight: bold;
      position: absolute;
      left: 12%;
    }
    p {
      font-weight: bold;
      position: absolute;
      right: 5%;
      display: flex;
      align-items: center;
      height: 100%;
      background: url("@/2d/assets/images/gaoliang.png") no-repeat left
          bottom 5% / 50% 20%;
      .other-val {
        font-size: 1.45vw;
        text-align: center;
        // height: 80%;
      }
      .other-unit {
        padding-left: 1.2vw;
        color: rgb(185, 206, 255);
        font-size: 0.6vw;
      }
    }
  }
}

.carbon-emissions {
  height: 100%;
}

.new-energy-box {
  display: flex;
}

.carbon-emissions {
  height: calc(100% - var(--titleH));
  .box1 {
    height: 40%;
    .box1-bg {
      background: url("@/2d/assets/images/fengwo.png") no-repeat center center /
        cover;
      height: 70%;
      position: relative;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: url("@/2d/assets/images/liubianxing-lv.png") no-repeat
          center center / 100% 100%;
        position: absolute;
        width: 19%;
        height: 40%;
        &:nth-child(1) {
          left: 15%;
          top: 27%;
        }
        &:nth-child(2) {
          left: 46%;
          top: 27%;
          background: url("@/2d/assets/images/liubianxing-lan.png") no-repeat
            center center / 100% 100%;
        }
        &:nth-child(3) {
          left: 78%;
          top: 27%;
          background: url("@/2d/assets/images/liubianxing-huang.png") no-repeat
            center center / 100% 100%;
        }
        &:nth-child(4) {
          left: 36.5%;
          top: 57%;
          background: url("@/2d/assets/images/liubianxing-ju.png") no-repeat
            center center / 100% 100%;
        }
      }
    }
    .box1-data {
      height: 30%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      p {
        font-size: 0.8vw;
        display: flex;
        height: 40%;
        width: 40%;
        padding-left: 3%;
        background: url("@/2d/assets/images/sibianx-lv.png") no-repeat center
          bottom / 100% 40%;
        padding-top: 2.5%;
        &:nth-child(2) {
          background: url("@/2d/assets/images/sibianx-lan.png") no-repeat center
            bottom / 100% 40%;
        }
        &:nth-child(3) {
          background: url("@/2d/assets/images/sibianx-huang.png") no-repeat
            center bottom / 100% 40%;
        }
        &:nth-child(4) {
          background: url("@/2d/assets/images/sibianx-ju.png") no-repeat center
            bottom / 100% 40%;
        }
      }
    }
  }
  .box2 {
    height: 60%;
    .chart-box {
      height: 50%;
      position: relative;
      .chart-title {
        position: absolute;
        pointer-events: none;
        height: 15%;
        width: 90%;
        left: 50%;
        transform: translateX(-50%);
        top: 6%;
        background: url("@/2d/assets/images/chart-title-lan-bg.png") no-repeat
          center center / 100% 100%;
      }
    }
  }
}

.color1 {
  color: #00e4ffff;
}
.color2 {
  color: #f9c560ff;
}
.color3 {
  color: #427cffff;
}

.animation-downUp{
  animation: downUp 1s infinite alternate-reverse
}

@keyframes downUp {
  from {
    transform: translateY(35%);
  }

  to {
    transform: translateY(15%);
  }
}
</style>