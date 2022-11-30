<!-- 采购部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { createEcharts, getEchartsAndOption } from "@/2d/viewCharts/common"
import { toThreeDigitRating } from "@/2d/utils/num"
import ProgressEl from "@/2d/components/Progress.vue"
const store = useStore();

// 采购支出
const purchaseChar = ref(null)
const drawPurchaseChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "gauge1", {
    color: [{
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: 'RGBA(230, 105, 11, .3)' // 0% 处的颜色
      }, {
        offset: 1, color: 'RGBA(230, 105, 11, 1)' // 100% 处的颜色
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
const peMoney = reactive([
  { unit: "￥", value: 22696684.59, prefix: "", desc: "" },
  { unit: "￥", value: 22696684.59, prefix: "", desc: "本月" },
  { unit: "￥", value: 22696684.59, prefix: "+", desc: "环比" },
])
// 供应商排行
const supplier = reactive([
  { name: "1、丰弘创新科技销售有限公司", value: 2500, percentage: 60 },
  { name: "2、晶弘贸易有限公司", value: 1604.88, percentage: 50 },
  { name: "3、金德商贸有限公司", value: 16, percentage: 10 },
  { name: "4、新宇创新科技销售有限公司", value: 14, percentage: 8 },
  { name: "5、捷凯创新科技(集团)有限公司", value: 10, percentage: 6 },
])
// 物流费用
const logisticsEl = ref(null)
const drawLogisticsChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "line1",)
  char.setOption(option)
}
// 企业仓库容积
const businessRepoEl = ref(null)
const drawBusinessRepoChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "gauge1", {
    color: [{
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: 'RGBA(86, 106, 207, .3)' // 0% 处的颜色
      }, {
        offset: 1, color: 'RGBA(86, 106, 207, 1)' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    }],
    series: [{
      detail: {
        formatter(val) {
          return `{val|${val}%}\n{name|总空闲率}`;
        }
      }
    }]
  }
  )
  char.setOption(option)
}
const brMoney = reactive([
  { value: 267001, prefix: "", desc: "总占用量" },
  { value: 52999, prefix: "", desc: "总空闲量" },
])

// 货币周转率
const goodsTREL = ref(null)
const drawGoodsTRELChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "line1", { series: [{ data: [1.2, .9, .8, .6, .5, .5, .7, .66, .44, .3, 1.1, .5] }] })
  char.setOption(option)
}
// 企业库存情况
const businessRepoSituationEl = ref(null)
const drawBusinessRepoSituationElChar = (el) => {
  const { char, option } = getEchartsAndOption(el, "bar1",)
  char.setOption(option)
}

onMounted(() => {
  drawPurchaseChar(purchaseChar.value)
  drawLogisticsChar(logisticsEl.value)
  drawBusinessRepoChar(businessRepoEl.value)
  drawGoodsTRELChar(goodsTREL.value)
  drawBusinessRepoSituationElChar(businessRepoSituationEl.value)
})


</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>采购支出</Title>
      <Content>
        <div class="purchase-expend">
          <div class="char" ref="purchaseChar" v-once></div>
          <ul class="pe-money-list">
            <li class="pe-money-item" v-for="item in peMoney" :key="item">
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
            <li class="supplier-top-item" v-for="item in supplier">
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
          <div class="char" ref="logisticsEl"></div>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业仓库容积</Title>
      <Content>
        <div class="business-repo">
          <div class="char" ref="businessRepoEl" v-once></div>
          <ul class="br-money-list">
            <li class="br-money-item" v-for="item in brMoney" :key="item">
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
          <div class="char" ref="goodsTREL"></div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>企业库存情况</Title>
      <Content>
        <div class="business-repo-situation">
          <div class="char" ref="businessRepoSituationEl"></div>
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

.supplier-top::-webkit-scrollbar{
 padding-left: 20px;
  width: 5px;
}
.supplier-top::-webkit-scrollbar-thumb{
  background-color: rgba(255, 255, 255, .4);
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

  .char {
    height: 100%;
  }
}
</style>