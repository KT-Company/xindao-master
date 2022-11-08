<!-- 交通出行 -->
<template>
  <Left>
    <Title>交通里程</Title>
    <div class="item-wrap-TM">
      <div class="wrap-tm dpy-row">
        <div class="bg-box dpy-column">
          <div class="title">{{ base.data.glzlcs }}&nbsp;公里</div>
          <div>公交总里程数</div>
        </div>
        <div class="bg-box dpy-column">
          <div class="title">{{ base.data.gsglzlc }}&nbsp;公里</div>
          <div>高速公路总里程</div>
        </div>
      </div>
      <Echart :option="optionTrafficMileage.data" class="chart-box"></Echart>
      <div class="box-km">
        城市轨道交通总公里：<span class="span"
          >{{ base.data.csgdjtzlc }}&nbsp;公里</span
        >
      </div>
    </div>

    <Item title="公共交通" class="item-wrap-PT">
      <div class="pie-n bg-charts">
        <div class="charts-ctn">
          <Echart :option="optionPublicTransport0.data"></Echart>
        </div>

        <div class="dpy-row">
          <div class="left">
            <p>公路总里程</p>
          </div>
          <div class="right">
            <span class="span1">{{ base.data.gjzlc }}</span
            ><span class="span2">{{
              base.data.gjzlc !== undefined ? "公里" : ""
            }}</span>
          </div>
        </div>
      </div>
      <div class="pie-t bg-charts">
        <div class="charts-ctn">
          <Echart :option="optionPublicTransport1.data"></Echart>
        </div>

        <div class="dpy-row">
          <div class="left">
            <p>年客运量</p>
          </div>
          <div class="right">
            <span class="span1">{{ base.data.nkyl }}</span
            ><span class="span2">{{
              base.data.nkyl !== undefined ? "亿人次" : ""
            }}</span>
          </div>
        </div>
      </div>
      <div class="pie-s bg-charts">
        <div class="charts-ctn">
          <Echart :option="optionPublicTransport2.data"></Echart>
        </div>

        <div class="dpy-row">
          <div class="left">
            <p>出租车保有量</p>
          </div>
          <div class="right">
            <span class="span1">{{ base.data.czcbyl }}</span
            ><span class="span2">{{
              base.data.czcbyl !== undefined ? "万辆" : ""
            }}</span>
          </div>
        </div>
      </div>
      <div class="pie-f bg-charts">
        <div class="charts-ctn">
          <Echart :option="optionPublicTransport3.data"></Echart>
        </div>

        <div class="dpy-row">
          <div class="left">
            <p>共享自行车投放量</p>
          </div>
          <div class="right">
            <span class="span1">{{ base.data.gxzxctfl }}</span
            ><span class="span2">{{
              base.data.gxzxctfl !== undefined ? "万辆" : ""
            }}</span>
          </div>
        </div>
      </div>
    </Item>
  </Left>
  <Right>
    <!-- 物流运输 -->
    <Title>物流运输</Title>
    <div class="right-wl-o">
      <div class="dpy-row">
        <div
          class="box-content dpy-column"
          v-for="item in logisticsTransportation"
          :key="item.id"
        >
          <div
            class="top dpy-column"
            :style="{
              background: `url(${item.bg})`,
              'background-size': '100% 100%'
            }"
          >
            <span class="animationData font-number-style">{{
              item.value
            }}</span>
          </div>
          <div
            class="bottom"
            :style="{
              background: `url(${item.wrap})`,
              'background-size': '100% 100%'
            }"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 出行数据 -->
    <Title class="right-go-out">出行数据</Title>
    <div class="bar-box">
      <Echart :option="optionGoingOutData.data"></Echart>
    </div>
    <!-- 智能交通 -->
    <Title class="right-go-out">智能交通</Title>
    <div class="bar-box">
      <Echart :option="optionIntelligentTransportation.data"></Echart>
    </div>
  </Right>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { toRaw } from "@vue/reactivity";
import {
  setTrafficMileage,
  setPublicTransport,
  setGoingOutData
} from "@/2d/viewCharts/transportation";
import { getjtcx } from "@/2d/api";
import { useStore } from "vuex";
import { Title } from "../components";
const store = useStore();
const base = reactive({
  data: {}
});

const optionTrafficMileage = reactive({ data: {} }); //交通里程
let trafficMileage = ref({ topData: {}, chartsData: {} });
const optionPublicTransport0 = reactive({ data: {} }); //公共交通
const optionPublicTransport1 = reactive({ data: {} }); //公共交通
const optionPublicTransport2 = reactive({ data: {} }); //公共交通
const optionPublicTransport3 = reactive({ data: {} }); //公共交通
const logisticsTransportation = ref([]); //物流运输
const goingOutData = ref([]); //物流运输
const intelligentTransportation = ref([]); //智能交通
const optionGoingOutData = reactive({ data: {} }); //出行数据
const optionIntelligentTransportation = reactive({ data: {} }); //智能交通

