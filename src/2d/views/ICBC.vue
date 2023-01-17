<!-- 工商银行 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import useData from "@/2d/hooks/useData";
const base = useData.data1();
const store = useStore();
let leftIndex = 0;
let rightIndex = 0;
const dataLeft = ref([]);
const dataRight = ref([]);

if (store.state.MODE === "BUSINESS") {
  dataRight.value = base.qyyhck.map((item, i) => {
    rightIndex++;
    if (rightIndex > 5) rightIndex = 1;
    return {
      id: i + 1,
      bg: require(`@/2d/assets/icons/ICBC-bg-right-${rightIndex}.png`),
      name: item.orgTypeName,
      value: item.balance || 0,
    };
  });

  dataLeft.value = base.qyyhdk.map((item, i) => {
    leftIndex++;
    if (leftIndex > 5) leftIndex = 1;
    return {
      id: i + 1,
      bg: require(`@/2d/assets/icons/ICBC-bg-left-${leftIndex}.png`),
      name: item.orgTypeName,
      value: item.loan || 0,
    };
  });
} else {
  dataLeft.value = base.map((item, i) => {
    leftIndex++;
    if (leftIndex > 5) leftIndex = 1;
    return {
      id: i + 1,
      bg: require(`@/2d/assets/icons/ICBC-bg-left-${leftIndex}.png`),
      name: item.qylx,
      value: item.qyyhdkxj || 0,
    };
  });

  dataRight.value = base.map((item, i) => {
    rightIndex++;
    if (rightIndex > 5) rightIndex = 1;
    return {
      id: i + 1,
      bg: require(`@/2d/assets/icons/ICBC-bg-right-${rightIndex}.png`),
      name: item.qylx,
      value: item.qyyhckxj || 0,
    };
  });
}
onMounted(() => {});
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>企业贷款</Title>
      <Content class="dpy-column content-box">
        <div
          class="left-wrap dpy-row item"
          v-for="(item, index) in dataLeft"
          :key="index"
          :style="{
          background: `url(${item.bg})`,
          'background-size': '100% 100%'
        }"
        >
          <div class="dpy-row">
            <span :style="{ color: item.color }">{{ item.id }}</span>
            <p>{{ item.name }}</p>
          </div>
          <div>￥{{ item.value }}</div>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业存款</Title>
      <Content class="dpy-column content-box">
        <div
          class="right-wrap dpy-row item"
          v-for="(item, index) in dataRight"
          :key="index"
          :style="{
          background: `url(${item.bg})`,
          'background-size': '100% 100%'
        }"
        >
          <div class="dpy-row">
            <p>{{ item.name }}</p>
          </div>
          <div>￥{{ item.value }}</div>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  top: 29.57% !important;
  height: 40.9% !important;
}
.item {
  margin: 0.5rem;
}
.dpy-column {
  justify-content: flex-start !important;
}
.content-box {
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;

  .left-wrap,
  .right-wrap {
    width: 100%;
    padding: 1.2vh 2vh;

    span {
      font-family: SourceHanSansCN;
      font-weight: bold;
      font-size: 0.8vw;
    }

    p {
      padding-left: 1.5vh;
    }

    & > div:nth-of-type(2) {
      font-family: SourceHanSansCN;
      font-weight: bold;
      font-size: 1vw;
    }
  }
}
</style>