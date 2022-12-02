<!-- 采购部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { createEcharts, getEchartsAndOption } from "@/2d/viewCharts/common";
import { toThreeDigitRating } from "@/2d/utils/num";
import ProgressEl from "@/2d/components/Progress.vue";
import useData from "@/2d/hooks/useData";
import CHART from "@/2d/viewCharts/Params";
import { setBar } from "@/2d/viewCharts/Business";
const store = useStore();
const base = useData.data5("制造集团");
const base1 = useData.data7("制造集团");
const base2 = useData.data8("制造集团");
const base3 = useData.data2("制造集团");
const base4 = useData.data1("制造集团");
const option = reactive({
  data1: {},
});

// 采购支出
const purchaseChar = ref(null);
const drawPurchaseChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "gauge1", {
    color: [
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "RGBA(230, 105, 11, .3)", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "RGBA(230, 105, 11, 1)", // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    ],
    series: [
      {
        detail: {
          formatter(val) {
            return `{val|+${val}%}\n{name|环比率}`;
          },
        },
        data: [{ value: base.qycgzc004 }],
      },
    ],
  });
  char.setOption(option);
};
const peMoney = reactive([
  { unit: "￥", value: base.qycgzc001, prefix: "", desc: "" },
  { unit: "￥", value: base.qycgzc002, prefix: "", desc: "本月" },
  { unit: "￥", value: base.qycgzc003, prefix: "+", desc: "环比" },
]);
// 供应商排行
const supplier = reactive(
  // base1.map((item, i) => {
  //   return {
  //     name: `${i + 1}、${item.qygyspm01}`,
  //     value: item.qygyspm02 || 0,
  //     percentage: item.qygyspm02 || 0,
  //   };
  // })
  base1
    .filter((item, i) => item.qygyspm01)
    .map((item, i) => {
      return {
        name: `${i + 1}、${item.qygyspm01}`,
        value: item.qygyspm02 || 0,
        percentage: item.qygyspm02 || 0,
      };
    })
);

// 物流费用
const logisticsEl = ref(null);
const drawLogisticsChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "line1", {
    xAxis: {
      data: base2.map((item) => item.month),
    },
    series: [
      {
        data: base2.map((item) => item.qywlfy02),
      },
    ],
  });
  char.setOption(option);
};
// 企业仓库容积
const businessRepoEl = ref(null);
const drawBusinessRepoChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "gauge1", {
    color: [
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "RGBA(86, 106, 207, .3)", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "RGBA(86, 106, 207, 1)", // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    ],
    series: [
      {
        detail: {
          formatter(val) {
            return `{val|${val}%}\n{name|总空闲占比}`;
          },
        },
        data: [{ value: base3.qyckzy03 }],
      },
    ],
  });
  char.setOption(option);
};
const brMoney = reactive([
  { value: base3.qyckzy01, prefix: "", desc: "总占用量" },
  { value: base3.qyckzy02, prefix: "", desc: "总空闲量" },
]);

// 货币周转率
const goodsTREL = ref(null);
const drawGoodsTRELChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "line1", {
    xAxis: {
      data: base2.map((item) => item.month),
    },
    series: [{ data: base2.map((item) => item.qychzzl02 || 0) }],
  });
  char.setOption(option);
};
// 企业库存情况
let dataObj1 = {
  x: [],
  val: [],
};
CHART.inventoryNamesLow.forEach((item, i) => {
  if (base4[item]) {
    dataObj1.x.push(CHART.inventoryNames[i]);
    dataObj1.val.push(base4[item]);
  }
});
const data1 = reactive({
  color: "rgba(255,159,64)",
  name: "企业库存情况",
  Xdata: dataObj1.x,
  dataList: dataObj1.val,
  isShow: true,
});
option.data1 = setBar(data1, {interval: 0});
// const businessRepoSituationEl = ref(null);
// const drawBusinessRepoSituationElChar = (el) => {
//   const { char, option } = getEchartsAndOption(el, "bar1", {});
//   char.setOption(option);
// };

