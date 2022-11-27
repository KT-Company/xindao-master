<script setup>
import bar from "@/2d/components/bar/bar.module.css";
</script>

<template>
  <div :class="['right',bar.item,'animated bounceInRight']">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.right {
  right: var(--barMargin);
  font-family: sscr;
}
</style>