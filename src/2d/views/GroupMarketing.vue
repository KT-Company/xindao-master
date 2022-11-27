<!-- 物流公司 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>客户销量</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>客单价</Title>
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
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  display: grid;
  grid-template-rows: 297fr 317fr;
  row-gap: 2%;
  top: 20.95% !important;
  height: 58.1% !important;
}
</style>