onMounted(() => {
  drawPurchaseChar(purchaseChar.value);
  drawLogisticsChar(logisticsEl.value);
  drawBusinessRepoChar(businessRepoEl.value);
  drawGoodsTRELChar(goodsTREL.value);
  // drawBusinessRepoSituationElChar(businessRepoSituationEl.value);
});
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>采购支出</Title>
      <Content>
        <div class="purchase-expend">
          <div
            class="char"
            ref="purchaseChar"
            v-once
          ></div>
          <ul class="pe-money-list">
            <li
              class="pe-money-item"
              v-for="item in peMoney"
              :key="item"
            >
              <p class="pe-m-i-desc">{{ item.desc }}</p>
              <p class="pe-m-i-content">
                <span class="pe-m-i-prefix">{{ item.prefix }}</span>
                <span class="pe-m-i-unit">{{ item.unit }}</span>
                <span class="pe-m-i-value">{{ toThreeDigitRating(item.value) }}</span>
              </p>
            </li>
          </ul>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>供应商排名</Title>
      <Content>
        <div class="supplier-top">
          <ul class="supplier-top-list">
            <li
              class="supplier-top-item"
              v-for="(item,i) in supplier"
              :key="i"
            >
              <p class="supplier-info">
                <span class="supplier-name">{{ item.name }}</span>
                <span class="supplier-value">{{ toThreeDigitRating(item.value) }}</span>
              </p>
              <progress-el :value="item.percentage"></progress-el>
            </li>
          </ul>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>物流费用</Title>
      <Content>
        <div class="logistics-expenses">
          <div
            class="char"
            ref="logisticsEl"
          ></div>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业仓库容积</Title>
      <Content>
        <div class="business-repo">
          <div
            class="char"
            ref="businessRepoEl"
            v-once
          ></div>
          <ul class="br-money-list">
            <li
              class="br-money-item"
              v-for="item in brMoney"
              :key="item"
            >
              <p class="br-m-i-desc">{{ item.desc }}</p>
              <p class="br-m-i-content">
                <span class="br-m-i-prefix">{{ item.prefix }}</span>
                <span class="br-m-i-unit">{{ item.unit }}</span>
                <span class="br-m-i-value">{{ toThreeDigitRating(item.value) }}</span>
              </p>
            </li>
          </ul>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>存货周转率</Title>
      <Content>
        <div class="goods-turnover-rate">
          <div
            class="char"
            ref="goodsTREL"
          ></div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业库存情况</Title>
      <Content>
        <div class="business-repo-situation">
          <span class="hui unit1 class unit-span">单位:亿</span>
          <div
            class="char"
            ref="businessRepoSituationEl"
          >
            <Echart :option="option.data1"></Echart>
          </div>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 201fr 222fr 281fr;
  row-gap: 1.9%;
  top: 16.04% !important;
  height: 67.926% !important;
}

.z-right {
  display: grid;
  grid-template-rows: 201.3fr 240fr 259fr;
  row-gap: 1.9%;
  top: 16.04% !important;
  height: 67.926% !important;
}

.purchase-expend,
.business-repo {
  display: flex;
  gap: 0 48px;
  margin-top: 10px;
  padding-left: 14px;

  .char {
    height: 120px;
    width: 120px;
  }

  .pe-money-list,
  .br-money-list {
    display: flex;
    justify-content: space-around;
    flex-direction: column;

    .pe-money-item,
    .br-money-item {
      color: var(--value-color);

      .pe-m-i-desc,
      .br-m-i-desc {
        font-size: 12px;
      }

      .pe-m-i-content,
      .br-m-i-content {
        position: relative;
        font-size: 20px;

        .pe-m-i-prefix,
        .br-m-i-prefix {
          position: absolute;
          left: -12px;
        }
      }
    }
  }
}

.supplier-top::-webkit-scrollbar {
  padding-left: 20px;
  width: 5px;
}
.supplier-top::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.4);
}
.supplier-top {
  overflow-y: auto;
  max-height: 15vh;
  padding-right: 20px;
  color: var(--value-color);

  .supplier-top-list {
    .supplier-top-item {
      .supplier-info {
        display: flex;
        justify-content: space-between;
        line-height: 2;
      }
    }
  }
}

.logistics-expenses,
.goods-turnover-rate,
.business-repo-situation {
  height: 100%;
  position: relative;
  .unit-span {
    position: absolute;
    right: 2%;
    top: -5%;
    color: rgb(190, 211, 244);
  }
  .char {
    height: 100%;
  }
}
</style>