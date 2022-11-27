<!-- 营销部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>市场获单情况</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>广告投放情况</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>市场开拓情况</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>客户销量</Title>
      <Content></Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>销售毛利率</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>销售结构</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>客单价</Title>
      <Content></Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 187fr 187fr 202fr 211fr;
  row-gap: 1.6%;
  top: 11.68% !important;
  height: 76.64% !important;
}
.z-right {
  display: grid;
  grid-template-rows: 240fr 259fr 300fr;
  row-gap: 1.6%;
  top: 11.68% !important;
  height: 76.64% !important;
}
</style>