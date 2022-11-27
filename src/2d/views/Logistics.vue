<!-- 物流公司 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>企业银行存款</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>物流成本支出</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>货主下单排行</Title>
      <Content></Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>车辆情况</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>订单情况</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>货主下单趋势</Title>
      <Content></Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 197fr 271fr 470fr;
  row-gap: 1.6%;
}
.z-right {
  display: grid;
  grid-template-rows: 369fr 243fr 326fr;
  row-gap: 1.6%;
}
</style>