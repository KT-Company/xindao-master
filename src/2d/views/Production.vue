<!-- 生产部 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>工人派工情况</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>生产进度</Title>
      <Content></Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>设备状态</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>产量走势</Title>
      <Content></Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  display: grid;
  grid-template-rows: 415fr 277fr;
  row-gap: 1.9%;
  top: 17.335% !important;
  height: 65.4% !important;
}
</style>