<!-- 财务部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>企业营业收入</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>企业成本支出</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>总资产增长率</Title>
      <Content></Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>资产负债率</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>销售毛利率</Title>
      <Content></Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 231fr 233fr 244fr;
  row-gap: 2%;
  height: 68.44% !important;
}
.z-right {
  display: grid;
  grid-template-rows: 362fr 362fr;
  row-gap: 2%;
  height: 68.44% !important;
}
</style>