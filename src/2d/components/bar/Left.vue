<script setup>
import bar from "@/2d/components/bar/bar.module.css";
</script>

<template>
  <div :class="['left',bar.item,'animated bounceInLeft']">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.left {
  position: absolute;
  left: 1% !important;
}
</style>