<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: String,
  icon: String,
});
</script>

<template>
  <div class="bar">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.bar {
  height: 100%;
  background: url("@/2d/assets/images/bar.png") no-repeat center center / 100%
    100%;
  padding: 2.5% 4%;
}
</style>