onMounted(() => {
  //公共交通
  logisticsTransportation.value = [
    {
      id: 0,
      value: "",
      name: "物流企业总数(家)"
    },
    {
      id: 1,
      value: "",
      name: "物流运输总量(件)"
    },
    {
      id: 2,
      value: "",
      name: "货运量(吨)"
    }
  ];

  // 出行数据
  goingOutData.value = [
    { id: 0, value: "", name: "交通通信支出", unit: "元/年" },
    { id: 1, value: "", name: "平均通勤时耗", unit: "分钟" },
    { id: 2, value: "", name: "平均通勤距离", unit: "公里" }
  ];
  // 智能交通
  intelligentTransportation.value = [
    { id: 3, value: "", name: "智能图像采集终端", unit: "个" },
    { id: 4, value: "", name: "智能停车场", unit: "个" },
    { id: 5, value: "", name: "智能信号灯", unit: "个" }
  ];

  getjtcx().then((res) => {
    console.log("getjtcx", res);
    const data = res.data.formInfoList;
    base.data = data.find((item) => item.year == store.state.year);
    // 交通里程
    let dataTrafficMileage = [
      {
        id: 1,
        name: "高速铁路总里程",
        value: base.data.gstlzlc,
        color: "rgba(18,78,251,.5)"
      },
      {
        id: 2,
        name: "普通铁路总里程",
        value: base.data.pttlzlc,
        color: "rgba(255,175,21,.5)"
      }
    ];
    optionTrafficMileage.data = setTrafficMileage(
      base.data.tlzlc,
      dataTrafficMileage
    );
    // 公共交通
    optionPublicTransport0.data = setPublicTransport(
      base.data.gjzlc,
      "公路总里程",
      "#7B68EE",
      require("@/2d/assets/images/pie-bg-b.png"),
      40000
    );
    optionPublicTransport1.data = setPublicTransport(
      base.data.nkyl,
      "年客运量",
      "#00FA9A",
      require("@/2d/assets/images/pie-bg-g.png"),
      100
    );
    optionPublicTransport2.data = setPublicTransport(
      base.data.czcbyl,
      "出租车保有量",
      "#FFA500",
      require("@/2d/assets/images/pie-bg-y.png"),
      100
    );
    optionPublicTransport3.data = setPublicTransport(
      base.data.gxzxctfl,
      "共享自行车投放量",
      "#FFF5EE",
      require("@/2d/assets/images/pie-bg-w.png"),
      100
    );
    // 物流运输
    logisticsTransportation.value.forEach((item, index) => {
      switch (index) {
        case 0:
          item.value = base.data.wlysqyzs;
          break;
        case 1:
          item.value = base.data.wlyszl;
          break;
        case 2:
          item.value = base.data.hyl;
          break;
      }

      (item.wrap = require(`@/2d/assets/images/wl-wrap-${index + 1}.png`)),
        (item.bg = require(`@/2d/assets/images/wl-bg-${index + 1}.png`)),
        console.log(item, index);
      console.log("item");
    });

    // 出行数据
    goingOutData.value.forEach((item, index) => {
      switch (index) {
        case 0:
          item.value = base.data.jttxzc;
          break;
        case 1:
          item.value = base.data.pjtqsh;
          break;
        case 2:
          item.value = base.data.pjtqjl;
          break;
      }
    });
    optionGoingOutData.data = setGoingOutData(
      goingOutData.value,
      [
        " rgba(52,143,255,0.19)",
        "rgba(0,66,255,0.71)",
        "rgba(133,165,255,0.99)"
      ],
      require("@/2d/assets/images/blue-bar.png")
    );

    // 智能交通
    intelligentTransportation.value.forEach((item, index) => {
      switch (index) {
        case 0:
          item.value = base.data.zntxcjzds;
          break;
        case 1:
          item.value = base.data.zntcc;
          break;
        case 2:
          item.value = base.data.znxhd;
          break;
      }
    });
    optionIntelligentTransportation.data = setGoingOutData(
      intelligentTransportation.value,
      [
        " rgba(255,175,21,0.19)",
        "rgba(255,175,21,0.71)",
        "rgba(255,175,21,0.99)"
      ],
      require("@/2d/assets/images/orange-bar.png")
    );
  });
});
</script>
<style lang="less" scoped>
.item-wrap-TM {
  height: 41%;

  .chart-box {
    height: 49%;
  }

  .wrap-tm {
    height: 25%;

    .bg-box {
      width: 45%;
      height: 4.2rem;
      background: url("@/2d/assets/images/chart-title-lan-bg.png") no-repeat;
      background-size: 100% 100%;
      font-size: 0.7rem;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #ffffff;
      box-sizing: border-box;
      padding: 1.9rem 0;

      .title {
        font-size: 1rem;
      }
    }
  }

  .box-km {
    width: 100%;
    line-height: 3.9rem;
    background: url("@/2d/assets/images/chart-title-huang-bg.png") no-repeat;
    background-size: 100% 100%;
    font-size: 0.8rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    margin: 0.7rem 0;

    .span {
      font-size: 1rem;
      font-family: Alibaba PuHuiTi;
    }
  }
}

.item-wrap-PT {
  & > div {
    margin: 1rem 0rem;
    display: flex;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.6;

    .charts-ctn {
      margin: 0 0.5rem;
      width: 20%;
    }

    & > div.dpy-row {
      width: 90%;
      padding: 0 0.5rem;

      .right {
        font-size: 30px;
        font-family: DINCond-Bold;
        font-weight: 400;

        .span2 {
          font-size: 1rem;
        }
      }
    }
  }

  .pie-n {
    .right {
      color: #7ea0fb;
    }
  }

  .pie-t {
    .right {
      color: #80eaf6;
    }
  }

  .pie-s {
    .right {
      color: #f9ee91;
    }
  }

  .pie-f {
    .right {
      color: #ffffff;
    }
  }
}

.right-wl-o {
  color: #ffffff;
  text-align: center;
  margin-top: 1rem;

  .box-content {
    padding: 1rem;
    box-sizing: border-box;

    .top {
      width: 6rem;
      height: 5rem;

      position: relative;

      span {
        font-size: 1.7rem;
        font-weight: 900;
      }
    }

    .bottom {
      width: 6rem;
      height: 2rem;
      line-height: 2rem;
      font-size: 0.1rem;
      margin-top: 0.6rem;

      span {
        font-size: 0.6vw;
      }
    }
  }
}

.bar-box {
  margin-top: 0.5rem;
  height: 30%;
}
</style>
