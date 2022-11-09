<!-- 区域层 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getqycyjj } from "@/2d/api";

onMounted(() => {
  getqycyjj().then((res) => {
    console.log("getqycyjj: ", res);
  });
});
</script>

<template>
  <Left class="z-left">
    <div class="bar" v-for="i in 4" :key="i"></div>

  </Left>
  <Right class="z-right"></Right>
</template>

<style lang="less" scoped>
.bar{
  height: 23%;
  border: 1px solid pink;
}
</style>