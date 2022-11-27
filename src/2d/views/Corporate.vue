<!-- 企管部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>年度收入指标</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>年度采购预算</Title>
      <Content></Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业营业收入</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>企业成本支出</Title>
      <Content></Content>
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

// 264px 362px
</style>