<!-- 政务服务 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { getEchartsAndOption } from "@/2d/viewCharts/common";
import { toThreeDigitRating } from "@/2d/utils/num";
import useData from "@/2d/hooks/useData";
const base = useData.data4("政务服务");
const base1 = useData.data2("政务服务");
const base2 = useData.data2();
const store = useStore();
// 企业所得税税负率
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
            return `{val|${val}%}\n{name|税负率}`;
          },
        },
        data: [
          {
            value: base1.zwgrsds03,
          },
        ],
      },
    ],
  });
  char.setOption(option);
};
const peMoney = reactive([
  { unit: "￥", value: base1.zwgrsds01, prefix: "", desc: "总营业收入" },
  { unit: "￥", value: base1.zwgrsds02, prefix: "", desc: "应纳所得额" },
]);
//碳排放
const carbonEmissionEl = ref(null);
const drawCarbonEmissionChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "mutilLine1");

  if (store.state.MODE === "BUSINESS") {
    option.xAxis.data = base.tpf.map((item) => item.month);
    option.series[0].data = base.tpf.map((item) => item.allocationTotal);
    option.series[1].data = base.tpf.map((item) => item.dischargeTotal);
    option.series[2].data = base.tpf.map((item) => item.buyTotal);
  } else {
    option.xAxis.data = base.map((item) => item.month);
    option.series[0].data = base.map((item) => item.zwtpf02);
    option.series[1].data = base.map((item) => item.zwtpf03);
    option.series[2].data = base.map((item) => item.zwtpf04);
  }

  char.setOption(option);
};

//企业增值税税负率
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
            return `{val|${val}%}\n{name|税负率}`;
          },
        },
        data: [
          {
            value: base1.zwqyzzs03,
          },
        ],
      },
    ],
  });
  char.setOption(option);
};
const brMoney = reactive([
  { value: base1.zwqyzzs01, prefix: "", desc: "当期应税销售收入" },
  { value: base1.zwqyzzs02, prefix: "", desc: "当期应纳增值税" },
]);

// 企业数量
const businessNumEl = ref(null);
const drawBusinessNumChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "bar1", {
    color: ["rgba(92, 115, 230, 1)"],
    grid: { bottom: 0, right: 25 },
    xAxis: {
      axisLabel: { align: "left", margin: 8, rotate: -45 },
    },
  });
  option.title.text = "单位：家";
  if (store.state.MODE === "BUSINESS") {
    option.xAxis.data = base2.qysl.map((item) => item.name);
    option.series[0].data = base2.qysl.map((item) => item.num);
  } else {
    option.xAxis.data = base2.map((item) => item.qylx);
    option.series[0].data = base2.map((item) => item.zwqysl02);
  }
  char.setOption(option);
};
onMounted(() => {
  drawPurchaseChar(purchaseChar.value);
  drawBusinessRepoChar(businessRepoEl.value);
  drawCarbonEmissionChar(carbonEmissionEl.value);
  drawBusinessNumChar(businessNumEl.value);
});
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>企业所得税税负率</Title>
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
      <Title>碳排放</Title>
      <Content>
        <div class="carbon-emission">
          <div
            class="char"
            ref="carbonEmissionEl"
          ></div>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业增值税税负率</Title>
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
      <Title>企业数量</Title>
      <Content>
        <div class="business-num">
          <div
            class="char"
            ref="businessNumEl"
          ></div>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  display: grid;
  grid-template-rows: 201fr 262fr;
  row-gap: 2.9%;
  top: 28% !important;
  height: 44.197% !important;
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

.carbon-emission,
.business-num {
  height: 100%;

  .char {
    height: 100%;
  }
}
</style>