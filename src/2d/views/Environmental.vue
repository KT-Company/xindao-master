<!-- 环境人口 -->
<script setup>
import { ref, onMounted, reactive } from "vue";
import { gethjrk } from "@/2d/api";
import { useYear } from "@/2d/hooks/useTime";

import { useStore } from "vuex";
const store = useStore();
const base = reactive({
  data: {},
});

onMounted(() => {
  gethjrk().then((res) => {
    console.log("环境人口: ", res);
  });
});
const message = ref("page2");
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>总人口</Title>
      <Content>
        
      </Content>
    </Bar>
    <Bar>
      <Title>人口结构</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>消费</Title>
      <Content></Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>城市空气质量</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>生态环境</Title>
      <Content></Content>
    </Bar>
    <Bar>
      <Title>物价指数</Title>
      <Content></Content>
    </Bar>
  </Right>
</template>
<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 376fr 240.5fr 321fr;
  row-gap: 1.6%;
}
.z-right {
  display: grid;
  grid-template-rows: 226fr 400fr 312fr;
  row-gap: 1.6%;
}
</style>
