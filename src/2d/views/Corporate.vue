<!-- 企管部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { createEcharts, getEchartsAndOption } from "@/2d/viewCharts/common"
import { toThreeDigitRating } from "@/2d/utils/num"
const store = useStore();

// 年度收入指标
const annualIncomeEl = ref(null)
const drawAnnualIncome = el => {
  const { char, option } = getEchartsAndOption(el, "liquidFill1",{
    name:"完成率",
  })
  char.setOption(option)
}
const aiData = reactive([
  { name: "指标", value: 12345679, unit: "￥" },
  { name: "已完成", value: 0, unit: "￥" },
])

// 年度采购预算
const annualProcurementEl = ref(null)
const drawAnnualProcurementEl = el => {
  const { char, option } = getEchartsAndOption(el, "liquidFill1", {
    series: [{
      name:"支出率",
      color: ["rgba(92, 115, 230, .5)"],
      outline: {
        itemStyle: {
          borderColor: "rgba(92, 115, 230, .5)"
        }
      },
    }]
  })
  char.setOption(option)
}
const apData = reactive([
  { name: "预算", value: 12345679, unit: "￥" },
  { name: "已支出", value: 0, unit: "￥" },
])
// 企业营业收入
const businessIncomeEl = ref(null)
const drawBusinessIncomeEl = el => {
  const { char, option } = getEchartsAndOption(el, "gauge1", {
    color: [{
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: 'RGBA(180, 181, 186, .3)' // 0% 处的颜色
      }, {
        offset: 1, color: 'RGBA(180, 181, 186, 1)' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    }],
    series: [{
      detail: {
        formatter(val) {
          return `{val|+${val}%}\n{name|环比率}`;
        }
      }
    }]
  })
  char.setOption(option)
}
const biData = reactive([
  { name: "本月", value: 3400111, unit: "￥" },
  { name: "环比", value: 3400111, unit: "￥" },
])

// 企业成本支出
const businessExpendEl = ref(null)
const drawBusinessExpendEl = el => {
  const { char, option } = getEchartsAndOption(el, "gauge1", {
    color: [{
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: 'RGBA(72, 153, 132, .3)' // 0% 处的颜色
      }, {
        offset: 1, color: 'RGBA(72, 153, 132, 1)' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    }],
    series: [{
      detail: {
        formatter(val) {
          return `{val|+${val}%}\n{name|环比率}`;
        }
      }
    }]
  })
  char.setOption(option)
}
const beData = reactive([
  { name: "本月", value: 3400111, unit: "￥" },
  { name: "环比", value: 3400111, unit: "￥" },
])

onMounted(() => {
  drawAnnualIncome(annualIncomeEl.value)
  drawAnnualProcurementEl(annualProcurementEl.value)
  drawBusinessIncomeEl(businessIncomeEl.value)
  drawBusinessExpendEl(businessExpendEl.value)

})
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>年度收入指标</Title>
      <Content>
        <div class="annual-income">
          <div class="char" ref="annualIncomeEl"></div>
          <ul class="map-list">
            <li class="item" v-for="item in aiData">
              <p class="k-wrap">
                <span class="key">{{ item.name }}</span>
              </p>
              <p class="v-wrap">
                <span class="monery-unit">{{ item.unit }}</span>
                <span class="val">{{ toThreeDigitRating(item.value) }}</span>
              </p>
            </li>
          </ul>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>年度采购预算</Title>
      <Content>
        <div class="annual-procurement">
          <div class="char" ref="annualProcurementEl"></div>
          <ul class="map-list">
            <li class="item" v-for="item in apData">
              <p class="k-wrap">
                <span class="key">{{ item.name }}</span>
              </p>
              <p class="v-wrap">
                <span class="monery-unit">{{ item.unit }}</span>
                <span class="val">{{ toThreeDigitRating(item.value) }}</span>
              </p>
            </li>
          </ul>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业营业收入</Title>
      <Content>
        <div class="business-income">
          <div class="char" ref="businessIncomeEl"></div>
          <p class="monery">
            <span class="monery-unit">￥</span>
            <span class="val">{{ toThreeDigitRating(3400111) }}</span>
          </p>
          <ul class="map-list">
            <li class="item" v-for="item in biData">
              <p class="k-wrap">
                <span class="key">{{ item.name }}</span>
              </p>
              <p class="v-wrap">
                <span class="monery-unit">{{ item.unit }}</span>
                <span class="val">{{ toThreeDigitRating(item.value) }}</span>
              </p>
            </li>
          </ul>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业成本支出</Title>
      <Content>
        <div class="business-expend">
          <div class="char" ref="businessExpendEl"></div>
          <p class="monery">
            <span class="monery-unit">￥</span>
            <span class="val">{{ toThreeDigitRating(3400111) }}</span>
          </p>
          <ul class="map-list">
            <li class="item" v-for="item in beData">
              <p class="k-wrap">
                <span class="key">{{ item.name }}</span>
              </p>
              <p class="v-wrap">
                <span class="monery-unit">{{ item.unit }}</span>
                <span class="val">{{ toThreeDigitRating(item.value) }}</span>
              </p>
            </li>
          </ul>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 1.6%;
  top: 15.85% !important;
  height: 68.39% !important;
  width: 13.75% !important;
}

.annual-income,
.annual-procurement {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.7vh;
  gap: 3.7vh 0;
}

.business-income,
.business-expend {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  gap: 20px 0;

  .monery {
    font-size: 16px;
    color: #FFF;
  }
}

.map-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px 0;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    width: 223px;
    height: 32px;
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, .4);
    background-color: rgba(255, 255, 255, .2);

    .k-wrap {
      .key {
        font-weight: normal;
        color: rgba(202, 224, 255, .6);
      }
    }

    .v-wrap {
      font-size: 16px;
      color: rgba(255, 255, 255, 1);
    }
  }

}

.char {
  width: 120px;
  height: 120px;
}

// 264px 362px
</style>