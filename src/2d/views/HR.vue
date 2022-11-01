<!-- 人力资源部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { getIntinterval } from "@/2d/utils/myRandom";
import { setBarCharts } from '@/2d/viewCharts/HR'
const store = useStore();
const option = reactive({
  data1: {},
  data2: {},
});


onMounted(() => {

  // getjtcx().then(res => {
  // console.log('getjtcx', res)
  // const data = res.data.formInfoList;
  // base.data = data.find((item) => item.year == store.state.year); 
  // 性别占比
  let dataDepartmentOfLayer = [
    {
      "id": 1,
      "name": "男职员",
      "value": 161,
    },
    {
      "id": 2,
      "name": "女职员",
      "value": 20,
    }
  ]
  let colorDepartmentOfLayer = ["rgba(0,66,255,.5)", "rgba(255,168,0,.5)", "rgba(0,66,255,.9)", "rgba(255,168,0,.9)",]
  option.data1 = setBarCharts(dataDepartmentOfLayer, colorDepartmentOfLayer, '性别占比', '80:80');
  // })
  // 人员
  let dataPersonnel = [

    {
      "id": 1,
      "name": "当月在职人数",
      "value": 181,
    },
    {
      "id": 2,
      "name": "当月离职人数",
      "value": 2,
    }
  ]
  let colorPersonnel = ["rgba(0,255,72,.5)", "rgba(255,255,255,1)", "rgba(44,255,104,1)", "rgba(255,255,255,1)"]
  option.data2 = setBarCharts(dataPersonnel, colorPersonnel, '人员', '1.09%');


})






// 中间列表类容
let contentListBtn = ref([])

</script>

<template>
  <Left>
    <Title>性别占比</Title>
    <Echart :option="option.data1" class="chart-box"></Echart>
    <Title>人员</Title>
    <Echart :option="option.data2" class="chart-box"></Echart>
  </Left>
  <Right>
    <Title>薪资支出</Title>
    <div class="wrap-salary">
      <div class="bg-img">
        <span class="span-linear font-number-style"> +58%</span>
        <p>环比率</p>
      </div>
      <div class="div-box">
        <div class="total">￥22,657,567,56</div>
        <div class="month">
          <div>本月</div>
          <p>￥22,696,684.59</p>
        </div>
        <div class="sequential">
          <div>环比</div>
          <p>+￥22,696,684.59</p>
        </div>
      </div>

    </div>
  </Right>
</template>

<style lang="less" scoped>
.chart-box {
  height: calc(30.5% - var(--titleH));
  width: 100%;
  margin-top: 1rem;

}

.wrap-salary {
  margin-top: 1.5vw;

  height: calc(100% - var(--titleH));
  width: 100%;

  .bg-img {
    height: calc(34.5% - var(--titleH));
    width: 48%;
    background: url("@/2d/assets/images/orange-greed-bg.png") no-repeat;
    background-size: 100% 100%;
    margin: auto;
    text-align: center;

    .span-linear {
      position: relative;
      top: 30%;
      font-size: 4rem;
    }

    p {
      position: relative;
      top: 30%;
    }


  }

  .div-box {
    width: 43%;

    margin: auto;

    .total {
      font-size: 2.33rem;
      font-family: DINCond-Bold;
      font-weight: 400;
      color: #28FEF6;
      margin-top: 1.8vw;
    }

    .month {
      margin-top: 1.5vw;

      &>div::before {
        content: " ";
        width: 1vw;
        height: 1vw;
        background: #28FEF6;
        border-radius: 0.17rem;
        display: inline-block;
        margin-right: .5vw;


      }

      div {
        color: #FFFFFF;
        opacity: 0.7;
        text-align: start;
      }

      p {
        font-size: 1.5vw;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }
    }

    .sequential {
      margin-top: 1vw;

      &>div::before {
        content: " ";
        width: 1vw;
        height: 1vw;
        background: #FFA800;
        border-radius: 0.17rem;
        display: inline-block;
        margin-right: .5vw;
      }

      div {
        color: #FFFFFF;
        opacity: 0.7;
      }

      p {
        font-size: 1.5vw;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }

}
</style>