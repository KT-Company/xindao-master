<!-- 工商银行 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>企业贷款</Title>
      <Content></Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业存款</Title>
      <Content></Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  top: 29.57% !important;
  height: 40.9% !important;
}
</style>