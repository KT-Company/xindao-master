<!-- 业务部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>采购支出</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>供应商排名</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>物流费用</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>客户销量</Title>
      <Content></Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业仓库容积</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>存货周转率</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>销售结构/客单价</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>企业库存情况</Title>
      <Content></Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 201fr 222fr 196fr 295fr;
  row-gap: 2%;
}
.z-right {
  display: grid;
  grid-template-rows: 201.3fr 196fr 259fr 259fr;
  row-gap: 2%;
}
</style>